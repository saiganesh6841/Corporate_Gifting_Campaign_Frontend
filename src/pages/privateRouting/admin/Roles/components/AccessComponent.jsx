import { Box, Checkbox, Grid } from "@mui/material";
import utilController from "../../../../../utils/Utilcontroller";
import { useStyles } from "../styles/style";
// import MuiTypography from "../../../../../components/Typography/MuiTypograpy";
import { useTheme } from "@mui/styles";
import Typography from "../../../../../components/Text/Typogarphy";

const AccessComponent = ({ selectLabel, permissions, onChange, disabled }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box className={classes.boxContainer}>
      <Box className={classes.permissionHeader}>
        <Typography
          variant="subDescription"
          style={{
            fontWeight: "700",
            color: theme?.palette?.primary?.main,
          }}
        >
          Access to
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {permissions?.map((permission, index) => {
          if (selectLabel === permission?.label) {
            return permission?.buttons?.map((buttons, idx) => (
              <Grid item xs={3}>
                <Checkbox
                  checked={buttons.enable}
                  onChange={(event) => {
                    onChange(event, index, idx);
                  }}
                  inputProps={{
                    "aria-label": "primary checkbox",
                  }}
                  disabled={disabled}
                />
                {utilController.textCapitalise(buttons.label)}
              </Grid>
            ));
          }
        })}
      </Grid>
    </Box>
  );
};
export default AccessComponent;
