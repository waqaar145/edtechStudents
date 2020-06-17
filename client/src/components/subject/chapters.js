import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      width: '100%',
        '&:hover': {
          background: theme.palette.background.default,
          cursor: 'pointer'
      },
    },
    active: {
      background: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.grey['200']}`,
      borderTop: `1px solid ${theme.palette.grey['200']}`
    },
    chapterNumber: {
      background: theme.palette.grey['300'],
      height: '40px',
      width: '40px',
      borderRadius: '50%',
      lineHeight: '40px',
      textAlign: 'center'
    }
  })
});

const ChaptersList = ({id, handleCurrentChapter, activeChapter}) => {

  const classes = useStyles();

  return (
    <List className={`${classes.root} ${activeChapter === id ? `${classes.active}` : ''}`} onClick={() => handleCurrentChapter(id)}>
      <ListItem>
        <ListItemIcon>
          <div className={classes.chapterNumber}>
            {id}
          </div>
        </ListItemIcon>
        <ListItemText primary="Understand the theory of laplace theorem" />
      </ListItem>
    </List>
  )
}

export default ChaptersList;