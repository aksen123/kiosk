"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { foodApi } from "@/service/foodApi";
import useSWR from "swr";
import Cart from "./Components/Cart";
import OrderList from "./Components/OrderList";
import Payment from "./Components/Payment";
import Detail from "./Components/Detail";
import { paymentState } from "./atoms/payment-atom";
import { useRecoilState } from "recoil";
import { Food } from "@/types/serivce";
export default function Home() {
  const { push } = useRouter();
  const { data: foods = [], isLoading } = useSWR("/api/foods", () =>
    foodApi.list()
  );
  const [cartDisplay, setCartDisplay] = useState(false);
  const [orderDisplay, setOrderDisplay] = useState(false);
  const [detail, setDetail] = useState<Food | null>(null);
  const [displayPayment, setDisplayPayment] = useRecoilState(paymentState);

  const closeDetail = () => {
    setDetail(null);
  };

  if (isLoading) {
    return (
      <div className="my-auto mx-auto text-4xl font-bold">
        데이터를 받아오는 중입니다.
      </div>
    );
  }

  return (
    <>
      {displayPayment && <Payment />}
      <section className="grid grid-cols-4 place-content-center gap-[1rem] w-[80%] p-[3rem] items-center relative overflow-y-auto">
        {foods.map(({ id, src, name, price }, i) => (
          <article
            className="cursor-pointer bg-gray-200 p-3 pb-0 h-full  self-start shadow-xl rounded-2xl"
            key={id}
            onClick={() => setDetail(foods[i])}
          >
            <Image
              className="w-full h-[80%] object-cover rounded-2xl"
              src={src}
              alt={name}
              width={100}
              height={100}
            />
            <div className="h-[20%] flex justify-between items-center">
              <h1 className="text-sm font-bold">{name}</h1>
              <p className="text-primary font-bold text-sm">
                {price.toLocaleString()}원
              </p>
            </div>
          </article>
        ))}
        {detail && <Detail close={closeDetail} food={detail} />}
      </section>
      <section className="w-[30%] h-full py-[2rem] px-1 relative overflow-x-hidden border-l-2 border-gray-300">
        <article className="w-full text-center overflow-y-auto">
          <div className="w-full flex justify-around my-9">
            <button
              onClick={() => {
                setCartDisplay(!cartDisplay);
                orderDisplay ? setOrderDisplay(false) : false;
              }}
              className="p-3 rounded-3xl bg-blue-600 text-white"
            >
              장바구니
            </button>
            <button
              onClick={() => {
                setOrderDisplay(!orderDisplay);
                cartDisplay ? setCartDisplay(false) : false;
              }}
              className="p-3 rounded-3xl bg-blue-600 text-white"
            >
              주문 내역
            </button>
          </div>
          {cartDisplay && <Cart />}
          {orderDisplay && <OrderList />}
        </article>
      </section>
    </>
  );
}
