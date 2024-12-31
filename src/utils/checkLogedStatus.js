import fetchClijent from './fetchClijent';

export const checkLogedIn = async (navigate) => {
    const token = localStorage.getItem('token');
    if(token){
        try{
const response = await fetchClijent('http://localhost:4000/api/users/me', {
    Method : 'GET',
});

if(response.ok){
        navigate('/profil');
}
}
catch(error){
console.log('Korisnik nije ulogovan', error);
}
    }
};

export const checkLogedOut = async (navigate) => {
    const token = localStorage.getItem('token');
    if(!token){
navigate('/prijava');
    }
};