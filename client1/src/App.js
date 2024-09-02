import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { Products } from "./components/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import { Rezept } from "./components/Rezept";
import { ProductsCategorie } from "./components/ProductsCategorie";
import Login from "./components/Login";
import { AuthDienst } from "./components/LoginSystem";
import { Register } from "./components/Register";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import { CardDetails } from "./components/CardDetails";
import Warenkorb from "./components/Warenkorb";
import Zahlen from "./components/Zahlen";
import PayPal from "./components/PayPal";
import FavoritesList from "./components/FavoritesList";
import { AdminUserList } from "./components/AdminUserList";
import AdminUserZeilen from "./components/AdminUserZeilen";
import HomeUntenCard from "./components/HomeUntenCard";
import "./MediaQuery.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AdminProducts } from "./components/AdminProducts";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Rezept" element={<Rezept />} />
        <Route
          path="/Products/ProductsCategorie/:category"
          element={<ProductsCategorie />}
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Products/:productNumber" element={<CardDetails />} />
        <Route path="/Warenkorb" element={<Warenkorb />} />
        <Route path="/Zahlen" element={<Zahlen />} />
        <Route path="/Paypal" element={<PayPal />} />
        <Route path="/FavoritesList" element={<FavoritesList />} />
        <Route path="/AdminUserList" element={<AdminUserList />} />
        <Route path="/AdminUserZeilen" element={<AdminUserZeilen />} />
        <Route path="/HomeUntenCard" element={<HomeUntenCard />} />
        <Route path="/category/:category" element={<ProductsCategorie />} />
        <Route path="/AdminProducts" element={<AdminProducts />} />
      </Routes>
    </div>
  );
}

function AppLaden() {
  return (
    <AuthDienst>
      <App />
    </AuthDienst>
  );
}

export default AppLaden;

/*
<Route path='/AdminUserList' element={<AdminUserList/>}/>
        <Route path='/AdminUserZeilen' element={<AdminUserZeilen/>}/>
*/
