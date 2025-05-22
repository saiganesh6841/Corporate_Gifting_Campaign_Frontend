import ConfigAPIURL from "../../../../../config/ConfigAPIURL";
import APIRequest from "../../../../../utils/APIRequest";

function useServices() {
  const logoutFunction = async () => {
    try {
      const response = await APIRequest.request(
        "GET",
        ConfigAPIURL.adminLogout,
        ""
      );
      if (response.code === 100) {
        setTimeout(function () {
          window.location.reload();
        }, 500);
      }
      sessionStorage.clear();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    logoutFunction,
  };
}

export default useServices;
