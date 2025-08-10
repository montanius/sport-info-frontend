import loger from "./loger";
import {httpDelete} from "./http.data.services";
const apiUrl = `http://localhost:4000/api`;
const sportsPath = `sports`;
const sportsUrl = `${apiUrl}/${sportsPath}`;
const headers = {"Content-Type" : "application/json"};

export const fetchUpdateSport = async (id, obj) => {
    try{
const response = await fetch(`${sportsUrl}/${id}`, {
    method : 'PATCH',
    headers,
    body : JSON.stringify(obj), 
            });
         if(!response.ok){
throw new Error(`Greška: ${response.statusText}`)
    }
         const updatedData = await response.json();
return updatedData;
    }
    catch(error){
loger.log(`Greška pri izmjeni podataka ${error}`);
    }
}

export const fetchDeleteSport = async (id) => {
return httpDelete(`${sportsUrl}/${id}`);
};

  