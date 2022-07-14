export const LoadUserInfo = () => {
  try {
    const userObj = sessionStorage.getItem("user");
    if (userObj === null) {
      return {
        isAuthenticated: false,
        error: "User info is not valid",
        token: null,
      };
    }

    return JSON.parse(userObj);
  } catch (error) {
    console.log("error while loading user...", error);
    return undefined;
  }
};
