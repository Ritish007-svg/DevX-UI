import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import requestReducer from "./requestSlice"
const AppStore=configureStore({
reducer:{
  user:userReducer,
  feed:feedReducer,
  requests:requestReducer
}
});

export default AppStore;
