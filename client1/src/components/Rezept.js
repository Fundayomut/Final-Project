import React, { useEffect, useState, useContext } from "react";
import { ObjectAntwort } from "./ServerCom"; // Funktion zum Abrufen von Objekten vom Server
import { AuthKontext } from "./LoginSystem"; // Kontext für Authentifizierungsdaten
import NavNach from "./NavNach"; // Navigation für authentifizierte Benutzer
import NavVor from "./NavVor"; // Navigation für nicht authentifizierte Benutzer

export const Rezept = () => {
  // Zustand für die Rezeptliste
  const [rezept, setRezept] = useState([]);
  const { userNumber, erlaubnis } = useContext(AuthKontext); // Zugriff auf Authentifizierungsdaten aus dem Kontext

  // Funktion zum Abrufen der Rezeptliste
  const abrufList = () => {
    ObjectAntwort(
      `/rezept/abruf/alle`,
      (res) => {
        setRezept(res); // Rezeptliste im Zustand speichern
      },
      (fehler) => {
        console.log(fehler); // Fehlerprotokollierung
      }
    );
  };

  // useEffect-Hook zum Abrufen der Rezeptliste bei der ersten Komponente-Montage
  useEffect(() => {
    abrufList();
  }, []);

  // Funktion zur Umwandlung eines YouTube-Links in einen eingebetteten Link
  const getYouTubeEmbedLink = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    const videoId = urlParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <>
      {erlaubnis === true ? <NavNach /> : <NavVor />}
      <div className="rezeptListe">
        {rezept.length > 0 ? (
          rezept.map((item) => (
            <div key={item.rezeptNumber} className="rezeptItem">
              <h2 className="rezeptHeader">{item.rezeptHeader}</h2>
              <p className="rezeptText">{item.rezeptInhalt1}</p>
              <p className="rezeptText">{item.rezeptInhalt2}</p>
              <p className="rezeptText">{item.rezeptInhalt3}</p>
              <p className="rezeptText">{item.rezeptInhalt4}</p>
              <p className="rezeptText">{item.rezeptInhalt5}</p>
              {item.rezeptVideo && (
                <div className="videoContainer">
                  <iframe
                    width="100%"
                    height="315"
                    src={getYouTubeEmbedLink(item.rezeptVideo)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Problem</p>
        )}
      </div>
    </>
  );
};

export default Rezept;
