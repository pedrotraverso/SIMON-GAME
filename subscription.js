const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]+$/, // Debe ser alfanumérico.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Debe tener un formato de email válido.
    mensaje: /^.{6,}$/, // Debe tener mas de 5 caracteres.
}

const campos = {
    nombre: false,
    email: false,
    mensaje: false,
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
            break;
        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, 'mensaje');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.nombre && campos.email && campos.mensaje) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});

const abrirCorreo = document.getElementById('enviar');
abrirCorreo.addEventListener('click', function() {
    // Obtén los valores del formulario
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('mensaje').value;

    // Construye la URL del enlace mailto
    var mailtoLink = 'mailto:contacto@simon-game.com?&body=Nombre: ' + encodeURIComponent(nombre) + '%0AEmail: ' + encodeURIComponent(email) + '%0AMensaje: ' + encodeURIComponent(mensaje);

    // Abre el enlace mailto
    window.location.href = mailtoLink;
});