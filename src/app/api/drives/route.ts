import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Get all drives for a selected driver
 * 
 * @param request 
 * @returns 
 */
export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url);
  const driverId = searchParams.get("driverId") as string;
  const drives = await prisma.drive.findMany({
    where: { driverId },
  });
  return NextResponse.json(drives);
}

/**
 * Start a new drive for this driver
 * @param request - driverId and day/night boolean
 * @returns 
 */
export async function POST(request: Request) {
  try {
    const json = await request.json();

    const newDrive = await prisma.drive.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(newDrive), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
