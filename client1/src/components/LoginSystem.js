import React, { createContext, useState } from "react";
import { ObjectAntwort } from "./ServerCom";

// Erstellen des AuthKontext für die Authentifizierung
const AuthKontext = createContext();

const AuthDienst = ({ children }) => {
  const [erlaubnis, setErlaubnis] = useState(false); // Zustand für die Berechtigung des Benutzers
  const [userType, setUserType] = useState(0); // Zustand für den Benutzertyp (z.B. Admin, Benutzer)
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userName, setUserName] = useState("");

  // Funktion zur Anmeldung des Benutzers
  async function login() {
    return new Promise((resolve, reject) => {
      ObjectAntwort(
        `/login/${eMail}/${password}`,
        (antwort) => {
          // Wenn die Antwort ein gültiges Objekt mit ID enthält
          if (typeof antwort === "object" && antwort.id) {
            setErlaubnis(true); // Berechtigung auf true setzen
            setUserType(antwort.kt); // Benutzertyp setzen
            setUserNumber(antwort.id); // Benutzer-ID setzen
            setUserName(antwort.vn); // Benutzername setzen
            resolve(true); // Erfolgreiche Anmeldung
          } else {
            resolve(false); // Fehlgeschlagene Anmeldung
          }
        },
        (fehler) => {
          console.error(fehler); // Fehler in der Konsole ausgeben
          resolve(false); // Fehlgeschlagene Anmeldung
        }
      );
    });
  }

  // Funktion zum Abmelden des Benutzers
  function logout() {
    setErlaubnis(false); // Berechtigung auf false setzen
    setUserType(0); // Benutzertyp zurücksetzen
    setEMail("");
    setPassword("");
    setUserName("");
  }

  return (
    <AuthKontext.Provider
      value={{
        erlaubnis,
        userType,
        userNumber,
        eMail,
        password,
        userName,
        setEMail,
        setPassword,
        login,
        logout,
      }}
    >
      {children}
    </AuthKontext.Provider>
  );
};

export { AuthDienst, AuthKontext };
