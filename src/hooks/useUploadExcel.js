// import { ExportToCsv } from "export-to-csv";
// import { useState } from "react";
// import * as XLSX from "xlsx";
// import APIRequest from "../utils/APIRequest";
// import ConfigAPIURL from "../config/ConfigAPIURL";

// function useUploadExcel({ readTemplate }) {
//   const [uploadedAttachmentsList, setUploadedAttachmentsList] = useState([]);
//   const [excelRawData, setExcelRawData] = useState(null);
//   const handleDownloadTemplate = (headers) => {
//     const emptyRow = headers.reduce((acc, header) => {
//       acc[header] = ""; // Fill each header with an empty string
//       return acc;
//     }, {});

//     console.log(headers, emptyRow, "excel");
//     const options = {
//       fieldSeparator: ",",
//       quoteStrings: '"',
//       decimalSeparator: ".",
//       showLabels: true,
//       useTextFile: false,
//       useBom: true,
//       headers,
//     };
//     const csvExporter = new ExportToCsv(options);
//     csvExporter.generateCsv([emptyRow]);
//   };

//   const handleModifyExcelDataStructure = (excelData) => {
//     const modifiedExcelData = excelData?.map((fileList) => {
//       return fileList.map((details) => {
//         let modifiedDetails = {};
//         for (const keys in readTemplate) {
//           console.log(readTemplate[keys], "excelData");
//           modifiedDetails[readTemplate[keys]] = details[keys] || "";
//         }
//         return modifiedDetails;
//       });
//     });

//     return modifiedExcelData;
//   };

//   const handleSendExcelDataToServer = async (excelData) => {
//     let modifiedExcelData;
//     if (excelData?.length > 0) {
//       modifiedExcelData = handleModifyExcelDataStructure(excelData);
//     }
//     for (const file of modifiedExcelData) {
//       const response = await APIRequest.request(
//         "POST",
//         ConfigAPIURL.usersExcelUpload,
//         JSON.stringify({ records: file }),
//       );
//       console.log(response, "excelResponse");
//     }
//   };

//   const readExcelData = (file, callback) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });

//       // Get all sheet names
//       const sheetNames = workbook.SheetNames;

//       // Object to store JSON data for each sheet
//       const sheetsData = {};

//       // Iterate over each sheet and convert to JSON
//       sheetNames.forEach((sheetName) => {
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet);
//         sheetsData[sheetName] = jsonData; // Store JSON data keyed by sheet name
//       });

//       // Call the callback with the JSON data
//       callback(sheetsData);
//     };

//     reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
//   };

//   const handleExcelSheetsUpload = (event) => {
//     const files = Object.values(event.target.files);
//     const validFileTypes = [
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
//       "application/vnd.ms-excel", // .xls
//       "text/csv", // .csv
//     ];
//     const validFiles = files.filter((file) =>
//       validFileTypes.includes(file.type),
//     );
//     const allFilesData = [];
//     let noOfFilesProceed = 0;

//     // Iterate over each valid file
//     validFiles.forEach((file) => {
//       readExcelData(file, (data) => {
//         // Store the file data with its name
//         allFilesData.push(data);
//         noOfFilesProceed++;

//         if (noOfFilesProceed === validFiles.length) {
//           const finalExcelData = allFilesData?.map(
//             (fileData) => fileData?.Sheet1,
//           );
//           console.log(finalExcelData, "data");
//           handleSendExcelDataToServer(finalExcelData);
//         }
//       });
//     });

//     // console.log("All files data so far:", allFilesData[0], excelRawData);
//   };
//   return {
//     handleDownloadTemplate,
//     handleExcelSheetsUpload,
//   };
// }

// export default useUploadExcel;

import { ExportToCsv } from "export-to-csv";
import { useState } from "react";
import * as XLSX from "xlsx";
import APIRequest from "../utils/APIRequest";
import ConfigAPIURL from "../config/ConfigAPIURL";
import { mkConfig, generateCsv, asBlob, download } from "export-to-csv";
import ExcelJS from "exceljs";

