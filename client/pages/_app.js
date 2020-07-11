import App from 'next/app'
import { END } from 'redux-saga'
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { wrapper } from '../src/store/index'
import theme from '../src/utils/theme'
import { authActionTypes } from './../src/store/auth/auth.actiontype'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

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

    return { pageProps, store: ctx.store }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {
          'subscribe' in store.__persistor
           ? 
          <PersistGate persistor={'subscribe' in store.__persistor ? store.__persistor : {}}>
           <Component {...pageProps} />
          </PersistGate>
           :
          <div>
            <Component {...pageProps} />
          </div>
        }
      </MuiThemeProvider>
    )
  }
}

export default wrapper.withRedux(MyApp)