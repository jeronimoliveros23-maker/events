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

// Mostrar todos los eventos en pantalla
function displayData() {
    const dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];
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

    bindPersonButtons(); // Asegura que los botones de registro funcionen
}

// Mostrar detalles del evento seleccionado
function openEventDetails(eventId) {
    const dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];
    const dataArrayP = JSON.parse(localStorage.getItem('dataArrayP')) || [];
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

// Cerrar el modal de detalles del evento
document.getElementById('closeEventModal').onclick = function() {
    document.getElementById('eventModal').style.display = "none";
};

/* HATA ACA LLEGA LA FUNCION DE DISTRIBUIR LOS DIV Y EL BOTON VER DETALLES */

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

/* HATA ACA LLEGA LA FUNCION DE FILTRAR EVENTOS */
