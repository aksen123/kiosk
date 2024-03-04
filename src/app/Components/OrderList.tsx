"use client";

import useSWR from "swr";
import { foodApi } from "@/service/foodApi";
import { paymentState } from "../atoms/payment-atom";
import { useRecoilState } from "recoil";
import Modal from "../modal/Modal";
import List from "./List";
interface Props {
  cb: () => void;
}
const OrderList = ({ cb }: Props) => {
  const { data, isLoading } = useSWR("/api/order", () => foodApi.orderList());
  const [displayPayment, setDisplayPayment] = useRecoilState(paymentState);
  const handlePayment = (total?: number) => {
    yesNo(
      "결제 하시겠습니까?",
      total?.toLocaleString() + "원",
      "결제하기",
      () => {
        foodApi
          .payment(process.env.NEXT_PUBLIC_TABLE_NO as string, total as number)
          .then(() =>
            alert("결제완료", () => {
              setDisplayPayment(false);
              cb();
            })
          );
      }
    );
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
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
              }}
              className="bg-white w-1/2 h-4/5"
            >
              <List data={data} callback={handlePayment} />
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default OrderList;
