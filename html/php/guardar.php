<?php

require __DIR__ . '/../../src/conexion.php';

function responderError($mensaje){
    http_response_code(400);
    header("Content-Type: application/json");
    echo json_encode(["ok" => false, "error" => $mensaje]);
    exit;
}

$texto = file_get_contents("php://input");
$datos = json_decode($texto, true);

if(!is_array($datos)){
    responderError("El cuerpo no es un JSON válido");
}

$nombre = $datos['nombre'] ?? "";

if(!is_string($nombre)){
    responderError("El nombre debe ser un texto");
}

$nombre = trim($nombre);

if(strlen($nombre) === 0){
    responderError("El nombre no puede estar vacío");
}

if(mb_strlen($nombre) > 10){
    responderError("El nombre no puede pasar los 10 caracteres");
}

$puntuacion = $datos['puntuacion'] ?? null;
$tiempo = $datos['tiempo'] ?? null;

if(!is_int($puntuacion)){
    responderError("La puntuación no es un número correcto");
}

if(!is_int($tiempo)){
    responderError("El tiempo no es un número correcto");
}

if($tiempo < 0){
    responderError("El tiempo no puede ser negativo");
}

if($puntuacion > 397 || $puntuacion < 0){
    responderError("La puntuación sale de los límites");
}

if($puntuacion > ($tiempo + 1) * 8){
    responderError("Puntuación imposible");
}











$coleccion = obtenerColeccion();
$coleccion->insertOne(["nombre" => $nombre, "puntuacion" => $puntuacion, "tiempo" => $tiempo]);


header("Content-Type: application/json");
echo json_encode(["ok" => true]);


