"use client";
import React from "react";
import { cartSelect } from "../atoms/cart-atom";
import { useRecoilState } from "recoil";
import { foodApi } from "@/service/foodApi";
const Cart = () => {
  const [cartList, setCartList] = useRecoilState(cartSelect);

  const handleCount = (count: number, i: number, num: number) => {
    let newArr = [...cartList];
    newArr[i] = {
      ...newArr[i],
      count: count + num < 1 ? 1 : newArr[i].count + num,
    };
    setCartList(newArr);
  };

  const deleteMenu = (i: number) => {
    const newArr = [...cartList];
    newArr.splice(i, 1);
    setCartList(newArr);
  };

  if (cartList.length > 0) {
    let total = 0;
    return (
      <div>
        <h1 className="font-semibold text-2xl">장바구니</h1>
        {cartList.map((menu, i) => {
          total += menu.count * menu.price;
          return (
            <div
              key={menu.number}
              className="flex gap-3 items-center justify-center"
            >
              <span>{menu.name}</span>
              <div className="flex gap-2 text-xl">
                <button
                  onClick={() => {
                    handleCount(menu.count, i, 1);
                  }}
                >
                  +
                </button>
                <span>{menu.count}</span>
                <button
                  onClick={() => {
                    handleCount(menu.count, i, -1);
                  }}
                >
                  -
                </button>
              </div>
              <button
                onClick={() => {
                  deleteMenu(i);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
        <p className="text-xl font-medium mt-2">
          총 {total.toLocaleString()}원
        </p>
        <button
          onClick={() => {
            foodApi.order(cartList);
            setCartList([]);
          }}
          className="w-1/2 h-8 bg-emerald-200 rounded-full"
        >
          주문하기
        </button>
      </div>
    );
  }
  return <h1>장바구니가 비어있습니다.</h1>;
};

export default Cart;
