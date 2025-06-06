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
  projectKeyword: "",
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

const taskDescription = { taskDescription: "" };

export const taskDetails = {
  projectId: "",
  floorNo: "",
  flatNo: "",
  room: "",
  workerId: "",
  // task: [{ ...taskDescription }],
};
export const inactiveLabels = ["restore"];
// export const inactiveLabels = ["view", "restore", "export"];
export const activeLabels = ["restore"];