function useUploadExcel() {
  // const handleDownloadTemplate = (headers) => {
  //   const emptyRow = headers.reduce((acc, header) => {
  //     acc[header] = ""; // Fill each header with an empty string
  //     return acc;
  //   }, {});

  //   const options = {
  //     fieldSeparator: ",",
  //     quoteStrings: '"',
  //     decimalSeparator: ".",
  //     showLabels: true,
  //     useTextFile: false,
  //     useBom: true,
  //     headers,
  //   };
  //   const csvExporter = new ExportToCsv(options);
  //   csvExporter.generateCsv([emptyRow]);
  // };

  const handleDownloadTemplate = (headers) => {
    const excelHeaders = Array.isArray(headers)
      ? headers
      : Object.keys(headers);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    worksheet.columns = excelHeaders.map((header) => ({
      header,
      key: header,
      width: 20,
    }));

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    worksheet.addRow({});

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "template.xlsx";
      a.click();

      URL.revokeObjectURL(url);
    });
  };
  const swapKeysAndValues = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [value, key]),
    );
  };

  // const handleDownloadExcelFailedData = (data, template) => {
  //   //excel headers..
  //   const headers = Object.keys(template);

  //   //swapping the keys to values and values to keys..
  //   const templateWithSwappedKeys = swapKeysAndValues(template);

  //   //structuring the data of failed data to excel downloadable data...
  //   const updatedData = handleChangeKeys(data, templateWithSwappedKeys);

  //   console.log(updatedData, template, data, "failed Uploaded data");
  //   const options = {
  //     fieldSeparator: ",",
  //     quoteStrings: '"',
  //     decimalSeparator: ".",
  //     showLabels: true,
  //     useTextFile: false,
  //     useBom: true,
  //     headers,
  //   };
  //   const csvExporter = new ExportToCsv(options);
  //   csvExporter.generateCsv(updatedData);
  // };

  const handleDownloadExcelFailedData = (data, template) => {
    // Excel headers
    const headers = Object.keys(template);

    // Swapping the keys to values and values to keys
    const templateWithSwappedKeys = swapKeysAndValues(template);

    // Structuring the data of failed data to excel downloadable data
    const updatedData = handleChangeKeys(data, templateWithSwappedKeys);

    console.log(updatedData, template, data, "failed Uploaded data");

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Failed Data");

    // Add headers with bold formatting
    worksheet.columns = headers.map((header) => ({
      header,
      key: header,
      width: 20, // Optional: Set column width
    }));

    // Apply bold style to the header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Add the updated data rows
    updatedData.forEach((row) => {
      worksheet.addRow(row);
    });

    // Save the workbook to a file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "failed_data.xlsx"; // File name
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleReadExcelSheet = (event) => {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      if (!file) return reject("No file selected");

      // Validate file type (allow .xls, .xlsx, .csv)
      const validMimeTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
        "text/csv", // .csv
        "application/csv", // Alternative CSV MIME type
      ];

      if (
        !validMimeTypes.includes(file.type) &&
        !file.name.match(/\.(xls|xlsx|csv)$/i)
      ) {
        return reject(
          "Invalid file type. Please upload an Excel (.xls, .xlsx) or CSV (.csv) file.",
        );
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          // Get the first sheet
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Convert sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject("Error reading file");

      reader.readAsArrayBuffer(file);
    });
  };

  const validateHeaders = (staticHeader, excelHeader) => {
    if (staticHeader.length !== excelHeader.length) {
      return false;
    }

    const excelSet = new Set(excelHeader);

    return staticHeader.every((header) => excelSet.has(header));
  };

  const handleChangeKeys = (uploadedExcelItems, excelTemplate) => {
    console.log(uploadedExcelItems, excelTemplate, "keys changing");
    const validatedExcelData = uploadedExcelItems.map((item) => {
      const updatedObject = {};
      for (const key in item) {
        updatedObject[excelTemplate[key]] = item[key];
      }

      return updatedObject;
    });

    return validatedExcelData;
  };

  return {
    handleDownloadTemplate,
    handleDownloadExcelFailedData,
    handleReadExcelSheet,
    validateHeaders,
    handleChangeKeys,
  };
}

export default useUploadExcel;
