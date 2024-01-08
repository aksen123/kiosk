"use client";

import { foodsApi } from "@/service/foods-api";
import { Food } from "@/types/serivce";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);

  const getFoods = async () => {
    const data = await foodsApi.list();
    setFoods(data);
  };

  useEffect(() => {
    getFoods();
  }, []);

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
