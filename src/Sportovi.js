import React, { useState, useEffect } from 'react';
import Novosti from './Novosti';
import loger from './utils/loger';
import {fetchSports, handleAddItem, handleEditItem, handleDeleteItem, fetchUpdateSport} from './utils/sportservices';

function Sportovi() {
    const [sports, setSports] = useState([]);
    const [error, setError] = useState(null);
    const [filterActive, setFilterActive] = useState(false);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [selectedSport, setSelectedSport] = useState([]);
    const [updateForm, setUpdateForm] = useState(false);
    const [editSport, setEditSport] = useState(null);
    const [updatedSport, setUpdateSport] = useState(false);
    const [advanceFind, setAdvanceFind] = useState(false);
    const [newDiscipline, setNewDiscipline] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const logerContext = 'Komponenta sportovi';
    const statusOptions = ["Olimpijski", "Paraolimpijski", "Neolimpijski"];
    const typeOptions = ["kolektivni", "individualni"];

       const handleAddDiscipline = () => handleAddItem(newDiscipline, setNewDiscipline, setEditSport, "discipline"); 
const handleEditDiscipline = (index, newValue) => handleEditItem(index, newValue, setEditSport, "discipline");
 const handleDeleteDiscipline = (index) => handleDeleteItem(index, setEditSport, "discipline");

 const handleAddCategory = () => handleAddItem(newCategory, setNewCategory, setEditSport, "category"); 
 const handleEditCategory = (index, newValue) => handleEditItem(index, newValue, setEditSport, "category");
  const handleDeleteCategory = (index) => handleDeleteItem(index, setEditSport, "category");

const handleSubmit = async (e) => {
e.preventDefault();
await fetchSports({name, status, type, setSports, setFilterActive, setError});
};

const handleUpdateSport = async (e) => {
    e.preventDefault();
await fetchUpdateSport(editSport, selectedSport, setSelectedSport, setUpdateForm, setFilterActive, setUpdateSport);
};

const handleDeleteSport = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(`Da li želite da izbrišete sport?`);
    if(isConfirmed){
const deletedSport = await { ...editSport, isDeleted : true};
await fetchUpdateSport(deletedSport, selectedSport, setSelectedSport, setUpdateForm, setFilterActive, setUpdateSport);
                }
                else{
                    loger.log(`Brisanje je otkazano.`);
                }
};

return (
<>
{!updatedSport &&  !updateForm && (
    <>
<h1> Pretraga sportova </h1>
<form onSubmit={handleSubmit}>
    <input type='text' name='name' id='name' placeholder='Unesite dio ili puno ime sporta' onChange={(e) => {setName(e.target.value)}} />

{advanceFind && (
    <>
<h2> Status sporta  </h2>
<select name='status' id='status' value={status} onChange={(e) => {setStatus(e.target.value)}}>
    <option value=''> Odaberi status sporta  </option>
{statusOptions.map((opcija) => (
    <option key={opcija} value={opcija}> {opcija} </option>
))}
</select>

<h2> Vrsta sporta </h2>
<select name='type' id='type' value={type} onChange={(e) => {setType(e.target.value)}}> 
<option value=''> Odaberite vrstu sporta  </option>
{typeOptions.map((opcija) => (
    <option key={opcija}> {opcija} </option>
))}
</select>
</>)}
<button onClick={() => setAdvanceFind(true)}> Napredna Pretraga </button>
<button type='submit'> Pretraži </button>
</form>
</>
)}

{filterActive && !updateForm && (
<>
<table>
<thead>
<tr>
<th> Ime sporta </th>
<th> status  sporta </th>
<th> Vrsta sporta </th>
<th> Discipline </th>
<th> Kategorije </th>
<th> Izmjena sporta  </th>
<th> Brisanje sporta  </th>
</tr>
</thead>
<tbody>
{sports.length > 0 ? (
sports.map((sport) => (
<tr key={sport._id}>
<td> {sport.name} </td>
<td> {sport.status} </td>
<td> {sport.type} </td>
<td> {sport.discipline.length === 0 ? `Nema disciplina` : sport.discipline.join(', ')} </td>
<td> { sport.category.length === 0 ? `Nema kategorija` : sport.category.join(', ')} </td>
<td> <button onClick={() => {
    setSelectedSport(sport);
setEditSport({ ...sport });
    setUpdateForm(true); }}> Izmijeni sport  </button> </td>
    <td> <button onClick={(e) => {
        setSelectedSport(sport);
        setEditSport({ ...sport });
        handleDeleteSport(e)}}> Izbriši sport </button> </td>
</tr>
))
) : (
<tr>
<td colSpan="4"> Nema sportova sa odabranim filterom. </td>
</tr>
)}
</tbody>
</table>
<button onClick={() => { setFilterActive(false); setAdvanceFind(false); }}> Poništi filter </button>
</>
)}

{updateForm && (
<>
<h1> Izmjena podataka o sportu  </h1>
<form onSubmit={handleUpdateSport}>

<h2> Ime sporta  </h2>

<label htmlFor='name'> Ime sporta </label>
<input type='text' name='name' id='name' value={editSport.name} onChange={(e => setEditSport({...editSport, name: e.target.value}))} placeholder='Unesite novo ime sporta' />

<h2> Status sporta </h2>

<label htmlFor='status'> Status sporta </label>
<select name='status' id='status' value={editSport.status} onChange={(e) => setEditSport({...editSport, status: e.target.value})} >
{statusOptions.map((opcija) => (
    <option key={opcija} value={opcija}> {opcija} </option>
))}
</select>

<h2> Vrsta sporta </h2>

<label htmlFor='type'> Vrsta sporta  </label>
<select name='type' id='type' value={editSport.type} onChange={(e) => setEditSport({...editSport, type: e.target.value})}>
{typeOptions.map((opcija) => (
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
{editSport.discipline.length > 0 ?
editSport.discipline.map((disciplina, index) => (
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
{editSport.category.map((category, index) => (
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
<button onClick={() => {setSelectedSport({}); setUpdateForm(false); }}> Odustani </button>
</form>
    </>
)}

{updatedSport && (
<>
<h2> Ažurirani sport  </h2>
<table>
<thead>
<tr>
<th> Ime sporta </th>
<th> status  sporta </th>
<th> Vrsta sporta </th>
<th> Discipline </th>
<th> Kategorije </th>
</tr>
</thead>
<tbody>
<tr>
<td> {selectedSport.name} </td>
<td> {selectedSport.status} </td>
<td> {selectedSport.type} </td>
<td> {selectedSport.discipline.length === 0 ? `Nema disciplina` : selectedSport.discipline.join(', ')} </td>
<td> {selectedSport.category.length === 0 ? `Nema kategorija` : selectedSport.category.join(', ')} </td>
</tr>
</tbody>
</table>
<button onClick={() => { setFilterActive(false); setUpdateSport(false);}    }> Povratak na pretragu </button>
    </>
)}

<Novosti />
</>
);
}

export default Sportovi;
