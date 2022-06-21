import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import pageTitleReducer from "./pageTitle.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  pageTitle: pageTitleReducer,
});

export default rootReducer;
