const userData = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : {};

export const queryBody = {
  active: true,
  userType: "employee",
  page: 0,
  pageSize: 10,
  keyword: "",
  sortOrder: "false",
  sortField: "",
  startDate: null,
  endDate: Math.floor(new Date().setHours(23, 59, 0, 0) / 1000),
  createdByKeyword: "",
  organizationId: userData?.organizationId || "",
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
  userType: "HR",
  email: "",
  mobileNumber: null,
  address: "",
  city: "",
  state: "",
  pincode: "",
  department: "",
  organizationId:
    JSON.parse(localStorage.getItem("userDetails"))?.organizationId || "",
};

export const inactiveLabels = ["view", "restore", "export"];
export const activeLabels = ["view", "restore"];
