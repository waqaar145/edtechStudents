export const discussionNsps = {
  nspPrefix: "discussion",
  wsEvents: {
    joinRoom: "WS_JOIN_ROOM",
    addNewComment: "ADD_NEW_COMMENT",
    sendCommentToRoom: "SEND_COMMENT_TO_ROOM",
    updateComment: "UPDATE_COMMENT",
    deleteComment: "DELETE_COMMENT",
    removeDeletedComment: "REMOVE_DELETED_COMMENT",
    sendUpdatedCommentToRoom: "SEND_UPDATED_COMMENT_ROOM",
    disconnect: "DISCONNECT",
    allUsersInRoom: "WS_ALL_USERS_IN_ROOM",
    updatedCommentCount: "UPDATED_COMMENT_COUNT",
    sendUpdatedCommentCount: "SEND_UPDATED_COMMENT_COUNT",
    updateContentLikesCount: "UPDATE_CONTENT_LIKES_COUNT",
    sendUpdatedContentLikeCount: "SEND_UPDATED_CONTENT_LIKE_COUNT"
  },
};
