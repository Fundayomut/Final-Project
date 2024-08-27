import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ObjectAntwort } from "./ServerCom";
import NavNach from "./NavNach";
import NavVor from "./NavVor";
import { AuthKontext } from "./LoginSystem";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Favorites from "./Favorites";

export const ProductsCategorie = () => {
  const [categorieList, setCategorieList] = useState([]);
  const { category } = useParams();
  const { userNumber, erlaubnis } = useContext(AuthKontext);

  const abrufList = () => {
    ObjectAntwort(
      `/products/abruf/category/${category}`,
      (res) => {
        setCategorieList(res);
        console.log("category list", res);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  };

  useEffect(() => {
    abrufList();
  }, []);

  return (
    <>
      {erlaubnis === true ? <NavNach /> : <NavVor />}
      <div>
        <div className="productcategorie">
          <p>
            {category === "Boutique" ? (
              <h2>Boutique-Kuchen</h2>
            ) : category === "Hochzeit" ? (
              <h2>Hochzeits und Verlobungstorten</h2>
            ) : category === "Bild" ? (
              <h2>Figure Kuchen</h2>
            ) : null}
          </p>
        </div>
        {categorieList.length > 0 ? (
          <div className="prodLiniemain">
            {categorieList.map((item) => (
              <div className="prodLiniecard" key={item.productNumber}>
                <div className="cardratio">
                <Favorites
              productNumber={item.productNumber}
              userNumber={userNumber}
              />
                </div>
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
