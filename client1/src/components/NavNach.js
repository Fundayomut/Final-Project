import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthKontext } from "./LoginSystem";
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';  // Yeni ikonlar

export default function NavNach({ productList }) {
  const { logout, userNumber } = useContext(AuthKontext);
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = () => {
    const product = productList.find(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (product) {
      navigate(`/Products/${product.productNumber}`);
    } else {
      alert("Product not found!");
    }
  };

  return (
    <div className="navVor">
      <div className="logo">
        <Link to="/">
          <img
            src="/kuchen-boutiqe-high-resolution-logo-transparent.png"
            width="200px"
            height="100px"
          />
        </Link>
      </div>
      <div className="navVorBoot">
        <ul className="nav">
          <li className="nav-item"> 
            <Link className="nav-Home navfont" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-order navfont" to="/Products">Order</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-Contact navfont" to="/Contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-order navfont" to="/Profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-order navfont" to="/FavoritesList">Favorites</Link>
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
          size={25}
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
