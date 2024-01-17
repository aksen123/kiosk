"use client";

import useSWR from "swr";
import { foodApi } from "@/service/foodApi";
import { OrderList } from "@/types/serivce";
import { paymentState } from "../atoms/payment-atom";
import { useRecoilState } from "recoil";
const OrderList = () => {
  const { data, isLoading } = useSWR("/api/order", () => foodApi.orderList());
  const [displayPayment, setDisplayPayment] = useRecoilState(paymentState);
  let total = 0;
  if (isLoading) {
    return <div>데이터를 받아오는중</div>;
  }
  if (data && data.length > 0) {
    return (
      <div>
        <h1 className="font-semibold text-2xl">주문 목록</h1>
        {data.map(({ date, order }, i) => {
          const orders: OrderList[] = JSON.parse(order);
          return (
            <div key={i} className=" border-b-2">
              <h1 className="mb-2">
                {i + 1}번 주문 {new Date(date).toLocaleTimeString()}
              </h1>
              {orders.map((arr) => {
                total += arr.price * arr.count;
                return (
                  <p key={i + "번"}>
                    <span>{arr.name} </span>
                    <span>{arr.count}개 </span>
                    <span>{(arr.price * arr.count).toLocaleString()}원</span>
                  </p>
                );
              })}
            </div>
          );
        })}
        <p className="text-xl font-medium mt-5">
          총 {total.toLocaleString()}원
        </p>
        <button
          onClick={() => {
            setDisplayPayment(true);
          }}
          className="w-1/2 h-8 bg-emerald-200 rounded-full"
        >
          결제하기
        </button>
      </div>
    );
  }
  return <h1>주문 목록이 없습니다.</h1>;
};

export default OrderList;
