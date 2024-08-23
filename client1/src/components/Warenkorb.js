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
                <button onClick={() => removeItemFromCart(item.productNumber)}>
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
  );
};

export default Warenkorb;

