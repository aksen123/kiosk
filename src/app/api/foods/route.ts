import { foods } from "@/dummy/foods";
import { NextApiRequest } from "next";
import { collection,getDocs } from "firebase/firestore";
import db from "@/service/firebase";

export async function GET(request: NextApiRequest) {

  const foodCollection = await getDocs(collection(db,'foods'))
  const data = foodCollection.docs.map(doc=>({
    id: doc.id,
    number: doc.get('number'),
    ...doc.data()
  })).sort((a,b)=>a.number - b.number)

  return Response.json({ success: true, data: data });
}
