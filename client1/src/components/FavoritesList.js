import React, { useState, useEffect, useContext } from "react";
import { AuthKontext } from "./LoginSystem";
import { Link } from "react-router-dom";
import Favorites from "./Favorites";
import NavNach from "./NavNach";
import NavVor from "./NavVor";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const { userNumber, erlaubnis } = useContext(AuthKontext); // Benutzer-Nummer und Erlaubnis aus dem AuthKontext

  useEffect(() => {
    if (!erlaubnis || !userNumber) return; // Wenn keine Erlaubnis oder keine Benutzer-Nummer vorhanden ist, wird nichts gemacht

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {}; // Favoriten aus dem localStorage abrufen
    const userFavorites = storedFavorites[userNumber] || {}; // Favoriten des Benutzers abrufen

    const favoriteList = Object.keys(userFavorites).map((productNumber) => ({
      productNumber,
      ...userFavorites[productNumber], // Jede Favoriten-Information zur Liste hinzufügen
    }));

    setFavorites(favoriteList); // Favoriten-Liste im Zustand speichern
  }, [userNumber, erlaubnis]); // Effekt hängt von der Benutzer-Nummer und der Erlaubnis ab

  if (!erlaubnis) {
    return <p>Please log in to view your favorites</p>; // Wenn der Benutzer nicht eingeloggt ist, wird eine Warnung angezeigt
  }

  return (
    <>
      {erlaubnis ? <NavNach /> : <NavVor />}
      {/* Zeigt NavNach an, wenn der Benutzer berechtigt ist, andernfalls wird NavVor angezeigt */}
      <div style={{ marginTop: "0px" }} className="card-favoritelist-main">
        <div className="favorite-header">Your Favorites</div>
        {favorites.length > 0 ? (
          <div className="prodLiniemain">
            {favorites.map((item) => (
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
          <p>You don't have any favorites yet.</p>
        )}
      </div>
    </>
  );
};

export default FavoritesList;
