import { useState } from "react";
import MaterialInput from "./../src/components/Form/MaterialInput";
import BasicButton from "./../src/components/Button/Basic";
import { Container, Row, Col, Form } from "react-bootstrap";
import {useDispatch} from 'react-redux'
import { handleError } from "./../src/utils/validations/inputError";
import { authService } from "./../src/services/apis/auth.service";
import Router from "next/router";

const INITIAL_STATE = {
  first_name: {
    input_val: "",
    required: true,
    type: {
      main: "String",
      secondary: "Alpha",
    },
    condition: {
      min: 1,
      max: 100,
    },
  },
  last_name: {
    input_val: "",
    required: true,
    type: {
      main: "String",
      secondary: "Alpha",
    },
    condition: {
      min: 1,
      max: 100,
    },
  },
  email: {
    input_val: "",
    required: true,
    type: {
      main: "Email",
    },
    condition: {
      min: 1,
      max: 100,
    },
  },
  password: {
    input_val: "",
    required: true,
    type: {
      main: "String",
    },
    condition: {
      min: 6,
      max: 20,
    },
  },
};

const Signup = () => {

  const dispatch = useDispatch();

  const [values, setValues] = useState(INITIAL_STATE);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const checkError = ({ name, value, object }) => {
    const error_obj = handleError({ name, value, object });
    if (error_obj) {
      const { key, msg } = error_obj;
      setError({ ...error, [key]: msg });
    } else {
      setError({ ...error, [name]: "" });
    }
    return error_obj;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        input_val: value,
      },
    });
    checkError({ name, value, object: values[name] });
  };

  const validate = () => {
    let main_error_obj = {};
    for (const [name, value] of Object.entries(values)) {
      let error_obj = checkError({
        name,
        value: value.input_val,
        object: value,
      });
      if (error_obj) {
        const { key, msg } = error_obj;
        main_error_obj = { ...main_error_obj, [key]: msg };
      }
    }
    setError(main_error_obj);
    if (Object.keys(main_error_obj).length === 0) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors) {
      setLoading(true);
      let userObj = {
        first_name: values.first_name.input_val,
        last_name: values.last_name.input_val,
        email: values.email.input_val,
        password: values.password.input_val,
      };

      authService
        .Signup(userObj)
        .then(({data}) => {
          setLoading(false);
          dispatch({type: 'WATCH_LOGIN_SUCCESS', payload: {data, Router}})
        })
        .catch((error) => {
          setLoading(false);
          // handleServerErros(error.data.data);
        });
    }
  };

  return (
    <div className="login-wrapper">
      <Container>
        <Row>
          <Col sx={6}>
            <div className="login-left-wrapper">
              <div className="login-c-header">Signup</div>
              <div className="login-c-image">
                <center>
                  <img src="https://d1xz17h748l1av.cloudfront.net/assets/images/gold-theme/mall-feed/mall-feed-empty.svg" />
                </center>
              </div>
              <div className="login-c-body">Signup to see the free content</div>
            </div>
          </Col>
          <Col sx={6}>
            <div className="login-right-wrapper">
              <div className="login-form-header">Signup</div>
              <div className="login-button-social-login">
                <center>Social login</center>
              </div>
              <div className="login-button-social-body material-input">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm={12}>
                      <MaterialInput
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        value={values.first_name.input_val}
                        error={error.first_name}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col sm={12}>
                      <MaterialInput
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        value={values.last_name.input_val}
                        error={error.last_name}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col sm={12}>
                      <MaterialInput
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={values.email.input_val}
                        error={error.email}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col sm={12}>
                      <MaterialInput
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={values.password.input_val}
                        error={error.password}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <div className="login-button">
                    <BasicButton type="submit" title="Signup" />
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
