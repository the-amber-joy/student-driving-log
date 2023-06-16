import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const drives = await prisma.drive.findMany({
    where: { driverId: params.id },
  });
  return NextResponse.json(drives);
}

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
    if (error.code === "P2002") {
      return new NextResponse("Driver with email already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
