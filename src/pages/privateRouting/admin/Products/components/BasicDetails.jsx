import { Stack } from "@fluentui/react";
import {
  Field,
  Input,
  Option,
  Combobox,
  Textarea,
} from "@fluentui/react-components";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/styles";
import SectionHeading from "../../../../../components/SectionHeader/Index";
import AttachmentsInputField from "../../../../../components/UploadDocument/AttachmentInputField";

const productCategories = [
  "Diwali Gifts",
  "Christmas Gifts",
  "Eid Gifts",
  "Birthday Gifts",
  "Employee Rewards",
  "Welcome Kits",
  "Recognition Awards",
  "Leadership Gifting",
];

function BasicDetails({
  classes,
  setProductForm,
  productForm,
  openForm,
  errors,
}) {
  const theme = useTheme();
  const [categories, setCategories] = React.useState(productCategories);
  const [query, setQuery] = React.useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(query.toLowerCase()),
  );

  const showAddOption =
    query &&
    !categories.some((cat) => cat.toLowerCase() === query.toLowerCase());
  const handleChange = (event, name) => {
    if (!name) return;
    const { value } = event.target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
    delete errors[name];
  };

  const handleBlur = (field) => (e) => {
    const trimmedValue = e.target.value.trim();

    setProductForm((p) => ({
      ...p,
      [field]: trimmedValue,
    }));
  };

  const isViewMode = openForm?.divType === "view";
  const isEditMode = openForm?.divType === "edit";

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className="box_container">
          <SectionHeading
            title="Product Details"
            classes={classes}
            theme={theme}
          />
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <Grid item xs={6}>
              <Field className={classes.label} label="Product ID">
                <Input
                  appearance="outline"
                  className={`input__Style`}
                  size="large"
                  value={productForm?.productId || "auto"}
                  disabled
                />
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Product Name"
                required
                validationMessage={
                  errors?.name ? "Product Name field is required" : ""
                }
                htmlFor="name"
              >
                <Input
                  id="name"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter product name"
                  value={productForm?.name || ""}
                  onChange={(e) => handleChange(e, "name")}
                  disabled={isViewMode}
                  onBlur={handleBlur("name")}
                />
              </Field>
            </Grid>

            {/* <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Category"
                required
                validationMessage={errors?.category}
                htmlFor="category"
              >
                <Combobox
                  id="category"
                  className={"input__Style"}
                  style={{ fontSize: "14px" }}
                  size={"medium"}
                  placeholder="Select category"
                  value={productForm?.category || ""}
                  disabled={isViewMode}
                >
                  {productCategories.map((category) => (
                    <Option
                      key={category}
                      style={{ fontSize: "14px" }}
                      onClick={() => {
                        setProductForm({
                          ...productForm,
                          category: category,
                        });
                      }}
                    >
                      {category}
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </Grid> */}
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Category"
                required
                validationMessage={errors?.category}
                htmlFor="category"
              >
                <Combobox
                  placeholder="Select category"
                  freeform
                  value={productForm.category || ""}
                  className={"input__Style"}
                  disabled={isViewMode}
                  onChange={(e) => {
                    const value = e.target.value;

                    setQuery(value);

                    setProductForm((prev) => ({
                      ...prev,
                      category: value,
                    }));
                  }}
                  onOptionSelect={(e, data) => {
                    if (data.optionValue === "__add__") {
                      setCategories((prev) => [...prev, query]);

                      setProductForm((prev) => ({
                        ...prev,
                        category: query,
                      }));

                      return;
                    }

                    setProductForm((prev) => ({
                      ...prev,
                      category: data.optionValue,
                    }));
                  }}
                >
                  {filteredCategories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}

                  {showAddOption && (
                    <Option value="__add__">{`Add "${query}"`}</Option>
                  )}
                </Combobox>
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Brand"
                validationMessage={errors?.brand}
                htmlFor="brand"
              >
                <Input
                  id="brand"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter brand name"
                  value={productForm?.brand || ""}
                  onChange={(e) => handleChange(e, "brand")}
                  disabled={isViewMode}
                  onBlur={handleBlur("brand")}
                />
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Price (₹)"
                required
                validationMessage={errors?.price}
                htmlFor="price"
              >
                <Input
                  id="price"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter price"
                  value={productForm?.price || ""}
                  onChange={(event) => {
                    const value = event.target.value.replace(/[^0-9.]/g, "");
                    setProductForm({
                      ...productForm,
                      price: value,
                    });
                    delete errors["price"];
                  }}
                  disabled={isViewMode}
                  onBlur={() => {
                    if (!productForm?.price || Number(productForm.price) <= 0) {
                      errors["price"] = "Please enter a valid price";
                    } else {
                      delete errors["price"];
                    }
                  }}
                />
              </Field>
            </Grid>

            {/* <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Discount Price (₹)"
                validationMessage={errors?.discountPrice}
                htmlFor="discountPrice"
              >
                <Input
                  id="discountPrice"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter discount price"
                  value={productForm?.discountPrice || ""}
                  onChange={(event) => {
                    const value = event.target.value.replace(/[^0-9.]/g, "");
                    setProductForm({
                      ...productForm,
                      discountPrice: value,
                    });
                    delete errors["discountPrice"];
                  }}
                  disabled={isViewMode}
                  onBlur={() => {
                    if (
                      productForm?.discountPrice &&
                      productForm?.price &&
                      Number(productForm.discountPrice) >=
                        Number(productForm.price)
                    ) {
                      errors["discountPrice"] =
                        "Discount price must be less than price";
                    } else {
                      delete errors["discountPrice"];
                    }
                  }}
                />
              </Field>
            </Grid> */}

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Stock Quantity"
                required
                validationMessage={errors?.stockQuantity}
                htmlFor="stockQuantity"
              >
                <Input
                  id="stockQuantity"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter available stock"
                  value={productForm?.stockQuantity || ""}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "");
                    setProductForm({
                      ...productForm,
                      stockQuantity: value,
                    });
                    delete errors["stockQuantity"];
                  }}
                  disabled={isViewMode}
                  onBlur={() => {
                    if (
                      productForm?.stockQuantity === "" ||
                      productForm?.stockQuantity === undefined
                    ) {
                      errors["stockQuantity"] = "Stock quantity is required";
                    } else {
                      delete errors["stockQuantity"];
                    }
                  }}
                />
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field
                className={classes.label}
                label="Description"
                validationMessage={errors?.description}
                htmlFor="description"
                required
              >
                <Textarea
                  id="description"
                  // className={"input__Style"}
                  size={"large"}
                  placeholder="Enter full product description"
                  resize="none"
                  rows={4}
                  value={productForm?.description || ""}
                  onChange={(e) => handleChange(e, "description")}
                  disabled={isViewMode}
                  onBlur={handleBlur("description")}
                />
              </Field>
            </Grid>

            <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
              <Field
                className={classes.label}
                label="Thumbnail Image"
                validationMessage={
                  errors?.thumbnailImage ? "Thumbnail field is required" : ""
                }
                required
              >
                <AttachmentsInputField
                  id={"thumbnail"}
                  onUpload={(fileUrl) => {
                    setProductForm((prev) => ({
                      ...prev,
                      thumbnailImage: fileUrl,
                    }));
                    delete errors["thumbnailImage"];
                  }}
                  setUserForm={setProductForm}
                  attachments={productForm?.thumbnailImage}
                  handleDeleteAttachment={(ind) => {
                    setProductForm((p) => ({
                      ...p,
                      thumbnailImage: p.thumbnailImage.filter(
                        (_, i) => i !== ind,
                      ),
                    }));
                  }}
                />
                <Typography
                  style={{ fontSize: "12px", color: "grey", textAlign: "end" }}
                >
                  Dimensions: 300x300 px
                </Typography>
              </Field>
            </Grid>

            <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
              <Field
                className={classes.label}
                label="Product Images"
                // validationMessage={
                //   errors?.thumbnailImage ? "Thumbnail field is required" : ""
                // }
                // required
              >
                <AttachmentsInputField
                  id="images"
                  onUpload={(fileUrl) => {
                    setProductForm((prev) => ({
                      ...prev,
                      images: [...(prev.images || []), fileUrl],
                    }));

                    delete errors["images"];
                  }}
                  setUserForm={setProductForm}
                  attachments={productForm?.images || []}
                  handleDeleteAttachment={(ind) => {
                    setProductForm((prev) => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== ind),
                    }));
                  }}
                />
                <Typography
                  style={{ fontSize: "12px", color: "grey", textAlign: "end" }}
                >
                  Dimensions: 1200 x 1200 px
                </Typography>
              </Field>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
