export function getMonthName(monthNumber) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Ensure the number is within the valid range
  if (monthNumber < 1 || monthNumber > 12) {
    return "Invalid month number";
  }

  // Return the month's name
  return months[monthNumber - 1];
}

export const onFormatDate = (date) => {
  return !date
    ? ""
    : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export function formatCamelCaseToWords(camelCaseString) {
  if (!camelCaseString) return "";

  // Add a space before each uppercase letter and capitalize the first letter
  const formattedString = camelCaseString
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  return formattedString;
}
