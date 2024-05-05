<?php
session_start();

if(isset($_SESSION['email'])) {
    $db = new mysqli('localhost', 'root', 'root', 'whiskerweb');

    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    // Get the score from the request
    $data = json_decode(file_get_contents('php://input'), true);
    $score = $data['score'];

    // Get the current high score
    $stmt = $db->prepare("SELECT breed_high_score FROM Accounts WHERE email = ?");
    $stmt->bind_param("s", $_SESSION['email']);
    $stmt->execute();
    $stmt->bind_result($high_score);
    $stmt->fetch();
    $stmt->close();

    // If the new score is higher, update the high score
    if ($score > $high_score) {
        $stmt = $db->prepare("UPDATE Accounts SET breed_high_score = ? WHERE email = ?");
        $stmt->bind_param("is", $score, $_SESSION['email']);
        $stmt->execute();
        $stmt->close();

        $high_score = $score;
    }

    $db->close();

    echo $high_score;
} else {
    echo "Not logged in";
}
?>