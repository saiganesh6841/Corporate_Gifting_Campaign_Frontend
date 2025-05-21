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

  static assignableManagersList =
    this.baseUrl + "/admin/user/assignable/managers"; //POST

  static managerPermissionsList =
    this.baseUrl + "/admin/opportunity/assigned/manager/list";
  static getAllSubcriptionsForRenewal = this.baseUrl + "/user/all/sub";

  //opprtunity
  static convertToOpportunity =
    this.baseUrl + "/admin/lead/convert/opportunity";
  static leadsOpportunityList = this.baseUrl + "/admin/opportunity/list/lead"; //get
  static updateOpportunity = this.baseUrl + "/admin/opportunity/update"; //post
  static createOpportunity = this.baseUrl + "/admin/lead/opportunity/create"; //POST
  static addSiteToOpportunity =
    this.baseUrl + "/admin/lead/opportunity/site/create";
  static opportunityList = this.baseUrl + "/admin/lead/opportunity/list";

  //opportunity page
  static opportunitiesList = this.baseUrl + "/admin/opportunity/list";

  static departmentPermissions =
    this.baseUrl + "/admin/opportunity/department/permission";

  //cost sheet
  static getCostSheetList = this.baseUrl + "/admin/costsheet/list";
  static createCostSheet = this.baseUrl + "/admin/costsheet/create"; //post
  static getCostSheetDetials = this.baseUrl + "/admin/costsheet/details"; //get
  static updateCostSheet = this.baseUrl + "/admin/costsheet/update"; //post
  static deleteCostSheet = this.baseUrl + "/admin/costsheet/delete"; //post
  static convertToProposal = this.baseUrl + "/admin/costsheet/convert"; //GET

  static getConvertedCostSheets =
    this.baseUrl + "/admin/costsheet/converted/to/proposal"; //post
  static productsList = this.baseUrl + "/admin/costsheet/product/list"; //post
  static itemsList = this.baseUrl + "/admin/costsheet/item/list"; //post
  static productsSuggestions =
    this.baseUrl + "/admin/inventory/product/suggestion"; //GET
  static itemsSuggestions = this.baseUrl + "/admin/inventory/item/suggestion"; //GET
  static costSheetValidation = this.baseUrl + "/admin/costsheet/validate"; //GET

  //cost sheet O&M
  static oAndm_getCostSheetList = this.baseUrl + "/admin/costsheet/oandm/list"; //GET
  static oAndm_getCostSheetDetails =
    this.baseUrl + "/admin/costsheet/oandm/details"; //GET

  static oAndm_createCostSheet = this.baseUrl + "/admin/costsheet/oandm/create"; //post
  static oAndm_updateCostSheet = this.baseUrl + "/admin/costsheet/oandm/update"; //post
  static oAndm_deleteCostSheet =
    this.baseUrl + "/admin/costsheet/oandm/delete "; //post

  static oAndm_convertToProposal =
    this.baseUrl + "/admin/costsheet/oandm/convert";

  static oAndm_getConvertedCostSheets =
    this.baseUrl + "/admin/costsheet/oandm/converted/to/proposal"; //post
  static oAndm_productsList =
    this.baseUrl + "/admin/costsheet/oandm/product/list"; //post
  static oAndm_itemsList = this.baseUrl + "/admin/costsheet/oandm/item/list"; //post
  static oAndm_costSheetValidation =
    this.baseUrl + "/admin/costsheet/oandm/validate"; //GET

  //proposal
  static getProposal = this.baseUrl + "/admin/proposal/list"; //get
  static createProposal = this.baseUrl + "/admin/proposal/create"; //post
  static updateProposal = this.baseUrl + "/admin/proposal/update"; //post
  static deleteProposal = this.baseUrl + "/admin/proposal/delete"; //post
  static getProposalDetails = this.baseUrl + "/admin/proposal/details"; //get
  static proposalRequote = this.baseUrl + "/admin/proposal/reqoute"; //post

  //proposal OandM
  static oAndm_getProposal = this.baseUrl + "/admin/proposal/oandm/list"; //get
  static oAndm_getProposalDetails =
    this.baseUrl + "/admin/proposal/oandm/details"; //get

  static oAndm_createProposal = this.baseUrl + "/admin/proposal/oandm/create"; //post
  static oAndm_updateProposal = this.baseUrl + "/admin/proposal/oandm/update"; //post
  static oAndm_deleteProposal = this.baseUrl + "/admin/proposal/oandm/delete"; //post
  static oAndm_proposalRequote = this.baseUrl + "/admin/proposal/oandm/reqoute"; //post

  //sales/work order
  static getSalesOrderList = this.baseUrl + "/admin/salesorder/list"; //GET
  static createSalesOrder = this.baseUrl + "/admin/salesorder/create"; //POST
  static deleteSalesOrder = this.baseUrl + "/admin/salesorder/delete"; //POST
  static viewSalesOrder = this.baseUrl + "/admin/salesorder/details"; //GET
  static assignToManagerUpdate =
    this.baseUrl + "/admin/opportunity/assigned/manager/update"; //POST

  //Monthly Checklist
  static getMonthlyCheckList =
    this.baseUrl + "/admin/audit/monthly/checklist/list"; //GET
  static createMonthlyChecklist =
    this.baseUrl + "/admin/audit/monthly/checklist/create"; //POST
  static deleteMonthlyChecklist =
    this.baseUrl + "/admin/audit/monthly/checklist/delete"; //POST
  static viewMonthlyChecklistById =
    this.baseUrl + "/admin/audit/monthly/checklist/details"; //GET

  //Audit Reports
  static getAuditReportList = this.baseUrl + "/admin/audit/report/list"; //GET
  static createAuditReport = this.baseUrl + "/admin/audit/report/create"; //POST
  static deleteAuditReport = this.baseUrl + "/admin/audit/report/delete"; //POST
  static viewAuditReport = this.baseUrl + "/admin/audit/report/details"; //GET

  //ipr
  static getIprList = this.baseUrl + "/admin/ipr/list";
  static createIpr = this.baseUrl + "/admin/ipr/create"; //post
  static updateIpr = this.baseUrl + "/admin/ipr/update"; //post
  static deleteIpr = this.baseUrl + "/admin/IPR/delete"; //get
  static getIPRDetails = this.baseUrl + "/admin/ipr/details"; //post
  static getConvertedCostSheetDetails =
    this.baseUrl + "/admin/ipr/converted/details";
  static convertIPR = this.baseUrl + "/admin/ipr/convert";

  //purchase quote
  static vendorzlist = this.baseUrl + "/admin/vendor/list"; //get
  static createVendor = this.baseUrl + "/admin/vendor/create"; //post
  static purchaseQuoteList = this.baseUrl + "/admin/purchase-quote/list"; //get
  static purchaseQuoteCreate = this.baseUrl + "/admin/purchase-quote/create"; //post
  static purchaseQuoteDetails = this.baseUrl + "/admin/purchase-quote/details"; //get
  static purchaseQuoteUpdate = this.baseUrl + "/admin/purchase-quote/update"; //post
  static purchaseQuoteDelete = this.baseUrl + "/admin/purchase-quote/delete"; //post
  static sendToPQapprovals =
    this.baseUrl + "/admin/purchase-quote/send/nextstage"; //post

  // devleloper 2
  // users Page APIs
  static fetchUsers = this.baseUrl + "/admin/user/all";
  static createUser = this.baseUrl + "/admin/create";
  static userDetails = this.baseUrl + "/admin/user/details";
  static userUpdate = this.baseUrl + "/admin/user/update";
  static deleteUser = this.baseUrl + "/admin/user/delete";
  static restoreUser = this.baseUrl + "/admin/user/active";
  static checkUser = this.baseUrl + "/admin/user/checkuser"; // checking for duplicate username
  static checkEmail = this.baseUrl + "/admin/user/checkemail/exist";
  static userCreatedByList = this.baseUrl + "/admin/user/cratedby";
  static resetPasswordAttempts =
    this.baseUrl + "/admin/user/reset/password/attempts"; //PUT
  static userSubscriptionDetails = this.baseUrl + "/admin/sub/user/id"; //POST
  //fetching list of roles
  static getRoles = this.baseUrl + "/admin/role/list";

  //delivery challan apis

  static deliveryChallanList = this.baseUrl + "/admin/delivery-challan/list";
  static deliveryChallanCreate =
    this.baseUrl + "/admin/delivery-challan/create";
  static deliveryChallanDetails =
    this.baseUrl + "/admin/delivery-challan/details";
  static deliveryChallanUpdate =
    this.baseUrl + "/admin/delivery-challan/update";
  static deleteDeliveryChallan =
    this.baseUrl + "/admin/delivery-challan/delete";
  static populateDeliveryChallan =
    this.baseUrl + "/admin/delivery-challan/populate"; //get for itemslist
  static convertDCtoGRN = this.baseUrl + "/admin/delivery-challan/convert";

  // Good Receipt Notes
  static goodReceiptNotesList = this.baseUrl + "/admin/GRN/list";

  // delivery challan acknoledgement

  static deliveryChallanListAck = this.baseUrl + "/admin/dc-acknowledge/list"; //get
  static deliveryChallanCreateAck =
    this.baseUrl + "/admin/dc-acknowledge/create"; //post
  static deleteDCAck = this.baseUrl + "/admin/dc-acknowledge/delete"; //post
  static DCDetailsAck = this.baseUrl + "/admin/dc-acknowledge/details"; //get
  static updateDCAck = this.baseUrl + "/admin/dc-acknowledge/update"; //post

  //PO Approval

  static poApproval = this.baseUrl + "/admin/purchase-quote/approve";
  static POapprovalList = this.baseUrl + "/admin/po-approval/list";

  //scheduling apis

  static schedulingList = this.baseUrl + "/admin/schedule/list";
  static schedulingCreate = this.baseUrl + "/admin/schedule/create";
  static schedulingDetails = this.baseUrl + "/admin/schedule/details";
  static schedulingUpdatye = this.baseUrl + "/admin/schedule/update";
  static schedulingDelete = this.baseUrl + "/admin/schedule/delete";

  //Roles Page API's
  static fetchAllRoles = this.baseUrl + "/admin/roles/all";
  static roleCreate = this.baseUrl + "/admin/role/create";
  static roleDetails = this.baseUrl + "/admin/role/details";
  static roleTitles = this.baseUrl + "/admin/roles/titles";
  static roleUpdate = this.baseUrl + "/admin/role/permission/update";
  static roleUnassigned = this.baseUrl + "/admin/role/permission/unassigned";
  static roleGrant = this.baseUrl + "/admin/role/permission/grant";
  static deleteRole = this.baseUrl + "/admin/role/delete";

  //Invoices
  static createInvoice = this.baseUrl + "/admin/invoice/create"; //POST
  static listAllCredits = this.baseUrl + "/admin/invoice/list/credits"; //GET
  static listAllDebits = this.baseUrl + "/admin/invoice/list/debits"; //GET
  static invoiceSummary = this.baseUrl + "/admin/invoice/summary"; //GET
  static updateInvoice = this.baseUrl + "/admin/invoice/update"; //POST
  static deleteInvoice = this.baseUrl + "/admin/invoice/delete"; //POST
  static viewInvoice = this.baseUrl + "/admin/invoice/details"; //POST
  static checkUnqInvoiceNo = this.baseUrl + "/admin/invoice/check/unique"; //POST

  //Expense management
  static expenseList = this.baseUrl + "/admin/claim/list";
  static viewClaim = this.baseUrl + "/admin/claim/view";
  static createClaim = this.baseUrl + "/admin/claim/create"; //POST
  static updateClaim = this.baseUrl + "/admin/claim/update"; //POST
  static deleteClaim = this.baseUrl + "/admin/claim/delete"; //POST

  static getCompanyList = this.baseUrl + "/admin/leads/list";
  static getOpportunityNumberList =
    this.baseUrl + "/admin/opportunity/number/list";
  static getSiteList = this.baseUrl + "/admin/opportunity/site/list";
  static createdForList = this.baseUrl + "/admin/claim/createdfor/list"; //GET
  static expenseTasksList = this.baseUrl + "/admin/claim/task/list"; //GET
  static expenseCategoriesList = this.baseUrl + "/admin/claim/category/list"; //GET

  //Task Management
  static taskList = this.baseUrl + "/admin/task/list";
  static createTask = this.baseUrl + "/admin/task/create"; //POST
  static deleteTask = this.baseUrl + "/admin/task/delete"; //POST
  static updateTask = this.baseUrl + "/admin/task/update"; //POST
  static viewTask = this.baseUrl + "/admin/task/view"; //POST
  static getLeadsList = this.baseUrl + "/admin/leads/list"; //GET
  static taskOpportunityList = this.baseUrl + "/admin/opportunity/number/list"; //GET
  static taskSiteList = this.baseUrl + "/admin/opportunity/site/list"; //POST
  static getUsersList = this.baseUrl + "/admin/user/list"; //POST
  static createTimer = this.baseUrl + "/admin/timer/create"; //GET

  static timerRemaining = this.baseUrl + "/admin/timer/user/remaining"; //POST
  static timerOverview = this.baseUrl + "/admin/timer/user/overview"; //POST
  static timerValidate = this.baseUrl + "/admin/timer/validate"; //POST

  //CCC
  static getCCCDetails = this.baseUrl + "/admin/ccc/details"; //GET
  static updateCCC = this.baseUrl + "/admin/ccc/update"; //POST
  static getCCCList = this.baseUrl + "/admin/ccc/list"; //GET
  static viewCCCDetails = this.baseUrl + "/admin/ccc/view"; //POST

  static updatePOandFinanceApproval =
    this.baseUrl + "/admin/purchase-quote/po-approval/f-approval/update"; //GET
  static financeApprovalList = this.baseUrl + "/admin/fa-approval/list"; //POST

  //Purchase Order

  static createPurchaseOrder = this.baseUrl + "/admin/purchase-order/create"; //POST
  static purchaseOrdersList = this.baseUrl + "/admin/purchase-order/list"; //GET
  static viewPurchaseOrder = this.baseUrl + "/admin/purchase-order/view"; //GET

  static vendorListPurchaseOrder =
    this.baseUrl + "/admin/purchase-order/vendor/list"; //GET
  static vendorItemsListPurchaseOrder =
    this.baseUrl + "/admin/purchase-order/itemlist/vendor"; //POST

  // products apis
  static createProduct = this.baseUrl + "/admin/inventory/product/create"; // POST
  static getAllProducts = this.baseUrl + "/admin/inventory/product/list"; //POST
  static getProduct = this.baseUrl + "/admin/inventory/product/view"; //GET
  static updateProduct = this.baseUrl + "/admin/inventory/product/update"; //PUT
  static deleteProduct = this.baseUrl + "/admin/inventory/product/delete"; //POST
  static checkProduct = this.baseUrl + "/admin/inventory/product/validate"; //GET

  // item apis
  static productSuggetion =
    this.baseUrl + "/admin/inventory/product/suggestion"; //GET
  static createItem = this.baseUrl + "/admin/inventory/item/create"; //POST
  static getAllItems = this.baseUrl + "/admin/inventory/item/list"; //POST
  static getItem = this.baseUrl + "/admin/inventory/item/view"; //GET
  static updateItem = this.baseUrl + "/admin/inventory/item/update"; //PUT
  static deleteItem = this.baseUrl + "/admin/inventory/item/delete"; //POST
  static checkItem = this.baseUrl + "/admin/inventory/item/validate"; //GET
  static getItemCreatedByUsers =
    this.baseUrl + "/admin/inventory/created/users/list"; //GET

  // vendors APIS
  // static createVendor = this.baseUrl + "/admin/vendor/create"; //POST
  static getAllVendors = this.baseUrl + "/admin/vendor/table/list"; // POST
  static getVendor = this.baseUrl + "/admin/vendor/view"; //GET
  static updateVendor = this.baseUrl + "/admin/vendor/update"; //POST
  static deleteVendor = this.baseUrl + "/admin/vendor/delete "; //POST
  static getVendorCreatedByUsers =
    this.baseUrl + "/admin/vendor/created/users/list"; //GET

  // checklist API
  static createCheckListForm = this.baseUrl + "/admin/checklist/create"; //POST
  static getForms = this.baseUrl + "/admin/checklist/list"; //GET
  static viewForm = this.baseUrl + "/admin/checklist/view"; // GET
  static updateForm = this.baseUrl + "/admin/checklist/update"; //POST
  static deleteForm = this.baseUrl + "/admin/checklist/delete"; //POST

  // forgot passward apis
  static sendOtp = this.baseUrl + "/admin/forget/password/verification/link"; // POST
  static verifyUserOtp = this.baseUrl + "/admin/forget/passord/verify/otp"; //POST
  static updateOtp = this.baseUrl + "/admin/user/update"; // PUT

  // challenges

  static getDropdownChallenges = this.baseUrl + "/admin/chage/dropdown"; // POST

  //advertisements

  static createAdvertisements = this.baseUrl + "/admin/banner/create"; // POST
  static getAllAdvrtisements = this.baseUrl + "/admin/banner/all"; // POST
  static getAdverisementId = this.baseUrl + "/admin/banner/id"; // POST
  static updateAdvertisement = this.baseUrl + "/admin/banner/update"; // POST
  static deleteAdvertisement = this.baseUrl + "/admin/banner/delete"; // POST
  static restoreAdvertisement = this.baseUrl + "/admin/banner/active"; // POST
  static advertismentCreatedByList = this.baseUrl + "/admin/banner/createby"; // POST

  //subscription
  static createSubscription = this.baseUrl + "/admin/sub/create"; // POST
  static getAllSubscription = this.baseUrl + "/admin/sub/all"; // POST
  static getSubscriptionById = this.baseUrl + "/admin/sub/id"; // POST
  static deleteSubScription = this.baseUrl + "/admin/sub/delete"; // POST
  static restoreSubScription = this.baseUrl + "/admin/sub/active"; // POST
  static updateSubscription = this.baseUrl + "/admin/sub/update"; // POST
  static subscriptionCreatedBy = this.baseUrl + "/admin/sub/createdby"; // POST

  // orders
  static getAllOrders = this.baseUrl + "/admin/ord/all"; // POST
  static getOrderById = this.baseUrl + "/admin/ord/id"; // POST
  static deleteOrder = this.baseUrl + "/admin/ord/delete"; // POST
  static restoreOrder = this.baseUrl + "/admin/ord/active"; // POST

  //challenges
  static getAllChallenges = this.baseUrl + "/admin/chage/all"; // POST
  static createChallenge = this.baseUrl + "/admin/chage/create"; // POST
  static getChallengeById = this.baseUrl + "/admin/chage/id"; // POST
  static updateChallenge = this.baseUrl + "/admin/chage/update"; // POST
  static deleteChallenge = this.baseUrl + "/admin/chage/delete"; // POST
  static restoreChallenge = this.baseUrl + "/admin/chage/active"; // POST
  static challengeCreatedby = this.baseUrl + "/admin/chage/createdby"; // POST

  // golden tips apis

  static getAllGoldenTips = this.baseUrl + "/admin/gold/all"; // POST
  static createGoldenTip = this.baseUrl + "/admin/gold/create"; // POST
  static updateGoldenTip = this.baseUrl + "/admin/gold/update"; // POST
  static getGoldenTipById = this.baseUrl + "/admin/gold/id"; // POST
  static deleteGoldenTip = this.baseUrl + "/admin/gold/delete"; // POST
  static restoreGoldenTip = this.baseUrl + "/admin/gold/active"; // POST
  static goldCreatedByList = this.baseUrl + "/admin/gold/createby"; // POST

  static getUserRatings = this.baseUrl + "/admin/user/ratings"; // POST

  // settings
  static getSettingsList = this.baseUrl + "/admin/setting/get"; // POST
  static updateSettings = this.baseUrl + "/admin/setting/update"; // POST

  //category
  static createCategory = this.baseUrl + "/admin/category/create"; // POST
  static updateCategory = this.baseUrl + "/admin/category/update"; // POST
  static getCategoryById = this.baseUrl + "/admin/category/byid"; // POST
  static getAllCategory = this.baseUrl + "/admin/category/all"; // POST
  static deleteCategory = this.baseUrl + "/admin/category/delete"; // POST
  static restoreCategory = this.baseUrl + "/admin/category/active"; // POST
  static getCategoryDropDown = this.baseUrl + "/admin/category/dropdown"; // POST
  static categoryCreatedByList = this.baseUrl + "/admin/category/cratedby"; // POST

  //excel upload apis
  static usersExcelUpload = this.baseUrl + "/admin/user/bulk/create"; // POST
  static challengeRating = this.baseUrl + "/admin/chage/rating"; // POST

  // dashboard apis
  static getDashBoardCounts = this.baseUrl + "/admin/dashboard/count"; // POST
  static getGraphData = this.baseUrl + "/admin/dashboard/graph/api"; // POST
  static getPieChartData = this.baseUrl + "/admin/dashboard/piechart/api"; // POST

  // purchachase the challenge
  static pruchaseChallenge = this.baseUrl + "/user/sub/purchase"; // POST
}

export default ConfigAPIURL;
