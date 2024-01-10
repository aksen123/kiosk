"use client";

import { foodApi } from "@/service/foodApi";
import useSWR from "swr";
import Image from "next/image";
import { useState } from "react";
import { cartState } from "@/app/atoms/cart-atom";
import { useRecoilState } from "recoil";
import { Food } from "@/types/serivce";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function FoodPage({ params: { id } }: Props) {
  const { data, isLoading } = useSWR(`/api/food/${id}`, () => foodApi.get(id));
  const [count, setCount] = useState(0)
  const  [cartList, setCartList] = useRecoilState(cartState)
  const {push} = useRouter()


  const handleCount = (num : number) =>{
    count + num < 0 ? false : setCount(count => count + num)
  }

  const addCart = () => {
    let arr = [...cartList]
    let index = arr.findIndex((el) => el.name == data?.name);
    if(index < 0) {
      const item = {...data as Food, count: count}
      setCartList([...arr,{...item}])
    } else {
      arr[index] = {...arr[index], count: arr[index].count + count}
      setCartList(arr)
    }
    console.log(index)
    push('/')
  }

  if (isLoading) {
    return <div>데이터를 받아오는 중입니다.</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        className="w-2/4 h-[18.75rem] object-cover"
        src={data?.src as string}
        alt={data?.name as string}
        width={100}
        height={100}
      />
      <h1 className="text-xl font-bold">{data?.name}</h1>
      <p className="text-primary font-bold text-2xl">
        {data?.price.toLocaleString()}원
      </p>
      <div className="flex mt-8 border border-black ">
        <button onClick={()=>{handleCount(1)}} className="border-r border-black w-8">+</button>
        <span className="w-8 text-center">{count}</span>
        <button onClick={()=>{handleCount(-1)}} className="border-l border-black w-8">-</button>
      </div>
      <div className="mt-4">
        <button className="mr-2 p-3 bg-blue-600 rounded-3xl text-white">주문하기</button>
        <button onClick={addCart} className="p-3 bg-blue-600 rounded-3xl text-white">장바구니 추가</button>
      </div>
    </div>
  );
}
