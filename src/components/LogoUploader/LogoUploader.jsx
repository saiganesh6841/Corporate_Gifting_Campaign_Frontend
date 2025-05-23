import { Image, Spinner, Field } from "@fluentui/react-components";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import companyLogo from "../../assets/images/company image.png";
import useUpload from "../../hooks/useUpload";
import { IconButton } from "@fluentui/react";

const LogoUploader = ({
  logoUrl,
  onUpload,
  height = 75,
  width = 80,
  error,
}) => {
  const { fileUpload, isLoading } = useUpload({
    onUpload,
  });
  const fileInputRef = useRef(null);

  // const handleFileChange = async (e) => {
  //   const { url } = await fileUpload(e); // Ensure fileUpload is defined or imported
  //   console.log(url, "url");
  //   onUpload(url);
  // };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Image
          alt="Company's logo"
          bordered
          shape="circular"
          src={logoUrl || companyLogo}
          height={height}
          width={width}
          style={{ padding: "0px", backgroundColor: "#F2F2F2" }}
        />
      )}
      {error.challengeImg && (
        <Field required validationMessage={error.challengeImg}></Field>
      )}

      <IconButton
        onClick={() => fileInputRef.current.click()}
        style={{
          position: "relative",
          bottom: error.challengeImg ? 45 : 25,
          left: 25,
          backgroundColor: "rgba(255, 255, 255,0.9)",
          borderRadius: "50%",
        }}
        iconProps={{ iconName: "Camera" }}
      />
      <input
        accept=".jpeg, .png, .jpg"
        id="upload"
        style={{ display: "none", cursor: "pointer" }}
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          fileUpload(e);
          delete error["challengeImg"];
        }}
      />
    </>
  );
};

LogoUploader.propTypes = {
  logoUrl: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  style: PropTypes.object,
};

export default LogoUploader;
