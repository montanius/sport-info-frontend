import loger from './loger';

export const fetchData = async ({endpoint, params= {}, logerContext}) => {
    try {
const queryFinal = new URLSearchParams(params);
const response = await fetch(`http://localhost:4000/api/${endpoint}?${queryFinal}`, {
method: 'GET',
headers: {
'Content-Type': 'application/json',
},
});
if (!response.ok) {
    loger.log(`error ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
    } 
    catch (error) {
    loger.log(logerContext, error.message);
        }
    };