import SubjectLayout from "../../src/components/layouts/SubjectLayout";
import {contentService} from './../../src/services'
import { contentActionTypes } from "./../../src/store/content/content.actiontype";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Content from './../../src/components/subject/content';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmptyData from './../../src/components/404/emptyData';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root1: {
    textAlign: 'center'
  },
}));

const AllContent = (props) => {
  const {
    loading,
    contents
  } = props;

  const classes = useStyles();

  return (
    <SubjectLayout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            {
              (!loading && Array.isArray(contents) && contents.length > 0)
                &&
              contents.map((content, index) => {
                return (
                  <Content key={index} content={content}/>
                )
              })
            }
            {
              (!loading && Array.isArray(contents) && contents.length === 0)
                &&
                <div className={classes.root1}>
                  <EmptyData 
                    heading="Nothing found" 
                    subHeading="There is no content" 
                    image=""
                    />
                </div>
            }
            {
              loading
                &&
              <div className={classes.root1}>
                <CircularProgress />
              </div>
            }
          </Grid>
          <Grid item xs={4}>
            Right
          </Grid>
        </Grid>
      </div>
    </SubjectLayout>
  )
}

AllContent.getInitialProps = async ({store, req, query}) => {
  try {
    const isServer = !!req;
    await store.dispatch({type: contentActionTypes.REQUEST});
    if (isServer || store.getState().Content.contents.length === 0) {
      let chapters = await contentService.getChaptersBySubjectSlug(query.subject_slug, isServer);
      await store.dispatch({type: contentActionTypes.GET_SUBJECT, data: chapters.data.data.subject});
      await store.dispatch({type: contentActionTypes.GET_CHAPTERS, data: chapters.data.data.chapters});
    }
    const contents = await contentService.getContentByChapterSlug(query.chapter_slug, query.content_type, isServer);
    await store.dispatch({type: contentActionTypes.GET_CONTENTS, data: contents.data.data});
    return {};
  } catch (err) {
    return {}
  } finally {
    await store.dispatch({type: contentActionTypes.COMPLETE});
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

function mapStateToProps (state) {
  return {
    contents: state.Content.contents,
    loading: state.Content.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllContent);