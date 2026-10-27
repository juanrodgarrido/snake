async function guardarPartida(nombre, puntos, segundos) {
  try {
    const respuesta = await fetch("php/guardar.php", {
      method: "POST",
      body: JSON.stringify({
        nombre: nombre,
        puntuacion: puntos,
        tiempo: segundos,
      }),
    });

    return respuesta.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}
