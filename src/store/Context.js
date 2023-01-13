import { createContext } from "react";
import { trendingStore } from "./TrendingStore";
import { mediaStore } from "./MediaStore";
import { userStore } from "./UserStore";

export const StoreContext = createContext({
  trendingStore,
  mediaStore,
  userStore,
});
