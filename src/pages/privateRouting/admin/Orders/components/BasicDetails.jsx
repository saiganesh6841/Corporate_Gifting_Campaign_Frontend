import {
  Field,
  Input,
  Option,
  Combobox,
  Button,
  Text,
} from "@fluentui/react-components";
import { Delete20Filled, AddCircle24Regular } from "@fluentui/react-icons";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import SectionHeading from "../../../../../components/SectionHeader/Index";
import DatePickerComponent from "../../../../../components/DatePicker/Index";

const EMPTY_NEW_EMPLOYEE = {
  fullName: "",
  email: "",
  mobileNumber: "",
  department: "",
};

function BasicDetails({
  classes,
  setOrderForm,
  orderForm,
  openForm,
  errors,
  services,
}) {
  const theme = useTheme();
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [campaignQuery, setCampaignQuery] = useState("");
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState(EMPTY_NEW_EMPLOYEE);

  useEffect(() => {
    const fetchData = async () => {
      await services?.getEmployeeList?.();
      await services?.getCampaignList?.();
    };
    fetchData();
  }, []);

  const isViewMode = openForm?.divType === "view";
  const isEditMode = openForm?.divType === "edit";

  const filteredEmployees = (services?.employeesList ?? []).filter((emp) =>
    emp?.fullName?.toLowerCase()?.includes(employeeQuery?.toLowerCase() ?? ""),
  );

  const filteredCampaigns = (services?.campaignList ?? []).filter((camp) =>
    camp?.campaignName
      ?.toLowerCase()
      ?.includes(campaignQuery?.toLowerCase() ?? ""),
  );

  const noEmployeeMatch =
    employeeQuery?.trim()?.length > 0 && filteredEmployees?.length === 0;

  const handleSelectEmployee = (emp) => {
    setOrderForm((p) => ({
      ...p,
      employee: emp,
      employeeId: emp?._id,
      isNewEmployee: false,
      address: emp?.address || "",
      city: emp?.city || "",
      state: emp?.state || "",
      pincode: emp?.pincode || "",
      fullName: undefined,
      email: undefined,
      mobileNumber: undefined,
      department: undefined,
    }));
    setEmployeeQuery(emp?.fullName || "");
    setIsAddingEmployee(false);
    setNewEmployee(EMPTY_NEW_EMPLOYEE);
    delete errors?.["employee"];
  };

  const handleRemoveEmployee = () => {
    setOrderForm((p) => ({
      ...p,
      employee: null,
      employeeId: null,
      isNewEmployee: false,
      fullName: undefined,
      email: undefined,
      mobileNumber: undefined,
      department: undefined,
      address: "",
      city: "",
      state: "",
      pincode: "",
    }));
    setEmployeeQuery("");
    setIsAddingEmployee(false);
    setNewEmployee(EMPTY_NEW_EMPLOYEE);
  };

  const handleNewEmployeeFieldChange = (field) => (e) => {
    const value = e?.target?.value ?? "";
    setNewEmployee((p) => ({ ...p, [field]: value }));
    setOrderForm((p) => ({
      ...p,
      isNewEmployee: true,
      employeeId: undefined,
      [field]: value,
    }));
    delete errors?.[field];
  };

  const handleDeliveryFieldChange = (field) => (e) => {
    setOrderForm((p) => ({ ...p, [field]: e?.target?.value ?? "" }));
    delete errors?.[field];
  };

  const handleSelectCampaign = (camp) => {
    setOrderForm((p) => ({
      ...p,
      campaign: camp,
      campaignId: camp?._id ?? camp?.campaignId,
    }));
    setCampaignQuery(camp?.campaignName || "");
    delete errors?.["campaign"];
  };
  console.log("errors", errors);
  return (
    <Grid container spacing={2}>
      {/* ── Employee Section ─────────────────────────── */}
      <Grid item xs={12}>
        <Box className="box_container">
          <SectionHeading
            title="Employee Details"
            classes={classes}
            theme={theme}
          />
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <Grid item xs={12}>
              <Field
                className={classes?.label}
                label="Select Employee"
                required
                validationMessage={errors?.employee}
                htmlFor="employee"
              >
                <Combobox
                  id="employee"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Search employee by name…"
                  value={orderForm?.employee?.fullName || employeeQuery}
                  onInput={(e) => {
                    const val = e?.target?.value ?? "";
                    setEmployeeQuery(val);
                    services?.getEmployeeList?.(val);
                    setIsAddingEmployee(false);
                    setNewEmployee(EMPTY_NEW_EMPLOYEE);
                    setOrderForm((p) => ({
                      ...p,
                      employee: null,
                      employeeId: null,
                      isNewEmployee: false,
                      fullName: undefined,
                      email: undefined,
                      mobileNumber: undefined,
                      department: "",
                      address: "",
                      city: "",
                      state: "",
                      pincode: "",
                    }));
                  }}
                  disabled={isViewMode}
                >
                  {filteredEmployees?.map((emp) => (
                    <Option
                      key={emp?._id}
                      text={emp?.fullName}
                      onClick={() => handleSelectEmployee(emp)}
                    >
                      {emp?.fullName} — {emp?.email || emp?.mobileNumber}
                    </Option>
                  ))}

                  {noEmployeeMatch && (
                    <Option
                      key="add-new-employee"
                      text={employeeQuery}
                      onClick={() => {
                        setIsAddingEmployee(true);
                        setNewEmployee({
                          ...EMPTY_NEW_EMPLOYEE,
                          fullName: employeeQuery,
                        });
                        setOrderForm((p) => ({
                          ...p,
                          employee: null,
                          employeeId: null,
                          isNewEmployee: true,
                          fullName: employeeQuery,
                          email: "",
                          mobileNumber: "",
                          department: "",
                          address: "",
                          city: "",
                          state: "",
                          pincode: "",
                        }));
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          color: "#0078D4",
                        }}
                      >
                        <AddCircle24Regular fontSize={16} />
                        <Text>Add "{employeeQuery}" as new employee</Text>
                      </Box>
                    </Option>
                  )}
                </Combobox>
              </Field>
            </Grid>

            {/* existing employee preview */}
            {orderForm?.employee && !isAddingEmployee && (
              <Grid item xs={12}>
                <Box
                  style={{
                    border: "1px solid #e1e1e1",
                    borderRadius: 8,
                    padding: "14px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    background: "#fafafa",
                  }}
                >
                  <Box>
                    <Text weight="semibold" style={{ display: "block" }}>
                      {orderForm?.employee?.fullName}
                    </Text>
                    <Text size={200} style={{ color: "#666" }}>
                      {orderForm?.employee?.email || "—"} ·{" "}
                      {orderForm?.employee?.mobileNumber || "—"}
                    </Text>
                    {orderForm?.employee?.department && (
                      <Text
                        size={200}
                        style={{ color: "#666", display: "block" }}
                      >
                        {orderForm?.employee?.department}
                      </Text>
                    )}
                  </Box>
                  {!isViewMode && (
                    <Button
                      appearance="subtle"
                      icon={<Delete20Filled color="#ef4444" />}
                      onClick={handleRemoveEmployee}
                    />
                  )}
                </Box>
              </Grid>
            )}

            {/* new employee inline fields */}
            {isAddingEmployee && !isViewMode && (
              <>
                <Grid item xs={6}>
                  <Field
                    label="Full Name"
                    required
                    className={classes?.label}
                    validationMessage={errors?.fullName}
                  >
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={newEmployee?.fullName || ""}
                      onChange={handleNewEmployeeFieldChange("fullName")}
                    />
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    label="Mobile Number"
                    required
                    className={classes?.label}
                    validationMessage={errors?.mobileNumber}
                  >
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={newEmployee?.mobileNumber || ""}
                      onChange={handleNewEmployeeFieldChange("mobileNumber")}
                    />
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    label="Email"
                    required
                    className={classes?.label}
                    validationMessage={errors?.email}
                  >
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={newEmployee?.email || ""}
                      onChange={handleNewEmployeeFieldChange("email")}
                    />
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field label="Department" className={classes?.label}>
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={newEmployee?.department || ""}
                      onChange={handleNewEmployeeFieldChange("department")}
                    />
                  </Field>
                </Grid>
              </>
            )}

            {/* delivery address */}
            {(orderForm?.employee || isAddingEmployee) && (
              <>
                <Grid item xs={12}>
                  <Text
                    weight="semibold"
                    size={300}
                    style={{ display: "block", marginTop: 8 }}
                  >
                    Delivery Address
                  </Text>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    label="Address"
                    required
                    className={classes?.label}
                    validationMessage={errors?.address}
                  >
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      placeholder="Street / flat / building"
                      value={orderForm?.address || ""}
                      onChange={handleDeliveryFieldChange("address")}
                      disabled={isViewMode}
                    />
                  </Field>
                </Grid>
                <Grid item xs={4}>
                  <Field
                    label="City"
                    required
                    className={classes?.label}
                    validationMessage={errors?.city}
                  >
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={orderForm?.city || ""}
                      onChange={handleDeliveryFieldChange("city")}
                      disabled={isViewMode}
                    />
                  </Field>
                </Grid>
                <Grid item xs={4}>
                  <Field
                    label="State"
                    className={classes?.label}
                    validationMessage={errors?.state}
                  >
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={orderForm?.state || ""}
                      onChange={handleDeliveryFieldChange("state")}
                      disabled={isViewMode}
                    />
                  </Field>
                </Grid>
                <Grid item xs={4}>
                  <Field
                    label="Pincode"
                    required
                    className={classes?.label}
                    validationMessage={errors?.pincode}
                  >
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={orderForm?.pincode || ""}
                      onChange={handleDeliveryFieldChange("pincode")}
                      disabled={isViewMode}
                    />
                  </Field>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Grid>

      {/* ── Campaign Section ─────────────────────────── */}
      <Grid item xs={12}>
        <Box className="box_container">
          <SectionHeading
            title="Campaign Details"
            classes={classes}
            theme={theme}
          />
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <Grid item xs={12}>
              <Field
                className={classes?.label}
                label="Select Campaign"
                required
                validationMessage={errors?.campaign}
                htmlFor="campaign"
              >
                <Combobox
                  id="campaign"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Search campaign by name…"
                  value={orderForm?.campaign?.campaignName || campaignQuery}
                  onInput={(e) => {
                    const val = e?.target?.value ?? "";
                    setCampaignQuery(val);
                    setOrderForm((p) => ({
                      ...p,
                      campaign: null,
                      campaignId: null,
                    }));
                  }}
                  disabled={isViewMode || isEditMode}
                >
                  {filteredCampaigns?.map((camp) => (
                    <Option
                      key={camp?._id ?? camp?.campaignId}
                      text={camp?.campaignName}
                      onClick={() => handleSelectCampaign(camp)}
                    >
                      {camp?.campaignName}
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </Grid>

            {/* campaign read-only meta */}
            {orderForm?.campaign && (
              <>
                <Grid item xs={6}>
                  <Field className={classes?.label} label="Occasion">
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={orderForm?.campaign?.occasion || ""}
                      readOnly
                      disabled
                    />
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    className={classes?.label}
                    label="Budget Per Employee (₹)"
                  >
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={String(
                        orderForm?.campaign?.budgetPerEmployee ?? "",
                      )}
                      readOnly
                      disabled
                    />
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field className={classes?.label} label="Gifting Model">
                    <Input
                      className={"input__Style"}
                      size={"large"}
                      value={
                        orderForm?.campaign?.giftingModel === "hr_selected"
                          ? "HR Selected Gifts"
                          : orderForm?.campaign?.giftingModel ===
                              "employee_choice"
                            ? "Employee Choice Gifts"
                            : orderForm?.campaign?.giftingModel || ""
                      }
                      readOnly
                      disabled
                    />
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field className={classes?.label} label="Campaign Deadline">
                    <DatePickerComponent
                      className={"input__Style"}
                      size="large"
                      value={
                        orderForm?.campaign?.campaignDeadline
                          ? new Date(orderForm.campaign.campaignDeadline * 1000)
                          : null
                      }
                      disabled
                    />
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    className={classes?.label}
                    label="Delivery Window Start"
                  >
                    <DatePickerComponent
                      className={"input__Style"}
                      size="large"
                      value={
                        orderForm?.campaign?.deliveryWindowStart
                          ? new Date(
                              orderForm.campaign.deliveryWindowStart * 1000,
                            )
                          : null
                      }
                      disabled
                    />
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field className={classes?.label} label="Delivery Window End">
                    <DatePickerComponent
                      className={"input__Style"}
                      size="large"
                      value={
                        orderForm?.campaign?.deliveryWindowEnd
                          ? new Date(
                              orderForm.campaign.deliveryWindowEnd * 1000,
                            )
                          : null
                      }
                      disabled
                    />
                  </Field>
                </Grid>

                {/* show products as read-only info cards — no selection needed */}
                {orderForm?.campaign?.products?.length > 0 && (
                  <Grid item xs={12}>
                    <Text
                      weight="semibold"
                      size={300}
                      style={{
                        display: "block",
                        marginTop: 8,
                        marginBottom: 8,
                      }}
                    >
                      Campaign Products
                      <Text
                        size={200}
                        style={{
                          color: "#666",
                          fontWeight: 400,
                          marginLeft: 8,
                        }}
                      >
                        {orderForm?.campaign?.giftingModel === "hr_selected"
                          ? "(HR has pre-selected this product)"
                          : "(Employees will choose from these)"}
                      </Text>
                    </Text>
                    <Grid container spacing={2}>
                      {orderForm?.campaign?.products?.map((product) => (
                        <Grid
                          item
                          key={product?._id ?? product?.product}
                          sx={{ width: 260, maxWidth: 260 }}
                        >
                          <Box
                            style={{
                              border: "1px solid #e1e1e1",
                              borderRadius: 8,
                              overflow: "hidden",
                              background: "#fafafa",
                            }}
                          >
                            {product?.thumbnailImage && (
                              <img
                                src={product.thumbnailImage}
                                alt={product?.name || ""}
                                style={{
                                  width: "100%",
                                  height: 140,
                                  objectFit: "cover",
                                  display: "block",
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            )}
                            <Box style={{ padding: "10px 12px" }}>
                              <Text
                                weight="semibold"
                                style={{ display: "block", fontSize: 13 }}
                              >
                                {product?.name || ""}
                              </Text>
                              <Box
                                style={{
                                  display: "flex",
                                  gap: 6,
                                  alignItems: "center",
                                  marginTop: 4,
                                }}
                              >
                                {product?.discountPrice ? (
                                  <>
                                    <Text
                                      size={200}
                                      style={{
                                        textDecoration: "line-through",
                                        color: "#999",
                                      }}
                                    >
                                      ₹{product?.price}
                                    </Text>
                                    <Text
                                      size={200}
                                      style={{
                                        color: "#107c10",
                                        fontWeight: 600,
                                      }}
                                    >
                                      ₹{product?.discountPrice}
                                    </Text>
                                  </>
                                ) : (
                                  <Text size={200} style={{ fontWeight: 600 }}>
                                    ₹{product?.price}
                                  </Text>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
