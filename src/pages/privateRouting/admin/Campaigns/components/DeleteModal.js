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
  const { dismissDelete ,deleteUser} = props;
  return (
    <>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete Record</DialogTitle>
          <DialogContent>
            Are you sure you Want to Delete Selected Data? All the User's Data will get Deleted
          </DialogContent>
          <DialogActions style={{ marginTop: "30px" }}>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={dismissDelete}>
                Cancel
              </Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={deleteUser} >Delete</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </>
  );
};

export default DeleteModal;
