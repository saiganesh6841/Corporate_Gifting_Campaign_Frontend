import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import * as React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
// import { openPanel, closePanel } from "../../../Redux/panelSlice";

const buttonStyles = { root: { marginRight: 8 } };

export const PanelConfirmation: React.FunctionComponent<{
  panelType: PanelType;
  description: string;
}> = (props) => {
  const dispatch = useDispatch();
  /** @
  isOpen state for opening the panel
  children what all should be rendered
  */

  const {
    description,
    panelType,
    children,
    width,
    isOpen,
    onRenderFooterContent,
    hasCloseButton,
    dismissPanel,
    isNoFooter,
    isExport,
    className,
  }: any = props;

  return (
    <div>
      <Panel
        styles={{
          root: {
            marginTop: 50,
            padding: 0,
            backgroundColor: "rgba(0,0,0,0.271)",
            opacity: isExport ? 0 : 1,
          },
        }}
        // forceFocusInsideTrap={true}
        // isBlocking={true}
        className={"notification__panel " + className}
        hasCloseButton={hasCloseButton}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // headerText="Panel with footer at bottom"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={!isNoFooter && onRenderFooterContent}
        type={PanelType.custom}
        customWidth={width ? width : "1368px"}
        isFooterAtBottom={true}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
      >
        {children}
        <ToastContainer />
      </Panel>
    </div>
  );
};
