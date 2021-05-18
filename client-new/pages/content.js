import ContentLayout from "./../src/layouts/Content";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { contentActionTypes } from "./../src/store/content/content.actiontype";
import { contentBuilderActionTypes } from "./../src/store/contentBuilder/contentBuilder.actiontype";
import EmptyStateText from "./../src/components/EmptyState/EmptyText";
import { emptyStateUrls } from "./../src/utils/imageUrls";
import ContentComponent from "./../src/components/ContentComponent";
import ContentShimmer from './../src/components/Shimmer/Content'
import "./../src/assets/styles/subject/subject.module.css";
import { useEffect } from "react";

const Content = () => {
  const { loading, contents } = useSelector(
    (state) => state.Content,
    shallowEqual
  );

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

Content.getInitialProps = async ({ store, query }) => {
  try {
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
      },
    });
    return {};
  } catch (err) {
    return {};
  }
};

export default Content;


