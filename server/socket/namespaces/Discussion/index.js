const { isAuthenticated } = require("./../../utils/isAuthenticated");
const { discussionNsps } = require("./constants/discussionNampaces");
const DiscussionRedis = require("./redis");
const events = require('./events')

let nsp;

const getRoomName = (room) => {
  if (!room) return;
  let nspTitle = discussionNsps.nspPrefix;
  return `${nspTitle}:${room}`;
};

const onConnection = (socket) => {
  let user = socket.currentConnectedUser;
  let socketId = socket.id;
  const { content_slug } = socket.handshake.query;
  let roomName = getRoomName(content_slug); // getting room name with discussion prefix
  if (!roomName) return;

  socket.on(discussionNsps["wsEvents"]["joinRoom"], async () => {
    try {
      await socket.join(roomName);
      await DiscussionRedis.addNewUserToRoom(socketId, roomName, user);
      let allUsersInRoom = await DiscussionRedis.getAllUsersInRoom(roomName);
      nsp.to(roomName).emit(discussionNsps['wsEvents']['allUsersInRoom'], {
        allUsersInRoom,
        newUser: user,
      });
    } catch (error) {
      console.log(`Socket.on Error - ${discussionNsps["wsEvents"]["joinRoom"]} namespace `, error);
    }
  });

  socket.on(discussionNsps['wsEvents']['addNewComment'], events.addNewComment(socket, roomName))
  socket.on(discussionNsps['wsEvents']['updateComment'], events.updateComment(socket, roomName))
  socket.on(discussionNsps['wsEvents']['deleteComment'], events.deleteComment(socket, roomName))
  socket.on(discussionNsps['wsEvents']['updatedCommentCount'], events.updateCommentCount(socket, roomName))

  socket.on("disconnect", async () => {
    try {
      await DiscussionRedis.removeUserFromRoom(roomName, socketId);
      let allUsersInRoom = await DiscussionRedis.getAllUsersInRoom(roomName);
      nsp.to(roomName).emit(discussionNsps['wsEvents']['allUsersInRoom'], {
        allUsersInRoom,
        leftUser: user,
      });
    } catch (error) {
      console.log(`Socket.on Disconnect - ${discussionNsps["wsEvents"]["joinRoom"]} namespace `, error);
    }
  });
};

exports.createNamespace = (io) => {
  exports.io = io;
  nsp = io
    .of("/discussion")
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
