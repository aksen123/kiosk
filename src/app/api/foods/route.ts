import { collection, getDocs } from "firebase/firestore";
import db from "@/service/firebase";

export async function GET() {
  const foodCollection = await getDocs(collection(db, "foods"));
  const data = foodCollection.docs
    .map((doc) => ({
      id: doc.id,
      sort: doc.get("sort"),
      ...doc.data(),
    }))
    .sort((a, b) => a.sort - b.sort);

  return Response.json({ success: true, data: data });
}
