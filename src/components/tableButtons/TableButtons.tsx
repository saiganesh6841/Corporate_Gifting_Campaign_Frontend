import {
  PeopleAdd20Regular,
  PeopleAdd20Filled,
  Edit20Regular,
  Edit20Filled,
  Delete20Filled,
  Delete20Regular,
  CloudArrowDown20Filled,
  CloudArrowDown20Regular,
  CloudArrowUp20Regular,
  CloudArrowUp20Filled,
  DualScreenVerticalScroll20Regular,
  DualScreenVerticalScroll20Filled,
  Eye20Regular,
  Eye20Filled,
  Location20Regular,
  Location20Filled,
  CalendarLtr20Regular,
  CalendarLtr20Filled,
  ArrowSync20Filled,
  ArrowSync20Regular,
  CloudAdd16Regular,
  CloudAdd16Filled,
} from "@fluentui/react-icons";

const iconStyleProps: FluentIconsProps = {
  primaryFill: "#1E38FC",
  className: "iconClass",
  font: "14px",
};

export const tableButtons = [
  {
    id: "add",
    label: "Create",
    icons: {
      regular: PeopleAdd20Regular,
      filled: PeopleAdd20Filled,
    },
    handler: (item) => item && item?.add(),
  },
  {
    id: "edit",
    label: "Edit",
    icons: {
      regular: Edit20Regular,
      filled: Edit20Filled,
    },
    handler: (item) => item && item?.edit(),
  },
  {
    id: "view",
    label: "View",
    icons: {
      regular: Eye20Regular,
      filled: Eye20Filled,
    },
    handler: (item) => item && item?.view(),
  },
  {
    id: "restore",
    label: "Restore",
    icons: {
      regular: CloudAdd16Regular,
      filled: CloudAdd16Filled,
    },
    handler: (item) => item && item?.restore(),
  },
  {
    id: "delete",
    label: "Delete",
    icons: {
      regular: Delete20Regular,
      filled: Delete20Filled,
    },
    handler: (item) => item && item?.Delete(),
  },
  {
    id: "assign",
    label: "Assign",
    icons: {
      regular: DualScreenVerticalScroll20Regular,
      filled: DualScreenVerticalScroll20Filled,
    },
    handler: (item) => item && item?.assignRole(),
  },
  {
    id: "refresh",
    label: "Refresh",
    icons: {
      regular: ArrowSync20Regular,
      filled: ArrowSync20Filled,
    },
    handler: (item) => item && item?.refreshList(),
  },
  {
    id: "export",
    label: "Export",
    icons: {
      regular: CloudArrowUp20Regular,
      filled: CloudArrowUp20Filled,
    },
    handler: (item) => item && item?.handleCsvExport(),
  },

  {
    id: "upload",
    label: "Upload",
    icons: {
      regular: CloudArrowDown20Regular,
      filled: CloudArrowDown20Filled,
    },
    handler: (item) => item && item?.handleUploadExcel(),
  },
];
