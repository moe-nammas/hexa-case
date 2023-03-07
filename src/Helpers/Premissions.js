import store from "../Redux/Store";

const Perm = {
  viewer: 1,
  admin: 2,
};

export function isAuthorized(...IDs) {
  const { user } = store.getState().user;
  if (user && user.permission) {
    const permissions = parseInt(user.permission);
    for (let i = 0; i < IDs.length; i++) {
      if (permissions === IDs[i]) {
        return true;
      }
    }
    return false;
  }
}
