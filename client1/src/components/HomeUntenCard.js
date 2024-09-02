import React, { useEffect, useState, useContext } from "react";
import { ObjectAntwort } from "./ServerCom";
import { Link } from "react-router-dom";
import { AuthKontext } from "./LoginSystem";
import Favorites from "./Favorites";

const HomeUntenCard = () => {
  const [productList, setProductList] = useState([]);
  const targetProductNumbers = [29, 17, 5]; //Target Productnumbers

  // Funktion zum Abrufen der Produktliste
  const abrufList = () => {
    ObjectAntwort(
      `/products/abruf/alle`,
      (res) => {
        // Filtert die Produkte, um nur die gewünschten zu behalten
        const filteredProducts = res.filter((product) =>
          targetProductNumbers.includes(product.productNumber)
        );
        setProductList(filteredProducts);
        console.log(filteredProducts);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  };

  useEffect(() => {
    // Ruft die Produktliste beim Laden der Komponente ab
    abrufList();
  }, []);

  return (
    <>
      <div className="homeUntenCard-Container">
        <div>
          <p className="homeUntenCard-header">
            Best selling products of the week
          </p>
        </div>
        {productList.length > 0 ? (
          <div className="prodLiniemain">
            {productList.map((item) => (
              <div className="prodLiniecard" key={item.productNumber}>
                <Favorites productNumber={item.productNumber} item={item} />
                <div className="cardimage">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", borderRadius: "12px" }}
                  />
                </div>
                <div className="cardheadtext">
                  <p>{item.name}</p>
                </div>
                <div className="cardtext">{item.description}</div>
                <div className="cardbuttondiv">
                  <Link to={`/Products/${item.productNumber}`}>
                    <button className="rezeptbutton">Details</button>
                  </Link>
                </div>
                <div className="cardfooter">
                  <p>Lieferung in 3 Tagen</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Problem</p>
        )}
      </div>
    </>
  );
};

export default HomeUntenCard;
