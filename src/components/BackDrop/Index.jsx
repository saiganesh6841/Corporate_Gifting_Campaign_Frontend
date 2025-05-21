import { Spinner, SpinnerSize } from "@fluentui/react";
import Backdrop from "@mui/material/Backdrop";
import React from "react";
import { useSelector } from "react-redux";

const BackdropComponent = ({ children, isOpen = true }) => {
  // const backdropOpen = useSelector((state) => state?.backdropOpen);

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 9999997977,
        }}
        open={isOpen || backdropOpen}
      >
        <Spinner
          size={SpinnerSize.large}
          styles={{
            root: { height: "45px", width: "45px", borderWidth: "10px" },
          }}
        />
      </Backdrop>
    </div>
  );
};

export default BackdropComponent;
