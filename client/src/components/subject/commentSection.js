import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      paddingTop: '5px',
      paddingRight: '10px',
      paddingLeft: '10px',
      marginBottom: '30px'
      }
  })
});

const CommentSection = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      Here goes the discussions Here goes the discussions Here goes the discussions Here goes the discussions Here goes the discussions 
    </div>
  )
}

export default CommentSection;