import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { IconButton } from "@fluentui/react/lib/Button";
import { Stack, Text } from "@fluentui/react";
import * as React from "react";
import { useTheme } from "@mui/material";
import Typography from "../Text/Typogarphy";
import { Dismiss24Regular } from "@fluentui/react-icons";

export const PanelConfirmation: React.FunctionComponent<{
  panelType?: PanelType;
  description?: string;
  headerText?: string;
  width?: string;
  isOpen: boolean;
  onRenderFooterContent?: () => React.ReactNode;
  hasCloseButton?: boolean;
  dismissPanel: () => void;
  isNoFooter?: boolean;
  isExport?: boolean;
  className?: string;
  children: React.ReactNode;
}> = (props) => {
  const {
    description,
    title,
    panelType,
    children,
    width,
    isOpen,
    onRenderFooterContent,
    hasCloseButton = true,
    dismissPanel,
    isNoFooter,
    isExport,
    className,
  } = props;

  const theme = useTheme();

  // Custom header layout
  const renderHeader = () => (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      style={{
        backgroundColor: theme.palette.primary.light,
        padding: "24px",
        width: "100%",
        height: "50px",
      }}
    >
      <Typography variant="title">{title || "Panel Header"}</Typography>
      {hasCloseButton && (
        <Dismiss24Regular
          onClick={dismissPanel}
          style={{
            color: "black",
            cursor: "pointer",
          }}
        />
      )}
    </Stack>
  );

  return (
    <div>
      <Panel
        styles={{
          main: {
            borderTopLeftRadius: "24px",
            borderBottomLeftRadius: "24px",
            padding: 0,
          },
          root: {
            padding: 0,
            backgroundColor: "rgba(0,0,0,0.271)",
            opacity: isExport ? 0 : 1,
          },
        }}
        className={"notification__panel " + className}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        type={PanelType.custom}
        customWidth={width || "1368px"}
        isFooterAtBottom={true}
        hasCloseButton={false}
        onRenderNavigation={undefined} // Prevents default space
        onRenderNavigationContent={() => renderHeader()}
        onRenderFooterContent={!isNoFooter && onRenderFooterContent}
      >
        {children}
      </Panel>
    </div>
  );
};
