import React from "react";
import { useSnackbar } from "notistack";

const useAlert = () => {
  // accepts message and variant like success, error
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const publishNotification = (
    message = "",
    variant,
    duration = 20000,
    anchorOrigin = {}
  ) => {
    return enqueueSnackbar(message, {
      variant,
      autoHideDuration: duration,
      preventDuplicate: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
        ...anchorOrigin,
      },
    }); //always return id
  };
  return { publishNotification, closeSnackbar };
};

export default useAlert;
