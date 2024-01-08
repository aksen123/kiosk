"use client";

import { foodApi } from "@/service/foodApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useSWR from "swr";

export default function Home() {
  const { push } = useRouter();
  const { data: foods = [], isLoading } = useSWR("/api/foods", () =>
    foodApi.list()
  );

  const handleFoodDetail = useCallback((id: number) => push(`/food/${id}`), []);

  if (isLoading) {
    return <div>데이터를 받아오는 중입니다.</div>;
  }

  return (
    <main>
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
