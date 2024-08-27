import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";

export const NavVor = ({productList}) => {

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
         <Link to="/"><img
              src="/kuchen-boutiqe-high-resolution-logo-transparent.png"
              width="200px"
              height="100px"
              alt="logo"
            /></Link>
          </div>
          <div className="navVorBoot">
            <ul className="nav">
              <li className="nav-item">
              <Link className="nav-Home" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-order" to="/Products">Order</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-Contact" to="/Contact">Contact</Link>
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
              <img
                src="https://cdn0.iconfinder.com/data/icons/essentials-4/1687/search-512.png"
                width="20px"
                height="20px"
                alt="search"
                style={{ marginLeft: "10px"}}
                onClick={handleSearch}
              />
            </div>
            <img
              src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-12-512.png"
              width="25px"
              height="25px"
              alt="basket"
            />
            <Link to="/Login">
              <img
                src="https://cdn4.iconfinder.com/data/icons/hodgepodge-free/32/login_account_enter_door-64.png"
                width="25px"
                height="25px"
                alt="login"
              />
            </Link>
          </div>
        </div>
      );
};

export default NavVor;
