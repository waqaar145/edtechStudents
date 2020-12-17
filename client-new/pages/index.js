import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BasicLayout from "./../src/layouts/Basic";
const Index = () => {
  return (
    <BasicLayout>
      <Container>
        <Row>
          <Col>Home page</Col>
        </Row>
      </Container>
    </BasicLayout>
  );
};

export default Index;
