import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { MdPlayArrow, MdAdd, MdArrowBack } from "react-icons/md";
import { commentActionTypes } from "./../src/store/discussion/discussion.actiontype";

import useDimensions from "./../src/hooks/useDimensions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import CommentComponent from "./../src/components/CommentComponent";
import { discussionNsps } from "./../src/sockets/namespaces/Discussion/constants/discussionNamespaces";
import { soundUrls } from "./../src/utils/soundUrls";
import { commentService } from "./../src/services";
import { ReactToastifyEmitter } from "./../src/utils/reactToasify";
import { prevNextFinder } from "./../src/utils/utils";

let editorWrapperClassName = "discussion-comment-box-wrapper-class";

const MyEditor = dynamic(
  () => import("./../src/layouts/components/Discussion/Editor"),
  { ssr: false }
);
const ConfirmDeleteModal = dynamic(
  () => import("./../src/components/Modal/ConfirmDelete"),
  { ssr: false }
);


const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/${discussionNsps.nspPrefix}`;
let socket;

import "./../src/assets/styles/subject/subjectGroup.module.css";

let queryParams = {
  pageSize: 10,
  pageNo: 1,
  sort: "desc",
  pattern: "",
};

const SubjectDiscussion = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.ContentDiscussion.comments);

  const currentPage = useSelector(
    (state) => state.ContentDiscussion.currentPage
  );
  const totalEntries = useSelector(
    (state) => state.ContentDiscussion.totalEntries
  );
  const loadingComment = useSelector(
    (state) => state.ContentDiscussion.loadingComment
  );

  const auth = useSelector((state) => state.Auth, shallowEqual);

  const [loading, setLoading] = useState(false);

  const discussionRef = useRef();
  const size = useDimensions(discussionRef);

  const router = useRouter();

  const [currentParentCommentId, setCurrentParentCommentId] = useState(0);
  const [currentChildCommentId, setCurrentChildCommentId] = useState(0);

  const [replyingToComments, setReplyingToComments] = useState([]);
  const [currentEditingComment, setCurrentEditingComment] = useState(0);
  const [currentCommentEditingData, setCurrentCommentEditingData] =
    useState("");
  const [editComment, setEditComment] = useState([]);


  const playSound = () => {
    try {
      const newCommnetSound = new Audio(soundUrls.discussion.comment);
      newCommnetSound.play();
    } catch (error) {}
  };

  const submittedValue = async (commentObj) => {
    
  };

  const replyToComment = ({ id }) => {
    
  };

  const editingComment = ({ id, comment }) => {
    
  };

  const replyRef = useRef();
  const size21 = useDimensions(replyRef);

  const profileRef = useRef();
  const size22 = useDimensions(profileRef);

  let newSize = {
    ...size,
    width: size21.width - size22.width - 10,
  };

  const childSubmittedVale = (childCommentObj) => {
    
  };

  const handleMouseEnter = (id) => {
    setCurrentParentCommentId(id);
  };

  const handleMouseLeave = () => {
    setCurrentParentCommentId(0);
  };

  const handleMouseEnter1 = (id) => {
    setCurrentChildCommentId(id);
  };

  const handleMouseLeave1 = () => {
    setCurrentChildCommentId(0);
  };

  // Delete Comment Modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentActiveDeleteComment, setCurrentActiveDeleteComment] = useState(
    {}
  );

  const onHide = () => {
    setDeleteModal(false);
  };

  const deleteComment = (comment) => {
    
  };

  const handleDeleteComment = async (comment) => {

  };

  const onScroll = async (e) => {
    
  };

  const handleHeartAction = async (data) => {
    
  };



  // left side chat
  const [tabStatus, setTabStatus] = useState({
    subject: true,
    group: true,
    dm: true,
  });

  const handleTabStatus = (key) => {
    setTabStatus({...tabStatus, [key]: !tabStatus[key]})
  }

  return (
    <div className="sb-container">
      <div className="sb-header">
        <div className="sb-left-actions">
          <div className="header sub-top-header">
            <div className="icon">
              <MdArrowBack/>
            </div>
            <div className="text">
              Engineering Mechanics
            </div>
          </div>
          {/* Subject dropdown */}
          <div className="message-type">
            <div className="header collapsable-header">
              <div className="title-action-group" onClick={() => handleTabStatus('subject')}>
                <div className={tabStatus.subject ? 'rotate-icon icon' : 'icon'}>
                  <MdPlayArrow />
                </div>
                <div className="name">Subjects</div>
              </div>
              <div className="title-action-btn">
              </div>
            </div>
            <div className={tabStatus.subject ? 'show-body body' : 'hide-body body'}>
              <ul>
                {
                  Array.from(Array(5), (e, i) => {
                    return (
                      <li key={i}>
                        <span className="hash">#</span><a href="#">Subject {i + 1}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          {/* Subject dropdown */}
          <div className="message-type">
            <div className="header collapsable-header">
              <div className="title-action-group" onClick={() => handleTabStatus('group')}>
                <div className={tabStatus.group ? 'rotate-icon icon' : 'icon'}>
                  <MdPlayArrow />
                </div>
                <div className="name">Groups</div>
              </div>
              <div className="title-action-btn">
                <MdAdd />
              </div>
            </div>
            <div className={tabStatus.group ? 'show-body body' : 'hide-body body'}>
              <ul>
                {Array.from(Array(5), (e, i) => {
                  return (
                    <li key={i}>
                      <span className="hash">#</span><a href="#">Group {i + 1}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Subject dropdown */}
          <div className="message-type">
            <div className="header collapsable-header">
              <div className="title-action-group" onClick={() => handleTabStatus('dm')}>
                <div className={tabStatus.dm ? 'rotate-icon icon' : 'icon'}>
                  <MdPlayArrow />
                </div>
                <div className="name">DMs</div>
              </div>
              <div className="title-action-btn">
                <MdAdd />
              </div>
            </div>
            <div className={tabStatus.dm ? 'show-body body' : 'hide-body body'}>
              <ul>
                {Array.from(Array(25), (e, i) => {
                  return (
                    <li key={i}>
                      <a href="#" className="user-status">
                        <span className="dot"></span>DM {i + 1}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="sb-right-actions">
          <div className="header sub-top-header">back button, and heading</div>
          <div className="body">
          <div className="discussion-wrapper-main">
            <div className="discussion-wrapper-main-body">
              {loadingComment && comments.length > 0 && (
                <div className="more-comment-loader">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
              <div
                className="discussion-wrapper-inner-body"
                onScroll={onScroll}
                ref={discussionRef}
              >
                {Array.isArray(comments) &&
                  comments.map((comment) => {
                    return (
                      <CommentComponent
                        comment={comment}
                        key={comment.id}
                        className="single-comment"
                        replyRef={replyRef}
                        profileRef={profileRef}
                        newSize={newSize}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        handleMouseEnter1={handleMouseEnter1}
                        handleMouseLeave1={handleMouseLeave1}
                        replyToComment={replyToComment}
                        replyingToComments={replyingToComments}
                        editingComment={editingComment}
                        editComment={editComment}
                        cPCommentId={currentParentCommentId}
                        cCCommentId={currentChildCommentId}
                        deleteComment={deleteComment}
                        childSubmittedVale={childSubmittedVale}
                        auth={auth}
                        handleHeartAction={handleHeartAction}
                      />
                    );
                  })}
                {Array.isArray(comments) &&
                  comments.length === 0 &&
                  !loadingComment && (
                    <div className="no-comments">
                      <div className="image">
                        <img src="https://image.flaticon.com/icons/png/512/619/619054.png" />
                      </div>
                      <div className="text">
                        This is very beginning of the discussion, please be very
                        simple and explainatory.
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <div className="discussion-footer">
              <MyEditor
                editorWrapperClassName={editorWrapperClassName}
                submittedValue={(data) => {
                  let commentObj = {
                    update: data.update,
                    content_id: content.id,
                    parent_id: null,
                    comment: data.comment,
                  };
                  submittedValue(commentObj);
                }}
                size={size}
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SubjectDiscussion.getInitialProps = async ({ store, query, req }) => {
  try {
    const isServer = !!req;
    await store.dispatch({
      type: commentActionTypes.WATCH_GET_COMMENTS_BY_CONTENT_SLUG,
      data: {
        content_slug: 'engg-mech-chapter-3-content-1',
        query: queryParams,
        cookie: isServer ? req.headers.cookie : null,
      },
    });
    return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};

export default SubjectDiscussion;
