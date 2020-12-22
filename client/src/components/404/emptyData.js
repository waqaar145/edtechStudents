import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
    marginTop: '20px',
    textAlign: 'center',
    // boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius
  },
  emptyDataContent: {
    paddingTop: '10%',
    paddingBottom: '10%'
  },
  heading: {
    ...theme.typography.h6
  },
  sheading: {
    ...theme.typography.subtitle1,
    color: theme.palette.grey['700']
  }
}));

const EmptyData = ({heading, subHeading, image}) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.emptyDataContent}>
        <div className={classes.heading}>
          {heading}
        </div>
        <div className={classes.sheading}>
          {subHeading}
        </div>
      </div>
    </div>
  )
}

export default EmptyData;