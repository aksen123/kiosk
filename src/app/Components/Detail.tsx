"use client";

import { Food } from "@/types/serivce";
import Image from "next/image";
import { useState } from "react";
import { cartState } from "@/app/atoms/cart-atom";
import { useRecoilState } from "recoil";
import { foodApi } from "@/service/foodApi";

interface Props {
  food: Food | null;
  onClose: (text?: string) => void;
}

const Detail = ({ onClose, food }: Props) => {
  const [count, setCount] = useState(1);
  const [cartList, setCartList] = useRecoilState(cartState);

  const handleCount = (num: number) => {
    count + num < 1 ? false : setCount((count) => count + num);
  };
  const order = () => {
    const menu = { ...(food as Food), count: count };
    const orderMenu = (food?.name as string) + count + "개";
    yesNo("주문 하시겠습니까?", orderMenu, "주문하기", () =>
      foodApi.order([menu]).then(() => {
        alert("주문완료", () => onClose("order"));
      })
    );
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
    onClose("cart");
  };
  return (
    <>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
        className="bg-white w-1/2 h-4/5 flex flex-col justify-center items-center z-[1]"
      >
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
