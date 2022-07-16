import moment from "moment";

export const DataFormatter = (data) => {
  if (typeof data === "string") {
    if (!data || data === "NULL" || data.includes("0001")) return "No Data";
    else if (data.includes("-")) {
      return moment(data).format("DD-MM-yyyy hh:mm a");
    }
  } else {
    if (data) return data;
    else return "No Data";
  }
  return data;
};
