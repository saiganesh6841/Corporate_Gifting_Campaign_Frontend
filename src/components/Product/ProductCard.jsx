import React from "react";
import {
  Badge,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
} from "@fluentui/react-components";
import {
  ArrowRight16Regular,
  Delete20Regular,
  Edit20Regular,
  MoreHorizontal20Regular,
  MoreVertical20Regular,
} from "@fluentui/react-icons";
import { Box } from "@mui/material";

function getStockBadge(stockQuantity, lowStockThreshold) {
  if (stockQuantity <= 0) {
    return { color: "danger", label: `${stockQuantity} in stock` };
  }

  if (stockQuantity <= lowStockThreshold) {
    return { color: "danger", label: `${stockQuantity} in stock` };
  }

  if (stockQuantity <= lowStockThreshold * 2) {
    return { color: "warning", label: `${stockQuantity} in stock` };
  }

  return { color: "success", label: `${stockQuantity} in stock` };
}

export default function ProductCard({
  product,
  onManage,
  showStockBadge = false,
  userType,
  setRecordId,
  tableFunctions,
}) {
  const badge = getStockBadge(product.stockQuantity, product.lowStockThreshold);

  return (
    <Box
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: ".3s",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,.12)",
          transform: "translateY(-3px)",
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          height: 180,
          background: "#f5f5f5",
          overflow: "hidden",
        }}
      >
        <img
          src={product?.thumbnailImage}
          alt={product?.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Body */}
      <Box
        sx={{
          p: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Text
            weight="semibold"
            style={{
              fontSize: 15,
              lineHeight: "20px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: 40,
            }}
          >
            {product?.name}
          </Text>

          {/* {showStockBadge && (
            <Badge appearance="tint" color={badge.color}>
              {badge.label}
            </Badge>
          )} */}
        </Box>

        {/* Description */}
        <Text
          size={200}
          style={{
            color: "#666",
            lineHeight: "18px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 36,
          }}
        >
          {product?.description}
        </Text>

        {/* <Box>
          <Text size={200} weight="semibold" style={{ color: "#666" }}>
            📂 {product?.category}
          </Text>

          {product?.brand && (
            <Text size={200} weight="semibold" style={{ color: "#666" }}>
              🏷️ {product.brand}
            </Text>
          )}
        </Box> */}
        <Box
          sx={{
            mt: 1.5,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box
            sx={{
              px: "0.3rem",
              py: 0.5,
              borderRadius: "20px",
              background: "#dbdfe7",
              fontSize: 12,
              fontWeight: 600,
              color: "#4B5563",
            }}
          >
            {product?.category}
          </Box>

          {product?.brand && (
            <Box
              sx={{
                px: "0.3rem",
                py: 0.5,
                borderRadius: "20px",
                background: "#EEF2FF",
                fontSize: 12,
                fontWeight: 600,
                color: "#4338CA",
              }}
            >
              {product?.brand}
            </Box>
          )}

          {userType !== "vendor" && product?.vendorName && (
            <Box
              sx={{
                px: "0.3rem",
                py: 0.5,
                borderRadius: "20px",
                background: "#ECFDF5",
                fontSize: 12,
                fontWeight: 600,
                color: "#047857",
              }}
            >
              {product?.vendorName}
            </Box>
          )}
        </Box>
        {/* Vendor */}
        {/* {userType !== "vendor" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text size={200} style={{ color: "#888" }}>
              Vendor
            </Text>

            <Text
              size={200}
              weight="medium"
              style={{
                maxWidth: 140,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product?.vendorName}
            </Text>
          </Box>
        )} */}

        {/* Footer */}

        <Box
          sx={{
            mt: "auto",
            pt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            weight="bold"
            style={{
              fontSize: 18,
            }}
          >
            ₹{Number(product.price).toLocaleString("en-IN")}
          </Text>
          {userType === "vendor" && (
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="subtle" icon={<MoreVertical20Regular />} />
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem
                    icon={<Edit20Regular />}
                    onClick={() => {
                      setRecordId([product]);
                      tableFunctions?.edit(product);
                    }}
                  >
                    Edit
                  </MenuItem>

                  <MenuItem
                    icon={<Delete20Regular />}
                    // onClick={() => onDelete?.(product)}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          )}
        </Box>
      </Box>
    </Box>
  );
}
