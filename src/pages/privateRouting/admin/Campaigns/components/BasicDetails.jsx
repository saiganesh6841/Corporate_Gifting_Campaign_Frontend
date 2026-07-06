import { Stack } from "@fluentui/react";
import {
  Field,
  Input,
  Option,
  Combobox,
  Textarea,
  Radio,
  RadioGroup,
  Button,
  Text,
  Badge,
} from "@fluentui/react-components";
import {
  ArrowUpload24Regular,
  CheckmarkCircle24Filled,
  Delete20Filled,
  Delete24Regular,
  DismissCircle24Filled,
  DocumentTable24Regular,
} from "@fluentui/react-icons";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/styles";
import SectionHeading from "../../../../../components/SectionHeader/Index";
import DatePickerComponent from "../../../../../components/DatePicker/Index";
import UploadExcel from "../../../../../components/UploadDocument/UploadExcel";
import Upload from "../../../../../components/UploadDocument/Upload";
import BulkUploadDialog from "../../../../../components/Dialog/BulkUploadDialog";
import { productExcelTemplate } from "../constants/ExcelTemplate";
import PrimaryBtn from "../../../../../components/button";
import ProductSelectionModal from "./ProductSelectionModal";
import LocalStorage from "../../../../../config/LocalStorage";
import ProductCard from "../../../../../components/Product/ProductCard";
import * as XLSX from "xlsx";
import TextEditor from "../../../../../components/TextEditor/Index";

const occasions = [
  "Diwali",
  "Christmas",
  "Eid",
  "Birthday",
  "Employee Rewards",
  "Welcome Kits",
  "Recognition Awards",
  "Leadership Gifting",
  "Annual Rewards",
  "Joining Kits",
];

const REQUIRED_HEADERS = [
  "FullName",
  "Email",
  "MobileNumber",
  "Address",
  "City",
  "State",
  "PinCode",
];
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateMobile = (mobile) => {
  return /^[6-9]\d{9}$/.test(mobile);
};

const validatePincode = (pincode) => {
  if (!/^\d{6}$/.test(pincode)) return false;
  // reject all same digits like 000000, 111111, 999999
  if (/^(\d)\1{5}$/.test(pincode)) return false;
  return true;
};
const validateHeaders = (uploadedHeaders) => {
  const missing = REQUIRED_HEADERS.filter(
    (required) => !uploadedHeaders.includes(required),
  );
  return { isValid: missing.length === 0, missing };
};

