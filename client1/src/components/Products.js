import React, { useEffect, useState, useContext } from "react";
import { ObjectAntwort } from "./ServerCom";
import { Link } from "react-router-dom";
import NavNach from "./NavNach";
import NavVor from "./NavVor";
import { AuthKontext } from "./LoginSystem";
import Favorites from "./Favorites";

export const Products = () => {
  const [productList, setProductList] = useState([]);
  const { userNumber,erlaubnis } = useContext(AuthKontext);



  const abrufList = () => {
    ObjectAntwort(
      `/products/abruf/alle`,
      (res) => {
        setProductList(res);
        console.log(res);
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
     {erlaubnis === true ? <NavNach productList={productList} /> : <NavVor productList={productList}/>}
    <div>
      <div className="productcategorie">
        <Link to="/Products/ProductsCategorie/Boutique">
          <p>Boutique-Kuchen</p>
        </Link>
        <Link to="/Products/ProductsCategorie/Hochzeit">
          <p>Hochzeits und Verlobungstorten</p>
        </Link>
        <Link to="/Products/ProductsCategorie/Bild">
          <p>Figure Kuchen</p>
        </Link>
      </div>
      {productList.length > 0 ? (
        <div className="prodLiniemain">
          {productList.map((item) => (
            <div className="prodLiniecard" key={item.productNumber}>
              <Favorites
              productNumber={item.productNumber}
              userNumber={userNumber}
              />
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
                <Link
                  to={`/Products/${item.productNumber}`}>
                  <button className="rezeptbutton" >Details</button>
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