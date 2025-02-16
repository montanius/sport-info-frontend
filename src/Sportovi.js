import React, { useState} from 'react';
import Novosti from './Novosti';
import loger from './utils/loger';
import {fetchData} from './utils/fetchData';
import { Link } from 'react-router-dom';

function Sportovi() {
    const [sports, setSports] = useState([]);
    const [error, setError] = useState(null);
    const [filterActive, setFilterActive] = useState(false);
    const [name, setName] = useState("");
        const [status, setStatus] = useState('');
    const [type, setType] = useState('');
                    const [advanceFind, setAdvanceFind] = useState(false);
    const statusOptions = ["Olimpijski", "Paraolimpijski", "Neolimpijski"];
    const typeOptions = ["kolektivni", "individualni"];
    const logerContext = 'Komponenta sportovi';

const handleSubmit = async (e) => {
e.preventDefault();
const fetchedSports = await  fetchData({
    endpoint : 'sports',
    params : {name:name, status:status, type:type}, 
        logerContext: logerContext, });
setSports(fetchedSports);
setFilterActive(true);
setName('');
setStatus("");
setType("");
setAdvanceFind(false);
};

return (
<>
    <h1> Pretraga sportova </h1>
<form onSubmit={handleSubmit}>
    <input type='text' name='name' id='name' value={name} placeholder='Unesite dio ili puno ime sporta' onChange={(e) => {setName(e.target.value)}} />

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
<button type='button' onClick={() => setAdvanceFind(true)}> Napredna Pretraga </button>
<button type='submit'> Pretraži </button>
</form>

{filterActive && (
    <>
    <h2> Rezultati pretrage </h2>
    <ul>
        {sports.map((sport) => (
<li key={sport._id}> 
<Link to={`/sport/${sport._id}`}> {sport.name}</Link>
    </li>
        ))}
    </ul>
    </>
)}

<Novosti />
</>
)
};

export default Sportovi;