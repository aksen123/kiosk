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
export default function Home() {
  const { push } = useRouter();
  const { data: foods = [], isLoading } = useSWR("/api/foods", () =>
    foodApi.list()
  );
  const [cartDisplay, setCartDisplay] = useState(false);
  const [orderDisplay, setOrderDisplay] = useState(false);
  const [displayPayment, setDisplayPayment] = useRecoilState(paymentState);
  const handleFoodDetail = useCallback((id: string) => push(`/food/${id}`), []);

  if (isLoading) {
    return <div>데이터를 받아오는 중입니다.</div>;
  }

  return (
    <>
      {displayPayment && <Payment />}
      <main className="w-[1024px] h-[820px] flex my-auto">
        <section className="grid grid-cols-4 place-content-center gap-[1rem] w-[80%]  p-[3rem]  items-center">
          {foods.map(({ id, src, name, price }) => (
            <article
              className="cursor-pointer bg-gray-200 p-3 pb-0 h-48 self-start shadow-xl rounded-2xl"
              key={id}
              onClick={() => handleFoodDetail(id)}
            >
              <Image
                className="w-full h-[70%] object-cover rounded-2xl"
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
        </section>
        <section className="w-[30%] h-full py-[5rem] px-1 relative overflow-x-hidden before:absolute before:left-0 before:top-0 before:h-[100%] before:my-auto before:border-l-2 before:border-gray-300">
          <article className="w-full text-center overflow-y-auto">
            <div className="w-full flex justify-around mb-9">
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
      </main>
    </>
  );
}
