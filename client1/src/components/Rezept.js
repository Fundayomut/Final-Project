import React, { useEffect, useState } from 'react';
import { ObjectAntwort } from './ServerCom';

export const Rezept = () => {
    const [rezept, setRezept] = useState([]);

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
    );
};

export default Rezept;
