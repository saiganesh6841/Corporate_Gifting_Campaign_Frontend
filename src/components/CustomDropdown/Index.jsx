import React, { useState } from "react";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuPopover,
  MenuTrigger,
  MenuButton,
} from "@fluentui/react-components";
import { Text } from "@fluentui/react-components";
import {
  HourglassRegular,
  ClockRegular,
  ChevronDownRegular,
} from "@fluentui/react-icons";
import { Verified } from "@mui/icons-material";
import { Dismiss20Filled } from "@fluentui/react-icons";

const statusOptions = [
  {
    label: "Pending",
    value: "pending",
    color: "#FFD700", // gold yellow
    lightColor: "#FFF8DC", // light yellow (background when selected)
    icon: <ClockRegular />,
  },
  {
    label: "In Progress",
    value: "inprogress",
    color: "#0078d4",
    lightColor: "#D0E7FF", // light blue background
    icon: <HourglassRegular />,
  },
  {
    label: "Completed",
    value: "completed",
    color: "green",
    lightColor: "#d4edda", // light green background
    icon: <Verified style={{ color: "green" }} />,
  },
  {
    label: "Cancelled",
    value: "cancelled",
    color: "red",
    lightColor: "#f8d7da", // light red background
    icon: <Dismiss20Filled style={{ color: "red" }} />,
  },
];

const CustomDropdown = ({ initialStatus, onChange, disabled }) => {
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const current =
    statusOptions.find((s) => s.value === selectedStatus) || statusOptions[0];

  const handleSelect = (statusValue) => {
    setSelectedStatus(statusValue);
    if (onChange) onChange(statusValue);
  };

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton
          appearance="primary"
          style={{
            backgroundColor: current.lightColor,
            color: current.color,
            minWidth: 150,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 8,
            padding: "8px 12px",
          }}
          disabled={disabled}
          icon={React.cloneElement(current.icon, {
            style: { color: current.color },
          })}
          iconPosition="before"
          menuIcon={
            <ChevronDownRegular
              style={{ color: current.color }}
              fontSize={14}
            />
          }
        >
          <Text style={{ color: current.color }}>{current.label}</Text>
        </MenuButton>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {statusOptions.map((opt) => (
            <MenuItem
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              style={{
                color: opt.color,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              icon={opt.icon}
            >
              <Text>{opt.label}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default CustomDropdown;
