import React, { useState } from "react";
import fetchClijent from './utils/fetchClijent';
import loger from './utils/loger';

function AddSport () {
const [formData, setFormData] = useState({
    name: "", 
    status : "",
    type : "", 
    discipline : [], 
    category : []
}); 
const statusOptions = ["Olimpijski", "Paraolimpijski", "Neolimpijski"];
const typeOptions = ["kolektivni", "individualni"];
const [newDiscipline, setNewDiscipline] = useState("");
const [newCategory, setNewCategory] = useState("");
const logerContext = "addSport komponenta";
const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]:value});
    };

    const handleAddDiscipline = () => {
    if(newDiscipline.trim()){
setFormData({
...formData,
discipline: [...formData.discipline, newDiscipline.trim()], 
});
setNewDiscipline("");
    }
    };

    const handleRemoveDiscipline = (index) => {
setFormData({
    ...formData,
    discipline: formData.discipline.filter((_, i) => i !== index),
});
    };

    const handleAddCategory = () => {
        if(newCategory.trim()){
setFormData({
    ...formData,
    category : [...formData.category, newCategory.trim()]
});
setNewCategory("");
        }
    };

    const handleRemoveCategory = (index) => {
        setFormData({
            ...formData, 
            category : formData.category.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            console.log(formData);

const response = await fetchClijent('http://localhost:4000/api/sports/addsport', {
   method : 'POST',
   body : JSON.stringify(formData),
});

const result = await response.json();
alert(result.message);
        }
        catch(error){
loger.log(logerContext, error.message);
        }
        
    };

return(
    <div>
        <h1> Dodavanje sportova </h1>

        <form onSubmit={handleSubmit} >
<label htmlFor="name"> Ime sporta </label>
<input type="text" name="name" id="name" placeholder="Unesite ime sporta" onChange={handleChange} />

<label htmlFor="status"> Status sporta  </label>
<select name="status" id="status" value={formData.status} onChange={handleChange} > 
    <option value=""> Odaberi status </option>
{statusOptions.map((opcija) => (
<option key={opcija} value={opcija}> {opcija} </option>
))}
</select>

<label htmlFor="type"> Vrsta sporta </label>
<select name="type" id="type" value={formData.type} onChange={handleChange} >
    <option value=""> Odaberi vrstu sporta  </option >
{typeOptions.map((opcija) => (
    <option key={opcija} value={opcija}> {opcija} </option>
))}
</select>

<h2> discipline </h2>
<ul>
    {formData.discipline.map((discipline, index) => (
        <li key={index}>
            {discipline}
            <button
                type="button"
                onClick={() => handleRemoveDiscipline(index)}>
                    Ukloni
            </button>
        </li>
    ))}
</ul>
<div>
    <input 
    type="text"
    placeholder="Unesi naziv discipline"
    value={newDiscipline}
    onChange={(e) => setNewDiscipline(e.target.value)}    />
    <button type="button" onClick={handleAddDiscipline}>
Dodaj disciplinu 
    </button>
</div>

<h2> Kategorije </h2>
<ul>
{formData.category.map((category, index) => (
    <li key={index}> {category} 
<button 
type="button" 
onClick={() => handleRemoveCategory(index)}> 
Ukloni
</button>    
    </li>
))}

</ul>
<div>
    <input 
    type="text"
    value={newCategory}
    placeholder="Unesite kategoriju"
    onChange={(e) => setNewCategory(e.target.value)} />
    
    <button type="button" onClick={handleAddCategory}>
    Dodaj kategoriju
    </button>
</div>

<button onClick={handleSubmit}> Dodaj sport </button>
        </form>
    </div>
);
};

export default AddSport;