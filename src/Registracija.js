import React, {useState} from "react";

function Registracija(){
    const [formData, setFormData] = useState({
        ime:"",
        prezime:"",
        status:"",
        email:"",
        lozinka:"" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                        console.error("Greška pri registraciji", error);
                        alert("Registracija nije uspjela.");
                    }
    };

    return (
    <>
<h1> Registracija  </h1>
<form onSubmit ={handleSubmit}  method="POST">
<label htmlFor="ime"> Ime </label>
<input type="text" name="ime" id="ime" placeholder="Unesite ime:" required  onChange={handleChange} />
<label htmlFor="prezime"> Prezime </label>
<input type="text" name="prezime" id="prezime" placeholder="Unesite prezime:" required onChange={handleChange} />
<h2> Status </h2>
<select name="status" id="status" onChange={handleChange} required > 
<option value=""> Odaberite status </option>
<option value="Administrator kluba"> Administrator kluba </option>
<option value="Sportista"> Sportista </option>
<option value="Trener"> Trener </option>
<option value="Sportski radnik"> Sportski radnik </option>
</select>
<label htmlFor="email"> Email </label>
<input type="mail" name="email" id="email" placeholder="Unesite  vaš email:" required onChange={handleChange} />
<label htmlFor="lozinka"> Lozinka </label>
<input type="text" name="lozinka" id="lozinka" placeholder="Unesite lozinku:" required onChange={handleChange} />
<input type="submit" value="Registruj se" />
</form>
                            </>
    );
}

export default Registracija;