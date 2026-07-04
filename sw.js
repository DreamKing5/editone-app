"use strict";
const VER="editone-v1";
const FILES=["./","./start_v01.html","./hub_v01.html","./scenario_v01.html","./ekonte_v01.html","./sakuga_v02.html","./saishoku_v01.html","./haikei_v01.html","./satsuei_v01.html","./onkyo_v01.html","./henshu_v01.html","./team_v01.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(VER).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>0)))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);
 if(u.origin!==location.origin){return}
 e.respondWith(
  caches.match(e.request).then(hit=>{
   const net=fetch(e.request).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(VER).then(c=>c.put(e.request,cp))}return res}).catch(()=>hit);
   return hit||net;
  })
 );
});