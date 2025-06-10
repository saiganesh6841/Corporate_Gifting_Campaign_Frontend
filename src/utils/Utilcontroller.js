const utilController = {
  textCapitalise: function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  },
  isEncoded: (str) => {
    try {
      window.atob(str);
      return true;
    } catch {
      return false;
    }
  },
  getQueryParams: (history, param) => {
    // pass the history object as argument
    if (!history) throw new Error("History object is undefined");
    const urlParams = new URLSearchParams(history.location.search);
    const payload = urlParams.get(param);
    return payload;
  },
  getDateTime: (epochdate) => {
    return new Date(epochdate * 1000)?.toLocaleDateString("en-in");
  },
  getFormattedDateandTime: (epochdate) => {
    if (epochdate) {
      const date = new Date(epochdate * 1000);
      const options = {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleDateString("en-US", options);
    }
    return "";
  },
  getFormattedTime: (epochdate) => {
    if (epochdate) {
      const date = new Date(epochdate * 1000); // epoch in seconds
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // set to false if you prefer 24-hour format
      };
      return date.toLocaleTimeString("en-US", options);
    }
    return "";
  },

  getFormattedDate: (epochdate) => {
    const date = new Date(epochdate * 1000);
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  },
  getDate: (epochdate) => {
    const date = new Date(epochdate * 1000);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  },
  downloadUrl: (Image) => {
    const link = document.createElement("a");
    link.href = Image;
    link.setAttribute("download", "image.png");
    document.body.appendChild(link);
    link.click();
  },
  //To capitalize each word first letter
  formatTextToCapitalize: (value) => {
    return value
      ?.split(/(?=[A-Z])/)
      .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
      .join(" ");
  },
  truncateMiddle: (str, maxLength) => {
    if (str?.length <= maxLength) return str;
    const startLength = Math.ceil(maxLength / 2);
    const endLength = Math.floor(maxLength / 2);
    return (
      str?.substr(0, startLength) + "..." + str?.substr(str?.length - endLength)
    );
  },
  roundToTwo: (num) => {
    return Math.round(num * 100) / 100;
  },

  camelCaseToNormal: (string) => {
    if (!string) return "";

    return string
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Handles multiple camel case transitions
      .replace(/^./, string[0].toUpperCase()); // Capitalizes the first letter
  },

  stringToColor: (string) => {
    let hash = 0;
    for (let i = 0; i < string?.length; i++) {
      hash = string?.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value?.toString(16)).substr(-2);
    }
    return color;
  },

  countStatuses: (assignedEmployees) => {
    const statusCounts = assignedEmployees.reduce((acc, employee) => {
      const status = employee.status;

      // Initialize the status count if it doesn't exist
      if (!acc[status]) {
        acc[status] = 0;
      }

      // Increment the status count
      acc[status]++;

      return acc;
    }, {});

    // Format the result as per the requirement
    const formattedCounts = Object.entries(statusCounts).map(
      ([status, count]) => {
        switch (status) {
          case "pending":
            return `${count}p`;
          case "in-progress":
            return `${count}ip`;
          case "completed":
            return `${count}c`;
          case "cancelled":
            return `${count}ca`;
          default:
            return "";
        }
      }
    );

    return formattedCounts.join(", ");
  },
};

export default utilController;
