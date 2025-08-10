# sport-info-frontend

## Plan razvoja aplikacije

1. Prelazak sa JavaScripta na TypeScript
5. Dodati logiku za klubove

## Unapređenje postojećih funkcionalnosti

NOVI PRIORITETI:

1. Standardizovati odgovore koji stižu sa backenda - tako da svaki odgovor sa statusom 400 (znači 401, 403, 404, 407...) ima isti naziv propertija errorMessage kao dio odgovora
2. Napraviti specifičnu modal komponentu na frontendu koja će se pozivati kada treba neka akcija da se potvrdi, kao na primjer kada brišemo sport, koristiti to umjesto alert funkcije 
3. Napraviti specifični toster notifikacija komponentu, koja omogućava da se prikazuju pristupačne notifikacije kada se uspješno izvrši neka operacija, bez potrebe da se udari ikakva potvrda na tu notifikaciju, kao što sad mora sa alert funkcijom
4. Istražiti RADIX UI biblioteku i vidjeti može li da se koristi uz našu aplikaciju, na primjer, može li se iskoristiti ova biblioteka za toaster notifikacije ili modal

STARI PRIORITETI:

- Kada se obrise sport, ne treba da se sport dobije sa backenda na detalje sporta = (ne dobijaju se detalji obrisanog sporta, već se dobija null)
- Napraviti posebnu rutu za delete sporta, koja prima metodu DELETE - urađemp
- addItemToArrayOfObj staviti u poseban fajl za utils, isto tako i za edit i za delete
- Neka backend ne vraca _id i isDeleted za objekte koje trazis
- Ekstraktovati query iz URL prilikom inicijacije komponente i upisati vrijednosti u input polja
- Neka vrste sportova postoje kao posebna kolekcija u bazi, tako da se na frontendu prikazu sve opcije sportova iz baze. Isto i za typeOptions i za statusOptions iz Sportovi.js odraditi