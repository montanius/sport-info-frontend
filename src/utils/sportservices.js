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

    