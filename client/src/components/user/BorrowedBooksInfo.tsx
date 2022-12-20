import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useAppSelector } from "app/hooks";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { returnBook } from "services/bookServices";
import { getBorrowedBooks } from "services/userServices";

export const BorrowedBooksInfo = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userR);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [borrowedBooks, setborrowedBooks] = useState([]);

  const getBooks = useCallback(async () => {
    try {
      const res = await getBorrowedBooks(user._id);
      if (res.status === 200) {
        //if there are any books, set the data
        setborrowedBooks(res.data?.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const onReturn = async () => {
    try {
      for (let i = 0; i < selectionModel.length; i++) {
        const res = await returnBook(String(selectionModel[i]), user._id);
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    navigate(0);
  };

  const lateReturnFormat = (return_date: string) => {
    let returningDate = new Date(return_date);
    let current = new Date();
    let newColor;
    current.getTime() > returningDate.getTime()
      ? (newColor = "red")
      : (newColor = "green");
    return <span style={{ color: newColor }}>{return_date}</span>;
  };

  const columns: GridColDef[] = [
    { field: "ISBN", headerName: "ISBN", width: 180 },
    { field: "title", headerName: "Title", width: 180 },
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
    { field: "borrowDate", headerName: "Borrowed On", width: 180 },
    {
      field: "returnDate",
      headerName: "Return By",
      width: 180,
      renderCell: (params) => {
        return lateReturnFormat(params.row.returnDate);
      },
    },
  ];

  return (
    <>
      <div
        style={{
          height: 550,
          width: "95%",
          margin: 40,
          marginTop: 45,
        }}
      >
        <Button variant="contained" color="primary" onClick={onReturn}>
          Return Selected Books
        </Button>
        <DataGrid
          rows={borrowedBooks}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={setSelectionModel}
          selectionModel={selectionModel}
          {...borrowedBooks}
          getRowId={(book) => book._id}
        />
      </div>
    </>
  );
};
