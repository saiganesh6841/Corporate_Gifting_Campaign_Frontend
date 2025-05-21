import PrimaryBtn from "../../../components/button";
import CustomTextFiled from "../../../components/loginInputFields";
import useServices from "./hooks/useServices";
import { useNavigate } from "react-router-dom";

function Login() {
  const services = useServices();
  return (
    <div>
      <CustomTextFiled
        type={"number"}
        placeholder="Enter you mobile number"
        value={services?.loginDetails?.mobileNo}
        onChange={(e) => {
          services?.setLoginDetails((p) => ({
            ...p,
            mobileNo: e.target.value,
          }));
        }}
      />
      <CustomTextFiled
        type={"password"}
        placeholder="Enter your password"
        value={services?.loginDetails?.password}
        onChange={(e) => {
          services?.setLoginDetails((p) => ({
            ...p,
            password: e.target.value,
          }));
        }}
      />

      <PrimaryBtn
        onClick={() => {
          services?.onAccountLogin();
        }}
      >
        Login
      </PrimaryBtn>
    </div>
  );
}

export default Login;
