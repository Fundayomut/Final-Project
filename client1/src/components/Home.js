import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import NavNach from "./NavNach";
import Footer from "./Footer";
import { NavVor } from "./NavVor";
import { TextAntwort, ObjectAntwort } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import HomeUntenCard from "./HomeUntenCard";
import AdminNav from "./AdminNav";
import { useParams } from "react-router-dom";

function Home() {
  const { erlaubnis, userNumber, userType } = useContext(AuthKontext);
  const [productList, setProductList] = useState([]);
  const { category } = useParams();

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
    // Produktliste beim Laden der Komponente abrufen
    abrufList();
  }, [category]);

  useEffect(() => {
    // Benutzerinformationen abrufen, wenn eine Benutzer-ID vorhanden ist
    if (userNumber) {
      TextAntwort(
        `/userLastName/${userNumber}`,
        (antwort) => console.log(antwort),
        (fehler) => console.log(fehler)
      );
    }
  }, [userNumber]);

  let NavComponent;

  // Bestimmt, welche Navigationskomponente angezeigt wird
  if (erlaubnis) {
    NavComponent =
      userType === 1 ? <AdminNav /> : <NavNach productList={productList} />;
  } else {
    NavComponent = <NavVor productList={productList} />;
  }

  // React-Slick Slider-Einstellungen
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      {NavComponent}
      <div className="homemain">
        <div className="paragrafdiv">
          <p className="homeptop">
            <span>Sie träumen es,</span>
            <br />
            <span className="homebottom">wir machen es...</span>
          </p>
        </div>
        <div className="hauptdiv">
          <div className="slider-container">
            <Slider {...settings}>
              <div className="slide">
                <img
                  src="https://images.pexels.com/photos/16120256/pexels-photo-16120256/free-photo-of-gida-yemek-yiyecek-restoran.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Slide 1"
                  className="slide-image"
                />
                <div className="slide-content">
                  <h4>Sie träumen es,</h4>
                  <p>
                    Erleben Sie die süße Verwandlung von Träumen in köstliche
                    Realität. Unsere Cupcakes sind ein Fest für die Sinne.
                  </p>
                </div>
              </div>
              <div className="slide">
                <img
                  src="https://images.pexels.com/photos/25916370/pexels-photo-25916370/free-photo-of-plaka-tabak-cicekler-tac-yapraklar.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Slide 2"
                  className="slide-image"
                />
                <div className="slide-content">
                  <h4>Wir machen es...</h4>
                  <p>
                    Herzliche Vielfalt in jedem Bissen. Machen Sie Ihren
                    Liebsten eine Freude mit unseren sorgfältig zubereiteten
                    Kuchen.
                  </p>
                </div>
              </div>
              <div className="slide">
                <img
                  src="https://images.pexels.com/photos/14187989/pexels-photo-14187989.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt="Slide 3"
                  className="slide-image"
                />
                <div className="slide-content">
                  <h4>Entdecken Sie die Welt der Aromen</h4>
                  <p>
                    Begeben Sie sich mit unserem großen Kuchensortiment auf eine
                    unvergessliche Reise in die Welt der Desserts. Jedes Stück
                    ist ein Erlebnis!
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="kolaj-container">
          <Link to="/category/Hochzeit">
            <img
              src="https://images.pexels.com/photos/15376489/pexels-photo-15376489/free-photo-of-isiklar-masa-tablo-neon.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Kolaj 1"
              className="kolaj-image"
            />
          </Link>
          <Link to="/category/Bild">
            <img
              src="https://plus.unsplash.com/premium_photo-1692880430494-3bf9cfd56545?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNha2UlMjBCYW5uZXJ8ZW58MHx8MHx8fDA%3D"
              alt="Kolaj 2"
              className="kolaj-image"
            />
          </Link>
          <Link to="/category/Boutique">
            <img
              src="https://images.unsplash.com/photo-1502035618526-6b2f1f5bca1b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNha2UlMjBjYW5kbGV8ZW58MHwwfDB8fHwy"
              alt="Kolaj 3"
              className="kolaj-image"
            />
          </Link>
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
