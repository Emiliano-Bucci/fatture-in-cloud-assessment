import React, { Fragment } from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  );
};

export default App;
