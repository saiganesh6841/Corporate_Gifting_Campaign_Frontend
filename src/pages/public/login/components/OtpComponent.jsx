import { Link } from "@mui/material";
import { useTheme } from "@mui/styles";
import OtpInput from "react18-input-otp";

const OtpField = ({ otp, setOTP, seconds, minutes, resendOTP, classes }) => {
  const theme = useTheme();
  return (
    <div>
      <OtpInput
        id="demo_input"
        value={otp}
        onChange={setOTP}
        // isDisabled={blockEntry}
        numInputs={6}
        separator={<span style={{ color: "#666" }}> </span>}
        containerStyle={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          fontFamily: "Segoe UI",
        }}
        inputStyle={{
          flex: "1",
          width: "30%",
          height: "50px",
          textAlign: "center",
          border: "2px solid #E1E1E1",
          backgroundColor: "#F0F5F9",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "10px",
          outline: "none",
          transition: "border-color 0.3s, background-color 0.3s",
        }}
        focusStyle={{
          borderColor: "#561E1E !important",
          backgroundColor: "#ECF5FC",
        }}
        isInputNum={true}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // gap:"100%"
        }}
      >
        <div>
          {seconds !== 0 ? (
            <Link
              variant="body2"
              disabled={seconds !== 0}
              style={{
                textDecoration: "none",
                marginTop: "8px",
                color: "#868686",
                cursor: seconds !== 0 ? "not-allowed" : "pointer",
                fontFamily: "Segoe UI",
              }}
            >
              Resend OTP
            </Link>
          ) : (
            <Link
              onClick={resendOTP}
              variant="body2"
              disabled={seconds !== 0}
              className={classes.resendOTP}
              style={{
                color: seconds === 0 ? "red" : "#868686",
              }}
            >
              Resend OTP
            </Link>
          )}
        </div>
        <div>
          <span style={{ fontFamily: "Segoe UI" }}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      </div>
    </div>
  );
};
export default OtpField;
