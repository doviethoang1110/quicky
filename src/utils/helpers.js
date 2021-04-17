import moment from "moment";

export const formatDateTime = datetime => {
    return moment(datetime).format("dddd DD/MM/YYYY HH:mm");
}