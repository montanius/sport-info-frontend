import loger from "./loger";
const headers = {"Content-Type" : "application/json"};

export const  httpDelete  = async (url) => {
    try{
        const response = await fetch(`${url}`, {
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
    loger.log(`Greška pri izmjeni podataka ${error}`)
};
};