import ConfigAPIURL from "../config/ConfigAPIURL";

const APIRequest = {
  request: function (method, url, body) {
    let config = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
        "Accept-Language":
          JSON.parse(localStorage.getItem("lng")) !== undefined &&
          JSON.parse(localStorage.getItem("lng")) !== null
            ? JSON.parse(localStorage.getItem("lng")).code
            : "",
      },
      credentials: "include",
    };

    if (body !== "") {
      config.body = body;
    }

    return fetch(url, config)
      .then((response) => {
        // Handle session token refresh
        response.headers.forEach((val, key) => {
          if (
            key === "reconnection" &&
            val === "true" &&
            sessionStorage.getItem("payhub.session")
          ) {
            sessionStorage.setItem(
              "payhub.session",
              response.headers.get("user-token")
            );
          }
        });

        return response.json();
      })
      .then((data) => {
        return this.returnResponse(data, url, config); // Handle the response
      })
      .catch(() => {
        return { returncode: 0, errors: [{ errormsg: "Timeout Error." }] };
      });
  },

  returnResponse: async function (response, url, config) {
    const userId = localStorage.getItem("userId");

    // Refresh token logic (if needed)
    if (response?.data?.responseCode === 118 && userId) {
      const token = await this.refreshToken(userId);
      localStorage.setItem("token", token);

      // Check if the page has already been reloaded
      const hasReloaded = sessionStorage.getItem("hasReloaded");
      if (!hasReloaded) {
        // Set the flag to prevent another reload
        sessionStorage.setItem("hasReloaded", "true");
        window.location.reload();
      }
    }

    // Handle errors
    if (response.status !== undefined && response.status !== null) {
      return { returncode: 0, errors: [{ errormsg: response.error }] };
    } else if (response.returncode !== 2) {
      return Promise.resolve(response);
    } else if (response.returncode === 2) {
      window.location.href = "#/login";
    }
  },

  refreshToken: async function (recordId) {
    try {
      // Construct the URL with query parameter
      const url = `${ConfigAPIURL.refreshToken}?recordId=${recordId}`;

      // Fetch with GET method
      const response = await fetch(url, {
        method: "GET",
      });

      const result = await response.json();
      let token;
      if (result?.data?.responseCode === 109) {
        token = result?.data?.result.token;
      }
      return token;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  },
};

export default APIRequest;
