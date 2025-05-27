import { Image, Spinner, Field } from "@fluentui/react-components";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import companyLogo from "../../assets/images/company image.png";
import useUpload from "../../hooks/useUpload";
import { IconButton } from "@fluentui/react";
import useAlert from "../../hooks/useAlert";
import { CameraRegular } from "@fluentui/react-icons";

const LogoUploader = ({
  logoUrl,
  onUpload,
  height = 75,
  width = 80,
  error,
  name = "logo", // default field name
}) => {
  const { fileUpload, isLoading } = useUpload({ onUpload });
  const fileInputRef = useRef(null);
  const { publishNotification } = useAlert();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        publishNotification("Only image files are allowed", "error");
        e.target.value = "";
        return;
      }

      fileUpload(e);
      if (error && error[name]) {
        delete error[name]; // Dynamically delete field-specific error
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Image
          alt="Uploaded logo"
          bordered
          shape="circular"
          src={logoUrl || companyLogo}
          height={height}
          width={width}
          style={{ padding: "0px", backgroundColor: "#F2F2F2" }}
        />
      )}

      <IconButton
        onClick={() => fileInputRef.current.click()}
        style={{
          position: "relative",
          bottom: error?.[name] ? 45 : 25,
          left: 25,
          backgroundColor: "rgba(255, 255, 255,0.9)",
          borderRadius: "50%",
        }}
      >
        <CameraRegular fontSize={20} primaryFill="black" />
      </IconButton>

      {error?.[name] && <Field required validationMessage={error[name]} />}

      <input
        accept=".jpeg, .png, .jpg"
        id={`upload-${name}`}
        style={{ display: "none", cursor: "pointer" }}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

LogoUploader.propTypes = {
  logoUrl: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  name: PropTypes.string,
  error: PropTypes.object,
};

export default LogoUploader;
