<?php
session_start();

if(isset($_SESSION['email'])) {
    $db = new mysqli('localhost', 'root', 'root', 'whiskerweb');

    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    // Get the comment from the request
    $data = json_decode(file_get_contents('php://input'), true);
    $comment_blog1 = $data['comment_blog1'];
    $comment_blog2 = $data['comment_blog2'];

    // Get the current comments
    $stmt = $db->prepare("SELECT comments_blog1, comments_blog2 FROM Accounts WHERE email = ?");
    $stmt->bind_param("s", $_SESSION['email']);
    $stmt->execute();
    $stmt->bind_result($current_comments_blog1, $current_comments_blog2);
    $stmt->fetch();
    $stmt->close();

    // Append the new comments to the current ones
    $comments_blog1 = $current_comments_blog1 . ', ' . $comment_blog1;
    $comments_blog2 = $current_comments_blog2 . ', ' . $comment_blog2;

    // Update the comments
    $stmt = $db->prepare("UPDATE Accounts SET comments_blog1 = ?, comments_blog2 = ? WHERE email = ?");
    $stmt->bind_param("sss", $comments_blog1, $comments_blog2, $_SESSION['email']);
    $stmt->execute();
    $stmt->close();

    $db->close();

    echo "Comments updated";
} else {
    echo "Not logged in";
}
?>