import React, { useContext, useEffect, useState } from "react";
import NavNach from "./NavNach";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { NavVor } from "./NavVor";
import { TextAntwort, ObjectAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import HomeUntenCard from "./HomeUntenCard";
import AdminNav from "./AdminNav";

function Home() {
  const { erlaubnis, userNumber, userType } = useContext(AuthKontext);
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
    if (userNumber) {
      TextAntwort(
        `/userLastName/${userNumber}`,
        (antwort) => console.log(antwort),
        (fehler) => console.log(fehler)
      );
    }
  }, [userNumber]);

  let NavComponent;

  if (erlaubnis) {
    NavComponent = userType === 1 ? <AdminNav /> : <NavNach productList={productList} />;
  } else {
    NavComponent = <NavVor productList={productList} />;
  }

  return (
    <>
      {NavComponent}
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
              width={erlaubnis ? "420px" : "200px"}
              height={erlaubnis ? "420px" : "200px"}
              alt="homecakeblur"
            />
            <img
              className="homecake"
              src="https://www.pngall.com/wp-content/uploads/5/Cake-PNG-File-Download-Free.png"
              width={erlaubnis ? "400px" : "200px"}
              height={erlaubnis ? "400px" : "200px"}
              alt="homecake"
            />
          </div>
        </div>
        <div className="homebuttonmaindiv">
          <div className="homebuttondiv">
            <Link to="/rezept">
              <button className="rezeptbutton gross-button">Rezept</button>
            </Link>
            <Link to="/Products">
              <button className="orderbutton gross-button">Order Now</button>
            </Link>
          </div>
        </div>
      </div>
      <HomeUntenCard />
      <Footer />
    </>
  );
}

export default Home;
