<?php
header('Content-Type: application/json'); // Asegura que el contenido siempre sea JSON

$servername = "autorack.proxy.rlwy.net"; // Host proporcionado por Railway
$username = "root";                       // Usuario de la base de datos
$password = "AzeHXksbCQmsHbSSZHqgvxaNvKYWKWVX"; // Contraseña de la base de datos
$dbname = "railway";                      // Nombre de la base de datos
$port = 37324;                            // Puerto proporcionado por Railway

try {
    // Establecer conexión con PDO incluyendo el puerto
    $conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Mensaje de éxito
    echo json_encode(['success' => 'Conexión exitosa a la base de datos']);
} catch (PDOException $e) {
    // En caso de error, devolver JSON con mensaje de error
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
    exit(); // Termina la ejecución si falla la conexión
}
?>
