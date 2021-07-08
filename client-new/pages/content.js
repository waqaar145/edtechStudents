import { useEffect } from "react";
import ContentLayout from "./../src/layouts/Content";
import { useRouter } from "next/router";
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { contentActionTypes } from "./../src/store/content/content.actiontype";
import EmptyStateText from "./../src/components/EmptyState/EmptyText";
import { emptyStateUrls } from "./../src/utils/imageUrls";
import ContentComponent from "./../src/components/ContentComponent";
import ContentShimmer from './../src/components/Shimmer/Content'
import {contentService} from './../src/services'
import { contentNsps } from "./../src/sockets/namespaces/Content/constants/contentNamespaces";
import "./../src/assets/styles/subject/subject.module.css";


const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/${contentNsps.nspPrefix}`;
let socket;

const Content = () => {

  const dispatch = useDispatch();
  const { loading, contents } = useSelector(
    (state) => state.Content,
    shallowEqual
  );

  const router = useRouter();
  const {
    chapter_slug,
    subject_slug,
    content_slug
  } = router.query;

  // Socket connection
  useEffect(() => {
    socket = socketIOClient(ENDPOINT, {
      transports: ["websocket"],
      query: `channel_name=${subject_slug.trim()}-${chapter_slug.trim()}`,
    });

    socket.emit(contentNsps.wsEvents.joinRoom);

    return () => socket.disconnect();
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on(contentNsps.wsEvents.sendUpdatedContentLikeCount, (data) => {
      dispatch({type: contentActionTypes.SEND_UPDATED_CONTENT_LIKE_COUNT, data});
    });
  }, [])

  const handleContentReaction = async ({id}) => {
    try {
      let {data: {data: {content_id, liked, total_likes}}} = await contentService.likeContent({id});
      let obj = {
        id: content_id,
        liked,
        total_likes
      }
      dispatch({type: contentActionTypes.CHANGE_CONTENT_REACTION, data:obj});
      socket.emit(contentNsps.wsEvents.updateContentLikesCount, obj);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ContentLayout>
      {
        loading
        &&
        <div className="shimmerBackground">
          <ContentShimmer />
        </div>
      }
      {!loading &&
        contents.length > 0 &&
        contents.map((content, i) => {
          return (
            <ContentComponent
              content={content}
              key={i}
              className="content-wrapper-border-radius"
              handleContentReaction={handleContentReaction}
            />
          );
        })
      }
      {!loading && contents.length === 0 && (
        <EmptyStateText
          text="There isn't anything to show."
          subText="Please try after sometime."
          image={emptyStateUrls.emptyState.enggSemstersList}
          width="400"
        />
      )}
    </ContentLayout>
  );
};

Content.getInitialProps = async ({ store, query, req }) => {
  try {
    const isServer = !!req;
    await store.dispatch({
      type: contentActionTypes.WATCH_GET_CHAPTERS,
      data: {
        subject_slug: query.subject_slug,
        chapter_slug: query.chapter_slug,
      },
    });
    await store.dispatch({
      type: contentActionTypes.WATCH_GET_COUNTS,
      data: {
        chapter_slug: query.chapter_slug,
      },
    });
    await store.dispatch({
      type: contentActionTypes.WATCH_GET_CONTENT,
      data: {
        chapter_slug: query.chapter_slug,
        content_type: query.content_type,
        cookie: isServer ? req.headers.cookie : null
      },
    });
    return {};
  } catch (err) {
    return {};
  }
};

export default Content;


