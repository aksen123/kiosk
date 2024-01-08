import { foods } from "@/dummy/foods";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  return Response.json({ success: true, data: foods });
}
