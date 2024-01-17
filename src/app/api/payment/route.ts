import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import db from "@/service/firebase";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const docId = process.env.TABLE_NO as string;
  const docRef = doc(db, "orders", docId);
  const list = await getDoc(docRef);
  const getTime = new Date().getTime();

  if (list.exists()) {
    const data = list.data();
    setDoc(doc(db, "payment", docId + `-${getTime}`), {
      ...data,
    });
    deleteDoc(docRef);
  } else {
    console.log("else");
  }

  return Response.json({ success: true });
}

const test = () => {
  const docId = process.env.TABLE_NO as string;
  const docRef = doc(db, "orders", docId);
  getDoc(docRef).then((docSnap) => {});
};
