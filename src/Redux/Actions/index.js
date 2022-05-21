export const userActions = {
  LOGIN: "LOGIN",
};

export const userActionCreator = {
  login: (credentials) => ({
    type: userActions.LOGIN,
    payload: credentials,
  }),
};
