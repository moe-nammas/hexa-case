export const saveUserInfo = (userObj) => {
  try {
    if (!userObj) {
      return sessionStorage.clear();
    }
    sessionStorage.clear();
    const newUserObj = JSON.stringify(userObj);
    sessionStorage.setItem("user", newUserObj);
  } catch (error) {
    console.log("Save state error...", error);
  }
};
