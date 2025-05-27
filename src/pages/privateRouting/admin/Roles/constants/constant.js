export const queryBody = {
  userType: "all",
  keyword: "",
  active: true,
  page: 0,
  pageSize: 10,
  startDate: null,
  endDate: new Date() / 1000,
};

export const form = {
  isOpen: false,
  isDialogOpen: false,
  title: "",
  divType: "", // like add,edit
  functionName: "",
  rowDetails: null,
  width: 1285,
  hasCloseButton: true,
  isSaveForm: false,
  discription: "",
};
export const addFormDetails = {
  name: "",
  permission: [],
  active: false,
  microPermission: [],
};

export const inactiveLabels = ["view", "restore", "export"];
export const activeLabels = ["view", "restore"];
