import { Stack } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";
import {
  bundleIcon,
  iconFilledClassName,
  iconRegularClassName,
} from "@fluentui/react-icons";
import * as React from "react";

const useClasses = makeStyles({
  container: {
    boxSizing: "border-box",
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    fontSize: "32px",

    ":hover": {
      [`& .${iconFilledClassName}`]: {
        display: "block",
      },
      [`& .${iconRegularClassName}`]: {
        display: "none",
      },
    },
  },

  disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
    pointerEvents: "none", // 🚫 disables click + hover
  },
});

export const BundleIcon = ({
  filledIcon,
  regularIcon,
  style,
  onClick,
  noColor,
  onMouseLeave,
  onMouseEnter,
  iconStyle,
  disabled = false, // ✅ new prop
}) => {
  const classes = useClasses();
  const AccessTime = bundleIcon(filledIcon, regularIcon);

  return (
    <Stack
      className={`${classes.container} ${disabled ? classes.disabled : ""}`}
      style={style}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={!disabled ? onMouseEnter : undefined}
      onMouseLeave={!disabled ? onMouseLeave : undefined}
    >
      <AccessTime
        color={!noColor && disabled ? "#A0A0A0" : "#1EA5FC"}
        style={iconStyle}
      />
    </Stack>
  );
};
