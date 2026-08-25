/* =========================================================================
   PENTELICO - il catalogo
   Sorgente di verità unica: prodotti, finiture, minuterie, prezzi.
   Le pagine leggono da qui. Per cambiare un prezzo si tocca solo questo file.
   ========================================================================= */

window.PENTELICO = (function () {
  'use strict';

  var FINITURE = [
    { id: 'statuario', nome: 'Bianco statuario', pietra: '#E8E6E0',
      grana: 'linear-gradient(148deg,#F4F3EF 0%,#E4E2DB 44%,#CFCDC5 100%)',
      testo: 'scuro', nota: 'Il bianco dei marmi di Carrara, opaco.' },
    { id: 'bardiglio', nome: 'Grigio bardiglio', pietra: '#8E9295',
      grana: 'linear-gradient(148deg,#A9ADB0 0%,#8A8E92 46%,#6B6F73 100%)',
      testo: 'chiaro', nota: 'Il grigio cenere delle colonne romane.' },
    { id: 'antico', nome: 'Nero antico', pietra: '#232525',
      grana: 'linear-gradient(148deg,#3A3C3C 0%,#232525 46%,#151616 100%)',
      testo: 'chiaro', nota: 'Il nero delle sculture di epoca imperiale.' },
    { id: 'terracotta', nome: 'Terracotta', pietra: '#A95B3C',
      grana: 'linear-gradient(148deg,#C47A55 0%,#A95B3C 46%,#7C3F27 100%)',
      testo: 'chiaro', nota: 'Il cotto delle metope arcaiche.' }
  ];

  var MINUTERIE = [
    { id: 'acciaio', nome: 'Acciaio 316L', delta: 0,  nota: 'Inox chirurgico, nichel free.' },
    { id: 'titanio', nome: 'Titanio',      delta: 25, nota: 'Più leggero, per pelli sensibili.' },
    { id: 'oro',     nome: 'Oro PVD',      delta: 40, nota: 'Deposizione dorata su acciaio 316L.' }
  ];

  var INCISIONE = { nome: 'Monogramma inciso', delta: 20,
                    nota: 'Fino a tre lettere, sul fondo del pezzo.' };

  var PRODOTTI = [
    /* ---- borse, repertorio classico ---- */
    { id: 'acanto',      tipo: 'borsa',    nome: 'Acanto',      prezzo: 189, repertorio: 'classico',
      soggetto: 'Foglia d’acanto del capitello corinzio',
      misure: '24 × 17 × 11 cm', peso: '380 g', evidenza: true,
      testo: 'La foglia che avvolge il capitello corinzio, srotolata sul fianco della borsa. Il rilievo corre sui quattro lati e si chiude sul fondo.' },

    { id: 'meandro',     tipo: 'borsa',    nome: 'Meandro',     prezzo: 179, repertorio: 'classico',
      soggetto: 'Greca continua',
      misure: '23 × 16 × 10 cm', peso: '350 g', evidenza: false,
      testo: 'La greca che non si interrompe mai, incisa in negativo. La linea più antica dell’ornamento, e la più difficile da fermare.' },

    { id: 'palmetta',    tipo: 'borsa',    nome: 'Palmetta',    prezzo: 199, repertorio: 'classico',
      soggetto: 'Palmette ioniche',
      misure: '25 × 16 × 11 cm', peso: '400 g', evidenza: true,
      testo: 'Il fregio di palmette che chiude la trabeazione ionica, ripetuto in serie sul corpo del pezzo.' },

    { id: 'menade',      tipo: 'borsa',    nome: 'Menade',      prezzo: 229, repertorio: 'classico',
      soggetto: 'Figura panneggiata in movimento',
      misure: '26 × 18 × 11 cm', peso: '430 g', evidenza: true,
      testo: 'Il panneggio bagnato dei rilievi neoattici, dove la stoffa pesa e il corpo si vede sotto. Il pezzo più lavorato della collezione.' },

    /* ---- borse, repertorio siciliano ---- */
    { id: 'mascherone',  tipo: 'borsa',    nome: 'Mascherone',  prezzo: 229, repertorio: 'siciliano',
      soggetto: 'Mascherone barocco',
      misure: '26 × 18 × 12 cm', peso: '450 g', evidenza: false,
      testo: 'Il volto che sporge dalle mensole dei balconi barocchi, in aggetto pieno sul fronte della borsa.' },

    { id: 'zisa',        tipo: 'borsa',    nome: 'Zisa',        prezzo: 209, repertorio: 'siciliano',
      soggetto: 'Intreccio arabo normanno',
      misure: '25 × 17 × 11 cm', peso: '410 g', evidenza: false,
      testo: 'La trama a intreccio dei portali normanni, dove la geometria islamica incontra l’arco a sesto acuto.' },

    { id: 'trinacria',   tipo: 'borsa',    nome: 'Trinacria',   prezzo: 199, repertorio: 'siciliano',
      soggetto: 'Trinacria a rilievo',
      misure: '24 × 17 × 11 cm', peso: '390 g', evidenza: false,
      testo: 'Il simbolo dell’isola trattato come un medaglione antico, non come uno stemma.' },

    /* ---- gioielli ---- */
    { id: 'voluta',      tipo: 'gioiello', nome: 'Voluta',      prezzo: 49,  repertorio: 'classico',
      soggetto: 'Voluta ionica',
      misure: '3,2 × 2,4 cm', peso: '4 g', evidenza: true,
      testo: 'La spirale che chiude il capitello ionico, ridotta alla scala dell’orecchio.' },

    { id: 'conchiglia',  tipo: 'gioiello', nome: 'Conchiglia',  prezzo: 55,  repertorio: 'classico',
      soggetto: 'Conchiglia della nicchia',
      misure: '3,6 × 3,0 cm', peso: '5 g', evidenza: false,
      testo: 'Il catino a conchiglia che copre le nicchie, con le costole che si aprono a ventaglio.' },

    { id: 'palmetta-g',  tipo: 'gioiello', nome: 'Palmetta',    prezzo: 45,  repertorio: 'classico',
      soggetto: 'Palmetta ionica',
      misure: '3,0 × 2,2 cm', peso: '4 g', evidenza: false,
      testo: 'Lo stesso fregio della borsa Palmetta, in un solo elemento.' },

    { id: 'caltagirone', tipo: 'gioiello', nome: 'Caltagirone', prezzo: 59,  repertorio: 'siciliano',
      soggetto: 'Decoro della maiolica',
      misure: '3,4 × 2,6 cm', peso: '5 g', evidenza: false,
      testo: 'Il disegno delle maioliche di Caltagirone, portato dal piatto al rilievo.' }
  ];

  function trova(id)   { return PRODOTTI.filter(function (p) { return p.id === id; })[0]; }
  function finitura(id){ return FINITURE.filter(function (f) { return f.id === id; })[0] || FINITURE[0]; }
  function minuteria(id){ return MINUTERIE.filter(function (m) { return m.id === id; })[0] || MINUTERIE[0]; }
  function euro(n)     { return n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR',
                                                            minimumFractionDigits: 0 }); }

  return {
    prodotti: PRODOTTI, finiture: FINITURE, minuterie: MINUTERIE, incisione: INCISIONE,
    trova: trova, finitura: finitura, minuteria: minuteria, euro: euro
  };
})();
