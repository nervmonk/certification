const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket, req) => {
  const clientPort = req.socket.remotePort;
  console.log(`New client connected from port: ${clientPort}`);

  socket.on("message", (message) => {
    console.log(`Received from port ${clientPort}: ${message}`);
    const messageWithPort = `${clientPort}: ${message}`

    if (message instanceof Buffer) {
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageWithPort.toString());
        }
      });
    } else {
      console.log("Received text data");
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageWithPort);
        }
      });
    }
  });

  socket.on("close", () => {
    console.log(`Client from port ${clientPort} disconnected`);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
