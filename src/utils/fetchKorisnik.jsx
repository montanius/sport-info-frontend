import fetchClijent from "./fetchClijent";
import loger from "./loger";

export const fetchKorisnik = async () => {
            const response = await fetchClijent('http://localhost:4000/api/users/me', {
            method : 'GET', 
        });

            if(response.ok){
                                                                                                const korisnikData = await response.json();
                return korisnikData;
          };
        };
        
export default fetchKorisnik;