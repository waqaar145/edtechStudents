import SimpleLayout from './SimpleLayout'
import { Container, Grid } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import ChaptersList from './../subject/chapters'
import InputMaterialSearch from './../forms/InputMaterialSearch';
import Link from 'next/link';
import { useRouter } from 'next/router'

const SubjectLayout = (props) => {

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
      '& a': {
        color: theme.palette.text.primary,
        textDecoration: 'none'
      }
    },
    tabActive: {
      cursor: 'pointer',
      paddingBottom: '5px',
      marginRight: '15px',
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      '& a': {
        textDecoration: 'none',
        color: theme.palette.primary.main,
      }
    }
  }));

  const router = useRouter()
  const [activeTab, setActiveTab] = useState('');


  const [height, setHeight] = useState(null);
  const [activeChapter, setActiveChapter] = useState(1);

  useEffect(() => {
    const el = document.getElementsByClassName('header')[0]
    setHeight(el.offsetHeight);
    if (router.pathname.split('/').length === 3) {
      setActiveTab('all')
    } else {
      if (router.pathname.split('/')[3] === 'sums') {
        setActiveTab('sums')
      } else if (router.pathname.split('/')[3] === 'theories'){
        setActiveTab('theories')
      }
    }
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
                <div className={`${activeTab === 'all' ? classes.tabActive : classes.singleTab}`}>
                  <Link href="/subject/name" passHref>
                    <a>
                      All <span style={{fontSize: '14px'}}>(26)</span>
                    </a>
                  </Link>
                </div>
                <div className={`${activeTab === 'theories' ? classes.tabActive : classes.singleTab}`}>
                  <Link href="/subject/name/theories" passHref>
                    <a>
                      Theories <span style={{fontSize: '14px'}}>(10)</span>
                    </a>
                  </Link>
                </div>
                <div className={`${activeTab === 'sums' ? classes.tabActive : classes.singleTab}`}>
                  <Link href="/subject/name/sums" passHref>
                    <a>
                      Questions <span style={{fontSize: '14px'}}>(16)</span>
                    </a>
                  </Link>
                </div>
              </div>
              {props.children}
            </div>
          </div>
        </Grid>
      </Grid>
    </SimpleLayout>
  )
}

export default SubjectLayout;