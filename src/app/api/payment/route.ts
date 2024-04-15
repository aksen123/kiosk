import { getDoc, doc, setDoc, deleteDoc, collection } from "firebase/firestore";
import db from "@/service/firebase";
import { NextRequest } from "next/server";
import { Food, OrderList } from "@/types/serivce";
import dayjs from "dayjs";

interface RequestData {
  store: string;
  total: number;
  order: Food[];
}

export async function POST(req: NextRequest) {
  const table: RequestData = await req.json();
  const docId = table.store;
  const order: OrderList[] = table.order.map(({ name, price, count }) => {
    return { name, price, count };
  });
  const collectionDoc = collection(db, "stores", docId, "payment");
  await setDoc(doc(db, "payments", docId + "-" + dayjs().valueOf()), {
    date: dayjs().valueOf(),
    order: order,
    total: table.total,
    store: docId,
  });

  return Response.json({ success: true });
}
