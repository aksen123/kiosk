'use client'
import React from 'react'
import { cartState } from '../atoms/cart-atom'
import { useRecoilState } from 'recoil'
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
      </div>
    )
  }
}

export default Cart
