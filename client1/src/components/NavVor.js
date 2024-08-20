import React from 'react';
import { Link } from "react-router-dom";

export const NavVor = () => {
    return (
        <div className="navVor">
          <div className="logo">
            <img
              src="/kuchen-boutiqe-high-resolution-logo-transparent.png"
              width="200px"
              height="100px"
              alt="logo"
            />
          </div>
          <div className="navVorBoot">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-Home" aria-current="page" href="#">
                  Home
                </a>
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
                placeholder="search"
                style={{ height: "25px" }}
              />
              <img
                src="https://cdn0.iconfinder.com/data/icons/essentials-4/1687/search-512.png"
                width="20px"
                height="20px"
                alt="search"
                style={{ marginLeft: "10px"}}
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
