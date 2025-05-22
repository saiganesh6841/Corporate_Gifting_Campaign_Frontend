import { useStyles } from "../styles/style";
import { Box, Checkbox, Typography } from "@mui/material";
import utilController from "../../../../../utils/Utilcontroller";
import MuiTypography from "../../../../../components/Typography/MuiTypograpy";
import { useTheme } from "@mui/styles";

const PermissionComponent = ({
  heading,
  permissions,
  selectLabel,
  onChange,
  onClick,
  disabled,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box className={classes.PermissinboxContainer}>
      <Box className={classes.permissionHeader}>
        <MuiTypography
          variant="subDescription"
          style={{
            fontWeight: "700",
            color: theme?.palette?.primary?.main,
          }}
        >
          {heading}
        </MuiTypography>
      </Box>
      <Box className={classes.labels}>
        {permissions?.map((permission, index) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: selectLabel === permission?.label ? "#ffff" : "",
              backgroundColor:
                selectLabel === permission?.label
                  ? theme?.palette?.primary?.main
                  : "",
              cursor: "pointer",
            }}
            onClick={() => {
              onClick(permission);
            }}
          >
            <Checkbox
              style={{
                float: "right",
                color: selectLabel === permission?.label ? "#ffff" : "",
              }}
              checked={permission.enable}
              onChange={(event) => {
                onChange(event, index);
              }}
              inputProps={{
                "aria-label": "primary checkbox",
              }}
              disabled={disabled}
            />
            <Typography
              sx={{
                cursor: "pointer",
                fontWeight: selectLabel === permission?.label ? "700" : "",
                // color: selectLabel === permission?.label ? "#ffff" : "",

                // fontFamily: "Segoe UI",
                fontSize: "14px",
                // backgroundColor:
                //   selectLabel === permission?.label ? "#1EA5FC" : "",
              }}
            >
              {utilController.camelCaseToNormal(permission?.label)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default PermissionComponent;
