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

async function recibirPartidas(){
  try{
  const respuesta = await fetch("php/top5.php");
  if(!respuesta.ok){
    return null;
  }
  const datos = await respuesta.json();
  return datos;
  }catch(error){
    console.error(error);
    return null;
  }
}
