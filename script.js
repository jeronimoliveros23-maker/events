let dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];
let dataArrayP = JSON.parse(localStorage.getItem('dataArrayP')) || [];
let currentId = dataArray.length ? Math.max(...dataArray.map(item => item.id)) + 1 : 0;
let selectedEventId = null; // Nuevo: para saber a qué evento se registra la persona

window.onload = function() {
    displayData();
    bindPersonButtons();
    document.getElementById('filtro').addEventListener('change', filterEvents);
};

document.getElementById('openFormBtn').onclick = function() {
    document.getElementById('formModal').style.display = "block";
};

document.getElementById('closeFormModal').onclick = function() {
    document.getElementById('formModal').style.display = "none";
};

document.getElementById('closeFormModalP').onclick = function() {
    document.getElementById('formModalP').style.display = "none";
};

document.getElementById('closeEventModal').onclick = function() {
    document.getElementById('eventModal').style.display = "none";
};

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

document.getElementById('dataFormP').onsubmit = function(person) {
    person.preventDefault();

    const tipeDocument = document.getElementById('tipeDocument').value;
    const documentNum = document.getElementById('document').value;
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;

    const newEntry = {
        id: currentId++,
        tipeDocument: tipeDocument,
        document: documentNum,
        name: name,
        number: number,
        email: email,
        eventId: selectedEventId // Nuevo: vincular con evento
    };

    dataArrayP.push(newEntry);
    localStorage.setItem('dataArrayP', JSON.stringify(dataArrayP));
    document.getElementById('formModalP').style.display = "none";
    document.getElementById('dataFormP').reset();
};

function displayData() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    dataArray.forEach((entry, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('container-eventos', `v${index + 1}`);

        eventDiv.innerHTML = `
            <div class="imagen-evento">
                <img src="${entry.photo}" alt="${entry.name}" />
            </div>
            <div class="container-botones">
                <h3>${entry.name}</h3>
                <button class="boton-register openFormBtnP" data-event-id="${entry.id}">Registrarse</button>
                <button class="boton-register" onclick="openEventDetails(${entry.id})">Ver Detalles</button>
            </div>
        `;
        eventList.appendChild(eventDiv);
    });

    bindPersonButtons();
}

function openEventDetails(eventId) {
    const entry = dataArray.find(e => e.id === eventId);
    const eventDetails = document.getElementById('eventDetails');

    if (entry) {
        const totalRegistrados = dataArrayP.filter(p => p.eventId === eventId).length;

        eventDetails.innerHTML = `
            <img src="${entry.photo}" alt="Foto del Evento" style="width: 100%; height: auto;">
            <p><strong>Nombre:</strong> ${entry.name}</p>
            <p><strong>Descripción:</strong> ${entry.description}</p>
            <p><strong>Fecha:</strong> ${entry.date}</p>
            <p><strong>Categoría:</strong> ${entry.category}</p>
            <p><strong>Personas Registradas:</strong> ${totalRegistrados}</p>
        `;
        document.getElementById('eventModal').style.display = "block";
    } else {
        alert(`No hay datos registrados para el Evento`);
    }
}

function filterEvents() {
    const filterValue = document.getElementById('filtro').value;
    const filteredEvents = dataArray.filter(entry =>
        (filterValue === "1") ||
        (filterValue === "2" && entry.category === "Futbol") ||
        (filterValue === "3" && entry.category === "Feria del libro") ||
        (filterValue === "4" && entry.category === "Maratones")
    );

    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    filteredEvents.forEach((entry, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('container-eventos', `v${index + 1}`);

        eventDiv.innerHTML = `
            <div class="imagen-evento">
                <img src="${entry.photo}" alt="${entry.name}" />
            </div>
            <div class="container-botones">
                <h3>${entry.name}</h3>
                <button class="boton-register openFormBtnP" data-event-id="${entry.id}">Registrarse</button>
                <button class="boton-register" onclick="openEventDetails(${entry.id})">Ver Detalles</button>
            </div>
        `;
        eventList.appendChild(eventDiv);
    });

    bindPersonButtons();
}

document.getElementById('deleteAllBtn').onclick = function() {
    if (confirm("¿Estás seguro de que deseas eliminar todos los eventos?")) {
        dataArray = [];
        localStorage.removeItem('dataArray');
        localStorage.removeItem('dataArrayP');
        displayData();
        currentId = 0;
        selectedEventId = null;
    }
};

function bindPersonButtons() {
    document.querySelectorAll('.openFormBtnP').forEach(btn => {
        btn.onclick = function() {
            selectedEventId = parseInt(btn.getAttribute('data-event-id'));
            document.getElementById('formModalP').style.display = "block";
        };
    });
}
