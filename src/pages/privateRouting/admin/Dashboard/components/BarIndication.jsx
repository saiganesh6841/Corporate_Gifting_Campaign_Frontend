import { Box } from "@mui/material";
import React from "react";
import Typography from "../../../../../components/Text/Typogarphy";

function BarIndication({ amount, label, backgroundColor }) {
  return (
    <>
      <Box
        sx={{
          width: "30px",
          height: "30px",
          backgroundColor: { backgroundColor }, //#707BF7
          borderRadius: "50%",
          marginRight: "8px",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="subHeading"
          style={{
            fontWeight: "600",
          }}
        >
          ₹ {amount}
        </Typography>
        <Typography
          variant="content"
          style={{
            color: "#868686",
          }}
        >
          {`${label} Plan`}
        </Typography>
      </Box>
    </>
  );
}

export default BarIndication;
