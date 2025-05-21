import { Box, Grid, useTheme } from "@mui/material";
import Typography from "../../../../../components/Text/Typography";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import Piechart from "./Piechart";
import BarIndication from "./BarIndication";
import { onFormatDate } from "../utils/util";

function RevenueSection({
  pieChartFiltersData,
  setPieChartFiltersData,
  services,
  classes,
}) {
  const theme = useTheme();

  const getTotalAmount = () => {
    let total = 0;
    if (services?.pieChartData?.length > 0) {
      services?.pieChartData?.forEach((item) => {
        total += item.totalRevenue;
      });
    }
    return total;
  };
  return (
    <Box
      sx={{
        height: "500px",
      }}
    >
      <Box className={classes.revenueHeader}>
        <Typography
          variant="title"
          style={{
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          Total Revenue
        </Typography>
        <span className={classes.amountSpan}>₹ {getTotalAmount() || "0"}</span>
      </Box>
      <Box className={classes.revenueTimeContainer}>
        <DatePicker
          maxDate={new Date(pieChartFiltersData?.endDate * 1000)}
          formatDate={onFormatDate}
          style={{
            width: "150px",
            marginRight: "8px",
          }}
          className={` input__Style`}
          size="large"
          value={
            pieChartFiltersData?.startDate
              ? new Date(pieChartFiltersData?.startDate * 1000)
              : null
          }
          onSelectDate={(e) => {
            setPieChartFiltersData((p) => ({
              ...p,
              startDate: new Date(e).setHours(0, 0, 0, 0) / 1000,
            }));
          }}
          placeholder="Start"
        />
        <DatePicker
          minDate={new Date(pieChartFiltersData?.startDate * 1000)}
          maxDate={new Date()}
          formatDate={onFormatDate}
          style={{
            width: "150px",
          }}
          className={` input__Style`}
          size="large"
          value={
            pieChartFiltersData?.endDate
              ? new Date(pieChartFiltersData?.endDate * 1000)
              : null
          }
          onSelectDate={(e) => {
            setPieChartFiltersData((p) => ({
              ...p,
              endDate: new Date(e).setHours(23, 59, 0, 0) / 1000,
            }));
          }}
          placeholder="End"
        />
      </Box>
      <Box>
        <Piechart
          width={300}
          height={400}
          style={{ bottom: "50px" }}
          pieChartData={services?.pieChartData || []}
        />
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          position: "relative",
          bottom: "80px",
        }}
      >
        {services?.pieChartData?.length > 0 &&
          services?.pieChartData?.[0]?.planName !== "No Data" &&
          services?.pieChartData?.map((data) => (
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <BarIndication
                backgroundColor={data?.fill}
                label={data?.name}
                amount={data?.totalRevenue}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default RevenueSection;
