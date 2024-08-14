import './App.css';
import Home from './components/Home';
import { NavNach } from './components/NavNach';
import { NavVor } from './components/NavVor';

function App() {
  return (
    <div>
      <NavNach/>
      {/*<NavVor />*/}
      <Home/>
    </div>
  );
}

export default App;
