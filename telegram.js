/* michi normal — Telegram order notifications
 * Sends every website order to the store owner's Telegram instantly.
 * Safe by design: wrapped in try/catch and never blocks the order flow.
 */
(function () {
  'use strict';

  var TG_TOKEN = '8763877858:AAGajhzW0CLppcvMLdwBa08ls-d3JfYaQkQ';
  var TG_CHAT = '7612146734';
  var TG_API = 'https://api.telegram.org/bot' + TG_TOKEN + '/sendMessage';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function num(n) {
    var v = Number(n || 0);
    if (isNaN(v)) v = 0;
    try { return v.toLocaleString('fr-DZ'); } catch (e) { return String(v); }
  }

  function fmtProducts(products) {
    if (!products || !products.length) return '';
    var lines = [];
    for (var i = 0; i < products.length; i++) {
      var p = products[i] || {};
      var qty = p.quantity || 1;
      var price = Number(p.price || 0);
      lines.push('\u2022 ' + esc(p.name || '\u0645\u0646\u062c') + ' \u00d7' + qty + ' = ' + num(price * qty) + ' \u062f\u062c');
    }
    return lines.join('\n');
  }

  // window.sendOrderToTelegram(order)
  // order: { products[], customer, phone, wilaya, address, payment, totalPrice, productName? }
  window.sendOrderToTelegram = function (order) {
    try {
      order = order || {};
      var productsText = fmtProducts(order.products);
      var productLine = productsText
        ? ('\ud83d\udce6 <b>\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a:</b>\n' + productsText + '\n')
        : (order.productName ? ('\ud83d\udce6 <b>\u0627\u0644\u0645\u0646\u062a\u062c:</b> ' + esc(order.productName) + '\n') : '');

      var msg =
        '\ud83d\udecd <b>\u0637\u0644\u0628 \u062c\u062f\u064a\u062f \u2014 michi normal</b>\n' +
        '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n' +
        productLine +
        '\ud83d\udc64 <b>\u0627\u0644\u0627\u0633\u0645:</b> ' + esc(order.customer || order.fullName || '-') + '\n' +
        '\ud83d\udcde <b>\u0627\u0644\u0647\u0627\u062a\u0641:</b> ' + esc(order.phone || '-') + '\n' +
        '\ud83d\udccd <b>\u0627\u0644\u0648\u0644\u0627\u064a\u0629:</b> ' + esc(order.wilaya || '-') + '\n' +
        '\ud83c\udfe0 <b>\u0627\u0644\u0639\u0646\u0648\u0627\u0646:</b> ' + esc(order.address || '-') + '\n' +
        '\ud83d\udcb3 <b>\u0627\u0644\u062f\u0641\u0639:</b> ' + esc(order.payment || '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645') + '\n' +
        '\ud83d\udcb0 <b>\u0627\u0644\u0645\u062c\u0645\u0648\u0639:</b> ' + num(order.totalPrice) + ' \u062f\u062c\n' +
        '\ud83d\udd52 ' + new Date().toLocaleString('fr-DZ');

      return fetch(TG_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT,
          text: msg,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      }).catch(function (e) { try { console.warn('Telegram send failed', e); } catch (x) {} });
    } catch (e) {
      try { console.warn('Telegram error', e); } catch (x) {}
    }
  };
})();
