import React, { cache, use } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Drive } from "@prisma/client";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const getDrives = cache((driverId: string) =>
  fetch(`http://localhost:3000/api/drives?driverId=${driverId}`).then((res) =>
    res.json()
  )
);

export default function ListDrives({ driverId }: { driverId: string }) {
  const drives = use<Drive[]>(getDrives(driverId));

  const columns: GridColDef[] = [
    {
      field: "date",
      valueGetter: ({ value }) => dayjs(value).format("ddd MMM D"),
      sortComparator: ({ value }) => dayjs(value).unix(),
      headerName: "Date",
    },
    {
      field: "start_timestamp",
      sortable: false,
      valueGetter: ({ value }) =>
        value ? dayjs(value).format("h:mm a (z)") : null,
      headerName: "Start Time",
      width: 130,
    },
    {
      field: "end_timestamp",
      sortable: false,
      valueGetter: ({ value }) =>
        value ? dayjs(value).format("h:mm a (z)") : null,
      headerName: "End Time",
      width: 130,
    },
    {
      field: "drive_length",
      sortable: false,
      headerName: "Duration",
    },
    {
      field: "isNight",
      sortable: false,
      headerName: "At Night?",
      type: "boolean",
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        density="compact"
        disableColumnMenu
        sortingOrder={["desc", "asc"]}
        rows={drives}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
      />
    </div>
  );
}
