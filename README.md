# sport-info-frontend

## Plan razvoja aplikacije

1. Prelazak sa JavaScripta na TypeScript
5. Dodati logiku za klubove

## Unapređenje postojećih funkcionalnosti

- Rijesiti isArray probleme u JSX syntaxi
- Maknuti Napredna Pretraga dugme, odma obezbijediti naprednu pretragu
- Nakon update-a sporta, vratiti se na detailje sporta
- Nakon load-a sportovi stranice, nek se odma lodauju sportovi
- Kada se odradi query param pretraga na sportovi stranici, treba da se sacuva stanje pretrage, u URL takodje
- Kada se obrise sport, ne treba da se sport dobije sa backenda na detalje sporta
- Napraviti posebnu rutu za delete sporta, koja prima metodu DELETE
- addItemToArrayOfObj staviti u poseban fajl za utils, isto tako i za edit i za delete
- Neka backend ne vraca _id i isDeleted za objekte koje trazis