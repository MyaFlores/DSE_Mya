// Conjunto de datos inicial (ahora cargado desde localStorage)
let productos = JSON.parse(localStorage.getItem('productos')) || [
    { id: 1, nombre: "Laptop", precio: 1200.99, cantidad: 15 },
    { id: 2, nombre: "Mouse", precio: 25.50, cantidad: 42 },
    { id: 3, nombre: "Teclado", precio: 45.75, cantidad: 30 }
];

// Variable para llevar el control del próximo ID
let proximoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 4;

// Función para guardar los productos en localStorage
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para renderizar la tabla
function renderizarTabla() {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    productos.forEach(producto => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td contenteditable="true" onblur="actualizarProducto(${producto.id}, 'nombre', this.textContent)">${producto.nombre}</td>
            <td contenteditable="true" onblur="actualizarProducto(${producto.id}, 'precio', this.textContent)">${producto.precio}</td>
            <td contenteditable="true" onblur="actualizarProducto(${producto.id}, 'cantidad', this.textContent)">${producto.cantidad}</td>
            <td>
                <button class="delete-btn" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Función para agregar un nuevo producto
function agregarProducto() {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (nombre && !isNaN(precio) && !isNaN(cantidad)) {
        const nuevoProducto = {
            id: proximoId++,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        };

        productos.push(nuevoProducto);
        guardarProductos(); // Guardamos en localStorage
        renderizarTabla();

        // Limpiar el formulario
        document.getElementById("productForm").reset();
    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
}

// Función para actualizar un producto
function actualizarProducto(id, campo, nuevoValor) {
    const producto = productos.find(p => p.id === id);
    
    if (producto) {
        if (campo === 'precio') {
            producto[campo] = parseFloat(nuevoValor);
        } else if (campo === 'cantidad') {
            producto[campo] = parseInt(nuevoValor);
        } else {
            producto[campo] = nuevoValor;
        }
        
        guardarProductos(); // Guardamos los cambios
    }
}

// Función para eliminar un producto
function eliminarProducto(id) {
    if (confirm("¿Está seguro de que desea eliminar este producto?")) {
        productos = productos.filter(producto => producto.id !== id);
        guardarProductos(); // Actualizamos localStorage
        renderizarTabla();
    }
}

// Renderizar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", renderizarTabla);
