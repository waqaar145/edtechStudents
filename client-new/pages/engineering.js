import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BasicLayout from "./../src/layouts/Basic";
import "./../src/assets/styles/engineering/engineering.module.css";
import { BsSearch } from "react-icons/bs";

const Engineering = () => {
  return (
    <BasicLayout>
      <Container className="main-wrapper">
        <Row>
          <Col sm={3}>
            <div className="custom-card">
              <div className="custom-card-header">Semesters</div>
              <div className="custom-card-body">
                <ul>
                  {Array.from(Array(5), (e, i) => {
                    return (
                      <li key={i} className="custom-card-body-element">
                        <a href="/test1">Semester {i + 1}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Col>
          <Col sm={9}>
            <Row className="search-box">
              <Col>
                <div className="search-box-input">
                  <div className="current-selected-subject">Semester 1</div>
                  <div className="search-container">
                    <div className="search-box-input-field">
                      <input type="text" placeholder="Search.." name="search" />
                    </div>
                    <div>
                      <BsSearch />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="semesters-list">
              {Array.from(Array(8), (e, i) => {
                return (
                  <Col sm={4} xs={6} key={i}>
                    <a href="#" className="custom-image-card">
                      <img
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="Avatar"
                        width="100%"
                      />
                      <div className="custom-image-card-body">
                        <p className="custom-image-card-body-title">
                          Subject {i + 1}
                        </p>
                      </div>
                    </a>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col>
                <div className="empty-container">
                  <img
                    src="https://d1xz17h748l1av.cloudfront.net/assets/images/gold-theme/earn-zone/empty-task.svg"
                    alt="Empty Task"
                  />{" "}
                  <div className="empty-msg">
                    <h3>No Subject found!</h3>{" "}
                    <p className="msg">Please search for another subject</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </BasicLayout>
  );
};

Engineering.getInitialProps = () => {
  console.log("=====", process.env.NEXT_PUBLIC_API_URL);
  return {};
};

export default Engineering;
