import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import socketIOClient from "socket.io-client";
import { commentActionTypes } from "./../src/store/discussion/discussion.actiontype";
import { contentActionTypes } from "./../src/store/content/content.actiontype";
import useDimensions from "./../src/hooks/useDimensions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import DiscussionLayout from "./../src/layouts/Discussion";
import CommentComponent from "./../src/components/CommentComponent";
import { discussionNsps } from "./../src/sockets/namespaces/Discussion/constants/discussionNamespaces";
import { soundUrls } from "./../src/utils/soundUrls";
import { commentService } from "./../src/services";
import { ReactToastifyEmitter } from "./../src/utils/reactToasify";
import { prevNextFinder } from './../src/utils/utils';

const MyEditor = dynamic(
  () => import("./../src/layouts/components/Discussion/Editor"),
  { ssr: false }
);
const ConfirmDeleteModal = dynamic(
  () => import("./../src/components/Modal/ConfirmDelete"),
  { ssr: false }
);

let editorWrapperClassName = "discussion-comment-box-wrapper-class";
const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/${discussionNsps.nspPrefix}`;

let socket;

let queryParams = {
  pageSize: 10,
  pageNo: 1,
  sort: "desc",
  pattern: "",
};

const Discussion = () => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.ContentDiscussion.comments);
  const content = useSelector((state) => state.ContentDiscussion.content[0],shallowEqual);
  const currentPage = useSelector((state) => state.ContentDiscussion.currentPage);
  const totalEntries = useSelector((state) => state.ContentDiscussion.totalEntries);
  const loadingComment = useSelector((state) => state.ContentDiscussion.loadingComment);

  const auth = useSelector((state) => state.Auth, shallowEqual);

  const [loading, setLoading] = useState(false);

  const discussionRef = useRef();
  const size = useDimensions(discussionRef);

  const router = useRouter();
  const {
    chapter_slug,
    subject_slug,
    content_slug
  } = router.query;

  const [currentParentCommentId, setCurrentParentCommentId] = useState(0);
  const [currentChildCommentId, setCurrentChildCommentId] = useState(0);

  const [replyingToComments, setReplyingToComments] = useState([]);
  const [currentEditingComment, setCurrentEditingComment] = useState(0);
  const [currentCommentEditingData, setCurrentCommentEditingData] = useState(
    ""
  );
  const [editComment, setEditComment] = useState([]);

  // Socket connection
  useEffect(() => {
    socket = socketIOClient(ENDPOINT, {
      transports: ["websocket"],
      query: `content_slug=${content_slug.trim()}`,
    });

    socket.emit(discussionNsps.wsEvents.joinRoom);

    return () => socket.disconnect();
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on(discussionNsps.wsEvents.sendCommentToRoom, (data) => {
      dispatch({ type: commentActionTypes.ADD_NEW_COMMENT, data });
      playSound();
    });

    socket.on(discussionNsps.wsEvents.sendUpdatedCommentToRoom, (data) => {
      dispatch({ type: commentActionTypes.UPDATE_COMMENT, data });
      playSound();
    });

    socket.on(discussionNsps.wsEvents.allUsersInRoom, (data) => {
      const { allUsersInRoom, newUser, leftUser } = data; // show newUser/leftUser in toast msg
      dispatch({
        type: commentActionTypes.ALL_USERS_IN_ROOM,
        data: allUsersInRoom,
      });
      if (newUser) {
        const { first_name, last_name } = newUser;
        ReactToastifyEmitter(
          `${first_name} ${last_name} has joined the discussion`,
          "bottom-left"
        );
      }
      if (leftUser) {
        const { first_name, last_name } = leftUser;
        ReactToastifyEmitter(
          `${first_name} ${last_name} has left the discussion`,
          "bottom-left"
        );
      }
    });

    socket.on(discussionNsps.wsEvents.removeDeletedComment, (comment) => {
      dispatch({
        type: commentActionTypes.DELETE_COMMENT,
        data: comment,
      });
    });

    socket.on(discussionNsps.wsEvents.sendUpdatedCommentCount, (comment) => {
      dispatch({
        type: commentActionTypes.UPDATE_COMMENT_COUNT,
        data: comment,
      });
    });

    return () => dispatch({type: commentActionTypes.EMPTY_DATA})
  }, []);

  const playSound = () => {
    try {
      const newCommnetSound = new Audio(soundUrls.discussion.comment);
      newCommnetSound.play();
    } catch (error) {}
  };

  const submittedValue = async (commentObj) => {
    setLoading(true);
    if (!commentObj.update) {
      try {
        let {
          data: { data },
        } = await commentService.addComment(commentObj);
        socket.emit(
          discussionNsps.wsEvents.addNewComment,
          data,
          ({ data, process }) => {
            if (process) {
              dispatch({ type: commentActionTypes.ADD_NEW_COMMENT, data });
            }
            setReplyingToComments([]);
            setLoading(false); // for showing loader to users
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      let {
        data: { data },
      } = await commentService.updateComment(commentObj, commentObj.comment_id);
      socket.emit(
        discussionNsps.wsEvents.updateComment,
        data,
        ({ data, process }) => {
          if (process) {
            dispatch({ type: commentActionTypes.UPDATE_COMMENT, data });
          }
          setEditComment([]);
          setLoading(false); // for showing loader to users
        }
      );
    }
  };

  const replyToComment = ({ id }) => {
    let indexIs = replyingToComments.indexOf(id);
    if (indexIs === -1) {
      setReplyingToComments([id]);
    } else {
      setReplyingToComments(replyingToComments.filter((r) => r !== id));
    }
  };

  const editingComment = ({ id, comment }) => {
    setCurrentCommentEditingData(comment);
    setCurrentEditingComment(id);
    let indexIs = editComment.indexOf(id);
    if (indexIs === -1) {
      setEditComment([id]);
    } else {
      setEditComment(editComment.filter((r) => r !== id));
    }
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
    submittedValue({
      ...childCommentObj,
      content_id: content.id,
    });
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
    setCurrentActiveDeleteComment(comment);
    setDeleteModal(true);
  };

  const handleDeleteComment = async (comment) => {
    try {
      await commentService.deleteCommentById(content.id, comment.id);
      setDeleteModal(false);
      dispatch({
        type: commentActionTypes.DELETE_COMMENT,
        data: comment,
      });
      socket.emit(discussionNsps.wsEvents.deleteComment, comment);
    } catch (error) {
      console.log(error);
    }
  };

  const onScroll = async (e) => {
    if (comments.length > 0 && e.target.scrollHeight - Math.abs(e.target.scrollTop) === size.height && totalEntries > comments.length) {
      let query = {
        ...queryParams,
        pageNo: currentPage
      }
      await dispatch({
        type: commentActionTypes.WATCH_GET_COMMENTS_BY_CONTENT_SLUG,
        data: {
          content_slug,
          query,
          concat: true
        },
      });
    }
  };

  const handleHeartAction = async (data) => {
    const {id} = data
    let dataObj = {
      id,
      liked: false
    }
    try {
      let {data: {data: {liked, total_likes}}} = await commentService.likeComment(dataObj);
      let obj = {
        id,
        parent_id: data.parent_id,
        liked,
        total_likes
      }
      dispatch({type: commentActionTypes.CHANGE_COMMENT_REACTION, data: obj});
      socket.emit(discussionNsps.wsEvents.updatedCommentCount, {id, parent_id: data.parent_id, total_likes });
    } catch (error) {
      console.log(error)
    }
  }

    // handle Chapter list, content List for prev, next functionality
    const chaptersBasic = useSelector((state) => state.Content.chaptersBasic);
    const contentsBasic = useSelector((state) => state.Content.contentsBasic);

    const [chapterPrevNexActions, setChapterPrevNexActions] = useState({prev: null, next: null});
    const [contentPrevNexActions, setContentPrevNexActions] = useState({prev: null, next: null});
    
    useEffect(() => {
      async function ChapterContentBasicDetails() {
        if (chaptersBasic.length === 0) {
          dispatch({
            type: contentActionTypes.WATCH_GET_DISCUSSION_CHAPTERS,
            data: {
              subject_slug,
              chapter_slug
            },
          });
        }
        if (contentsBasic.length === 0) {
          dispatch({
            type: contentActionTypes.WATCH_GET_DISCUSSION_CONTENT,
            data: {
              chapter_slug,
              content_type: 'all'
            },
          });
        }
      }
      ChapterContentBasicDetails()
    }, [router])

    useEffect(() => {
      // let prevNextChaptersResult = prevNextFinder(chaptersBasic, 'slug', chapter_slug)
      let prevNextContentResult = prevNextFinder(contentsBasic, 'slug', content_slug)

      // let chapter = {
      //   prev: prevNextChaptersResult.prev ? {subject_slug, chapter_slug: prevNextChaptersResult.prev.slug} : null,
      //   next: prevNextChaptersResult.next ? {subject_slug, chapter_slug: prevNextChaptersResult.next.slug} : null
      // }

      let content = {
        prev: prevNextContentResult.prev ? { subject_slug, chapter_slug, content_slug: prevNextContentResult.prev.slug } : null,
        next: prevNextContentResult.next ? { subject_slug, chapter_slug, content_slug: prevNextContentResult.next.slug } : null,
      }

      // setChapterPrevNexActions({
      //   ...chapterPrevNexActions,
      //   ...chapter
      // })

      setContentPrevNexActions({
        ...contentPrevNexActions,
        ...content
      })
    }, [router, 
    // chaptersBasic, 
    contentsBasic])

  return (
    <DiscussionLayout socket={socket} contentUrls={contentPrevNexActions}>
      <div className="discussion-wrapper-bodysadf">
        <div className="discussion-wrapper-body1">
          {(loadingComment && comments.length > 0) && (
            <div className="more-comment-loader">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          <div
            className="discussion-wrapper-body2"
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
            {Array.isArray(comments) && comments.length === 0 && !loadingComment && (
              <div className="no-comments">
                <div className="image">
                  <img src="https://image.flaticon.com/icons/png/512/619/619054.png" />
                </div>
                <div className="text">This is very beginning of the discussion, please be very simple and explainatory.</div>
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
      <ConfirmDeleteModal
        showDeleteModal={deleteModal}
        onHide={onHide}
        comment={currentActiveDeleteComment}
        deleteComment={handleDeleteComment}
      />
    </DiscussionLayout>
  );
};

Discussion.getInitialProps = async ({ store, query, req }) => {
  try {
    const isServer = !!req;
    await store.dispatch({
      type: commentActionTypes.WATCH_GET_CONTENT_BY_CONTENT_SLUG,
      data: {
        subject_slug: query.subject_slug,
        chapter_slug: query.chapter_slug,
        content_slug: query.content_slug,
        cookie: isServer ? req.headers.cookie : null
      },
    });
    await store.dispatch({
      type: commentActionTypes.WATCH_GET_COMMENTS_BY_CONTENT_SLUG,
      data: {
        content_slug: query.content_slug,
        query: queryParams,
        cookie: isServer ? req.headers.cookie : null
      },
    });
    return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};

export default Discussion;
