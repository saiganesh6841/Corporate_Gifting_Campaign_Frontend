import { useState } from "react";
import ConfigAPIURL from "../config/ConfigAPIURL";
import APIRequest from "../utils/APIRequest.js";
import useAlert from "./useAlert";

const useUpload = ({ setUserForm, userForm, onUpload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoLoadingStates, setVideoLoadingStates] = useState({});
  const { publishNotification } = useAlert();

  const handleDeleteFile = (ind) => {
    const prevData = { ...userForm };
    prevData["reports"]?.splice(ind, 1);
    setUserForm(prevData);
  };

  // const multipleFileUpload = async (e) => {
  //   const files = e.target.files;
  //   const attachments = [];

  //   for (let i = 0; i < files?.length; i++) {
  //     // const formData = new FormData();
  //     // formData.append("file", files[i]);
  //     const file = files[i];

  //     try {
  //       setIsLoading(true);

  //       const fileType = file.name?.split(".")?.pop();
  //       const generatedUrl = await generateUrl(fileType); // Generate the URL for each file

  //       if (generatedUrl) {
  //         // Upload the file to the generated URL
  //         const response = await fetch(generatedUrl, {
  //           method: "PUT",
  //           body: file, // Let the browser handle the Content-Type
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });

  //         if (response.ok) {
  //           const url = generatedUrl?.split("?")[0]; // Extract URL without query params
  //           attachments.push({
  //             url,
  //             name: file.name,
  //             type: file?.name?.split(".")?.pop(),
  //           });
  //         } else {
  //           console.error(`Failed to upload file ${file?.name}`);
  //           publishNotification(
  //             `Error uploading file ${file?.name}. Please try again.`,
  //             "error"
  //           );
  //         }
  //       } else {
  //         publishNotification(
  //           `Failed to generate URL for file ${file?.name}`,
  //           "error"
  //         );
  //       }
  //     } catch (error) {
  //       console.error(`Error uploading file ${file?.name}:`, error);
  //       publishNotification(`Error uploading file ${file?.name}`, "error");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   return attachments; // Return all successfully uploaded attachments
  // };

  // const fileUpload = async (e) => {
  //   try {
  //     setIsLoading(true);

  //     const file = e.target.files[0];
  //     // find the extension of the file and generate the url
  //     const type = file?.name?.split(".")?.pop();
  //     const generatedUrl = await generateUrl(type);
  //     const name = file?.name;
  //     if (generatedUrl) {
  //       // if the url is found then upload the form
  //       const response = await fetch(generatedUrl, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         body: file,
  //       });
  //       // publishNotification("File uploaded successfully", "success");
  //       // attachment value is spererated with ?
  //       const url = response?.url?.split("?")[0];
  //       return {
  //         type,
  //         name,
  //         url,
  //       };
  //     } else return false; // an error occured
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const generateUrl = async (fileType) => {
    try {
      setIsLoading(true);

      const response = await APIRequest.request(
        "PUT",
        ConfigAPIURL.uploadFile,
        JSON.stringify({ fileType })
      );
      if (response?.data?.responseCode === 109) {
        return response?.data?.result;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (data, onUpload, id) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("attachment", data.attachment);
      formData.append("folderName", data.folderName || "profileImages");
      const APIRequest = await fetch(ConfigAPIURL.uploadFile, {
        method: "PUT",
        body: data,
      });
      const response = await APIRequest.json();
      if (response.data?.attachmentUrl) {
        onUpload(response.data?.attachmentUrl?.[0]);
      }
    } catch (error) {
      console.error("File upload error:", error);
    } finally {
      setIsLoading(false);
      if (id) {
        setVideoLoadingStates((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const fileUpload = (event, id) => {
    // setLoader(true);
    if (event.target.files[0] !== undefined && event.target.files[0] !== null) {
      setIsLoading(true); // Start the loading spinner
      if (id) {
        setVideoLoadingStates((prev) => ({ ...prev, [id]: true }));
      }

      [...event.target.files].map(async (data) => {
        let formData = new FormData();

        // Add the file attachment and bucket name fields to the FormData object
        formData.append(`attachment`, data);
        formData.append("bucketName", "logo");
        for (var pair of formData.entries()) {
          if (pair[1] instanceof File) {
            console.log(
              `${pair[0]}: File Name - ${pair[1].name}, File Size - ${pair[1].size} bytes, File Type - ${pair[1].type}`
            );
            if (pair[1].size / (1024 * 1024) > 100) {
              publishNotification(
                "Please upload a file smaller than 100MB",
                "error"
              );
              setIsLoading(false);
              return; // Stop further processing
            }
          } else {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        }

        // Upload the file
        handleFileUpload(formData, onUpload, id);
      });
    }
  };

  const handleMultipleFilesUpload = async (formData, onUpload) => {
    try {
      const APIRequest = await fetch(ConfigAPIURL.uploadFile, {
        method: "PUT",
        body: formData,
      });
      const response = await APIRequest.json();
      if (response.data?.attachmentUrl) {
        onUpload(response.data?.attachmentUrl?.[0]);
      }
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const multipleFilesUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsLoading(true); // Start the loading spinner

      const fileUploadPromises = [...event.target.files].map(async (data) => {
        const formData = new FormData();

        // Add the file attachment and bucket name fields to the FormData object
        formData.append("attachment", data);
        formData.append("bucketName", "attachments");

        // Logging the file info (for debugging purposes)
        for (const pair of formData.entries()) {
          if (pair[1] instanceof File) {
            console.log(
              `${pair[0]}: File Name - ${pair[1].name}, File Size - ${pair[1].size} bytes, File Type - ${pair[1].type}`
            );
          } else {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        }

        // Upload the file
        await handleMultipleFilesUpload(formData, onUpload);
      });

      // Wait for all uploads to complete
      try {
        await Promise.all(fileUploadPromises);
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setIsLoading(false); // Stop the loading spinner after all uploads are done
      }
    }
  };

  return {
    fileUpload,
    isLoading,
    // multipleFileUpload,
    handleDeleteFile,
    setIsLoading,
    multipleFilesUpload,
    videoLoadingStates,
  };
};

export default useUpload;
