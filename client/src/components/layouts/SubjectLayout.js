import {useRef} from 'react';
import SimpleLayout from './SimpleLayout'
import { Container, Grid, ListItemIcon } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import ChaptersList from './../subject/chapters'
import InputMaterialSearch from './../forms/InputMaterialSearch';
import Link from 'next/link';
import { useRouter, withRouter } from 'next/router'
import {connect} from 'react-redux';
import {useScroll} from './../../hooks/useScroll'
import PropTypes from 'prop-types';

let fixedStyle = (theme) => ({
  root: {
    marginTop: '3%'
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
    position: '-webkit-sticky',
    position: 'sticky',
    top: '0',
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
  },
  chapterNumber: {
    background: theme.palette.grey['300'],
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    lineHeight: '40px',
    textAlign: 'center'
  },
  separator: {
    borderRight: '2px solid grey',
    paddingRight: '5px'
  }
});

const SubjectLayout = (props) => {

  const useStyles = makeStyles((theme) => ({
    ...fixedStyle(theme),
    main: {
      marginTop: '3px',
      height: `calc(100vh - ${height}px - 3px)`
    },
    content: {
      borderRight: `1px solid ${theme.palette.grey['200']}`,
      overflowY: 'scroll'
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
  }));

  const {
    chapters,
    total,
    theories,
    sums,
    router: {query: {chapter_slug, subject_slug, content_type}},
    start_discussion
  } = props;

  const router = useRouter()
  const [activeTab, setActiveTab] = useState('');
  const [activeChapter, setActiveChapter] = useState({});

  const [height, setHeight] = useState(null);

  useEffect(() => {
    const el = document.getElementsByClassName('header')[0]
    setHeight(el.offsetHeight);
  }, []);

  useEffect(() => {
    if (content_type) {
      if (content_type === 'all' || content_type === 'theories' || content_type === 'sums') {
        setActiveTab(content_type)
      }
    }
  }, [router])

  useEffect(() => {
    if (chapter_slug) {
      setActiveChapter(chapters.filter(chapter => chapter.slug === chapter_slug)[0])
    }
  }, [chapter_slug])

  const handleSearchContent = (data) => {}

  const classes = useStyles();

  const myRef = useRef(null)
  const { scrollX, scrollY, scrollDirection } = useScroll(typeof window === "undefined" || !window.document ? 0 : document.getElementById('internal-subject-link-tab'));

  return (
    <SimpleLayout>
      <Grid container>
        <Grid item xs={start_discussion ? 1 : 3} className={`${classes.sidebar} ${classes.main}`}>
          {
            chapters.map((chapter, i) => {
              return (
                <div key={i}>
                  <ChaptersList 
                    chapter={chapter} 
                    subject_slug={subject_slug} 
                    chapter_slug={chapter_slug}
                    content_type={content_type}
                    />
                </div>
              )
            })
          }
        </Grid>
        <Grid item xs={9} className={`${classes.content} ${classes.main}`}>
          <div className={classes.contentContainer}>
            <div className={classes.contentHeader}>
              <div className={classes.subjectHeaderText}>
                <div>
                  <span>
                  <ListItemIcon>
                    <div className={classes.chapterNumber}>
                      {(activeChapter && Object.keys(activeChapter).length > 0) ? activeChapter.chapter_number : ''}
                    </div>
                  </ListItemIcon>
                  </span>
                  <span>
                    {(activeChapter && Object.keys(activeChapter).length > 0) ? activeChapter.chapter_name : ''}
                  </span>
                </div>
              </div>
              <InputMaterialSearch
                handleSearch={handleSearchContent}
                placeholder="Search Subject"
              />
            </div>
            <div className={classes.contentBody}>
              <div className={classes.internalCustomTab} id="internal-subject-link-tab" ref={myRef}>
                <div className={`${activeTab === 'all' ? classes.tabActive : classes.singleTab}`}>
                  <Link href={`/subject/subject_slug?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_type=all`} as={`/subject/${subject_slug}/chapter/${chapter_slug}/all`}>
                    <a>
                      All&nbsp; 
                      <span style={{fontSize: '13px'}}>({total})</span>
                    </a>
                  </Link>
                </div>
                <a disabled>|</a>
                <div style={{marginLeft: '10px'}} className={`${activeTab === 'theories' ? classes.tabActive : classes.singleTab}`}>
                  <Link href={`/subject/subject_slug?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_type=theories`} as={`/subject/${subject_slug}/chapter/${chapter_slug}/theories`}>
                    <a>
                      Theories&nbsp;
                      <span style={{fontSize: '13px'}}>({theories})</span>
                    </a>
                  </Link>
                </div>
                <div className={`${activeTab === 'sums' ? classes.tabActive : classes.singleTab}`}>
                  <Link href={`/subject/subject_slug?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_type=sums`} as={`/subject/${subject_slug}/chapter/${chapter_slug}/sums`}>
                    <a>
                      Questions&nbsp; 
                      <span style={{fontSize: '13px'}}>({sums})</span>
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

SubjectLayout.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      chapter_name: PropTypes.string.isRequired,
      chapter_number: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  theories: PropTypes.number.isRequired,
  sums: PropTypes.number.isRequired,
  start_discussion: PropTypes.bool.isRequired
}


function mapStateToProps (state) {
  return {
    chapters: state.Content.chapters,
    total: state.Content.subject.total,
    theories: state.Content.subject.theories,
    sums: state.Content.subject.sums,

    start_discussion: state.builder.subjectLayoutBuilder.discussion.on
  }
}

export default connect(mapStateToProps)(withRouter(SubjectLayout));