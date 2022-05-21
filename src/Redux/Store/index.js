import { createStore } from "redux";
import rootReducer from "../Reducers/root.reducer";

const store = createStore(rootReducer);

export default store;
