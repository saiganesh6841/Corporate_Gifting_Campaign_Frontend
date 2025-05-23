class ConfigAPIURL {
  // Base URL For Live & Staging
  static baseUrl = import.meta.env.VITE_DEV_PAY_DEF_BASE_URL;

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

  // developer 1
  static getAllUsers = this.baseUrl + "/admin/user/getAll";
  static getUserDetails = this.baseUrl + "/admin/user/get";
  static createUser = this.baseUrl + "/admin/user/create";
  static userUpdate = this.baseUrl + "/admin/user/update";
  static deleteUsers = this.baseUrl + "/admin/user/delete";
}

export default ConfigAPIURL;
