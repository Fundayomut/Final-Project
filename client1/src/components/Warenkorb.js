import React, { useEffect, useState, useContext } from "react";
import { AuthKontext } from "./LoginSystem";

const Warenkorb = () => {
  const { userNumber } = useContext(AuthKontext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("warenkorb");
    if (storedCartItems) {
      const filteredCartItems = JSON.parse(storedCartItems).filter(
        (item) => item.userNumber === userNumber
      );
      setCartItems(filteredCartItems);
    }
  }, [userNumber]);

  const removeItemFromCart = (productNumber) => {
    let warenkorb = localStorage.getItem("warenkorb")
      ? JSON.parse(localStorage.getItem("warenkorb"))
      : [];
    warenkorb = warenkorb.filter(
      (item) =>
        !(item.productNumber === productNumber && item.userNumber === userNumber)
    );
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    setCartItems(warenkorb);
  };

  return (
    <div className="cart-section">
      <h2 className="cart-header">Ihre Warenkorb</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt="Product" />
              </div>
              <div className="cart-item-details">
                <p>{item.name}</p>
                <p>{item.size} Person</p>
                <p><b>{item.price} € </b></p>
              </div>
              <div className="cart-item-menge">
              <p>{item.quantity} Stück</p>
              </div>
              <div className="cart-item-buttondiv">
              <button className="remove-button" onClick={() => removeItemFromCart(item.productNumber)}>
                 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Es befinden sich keine Artikel in Ihrem Warenkorb.</p>
      )}
    </div>
  );
};
export default Warenkorb;
