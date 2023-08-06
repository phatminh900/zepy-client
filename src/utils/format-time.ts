const formatTime = (timeStamp: Date | string) => {
  const time = new Intl.DateTimeFormat("vi-vn", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(timeStamp));

  return time;
};
const formatDate = (timeStamp: Date | string, locale?: string) => {
  return new Intl.DateTimeFormat(locale || "vi-vn").format(new Date(timeStamp));
};
export { formatDate, formatTime };
