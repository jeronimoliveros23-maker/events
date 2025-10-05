// Inicialización de eventos
let dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];
let currentId = dataArray.length ? Math.max(...dataArray.map(item => item.id)) + 1 : 0;

// Abrir formulario de eventos
document.getElementById('openFormBtn').onclick = function() {
    document.getElementById('formModal').style.display = "block";
};

// Cerrar formulario de eventos
document.getElementById('closeFormModal').onclick = function() {
    document.getElementById('formModal').style.display = "none";
};

// Enviar formulario de eventos
document.getElementById('dataForm').onsubmit = function(event) {
    event.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const photo = document.getElementById('photo').files[0];
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;

    const reader = new FileReader();
    reader.onload = function(e) {
        const newEntry = {
            id: currentId++,
            name: eventName,
            photo: e.target.result,
            description: description,
            date: date,
            category: category
        };

        dataArray.push(newEntry);
        localStorage.setItem('dataArray', JSON.stringify(dataArray));
        document.getElementById('formModal').style.display = "none";
        document.getElementById('dataForm').reset();
        displayData();
        bindPersonButtons();
    };

    reader.readAsDataURL(photo);
};

/* HASTA AQUI ES LA FUNCION DE REGISTRAR EVENTOS */