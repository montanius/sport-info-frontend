# sport-info-frontend

## Plan razvoja aplikacije

1. Prelazak sa JavaScripta na TypeScript
5. Dodati logiku za klubove

## Unapređenje postojećih funkcionalnosti

- Kada se obrise sport, ne treba da se sport dobije sa backenda na detalje sporta = (ne dobijaju se detalji obrisanog sporta, već se dobija null)
- Napraviti posebnu rutu za delete sporta, koja prima metodu DELETE
- addItemToArrayOfObj staviti u poseban fajl za utils, isto tako i za edit i za delete
- Neka backend ne vraca _id i isDeleted za objekte koje trazis
- Ekstraktovati query iz URL prilikom inicijacije komponente i upisati vrijednosti u input polja
- Neka vrste sportova postoje kao posebna kolekcija u bazi, tako da se na frontendu prikazu sve opcije sportova iz baze. Isto i za typeOptions i za statusOptions iz Sportovi.js odraditi