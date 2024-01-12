import React from 'react'
import { orderListState } from '../atoms/orderList-atom'
import { useRecoilState } from 'recoil'
const OrderList = () => {

  const [list, setList] = useRecoilState(orderListState)
  console.log('order list >>> ',list)
  let total = 0
  if(list.length > 0) {
    return (
      <div>
        <h1 className="font-semibold text-2xl">주문 목록</h1>
      {
        list.map((list,i) =>{
         return <div key={i}>
          <h1>{i+1}번 주문</h1>
          {list.map((arr) =>{
            total += arr.price * arr.count
            return (
              <p>
              <span>{arr.name}  </span>
              <span>{arr.count}개  </span>
              <span>{(arr.price * arr.count).toLocaleString()}원</span>
              </p>
            )
          })}
         </div>
        })
      }
      <p className='text-xl font-medium mt-5'>총 {total.toLocaleString()}원</p>
      </div>
  )
}
return <h1>주문 목록이 없습니다.</h1>
}

export default OrderList
