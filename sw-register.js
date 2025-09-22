(function(){
  if(!('serviceWorker' in navigator)) return;
  function register(){
    const u = new URL('./service-worker.js', location.href).toString();
    (async()=>{
      try{
        const r = await fetch(u, { cache: 'no-store' });
        if(!r.ok) throw new Error('SW missing: ' + r.status);
        await navigator.serviceWorker.register('./service-worker.js', { scope: './' });
        console.log('[SW] registered');
      }catch(e){
        console.warn('[SW] skipped:', e && e.message ? e.message : e);
      }
    })();
  }
  // After full load, and then when the main thread is idle (non-critical).
  window.addEventListener('load', function(){
    if('requestIdleCallback' in window){
      requestIdleCallback(register, { timeout: 5000 });
    }else{
      setTimeout(register, 3000);
    }
  });
})();