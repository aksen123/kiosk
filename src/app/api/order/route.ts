import db from "@/service/firebase";
import { Food } from "@/types/serivce";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

interface Data {
  orders: Order[];
}
export interface Order {
  date: number;
  order: string;
}
export interface OrderList {
  name: string;
  price: number;
  count: number;
}
export async function POST(req: NextRequest) {
  const foods: Food[] = await req.json();
  setOrders(foods);
  return Response.json({ success: true });
}

export async function GET(req: NextRequest) {
  const docId = process.env.TABLE_NO as string;
  const docRef = doc(db, "orders", docId);
  const list = await getDoc(docRef);
  const data = list.exists() ? list.data().orders : [];
  console.log(data);
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

  const docId = process.env.TABLE_NO as string;
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
