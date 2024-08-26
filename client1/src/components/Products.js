import React, { useEffect, useState, useContext } from "react";
import { ObjectAntwort } from "./ServerCom";
import { Link } from "react-router-dom";
import NavNach from "./NavNach";
import NavVor from "./NavVor";
import { AuthKontext } from "./LoginSystem";

export const Products = () => {
  const [productList, setProductList] = useState([]);
  const { userNumber,erlaubnis } = useContext(AuthKontext);
  const [favorites,setFavorites]=useState([]);


  const handleFavorites = (productNumber) => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (currentFavorites.includes(productNumber)) {
      const updatedFavorites = currentFavorites.filter(item => item !== productNumber);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...currentFavorites, productNumber];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };


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
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
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
              <div className="cardratio">
                <div onClick={(e)=>handleFavorites(item.productNumber)}>
                  {favorites.includes(item.productNumber)?<img src="https://cdn4.iconfinder.com/data/icons/essentials-65/64/Essentials-40-64.png" width="40%"/>
                  : <img src="https://cdn1.iconfinder.com/data/icons/app-user-interface-line/64/like_love_heart_app_user_interface-64.png" width="40%"/>} 
                </div>
                <p>stern</p>
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