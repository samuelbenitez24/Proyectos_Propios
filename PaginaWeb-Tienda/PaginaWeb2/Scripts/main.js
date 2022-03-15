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

var producto = document.querySelectorAll(".producto");

for (var i = 0; i < producto.length; i++) {
    producto[i].addEventListener("click", mostrarinfoProducto);

}

function mostrarinfoProducto() {
    document.getElementById('nombre-data').innerHTML = this.dataset.nombre;
    document.getElementById('img-data').src = this.dataset.img;
    document.getElementById('precio-data').innerHTML = this.dataset.precio;
    document.getElementById('button-data').innerHTML = this.dataset.button;
}

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
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


