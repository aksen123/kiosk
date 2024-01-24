"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { foodApi } from "@/service/foodApi";
import useSWR from "swr";
import Cart from "./Components/Cart";
import OrderList from "./Components/OrderList";
import Detail from "./Components/Detail";
import { Food } from "@/types/serivce";
import Modal from "./modal/Modal";
import Loading from "./Components/Loading";

export default function Home() {
  const { push } = useRouter();
  const { data: foods = [], isLoading } = useSWR("/api/foods", () =>
    foodApi.list()
  );
  const [cartDisplay, setCartDisplay] = useState(false);
  const [orderDisplay, setOrderDisplay] = useState(false);
  const [detail, setDetail] = useState<Food | null>(null);

  const [detailModal, setDetailModal] = useState(false);

  const openModal = (i: number) => {
    setDetailModal(true);
    setDetail(foods[i]);
  };

  const onClose = () => {
    setDetailModal(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="grid grid-cols-4 place-content-center gap-[1rem] w-[80%] p-[1rem] items-center relative overflow-y-auto">
        {foods.map(({ id, src, name, price }, i) => (
          <article
            className="cursor-pointer bg-gray-200 p-3 pb-0 h-full  self-start shadow-xl rounded-2xl"
            key={id}
            onClick={() => openModal(i)}
          >
            <Image
              className="w-full h-[80%] object-cover rounded-2xl"
              src={src}
              alt={name}
              width={100}
              height={100}
            />
            <div className="h-[20%] flex justify-between items-center">
              <h1 className="text-sm font-bold">{name}</h1>
              <p className="text-primary font-bold text-sm">
                {price.toLocaleString()}원
              </p>
            </div>
          </article>
        ))}
        <Modal open={detailModal} onClose={onClose}>
          <Detail food={detail} close={onClose} />
        </Modal>
      </section>
      <section className="w-[30%] h-full py-[1rem] px-1 relative overflow-x-hidden border-l-2 border-gray-300">
        <article className="w-full text-center">
          <div className="w-full flex justify-around my-5">
            <button
              onClick={() => {
                setCartDisplay(!cartDisplay);
                orderDisplay ? setOrderDisplay(false) : false;
              }}
              className="p-3 rounded-3xl bg-blue-600 text-white"
            >
              장바구니
            </button>
            <button
              onClick={() => {
                setOrderDisplay(!orderDisplay);
                cartDisplay ? setCartDisplay(false) : false;
              }}
              className="p-3 rounded-3xl bg-blue-600 text-white"
            >
              주문 내역
            </button>
          </div>
          {cartDisplay && <Cart />}
          {orderDisplay && <OrderList />}
        </article>
      </section>
    </>
  );
}
