import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import useDimensions from "./../hooks/useDimensions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ContentComponent from "./../components/ContentComponent";
import {useRouter} from 'next/router';
import {
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
  AiOutlineRight,
  AiOutlineLeft,
} from "react-icons/ai";
import { ToastContainer, Zoom } from 'react-toastify';
import ContentShimmer from './../components/Shimmer/Content'
import {contentService} from './../services'
import { commentActionTypes } from "../store/discussion/discussion.actiontype";
import { discussionNsps } from "../sockets/namespaces/Discussion/constants/discussionNamespaces";

import "./../assets/styles/subject/discussion/discussion.module.css";
let showNumberOfActiveUser = 3;

const Discussion = (props) => {
  const {
    children,
    socket
  } = props

  const router = useRouter();
  const { content_slug } = router.query;

  const discussionTopRef = useRef();
  const dispatch = useDispatch();
  const size = useDimensions(discussionTopRef);
  const loading = useSelector(
    (state) => state.ContentDiscussion.loading
  );

  const contents = useSelector(
    (state) => state.ContentDiscussion.content,
    shallowEqual
  );

  const allUsersInRoom = useSelector(
    (state) => state.ContentDiscussion.allUsersInRoom,
    shallowEqual
  );

  useEffect(() => {
    if (document.getElementsByClassName("content-quick-links-wrapper")[0]) {
      document.getElementsByClassName(
        "content-quick-links-wrapper"
      )[0].style.width = size.width - 130 + "px";
    }
  }, [size]);

  useEffect(() => {
    if (socket) {
      socket.on(discussionNsps.wsEvents.sendUpdatedContentLikeCount, (data) => {
        dispatch({type: commentActionTypes.SEND_UPDATED_CONTENT_LIKE_COUNT, data});
      });
    }
  }, [socket]);

  let slicedUsersInRoom = allUsersInRoom.slice(0, showNumberOfActiveUser);

  const handleContentReaction = async ({id}) => {
    try {
      let {data: {data: {content_id, liked, total_likes}}} = await contentService.likeContent({id});
      let obj ={
        id: content_id,
        liked,
        total_likes
      }
      dispatch({type: commentActionTypes.CHANGE_DISCUSSION_CONTENT_REACTION, data:obj});
      socket.emit(discussionNsps.wsEvents.updateContentLikesCount, obj);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="discussion-wrapper">
      <div className="content-left-wrapper">
        <div className="content-basic-details-l">this is test</div>
        <div className="content-wrapper-w-b">
          {
            loading
            &&
            <div className="shimmerBackground">
              <ContentShimmer />
            </div>
          }
          {!loading && Array.isArray(contents) &&
            contents.map((content, i) => {
              return (
                <ContentComponent
                  content={content}
                  key={i}
                  className="discussion-content"
                  removeDiscussionButton={true}
                  handleContentReaction={handleContentReaction}
                />
              );
            })}
        </div>
        <div className="content-quick-links-wrapper" ref={discussionTopRef}>
          <div className="quick-link-icons">
            <div className="left">
              <div className="icon2">
                <AiOutlineDoubleLeft />
              </div>
              <div className="icon1">
                <AiOutlineLeft />
              </div>
            </div>
            <div className="left">
              <div className="icon1">
                <AiOutlineRight />
              </div>
              <div className="icon2">
                <AiOutlineDoubleRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right-wrapper">
        <div className="content-basic-details" ref={discussionTopRef}>
          <div className="content-name">Discussion</div>
          <div className="active-profiles">
            {Array.isArray(slicedUsersInRoom) &&
              slicedUsersInRoom.map((user) => {
                return (
                  <span className="p-profile" key={user.uid}>
                    <img
                      src="https://static01.nyt.com/images/2020/11/20/multimedia/00Gates-1/00Gates-1-mobileMasterAt3x.jpg"
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                  </span>
                );
              })}
            {allUsersInRoom.length - slicedUsersInRoom.length > 0 && (
              <span className="p-profile-rem-count" key="extra">
                +{allUsersInRoom.length - slicedUsersInRoom.length}
              </span>
            )}
          </div>
        </div>
        {children}
      </div>
      <ToastContainer 
        autoClose={2500}
        transition={Zoom}
        />
    </div>
  );
};

export default Discussion;
