<?php
// db.php - Database connection

$host = "localhost";
$dbname = "inventory_db";
$username = "root";  // replace with your MySQL username
$password = "";      // replace with your MySQL password

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
