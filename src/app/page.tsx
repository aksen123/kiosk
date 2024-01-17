"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { foodApi } from "@/service/foodApi";
import useSWR from "swr";
import Cart from "./Components/Cart";
import OrderList from "./Components/OrderList";
export default function Home() {
  const { push } = useRouter();
  const { data: foods = [], isLoading } = useSWR("/api/foods", () =>
    foodApi.list()
  );
  const [cartDisplay, setCartDisplay] = useState(false);
  const [orderDisplay, setOrderDisplay] = useState(false);

  const handleFoodDetail = useCallback((id: string) => push(`/food/${id}`), []);

  if (isLoading) {
    return <div>데이터를 받아오는 중입니다.</div>;
  }

  return (
    <main>
      <section className="w-full flex items-center justify-center p-4">
        <article className="w-1/2 text-center">
          <button
            onClick={() => {
              setCartDisplay(!cartDisplay);
            }}
            className="p-3 rounded-3xl bg-blue-600 text-white"
          >
            장바구니 {cartDisplay ? "닫기" : "보기"}
          </button>
          {cartDisplay && <Cart />}
        </article>
        <article className="w-1/2 text-center">
          <button
            onClick={() => {
              setOrderDisplay(!orderDisplay);
            }}
            className="p-3 rounded-3xl bg-blue-600 text-white"
          >
            주문 내역 {orderDisplay ? "닫기" : "보기"}
          </button>
          {orderDisplay && <OrderList />}
        </article>
      </section>
      <section className="grid grid-cols-2 gap-[1rem] w-full p-[3rem]">
        {foods.map(({ id, src, name, price }) => (
          <article
            className="cursor-pointer"
            key={id}
            onClick={() => handleFoodDetail(id)}
          >
            <Image
              className="w-full h-[18.75rem] object-cover"
              src={src}
              alt={name}
              width={100}
              height={100}
            />
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-primary font-bold text-2xl">
              {price.toLocaleString()}원
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
