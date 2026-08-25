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

  /* ---------- movimento ----------
     1. le fotografie si scoprono a tendina, come un velo tolto da una scultura
     2. i titoli salgono da sotto una linea di taglio, parola per parola
     3. i blocchi salgono in sequenza, per dare ordine di lettura
     IntersectionObserver, mai un ascoltatore di scroll. */
  var pigro = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* i titoli si spezzano in parole: ognuna e' una maschera che si alza */
  function spezza(radice) {
    if (pigro.matches) return;
    var titoli = (radice || document).querySelectorAll('h1.display:not([data-spezzato]), h2.display:not([data-spezzato])');
    Array.prototype.forEach.call(titoli, function (h) {
      h.setAttribute('data-spezzato', '1');
      var frammenti = [];
      Array.prototype.forEach.call(h.childNodes, function (n) {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t.trim()) { frammenti.push(document.createTextNode(t)); return; }
            var w = document.createElement('span'); w.className = 'parola';
            var s = document.createElement('span'); s.textContent = t;
            w.appendChild(s); frammenti.push(w);
          });
        } else { frammenti.push(n.cloneNode(true)); }
      });
      h.textContent = '';
      frammenti.forEach(function (f) { h.appendChild(f); });
      var i = 0;
      Array.prototype.forEach.call(h.querySelectorAll('.parola'), function (w) {
        w.style.setProperty('--p', i++);
      });
    });
  }

  function osserva(radice) {
    var r = radice || document;
    spezza(r);
    var nodi = r.querySelectorAll('.comparsa:not(.vista), .telaio:not(.vista), .rep:not(.vista), h1.display:not(.vista), h2.display:not(.vista)');
    if (!('IntersectionObserver' in window) || pigro.matches) {
      Array.prototype.forEach.call(nodi, function (n) { n.classList.add('vista'); });
      return;
    }
    var o = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (v.isIntersecting) { v.target.classList.add('vista'); o.unobserve(v.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    /* Cio' che e' gia' in schermo si scopre subito, senza aspettare l'osservatore:
       l'apertura non deve mai restare coperta se l'osservatore tarda o non parte. */
    Array.prototype.forEach.call(nodi, function (n) {
      var r = n.getBoundingClientRect();
      if (r.top < (window.innerHeight || 0) && r.bottom > 0) {
        requestAnimationFrame(function () { n.classList.add('vista'); });
      } else {
        o.observe(n);
      }
    });
  }
  window.PENTELICO_OSSERVA = osserva;
  osserva(document);

  /* la barra si stringe quando la pagina si stacca dall'alto.
     Una sentinella invisibile, non un ascoltatore di scroll. */
  (function () {
    var barra = document.querySelector('.barra');
    if (!barra || !('IntersectionObserver' in window)) return;
    var sentinella = document.createElement('div');
    sentinella.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none';
    document.body.prepend(sentinella);
    new IntersectionObserver(function (v) {
      barra.classList.toggle('staccata', !v[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinella);
  })();

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
    var fin = p.finitura || (p.tipo === 'borsa' ? 'statuario' : 'antico');
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
