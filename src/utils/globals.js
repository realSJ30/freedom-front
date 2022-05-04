import moment from "moment";

export const convertDate = (date) => {
  return moment(date).format("YYYY-MM-DD h:mm a");
};
