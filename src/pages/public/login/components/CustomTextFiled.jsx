import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import useStyles from "../styles/style";

function CustomTextFiled({
  type,
  placeholder,
  style,
  value,
  onChange,
  validationMessage,
  onKeyDown,
}) {
  const classes = useStyles();

  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        marginBottom: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        className={classes.inputStyles}
        type={type === "password" && !isShowPassword ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ ...style }}
        onKeyDown={onKeyDown}
      />
      {validationMessage && (
        <span
          style={{
            color: "#D43434",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          {validationMessage}
        </span>
      )}

      {type === "password" &&
        (type === "password" && isShowPassword ? (
          <RemoveRedEyeOutlinedIcon
            sx={{
              position: "absolute",
              right: "10px",
              top: "13px",
              color: "#829CC3",
              cursor: "pointer",
            }}
            onClick={() => setIsShowPassword(false)}
          />
        ) : (
          <VisibilityOffOutlinedIcon
            sx={{
              position: "absolute",
              right: "10px",
              color: "#829CC3",
              top: "13px",
              cursor: "pointer",
            }}
            onClick={() => setIsShowPassword(true)}
          />
        ))}
    </div>
  );
}

export default CustomTextFiled;
