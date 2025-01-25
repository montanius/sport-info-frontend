import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchClijent from './utils/fetchClijent';
import {checkLogedOut} from './utils/checkLogedStatus';
import fetchKorisnik from './utils/fetchKorisnik';
import loger from './utils/loger';
import token from './utils/token';

function Profil (){
const [korisnik, setKorisnik] = useState(null);
const [errors, setErrors] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();
const logerContext = "Profil komponenta.";

useEffect(() => {
const  getData = async () => {
        const isLogedOut = await checkLogedOut(navigate);
    if(isLogedOut) return;
                    
           setIsLoading(true);
    try{
    const korisnikData = await fetchKorisnik();
    setKorisnik(korisnikData);
}
catch(error){
loger.error(logerContext, "Provjeravam grešku: Došlo je do greške u preuzimanju poddataka o korisniku.", error.message);
setErrors(error.message);
}
finally{
    setIsLoading(false);
}
    }        
    getData();
}, []);

if(isLoading){
return <p> Učitavanje podataka... </p>
}

if(errors){
return <p> Greška: {errors} </p>
}

if(!korisnik){
return <p> Nema podataka za učitavanje </p>
}

            const logout = async () => {
        //const token = localStorage.getItem('token');
        if(!token.get()){
return;
        }

        try{
token.remove();
alert('Uspješno ste se odjavili');
navigate('/');
      }
        catch(error){
loger.log(error);
        }
    };
        
return(
    <div>
<h1> Dobro došli {korisnik.ime} {korisnik.prezime} </h1>
<p> <strong> Ime: </strong>  {korisnik.ime} </p>
<p> <strong> Prezime: </strong>  {korisnik.prezime} </p>
<p> <strong> Status: </strong>  {korisnik.status} </p>
<p> <strong> Email: </strong>  {korisnik.email} </p>
<Link to='/updateProfil'> Izmijeni podatke o korisniku </Link>
<Link to='/addSport'> Dodaj sport  </Link>
<button onClick={logout}> odjavi se </button>
</div>
);
}

export default Profil;