import React, { useEffect, useState } from 'react';
import { TextAntwort } from './ServerCom';

const AdminUserZeilen = ({ data }) => {
  const userNumber = data.userNumber;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [type, setType] = useState("");
  const [eMail, setEMail] = useState("");
  const [phone, setPhone] = useState("");
  const [adresLine1, setAdresLine1] = useState("");
  const [adresLine2, setAdresLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  const bearbeiten = () => {
    TextAntwort(
      `/user/update/${userNumber}/${nickName}/${lastName}/${firstName}/${type}/${eMail}/${phone}/${adresLine1}/${adresLine2}/${city}/${state}/${postalCode}/${country}/${password}`,
      (antwort) => {
        console.log("user update", antwort);
        setStatus(false);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  };

  const HandleStatusTrue = () => {
    setStatus(true);
  };

  const entfernen = () => {
    TextAntwort(
      `/user/delete/${userNumber}`,
      (antwort) => {
        console.log(antwort);
        window.location.reload();
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  };

  useEffect(() => {
    setFirstName(data.userFirstName);
    setLastName(data.userLastName);
    setNickName(data.userNickName);
    setType(data.userType);
    setEMail(data.eMail);
    setPhone(data.phone);
    setAdresLine1(data.adresLine1);
    setAdresLine2(data.adresLine2);
    setCity(data.city);
    setState(data.state);
    setPostalCode(data.postalcode);
    setCountry(data.country);
    setPassword(data.password);
  }, [data]);

  return (
    <div className="admin-user-card-div">
      {!status ? (
        <>
          <div className="admin-user-card-header">
            <p>{nickName}</p>
            <p>{firstName} {lastName}</p>
            <p>Password: {password}</p>
          </div>
          <div className="admin-user-card-adres">
            <p><span style={{fontWeight:"bold", color:"gray"}}>Type:</span>{type}</p>
            <p><span style={{fontWeight:"bold", color:"gray"}}>Email: </span>{eMail}</p>
            <p><span style={{fontWeight:"bold", color:"gray"}}>Phone:</span>{phone}</p>
            <p><span style={{fontWeight:"bold", color:"gray"}}>Address:</span>{adresLine1} {adresLine2}</p>
          </div>
          <div className="admin-user-card-adres2">
            <p><span style={{fontWeight:"bold", color:"gray"}}>City:</span>{city}</p>
            <p><span style={{fontWeight:"bold", color:"gray"}}>State:</span>{state}</p>
            <p><span style={{fontWeight:"bold", color:"gray"}}>Postal Code: </span>{postalCode}</p>
            <p><span style={{fontWeight:"bold", color:"gray"}}>Country: </span>{country}</p>

          </div>
          <div className='admin-user-zeilen-input-button'>
            <button className='button' onClick={HandleStatusTrue}>Edit</button>
            <button className='button' onClick={entfernen}>Delete</button>
          </div>
        </>
      ) : (
        <div className='admin-user-zeilen-input'>
         <div className='admin-user-zeilen-input-main'>
          <div className='admin-user-zeilen-input-label'>
         <label>Nick Name</label>
          <p><input type='text' value={nickName} onChange={(e) => setNickName(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label>First Name</label>
          <p><input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label style={{marginRight:"127px"}}>Last Name</label>
          <p><input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label style={{marginLeft:"0px"}}>User Type</label>
          <p><input type='number' value={type} onChange={(e) => setType(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label>Password</label>
          <p><input type='text' value={password} onChange={(e) => setPassword(e.target.value)} /></p>
          </div>
          </div>

          <div className='admin-user-zeilen-input-main'>
          <div className='admin-user-zeilen-input-label'>
          <label>E-mail</label>
          <p><input type='email' value={eMail} onChange={(e) => setEMail(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label>Telephone</label>
          <p><input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label>Adres1</label>
          <p><input type='text' value={adresLine1} onChange={(e) => setAdresLine1(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label>Adres2</label>
          <p><input type='text' value={adresLine2} onChange={(e) => setAdresLine2(e.target.value)} /></p>
          </div>
          </div>

          <div className='admin-user-zeilen-input-main'>
          <div className='admin-user-zeilen-input-label'>
          <label>City</label>
          <p><input type='text' value={city} onChange={(e) => setCity(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label>State</label>
          <p><input type='text' value={state} onChange={(e) => setState(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label>Postal Code</label>
          <p><input type='number' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} /></p>
          </div>
          <div className='admin-user-zeilen-input-label'>
          <label>Country</label>
          <p><input type='text' value={country} onChange={(e) => setCountry(e.target.value)} /></p>
          </div>
          </div>
          <div className='admin-user-zeilen-input-button'>
          <p><button className='button' onClick={bearbeiten}>Change</button></p>
          <p><button className='button' onClick={entfernen}>Delete</button></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserZeilen;
