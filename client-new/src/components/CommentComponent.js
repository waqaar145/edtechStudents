import { useState, useRef, useMemo } from "react";
import Moment from "react-moment";
import {
  MdInsertEmoticon,
  MdReply,
  MdBookmark,
  MdDelete,
  MdModeEdit,
  MdFavorite
} from "react-icons/md";
import { Media } from "react-bootstrap";
import dynamic from "next/dynamic";
const MyEditor = dynamic(
  () => import("./../../src/layouts/components/Discussion/Editor"),
  { ssr: false }
);

let editorWrapperclassNameName = "replay-to-a-comment";

const ChildCommentEditorUpdate = ({
  value,
  update,
  comment_id,
  newSize,
  childSubmittedVale,
}) => {
  const submittedValue = (data) => {
    let commentObj = {
      update: !data.update ? false : true,
      ...(comment_id && { comment_id }),
      comment: data.comment,
    };
    childSubmittedVale(commentObj);
  };

  const d = useMemo(() => {
    return (
      <MyEditor
        editorWrapperclassNameName={editorWrapperclassNameName}
        size={newSize}
        all={true}
        initValue={value}
        submittedValue={submittedValue}
        update={update}
      />
    );
  }, [newSize]);

  return <>{d}</>;
};

const CommentComponent = ({
  comment,
  className,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseEnter1,
  handleMouseLeave1,
  newSize,
  replyToComment,
  replyingToComments,
  editingComment,
  editComment,
  noReply,
  childSubmittedVale,
  deleteComment,
  cPCommentId,
  cCCommentId,
  currentCommentEditingData,
  auth,
  handleHeartAction
}) => {
  const { loggedInStatus, loggedInUser } = auth;

  const QuickActions = ({ comment }) => {
    return (
      <div className="comment-action-area">
        {!noReply && (
          <div
            className="comment-action-icons default-text-color"
            onClick={() => replyToComment(comment)}
          >
            <MdReply />
          </div>
        )}
        <div className="comment-action-icons default-text-color">
          <MdBookmark />
        </div>
        {loggedInStatus && loggedInUser.uid === comment.user_id && (
          <>
            <div
              className="comment-action-icons success-text-color"
              onClick={() => editingComment(comment)}
            >
              <MdModeEdit />
            </div>
            <div
              className="comment-action-icons danger-text-color"
              onClick={() => deleteComment(comment)}
            >
              <MdDelete />
            </div>
          </>
        )}
      </div>
    );
  };

  const showQucikActionOnChild = (comment) => {
    return <QuickActions comment={comment} />;
  };

  const ChildCommentEditor = ({ parent_id, value, update, comment_id }) => {
    const submittedValue = (data) => {
      let commentObj = {
        update: !data.update ? false : true,
        ...(parent_id && { parent_id }),
        ...(comment_id && { comment_id }),
        comment: data.comment,
      };
      childSubmittedVale(commentObj);
    };

    return (
      <MyEditor
        editorWrapperclassNameName={editorWrapperclassNameName}
        size={newSize}
        all={true}
        initValue={value}
        submittedValue={submittedValue}
        update={update}
      />
    );
  };

  return (
    <div>
      <Media
        className={`comment-action ${className}`}
        key={comment.id}
        onMouseEnter={() => {
          handleMouseEnter(comment.id);
        }}
        onMouseLeave={() => {
          handleMouseLeave(comment.id);
        }}
      >
        <img
          width={45}
          height={45}
          className="mr-3"
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Generic placeholder"
        />
        <Media.Body>
          <div className="profile-user-wrapper">
            <div className="profile-username">
              {comment.first_name} {comment.last_name}
            </div>
            <div className="time">
              <Moment format="Do MMMM, YYYY h:mm a">
                {comment.created_at}
              </Moment>
            </div>
          </div>
          <div className="profile-comment">
            {editComment.length > 0 && editComment.indexOf(comment.id) > -1 ? (
              <ChildCommentEditorUpdate
                comment_id={comment.id}
                value={comment.comment}
                update={true}
                newSize={newSize}
                childSubmittedVale={childSubmittedVale}
              />
            ) : (
              comment.comment
            )}
          </div>
          <div className="quick-actions">
            <div className={`heart ${comment.liked ? 'heart-active' : ''}`}>
              <MdFavorite onClick={() => handleHeartAction(comment)}/> 
            </div>
            <div className="total-heart">
              {comment.total_likes}
            </div>
          </div>
          {Array.isArray(replyingToComments) &&
            replyingToComments.indexOf(comment.id) > -1 && (
              <ChildCommentEditor parent_id={comment.id} update={false} />
            )}
          {Array.isArray(comment.childComment) &&
            comment.childComment.map((c) => {
              return (
                <CommentComponent
                  key={c.id}
                  comment={c}
                  className="single-comment-child"
                  noReply={true}
                  handleMouseEnter={() => {
                    handleMouseEnter1(c.id);
                  }}
                  handleMouseLeave={() => {
                    handleMouseLeave1(c.id);
                  }}
                  cPCommentId={cPCommentId}
                  cCCommentId={cCCommentId}
                  editingComment={editingComment}
                  editComment={editComment}
                  currentCommentEditingData={currentCommentEditingData}
                  childSubmittedVale={childSubmittedVale}
                  deleteComment={deleteComment}
                  auth={auth}
                  handleHeartAction={handleHeartAction}
                />
              );
            })}
        </Media.Body>
        {cCCommentId === 0 &&
          cPCommentId === comment.id &&
          showQucikActionOnChild(comment)}
        {cCCommentId > cPCommentId &&
          cCCommentId === comment.id &&
          showQucikActionOnChild(comment)}
      </Media>
    </div>
  );
};

export default CommentComponent;
