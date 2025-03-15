<?php
session_start();

// Database connection
$conn = new mysqli("localhost", "root", "", "login_db");

// Check connection
if ($conn->connect_error) {
    die("DB connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    if (!empty($email) && !empty($password)) {
        // Prepare and execute query
        $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
        if ($stmt) {
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows > 0) {
                $stmt->bind_result($id, $name, $hashed_password);
                $stmt->fetch();

                // Verify password
                if (password_verify($password, $hashed_password)) {
                    $_SESSION['user_id'] = $id;
                    $_SESSION['user_name'] = $name;
                    header("Location: dashboard.php");
                    exit();
                } else {
                    $_SESSION['error'] = "Invalid email or password.";
                }
            } else {
                $_SESSION['error'] = "User not found.";
            }
            $stmt->close();
        } else {
            $_SESSION['error'] = "Database error: " . $conn->error;
        }
    } else {
        $_SESSION['error'] = "Please enter email and password.";
    }
}

$conn->close();
?>