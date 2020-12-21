import { useState, useEffect } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { contentActionTypes } from "./../store/content/content.actiontype";
import Link from 'next/link';
import "./../assets/styles/subject/subject.module.css";

const Content = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const chapters = useSelector((state) => state.Content.chapters, shallowEqual);
  const subject = useSelector((state) => state.Content.subject, shallowEqual);
  const { total, theories, sums } = useSelector(
    (state) => state.Content.current_chapters_stats,
    shallowEqual
  );

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
                {chapters.length > 0 && chapters.map((chapter, index) => {
                  return (
                    <li key={chapter.id}>
                      <Link
                        href="#"
                      >
                        <>
                        <div className="chapter-number">
                          <span className="chapter-number">{index + 1}</span>
                        </div>
                        <div className="chapter-name">Chapter Name {index + 1}</div>
                        </>
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
                <span className="chapter-number">2</span>
              </div>
              <div>Chapter number 2</div>
            </div>
          </div>
          <div className="content-subheader">
            <div className="content-main-header">
              <ul>
                <li>
                  <a href="#" className="text-links">
                    All (15)
                  </a>
                </li>
                <li className="active">
                  <a href="#" className="text-links">
                    Theories (10)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-links">
                    Questions (6)
                  </a>
                </li>
              </ul>
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
                      {Array.from(Array(10), (e, i) => {
                        return (
                          <li key={i}>
                            <span className="link-number">{i + 1}</span>{" "}
                            <a href="#">Quick links number {i + 1}</a>
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
