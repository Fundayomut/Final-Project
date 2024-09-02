import React, { useState, useContext } from "react";
import { TextAntwort, ObjectAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";

export const UserProfile = () => {
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
  );

  const updatePerson = () => {
    TextAntwort(
      `/user/update/${userNumber}/${userNickName}/${userFirstName}/${userLastName}/${userType}/${eMail}/${phone}/${adresLine1}/${adresLine2}/${city}/${state}/${postalCode}/${country}/${password}`,
      (res) => {
        console.log("Hinzugefuged", res);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  };

  return (
    <>
      <table>
        <tr>
          <th style={{ border: "2px solid" }}>User Name</th>
          <th style={{ border: "2px solid" }}>First Name</th>
          <th style={{ border: "2px solid" }}>Last Name</th>
          <th style={{ border: "2px solid" }}>User Type</th>
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
          <td style={{ border: "1px solid" }}>{userType}</td>
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
        <tr>
          <td>
            <input
              type="text"
              defaultValue={userNickName}
              onChange={(e) => setUserNickname(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={userType}
              onChange={(e) => setUserType(e.target.value)}
            />
          </td>
          <td>
            <input
              type="email"
              defaultValue={eMail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </td>
          <td>
            <input
              type="phone"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={adresLine1}
              onChange={(e) => setAdresLine1(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={adresLine2}
              onChange={(e) => setAdresLine2(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={state}
              onChange={(e) => setState(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </td>
          <td>
            <input
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </td>
        </tr>
      </table>
      <button onClick={updatePerson}>save change</button>
    </>
  );
};
