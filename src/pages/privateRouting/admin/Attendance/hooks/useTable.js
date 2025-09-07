import React from "react";

const useTable = (columns, setOpenForm, resetForm) => {
  const filterColumn = (columns) => {
    return columns?.map((value) => {
      return {
        columnId: value?.columnId,
        fieldName: value?.fieldName,
        visibility: true,
        primaryKey: value?.primaryKey || false,
      };
    });
  };
  const [viewColumn, setViewColumn] = React.useState(filterColumn(columns));

  const [selectedRows, setSelectedRows] = React.useState([]);

  // record id is usefull for details of selected value
  const [recordId, setRecordId] = React.useState([]);

  const clearSelectedRows = () => setSelectedRows([]); // helps to clear the selection

  // update record id if its multi or single selected
  const clickRecordAction = (item, multiselect) => {
    // finally storing it in record id list
    let data = [];
    if (multiselect) {
      data = [...recordId];
      let recordids = recordId?.map((value) => value?._id);
      if (recordids?.includes(item?._id)) {
        const pos = recordids.indexOf(item?._id);
        data?.splice(pos, 1);
      } else {
        data.push(item);
      }
    } else {
      // if its single selection
      data = item;
    }

    setRecordId(data);
  };

  const handleBulkSelection = (items, allRowsSelected) => {
    setRecordId(allRowsSelected ? items : []);
  };

  const handlerowAction = (item) => {
    setOpenForm((p) => {
      return {
        ...p,
        isOpen: true,
        divType: "view",
        title: "View Attendance",
        width: 900,
        hasCloseButton: false,
        recordId: item?.userObjectId,
        rowDetails: item,
        // rowDetails: recordId,
      };
    });
  };
  return {
    viewColumn,
    setViewColumn,
    handlerowAction,
    clickRecordAction,
    clearSelectedRows,
    recordId,
    setSelectedRows,
    selectedRows,
    // updateColumn,
    // resetColumns,
    handleBulkSelection,
    setRecordId,
    // handleSaveColumns,
    filterColumn,
  };
};

export default useTable;
