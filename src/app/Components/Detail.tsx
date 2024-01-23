"use client";

import { Food } from "@/types/serivce";
import Image from "next/image";
import { useState } from "react";
import { cartState } from "@/app/atoms/cart-atom";
import { useRecoilState } from "recoil";
import { foodApi } from "@/service/foodApi";
interface Props {
  food: Food | null;
  close: () => void;
}

const Detail = ({ close, food }: Props) => {
  const [count, setCount] = useState(1);
  const [cartList, setCartList] = useRecoilState(cartState);
  const handleCount = (num: number) => {
    count + num < 1 ? false : setCount((count) => count + num);
  };
  const order = () => {
    const menu = { ...(food as Food), count: count };
    if (count > 0) {
      foodApi.order([menu]);
      close();
    } else {
      alert("수량을 선택해 주세요");
    }
  };
  const addCart = () => {
    let arr = [...cartList];
    let index = arr.findIndex((el) => el.name == food?.name);
    if (index < 0) {
      const item = { ...(food as Food), count: count };
      setCartList([...arr, { ...item }]);
    } else {
      arr[index] = { ...arr[index], count: arr[index].count + count };
      setCartList(arr);
    }
    close();
  };
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-30 flex justify-center items-center"
        onClick={close}
      ></div>
      <div className="absolute left-1/2 -translate-x-1/2 bg-white w-1/2 h-4/5 flex flex-col justify-center items-center z-20">
        <Image
          className="w-1/2  object-cover"
          src={food?.src as string}
          alt={food?.name as string}
          width={100}
          height={100}
        />
        <h1 className="text-xl font-bold">{food?.name}</h1>
        <p className="text-primary font-bold text-2xl">
          {food?.price.toLocaleString()}원
        </p>
        <div className="flex mt-8 border border-black ">
          <button
            onClick={() => {
              handleCount(1);
            }}
            className="border-r border-black w-8"
          >
            +
          </button>
          <span className="w-8 text-center">{count}</span>
          <button
            onClick={() => {
              handleCount(-1);
            }}
            className="border-l border-black w-8"
          >
            -
          </button>
        </div>
        <div className="mt-4">
          <button
            onClick={order}
            className="mr-2 p-3 bg-blue-600 rounded-3xl text-white"
          >
            주문하기
          </button>
          <button
            onClick={addCart}
            className="p-3 bg-blue-600 rounded-3xl text-white"
          >
            장바구니 추가
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
