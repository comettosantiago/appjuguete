//-------------------------------------------
//----------------FRONTEND-------------------
//-------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
});


//-----------Fetchers--------------

//fetchs para eliminar y para editar
document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-button") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-button") {
        handleEditRow(event.target.dataset.id);
    }
});

//fetch para agregar
const addNameButton = document.querySelector('#add-name-button');

addNameButton.onclick = function () {
    const nameInput = document.querySelector('#name-input');

    fetch('http://localhost:5000/insert', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name: nameInput.value })
    })
        .then(function () {
            location.reload();
        });
}

//fetch para actualizar
const updateButton = document.querySelector('#update-name-button');

updateButton.onclick = function () {
    const updateNameInput = document.querySelector('#update-name-input');

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
        .then(response => response.json())
        .then(function () {
            location.reload();
        });
}

//fetch para buscar
const searchButton = document.querySelector('#search-button');

searchButton.onclick = function () {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

//fetch para eliminar
function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(function () {
            location.reload();
        });
}

//-------------Funciones---------------

//manejador para "update-row" OK
function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');

    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

//cargar tabla
function loadHTMLTable(data) {
    const table = document.querySelector('tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No hay datos cargados</td></tr>";//agregar tr o no afuera de td   
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ id, nombre }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${nombre}</td>`;
        tableHtml += `<td><button class="delete-row-button" data-id=${id}>Borrar</td>`;
        tableHtml += `<td><button class="edit-row-button" data-id=${id}>Editar</td>`;
        tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml;
}