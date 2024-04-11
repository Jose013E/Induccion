// Función para cargar los datos desde el archivo JSON
var datos = [];
function cargarDatos() {
    fetch('js/uso.json') // Cambiar 'datos.json' por la ruta correcta de tu archivo JSON
        .then(response => response.json())
        .then(data => {
            mostrarDatos(data); // Pasar los datos cargados como argumento a mostrarDatos
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

function mostrarDatos(datos, index) {
    console.log("Datos recibidos:", datos); // Imprime los datos en la consola para verificar
    var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    datos.forEach(function(dato) {
        if (dato && dato.nombre !== undefined && dato.edad !== undefined) {
            var fila = tabla.insertRow();
            var celdaNombre = fila.insertCell(0);
            var celdaEdad = fila.insertCell(1);
            celdaNombre.innerHTML = dato.nombre;
            celdaEdad.innerHTML = dato.edad;
            // Agregar botón de editar
        // Agregar botón de editar
        var celdaEditar = fila.insertCell(2);
        var btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = function() {
            editarDato(index);
        };
        celdaEditar.appendChild(btnEditar);
        // Agregar botón de borrar
        var celdaBorrar = fila.insertCell(3);
        var btnBorrar = document.createElement('button');
        btnBorrar.textContent = 'Borrar';
        btnBorrar.onclick = function() {
            borrarDato(index);
        };
        celdaBorrar.appendChild(btnBorrar);
        } else {
            console.error("Error: datos incorrectos", dato); // Imprime un error si los datos son incorrectos
        }
    });
}

// Función para agregar un nuevo dato
function agregarDato() {
    var nombre = document.getElementById("nombre").value;
    var edad = parseInt(document.getElementById("edad").value);
    var nuevoDato = { "nombre": nombre, "edad": edad };
    datos.push(nuevoDato);
    mostrarDatos();
    guardarDatos();
}

function editarDato(index) {
    var nombre = prompt("Nuevo nombre:");
    var edad = parseInt(prompt("Nueva edad:"));
    if (nombre !== null && !isNaN(edad)) {
        datos[index] = { "nombre": nombre, "edad": edad };
        mostrarDatos();
        guardarDatos();
    }
}

// Función para borrar un dato
function borrarDato(index) {
    if (confirm("¿Estás seguro de que deseas borrar este dato?")) {
        datos.splice(index, 1);
        mostrarDatos();
        guardarDatos();
    }
}

// Función para guardar los datos en el archivo JSON
function guardarDatos() {
    var datosJSON = JSON.stringify(datos);
    var blob = new Blob([datosJSON], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'uso.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Cargar los datos al cargar la página
window.onload = function() {
    cargarDatos();
};
