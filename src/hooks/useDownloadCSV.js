import React from "react";

const useDownloadCSV = (columns, items) => {
  const filterVisbleColumn = (columns, viewColumn) => {
    // filters the column ids
    const visibleColumnIds = viewColumn
      ?.filter((value) => value?.visibility)
      ?.map((value) => value?.columnId);
    // checks whether the column passed is viewable or not
    const updatedColumns = columns?.filter((value) =>
      visibleColumnIds?.includes(value?.columnId)
    );
    // which all columns are visible that will be returned
    return updatedColumns;
  };

  const downloadCsv = (viewColumn) => {
    const allColumns = filterVisbleColumn(columns, viewColumn);
    // only visible columns will be returned and start processing

    const headers = allColumns?.map((value) => value?.fieldName);
    const data = items?.rows?.map((value) => {
      // if (value?.operatedBy?.fname) {
      //   value[
      //     "operatedBy"
      //   ] = `${value?.operatedBy?.fname} ${value?.operatedBy?.lname}`;
      // }
      // if (value?.permission?.name) {
      //   value["permission"] = value?.permission?.name;
      // }

      const singleRow = {};

      columns?.map((item) => {
        console.log(item,"item values")
        const columnId = item?.columnId;
        singleRow[columnId] = item?.renderCell(value)?.props?.children;
      });
      // console.log(singleRow,"row data")
      return singleRow;
    });

    return { data, headers };
  };
  return { downloadCsv };
};

export default useDownloadCSV;
