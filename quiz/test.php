<?php
session_start();
$dbLocation = "localhost";
$dbUsername = "root";
$dbPassword = "root";
$dbName = "quiz";
$db = mysqli_connect($dbLocation, $dbUsername, $dbPassword, $dbName);

$email = $_POST['email'];
$fname = $_POST['first_name'];
$lname = $_POST['last_name'];
$phone = $_POST['phone'];
$address = $_POST['address'];

$sql = "SELECT * FROM Customers WHERE email='$email'";
$result = $db->query($sql);

if ($result->num_rows > 0) {
    header('Location: index.html?message=Email already registered.');
    exit;
} else {
    $sql = "INSERT INTO Customers (email, first_name, last_name, phone, address)
    VALUES ('$email', '$fname', '$lname', '$phone', '$address')";

    if ($db->query($sql) === TRUE) {
        header('Location: index.html?message=New record created successfully.');
        exit;
    } else {
        header('Location: index.html?message=Error: ' . urlencode($sql . "<br>" . $db->error));
        exit;
    }
}

mysqli_close($db);
?>