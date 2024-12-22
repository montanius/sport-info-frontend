import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import fetchClijent from './utils/fetchClijent';

function Profil (){
const [korisnik, setKorisnik] = useState(null);
const [errors, setErrors] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();

const fetchKorisnik = async () => {
    const token = localStorage.getItem('token');
    if(!token){
    setErrors('Token nije pronađen.');
        return;
    }
    try{
        setIsLoading(true);

        const response = await fetchClijent('http://localhost:4000/api/users/me', {
            method : 'GET', 
        });

            if(response.ok){
    const korisnikData = await response.json();
        setKorisnik(korisnikData);
        setIsLoading(false);
    console.log(korisnikData);
    }
    else{
    const errorData = await response.json();
    setErrors('Došlo je do greške pri dohvaćanju podataka.');
    setIsLoading(false);
    navigate('/Prijava');
    }
    }
    catch(err){
    setErrors('Došlo je do greške u aplikaciji' + err.message);
    }
    finally{
        setIsLoading(false);
    }
        };

useEffect(() => {
    console.log('useefect funkcija je pozvana');
    fetchKorisnik();
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
console.log(error);
        }
    };

return(
    <div>
<h1> Dobro došli {korisnik.ime} {korisnik.prezime} </h1>
<p> <strong> Ime: </strong>  {korisnik.ime} </p>
<p> <strong> Prezime: </strong>  {korisnik.prezime} </p>
<p> <strong> Status: </strong>  {korisnik.status} </p>
<p> <strong> Email: </strong>  {korisnik.email} </p>
<button onClick={logout}> odjavi se </button>
</div>
);
}

export default Profil;