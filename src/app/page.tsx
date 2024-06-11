"use client";
import { storeApi } from "@/service/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import useSWR from "swr";

interface Form {
  store: string;
  password: string;
}
export default function Home() {
  const router = useRouter();
  const { data: codeList } = useSWR("/api/store", () => storeApi.getCode());
  const [view, setView] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = async (form: Form) => {
    const store = await storeApi.get(form.store);
    sessionStorage.setItem("store", store.store);
    sessionStorage.setItem("name", store.name);
    router.push(`/kiosk?store=${store.store}`);
  };
  const clickList = (str: string) => {
    setValue("store", str);
    setView(false);
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-start py-32">
      <h1 className="text-2xl font-bold mb-20">지점 코드를 입력해 주세요</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>지점명</label>
        <input
          className="p-1 text-lg border-b-2 outline-none placeholder:font-thin"
          type="text"
          autoComplete="off"
          placeholder="ex) 1"
          {...register("store", {
            required: "지점 코드를 입력해 주세요.",
            pattern: {
              value: /^[0-9]+$/,
              message: "숫자만 입력 가능합니다",
            },
          })}
          onFocus={() => {
            setView(true);
          }}
          onBlur={() => {
            setView(false);
          }}
        />
        {view && (
          <ul className="absolute top-1/2 w-fit bg-gray-800 text-white mt-1 rounded shadow-lg space-y-1">
            {codeList?.map((el, i) => {
              return (
                <li
                  key={i}
                  className="cursor-pointer px-2 hover:bg-slate-400 flex justify-start items-center gap-4"
                  onMouseDown={() => {
                    clickList(el.code);
                  }}
                >
                  <span>{el.code} : </span>
                  <span>{el.name}</span>
                </li>
              );
            })}
          </ul>
        )}
        <p className="mb-4 text-red-400">
          {errors.store && errors.store?.message}
        </p>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
          확인
        </button>
      </form>
    </section>
  );
}
