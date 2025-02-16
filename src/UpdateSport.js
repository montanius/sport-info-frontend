import React, {useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom";
import { fetchData } from "./utils/fetchData";
import loger from "./utils/loger";
import { fetchUpdateSport, handleAddItem, handleEditItem, handleDeleteItem } from "./utils/sportservices";

function UpdateSport ({sportData}) {
const {id} = useParams();
const [selectedSport, setSelectedSport] = useState({});
const statusOptions = ["Olimpijski", "Paraolimpijski", "Neolimpijski"];
    const typeOptions = ["kolektivni", "individualni"];
const [newDiscipline, setNewDiscipline] = useState("");
const [newCategory, setNewCategory] = useState("");

useEffect(() => {
const fetchSport = async () => {
try{
const data = await fetchData({
    endpoint : 'sports/sport',
    params : {_id : id}, 
    logerContext : 'Komponenta updateSport'
});
setSelectedSport(data);
}
catch(error){
loger.log(error.message);
}
};

fetchSport();
}, [id]);

const handleAddDiscipline = () => handleAddItem(newDiscipline, setNewDiscipline, setSelectedSport, "discipline"); 
const handleEditDiscipline = (index, newValue) => handleEditItem(index, newValue, setSelectedSport, "discipline");
 const handleDeleteDiscipline = (index) => handleDeleteItem(index, setSelectedSport, "discipline");

 const handleAddCategory = () => handleAddItem(newCategory, setNewCategory, setSelectedSport, "category"); 
 const handleEditCategory = (index, newValue) => handleEditItem(index, newValue, setSelectedSport, "category");
  const handleDeleteCategory = (index) => handleDeleteItem(index, setSelectedSport, "category");

const handleUpdateSport = async (e) => {
    e.preventDefault();
await fetchUpdateSport(selectedSport, setSelectedSport, 'Podaci o sportu su uspješno izmijenjeni.');
};  

return(
    <>
<h1> Izmjena podataka o sportu  </h1>
<form onSubmit={handleUpdateSport}>

<h2> Ime sporta  </h2>

<label htmlFor='name'> Ime sporta </label>
<input type='text' name='name' id='name' value={selectedSport.name} onChange={(e => setSelectedSport({...selectedSport, name: e.target.value}))} placeholder='Unesite novo ime sporta' />

<h2> Status sporta </h2>

<label htmlFor='status'> Status sporta </label>
<select name='status' id='status' value={selectedSport.status} onChange={(e) => setSelectedSport({...selectedSport, status: e.target.value})} >
{Array.isArray(statusOptions) && statusOptions.map((opcija) => (
    <option key={opcija} value={opcija}> {opcija} </option>
))}
</select>

<h2> Vrsta sporta </h2>

<label htmlFor='type'> Vrsta sporta  </label>
<select name='type' id='type' value={selectedSport.type} onChange={(e) => setSelectedSport({...selectedSport, type: e.target.value})}>
{Array.isArray(typeOptions) && typeOptions.map((opcija) => (
    <option key={opcija} value={opcija}> {opcija} </option>
))}
</select>

<h2> Discipline </h2>
<h3> Izmjena disciplina </h3>

<table>
<thead>
    <tr>
    <th> disciplina </th>
<th> # </th>
    </tr>
</thead>
<tbody>
{Array.isArray(selectedSport.discipline) && selectedSport.discipline.length > 0 ?
selectedSport.discipline.map((disciplina, index) => (
    <tr key={index}>
        <td>
            <input type='text' value={disciplina} onChange={(e) => handleEditDiscipline(index, e.target.value)} placeholder='Unesite novo ime discipline' />
  </td>
              <td>
              <button type='button' onClick={() =>  handleDeleteDiscipline(index)}> Izbriši disciplinu </button>
        </td>
    </tr>
    ))
: <tr> 
    <td colSpan='2'> Nema disciplina </td>
</tr>
}
</tbody>
</table>

<h3> Dodavanje discipline </h3>
<label htmlFor='addDiscipline'> Nova disciplina </label>
<input type='text' id='addDiscipline' value={newDiscipline} onChange={(e) => setNewDiscipline(e.target.value)} />
<button type='button' onClick={handleAddDiscipline}> Dodaj disciplinu </button>

<h2> Kategorije </h2>
<h3> Izmjena kategorija </h3>

<table>
<thead>
    <tr>
    <th> kategorija </th>
<th> # </th>
    </tr>
</thead>
<tbody>
{Array.isArray(selectedSport.category) && selectedSport.category.map((category, index) => (
    <tr key={index}>
        <td>
            <input type='text' value={category} onChange={(e) => handleEditCategory(index, e.target.value)} placeholder='Unesite novo ime kategorije' />
  </td>
              <td>
              <button type='button' onClick={() =>  handleDeleteCategory(index)}> Izbriši kategoriju </button>
        </td>
    </tr>
))}
</tbody>
</table>

<h3> Dodavanje kategorije </h3>
<label htmlFor='addCategory'> Nova kategorija </label>
<input type='text' id='addCategory' value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
<button type='button' onClick={handleAddCategory}> Dodaj kategoriju </button>

<button type='submit'> Ažuriraj podatke  </button>
</form>
<Link to={`/sport/${id}`}> Povratak na detalje sporta </Link>
    </>
);
}

export default UpdateSport;