import { collection, getDocs } from "firebase/firestore";
import db from "@/service/firebase";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const store = searchParams.get("store");
  const foodCollection = await getDocs(
    collection(db, "stores", store as string, "menu")
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
