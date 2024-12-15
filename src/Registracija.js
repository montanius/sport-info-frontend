import React, { useState } from "react";
import {validator, validacijaForme} from './utils/validation.js';

function Registracija(){
    const [formData, setFormData] = useState({
        ime:"",
        prezime:"",
        status:"",
        email:"",
        lozinka:"" 
    });

    const [errors, setErrors] = useState({});
    
            const handleChange = (e) => {
          const {name, value} = e.target;
            setFormData({ ...formData, [name]: value});
    
                        if(validator[name]){
                let fieldError = "";
                                    validator[name].forEach((validateFn) => {
const error = validateFn(value);
if(error){
fieldError = error;
}
                });

                setErrors((prev) => ({ ...prev, [name] : fieldError }));
                            }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validacijaForme(formData);
        setErrors(newErrors);
        if(Object.keys(newErrors).length === 0){
                try{
            const response = await fetch('http://localhost:4000/api/register', {
                method: "POST", 
                headers: {"content-type": "application/json"}, 
                    body:JSON.stringify(formData),
                       });
                       const result = await response.json();
                       alert(result.message || "Registracija je uspješna.");
                    }
                    catch(error){
                        console.log("Greška pri registraciji", error);
                        alert("Registracija nije uspjela.");
                    }
                                    }
                else{
                    alert("Morate ispravno popuniti formu za registraciju.");
                }
    };

    return (
    <>
<h1> Registracija  </h1>
<form onSubmit ={handleSubmit}  method="POST">
<label htmlFor="ime"> Ime </label>
<input type="text" name="ime" id="ime" placeholder="Unesite ime:" required  onChange={handleChange} />
{errors.ime && <p style={{color : "red"}}> {errors.ime} </p> }

<label htmlFor="prezime"> Prezime </label>
<input type="text" name="prezime" id="prezime" placeholder="Unesite prezime:" required onChange={handleChange} />
{errors.prezime && <p style={{color : "red"}}> {errors.prezime} </p> }

<h2> Status </h2>
<select name="status" id="status" onChange={handleChange}  > 
<option value=""> Odaberite status </option>
<option value="Administrator kluba"> Administrator kluba </option>
<option value="Sportista"> Sportista </option>
<option value="Trener"> Trener </option>
<option value="Sportski radnik"> Sportski radnik </option>
</select>
{errors.status && <p style={{color : "red"}}> {errors.status} </p> }

<label htmlFor="email"> Email </label>
<input type="mail" name="email" id="email" placeholder="Unesite vaš email:" required onChange={handleChange} />
{errors.email && <p style={{color : "red"}}> {errors.email} </p> }

<label htmlFor="lozinka"> Lozinka </label>
<input type="text" name="lozinka" id="lozinka" placeholder="Unesite lozinku:" required onChange={handleChange} />
{errors.lozinka && <p style={{color : "red"}}> {errors.lozinka} </p> }

<input type="submit" value="Registruj se" />
</form>
                            </>
    );
}

export default Registracija;