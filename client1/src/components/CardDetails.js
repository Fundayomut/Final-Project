import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ObjectAntwort,TextAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import { useContext } from "react";

export const CardDetails = () => {
  const { productNumber } = useParams();
  const { userNumber } = useContext(AuthKontext); 
  const [product, setProduct] = useState(null);
  const [orderDate,setOrderDate]=useState("");
  const [totalAmount,setTotalAmount]=useState(0);
  const [count,setCount]=useState(0);

console.log("user number--->",userNumber);

  useEffect(() => {
    ObjectAntwort(
      `/products/abruf/${productNumber}`,
      (res) => {
        setProduct(res[0]);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  }, [productNumber]);

  useEffect(()=>{
    const today = new Date().toISOString().split('T')[0];
    setOrderDate(today)
  },[])
    


  const newOrder=()=>{
  const newCount = count +1

    TextAntwort(`/order/neu/${userNumber}/${orderDate}/${totalAmount}`,
        (res)=>{
            console.log("Hinzugefuged",res)
           setCount(newCount)
           setTotalAmount(newCount);
        },
        (fehler)=>{
            console.log(fehler)
        }
    ) 
    //navi("/Login") gehe nach bag
}

  return (
    <div>
      <div className="card-detail-main">
        {product ? (
          <>
            <div className="card-detail-link">
              <img src={product.image} alt={product.name} width="100%" />
            </div>
            <div className="card-detail-rechts">
              <div className="card-detail-rechts-header">
                <h1>{product.name}</h1>
              </div>
              <div className="card-detail-rechts-description">
                <p>{product.description}</p>
              </div>
              <div className="card-detail-rechts-button">
                <button onClick={newOrder} className="rezeptbutton">Add to Bag</button>
              </div>
              <div><h1>{count}</h1></div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