function BasicDetails({
  classes,
  setCampaignForm,
  campaignForm,
  openForm,
  errors,
  services,
  handleOpenBulkUploadModal,
  handleResetUploadModal,
  isUploadModalOpen,
  showFilesImportedIndex,
  setShowFilesImportedIndex,
}) {
  const theme = useTheme();
  const fileInputRef = useRef(null);

  const [fileValidation, setFileValidation] = useState({
    status: null, // null | "success" | "error"
    message: "",
    rowCount: 0,
    missingHeaders: [],
  });

  useEffect(() => {
    console.log("hello", services?.getProductList);
    services?.getProductList();
  }, []);

  const handleChange = (event, name) => {
    if (!name) return;
    const { value } = event.target;
    setCampaignForm({
      ...campaignForm,
      [name]: value,
    });
    delete errors[name];
  };

  const handleBlur = (field) => (e) => {
    const trimmedValue = e.target.value.trim();
    setCampaignForm((p) => ({
      ...p,
      [field]: trimmedValue,
    }));
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   // reset
  //   setFileValidation({
  //     status: null,
  //     message: "",
  //     rowCount: 0,
  //     missingHeaders: [],
  //   });
  //   setCampaignForm((p) => ({
  //     ...p,
  //     employeeFile: null,
  //     employeeFileName: "",
  //   }));

  //   const allowedTypes = [
  //     "application/vnd.ms-excel",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     "text/csv",
  //   ];
  //   if (!allowedTypes.includes(file.type)) {
  //     setFileValidation({
  //       status: "error",
  //       message: "Only .xls, .xlsx or .csv files are allowed",
  //       rowCount: 0,
  //       missingHeaders: [],
  //     });
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     try {
  //       const buffer = event.target.result;
  //       const workbook = XLSX.read(buffer, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  //       if (rows.length === 0) {
  //         setFileValidation({
  //           status: "error",
  //           message: "Excel file is empty. Please add employee data.",
  //           rowCount: 0,
  //           missingHeaders: [],
  //         });
  //         return;
  //       }

  //       // validate headers from first row keys
  //       const uploadedHeaders = Object.keys(rows[0]);
  //       const { isValid, missing } = validateHeaders(uploadedHeaders);

  //       if (!isValid) {
  //         setFileValidation({
  //           status: "error",
  //           message: `Missing required columns: ${missing.join(", ")}`,
  //           rowCount: 0,
  //           missingHeaders: missing,
  //         });
  //         return;
  //       }

  //       // validate that required fields are not empty in every row
  //       const emptyFieldErrors = [];
  //       rows.forEach((row, index) => {
  //         REQUIRED_HEADERS.forEach((header) => {
  //           if (!String(row[header] || "").trim()) {
  //             emptyFieldErrors.push(`Row ${index + 2}: ${header} is empty`);
  //           }
  //         });
  //       });

  //       if (emptyFieldErrors.length > 0) {
  //         setFileValidation({
  //           status: "error",
  //           message: `${emptyFieldErrors.length} validation error(s) found. First: ${emptyFieldErrors[0]}`,
  //           rowCount: rows.length,
  //           missingHeaders: [],
  //         });
  //         return;
  //       }

  //       // all good — store file in form state
  //       setFileValidation({
  //         status: "success",
  //         message: `File validated successfully`,
  //         rowCount: rows.length,
  //         missingHeaders: [],
  //       });

  //       setCampaignForm((p) => ({
  //         ...p,
  //         employeeFile: file,
  //         employeeFileName: file.name,
  //       }));
  //       delete errors["employeeFile"];
  //     } catch (err) {
  //       console.error("Excel Read Error:", err);
  //       setFileValidation({
  //         status: "error",
  //         message: "Could not read file. Please check the format.",
  //         rowCount: 0,
  //         missingHeaders: [],
  //       });
  //     }
  //   };
  //   reader.readAsArrayBuffer(file);

  //   // reset input so same file can be re-uploaded if needed
  //   e.target.value = "";
  // };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileValidation({
      status: null,
      message: "",
      rowCount: 0,
      missingHeaders: [],
    });
    setCampaignForm((p) => ({
      ...p,
      employeeFile: null,
      employeeFileName: "",
    }));

    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (!allowedTypes.includes(file.type)) {
      setFileValidation({
        status: "error",
        message: "Only .xls, .xlsx or .csv files are allowed",
        rowCount: 0,
        missingHeaders: [],
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const buffer = event.target.result;
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        if (rows.length === 0) {
          setFileValidation({
            status: "error",
            message: "Excel file is empty. Please add employee data.",
            rowCount: 0,
            missingHeaders: [],
          });
          return;
        }

        // validate headers
        const uploadedHeaders = Object.keys(rows[0]);
        const { isValid, missing } = validateHeaders(uploadedHeaders);
        if (!isValid) {
          setFileValidation({
            status: "error",
            message: `Missing required columns: ${missing.join(", ")}`,
            rowCount: 0,
            missingHeaders: missing,
          });
          return;
        }

        // row-level validations
        const rowErrors = [];

        rows.forEach((row, index) => {
          const rowNum = index + 2; // excel row number (1=header, so data starts at 2)

          const fullName = String(row["FullName"] || "").trim();
          const email = String(row["Email"] || "").trim();
          const mobileNumber = String(row["MobileNumber"] || "").trim();
          const address = String(row["Address"] || "").trim();
          const city = String(row["City"] || "").trim();
          const state = String(row["State"] || "").trim();
          const pincode = String(row["PinCode"] || "").trim();

          // ── required field checks ──
          if (!fullName) {
            rowErrors.push(`Row ${rowNum}: FullName is required`);
          }
          if (!email) {
            rowErrors.push(`Row ${rowNum}: Email is required`);
          }
          if (!mobileNumber) {
            rowErrors.push(`Row ${rowNum}: MobileNumber is required`);
          }
          if (!address) {
            rowErrors.push(`Row ${rowNum}: Address is required`);
          }
          if (!city) {
            rowErrors.push(`Row ${rowNum}: City is required`);
          }
          if (!state) {
            rowErrors.push(`Row ${rowNum}: State is required`);
          }
          if (!pincode) {
            rowErrors.push(`Row ${rowNum}: PinCode is required`);
          }

          // ── email format check ──
          if (email && !validateEmail(email)) {
            rowErrors.push(`Row ${rowNum}: "${email}" is not a valid email`);
          }

          // ── mobile format check ──
          // strip +91 or 91 prefix if present before validation
          const cleanMobile = mobileNumber.replace(/^(\+91|91)/, "").trim();
          if (mobileNumber && !validateMobile(cleanMobile)) {
            rowErrors.push(
              `Row ${rowNum}: "${mobileNumber}" is not a valid 10-digit mobile number`,
            );
          }

          // ── pincode checks ──
          if (pincode) {
            if (!/^\d{6}$/.test(pincode)) {
              rowErrors.push(
                `Row ${rowNum}: PinCode "${pincode}" must be exactly 6 digits`,
              );
            } else if (/^(\d)\1{5}$/.test(pincode)) {
              rowErrors.push(
                `Row ${rowNum}: PinCode "${pincode}" is not valid (all same digits)`,
              );
            }
          }
        });

        if (rowErrors.length > 0) {
          // show first 3 errors so HR knows what to fix, not just first 1
          const preview = rowErrors.slice(0, 3);
          const remaining = rowErrors.length - preview.length;
          const message =
            preview.join(" | ") +
            (remaining > 0 ? ` ... and ${remaining} more error(s)` : "");

          setFileValidation({
            status: "error",
            message,
            rowCount: rows.length,
            missingHeaders: [],
          });
          return;
        }

        // all validations passed
        setFileValidation({
          status: "success",
          message: "File validated successfully",
          rowCount: rows.length,
          missingHeaders: [],
        });

        setCampaignForm((p) => ({
          ...p,
          employeeFile: file,
          employeeFileName: file.name,
        }));
        delete errors["employeeFile"];
      } catch (err) {
        console.error("Excel Read Error:", err);
        setFileValidation({
          status: "error",
          message: "Could not read file. Please check the format.",
          rowCount: 0,
          missingHeaders: [],
        });
      }
    };

    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const handleRemoveFile = () => {
    setCampaignForm((p) => ({
      ...p,
      employeeFile: null,
      employeeFileName: "",
    }));
    setFileValidation({
      status: null,
      message: "",
      rowCount: 0,
      missingHeaders: [],
    });
  };
  const isViewMode = openForm?.divType === "view";
  const isEditMode = openForm?.divType === "edit";

  console.log(campaignForm, errors, "campaignForm");
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className="box_container">
          <SectionHeading
            title="Campaign Details"
            classes={classes}
            theme={theme}
          />
          <Grid container spacing={2} style={{ padding: "10px" }}>
            {/* Campaign ID - auto */}

            {/* Campaign Name */}
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Campaign Name"
                required
                validationMessage={
                  errors?.campaignName ? "Campaign Name is required" : ""
                }
                htmlFor="campaignName"
              >
                <Input
                  id="campaignName"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="e.g. Diwali Delight 2025"
                  value={campaignForm?.campaignName || ""}
                  onChange={(e) => handleChange(e, "campaignName")}
                  disabled={isViewMode}
                  onBlur={handleBlur("campaignName")}
                />
              </Field>
            </Grid>

            {/* Occasion */}
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Occasion"
                required
                validationMessage={errors?.occasion}
                htmlFor="occasion"
              >
                <Combobox
                  id="occasion"
                  className={"input__Style"}
                  style={{ fontSize: "14px" }}
                  size={"medium"}
                  placeholder="Select occasion"
                  value={campaignForm?.occasion || ""}
                  disabled={isViewMode}
                >
                  {occasions.map((occasion) => (
                    <Option
                      key={occasion}
                      style={{ fontSize: "14px" }}
                      onClick={() => {
                        setCampaignForm({
                          ...campaignForm,
                          occasion: occasion,
                        });
                        delete errors["occasion"];
                      }}
                    >
                      {occasion}
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </Grid>

            {/* Campaign Deadline */}
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Campaign Deadline"
                required
                validationMessage={errors?.campaignDeadline}
                htmlFor="campaignDeadline"
              >
                <DatePickerComponent
                  className={`input__Style`}
                  size="large"
                  value={
                    campaignForm?.campaignDeadline
                      ? new Date(campaignForm.campaignDeadline * 1000)
                      : null
                  }
                  handleChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      campaignDeadline: Math.floor(new Date(e) / 1000),
                    })
                  }
                  minDate={new Date()}
                  disabled={isViewMode}
                />
              </Field>
            </Grid>

            {/* Delivery Window Start */}
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Delivery Window Start"
                required
                validationMessage={errors?.deliveryWindowStart}
                htmlFor="deliveryWindowStart"
              >
                <DatePickerComponent
                  className={`input__Style`}
                  size="large"
                  value={
                    campaignForm?.deliveryWindowStart
                      ? new Date(campaignForm.deliveryWindowStart * 1000)
                      : null
                  }
                  handleChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      deliveryWindowStart: Math.floor(new Date(e) / 1000),
                    })
                  }
                  minDate={new Date()}
                  disabled={isViewMode}
                />
              </Field>
            </Grid>

            {/* Delivery Window End */}
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Delivery Window End"
                required
                validationMessage={errors?.deliveryWindowEnd}
                htmlFor="deliveryWindowEnd"
              >
                <DatePickerComponent
                  className={`input__Style`}
                  size="large"
                  value={
                    campaignForm?.deliveryWindowEnd
                      ? new Date(campaignForm.deliveryWindowEnd * 1000)
                      : null
                  }
                  handleChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      deliveryWindowEnd: Math.floor(new Date(e) / 1000),
                    })
                  }
                  minDate={
                    campaignForm?.deliveryWindowStart
                      ? new Date(campaignForm.deliveryWindowStart * 1000)
                      : new Date()
                  }
                  disabled={isViewMode}
                />
              </Field>
            </Grid>

            {/* Budget Per Employee */}
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Budget Per Employee (₹)"
                required
                validationMessage={errors?.budgetPerEmployee}
                htmlFor="budgetPerEmployee"
              >
                <Input
                  id="budgetPerEmployee"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="e.g. 2500"
                  value={campaignForm?.budgetPerEmployee || ""}
                  onChange={(event) => {
                    const value = event.target.value.replace(/[^0-9]/g, "");
                    setCampaignForm({
                      ...campaignForm,
                      budgetPerEmployee: value,
                    });
                    delete errors["budgetPerEmployee"];
                  }}
                  onBlur={() => {
                    if (
                      !campaignForm?.budgetPerEmployee ||
                      Number(campaignForm.budgetPerEmployee) <= 0
                    ) {
                      errors["budgetPerEmployee"] =
                        "Please enter a valid budget";
                    } else {
                      delete errors["budgetPerEmployee"];
                    }
                  }}
                  disabled={isViewMode}
                />
              </Field>
            </Grid>

            {/* Add a Message */}
            <Grid item xs={12}>
              <Field
                className={classes.label}
                label="Add a Message (Optional)"
                validationMessage={errors?.message}
                htmlFor="message"
              >
                <Textarea
                  id="message"
                  // className={"input__Style"}
                  size={"large"}
                  placeholder="e.g. Wishing you and your family a Happy Diwali!"
                  resize="vertical"
                  rows={3}
                  value={campaignForm?.message || ""}
                  onChange={(e) => handleChange(e, "message")}
                  disabled={isViewMode}
                  onBlur={handleBlur("message")}
                />
              </Field>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* Gifting Model */}
      <Grid item xs={12}>
        <Box className="box_container">
          <SectionHeading
            title="Gifting Model"
            classes={classes}
            theme={theme}
          />
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <Grid item xs={12}>
              <Field
                className={classes.label}
                label="Select Gifting Model"
                required
                validationMessage={errors?.giftingModel}
              >
                <RadioGroup
                  value={campaignForm?.giftingModel || "hr_selected"}
                  onChange={(e, data) => {
                    setCampaignForm({
                      ...campaignForm,
                      giftingModel: data.value,
                    });
                    delete errors["giftingModel"];
                  }}
                  layout="horizontal"
                  disabled={isViewMode || isEditMode}
                >
                  <Box
                    style={{
                      display: "flex",
                      gap: "20px",
                      flexWrap: "wrap",
                      marginTop: "6px",
                    }}
                  >
                    <Box
                      style={{
                        border: `2px solid ${
                          campaignForm?.giftingModel === "hr_selected"
                            ? "#0078D4"
                            : "#e1e1e1"
                        }`,
                        borderRadius: 8,
                        padding: "12px 20px",
                        cursor:
                          isViewMode || isEditMode ? "default" : "pointer",
                        background:
                          campaignForm?.giftingModel === "hr_selected"
                            ? "#f0f6ff"
                            : "#fff",
                        minWidth: 220,
                      }}
                      onClick={() => {
                        if (isViewMode || isEditMode) return;
                        setCampaignForm({
                          ...campaignForm,
                          giftingModel: "hr_selected",
                        });
                      }}
                    >
                      <Radio value="hr_selected" label="" />
                      <Text weight="semibold" style={{ display: "block" }}>
                        HR Selected Gifts
                      </Text>
                      <Text size={200} style={{ color: "#666" }}>
                        We will select gifts for employees
                      </Text>
                    </Box>

                    <Box
                      style={{
                        border: `2px solid ${
                          campaignForm?.giftingModel === "employee_choice"
                            ? "#0078D4"
                            : "#e1e1e1"
                        }`,
                        borderRadius: 8,
                        padding: "12px 20px",
                        cursor:
                          isViewMode || isEditMode ? "default" : "pointer",
                        background:
                          campaignForm?.giftingModel === "employee_choice"
                            ? "#f0f6ff"
                            : "#fff",
                        minWidth: 220,
                      }}
                      onClick={() => {
                        if (isViewMode || isEditMode) return;
                        setCampaignForm({
                          ...campaignForm,
                          giftingModel: "employee_choice",
                        });
                      }}
                    >
                      <Radio value="employee_choice" label="" />
                      <Text weight="semibold" style={{ display: "block" }}>
                        Employee Choice Gifts
                      </Text>
                      <Text size={200} style={{ color: "#666" }}>
                        Employees choose their own gifts
                      </Text>
                    </Box>
                  </Box>
                </RadioGroup>
              </Field>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* //email content */}
      {campaignForm?.giftingModel === "employee_choice" && (
        <Grid item xs={12}>
          <Box className="box_container">
            <SectionHeading
              title="Employee Email Content"
              classes={classes}
              theme={theme}
            />
            <Grid container spacing={2} style={{ padding: "16px" }}>
              <Grid item xs={12}>
                <TextEditor
                  classes={classes}
                  label="Email Content for Employees"
                  required={true}
                  placeholder="Write the email content employees will receive with their gift selection link..."
                  value={campaignForm?.emailTextInformation || ""}
                  setData={(val) =>
                    setCampaignForm((p) => ({
                      ...p,
                      emailTextInformation: val,
                    }))
                  }
                  error={errors?.emailTextInformation}
                  disabled={isViewMode}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      )}
      {/* //product */}
      <Grid item xs={12}>
        <Box className="box_container">
          <SectionHeading
            title="Selected Products"
            classes={classes}
            theme={theme}
            buttonText="Select Products"
            buttonOnClick={() => {
              if (openForm?.divType === "view" || openForm?.divType === "edit")
                return;
              setCampaignForm((p) => ({
                ...p,
                isProductModalOpen: true,
              }));
            }}
          />

          <Grid container spacing={2} style={{ padding: "10px" }}>
            {/* Product List */}
            <Grid item xs={12}>
              {campaignForm?.products?.length > 0 ? (
                <Grid container spacing={2}>
                  {campaignForm.products.map((product) => (
                    <Grid
                      item
                      key={product._id}
                      sx={{
                        width: 280, // Card width
                        maxWidth: 280,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                        }}
                      >
                        <ProductCard
                          product={product}
                          userType={LocalStorage?.userDetails?.userType}
                        />

                        {/* Delete Button */}
                        {openForm?.divType !== "view" &&
                          openForm?.divType !== "edit" && (
                            <Button
                              appearance="subtle"
                              onClick={() => {
                                setCampaignForm((prev) => ({
                                  ...prev,
                                  products: prev.products.filter(
                                    (p) => p._id !== product._id,
                                  ),
                                }));
                              }}
                              style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                minWidth: 36,
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                background: "#fff",
                                boxShadow: "0 2px 8px rgba(0,0,0,.18)",
                                padding: 0,
                              }}
                            >
                              <Delete20Filled color="#ef4444" />
                            </Button>
                          )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  sx={{
                    border: "1px dashed #d1d5db",
                    borderRadius: 2,
                    py: 4,
                    textAlign: "center",
                    color: "#777",
                  }}
                >
                  No products selected
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box className="box_container">
          <SectionHeading
            title="Employee Upload"
            classes={classes}
            theme={theme}
          />
          {openForm?.divType === "edit" ? (
            <Typography style={{ padding: 8 }}>
              <strong>Total Employees:</strong> {campaignForm?.totalEmployees}
            </Typography>
          ) : (
            <Grid container spacing={2} style={{ padding: "10px" }}>
              {/* download template */}
              <Grid item xs={12}>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <DocumentTable24Regular style={{ color: "#0078D4" }} />
                  <Text size={200} style={{ color: "#666" }}>
                    Download the template, fill employee details and upload
                    below.
                  </Text>
                  <Button
                    appearance="transparent"
                    size="small"
                    style={{ color: "#0078D4", padding: 0 }}
                    onClick={() =>
                      services?.handleDownloadTemplate(productExcelTemplate)
                    }
                  >
                    Download Template
                  </Button>
                </Box>
              </Grid>

              {/* upload area */}
              <Grid item xs={12}>
                <Field
                  className={classes.label}
                  label="Upload Employee List"
                  required
                  validationMessage={errors?.employeeFile}
                  htmlFor="employeeFile"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xls,.xlsx,.csv"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    disabled={isViewMode}
                  />

                  {/* drop zone style box */}
                  {!campaignForm?.employeeFileName && (
                    <Box
                      onClick={() =>
                        !isViewMode && fileInputRef.current?.click()
                      }
                      style={{
                        border: "2px dashed #c8c8c8",
                        borderRadius: 8,
                        padding: "28px 20px",
                        textAlign: "center",
                        cursor: isViewMode ? "default" : "pointer",
                        background: "#fafafa",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isViewMode)
                          e.currentTarget.style.borderColor = "#0078D4";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#c8c8c8";
                      }}
                    >
                      <ArrowUpload24Regular
                        style={{
                          color: "#0078D4",
                          fontSize: 32,
                          marginBottom: 8,
                        }}
                      />
                      <Text
                        style={{
                          display: "block",
                          color: "#444",
                          marginBottom: 4,
                        }}
                      >
                        Click to upload or drag & drop
                      </Text>
                      <Text size={200} style={{ color: "#999" }}>
                        Accepted: .xls, .xlsx, .csv
                      </Text>
                    </Box>
                  )}

                  {/* file uploaded — show result */}
                  {campaignForm?.employeeFileName && (
                    <Box
                      style={{
                        border: `1.5px solid ${
                          fileValidation.status === "success"
                            ? "#107c10"
                            : "#a4262c"
                        }`,
                        borderRadius: 8,
                        padding: "14px 16px",
                        background:
                          fileValidation.status === "success"
                            ? "#f1faf1"
                            : "#fdf3f4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        {fileValidation.status === "success" ? (
                          <CheckmarkCircle24Filled
                            style={{ color: "#107c10" }}
                          />
                        ) : (
                          <DismissCircle24Filled style={{ color: "#a4262c" }} />
                        )}
                        <Box>
                          <Text
                            weight="semibold"
                            style={{ display: "block", fontSize: 13 }}
                          >
                            {campaignForm.employeeFileName}
                          </Text>
                          <Text size={200} style={{ color: "#666" }}>
                            {fileValidation.message}
                          </Text>
                        </Box>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {fileValidation.status === "success" && (
                          <Badge appearance="filled" color="success">
                            {fileValidation.rowCount} employees
                          </Badge>
                        )}
                        {!isViewMode && (
                          <Button
                            appearance="transparent"
                            icon={<Delete24Regular />}
                            size="small"
                            onClick={handleRemoveFile}
                            title="Remove file"
                          />
                        )}
                      </Box>
                    </Box>
                  )}

                  {/* validation error — show missing headers */}
                  {fileValidation.status === "error" &&
                    !campaignForm?.employeeFileName && (
                      <Box
                        style={{
                          border: "1.5px solid #a4262c",
                          borderRadius: 8,
                          padding: "14px 16px",
                          background: "#fdf3f4",
                          marginTop: 8,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <DismissCircle24Filled style={{ color: "#a4262c" }} />
                        <Box>
                          <Text
                            weight="semibold"
                            style={{
                              display: "block",
                              fontSize: 13,
                              color: "#a4262c",
                            }}
                          >
                            Upload failed
                          </Text>
                          <Text size={200} style={{ color: "#666" }}>
                            {fileValidation.message}
                          </Text>
                        </Box>
                      </Box>
                    )}

                  {/* retry button after error */}
                  {fileValidation.status === "error" && !isViewMode && (
                    <Button
                      appearance="outline"
                      size="small"
                      style={{ marginTop: 10 }}
                      icon={<ArrowUpload24Regular />}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Try Again
                    </Button>
                  )}
                </Field>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>

      <ProductSelectionModal
        open={campaignForm?.isProductModalOpen}
        onClose={() =>
          setCampaignForm((p) => ({
            ...p,
            isProductModalOpen: false,
          }))
        }
        products={services?.productData?.rows || []}
        userType={LocalStorage?.userDetails?.userType}
        selectedProducts={campaignForm?.products || []}
        setSelectedProducts={(products) =>
          setCampaignForm((p) => ({
            ...p,
            products: products,
          }))
        }
        isSingleSelection={campaignForm?.giftingModel === "hr_selected"}
        disabled={openForm?.divType === "view" || openForm?.divType === "edit"}
      />
    </Grid>
  );
}

export default BasicDetails;
