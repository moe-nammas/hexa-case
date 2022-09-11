import { dashboardFilterActions } from "../Actions";

const initialState = {
  filter: "today",
};

const dashboardFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardFilterActions.CHANGE_FILTER:
      return {
        filter: action.payload.filter,
      };
    default:
      return state;
  }
};

export default dashboardFilterReducer;
