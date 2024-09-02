import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthKontext } from "./LoginSystem";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa"; // Neue Icons aus der React-Bibliothek

export default function NavNach({ productList }) {
  const { logout, userNumber, userName } = useContext(AuthKontext);
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect Hook zum Abrufen und Berechnen der Artikelanzahl im Warenkorb
  useEffect(() => {
    const storedCartItems = localStorage.getItem("warenkorb");
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems).filter(
        (item) => item.userNumber === userNumber
      );
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].quantity;
      }
      setTotalItems(total);
    }
  }, [userNumber]);

  // Funktion zum Abmelden des Benutzers
  const handleLogout = () => {
    logout();
    navigate("/login"); // Weiterleitung zur Login-Seite
  };

  // Funktion zum Durchsuchen der Produktliste
  const handleSearch = () => {
    if (!productList || productList.length === 0) {
      // Wenn die Produktliste leer ist oder nicht geladen wurde, wird eine Warnung angezeigt
      alert("Product list was not loaded. Please refresh the page.");
      return;
    }

    // Sucht ein Produkt in der Liste, dessen Name den Suchbegriff enthält
    const product = productList.find((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Wenn ein passendes Produkt gefunden wird, navigiere zu dessen Detailseite
    if (product) {
      navigate(`/Products/${product.productNumber}`);
    } else {
      // Wenn kein Produkt gefunden wird, zeige eine Warnung an
      alert("No product found!");
    }
  };

  return (
    <div className="navVor">
      <div className="logo">
        <Link to="/">
          <img
            src="/kuchen-boutiqe-high-resolution-logo-transparent.png"
            width="100%"
          />
        </Link>
      </div>
      <div className="navVorBoot">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-Home navfont" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-order navfont" to="/Products">
              Order
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-Contact navfont" to="/Contact">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-order navfont" to="/Profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-order navfont" to="/FavoritesList">
              Favorites
            </Link>
          </li>
        </ul>
      </div>
      <div className="search">
        <div className="navinputlink">
          <input
            className="inputsearch"
            placeholder="Search..."
            style={{ height: "25px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch
            className="icon-black"
            size={25}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={handleSearch}
          />
        </div>
        <div className="navNach-ikon">
          <Link to="/Warenkorb">
            <div style={{ position: "relative", display: "inline-block" }}>
              <FaShoppingCart
                className="icon-black"
                size={25}
                style={{ marginLeft: "10px" }}
              />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    textAlign: "center",
                    lineHeight: "20px",
                    fontSize: "12px",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaUser
              className="icon-black"
              size={24}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                marginBottom: "2px",
              }}
              onClick={handleLogout}
            />
            {userName && (
              <span
                style={{ marginLeft: "10px", fontSize: "14px", color: "#555" }}
              >
                {userName}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
