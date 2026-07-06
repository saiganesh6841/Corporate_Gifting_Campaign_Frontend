import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../../../../../components/Product/ProductCard";
import LocalStorage from "../../../../../config/LocalStorage";

const dummyProducts = [
  {
    _id: "1",
    name: "Premium Wellness Hamper With Dry Fruits and Healthy Snacks Collection",
    description:
      "Beautiful premium wellness hamper with healthy snacks and dry fruits suitable for corporate gifting occasions.",
    vendorName: "Aura Lifestyle",
    price: 2499,
    stockQuantity: 184,
    lowStockThreshold: 20,
    image:
      "https://s3.ap-south-1.amazonaws.com/florauploads/logo/1781861561915_Product%2BShowcase-1.jpg",
  },
  {
    _id: "2",
    name: "Artisan Tea Collection",
    description:
      "Handcrafted tea collection made with premium leaves sourced from the Himalayas.",
    vendorName: "Leaf & Cup Co.",
    price: 1299,
    stockQuantity: 412,
    lowStockThreshold: 20,
    image:
      "https://s3.ap-south-1.amazonaws.com/florauploads/logo/1781861561915_Product%2BShowcase-1.jpg",
  },
];

export default function ProductList({ products, setRecordId, tableFunctions }) {
  //   const [products] = useState(items);

  const handleManage = (product) => {
    console.log("Manage:", product);
  };
  const userData = LocalStorage.userDetails;
  console.log(products, "products");
  return (
    <Box sx={{ p: 2 }}>
      {products?.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard
                product={product}
                showStockBadge={true}
                onManage={handleManage}
                userType={userData?.userType}
                setRecordId={setRecordId}
                tableFunctions={tableFunctions}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            py: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No Products Available
          </Typography>
        </Box>
      )}
    </Box>
  );
}
