# Pentelico: cosa manca

## 1. Bloccante e non tecnico: l'art. 508

Il sito espone prezzi e raccoglie richieste d'ordine via email. Non è più solo una vetrina.
Finché non c'è la risposta di STP sull'art. 508 (todo #68, rientrano l'01/09/2026) il
repository resta privato, Pages spento, `robots.txt` chiuso.

## 2. Il dominio

`pentelico.it` e `pentelico.com` risultavano liberi il 25/08/2026. Da registrare insieme,
e ricontrollare prima: la disponibilità cambia di giorno in giorno.
Prima di depositare il marchio serve una ricerca di anteriorità UIBM fatta da un consulente.

## 3. Le fotografie

Il sito ha immagini vere solo di repertorio (scultura antica, CC0 dal Metropolitan).
Sui prodotti ci sono campioni di finitura. Servono gli scatti:

| Dove | Cosa | Formato |
|---|---|---|
| Scheda prodotto | Ogni pezzo, tre quarti su fondo neutro | 1600 x 2000 |
| Scheda prodotto | Un dettaglio ravvicinato del rilievo | 1600 x 2000 |
| Collezione | Lo stesso scatto principale, ritagliato 4:5 | 1200 x 1500 |
| Apertura | Un pezzo indossato | 1400 x 1900 |
| Condivisione | `og:image` | 1200 x 630 |

Sostituire un campione con una foto: al posto della chiamata a `PENTELICO_LASTRA(...)` va
un `<img src="assets/img/nome.webp" alt="..." width="..." height="...">`. Il punto è uno solo
per pagina, dentro lo script in fondo al file.

## 4. Prezzi

Li ho fissati io, guardando il mercato: borse **179 - 229 €**, gioielli **45 - 59 €**,
titanio +25 €, oro PVD +40 €, monogramma +20 €. Relievum sta a 99 - 208 € sulle borse e
19 - 29 € sugli orecchini, quindi il posizionamento è appena sopra.
Si cambiano tutti in `assets/js/catalogo.js`, campo `prezzo`.

## 5. Le email

`clienti@pentelico.it` **non esiste ancora**. Va creata, o cambiata ovunque:

```bash
cd ~/Desktop/pentelico
grep -rl "clienti@pentelico.it" . --exclude-dir=.git | xargs sed -i '' 's/clienti@pentelico.it/NUOVA@INDIRIZZO.it/g'
```

## 6. Il modulo di iscrizione

Adesso apre il client di posta. Per renderlo automatico, una riga in `assets/js/site.js`:

```js
var ENDPOINT_MODULO = 'https://formspree.io/f/xxxxxxx';
```

Il servizio scelto va poi nominato nelle note legali come responsabile del trattamento.

## 7. Il carrello, quando servirà

Oggi l'ordine si concorda per email, e per i primi pezzi va benissimo. Quando il volume
lo richiede, le strade sono due: **Shopify** (canone, ma incasso e fatturazione integrati)
oppure **Etsy** (nessuna infrastruttura, commissione più alta, meno controllo sul marchio).
Il sito così com'è si sposta su entrambi senza riscrivere il catalogo.

## 8. Art. 108 sui beni culturali

Il catalogo attuale usa **tipi ornamentali** (acanto, greca, palmetta, mascherone, intreccio)
e non monumenti identificati. È una scelta voluta: riprodurre a scopo di lucro un bene
culturale specifico richiede autorizzazione del consegnatario e canone, anche con foto
proprie. Se un giorno entra in catalogo un monumento riconoscibile, quella pratica va fatta
prima.

## 9. Prima di pubblicare

- [ ] Risposta STP sull'art. 508
- [ ] Domini registrati
- [ ] Casella email attiva
- [ ] Almeno gli scatti dei pezzi in evidenza
- [ ] `og:image` presente
- [ ] `noindex` tolto dalle sei pagine e `robots.txt` aperto
- [ ] Provato su telefono, in tema chiaro e in tema scuro
