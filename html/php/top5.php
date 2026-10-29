<?php

require __DIR__ . '/../../src/conexion.php';


$coleccion = obtenerColeccion();

$resultado = $coleccion->find([], [
    "sort" => ["puntuacion" => -1, "tiempo" => 1],
    "limit" => 5,
    "projection" => ["_id" => 0]
]);

$partidas = $resultado->toArray();

header("Content-Type: application/json");
echo json_encode($partidas);