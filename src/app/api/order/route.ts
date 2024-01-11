import { NextRequest } from "next/server";
import { doc, setDoc,addDoc,collection } from "firebase/firestore";
import db from "@/service/firebase";
import { Food } from "@/types/serivce";

export async function POST(req: NextRequest){
  const foods: Food[] =  await req.json()
  const docId = new Date().getTime()
 console.log(foods, "oder api",new Date().getTime())
 
 foods.forEach(async ({name,price,count}) =>{

 await addDoc(collection(db,'orders'),{name,price,count})
  })

 return Response.json({success: true})

}