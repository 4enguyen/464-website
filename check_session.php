<?php
session_start();

if(isset($_SESSION['email'])) {
  echo "Click to log out of " . $_SESSION['email'];
} else {
  echo "Not logged in";
}
?>