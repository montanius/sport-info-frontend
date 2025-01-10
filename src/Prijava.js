import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {validator, validacijaForme} from './utils/validation';
import {checkLogedIn} from './utils/checkLogedStatus';
import fetchClijent from './utils/fetchClijent';
import loger from './utils/loger';

function Prijava(){
        const [formData, setFormData] = useState({
        email : "",
        lozinka : "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const logerContext = "Prijava komponenta.";

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name] : value});

        if(validator[name]){
let fieldError = "";
validator[name].forEach((validateFn) => {
    const error = validateFn(value);
    if(error){
fieldError = error;
}
});
        
setErrors((prev) => ({ ...prev, [name]: fieldError}));
}
    };

    const handleSubmit = async (e) => {
e.preventDefault();

const newErrors = validacijaForme(formData);
setErrors(newErrors);
if(Object.keys(newErrors).length === 0){
try{

const response = await fetchClijent('http://localhost:4000/api/login', {
    method : 'POST',
    body : JSON.stringify(formData), 
});

    const result = await response.json();

if(response.ok){
loger.log(logerContext, "Uspješno pronađen token.");
localStorage.setItem("token", `Bearer ${result.token}`);
    alert(result.message || "Prijava  je uspješna.");
    navigate('/Profil');
    }
else{
    loger.log(logerContext, "Imaš grešku  pri prijavi");
    alert(result.message || "Došlo je do greške pri prijavi..");
}
}
catch(error){
loger.log(logerContext, "Greška  pri prijavi:", error);
alert("Prijava nije uspjela.");
}
}
else{
    alert("Morate ispravno popuniti formu.");
}
    };

useEffect(() => {
        checkLogedIn(navigate);
}, [navigate]);

    return (
    <>
        <h1> Stranica za prijavu </h1>
        <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="email"> email </label>
        <input type="email" id="email" name="email" onChange={handleChange} required />
        {errors.email && <p style={{color : "red"}}> {errors.email} </p> }

        <label htmlFor="lozinka"> Lozinka </label>
        <input type="text" id="lozinka" name="lozinka" onChange={handleChange} required />
        {errors.lozinka && <p style={{color : "red"}}> {errors.lozinka} </p> }

        <input type="submit" value="prijava" />
        </form>
                            </>
    );
}

export default Prijava;