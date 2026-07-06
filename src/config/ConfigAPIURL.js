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
  static restoreUser = this.baseUrl + "/admin/user/restore";

  //roles
  static listRoles = this.baseUrl + "/admin/role/list";
  static roleCreate = this.baseUrl + "/admin/role/create";
  static deleteRole = this.baseUrl + "/admin/role/delete";
  static roleUpdate = this.baseUrl + "/admin/role/update";
  static roleDetails = this.baseUrl + "/admin/role/get";

  //organizations
  static listOrganizations = this.baseUrl + "/admin/organization/list";
  static createOrganization = this.baseUrl + "/admin/organization/create";
  static editOrganization = this.baseUrl + "/admin/organization/edit";
  static getOrganization = this.baseUrl + "/admin/organization/details";
  static deleteOrganization = this.baseUrl + "/admin/organization/delete";

  //products
  static listProducts = this.baseUrl + "/admin/product/list";
  static createProduct = this.baseUrl + "/admin/product/create";
  static editProduct = this.baseUrl + "/admin/product/edit";
  static getProduct = this.baseUrl + "/admin/product/details";
  static deleteProduct = this.baseUrl + "/admin/product/delete";

  //campaigns
  static createCampaign = this.baseUrl + "/admin/campaign/create";
  static listCampaigns = this.baseUrl + "/admin/campaign/list";
  static editCampaign = this.baseUrl + "/admin/campaign/edit";
  static getCampaign = this.baseUrl + "/admin/campaign/details";
  static deleteCampaign = this.baseUrl + "/admin/campaign/delete";

  //orders
  static createOrder = this.baseUrl + "/admin/order/create";
  static listOrders = this.baseUrl + "/admin/order/list";
  static editOrder = this.baseUrl + "/admin/order/edit";
  static getOrder = this.baseUrl + "/admin/order/details";
  static deleteOrder = this.baseUrl + "/admin/order/delete";

  //employee gift card
  static validateToken = this.baseUrl + "/admin/gift/validate-token";
  static placeOrder = this.baseUrl + "/admin/gift/place-order";

  // dashboard
  static getGraphData = this.baseUrl + "/admin/dashboard/graph";
  static getDashBoardCounts = this.baseUrl + "/admin/dashboard";
  static getDashboardProjects = this.baseUrl + "/admin/dashboard/projects";

  //dropdown
  static listOrganizationDropdown =
    this.baseUrl + "/admin/dropdown/organization";
}

export default ConfigAPIURL;
