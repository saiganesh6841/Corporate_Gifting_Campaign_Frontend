class ConfigAPIURL {
  // Base URL For Live & Staging
  static baseUrl = import.meta.env.VITE_DEV_PAY_DEF_BASE_URL;

  //Upload API
  // static uploadFile = this.baseUrl + "/api" + "/upload/file";

  //List of Pay Defination APIs and request method type
  static sessionValidation = this.baseUrl + "/admin/islogin"; //get
  static accountLogin = this.baseUrl + "/admin/accountLogin";
  static verifyOtp = this.baseUrl + "/admin/verify/otp";
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

  // developer 1
  static getAllUser = this.baseUrl + "/api" + "/admin/user/all";
  static getAllLeads = this.baseUrl + "/admin/leads/list";
  static createLeads = this.baseUrl + "/admin/leads/create"; //post
  static getLeadDetails = this.baseUrl + "/admin/leads/details"; //post
  static updateLeads = this.baseUrl + "/admin/leads/update";
  static getConstantsData = this.baseUrl + "/admin/constant/data";
  static deleteLead = this.baseUrl + "/admin/leads/delete"; //POST
}

export default ConfigAPIURL;
