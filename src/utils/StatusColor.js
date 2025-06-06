// utils/getStatusStyles.js

export const getStatusStyles = (status) => {
  let backgroundColor = "";
  let color = "";

  switch (status?.toLowerCase()) {
    case "completed":
      backgroundColor = "#e6f4ea"; // light green
      color = "green";
      break;
    case "in progress":
      backgroundColor = "#e8f0fe"; // light blue
      color = "#1967d2";
      break;
    case "pending":
      backgroundColor = "#fff8e1"; // light yellow
      color = "#f9a825";
      break;
    case "cancelled":
      backgroundColor = "#fdecea"; // light red
      color = "#d93025";
      break;
    case "inprogress":
      backgroundColor = "#D0E7FF"; // light red
      color = "#0078d4";
      break;
    default:
      backgroundColor = "#e0e0e0";
      color = "#000";
  }

  return {
    backgroundColor,
    color,
    padding: "4px 10px",
    borderRadius: "6px",
  };
};
