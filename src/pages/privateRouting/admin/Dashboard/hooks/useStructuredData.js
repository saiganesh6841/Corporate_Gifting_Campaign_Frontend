import React from "react";
import { formatCamelCaseToWords } from "../utils/util";

function useStructuredData({ payload, moduleType }) {
  let tooltipHeadingContent;
  let tooltipBodyContent = [];

  const tooltipPayLoad = { ...payload?.[0]?.payload };

  console.log(tooltipPayLoad, "tooltipPayLoad");

  if (moduleType === "users") {
    tooltipHeadingContent = {
      headingName: "No of Users",
      headingCount: tooltipPayLoad?.totalCount,
    };
  }
  if (moduleType === "subscription") {
    tooltipHeadingContent = {
      headingName: "No of Subscriptions",
      headingCount: tooltipPayLoad?.totalCount,
    };
  }
  delete tooltipPayLoad["totalCount"];
  delete tooltipPayLoad["month"];
  delete tooltipPayLoad["year"];
  delete tooltipPayLoad["day"];
  delete tooltipPayLoad["week"];

  const toolTipData =
    moduleType === "users"
      ? { ...tooltipPayLoad }
      : { ...tooltipPayLoad?.plans };

  for (const key in toolTipData) {
    const modifiledData = {
      name: formatCamelCaseToWords(key),
      count: toolTipData[key],
    };
    tooltipBodyContent?.push({ ...modifiledData });
  }

  return {
    tooltipHeadingContent,
    tooltipBodyContent,
  };
}

export default useStructuredData;
