import Link from 'next/link'
import {contentActionTypes} from './../src/store/content/content.actiontype'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core';
import SimpleLayout from '../src/components/layouts/SimpleLayout'

const Index = (props) => {

  const {
    data
  } = props;

  return (
    <SimpleLayout>
      <div>
        Home page
      </div>
    </SimpleLayout>
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