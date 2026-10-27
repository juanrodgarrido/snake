const TAMANO_CASILLA = 25;
const NUM_CASILLAS = 20;

const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");
const infoPuntuacion = document.getElementById("info-puntuacion");
const infoTiempo = document.getElementById("info-tiempo");
const modalFin = document.getElementById("fin");
const mensajeFinal = document.getElementById("mensaje-fin");
const finPuntuacion = document.getElementById("fin-puntuacion");
const finTiempo = document.getElementById("fin-tiempo");

const COLOR_CUERPO = "#008751";
const COLOR_CABEZA = "#00e436";
const COLOR_OJOS = "#000000";
const COLOR_MANZANA = "#ff004d";
const COLOR_BRILLO = "#fff1e8";
const COLOR_HOJA = "#00e436";


let manzana;
let intervalo;
let intervaloTiempo;
let puntuacion = 0;
let tiempo = 0;
let serpiente = [];
let direccion;
let siguienteDireccion;
let jugando = false;




function colocarManzana() {
  do {
    manzana = {
      x: Math.floor(Math.random() * NUM_CASILLAS),
      y: Math.floor(Math.random() * NUM_CASILLAS),
    };
  } while (estaEnSerpiente(manzana));
}

function estaEnSerpiente(casilla) {
  for (const parte of serpiente) {
    if (parte.x === casilla.x && parte.y === casilla.y) {
      return true;
    }
  }
  return false;
}



function mover() {
  direccion = siguienteDireccion;

  const cabezaActual = serpiente[0];
  const nuevaCabeza = {
    x: cabezaActual.x + direccion.x,
    y: cabezaActual.y + direccion.y,
  };

  const comeManzana =
    nuevaCabeza.x === manzana.x && nuevaCabeza.y === manzana.y;

  if (
    nuevaCabeza.x >= NUM_CASILLAS ||
    nuevaCabeza.y >= NUM_CASILLAS ||
    nuevaCabeza.x < 0 ||
    nuevaCabeza.y < 0
  ) {
    terminarPartida(false);
    return;
  }

  if (!comeManzana) {
    serpiente.pop();
  }

  if (estaEnSerpiente(nuevaCabeza)) {
    terminarPartida(false);
    return;
  }

  serpiente.unshift(nuevaCabeza);

  if (comeManzana) {
    puntuacion++;
    actualizarMarcador();
    if (serpiente.length === NUM_CASILLAS * NUM_CASILLAS) {
      terminarPartida(true);
      return;
    }
    colocarManzana();
  }
}

function posicionInicial() {
  serpiente = [
    { x: 10, y: 10 }, // cabeza
    { x: 9, y: 10 },
    { x: 8, y: 10 }, // cola
  ];

  direccion = { x: 1, y: 0 };
  siguienteDireccion = { x: 1, y: 0 };

  puntuacion = 0;
  tiempo = 0;
}

function iniciarJuego() {
  jugando = true;
  modalFin.classList.add("oculta");
  posicionInicial();
  actualizarMarcador();
  colocarManzana();
  dibujar();
  intervaloTiempo = setInterval(function () {
    tiempo++;
    actualizarMarcador();
  }, 1000);
  intervalo = setInterval(function () {
    mover();
    dibujar();
  }, 125);
}

function actualizarMarcador() {
  infoPuntuacion.textContent = puntuacion;
  infoTiempo.textContent = tiempo;
}

function terminarPartida(haGanado) {
  clearInterval(intervalo);
  clearInterval(intervaloTiempo);
  jugando = false;
  finPuntuacion.textContent = puntuacion;
  finTiempo.textContent = tiempo;

  modalFin.classList.remove("oculta");

  if (haGanado) {
    mensajeFinal.textContent = "VICTORIA";
  } else {
    mensajeFinal.textContent = "DERROTA";
  }

  alTerminarPartida(puntuacion, tiempo);
}

function cambiarDireccion(nuevaDireccion) {
  if (nuevaDireccion.x === -direccion.x && nuevaDireccion.y === -direccion.y) {
    return;
  }

  siguienteDireccion = nuevaDireccion;
}

/* METODOS PARA DIBUJAR LA SERPIENTE Y LA MANZANA */

function dibujar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarManzana();
  dibujarSerpiente();
}

function dibujarManzana() {
  const x = manzana.x * TAMANO_CASILLA;
  const y = manzana.y * TAMANO_CASILLA;

  ctx.fillStyle = COLOR_MANZANA;
  ctx.fillRect(x + 4, y + 6, 17, 17);

  ctx.fillStyle = COLOR_BRILLO;
  ctx.fillRect(x + 7, y + 9, 4, 4);

  ctx.fillStyle = COLOR_HOJA;
  ctx.fillRect(x + 12, y + 1, 5, 5);
}

function dibujarSerpiente() {
  ctx.fillStyle = COLOR_CUERPO;
  for (const casilla of serpiente) {
    ctx.fillRect(
      casilla.x * TAMANO_CASILLA + 1,
      casilla.y * TAMANO_CASILLA + 1,
      TAMANO_CASILLA - 2,
      TAMANO_CASILLA - 2,
    );
  }

  const cabeza = serpiente[0];
  const x = cabeza.x * TAMANO_CASILLA;
  const y = cabeza.y * TAMANO_CASILLA;

  ctx.fillStyle = COLOR_CABEZA;
  ctx.fillRect(x + 1, y + 1, TAMANO_CASILLA - 2, TAMANO_CASILLA - 2);

  dibujarOjos(x, y);
}

function dibujarOjos(x, y) {
  const centro = 12;
  const adelante = 4;
  const separacion = 5;
  const lado = { x: direccion.y, y: direccion.x };

  const frenteX = x + centro + direccion.x * adelante;
  const frenteY = y + centro + direccion.y * adelante;

  ctx.fillStyle = COLOR_OJOS;
  ctx.fillRect(frenteX + lado.x * separacion - 2, frenteY + lado.y * separacion - 2, 4, 4);
  ctx.fillRect(frenteX - lado.x * separacion - 2, frenteY - lado.y * separacion - 2, 4, 4);
}