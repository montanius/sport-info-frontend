import loger from "./loger";
const apiUrl = `http://localhost:4000/api`;
const sportsPath = `sports`;
const sportsUrl = `${apiUrl}/${sportsPath}`;
const headers = {"Content-Type" : "application/json"};

export const fetchUpdateSport = async (id) => {
    try{
const response = await fetch(`sportsUrl/${id}`, {
    method : 'PATCH',
    headers 
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
try{
const response = await fetch(`sportsUrl/${id}`, {
method : 'DELETE',
headers
        });
 if(!response.ok){
throw new Error(`Greška: ${response.statusText}`)
}
 const updatedData = await response.json();
 console.log(updatedData);
 return updatedData;
}
catch(error){
loger.log(`Greška pri izmjeni podataka ${error}`);
}
}