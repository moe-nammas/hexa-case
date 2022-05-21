import { userActions } from "../Actions";

const initialState = {
  userName: "",
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.LOGIN:
      return {
        ...state,
        userName: action.payload.userName,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default userReducer;
