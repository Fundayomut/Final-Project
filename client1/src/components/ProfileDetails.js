import React, { useEffect } from 'react'
import { useState } from 'react';
import { AuthKontext } from './LoginSystem';
import { TextAntwort } from './ServerCom';
import { useContext } from 'react';


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
  postalCode,
  country,
  password
}) => {
     
    const [userUpFirstName,setUserUpFirstName]=useState(userFirstName);
    const [userUpLastName,setUserUpLastName]=useState(userLastName);
    const [userUpNickName,setUserUpNickname]=useState(userNickName);
    const [eMailUp,setEmailUp]=useState(eMail);
    const [passwordUp,setPasswordUp]=useState(password);
    const [adresLine1Up,setAdresLine1Up]=useState(adresLine1);
    const [adresLine2Up,setAdresLine2Up]=useState(adresLine2);
    const [cityUp,setCityUp]=useState(city);
    const [stateUp,setStateUp]=useState(state);
    const [postalCodeUp,setPostalCodeUp]=useState(postalCode);
    const [phoneUp,setPhoneUp]=useState(phone);
    const [countryUp,setCountryUp]=useState(country);
    const [userTypeUp,setUserTypeUp]=useState(0);

    const {userNumber}=useContext(AuthKontext);

    useEffect(() => {
        setUserUpNickname(userNickName);
        setUserUpFirstName(userFirstName);
        setUserUpLastName(userLastName);
        setEmailUp(eMail);
        setPasswordUp(password);
        setAdresLine1Up(adresLine1 || '');
        setAdresLine2Up(adresLine2 || '');
        setCityUp(city || '');
        setStateUp(state || '');
        setPostalCodeUp(postalCode || '');
        setPhoneUp(phone || '');
        setCountryUp(country || '');
    }, [userNickName, userFirstName, userLastName, eMail, phone, adresLine1, adresLine2, city, state, postalCode, country, password]);


    const updatePerson=()=>{
        TextAntwort(`/user/update/${userNumber}/${userUpNickName}/${userUpFirstName}/${userUpLastName}/${userTypeUp}/${eMailUp}/${phoneUp}/${adresLine1Up}/${adresLine2Up}/${cityUp}/${stateUp}/${postalCodeUp}/${countryUp}/${passwordUp}`,
            (res)=>{
                console.log("Hinzugefuged",res)
            },
            (fehler)=>{
                console.log(fehler)
            }
        ) 
      }
          
  return (
    <>
    <tr>
       <td><input type='text' defaultValue={userNickName} onKeyUp={(e)=>setUserUpNickname(e.target.value)}/></td> 
       <td><input  type='text' defaultValue={userFirstName} onKeyUp={(e)=>setUserUpFirstName(e.target.value)}/></td> 
       <td><input type='text' defaultValue={userLastName} onKeyUp={(e)=>setUserUpLastName(e.target.value)}/></td> 
       <td><input  type='email' defaultValue={eMail} onKeyUp={(e)=>setEmailUp(e.target.value)}/></td> 
       <td><input  type='phone' defaultValue={phone} onKeyUp={(e)=>setPhoneUp(e.target.value)}/></td> 
       <td><input  type='text' defaultValue={adresLine1} onKeyUp={(e)=>setAdresLine1Up(e.target.value)}/></td> 
       <td><input  type='text' defaultValue={adresLine2} onKeyUp={(e)=>setAdresLine2Up(e.target.value)}/></td> 
       <td><input  type='text' defaultValue={city} onKeyUp={(e)=>setCityUp(e.target.value)}/></td> 
       <td><input  type='text' defaultValue={state} onKeyUp={(e)=>setStateUp(e.target.value)}/></td> 
       <td><input  type='text' defaultValue={postalCode} onKeyUp={(e)=>setPostalCodeUp(e.target.value)}/></td> 
       <td><input  type='text' defaultValue={country} onKeyUp={(e)=>setCountryUp(e.target.value)}/></td> 
       <td><input  type='password' defaultValue={password} onKeyUp={(e)=>setPasswordUp(e.target.value)}/></td> 
    </tr>
    <button onClick={updatePerson}>save change</button>
    </>
  )
}
