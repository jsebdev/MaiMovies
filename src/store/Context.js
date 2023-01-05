import { createContext } from "react";
import { trendingStore } from "./TrendingStore";

export const StoreContext = createContext({
  trendingStore,
});
