import './App.css';
import Home from './components/Home';
import {Routes, Route } from 'react-router-dom';
import {Products} from './components/Products';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path='/Products' element={<Products/>}/>
      </Routes>
    </div>
  );
}

export default App;
