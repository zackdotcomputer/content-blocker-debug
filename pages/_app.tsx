import React from "react";
import { BlockerContext } from "../components/model/BlockerContext";
import RootContentBlocker from "../components/model/ContentBlocker";
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
