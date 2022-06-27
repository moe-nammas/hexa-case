import { userActions } from "../Actions";

const initialState = {
  userName: "",
  isAuthenticated: false,
  permission: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.LOGIN:
      return {
        ...state,
        userName: action.payload.userName,
        isAuthenticated: true,
        permission: action.payload.permission,
      };
    case userActions.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
