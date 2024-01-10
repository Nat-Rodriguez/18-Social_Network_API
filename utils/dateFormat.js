function addDateSuffix(date) {
  const suffixes = ["th", "st", "nd", "rd"];
  const day = date % 10 < 4 && !(date % 100 > 10 && date % 100 < 14) ? date % 10 : 0;
  return `${date}${suffixes[day] || suffixes[0]}`;
}

function formatDate(timestamp, options = { monthLength: 'short', dateSuffix: true }) {
  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const { monthLength = 'short', dateSuffix = true } = options;
  const months = monthLength === 'short' ? monthsShort : monthsLong;

  const dateObj = new Date(timestamp);
  const month = months[dateObj.getMonth()];
  const day = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
  const year = dateObj.getFullYear();
  let hour = dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours();
  hour = hour === 0 ? 12 : hour;
  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  return `${month} ${day}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
}

module.exports = formatDate;
