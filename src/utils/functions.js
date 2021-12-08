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


export const getDate = (value) => {
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
  return `${day}.${(0 + String(month + 1).slice(-2))}.${year}`;
};
