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

export const addItemToArrayOfObj = (prevObj, item, key) => {
    const updatedObj = {};
    updatedObj[key] = [...prevObj[key], item];
    return {...prevObj, ...updatedObj};
};

export const editItemToArrayOfObj = (setObj, arrayKey, index, newValue) => {
    setObj(prevObj => {
      const updateArray = [...prevObj[arrayKey]];
      updateArray[index] = newValue;
      return {
        ...prevObj,
        [arrayKey]: updateArray
      };
    });
  };

  export const deleteItemToArrayOfObj = (setObj, arrayKey, indexToDelete) => {
    setObj(prevObj => {
const updatedArray = prevObj[arrayKey].filter((_, index) => index !== indexToDelete);
return{
    ...prevObj, [arrayKey] : updatedArray, };
    });
  };