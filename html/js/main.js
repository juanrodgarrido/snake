
const pantallaInicio = document.getElementById("inicio");
const pantallaJuego = document.getElementById("juego");
const formInicio = document.getElementById("form-inicio");
const inputNombre = document.getElementById("nombre");
const textoError = document.getElementById("error");
const infoNombre = document.getElementById("info-nombre");


let nombreJugador = "";


formInicio.addEventListener("submit", function (event) {
    event.preventDefault(); //para que la página no se recargue

    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        textoError.textContent = "Escribe un nombre para jugar."; //el error en caso de que el nombre esté vacío
        textoError.classList.remove("oculta");
        inputNombre.focus();
        return;
    }

    textoError.classList.add("oculta");

    nombreJugador = nombre;
    infoNombre.textContent = nombreJugador;

    pantallaInicio.classList.add("oculta");
    pantallaJuego.classList.remove("oculta");

    iniciarJuego();

});

document.addEventListener("keydown", function (event) {

    switch(event.key){
        case "ArrowUp":
            cambiarDireccion({x: 0, y: -1});
            break;
        case "ArrowDown":
            cambiarDireccion({x: 0, y: 1});
            break;
        case "ArrowLeft":
            cambiarDireccion({x: -1, y: 0});
            break;
        case "ArrowRight":
            cambiarDireccion({x: 1, y: 0});
            break;
    }


})