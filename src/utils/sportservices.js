import loger from "./loger";

export const fetchSports = async ({name, status, type, logerContext, setError}) => {
    try {
const queryFinal = new URLSearchParams({name, status, type});
    const response = await fetch(`http://localhost:4000/api/sports?${queryFinal}`, {
method: 'GET',
headers: {
'Content-Type': 'application/json',
},
});
if (!response.ok) {
loger.log(`error ${response.status} ${response.statusText}`);
}
const sports = await response.json();
return sports;
} 
catch (error) {
loger.log(logerContext, error.message);
setError(error.message);
}
};

export const handleAddItem = (newItem, setNewItem, setSelectedSport, key ) => {
    if(newItem.trim()){
        setSelectedSport(prevSport => {
        const updatedSport = {
            ...prevSport,
            [key] : [...prevSport[key], newItem] 
        };
            return updatedSport;
    });
    setNewItem("");
        }
    };

    export const handleEditItem= (index, newValue, setSelectedSport, key) => {
        setSelectedSport(prevSport => {
            const updateItems = [...prevSport[key]];
            updateItems[index] = newValue;
            const updatedData = {...prevSport, [key] : updateItems}
            setSelectedSport(updatedData);
            return updatedData;;
    });
    };
    
    export const handleDeleteItem = (index, setSelectedSport, key) => {
        setSelectedSport(prevSport => {
    const updateItems = prevSport[key].filter((_ , i) => i !== index);
    const updatedData = {...prevSport, [key] : updateItems};
    setSelectedSport(updatedData);
    return updatedData;
        });
    };

    export const fetchUpdateSport = async (selectedSport, setSelectedSport, message) => {
                try{
           const response = await fetch(`http://localhost:4000/api/sports/${selectedSport._id}`, {
                method : 'PATCH',
                headers : {
                    "Content-Type" : "application/json", 
                },  
                    body : JSON.stringify(selectedSport),
                });
                     if(!response.ok){
            throw new Error(`Greška: ${response.statusText}`)
                }
                     const updatedData = await response.json();
                await setSelectedSport(updatedData);
alert(message);
                }
                catch(error){
            loger.log(`Greška pri izmjeni podataka ${error}`);
                }
    }

    export const fetchDeleteSport = async (id) => {
        try{
   const response = await fetch(`http://localhost:4000/api/sports/${id}`, {
        method : 'DELETE',
        headers : {
            "Content-Type" : "application/json", 
        },  
                    });
             if(!response.ok){
    throw new Error(`Greška: ${response.statusText}`)
        }
             const updatedData = await response.json();
             console.log("Sadržaj updateData je:", updatedData);
             return updatedData;
        }
        catch(error){
    loger.log(`Greška pri izmjeni podataka ${error}`);
        }
}