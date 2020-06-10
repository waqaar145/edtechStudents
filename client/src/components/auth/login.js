import {useState} from 'react';
import {Container, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputText from './../forms/InputText';
import CustomButton from './../buttons/customButton'
import {handleError} from './../../utils/validations/inputError';
import {authService} from './../../services/apis/auth.service';
import Router from 'next/router'

const INITIAL_STATE = {
  email: {
    input_val: 'waqaar145@gmail.com',
    required: true,
    type: {
      main: 'Email'
    },
    condition: {
      min: 1,
      max: 100
    }
  },
  password: {
    input_val: 'qwerty',
    required: true,
    type: {
      main: 'String'
    },
    condition: {
      min: 6,
      max: 20
    }
  },
}

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: '10%'
  },
  loginContainer: {
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2)
  }
}));

const Signing = () => {

  const [values, setValues] = useState(INITIAL_STATE);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const checkError = ({name, value, object}) => {
    const error_obj = handleError({name, value, object});
    if (error_obj) {
      const {key, msg} = error_obj;
      setError({...error, [key]: msg})
    } else {
      setError({...error, [name]: ''})
    }
    return error_obj;
  }

  const handleInputChange = ({name, value}) => {
    setValues({
      ...values,
      [name]: {
        ...values[name],
        input_val: value
      }
    });
    checkError({name, value, object: values[name]});
  } 

  const validate = () => {
    let main_error_obj = {}
    for (const [name, value] of Object.entries(values)) {
      let error_obj = checkError({name, value: value.input_val, object: value})
      if (error_obj) {
        const {key, msg} = error_obj;
        main_error_obj = {...main_error_obj, [key]: msg}
      }
    }
    setError(main_error_obj)
    if (Object.keys(main_error_obj).length === 0) {
      return true;
    }
    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate()
    if (errors) {
      setLoading(true)
      let data = {
        email: values.email.input_val,
        password: values.password.input_val,
      }

      authService.Signin(data)
        .then(response => {
          setLoading(false)
          Router.push('/');
        }).catch(error => {
          setLoading(false)
          console.log(error)
        })
    } else {
      setLoading(false)
      console.log('VALIDATION FAILED')
    }
  }

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <InputText 
        id="email" 
        label="Email"
        name="email"
        value={values.email.input_val}
        error={'email' in error ? error.email : ''}
        handleInputChange={handleInputChange}
        />
      <InputText 
        id="password" 
        label="Password"
        name="password"
        type="password"
        value={values.password.input_val}
        error={'password' in error ? error.password : ''}
        handleInputChange={handleInputChange}
        />
      <CustomButton
        type="submit"
        name="Login"
        variant="contained"
        color="primary"
        size="medium"
        loading={loading}
        />
    </form>
  )
}

export default Signing;