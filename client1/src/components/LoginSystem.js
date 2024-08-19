import React, {createContext,useState} from "react";
import {ObjectAntwort} from "./ServerCom";


const AuthKontext = createContext();

const AuthDienst=({children})=>{
    const [erlaubnis,setErlaubnis]=useState(false);
    const [userType,setUserType]=useState(0);
    const [eMail,setEMail]=useState("");
    const [password,setPassword]=useState("");
    const [userNumber,setUserNumber]=useState("");

    function login(){
        ObjectAntwort(
            `/login/${eMail}/${password}`,
            (antwort)=>{
                if(typeof antwort==="object")
                {
                    if(antwort.id)
                    {
                        setErlaubnis(true);
                        setUserType(antwort.kt);
                        setUserNumber(antwort.id);
                    }
                }
            },
            (fehler)=>console.error(fehler)
        );
    }
    function logout()
    {
        setErlaubnis(false);
        setUserType(0);
        setEMail("");
        setPassword("");
    }
    return(
        <AuthKontext.Provider value={{erlaubnis,userType,userNumber,eMail,password,setEMail,setPassword,login,logout}}>
            {children}
        </AuthKontext.Provider>
    )
};


export {AuthDienst,AuthKontext};