
const { discussionNsps } = require("./constants/discussionNampaces");

const addNewComment = (nsp, roomName) => async (commentObj, callback) => {
  try {
    let data = commentObj;
    nsp.broadcast.to(roomName).emit(discussionNsps.wsEvents.sendCommentToRoom, data);
    callback({
      data,
      process: true
    });
  } catch (error) {
    console.log(error);
    callback({
      data,
      process: false
    });
  }
};

const updateComment = (nsp, roomName) => async (commentObj, callback) => {
  try {
    let data = commentObj;
    nsp.broadcast.to(roomName).emit(discussionNsps.wsEvents.sendUpdatedCommentToRoom, data)
    callback({
      data,
      process: true
    });
  } catch (error) {
    console.log(error);
    callback({
      data,
      process: false
    });
  }
}

const deleteComment = (nsp, roomName) => async (commentObj, callback) => {
  try {
    nsp.broadcast.to(roomName).emit(discussionNsps.wsEvents.removeDeletedComment, commentObj)
  } catch (error) {
    console.log(error);
    callback({
      data,
      process: false
    });
  }
}

const updateCommentCount = (nsp, roomName) => async (obj, callback) => {
  try {
    nsp.broadcast.to(roomName).emit(discussionNsps.wsEvents.sendUpdatedCommentCount, obj)
  } catch (error) {
    console.log(error);
    callback({
      data,
      process: false
    });
  }
}

const updateContentLikesCount = (nsp, roomName) => async (obj, callback) => {
  try {
    nsp.broadcast.to(roomName).emit(discussionNsps.wsEvents.sendUpdatedContentLikeCount, obj)
  } catch (error) {
    console.log(error);
    callback({
      data,
      process: false
    });
  }
}

module.exports = {
  addNewComment,
  updateComment,
  deleteComment,
  updateCommentCount,
  updateContentLikesCount
};
