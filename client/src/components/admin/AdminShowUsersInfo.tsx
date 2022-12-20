import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridSearchIcon,
} from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { banUser, unbanUser } from "services/userServices";
import { fetchAllUsers } from "features/usersSlice";
import useDebounce from "app/useDebounce";

export const AdminShowUsersInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users } = useAppSelector((state) => state.allUsersR);
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(search, 1000);

  useEffect(() => {
    dispatch(fetchAllUsers(search));
  }, [debouncedValue, dispatch, search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const setBan = async () => {
    try {
      for (let i = 0; i < selectionModel.length; i++) {
        const res = await banUser(String(selectionModel[i]));
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

  const removeBan = async () => {
    try {
      for (let i = 0; i < selectionModel.length; i++) {
        const res = await unbanUser(String(selectionModel[i]));
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    navigate(0);
  };

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "firstname", headerName: "Firstname", width: 180 },
    {
      field: "lastname",
      headerName: "Lastname",
      width: 180,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      description: "This column has a value getter and is not sortable.",
      width: 140,
      renderCell: (params) => {
        let text;
        params.row.isAdmin
          ? (text = <div className="rowitem">Admin</div>)
          : (text = <div className="rowitem">Not Admin</div>);
        return text;
      },
    },
    {
      field: "isBanned",
      headerName: "Banned Status",
      width: 140,
      renderCell: (params) => {
        let text;
        params.row.isBanned
          ? (text = <div className="rowitem">Banned</div>)
          : (text = <div className="rowitem">Not Banned</div>);
        return text;
      },
    },
  ];

  return (
    <>
      <main className="main-table">
        <div
          style={{
            height: 550,
            width: "100%",
            margin: 40,
          }}
        >
          {" "}
          <form
            className="searchBar"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <GridSearchIcon />
            </IconButton>
            <input
              className="searchInput"
              name="search"
              type="text"
              value={search}
              onChange={handleChange}
            />
          </form>
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="primary" onClick={setBan}>
              Ban selected users
            </Button>
            <Button variant="contained" color="primary" onClick={removeBan}>
              Remove ban selected users
            </Button>
          </Stack>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={setSelectionModel}
            selectionModel={selectionModel}
            {...users}
            getRowId={(user) => user._id}
          />
        </div>
      </main>
    </>
  );
};
