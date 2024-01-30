import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import db from "@/service/firebase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const table = await req.json();
  const docId = table.tableNo;
  const docRef = doc(db, "orders", docId);
  const list = await getDoc(docRef);
  const getTime = new Date().getTime();
  if (list.exists()) {
    const data = list.data();
    setDoc(doc(db, "payment", docId + `-${getTime}`), {
      date: getTime,
      totalPrice: table.total,
      ...data,
    });
    deleteDoc(docRef);
  }

  return Response.json({ success: true });
}
