class ConfigAPIURL {
  // Base URL For Live & Staging
  static baseUrl =
    import.meta.env.VITE_PAY_DEF_BASE_URL ||
    import.meta.env.VITE_DEV_PAY_DEF_BASE_URL;

  //List of Pay Defination APIs and request method type
  static sessionValidation = this.baseUrl + "/admin/islogin"; //get
  static accountLogin = this.baseUrl + "/admin/accountLogin";
  static verifyOtp = this.baseUrl + "/admin/verifyOtp";
  static resendOtp = this.baseUrl + "/admin/resend/otp";
  static adminLogout = this.baseUrl + "/admin/logout";
  static adminGeneratePassword = this.baseUrl + "/admin/password/generate";
  static forgotPassword = this.baseUrl + "/admin/forgot/password";
  static resetPassword = this.baseUrl + "/admin/reset/password";
  static refreshToken = this.baseUrl + "/admin/account/token/regenerate";

  // static uploadFile = this.baseUrl + "/admin/file/upload";
  static uploadFile = this.baseUrl + "/admin/upload/file";

  // static uploadFiles = this.baseUrl + "/admin/upload/file";

  //Admin APIS

  // users
  static getAllUsers = this.baseUrl + "/admin/user/getAll";
  static getUserDetails = this.baseUrl + "/admin/user/get";
  static createUser = this.baseUrl + "/admin/user/create";
  static userUpdate = this.baseUrl + "/admin/user/update";
  static deleteUser = this.baseUrl + "/admin/user/delete";

  //roles
  static listRoles = this.baseUrl + "/admin/role/list";
  static roleCreate = this.baseUrl + "/admin/role/create";
  static deleteRole = this.baseUrl + "/admin/role/delete";
  static roleUpdate = this.baseUrl + "/admin/role/update";
  static roleDetails = this.baseUrl + "/admin/role/get";

  // rooms
  static listRooms = this.baseUrl + "/admin/room/getAll";
  static getRoom = this.baseUrl + "/admin/room/get";
  static createRoom = this.baseUrl + "/admin/room/create";
  static updateRoom = this.baseUrl + "/admin/room/update";
  static deleteRoom = this.baseUrl + "/admin/room/delete";

  //tasks
  static deleteTask = this.baseUrl + "/admin/task/delete";
  static listTasks = this.baseUrl + "/admin/task/getAll";
  static createTask = this.baseUrl + "/admin/task/create";
  static updateTask = this.baseUrl + "/admin/task/update";
  static getTask = this.baseUrl + "/admin/task/get";
  static taskView = this.baseUrl + "/admin/task/view";

  //attendance
  static listAttendance = this.baseUrl + "/admin/attendence/list";

  //dropdown
  static projectDropdown = this.baseUrl + "/admin/dropdown/project";
  static workersDropdown = this.baseUrl + "/admin/dropdown/workers";
  static flatDropdown = this.baseUrl + "/admin/dropdown/flats";
  static floorsDropdown = this.baseUrl + "/admin/dropdown/floors";
  static roomDropdown = this.baseUrl + "/admin/dropdown/rooms";

  //progress timeline
  static getProgressTimeline = this.baseUrl + "/admin/progress/get";

  //projects
  static roomsProjectDropdown = this.baseUrl + "/admin/project/dropdown/room";
  static superVisor = this.baseUrl + "/admin/project/dropdown/supervisor";
  static workerList = this.baseUrl + "/admin/project/dropdown/worker";
  static createProject = this.baseUrl + "/admin/project/create";
  static updateProject = this.baseUrl + "/admin/project/update";
  static listProjects = this.baseUrl + "/admin/project/list";
  static getProject = this.baseUrl + "/admin/project/get";
  static projectView = this.baseUrl + "/admin/project/view";
  static ProjectTable = this.baseUrl + "/admin/project/worker";
  static viewRoomImages = this.baseUrl + "/admin/project/roomView";
  static deleteProject = this.baseUrl + "/admin/project/delete";
  static roomImageDetails = this.baseUrl + "/admin/project/roomImageDetails";
  static deleteImage = this.baseUrl + "/admin/project/deleteImage";

  // dashboard
  static getGraphData = this.baseUrl + "/admin/dashboard/graph";
  static getDashBoardCounts = this.baseUrl + "/admin/dashboard/count";
}

export default ConfigAPIURL;
