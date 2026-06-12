/* =========================================================
   michi normal — language, theme, nav, carousel, orders
   ========================================================= */
(function(){
  'use strict';
  var root = document.documentElement;
  var store = {
    get:function(k,d){try{return localStorage.getItem(k)||d}catch(e){return d}},
    set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  };

  var WHATSAPP = '213656360457';

  /* All 58 Algerian wilayas (official order) */
  var WILAYAS = ["01 - \u0623\u062f\u0631\u0627\u0631","02 - \u0627\u0644\u0634\u0644\u0641","03 - \u0627\u0644\u0623\u063a\u0648\u0627\u0637","04 - \u0623\u0645 \u0627\u0644\u0628\u0648\u0627\u0642\u064a","05 - \u0628\u0627\u062a\u0646\u0629","06 - \u0628\u062c\u0627\u064a\u0629","07 - \u0628\u0633\u0643\u0631\u0629","08 - \u0628\u0634\u0627\u0631","09 - \u0627\u0644\u0628\u0644\u064a\u062f\u0629","10 - \u0627\u0644\u0628\u0648\u064a\u0631\u0629","11 - \u062a\u0645\u0646\u0631\u0627\u0633\u062a","12 - \u062a\u0628\u0633\u0629","13 - \u062a\u0644\u0645\u0633\u0627\u0646","14 - \u062a\u064a\u0627\u0631\u062a","15 - \u062a\u064a\u0632\u064a \u0648\u0632\u0648","16 - \u0627\u0644\u062c\u0632\u0627\u0626\u0631","17 - \u0627\u0644\u062c\u0644\u0641\u0629","18 - \u062c\u064a\u062c\u0644","19 - \u0633\u0637\u064a\u0641","20 - \u0633\u0639\u064a\u062f\u0629","21 - \u0633\u0643\u064a\u0643\u062f\u0629","22 - \u0633\u064a\u062f\u064a \u0628\u0644\u0639\u0628\u0627\u0633","23 - \u0639\u0646\u0627\u0628\u0629","24 - \u0642\u0627\u0644\u0645\u0629","25 - \u0642\u0633\u0646\u0637\u064a\u0646\u0629","26 - \u0627\u0644\u0645\u062f\u064a\u0629","27 - \u0645\u0633\u062a\u063a\u0627\u0646\u0645","28 - \u0627\u0644\u0645\u0633\u064a\u0644\u0629","29 - \u0645\u0639\u0633\u0643\u0631","30 - \u0648\u0631\u0642\u0644\u0629","31 - \u0648\u0647\u0631\u0627\u0646","32 - \u0627\u0644\u0628\u064a\u0636","33 - \u0625\u0644\u064a\u0632\u064a","34 - \u0628\u0631\u062c \u0628\u0648\u0639\u0631\u064a\u0631\u064a\u062c","35 - \u0628\u0648\u0645\u0631\u062f\u0627\u0633","36 - \u0627\u0644\u0637\u0627\u0631\u0641","37 - \u062a\u064a\u0646\u062f\u0648\u0641","38 - \u062a\u064a\u0633\u0645\u0633\u064a\u0644\u062a","39 - \u0627\u0644\u0648\u0627\u062f\u064a","40 - \u062e\u0646\u0634\u0644\u0629","41 - \u0633\u0648\u0642 \u0623\u0647\u0631\u0627\u0633","42 - \u062a\u064a\u0628\u0627\u0632\u0629","43 - \u0645\u064a\u0644\u0629","44 - \u0639\u064a\u0646 \u0627\u0644\u062f\u0641\u0644\u0649","45 - \u0627\u0644\u0646\u0639\u0627\u0645\u0629","46 - \u0639\u064a\u0646 \u062a\u0645\u0648\u0634\u0646\u062a","47 - \u063a\u0631\u062f\u0627\u064a\u0629","48 - \u063a\u0644\u064a\u0632\u0627\u0646","49 - \u0627\u0644\u0645\u063a\u064a\u0631","50 - \u0627\u0644\u0645\u0646\u064a\u0639\u0629","51 - \u0623\u0648\u0644\u0627\u062f \u062c\u0644\u0627\u0644","52 - \u0628\u0631\u062c \u0628\u0627\u062c\u064a \u0645\u062e\u062a\u0627\u0631","53 - \u0628\u0646\u064a \u0639\u0628\u0627\u0633","54 - \u062a\u064a\u0645\u064a\u0645\u0648\u0646","55 - \u062a\u0642\u0631\u062a","56 - \u062c\u0627\u0646\u062a","57 - \u0639\u064a\u0646 \u0635\u0627\u0644\u062d","58 - \u0639\u064a\u0646 \u0642\u0632\u0627\u0645"];

  function isAr(){ return root.getAttribute('lang') !== 'en'; }
  function t(arTxt, enTxt){ return isAr() ? arTxt : enTxt; }
  function wilayaOptionsHTML(){
    var ph = '<option value="" disabled selected>'+t('\u0627\u062e\u062a\u0631 \u0627\u0644\u0648\u0644\u0627\u064a\u0629','Select wilaya')+'</option>';
    return ph + WILAYAS.map(function(w){ return '<option value="'+w+'">'+w+'</option>'; }).join('');
  }
  function fillWilayas(scope){
    (scope||document).querySelectorAll('select[data-field="wilaya"]').forEach(function(sel){
      if(sel.options.length <= 1){ sel.innerHTML = wilayaOptionsHTML(); }
    });
  }

  /* ---- THEME ---- */
  function applyTheme(t){ root.setAttribute('data-theme', t); store.set('elite-theme', t); }
  var savedTheme = store.get('elite-theme', null);
  if(!savedTheme){ savedTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'; }
  applyTheme(savedTheme);

  /* ---- LANGUAGE ---- */
  function applyLang(lang){
    var ar = lang === 'ar';
    root.setAttribute('lang', ar ? 'ar' : 'en');
    root.setAttribute('dir', ar ? 'rtl' : 'ltr');
    store.set('elite-lang', lang);
    document.querySelectorAll('[data-ar]').forEach(function(el){
      var v = ar ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if(v !== null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-ar-ph]').forEach(function(el){
      var v = ar ? el.getAttribute('data-ar-ph') : el.getAttribute('data-en-ph');
      if(v !== null) el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('.lang-label').forEach(function(el){ el.textContent = ar ? 'EN' : '\u0639'; });
  }
  var savedLang = store.get('elite-lang', null);
  if(!savedLang){ var _nl=(navigator.language||navigator.userLanguage||'ar').toLowerCase(); savedLang = _nl.indexOf('ar')===0?'ar':'en'; }

  /* ---- ORDER MODAL ---- */
  function buildModal(){
    if(document.getElementById('mnOrderModal')) return;
    var wrap = document.createElement('div');
    wrap.id = 'mnOrderModal';
    wrap.className = 'mn-modal';
    wrap.innerHTML =
      '<div class="mn-modal-card">'+
        '<button type="button" class="mn-close" aria-label="close">\u2715</button>'+
        '<div class="mn-modal-head"><div class="mn-modal-img"></div><div><h3 id="mnPName"></h3><div class="mn-modal-price" id="mnPPrice"></div></div></div>'+
        '<form id="mnForm" class="order-card" novalidate>'+
          '<div class="field"><label data-ar="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" data-en="Full name">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644</label><input data-field="name" type="text" required data-ar-ph="\u0627\u0643\u062a\u0628 \u0627\u0633\u0645\u0643" data-en-ph="Your name" placeholder="\u0627\u0643\u062a\u0628 \u0627\u0633\u0645\u0643"></div>'+
          '<div class="field"><label data-ar="\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641" data-en="Phone">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641</label><input data-field="phone" type="tel" required placeholder="05 / 06 / 07 ..."></div>'+
          '<div class="field"><label data-ar="\u0627\u0644\u0648\u0644\u0627\u064a\u0629" data-en="Wilaya">\u0627\u0644\u0648\u0644\u0627\u064a\u0629</label><select data-field="wilaya" required></select></div>'+
          '<div class="field"><label data-ar="\u0627\u0644\u0628\u0644\u062f\u064a\u0629 / \u0627\u0644\u0639\u0646\u0648\u0627\u0646" data-en="Commune / Address">\u0627\u0644\u0628\u0644\u062f\u064a\u0629 / \u0627\u0644\u0639\u0646\u0648\u0627\u0646</label><input data-field="address" type="text" data-ar-ph="\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0628\u0627\u0644\u062a\u0641\u0635\u064a\u0644" data-en-ph="Detailed address" placeholder="\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0628\u0627\u0644\u062a\u0641\u0635\u064a\u0644"></div>'+
          '<div class="field"><label data-ar="\u0627\u0644\u0643\u0645\u064a\u0629" data-en="Quantity">\u0627\u0644\u0643\u0645\u064a\u0629</label><div class="qty"><button type="button" data-step="down">\u2212</button><input data-field="qty" type="number" value="1" min="1" readonly><button type="button" data-step="up">+</button></div></div>'+
          '<button class="btn btn-primary btn-block btn-lg" type="submit" data-ar="\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0637\u0644\u0628" data-en="Confirm order">\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0637\u0644\u0628</button>'+
        '</form>'+
      '</div>';
    document.body.appendChild(wrap);
    fillWilayas(wrap);
    wrap.addEventListener('click', function(e){ if(e.target === wrap || e.target.classList.contains('mn-close')) closeModal(); });
    bindForm(wrap.querySelector('#mnForm'));
    bindQty(wrap);
  }
  function openModal(name, price, img){
    buildModal();
    var m = document.getElementById('mnOrderModal');
    m.querySelector('#mnPName').textContent = name;
    m.querySelector('#mnPPrice').textContent = Number(price).toLocaleString('fr-DZ') + ' \u062f\u062c';
    var imgEl = m.querySelector('.mn-modal-img');
    if(img){ imgEl.style.backgroundImage = "url('"+img+"')"; imgEl.style.display=''; } else { imgEl.style.display='none'; }
    var f = m.querySelector('#mnForm');
    f.setAttribute('data-product', name);
    f.setAttribute('data-price', price);
    applyLang(isAr()?'ar':'en');
    m.classList.add('open');
  }
  function closeModal(){ var m=document.getElementById('mnOrderModal'); if(m) m.classList.remove('open'); }

  function bindQty(scope){
    scope.querySelectorAll('.qty').forEach(function(q){
      var inp = q.querySelector('input');
      q.querySelectorAll('button').forEach(function(b){
        b.addEventListener('click', function(){
          var v = parseInt(inp.value,10)||1; v += (b.dataset.step==='up'?1:-1); if(v<1)v=1; inp.value=v;
        });
      });
    });
  }

  function successOverlay(orderId, phone, total){
    var ex = document.getElementById('mnSuccess'); if(ex) ex.remove();
    var o = document.createElement('div'); o.id='mnSuccess'; o.className='mn-success';
    var idHtml = orderId ? '<div class="mn-ok-row"><b>'+t('\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628','Order #')+':</b> '+orderId+'</div>' : '';
    var totHtml = (total||total===0) ? '<div class="mn-ok-row"><b>'+t('\u0627\u0644\u0645\u062c\u0645\u0648\u0639','Total')+':</b> '+Number(total).toLocaleString('fr-DZ')+' \u062f\u062c</div>' : '';
    o.innerHTML = '<div class="mn-success-card">'+
      '<div class="mn-check">\u2713</div>'+
      '<h3>'+t('\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0637\u0644\u0628\u0643','Your order is confirmed')+'</h3>'+
      '<p>'+t('\u0633\u0646\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0647\u0627\u062a\u0641\u064a\u064b\u0627 \u0644\u0644\u062a\u0623\u0643\u064a\u062f. \u0634\u0643\u0631\u064b\u0627 \u0644\u062b\u0642\u062a\u0643 \u0628\u0640 michi normal','We\u2019ll call you to confirm. Thank you for trusting michi normal')+'</p>'+
      '<div class="mn-ok-box">'+(phone?'<div class="mn-ok-row" dir="ltr"><b>'+phone+'</b></div>':'')+idHtml+totHtml+'</div>'+
      '<a class="btn btn-primary" target="_blank" rel="noopener" href="https://wa.me/'+WHATSAPP+'">'+t('\u062a\u0648\u0627\u0635\u0644 \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628','Chat on WhatsApp')+'</a>'+
      '<button type="button" class="mn-success-close">'+t('\u0625\u063a\u0644\u0627\u0642','Close')+'</button>'+
      '</div>';
    o.addEventListener('click', function(e){ if(e.target===o||e.target.classList.contains('mn-success-close')) o.remove(); });
    document.body.appendChild(o);
    setTimeout(function(){ var x=document.getElementById('mnSuccess'); if(x) x.remove(); }, 12000);
  }

  var submitting = false;
  function bindForm(form){
    if(!form || form.__bound) return; form.__bound = true;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(submitting) return;
      function val(f){ var el = form.querySelector('[data-field="'+f+'"]'); return el ? String(el.value||'').trim() : ''; }
      var name = val('name'), phone = val('phone'), wilaya = val('wilaya'), address = val('address');
      var qty = parseInt(val('qty'),10)||1;
      if(!name || !phone || !wilaya){ alert(t('\u064a\u0631\u062c\u0649 \u0645\u0644\u0621 \u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629','Please fill the required fields')); return; }
      if(!/^0[5-7][0-9]{8}$/.test(phone)){ alert(t('\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d (\u0645\u062b\u0627\u0644: 0612345678)','Invalid phone number (e.g. 0612345678)')); return; }
      var pname = form.getAttribute('data-product') || 'michi normal';
      var price = Number(form.getAttribute('data-price')||0);
      var total = price * qty;
      var orderData = {
        productName: pname,
        products: [{ name: pname, price: price, quantity: qty }],
        customer: name, fullName: name, phone: phone, wilaya: wilaya, address: address,
        payment: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
        totalPrice: total, timestamp: new Date().toISOString(), status: '\u062c\u062f\u064a\u062f'
      };
      submitting = true;
      var btn = form.querySelector('button[type=submit]');
      var orig = btn ? btn.innerHTML : '';
      if(btn){ btn.disabled = true; btn.innerHTML = t('\u062c\u0627\u0631\u064d \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629...','Processing...'); }
      try { if(typeof window.sendOrderToTelegram === 'function') window.sendOrderToTelegram(orderData); } catch(e){}
      var saver = (typeof window.saveOrder === 'function') ? window.saveOrder(orderData) : Promise.resolve(null);
      saver.then(function(id){
        closeModal();
        var ok = form.querySelector('.order-ok'); if(ok) ok.classList.add('show');
        successOverlay(id, phone, total);
        try{ form.reset(); var qe=form.querySelector('[data-field="qty"]'); if(qe) qe.value=1; }catch(e){}
      }).catch(function(){ successOverlay(null, phone, total); })
      .then(function(){ submitting=false; if(btn){ btn.disabled=false; btn.innerHTML=orig; } });
    });
  }

  /* ---- INIT after DOM ---- */
  document.addEventListener('DOMContentLoaded', function(){
    fillWilayas(document);
    applyLang(savedLang);

    if(!document.querySelector('.wa-float')){
      var waf=document.createElement('a'); waf.className='wa-float'; waf.href='https://wa.me/'+WHATSAPP; waf.target='_blank'; waf.rel='noopener'; waf.setAttribute('aria-label','WhatsApp');
      waf.innerHTML='<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.4.7.7-3.3-.2-.4c-1-1.6-1.5-3.4-1.5-5.2C6.2 9.6 10.6 5.2 16 5.2S25.8 9.6 25.8 15 21.4 24.8 16 24.8zm5.4-7c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>';
      document.body.appendChild(waf);
    }

    document.querySelectorAll('.theme-btn').forEach(function(b){
      b.addEventListener('click', function(){ applyTheme(root.getAttribute('data-theme')==='dark'?'light':'dark'); });
    });
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.addEventListener('click', function(){ applyLang(isAr()?'en':'ar'); });
    });

    document.querySelectorAll('.dropdown').forEach(function(dd){
      var btn = dd.querySelector('button');
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var open = dd.classList.contains('open');
        document.querySelectorAll('.dropdown.open').forEach(function(o){o.classList.remove('open')});
        if(!open) dd.classList.add('open');
      });
    });
    document.addEventListener('click', function(){ document.querySelectorAll('.dropdown.open').forEach(function(o){o.classList.remove('open')}); });

    var panel = document.querySelector('.mobile-panel');
    document.querySelectorAll('.burger').forEach(function(b){ b.addEventListener('click', function(){ if(panel) panel.classList.toggle('open'); }); });
    if(panel){ panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ panel.classList.remove('open'); }); }); }

    var stage = document.querySelector('.a3d[data-images]');
    if(stage){
      var imgs = [];
      try{ imgs = JSON.parse(stage.getAttribute('data-images')); }catch(e){}
      stage.style.setProperty('--n', imgs.length);
      imgs.forEach(function(src,i){
        var im = document.createElement('img');
        im.className='card'; im.src=src; im.loading='lazy'; im.alt='accessory'; im.style.setProperty('--i', i);
        stage.appendChild(im);
      });
    }

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
    }, {threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

    var main = document.querySelector('.gallery .main');
    document.querySelectorAll('.thumbs button').forEach(function(tb){
      tb.addEventListener('click', function(){
        document.querySelectorAll('.thumbs button').forEach(function(x){x.classList.remove('active')});
        tb.classList.add('active');
        if(main) main.style.backgroundImage = tb.style.backgroundImage;
      });
    });

    bindQty(document);

    document.querySelectorAll('[data-order-name]').forEach(function(b){
      b.addEventListener('click', function(e){
        e.preventDefault();
        openModal(b.getAttribute('data-order-name'), b.getAttribute('data-order-price'), b.getAttribute('data-order-img'));
      });
    });

    bindForm(document.querySelector('#orderForm'));
  });
})();
