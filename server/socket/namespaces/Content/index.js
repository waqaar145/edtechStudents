const { isAuthenticated } = require("./../../utils/isAuthenticated");
const { contentNsps } = require("./constants/contentNampaces");
const events = require('./events')

let nsp;

const getRoomName = (room) => {
  if (!room) return;
  let nspTitle = contentNsps.nspPrefix;
  return `${nspTitle}:${room}`;
};

const onConnection = (socket) => {
  let user = socket.currentConnectedUser;
  let socketId = socket.id;
  const { channel_name } = socket.handshake.query;
  let roomName = getRoomName(channel_name); // getting room name with discussion prefix
  if (!roomName) return;

  socket.on(contentNsps["wsEvents"]["joinRoom"], async () => {
    try {
      await socket.join(roomName);
    } catch (error) {
      console.log(`Socket.on Error - ${contentNsps["wsEvents"]["joinRoom"]} namespace `, error);
    }
  });

  socket.on(contentNsps['wsEvents']['updateContentLikesCount'], events.updateContentLikesCount(socket, roomName))

  socket.on("disconnect", async () => {
    try {
    } catch (error) {
      console.log(`Socket.on Disconnect - ${contentNsps["wsEvents"]["joinRoom"]} namespace `, error);
    }
  });
};

exports.createNamespace = (io) => {
  exports.io = io;
  nsp = io
    .of("/content")
    .use(async (socket, next) => {
      let checkUser = await isAuthenticated(socket);
      if (checkUser) {
        next();
      } else {
        next(new Error("Authentication error"));
      }
    })
    .on("connection", onConnection);
};
