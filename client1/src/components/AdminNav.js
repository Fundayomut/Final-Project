import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthKontext } from "./LoginSystem";
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';  // Icons from react-icons

export default function AdminNav({ productList }) {
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
    <>
      <Navbar expand="lg" className="custom-navbar mb-4 shadow-sm rounded">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/kuchen-boutiqe-high-resolution-logo-transparent.png"
              width="200"
              height="100"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="nav-link">
                <strong>Home</strong>
              </Nav.Link>
              <Nav.Link as={Link} to="/Products" className="nav-link">
                <strong>Order</strong>
              </Nav.Link>
              <Nav.Link as={Link} to="/AdminUserList" className="nav-link">
                <strong>User List</strong>
              </Nav.Link>
            </Nav>
            <Form className="d-flex ms-3">
              <FormControl
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-none" onClick={handleSearch}>
                <FaSearch size={27} className="icon-black" />
              </Button>
            </Form>
            <div className="d-flex align-items-center ms-3">
              <Link to="/Warenkorb" className="position-relative me-3">
                <FaShoppingCart className="icon-black" size={25} />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Button variant="link" onClick={handleLogout}>
                <FaUser className="icon-black" size={25} />
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <footer>
        <p className="admin-willkommen">
          " 😊 Willkommen! Bevor du auf all diese Tasten drückst, bist du dir wirklich sicher, dass du weißt, was du tust? "
        </p>
      </footer>
    </>
  );
}
