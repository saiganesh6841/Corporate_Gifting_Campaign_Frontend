import { Box, Divider } from "@mui/material";
import {
  Building24Regular,
  Mail24Regular,
  Phone24Regular,
} from "@fluentui/react-icons";
import Typography from "../../../../../components/Text/Typogarphy";

function OrganizationCard({ classes, data }) {
  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.08)",
        height: "100%",
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Building24Regular
          style={{
            color: "#1976d2",
            fontSize: 28,
          }}
        />
        <Typography
          style={{
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          Organization Details
        </Typography>
      </Box>

      <Divider />

      {/* Details */}
      <Box mt={2} display="flex" flexDirection="column" gap={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography style={{ color: "#666", fontWeight: 600 }}>
            Organization
          </Typography>

          <Typography style={{ fontWeight: 500 }}>
            {data.organizationName}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography style={{ color: "#666", fontWeight: 600 }}>
            Email
          </Typography>

          <Typography style={{ fontWeight: 500 }}>{data.email}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography style={{ color: "#666", fontWeight: 600 }}>
            Phone
          </Typography>

          <Typography style={{ fontWeight: 500 }}>{data.mobile}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OrganizationCard;
