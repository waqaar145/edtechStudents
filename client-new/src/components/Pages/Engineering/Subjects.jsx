import {useState} from 'react';
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
const Subjects = ({
  subjects,
  redirectToSubject,
  loading,
  currentIndex,
  emptyStateUrls,
  EmptyStateText,
}) => {
  return (
    <>
      {subjects.length > 0 ? (
        subjects.map((subject, index) => {
          return (
            <Col sm={4} xs={6} key={subject.id}>
              <a
                onClick={() => redirectToSubject(subject.name, subject.slug, index)}
                className="custom-image-card"
              >
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt={`Mumbai University - Engineering - ${subject.semester_name} - ${subject.name}`}
                  width="100%"
                />
                <div className="custom-image-card-body">
                  <div className="custom-image-card-body-title">{subject.name}</div>
                  {loading && (currentIndex === index) && <div className="cus-spinner"><Spinner animation="border" variant="primary" size="sm"/></div>}
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
    </>
  );
};

export default Subjects;
