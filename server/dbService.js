//-------------------------------------------
//-------------OBJETOS DATABASE--------------
//-------------------------------------------
const mysql = require('mysql');
const dotenv = require('dotenv');
const { response } = require('express');
let instance = null;

dotenv.config();

//llamo a los parametros de .env
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

//conecto con la db
connection.connect((error) => {
    if (error) {
        console.log('Error conectando a DB :' + error);
    } else {
        console.log('Conectado a BD')
    }
});

//db para realizar querys
class DbService {
    //llamar a la db OK
    static getDbServiceInstance() {
        if (instance == null) {
            return instance = new DbService();
        } else {
            return instance;
        }
    }

    //obtener los datos de la db OK
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM nombres";

                connection.query(query, (err, results) => {
                    if (err) {
                        reject = err;
                    } else {
                        resolve(results);
                    }
                })
            });

            return response;

        } catch (error) {
            console.log(error)
        }
    }

    //insertar nuevo nombre
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO nombres (nombre) VALUES (?)";

                connection.query(query, [name], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });

            return response;

        } catch (error) {
            console.log(error);
        }
    }

    //eliminar fila por id OK
    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM nombres WHERE id = ?";

                connection.query(query, [id], (err, result) => {
                    if (err) {
                        reject = err;
                    } else {
                        resolve(result.affectedRows);
                    }
                });
            });

            return response;

        } catch (error) {
            console.log(error);
        };
    }

    //actualizar nombre por id OK
    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE nombres SET nombre = ? WHERE id = ?";

                connection.query(query, [name, id], (err, result) => {
                    if (err) {
                        reject = err;
                    } else {
                        resolve(result);
                    };
                });
            });

            return response;

        } catch (error) {
            console.log(error);
        }
    }

    //buscar por nombre OK
    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM nombres WHERE nombre = ?";

                connection.query(query, [name], (err, results) => {
                    if (err) {
                        reject = err;
                    } else {
                        resolve(results);
                    };
                });
            });

            return response;

        } catch (error) {
            console.log(error);
        }
    }



}

module.exports = DbService;