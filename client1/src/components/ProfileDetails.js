import React from 'react'
import { useState } from 'react';
import { AuthKontext } from './LoginSystem';
import { TextAntwort } from './ServerCom';
import { useContext } from 'react';


export const ProfileDetails = () => {
     
    const [userFirstName,setUserFirstName]=useState();
    const [userLastName,setUserLastName]=useState();
    const [userNickName,setUserNickname]=useState();
    const [eMail,setEmail]=useState();
    const [password,setPassword]=useState();
    const [adresLine1,setAdresLine1]=useState();
    const [adresLine2,setAdresLine2]=useState();
    const [city,setCity]=useState();
    const [state,setState]=useState();
    const [postalCode,setPostalCode]=useState();
    const [phone,setPhone]=useState();
    const [country,setCountry]=useState();
    const [userType,setUserType]=useState();

    const {userNumber}=useContext(AuthKontext);


    const updatePerson=()=>{
        TextAntwort(`/user/update/${userNumber}/${userNickName}/${userFirstName}/${userLastName}/${userType}/${eMail}/${phone}/${adresLine1}/${adresLine2}/${city}/${state}/${postalCode}/${country}/${password}`,
            (res)=>{
                console.log("Hinzugefuged",res)
            },
            (fehler)=>{
                console.log(fehler)
            }
        ) 
      }
          
  return (
    <div>
        <p>userNickName</p>
        <input type='text' defaultValue={userNickName} onChange={(e)=>setUserNickname(e.target.value)}/>
        <br/>
        <p>userFirstName</p>
        <input  type='text' defaultValue={userFirstName} onChange={(e)=>setUserFirstName(e.target.value)}/>
        <br/>
        <p>userLastName</p>
        <input type='text' defaultValue={userLastName} onChange={(e)=>setUserLastName(e.target.value)}/>
        <br/>
        <p>userType</p>
        <input type='text' defaultValue={userType} onChange={(e)=>setUserType(e.target.value)}/>
        <br/>
        <p >eMail</p>
        <input  type='email' defaultValue={eMail} onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <p>phone</p>
        <input  type='phone' defaultValue={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <br/>
        <p>adresLine1</p>
        <input  type='text' defaultValue={adresLine1} onChange={(e)=>setAdresLine1(e.target.value)}/>
        <br/>
        <p>adresLine2</p>
        <input  type='text' defaultValue={adresLine2} onChange={(e)=>setAdresLine2(e.target.value)}/>
        <br/>
        <p>city</p>
        <input  type='text' defaultValue={city} onChange={(e)=>setCity(e.target.value)}/>
        <br/>
        <p>state</p>
        <input  type='text' defaultValue={state} onChange={(e)=>setState(e.target.value)}/>
        <br/>
        <p>postalCode</p>
        <input  type='text' defaultValue={postalCode} onChange={(e)=>setPostalCode(e.target.value)}/>
        <br/>
        <p>country</p>
        <input  type='text' defaultValue={country} onChange={(e)=>setCountry(e.target.value)}/>
        <br/>
        <p>password</p>
        <input  type='password' defaultValue={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br/>
        <button onClick={updatePerson}>save change</button>
    </div>
  )
}
