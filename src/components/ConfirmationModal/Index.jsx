import React from "react";
import { Dismiss16Filled } from "@fluentui/react-icons";
import PrimaryBtn from "../button/index";
import useStyles from "./styles/style";
import Typography from "../Text/Typogarphy";

function ConfirmationModal({
  width,
  title,
  content,
  isOpen,
  onDismissModal,
  Button,
  onClick,
}) {
  const classes = useStyles();
  return (
    isOpen && (
      <div className={classes.setUpModal}>
        <div
          style={{
            width: width ? width : "500px",
            height: "auto",
          }}
          className={classes.modal}
        >
          <Typography variant="title">{title}</Typography>
          <Typography variant="subHeading">{content}</Typography>

          <div className={classes.arrangeBtns}>
            <PrimaryBtn
              onClick={onDismissModal}
              style={{
                width: "auto",
              }}
              variant="outlined"
            >
              Cancel
            </PrimaryBtn>
            <PrimaryBtn
              style={{
                width: "auto",
              }}
              variant="primary"
              onClick={onClick}
            >
              {Button ? Button : "Confirm"}
            </PrimaryBtn>
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmationModal;
