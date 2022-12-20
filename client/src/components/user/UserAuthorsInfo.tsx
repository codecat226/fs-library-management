import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Button } from "@mui/material";
import { fetchAuthors } from "features/authorSlice";

export const UserAuthorsInfo = () => {
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector((state) => state.authorR);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 500 },
    {
      field: "information",
      width: 500,
      headerName: "Information",
      sortable: false,
      renderCell: (params) => (
        <Button
          component={Link}
          state={params.row}
          to={`/dashboard/user/author-data`}
        >
          More info
        </Button>
      ),
    },
  ];
  const handleCellClick = (param: any, event: any) => {
    event.defaultMuiPrevented = param.field === "Information";
  };

  return (
    <>
      <main className="main-table">
        <div
          style={{
            height: 500,
            width: "100%",
            margin: 40,
          }}
        >
          <DataGrid
            rows={authors}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            onSelectionModelChange={setSelectionModel}
            selectionModel={selectionModel}
            {...authors}
            getRowId={(authors) => authors._id}
            onCellClick={handleCellClick}
          />
        </div>
      </main>
    </>
  );
};
