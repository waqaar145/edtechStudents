
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Subjects = ({subject: {id, name, slug, thumbnail}, redirectToSubject}) => {

  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={() => redirectToSubject(slug)}>
      <CardActionArea>
          <CardMedia
            className={classes.media}
            image={thumbnail}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="h3">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      {/* <Link href={`/subject/subject_slug?${slug}`} as={`/subject/${slug}`}>
      </Link> */}
    </Card>
  )
}

export default Subjects;