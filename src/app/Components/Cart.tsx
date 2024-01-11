'use client'
import React from 'react'
import { cartState } from '../atoms/cart-atom'
import { useRecoilState } from 'recoil'
import { foodApi } from '@/service/foodApi'
import api from '@/service/axios'

const Cart = () => {
  
  const [cartList, setCartList] = useRecoilState(cartState)


  if(cartList.length > 0){
    return (
      <div>
        <h1 className="font-semibold text-2xl">장바구니</h1>
        {
         cartList.map(el =>( 
          <div key={el.number}>
          <p>{el.name}</p>
          <p>{el.count}</p>
          </div>
        ))
        }
        <button onClick={()=>{
          console.log(cartList)
          foodApi.order(cartList)
        }}>주문하기</button>
      </div>
    )
  }
}

export default Cart
