import SimpleLayout from '../../src/components/layouts/SimpleLayout'
import { Container, Grid } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import ChaptersList from './../../src/components/subject/chapters'
import InputMaterialSearch from './../../src/components/forms/InputMaterialSearch'

const SubjectPage = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: '3%'
    },
    main: {
      marginTop: '3px',
      height: `calc(100vh - ${height}px - 3px)`
    },
    sidebar: {
      borderRight: `1px solid ${theme.palette.grey['200']}`,
      backgroundColor: theme.palette.background.paper,
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: '0.1em',
        
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
        borderRadius: '10px'
      }
    },
    content: {
      borderRight: `1px solid ${theme.palette.grey['200']}`,
      overflowY: 'scroll'
    },
    contentContainer: {
      // padding: '10px'
    },
    contentHeader: {
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper
    },
    subjectHeaderText: {
      ...theme.typography.h6,
    },
    contentBody: {
      padding: theme.spacing(2)
    },
    internalCustomTab: {
      backgroundColor: theme.palette.background.paper,
      paddingLeft: '10px',
      paddingTop: '10px',
      paddingRight: '10px',
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '10px',
      ...theme.typography.subtitle1
    },
    singleTab: {
      cursor: 'pointer',
      paddingBottom: '5px',
      marginRight: '15px',
      borderBottom: `2px solid ${theme.palette.primary.main}`
    }
  }));

  const [height, setHeight] = useState(null);
  const [activeChapter, setActiveChapter] = useState(1);

  useEffect(() => {
    const el = document.getElementsByClassName('header')[0]
    setHeight(el.offsetHeight)
  }, []);

  const handleCurrentChapter = (id) => {
    setActiveChapter(id)
  }

  const handleSearchContent = (data) => {}

  const classes = useStyles();

  return (
    <SimpleLayout>
      <Grid container>
        <Grid item xs={3} className={`${classes.sidebar} ${classes.main}`}>
          {
            Array.from(Array(22), (e, i) => {
              return (
                <div key={i}>
                  <ChaptersList id={i+1} handleCurrentChapter={handleCurrentChapter} activeChapter={activeChapter}/>
                </div>
              )
            })
          }
        </Grid>
        <Grid item xs={9} className={`${classes.content} ${classes.main}`}>
          <div className={classes.contentContainer}>
            <div className={classes.contentHeader}>
              <div className={classes.subjectHeaderText}>
                This is current chapter selected
              </div>
              <InputMaterialSearch
                handleSearch={handleSearchContent}
              />
            </div>
            <div className={classes.contentBody}>
              <div className={classes.internalCustomTab}>
                <div className={classes.singleTab}>
                  All
                </div>
                <div className={classes.singleTab}>
                  Questions
                </div>
                <div className={classes.singleTab}>
                  Theory
                </div>
              </div>
              {
                Array.from(Array(200), (e, i) => {
                  return (
                    <div key={i}>
                      This is content area This is content area This is content area This is content area This is content area This is content area  content area This is content area This is content area  content area This is content area This is content area  content area This is content area This is content area  content area This is content area This is content area  content area This is content area This is content area  content area This is content area This is content area  content area This is content area This is content area  content area This is content area This is content area <br />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </Grid>
      </Grid>
    </SimpleLayout>
  )
}

export default SubjectPage;