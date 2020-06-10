import App from 'next/app'
import { END } from 'redux-saga'
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { wrapper } from '../src/store/index'
import theme from '../src/utils/theme'
import { authActionTypes } from './../src/store/auth/auth.actiontype'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    }

    if (ctx.req) {
      ctx.store.dispatch({type: authActionTypes.WATCH_LOGGED_IN_USER, headers: ctx.req.headers.cookie ? ctx.req.headers.cookie : ''});
      ctx.store.dispatch(END)
      await ctx.store.sagaTask.toPromise()
    }

    return { pageProps }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    )
  }
}

export default wrapper.withRedux(MyApp)