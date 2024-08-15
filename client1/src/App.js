import './App.css';
import Home from './components/Home';
import NavNach from './components/NavNach';
//import { NavVor } from './components/NavVor';
import Footer from './components/Footer';
import {Routes, Route } from 'react-router-dom';
import {Products} from './components/Products';


function App() {
  return (
    <div>
      <NavNach/>
      <Home/>
      <Footer/>
      <Routes>
        <Route path='/Products' element={<Products/>}/>
      </Routes>
    </div>
  );
}

export default App;
