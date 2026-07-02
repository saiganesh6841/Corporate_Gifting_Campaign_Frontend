import { Field } from "@fluentui/react-components";
import { Grid } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["image"], //"link",
  ],
};

const formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
  // "link",
  "image",
  "color",
  "background",
];

export default function TextEditor({
  errors,
  classes,
  placeholder,
  setData,
  value,
  disabled,
  style,
  error,
  label,
  required,
}) {
  // const handleChange = (newContent) => {
  //   try {
  //     // const contentToEncode =
  //     //   newContent.trim() === "<p><br></p>" ? "" : newContent;
  //     // const encodedContent = window.btoa(contentToEncode);
  //     // setData(encodedContent);
  //     const tempElement = document.createElement("div");
  //     tempElement.innerHTML = newContent;
  //     const plainText = tempElement.textContent || tempElement.innerText || "";

  //     const cleaned = plainText.replace(/\u00A0/g, "").trim(); // Remove &nbsp;

  //     const contentToEncode = cleaned === "" ? "" : newContent;
  //     const encodedContent = window.btoa(contentToEncode);
  //     setData(encodedContent);
  //   } catch (error) {
  //     console.error("Error encoding content to Base64", error);
  //   }
  // };

  // const getDecodedContent = (encodedContent) => {
  //   try {
  //     return window.atob(encodedContent);
  //   } catch (error) {
  //     console.error("Error decoding Base64 content", error);
  //     return "";
  //   }
  // };
  // replace handleChange in TextEditor.jsx
  const handleChange = (newContent) => {
    try {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = newContent;
      const plainText = tempElement.textContent || tempElement.innerText || "";
      const cleaned = plainText.replace(/\u00A0/g, "").trim();
      const contentToEncode = cleaned === "" ? "" : newContent;

      // ✅ use encodeURIComponent + unescape to handle emojis and special chars
      // window.btoa() alone fails on non-ASCII (emojis, ₹, etc.)
      const encodedContent = contentToEncode
        ? window.btoa(unescape(encodeURIComponent(contentToEncode)))
        : "";

      setData(encodedContent);
    } catch (error) {
      console.error("Error encoding content to Base64", error);
    }
  };

  // replace getDecodedContent in TextEditor.jsx
  const getDecodedContent = (encodedContent) => {
    try {
      if (!encodedContent) return "";
      return decodeURIComponent(escape(window.atob(encodedContent)));
    } catch (error) {
      console.error("Error decoding Base64 content", error);
      return "";
    }
  };
  const errorMessage = error;

  return (
    <Grid item xs={12} md={12} lg={12} xl={12}>
      <Field
        className={classes.label}
        label={label ? label : "Description"}
        required={required ? false : true}
        validationMessage={errorMessage}
        htmlFor="description"
      >
        <ReactQuill
          value={getDecodedContent(value || "")}
          onChange={handleChange}
          placeholder={
            placeholder ||
            "Type / to add tables, images, code blocks, and more."
          }
          style={{
            fontWeight: "normal",
            borderRadius: "8px",
            marginBottom: errorMessage ? "3.2rem" : "2rem", // Extra space for validation message
            left: "0px",
            cursor: disabled && "not-allowed",
            ...style,
          }}
          modules={modules}
          formats={formats}
          readOnly={disabled}
        />
      </Field>
    </Grid>
  );
}
