import { NextRequest } from "next/server";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";
import db from "@/service/firebase";
import { Food } from "@/types/serivce";

interface order {
  displayNo : number
  order : string
  orderNo : number
}

export async function POST(req: NextRequest) {
  const test = await getDocs(collection(db,'orders'))
  const foods: Food[] = await req.json();
  const docId = new Date().getTime();
  const todayTime = new Date().setHours(0,0,0,0)
  let orders = test.docs.map(el =>({
    orderNo : el.get('orderNo'),
  })).filter(el => el.orderNo <= docId && el.orderNo >= todayTime 
  ).length

  console.log(orders)

  setDoc(doc(db, "orders", String(docId)), {
    orderNo : docId,
    displayNo: orders + 1,
    order: JSON.stringify(foods)
  });

  //  foods.forEach(async ({name,price,count}) =>{
  //  await addDoc(collection(db,'orders'),{name,price,count})
  //   })

  return Response.json({ success: true});
}
