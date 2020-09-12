import React from "react";
import MakerWidget from "../components/MakerWidget";
import { BlockerContext } from "../model/BlockerContext";
import RootContentBlocker from "../model/ContentBlocker";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  const blockerContextValue = React.useState<RootContentBlocker | undefined>(undefined);

  return (
    <BlockerContext.Provider value={blockerContextValue}>
      <head>
        <title>Webkit Content Blocker Debugger</title>
        <meta
          name="description"
          content="A straight-forward debugger to figure out which rules in the JSON definition file of a Webkit Content Blocker will trigger on a given load."
        />
      </head>
      <Component {...pageProps} />
      <MakerWidget />
    </BlockerContext.Provider>
  );
}

export default MyApp;
