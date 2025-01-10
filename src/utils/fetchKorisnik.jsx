import fetchClijent from "./fetchClijent";
import loger from "./loger";

export const fetchKorisnik = async () => {
    const token = localStorage.getItem('token');
    if(!token){
        throw new Error("Token nije pronađen.");
    } 
             try{
            const response = await fetchClijent('http://localhost:4000/api/users/me', {
            method : 'GET', 
        });

            if(!response.ok){
                                 throw new Error("Došlo je do greške u preuzimanju podataka o korisniku.");
                                                }
                const korisnikData = await response.json();
                return korisnikData;
           }
        catch(err){
                loger.error("Došlo je do greške u preuzimanju podataka o korisniku.", err.message);
                throw err;
            }
};

export default fetchKorisnik;