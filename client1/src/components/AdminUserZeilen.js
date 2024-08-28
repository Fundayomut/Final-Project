import React, { useContext, useEffect, useState } from 'react'
import { AuthKontext } from './LoginSystem';
import { TextAntwort } from './ServerCom';


const AdminUserZeilen = ({data}) => {
    const{userNumber}=useContext(AuthKontext);

  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[nickName,setNickName]=useState("");
  const[type,setType]=useState("");
  const[eMail,setEMail]=useState("");
  const[phone,setPhone]=useState("");
  const[adresLine1,setAdresLine1]=useState("");
  const[adresLine2,setAdresLine2]=useState("");
  const[city,setCity]=useState("");
  const[state,setState]=useState("");
  const[postalCode,setPostalCode]=useState("");
  const[country,setCountry]=useState("");
  const[password,setPassword]=useState("");
  const[status,setStatus]=useState(false);

  
  const bearbeiten=()=>{
    TextAntwort(
      `/user/update/${userNumber}/${nickName}/${firstName}/${lastName}/${type}/${eMail}/${phone}/${adresLine1}/${adresLine2}/${city}/${state}/${postalCode}/${country}/${password}`
      ,
      (antwort)=>{
        console.log("user update",antwort);
        setStatus(false);
      },
      (fehler)=>{
        console.log(fehler)
      }
    );
  }

  const HandleStatusTrue=()=>{
    setStatus(true);
}


function entfernen(){
TextAntwort(
    `/user/delete/${userNumber}`,
    (antwort)=>{
        console.log(antwort);
    },
    (fehler)=>{
        console.log(fehler);
    }
)
}

  useEffect(()=>{
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
  },[data])

  return (
    <>
    {!status?(
        <tbody>   
                        <tr>
                            <td >{nickName}</td>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{type}</td>
                            <td>{eMail}</td>
                            <td>{phone}</td>
                            <td>{adresLine1}</td>
                            <td>{adresLine2}</td>
                            <td>{city}</td>
                            <td>{state}</td>
                            <td>{postalCode}</td>
                            <td>{country}</td>
                            <td>{password}</td>
                            <td style={{border:"none"}}><button className='button' onClick={HandleStatusTrue}>Edit</button></td>
                            <td style={{border:"none"}}><button  className='button'onClick={entfernen}>Delete</button></td>
                        </tr>
                </tbody>
    ):(
        <tr>
            
        </tr>
    )}
   
                </> 

  )
}

export default AdminUserZeilen

/*
<td><input type='text' value={nickName} onChange={(e)=>setNickName(e.target.value)}/></td>
            <td><input type='text' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/></td>
            <td><input type='text' value={lastName} onChange={(e)=>setLastName(e.target.value)}/></td>
            <td><input type='number' value={type} onChange={(e)=>setType(e.target.value)}/></td>
            <td><input type='email' value={eMail} onChange={(e)=>setEMail(e.target.value)}/></td>
            <td><input type='number' value={phone} onChange={(e)=>setPhone(e.target.value)}/></td>
            <td><input type='text' value={adresLine1} onChange={(e)=>setAdresLine1(e.target.value)}/></td>
            <td><input type='text' value={adresLine2} onChange={(e)=>setAdresLine2(e.target.value)}/></td>
            <td><input type='text' value={city} onChange={(e)=>setCity(e.target.value)}/></td>
            <td><input type='text' value={state} onChange={(e)=>setState(e.target.value)}/></td>
            <td><input type='number' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}/></td>
            <td><input type='text' value={country} onChange={(e)=>setCountry(e.target.value)}/></td>
            <td><input type='text' value={password} onChange={(e)=>setPassword(e.target.value)}/></td>
            <td><button onClick={bearbeiten}>Change</button></td>
            <td><button onClick={entfernen}>Delete</button></td>
*/