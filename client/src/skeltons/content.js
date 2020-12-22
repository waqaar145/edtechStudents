import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const h5s = Array.from(Array(6), () => {
  return 'h5'
})
const variants = ['h2', ...h5s];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingTop: '5px',
    paddingRight: '10px',
    paddingLeft: '10px',
    marginBottom: '30px'
  }
}));


const ContentSkelton = (props) => {
  const classes = useStyles();
  return (
    <>
      {
        Array.from(Array(2), (e, idx) => {
          return (
            <div className={classes.root} key={idx}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {variants.map((variant, i) => (
                    <Typography component="div" key={i} variant={variant}>
                      <Skeleton animation="wave"/>
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </div>
          )
        })
      }
    </>
  );
}

export default ContentSkelton;