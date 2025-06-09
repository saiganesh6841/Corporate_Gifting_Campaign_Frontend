import {
  ColumnTriple24Regular,
  Filter24Regular,
  MoreHorizontal24Regular,
} from "@fluentui/react-icons";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { Stack, useTheme } from "@mui/material";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Popover } from "../popover/Index";
import { useStyles } from "../tableButtons/styles";
import Typography from "../Text/Typogarphy";

import { createTheme, ThemeProvider } from "@fluentui/react";
import SearchBar from "../customTableSearch";

const fluentTheme = createTheme({
  semanticColors: {
    inputText: "#333",
    inputBorder: "#561E1E33",
    inputPlaceholderText: "#aaa",
    inputIcon: "#561E1E", // <-- Icon color here
  },
});
// import ResponsiveTypography from "../Typography/Text";

const iconStyleProps: FluentIconsProps = {
  primaryFill: "#444791",
  className: "iconClass",
  font: "14px",
};

function IconsRender({ classes, button, width, functions, color }) {
  const theme = useTheme();
  const RegularButton = button.icons.regular;
  const FilledButton = button.icons.filled;
  const [filled, setFilled] = useState(true);

  iconStyleProps["primaryFill"] = filled ? color : "#FFFFFF";

  return (
    <Stack
      onClick={() => button?.handler(functions)}
      onMouseOver={() => setFilled(false)}
      onMouseLeave={() => setFilled(true)}
      className={classes.iconWrap}
      style={{
        // borderBottom: !filled
        //   ? `2.3px solid ${theme?.palette?.primary?.main}` //#1EA5FC
        //   : "2.3px solid transparent",
        border: `1px solid #561E1E33`,
        borderRadius: "12px",
        padding: "8px 12px",
        // minWidth: width ? width : "90px",
        // borderRadius: "2px",
        transition: "backgroundColor 5s",
        marginRight: "4px",
        backgroundColor: !filled
          ? `${theme?.palette?.primary?.main}`
          : "transparent",
      }}
    >
      {filled ? (
        <RegularButton {...iconStyleProps} />
      ) : (
        <FilledButton {...iconStyleProps} />
      )}
      <Typography
        // style={{fontWeight: filled ? 400 : 600, color: filled ? "black": "#1EA5FC"}}
        style={{
          fontWeight: 400,
          color: filled ? theme?.palette?.primary?.main : "#FFFFFF",
        }}
      >
        {button.label}
      </Typography>
    </Stack>
  );
}

const Toolbar = ({
  tableButtons,
  buttonList,
  buttonFunctions,
  children,
  themeColor,
  setQuery,
  resetRecords,showSearch

}) => {
  const classes = useStyles();
  iconStyleProps["primaryFill"] = themeColor;

  const allrenderedButtons = useMemo(() => {
    const buttons = {};
    if (buttonList?.length <= 6) {
      const renderedButtons = tableButtons?.filter((button) =>
        buttonList?.includes(button?.id)
      );
      buttons.renderedButtons = renderedButtons;
    } else {
      const fiteredButtons = tableButtons?.filter((button) =>
        buttonList?.includes(button?.id)
      );
      const renderedButtons = fiteredButtons?.slice(0, 4);
      const moreTableButtons = fiteredButtons?.slice(4);
      buttons.renderedButtons = renderedButtons;
      buttons.moreTableButtons = moreTableButtons;
    }
    return buttons;
  }, [buttonList]);

  // table button logic

  // Define debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((e, newValue) => {
      
      if(!showSearch) resetRecords();
      //reset the selection before searching
      setQuery((prev) => ({
        ...prev,
        keyword: newValue,
      }));
    }, 300),
    []
  );

  const RegularIcon = ({ regular }) => {
    const RegularButton = regular;
    return <RegularButton style={{ color: themeColor }} />;
  };

  const menuItems = () => {
    return allrenderedButtons?.moreTableButtons?.map((button) => ({
      key: button?.id,
      text: button?.label,
      iconProps: {
        children: <RegularIcon regular={button?.icons?.regular} />, // Use your custom icon component here
      },
      onClick: () => button?.handler(buttonFunctions),
    }));
  };

  return (
    <div>
      <Stack>
        <Stack className={classes.root}>
          <Stack className={classes.iconWraper}>
            <>
              {allrenderedButtons?.renderedButtons?.length > 0 &&
                allrenderedButtons?.renderedButtons?.map((button, index) => {
                  if (!buttonList?.includes(button?.id)) return;
                  return (
                    <React.Fragment key={index}>
                      <IconsRender
                        classes={classes}
                        button={button}
                        functions={buttonFunctions}
                        color={themeColor}
                      />
                    </React.Fragment>
                  );
                })}
              {allrenderedButtons?.moreTableButtons?.length > 0 && (
                <Popover menuItems={menuItems()}>
                  <MoreHorizontal24Regular
                    style={{
                      cursor: "pointer",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  />
                </Popover>
              )}
            </>
          </Stack>
          <Stack
            className=""
            flexDirection="row"
            alignItems="center"
            gap=".8rem"
          >
            {!showSearch && <Stack
              onClick={buttonFunctions?.viewFilter}
              flexDirection="row"
              alignItems="center"
              gap=".4rem"
              style={{ cursor: "pointer" }}
            >
              <Filter24Regular {...iconStyleProps} />
              <Typography style={{ fontWeight: 400, color: "black" }}>
                {"Filter"}
              </Typography>
            </Stack>}
            

            <Stack width="200px">
              <SearchBar
                placeholder="Quick search"
                onChange={(e) => {
                  handleSearch(e, e.target.value);
                }}
              />
            </Stack>


                {!showSearch && <ColumnTriple24Regular
              onClick={() =>
                buttonFunctions?.editColumn && buttonFunctions?.editColumn()
              }
              style={{ cursor: "pointer" }}
              {...iconStyleProps}
            />}
            
            {children}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default memo(Toolbar);
