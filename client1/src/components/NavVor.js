import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';  // Yeni ikonlar

export const NavVor = ({ productList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
            width="100%"
            alt="logo"
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
