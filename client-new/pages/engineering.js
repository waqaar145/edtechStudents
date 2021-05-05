import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BasicLayout from "../src/layouts/Basic";
import { topLevelActionTypes } from "./../src/store/top-level/top_level.actiontype";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import EmptyStateText from "./../src/components/EmptyState/EmptyText";
import { emptyStateUrls } from "./../src/utils/imageUrls";
import { contentService } from "./../src/services";
import Router from "next/router";
import { Toast, toastDefaultObject } from "./../src/components/Toast/index";
import Semesters from "../src/components/Pages/Engineering/Semesters";
import Subjects from "../src/components/Pages/Engineering/Subjects";

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

  const [semesterName, setSemesterName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const redirectToSubject = async (name, slug, index) => {
    try {
      setLoading(true);
      setCurrentIndex(index);
      let {
        data: { data },
      } = await contentService.getFirstChaptersBySubjectSlug(slug);
      if (data.length > 0) {
        let content = data[0];
        Router.push(
          `/content?subject_slug=${slug}&chapter_slug=${content.slug}&content_type=all`,
          `/${slug}/${content.slug}/all`
        );
      } else {
        return Toast(
          `Looks like ${name} does not have any content.`,
          "error",
          toastDefaultObject
        );
      }
      setLoading(false);
      setCurrentIndex(null);
    } catch (err) {
      setLoading(false);
      setCurrentIndex(null);
      console.log("Could not send to subject page", err);
    }
  };

  useEffect(() => {
    if (current_semester) {
      setSemesterName(
        semesters.length > 0
          ? semesters.find((semester) => semester.id === current_semester).name
          : ""
      );
    }
  }, [current_semester]);

  return (
    <BasicLayout>
      <Container className="main-wrapper">
        <Row>
          <Col sm={3}>
            <div className="custom-card">
              <div className="custom-card-header">Semesters</div>
              <div className="custom-card-body">
                <Semesters
                  handleSemester={(id) =>
                    dispatch({
                      type: topLevelActionTypes.WATCH_SEMESTER_SELECTED,
                      id: id,
                    })
                  }
                  current_semester={current_semester}
                  semesters={semesters}
                  emptyStateUrls={emptyStateUrls}
                  EmptyStateText={EmptyStateText}
                />
              </div>
            </div>
          </Col>
          <Col sm={9}>
            {semesterName !== "" && (
              <Row className="search-box">
                <Col>
                  <div className="search-box-input">
                    <div className="current-selected-subject">
                      {semesterName}
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            <Row className="semesters-list">
              <Subjects
                subjects={subjects}
                redirectToSubject={redirectToSubject}
                loading={loading}
                currentIndex={currentIndex}
                emptyStateUrls={emptyStateUrls}
                EmptyStateText={EmptyStateText}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </BasicLayout>
  );
};

Engineering.getInitialProps = async ({ store }) => {
  try {
    let { semesters, subjects } = store.getState().TopLevel;
    if (semesters.length === 0 || subjects.length === 0)
      await store.dispatch({
        type: topLevelActionTypes.WATCH_ENGG_PAGE_CHANGES,
      });
    return {};
  } catch (err) {
    return {};
  }
};

export default Engineering;
