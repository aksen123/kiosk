import db from "@/service/firebase";
import { Food, Order, OrderList } from "@/types/serivce";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export interface Data {
  orders: Order[];
}

export async function POST(req: NextRequest) {
  const foods: Food[] = await req.json();
  setOrders(foods);
  return Response.json({ success: true });
}

export async function GET() {
  const docId = process.env.NEXT_PUBLIC_TABLE_NO as string;
  const docRef = doc(db, "orders", docId);
  const list = await getDoc(docRef);
  const data: Order[] = list.exists() ? list.data().orders : [];
  return Response.json({ success: true, data });
}

const setOrders = (foods: Food[]) => {
  const list: OrderList[] = foods.map(({ name, price, count }) => {
    return { name, price, count };
  });
  const order = {
    order: JSON.stringify(list),
    date: new Date().getTime(),
  };

  const docId = process.env.NEXT_PUBLIC_TABLE_NO as string;
  const docRef = doc(db, "orders", docId);
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as Data;
        setDoc(doc(db, "orders", docId), {
          orders: [...data.orders, order],
        });
      } else {
        setDoc(doc(db, "orders", docId), {
          orders: [order],
        });
      }
    })
    .catch((error) => {
      console.error("Error getting document: ", error);
    });
};
