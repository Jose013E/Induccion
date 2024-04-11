
var datos = [];

// Función para cargar los datos desde el archivo JSON
function cargarDatos() {
    fetch('uso.json')
        .then(response => response.json())
        .then(data => {
            datos = data;
            mostrarDatos();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

// Función para mostrar los datos en la tabla
function mostrarDatos() {
    console.log("Datos recibidos:", datos);
    var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    datos.forEach(function(dato, index) {
        var fila = tabla.insertRow();
        var celdaNombre = fila.insertCell(0);
        var celdaEdad = fila.insertCell(1);
        celdaNombre.innerHTML = dato.nombre;
        celdaEdad.innerHTML = dato.edad;
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
    });
}

// Función para agregar un nuevo dato
function agregarDato() {
    var nombre = document.getElementById("nombre").value;
    var edad = parseInt(document.getElementById("edad").value);
    var nuevoDato = { "nombre": nombre, "edad": edad };
    datos.push(nuevoDato);
    mostrarDatos(); // Mostrar los datos actualizados
    guardarDatos(); // Guardar los datos en el archivo JSON
}

// Función para editar un dato
function editarDato(index) {
    var nombre = prompt("Nuevo nombre:");
    var edad = parseInt(prompt("Nueva edad:"));
    if (nombre !== null && !isNaN(edad)) {
        datos[index] = { "nombre": nombre, "edad": edad };
        mostrarDatos(); // Mostrar los datos actualizados
        guardarDatos(); // Guardar los datos en el archivo JSON
    }
}

// Función para borrar un dato
function borrarDato(index) {
    if (confirm("¿Estás seguro de que deseas borrar este dato?")) {
        datos.splice(index, 1);
        mostrarDatos(); // Mostrar los datos actualizados
        guardarDatos(); // Guardar los datos en el archivo JSON
    }
}


// Función para guardar los datos en el archivo JSON
function guardarDatos() {
    var datosJSON = JSON.stringify(datos);
    fetch('http://localhost/api/actualizar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: datosJSON
    })
    .then(response => {
        if (response.ok) {
            console.log('Datos guardados exitosamente.');
        } else {
            console.error('Error al guardar los datos:', response.status);
        }
    })
    .catch(error => console.error('Error al guardar los datos:', error));
}


// Cargar los datos al cargar la página
window.onload = function() {
    mostrarDatos();
};



// document.getElementById("formulario").addEventListener("submit", function(event) {
//     event.preventDefault(); // Evitar que se envíe el formulario de forma predeterminada

//     var nombre = document.getElementById("nombre").value;
//     var edad = parseInt(document.getElementById("edad").value);
    
//     // Crear objeto con los datos
//     var datos = { nombre: nombre, edad: edad };

//     // Enviar los datos al servidor utilizando Fetch API y el método POST
//     fetch('http://localhost/api/actualizar', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(datos)
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Datos guardados exitosamente.');
//             // Aquí podrías realizar alguna acción adicional después de guardar los datos
//         } else {
//             console.error('Error al guardar los datos:', response.status);
//         }
//     })
//     .catch(error => console.error('Error al guardar los datos:', error));
// });
