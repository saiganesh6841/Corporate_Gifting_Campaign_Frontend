import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";

/**
 * Wraps a lazy-loaded component with Suspense and fallback loader.
 * Usage:
 * <WithSuspense Component={YourLazyComponent} />
 */
function WithSuspense({ Component }) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Component />
    </Suspense>
  );
}

export default WithSuspense;
