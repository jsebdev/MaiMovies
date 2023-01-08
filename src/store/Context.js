import { createContext } from "react";
import { trendingStore } from "./TrendingStore";
import { mediaStore } from "./MediaStore";

export const StoreContext = createContext({
  trendingStore,
  mediaStore,
});
