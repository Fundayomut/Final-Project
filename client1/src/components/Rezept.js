import React, { useEffect, useState, useContext } from "react";
import { ObjectAntwort } from './ServerCom';
import { AuthKontext } from "./LoginSystem";
import NavNach from "./NavNach";
import NavVor from "./NavVor";

export const Rezept = () => {
    const [rezept, setRezept] = useState([]);
    const { userNumber, erlaubnis } = useContext(AuthKontext);

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

    const getYouTubeEmbedLink = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    };

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
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src={getYouTubeEmbedLink(item.rezeptVideo)}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
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
