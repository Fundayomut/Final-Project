import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ObjectAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import NavNach from "./NavNach";
import NavVor from "./NavVor";
import { useContext } from "react";
import Modal from "./Modal";

export const CardDetails = () => {
  const { productNumber } = useParams();
  const { userNumber, erlaubnis } = useContext(AuthKontext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

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
    updateCartCount();
  }, []);

  const updateCartCount = () => {
    const warenkorb = localStorage.getItem("warenkorb")
      ? JSON.parse(localStorage.getItem("warenkorb"))
      : [];
    const totalItems = warenkorb.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  };

  const Aktualisieren = () => {

    if (!erlaubnis) {
      setShowModal(true);
      return;}

      const neueDetails = {
      productNumber: productNumber,
      quantity: quantity,
      price: product?.price,
      size: product?.size,
      image: product?.image,
      name: product?.name,
      userNumber:userNumber,
    };

    let warenkorb = localStorage.getItem("warenkorb")
      ? JSON.parse(localStorage.getItem("warenkorb"))
      : [];

    const existingItemIndex = warenkorb.findIndex(
      (item) => item.productNumber === productNumber
    );
    if (existingItemIndex >= 0) {
      warenkorb[existingItemIndex].quantity += quantity;
    } else {
      warenkorb.push(neueDetails);
    }

    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    updateCartCount();
  };

  return (
    <>
      {erlaubnis === true ? <NavNach /> : <NavVor />}
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
              <div className="card-detail-rechts-description">
                <p>{product.size} Person</p>
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
              <div className="card-detail-warenkorb-link">
                <Link to="/Warenkorb">
                <img
              src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-12-512.png"
              width="25px"
              height="25px"
              alt="basket"
            />({cartCount})</Link>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Login Required</h2>
        <p>You need to log in to add items to the cart.</p>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </>
  );
};
/***Neu update carddetail***/