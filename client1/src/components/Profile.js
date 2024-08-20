import React, { useState,useContext } from 'react'
import { TextAntwort,ObjectAntwort } from './ServerCom';
import { AuthKontext } from "./LoginSystem";
import { ProfileDetails } from './ProfileDetails';

const Profile = () => {

    
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
    const [userType,setUserType]=useState(0);

    const {userNumber}=useContext(AuthKontext);


    ObjectAntwort(`/user/abruf/wer/${userNumber}`,
        (res)=>{
            setUserNickname(res[0].userNickName)
            setUserFirstName(res[0].userFirstName)
            setUserLastName(res[0].userLastName)
            setEmail(res[0].eMail)
            setPassword(res[0].password)
            setAdresLine1(res[0].adresLine1)
            setAdresLine2(res[0].adresLine2)
            setCity(res[0].city)
            setState(res[0].state)
            setPostalCode(res[0].postalCode)
            setPhone(res[0].phone)
            setCountry(res[0].country)
            setUserType(res[0].userType)
        
        },
        (fehler)=>{
            console.log(fehler)
        }
    )

    

  return (
    <>
    <table>
        <tr >
        <th style={{border:"2px solid"}}>{userNickName}</th>
        <th style={{border:"2px solid"}}>{userFirstName}</th>
        <th style={{border:"2px solid"}}>{userLastName}</th>
        <th style={{border:"2px solid"}}>{eMail}</th>
        <th style={{border:"2px solid"}}>{phone}</th>
        <th style={{border:"2px solid"}}>{adresLine1}</th>
        <th style={{border:"2px solid"}}>{adresLine2}</th>
        <th style={{border:"2px solid"}}>{city}</th>
        <th style={{border:"2px solid"}}>{state}</th>
        <th style={{border:"2px solid"}}>{postalCode}</th>
        <th style={{border:"2px solid"}}>{country}</th>
        <th style={{border:"2px solid"}}>{password}</th>
        </tr>
    </table>
    <div>
        <ProfileDetails/>
    </div>
    </>
  )
}

export default Profile