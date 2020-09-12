import React from "react";
import { BlockerContext } from "../model/BlockerContext";
import RootContentBlocker from "../model/ContentBlocker";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  const blockerContextValue = React.useState<RootContentBlocker | undefined>(undefined);

  return (
    <BlockerContext.Provider value={blockerContextValue}>
      <Component {...pageProps} />
    </BlockerContext.Provider>
  );
}

export default MyApp;
