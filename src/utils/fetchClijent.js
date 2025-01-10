export const fetchClijent  = async (url, options = {}) => {
const token = localStorage.getItem('token');

const headers = {
    'Content-Type' : 'application/json',
    ...options.headers,
    ...(token ? {authorization : token} : {}),
    };

            const response = await fetch(url, {...options, headers});
            if(response.ok){
                return response;
            }
            else{
                throw new Error(`Response status: ${response.status}`);
            }
            
        

    
         };

 export default fetchClijent;