export const userActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const pageTitleActions = {
  CHANGE_TITLE: "CHANGE_TITLE",
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

export const pageTitleCreator = {
  change: (title) => ({
    type: pageTitleActions.CHANGE_TITLE,
    payload: title,
  }),
};
