import React, { useEffect, useState } from "react";
import { ObjectAntwort } from "./ServerCom";
import AdminNav from "./AdminNav";
import "./Admin.css";
import AdminUserZeilen from "./AdminUserZeilen";

export const AdminUserList = () => {
  // State für die Benutzerliste initialisieren
  const [userList, setUserList] = useState([]);

  // Benutzerdaten vom Server abrufen
  const abrufUserList = () => {
    ObjectAntwort(
      `/user/abruf/alle`,
      (res) => {
        setUserList(res); //Erfolgreich: Benutzerliste speichern
        console.log(res); // Erfolg: Benutzerliste anzeigen
      },
      (fehler) => {
        console.log(fehler); // Fehler: Fehlermeldung anzeigen
      }
    );
  };

  // Benutzerdaten beim Laden der Komponente abrufen
  useEffect(() => {
    abrufUserList(); // Beim Laden der Komponente Benutzerdaten abrufen
  }, []);

  return (
    <div className="admin-user-main-div">
      <div className="admin-user-nav-div">
        <AdminNav />
      </div>
      <div>
        {typeof userList === "object" && userList.length > 0 ? (
          // Wenn Benutzer vorhanden sind, Liste der Benutzerzeilen anzeigen
          userList.map((item) => (
            <AdminUserZeilen key={item.userNumber} data={item} />
          ))
        ) : (
          <p>Keine Datei</p> // Wenn keine Benutzerdaten vorhanden sind
        )}
      </div>
    </div>
  );
};
