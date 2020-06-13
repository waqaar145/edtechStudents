import {useState} from 'react';
import SimpleLayout from '../src/components/layouts/SimpleLayout'
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {topLevelService} from './../src/services'
import {connect} from 'react-redux';
import Semesters from './../src/components/engineering/semesters'
import Subjects from './../src/components/engineering/subjects'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3%'
  },
  semestersContainer: {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius
  },
  header: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey['300']}`
  },
  headerText: {
    ...theme.typography.h5,
    textAlign: 'center'
  },
  subjectHeaderText: {
    ...theme.typography.h5
  },
  subjectArea: {
    marginTop: '10px'
  }
}))

const Engineering = (props) => {

  const {
    semesters,
    subjects
  } = props;

  const [activeSemester, setActiveSemester] = useState(semesters.length > 0 ? semesters[0]['id'] : null);

  const handleCurrentSemester = (id) => {
    setActiveSemester(id)
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
                <div className={classes.header}>
                  <div className={classes.subjectHeaderText}>
                    Semester 1
                  </div>
                </div>
              </div>
              <div className={classes.subjectArea}>
                <Grid container spacing={3}>
                  {
                    (Array.isArray(subjects) && subjects.length > 0)
                      &&
                    <>
                      {
                        subjects.map((subject, index) => {
                          return (
                            <Grid item xs={3} key={index} >
                              <Subjects subject={subject}/>
                            </Grid>
                            
                          )
                        })
                      }
                    </>
                  }
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </SimpleLayout>
  )
}

Engineering.getInitialProps = async ({store, req}) => {
  try {
    const isServer = !!req;
    const semesters = await topLevelService.getSemesters(isServer);
    const subjects = await topLevelService.getSubjects(isServer);
    let data = {semesters: semesters.data.data, subjects: subjects.data.data};
    await store.dispatch({type: 'WATCH_ENGG_PAGE_CHANGES', data});
    return {}
  } catch (err) {
    console.log(err)
    return {}
  }
}

function mapStateToProps (state) {
  return {
    semesters: state.TopLevel.semesters,
    subjects: state.TopLevel.subjects,
  }
}

export default connect(mapStateToProps)(Engineering);