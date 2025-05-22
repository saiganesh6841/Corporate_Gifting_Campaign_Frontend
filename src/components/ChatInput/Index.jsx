import React from "react";
import { TextField, Stack, Icon } from "@fluentui/react";
import PrimaryBtn from "../button";

const MessageInputBar = ({
  placeholder = "Write message",
  buttonLabel = "Send",
  inputValue,
  onInputChange,
  onSend,
  inputStyles = {},
}) => {
  return (
    <Stack
      horizontal
      tokens={{ childrenGap: 8 }}
      styles={{ root: { width: "100%", alignItems: "center" } }}
    >
      <TextField
        value={inputValue}
        onChange={onInputChange}
        placeholder={placeholder}
        styles={{
          root: { flexGrow: 1 },
          field: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
          ...inputStyles,
        }}
      />

      <PrimaryBtn onClick={onSend}>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
          <Icon iconName="Send" />
          <span>{buttonLabel}</span>
        </Stack>
      </PrimaryBtn>
    </Stack>
  );
};

export default MessageInputBar;
