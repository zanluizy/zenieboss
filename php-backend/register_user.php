<?php
// Include database connection
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password for security
    $role = $_POST['role'];

    // Insert user into the database
    $sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $password, $role);

    if ($stmt->execute()) {
        echo "User registered successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register User</title>
</head>
<body>
    <h2>Register New User</h2>
    <form method="post" action="">
        <label>Username:</label>
        <input type="text" name="username" required><br><br>

        <label>Password:</label>
        <input type="password" name="password" required><br><br>

        <label>Role:</label>
        <select name="role" required>
            <option value="admin">Admin</option>
            <option value="user">User</option>
        </select><br><br>

        <input type="submit" value="Register">
    </form>
</body>
</html>
