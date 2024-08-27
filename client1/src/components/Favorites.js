import React, { useContext, useEffect, useState } from "react";
import { TextAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";

const Favorites = ({ productNumber }) => {
  const { userNumber, erlaubnis } = useContext(AuthKontext);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!erlaubnis) {
      setFavorite(false);
      return;
    }

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (userNumber && storedFavorites[userNumber] && storedFavorites[userNumber][productNumber]) {
      setFavorite(true);
    } else if (userNumber && productNumber) {
     
      TextAntwort(
        `/favorites/status/${userNumber}/${productNumber}`,
        (res) => {
          const isFavorite = res === "1";
          setFavorite(isFavorite);

          if (isFavorite) {
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
        },
        (fehler) => {
          console.log(fehler);
        }
      );
    }
  }, [userNumber, productNumber, erlaubnis]);

  const handleFavorites = (e) => {
  e.preventDefault();

  if (!erlaubnis) {
    alert("Bitte loggen Sie sich ein, um Favoriten hinzuzufügen.");
    return;
  }

  const newFavorite = !favorite;
  setFavorite(newFavorite);

  // Ürün bilgilerini al
  const productInfo = {
    image: "https://example.com/path/to/image.jpg", // Ürünün gerçek resim URL'si
    name: "Product Name", // Ürünün gerçek adı
    description: "Product description" // Ürünün gerçek açıklaması
  };

  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
  if (userNumber) {
    if (newFavorite) {
      storedFavorites[userNumber] = storedFavorites[userNumber] || {};
      storedFavorites[userNumber][productNumber] = productInfo;
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
