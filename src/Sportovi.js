import React, {useState, useEffect} from "react";
import Novosti from './Novosti';
import fetchClijent from './utils/fetchClijent';
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
const response = await fetchClijent('http://localhost:4000/api/sports', {
method : 'GET'
});

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
<ul>
{filteredSports.length > 0 ? (
filteredSports.map(( sport) => (
<li key={sport._id}> 
                        <p> {sport.name} </p>
                        <p> {sport.type}    </p>
                        </li>
                                                ))) : (
<p> Nema sportova sa odabranim statusom. </p>
)}
</ul>
<button onClick={() => setFilterActive(false)}> Nazad </button>
</>
)}

        <Novosti />
                    </>
    );
}

export default Sportovi;