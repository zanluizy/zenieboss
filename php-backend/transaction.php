<?php
// Include database connection
include 'db.php';

// Fetch products from the database to populate the dropdown
$product_sql = "SELECT id, name FROM products";
$product_result = $conn->query($product_sql);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $product_id = $_POST['product_id'];
    $type = $_POST['type'];
    $quantity = $_POST['quantity'];

    // Insert transaction into the database
    $sql = "INSERT INTO transactions (product_id, type, quantity) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isi", $product_id, $type, $quantity);

    if ($stmt->execute()) {
        echo "Transaction recorded successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Update the product quantity based on transaction type
    if ($type == 'addition') {
        $update_sql = "UPDATE products SET quantity = quantity + ? WHERE id = ?";
    } else {
        $update_sql = "UPDATE products SET quantity = quantity - ? WHERE id = ?";
    }

    $update_stmt = $conn->prepare($update_sql);
    $update_stmt->bind_param("ii", $quantity, $product_id);
    $update_stmt->execute();

    $stmt->close();
    $update_stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>New Transaction</title>
</head>
<body>
    <h2>Record New Transaction</h2>
    <form method="post" action="">
        <label>Product:</label>
        <select name="product_id" required>
            <?php while ($row = $product_result->fetch_assoc()): ?>
                <option value="<?php echo $row['id']; ?>"><?php echo $row['name']; ?></option>
            <?php endwhile; ?>
        </select><br><br>

        <label>Transaction Type:</label>
        <select name="type" required>
            <option value="addition">Addition</option>
            <option value="deduction">Deduction</option>
        </select><br><br>

        <label>Quantity:</label>
        <input type="number" name="quantity" required><br><br>

        <input type="submit" value="Record Transaction">
    </form>
</body>
</html>
