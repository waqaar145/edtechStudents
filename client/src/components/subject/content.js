import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EditIcon from '@material-ui/icons/Edit';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ReportIcon from '@material-ui/icons/Report';
import BugReportIcon from '@material-ui/icons/BugReport';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingTop: '5px',
    paddingRight: '10px',
    paddingLeft: '10px',
    marginBottom: '30px'
  },
  title: {
    ...theme.typography.h6,
    fontWeight: '500'
  },
  description: {
    ...theme.typography.subtitle1
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionsInteract: {
    display: 'flex'
  },
  actionsMore: {
    display: 'flex',
  },
  icon: {
    cursor: 'pointer'
  }
}));

const Content = ({content}) => {

  const {
    id,
    slug,
    name, 
    description,
    content_type,
    difficulty_level,
    years_asked,
    created_at,
    updated_at,

    admin_name, 
    admin_slug
  } = content;

  // ******************** MENU (DROPDOWN)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // ******************** MENU (DROPDOWN)

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.title}>
            {ReactHtmlParser(name)}
          </div>
          <div className={classes.description}>
            {ReactHtmlParser(description)}
          </div>
          <div className={classes.actions}>
            <div className={classes.actionsInteract}>
              <div className={classes.icon} style={{marginRight: '20px'}}>
                <ThumbUpIcon />
              </div>
              <div  className={classes.icon} style={{marginRight: '20px'}}>
                <ThumbDownIcon />
              </div>
            </div>
            <div className={classes.actionsMore}>
              <div className={classes.icon} style={{marginRight: '20px'}}>
                <ChatBubbleIcon />
              </div>
              <div className={classes.icon} >
                <span onClick={handleClick}>
                  <MoreVertIcon />
                </span>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <AddIcon /> &nbsp; Add to My Study Room
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <BookmarkIcon /> &nbsp; Add to Bookmark
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <EditIcon /> &nbsp; Request For a Change
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NotInterestedIcon /> &nbsp; Not Intrested
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ReportIcon /> &nbsp; Report
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Content;