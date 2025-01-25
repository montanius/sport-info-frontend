export function nijePrazno(text){
const regexNijePrazno = /[^\s]/;
return regexNijePrazno.test(text);
}

export function validirajImePrezime  (Text) {
    const regexValidirajImePrezime = /^[\p{L}'\- ]+$/u;
    return regexValidirajImePrezime.test(Text);
};

export function validirajMaksimalnuDuzinu (text, duzinaTeksta) {
    return text.length < duzinaTeksta;
    };
        
    export function validirajEmail(text){
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regexEmail.test(text);
    };

    export function validirajLozinku(text){
const regexLozinka = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
return regexLozinka.test(text);
    };
    
export     const validator = {
        ime : [
            (value) => (nijePrazno(value) ? "" : "Morate unijeti ime."), 
        (value) => (validirajImePrezime(value) ? "" : "Morate unijeti ime u ispravnom formatu. Možete koristiti samo slova, apostrof i crticu."), 
        (value) => (validirajMaksimalnuDuzinu(value, 50) ? "" : "Ime ne smije biti duže od 50 karaktera") 
        ],
        prezime: [
            (value) => (nijePrazno(value) ? "" : "Morate unijeti prezime."), 
            (value) => (validirajImePrezime(value) ? "" : "Morate unijeti prezime u ispravnom formatu. Možete koristiti samo slova, apostrof i crticu."), 
            (value) => (validirajMaksimalnuDuzinu(value, 50) ? "" : "Prezime ne smije biti duže od 50 karaktera") 
            ], 
            status: [
                (value) => (nijePrazno(value) ? "" : "Morate odabrati status."), 
            ],
            email: [
                (value) => (validirajEmail(value) ? "" : "Morate unijeti email u ispravnom formatu."), 
            ], 
            lozinka: [
                (value) => (validirajLozinku(value) ? "" : "Morate unijeti lozinku u ispravnom formatu. lozinka mora imati najmanje  8 karaktera i morate koristiti  mala i velika slova i brojeve."), 
            ]
            };
        
            export const validacijaForme = (formData) => {
                const newErrors = {};
            Object.keys(formData).forEach((name) => {
            if(validator[name]){
            for(const validateFn of validator[name]){
                const error = validateFn(formData[name]);
            if(error){
                newErrors[name] = error;
                break;
            }
            }
        }
    });
    return newErrors;
    };