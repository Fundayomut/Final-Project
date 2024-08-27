import React, { useState, useEffect, useContext } from "react";
import { AuthKontext } from "./LoginSystem";
import { Link } from "react-router-dom";
import Favorites from "./Favorites";
import NavNach from "./NavNach";
import NavVor from "./NavVor";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const { userNumber, erlaubnis } = useContext(AuthKontext);

  useEffect(() => {
    if (!erlaubnis || !userNumber) return;

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const userFavorites = storedFavorites[userNumber] || {};

    
    const favoriteList = Object.keys(userFavorites).map(productNumber => ({
      productNumber,
      ...userFavorites[productNumber]
    }));

    setFavorites(favoriteList);
  }, [userNumber, erlaubnis]);

  if (!erlaubnis) {
    return <p>Please log in to view your favorites</p>;
  }

  
  return (
    <>
    {erlaubnis === true ? <NavNach /> : <NavVor />}
    <div style={{marginTop:"0px"}} className="card-detail-main">
      <div className="productcategorie">Your Favorites</div>
      {favorites.length > 0 ? (
        <div className="prodLiniemain">
          {favorites.map((item) => (
            <div className="prodLiniecard" key={item.productNumber}>
              <Favorites productNumber={item.productNumber} userNumber={userNumber} />
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
                  <button className="rezeptbutton">Detaylar</button>
                </Link>
              </div>
              <div className="cardfooter">
                <p>Lieferung in 3 Tagen</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You don't have any favorites yet.</p>
      )}
    </div>
    </>
  );
};

export default FavoritesList;
