import React, { useEffect, useState } from "react";
import { Box, Grid, Checkbox, Button } from "@mui/material";

import DialogModal from "../../../../../components/Dialog/Index";
import ProductCard from "../../../../../components/Product/ProductCard";

const ProductSelectionModal = ({
  open,
  onClose,
  products = [],
  userType,
  selectedProducts,
  setSelectedProducts,
  isSingleSelection,
  disabled,
}) => {
  const [tempSelected, setTempSelected] = useState([]);

  useEffect(() => {
    if (open) {
      setTempSelected(selectedProducts || []);
    }
  }, [open, selectedProducts]);

  const handleSelect = (product) => {
    if (isSingleSelection) {
      setTempSelected([product]);
      return;
    }

    const exists = tempSelected.some((p) => p._id === product._id);

    if (exists) {
      setTempSelected((prev) =>
        prev.filter((item) => item._id !== product._id),
      );
    } else {
      setTempSelected((prev) => [...prev, product]);
    }
  };

  const handleOk = () => {
    if (!tempSelected.length) return;

    setSelectedProducts(tempSelected);
    onClose();
  };

  return (
    <DialogModal
      title="Select Products"
      width="800px"
      isOpen={open}
      onDismissModal={onClose}
    >
      {/* Scrollable Products */}
      <Box
        sx={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "hidden",
          pr: 1,
        }}
      >
        <Grid container spacing={2}>
          {products?.map((product) => {
            const selected = tempSelected.some(
              (item) => item._id === product._id,
            );

            return (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Box
                  sx={{
                    position: "relative",
                    border: selected
                      ? "2px solid #1976d2"
                      : "2px solid transparent",
                    borderRadius: 3,
                  }}
                >
                  <Checkbox
                    checked={selected}
                    onChange={() => handleSelect(product)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 10,
                      bgcolor: "#fff",
                      borderRadius: "50%",
                      p: 0.5,

                      "&:hover": {
                        bgcolor: "#fff",
                      },

                      "&.Mui-focusVisible": {
                        bgcolor: "#fff",
                      },
                    }}
                  />

                  <ProductCard
                    product={product}
                    userType={userType}
                    disabled={disabled}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          mt: 2,
          pt: 2,
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          bgcolor: "#fff",
        }}
      >
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleOk}
          disabled={tempSelected.length === 0}
        >
          OK
        </Button>
      </Box>
    </DialogModal>
  );
};

export default ProductSelectionModal;
