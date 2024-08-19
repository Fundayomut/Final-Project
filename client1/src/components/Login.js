import React,{useEffect,useContext} from "react";
import { AuthKontext } from "./LoginSystem";
import { useNavigate } from 'react-router-dom';

export default function Login()
{
    const geheZuZeite=useNavigate();
    const {setEMail,setPassword,erlaubnis,login}=useContext(AuthKontext);

    useEffect(()=>{
        if(erlaubnis)
            geheZuZeite("/")
    },[erlaubnis,geheZuZeite])
    
    function LoginVersuch(ErgebnisObject)
    {
        ErgebnisObject.preventDefault();
        login();
        geheZuZeite("/")
    }

    return(
        <>
        <div>
        <h3>Bitte melden sie sich an</h3>
        <form onSubmit={(e)=>LoginVersuch(e)}>
            <input type="text"
            placeholder="EMail"
            onChange={(e)=>setEMail(e.target.value)}
            onKeyUp={(e)=>setEMail(e.target.value)}/>
            <br/>
            <input type="text"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            onKeyUp={(e)=>setPassword(e.target.value)}/>
            <br/>
            <button type="submit">Anmelden</button>
        </form>
        </div>
        </>
    )
}


/*
<form onSubmit={(e)=>LoginVersuch(e)}>
            <input type="text"
            placeholder="Benutzername"
            onChange={(e)=>setEMail(e.target.value)}
            onKeyUp={(e)=>setEMail(e.target.value)}/>
            <br/>
            <input type="text"
            placeholder="Kennwort"
            onChange={(e)=>setPassword(e.target.value)}
            onKeyUp={(e)=>setPassword(e.target.value)}/>
            <br/>
            <button type="submit">Anmelden</button>
        </form>
*/