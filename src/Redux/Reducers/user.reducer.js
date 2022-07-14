import { saveUserInfo } from "../../Helpers/SaveUserInfo";
import { userActions } from "../Actions";
import { decodeToken } from "react-jwt";
import { LoadUserInfo } from "../../Helpers/LoadUserInfo";

let initialState;
const emptyState = {
  isAuthenticated: false,
  error: "",
  token: null,
  user: {
    userName: "",
    permission: 0,
    name: "",
    role: "",
    email: "",
  },
};

const userObj = LoadUserInfo();
if (userObj && userObj.token) {
  const decodedToken = decodeToken(userObj.token);
  initialState = {
    ...userObj,
    user: {
      userName: decodedToken.userName,
      permission: decodedToken.permission,
      name: decodedToken.name,
      role: decodedToken.Role,
      email: decodedToken.Email,
    },
  };
} else {
  initialState = { ...emptyState };
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.LOGIN:
      const decodedToken = decodeToken(action.payload.token);
      saveUserInfo({
        isAuthenticated: true,
        error: "",
        token: action.payload.token,
      });
      return {
        ...state,
        isAuthenticated: true,
        error: "",
        token: action.payload.token,
        user: {
          userName: decodedToken.userName,
          permission: decodedToken.permission,
          name: decodedToken.name,
          role: decodedToken.Role,
          email: decodedToken.Email,
        },
      };
    case userActions.LOGOUT:
      saveUserInfo(emptyState);
      return emptyState;
    default:
      return state;
  }
};

export default userReducer;
