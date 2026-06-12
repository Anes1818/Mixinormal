/* Michi normale — Firebase Realtime Database + order pipeline
 * Saves every order to RTDB and notifies Telegram (telegram.js).
 * Works even if Firebase is not yet configured (Telegram still fires).
 */
(function () {
  'use strict';

  /* =========================================================
     1) PASTE YOUR michinormal CONFIG HERE
     Firebase console > Project settings > General > Your apps > SDK config.
     Keep databaseURL (Realtime Database). Region may be ...-default-rtdb.firebaseio.com
     or ...europe-west1.firebasedatabase.app — copy it exactly from the console.
     ========================================================= */
  var firebaseConfig = {
    apiKey: "AIzaSyCHLrHGHwy7QH2KTFaHHb5jHKqnA_RgpmY",
    authDomain: "michinormal-808c3.firebaseapp.com",
    databaseURL: "https://michinormal-808c3-default-rtdb.firebaseio.com",
    projectId: "michinormal-808c3",
    storageBucket: "michinormal-808c3.firebasestorage.app",
    messagingSenderId: "742243763836",
    appId: "1:742243763836:web:6899012bf8adf7e22debf9",
    measurementId: "G-1BNRHDBQZQ"
  };

  var db = null;
  try {
    if (typeof firebase !== 'undefined') {
      firebase.initializeApp(firebaseConfig);
      db = firebase.database();
    }
  } catch (e) { try { console.warn('Firebase init failed', e); } catch (x) {} }

  // window.saveOrder(order) -> Promise resolving to order id (or null)
  window.saveOrder = function (order) {
    return new Promise(function (resolve) {
      try {
        if (!db) { resolve(null); return; }
        var ref = db.ref('orders').push();
        ref.set(order)
          .then(function () { resolve(ref.key); })
          .catch(function (e) { try { console.warn('RTDB save failed', e); } catch (x) {} resolve(null); });
      } catch (e) { resolve(null); }
    });
  };
})();
