import {useState} from 'react';
import Link from 'next/link'
import InputText from './../src/components/forms/InputText';
import InputCheckbox from './../src/components/forms/InputCheckbox'
import CustomButton from './../src/components/buttons/customButton'
import {Grid} from '@material-ui/core';
import {handleError} from './../src/utils/validations/inputError'
import {Checkbox} from '@material-ui/core';

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
  remember_me: {
    input_val: false,
    required: false,
    type: {
      main: 'Boolean'
    },
    condition: {
      min: 1,
      max: 1
    }
  }
}

export default () => {

  const [values, setValues] = useState(INITIAL_STATE);
  const [error, setError] = useState({});

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
      console.log('VALIDATION PASSED')
    } else {
      console.log('VALIDATION FAILED')
    }
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={4}>
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
              type="password"
              label="Password"
              name="password"
              value={values.password.input_val}
              error={'password' in error ? error.password : ''}
              handleInputChange={handleInputChange}
              />
            <InputCheckbox
              id="remember_me" 
              label="Remember me"
              name="remember_me"
              value={values.remember_me.input_val}
              handleInputChange={handleInputChange}
              color="primary"
              />
            <CustomButton
              type="submit"
              name="Submit"
              variant="contained"
              color="primary"
              size="medium"
              />
          </form>
        </Grid>
        <Grid item xs={12} sm={4}>
          second
        </Grid>
        <Grid item xs={12} sm={4}>
          third
        </Grid>
      </Grid>
      <h3>This is the /about page. this is about page this is good</h3>
      <Link href='/'>
        <a> &larr; Back home</a>
      </Link>
    </div>
  )
}