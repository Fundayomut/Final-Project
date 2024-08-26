import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ObjectAntwort, TextAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import { useContext } from "react";

export const CardDetails = () => {
  const { productNumber } = useParams();
  const { userNumber } = useContext(AuthKontext);
  const [product, setProduct] = useState(null);
  const [orderDate, setOrderDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
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

  useEffect(() => {
    const storedCartItems = localStorage.getItem("warenkorb");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const Aktualisieren = () => {
    const neueDetails = {
      productNumber: productNumber,
      quantity: quantity,
      price: product?.price,
      size: product?.size,
    };

    let warenkorb = localStorage.getItem("warenkorb")
      ? JSON.parse(localStorage.getItem("warenkorb"))
      : [];

    const existingItemIndex = warenkorb.findIndex(
      (item) => item.productNumber === productNumber
    );
    if (existingItemIndex >= 0) {
      warenkorb[existingItemIndex].quantity = quantity;
    } else {
      warenkorb.push(neueDetails);
    }

    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    setCartItems(warenkorb);
  };

  const removeItemFromCart = (productNumber) => {
    let warenkorb = localStorage.getItem("warenkorb")
      ? JSON.parse(localStorage.getItem("warenkorb"))
      : [];
    warenkorb = warenkorb.filter(
      (item) => item.productNumber !== productNumber
    );
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
                      <strong>Quantity :</strong> {item.quantity}
                    </p>
                    <p>
                      <strong> Per Stück Price :</strong> {item.price} €
                    </p>
                    <p>
                      <strong>Size :</strong> {item.size}
                    </p>
                    <button
                      onClick={() => removeItemFromCart(item.productNumber)}
                    >
                      Remove from Cart
                    </button>
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
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  value={quantity}
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
/***update******/