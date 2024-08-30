import React, { useContext, useEffect,useState } from "react";
import NavNach from "./NavNach";
import Footer from "./Footer";
import Rezept from "./Rezept";
import { Link } from "react-router-dom";
import { NavVor } from "./NavVor";
import { TextAntwort, ServerCom } from "./ServerCom";
import { LoginSystem, AuthDienst, AuthKontext } from "./LoginSystem";
import { ObjectAntwort } from "./ServerCom";
 
function Home() {
  const { erlaubnis, userNumber, logout, userType } = useContext(AuthKontext);
  const [productList, setProductList] = useState([]);
 
 
  const abrufList = () => {
    ObjectAntwort(
      `/products/abruf/alle`,
      (res) => {
        setProductList(res);
        console.log(res);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  };
 
  useEffect(() => {
    abrufList();
  }, []);
 
 
  useEffect(() => {
    if (userNumber)
      TextAntwort(
        `/userLastName/${userNumber}`,
        (antwort) => console.log(antwort),
        (fehler) => console.log(fehler)
      );
  }, [userNumber]);
 
 
  return (
    <div>
      {erlaubnis === true ? (
        <>
          <NavNach productList={productList} />
          <div className="homemain">
            <div className="hauptdiv">
              <div className="paragrafdiv">
                <p className="homeptop">Sie träumen es, </p>
                <p className="homebottom">wir machen es...</p>
              </div>
              <div className="maindiv">
                <img
                  className="homecakeblur"
                  src="https://www.pngall.com/wp-content/uploads/5/Cake-PNG-File-Download-Free.png"
                  width="420px"
                  height="420px"
                  alt="homecakeblur"
                />
                <img
                  className="homecake"
                  src="https://www.pngall.com/wp-content/uploads/5/Cake-PNG-File-Download-Free.png"
                  width="400px"
                  height="400px"
                  alt="homecake"
                />
              </div>
            </div>
            <div className="homebuttonmaindiv">
              <div class="homebuttondiv">
                <button className="rezeptbutton gross-button">Rezept</button>
                <Link to="/Products"><button className="orderbutton gross-button">Order Now</button></Link>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <NavVor productList={productList}/>
          <div className="homemain">
            <div className="hauptdiv">
              <div className="paragrafdiv">
                <p className="homeptop">Sie träumen es, </p>
                <p className="homebottom">wir machen es...</p>
              </div>
              <div className="maindiv">
                <img
                  className="homecakeblur"
                  src="https://www.pngall.com/wp-content/uploads/5/Cake-PNG-File-Download-Free.png"
                  width="420px"
                  height="420px"
                  alt="homecakeblur"
                />
                <img
                  className="homecake"
                  src="https://www.pngall.com/wp-content/uploads/5/Cake-PNG-File-Download-Free.png"
                  width="400px"
                  height="400px"
                  alt="homecake"
                />
              </div>
            </div>
            <div className="homebuttonmaindiv">
              <div class="homebuttondiv">
              <Link to="/rezept">
                  <button className="rezeptbutton gross-button">Rezept</button>
                </Link>
                <Link to="/Products"><button className="orderbutton gross-button">Order Now</button></Link>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
 
export default Home;