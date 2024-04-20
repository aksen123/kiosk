"use client";
import React from "react";
import { cartSelect } from "../atoms/cart-atom";
import { useRecoilState } from "recoil";
import { foodApi } from "@/service/foodApi";
import { Food } from "@/types/serivce";
interface Props {
  onClose: (text?: string) => void;
  store: string;
}
const Cart = ({ onClose, store }: Props) => {
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
  const callback = async (order: Food[]) => {
    const total = order.reduce(
      (prev, curr) => prev + curr.count * curr.price,
      0
    );
    await foodApi.payment(store as string, total, order);
    alert("주문 완료");
    onClose();
    setCartList([]);
  };

  const handleOrder = () => {
    console.log("order button");

    const orderMenu =
      cartList[0].name +
      (cartList.length === 1
        ? " " + cartList[0].count + "개"
        : " 외 " + (cartList.length - 1) + "개");
    yesNo(
      "주문 하시겠습니까?",
      orderMenu,
      "결제하기",
      async () => await callback(cartList)
    );
  };

  if (cartList.length > 0) {
    let total = 0;
    return (
      <div className="flex flex-col items-center justify-between h-full">
        <div className="w-full flex-1 overflow-y-auto">
          {cartList.map((menu, i) => {
            total += menu.count * menu.price;
            return (
              <div
                key={menu.name + i}
                className="w-[90%] flex items-center justify-between px-2 pb-2 mx-auto border-b-2 border-b-gray-200"
              >
                <div className="w-20 flex flex-col items-start">
                  <span>{menu.name}</span>
                  <span className="text-blue-600 font-semibold">
                    {menu.price.toLocaleString()}원
                  </span>
                </div>
                <div className="flex gap-5 text-xl">
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
        </div>
        <div className="w-full border-t-2 border-t-blue-200 border-dotted">
          <p className="text-xl font-bold mt-2">
            총 {total.toLocaleString()}원
          </p>
          <button
            onClick={handleOrder}
            className="w-1/2 h-8 bg-emerald-200 rounded-full mt-3"
          >
            주문하기
          </button>
        </div>
      </div>
    );
  }
  return <h1>장바구니가 비어있습니다.</h1>;
};

export default Cart;
