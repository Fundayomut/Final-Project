import React, { useState, useContext, useEffect } from "react";
import { TextAntwort, ObjectAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import { ProfileDetails } from "./ProfileDetails";

const Profile = () => {
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userNickName, setUserNickname] = useState();
  const [eMail, setEmail] = useState();
  const [password, setPassword] = useState();
  const [adresLine1, setAdresLine1] = useState();
  const [adresLine2, setAdresLine2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [postalCode, setPostalCode] = useState();
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const [userType, setUserType] = useState(0);

  const { userNumber } = useContext(AuthKontext);

  useEffect(()=>{
    ObjectAntwort(
      `/user/abruf/wer/${userNumber}`,
      (res) => {
        setUserNickname(res[0].userNickName);
        setUserFirstName(res[0].userFirstName);
        setUserLastName(res[0].userLastName);
        setEmail(res[0].eMail);
        setPassword(res[0].password);
        setAdresLine1(res[0].adresLine1);
        setAdresLine2(res[0].adresLine2);
        setCity(res[0].city);
        setState(res[0].state);
        setPostalCode(res[0].postalCode);
        setPhone(res[0].phone);
        setCountry(res[0].country);
        setUserType(res[0].userType);
      },
      (fehler) => {
        console.log(fehler);
      }
    )
  },[userNumber]);
 

  return (
    <>
      <table>
        <tr>
          <th style={{ border: "2px solid" }}>User Name</th>
          <th style={{ border: "2px solid" }}>First Name</th>
          <th style={{ border: "2px solid" }}>Last Name</th>
          <th style={{ border: "2px solid" }}>E-Mail</th>
          <th style={{ border: "2px solid" }}>Phone</th>
          <th style={{ border: "2px solid" }}>Adressline1</th>
          <th style={{ border: "2px solid" }}>Adressline2</th>
          <th style={{ border: "2px solid" }}>City</th>
          <th style={{ border: "2px solid" }}>State</th>
          <th style={{ border: "2px solid" }}>Postal Code</th>
          <th style={{ border: "2px solid" }}>Country</th>
          <th style={{ border: "2px solid" }}>Password</th>
        </tr>
        <tr>
          <td style={{ border: "1px solid" }}>{userNickName}</td>
          <td style={{ border: "1px solid" }}>{userFirstName}</td>
          <td style={{ border: "1px solid" }}>{userLastName}</td>
          <td style={{ border: "1px solid" }}>{eMail}</td>
          <td style={{ border: "1px solid" }}>{phone}</td>
          <td style={{ border: "1px solid" }}>{adresLine1}</td>
          <td style={{ border: "1px solid" }}>{adresLine2}</td>
          <td style={{ border: "1px solid" }}>{city}</td>
          <td style={{ border: "1px solid" }}>{state}</td>
          <td style={{ border: "1px solid" }}>{postalCode}</td>
          <td style={{ border: "1px solid" }}>{country}</td>
          <td style={{ border: "1px solid" }}>{password}</td>
        </tr>
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
          postalCode={postalCode}
          country={country}
          password={password}
        />
      </table>
      <div>
       
      </div>
    </>
  );
};

export default Profile;
