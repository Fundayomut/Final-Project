import React, { useContext, useEffect, useState } from "react";
import { TextAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";

const Favorites = ({ productNumber }) => {
  const { userNumber } = useContext(AuthKontext);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (userNumber && productNumber) {
      TextAntwort(
        `/favorites/status/${userNumber}/${productNumber}`,
        (res) => {
          setFavorite(res === "1");
        },
        (fehler) => {
          console.log(fehler);
        }
      );
    }
  }, [userNumber, productNumber]);

  const handleFavorites = () => {
    const newFavorite = !favorite;
    setFavorite(newFavorite);

    // Güncellenmiş favori durumu localStorage'a kaydet
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (userNumber) {
      if (newFavorite) {
        storedFavorites[userNumber] = storedFavorites[userNumber] || {};
        storedFavorites[userNumber][productNumber] = true;
      } else {
        if (storedFavorites[userNumber]) {
          delete storedFavorites[userNumber][productNumber];
          if (Object.keys(storedFavorites[userNumber]).length === 0) {
            delete storedFavorites[userNumber];
          }
        }
      }
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    }

    // Sunucu tarafında güncelle
    TextAntwort(
      `/favorites/update/${userNumber}/${productNumber}/${newFavorite ? 1 : 0}`,
      (res) => {
        console.log("Favoritenstatus erfolgreich aktualisiert", res);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  };

  return (
    <div className="cardratio">
      <div onClick={handleFavorites}>
        {favorite ? (
          <img
            src="https://cdn4.iconfinder.com/data/icons/essentials-65/64/Essentials-40-64.png"
            width="40%"
            alt="favorited"
          />
        ) : (
          <img
            src="https://cdn1.iconfinder.com/data/icons/app-user-interface-line/64/like_love_heart_app_user_interface-64.png"
            width="40%"
            alt="not-favorited"
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;
