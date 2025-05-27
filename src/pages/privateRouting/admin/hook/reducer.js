import ConfigAPIURL from "../../../../config/ConfigAPIURL";
import APIRequest from "../../../../utils/APIRequest";

const notificationDefaultSetUp = {
  message: "",
  anchorOrigin: { vertical: "bottom", horizontal: "center" },
  severity: "",
  duration: 3000,
  open: false,
};

const initialState = {
  theme: localStorage.getItem("adminTheme") || "LIGHT",
  languageData: JSON.parse(localStorage.getItem("lng")) || {
    displayName: "English",
    code: "en",
  },
  notification: notificationDefaultSetUp,
  sideDrawerData: false,
  departments: [], // Added departments to initial state
  userTypes: [], // Added userTypes to initial state
  assignableDepartments: [], // Added assignableDepartments to initial state
  steppers: [], // Added steppers to initial state
  costSheetStatus: {},
  proposalStatus: {},
  backdropOpen: false,
  companyDetails: {},
};
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "SHORTCUTKEY":
      newState.shortcutKeyValue = action.value || "";
      break;
    case "THEME":
      newState.theme = action.value;
      break;
    case "LANGUAGE":
      newState.languageData = action.value;
      break;
    case "NOTIFICATION_OPEN":
      newState.notification = action.value;
      break;
    case "NOTIFICATION_DESTROY":
      newState.notification = notificationDefaultSetUp;
      break;
    case "SIDEDRAWER":
      newState.sideDrawerData = action.value;
      break;
    case "SET_DEPARTMENTS": //for storing departments list
      newState.departments = action.value;
      break;
    case "SET_USER_TYPES": //for storing userTypes list
      newState.userTypes = action.value;
      break;
    case "SET_ASSIGNABLE_DEPARTMENTS": //for storing assignableDepartments list
      newState.assignableDepartments = action.value;
      break;
    case "SET_STEPPERS": //for storing assignableDepartments list
      newState.steppers = action.value;
      break;
    case "SET_PROPOSAL_STATUS": //for storing proposalStatus list
      newState.proposalStatus = action.value;
      break;
    case "SET_COSTSHEET_STATUS": //for storing costSheetStatus list
      newState.costSheetStatus = action.value;
      break;
    case "SET_COMPANY_DETAILS": //for storing costSheetStatus list
      newState.companyDetails = action.value;
      break;
    case "IS_BACKDROP_OPEN": //for storing costSheetStatus list
      newState.backdropOpen = action.value;
      break;

    case "LOGOUT":
      logoutFunction();
      break;
    default:
      break;
  }
  return newState;
};

const logoutFunction = (props) => {
  APIRequest.request("GET", ConfigAPIURL.adminLogout, "").then((response) => {
    if (response.code === 100) {
      window.location.href = "#/login";
    }
  });
  sessionStorage.clear();
  localStorage.clear();
  // LocalStorage.permission = null;
};
export default reducer;
