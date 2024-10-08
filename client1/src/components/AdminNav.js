import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthKontext } from "./LoginSystem";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { AdminProducts } from "./AdminProductsAdd";

export default function AdminNav() {
  // AuthKontext verwenden, um Abmeldefunktion und Benutzerdaten zu erhalten
  const { logout, userNumber, userName } = useContext(AuthKontext);
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Warenkorb-Daten aus dem lokalen Speicher abrufen
    const storedCartItems = localStorage.getItem("warenkorb");
    if (storedCartItems) {
      // Warenkorb nach Benutzer-ID filtern
      const cartItems = JSON.parse(storedCartItems).filter(
        (item) => item.userNumber === userNumber
      );
      let total = 0;
      // Gesamtanzahl der Artikel im Warenkorb berechnen
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].quantity;
      }
      setTotalItems(total);
    }
  }, [userNumber]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <>
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
              <Link className="nav-Home navfont" to="/AdminHome">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-order navfont" to="/AdminProducts">
               Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-order navfont" to="/AdminProductsAdd">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-order navfont" to="/AdminUserList">
                User List
              </Link>
            </li>
          </ul>
        </div>
        <div className="search">
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
                ADMIN-{userName}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
