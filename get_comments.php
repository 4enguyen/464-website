<?php
session_start();

if(isset($_SESSION['email'])) {
    $db = new mysqli('localhost', 'root', 'root', 'whiskerweb');

    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    // Get the current comments
    $stmt = $db->prepare("SELECT comments_blog1, comments_blog2 FROM Accounts WHERE email = ?");
    $stmt->bind_param("s", $_SESSION['email']);
    $stmt->execute();
    $stmt->bind_result($comments_blog1, $comments_blog2);
    $stmt->fetch();
    $stmt->close();

    $db->close();

    // Return the comments
    echo json_encode(array("comments_blog1" => $comments_blog1, "comments_blog2" => $comments_blog2));
} else {
    echo "Not logged in";
}
?>