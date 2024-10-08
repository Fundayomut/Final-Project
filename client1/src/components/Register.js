import React, { useState, useEffect } from "react";
import { TextAntwort } from "./ServerCom"; // Funktion zum Senden von Textantworten an den Server
import { useNavigate } from "react-router-dom"; // Hook zum Navigieren zwischen Seiten
import { Link } from "react-router-dom"; // Link-Komponente für Navigation

export const Register = () => {
  // Zustand für die Benutzereingaben
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userNickName, setUserName] = useState("");
  const [eMail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(0); // Standardmäßig 0 (normaler Benutzer)

  const navi = useNavigate(); // Navigationsfunktion

  // Funktion zum Erstellen eines neuen Benutzers
  const newPerson = () => {
    // Überprüfen, ob alle erforderlichen Felder ausgefüllt sind
    if (
      userFirstName !== "" &&
      userLastName !== "" &&
      userNickName !== "" &&
      eMail !== "" &&
      password !== ""
    ) {
      TextAntwort(
        `/user/register/${userNickName}/${userFirstName}/${userLastName}/${eMail}/${password}/${userType}`,
        (res) => {
          console.log("Hinzugefuged", res);
        },
        (fehler) => {
          console.log(fehler);
        }
      );
      navi("/Login"); // Bei erfolgreicher Registrierung zur Login-Seite weiterleiten
    } else {
      alert("Markierte Felder müssen ausgefüllt werden"); // Warnung, wenn Felder leer sind
    }
  };

  return (
    <div className="loginmaindiv">
      <div className="logincontainer">
        <div className="loginbuttondiv"></div>
        <div className="logininnencontainer">
          <form className="loginform">
            <label>*First Name</label>
            <input
              className="input"
              type="text"
              placeholder="Max"
              onChange={(e) => setUserFirstName(e.target.value)}
              onKeyUp={(e) => setUserFirstName(e.target.value)}
            />
            <br />
            <label>*Last Name</label>
            <input
              className="input"
              type="text"
              placeholder="Musterman"
              onChange={(e) => setUserLastName(e.target.value)}
              onKeyUp={(e) => setUserLastName(e.target.value)}
            />
            <br />
            <label>*Nick Name</label>
            <input
              className="input"
              type="text"
              placeholder="MaxMan"
              onChange={(e) => setUserName(e.target.value)}
              onKeyUp={(e) => setUserName(e.target.value)}
            />
            <br />
            <label>*E-Mail</label>
            <input
              className="input"
              type="text"
              placeholder="max@beispiel.com"
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>*Password</label>
            <input
              className="input"
              type="password"
              placeholder="*******"
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="loginbuttondiv">
              <button className="blackbutton" type="submit" onClick={newPerson}>
                REGISTER
              </button>
            </div>
            <Link to="/">
              <p>Without registering on the home page</p>
            </Link>
          </form>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>or Login with</p>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <img
              src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-64.png"
              width="10%"
            />
            <img
              src="https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/1227/X-64.png"
              width="10%"
            />
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/instagram_icon-instagram_buttoninstegram-64.png"
              width="10%"
            />
            <img
              src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-64.png"
              width="10%"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "15px",
          }}
        >
          <p>Don`t have an account?</p>
          <p style={{ color: "rgb(250, 65, 241)" }}>REGISTER</p>
        </div>
      </div>
    </div>
  );
};

/*   <div className="loginmaindiv">
    <div className="logincontainer">
    <div className="loginbuttondiv">
        <button className="button">REGISTER</button>
        </div> 
    <div className="logininnencontainer">
    <form className="loginform" onSubmit={(e)=>LoginVersuch(e)}>
        <label >Username</label>
        <input className="input" type="text"
        placeholder="max@beispiel.com"
        onChange={(e)=>setEMail(e.target.value)}
        onKeyUp={(e)=>setEMail(e.target.value)}/>
        <br/>
        <label>Password</label>
        <input className="input" type="text"
        placeholder="***********"
        onChange={(e)=>setPassword(e.target.value)}
        onKeyUp={(e)=>setPassword(e.target.value)}/>
        <br/>
        <div className="loginbuttondiv">
        <button className="blackbutton" type="submit">LOGIN</button>
        </div>
    </form>
        </div>
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
            <p>or Login with</p>
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
            <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-64.png" width="10%"/>
            <img src="https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/1227/X-64.png" width="10%" />
            <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/instagram_icon-instagram_buttoninstegram-64.png" width="10%"/>
            <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-64.png" width="10%" />
            </div>
        </div>
        <div style={{display:"flex",alignItems:"center", flexDirection:"column",marginTop:"15px"}}>
            <p>Don`t have an account?</p>
            <p style={{color:"rgb(250, 65, 241)"}}>REGISTER</p>
        </div>

    </div>
    </div>*/
