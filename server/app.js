//-------------------------------------------
//-------------------API---------------------
//-------------------------------------------
const express = require('express');
const app = express();
const cors = require('cors');
const dbService = require('./dbService');

//-----------MIDDLEWARES-------------
app.use(cors());
app.use(express.json());

//------------RUTAS-------------

//crear/create
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
        .then(data => response.json({ data: data }))
});

//leer/read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();

    result
        .then(data => response.json({ data: data }))
});

//actualizar/update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);

    result
        .then(data => response.json({ data: data }))       
})

//eliminar/delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
        .then(data => response.json({ data: data }))
})

//buscar/search OK
app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);

    result
        .then(data => response.json({ data: data }))
});

//-----------SERVER-------------
app.listen(process.env.PORT, () => {
    console.log('Corriendo en puerto ' + process.env.PORT);
});
