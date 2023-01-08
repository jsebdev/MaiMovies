import React from "react";
import { StoreContext } from "./Context";

export const useStore = () => React.useContext(StoreContext);
