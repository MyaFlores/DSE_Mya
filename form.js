let datos = [];

const formulario = document.querySelector("form");
const tablaBody = document.querySelector("#datos tbody");

function agregarDatos(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("correo").value;
    const edad = document.getElementById("edad").value;

    if (nombre.trim() === "" || email.trim() === "" || edad.trim() === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevoDato = {
        nombre: nombre,
        email: email,
        edad: edad
    };

    datos.push(nuevoDato);

    formulario.reset();

    actualizarTabla();
}

function actualizarTabla() {
    tablaBody.innerHTML = "";

    datos.forEach((dato, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${dato.nombre}</td>
            <td>${dato.email}</td>
            <td>${dato.edad}</td>
            <td>
                <button onclick="editarDato(${index})">Editar</button>
                <button onclick="eliminarDato(${index})">Eliminar</button>
            </td>
        `;

        tablaBody.appendChild(fila);
    });
}

function eliminarDato(index) {
    datos.splice(index, 1); 
    actualizarTabla(); 
}

function editarDato(index) {
    const dato = datos[index];

    document.getElementById("nombre").value = dato.nombre;
    document.getElementById("correo").value = dato.email;
    document.getElementById("edad").value = dato.edad;

    datos.splice(index, 1);

    actualizarTabla();
}

formulario.addEventListener("submit", agregarDatos);

document.getElementById("nombre").addEventListener("input", function () {
    if (this.value.trim() === "") {
        this.setCustomValidity("El nombre es obligatorio.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById("correo").addEventListener("input", function () {
    if (!this.value.includes("@")) {
        this.setCustomValidity("Ingresa un email válido.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById("edad").addEventListener("input", function () {
    if (this.value < 1 || this.value > 100) {
        this.setCustomValidity("La edad debe estar entre 1 y 100.");
    } else {
        this.setCustomValidity("");
    }
});