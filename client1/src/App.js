import './App.css';
import Home from './components/Home';
import {Routes, Route } from 'react-router-dom';
import {Products} from './components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductsCategorie } from './components/ProductsCategorie';
import Login from './components/Login';
import { AuthDienst,AuthKontext } from './components/LoginSystem';
import { Register } from './components/Register';
import Profile from './components/Profile';

function App() {

  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path='/Products' element={<Products/>}/>
        <Route path='/Products/ProductsCategorie/:category' element={<ProductsCategorie/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>}  />
        <Route path='/Profile' element={<Profile/>}  />
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

