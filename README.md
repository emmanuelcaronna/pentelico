# Pentelico

Sito del marchio. HTML statico, nessuna compilazione, nessuna dipendenza esterna.

## Vederlo in locale

```bash
cd ~/Desktop/pentelico
python3 -m http.server 4000
```

## Le pagine

| File | Cosa |
|---|---|
| `index.html` | Apertura, pezzi in evidenza, i due repertori, il configuratore, le finiture, iscrizione |
| `collezione.html` | Catalogo con filtri per tipo e repertorio. Legge `?tipo=` e `?rep=` |
| `prodotto.html` | Scheda del pezzo. Legge `?id=`. Finitura e minuteria cambiano prezzo e riepilogo |
| `configuratore.html` | Pezzo, finitura, minuteria, monogramma. Prezzo dal vivo, richiesta via email |
| `maison.html` | Il nome, il metodo, le serie |
| `legale.html` | Titolare, dati, cookie, immagini, vendita |

## Dove si cambiano le cose

**Prodotti, prezzi, finiture e minuterie stanno tutti in `assets/js/catalogo.js`.**
È l'unico file da toccare per aggiungere un pezzo o ritoccare un prezzo: home, collezione,
schede e configuratore leggono da lì.

Aggiungere un pezzo significa aggiungere un oggetto all'array `PRODOTTI`, con `id`, `tipo`
(`borsa` o `gioiello`), `nome`, `prezzo`, `repertorio` (`classico` o `siciliano`),
`soggetto`, `misure`, `peso`, `testo` e `evidenza`.

## Le scelte

- **Bodoni Moda** per i titoli: è il carattere del neoclassicismo, disegnato a Parma nel 1790.
  **Archivo** per il testo. Entrambi ospitati qui, nessuna chiamata a Google.
- **Tema chiaro marmo** di default, **notte** se il sistema lo chiede.
- **Angoli a raggio zero** ovunque, bottoni e campi compresi.
- Le fotografie di scultura antica vengono dal Metropolitan Museum, Open Access CC0.
  Crediti in `assets/img/CREDITI.txt`.
- I riquadri sui prodotti sono **campioni di finitura**, non foto di prodotto:
  vanno sostituiti dagli scatti veri. Lista in `DA-COMPLETARE.md`.
