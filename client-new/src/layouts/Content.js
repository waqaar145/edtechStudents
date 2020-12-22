import { useState, useEffect } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import EmptyStateText from "./../components/EmptyState/EmptyText";
import { emptyStateUrls } from "./../utils/imageUrls";
import "./../assets/styles/subject/subject.module.css";

import Chapters from "./components/Content/Chapters";
import ChapterInternalTab from "./components/Content/ChapterInternalTab";
import QuickLinks from "./components/Content/QuickLinks";

const Content = ({ children }) => {
  const dispatch = useDispatch();

  const chapters = useSelector((state) => state.Content.chapters, shallowEqual);
  const subject = useSelector((state) => state.Content.subject, shallowEqual);
  const contents = useSelector((state) => state.Content.contents, shallowEqual);
  const { total, theories, sums } = useSelector(
    (state) => state.Content.current_chapters_stats,
    shallowEqual
  );

  const router = useRouter();
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

  const handleDiscussion = () => {
    console.log("handleDiscussion");
  };

  return (
    <div className="subject-wrapper">
      <Row className="subject-full-height">
        <Col xs={3} className="content-height chapter-list">
          <div className="chapter-list-container">
            <div className="chapter-list-header">
              <span className="back-button" onClick={() => router.back()}>
                <MdArrowBack />
              </span>{" "}
              {subject.subject_name}
            </div>
            <div className="chapter-list-body">
              {chapters.length > 0 ? (
                <Chapters
                  chapters={chapters}
                  chapter_slug={chapter_slug}
                  subject_slug={subject_slug}
                  content_type={content_type}
                />
              ) : (
                <EmptyStateText
                  text="There isn't anything."
                  subText="Please try after sometime."
                  image={emptyStateUrls.emptyState.enggSemstersList}
                />
              )}
            </div>
          </div>
        </Col>
        <Col xs={9} className="content-height">
          <div className="content-wrapper">
            <div className="content-main-header" style={{ display: "flex" }}>
              <div className="chapter-number-selected">
                <span className="chapter-number">{chapterIndex}</span>
              </div>
              <div>{activeChapter ? activeChapter.chapter_name : ""}</div>
            </div>
          </div>
          <div className="content-subheader">
            <div className="content-main-header">
              <ChapterInternalTab
                chapter_slug={chapter_slug}
                subject_slug={subject_slug}
                content_type={content_type}
                total={total}
                theories={theories}
                sums={sums}
              />
              <div>search bar</div>
            </div>
          </div>
          <div className="subject-content">
            <Row>
              <Col sm={8}>{children}</Col>
              <Col sm={4}>
                <div className="quick-links-wrapper">
                  <div className="quick-links-header">Quick Links</div>
                  <div className="quick-links-body">
                    <ul>
                      {contents.length > 0 ? (
                        <QuickLinks contents={contents} />
                      ) : (
                        <EmptyStateText
                          text="There isn't anything."
                          subText="Please try after sometime."
                          image={emptyStateUrls.emptyState.enggSemstersList}
                        />
                      )}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Content;
