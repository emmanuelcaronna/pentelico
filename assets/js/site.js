/* =========================================================================
   PENTELICO - comportamento comune a tutte le pagine
   Nessuna libreria, nessuna richiesta a domini esterni, nessun cookie.
   ========================================================================= */
(function () {
  'use strict';

  var ENDPOINT_MODULO = '';                      /* vedi DA-COMPLETARE.md */
  var EMAIL = 'clienti@pentelico.it';
  window.PENTELICO_EMAIL = EMAIL;

  /* ---------- menu su schermo stretto ---------- */
  var apri = document.querySelector('.apri-menu');
  var menu = document.getElementById('menu');
  if (apri && menu) {
    var stretto = window.matchMedia('(max-width: 900px)');
    var sincronizza = function () {
      if (stretto.matches) { menu.hidden = true; apri.setAttribute('aria-expanded', 'false'); }
      else { menu.hidden = false; }
    };
    sincronizza();
    stretto.addEventListener('change', sincronizza);
    apri.addEventListener('click', function () {
      var aperto = apri.getAttribute('aria-expanded') === 'true';
      apri.setAttribute('aria-expanded', String(!aperto));
      menu.hidden = aperto;
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && stretto.matches) {
        menu.hidden = true; apri.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && stretto.matches && !menu.hidden) {
        menu.hidden = true; apri.setAttribute('aria-expanded', 'false'); apri.focus();
      }
    });
  }

  /* ---------- comparsa allo scorrimento ----------
     Motivo: le sezioni entrano in sequenza per dare gerarchia alla lettura. */
  var pigro = window.matchMedia('(prefers-reduced-motion: reduce)');
  function osserva(radice) {
    var nodi = (radice || document).querySelectorAll('.comparsa:not(.vista)');
    if (!('IntersectionObserver' in window) || pigro.matches) {
      Array.prototype.forEach.call(nodi, function (n) { n.classList.add('vista'); });
      return;
    }
    var o = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (v.isIntersecting) { v.target.classList.add('vista'); o.unobserve(v.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(nodi, function (n) { o.observe(n); });
  }
  window.PENTELICO_OSSERVA = osserva;
  osserva(document);

  /* ---------- pezzi: la lastra e la scheda breve ---------- */
  var C = window.PENTELICO;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  window.PENTELICO_ESC = esc;

  window.PENTELICO_LASTRA = function (finId, sigla, classi) {
    var f = C.finitura(finId);
    return '<div class="lastra ' + (classi || '') + '" style="background-image:' + f.grana + '" ' +
           'role="img" aria-label="Campione di finitura ' + esc(f.nome.toLowerCase()) + '">' +
           '<span class="sigla ' + (f.testo === 'chiaro' ? 'f-chiaro' : 'f-scuro') + '">' +
           esc(sigla) + '</span></div>';
  };

  window.PENTELICO_PEZZO = function (p, i) {
    var fin = p.tipo === 'borsa' ? 'statuario' : 'antico';
    return '<a class="pezzo comparsa" style="--i:' + (i % 4) + '" href="prodotto.html?id=' + encodeURIComponent(p.id) + '">' +
      window.PENTELICO_LASTRA(fin, p.nome) +
      '<div class="pezzo-dati"><span class="pezzo-nome">' + esc(p.nome) + '</span>' +
      '<span class="pezzo-prezzo">' + C.euro(p.prezzo) + '</span></div>' +
      '<p class="pezzo-sogg">' + esc(p.soggetto) + '</p></a>';
  };

  /* ---------- iscrizione ---------- */
  window.PENTELICO_ISCRIZIONE = legaIscrizione;
  legaIscrizione();

  function legaIscrizione() {
  var form = document.getElementById('modulo-iscrizione');
  if (!form || form.dataset.legato) return;
  form.dataset.legato = '1';
  var mail = document.getElementById('email-iscrizione');
  var err  = document.getElementById('errore-iscrizione');
  var ok   = document.getElementById('esito-iscrizione');

  mail.addEventListener('input', function () { err.hidden = true; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = mail.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      err.textContent = 'Serve un indirizzo email valido.';
      err.hidden = false; mail.focus(); return;
    }
    if (!ENDPOINT_MODULO) {
      window.location.href = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent('Iscrizione Pentelico') +
        '&body=' + encodeURIComponent('Iscrivimi agli aggiornamenti.\n\nEmail: ' + v + '\n');
      form.hidden = true; ok.hidden = false; return;
    }
    fetch(ENDPOINT_MODULO, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: v })
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      form.hidden = true; ok.hidden = false;
    }).catch(function () {
      err.textContent = 'Non è passata. Riprova, oppure scrivi a ' + EMAIL + '.';
      err.hidden = false;
    });
  });
  }
})();
