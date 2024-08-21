import './App.css';
import Home from './components/Home';
import {Routes, Route } from 'react-router-dom';
import {Products} from './components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rezept } from './components/Rezept';
import { ProductsCategorie } from './components/ProductsCategorie';
import Login from './components/Login';
import { AuthDienst,AuthKontext } from './components/LoginSystem';
import { Register } from './components/Register';
import Profile from './components/Profile';
import Contact from './components/Contact';
import { CardDetails } from './components/CardDetails';

function App() {

  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/Contact' element={<Contact />} />
        <Route path='/Products' element={<Products/>}/>
        <Route path='/Rezept' element={<Rezept/>}/>
        <Route path='/Products/ProductsCategorie/:category' element={<ProductsCategorie/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>}  />
        <Route path='/Profile' element={<Profile/>}  />
        <Route path="/Products/:productNumber" element={<CardDetails />} />
      </Routes>
    </div>
  );
}

function AppLaden()
{
  return (
    <AuthDienst>
      <App />
    </AuthDienst>
  );
}

export default AppLaden;

