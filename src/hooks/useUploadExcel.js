import { ExportToCsv } from "export-to-csv";
import { useState } from "react";
import * as XLSX from "xlsx";
import APIRequest from "../utils/APIRequest";
import ConfigAPIURL from "../config/ConfigAPIURL";

function useUploadExcel({ readTemplate }) {
  const [uploadedAttachmentsList, setUploadedAttachmentsList] = useState([]);
  const [excelRawData, setExcelRawData] = useState(null);
  const handleDownloadTemplate = (headers) => {
    const emptyRow = headers.reduce((acc, header) => {
      acc[header] = ""; // Fill each header with an empty string
      return acc;
    }, {});

    console.log(headers, emptyRow, "excel");
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      useTextFile: false,
      useBom: true,
      headers,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv([emptyRow]);
  };

  const handleModifyExcelDataStructure = (excelData) => {
    const modifiedExcelData = excelData?.map((fileList) => {
      return fileList.map((details) => {
        let modifiedDetails = {};
        for (const keys in readTemplate) {
          console.log(readTemplate[keys], "excelData");
          modifiedDetails[readTemplate[keys]] = details[keys] || "";
        }
        return modifiedDetails;
      });
    });

    return modifiedExcelData;
  };

  const handleSendExcelDataToServer = async (excelData) => {
    let modifiedExcelData;
    if (excelData?.length > 0) {
      modifiedExcelData = handleModifyExcelDataStructure(excelData);
    }
    for (const file of modifiedExcelData) {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.usersExcelUpload,
        JSON.stringify({ records: file })
      );
      console.log(response, "excelResponse");
    }
  };

  const readExcelData = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Get all sheet names
      const sheetNames = workbook.SheetNames;

      // Object to store JSON data for each sheet
      const sheetsData = {};

      // Iterate over each sheet and convert to JSON
      sheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        sheetsData[sheetName] = jsonData; // Store JSON data keyed by sheet name
      });

      // Call the callback with the JSON data
      callback(sheetsData);
    };

    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
  };

  const handleExcelSheetsUpload = (event) => {
    const files = Object.values(event.target.files);
    const validFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
      "text/csv", // .csv
    ];
    const validFiles = files.filter((file) =>
      validFileTypes.includes(file.type)
    );
    const allFilesData = [];
    let noOfFilesProceed = 0;

    // Iterate over each valid file
    validFiles.forEach((file) => {
      readExcelData(file, (data) => {
        // Store the file data with its name
        allFilesData.push(data);
        noOfFilesProceed++;

        if (noOfFilesProceed === validFiles.length) {
          const finalExcelData = allFilesData?.map(
            (fileData) => fileData?.Sheet1
          );
          console.log(finalExcelData, "data");
          handleSendExcelDataToServer(finalExcelData);
        }
      });
    });

    // console.log("All files data so far:", allFilesData[0], excelRawData);
  };
  return {
    handleDownloadTemplate,
    handleExcelSheetsUpload,
  };
}

export default useUploadExcel;
