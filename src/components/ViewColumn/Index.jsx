// import {
//   Checkbox,
//   DefaultButton,
//   IconButton,
//   PrimaryButton,
//   Stack,
// } from "@fluentui/react";
import React, { useEffect } from "react";
import utilController from "../../utils/Utilcontroller";
import deepClone from "deep-clone";
import OnRenderFooterContent from "../panelFooter/Footer";
import Typography from "../Text/Typogarphy";
import { Checkbox, Stack } from "@fluentui/react";
// import PanelFooter from "../panelFooter/Index";

const heading = "Choose Columns";
const paragraph = "Choose the conditions for your Custom Columns";

const buttonStyles = {
  root: { marginRight: 8, border: "none", fontWeight: 600 },
};

const ColumnOption = ({
  filteredColumn,
  openForm,
  resetForm,
  setViewColumn,
  filterColumn,
}) => {
  const [newColumns, setNewColumns] = React.useState(deepClone(filteredColumn));

  // useEffect(() => {
  //   if (openForm?.divType === "column" && openForm?.isSaveForm) {
  //     resetColumns();
  //   }
  // }, [openForm]);

  const updateColumn = (ind, checked) => {
    const columnCopy = [...newColumns];
    columnCopy[ind].visibility = checked;
    setNewColumns(columnCopy);
  };

  const handleSaveColumns = () => {
    setViewColumn(newColumns);
    resetForm();
  };

  const resetColumns = () => {
    const columnsCopy = deepClone(filterColumn);
    setNewColumns(columnsCopy);
  };

  return (
    <Stack verticalAlign="space-between" className="choose-panel">
      <Stack>
        <Stack
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <span>
            <Typography
              fs="xLarge"
              style={{ fontWeight: 700, fontSize: "28px" }}
            >
              {heading}
            </Typography>
          </span>
        </Stack>

        <Stack style={{ gap: "1.2rem", marginTop: "1.3rem" }}>
          {newColumns?.length > 0 &&
            newColumns?.map((value, ind) => {
              if (!value?.fieldName) return;

              return (
                <Stack key={ind} horizontal gap=".3rem">
                  <Checkbox
                    disabled={value?.primaryKey}
                    checked={value?.visibility}
                    // onChange={(e, checked) => UpdateFilter(ind, checked)}
                    onChange={(e, checked) => updateColumn(ind, checked)}
                  />
                  <Typography fs="medium">
                    {utilController?.textCapitalise(value?.fieldName)}
                  </Typography>
                </Stack>
              );
            })}
        </Stack>
      </Stack>
      {/* <Stack
          horizontal
          horizontalAlign="space-between"
          style={{
            border: "1px solid black",
            position: "fixed",
            bottom: 10,
            width: "20%",
          }}
        >
          <DefaultButton styles={buttonStyles} onClick={() => resetColumns()}>
            Reset
          </DefaultButton>
  
          <PrimaryButton
            styles={buttonStyles}
            onClick={() => handleSaveColumns()}
          >
            Save
          </PrimaryButton>
        </Stack> */}
    </Stack>
  );
};

export default ColumnOption;
