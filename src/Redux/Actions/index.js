export const userActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const userActionCreator = {
  login: (credentials) => ({
    type: userActions.LOGIN,
    payload: credentials,
  }),
  logout: () => ({
    type: userActions.LOGOUT,
  }),
};
