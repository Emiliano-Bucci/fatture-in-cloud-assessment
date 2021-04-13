import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Global } from "@emotion/react";
import { globalStyles } from "theme/globalStyles";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
