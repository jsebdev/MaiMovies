import React from "react";
import { StoreContext } from "./Context";

export const useTrendingStore = () => React.useContext(StoreContext);
