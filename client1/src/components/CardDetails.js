import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ObjectAntwort,TextAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import { useContext } from "react";
//import { useNavigate } from "react-router-dom";

export const CardDetails = () => {
  const { productNumber } = useParams();
  const { userNumber } = useContext(AuthKontext); 
  const [product, setProduct] = useState(null);
  const [orderDate,setOrderDate]=useState("");
  const [totalAmount,setTotalAmount]=useState(0);
  //const navi = useNavigate()

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
    TextAntwort(`/order/neu/${userNumber}/${orderDate}/${totalAmount}`,
        (res)=>{
            console.log("Hinzugefuged",res)
        },
        (fehler)=>{
            console.log(fehler)
        }
    ) 
    //navi("/Warenkorb") 
}

  return (
    <div>
      <div>
      <Link to="/Warenkorb"><img
              src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-12-512.png"
              width="25px"
              height="25px"
              alt="basket"
            /></Link>
      </div>
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
              <div>
                <input type="number" placeholder="Anzahl" onChange={(e)=>setTotalAmount(e.target.value)}/>
              </div>
              <div className="card-detail-rechts-button">
                <button onClick={newOrder} className="rezeptbutton">Add to Bag</button>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
