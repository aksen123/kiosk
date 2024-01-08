"use client";

import { foodsApi } from "@/service/foods-api";
import Image from "next/image";
import useSWR from "swr";

export default function Home() {
  const { data: foods = [], isLoading } = useSWR("/api/foods", () =>
    foodsApi.list()
  );

  if (isLoading) {
    return <div>데이터를 받아오는 중입니다.</div>;
  }

  return (
    <main>
      <section className="grid grid-cols-2 gap-[1rem] w-full p-[3rem]">
        {foods.map((food) => (
          <article key={food.id}>
            <Image
              className="w-full h-[18.75rem] object-cover"
              src={food.src}
              alt={food.name}
              width={100}
              height={100}
            />
            <h1 className="text-xl font-bold">{food.name}</h1>
            <p className="text-primary font-bold text-2xl">
              {food.price.toLocaleString()}원
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
