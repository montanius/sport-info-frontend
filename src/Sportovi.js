import React, {useState, useEffect} from "react";
import Novosti from './Novosti';
import loger from './utils/loger';

function Sportovi (){
const [sports, setSports] = useState([]);
const [error, setError] = useState(null);
const [filteredSports, setFilteredSports] = useState([]);
const [filterActive, setFilterActive] = useState(false);
const logerContext = "Komponenta sportovi";

useEffect(() => {
    const fetchSports = async () => {
try{
const response = await fetch('http://localhost:4000/api/sports', {
method : 'GET',
headers : {
"Content-Type" : 'application/json'
}});

if(!response.ok){
console.log(`error ${response.status} ${response.statusText}`);
}
const sports = await response.json();
setSports(sports);
}
catch(error){
loger.log(logerContext, error.message);
setError(error.message);
}
    };
    fetchSports();
}, []);

const filterByStatus = (status) => {
const filtered = sports.filter((sport) => sport.status === status);
setFilteredSports(filtered);
setFilterActive(true);
};

    return (
    <>
        <h1> Odaberi status sporta </h1>
<div>
    <button onClick={() => filterByStatus("Olimpijski")}> Olimpijski sportovi  </button>
    <button onClick={() => filterByStatus("Paraolimpijski")}> Paraolimpijski sportovi  </button>
    <button onClick={() => filterByStatus("Neolimpijski")}> Neolimpijski sportovi  </button>
</div>

{filterActive && (
    <>
<table>
    <thead>
<tr>
<th> Ime sporta  </th>
<th> Vrsta sporta  </th>
<th> Discipline </th>
<th> Kategorije  </th>
</tr>
</thead>
<tbody>
{filteredSports.length > 0 ? (
filteredSports.map(( sport) => (
                        <tr key={sport._id}>
                        <td> {sport.name} </td>
                        <td> {sport.type}    </td>
                        <td> {Array.isArray(sport.discipline) ? sport.discipline.join(", ") : ""} </td>
                        <td> {Array.isArray(sport.kategorije) ? sport.kategorije.join(", ") : ""} </td>
                        </tr>
                                                                        ))) : (
<tr>
<td colSpan="4"> Nema sportova sa odabranim statusom. </td>
</tr>
)}
</tbody>
                                                </table>
                                                                     : 
<button onClick={() => setFilterActive(false)}> Nazad </button>
</>
)}

        <Novosti />
                    </>
    );
}

export default Sportovi;