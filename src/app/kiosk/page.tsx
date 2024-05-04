"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { foodApi } from "@/service/foodApi";
import useSWR from "swr";
import Cart from "../Components/Cart";
import Detail from "../Components/Detail";
import { Food } from "@/types/serivce";
import Modal from "../modal/Modal";
import Loading from "../Components/Loading";
import SoldOut from "../Components/SoldOut";

export default function Home() {
  const [store, setStore] = useState<string | null>(null);
  const { data: foods = [], isLoading } = useSWR(
    store ? "/api/foods" : null,
    () => foodApi.list(store as string)
  );
  const [cartDisplay, setCartDisplay] = useState(false);
  // const [orderDisplay, setOrderDisplay] = useState(false);
  const [detail, setDetail] = useState<Food | null>(null);

  const [detailModal, setDetailModal] = useState(false);

  const openModal = (i: number) => {
    setDetailModal(true);
    setDetail(foods[i]);
  };
  useEffect(() => {
    const store = sessionStorage.getItem("store");
    setStore(store);
  }, []);

  const onClose = (text?: string) => {
    setDetailModal(false);
    if (text == "cart") {
      setCartDisplay(true);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="grid grid-cols-4 place-content-center gap-[1rem] w-[80%] p-[1rem] items-center relative overflow-y-auto">
        {foods.map(({ id, src, name, price, soldOut, hide }, i) =>
          hide ? null : (
            <article
              className="relative cursor-pointer bg-gray-200 p-3 pb-2 h-fit self-start shadow-xl rounded-2xl"
              key={id}
              onClick={() => (soldOut ? false : openModal(i))}
            >
              <Image
                className="w-full h-[80%] object-cover rounded-2xl"
                src={
                  src ? src : "http://placehold.it/100/808080/ffffff&text=menu"
                }
                alt={name}
                width={100}
                height={100}
              />
              <div className="h-[20%] flex flex-col justify-between items-start mt-2">
                <h1 className="text-sm font-bold">{name}</h1>
                <p className="text-primary font-bold text-sm">
                  {price.toLocaleString()}원
                </p>
              </div>
              {soldOut ? <SoldOut /> : null}
            </article>
          )
        )}
        <Modal open={detailModal} onClose={onClose}>
          <Detail food={detail as Food} onClose={onClose} store={store} />
        </Modal>
      </section>
      <section className="w-[30%] h-full py-[1rem] px-1 relative overflow-x-hidden border-l-2 border-gray-300">
        <article className="w-full h-full text-center flex flex-col justify-start">
          <div className="w-full flex justify-around my-5">
            <h2 className="w-full pb-4 text-2xl border-b-[1px] border-b-gray-500">
              장바구니
            </h2>
          </div>

          <Cart onClose={onClose} store={store as string} />
        </article>
      </section>
    </>
  );
}
