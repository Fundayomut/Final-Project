import React from "react";

export default function Home() {
  return (
    <div className="homemain">
      <div className="hauptdiv">
        <div className="paragrafdiv">
          <p style={{ marginTop: "70px" }}>Sie träumen es, </p>
          <p style={{ marginLeft: "150px" }}>wir machen es...</p>
        </div>
        <div className="maindiv">
          <img className="homecake"
            src="https://www.pngall.com/wp-content/uploads/5/Cake-PNG-File-Download-Free.png"
            width="420px"
            height="420px"
            style={{position:"absolute",top:"20%", left:"63%"}}
          />
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Cake-PNG-File-Download-Free.png"
            width="400px"
            height="400px"
            style={{position:"absolute", top:"20%", left:"63%"}}
          />
        </div>
      </div>
      <div className="homebuttonmaindiv">
        <div class="homebuttondiv">
          <button className="rezeptbutton">Rezept</button>
          <button className="orderbutton">Order Now</button>
        </div>
      </div>
    </div>
  );
}
