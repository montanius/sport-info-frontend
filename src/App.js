import './App.css';
import NavBar from'./NavBar.js';
import ONama from './ONama.js';
import Kontakt from "./Kontakt.js";
import Novosti from'./Novosti.js';
import Sportovi from './Sportovi.js';
import Klubovi from './Klubovi.js';
import Sportisti from './Sportisti.js';
import Registracija from './Registracija.js';
import Prijava from './Prijava.js';
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="App">
<NavBar />
{location.pathname === "/" && <Novosti />}

<Routes> 
  <Route path='/' element={<Novosti />} />
<Route path='onama' element={<ONama />} /> 
<Route path='kontakt' element={<Kontakt />} />
<Route path='sportovi' element={<Sportovi />} />
<Route path='klubovi' element={<Klubovi />} />
<Route path='sportisti' element={<Sportisti />} />
<Route path='registracija' element={<Registracija />} />
<Route path='prijava' element={<Prijava />} />
      </Routes>
                             </div>
  );
}

export default App;
