import React, { createContext, useState } from "react";
import { ObjectAntwort } from "./ServerCom";

const AuthKontext = createContext();

const AuthDienst = ({ children }) => {
    const [erlaubnis, setErlaubnis] = useState(false);
    const [userType, setUserType] = useState(0);
    const [eMail, setEMail] = useState("");
    const [password, setPassword] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [userName,setUserName]=useState("")

    async function login() {
        return new Promise((resolve, reject) => {
            ObjectAntwort(
                `/login/${eMail}/${password}`,
                (antwort) => {
                    if (typeof antwort === "object" && antwort.id) {
                        setErlaubnis(true);
                        setUserType(antwort.kt);
                        setUserNumber(antwort.id);
                        setUserName(antwort.vn);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                (fehler) => {
                    console.error(fehler);
                    resolve(false);
                }
            );
        });
    }

    function logout() {
        setErlaubnis(false);
        setUserType(0);
        setEMail("");
        setPassword("");
        setUserName("");
    }

    return (
        <AuthKontext.Provider value={{ erlaubnis, userType, userNumber, eMail, password,userName, setEMail, setPassword, login, logout }}>
            {children}
        </AuthKontext.Provider>
    );
};

export { AuthDienst, AuthKontext };
