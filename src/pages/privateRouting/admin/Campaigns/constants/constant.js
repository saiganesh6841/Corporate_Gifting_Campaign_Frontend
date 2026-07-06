export const queryBody = {
  active: true,
  userType: "admin",
  page: 0,
  pageSize: 10,
  keyword: "",
  sortOrder: "false",
  sortField: "",
  startDate: null,
  endDate: Math.floor(new Date().setHours(23, 59, 0, 0) / 1000),
  createdByKeyword: "",
  organization: "",
  organizationName: "",
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
  campaignName: "",
  budgetPerEmployee: null,
  deliveryWindowStart: null,
  deliveryWindowEnd: null,
  campaignDeadline: null,
  occasion: "",
  giftingModel: "hr_selected", //employee_choice
  message: "",
  products: [],
  // employeeFileUrl: "",
  // hrId: "",
  employeeFile: {},
  organizationId: "",
  emailTextInformation: "",
};

export const inactiveLabels = ["view", "restore", "export"];
export const activeLabels = ["view", "restore"];
