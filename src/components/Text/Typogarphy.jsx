import { Text } from "@fluentui/react";
import { makeStyles } from "@mui/styles";
import React from "react";

export const useStylesFromThemeFunction = makeStyles((theme) => ({
  root: {},
  title: {
    ...theme.title,
  },
  heading: {
    ...theme.heading,
  },
  subHeading: {
    ...theme.subHeading,
  },

  content: {
    // ...theme.content,
    fontSize: "13px",
  },
  mainHeading: {
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
}));

const Typography = (props) => {
  const classes = useStylesFromThemeFunction();
  //accepts no wrap aregumnt if wrap is true then nowrap happens defaultly it is wrap
  //and also children which is to render
  const { nowrap, children, variant, style, className, onClick, cap } = props;
  return (
    <Text
      onClick={onClick}
      className={classes?.[variant || "content"]}
      nowrap={nowrap && true}
      style={{
        textTransform: cap ? cap : "capitalize",
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export default Typography;
