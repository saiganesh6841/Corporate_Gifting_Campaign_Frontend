import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
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
  btnAlign: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageCount: {
    position: "absolute",
    bottom: "5px",
    right: "-5px",
    backgroundColor: "#e6cfd0",
    color: theme.palette.primary.main,
    padding: "4px 7px",
    fontSize: "14px",
    fontWeight: 600,
    border: "5px solid #fff",
    borderRadius: "10px 2px 11px 2px",
  },
  boxShow: {
    backgroundColor: theme.palette.primary.light,
    padding: "6px",
    borderRadius: "6px",
    margin: "4px 0px",
  },
}));
