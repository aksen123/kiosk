import { Order, OrderList } from "@/types/serivce";
import { Data } from "../api/order/route";

interface ListProps {
  data: Order[];
  callback: (total?: number) => void;
}

const List = ({ data, callback }: ListProps) => {
  let total = 0;
  if (data && data.length > 0) {
    return (
      <div className="w-full h-full py-[.5rem] flex flex-col items-center justify-between gap-5">
        <h1 className="font-semibold text-2xl">주문 목록</h1>
        <div className="overflow-y-auto w-full h-[300px]">
          {data.map(({ date, order }, i) => {
            const orders: OrderList[] = JSON.parse(order);
            return (
              <div
                key={i}
                className="w-[90%] py-2 border-b-2 mx-auto text-center"
              >
                <h1 className="mb-2 font-bold text-lg">
                  {i + 1}번 주문 {new Date(date).toLocaleTimeString()}
                </h1>
                {orders.map((arr) => {
                  total += arr.price * arr.count;
                  return (
                    <p
                      key={i + "번"}
                      className="flex items-center justify-between"
                    >
                      <span className="block w-20 text-start">{arr.name} </span>
                      <span>{arr.count}개 </span>
                      <span className="text-blue-600 font-semibold">
                        {(arr.price * arr.count).toLocaleString()}원
                      </span>
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-3xl font-bold my-5 text-blue-600">
            총 {total.toLocaleString()}원
          </p>
          <button
            onClick={() => {
              callback(total);
            }}
            className="w-full h-8 bg-emerald-200 rounded-full"
          >
            결제하기
          </button>
        </div>
      </div>
    );
  }
  return <h1>주문 목록이 없습니다.</h1>;
};

export default List;
