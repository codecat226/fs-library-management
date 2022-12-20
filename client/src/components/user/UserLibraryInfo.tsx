import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Button } from "@mui/material";
import { fetchBooks } from "features/bookSlice";
import useDebounce from "app/useDebounce";

export const UserLibraryInfo = () => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.booksR);
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(search, 1000);

  useEffect(() => {
    dispatch(fetchBooks(search));
  }, [debouncedValue, dispatch, search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

  const columns: GridColDef[] = [
    { field: "ISBN", headerName: "ISBN", width: 180 },
    { field: "title", headerName: "Title", width: 220 },
    {
      field: "author",
      headerName: "Author",
      width: 180,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.author?.name}</div>;
      },
    },
    {
      field: "publisher",
      headerName: "Publisher",
      width: 180,
    },
    {
      field: "status",
      headerName: "Availability",
      description: "This column has a value getter and is not sortable.",
      width: 180,
      renderCell: (params) => {
        let text;
        params.row.status
          ? (text = <div className="rowitem">available</div>)
          : (text = <div className="rowitem">unavailable</div>);
        return text;
      },
    },
    {
      field: "information",
      width: 180,
      headerName: "Information",
      sortable: false,
      renderCell: (params) => (
        <Button
          component={Link}
          state={params.row}
          to={"/dashboard/user/book-data"}
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
      <div
        style={{
          height: 550,
          width: "95%",
          margin: 40,
          marginTop: 0,
        }}
      >
        <form
          className="searchBar"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <input
            className="searchInput"
            name="search"
            type="text"
            value={search}
            onChange={handleChange}
          />
        </form>
        <DataGrid
          rows={books}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          onSelectionModelChange={setSelectionModel}
          selectionModel={selectionModel}
          {...books}
          getRowId={(book) => book._id}
          onCellClick={handleCellClick}
        />
      </div>
    </>
  );
};
