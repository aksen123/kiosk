"use client";

import { foodApi } from "@/service/foodApi";
import useSWR from "swr";

interface Props {
  params: {
    id: number;
  };
}

export default function Food({ params: { id } }: Props) {
  const data = useSWR(`/api/food/${id}`, () => foodApi.get(id));

  return (
    <div>
      food {id}
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
