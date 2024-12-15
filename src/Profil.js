import React, {useEffect, useState} from "react";

function Profil (){
const [korisnik, setKorisnik] = useState(null);
const [errors, setErrors] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const fetchKorisnik = async () => {
const token = localStorage.getItem('token');
if(!token){
setErrors('Token nije pronađen.');
setIsLoading(false);
return;
}
try{
const response = await fetch('http://localhost:4000/api/users/me', {
    method : 'GET', 
    headers : {
        Authorization : token,
        "content-type" : "application/json",
            },
});
if(response.ok){
const korisnikData = await response.json();
setKorisnik(korisnikData);
console.log(korisnikData);
}
else{
const errorData = await response.json();
setErrors('Došlo je do greške pri dohvaćanju podataka.');
}
}
catch(err){
setErrors('Došlo je do greške u aplikaciji' + err.message);
}
finally{
    setIsLoading(false);
}
    };

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

        /*fetch('http://localhost:4000/api/users', {
        method: "GET",
headers : {"content-type" :"application/json", authorization : localStorage.getItem("token")}
    }).then(res => res.json()).then(users => console.log(users));*/

return(
    <div>
<h1> Dobro došli {korisnik.ime} {korisnik.prezime} </h1>
<p> <strong> Ime: </strong>  {korisnik.ime} </p>
<p> <strong> Prezime: </strong>  {korisnik.prezime} </p>
<p> <strong> Status: </strong>  {korisnik.status} </p>
<p> <strong> Email: </strong>  {korisnik.email} </p>
</div>
);
}

export default Profil;