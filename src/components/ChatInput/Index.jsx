import React from "react";
import { TextField, Stack, Icon } from "@fluentui/react";
import PrimaryBtn from "../button";
import { Input } from "@fluentui/react-components";

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
      <Input
        value={inputValue}
        onChange={onInputChange}
        placeholder={placeholder}
        style={{ width: "100%" }}
        className="input__Style"
        // styles={{
        //   root: { flexGrow: 1 },
        //   field: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
        //   ...inputStyles,
        // }}
      />

      <PrimaryBtn onClick={onSend} style={{ width: "100px" }}>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
          <Icon iconName="Send" />
          <span>{buttonLabel}</span>
        </Stack>
      </PrimaryBtn>
    </Stack>
  );
};

export default MessageInputBar;
