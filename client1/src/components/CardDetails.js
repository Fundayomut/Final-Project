import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ObjectAntwort } from "./ServerCom";

export const CardDetails = () => {
  const { productNumber } = useParams();
  const [product, setProduct] = useState(null);

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
              <div className="card-detail-rechts-size">
                <div className="card-detail-size-select">
                  <p>10 Person</p>
                  <p>Small</p>
                </div>
                <div className="card-detail-size-select">
                  <p>10 Person</p>
                  <p>Medium</p>
                </div>
                <div className="card-detail-size-select">
                  <p>10 Person</p>
                  <p>Large</p>
                </div>
              </div>
              <div className="card-detail-rechts-button">
                <button className="rezeptbutton">Add to Bag</button>
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
