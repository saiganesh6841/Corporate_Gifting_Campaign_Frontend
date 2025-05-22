// import React from "react";
// import TablePagination from "@mui/material/TablePagination";
// import { useMediaQuery, useTheme } from "@mui/material";

// function useWidth() {
//   const theme = useTheme();
//   const keys = [...theme.breakpoints.keys].reverse();
//   return (
//     keys.reduce((output, key) => {
//       // eslint-disable-next-line react-hooks/rules-of-hooks
//       const matches = useMediaQuery(theme.breakpoints.up(key));
//       return !output && matches ? key : output;
//     }, null) || "xs"
//   );
// }

// const Pagination = ({ query, setQuery, tableData }) => {
//   const pageSize = query.pageSize;

//   const width = useWidth();

//   const handleChangeRowsPerPage = (e) => {
//     const pageSize = e.target.value;

//     setQuery((p) => {
//       return {
//         ...p,
//         pageSize,
//       };
//     });
//   };
//   const handleChangePage = (e, page) => {
//     setQuery((p) => {
//       return {
//         ...p,
//         page,
//       };
//     });
//   };
//   return (
//     <TablePagination
//       component="div"
//       count={tableData?.filterRecords}
//       page={query?.page}
//       onPageChange={handleChangePage}
//       rowsPerPage={query?.pageSize}
//       onRowsPerPageChange={handleChangeRowsPerPage}
//       rowsPerPageOptions={[10, 15, 25, 50, 100]}
//     />
//   );
// };

// export default Pagination;

import React, { useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import { useMediaQuery, useTheme } from "@mui/material";

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

const Pagination = ({ query, setQuery, tableData }) => {
  const width = useWidth();
  useEffect(() => {
    if (width === "xl") {
      setQuery({
        ...query,
        pageSize: 15,
      });
    }
  }, [width]);

  // Determine rowsPerPageOptions based on screen width
  const rowsPerPageOptions =
    width === "xl" ? [15, 30, 50, 100] : [10, 15, 25, 50, 100];

  const handleChangeRowsPerPage = (e) => {
    const pageSize = e.target.value;

    setQuery((p) => ({
      ...p,
      pageSize,
    }));
  };

  const handleChangePage = (e, page) => {
    setQuery((p) => ({
      ...p,
      page,
    }));
  };

  return (
    <TablePagination
      component="div"
      count={tableData?.filterRecords}
      page={query?.page}
      onPageChange={handleChangePage}
      rowsPerPage={query?.pageSize}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
};

export default Pagination;
