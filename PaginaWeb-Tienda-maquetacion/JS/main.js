//componentes Slider
$(window).load(function () {

    $('#slider').nivoSlider({

        effect: 'random',
        slices: 20,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 500,
        pauseTime: 2000,
        startSlide: 0,
        directionNav: true,
        controlNav: true,
        controlNavThumbs: false,
        pauseOnHover: true,
        manualAdvance: false,
        prevText: 'Prev',
        nextText: 'Next',
        randomStart: false,
        beforeChange: function () { },
        afterChange: function () { },
        slideshowEnd: function () { },
        lastSlide: function () { },
        afterLoad: function () { }

    });
});

//componentes de popup
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}


function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

//map
function iniciarMap() {
    var coord = { lat: -24.1854092, lng: -65.3090926 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
}

// creamos la funcion
function validarFormulario() {

    var nombre = $('#nombre').val(),
        correo = $('#correo').val(),
        asunto = $('#asunto').val(),
        mensaje = $('#mensaje').val();

    if (nombre == "" || nombre == null) {
        cambiarColor("nombre");
        alert("El campo nombre es obligatorio");
        return false;

    } else if (nombre.length < 4) {
        cambiarColor("nombre");
        alert("el nombre es muy corto");
        return false;


    } else if (nombre.length > 30) {
        cambiarColor("nombre");
        alert("nombre es muy largo");
        return false;

    } else {
        var expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
        if (!expresion.test(nombre)) {
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("nombre");
            alert("No se permiten carateres especiales o numeros");
            return false;
        }

    }
    if (correo == "" || correo == null) {
        cambiarColor("correo");
        alert("El campo correo electronico es obligatorio");
        return false;

    } else {
        var expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if (!expresion.test(correo)) {
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("correo");
            alert("Por favor ingrese un correo válido");
            return false;
        }

    }
    if (asunto == "" || asunto == null) {
        cambiarColor("asunto");
        alert("El campo asunto es obligatorio");
        return false;

    } else if (asunto.length > 20) {
        cambiarColor("asunto");
        alert("EL asunto es muy largo");

    } else {
        var expresion = /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
        if (!expresion.test(asunto)) {
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("asunto");
            alert("No se permiten carateres especiales o numeros");
            return false;
        }
    }
    if (mensaje == "" || mensaje == null) {
        cambiarColor("mensaje");
        alert("El campo mensaje es obligatorio");
        return false;

    } else if (mensaje.length < 10) {
        cambiarColor("mensaje");
        alert("El mensaje es muy corto");
        return false;


    } else if (mensaje.length > 100) {
        cambiarColor("mensaje");
        alert("El mensaje es muy largo");
        return false;

    } else {
        var expresion = /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
        if (!expresion.test(mensaje)) {
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("mensaje");
            alert("No se permiten carateres especiales o numeros");
            return false;
        }

    }
    $('form').submit();
    return true;

}

// creamos un funcion de color por defecto a los bordes de los inputs
function colorDefault(dato) {
    $('#' + dato).css({
        border: "1px solid #999"
    });
}
// creamos una funcio para cambiar de color a su bordes de los input
function cambiarColor(dato) {
    $('#' + dato).css({
        border: "1px solid #dd5144"
    });
}

