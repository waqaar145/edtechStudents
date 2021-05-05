import React from "react";
import Moment from "react-moment";
import Modal from "react-bootstrap/Modal";
import Media from "react-bootstrap/Media";
import BasicButton from "./../Button/Basic";
import { MdClose } from "react-icons/md";
import "./../../assets/styles/subject/discussion/deleteConfirmbox.module.css";

const ConfirmDelete = ({ showDeleteModal, onHide, comment, deleteComment }) => {
  return (
    <Modal
      show={showDeleteModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      onHide={onHide}
    >
      <Modal.Body>
        <div className="comment-header">
          <div className="comment-header-title">Delete Comment</div>
          <div className="comment-header-action" onClick={() => onHide()}>
            <MdClose />
          </div>
        </div>
        <div className="comment-body-confirmation-text">
          Are you sure you want to delete this comment? This cannot be undone.
        </div>
        <div className="comment-content-wrapper discussion-wrapper-body">
          <Media className="comment-action single-comment-child">
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
              <div className="profile-comment">{comment.comment}</div>
            </Media.Body>
          </Media>
        </div>
        <div className="comment-main-action-area">
          <BasicButton
            title="Cancel"
            className="default-btn action-button"
            onClick={() => onHide()}
          >
            Cancel
          </BasicButton>
          <BasicButton title="Delete" className="danger-btn action-button" onClick={() => deleteComment(comment)}>
            Delete
          </BasicButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDelete;
