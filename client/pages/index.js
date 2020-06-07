import Link from 'next/link'
import Navbar from '../src/components/Navbar';
import {contentActionTypes} from './../src/store/content/content.actiontype'
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

const Index = (props) => {

  const {
    data
  } = props;

  return (
    <div>
      <Navbar />
      <h3>Hello World test this is super fast. is it now so?</h3>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href='/about'>
        <a>About again</a>
      </Link>
    </div>
  )
}

Index.getInitialProps = async ({store}) => {
  await store.dispatch({type: contentActionTypes.WATCH_GET_CONTENT});
  return {}
}

function mapDispatchToProps (state) {
  return {
    data: state.Content.contents
  }
}

export default connect(mapDispatchToProps, null)(Index);