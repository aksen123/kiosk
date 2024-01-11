import { NextRequest } from "next/server";
import db from "@/service/firebase";
import { getDoc,doc } from "firebase/firestore";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  const food = await getDoc(doc(db,'foods', String(id)))
  const data = food.exists() ? {...food.data(),count: 0} : null
  console.log(data)
  return Response.json({
    success: true,
    data: data,
  });
}
