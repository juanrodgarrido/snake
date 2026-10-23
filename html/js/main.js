
const pantallaInicio = document.getElementById("inicio");
const pantallaJuego = document.getElementById("juego");
const formInicio = document.getElementById("form-inicio");
const inputNombre = document.getElementById("nombre");
const textoError = document.getElementById("error");
const infoNombre = document.getElementById("info-nombre");
const finNombre = document.getElementById("fin-nombre");
const volverJugar = document.getElementById("volver");


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
    finNombre.textContent = nombreJugador;

    pantallaInicio.classList.add("oculta");
    pantallaJuego.classList.remove("oculta");

    iniciarJuego();

});

document.addEventListener("keydown", function (event) {

    if(!jugando){
        return;
    }
    
    switch(event.key){
        case "ArrowUp":
        case "W":
        case "w":
            cambiarDireccion({x: 0, y: -1});
            break;
        case "ArrowDown":
        case "S":
        case "s":   
            cambiarDireccion({x: 0, y: 1});
            break;
        case "ArrowLeft":
        case "A":
        case "a":
            cambiarDireccion({x: -1, y: 0});
            break;
        case "ArrowRight":
        case "D":
        case "d":
            cambiarDireccion({x: 1, y: 0});
            break;
    }
    


})

volverJugar.addEventListener("click", function (){
    iniciarJuego();


})