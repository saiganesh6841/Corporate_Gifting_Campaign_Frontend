import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  spaceBetween: {
    margin: `0 ${theme.spacing(2)}`,
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
  dashboardHeading: {
    display: "flex",
    flexDirection: "column",
    padding: "8px",
  },
  mainDashboardContainer: {
    // height: "500px",
    marginTop: "14px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "50px",
  },
  dashBoardStatAndGraphContainer: {
    width: "100%",
    boxShadow: "0px 7px 17px 0px #0000001A",
    padding: "16px",
    height: "100%",
  },
  totalRevenueContainer: {
    width: "30%",
    boxShadow: "0px 7px 17px 0px #0000001A",
    padding: "16px",
  },
  statisticsCardContainer: {
    width: "32%",
    // height: "130px",
    borderRadius: "8px",
    background: "#fff",
    padding: "8px 16px",
  },
  statastics: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    width: "45px",
    height: "45px",
    backgroundColor: "#FFFFFF1A",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 9.2px 22.34px 0px #2D511C1A",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tooltipContainer: {
    backgroundColor: "#fff",
    boxShadow: "0px 8px 22px 0px #00000012",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
  },
  revenueHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountSpan: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "14px",
  },
  revenueTimeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    position: "relative",
    zIndex: 99999,
  },
}));
