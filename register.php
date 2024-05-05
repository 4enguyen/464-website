<?php
session_start();
$conn = new mysqli('localhost', 'root', 'root', 'whiskerweb');

if (mysqli_connect_error()) {
  die("Connection failed: " . mysqli_connect_error());
}

if(isset($_POST['first_name'], $_POST['last_name'], $_POST['email'], $_POST['password'])) {
  $first_name = $_POST['first_name'];
  $last_name = $_POST['last_name'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM Accounts WHERE email='$email'";
  $result = mysqli_query($conn, $sql);

  if(mysqli_num_rows($result) > 0) {
    header('Location: account.html?message=Email already registered.');
    exit;
  } else {
    $sql = "INSERT INTO Accounts (first_name, last_name, email, password)
    VALUES ('$first_name', '$last_name', '$email', '$password')";
    if (mysqli_query($conn, $sql)) {
      header('Location: account.html?message=Account successfully created.');
      exit;
    } else {
      header('Location: account.html?message=Error: ' . urlencode($sql . "<br>" . mysqli_error($conn)));
      exit;
    }
  }
} else {
  header('Location: account.html?message=Error: Form data not received.');
  exit;
}
mysqli_close($conn);
?>