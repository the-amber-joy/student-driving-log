"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Drive } from "@prisma/client";
import React, { cache, use } from "react";

const getDrives = cache((driverId: string) =>
  fetch(`http://localhost:3000/api/drives?id=${driverId}`).then((res) =>
    res.json()
  )
);

export default function ListDrives({ driverId }: { driverId: string }) {
  const drives = use<Drive[]>(getDrives(driverId));

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 70 },
    { field: "start_timestamp", headerName: "Start Time", width: 130 },
    { field: "end_timestamp", headerName: "End Time", width: 130 },
    {
      field: "isNight",
      headerName: "Night?",
      type: "boolean",
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={drives}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
