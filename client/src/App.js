import './App.css';
import Home from './components/Home';
import { NavNach } from './components/NavNach';
import { NavVor } from './components/NavVor';
import Footer from './components/Footer';
function App() {
  return (
    <div>
      <NavNach/>
      {/*<NavVor />*/}
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
