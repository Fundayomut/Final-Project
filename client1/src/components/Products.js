import React, { useEffect, useState, useContext } from "react";
import { ObjectAntwort } from "./ServerCom";
import { Link } from "react-router-dom";
import NavNach from "./NavNach";
import NavVor from "./NavVor";
import { AuthKontext } from "./LoginSystem";
import Favorites from "./Favorites";

export const Products = () => {
  const [productList, setProductList] = useState([]); // Zustand für die Liste der Produkte
  const { userNumber, erlaubnis } = useContext(AuthKontext); // Zugriff auf Authentifizierungsstatus und Benutzer-ID

  // Funktion zum Abrufen der Produktliste von der Server-API
  const abrufList = () => {
    ObjectAntwort(
      `/products/abruf/alle`,
      (res) => {
        setProductList(res); // Setzen der Produktliste im Zustand
        console.log(res); // Ausgabe der Antwort im Konsolenprotokoll
      },
      (fehler) => {
        console.log(fehler); // Ausgabe von Fehlern im Konsolenprotokoll
      }
    );
  };

  useEffect(() => {
    abrufList(); // Abrufen der Produktliste beim ersten Rendern des Komponenten
  }, []);

  return (
    <>
      {/* Anzeige der Navigation basierend auf dem Authentifizierungsstatus */}
      {erlaubnis === true ? (
        <NavNach productList={productList} />
      ) : (
        <NavVor productList={productList} />
      )}
      <div>
        <div className="productcategorie">
          <Link to="/Products/ProductsCategorie/Boutique">
            <p className="products-categorie-head">Boutique-Kuchen</p>
          </Link>
          <Link to="/Products/ProductsCategorie/Hochzeit">
            <p className="products-categorie-head">
              Hochzeits und Verlobungstorten
            </p>
          </Link>
          <Link to="/Products/ProductsCategorie/Bild">
            <p className="products-categorie-head">Figure Kuchen</p>
          </Link>
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

/*commit*/
