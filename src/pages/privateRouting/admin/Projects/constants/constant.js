export const queryBody = {
  active: true,
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

export const projectDetails = {
  projectId: "",
  projectName: "",
  location: "",
  clientName: "",
  companyName: "",
  mobileNumber: "",
  email: "",
  startDate: "",
  endDate: "",
  uploadImage: "",
  assignedSupervisor: "",
  assignedWorkers: [],
  // task: [
  //   {
  //     taskNo: 1,
  //     taskDescription: "",
  //   },
  // ],
};
export const inactiveLabels = ["restore"];
// export const inactiveLabels = ["view", "restore", "export"];
export const activeLabels = ["restore"];
