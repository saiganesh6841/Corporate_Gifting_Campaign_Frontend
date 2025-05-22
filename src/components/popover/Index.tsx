import * as React from "react";
import {
  ContextualMenu,
  ContextualMenuItemType,
  DirectionalHint,
  IContextualMenuItem,
} from "@fluentui/react/lib/ContextualMenu";

export const Popover: React.FunctionComponent = (props) => {
  // wrap the popover where u wanna show the popup
  //accepts one argument items which contains all the list of items
  const linkRef = React.useRef(null);
  const [showContextualMenu, setShowContextualMenu] = React.useState(false);
  const onShowContextualMenu = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      ev.preventDefault(); // don't navigate
      setShowContextualMenu(true);
    },
    []
  );
  const onHideContextualMenu = React.useCallback(
    () => setShowContextualMenu(false),
    []
  );

  return (
    <div>
      <div ref={linkRef} onClick={onShowContextualMenu}>
        {props.children}
      </div>
      <ContextualMenu
        items={props.menuItems}
        hidden={!showContextualMenu}
        target={linkRef}
        onItemClick={onHideContextualMenu}
        onDismiss={onHideContextualMenu}
        className="contextmenu"
      />
    </div>
  );
};
//
////////////// this is how u should pass the items data
//
// const menuItems: IContextualMenuItem[] = [
//   {
//     key: "newItem",
//     text: "New",
//     onClick: () => console.log(),
//   },
//   {
//     key: "divider_1",
//     itemType: ContextualMenuItemType.Divider,
//   },
//   {
//     key: "rename",
//     text: "Rename",
//     onClick: () => console.log("Rename clicked"),
//   },
//   {
//     key: "edit",
//     text: "Edit",
//     onClick: () => console.log("Edit clicked"),
//   },
//   {
//     key: "properties",
//     text: "Properties",
//     onClick: () => console.log("Properties clicked"),
//   },
//   {
//     key: "linkNoTarget",
//     text: "Link same window",
//     href: "http://bing.com",
//   },
//   {
//     key: "linkWithTarget",
//     text: "Link new window",
//     href: "http://bing.com",
//     target: "_blank",
//   },
//   {
//     key: "linkWithOnClick",
//     name: "Link click",
//     href: "http://bing.com",
//     onClick: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
//       alert("Link clicked");
//       ev.preventDefault();
//     },
//     target: "_blank",
//   },
//   {
//     key: "disabled",
//     text: "Disabled item",
//     disabled: true,
//     onClick: () => console.error("Disabled item should not be clickable."),
//   },
// ];
