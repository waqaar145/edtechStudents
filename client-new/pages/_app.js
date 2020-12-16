import App from "next/app";
import { wrapper } from "./../src/store/index";
import { END } from 'redux-saga'
import {authActionTypes} from './../src/store/auth/auth.actiontype'
import "bootstrap/dist/css/bootstrap.min.css";
import "./../src/assets/styles/main.css";
import "./../src/assets/styles/navbar/mainHeader.css";
import "./../src/assets/styles/dropdown.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };
    if (ctx.req) {
      ctx.store.dispatch({type: authActionTypes.WATCH_LOGGED_IN_USER, headers: ctx.req.headers.cookie ? ctx.req.headers.cookie : ''});
      ctx.store.dispatch(END)
      await ctx.store.sagaTask.toPromise()
    }
    return { pageProps, store: ctx.store };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
