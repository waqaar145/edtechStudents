import {useState} from 'react';
import SimpleLayout from '../src/components/layouts/SimpleLayout'
import { Container, Grid } from '@material-ui/core';
import {topLevelActionTypes} from './../src/store/top-level/top_level.actiontype'
import {topLevelService} from './../src/services'
import {connect} from 'react-redux';
import Semesters from './../src/components/engineering/semesters'
import Subjects from './../src/components/engineering/subjects'
import EmptyData from './../src/components/404/emptyData';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import Router from 'next/router'
import InputMaterialSearch from './../src/components/forms/InputMaterialSearch'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3%'
  },
  semestersContainer: {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius
  },
  header: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey['300']}`
  },
  headerSearch : {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    ...theme.typography.h6,
    textAlign: 'center'
  },
  subjectHeaderText: {
    ...theme.typography.h6
  },
  subjectArea: {
    marginTop: '10px'
  }
}))

const Engineering = (props) => {

  const {
    semesters,
    current_subjects,
    showSubjectsBySemester,
    searchSubjects
  } = props;

  const [lastActiveSemester, setLastActiveSemester] = useState(null);
  const [activeSemester, setActiveSemester] = useState(semesters.length > 0 ? semesters[0]['id'] : null);

  const handleCurrentSemester = (id) => {
    setActiveSemester(id)
    showSubjectsBySemester(id)
  }

  const handleSearchSubjects = (e) => {
    const {value} = e.target;
    if (value) {
      searchSubjects(value);
      setLastActiveSemester(activeSemester)
      setActiveSemester(null)
    } else {
      if (semesters.length > 0) {
        showSubjectsBySemester(semesters[0]['id'])
        setActiveSemester(lastActiveSemester ? lastActiveSemester : semesters[0]['id'])
      }
    }
  } 

  const redirectToSubject = (slug) => {
    Router.push({
      pathname: `/subject/${slug}`
    })
  }

  const classes = useStyles();

  return (
    <SimpleLayout>
      <Container>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div className={classes.semestersContainer}>
                <div className={classes.header}>
                  <div className={classes.headerText}>
                    Semesters
                  </div>
                </div>
                <div className={classes.body}>
                  {
                    (Array.isArray(semesters) && semesters.length > 0)
                      &&
                    <>
                      {
                        semesters.map((semester, index) => {
                          return (
                            <Semesters key={index} semester={semester} activeSemester={activeSemester} handleCurrentSemester={handleCurrentSemester}/>
                          )
                        })
                      }
                    </>
                  }
                </div>
              </div>
            </Grid>
            <Grid item xs={9}>
              <div className={classes.semestersContainer}>
                <div className={classes.headerSearch}>
                  <div className={classes.subjectHeaderText}>
                    {activeSemester ? semesters.filter(semester => semester.id === activeSemester)[0].name : ''}
                  </div>
                  <InputMaterialSearch
                    handleSearch={handleSearchSubjects}
                  />
                </div>
              </div>
              <div className={classes.subjectArea}>
                <Grid container spacing={3}>
                  {
                    (Array.isArray(current_subjects) && current_subjects.length > 0)
                      &&
                    <>
                      {
                        current_subjects.map((subject, index) => {
                          return (
                            <Grid item xs={3} key={index} >
                              <Subjects 
                                subject={subject}
                                redirectToSubject={redirectToSubject}
                                />
                            </Grid>
                            
                          )
                        })
                      }
                    </>
                  }
                </Grid>
              </div>
              {
                (Array.isArray(current_subjects) && current_subjects.length === 0 && activeSemester)
                  &&
                <EmptyData 
                  heading="Sit tight" 
                  subHeading="We are working on it, Click here to get notified" 
                  image=""
                  />
              }
              {
                (Array.isArray(current_subjects) && current_subjects.length === 0 && !activeSemester)
                  &&
                <EmptyData 
                  heading="No subject found!"
                  image=""
                  />
              }
            </Grid>
          </Grid>
        </div>
      </Container>
    </SimpleLayout>
  )
}

Engineering.propTypes = {
  semesters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired
    })
  ).isRequired,
  current_subjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      semester_id: PropTypes.number.isRequired
    })
  ).isRequired,
  showSubjectsBySemester: PropTypes.func.isRequired,
  searchSubjects: PropTypes.func.isRequired
}


Engineering.getInitialProps = async ({store, req}) => {
  try {
    const isServer = !!req;
    const semesters = await topLevelService.getSemesters(isServer);
    const subjects = await topLevelService.getSubjects(isServer);
    let data = {semesters: semesters.data.data, subjects: subjects.data.data};
    await store.dispatch({type: topLevelActionTypes.WATCH_ENGG_PAGE_CHANGES, data});
    return {}
  } catch (err) {
    console.log(err)
    return {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showSubjectsBySemester: (id) => dispatch({type: topLevelActionTypes.WATCH_SEMESTER_CHANGE, data: id}),
    searchSubjects: (data) => dispatch({type: topLevelActionTypes.WATCH_SEARCH_SUBJECTS, data})
  }
}

function mapStateToProps (state) {
  return {
    semesters: state.TopLevel.semesters,
    current_subjects: state.TopLevel.current_subjects,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Engineering);