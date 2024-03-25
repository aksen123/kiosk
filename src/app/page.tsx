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
    console.log(form, store);
    if (store === undefined) {
      alert("지점 없음");
    } else {
      sessionStorage.setItem("store", store.id);
      router.push(`/kiosk?store=${store.id}`);
    }
    // TODO :  store에 들어온 값이 db에 있는 매장이름 배열에 있으면 다음 페이지로 넘겨주고 atom 값을 store에 넣어주고 세션스토리지에 store : list.store 넣어주기
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-start py-32">
      <h1 className="text-2xl font-bold mb-20">지점 명을 입력해 주세요</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>지점명</label>
        <input
          className="p-1 text-lg border-b-2 mb-4 outline-none placeholder:font-thin"
          type="text"
          placeholder="ex) 서울"
          {...register("store")}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
          확인
        </button>
      </form>
    </section>
  );
}
