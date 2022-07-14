import { userActions } from "../Actions";

const initialState = {
  userName: "",
  isAuthenticated: false,
  permission: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.LOGIN:
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", `${action.payload.userName}`);
      return {
        ...state,
        userName: action.payload.userName,
        isAuthenticated: true,
        permission: action.payload.permission,
      };
    case userActions.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
