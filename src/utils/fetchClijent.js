export const fetchClijent  = async (url, options = {}) => {
const token = localStorage.getItem('token');

const headers = {
    'Content-Type' : 'application/json',
    ...options.headers,
    ...(token ? {authorization : token} : {}),
    };

            const response = await fetch(url, {...options, headers});
        
    return response;
         };

 export default fetchClijent;