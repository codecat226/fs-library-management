import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { Stack } from "@mui/system";
import { fetchAuthors } from "features/authorSlice";
import { deleteAuthor } from "services/authorServices";

export const AdminAuthorsInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authors } = useAppSelector((state) => state.authorR);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const onDelete = async () => {
    try {
      for (let i = 0; i < selectionModel.length; i++) {
        const res = await deleteAuthor(String(selectionModel[i]));
        if (res.status === 200) {
          toast.success(res.data.message);
          await delay(3000);
          navigate(0);
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 500 },
    {
      field: "information",
      width: 500,
      headerName: "Information",
      sortable: false,
      renderCell: (params) => (
        //change this url later
        <Button
          component={Link}
          state={params.row}
          to={`/dashboard/admin/author-data`}
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
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="primary" onClick={onDelete}>
              Delete selected rows
            </Button>
          </Stack>
          <DataGrid
            rows={authors}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
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
