import { foods } from "@/dummy/foods";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  const { id } = request.query;

  return Response.json({
    success: true,
    data: foods.find((food) => food.id === Number(id)),
  });
}
