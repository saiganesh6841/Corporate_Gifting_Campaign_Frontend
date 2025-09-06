import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  spaceBetween: {
    // margin: `0 ${theme.spacing(2)}`,
  },
  label: {
    fontWeight: 600,
    // fontSize: theme.fonts.heading,
  },
  distinct: {
    // marginTop: theme.spacingArea.doubleLarge,
  },
  gapMedium: {
    // gap: theme.spacingArea.XLarge,
  },
  input: {
    borderRadius: "8px",
    border: "1px solid #E5E5E5",
    overflow: "hidden",
    fontSize: "14px",
    // marginTop: theme.spacingArea.xSmall,
  },

  panelHeader: {
    backgroundColor: theme.palette.primary.light,
  },
  dropdown: {
    border: "1.5px solid #E5E5E5",
    borderRadius: "8px",
    width: "100%",
    height: "49px",
    display: "flex",
    alignItems: "center",
  },
  tablistStyles: {
    fontSize: "18px",
  },
  subscriptionHeader: {
    // backgroundColor: theme?.palette?.background?.default,
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    height: "50px",
    paddingBottom: "12px",
  },
  renewButton: {
    // backgroundColor: theme?.palette?.primary?.main,
    color: "#fff",
    "&:hover": {
      // backgroundColor: theme?.palette?.primary?.main,
      color: "#fff",
    },
    padding: "8px 30px",
    borderRadius: "8px",
    textTransform: "capitalize",
  },
  UserSubscriptionContainer: {
    marginTop: "20px",
    boxShadow: "0px 7px 17px 0px #0000001A",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
  },
  renewContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    // padding: "16px",
  },
  renewTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  currentPlanSection: {},
  noRatingsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  rowDiffStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  fieldStyle: {
    display: "flex",
    flexDirection: "column",
  },
  cardStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: "8px",
    padding: "16px",
    border: "1px solid #0000001A",
    gap: "24px",
    width: "100%",
  },
  detailStyle: {
    borderRadius: "12px",
    padding: "1rem",
    border: "1px solid #0000001A",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
}));
