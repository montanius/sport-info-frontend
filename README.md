# sport-info-frontend

## Plan razvoja aplikacije

1. Prelazak sa JavaScripta na TypeScript
5. Dodati logiku za klubove

## Unapređenje postojećih funkcionalnosti

- Kada se obrise sport, ne treba da se sport dobije sa backenda na detalje sporta = (ne dobijaju se detalji obrisanog sporta, već se dobija null)
- Napraviti posebnu rutu za delete sporta, koja prima metodu DELETE
- addItemToArrayOfObj staviti u poseban fajl za utils, isto tako i za edit i za delete
- Neka backend ne vraca _id i isDeleted za objekte koje trazis