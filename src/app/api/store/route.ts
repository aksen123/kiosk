import db from "@/service/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // const { searchParams } = request.nextUrl;
  // const params = searchParams.get("store");
  const code: { store: string } = await request.json();

  const store = await getDoc(doc(db, "stores", code.store as string));

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

export async function GET() {
  const getStores = await getDocs(collection(db, "stores"));
  const data = getStores.docs.map((store) => {
    return { code: store.get("store"), name: store.get("name") };
  });

  return Response.json({ success: true, data });
}
