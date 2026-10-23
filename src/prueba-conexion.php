<?php
require __DIR__ . '/conexion.php';

try {
    $coleccion = obtenerColeccion();
    $total = $coleccion->countDocuments();
    echo "Conexión correcta. Partidas guardadas: $total\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}