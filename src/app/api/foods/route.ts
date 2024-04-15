import { collection, getDocs, query, where } from "firebase/firestore";
import db from "@/service/firebase";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const store = searchParams.get("store");
  const foodCollection = await getDocs(
    query(collection(db, "menu"), where("store", "==", store as string))
  );
  const data = foodCollection.docs
    .map((doc) => ({
      id: doc.id,
      sort: doc.get("sort"),
      ...doc.data(),
    }))
    .sort((a, b) => a.sort - b.sort);

  return Response.json({ success: true, data: data });
}
