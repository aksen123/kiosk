"use client";
import { storeApi } from "@/service/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Form {
  store: string;
  password: string;
}
export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Form>();

  const onSubmit = async (form: Form) => {
    const store = await storeApi.get(form.store);
    sessionStorage.setItem("store", store.store);
    router.push(`/kiosk?store=${store.store}`);
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-start py-32">
      <h1 className="text-2xl font-bold mb-20">지점 코드를 입력해 주세요</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>지점명</label>
        <input
          className="p-1 text-lg border-b-2 mb-4 outline-none placeholder:font-thin"
          type="text"
          placeholder="ex) 1"
          {...register("store", { required: true })}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
          확인
        </button>
      </form>
    </section>
  );
}
