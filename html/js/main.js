const pantallaInicio = document.getElementById("inicio");
const pantallaJuego = document.getElementById("juego");
const formInicio = document.getElementById("form-inicio");
const inputNombre = document.getElementById("nombre");
const textoError = document.getElementById("error");
const infoNombre = document.getElementById("info-nombre");
const finNombre = document.getElementById("fin-nombre");
const volverJugar = document.getElementById("volver");
const textoErrorBD = document.getElementById("fin-error");
const listaTop5 = document.getElementById("listatop5");
const volverMenu = document.getElementById("menuPrincipal");

let nombreJugador = "";
let promesaGuardado = null; //Esta promesa existe por si una persona le da muy rapido a "Volver al menú" y se hace antes la petición get del top5 que el post de guardar partida

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
  if (!jugando) {
    return;
  }

  switch (event.key) {
    case "ArrowUp":
    case "W":
    case "w":
      cambiarDireccion({ x: 0, y: -1 });
      break;
    case "ArrowDown":
    case "S":
    case "s":
      cambiarDireccion({ x: 0, y: 1 });
      break;
    case "ArrowLeft":
    case "A":
    case "a":
      cambiarDireccion({ x: -1, y: 0 });
      break;
    case "ArrowRight":
    case "D":
    case "d":
      cambiarDireccion({ x: 1, y: 0 });
      break;
  }
});

volverJugar.addEventListener("click", function () {
  textoErrorBD.classList.add("oculta");
  iniciarJuego();
});


volverMenu.addEventListener("click", async function () {
  textoErrorBD.classList.add("oculta");
  pantallaInicio.classList.remove("oculta");
  pantallaJuego.classList.add("oculta");
  await promesaGuardado;
  mostrarTop5();
});


async function alTerminarPartida(puntos, segundos) {
  promesaGuardado = guardarPartida(nombreJugador, puntos, segundos);
  const guardado = await promesaGuardado;
  if (!guardado) {
    textoErrorBD.classList.remove("oculta");
  }
}

function llenarLista(mensaje) {
  const elemento = document.createElement("li");
  elemento.textContent = mensaje;
  listaTop5.appendChild(elemento);
}

async function mostrarTop5() {
  listaTop5.textContent = "";
  const partidas = await recibirPartidas();

  if (partidas === null) {
    llenarLista("Error al cargar lista");
    return;
  }

  if (partidas.length === 0) {
    llenarLista("Aun no hay partidas");
    return;
  }

  let incrementable = 1;

  for (const partida of partidas) {
    const elemento = document.createElement("li");
    elemento.classList.add("top5-fila");
    const spanPosicion = document.createElement("span");
    const spanNombre = document.createElement("span");
    const spanPuntos = document.createElement("span");

    spanPosicion.textContent = incrementable;
    spanPosicion.classList.add("top5-posicion");
    spanNombre.textContent = partida.nombre;
    spanPuntos.textContent = partida.puntuacion;
    spanPuntos.classList.add("top5-puntos");

    elemento.appendChild(spanPosicion);
    elemento.appendChild(spanNombre);
    elemento.appendChild(spanPuntos);
    listaTop5.appendChild(elemento);

    incrementable++;
  }
}

mostrarTop5();
