import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Hidden} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import {connect} from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {authActionTypes} from './../../store/auth/auth.actiontype'
import {authService} from './../../services'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: theme.palette.text.primary
    },
    bgColor: {
      backgroundColor: theme.palette.background.paper
    }
  }
});

const SimpleNavbar = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    Auth,
    logout
  } = props;

  const handleLogout = () => {
    authService.logout()
      .then(response => {
        setAnchorEl(null);
        window.location.reload()
      }).catch(error => {
        console.log(error);
      })
  }

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.bgColor} elevation={1}>
      <Toolbar variant="dense">
        <Hidden only={['md', 'lg', 'xl']}>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" className={classes.title}>
          Edtech
        </Typography>
        <Hidden only={['xs', 'sm']}>
          <Link href="/" passHref>
            <Button component="a">Home</Button>
          </Link>
          <Link href="/engineering" passHref>
            <Button component="a">Engineering</Button>
          </Link>
          <Link href="/channels" passHref>
            <Button component="a">Channels</Button>
          </Link>
          <Link href="/blogs" passHref>
            <Button component="a">Blogs</Button>
          </Link>
          {
            Auth.uid 
              ?
            (
            <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Hi {Auth.username}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            </>
            )
              :
            <Link href="/login" passHref>
              <Button component="a">Login</Button>
            </Link>
          }
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({type: authActionTypes.LOGOUT})
  }
}

function mapStateToProps (state) {
  return {
    Auth: state.Auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleNavbar);