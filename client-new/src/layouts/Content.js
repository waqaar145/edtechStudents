import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";
import { useSelector, shallowEqual } from "react-redux";
import EmptyStateText from "./../components/EmptyState/EmptyText";
import { emptyStateUrls } from "./../utils/imageUrls";
import {formateName} from './../../src/utils/stringOperations'
import ContentLoader from 'react-content-loader'

import Chapters from "./components/Content/Chapters";
import ChapterInternalTab from "./components/Content/ChapterInternalTab";
import QuickLinks from "./components/Content/QuickLinks";

import "./../assets/styles/subject/subject.module.css";

const LineShimmer = () => {
  return (
    <ContentLoader 
      speed={2}
      width={400}
      height={25}
      viewBox="0 0 400 25"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="2" y="-1" rx="0" ry="0" width="352" height="45" />
    </ContentLoader>
  )
}

const Content = ({ children }) => {
  const {
    loading,
    chapters,
    subject,
    contents
  } = useSelector((state) => state.Content, shallowEqual);

  const {discussion: {current_topic, on}} = useSelector((state) => state.ContentBuilder.subjectLayoutBuilder, shallowEqual);
  const { total, theories, sums } = useSelector(
    (state) => state.Content.current_chapters_stats,
    shallowEqual
  );

  const router = useRouter();
  const commentBoxRef = useRef(null);

  const {
    query: { chapter_slug, subject_slug, content_type },
  } = router;
  const [activeTab, setActiveTab] = useState("");
  const [activeChapter, setActiveChapter] = useState({});
  const [chapterIndex, setChapterIndex] = useState(null);

  useEffect(() => {
    if (content_type) {
      if (
        content_type === "all" ||
        content_type === "theories" ||
        content_type === "sums"
      ) {
        setActiveTab(content_type);
      }
    }
  }, [content_type]);

  useEffect(() => {
    if (chapter_slug && chapters.length > 0) {
      let indexIs = chapters.findIndex(
        (chapter) => chapter.slug === chapter_slug
      );
      setActiveChapter(chapters[indexIs]);
      setChapterIndex(indexIs + 1);
    }
  }, [chapters, chapter_slug]);

  const getSubjectName = (subejctName, on) => {
    if (!on) {
      return subejctName;
    } else {
      return formateName(subejctName);
    }
  }

  return (
    <div className="engg-wrapper">
      <div className="engg-sidebar">
        <div className="sidebar-header">
          <div className="icon">
            <span className="back-button" onClick={() => router.back()}>
              <MdArrowBack />
            </span>
          </div>
          <div className="chapter-name">{loading ? <LineShimmer /> : getSubjectName(subject.subject_name, false)}</div>
        </div>
        <div className="sidebar-body">
          {
            loading &&
            <>
              {
                Array.from(Array(15), (e, i) => {
                  return (
                    <div className="shimmerBackground" key={i}>
                      <ContentLoader 
                        speed={2}
                        width={800}
                        height={50}
                        viewBox="0 0 800 50"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect x="37" y="147" rx="0" ry="0" width="1" height="0" /> 
                        <rect x="-1" y="5" rx="0" ry="0" width="610" height="56" /> 
                        <rect x="32" y="22" rx="0" ry="0" width="531" height="14" />
                      </ContentLoader>
                    </div>
                  )
                })
              }
            </>
          }
          {!loading && chapters.length > 0 && (
            <Chapters
              chapters={chapters}
              chapter_slug={chapter_slug}
              subject_slug={subject_slug}
              content_type={content_type}
            />
          )}
          {
            !loading && chapters.length === 0
            &&
            <EmptyStateText
              text="There isn't anything."
              subText="Please try after sometime."
              image={emptyStateUrls.emptyState.enggSemstersList}
            />
          }
        </div>
      </div>
      <div className="engg-header">
        <div className="number">{chapterIndex}</div>
        <div className="chapter-name">
          {loading && <LineShimmer />}
          {(!loading && activeChapter) ? activeChapter.chapter_name : ""}
        </div>
      </div>
      <div className="engg-content-header">
        <div className="engg-content-header-links">
          {
            loading ?
            (
              <LineShimmer />
            )
            :
            (
              <ChapterInternalTab
                chapter_slug={chapter_slug}
                subject_slug={subject_slug}
                content_type={content_type}
                total={total}
                theories={theories}
                sums={sums}
              />
            )
          }
        </div>
      </div>
      <div className="engg-content-body">{children}</div>
      {
        (contents.length > 0) &&
        <div className="engg-content-quick-links">
          <div className="quick-links-wrapper">
            <div className="quick-links-header">Quick Links</div>
            <div className="quick-links-body">
              {
                loading &&
                <div className="shimmerBackground">
                  <ContentLoader 
                    speed={2}
                    width={400}
                    height={150}
                    viewBox="0 0 400 150"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <circle cx="10" cy="20" r="8" /> 
                    <rect x="25" y="15" rx="5" ry="5" width="220" height="10" /> 
                    <circle cx="10" cy="50" r="8" /> 
                    <rect x="25" y="45" rx="5" ry="5" width="220" height="10" /> 
                    <circle cx="10" cy="80" r="8" /> 
                    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" /> 
                    <circle cx="10" cy="110" r="8" /> 
                    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
                  </ContentLoader>
                </div>
              }
              {
                !loading &&
                <QuickLinks contents={contents} />
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Content;
