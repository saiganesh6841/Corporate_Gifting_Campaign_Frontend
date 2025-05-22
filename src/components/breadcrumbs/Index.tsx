import * as React from "react";
import {
  Breadcrumb,
  IBreadcrumbItem,
  IBreadcrumbDividerProps,
} from "@fluentui/react/lib/Breadcrumb";
import { useNavigate, useLocation } from "react-router-dom";

const Breadcrumbs: React.FunctionComponent<{ style?: React.CSSProperties }> = ({
  style,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathNames = location.pathname.split("/").filter((value) => value);

  const onBreadcrumbItemClicked = (item: string): void => {
    navigate(`/${item}`);
  };

  const items: IBreadcrumbItem[] = pathNames.map((value, ind) => {
    const pathUrl: string = pathNames.slice(0, ind + 1).join("/");
    const displayText = value === "admin" ? "Home" : value;

    return {
      text: displayText,
      key: displayText,
      style: {
        textTransform: "capitalize",
        fontWeight: "400",
        fontSize: "14px",
      },
      onClick: () => onBreadcrumbItemClicked(pathUrl),
    };
  });

  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        ...style,
      }}
    >
      <Breadcrumb
        items={items}
        onReduceData={_returnUndefined}
        maxDisplayedItems={3}
        ariaLabel="Breadcrumb with static width"
        overflowAriaLabel="More items"
      />
    </div>
  );
};

const _returnUndefined = () => undefined;

export default Breadcrumbs;
