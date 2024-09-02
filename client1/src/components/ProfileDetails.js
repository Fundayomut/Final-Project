import React, { useState, useContext, useEffect } from "react";
import { TextAntwort } from "./ServerCom"; // Funktion zum Senden von Textantworten an den Server
import { AuthKontext } from "./LoginSystem"; // Kontext für Authentifizierung und Benutzerinformationen
import Modal from "./Modal"; // Modal-Komponente für Erfolg- und Fehlermeldungen

export const ProfileDetails = ({
  userNickName,
  userFirstName,
  userLastName,
  eMail,
  phone,
  adresLine1,
  adresLine2,
  city,
  state,
  postalcode,
  country,
  password,
  userType,
}) => {
  // Zustand für die bearbeitbaren Benutzerdaten
  const [userUpFirstName, setUserUpFirstName] = useState(userFirstName);
  const [userUpLastName, setUserUpLastName] = useState(userLastName);
  const [userUpNickName, setUserUpNickName] = useState(userNickName);
  const [eMailUp, setEmailUp] = useState(eMail);
  const [passwordUp, setPasswordUp] = useState(password);
  const [adresLine1Up, setAdresLine1Up] = useState(adresLine1);
  const [adresLine2Up, setAdresLine2Up] = useState(adresLine2);
  const [cityUp, setCityUp] = useState(city);
  const [stateUp, setStateUp] = useState(state);
  const [postalCodeUp, setPostalCodeUp] = useState(postalcode);
  const [phoneUp, setPhoneUp] = useState(phone);
  const [countryUp, setCountryUp] = useState(country);
  const [userTypeUp, setUserTypeUp] = useState(0); // Zustand für den Benutzertyp
  const { userNumber } = useContext(AuthKontext); // Benutzerkontext für die Benutzer-ID

  const [showSuccessModal, setShowSuccessModal] = useState(false); // Zustand für die Erfolg-Modalanzeige
  const [showErrorModal, setShowErrorModal] = useState(false); // Zustand für die Fehler-Modalanzeige

  // Effekt zum Initialisieren der Zustandwerte mit den übergebenen Requisiten
  useEffect(() => {
    setUserUpNickName(userNickName || "");
    setUserUpFirstName(userFirstName || "");
    setUserUpLastName(userLastName || "");
    setEmailUp(eMail || "");
    setPasswordUp(password || "");
    setAdresLine1Up(adresLine1 || "");
    setAdresLine2Up(adresLine2 || "");
    setCityUp(city || "");
    setStateUp(state || "");
    setPostalCodeUp(postalcode || "");
    setPhoneUp(phone || "");
    setCountryUp(country || "");
  }, [
    userNickName,
    userFirstName,
    userLastName,
    eMail,
    phone,
    adresLine1,
    adresLine2,
    city,
    state,
    postalcode,
    country,
    password,
  ]);

  // Funktion zum Aktualisieren der Benutzerdaten auf dem Server
  const updatePerson = () => {
    TextAntwort(
      `/user/update/${userNumber}/${userUpNickName}/${userUpFirstName}/${userUpLastName}/${userTypeUp}/${eMailUp}/${phoneUp}/${adresLine1Up}/${adresLine2Up}/${cityUp}/${stateUp}/${postalCodeUp}/${countryUp}/${passwordUp}`,
      (res) => {
        console.log("Updated successfully", res);
        setShowSuccessModal(true); // Erfolg-Modal anzeigen
      },
      (fehler) => {
        console.log(fehler);
        setShowErrorModal(true); // Fehler-Modal anzeigen
      }
    );
  };

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-item">
        <label>User Name:</label>
        <input
          type="text"
          value={userUpNickName}
          onChange={(e) => setUserUpNickName(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>First Name:</label>
        <input
          type="text"
          value={userUpFirstName}
          onChange={(e) => setUserUpFirstName(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>Last Name:</label>
        <input
          type="text"
          value={userUpLastName}
          onChange={(e) => setUserUpLastName(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>E-Mail:</label>
        <input
          type="email"
          value={eMailUp}
          onChange={(e) => setEmailUp(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>Phone:</label>
        <input
          type="text"
          value={phoneUp}
          onChange={(e) => setPhoneUp(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>Password:</label>
        <input
          type="password"
          value={passwordUp}
          onChange={(e) => setPasswordUp(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>Address Line 1:</label>
        <input
          type="text"
          value={adresLine1Up}
          onChange={(e) => setAdresLine1Up(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>Address Line 2:</label>
        <input
          type="text"
          value={adresLine2Up}
          onChange={(e) => setAdresLine2Up(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>City:</label>
        <input
          type="text"
          value={cityUp}
          onChange={(e) => setCityUp(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>State:</label>
        <input
          type="text"
          value={stateUp}
          onChange={(e) => setStateUp(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>Postal Code:</label>
        <input
          type="text"
          value={postalCodeUp}
          onChange={(e) => setPostalCodeUp(e.target.value)}
        />
      </div>
      <div className="profile-edit-item">
        <label>Country:</label>
        <input
          type="text"
          value={countryUp}
          onChange={(e) => setCountryUp(e.target.value)}
        />
      </div>
      <button onClick={updatePerson} className="update-button">
        Update
      </button>
      <Modal show={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <h2>Successfull!</h2>
        <p>User information has been updated successfully.</p>
        <button
          className="schlissen-button"
          onClick={() => setShowSuccessModal(false)}
        >
          Kapat
        </button>
      </Modal>

      <Modal show={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <h2>Error!</h2>
        <p>
          An error occurred while updating user information. Please try again.
        </p>
        <button
          className="schlissen-button"
          onClick={() => setShowErrorModal(false)}
        >
          Kapat
        </button>
      </Modal>
    </div>
  );
};
