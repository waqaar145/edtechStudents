import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Hidden} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const SimpleNavbar = (props) => {

  const {
    Auth
  } = props;

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Hidden only={['md', 'lg', 'xl']}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" className={classes.title}>
          Edtech
        </Typography>
        <Hidden only={['xs', 'sm']}>
          <Link href="/" passHref>
            <Button component="a" color="inherit">Home</Button>
          </Link>
          <Link href="/engineering" passHref>
            <Button component="a" color="inherit">Engineering</Button>
          </Link>
          <Link href="/channels" passHref>
            <Button component="a" color="inherit">Channels</Button>
          </Link>
          <Link href="/blogs" passHref>
            <Button component="a" color="inherit">Blogs</Button>
          </Link>
          {
            Auth.uid 
              ?
            (
            <span>Hi {Auth.username}</span>
            )
              :
            <Link href="/login" passHref>
              <Button component="a" color="inherit">Login</Button>
            </Link>
          }
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

function mapStateToProps (state) {
  return {
    Auth: state.Auth
  }
}

export default connect(mapStateToProps)(SimpleNavbar);