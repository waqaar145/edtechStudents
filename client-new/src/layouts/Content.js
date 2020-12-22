import { useState, useEffect } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Link from "next/link";
import ReactHtmlParser from 'react-html-parser';
import "./../assets/styles/subject/subject.module.css";

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
              <ul>
                {chapters.length > 0 &&
                  chapters.map((chapter, index) => {
                    return (
                      <li key={chapter.id} className={chapter.slug === chapter_slug ? "active" : ""}>
                        <Link
                          href={`/content?subject_slug=${subject_slug}&chapter_slug=${chapter.slug}&content_type=${content_type}`}
                          as={`/subject/${subject_slug}/chapter/${chapter.slug}/${content_type}`}
                          passHref={true}
                        >
                          <a className={chapter.slug === chapter_slug ? "active" : ""}>
                            <div className="chapter-number">
                              <span className="chapter-number">
                                {index + 1}
                              </span>
                            </div>
                            <div className="chapter-name">
                              {chapter.chapter_name}
                            </div>
                          </a>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </Col>
        <Col xs={9} className="content-height">
          <div className="content-wrapper">
            <div className="content-main-header" style={{ display: "flex" }}>
              <div className="chapter-number-selected">
                <span className="chapter-number">{chapterIndex}</span>
              </div>
              <div>
                {activeChapter ? activeChapter.chapter_name : ""}
              </div>
            </div>
          </div>
          <div className="content-subheader">
            <div className="content-main-header">
              <ul>
                <li className={content_type === "all" ? "active" : ""}>
                  <Link
                    href={`/content?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_type=all`}
                    as={`/subject/${subject_slug}/chapter/${chapter_slug}/all`}
                  >
                    <a className="text-links">All ({total})</a>
                  </Link>
                </li>
                <li className={content_type === "theories" ? "active" : ""}>
                  <Link
                    href={`/content?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_type=theories`}
                    as={`/subject/${subject_slug}/chapter/${chapter_slug}/theories`}
                  >
                    <a className="text-links">Theories ({theories})</a>
                  </Link>
                </li>
                <li className={content_type === "sums" ? "active" : ""}>
                  <Link
                    href={`/content?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_type=sums`}
                    as={`/subject/${subject_slug}/chapter/${chapter_slug}/sums`}
                  >
                    <a className="text-links">Questions ({sums})</a>
                  </Link>
                </li>
              </ul>
              <div>search bar</div>
            </div>
          </div>
          <div className="subject-content">
            <Row>
              <Col sm={8}>
                {children}
              </Col>
              <Col sm={4}>
                <div className="quick-links-wrapper">
                  <div className="quick-links-header">Quick Links</div>
                  <div className="quick-links-body">
                    <ul>
                      {contents.length > 0 && contents.map((content, i) => {
                        return (
                          <li key={i}>
                            <span className="link-number">{i + 1}</span>
                            <a href={`#${content.slug}`}>{ReactHtmlParser(content.name)}</a>
                          </li>
                        );
                      })}
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
