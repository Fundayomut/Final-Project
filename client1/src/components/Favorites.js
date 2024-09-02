import React, { useContext, useEffect, useState } from "react";
import { TextAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";

const Favorites = ({ productNumber, item }) => {
  const { userNumber, erlaubnis } = useContext(AuthKontext); // AuthKontext auslesen, um die Benutzer-Nummer und die Erlaubnis zu erhalten
  const [favorite, setFavorite] = useState(false); // Zustand für die Favoriten

  useEffect(() => {
    if (!erlaubnis) {
      // Wenn keine Erlaubnis vorhanden ist, Favoriten auf false setzen
      setFavorite(false);
      return;
    }

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {}; // Favoriten aus dem localStorage abrufen
    if (
      userNumber &&
      storedFavorites[userNumber] &&
      storedFavorites[userNumber][productNumber]
    ) {
      setFavorite(true); // Wenn das Produkt bereits in den Favoriten ist, den Zustand auf true setzen
    } else if (userNumber && productNumber) {
      // Wenn das Produkt nicht in den Favoriten ist, den Status vom Server überprüfen
      TextAntwort(
        `/favorites/status/${userNumber}/${productNumber}`,
        (res) => {
          const isFavorite = res === "1";
          setFavorite(isFavorite); // Den Zustand basierend auf der Antwort des Servers setzen

          if (isFavorite) {
            // Wenn das Produkt ein Favorit ist, es im localStorage speichern
            storedFavorites[userNumber] = storedFavorites[userNumber] || {};
            storedFavorites[userNumber][productNumber] = item; //  // Hier wird das Produkt gespeichert
          } else {
            // Wenn das Produkt kein Favorit ist, es aus dem localStorage entfernen
            if (storedFavorites[userNumber]) {
              delete storedFavorites[userNumber][productNumber];
              if (Object.keys(storedFavorites[userNumber]).length === 0) {
                delete storedFavorites[userNumber]; // Den Benutzer löschen, wenn keine Favoriten mehr vorhanden sind
              }
            }
          }
          localStorage.setItem("favorites", JSON.stringify(storedFavorites)); // Die aktualisierten Favoriten im localStorage speichern
        },
        (fehler) => {
          console.log(fehler); // Fehlerbehandlung
        }
      );
    }
  }, [userNumber, productNumber, erlaubnis, item]); // Der Effekt hängt von der Benutzer-Nummer, der Produkt-Nummer, der Erlaubnis und dem Produkt ab

  const handleFavorites = (e) => {
    e.preventDefault();

    if (!erlaubnis) {
      // Wenn keine Erlaubnis vorhanden ist, eine Warnung anzeigen
      alert("Bitte loggen Sie sich ein, um Favoriten hinzuzufügen.");
      return;
    }

    const newFavorite = !favorite; // Den neuen Favoritenstatus umkehren
    setFavorite(newFavorite);

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {}; // Favoriten aus dem localStorage abrufen
    if (userNumber) {
      // Wenn es ein neuer Favorit ist, im localStorage speichern
      if (newFavorite) {
        storedFavorites[userNumber] = storedFavorites[userNumber] || {};
        storedFavorites[userNumber][productNumber] = item; // Hier wird das Produkt gespeichert
      } else {
        // Wenn es kein Favorit mehr ist, aus dem localStorage entfernen
        if (storedFavorites[userNumber]) {
          delete storedFavorites[userNumber][productNumber];
          if (Object.keys(storedFavorites[userNumber]).length === 0) {
            delete storedFavorites[userNumber]; // Den Benutzer löschen, wenn keine Favoriten mehr vorhanden sind
          }
        }
      }
      localStorage.setItem("favorites", JSON.stringify(storedFavorites)); // Die aktualisierten Favoriten im localStorage speichern
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
