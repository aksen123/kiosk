import { MdOutlineTakeoutDining } from "react-icons/md";
import { GiMeal } from "react-icons/gi";

interface Props {
  callback1: (bool?: boolean) => void;
  callback2: () => void;
}

/**
 * @callback1 매장, 포장 버튼 클릭시 실행될 함수
 * @callback2 모달 닫을때 사용할 함수
 */
export default function OrderType({ callback1, callback2 }: Props) {
  return (
    <div className="bg-white w-1/2 h-4/5 flex flex-col justify-center items-center p-5 absolute z-[2]">
      <h2 className="text-4xl font-bold">선택해 주세요.</h2>
      <div className="flex-1 flex justify-center items-center ">
        <button className="hover:bg-slate-300" onClick={() => callback1(true)}>
          <GiMeal size={"100%"} />
          <p className="text-3xl font-semibold">매장</p>
        </button>
        <button
          className="hover:bg-slate-300"
          onClick={() => {
            callback1(false);
          }}
        >
          <MdOutlineTakeoutDining size={"100%"} />
          <p className="text-3xl font-semibold">포장</p>
        </button>
      </div>
      <button
        className="text-xl font-semibold text-red-500 p-2 border-2 border-red-500 hover:bg-red-300 hover:text-white hover:border-white"
        onClick={callback2}
      >
        닫기
      </button>
    </div>
  );
}

