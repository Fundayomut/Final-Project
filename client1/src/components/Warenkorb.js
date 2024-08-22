import React from 'react'
import { ObjectAntwort } from './ServerCom';
import { useState,useEffect } from 'react';

const Warenkorb = () => {
    const [orderList, setOrderList] = useState([]);

    const orderListAbruf = () => {
      ObjectAntwort(
        `/orders/abruf/alle`,
        (res) => {
          setOrderList(res);
          console.log(res);
        },
        (fehler) => {
          console.log(fehler);
        }
      );
    };

useEffect(()=>{
orderListAbruf()
},[])

  return (
    <div>
        {orderList.map((item)=>(
            <div key={item.orderNumber}>
            <p><b>order Number</b> {item.orderNumber}</p>
            <p><b>user Number</b>{item.userNumber}</p>
            <p><b>order date</b>{item.orderDate}</p>
            <p><b>total amount</b>{item.totalAmount}</p>
            </div>
        ))}
    </div>
  )
}

export default Warenkorb