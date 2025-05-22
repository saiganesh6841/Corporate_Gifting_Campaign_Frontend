import { Input } from "@fluentui/react-components";
import React from "react";
import { useTheme } from "@mui/material";
import { SearchRegular } from "@fluentui/react-icons";

function SearchBar({ onChange, placeholder }) {
  const theme = useTheme();
  return (
    <Input
      //   value={value}
      placeholder={placeholder}
      style={{
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        fontSize: "14px",
        color: theme?.palette?.primary?.main,
        boxShadow: "none",
        outline: "none",
        border: `1px solid ${theme?.palette?.primary?.main}`,
        width: "100%",
        height: "35px",
        padding: "8px",
      }}
      onChange={onChange}
      contentBefore={
        <SearchRegular
          style={{
            transform: "scale(0.8)",
            color: theme?.palette?.primary?.main,
            marginRight: "4px",
          }}
        />
      }
    />
  );
}

export default SearchBar;
