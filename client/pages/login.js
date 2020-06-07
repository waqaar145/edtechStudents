import {useState} from 'react';
import {Container, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Signin from './../src/components/auth/login'
import Register from './../src/components/auth/register'

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: '10%'
  },
  loginContainer: {
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2)
  },
  cursor: {
    cursor: 'pointer'
  }
}));

const Login = () => {

  const [showLogin, setShowLogin] = useState(false);

  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={3} className={classes.margin}>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.loginContainer}>
            <span className={classes.cursor} onClick={() => setShowLogin(!showLogin)}>Switch</span>
            <center><h3>{showLogin ? 'Register' : 'Login'}</h3></center>
            <br />
            {
              showLogin
                ?
              <Register />
                :
              <Signin />
            }
          </div>
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </Container>
  )
}

export default Login;