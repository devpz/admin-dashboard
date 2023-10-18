"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import { Category } from "@prisma/client";
import { Link2 } from "lucide-react";

import { useTheme } from "next-themes";
import Link from "next/link";
import { FC } from "react";

interface TableProps {
  categories: Category[];
}

const columnsDraft: GridColDef[] = [
  {
    field: "id",
    headerName: "Category ID",
    width: 400,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}</strong>
      );
    },
    renderCell(params) {
      return (
        <Link href={"/categories/" + params.value}>
          <div className="flex flex-row justify-between">
            <Link2 className="mr-8" />
            <p>{params.value}</p>
          </div>
        </Link>
      );
    },
  },
  { field: "name", headerName: "Category Name", width: 400 },
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

const TableCategories: FC<TableProps> = ({ categories }) => {
  const { theme: applicationTheme } = useTheme();

  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });

  const rows = categories;
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

export default TableCategories;
