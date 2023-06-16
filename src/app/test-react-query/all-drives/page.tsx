// import ListDrives from "./allDrives";
// import { Drive } from "@prisma/client";

// async function getDrives(driverId: string) {
//   const res = await fetch(
//     `http://localhost:3000/api/drives?driverId=${driverId}`
//   );
//   const drives = (await res.json()) as Drive[];
//   return drives;
// }

// export default async function DriveHistory({ driverId }: {driverId: string}) {
//   const drives = await getDrives(driverId);

//   return <ListDrives drives={drives} driverId={driverId} />;
// }
