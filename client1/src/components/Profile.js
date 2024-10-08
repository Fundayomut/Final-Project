import React, { useState, useContext, useEffect } from "react";
import { TextAntwort, ObjectAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import { ProfileDetails } from "./ProfileDetails";
import NavNach from "./NavNach";
import NavVor from "./NavVor";

const Profile = () => {
  // Zustand für die Benutzerdaten
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userNickName, setUserNickname] = useState("");
  const [eMail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adresLine1, setAdresLine1] = useState("");
  const [adresLine2, setAdresLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [userType, setUserType] = useState(0);

  // Kontext für Authentifizierung und Benutzerinformationen
  const { userNumber, erlaubnis } = useContext(AuthKontext);

  // Effekt zum Abrufen der Benutzerdaten bei der Initialisierung
  useEffect(() => {
    ObjectAntwort(
      `/user/abruf/wer/${userNumber}`, // API-Endpunkt zum Abrufen der Benutzerdaten
      (res) => {
        // Erfolgsrückruf: Daten in den Zustand setzen
        setUserNickname(res[0].userNickName);
        setUserFirstName(res[0].userFirstName);
        setUserLastName(res[0].userLastName);
        setEmail(res[0].eMail);
        setPassword(res[0].password);
        setAdresLine1(res[0].adresLine1);
        setAdresLine2(res[0].adresLine2);
        setCity(res[0].city);
        setState(res[0].state);
        setPostalCode(res[0].postalcode);
        setPhone(res[0].phone);
        setCountry(res[0].country);
        setUserType(res[0].userType);
      },
      (fehler) => {
        // Fehlerbehandlung: Fehlerprotokollierung
        console.log(fehler);
      }
    );
  }, [userNumber]); // Abhängigkeit: wird erneut ausgeführt, wenn sich 'userNumber' ändert

  return (
    <>
      {erlaubnis === true ? <NavNach /> : <NavVor />}
      <div className="profile-container">
        <ProfileDetails
          userNickName={userNickName}
          userFirstName={userFirstName}
          userLastName={userLastName}
          eMail={eMail}
          phone={phone}
          adresLine1={adresLine1}
          adresLine2={adresLine2}
          city={city}
          state={state}
          postalcode={postalcode}
          country={country}
          password={password}
          userType={userType}
        />
      </div>
    </>
  );
};

export default Profile;
