
const { contentNsps } = require("./constants/contentNampaces");

const updateContentLikesCount = (nsp, roomName) => async (obj, callback) => {
  try {
    nsp.broadcast.to(roomName).emit(contentNsps.wsEvents.sendUpdatedContentLikeCount, obj)
  } catch (error) {
    console.log(error);
    callback({
      data,
      process: false
    });
  }
}

module.exports = {
  updateContentLikesCount
};
