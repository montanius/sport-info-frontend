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
                const error = await response.json();
                throw new Error(`${error.message}`);
            }
         };

 export default fetchClijent;