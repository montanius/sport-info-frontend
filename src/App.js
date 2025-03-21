import './App.css';
import NavBar from'./NavBar';
import ONama from './ONama';
import Kontakt from "./Kontakt";
import Novosti from'./Novosti';
import Sportovi from './Sportovi';
import Sport from './Sport';
import UpdateSport from './UpdateSport';
import Klubovi from './Klubovi';
import Sportisti from './Sportisti';
import Registracija from './Registracija';
import Prijava from './Prijava';
import Profil from './Profil';
import UpdateProfil from './UpdateProfil';
import AddSport from './AddSport';
import { Route, Routes, useLocation } from "react-router-dom";
import React from 'react';

function App()  {
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
<Route path='profil' element={<Profil />} />
<Route path='updateprofil' element={<UpdateProfil />} />
<Route path='addSport' element={<AddSport />} />
<Route path='sport/:id' element={<Sport />} />
<Route path='updatesport/:id' element={<UpdateSport />} />
      </Routes>
                             </div>
  );
}

export default App;
