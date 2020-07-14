import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Link from 'next/link';

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

const ChaptersList = ({chapter, subject_slug, chapter_slug, content_type, discusstion_started}) => {

  const classes = useStyles();

  return (
    <List className={`${classes.root} ${chapter.slug === chapter_slug ? `${classes.active}` : ''}`}>
      <Link href={`/subject/subject_slug?subject_slug=${subject_slug}&chapter_slug=${chapter.slug}&content_type=${content_type}`} as={`/subject/${subject_slug}/chapter/${chapter.slug}/${content_type}`}>
        <ListItem component="a">
          <ListItemIcon>
            <div className={classes.chapterNumber}>
              {chapter.chapter_number}
            </div>
          </ListItemIcon>
          {
            !discusstion_started &&
            <ListItemText primary={chapter.chapter_name} />
          }
        </ListItem>
      </Link>
    </List>
  )
}

export default ChaptersList;