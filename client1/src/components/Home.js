import React, { useContext, useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "./ExampleCarouselImage";
import NavNach from "./NavNach";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { NavVor } from "./NavVor";
import { TextAntwort, ServerCom } from "./ServerCom";
import { AuthKontext } from "./LoginSystem";
import { ObjectAntwort } from "./ServerCom";
import AdminNav from "./AdminNav";
import { ProductsCategorie } from "./ProductsCategorie";


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
        <Carousel>
          <Carousel.Item>
            <ExampleCarouselImage
              src="https://images.pexels.com/photos/25916370/pexels-photo-25916370/free-photo-of-plaka-tabak-cicekler-tac-yapraklar.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Delicious Raspberry Cupcakes"
              className="carousel-image"
            />
            <Carousel.Caption className="carousel-caption">
              <h4>Sie träumen es,</h4>
              <p>Erleben Sie die süße Verwandlung von Träumen in köstliche Realität. Unsere Cupcakes sind ein Fest für die Sinne.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage
              src="https://images.pexels.com/photos/7867786/pexels-photo-7867786.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Assorted Cupcakes"
              className="carousel-image"
            />
            <Carousel.Caption className="carousel-caption">
              <h4>Wir machen es...</h4>
              <p>Herzliche Vielfalt in jedem Bissen. Machen Sie Ihren Liebsten eine Freude mit unseren sorgfältig zubereiteten Kuchen.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage
              src="https://images.pexels.com/photos/12919294/pexels-photo-12919294.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Variety of Cupcakes"
              className="carousel-image"
            />
            <Carousel.Caption className="carousel-caption">
              <h4>Entdecken Sie die Welt der Aromen</h4>
              <p>Begeben Sie sich mit unserem großen Kuchensortiment auf eine unvergessliche Reise in die Welt der Desserts. Jedes Stück bir bir deneyim!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="hauptdiv">
        </div>
        <div className="homebuttonmaindiv">
          <div className="homebuttondiv">
            <Link to="/rezept">
              <button className="rezeptbutton homebutton">Rezept</button>
            </Link>
            <Link to="/Products">
              <button className="orderbutton homebutton">Order Now</button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
