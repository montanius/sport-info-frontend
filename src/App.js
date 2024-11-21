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
<Route path='onama' element={<ONama />}> </Route>
<Route path='Kontakt' element={<Kontakt />}> </Route>
<Route path='Sportovi' element={<Sportovi />}> </Route>
<Route path='klubovi' element={<Klubovi />}> </Route>
<Route path='Sportisti' element={<Sportisti />}> </Route>
<Route path='Registracija' element={<Registracija />}> </Route>
<Route path='Prijava' element={<Prijava />}> </Route>
      </Routes>
                             </div>
  );
}

export default App;
