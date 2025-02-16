import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {fetchData} from './utils/fetchData';
import {fetchUpdateSport} from './utils/sportservices';
import loger from './utils/loger';


function Sport (){
const {id} = useParams();
const [sportData, setSportData] = useState({});
const navigate = useNavigate();

useEffect(() => {
    const fetchSport = async () => {
        try{
const data =  await fetchData({
    endpoint : 'sports/sport', 
    params : {_id : id},
    logerContext : 'Komponenta Sport' 
});
setSportData(data);
    }
catch(error){
    loger.log(error.message);
}
};
fetchSport();
}, [id]);

const handleDeleteSport = async (e) => {
    e.preventDefault();
        const isConfirmed = window.confirm(`Da li želite da izbrišete sport?`);
    if(isConfirmed){
const deletedSport = { ...sportData, isDeleted : true};
await fetchUpdateSport(deletedSport, setSportData, 'Sport je uspješno izbrisan.');
navigate('/sportovi');
                }
                else{
                    loger.log(`Brisanje je otkazano.`);
                }
};

    return(
<>
<h1> Detalji sporta </h1>
<h2> Naziv:  {sportData.name} </h2>
<h2> Status: {sportData.status} </h2>
<h2> Vrsta:  {sportData.type} </h2>

<h2> Discipline: </h2>
<ul>
    {Array.isArray(sportData.discipline) &&  sportData.discipline.length > 0 ? 
    sportData.discipline.map((disciplina, index) => (
        <li key={index}> {disciplina}  </li>
    ))
     : "Nema disciplina"}
    </ul>

    <h2> Kategorije: </h2>
<ul>
    {Array.isArray(sportData.category) &&  sportData.category.length > 0 ? 
    sportData.category.map((category, index) => (
        <li key={index}> {category}  </li>
    ))
     : "Nema kategorija"}
    </ul>


<Link to={"/sportovi"}> <button> Nazad na sportovi  </button>
</Link>

<Link to={`/updatesport/${sportData._id}`}> Izmijeni podatke o sportu </Link>
<button onClick={handleDeleteSport}>
        Izbriši sport 
        </button>
</>
    );
}

export default Sport;