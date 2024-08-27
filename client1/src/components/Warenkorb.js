import React, { useEffect, useState, useContext } from "react";
import { AuthKontext } from "./LoginSystem";
import { useNavigate, Link } from "react-router-dom";
import NavNach from "./NavNach";
import NavVor from "./NavVor";

const Warenkorb = () => {
  const { userNumber, erlaubnis } = useContext(AuthKontext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("warenkorb");
    if (storedCartItems) {
      const filteredCartItems = JSON.parse(storedCartItems).filter(
        (item) => item.userNumber === userNumber
      );
      setCartItems(filteredCartItems);
    }
  }, [userNumber]);

  useEffect(() => {
    // Toplam sepet tutarını hesapla ve localStorage'a kaydet
    const totalAmount = calculateTotalCartAmount();
    localStorage.setItem("totalAmount", totalAmount);
  }, [cartItems]); // cartItems değiştiğinde totalAmount güncellenecek

  if (!erlaubnis) {
    navigate("/login");
    return null;
  }

  const removeItemFromCart = (productNumber) => {
    let warenkorb = localStorage.getItem("warenkorb")
      ? JSON.parse(localStorage.getItem("warenkorb"))
      : [];
    warenkorb = warenkorb.filter(
      (item) =>
        !(
          item.productNumber === productNumber && item.userNumber === userNumber
        )
    );
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    setCartItems(warenkorb);
  };

  const quantityHöhen = (productNumber) => {
    let erhöhen = [...cartItems];
    const itemIndex = erhöhen.findIndex(
      (item) => item.productNumber === productNumber && item.userNumber === userNumber
    );
    if (itemIndex >= 0) {
      erhöhen[itemIndex].quantity += 1;
      setCartItems(erhöhen);
      localStorage.setItem("warenkorb", JSON.stringify(erhöhen));
    }
  };

  const quantityVerringern = (productNumber) => {
    let verringern = [...cartItems];
    const itemIndex = verringern.findIndex(
      (item) => item.productNumber === productNumber && item.userNumber === userNumber
    );
    if (itemIndex >= 0 && verringern[itemIndex].quantity > 1) {
      verringern[itemIndex].quantity -= 1;
      setCartItems(verringern);
      localStorage.setItem("warenkorb", JSON.stringify(verringern));
    }
  };

  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotalCartAmount = () => {
    return cartItems.reduce((total, item) => total + calculateTotalPrice(item.price, item.quantity), 0);
  };

  return (
    <>
    {erlaubnis === true ? <NavNach /> : <NavVor />}
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
                <p>
                  <b>{item.price} € </b>
                </p>
                <p>
                  <b>Total Price: {calculateTotalPrice(item.price, item.quantity)} € </b>
                </p>
              </div>
              <div className="cart-item-menge">
                <button className="btn-control" onClick={() => quantityHöhen(item.productNumber)}>+</button>
                <p style={{ marginTop: "15px" }}>{item.quantity} Stück</p>
                <button className="btn-control" onClick={() => quantityVerringern(item.productNumber)}>-</button>
              </div>
              <div className="cart-item-buttondiv">
                <button
                  className="remove-button"
                  onClick={() => removeItemFromCart(item.productNumber)}
                >
                  Delete
                </button>
                <Link to="/Zahlen">
                  <button className="zahlen-button">Zahlen</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Es befinden sich keine Artikel in Ihrem Warenkorb.</p>
      )}
    </div>
    </>
  );
};

export default Warenkorb;
