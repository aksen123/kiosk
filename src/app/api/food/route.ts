import { foods } from "@/dummy/foods";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  return Response.json({
    success: true,
    data: foods.find((food) => food.id === Number(id)),
  });
}
