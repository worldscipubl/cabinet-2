import {BASE_URL} from "./constants";

export const getHashFromString = (str) => {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

export const getDate = (value, isFull) => {
    if (!value) return "00.00.00";

    const SERVER_TIME_ZONE = 3;
    // Смещение времени сервера относительно UTC
    const timeZoneOffsetServer = SERVER_TIME_ZONE * 3600;
    // Смещение времени пользователя относительно UTC
    const timezoneOffsetUTC = new Date().getTimezoneOffset() * 60;

    const dateUTC = (+value) - timeZoneOffsetServer;
    const dateLocal = dateUTC - timezoneOffsetUTC;
    const date = new Date(dateLocal * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    if (isFull) return `${day}.${(0 + String(month + 1).slice(-2))}.${year} / ${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    return `${String(day).padStart(2, "0")}.${(String(month + 1).padStart(2, "0"))}.${year}`;
};

export const getTime = (value) => {
    const SERVER_TIME_ZONE = 3;
    // Смещение времени сервера относительно UTC
    const timeZoneOffsetServer = SERVER_TIME_ZONE * 3600;
    // Смещение времени пользователя относительно UTC
    const timezoneOffsetUTC = new Date().getTimezoneOffset() * 60;

    const dateUTC = (+value) - timeZoneOffsetServer;
    const dateLocal = dateUTC - timezoneOffsetUTC;
    const date = new Date(dateLocal * 1000);

    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

export const downloadBlobFile = (blob) => {
    if (!blob) return;
    const type = blob.type;
    const url = window.URL.createObjectURL(
        new Blob([blob], {type})
    );

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.setAttribute("download", type);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

export const getImgFromFile = (file) => {
    const isString = typeof (file) === 'string'
    if (isString) return file;

    const isValid = (file instanceof Blob) || (file instanceof File);
    if (isValid) return URL.createObjectURL((file));
}

export const makeFullUrl = (link) => {
    return `${BASE_URL}${link}`;
}

export const getSrcBase64 = (data) => {
    if (!data) return null;
    return `data:image/jpeg;base64,${hexToBase64(data)}`;
}


function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
