import React, { useEffect, useState, useContext } from "react";
import { ObjectAntwort } from './ServerCom';
import { AuthKontext } from "./LoginSystem";
import NavNach from "./NavNach";
import NavVor from "./NavVor";

export const Rezept = () => {
    const [rezept, setRezept] = useState([]);
    const { userNumber,erlaubnis } = useContext(AuthKontext);

    const abrufList = () => {
        ObjectAntwort(`/rezept/abruf/alle`,
            (res) => {
                setRezept(res);
            },
            (fehler) => {
                console.log(fehler);
            }
        );
    };

    useEffect(() => {
        abrufList();
    }, []);

    return (
    <>
    {erlaubnis === true ? <NavNach /> : <NavVor />}
        <div className="rezeptListe">
            {rezept.length > 0 ? (
                rezept.map((item) => (
                    <div key={item.rezeptNumber} className="rezeptItem">
                        <h2 className="rezeptHeader">{item.rezeptHeader}</h2>
                        <p className="rezeptText">{item.rezeptInhalt1}</p>
                        <p className="rezeptText">{item.rezeptInhalt2}</p>
                        <p className="rezeptText">{item.rezeptInhalt3}</p>
                        <p className="rezeptText">{item.rezeptInhalt4}</p>
                        <p className="rezeptText">{item.rezeptInhalt5}</p>
                        {item.rezeptVideo && (
                            <div className="videoContainer">
                                <video controls width="100%">
                                    <source src={item.rezeptVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>Problem</p>
            )}
        </div>
        </>
    );
};

export default Rezept;
