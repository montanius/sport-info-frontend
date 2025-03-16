import React, { useState, useEffect} from 'react';
import Novosti from './Novosti';
import loger from './utils/loger';
import {fetchData} from './utils/fetchData';
import { Link, useSearchParams } from 'react-router-dom';

function Sportovi() {
    const [sports, setSports] = useState([]);
    const [error, setError] = useState(null);
    const [filterActive, setFilterActive] = useState(false);
    const [name, setName] = useState("");
        const [status, setStatus] = useState('');
    const [type, setType] = useState('');
                        const statusOptions = ["Olimpijski", "Paraolimpijski", "Neolimpijski"];
    const typeOptions = ["kolektivni", "individualni"];
    const logerContext = 'Komponenta sportovi';
const [searchParams, setSearchParams] = useSearchParams();

    const fetchAllSports = async () => {
        try{
    const data = await fetchData({
    endpoint : 'sports',
    params : {}, 
    logerContext : 'Sportovi komponenta'
    });
    setSports(data);
    //setFilterActive(true);
    }
            catch(error){
    loger.log(`logerContext ${error.message}`);
        }
    }

useEffect(() => {
    fetchAllSports();
}, []);

useEffect(() => {
    const fetchsports = async () => {
        const params = Object.fromEntries(searchParams);
        const fetchedSports = await  fetchData({
            endpoint : 'sports',
            params : params, 
                logerContext: logerContext, });
        setSports(fetchedSports);
        setFilterActive(Object.keys(params).length > 0);
    }
    fetchsports();
}, [searchParams]);

const handleSubmit = async (e) => {
e.preventDefault();
const params = {};
 if(name) params.name= name;
 if(status) params.status = status;
 if(type) params.type = type;

setSearchParams(params);
};

return (
<>
    <h1> Pretraga sportova </h1>
<form onSubmit={handleSubmit}>
    <input type='text' name='name' id='name' value={name} placeholder='Unesite dio ili puno ime sporta' onChange={(e) => {setName(e.target.value)}} />

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
<button type='submit'> Pretraži </button>
</form>
<button type='button' onClick={() =>{
    setName('');
    setStatus("");
    setType("");
    setFilterActive(false);
    setSearchParams({});
}}> Poništi filter </button>

{filterActive ?
    <>
    <h2> Rezultati pretrage </h2>
    </> :
    <>
        <h2> Lista sportova </h2>
</>}

    <ul>
        {sports &&  sports.map((sport) => (
<li key={sport._id}> 
<Link to={`/sport/${sport._id}`}> {sport.name}</Link>
    </li>
        ))}
    </ul>
    
<Novosti />
</>
)
};

export default Sportovi;