import React, { useState } from "react";

function Prijava(){
    const [formData, setFormData] = useState({
        email : "",
        lozinka : "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value});
    }
    const handleSubmit = async (e) => {
e.preventDefault();
try{
const response = await fetch('http://localhost:4000/api/login', {
    method : "POST",
    headers : {"content-type" : "application/json"},
    body : JSON.stringify(formData),
});
const result = response.json();
if(response.ok){
    alert(result.message || "Prijava  je uspješna.");
}
else{
    alert(result.message || "Došlo je do greške pri prijavi..");
}

}
catch(error){
console.log("Greška  pri prijavi:", error);
alert("Prijava nije uspjela.");
}
    };

    return (
    <>
        <h1> Stranica za prijavu </h1>
        <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="email"> email </label>
        <input type="mail" id="email" name="email" onChange={handleChange} required />
        <label htmlFor="lozinka"> Lozinka </label>
        <input type="text" id="lozinka" name="lozinka" onChange={handleChange} required />
        <input type="submit" value="prijava" />
        </form>
                            </>
    );
}

export default Prijava;