import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ObjectAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";

export const CardDetails = () => {
  const { productNumber } = useParams();
  const { userNumber } = useContext(AuthKontext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

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

  const handleAddToCart = () => {
    const newCartItem = {
      userNumber: userNumber,
      productNumber: productNumber,
      quantity: quantity,
      price: product?.price,
      size: product?.size,
    };

    let warenkorb = localStorage.getItem("warenkorb")
      ? JSON.parse(localStorage.getItem("warenkorb"))
      : [];

    const existingItemIndex = warenkorb.findIndex(
      (item) =>
        item.productNumber === productNumber && item.userNumber === userNumber
    );

    if (existingItemIndex >= 0) {
      warenkorb[existingItemIndex].quantity += quantity;
    } else {
      warenkorb.push(newCartItem);
    }

    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
  };

  return (
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
              <button onClick={handleAddToCart} className="rezeptbutton">
                Add to Bag
              </button>
            </div>
            <div>
              <Link to="/Warenkorb">Go to Cart</Link>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
/***update******/