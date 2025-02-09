import loger from "./loger";

export const fetchSports = async ({name, status, type, setName, setStatus, setType, setFilterActive, setSports, logerContext, setError}) => {
    try {
const query = [];
if (name) query.push(`name=${encodeURIComponent(name)}`);
if (status) query.push(`status=${encodeURIComponent(status)}`);
if (type) query.push(`type=${encodeURIComponent(type)}`);
const queryFinalOld = query.length > 0 ? `?${query.join('&')}` : '';
const queryFinal = new URLSearchParams({name, status, type});
    const response = await fetch(`http://localhost:4000/api/sports${queryFinal}`, {
method: 'GET',
headers: {
'Content-Type': 'application/json',
},
});

if (!response.ok) {
loger.log(`error ${response.status} ${response.statusText}`);
}
const sports = await response.json();
setSports(sports);
setFilterActive(true);
} 
catch (error) {
loger.log(logerContext, error.message);
setError(error.message);
}
};

export const handleAddItem = (newItem, setNewItem, setEditSport, key ) => {
    if(newItem.trim()){
        setEditSport(prevSport => {
        const updatedSport = {
            ...prevSport,
            [key] : [...prevSport[key], newItem] 
        };
            return updatedSport;
    });
    setNewItem("");
        }
    };

    export const handleEditItem= (index, newValue, setEditSport, key) => {
        setEditSport(prevSport => {
            const updateItems = [...prevSport[key]];
            updateItems[index] = newValue;
            const updatedData = {...prevSport, [key] : updateItems}
            setEditSport(updatedData);
            return updatedData;;
    });
    };
    
    export const handleDeleteItem = (index, setEditSport, key) => {
        setEditSport(prevSport => {
    const updateItems = prevSport[key].filter((_ , i) => i !== index);
    const updatedData = {...prevSport, [key] : updateItems};
    setEditSport(updatedData);
    return updatedData;
        });
    };

    export const fetchUpdateSport = async (editSport, selectedSport, setSelectedSport, setUpdateForm, setFilterActive, setUpdateSport) => {
                try{
if(!selectedSport || !selectedSport._id){
throw new Error(`Id sporta nije pronađen. ${selectedSport}`);
}

            const response = await fetch(`http://localhost:4000/api/sports/${selectedSport._id}`, {
                method : 'PATCH',
                headers : {
                    "Content-Type" : "application/json", 
                },  
                    body : JSON.stringify(editSport),
                });
                     if(!response.ok){
            throw new Error(`Greška: ${response.statusText}`)
                }
                     const updatedData = await response.json();
                await setSelectedSport(updatedData);
                setUpdateForm(false);
                setFilterActive(false);
                setUpdateSport(true);
                alert(`Podaci o sportu su uspješno izmijenjeni.`);
                }
                catch(error){
            loger.log(`Greška pri izmjeni podataka ${error}`);
                }
    }