import React, { Dispatch, SetStateAction } from "react";
import RootContentBlocker from "./ContentBlocker";

export const BlockerContext = React.createContext<
  [RootContentBlocker | undefined, Dispatch<SetStateAction<RootContentBlocker | undefined>>]
>(undefined);
