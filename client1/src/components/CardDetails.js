import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ObjectAntwort, TextAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import { useContext } from "react";
//import { useNavigate } from "react-router-dom";

export const CardDetails = () => {
  const { productNumber } = useParams();
  const { userNumber } = useContext(AuthKontext);
  const [product, setProduct] = useState(null);
  const [orderDate, setOrderDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  //const navi = useNavigate()

  console.log("user number--->", userNumber);

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

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setOrderDate(today);
  }, []);

  const Aktualisieren = () => {
    const neueDetails = {
      productNumber: productNumber,
      quantitiy: totalAmount,
      price: product?.price,
      size: product?.size,
    };
    let warenkorb =
      localStorage.getItem("warenkorb") === null ||
      localStorage.getItem("warenkorb") === ""
        ? []
        : JSON.parse(localStorage.getItem("warenkorb"));
    warenkorb.push(neueDetails);
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    setCartItems(warenkorb);
  };

  return (
    <div>
      <div>
        <div className="cart-section">
          <h2 className="cart-header">Ihre Warenkorb</h2>
          {cartItems.length > 0 ? (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-details">
                    <p>
                      <strong>Product Number :</strong> {item.productNumber}
                    </p>
                    <p>
                      <strong>Quantity :</strong> {totalAmount}
                    </p>
                    <p>
                      <strong> Per Stück Price :</strong> {item.price} €
                    </p>
                    <p>
                      <strong>Size :</strong> {item.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Es befinden sich keine Artikel in Ihrem Warenkorb.</p>
          )}
        </div>
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
                <input
                  type="number"
                  placeholder="Anzahl"
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                />
              </div>
              <div className="card-detail-rechts-button">
                <button onClick={Aktualisieren} className="rezeptbutton">
                  Add to Bag
                </button>
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
