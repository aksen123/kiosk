import db from "@/service/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const params = searchParams.get("store");
  const store = await getDoc(doc(db, "stores", params as string));

  const data = store.exists() ? { id: store.id, ...store.data() } : undefined;
  if (!data) {
    return Response.json(
      { success: false, error: { message: "해당 코드의 지점이 없습니다" } },
      { status: 500 }
    );
  } else {
    return Response.json({ success: true, data });
  }
}
