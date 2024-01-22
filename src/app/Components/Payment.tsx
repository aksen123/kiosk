// "use client";

import useSWR from "swr";
import { foodApi } from "@/service/foodApi";
import OrderList from "./OrderList";
import { paymentState } from "../atoms/payment-atom";
import { useRecoilState } from "recoil";
const Payment = () => {
  const [displayPayment, setDisplayPayment] = useRecoilState(paymentState);
  const { data } = useSWR("/api/order", () => foodApi.orderList());
  let total = 0;
  return (
    <div className="absolute w-full h-full z-10 ">
      <div className="absolute w-screen h-screen bg-black opacity-35"></div>
      <div className=" absolute w-1/2 h-3/4 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-5 overflow-y-scroll">
        <button
          onClick={() => {
            setDisplayPayment(false);
          }}
          className="absolute right-2 top-2 rounded-2xl bg-slate-400 p-1"
        >
          닫기
        </button>
        <h1 className="font-semibold text-2xl">주문 목록</h1>
        {data && data.length > 0 ? (
          <>
            <div className="">
              {data.map(({ date, order }, i) => {
                const orders: OrderList[] = JSON.parse(order);
                return (
                  <div key={i} className=" border-b-2 py-2">
                    <h1 className="mb-2 font-bold text-lg">
                      {i + 1}번 주문 {new Date(date).toLocaleTimeString()}
                    </h1>
                    {orders.map((arr, idx) => {
                      total += arr.price * arr.count;
                      return (
                        <p key={i + idx} className="flex justify-around">
                          <span className="block w-20 text-start">
                            {arr.name}{" "}
                          </span>
                          <span>{arr.count}개 </span>
                          <span className="text-blue-600">
                            {(arr.price * arr.count).toLocaleString()}원
                          </span>
                        </p>
                      );
                    })}
                  </div>
                );
              })}
              <p className="text-3xl font-bold my-5 text-blue-600">
                총 {total.toLocaleString()}원
              </p>
              <button
                onClick={() => {
                  foodApi.payment(
                    process.env.NEXT_PUBLIC_TABLE_NO as string,
                    total
                  );
                  setDisplayPayment(false);
                }}
                className="w-1/2 h-8 bg-emerald-200 rounded-full"
              >
                결제하기
              </button>
            </div>
          </>
        ) : (
          <>
            <div>주문 내역이 없습니다.</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
