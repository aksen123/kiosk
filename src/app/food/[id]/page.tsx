"use client";

import { foodApi } from "@/service/foodApi";
import useSWR from "swr";

interface Props {
  params: {
    id: string;
  };
}

export default function Food({ params: { id } }: Props) {
  const {data} = useSWR(`/api/food/${id}`, () => foodApi.get(id));
  console.log(data)
  return (
    <div>
      food {id}
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
