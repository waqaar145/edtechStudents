import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BasicLayout from "./../src/layouts/Basic";
import "./../src/assets/styles/engineering/engineering.module.css";
import { BsSearch } from "react-icons/bs";
import { topLevelActionTypes } from "./../src/store/top-level/top_level.actiontype";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Link from "next/link";
import EmptyStateText from "./../src/components/EmptyState/EmptyText";
import { emptyStateUrls } from "./../src/utils/imageUrls";

import { contentService } from "./../src/services";
import Router from "next/router";

const Engineering = () => {
  const dispatch = useDispatch();
  const semesters = useSelector(
    (state) => state.TopLevel.semesters,
    shallowEqual
  );
  const subjects = useSelector(
    (state) => state.TopLevel.current_subjects,
    shallowEqual
  );
  const current_semester = useSelector(
    (state) => state.TopLevel.current_semester,
    shallowEqual
  );

  const redirectToSubject = async (slug) => {
    try {
      let {
        data: { data },
      } = await contentService.getFirstChaptersBySubjectSlug(slug);
      if (data.length > 0) {
        let content = data[0];
        Router.push(
          `/subject/subject_slug?subject_slug=${slug}&chapter_slug=${content.slug}&content_type=all`,
          `/subject/${slug}/chapter/${content.slug}/all`
        ); // Router.push(`/subject/subject_slug?=${slug}`, `/subject/${slug}`);
      }
    } catch (err) {
      console.log("Could not send subject page");
    }
  };

  return (
    <BasicLayout>
      <Container className="main-wrapper">
        <Row>
          <Col sm={3}>
            <div className="custom-card">
              <div className="custom-card-header">Semesters</div>
              <div className="custom-card-body">
                <ul>
                  {semesters.length > 0 ? (
                    semesters.map((semester) => {
                      return (
                        <li
                          key={semester.id}
                          className="custom-card-body-element"
                          onClick={() =>
                            dispatch({
                              type: topLevelActionTypes.WATCH_SEMESTER_SELECTED,
                              id: semester.id,
                            })
                          }
                          className={current_semester === semester.id ? 'active' : ''}
                        >
                          <a>{semester.name}</a>
                        </li>
                      );
                    })
                  ) : (
                    <EmptyStateText
                      text="No semesters found."
                      subText="Please try after sometime."
                      image={emptyStateUrls.emptyState.enggSemstersList}
                    />
                  )}
                </ul>
              </div>
            </div>
          </Col>
          <Col sm={9}>
            {
              (semesters.length > 0 && semesters.find(semester => semester.id === current_semester).name !== "")
                &&
              (<Row className="search-box">
                <Col>
                  <div className="search-box-input">
                    <div className="current-selected-subject">{semesters.length > 0 ? semesters.find(semester => semester.id === current_semester).name : ''}</div>
                    {/* <div className="search-container">
                      <div className="search-box-input-field">
                        <input type="text" placeholder="Search.." name="search" />
                      </div>
                      <div>
                        <BsSearch />
                      </div>
                    </div> */}
                  </div>
                </Col>
              </Row>)
            }
            <Row className="semesters-list">
              {subjects.length > 0 ? (
                subjects.map((subject) => {
                  return (
                    <Col sm={4} xs={6} key={subject.id}>
                      <a
                        onClick={() => redirectToSubject(subject.slug)}
                        className="custom-image-card"
                      >
                        <img
                          src="https://www.w3schools.com/howto/img_avatar.png"
                          alt={`Mumbai University - Engineering - ${subject.semester_name} - ${subject.name}`}
                          width="100%"
                        />
                        <div className="custom-image-card-body">
                          <p className="custom-image-card-body-title">
                            {subject.name}
                          </p>
                        </div>
                      </a>
                    </Col>
                  );
                })
              ) : (
                <Col>
                  <EmptyStateText
                    text="No subjects found."
                    subText="Please try after sometime."
                    image={emptyStateUrls.emptyState.enggSemstersList}
                    width="300"
                  />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </BasicLayout>
  );
};

Engineering.getInitialProps = async ({ store }) => {
  try {
    await store.dispatch({ type: topLevelActionTypes.WATCH_ENGG_PAGE_CHANGES });
    return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};

export default Engineering;
