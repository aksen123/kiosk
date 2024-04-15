import db from "@/service/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const params = searchParams.get("store");
  const store = await getDoc(doc(db, "stores", params as string));
  const data = store.exists() ? { id: store.id, ...store.data() } : undefined;

  console.log(data);
  return Response.json({ success: true, data });
}
