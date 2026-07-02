import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  spaceBetween: {
    // margin: `0 ${theme.spacingArea.large}`,
    padding: 0,
  },
  label: {
    fontWeight: 600,
    fontSize: theme.fonts.heading,
  },
  distinct: {
    marginTop: theme.spacingArea.doubleLarge,
  },
  gapDoubleLarge: {
    gap: theme.spacingArea.doubleLarge,
  },
  gapMedium: {
    gap: theme.spacingArea.xLarge,
  },
  gapSmall: {
    gap: theme.spacingArea.medium,
  },
  gapXsmall: {
    gap: theme.spacingArea.small,
  },
  input: {
    borderRadius: "8px",
    border: "1px solid #E5E5E5",
    overflow: "hidden",
    fontSize: "14px",
    marginTop: theme.spacingArea.xSmall,
    backgroundColor: "white",
  },
  backgroundGrey: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacingArea.large,
  },
  smallComponentSpacingBetween: {
    marginTop: theme.spacingArea.large,
    paddingBottom: theme.spacingArea.small,
  },
  componentSpacingBetween: {
    marginTop: theme.spacingArea.xLarge,
    paddingBottom: theme.spacingArea.small,
  },
  increment: {
    borderRadius: "8px",
    border: "1px solid #E5E5E5",
    overflow: "hidden",
    fontSize: "16px",
    marginTop: theme.spacingArea.xSmall,
    backgroundColor: "white",
    width: "52px ",
    height: "41px",
    justifyContent: "center",
    alignItems: "center",
  },
  parentTitle: {
    padding: ` ${theme.spacingArea.medium} ${theme.spacingArea.large}`,
    backgroundColor: "#ECF9FF",
    flexDirection: "row",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  itenaryComponent: {
    padding: theme.spacingArea.large,
    paddingTop: theme.spacingArea.small,
    borderRight: "1px solid #E5E5E5",
    borderLeft: "1px solid #E5E5E5",
    gap: theme.spacingArea.large,
    height: "100%",
  },
  // new style..

  root: {
    width: "100%",
    paddingLeft: 10,
    paddingRigt: 10,
    marginTop: 60,
  },
  paper: {
    padding: 10,
    height: "100%",
  },
  backButton: {
    margin: 20,
  },
  userHeaderMargin: {
    marginTop: "-5%",
    position: "relative",
    left: "42%",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  userTypeMenuItem: {
    minWidth: "50%",
    marginTop: "6px",
  },
  formGrid: {
    marginBottom: 10,
    marginRight: 10,
  },
  permissionHeader: {
    height: "48px",
    backgroundColor: "#4f5ce75c",
    borderTopRightRadius: "8px",
    borderTopLeftRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    padding: "12px",
  },
  labels: {
    height: "350px",
    overflowY: "scroll",
    padding: "16px",
  },
  boxContainer: {
    boxShadow: "0px 8px 18px 0px #00000014",
    borderBottomRightRadius: "8px",
    borderBottomLeftRadius: "8px",
    minWidth: "535px",
    marginBottom: "20px",
    maxWidth: "535px",
    marginLeft: "30px",
    position: "sticky",
    top: "20px",
    backgroundColor: "#ffff",
  },

  PermissinboxContainer: {
    boxShadow: "0px 8px 18px 0px #00000014",
    borderBottomRightRadius: "8px",
    borderBottomLeftRadius: "8px",
    marginBottom: "20px",
    minWidth: "270px",
  },
  permissionsAccesContainer: {
    display: "flex",
  },
  permissionsContainer: {
    paddingTop: "0",
    padding: "25px",
    maxHeight: "600px",
    overflowY: "scroll",
    minWidth: "340px",
  },
}));
