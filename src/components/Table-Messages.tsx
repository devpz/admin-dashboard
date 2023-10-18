"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import { Message } from "@prisma/client";
import { Link2 } from "lucide-react";

import { useTheme } from "next-themes";
import Link from "next/link";
import { FC } from "react";

interface TableProps {
  messages: Message[];
}

const columnsDraft: GridColDef[] = [
  {
    field: "id",
    headerName: "Message ID",
    width: 400,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}</strong>
      );
    },
    renderCell(params) {
      return (
        <Link href={"/messages/" + params.value}>
          <div className="flex flex-row justify-between">
            <Link2 className="mr-8" />
            <p>{params.value}</p>
          </div>
        </Link>
      );
    },
  },
  { field: "title", headerName: "Message Title", width: 300 },
  {
    field: "message",
    headerName: "Message Content",
    width: 300,
    renderCell(params) {
      return <h6 className="truncate">{params.value}</h6>;
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 300,
    renderCell(params) {
      return (
        <Link href={"/categories/" + params.value.id}>
          <div className="flex flex-row justify-between">
            <Link2 className="mr-8" />
            <p>{params.value.name}</p>
          </div>
        </Link>
      );
    },
  },
];

const columns = columnsDraft.map((col) => {
  if (col.field === "col1") {
    return col;
  }

  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}</strong>
      );
    },
  };
});

const TableMessages: FC<TableProps> = ({ messages }) => {
  const { theme: applicationTheme } = useTheme();

  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });

  const rows = messages;

  console.log(messages);
  return (
    <ThemeProvider theme={darkTheme}>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === "light" ? "white" : "#152238",
          fontSize: "1rem",
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows}
      />
    </ThemeProvider>
  );
};

export default TableMessages;
