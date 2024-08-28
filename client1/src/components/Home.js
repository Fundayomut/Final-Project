import React, { useContext, useEffect, useState } from "react";
import NavNach from "./NavNach";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { NavVor } from "./NavVor";
import { TextAntwort, ServerCom } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import { ObjectAntwort } from "./ServerCom";
import AdminNav from "./AdminNav";

function Home() {
  const { erlaubnis, userNumber, userType } = useContext(AuthKontext);
  const [productList, setProductList] = useState([]);

  const fetchProductList = () => {
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
    fetchProductList();
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
    if (userType === 1) {
      NavComponent = <AdminNav />;
    } else if (userType === 0) {
      NavComponent = <NavNach productList={productList} />;
    }
  } else {
    NavComponent = <NavVor productList={productList} />;
  }

  return (
    <div>
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
          <div className="homebuttondiv">
            <Link to="/rezept">
              <button className="rezeptbutton">Rezept</button>
            </Link>
            <Link to="/Products">
              <button className="orderbutton">Order Now</button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
