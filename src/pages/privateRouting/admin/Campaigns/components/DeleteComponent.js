import React from "react";
import { Dialog } from "@fluentui/react-components";

const DialogComponent = ({ children, isDeleteOpen }) => {
  return <Dialog open={isDeleteOpen}>{children}</Dialog>;
};

export default DialogComponent;
