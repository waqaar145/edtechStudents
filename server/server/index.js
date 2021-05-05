const http = require("http");
const redis = require("socket.io-redis");
var port = process.env.PORT || 4001;

const app = require("./server");
const config = require("./../config/config");

// Server
const server = http.createServer(app);

app.io.attach(server);
// app.io.origins([config.ORIGINS]);
app.io.adapter(
  redis({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  })
);

server.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
