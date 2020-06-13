import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
      '&:hover': {
        background: theme.palette.background.default,
        cursor: 'pointer'
    },
  },
  active: {
    background: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.grey['200']}`,
    borderTop: `1px solid ${theme.palette.grey['200']}`
  }
}));

const Semesters = ({semester: {id, name, thumbnail}, handleCurrentSemester, activeSemester}) => {
  const classes = useStyles();
  return (
    <List className={`${classes.root} ${activeSemester === id ? `${classes.active}` : ''}`} onClick={() => handleCurrentSemester(id)}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={name} src={thumbnail} />
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItem>
    </List>
  )
}

export default Semesters;