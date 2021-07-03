import { commentActionTypes } from "./discussion.actiontype";

const initalState = {
  loading: false,
  loadingComment: false,
  content: [],
  comments: [],
  allUsersInRoom: [],
  startPagination: false,
  currentPage: 1,
  totalEntries: 0,
};

export const ContentDiscussion = (state = initalState, action = {}) => {
  switch (action.type) {
    case commentActionTypes.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case commentActionTypes.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    case commentActionTypes.REQUEST_COMMENT:
      return {
        ...state,
        loadingComment: true,
      };

    case commentActionTypes.COMPLETE_COMMENT:
      return {
        ...state,
        loadingComment: false,
      };

    case commentActionTypes.GET_CONTENT:
      return {
        ...state,
        content: action.data,
      };

    case commentActionTypes.GET_COMMENTS:
      const { comments, totalEntries, concat } = action.data;
      return {
        ...state,
        currentPage: concat ? state.currentPage + 1 : 1,
        comments: concat ? [...state.comments, ...comments] : comments,
        totalEntries
      };

    case commentActionTypes.ADD_NEW_COMMENT:
      if (action.data.parent_id) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.data.parent_id) {
              comment.childComment = [action.data, ...comment.childComment];
            }
            return comment;
          }),
        };
      } else {
        return {
          ...state,
          comments: [action.data, ...state.comments],
        };
      }

    case commentActionTypes.UPDATE_COMMENT:
      if (action.data.parent_id) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.data.parent_id) {
              comment.childComment = comment.childComment.map((child) => {
                if (child.id === action.data.id) {
                  child.comment = action.data.comment;
                  child.created_at = action.data.created_at;
                  child.updated_at = action.data.updated_at;
                }
                return child;
              });
            }
            return comment;
          }),
        };
      } else {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.data.id) {
              comment.comment = action.data.comment;
              comment.created_at = action.data.created_at;
              comment.updated_at = action.data.updated_at;
            }
            return comment;
          }),
        };
      }

    case commentActionTypes.ALL_USERS_IN_ROOM:
      let object = {};
      let finalUsers = [];
      for (let user of action.data) {
        // making sure it does not have any duplicate ids
        if (!object[user.uid]) {
          object[user.uid] = user;
        }
      }

      for (const [key, value] of Object.entries(object)) {
        finalUsers.push(value);
      }

      return {
        ...state,
        allUsersInRoom: finalUsers,
      };

    case commentActionTypes.DELETE_COMMENT:
      if (action.data.parent_id) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.data.parent_id) {
              comment.childComment = comment.childComment.filter(
                (child) => child.id !== action.data.id
              );
              return comment;
            }
            return comment;
          }),
        };
      } else {
        return {
          ...state,
          comments: state.comments.filter(
            (comment) => comment.id !== action.data.id
          ),
        };
      }

    case commentActionTypes.EMPTY_ALL_DATA:
      return {
        ...state
      };

    case commentActionTypes.CHANGE_COMMENT_REACTION:
      if (action.data.parent_id) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.data.parent_id) {
              comment.childComment = comment.childComment.map((child) => {
                if (child.id === action.data.id) {
                  child.liked = action.data.liked;
                  child.total_likes = action.data.total_likes
                }
                return child;
              });
            }
            return comment;
          }),
        };
      } else {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.data.id) {
              comment.liked = action.data.liked;
              comment.total_likes = action.data.total_likes
            }
            return comment;
          }),
        };
      }

      case commentActionTypes.UPDATE_COMMENT_COUNT:
        if (action.data.parent_id) {
          return {
            ...state,
            comments: state.comments.map((comment) => {
              if (comment.id === action.data.parent_id) {
                comment.childComment = comment.childComment.map((child) => {
                  if (child.id === action.data.id) {
                    child.total_likes = action.data.total_likes
                  }
                  return child;
                });
              }
              return comment;
            }),
          };
        } else {
          return {
            ...state,
            comments: state.comments.map((comment) => {
              if (comment.id === action.data.id) {
                comment.total_likes = action.data.total_likes
              }
              return comment;
            }),
          };
        }

    case commentActionTypes.CHANGE_DISCUSSION_CONTENT_REACTION:
      return {
        ...state,
        content: state.content.map(c => {
          if (c.id === action.data.id) {
            return {
              ...c,
              liked: action.data.liked,
              total_likes: action.data.total_likes
            }
          }
          return c;
        })
      }

    case commentActionTypes.SEND_UPDATED_CONTENT_LIKE_COUNT:
      return {
        ...state,
        content: state.content.map(c => {
          if (c.id === action.data.id) {
            return {
              ...c,
              total_likes: action.data.total_likes
            }
          }
          return c;
        })
      }

    default:
      return state;
  }
};