var currentMessages = [];

function sendMessage() {
  var messageContent = document.getElementById("messageInput").value;
  var url = "counter.php?message=" + encodeURIComponent(messageContent);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updatePage([messageContent]);
    }
  };
  xhr.send();

  document.getElementById("messageInput").value = '';
  return false;
}

function getMessage() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "counter.php", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var messages = JSON.parse(xhr.responseText);
      updatePage(messages);
    }
  };
  xhr.send();
}

function updatePage(messages) {
  var messagesDiv = document.getElementById("messages");
  for (var i = 0; i < messages.length; i++) {
    if (currentMessages.indexOf(messages[i]) === -1) { // If the message is not in currentMessages
      messagesDiv.innerHTML += "<p>" + messages[i] + "</p>";
      currentMessages.push(messages[i]); // Add the message to currentMessages
    }
  }
}

getMessage();
setInterval(getMessage, 1000);