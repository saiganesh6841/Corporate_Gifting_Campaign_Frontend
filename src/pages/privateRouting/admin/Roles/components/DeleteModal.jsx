import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";

const DeleteModal = (props) => {
  const { dismissDelete ,deleteRoles} = props;
  return (
    <>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete Records</DialogTitle>
          <DialogContent>
            Are you sure you Want to Delete Selected Role?
          </DialogContent>
          <DialogActions style={{ marginTop: "30px" }}>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={dismissDelete}>
                Cancel
              </Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={deleteRoles} >Delete</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </>
  );
};

export default DeleteModal;
