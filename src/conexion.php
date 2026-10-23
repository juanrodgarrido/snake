<?php

require __DIR__ . '/../vendor/autoload.php';

function obtenerColeccion(){
    $uri = getenv("MONGODB_URI");
    $nombreBD = getenv("MONGODB_DB");

    if ($uri === false || $nombreBD === false) {
        throw new RuntimeException('Faltan las variables MONGODB_URI o MONGODB_DB en el entorno.');
    }

    $cliente = new MongoDB\Client($uri);
    return $cliente->selectCollection($nombreBD, 'partidas');

}