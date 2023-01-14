import { createContext } from "react";
import { trendingStore } from "./TrendingStore";
import { mediaStore } from "./MediaStore";
import { userStore } from "./UserStore";
import { searchStore } from "./SearchStore";

export const StoreContext = createContext({
  trendingStore,
  mediaStore,
  userStore,
  searchStore,
});
