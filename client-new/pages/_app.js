import App from "next/app";
import { wrapper } from "./../src/store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../src/assets/styles/main.css";
import "./../src/assets/styles/navbar/mainHeader.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
