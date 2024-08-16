import './App.css';
import Home from './components/Home';
import {Routes, Route } from 'react-router-dom';
import {Products} from './components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductsCategorie } from './components/ProductsCategorie';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path='/Products' element={<Products/>}/>
        <Route path='/Products/ProductsCategorie/:category' element={<ProductsCategorie/>} />
      </Routes>
    </div>
  );
}

export default App;
