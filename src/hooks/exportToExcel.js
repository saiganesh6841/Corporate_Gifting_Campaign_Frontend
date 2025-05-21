import { useCallback } from "react";
import ExcelJS from "exceljs";
import utilController from "../utils/Utilcontroller";
import { excelHeaderBG_Color } from "../constant/Index";

const useExportToExcel = () => {
  const exportToExcel = useCallback(async (data, costSheetNo) => {
    console.log("data, costSheetNo", data, costSheetNo);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("costsheet_data");

    // Define the green background style
    const greenBackgroundStyle = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: excelHeaderBG_Color.color },
      },
      font: {
        bold: true,
      },
      alignment: {
        horizontal: "center", // Center alignment
      },
    };

    // Define headers mapping
    const headersMapping = [
      { key: "serialNo", value: "Sl. No." },
      { key: "productName", value: "Particulars" },
      { key: "quantity", value: "Quantity" },
      { key: "uom", value: "UOM" },
      { key: "cost", value: "Cost" },
      { key: "totalCost", value: "Total Cost" },
    ];

    // Extract headers based on the mapping
    const headers = headersMapping.map((header) => header.value);

    // Initialize an array to hold all data for the single sheet
    const allData = [];
    const sectionHeaders = []; // To track indices of section headers

    // Variable to keep track of the serial number across sections
    let serialNumber = 1;

    // Add section headers and data to the array
    for (const [section, items] of Object.entries(data)) {
      if (Array.isArray(items)) {
        // Add section header
        allData.push([`${utilController.camelCaseToNormal(section)}`]);
        sectionHeaders.push(allData.length - 1); // Track section header index

        // Add column headers if not sectionB
        if (section !== "sectionB") {
          allData.push(headers);
        }

        // Add data rows
        items.forEach((item) => {
          const row = headersMapping.map((header) => {
            if (header.key === "serialNo") {
              return serialNumber++; // Serial number
            }
            return item[header.key];
          });
          allData.push(row);
        });

        // Add a blank line for separation
        allData.push([]);

        // Check section and add appropriate summary
        if (section === "sectionB") {
          const sectionAandBsummary = [
            [
              "",
              "Total Cost (Excluding Management Fees)",
              "",
              "",
              "",
              data.totalExcludingManagementFee,
            ],
            [
              "",
              `Management fee @${data.managmentFeePercentage}%`,
              "",
              "",
              "",
              data?.includingManagementFee,
            ],
            ["", "Total Cost", "", "", "", data.particularsTotal],
          ];
          allData.push(...sectionAandBsummary);
          allData.push([]); // Add a blank line for separation
        } else if (section === "sectionC") {
          const sectionCSummary = [
            "",
            "Total",
            "",
            "",
            "",
            data.additionalsTotal,
          ];
          allData.push(sectionCSummary);
          allData.push([]); // Add a blank line for separation
        }
      }
    }

    // Write the data to the worksheet
    allData.forEach((row, index) => {
      const excelRow = worksheet.addRow(row);

      // Apply the green background style to section names and column headers
      if (sectionHeaders.includes(index)) {
        // Apply style to section names
        excelRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.style = greenBackgroundStyle;
        });

        // Merge cells for section headers
        const firstColumn = 1; // Assuming section headers start at column A
        const lastColumn = headers.length; // Total columns in your header
        worksheet.mergeCells(index + 1, firstColumn, index + 1, lastColumn);
      } else if (row === headers) {
        // Apply style to column headers without merging
        excelRow.eachCell({ includeEmpty: true }, (cell) => {
          cell.style = greenBackgroundStyle;
        });
      }
    });

    // Column widths
    worksheet.columns = [
      { width: 12 }, // Width for "Serial No"
      { width: 35 }, // Width for "Particulars"
      { width: 12 }, // Width for "Quantity"
      { width: 12 }, // Width for "UOM"
      { width: 12 }, // Width for "Cost"
      { width: 12 }, // Width for "Total Cost"
    ];

    // Generate Excel file and save to disk
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cost_sheet_${costSheetNo}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating Excel file:", error);
    }
  }, []);

  const exportToExcelCCC = useCallback(async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ccc");

    // Define the green background style
    const greenBackgroundStyle = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: excelHeaderBG_Color.color },
      },
      font: {
        bold: true,
      },
      alignment: {
        horizontal: "center", // Center alignment
      },
    };

    // Define headers mapping for each section
    const headersMappingSectionA = [
      { key: "serialNo", value: "Sl. No." },
      { key: "productName", value: "Particulars" },
      { key: "quantity", value: "Quantity" },
      { key: "uom", value: "UOM" },
      { key: "cost", value: "Cost" },
      { key: "mandays", value: "Mandays" },
      { key: "totalCost", value: "Total Cost" },
      { key: "actualMandays", value: "Actual Mandays" },
      { key: "approvedMandays", value: "Approved Mandays" },
      { key: "totalApprovedCost", value: "Total Approved Cost" },
    ];

    const headersMappingSectionB = [
      { key: "serialNo", value: "Sl. No." },
      { key: "productName", value: "Particulars" },
      { key: "quantity", value: "Quantity" },
      { key: "uom", value: "UOM" },
      { key: "cost", value: "Cost" },
      { key: "totalCost", value: "Total Cost" },
      { key: "actualDelivery", value: "Actual Delivery" },
      { key: "approvedQuantity", value: "Approved Quantity" },
      { key: "totalApprovedCost", value: "Total Approved Cost" },
      { key: "", value: "" },
    ];

    const headersMappingSectionC = [
      { key: "serialNo", value: "Sl. No." },
      { key: "productName", value: "Particulars" },
      { key: "quantity", value: "Quantity" },
      { key: "uom", value: "UOM" },
      { key: "cost", value: "Cost" },
      { key: "totalCost", value: "Total Cost" },
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
    ];

    // Initialize an array to hold all data for the single sheet
    const allData = [];
    const sectionHeaders = []; // To track indices of section headers

    // Variable to keep track of the serial number across sections
    let serialNumber = 1;

    // Add section headers and data to the array
    for (const [section, items] of Object.entries(data)) {
      let headersMapping = [];
      switch (section) {
        case "sectionA":
          headersMapping = headersMappingSectionA;
          break;
        case "sectionB":
          headersMapping = headersMappingSectionB;
          break;
        case "sectionC":
          headersMapping = headersMappingSectionC;
          break;
        default:
          headersMapping = headersMappingSectionA; // Default to section A headers if unknown section
      }

      const headers = headersMapping.map((header) => header.value);

      if (Array.isArray(items)) {
        // Add section header
        allData.push([`${utilController.camelCaseToNormal(section)}`]);
        sectionHeaders.push(allData.length - 1); // Track section header index

        // Add column headers
        allData.push(headers);

        // Add data rows
        items.forEach((item) => {
          const row = headersMapping.map((header) => {
            if (header.key === "serialNo") {
              return serialNumber++; // Serial number
            }
            return item[header.key];
          });
          allData.push(row);
        });

        // Add a blank line for separation
        allData.push([]);

        // Check section and add appropriate summary
        if (section === "sectionB") {
          const sectionAandBsummary = [
            [
              "",
              "Total Cost (Excluding Management Fees)",
              "",
              "",
              "",
              data.totalExcludingManagementFee,
            ],
            [
              "",
              `Management fee @${data.managmentFeePercentage}%`,
              "",
              "",
              "",
              data?.includingManagementFee,
            ],
            ["", "Total Cost", "", "", "", data.particularsTotal],
          ];
          allData.push(...sectionAandBsummary);
          allData.push([]); // Add a blank line for separation
        } else if (section === "sectionC") {
          const sectionCSummary = [
            "",
            "Total",
            "",
            "",
            "",
            data.additionalsTotal,
          ];
          allData.push(sectionCSummary);
          allData.push([]); // Add a blank line for separation
        }
      }
    }

    // Write the data to the worksheet
    allData.forEach((row, index) => {
      const excelRow = worksheet.addRow(row);

      // Apply the green background style to section names and column headers
      if (sectionHeaders.includes(index)) {
        // Apply style to section names
        excelRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.style = greenBackgroundStyle;
        });

        // Merge cells for section headers
        const firstColumn = 1; // Assuming section headers start at column A
        const lastColumn = headersMappingSectionA.length; // Total columns in your header
        worksheet.mergeCells(index + 1, firstColumn, index + 1, lastColumn);
      } else if (row.includes(headersMappingSectionA[0].value)) {
        // Apply style to column headers without merging
        excelRow.eachCell({ includeEmpty: true }, (cell) => {
          cell.style = greenBackgroundStyle;
        });
      }
    });

    // Column widths
    worksheet.columns = [
      { width: 10 }, // Width for "Serial No"
      { width: 35 }, // Width for "Particulars"
      { width: 12 }, // Width for "Quantity"
      { width: 12 }, // Width for "UOM"
      { width: 12 }, // Width for "Cost"
      { width: 12 }, // Width for "Mandays"
      { width: 15 }, // Width for "Total Cost"
      { width: 20 }, // Width for "Actual Mandays"
      { width: 20 }, // Width for "Approved Mandays"
      { width: 20 }, // Width for "Approved Cost"
    ];

    // Generate Excel file and save to disk
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ccc.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating Excel file:", error);
    }
  }, []);

  return { exportToExcel, exportToExcelCCC };
};

export default useExportToExcel;
