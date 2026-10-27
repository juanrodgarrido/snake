<?php

require __DIR__ . '/../../src/conexion.php';


$coleccion = obtenerColeccion();

$texto = file_get_contents("php://input");


$datos = json_decode($texto, true);

$nombre = trim($datos['nombre'] ?? "");
$puntuacion = $datos['puntuacion'] ?? 0;
$tiempo = $datos['tiempo'] ?? 0;

$coleccion->insertOne(["nombre" => $nombre, "puntuacion" => $puntuacion, "tiempo" => $tiempo]);


header("Content-Type: application/json");
echo json_encode(["ok" => true]);
