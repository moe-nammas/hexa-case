import { pageTitleActions } from "../Actions";

const initialState = {
  pageTitle: "Dashboard",
};

const pageTitleReducer = (state = initialState, action) => {
  switch (action.type) {
    case pageTitleActions.CHANGE_TITLE:
      return {
        pageTitle: action.payload.title,
      };
    default:
      return state;
  }
};

export default pageTitleReducer;
