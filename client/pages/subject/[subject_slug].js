import SimpleLayout from '../../src/components/layouts/SimpleLayout'
import { Container, Grid } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const SubjectPage = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: '3%'
    },
    main: {
      marginTop: '3px',
      height: `calc(100vh - ${height}px - 3px)`,
      backgroundColor: theme.palette.background.paper
    },
    sidebar: {
      borderRight: `1px solid ${theme.palette.grey['200']}`,
      overflowY: 'scroll'
    },
    content: {
      overflowY: 'scroll'
    }
  }));

  const [height, setHeight] = useState(null);

  useEffect(() => {
    const el = document.getElementsByClassName('header')[0]
    setHeight(el.offsetHeight)
  }, [])

  const classes = useStyles();

  return (
    <SimpleLayout>
      <Grid container>
        <Grid item xs={3}>
          <div className={`${classes.sidebar} ${classes.main}`}>
            {
              Array.from(Array(100), (e, i) => {
                return (
                  <div key={i}>
                    as df asd f sdf <br />
                  </div>
                )
              })
            }
          </div>
        </Grid>
        <Grid item xs={9} className={`${classes.content} ${classes.main}`}>
          {
            Array.from(Array(200), (e, i) => {
              return (
                <div key={i}>
                  This is content area This is content area This is content area This is content area This is content area This is content area <br />
                </div>
              )
            })
          }
        </Grid>
      </Grid>
    </SimpleLayout>
  )
}

export default SubjectPage;