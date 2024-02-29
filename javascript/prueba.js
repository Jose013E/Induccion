const boton=document.getElementById('boton');
const formulario=document.getElementById('formulario');

boton.addEventListener('click', function() {
    // Si el formulario está visible, lo ocultamos, de lo contrario lo mostramos
    if (formulario.style.display === 'none') {
      formulario.style.display = 'block';

    } else {
      formulario.style.display = 'none';
    }
  });