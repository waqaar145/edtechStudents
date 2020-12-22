import {useState, useEffect} from 'react';
import {Container, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Signin from './../src/components/auth/login'
import Register from './../src/components/auth/register'
import SimpleAlert from './../src/components/alerts/alert'

const useStyles = makeStyles((theme) => ({
  error: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  margin: {
    marginTop: '7%'
  },
  loginContainer: {
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius
  },
  cursor: {
    cursor: 'pointer'
  }
}));

const Login = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);

  const classes = useStyles();

  const handleServerErros = (data) => {
    setServerErrors(data)
  }

  useEffect(() => {
    setServerErrors([])
  }, [showLogin])

  return (
    <Container>
      <Grid container spacing={3} className={classes.margin}>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.loginContainer}>
            <span className={classes.cursor} onClick={() => setShowLogin(!showLogin)}>Switch</span>
            <center><h3>{showLogin ? 'Register' : 'Login'}</h3></center>
            <div className={classes.error}>
              {
                Array.isArray(serverErrors) && serverErrors.length > 0
                  &&
                <SimpleAlert color="error" errors={serverErrors}/>
              }
            </div>
            <br />
            {
              showLogin
                ?
              <Register handleServerErros={handleServerErros}/>
                :
              <Signin handleServerErros={handleServerErros}/>
            }
          </div>
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </Container>
  )
}

export default Login;