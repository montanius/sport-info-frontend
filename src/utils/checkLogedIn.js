export const checkLogedIn = async (navigate) => {
    const token = localStorage.getItem('token');
    if(token){
        try{
const response = await fetch('http://localhost:4000/api/users/me', {
    method : 'GET', 
    headers : {
                Authorization : token,
                'Content-Type' : 'application/json',
    },
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