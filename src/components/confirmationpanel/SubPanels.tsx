import * as React from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { openPanel, closePanel } from "../../../Redux/panelSlice";

const buttonStyles = { root: { marginRight: 8 } };

const SubPanel: React.FunctionComponent<{
  panelType: PanelType;
  description: string;
}> = (props) => {
  // open state for opening the panel
  // children what all should be rendered

  const { description, panelType, children, isOpen, setIsOpen } = props;

  const dismissPanel = () => setIsOpen(!isOpen);

  return (
    <div>
      <Panel
        className="sub__panel"
        hasCloseButton={false}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // headerText="Panel with footer at bottom"
        closeButtonAriaLabel="Close"
        // onRenderFooterContent={onRenderFooterContent}
        type={PanelType.custom}
        customWidth={"682px"}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        // isFooterAtBottom={true}
      >
        {children}
      </Panel>
    </div>
  );
};
export default SubPanel;
