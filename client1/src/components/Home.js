import React from "react";
import NavNach from "./NavNach";
import Footer from "./Footer";
import Rezept from "./Rezept";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
    <NavNach/>
    <div className="homemain">
      <div className="hauptdiv">
        <div className="paragrafdiv">
          <p style={{ marginTop: "70px" }}>Sie träumen es, </p>
          <p style={{ marginLeft: "150px" }}>wir machen es...</p>
        </div>
        <div className="maindiv">
          <img className="homecakeblur"
            src="https://www.pngall.com/wp-content/uploads/5/Cake-PNG-File-Download-Free.png"
            width="420px"
            height="420px"
            alt="homecakeblur"
          />
          <img className="homecake"
            src="https://www.pngall.com/wp-content/uploads/5/Cake-PNG-File-Download-Free.png"
            width="400px"
            height="400px"
            alt="homecake"
          />
        </div>
      </div>
      <div className="homebuttonmaindiv">
        <div class="homebuttondiv">
          <Link to="/Rezept"><button className="rezeptbutton">Rezept</button></Link>

          <button className="orderbutton">Order Now</button>
        </div>
      </div>
    </div>
    <Footer/>

    </div>
  );
}
