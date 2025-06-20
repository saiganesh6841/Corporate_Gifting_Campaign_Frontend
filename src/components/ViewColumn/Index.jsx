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
import Typography from "../Text/Typogarphy";
import { Stack } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Checkbox, useTheme } from "@mui/material";
import OnRenderFooterContent from "../panelFooter/Footer";
// import PanelFooter from "../panelFooter/Index";

const heading = "Choose Columns";
const paragraph = "Choose the conditions for your Custom Columns";

const ColumnOption = ({
  filteredColumn,
  openForm,
  resetForm,
  setViewColumn,
  filterColumn,
}) => {
  const theme = useTheme();
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
    <FluentProvider theme={teamsLightTheme}>
      <Stack verticalAlign="space-between" className="choose-panel">
        <Stack>
          <Stack
            style={{ gap: "1.2rem", marginTop: "1.3rem", marginBottom: "2rem" }}
          >
            {newColumns?.length > 0 &&
              newColumns?.map((value, ind) => {
                if (!value?.fieldName) return;

                return (
                  <Stack
                    key={ind}
                    horizontal
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      disabled={value?.primaryKey}
                      checked={value?.visibility} //value?.visibility
                      onChange={(e, checked) => updateColumn(ind, checked)}
                      sx={{
                        "&.Mui-checked": {
                          color: value?.primaryKey
                            ? "rgb(200, 198, 196)"
                            : theme?.palette?.primary?.main, // ✅ applies color to the checkmark
                          borderColor: "red",
                        },
                      }}
                    />
                    <Typography variant="heading">
                      {utilController?.textCapitalise(value?.fieldName)}
                    </Typography>
                  </Stack>
                );
              })}
          </Stack>
        </Stack>

        <Stack
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            width: `${openForm?.width}px`,
            padding: "12px",
            backgroundColor: "white",
          }}
        >
          <OnRenderFooterContent
            field1={{
              text: "Save",
              handle: handleSaveColumns,
            }}
            field2={{
              text: "Reset",
              handle: resetColumns,
            }}
          />
        </Stack>
      </Stack>
    </FluentProvider>
  );
};

export default ColumnOption;
