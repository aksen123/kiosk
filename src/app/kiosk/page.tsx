"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { foodApi } from "@/service/foodApi";
import useSWR from "swr";
import Cart from "../Components/Cart";
import Detail from "../Components/Detail";
import { Food } from "@/types/serivce";
import Modal from "../modal/Modal";
import Loading from "../Components/Loading";
import SoldOut from "../Components/SoldOut";
import { useRouter } from "next/navigation";
interface Store {
  code: string;
  name: string;
}

export default function Home() {
  const [store, setStore] = useState<Store | null>(null);
  const { data: foods = [], isLoading } = useSWR(
    store ? "/api/foods" : null,
    () => foodApi.list(store?.code as string)
  );
  const [detail, setDetail] = useState<Food | null>(null);

  const [detailModal, setDetailModal] = useState(false);
  const { replace } = useRouter();
  const openModal = (i: number) => {
    setDetailModal(true);
    setDetail(foods[i]);
  };
  useEffect(() => {
    const code = sessionStorage.getItem("store");
    const name = sessionStorage.getItem("name");
    setStore({ code, name } as Store);

    if (!code || !name) replace("/");
  }, [replace]);

  const onClose = () => {
    setDetailModal(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className=" w-[80%] p-[1rem] items-center relative overflow-y-auto">
        <h2 className="text-2xl font-semibold text-blue-600 text-center mb-5">
          {store && `${store.name}점`}
        </h2>
        <div className="grid grid-cols-4 place-content-center gap-[1rem]">
          {foods.map(({ id, src, name, price, soldOut, hide }, i) =>
            hide ? null : (
              <article
                className="relative cursor-pointer bg-gray-200 p-3 pb-2 h-fit self-start shadow-xl rounded-2xl"
                key={id}
                onClick={() => (soldOut ? false : openModal(i))}
              >
                <Image
                  className="w-full h-[80%] object-cover rounded-2xl bg-white"
                  src={
                    src
                      ? src
                      : "http://placehold.it/100/808080/ffffff&text=menu"
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
            <Detail
              food={detail as Food}
              onClose={onClose}
              store={store?.code as string}
            />
          </Modal>
        </div>
      </section>
      <section className="w-[30%] h-full py-[1rem] px-1 relative overflow-x-hidden border-l-2 border-gray-300">
        <article className="w-full h-full text-center flex flex-col justify-start">
          <div className="w-full flex justify-around my-5">
            <h2 className="w-full pb-4 text-2xl border-b-[1px] border-b-gray-500">
              장바구니
            </h2>
          </div>

          <Cart store={store?.code as string} />
        </article>
      </section>
    </>
  );
}
