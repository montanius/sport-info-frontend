import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {fetchClijent} from './utils/fetchClijent';
import { useNavigate } from "react-router-dom";
import { checkLogedOut } from "./utils/checkLogedStatus";
import {validacijaForme, validator} from './utils/validation';

function UpdateProfil (){
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const {field } = useParams();
const [value, setValue] = useState("");
const fieldConfig = {
    ime: {type:'text'}, 
    prezime: {type:'text'}, 
status: {type:'select', options: ['Administrator kluba', 'Sportista', 'Trener', 'Sportski radnik']}
}

const fieldInfo = fieldConfig[field] || {type: 'text'};

const navigate = useNavigate();

useEffect(() => {
    checkLogedOut(navigate);
}, [navigate]);

useEffect(() => {
    setFormData({ [field]: value});
}, [field, value]);

const validateField = (name, value) => {
if(validator[name]){
for (const validateFn of validator[name]){
    const error = validateFn(value);
    if (error) return error;
    }
}
return "";
};

const handleChange = (e) => {
const {value} = e.target;
setValue(value);

const error = validateField(field, value);
setErrors((prevErrors) => ({ ...prevErrors, [field]: error}));
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
body : JSON.stringify({[field]: value}),
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
    <h1> Ažuriranje {field}  </h1>
    <form onSubmit={handleSubmit}>
{fieldInfo.type === 'text' && (
<label> novo {field}:
<input
type="text"
name={field}
value={value}
onChange={handleChange} />
{errors[field] && <p style={{color: 'red'}}>{errors[field]} </p>}
</label>
)}
{fieldInfo.type === 'select' && (
<label>
    novi {field}:
    <select 
    name={field}
    value={value}
   onChange={handleChange}>
<option value=""> Izaberite {field} </option>
{fieldInfo.options.map((option) => (
    <option key={option} value={option}>
{option}
    </option>
))}
    </select>
    {errors[field] && <p style={{color: 'red'}}>{errors[field]} </p>}
</label>
)}
<button type="submit"> Ažuriraj </button>
    </form>
    <button onClick={redirectToProfil}> Povratak na profil </button>
    </>
);
}

export default UpdateProfil;