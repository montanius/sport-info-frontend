import { useState, useEffect } from "react";
import {fetchClijent} from './utils/fetchClijent';
import fetchKorisnik from './utils/fetchKorisnik';
import { useNavigate } from "react-router-dom";
import { checkLogedOut } from "./utils/checkLogedStatus";
import {validacijaForme, validator} from './utils/validation';
import loger from "./utils/loger";

function UpdateProfil (){
    const [formData, setFormData] = useState({
        ime : "",
        prezime : "",
        status : "",
    });
    const [errors, setErrors] = useState({});
const [value, setValue] = useState("");
const navigate = useNavigate();
const statusOpcije = ["Administrator kluba", "Sportista", "Trener", "Sportski radnik"];

useEffect(() => {
    checkLogedOut(navigate);
}, [navigate]);

useEffect(() => {
    const getData = async () => {
try{
        const korisnikData = await fetchKorisnik();
        setFormData(korisnikData);
    }
    catch(error){
loger.error("Došlo je do  greške pri dobijanju podataka o korisniku", error.message);
navigate('/prijava');
    }
    }
    getData();
    }, []);

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
    if(Object.keys(newErrors).length > 0){
setErrors(newErrors);
return;
    }

const response = await fetchClijent('http://localhost:4000/api/users/update', {
method : 'PATCH',
body : JSON.stringify(formData),
}); 

if(response.ok){
    alert('Podaci su uspješno ažurirani.');
    navigate('/profil');
}
else{
    alert('Došlo je do greške pri ažuriranju podataka.');
}
}; 
 
const redirectToProfil = () => navigate('/profil');

return(
    <>
    <h1> Ažuriranje   </h1>
    <form onSubmit={handleSubmit}>
<label> Ime:  
<input
type="text"
name="ime"
value={formData.ime}
onChange={handleChange} />
</label>
{errors.ime && <p style={{color : "red"}}> {errors.ime} </p>}

<label> Prezime:
<input
type="text"
name="prezime"
value={formData.prezime}
onChange={handleChange} />
</label>
{errors.prezime && <p style={{color: "red"}}> {errors.prezime} </p>}

<label> status: 
    <select name="status" value={formData.status} onChange={handleChange}>
{statusOpcije.map((opcija) => ( 
       <option key={opcija} value={opcija}> {opcija} </option>
))}
</select>
</label>


<button type="submit"> Ažuriraj </button>
    </form>
    <button onClick={redirectToProfil}> Povratak na profil </button>
    </>
);
}

export default UpdateProfil;