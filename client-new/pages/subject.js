import { useState, useEffect } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router'
import { MdThumbUp, MdMoreVert, MdSearch, MdArrowBack } from "react-icons/md";
import BasicButton from './../src/components/Button/Basic'
import {useSelector, useDispatch} from 'react-redux'
import ProfileDropdown from './../src/components/Dropdown/profileDropdown'
import "./../src/assets/styles/subject/subject.module.css";

const Subject = () => {

  const router = useRouter(); 
  const dispatch = useDispatch();

  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDiscussion = () => {
    console.log('handleDiscussion')
  }

  return (
    <div className="subject-wrapper">
      <Row className="subject-full-height">
        <Col xs={3} className="content-height chapter-list">
          <div className="chapter-list-container">
            <div className="chapter-list-header"><span className="back-button" onClick={() => router.back()}><MdArrowBack /></span> Engineering Mechanics</div>
            <div className="chapter-list-body">
              <ul>
                {Array.from(Array(20), (e, i) => {
                  return (
                    <li key={i} className={i === 2 ? "active" : ""}>
                      <a
                        href={`subject/${i + 1}`}
                        className={i === 2 ? "active" : ""}
                      >
                        <div className="chapter-number">
                          <span className="chapter-number">{i + 1}</span>
                        </div>
                        <div className="chapter-name">Chapter Name {i + 1}</div>
                      </a>
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
              <Col sm={8}>
                {Array.from(Array(10), (e, i) => {
                  return (
                    <div className="content-wrapper" key={i}>
                      <div className="content-header">
                        <div className="chapter-name">
                          This is name of the topic
                        </div>
                        <div className="icon">
                          <MdSearch />
                        </div>
                      </div>
                      <div className="content-body">
                        This is actual content This is actual content This is
                        actual content This is actual content This is actual
                        content This is actual content This is actual content
                        This is actual content This is actual content This is
                        actual content This is actual content This is actual
                        content This is actual content This is actual content
                        This is actual content This is actual content This is
                        actual content This is actual content This is actual
                        content This is actual content This is actual content
                        This is actual content This is actual content This is
                        actual content This is actual content This is actual
                        content This is actual content This is actual content
                        This is actual content This is actual content This is
                        actual content This is actual content This is actual
                        content This is actual content This is actual content
                        This is actual content This is actual content This is
                        actual content This is actual content This is actual
                        content This is actual content This is actual content
                        This is actual content This is actual content
                      </div>
                      <div className="content-footer">
                        <div className="user-interacted">
                          <div className="icon">
                            <MdThumbUp />
                          </div>
                          <div className="count">123</div>
                        </div>
                        <div className="user-actions">
                          <div className="text">
                            <BasicButton 
                              title="Discussion"
                              onClick={handleDiscussion}
                              />
                          </div>
                          <div className="icon bootstrap-dropdown-style">
                            <Dropdown>
                              <Dropdown.Toggle>
                                <MdMoreVert />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Col>
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

export default Subject;
