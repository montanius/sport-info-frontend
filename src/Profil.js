import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchClijent from './utils/fetchClijent';
import {checkLogedOut} from './utils/checkLogedStatus';
import fetchKorisnik from './utils/fetchKorisnik';
import loger from './utils/loger';

function Profil (){
const [korisnik, setKorisnik] = useState(null);
const [errors, setErrors] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();
const logerContext = "Profil komponenta.";
useEffect(() => {
    checkLogedOut(navigate);
}, [navigate]);

useEffect(() => {
const  getData = async () => {
    setIsLoading(true);

    try{
    const korisnikData = await fetchKorisnik();
    setKorisnik(korisnikData);
}
catch(error){
loger.error(logerContext, "Provjeravam grešku: Došlo je do greške u preuzimanju poddataka o korisniku.", error.message);
setErrors(error.message);
//navigate('/prijava');
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
        const token = localStorage.getItem('token');
        if(!token){
return;
        }

        try{
localStorage.removeItem('token');
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
<button onClick={logout}> odjavi se </button>
</div>
);
}

export default Profil;