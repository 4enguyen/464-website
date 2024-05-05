<?php
session_start();
$conn = new mysqli('localhost', 'root', 'root', 'whiskerweb');

if (mysqli_connect_error()) {
  die("Connection failed: " . mysqli_connect_error());
}

if(isset($_POST['email'], $_POST['password'])) {
  $email = $_POST['email'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM Accounts WHERE email='$email'";
  $result = mysqli_query($conn, $sql);

  if(mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    if ($password == $user['password']) {
      $_SESSION['email'] = $email;
      header('Location: account.html');
      exit;
    } else {
      header('Location: account.html?message=Error: Invalid email or password.');
      exit;
    }
  } else {
    header('Location: account.html?message=Error: Invalid email or password.');
    exit;
  }
} else {
  header('Location: account.html?message=Error: Form data not received.');
  exit;
}

mysqli_close($conn);
?>