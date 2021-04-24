import moment from "moment";

export const formatDateTime = datetime => {
    return moment(datetime).format("dddd DD/MM/YYYY HH:mm");
}

export const formatMessageDatetime = (datetime, justNow, minuteAgo, yesterday) => {
    const now = new Date();
    const timeDb = new Date(datetime);
    const minutes = Math.floor((now - timeDb) / 60000);
    const date = Math.floor(minutes / 1440);
    const seconds = Math.floor(((now - timeDb) % 60000) / 1000).toFixed(0);
    if (now.getDate() === timeDb.getDate() && now.getMinutes() === timeDb.getMinutes() && +seconds < 60) return justNow;
    else if (now.getDate() === timeDb.getDate() && now.getMinutes() === timeDb.getMinutes() && +minutes < 2) return minuteAgo;
    else if (now.getDate() === timeDb.getDate() && now.getHours() >= timeDb.getHours()) return moment(timeDb).format("HH:mm A")
    else if (now.getDate() > timeDb.getDate() && +date === 1) return yesterday;
    else return moment(timeDb).format("HH:mm A DD/MM");
}