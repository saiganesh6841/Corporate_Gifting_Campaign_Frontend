import { DefaultButton, Separator, Stack } from "@fluentui/react";
import React from "react";
import PrimaryBtn from "../button";
const OnRenderFooterContent = ({ field1, field2, field3 }) => {
  const buttonStyles = {
    root: { border: "none", fontWeight: 600 },
  };

  return (
    <>
      <Stack
        horizontal
        horizontalAlign="space-between"
        style={{ background: "white" }}
      >
        {field2?.text && (
          <PrimaryBtn
            checked={true}
            // disabled={fieldValid === false ? true : false}
            style={{
              width: "100px",
            }}
            onClick={field2?.handle}
            variant="outlined"
          >
            {field2?.text}{" "}
          </PrimaryBtn>
        )}
        {field1?.text && (
          <PrimaryBtn
            style={{
              width: "100px",
            }}
            onClick={field1?.handle}
            disabled={field1?.disabled}
          >
            {field1?.text}
          </PrimaryBtn>
        )}
      </Stack>
    </>
  );
};
export default OnRenderFooterContent;
