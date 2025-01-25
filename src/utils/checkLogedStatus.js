import fetchClijent from './fetchClijent';
import token from './token';
import loger from './loger';

export const checkLogedIn = async (navigate) => {
      if(token.get){
        try{
const response = await fetchClijent('http://localhost:4000/api/users/me', {
    Method : 'GET',
});

if(response.ok){
        navigate('/profil');
}
}
catch(error){
loger.log('Korisnik nije ulogovan', error);
}
    }
};

export const checkLogedOut = async (navigate) => {
if(!token.get()){
navigate('/prijava');
return true;
    }
    return false;
};