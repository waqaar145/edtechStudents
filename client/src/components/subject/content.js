import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EditIcon from '@material-ui/icons/Edit';
import ReportIcon from '@material-ui/icons/Report';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SimpleButton from'./../../components/buttons/simpleButton'
import Chip from '@material-ui/core/Chip';

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
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  description: {
    ...theme.typography.subtitle1,
    borderTop: `1px solid ${theme.palette.grey['200']}`
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionsInteract: {
    display: 'flex',
    alignItems: 'center'
  },
  actionsMore: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    cursor: 'pointer'
  },
  showExtraInfoIcon: {
    cursor: 'pointer',
    color: theme.palette.grey['400']
  },
  extraInfoArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '5px'
  },
  chip: {
    marginLeft: '5px',
    marginRight: '5px'
  }
}));

const Content = ({content, handleDiscussion}) => {

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
            <div>
            {ReactHtmlParser(name)}
            </div>
            <div className={classes.showExtraInfoIcon}>
              <InfoOutlinedIcon />
            </div>
          </div>
          <div className={classes.description}>
            {ReactHtmlParser(description)}
          </div>
          {/* <div className={classes.extraInfoArea}>
            <div>
            </div>
            <div>
              <Chip color="default" size="small" label="Hard" className={classes.chip}/>
              <span>|</span>
              {
                content.years_asked.map((asked, i) => {
                  return <Chip color="primary" size="small" label={`${asked.month} ${asked.year}`} key={i} className={classes.chip}/>
                })
              }
            </div>
          </div> */}
          <div className={classes.actions}>
            <div className={classes.actionsInteract}>
              <div className={classes.icon} style={{marginRight: '10px'}}>
                <ThumbUpIcon />
              </div>
              <div>
                123
              </div>
            </div>
            <div className={classes.actionsMore}>
              <div  className={classes.icon} style={{marginRight: '20px'}}>
                <SimpleButton 
                  type="submit"
                  name="Discussion"
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => handleDiscussion(content)}
                  />
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
          </Grid></Grid>
    </div>
  )
}

export default Content;