import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa"; // Neue Icons

export const NavVor = ({ productList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Funktion zur Behandlung der Suchanfrage
  const handleSearch = () => {
    // Überprüfen, ob die Produktliste leer oder nicht definiert ist
    if (!productList || productList.length === 0) {
      alert("Product list was not loaded. Please refresh the page.");
      return;
    }

    // Suchen nach einem Produkt, dessen Name den Suchbegriff enthält
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
            alt="logo"
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
        <FaShoppingCart
          className="icon-black"
          size={25}
          style={{ marginLeft: "10px" }}
        />
        <Link to="/Login">
          <FaUser
            className="icon-black"
            size={25}
            style={{ marginLeft: "10px" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default NavVor;
