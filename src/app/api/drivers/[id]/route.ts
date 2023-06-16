import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const driver = await prisma.driver.findUnique({
    where: {
      id,
    },
  });

  if (!driver) {
    return new NextResponse("No driver with ID found", { status: 404 });
  }

  return NextResponse.json(driver);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let json = await request.json();

  const updated_driver = await prisma.driver.update({
    where: { id },
    data: json,
  });

  if (!updated_driver) {
    return new NextResponse("No driver with ID found", { status: 404 });
  }

  return NextResponse.json(updated_driver);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.driver.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("No driver with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
