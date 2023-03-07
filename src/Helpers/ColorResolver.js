export const ColorResolver = (status) => {
  switch (status) {
    case "medium":
    case "pending":
      return "warning";
    case "closed":
    case "low":
      return "success";
    case "high":
    case "Delete":
      return "danger";
    case "Creation":
    case "open":
      return "primary";
  }
};
