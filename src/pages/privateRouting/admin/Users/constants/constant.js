export const queryBody = {
  active: true,
  userType: "All",
  page: 0,
  pageSize: 10,
  keyword: "",
  sortOrder: "false",
  sortField: "",
  startDate: null,
  endDate: Math.floor(new Date().setHours(23, 59, 0, 0) / 1000),
  createdByKeyword: "",
};

export const form = {
  isOpen: false,
  title: "",
  divType: "", // like add,edit
  functionName: "",
  rowDetails: null,
  width: 700,
  hasCloseButton: true,
  isSaveForm: false,
  discription: "",
};

export const userDetails = {
  fullName: "",
  active: true,
  userType: "admin",
  dob: null,
  gender: "male",
  email: "",
  mobileNumber: null,
  password: "",
  permission: "",
  profileImage: "",
  organizationName: "",
  organizationId: "",
};

export const inactiveLabels = ["view", "restore", "export"];
export const activeLabels = ["view", "restore"];
