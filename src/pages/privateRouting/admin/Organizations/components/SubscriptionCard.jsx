import { Box, Radio, useTheme } from "@mui/material";
import Typography from "../../../../../components/Text/Typography";
import { getDate } from "../utils/getDate";

function SubscriptionCard({
  amount,
  selected,
  radioButton,
  isExpiryDate,
  accessChallenge,
  expiryDate,
  planName,
  isSubscriptionSelected,
  onClick,
  totalAmount,
  discountPercent,
  discountAmount,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: `${isSubscriptionSelected ? "2px" : "1px"} solid ${
          isSubscriptionSelected ? theme?.palette?.primary?.main : "#D7D7EB"
        }`,
        padding: "12px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="subHeading"
          style={{
            color: "#1A1A1A",
            fontWeight: "800",
            textTransform: "UpperCase",
            marginBottom: "4px",
            fontSize: "14px",
            letterSpacing: "2px",
          }}
        >
          {planName}
          {amount !== totalAmount && (
            <span
              style={{
                backgroundColor: "#E2FFE8",
                fontWeight: "700",
                fontSize: "12px",
                borderTopLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                color: "#0DB231",
                padding: "4px",
                textTransform: "capitalize",
                marginLeft: "8px",
              }}
            >
              {discountAmount
                ? `₹${discountAmount} off`
                : `${discountPercent}% off`}
            </span>
          )}
        </Typography>
        <Typography sx={{ marginBottom: "8px" }}>
          <span>
            {amount !== totalAmount && (
              <span
                className="strikethrough"
                style={{
                  marginRight: "4px",
                  color: "#4C4F53",
                }}
              >{`₹${amount}`}</span>
            )}

            <span
              style={{
                color: isSubscriptionSelected
                  ? theme?.palette?.primary?.main
                  : "black",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >{`₹${totalAmount}`}</span>
          </span>
          <span>{`/ Year (Access up to ${accessChallenge} Challenge${
            accessChallenge > 1 ? "s" : ""
          })`}</span>
        </Typography>
        {isExpiryDate && (
          <Typography>{`Expires on: ${getDate(expiryDate)}`}</Typography>
        )}
      </Box>
      {radioButton && (
        <Radio
          checked={isSubscriptionSelected}
          sx={{
            alignSelf: "start",
          }}
        />
      )}
    </Box>
  );
}

export default SubscriptionCard;
