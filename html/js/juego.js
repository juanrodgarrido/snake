const TAMANO_CASILLA = 25;
const NUM_CASILLAS = 20;

const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

let serpiente = [
  { x: 10, y: 10 }, // cabeza
  { x: 9, y: 10 },
  { x: 8, y: 10 }, // cola
];

let direccion = { x: 1, y: 0 };
let siguienteDireccion = { x: 1, y: 0 };
let manzana;
let intervalo;

function dibujar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#e40f0f";
  ctx.fillRect(
    manzana.x * TAMANO_CASILLA,
    manzana.y * TAMANO_CASILLA,
    TAMANO_CASILLA,
    TAMANO_CASILLA,
  );

  ctx.fillStyle = "#4caf50";
  for (const casilla of serpiente) {
    ctx.fillRect(
      casilla.x * TAMANO_CASILLA,
      casilla.y * TAMANO_CASILLA,
      TAMANO_CASILLA,
      TAMANO_CASILLA,
    );
  }
}

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

  const comeManzana = nuevaCabeza.x === manzana.x && nuevaCabeza.y === manzana.y;

  if(nuevaCabeza.x >= NUM_CASILLAS || nuevaCabeza.y >= NUM_CASILLAS || nuevaCabeza.x < 0 ||nuevaCabeza.y < 0){    
    terminarPartida();
    return;
  }

  if(!comeManzana){
    serpiente.pop();
  }

  if(estaEnSerpiente(nuevaCabeza)){    
    terminarPartida();
    return;
  }

  serpiente.unshift(nuevaCabeza);

  if (comeManzana) {
    colocarManzana();
  } 
}

function iniciarJuego() {
  colocarManzana();
  dibujar();
  intervalo = setInterval(function () {
    mover();
    dibujar();
  }, 125);
}

function terminarPartida(){
    clearInterval(intervalo);
}

function cambiarDireccion(nuevaDireccion) {
  if (nuevaDireccion.x === -direccion.x && nuevaDireccion.y === -direccion.y) {
    return;
  }

  siguienteDireccion = nuevaDireccion;
}
