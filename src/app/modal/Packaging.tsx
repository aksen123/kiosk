import { MdOutlineTakeoutDining } from "react-icons/md";
import { GiMeal } from "react-icons/gi";

export default function Packaging() {
  return (
    <div className="bg-white w-1/2 h-4/5 flex justify-center items-center p-5 absolute">
      <button className="hover:bg-slate-300">
        <GiMeal size={"100%"} />
        <p className="text-3xl font-semibold">매장</p>
      </button>
      <button className="hover:bg-slate-300">
        <MdOutlineTakeoutDining size={"100%"} />
        <p className="text-3xl font-semibold">포장</p>
      </button>
    </div>
  );
}
