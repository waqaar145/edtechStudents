import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));

const SimpleAlert = ({color, errors}) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        errors.map((error, index) => {
          return (
            <Alert key={index} severity={color}>{error.msg}</Alert>
          )
        })
      }
    </div>
  )
}

export default SimpleAlert;