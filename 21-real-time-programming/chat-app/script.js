const socket = new WebSocket("ws://localhost:8080");

const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

socket.addEventListener("message", (event) => {
  if (event.data instanceof Blob) {
    console.log("instance of Blob");
    
    const reader = new FileReader();
    reader.onload = () => {
      const message = reader.result;
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
    reader.readAsText(event.data);
  } else {
    console.log("else block");
    const messageElement = document.createElement("div");
    messageElement.textContent = event.data;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});

sendButton.addEventListener("click", () => {
  const message = messageInput.value;

  if (message) {
    socket.send(message);
    messageInput.value = "";
  }
});

messageInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});
