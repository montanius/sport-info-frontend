import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import { fetchData } from "./utils/fetchData";
import loger from "./utils/loger";
import { fetchUpdateSport} from "./utils/sport.data.services";
 
function UpdateSport ({sportData}) {
const {id} = useParams();
const [selectedSport, setSelectedSport] = useState(null);
const statusOptions = ["Olimpijski", "Paraolimpijski", "Neolimpijski"];
    const typeOptions = ["kolektivni", "individualni"];
const [newDiscipline, setNewDiscipline] = useState("");
const [newCategory, setNewCategory] = useState("");
const navigate = useNavigate();

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

const handleAddDiscipline = () => {
    const disciplina = newDiscipline.trim();
    if(!disciplina) return;
if(!selectedSport.discipline.includes(disciplina)){
                setSelectedSport(previusSportState => {
                const curentSportState = {
                    ...previusSportState, 
                    discipline : [...previusSportState.discipline, disciplina] 
                };
return curentSportState;
                            });
                                   setNewDiscipline("");
                        }
    };

    const handleEditDiscipline =  (index, newValue) => {
       setSelectedSport(previusSportState => {
                                                const updatedDiscipline = [...previusSportState.discipline];
                        updatedDiscipline[index] = newValue;
                           return{
                ...previusSportState, 
                discipline : updatedDiscipline
            };
            });
    };

const handleDeleteDiscipline = (index) => {
    setSelectedSport(previusSportState => {
const updatedDiscipline = previusSportState.discipline.filter((_, i) => i !== index);
return{
    ...previusSportState, 
    discipline : updatedDiscipline
};
    });
};

    const handleAddCategory = () => {
        const category = newCategory.trim();
        if(!category) return;
        if(!selectedSport.category.includes(category)){
setSelectedSport(previusSportState => {
const curentSportState = {
    ...previusSportState, 
    category : [...previusSportState.category, category]
};
return curentSportState;
});
setNewCategory("");  
        }
                };

const handleEditCategory = (index, newValue) => {
    setSelectedSport(previusSportState => {
        const updatedCategory = [...previusSportState.category];
updatedCategory[index] = newValue;
return{
    ...previusSportState, 
    category : updatedCategory};
    });
};

const handleDeleteCategory = (index) => {
    setSelectedSport(previusSportState => {
const updatedCategory = previusSportState.category.filter((_, i) => i !== index);
return{
    ...previusSportState, 
    category : updatedCategory
};});
};

  const handleUpdateSport = async (e) => {
    e.preventDefault();
await fetchUpdateSport(id, selectedSport);
navigate(`/sport/${id}`);
};  

return(
    <>
<h1> Izmjena podataka o sportu  </h1>
{selectedSport && <>
<form onSubmit={handleUpdateSport}>

<h2> Ime sporta  </h2>

    <label htmlFor='name'> Ime sporta </label>
<input type='text' name='name' id='name' value={selectedSport.name} onChange={(e => setSelectedSport({...selectedSport, name: e.target.value}))} placeholder='Unesite novo ime sporta' />


<h2> Status sporta </h2>

<label htmlFor='status'> Status sporta </label>
<select name='status' id='status' value={selectedSport.status} onChange={(e) => setSelectedSport({...selectedSport, status: e.target.value})} >
{statusOptions.map((opcija) => (
    <option key={opcija} value={opcija}> {opcija} </option>
))}
</select>

<h2> Vrsta sporta </h2>

<label htmlFor='type'> Vrsta sporta  </label>
<select name='type' id='type' value={selectedSport.type} onChange={(e) => setSelectedSport({...selectedSport, type: e.target.value})}>
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
{selectedSport &&  selectedSport.discipline.length > 0 ?
selectedSport.discipline.map((disciplina, index) => (
    <tr key={index}>
        <td>
            <input type='text' value={disciplina} onChange={(e) => handleEditDiscipline(index, e.target.value)} placeholder='Unesite novo ime discipline' />
  </td>
              <td>
              <button type='button'  onClick={() =>  handleDeleteDiscipline(index) }> Izbriši disciplinu </button>
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
<button type='button' onClick={ handleAddDiscipline}> Dodaj disciplinu </button>

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
{selectedSport && selectedSport.category.length > 0 ? 
selectedSport.category.map((category, index) => (
    <tr key={index}>
        <td>
            <input type='text' value={category} onChange={(e) => handleEditCategory(index, e.target.value)} placeholder='Unesite novo ime kategorije' />
  </td>
              <td>
              <button type='button' onClick={() => handleDeleteCategory(index)} > Izbriši kategoriju </button>
        </td>
    </tr>
))
: <tr> 
    <td colSpan='2'> Nema kategorija </td>
</tr>
}
</tbody>
</table>

<h3> Dodavanje kategorije </h3>
<label htmlFor='addCategory'> Nova kategorija </label>
<input type='text' id='addCategory' value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
<button type='button' onClick={handleAddCategory}> Dodaj kategoriju </button>

<button type='submit'> Ažuriraj podatke  </button>
</form>
</>}
<Link to={`/sport/${id}`}> Povratak na detalje sporta </Link>
    </>
);
}

export default UpdateSport;