import { store } from "../../../../../main";
import ConfigAPIURL from "../../../../../config/ConfigAPIURL";
import useAlert from "../../../../../hooks/useAlert";
import APIRequest from "../../../../../utils/APIRequest";

const useAevForm = ({ openForm }) => {
  const { publishNotification } = useAlert();

  const getRoleEditable = async (recordId, setAddForm) => {
    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });

      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.roleDetails,
        JSON.stringify({ recordId: recordId })
      );

      if (response?.data?.responseCode === 109) {
        let serverResponse = response.data.data;5ft4r
        setAddForm(serverResponse);
      }
    } catch (err) {
      publishNotification("Something went wrong", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  return {
    getRoleEditable,
  };
};

export default useAevForm;
