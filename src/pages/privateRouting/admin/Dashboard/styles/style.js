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
    width: "23%",
    height: "110px",
    borderRadius: "8px",
    backgroundColor: "#ffff",
    // border:"1px solid "
    padding: "8px 16px",
  },
  statastics: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "12px",
    marginRight: "12px",
  },
  iconContainer: {
    width: "45px",
    height: "45px",
    // backgroundColor: "#FFFFFF1A",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // boxShadow: "0px 9.2px 22.34px 0px #2D511C1A",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
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

  dashboardProjectContainer: {
    border: "1px solid #0000001A",
    borderRadius: "10px",
    padding: "16px",
    cursor: "pointer",
  },
  startDateEndDateContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "52%",
    marginTop: "6px",
  },

  startDateEndDateLabel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "47%",
  },

  statusContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assignedWorkersContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    marginTop: "6px",
  },

  mainText: {
    color: "#362626",
    fontWeight: 400,
    fontSize: "14px",
  },

  subText: {
    color: "#7A8391",
    fontSize: "14px",
    fontWeight: 400,
  },
  statusContent: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: "12px",
    borderRadius: "12px",
  },
}));
