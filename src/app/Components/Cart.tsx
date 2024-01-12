'use client'
import React from 'react'
import { cartSelect, cartState } from '../atoms/cart-atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { foodApi } from '@/service/foodApi'
import api from '@/service/axios'

const Cart = () => {
  
  // const [cartList, setCartList] = useRecoilState(cartState)
  const [cartList, setCartList] = useRecoilState(cartSelect)
  
  const handleCount = (count : number, i : number, num : number) =>{ 
    let newArr = [...cartList]
    newArr[i] = {...newArr[i], count : count + num < 1? 1  :  newArr[i].count + num}
    setCartList(newArr)
  }
  const deleteMenu =(i : number)=>{
    const newArr = [...cartList];
    newArr.splice(i,1)
    setCartList(newArr)
  }
  if(cartList.length > 0){
    return (
      <div>
        <h1 className="font-semibold text-2xl">장바구니</h1>
        {
         cartList.map((menu,i) =>( 
          <div key={menu.number} className='flex gap-3'>
            <span>{menu.name}</span>
            <span>
              {menu.count}
              </span>
            <div>
              <button onClick={()=>{
                handleCount(menu.count,i,1)
              }}>+</button>
              <button onClick={()=>{
                handleCount(menu.count,i,-1)
              }}>-</button>
              <button onClick={()=>{
                deleteMenu(i)
              }}>삭제</button>
            </div>
          </div>
        ))
        }
        <button onClick={()=>{
          foodApi.order(cartList)
          setCartList([])
        }}>주문하기</button>
      </div>
    )
  }
}

export default Cart
