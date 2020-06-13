import {useState} from 'react';
import {Container, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputText from './../forms/InputText';
import CustomButton from './../buttons/customButton'
import {handleError} from './../../utils/validations/inputError'
import {authService} from './../../services/apis/auth.service'

const INITIAL_STATE = {
  first_name: {
    input_val: '',
    required: true,
    type: {
      main: 'String',
      secondary: 'Alpha'
    },
    condition: {
      min: 1,
      max: 100
    }
  },
  last_name: {
    input_val: '',
    required: true,
    type: {
      main: 'String',
      secondary: 'Alpha'
    },
    condition: {
      min: 1,
      max: 100
    }
  },
  email: {
    input_val: '',
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
    input_val: '',
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

const Register = ({handleServerErros}) => {

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
        first_name: values.first_name.input_val,
        last_name: values.last_name.input_val,
        email: values.email.input_val,
        password: values.password.input_val,
      }

      authService.Signup(data)
        .then(response => {
          console.log(response)
          setLoading(false)
        }).catch(error => {
          setLoading(false)
          handleServerErros(error.data.data)
        })
    }
  }

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <InputText 
        id="first_name" 
        label="First Name"
        name="first_name"
        value={values.first_name.input_val}
        error={'first_name' in error ? error.first_name : ''}
        handleInputChange={handleInputChange}
        />
      <InputText 
        id="last_name" 
        label="Last Name"
        name="last_name"
        value={values.last_name.input_val}
        error={'last_name' in error ? error.last_name : ''}
        handleInputChange={handleInputChange}
        />
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
        name="Create new account"
        variant="contained"
        color="primary"
        size="medium"
        loading={loading}
        />
    </form>
  )
}

export default Register;