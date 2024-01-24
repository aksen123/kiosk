"use client";

import useSWR from "swr";
import { foodApi } from "@/service/foodApi";
// import { OrderList } from "@/types/serivce";
import { paymentState } from "../atoms/payment-atom";
import { useRecoilState } from "recoil";
import Modal from "../modal/Modal";
import List from "./List";

const OrderList = () => {
  const { data, isLoading } = useSWR("/api/order", () => foodApi.orderList());
  const [displayPayment, setDisplayPayment] = useRecoilState(paymentState);
  const handlePayment = (total?: number) => {
    foodApi.payment(
      process.env.NEXT_PUBLIC_TABLE_NO as string,
      total as number
    );
    setDisplayPayment(false);
    console.log("test");
  };
  const openPayment = () => {
    setDisplayPayment(true);
  };
  if (isLoading) {
    return <div>데이터를 받아오는중</div>;
  }

  return (
    <>
      {data && (
        <>
          <List data={data} callback={openPayment} />
          <Modal open={displayPayment} onClose={() => setDisplayPayment(false)}>
            <List data={data} callback={handlePayment} />
          </Modal>
        </>
      )}
    </>
  );
  // if (data && data.length > 0) {
  //   return (
  //     <div className="flex flex-col items-stretch justify-between gap-5">
  //       <h1 className="font-semibold text-2xl">주문 목록</h1>
  //       <div className="overflow-y-auto h-[300px]">
  //         {data.map(({ date, order }, i) => {
  //           const orders: OrderList[] = JSON.parse(order);
  //           return (
  //             <div key={i} className="w-[90%] mx-auto py-2 border-b-2">
  //               <h1 className="mb-2 font-bold text-lg">
  //                 {i + 1}번 주문 {new Date(date).toLocaleTimeString()}
  //               </h1>
  //               {orders.map((arr) => {
  //                 total += arr.price * arr.count;
  //                 return (
  //                   <p key={i + "번"} className="flex justify-between">
  //                     <span className="block w-20 text-start">{arr.name} </span>
  //                     <span>{arr.count}개 </span>
  //                     <span className="text-blue-600 font-semibold">
  //                       {(arr.price * arr.count).toLocaleString()}원
  //                     </span>
  //                   </p>
  //                 );
  //               })}
  //             </div>
  //           );
  //         })}
  //       </div>
  //       <div>
  //         <p className="text-2xl font-bold mt-5">
  //           총 {total.toLocaleString()}원
  //         </p>
  //         <button
  //           onClick={() => {
  //             setDisplayPayment(true);
  //           }}
  //           className="w-1/2 h-8 bg-emerald-200 rounded-full mt-3"
  //         >
  //           결제하기
  //         </button>
  //       </div>
  //       <Modal open={displayPayment} onClose={() => setDisplayPayment(false)}>
  //         <List data={data} callback={() => setDisplayPayment(false)} />
  //       </Modal>
  //     </div>
  //   );
  // }
  // return <h1>주문 목록이 없습니다.</h1>;
};

export default OrderList;
