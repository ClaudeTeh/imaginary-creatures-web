(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const qc="modulepreload",Yc=function(n,e){return new URL(n,e).href},no={},jc=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=Promise.allSettled(t.map(c=>{if(c=Yc(c,i),c in no)return;no[c]=!0;const h=c.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!i)for(let _=a.length-1;_>=0;_--){const y=a[_];if(y.href===c&&(!h||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${d}`))return;const p=document.createElement("link");if(p.rel=h?"stylesheet":qc,h||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),h)return new Promise((_,y)=>{p.addEventListener("load",_),p.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};function ys(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let i=Math.imul(e^e>>>15,1|e);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function Sa(n,e){return n()<e}function Yl(n,e){return e[Math.floor(n()*e.length)]}function jl(){return Math.random()*4294967295>>>0}const Jn=["head","body","forelimbs","hindlimbs","tail"],$c={health:0,attack:0,defense:0,speed:0,energy:0},ba={venom:{id:"venom",name:"Venom",cost:30,description:"Injects poison that deals damage over the next few ticks."},regenerate:{id:"regenerate",name:"Regenerate",cost:40,description:"Heals a chunk of health."},spit:{id:"spit",name:"Acid Spit",cost:25,description:"A ranged burst that ignores part of the enemy's defense."},charge:{id:"charge",name:"Charge",cost:35,description:"A heavy slam dealing big up-front damage."},armor:{id:"armor",name:"Plate Up",cost:30,description:"Temporarily raises defense."},frenzy:{id:"frenzy",name:"Frenzy",cost:35,description:"Sharply raises attack speed for a short time."},shock:{id:"shock",name:"Shock",cost:30,description:"Electric jolt that also briefly slows the enemy."},leech:{id:"leech",name:"Leech",cost:30,description:"Bite that heals for part of the damage dealt."}},io={thickHide:{id:"thickHide",name:"Thick Hide",description:"+20% defense."},swift:{id:"swift",name:"Swift",description:"+15% speed."},predator:{id:"predator",name:"Predator",description:"+15% attack."},hardy:{id:"hardy",name:"Hardy",description:"+15% health."},keenSenses:{id:"keenSenses",name:"Keen Senses",description:"+10% energy gain."}},so=100,Jc=4e3;function ro(n,e){const t=e.traits.includes("keenSenses")?1.1:1;return{side:n,name:e.name,emoji:e.emoji,partEmojis:e.partEmojis,genome:e.genome,hp:e.stats.health,maxHp:e.stats.health,attack:e.stats.attack,defense:e.stats.defense,speed:Math.max(4,e.stats.speed),energyRegen:(2+e.stats.energy*.1)*t,energy:0,abilities:e.abilities,attackMeter:0,poison:[],armorTicks:0,frenzyTicks:0,slowTicks:0}}function Ea(n){return n.armorTicks>0?n.defense*1.5:n.defense}function Kc(n){let e=n.speed;return n.frenzyTicks>0&&(e*=1.6),n.slowTicks>0&&(e*=.7),e}function Zc(n,e){return Math.max(1,Math.round(n.attack-Ea(e)*.4))}function Qc(n,e,t){const i=ro("a",n),s=ro("b",e),r=[],a=[];let o=0;r.push({t:o,kind:"start",side:"a",maxHp:i.maxHp,name:i.name,emoji:i.emoji,partEmojis:i.partEmojis,genome:i.genome}),r.push({t:o,kind:"start",side:"b",maxHp:s.maxHp,name:s.name,emoji:s.emoji,partEmojis:s.partEmojis,genome:s.genome});const l=(h,d)=>{const u=h.abilities.map(_=>ba[_]).filter(_=>h.energy>=_.cost).sort((_,y)=>y.cost-_.cost);if(u.length===0)return!1;const p=u[0];return h.energy-=p.cost,eh(p.id,h,d,r,a,o),!0};for(;i.hp>0&&s.hp>0&&o<Jc;){o++;for(const h of[i,s])if(h.energy+=h.energyRegen,h.armorTicks>0&&h.armorTicks--,h.frenzyTicks>0&&h.frenzyTicks--,h.slowTicks>0&&h.slowTicks--,h.poison.length>0){let d=0;for(const u of h.poison)d+=u.dmg,u.ticks--;h.poison=h.poison.filter(u=>u.ticks>0),d>0&&(h.hp-=d,r.push({t:o,kind:"poison",on:h.side,dmg:d,hp:Math.max(0,Math.round(h.hp))}))}if(i.hp<=0||s.hp<=0)break;for(const[h,d]of[[i,s],[s,i]])if(!(h.hp<=0||d.hp<=0)&&(l(h,d),!(d.hp<=0)&&(h.attackMeter+=Kc(h),h.attackMeter>=so))){h.attackMeter-=so;const u=Sa(t,.08);let p=Zc(h,d);u&&(p=Math.round(p*1.5)),d.hp-=p,r.push({t:o,kind:"attack",by:h.side,dmg:p,crit:u,targetHp:Math.max(0,Math.round(d.hp))})}}let c;if(i.hp<=0&&s.hp<=0)c="draw";else if(s.hp<=0)c="a",r.push({t:o,kind:"death",side:"b"});else if(i.hp<=0)c="b",r.push({t:o,kind:"death",side:"a"});else{const h=i.hp/i.maxHp,d=s.hp/s.maxHp;c=h===d?"draw":h>d?"a":"b"}return a.push(`Winner: ${c} after ${o} ticks (A ${Math.max(0,Math.round(i.hp))}/${i.maxHp}, B ${Math.max(0,Math.round(s.hp))}/${s.maxHp})`),{winner:c,ticks:o,events:r,log:a}}function eh(n,e,t,i,s,r,a){switch(n){case"venom":{const o=Math.max(1,Math.round(e.attack*.3));t.poison.push({dmg:o,ticks:5}),i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))}),s.push(`${e.name} envenoms ${t.name} (${o}/tick)`);break}case"regenerate":{const o=Math.round(e.maxHp*.18);e.hp=Math.min(e.maxHp,e.hp+o),i.push({t:r,kind:"heal",on:e.side,amount:o,hp:Math.round(e.hp)});break}case"spit":{const o=Math.max(1,Math.round(e.attack*.9-t.defense*.2));t.hp-=o,i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))});break}case"charge":{const o=Math.max(1,Math.round(e.attack*1.8-Ea(t)*.4));t.hp-=o,i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))});break}case"armor":{e.armorTicks=Math.max(e.armorTicks,35),i.push({t:r,kind:"ability",by:e.side,ability:n,value:35,targetHp:Math.round(e.hp)});break}case"frenzy":{e.frenzyTicks=Math.max(e.frenzyTicks,45),i.push({t:r,kind:"ability",by:e.side,ability:n,value:45,targetHp:Math.round(e.hp)});break}case"shock":{const o=Math.max(1,Math.round(e.attack*.7));t.hp-=o,t.slowTicks=Math.max(t.slowTicks,25),i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))});break}case"leech":{const o=Math.max(1,Math.round(e.attack*1.1-Ea(t)*.4));t.hp-=o;const l=Math.round(o*.5);e.hp=Math.min(e.maxHp,e.hp+l),i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))}),i.push({t:r,kind:"heal",on:e.side,amount:l,hp:Math.round(e.hp)});break}}}const Qn=[{id:"ant",name:"Ant",emoji:"🐜",tier:1,parts:{head:{stats:{attack:6,energy:4},ability:"venom"},body:{stats:{health:18,defense:4}},forelimbs:{stats:{attack:5}},hindlimbs:{stats:{speed:6},trait:"swift"},tail:{stats:{energy:6}}}},{id:"rabbit",name:"Rabbit",emoji:"🐇",tier:1,parts:{head:{stats:{attack:5,energy:7},trait:"keenSenses"},body:{stats:{health:24,speed:3}},forelimbs:{stats:{attack:7}},hindlimbs:{stats:{speed:10},ability:"frenzy",trait:"swift"},tail:{stats:{speed:4}}}},{id:"crab",name:"Crab",emoji:"🦀",tier:1,parts:{head:{stats:{defense:4}},body:{stats:{health:26,defense:8},trait:"thickHide"},forelimbs:{stats:{attack:9,defense:2},ability:"charge"},hindlimbs:{stats:{speed:2}},tail:{stats:{defense:4}}}},{id:"gecko",name:"Gecko",emoji:"🦎",tier:1,parts:{head:{stats:{attack:7,energy:7},ability:"spit"},body:{stats:{health:22,defense:3},ability:"regenerate"},forelimbs:{stats:{attack:8}},hindlimbs:{stats:{speed:8}},tail:{stats:{energy:6},ability:"regenerate"}}},{id:"boar",name:"Boar",emoji:"🐗",tier:1,parts:{head:{stats:{attack:7},ability:"charge"},body:{stats:{health:25,defense:5},trait:"hardy"},forelimbs:{stats:{attack:6}},hindlimbs:{stats:{speed:5}},tail:{stats:{health:6}}}},{id:"wolf",name:"Wolf",emoji:"🐺",tier:2,parts:{head:{stats:{attack:11,energy:4},ability:"leech",trait:"predator"},body:{stats:{health:34,defense:6}},forelimbs:{stats:{attack:10}},hindlimbs:{stats:{speed:11},trait:"swift"},tail:{stats:{speed:5}}}},{id:"cobra",name:"Cobra",emoji:"🐍",tier:2,parts:{head:{stats:{attack:9,energy:8},ability:"venom"},body:{stats:{health:28,defense:4}},forelimbs:{stats:{attack:6}},hindlimbs:{stats:{speed:8}},tail:{stats:{attack:7,energy:4},ability:"venom"}}},{id:"scorpion",name:"Scorpion",emoji:"🦂",tier:2,parts:{head:{stats:{attack:8,defense:3}},body:{stats:{health:30,defense:9},trait:"thickHide"},forelimbs:{stats:{attack:12,energy:4},ability:"venom"},hindlimbs:{stats:{speed:6}},tail:{stats:{attack:10,energy:6},ability:"venom",trait:"predator"}}},{id:"eagle",name:"Eagle",emoji:"🦅",tier:2,parts:{head:{stats:{attack:12,energy:6},trait:"keenSenses"},body:{stats:{health:26,speed:6}},forelimbs:{stats:{attack:9,speed:4},ability:"spit"},hindlimbs:{stats:{speed:13},trait:"swift"},tail:{stats:{speed:7}}}},{id:"gorilla",name:"Gorilla",emoji:"🦍",tier:2,parts:{head:{stats:{attack:10,defense:4}},body:{stats:{health:44,defense:8},trait:"hardy"},forelimbs:{stats:{attack:15},ability:"frenzy",trait:"predator"},hindlimbs:{stats:{speed:6}},tail:{stats:{health:10}}}},{id:"bear",name:"Bear",emoji:"🐻",tier:3,parts:{head:{stats:{attack:14,defense:4},ability:"frenzy"},body:{stats:{health:56,defense:10},trait:"hardy"},forelimbs:{stats:{attack:18},ability:"charge",trait:"predator"},hindlimbs:{stats:{speed:7}},tail:{stats:{health:12}}}},{id:"rhino",name:"Rhino",emoji:"🦏",tier:3,parts:{head:{stats:{attack:16,defense:6},ability:"charge"},body:{stats:{health:64,defense:16},trait:"thickHide",ability:"armor"},forelimbs:{stats:{attack:12}},hindlimbs:{stats:{speed:8}},tail:{stats:{defense:6}}}},{id:"eel",name:"Electric Eel",emoji:"🐡",tier:3,parts:{head:{stats:{attack:12,energy:10},ability:"shock"},body:{stats:{health:32,defense:5},ability:"shock"},forelimbs:{stats:{attack:8,energy:6}},hindlimbs:{stats:{speed:10},trait:"swift"},tail:{stats:{attack:10,energy:8},ability:"shock",trait:"keenSenses"}}},{id:"tiger",name:"Tiger",emoji:"🐅",tier:3,parts:{head:{stats:{attack:15,energy:6},ability:"leech",trait:"predator"},body:{stats:{health:46,defense:8}},forelimbs:{stats:{attack:14},ability:"frenzy"},hindlimbs:{stats:{speed:12},trait:"swift"},tail:{stats:{speed:8}}}},{id:"dragon",name:"Dragon",emoji:"🐉",tier:3,parts:{head:{stats:{attack:18,energy:10},ability:"spit",trait:"predator"},body:{stats:{health:58,defense:10},ability:"frenzy",trait:"hardy"},forelimbs:{stats:{attack:16,energy:6},ability:"charge"},hindlimbs:{stats:{speed:10},trait:"swift"},tail:{stats:{attack:12,energy:8},ability:"shock"}}},{id:"jellyfish",name:"Jellyfish",emoji:"🪼",tier:3,parts:{head:{stats:{attack:10,energy:14},ability:"shock",trait:"keenSenses"},body:{stats:{health:38,defense:6},ability:"regenerate"},forelimbs:{stats:{attack:8,energy:8},ability:"leech"},hindlimbs:{stats:{speed:9},trait:"swift"},tail:{stats:{energy:10},ability:"venom"}}}],th=Object.fromEntries(Qn.map(n=>[n.id,n]));function di(n){const e=th[n];if(!e)throw new Error(`Unknown animal id: ${n}`);return e}const nh=.12;function ih(n,e,t,i={}){const s=i.mutationRate??nh,r=i.pool??Qn.map(o=>o.id),a={};for(const o of Jn)Sa(t,s)?a[o]=Yl(t,r):a[o]=Sa(t,.5)?n[o]:e[o];return a}function lr(n,e=Qn.map(t=>t.id)){const t={};for(const i of Jn)t[i]=Yl(n,e);return t}function Ms(n,e){const t={...$c},i=new Set,s=new Set;for(const a of Jn){const l=di(n[a]).parts[a];for(const c of Object.keys(l.stats))t[c]+=l.stats[c]??0;l.ability&&i.add(l.ability),l.trait&&s.add(l.trait)}s.has("thickHide")&&(t.defense=Math.round(t.defense*1.2)),s.has("swift")&&(t.speed=Math.round(t.speed*1.15)),s.has("predator")&&(t.attack=Math.round(t.attack*1.15)),s.has("hardy")&&(t.health=Math.round(t.health*1.15));const r=Jn.reduce((a,o)=>(a[o]=di(n[o]).emoji,a),{});return{name:e??sh(n),genome:n,emoji:di(n.head).emoji,partEmojis:r,stats:t,abilities:[...i],traits:[...s]}}function sh(n){const e=di(n.head).name,t=di(n.body).name,i=e.slice(0,Math.ceil(e.length/2)),s=t.slice(Math.floor(t.length/2)),r=(i+s).toLowerCase();return r.charAt(0).toUpperCase()+r.slice(1)}function Kn(n){const e=n.stats;return Math.round(e.health*.5+e.attack*2+e.defense*1.5+e.speed*1+e.energy*.4+n.abilities.length*6+n.traits.length*4)}function $l(n){return Jn.reduce((e,t)=>(e[t]=n,e),{})}function rh(n){return{head:"Head",body:"Body",forelimbs:"Forelimbs",hindlimbs:"Hindlimbs",tail:"Tail"}[n]}function Jl(n,e,t){const i=ys(t^2654435769),s=e<3?1:e<7?2:3,r=Qn.filter(h=>h.tier<=s).map(h=>h.id),a=Kn(n)*(.85+Math.min(e,12)*.02);let o=lr(i,r),l=1/0;for(let h=0;h<12;h++){const d=lr(i,r),u=Math.abs(Kn(Ms(d))-a);u<l&&(l=u,o=d)}const c=Ms(o);return{...c,name:ah(i,c.name)}}function ah(n,e){const t=["Wild","Feral","Rogue","Alpha","Ravenous","Ancient","Savage"];return`${t[Math.floor(n()*t.length)]} ${e}`}const Kl="imaginary-creatures.save.v1",cr=["ant","rabbit","crab","gecko","boar"],oh=Qn.filter(n=>!cr.includes(n.id)).sort((n,e)=>n.tier-e.tier).map(n=>n.id);function lh(n){return Qn.filter(e=>e.tier<=n).map(e=>e.id)}function Ta(n=1,e){const t=n===1?[...cr]:lh(n),i=t[t.length-1]??"boar";return{unlocked:t,player:$l(i),wins:0,losses:0,seed:jl(),muted:e?.muted??!1,roster:[],battleSpeed:e?.battleSpeed??"normal",showOpponent:e?.showOpponent??!0}}function ch(){try{const n=localStorage.getItem(Kl);if(!n)return Ta();const e=JSON.parse(n),t=new Set(Qn.map(r=>r.id)),i=(e.unlocked??cr).filter(r=>t.has(r)),s=dh(e.player,i);return{unlocked:i.length?i:[...cr],player:s,wins:e.wins??0,losses:e.losses??0,seed:e.seed??jl(),muted:e.muted??!1,roster:hh(e.roster,t),battleSpeed:["slow","normal","fast","instant"].includes(e.battleSpeed)?e.battleSpeed:"normal",showOpponent:e.showOpponent??!0}}catch{return Ta()}}function hh(n,e){return Array.isArray(n)?n.filter(t=>t&&typeof t.name=="string"&&t.genome&&["head","body","forelimbs","hindlimbs","tail"].every(i=>e.has(t.genome[i]))):[]}function Tn(n){try{localStorage.setItem(Kl,JSON.stringify(n))}catch{}}function dh(n,e){const t=e[0]??"boar",i=$l(t);if(!n)return i;const s=new Set(e);return{head:s.has(n.head??"")?n.head:t,body:s.has(n.body??"")?n.body:t,forelimbs:s.has(n.forelimbs??"")?n.forelimbs:t,hindlimbs:s.has(n.hindlimbs??"")?n.hindlimbs:t,tail:s.has(n.tail??"")?n.tail:t}}function uh(n){for(const e of oh)if(!n.unlocked.includes(e))return n.unlocked.push(e),e;return null}const fh=6;function hr(n){return Jn.map(e=>n[e]).join("|")}function ph(n,e){const t=hr(e.genome),i=n.filter(s=>hr(s.genome)!==t);return[e,...i].slice(0,fh)}function mh(n,e){return n.filter((t,i)=>i!==e)}function gh(n,e){const t=hr(e);return n.some(i=>hr(i.genome)===t)}function re(n,e={},t=[]){const i=document.createElement(n);for(const[s,r]of Object.entries(e))r===void 0||r===!1||(s==="class"?i.className=String(r):s.startsWith("on")&&typeof r=="function"?i.addEventListener(s.slice(2).toLowerCase(),r):s==="html"?i.innerHTML=String(r):i.setAttribute(s,String(r)));for(const s of t)i.append(typeof s=="string"?document.createTextNode(s):s);return i}function Fa(n){n.replaceChildren()}function _h(n){return{health:"#6ce5b1",attack:"#ff8f6b",defense:"#7aa2ff",speed:"#ffce6b",energy:"#c39bff"}[n]??"#9aa7c4"}const Zt={ant:{fill:"#2a1205",shade:"#120800",accent:"#d43010"},rabbit:{fill:"#f0e6dc",shade:"#b89888",accent:"#ff8898"},crab:{fill:"#d44018",shade:"#922808",accent:"#f8a040"},gecko:{fill:"#4a8c20",shade:"#2a5010",accent:"#a8e030"},boar:{fill:"#5c3820",shade:"#301808",accent:"#c09048"},wolf:{fill:"#888070",shade:"#484038",accent:"#d8ccc0"},cobra:{fill:"#2a6c14",shade:"#184008",accent:"#e8d020"},scorpion:{fill:"#8c7410",shade:"#504000",accent:"#f0c020"},eagle:{fill:"#5a380c",shade:"#2c1808",accent:"#f8f0d0"},gorilla:{fill:"#1c1c14",shade:"#080808",accent:"#706858"},bear:{fill:"#5c2c0c",shade:"#2c1408",accent:"#c08040"},rhino:{fill:"#707060",shade:"#3c3c30",accent:"#c0b898"},eel:{fill:"#106050",shade:"#083028",accent:"#50e8d0"},tiger:{fill:"#c86008",shade:"#6c2e00",accent:"#f0a828"},dragon:{fill:"#7c1010",shade:"#3c0808",accent:"#ff6030"},jellyfish:{fill:"#3c1870",shade:"#1c0840",accent:"#b060ff"}};function vh(n){const e=n.replace("#",""),t=parseInt(e.length===3?e.split("").map(i=>i+i).join(""):e,16);return[t>>16&255,t>>8&255,t&255]}function Pr(n,e){const[t,i,s]=vh(n),r=e<0?0:255,a=Math.abs(e),o=l=>Math.round(l+(r-l)*a);return`rgb(${o(t)},${o(i)},${o(s)})`}function ct(n,e,t,i,s,r){const a=e-i*.42,o=t-i*.42,l=n.createRadialGradient(a,o,i*.04,e,t,i*1.06);return l.addColorStop(0,Pr(s,.55)),l.addColorStop(.22,Pr(s,.16)),l.addColorStop(.62,s),l.addColorStop(.88,r),l.addColorStop(1,Pr(r,-.35)),l}function Ze(n,e,t,i,s,r=0){n.beginPath(),n.ellipse(e,t,i,s,r,0,Math.PI*2)}function Zl(n,e,t,i){const s=Zt[e]??Zt.boar;switch(n.save(),e){case"ant":yh(n,s,t);break;case"rabbit":Mh(n,s,i);break;case"crab":Sh(n,s,i);break;case"gecko":bh(n,s);break;case"boar":ao(n,s,i);break;case"wolf":Eh(n,s,i);break;case"cobra":Th(n,s,t);break;case"scorpion":xh(n,s);break;case"eagle":wh(n,s,i);break;case"gorilla":Ah(n,s,i);break;case"bear":Rh(n,s);break;case"rhino":Ch(n,s);break;case"eel":Ph(n,s,i);break;case"tiger":Lh(n,s,i);break;default:ao(n,s,i)}n.restore()}function Ji(n,e,t=22,i=20){Ze(n,0,0,t,i),n.fillStyle=ct(n,0,0,t,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke()}function Gt(n,e,t,i,s){n.fillStyle=s,n.beginPath(),n.arc(e,t,i,0,Math.PI*2),n.fill(),n.fillStyle="#000",n.beginPath(),n.arc(e+1,t,i*.55,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.6)",n.beginPath(),n.arc(e-i*.3,t-i*.3,i*.3,0,Math.PI*2),n.fill()}function yh(n,e,t){Ji(n,e,18,16),Gt(n,10,-7,4,e.accent),n.strokeStyle=e.shade,n.lineWidth=2.5,n.beginPath(),n.moveTo(14,-4),n.quadraticCurveTo(26,-1,24,8),n.stroke(),n.beginPath(),n.moveTo(14,4),n.quadraticCurveTo(26,1,24,-8),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=1.5;const i=Math.sin(t)*5;n.beginPath(),n.moveTo(-3,-16),n.quadraticCurveTo(-14,-34+i,-20,-44+i*.5),n.stroke(),n.beginPath(),n.moveTo(4,-16),n.quadraticCurveTo(-6,-36-i,-12,-44-i*.5),n.stroke(),n.fillStyle=e.accent,n.beginPath(),n.arc(-20,-44+i*.5,2.5,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(-12,-44-i*.5,2.5,0,Math.PI*2),n.fill()}function Mh(n,e,t){n.fillStyle=ct(n,-10,-34,18,e.fill,e.shade),Ze(n,-10,-34,7,18,-.2),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,Ze(n,-10,-34,4,13,-.2),n.fill(),Ji(n,e,20,18),Gt(n,12,-6,5,e.accent),n.fillStyle=e.accent,n.beginPath(),n.arc(18+t*4,3,3,0,Math.PI*2),n.fill()}function Sh(n,e,t){Ze(n,0,0,28,16),n.fillStyle=ct(n,0,0,28,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(-12,-14),n.lineTo(-14,-24-t*4),n.stroke(),n.beginPath(),n.moveTo(12,-14),n.lineTo(14,-24-t*4),n.stroke(),Gt(n,-14,-26-t*4,4,e.accent),Gt(n,14,-26-t*4,4,e.accent),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(22,-4),n.quadraticCurveTo(34,0,32,8),n.stroke(),n.beginPath(),n.moveTo(22,4),n.quadraticCurveTo(34,0,32,-8),n.stroke()}function bh(n,e){Ze(n,2,0,26,14,0),n.fillStyle=ct(n,2,0,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),Gt(n,14,-6,6,e.accent),n.fillStyle=e.accent,n.globalAlpha=.5,[[-6,-4],[-12,2],[-4,6]].forEach(([t,i])=>{n.beginPath(),n.arc(t,i,2.5,0,Math.PI*2),n.fill()}),n.globalAlpha=1}function ao(n,e,t){n.fillStyle=e.shade,Ze(n,-14,-20,7,9,-.3),n.fill(),n.fillStyle=e.accent,Ze(n,-14,-20,4,6,-.3),n.fill(),Ji(n,e,22,20),Gt(n,8,-8,4,"#f0e000"),Ze(n,18,4,10,8),n.fillStyle=e.shade,n.fill(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.stroke(),n.strokeStyle="#e0d8b0",n.lineWidth=3,n.beginPath(),n.moveTo(14,8+t*2),n.quadraticCurveTo(28,14,26,22),n.stroke(),n.beginPath(),n.moveTo(14,-8-t*2),n.quadraticCurveTo(28,-14,26,-22),n.stroke()}function Eh(n,e,t){n.fillStyle=e.fill,n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(-12,-18),n.lineTo(-6,-36),n.lineTo(4,-18),n.closePath(),n.fill(),n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.6,n.beginPath(),n.moveTo(-10,-20),n.lineTo(-6,-32),n.lineTo(2,-20),n.closePath(),n.fill(),n.globalAlpha=1,Ze(n,4,0,26,18),n.fillStyle=ct(n,4,0,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),Gt(n,14,-8,5,"#f0d040"),Ze(n,20,4,10,8),n.fillStyle=e.shade,n.fill(),t>.3&&(n.strokeStyle="#f0e0c0",n.lineWidth=2,n.beginPath(),n.moveTo(12,6),n.lineTo(26+t*4,6+t*10),n.stroke())}function Th(n,e,t){n.fillStyle=ct(n,0,0,32,e.fill,e.shade),n.beginPath(),n.ellipse(0,0,32,26,0,Math.PI*.15,Math.PI*.85),n.quadraticCurveTo(-10,14,0,20),n.quadraticCurveTo(10,14,0,0),n.closePath(),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.6,n.beginPath(),n.ellipse(0,-4,18,14,0,Math.PI*.2,Math.PI*.8),n.stroke(),n.globalAlpha=1,Ze(n,6,2,14,10),n.fillStyle=e.fill,n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),Gt(n,12,-4,4,e.accent);const i=Math.sin(t*4)*3;n.strokeStyle="#e02020",n.lineWidth=1.5,n.beginPath(),n.moveTo(18,4),n.lineTo(26,4+i),n.moveTo(26,4+i),n.lineTo(30,2+i),n.moveTo(26,4+i),n.lineTo(30,6+i),n.stroke()}function xh(n,e){Ze(n,0,0,20,14),n.fillStyle=ct(n,0,0,20,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),Gt(n,12,-6,3,e.accent),Gt(n,6,-10,2.5,e.accent),n.strokeStyle=e.shade,n.lineWidth=2.5,n.beginPath(),n.moveTo(16,-4),n.quadraticCurveTo(28,-2,26,6),n.stroke(),n.beginPath(),n.moveTo(16,4),n.quadraticCurveTo(28,2,26,-6),n.stroke()}function wh(n,e,t){Ze(n,0,0,22,20),n.fillStyle=ct(n,0,0,22,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.7,Ze(n,2,-2,16,12),n.fill(),n.globalAlpha=1,Gt(n,10,-6,5,e.accent),n.fillStyle="#e0b020",n.strokeStyle="#a07010",n.lineWidth=2,n.beginPath(),n.moveTo(16,-2),n.lineTo(34+t*5,-1+t*3),n.lineTo(32+t*5,8+t*4),n.lineTo(18,6),n.closePath(),n.fill(),n.stroke()}function Ah(n,e,t){Ji(n,e,24,22),n.fillStyle=e.shade,Ze(n,0,-14,20,6),n.fill(),Gt(n,10,-8,4.5,"#b06030"),Ze(n,12,6,9,7),n.fillStyle=e.shade,n.fill(),t>.3&&(n.strokeStyle="#e05020",n.lineWidth=3,n.beginPath(),n.arc(12,8+t*4,6,.1,Math.PI-.1),n.stroke())}function Rh(n,e){n.fillStyle=e.shade,Ze(n,-14,-18,9,8),n.fill(),n.fillStyle=e.fill,Ze(n,-14,-18,6,5),n.fill(),Ji(n,e,24,22),Gt(n,10,-7,4.5,"#2a1c08"),Ze(n,16,6,10,8),n.fillStyle=e.shade,n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke()}function Ch(n,e){Ze(n,0,2,26,22),n.fillStyle=ct(n,0,0,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.5,[[-16,-12,-10,-8],[-6,-18,0,-14]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.quadraticCurveTo((t+s)/2,(i+r)/2-4,s,r),n.stroke()}),n.globalAlpha=1,n.fillStyle=e.shade,n.beginPath(),n.moveTo(14,-14),n.lineTo(22,-36),n.lineTo(28,-14),n.closePath(),n.fill(),Gt(n,10,-4,4,e.accent)}function Ph(n,e,t){Ze(n,4,0,24,12),n.fillStyle=ct(n,4,0,24,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.7,[-8,-4,0].forEach(i=>{n.beginPath(),n.moveTo(i,-10),n.lineTo(i,10),n.stroke()}),n.globalAlpha=1,Gt(n,14,-5,4,e.accent),n.fillStyle=t>.2?"#400820":e.shade,n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(20,-4),n.lineTo(36+t*8,-4+t*6),n.lineTo(36+t*8,4-t*6),n.lineTo(20,4),n.closePath(),n.fill(),n.stroke()}function Lh(n,e,t){n.fillStyle=e.fill,n.strokeStyle=e.shade,n.lineWidth=2,Ze(n,-14,-18,7,7),n.fill(),n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.5,Ze(n,-14,-18,4,4),n.fill(),n.globalAlpha=1,Ji(n,e,22,20),n.strokeStyle="#1c0c00",n.lineWidth=3,n.globalAlpha=.6,[[-8,-18,-4,6],[0,-20,4,4],[8,-18,12,6]].forEach(([i,s,r,a])=>{n.beginPath(),n.moveTo(i,s),n.lineTo(r,a),n.stroke()}),n.globalAlpha=1,Gt(n,10,-7,5,"#f0c040"),Ze(n,16,4,8,7),n.fillStyle=e.shade,n.fill(),t>.2&&(n.strokeStyle="#f8e8d0",n.lineWidth=2,n.beginPath(),n.moveTo(10,6),n.lineTo(24+t*4,6+t*8),n.stroke())}function Ql(n,e,t){const i=Zt[e]??Zt.boar;switch(n.save(),e){case"ant":Dh(n,i);break;case"rabbit":Uh(n,i,t);break;case"crab":Ih(n,i);break;case"gecko":Nh(n,i,t);break;case"boar":oo(n,i,t);break;case"wolf":Oh(n,i,t);break;case"cobra":Fh(n,i,t);break;case"scorpion":kh(n,i);break;case"eagle":Bh(n,i,t);break;case"gorilla":zh(n,i,t);break;case"bear":Hh(n,i,t);break;case"rhino":Gh(n,i);break;case"eel":Vh(n,i,t);break;case"tiger":Wh(n,i,t);break;default:oo(n,i,t)}n.restore()}function Dh(n,e){Ze(n,10,0,14,12),n.fillStyle=ct(n,10,0,14,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),Ze(n,-12,4,18,14),n.fillStyle=ct(n,-12,4,18,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.6,n.beginPath(),n.ellipse(-12,4,14,10,0,0,Math.PI*2),n.stroke(),n.globalAlpha=1}function Uh(n,e,t){const i=1+t*.02,s=1-t*.01;n.scale(i,s),Ze(n,0,0,24,22),n.fillStyle=ct(n,0,0,24,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke()}function Ih(n,e){Ze(n,0,0,30,20),n.fillStyle=ct(n,0,0,30,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.globalAlpha=.5,[[-16,0,-10,-16],[0,-4,0,-18],[16,0,10,-16]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke()}),n.globalAlpha=1}function Nh(n,e,t){n.scale(1+t*.015,1),Ze(n,0,0,20,14),n.fillStyle=ct(n,0,0,20,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.4,[-12,-4,4,12].forEach(i=>{n.beginPath(),n.arc(i,0,3,0,Math.PI*2),n.fill()}),n.globalAlpha=1}function oo(n,e,t){n.scale(1+t*.02,1+t*.01),Ze(n,0,2,26,22),n.fillStyle=ct(n,0,2,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.5,[-14,-6,2,10,18].forEach(i=>{n.beginPath(),n.moveTo(i,-20),n.lineTo(i-1,-28),n.stroke()}),n.globalAlpha=1}function Oh(n,e,t){n.scale(1+t*.018,1),Ze(n,0,0,22,18),n.fillStyle=ct(n,0,0,22,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.25,Ze(n,6,4,10,8),n.fill(),n.globalAlpha=1}function Fh(n,e,t){n.strokeStyle=ct(n,0,4,20,e.fill,e.shade),n.lineWidth=14+t*2,n.lineCap="round",n.beginPath(),n.moveTo(20,-10),n.bezierCurveTo(28,0,20,14,0,12),n.bezierCurveTo(-20,10,-24,-4,-16,-10),n.bezierCurveTo(-8,-16,8,-8,8,4),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(20,-10),n.bezierCurveTo(28,0,20,14,0,12),n.bezierCurveTo(-20,10,-24,-4,-16,-10),n.stroke()}function kh(n,e){Ze(n,4,0,18,12),n.fillStyle=ct(n,4,0,18,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.6,[-8,-2,4,10].forEach(t=>{n.beginPath(),n.moveTo(t,-10),n.lineTo(t,10),n.stroke()}),n.globalAlpha=1}function Bh(n,e,t){n.scale(1+t*.015,1),Ze(n,0,0,22,20),n.fillStyle=ct(n,0,0,22,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.35,Ze(n,4,4,12,10),n.fill(),n.globalAlpha=1,n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.35,[[-16,-10,-8,6],[-8,-14,0,8],[0,-16,8,8]].forEach(([i,s,r,a])=>{n.beginPath(),n.moveTo(i,s),n.lineTo(r,a),n.stroke()}),n.globalAlpha=1}function zh(n,e,t){n.scale(1+t*.025,1+t*.015),Ze(n,0,0,30,26),n.fillStyle=ct(n,0,0,30,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=3,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.2,Ze(n,4,6,14,12),n.fill(),n.globalAlpha=1}function Hh(n,e,t){n.scale(1+t*.022,1+t*.012),Ze(n,0,2,28,26),n.fillStyle=ct(n,0,2,28,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke()}function Gh(n,e){Ze(n,0,2,32,24),n.fillStyle=ct(n,0,2,32,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=3,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.globalAlpha=.4,[[-20,-14,-24,6],[0,-18,-4,8],[18,-14,20,6]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke()}),n.globalAlpha=1}function Vh(n,e,t){n.strokeStyle=ct(n,0,0,20,e.fill,e.shade),n.lineWidth=18+t*2,n.lineCap="round",n.beginPath(),n.moveTo(22,-6),n.bezierCurveTo(10,-4,-10,4,-24,2),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(22,-6),n.bezierCurveTo(10,-4,-10,4,-24,2),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.6,n.beginPath(),n.moveTo(22,-6),n.bezierCurveTo(10,0,-10,8,-24,6),n.stroke(),n.globalAlpha=1}function Wh(n,e,t){n.scale(1+t*.018,1),Ze(n,0,0,24,20),n.fillStyle=ct(n,0,0,24,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle="#1c0c00",n.lineWidth=3,n.globalAlpha=.55,[[-14,-18,-10,14],[-4,-20,0,16],[6,-18,10,14],[16,-14,20,10]].forEach(([i,s,r,a])=>{n.beginPath(),n.moveTo(i,s),n.lineTo(r,a),n.stroke()}),n.globalAlpha=1}function ec(n,e,t){const i=Zt[e]??Zt.boar;switch(n.save(),e){case"ant":case"scorpion":jh(n,i,3,t);break;case"crab":qh(n,i,t);break;case"eagle":Yh(n,i,t);break;case"cobra":case"eel":$h(n,i);break;default:Xh(n,i,e,t);break}n.restore()}function Xh(n,e,t,i){const s=["gorilla","bear","rhino"].includes(t),r=s?9:7,a=s?28:22;if(n.strokeStyle=e.shade,n.lineWidth=r*2,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(a*.5,a*.6-i*6),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=r*2-3,n.beginPath(),n.moveTo(0,0),n.lineTo(a*.5,a*.6-i*6),n.stroke(),n.fillStyle=e.shade,n.beginPath(),n.arc(a*.5,a*.6-i*6,r+1,0,Math.PI*2),n.fill(),n.fillStyle=e.fill,n.beginPath(),n.arc(a*.5,a*.6-i*6,r,0,Math.PI*2),n.fill(),["wolf","tiger","gecko","gorilla","bear","eagle"].includes(t)){n.strokeStyle="#d8c8a0",n.lineWidth=1.5;const o=a*.5,l=a*.6-i*6;[-6,0,6].forEach(c=>{n.beginPath(),n.moveTo(o+c,l+r),n.lineTo(o+c*.6,l+r+8),n.stroke()})}}function qh(n,e,t){n.strokeStyle=e.shade,n.lineWidth=10,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(18,18),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=7,n.beginPath(),n.moveTo(0,0),n.lineTo(18,18),n.stroke(),n.fillStyle=ct(n,20,20,14,e.fill,e.shade),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(14,14),n.lineTo(34+t*8,8-t*4),n.lineTo(34+t*8,16-t*2),n.closePath(),n.fill(),n.stroke(),n.beginPath(),n.moveTo(14,14),n.lineTo(28+t*6,22+t*4),n.lineTo(26+t*5,14+t),n.closePath(),n.fill(),n.stroke()}function Yh(n,e,t){const i=1+t*.4;n.fillStyle=ct(n,0,0,30,e.fill,e.shade),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-10,-20*i,-30,-28*i,-40,-20*i),n.quadraticCurveTo(-28,-8,0,12),n.closePath(),n.fill(),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.4,[[-10,-6],[-20,-10],[-30,-12]].forEach(([s,r])=>{n.beginPath(),n.moveTo(0,4),n.lineTo(s,r*i),n.stroke()}),n.globalAlpha=1}function jh(n,e,t,i){n.strokeStyle=e.shade,n.lineWidth=3,n.lineCap="round";for(let s=0;s<t;s++){const r=s/(t-1)*.8+.1,a=8+s*8,o=-8+r*20;n.beginPath(),n.moveTo(s*4-4,0),n.quadraticCurveTo(a+i*6,o,a+12+i*8,o+16),n.stroke()}}function $h(n,e){n.fillStyle=e.shade,n.globalAlpha=.5,n.beginPath(),n.arc(0,0,8,0,Math.PI*2),n.fill(),n.globalAlpha=1}function tc(n,e,t){const i=Zt[e]??Zt.boar;switch(n.save(),e){case"ant":case"scorpion":ed(n,i,3,t);break;case"crab":Qh(n,i);break;case"cobra":case"eel":td(n);break;case"eagle":Zh(n,i,t);break;case"rhino":case"boar":Kh(n,i,t);break;default:Jh(n,i,e,t);break}n.restore()}function Jh(n,e,t,i){const r=["gorilla","bear"].includes(t)?10:8;n.strokeStyle=e.shade,n.lineWidth=r*2,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(-6-i*6,20+i*4),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=r*2-4,n.beginPath(),n.moveTo(0,0),n.lineTo(-6-i*6,20+i*4),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=r*1.5,n.lineCap="round",n.beginPath(),n.moveTo(-6-i*6,20+i*4),n.lineTo(-2,36),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=r*1.5-3,n.beginPath(),n.moveTo(-6-i*6,20+i*4),n.lineTo(-2,36),n.stroke(),n.fillStyle=e.shade,n.beginPath(),n.arc(-2,36,r,0,Math.PI*2),n.fill(),n.fillStyle=e.fill,n.beginPath(),n.arc(-2,36,r-2,0,Math.PI*2),n.fill()}function Kh(n,e,t){n.strokeStyle=e.shade,n.lineWidth=14,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(-4-t*5,22),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=10,n.beginPath(),n.moveTo(0,0),n.lineTo(-4-t*5,22),n.stroke(),n.fillStyle="#2a2010",n.beginPath(),n.ellipse(-4,30,9,7,.2,0,Math.PI*2),n.fill()}function Zh(n,e,t){n.strokeStyle=e.shade,n.lineWidth=10,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(-2-t*4,24),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=7,n.beginPath(),n.moveTo(0,0),n.lineTo(-2-t*4,24),n.stroke(),n.strokeStyle="#d0b030",n.lineWidth=2.5;const i=24;[[-10,32],[-2,36],[6,32]].forEach(([s,r])=>{n.beginPath(),n.moveTo(-2,i),n.lineTo(s,r+t*4),n.stroke()})}function Qh(n,e){n.strokeStyle=e.shade,n.lineWidth=5,n.lineCap="round",[[-12,16,-18,28],[-4,18,-6,32],[4,16,8,28]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=3,n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=5})}function ed(n,e,t,i){n.strokeStyle=e.shade,n.lineWidth=3,n.lineCap="round";for(let s=0;s<t;s++)n.beginPath(),n.moveTo(-s*6,0),n.quadraticCurveTo(-8-s*4,14+i*4,-4-s*5,28),n.stroke()}function td(n){n.globalAlpha=0,n.globalAlpha=1}function nc(n,e,t){const i=Zt[e]??Zt.boar;switch(n.save(),e){case"ant":Lr(n,i,t,"short");break;case"rabbit":nd(n,i);break;case"crab":break;case"gecko":sd(n,i,t);break;case"boar":id(n,i,t);break;case"wolf":lo(n,i,t);break;case"cobra":ad(n,i,t);break;case"scorpion":rd(n,i,t);break;case"eagle":od(n,i,t);break;case"gorilla":break;case"bear":break;case"rhino":Lr(n,i,t,"medium");break;case"eel":ld(n,i,t);break;case"tiger":lo(n,i,t);break;default:Lr(n,i,t,"medium")}n.restore()}function Lr(n,e,t,i){const s=i==="short"?20:30,r=Math.sin(t)*6;n.strokeStyle=e.shade,n.lineWidth=5,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-s*.5,r,-s,r*.6),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=3,n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-s*.5,r,-s,r*.6),n.stroke()}function nd(n,e){n.fillStyle=e.accent,n.beginPath(),n.arc(-6,0,10,0,Math.PI*2),n.fill(),n.fillStyle="#fff",n.globalAlpha=.5,n.beginPath(),n.arc(-5,-2,7,0,Math.PI*2),n.fill(),n.globalAlpha=1}function lo(n,e,t){const i=Math.sin(t)*8;n.strokeStyle=e.shade,n.lineWidth=12,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-18,i,-30,i*1.2),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=9,n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-18,i,-30,i*1.2),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=5,n.globalAlpha=.4,n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-18,i,-30,i*1.2),n.stroke(),n.globalAlpha=1}function id(n,e,t){const i=Math.sin(t)*3;n.strokeStyle=e.shade,n.lineWidth=7,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-8,-8+i,-18,-14+i,-20,-6+i),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=5,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-8,-8+i,-18,-14+i,-20,-6+i),n.stroke()}function sd(n,e,t){const i=Math.sin(t)*8;n.strokeStyle=e.shade,n.lineWidth=7,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i,-44,i*.5),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=5,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i,-44,i*.5),n.stroke()}function rd(n,e,t){const i=Math.sin(t)*4;n.strokeStyle=e.shade,n.lineWidth=9,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-16,-4,-28,-24+i,-22,-38+i),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=7,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-16,-4,-28,-24+i,-22,-38+i),n.stroke(),n.fillStyle=e.accent,n.strokeStyle=e.shade,n.lineWidth=1.5,n.beginPath(),n.moveTo(-24,-38+i),n.lineTo(-18,-50+i),n.lineTo(-14,-38+i),n.closePath(),n.fill(),n.stroke()}function ad(n,e,t){const i=Math.sin(t)*10;n.strokeStyle=e.shade,n.lineWidth=11,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i*.6,-40,i*.4),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=8,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i*.6,-40,i*.4),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.5,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i+2,-28,-i*.6+2,-40,i*.4+2),n.stroke(),n.globalAlpha=1}function od(n,e,t){const i=Math.sin(t)*4;[-20,-12,-4,4,12].forEach((s,r)=>{const a=r===2?32:26,o=(s+i)*Math.PI/180,l=-Math.cos(o)*a,c=Math.sin(o)*a;n.strokeStyle=e.shade,n.lineWidth=4+(r===2?2:0),n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(l,c),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=2.5,n.beginPath(),n.moveTo(0,0),n.lineTo(l,c),n.stroke()}),n.fillStyle=e.fill,n.globalAlpha=.3,n.beginPath(),n.moveTo(0,0),[-20,-12,-4,4,12].forEach(s=>{const r=(s+i)*Math.PI/180;n.lineTo(-Math.cos(r)*28,Math.sin(r)*28)}),n.closePath(),n.fill(),n.globalAlpha=1}function ld(n,e,t){const i=Math.sin(t)*6;n.fillStyle=ct(n,-16,i*.5,16,e.fill,e.shade),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-10,-12+i,-28,-18+i*.6,-32,i*.4),n.bezierCurveTo(-28,18+i*.4,-10,12+i,0,0),n.closePath(),n.fill(),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=1.5,n.globalAlpha=.4,[-10,-18,-26].forEach(s=>{n.beginPath(),n.moveTo(s,-8+i*.5),n.lineTo(s-4,8+i*.3),n.stroke()}),n.globalAlpha=1}const cd={health:90,attack:70,defense:50,speed:70,energy:50},hd=["health","attack","defense","speed","energy"];function ic(n){const e=re("div",{class:"bars"},hd.map(l=>{const c=n.stats[l],h=Math.min(100,c/cd[l]*100);return re("div",{class:"bar"},[re("span",{},[l]),re("div",{class:"track"},[re("div",{class:"fill",style:`width:${h}%;background:${_h(l)}`})]),re("span",{class:"val"},[String(c)])])})),t=n.abilities.length>0?n.abilities.map(l=>re("span",{class:"tag ability",title:ba[l].description},[ba[l].name])):[re("span",{class:"tag empty"},["No abilities"])],i=n.traits.map(l=>re("span",{class:"tag trait",title:io[l].description},[io[l].name])),s=Math.min(window.devicePixelRatio||1,2),r=100,a=re("canvas",{width:String(r*s),height:String(r*s),style:`width:${r}px;height:${r}px`,"aria-hidden":"true",class:"creature-preview-canvas"});return requestAnimationFrame(()=>{const l=a.getContext("2d");if(!l)return;l.scale(s,s);const c=r/2+4,h=r/2+8,d=n.genome,u=.66,p=Zt[d.body]??Zt.boar;l.save(),l.translate(c,h),l.scale(u,u),l.save(),l.translate(-34,0),l.rotate(-.2),nc(l,d.tail,0),l.restore(),l.save(),l.translate(-20,18),l.scale(.92,.92),tc(l,d.hindlimbs,0),l.restore(),l.save(),l.fillStyle=p.fill,l.strokeStyle=p.shade,l.lineWidth=2,l.beginPath(),l.moveTo(-6,6),l.quadraticCurveTo(20,-2,26,-26),l.quadraticCurveTo(30,-34,22,-34),l.quadraticCurveTo(8,-26,2,-6),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),Ql(l,d.body,0),l.restore(),l.save(),l.translate(14,18),l.scale(.92,.92),ec(l,d.forelimbs,0),l.restore(),l.save(),l.translate(24,-30),Zl(l,d.head,0,0),l.restore(),l.restore()}),re("div",{class:"creature-card fadein"},[re("div",{class:"creature-head"},[a,re("div",{},[re("h3",{class:"creature-name"},[n.name]),re("div",{class:"creature-sub"},[`Power ${Kn(n)}`])])]),e,re("div",{class:"tags"},[...t,...i])])}let Vn=null,hs=!1;function dd(n){hs=n}function ud(){return hs=!hs,hs}function fd(){if(!Vn)try{const n=window.AudioContext??window.webkitAudioContext;n&&(Vn=new n)}catch{Vn=null}}function As(n,e,t,i=.12,s){if(!(hs||!Vn))try{const r=Vn.currentTime,a=Vn.createOscillator(),o=Vn.createGain();a.type=t,a.frequency.setValueAtTime(n,r),s!==void 0&&a.frequency.exponentialRampToValueAtTime(s,r+e),o.gain.setValueAtTime(i,r),o.gain.exponentialRampToValueAtTime(1e-4,r+e),a.connect(o).connect(Vn.destination),a.start(r),a.stop(r+e)}catch{}}function co(n=!1){As(n?220:160,.12,"square",n?.16:.1,n?90:70)}function ho(){As(420,.18,"sawtooth",.1,760)}function uo(){As(520,.22,"sine",.09,880)}function pd(){[523,659,784,1047].forEach((n,e)=>setTimeout(()=>As(n,.18,"triangle",.12),e*110))}function md(){[392,311,247].forEach((n,e)=>setTimeout(()=>As(n,.24,"sawtooth",.1),e*140))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ka="160",gd=0,fo=1,_d=2,sc=1,Ba=2,Ln=3,Zn=0,Yt=1,Kt=2,qn=0,Wi=1,xa=2,po=3,mo=4,vd=5,oi=100,yd=101,Md=102,go=103,_o=104,Sd=200,bd=201,Ed=202,Td=203,wa=204,Aa=205,xd=206,wd=207,Ad=208,Rd=209,Cd=210,Pd=211,Ld=212,Dd=213,Ud=214,Id=0,Nd=1,Od=2,dr=3,Fd=4,kd=5,Bd=6,zd=7,rc=0,Hd=1,Gd=2,Yn=0,Vd=1,Wd=2,Xd=3,za=4,qd=5,Yd=6,ac=300,qi=301,Yi=302,Ra=303,Ca=304,Er=306,Ss=1e3,yn=1001,Pa=1002,At=1003,vo=1004,Dr=1005,hn=1006,jd=1007,bs=1008,jn=1009,$d=1010,Jd=1011,Ha=1012,oc=1013,Wn=1014,Xn=1015,Es=1016,lc=1017,cc=1018,ui=1020,Kd=1021,Mn=1023,Zd=1024,Qd=1025,fi=1026,ji=1027,hc=1028,dc=1029,eu=1030,uc=1031,fc=1033,Ur=33776,Ir=33777,Nr=33778,Or=33779,yo=35840,Mo=35841,So=35842,bo=35843,pc=36196,Eo=37492,To=37496,xo=37808,wo=37809,Ao=37810,Ro=37811,Co=37812,Po=37813,Lo=37814,Do=37815,Uo=37816,Io=37817,No=37818,Oo=37819,Fo=37820,ko=37821,Fr=36492,Bo=36494,zo=36495,tu=36283,Ho=36284,Go=36285,Vo=36286,mc=3e3,pi=3001,nu=3200,iu=3201,Ga=0,su=1,un="",Ft="srgb",In="srgb-linear",Va="display-p3",Tr="display-p3-linear",ur="linear",vt="srgb",fr="rec709",pr="p3",Mi=7680,Wo=519,ru=512,au=513,ou=514,gc=515,lu=516,cu=517,hu=518,du=519,La=35044,Xo="300 es",Da=1035,Un=2e3,mr=2001;class Ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kr=Math.PI/180,gr=180/Math.PI;function $n(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]).toLowerCase()}function Ht(n,e,t){return Math.max(e,Math.min(t,n))}function uu(n,e){return(n%e+e)%e}function Br(n,e,t){return(1-t)*n+t*e}function qo(n){return(n&n-1)===0&&n!==0}function Ua(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Dn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ht(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class xe{constructor(e=0,t=0){xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class et{constructor(e,t,i,s,r,a,o,l,c){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],p=i[5],_=i[8],y=s[0],m=s[3],f=s[6],E=s[1],v=s[4],C=s[7],D=s[2],A=s[5],L=s[8];return r[0]=a*y+o*E+l*D,r[3]=a*m+o*v+l*A,r[6]=a*f+o*C+l*L,r[1]=c*y+h*E+d*D,r[4]=c*m+h*v+d*A,r[7]=c*f+h*C+d*L,r[2]=u*y+p*E+_*D,r[5]=u*m+p*v+_*A,r[8]=u*f+p*C+_*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,p=c*r-a*l,_=t*d+i*u+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=d*y,e[1]=(s*c-h*i)*y,e[2]=(o*i-s*a)*y,e[3]=u*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=p*y,e[7]=(i*l-c*t)*y,e[8]=(a*t-i*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(zr.makeScale(e,t)),this}rotate(e){return this.premultiply(zr.makeRotation(-e)),this}translate(e,t){return this.premultiply(zr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const zr=new et;function _c(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function _r(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function fu(){const n=_r("canvas");return n.style.display="block",n}const Yo={};function ds(n){n in Yo||(Yo[n]=!0,console.warn(n))}const jo=new et().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),$o=new et().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ls={[In]:{transfer:ur,primaries:fr,toReference:n=>n,fromReference:n=>n},[Ft]:{transfer:vt,primaries:fr,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Tr]:{transfer:ur,primaries:pr,toReference:n=>n.applyMatrix3($o),fromReference:n=>n.applyMatrix3(jo)},[Va]:{transfer:vt,primaries:pr,toReference:n=>n.convertSRGBToLinear().applyMatrix3($o),fromReference:n=>n.applyMatrix3(jo).convertLinearToSRGB()}},pu=new Set([In,Tr]),lt={enabled:!0,_workingColorSpace:In,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!pu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Ls[e].toReference,s=Ls[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Ls[n].primaries},getTransfer:function(n){return n===un?ur:Ls[n].transfer}};function Xi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Hr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Si;class vc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Si===void 0&&(Si=_r("canvas")),Si.width=e.width,Si.height=e.height;const i=Si.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Si}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_r("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Xi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Xi(t[i]/255)*255):t[i]=Xi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mu=0;class yc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mu++}),this.uuid=$n(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Gr(s[a].image)):r.push(Gr(s[a]))}else r=Gr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Gr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gu=0;class jt extends Ki{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,i=yn,s=yn,r=hn,a=bs,o=Mn,l=jn,c=jt.DEFAULT_ANISOTROPY,h=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=$n(),this.name="",this.source=new yc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ds("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===pi?Ft:un),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ac)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ss:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case Pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ss:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case Pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ds("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ft?pi:mc}set encoding(e){ds("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===pi?Ft:un}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=ac;jt.DEFAULT_ANISOTROPY=1;class yt{constructor(e=0,t=0,i=0,s=1){yt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],_=l[9],y=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,C=(p+1)/2,D=(f+1)/2,A=(h+u)/4,L=(d+y)/4,z=(_+m)/4;return v>C&&v>D?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=A/i,r=L/i):C>D?C<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(C),i=A/s,r=z/s):D<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),i=L/r,s=z/r),this.set(i,s,r,t),this}let E=Math.sqrt((m-_)*(m-_)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(m-_)/E,this.y=(d-y)/E,this.z=(u-h)/E,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _u extends Ki{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(ds("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===pi?Ft:un),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new jt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new yc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends _u{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Mc extends jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vu extends jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rs{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3];const u=r[a+0],p=r[a+1],_=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=p,e[t+2]=_,e[t+3]=y;return}if(d!==y||l!==u||c!==p||h!==_){let m=1-o;const f=l*u+c*p+h*_+d*y,E=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const D=Math.sqrt(v),A=Math.atan2(D,f*E);m=Math.sin(m*A)/D,o=Math.sin(o*A)/D}const C=o*E;if(l=l*m+u*C,c=c*m+p*C,h=h*m+_*C,d=d*m+y*C,m===1-o){const D=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=D,c*=D,h*=D,d*=D}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[a],u=r[a+1],p=r[a+2],_=r[a+3];return e[t]=o*_+h*d+l*p-c*u,e[t+1]=l*_+h*u+c*d-o*p,e[t+2]=c*_+h*p+o*u-l*d,e[t+3]=h*_-o*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),d=o(r/2),u=l(i/2),p=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*p*_,this._y=c*p*d-u*h*_,this._z=c*h*_+u*p*d,this._w=c*h*d-u*p*_;break;case"YXZ":this._x=u*h*d+c*p*_,this._y=c*p*d-u*h*_,this._z=c*h*_-u*p*d,this._w=c*h*d+u*p*_;break;case"ZXY":this._x=u*h*d-c*p*_,this._y=c*p*d+u*h*_,this._z=c*h*_+u*p*d,this._w=c*h*d-u*p*_;break;case"ZYX":this._x=u*h*d-c*p*_,this._y=c*p*d+u*h*_,this._z=c*h*_-u*p*d,this._w=c*h*d+u*p*_;break;case"YZX":this._x=u*h*d+c*p*_,this._y=c*p*d+u*h*_,this._z=c*h*_-u*p*d,this._w=c*h*d-u*p*_;break;case"XZY":this._x=u*h*d-c*p*_,this._y=c*p*d-u*h*_,this._z=c*h*_+u*p*d,this._w=c*h*d+u*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ht(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*d+this._w*u,this._x=i*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,i=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Vr.copy(this).projectOnVector(e),this.sub(Vr)}reflect(e){return this.sub(Vr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vr=new w,Jo=new Rs;class Cs{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pn):pn.fromBufferAttribute(r,a),pn.applyMatrix4(e.matrixWorld),this.expandByPoint(pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ds.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ds.copy(i.boundingBox)),Ds.applyMatrix4(e.matrixWorld),this.union(Ds)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,pn),pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ns),Us.subVectors(this.max,ns),bi.subVectors(e.a,ns),Ei.subVectors(e.b,ns),Ti.subVectors(e.c,ns),Fn.subVectors(Ei,bi),kn.subVectors(Ti,Ei),ei.subVectors(bi,Ti);let t=[0,-Fn.z,Fn.y,0,-kn.z,kn.y,0,-ei.z,ei.y,Fn.z,0,-Fn.x,kn.z,0,-kn.x,ei.z,0,-ei.x,-Fn.y,Fn.x,0,-kn.y,kn.x,0,-ei.y,ei.x,0];return!Wr(t,bi,Ei,Ti,Us)||(t=[1,0,0,0,1,0,0,0,1],!Wr(t,bi,Ei,Ti,Us))?!1:(Is.crossVectors(Fn,kn),t=[Is.x,Is.y,Is.z],Wr(t,bi,Ei,Ti,Us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xn=[new w,new w,new w,new w,new w,new w,new w,new w],pn=new w,Ds=new Cs,bi=new w,Ei=new w,Ti=new w,Fn=new w,kn=new w,ei=new w,ns=new w,Us=new w,Is=new w,ti=new w;function Wr(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ti.fromArray(n,r);const o=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),l=e.dot(ti),c=t.dot(ti),h=i.dot(ti);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const yu=new Cs,is=new w,Xr=new w;class Ps{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):yu.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;is.subVectors(e,this.center);const t=is.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(is,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(is.copy(e.center).add(Xr)),this.expandByPoint(is.copy(e.center).sub(Xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wn=new w,qr=new w,Ns=new w,Bn=new w,Yr=new w,Os=new w,jr=new w;class Wa{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wn.copy(this.origin).addScaledVector(this.direction,t),wn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){qr.copy(e).add(t).multiplyScalar(.5),Ns.copy(t).sub(e).normalize(),Bn.copy(this.origin).sub(qr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ns),o=Bn.dot(this.direction),l=-Bn.dot(Ns),c=Bn.lengthSq(),h=Math.abs(1-a*a);let d,u,p,_;if(h>0)if(d=a*l-o,u=a*o-l,_=r*h,d>=0)if(u>=-_)if(u<=_){const y=1/h;d*=y,u*=y,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-_?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=_?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(qr).addScaledVector(Ns,u),p}intersectSphere(e,t){wn.subVectors(e.center,this.origin);const i=wn.dot(this.direction),s=wn.dot(wn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,wn)!==null}intersectTriangle(e,t,i,s,r){Yr.subVectors(t,e),Os.subVectors(i,e),jr.crossVectors(Yr,Os);let a=this.direction.dot(jr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Bn.subVectors(this.origin,e);const l=o*this.direction.dot(Os.crossVectors(Bn,Os));if(l<0)return null;const c=o*this.direction.dot(Yr.cross(Bn));if(c<0||l+c>a)return null;const h=-o*Bn.dot(jr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Mt{constructor(e,t,i,s,r,a,o,l,c,h,d,u,p,_,y,m){Mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,d,u,p,_,y,m)}set(e,t,i,s,r,a,o,l,c,h,d,u,p,_,y,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=_,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Mt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/xi.setFromMatrixColumn(e,0).length(),r=1/xi.setFromMatrixColumn(e,1).length(),a=1/xi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,p=a*d,_=o*h,y=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+_*c,t[5]=u-y*c,t[9]=-o*l,t[2]=y-u*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,p=l*d,_=c*h,y=c*d;t[0]=u+y*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-_,t[6]=y+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,p=l*d,_=c*h,y=c*d;t[0]=u-y*o,t[4]=-a*d,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*h,t[9]=y-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,p=a*d,_=o*h,y=o*d;t[0]=l*h,t[4]=_*c-p,t[8]=u*c+y,t[1]=l*d,t[5]=y*c+u,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,p=a*c,_=o*l,y=o*c;t[0]=l*h,t[4]=y-u*d,t[8]=_*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*d+_,t[10]=u-y*d}else if(e.order==="XZY"){const u=a*l,p=a*c,_=o*l,y=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+y,t[5]=a*h,t[9]=p*d-_,t[2]=_*d-p,t[6]=o*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mu,e,Su)}lookAt(e,t,i){const s=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),zn.crossVectors(i,en),zn.lengthSq()===0&&(Math.abs(i.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),zn.crossVectors(i,en)),zn.normalize(),Fs.crossVectors(en,zn),s[0]=zn.x,s[4]=Fs.x,s[8]=en.x,s[1]=zn.y,s[5]=Fs.y,s[9]=en.y,s[2]=zn.z,s[6]=Fs.z,s[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],p=i[13],_=i[2],y=i[6],m=i[10],f=i[14],E=i[3],v=i[7],C=i[11],D=i[15],A=s[0],L=s[4],z=s[8],M=s[12],x=s[1],F=s[5],j=s[9],he=s[13],I=s[2],H=s[6],B=s[10],ee=s[14],Z=s[3],X=s[7],te=s[11],Q=s[15];return r[0]=a*A+o*x+l*I+c*Z,r[4]=a*L+o*F+l*H+c*X,r[8]=a*z+o*j+l*B+c*te,r[12]=a*M+o*he+l*ee+c*Q,r[1]=h*A+d*x+u*I+p*Z,r[5]=h*L+d*F+u*H+p*X,r[9]=h*z+d*j+u*B+p*te,r[13]=h*M+d*he+u*ee+p*Q,r[2]=_*A+y*x+m*I+f*Z,r[6]=_*L+y*F+m*H+f*X,r[10]=_*z+y*j+m*B+f*te,r[14]=_*M+y*he+m*ee+f*Q,r[3]=E*A+v*x+C*I+D*Z,r[7]=E*L+v*F+C*H+D*X,r[11]=E*z+v*j+C*B+D*te,r[15]=E*M+v*he+C*ee+D*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],_=e[3],y=e[7],m=e[11],f=e[15];return _*(+r*l*d-s*c*d-r*o*u+i*c*u+s*o*p-i*l*p)+y*(+t*l*p-t*c*u+r*a*u-s*a*p+s*c*h-r*l*h)+m*(+t*c*d-t*o*p-r*a*d+i*a*p+r*o*h-i*c*h)+f*(-s*o*h-t*l*d+t*o*u+s*a*d-i*a*u+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],_=e[12],y=e[13],m=e[14],f=e[15],E=d*m*c-y*u*c+y*l*p-o*m*p-d*l*f+o*u*f,v=_*u*c-h*m*c-_*l*p+a*m*p+h*l*f-a*u*f,C=h*y*c-_*d*c+_*o*p-a*y*p-h*o*f+a*d*f,D=_*d*l-h*y*l-_*o*u+a*y*u+h*o*m-a*d*m,A=t*E+i*v+s*C+r*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/A;return e[0]=E*L,e[1]=(y*u*r-d*m*r-y*s*p+i*m*p+d*s*f-i*u*f)*L,e[2]=(o*m*r-y*l*r+y*s*c-i*m*c-o*s*f+i*l*f)*L,e[3]=(d*l*r-o*u*r-d*s*c+i*u*c+o*s*p-i*l*p)*L,e[4]=v*L,e[5]=(h*m*r-_*u*r+_*s*p-t*m*p-h*s*f+t*u*f)*L,e[6]=(_*l*r-a*m*r-_*s*c+t*m*c+a*s*f-t*l*f)*L,e[7]=(a*u*r-h*l*r+h*s*c-t*u*c-a*s*p+t*l*p)*L,e[8]=C*L,e[9]=(_*d*r-h*y*r-_*i*p+t*y*p+h*i*f-t*d*f)*L,e[10]=(a*y*r-_*o*r+_*i*c-t*y*c-a*i*f+t*o*f)*L,e[11]=(h*o*r-a*d*r-h*i*c+t*d*c+a*i*p-t*o*p)*L,e[12]=D*L,e[13]=(h*y*s-_*d*s+_*i*u-t*y*u-h*i*m+t*d*m)*L,e[14]=(_*o*s-a*y*s-_*i*l+t*y*l+a*i*m-t*o*m)*L,e[15]=(a*d*s-h*o*s+h*i*l-t*d*l-a*i*u+t*o*u)*L,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,p=r*h,_=r*d,y=a*h,m=a*d,f=o*d,E=l*c,v=l*h,C=l*d,D=i.x,A=i.y,L=i.z;return s[0]=(1-(y+f))*D,s[1]=(p+C)*D,s[2]=(_-v)*D,s[3]=0,s[4]=(p-C)*A,s[5]=(1-(u+f))*A,s[6]=(m+E)*A,s[7]=0,s[8]=(_+v)*L,s[9]=(m-E)*L,s[10]=(1-(u+y))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=xi.set(s[0],s[1],s[2]).length();const a=xi.set(s[4],s[5],s[6]).length(),o=xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],mn.copy(this);const c=1/r,h=1/a,d=1/o;return mn.elements[0]*=c,mn.elements[1]*=c,mn.elements[2]*=c,mn.elements[4]*=h,mn.elements[5]*=h,mn.elements[6]*=h,mn.elements[8]*=d,mn.elements[9]*=d,mn.elements[10]*=d,t.setFromRotationMatrix(mn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Un){const l=this.elements,c=2*r/(t-e),h=2*r/(i-s),d=(t+e)/(t-e),u=(i+s)/(i-s);let p,_;if(o===Un)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===mr)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Un){const l=this.elements,c=1/(t-e),h=1/(i-s),d=1/(a-r),u=(t+e)*c,p=(i+s)*h;let _,y;if(o===Un)_=(a+r)*d,y=-2*d;else if(o===mr)_=r*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const xi=new w,mn=new Mt,Mu=new w(0,0,0),Su=new w(1,1,1),zn=new w,Fs=new w,en=new w,Ko=new Mt,Zo=new Rs;class xr{constructor(e=0,t=0,i=0,s=xr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ko.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ko,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zo.setFromEuler(this),this.setFromQuaternion(Zo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xr.DEFAULT_ORDER="XYZ";class Sc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let bu=0;const Qo=new w,wi=new Rs,An=new Mt,ks=new w,ss=new w,Eu=new w,Tu=new Rs,el=new w(1,0,0),tl=new w(0,1,0),nl=new w(0,0,1),xu={type:"added"},wu={type:"removed"};class Et extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new w,t=new xr,i=new Rs,s=new w(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Mt},normalMatrix:{value:new et}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.multiply(wi),this}rotateOnWorldAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.premultiply(wi),this}rotateX(e){return this.rotateOnAxis(el,e)}rotateY(e){return this.rotateOnAxis(tl,e)}rotateZ(e){return this.rotateOnAxis(nl,e)}translateOnAxis(e,t){return Qo.copy(e).applyQuaternion(this.quaternion),this.position.add(Qo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(el,e)}translateY(e){return this.translateOnAxis(tl,e)}translateZ(e){return this.translateOnAxis(nl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ks.copy(e):ks.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(ss,ks,this.up):An.lookAt(ks,ss,this.up),this.quaternion.setFromRotationMatrix(An),s&&(An.extractRotation(s.matrixWorld),wi.setFromRotationMatrix(An),this.quaternion.premultiply(wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(xu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),An.multiply(e.parent.matrixWorld)),e.applyMatrix4(An),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,e,Eu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,Tu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Et.DEFAULT_UP=new w(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new w,Rn=new w,$r=new w,Cn=new w,Ai=new w,Ri=new w,il=new w,Jr=new w,Kr=new w,Zr=new w;let Bs=!1;class dn{constructor(e=new w,t=new w,i=new w){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),gn.subVectors(e,t),s.cross(gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){gn.subVectors(s,t),Rn.subVectors(i,t),$r.subVectors(e,t);const a=gn.dot(gn),o=gn.dot(Rn),l=gn.dot($r),c=Rn.dot(Rn),h=Rn.dot($r),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*l-o*h)*u,_=(a*h-o*l)*u;return r.set(1-p-_,_,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getUV(e,t,i,s,r,a,o,l){return Bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bs=!0),this.getInterpolation(e,t,i,s,r,a,o,l)}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Cn.x),l.addScaledVector(a,Cn.y),l.addScaledVector(o,Cn.z),l)}static isFrontFacing(e,t,i,s){return gn.subVectors(i,t),Rn.subVectors(e,t),gn.cross(Rn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gn.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),gn.cross(Rn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return Bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bs=!0),dn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}getInterpolation(e,t,i,s,r){return dn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Ai.subVectors(s,i),Ri.subVectors(r,i),Jr.subVectors(e,i);const l=Ai.dot(Jr),c=Ri.dot(Jr);if(l<=0&&c<=0)return t.copy(i);Kr.subVectors(e,s);const h=Ai.dot(Kr),d=Ri.dot(Kr);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(Ai,a);Zr.subVectors(e,r);const p=Ai.dot(Zr),_=Ri.dot(Zr);if(_>=0&&p<=_)return t.copy(r);const y=p*c-l*_;if(y<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(Ri,o);const m=h*_-p*d;if(m<=0&&d-h>=0&&p-_>=0)return il.subVectors(r,s),o=(d-h)/(d-h+(p-_)),t.copy(s).addScaledVector(il,o);const f=1/(m+y+u);return a=y*f,o=u*f,t.copy(i).addScaledVector(Ai,a).addScaledVector(Ri,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},zs={h:0,s:0,l:0};function Qr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Fe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=i,lt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=lt.workingColorSpace){if(e=uu(e,1),t=Ht(t,0,1),i=Ht(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Qr(a,r,e+1/3),this.g=Qr(a,r,e),this.b=Qr(a,r,e-1/3)}return lt.toWorkingColorSpace(this,s),this}setStyle(e,t=Ft){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){const i=bc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}copyLinearToSRGB(e){return this.r=Hr(e.r),this.g=Hr(e.g),this.b=Hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return lt.fromWorkingColorSpace(zt.copy(this),e),Math.round(Ht(zt.r*255,0,255))*65536+Math.round(Ht(zt.g*255,0,255))*256+Math.round(Ht(zt.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.fromWorkingColorSpace(zt.copy(this),t);const i=zt.r,s=zt.g,r=zt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=lt.workingColorSpace){return lt.fromWorkingColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=Ft){lt.fromWorkingColorSpace(zt.copy(this),e);const t=zt.r,i=zt.g,s=zt.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Hn),this.setHSL(Hn.h+e,Hn.s+t,Hn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hn),e.getHSL(zs);const i=Br(Hn.h,zs.h,t),s=Br(Hn.s,zs.s,t),r=Br(Hn.l,zs.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new Fe;Fe.NAMES=bc;let Au=0;class Nn extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=$n(),this.name="",this.type="Material",this.blending=Wi,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wa,this.blendDst=Aa,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=dr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mi,this.stencilZFail=Mi,this.stencilZPass=Mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Wi&&(i.blending=this.blending),this.side!==Zn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==wa&&(i.blendSrc=this.blendSrc),this.blendDst!==Aa&&(i.blendDst=this.blendDst),this.blendEquation!==oi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==dr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Mi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Mi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class It extends Nn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new w,Hs=new xe;class rn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=La,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Hs.fromBufferAttribute(this,t),Hs.applyMatrix3(e),this.setXY(t,Hs.x,Hs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ht(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),s=ht(s,this.array),r=ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==La&&(e.usage=this.usage),e}}class Ec extends rn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Tc extends rn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ft extends rn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Ru=0;const ln=new Mt,ea=new Et,Ci=new w,tn=new Cs,rs=new Cs,Ut=new w;class Tt extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_c(e)?Tc:Ec)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new et().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,i){return ln.makeTranslation(e,t,i),this.applyMatrix4(ln),this}scale(e,t,i){return ln.makeScale(e,t,i),this.applyMatrix4(ln),this}lookAt(e){return ea.lookAt(e),ea.updateMatrix(),this.applyMatrix4(ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ft(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ps);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new w,1/0);return}if(e){const i=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];rs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(tn.min,rs.min),tn.expandByPoint(Ut),Ut.addVectors(tn.max,rs.max),tn.expandByPoint(Ut)):(tn.expandByPoint(rs.min),tn.expandByPoint(rs.max))}tn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ut));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ut.fromBufferAttribute(o,c),l&&(Ci.fromBufferAttribute(e,c),Ut.add(Ci)),s=Math.max(s,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let x=0;x<o;x++)c[x]=new w,h[x]=new w;const d=new w,u=new w,p=new w,_=new xe,y=new xe,m=new xe,f=new w,E=new w;function v(x,F,j){d.fromArray(s,x*3),u.fromArray(s,F*3),p.fromArray(s,j*3),_.fromArray(a,x*2),y.fromArray(a,F*2),m.fromArray(a,j*2),u.sub(d),p.sub(d),y.sub(_),m.sub(_);const he=1/(y.x*m.y-m.x*y.y);isFinite(he)&&(f.copy(u).multiplyScalar(m.y).addScaledVector(p,-y.y).multiplyScalar(he),E.copy(p).multiplyScalar(y.x).addScaledVector(u,-m.x).multiplyScalar(he),c[x].add(f),c[F].add(f),c[j].add(f),h[x].add(E),h[F].add(E),h[j].add(E))}let C=this.groups;C.length===0&&(C=[{start:0,count:i.length}]);for(let x=0,F=C.length;x<F;++x){const j=C[x],he=j.start,I=j.count;for(let H=he,B=he+I;H<B;H+=3)v(i[H+0],i[H+1],i[H+2])}const D=new w,A=new w,L=new w,z=new w;function M(x){L.fromArray(r,x*3),z.copy(L);const F=c[x];D.copy(F),D.sub(L.multiplyScalar(L.dot(F))).normalize(),A.crossVectors(z,F);const he=A.dot(h[x])<0?-1:1;l[x*4]=D.x,l[x*4+1]=D.y,l[x*4+2]=D.z,l[x*4+3]=he}for(let x=0,F=C.length;x<F;++x){const j=C[x],he=j.start,I=j.count;for(let H=he,B=he+I;H<B;H+=3)M(i[H+0]),M(i[H+1]),M(i[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new rn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new w,r=new w,a=new w,o=new w,l=new w,c=new w,h=new w,d=new w;if(e)for(let u=0,p=e.count;u<p;u+=3){const _=e.getX(u+0),y=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let p=0,_=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?p=l[y]*o.data.stride+o.offset:p=l[y]*h;for(let f=0;f<h;f++)u[_++]=c[p++]}return new rn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=e(u,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const sl=new Mt,ni=new Wa,Gs=new Ps,rl=new w,Pi=new w,Li=new w,Di=new w,ta=new w,Vs=new w,Ws=new xe,Xs=new xe,qs=new xe,al=new w,ol=new w,ll=new w,Ys=new w,js=new w;class Qe extends Et{constructor(e=new Tt,t=new It){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Vs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(ta.fromBufferAttribute(d,e),a?Vs.addScaledVector(ta,h):Vs.addScaledVector(ta.sub(t),h))}t.add(Vs)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Gs.copy(i.boundingSphere),Gs.applyMatrix4(r),ni.copy(e.ray).recast(e.near),!(Gs.containsPoint(ni.origin)===!1&&(ni.intersectSphere(Gs,rl)===null||ni.origin.distanceToSquared(rl)>(e.far-e.near)**2))&&(sl.copy(r).invert(),ni.copy(e.ray).applyMatrix4(sl),!(i.boundingBox!==null&&ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,y=u.length;_<y;_++){const m=u[_],f=a[m.materialIndex],E=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let C=E,D=v;C<D;C+=3){const A=o.getX(C),L=o.getX(C+1),z=o.getX(C+2);s=$s(this,f,e,i,c,h,d,A,L,z),s&&(s.faceIndex=Math.floor(C/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let m=_,f=y;m<f;m+=3){const E=o.getX(m),v=o.getX(m+1),C=o.getX(m+2);s=$s(this,a,e,i,c,h,d,E,v,C),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,y=u.length;_<y;_++){const m=u[_],f=a[m.materialIndex],E=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let C=E,D=v;C<D;C+=3){const A=C,L=C+1,z=C+2;s=$s(this,f,e,i,c,h,d,A,L,z),s&&(s.faceIndex=Math.floor(C/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=_,f=y;m<f;m+=3){const E=m,v=m+1,C=m+2;s=$s(this,a,e,i,c,h,d,E,v,C),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Cu(n,e,t,i,s,r,a,o){let l;if(e.side===Yt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Zn,o),l===null)return null;js.copy(o),js.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(js);return c<t.near||c>t.far?null:{distance:c,point:js.clone(),object:n}}function $s(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Pi),n.getVertexPosition(l,Li),n.getVertexPosition(c,Di);const h=Cu(n,e,t,i,Pi,Li,Di,Ys);if(h){s&&(Ws.fromBufferAttribute(s,o),Xs.fromBufferAttribute(s,l),qs.fromBufferAttribute(s,c),h.uv=dn.getInterpolation(Ys,Pi,Li,Di,Ws,Xs,qs,new xe)),r&&(Ws.fromBufferAttribute(r,o),Xs.fromBufferAttribute(r,l),qs.fromBufferAttribute(r,c),h.uv1=dn.getInterpolation(Ys,Pi,Li,Di,Ws,Xs,qs,new xe),h.uv2=h.uv1),a&&(al.fromBufferAttribute(a,o),ol.fromBufferAttribute(a,l),ll.fromBufferAttribute(a,c),h.normal=dn.getInterpolation(Ys,Pi,Li,Di,al,ol,ll,new w),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new w,materialIndex:0};dn.getNormal(Pi,Li,Di,d.normal),h.face=d}return h}class Zi extends Tt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,p=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(h,3)),this.setAttribute("uv",new ft(d,2));function _(y,m,f,E,v,C,D,A,L,z,M){const x=C/L,F=D/z,j=C/2,he=D/2,I=A/2,H=L+1,B=z+1;let ee=0,Z=0;const X=new w;for(let te=0;te<B;te++){const Q=te*F-he;for(let ye=0;ye<H;ye++){const J=ye*x-j;X[y]=J*E,X[m]=Q*v,X[f]=I,c.push(X.x,X.y,X.z),X[y]=0,X[m]=0,X[f]=A>0?1:-1,h.push(X.x,X.y,X.z),d.push(ye/L),d.push(1-te/z),ee+=1}}for(let te=0;te<z;te++)for(let Q=0;Q<L;Q++){const ye=u+Q+H*te,J=u+Q+H*(te+1),G=u+(Q+1)+H*(te+1),le=u+(Q+1)+H*te;l.push(ye,J,le),l.push(J,G,le),Z+=6}o.addGroup(p,Z,M),p+=Z,u+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $i(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Wt(n){const e={};for(let t=0;t<n.length;t++){const i=$i(n[t]);for(const s in i)e[s]=i[s]}return e}function Pu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function xc(n){return n.getRenderTarget()===null?n.outputColorSpace:lt.workingColorSpace}const Lu={clone:$i,merge:Wt};var Du=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gi extends Nn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Du,this.fragmentShader=Uu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=Pu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class wc extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=Un}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class qt extends wc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=gr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gr*2*Math.atan(Math.tan(kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(kr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ui=-90,Ii=1;class Iu extends Et{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(Ui,Ii,e,t);s.layers=this.layers,this.add(s);const r=new qt(Ui,Ii,e,t);r.layers=this.layers,this.add(r);const a=new qt(Ui,Ii,e,t);a.layers=this.layers,this.add(a);const o=new qt(Ui,Ii,e,t);o.layers=this.layers,this.add(o);const l=new qt(Ui,Ii,e,t);l.layers=this.layers,this.add(l);const c=new qt(Ui,Ii,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Un)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===mr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Ac extends jt{constructor(e,t,i,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:qi,super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Nu extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(ds("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===pi?Ft:un),this.texture=new Ac(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:hn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Zi(5,5,5),r=new gi({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yt,blending:qn});r.uniforms.tEquirect.value=t;const a=new Qe(s,r),o=t.minFilter;return t.minFilter===bs&&(t.minFilter=hn),new Iu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const na=new w,Ou=new w,Fu=new et;class ri{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=na.subVectors(i,t).cross(Ou.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(na),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Fu.getNormalMatrix(e),s=this.coplanarPoint(na).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new Ps,Js=new w;class Xa{constructor(e=new ri,t=new ri,i=new ri,s=new ri,r=new ri,a=new ri){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Un){const i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],p=s[8],_=s[9],y=s[10],m=s[11],f=s[12],E=s[13],v=s[14],C=s[15];if(i[0].setComponents(l-r,u-c,m-p,C-f).normalize(),i[1].setComponents(l+r,u+c,m+p,C+f).normalize(),i[2].setComponents(l+a,u+h,m+_,C+E).normalize(),i[3].setComponents(l-a,u-h,m-_,C-E).normalize(),i[4].setComponents(l-o,u-d,m-y,C-v).normalize(),t===Un)i[5].setComponents(l+o,u+d,m+y,C+v).normalize();else if(t===mr)i[5].setComponents(o,d,y,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Js.x=s.normal.x>0?e.max.x:e.min.x,Js.y=s.normal.y>0?e.max.y:e.min.y,Js.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Js)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Rc(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function ku(n,e){const t=e.isWebGL2,i=new WeakMap;function s(c,h){const d=c.array,u=c.usage,p=d.byteLength,_=n.createBuffer();n.bindBuffer(h,_),n.bufferData(h,d,u),c.onUploadCallback();let y;if(d instanceof Float32Array)y=n.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)y=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)y=n.SHORT;else if(d instanceof Uint32Array)y=n.UNSIGNED_INT;else if(d instanceof Int32Array)y=n.INT;else if(d instanceof Int8Array)y=n.BYTE;else if(d instanceof Uint8Array)y=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)y=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:y,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,h,d){const u=h.array,p=h._updateRange,_=h.updateRanges;if(n.bindBuffer(d,c),p.count===-1&&_.length===0&&n.bufferSubData(d,0,u),_.length!==0){for(let y=0,m=_.length;y<m;y++){const f=_[y];t?n.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u,f.start,f.count):n.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u,p.offset,p.count):n.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=i.get(c);(!u||u.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=i.get(c);if(d===void 0)i.set(c,s(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:a,remove:o,update:l}}class wr extends Tt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,p=[],_=[],y=[],m=[];for(let f=0;f<h;f++){const E=f*u-a;for(let v=0;v<c;v++){const C=v*d-r;_.push(C,-E,0),y.push(0,0,1),m.push(v/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<o;E++){const v=E+c*f,C=E+c*(f+1),D=E+1+c*(f+1),A=E+1+c*f;p.push(v,C,A),p.push(C,D,A)}this.setIndex(p),this.setAttribute("position",new ft(_,3)),this.setAttribute("normal",new ft(y,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Bu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Wu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ju=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,$u=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ju=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ku=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,af=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,of=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,lf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,cf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,df=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,uf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ff=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gf="gl_FragColor = linearToOutputTexel( gl_FragColor );",_f=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,vf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Mf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Sf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ef=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Af=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Cf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Df=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Uf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,If=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Of=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ff=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Bf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Hf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,qf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Yf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$f=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ep=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,tp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,np=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,ip=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,op=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,up=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_p=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,bp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ep=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Tp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ap=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Up=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ip=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,qp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Yp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,em=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,im=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,am=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,om=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,um=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_m=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:Bu,alphahash_pars_fragment:zu,alphamap_fragment:Hu,alphamap_pars_fragment:Gu,alphatest_fragment:Vu,alphatest_pars_fragment:Wu,aomap_fragment:Xu,aomap_pars_fragment:qu,batching_pars_vertex:Yu,batching_vertex:ju,begin_vertex:$u,beginnormal_vertex:Ju,bsdfs:Ku,iridescence_fragment:Zu,bumpmap_pars_fragment:Qu,clipping_planes_fragment:ef,clipping_planes_pars_fragment:tf,clipping_planes_pars_vertex:nf,clipping_planes_vertex:sf,color_fragment:rf,color_pars_fragment:af,color_pars_vertex:of,color_vertex:lf,common:cf,cube_uv_reflection_fragment:hf,defaultnormal_vertex:df,displacementmap_pars_vertex:uf,displacementmap_vertex:ff,emissivemap_fragment:pf,emissivemap_pars_fragment:mf,colorspace_fragment:gf,colorspace_pars_fragment:_f,envmap_fragment:vf,envmap_common_pars_fragment:yf,envmap_pars_fragment:Mf,envmap_pars_vertex:Sf,envmap_physical_pars_fragment:Uf,envmap_vertex:bf,fog_vertex:Ef,fog_pars_vertex:Tf,fog_fragment:xf,fog_pars_fragment:wf,gradientmap_pars_fragment:Af,lightmap_fragment:Rf,lightmap_pars_fragment:Cf,lights_lambert_fragment:Pf,lights_lambert_pars_fragment:Lf,lights_pars_begin:Df,lights_toon_fragment:If,lights_toon_pars_fragment:Nf,lights_phong_fragment:Of,lights_phong_pars_fragment:Ff,lights_physical_fragment:kf,lights_physical_pars_fragment:Bf,lights_fragment_begin:zf,lights_fragment_maps:Hf,lights_fragment_end:Gf,logdepthbuf_fragment:Vf,logdepthbuf_pars_fragment:Wf,logdepthbuf_pars_vertex:Xf,logdepthbuf_vertex:qf,map_fragment:Yf,map_pars_fragment:jf,map_particle_fragment:$f,map_particle_pars_fragment:Jf,metalnessmap_fragment:Kf,metalnessmap_pars_fragment:Zf,morphcolor_vertex:Qf,morphnormal_vertex:ep,morphtarget_pars_vertex:tp,morphtarget_vertex:np,normal_fragment_begin:ip,normal_fragment_maps:sp,normal_pars_fragment:rp,normal_pars_vertex:ap,normal_vertex:op,normalmap_pars_fragment:lp,clearcoat_normal_fragment_begin:cp,clearcoat_normal_fragment_maps:hp,clearcoat_pars_fragment:dp,iridescence_pars_fragment:up,opaque_fragment:fp,packing:pp,premultiplied_alpha_fragment:mp,project_vertex:gp,dithering_fragment:_p,dithering_pars_fragment:vp,roughnessmap_fragment:yp,roughnessmap_pars_fragment:Mp,shadowmap_pars_fragment:Sp,shadowmap_pars_vertex:bp,shadowmap_vertex:Ep,shadowmask_pars_fragment:Tp,skinbase_vertex:xp,skinning_pars_vertex:wp,skinning_vertex:Ap,skinnormal_vertex:Rp,specularmap_fragment:Cp,specularmap_pars_fragment:Pp,tonemapping_fragment:Lp,tonemapping_pars_fragment:Dp,transmission_fragment:Up,transmission_pars_fragment:Ip,uv_pars_fragment:Np,uv_pars_vertex:Op,uv_vertex:Fp,worldpos_vertex:kp,background_vert:Bp,background_frag:zp,backgroundCube_vert:Hp,backgroundCube_frag:Gp,cube_vert:Vp,cube_frag:Wp,depth_vert:Xp,depth_frag:qp,distanceRGBA_vert:Yp,distanceRGBA_frag:jp,equirect_vert:$p,equirect_frag:Jp,linedashed_vert:Kp,linedashed_frag:Zp,meshbasic_vert:Qp,meshbasic_frag:em,meshlambert_vert:tm,meshlambert_frag:nm,meshmatcap_vert:im,meshmatcap_frag:sm,meshnormal_vert:rm,meshnormal_frag:am,meshphong_vert:om,meshphong_frag:lm,meshphysical_vert:cm,meshphysical_frag:hm,meshtoon_vert:dm,meshtoon_frag:um,points_vert:fm,points_frag:pm,shadow_vert:mm,shadow_frag:gm,sprite_vert:_m,sprite_frag:vm},me={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},En={basic:{uniforms:Wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Wt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Wt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Wt([me.points,me.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Wt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Wt([me.common,me.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Wt([me.sprite,me.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:Wt([me.common,me.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:Wt([me.lights,me.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};En.physical={uniforms:Wt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Ks={r:0,b:0,g:0};function ym(n,e,t,i,s,r,a){const o=new Fe(0);let l=r===!0?0:1,c,h,d=null,u=0,p=null;function _(m,f){let E=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v===null?y(o,l):v&&v.isColor&&(y(v,1),E=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Er)?(h===void 0&&(h=new Qe(new Zi(1,1,1),new gi({name:"BackgroundCubeMaterial",uniforms:$i(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,A,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=lt.getTransfer(v.colorSpace)!==vt,(d!==v||u!==v.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,p=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Qe(new wr(2,2),new gi({name:"BackgroundMaterial",uniforms:$i(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=lt.getTransfer(v.colorSpace)!==vt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function y(m,f){m.getRGB(Ks,xc(n)),i.buffers.color.setClear(Ks.r,Ks.g,Ks.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(m,f=1){o.set(m),l=f,y(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(o,l)},render:_}}function Mm(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=m(null);let c=l,h=!1;function d(I,H,B,ee,Z){let X=!1;if(a){const te=y(ee,B,H);c!==te&&(c=te,p(c.object)),X=f(I,ee,B,Z),X&&E(I,ee,B,Z)}else{const te=H.wireframe===!0;(c.geometry!==ee.id||c.program!==B.id||c.wireframe!==te)&&(c.geometry=ee.id,c.program=B.id,c.wireframe=te,X=!0)}Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,z(I,H,B,ee),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function u(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(I){return i.isWebGL2?n.bindVertexArray(I):r.bindVertexArrayOES(I)}function _(I){return i.isWebGL2?n.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function y(I,H,B){const ee=B.wireframe===!0;let Z=o[I.id];Z===void 0&&(Z={},o[I.id]=Z);let X=Z[H.id];X===void 0&&(X={},Z[H.id]=X);let te=X[ee];return te===void 0&&(te=m(u()),X[ee]=te),te}function m(I){const H=[],B=[],ee=[];for(let Z=0;Z<s;Z++)H[Z]=0,B[Z]=0,ee[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:B,attributeDivisors:ee,object:I,attributes:{},index:null}}function f(I,H,B,ee){const Z=c.attributes,X=H.attributes;let te=0;const Q=B.getAttributes();for(const ye in Q)if(Q[ye].location>=0){const G=Z[ye];let le=X[ye];if(le===void 0&&(ye==="instanceMatrix"&&I.instanceMatrix&&(le=I.instanceMatrix),ye==="instanceColor"&&I.instanceColor&&(le=I.instanceColor)),G===void 0||G.attribute!==le||le&&G.data!==le.data)return!0;te++}return c.attributesNum!==te||c.index!==ee}function E(I,H,B,ee){const Z={},X=H.attributes;let te=0;const Q=B.getAttributes();for(const ye in Q)if(Q[ye].location>=0){let G=X[ye];G===void 0&&(ye==="instanceMatrix"&&I.instanceMatrix&&(G=I.instanceMatrix),ye==="instanceColor"&&I.instanceColor&&(G=I.instanceColor));const le={};le.attribute=G,G&&G.data&&(le.data=G.data),Z[ye]=le,te++}c.attributes=Z,c.attributesNum=te,c.index=ee}function v(){const I=c.newAttributes;for(let H=0,B=I.length;H<B;H++)I[H]=0}function C(I){D(I,0)}function D(I,H){const B=c.newAttributes,ee=c.enabledAttributes,Z=c.attributeDivisors;B[I]=1,ee[I]===0&&(n.enableVertexAttribArray(I),ee[I]=1),Z[I]!==H&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,H),Z[I]=H)}function A(){const I=c.newAttributes,H=c.enabledAttributes;for(let B=0,ee=H.length;B<ee;B++)H[B]!==I[B]&&(n.disableVertexAttribArray(B),H[B]=0)}function L(I,H,B,ee,Z,X,te){te===!0?n.vertexAttribIPointer(I,H,B,Z,X):n.vertexAttribPointer(I,H,B,ee,Z,X)}function z(I,H,B,ee){if(i.isWebGL2===!1&&(I.isInstancedMesh||ee.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const Z=ee.attributes,X=B.getAttributes(),te=H.defaultAttributeValues;for(const Q in X){const ye=X[Q];if(ye.location>=0){let J=Z[Q];if(J===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(J=I.instanceColor)),J!==void 0){const G=J.normalized,le=J.itemSize,ge=t.get(J);if(ge===void 0)continue;const Se=ge.buffer,Me=ge.type,He=ge.bytesPerElement,be=i.isWebGL2===!0&&(Me===n.INT||Me===n.UNSIGNED_INT||J.gpuType===oc);if(J.isInterleavedBufferAttribute){const ke=J.data,V=ke.stride,St=J.offset;if(ke.isInstancedInterleavedBuffer){for(let Ne=0;Ne<ye.locationSize;Ne++)D(ye.location+Ne,ke.meshPerAttribute);I.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=ke.meshPerAttribute*ke.count)}else for(let Ne=0;Ne<ye.locationSize;Ne++)C(ye.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,Se);for(let Ne=0;Ne<ye.locationSize;Ne++)L(ye.location+Ne,le/ye.locationSize,Me,G,V*He,(St+le/ye.locationSize*Ne)*He,be)}else{if(J.isInstancedBufferAttribute){for(let ke=0;ke<ye.locationSize;ke++)D(ye.location+ke,J.meshPerAttribute);I.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ke=0;ke<ye.locationSize;ke++)C(ye.location+ke);n.bindBuffer(n.ARRAY_BUFFER,Se);for(let ke=0;ke<ye.locationSize;ke++)L(ye.location+ke,le/ye.locationSize,Me,G,le*He,le/ye.locationSize*ke*He,be)}}else if(te!==void 0){const G=te[Q];if(G!==void 0)switch(G.length){case 2:n.vertexAttrib2fv(ye.location,G);break;case 3:n.vertexAttrib3fv(ye.location,G);break;case 4:n.vertexAttrib4fv(ye.location,G);break;default:n.vertexAttrib1fv(ye.location,G)}}}}A()}function M(){j();for(const I in o){const H=o[I];for(const B in H){const ee=H[B];for(const Z in ee)_(ee[Z].object),delete ee[Z];delete H[B]}delete o[I]}}function x(I){if(o[I.id]===void 0)return;const H=o[I.id];for(const B in H){const ee=H[B];for(const Z in ee)_(ee[Z].object),delete ee[Z];delete H[B]}delete o[I.id]}function F(I){for(const H in o){const B=o[H];if(B[I.id]===void 0)continue;const ee=B[I.id];for(const Z in ee)_(ee[Z].object),delete ee[Z];delete B[I.id]}}function j(){he(),h=!0,c!==l&&(c=l,p(c.object))}function he(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:j,resetDefaultState:he,dispose:M,releaseStatesOfGeometry:x,releaseStatesOfProgram:F,initAttributes:v,enableAttribute:C,disableUnusedAttributes:A}}function Sm(n,e,t,i){const s=i.isWebGL2;let r;function a(h){r=h}function o(h,d){n.drawArrays(r,h,d),t.update(d,r,1)}function l(h,d,u){if(u===0)return;let p,_;if(s)p=n,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](r,h,d,u),t.update(d,r,u)}function c(h,d,u){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<u;_++)this.render(h[_],d[_]);else{p.multiDrawArraysWEBGL(r,h,0,d,0,u);let _=0;for(let y=0;y<u;y++)_+=d[y];t.update(_,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function bm(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),u=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),y=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=u>0,C=a||e.has("OES_texture_float"),D=v&&C,A=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:p,maxCubemapSize:_,maxAttributes:y,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:E,vertexTextures:v,floatFragmentTextures:C,floatVertexTextures:D,maxSamples:A}}function Em(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new ri,o=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||s;return s=u,i=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const _=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!s||_===null||_.length===0||r&&!m)r?h(null):c();else{const E=r?0:i,v=E*4;let C=f.clippingState||null;l.value=C,C=h(_,u,v,p);for(let D=0;D!==v;++D)C[D]=t[D];f.clippingState=C,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,p,_){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,_!==!0||m===null){const f=p+y*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,C=p;v!==y;++v,C+=4)a.copy(d[v]).applyMatrix4(E,o),a.normal.toArray(m,C),m[C+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function Tm(n){let e=new WeakMap;function t(a,o){return o===Ra?a.mapping=qi:o===Ca&&(a.mapping=Yi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ra||o===Ca)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Nu(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Cc extends wc{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Gi=4,cl=[.125,.215,.35,.446,.526,.582],li=20,ia=new Cc,hl=new Fe;let sa=null,ra=0,aa=0;const ai=(1+Math.sqrt(5))/2,Ni=1/ai,dl=[new w(1,1,1),new w(-1,1,1),new w(1,1,-1),new w(-1,1,-1),new w(0,ai,Ni),new w(0,ai,-Ni),new w(Ni,0,ai),new w(-Ni,0,ai),new w(ai,Ni,0),new w(-ai,Ni,0)];class ul{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){sa=this._renderer.getRenderTarget(),ra=this._renderer.getActiveCubeFace(),aa=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(sa,ra,aa),e.scissorTest=!1,Zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qi||e.mapping===Yi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sa=this._renderer.getRenderTarget(),ra=this._renderer.getActiveCubeFace(),aa=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:Es,format:Mn,colorSpace:In,depthBuffer:!1},s=fl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fl(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=xm(r)),this._blurMaterial=wm(r,e,t)}return s}_compileMaterial(e){const t=new Qe(this._lodPlanes[0],e);this._renderer.compile(t,ia)}_sceneToCubeUV(e,t,i,s){const o=new qt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(hl),h.toneMapping=Yn,h.autoClear=!1;const p=new It({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),_=new Qe(new Zi,p);let y=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(hl),y=!0);for(let f=0;f<6;f++){const E=f%3;E===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):E===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const v=this._cubeSize;Zs(s,E*v,f>2?v:0,v,v),h.setRenderTarget(s),y&&h.render(_,o),h.render(e,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===qi||e.mapping===Yi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Qe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Zs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,ia)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=dl[(s-1)%dl.length];this._blur(e,s-1,s,r,a)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Qe(this._lodPlanes[s],c),u=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*li-1),y=r/_,m=isFinite(r)?1+Math.floor(h*y):li;m>li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${li}`);const f=[];let E=0;for(let L=0;L<li;++L){const z=L/y,M=Math.exp(-z*z/2);f.push(M),L===0?E+=M:L<m&&(E+=2*M)}for(let L=0;L<f.length;L++)f[L]=f[L]/E;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:v}=this;u.dTheta.value=_,u.mipInt.value=v-i;const C=this._sizeLods[s],D=3*C*(s>v-Gi?s-v+Gi:0),A=4*(this._cubeSize-C);Zs(t,D,A,3*C,2*C),l.setRenderTarget(t),l.render(d,ia)}}function xm(n){const e=[],t=[],i=[];let s=n;const r=n-Gi+1+cl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-Gi?l=cl[a-n+Gi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,_=6,y=3,m=2,f=1,E=new Float32Array(y*_*p),v=new Float32Array(m*_*p),C=new Float32Array(f*_*p);for(let A=0;A<p;A++){const L=A%3*2/3-1,z=A>2?0:-1,M=[L,z,0,L+2/3,z,0,L+2/3,z+1,0,L,z,0,L+2/3,z+1,0,L,z+1,0];E.set(M,y*_*A),v.set(u,m*_*A);const x=[A,A,A,A,A,A];C.set(x,f*_*A)}const D=new Tt;D.setAttribute("position",new rn(E,y)),D.setAttribute("uv",new rn(v,m)),D.setAttribute("faceIndex",new rn(C,f)),e.push(D),s>Gi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function fl(n,e,t){const i=new mi(n,e,t);return i.texture.mapping=Er,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function wm(n,e,t){const i=new Float32Array(li),s=new w(0,1,0);return new gi({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function pl(){return new gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function ml(){return new gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function qa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Am(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ra||l===Ca,h=l===qi||l===Yi;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=e.get(o);return t===null&&(t=new ul(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),e.set(o,d),d.texture}else{if(e.has(o))return e.get(o).texture;{const d=o.image;if(c&&d&&d.height>0||h&&d&&s(d)){t===null&&(t=new ul(n));const u=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,u),o.addEventListener("dispose",r),u.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Rm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Cm(n,e,t,i){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);for(const _ in u.morphAttributes){const y=u.morphAttributes[_];for(let m=0,f=y.length;m<f;m++)e.remove(y[m])}u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const _ in u)e.update(u[_],n.ARRAY_BUFFER);const p=d.morphAttributes;for(const _ in p){const y=p[_];for(let m=0,f=y.length;m<f;m++)e.update(y[m],n.ARRAY_BUFFER)}}function c(d){const u=[],p=d.index,_=d.attributes.position;let y=0;if(p!==null){const E=p.array;y=p.version;for(let v=0,C=E.length;v<C;v+=3){const D=E[v+0],A=E[v+1],L=E[v+2];u.push(D,A,A,L,L,D)}}else if(_!==void 0){const E=_.array;y=_.version;for(let v=0,C=E.length/3-1;v<C;v+=3){const D=v+0,A=v+1,L=v+2;u.push(D,A,A,L,L,D)}}else return;const m=new(_c(u)?Tc:Ec)(u,1);m.version=y;const f=r.get(d);f&&e.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Pm(n,e,t,i){const s=i.isWebGL2;let r;function a(p){r=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function h(p,_){n.drawElements(r,_,o,p*l),t.update(_,r,1)}function d(p,_,y){if(y===0)return;let m,f;if(s)m=n,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,_,o,p*l,y),t.update(_,r,y)}function u(p,_,y){if(y===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<y;f++)this.render(p[f]/l,_[f]);else{m.multiDrawElementsWEBGL(r,_,0,o,p,0,y);let f=0;for(let E=0;E<y;E++)f+=_[E];t.update(f,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function Lm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Dm(n,e){return n[0]-e[0]}function Um(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Im(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,a=new yt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,d){const u=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=p!==void 0?p.length:0;let y=r.get(h);if(y===void 0||y.count!==_){let I=function(){j.dispose(),r.delete(h),h.removeEventListener("dispose",I)};y!==void 0&&y.texture.dispose();const E=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,D=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],L=h.morphAttributes.color||[];let z=0;E===!0&&(z=1),v===!0&&(z=2),C===!0&&(z=3);let M=h.attributes.position.count*z,x=1;M>e.maxTextureSize&&(x=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const F=new Float32Array(M*x*4*_),j=new Mc(F,M,x,_);j.type=Xn,j.needsUpdate=!0;const he=z*4;for(let H=0;H<_;H++){const B=D[H],ee=A[H],Z=L[H],X=M*x*4*H;for(let te=0;te<B.count;te++){const Q=te*he;E===!0&&(a.fromBufferAttribute(B,te),F[X+Q+0]=a.x,F[X+Q+1]=a.y,F[X+Q+2]=a.z,F[X+Q+3]=0),v===!0&&(a.fromBufferAttribute(ee,te),F[X+Q+4]=a.x,F[X+Q+5]=a.y,F[X+Q+6]=a.z,F[X+Q+7]=0),C===!0&&(a.fromBufferAttribute(Z,te),F[X+Q+8]=a.x,F[X+Q+9]=a.y,F[X+Q+10]=a.z,F[X+Q+11]=Z.itemSize===4?a.w:1)}}y={count:_,texture:j,size:new xe(M,x)},r.set(h,y),h.addEventListener("dispose",I)}let m=0;for(let E=0;E<u.length;E++)m+=u[E];const f=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(n,"morphTargetBaseInfluence",f),d.getUniforms().setValue(n,"morphTargetInfluences",u),d.getUniforms().setValue(n,"morphTargetsTexture",y.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",y.size)}else{const p=u===void 0?0:u.length;let _=i[h.id];if(_===void 0||_.length!==p){_=[];for(let v=0;v<p;v++)_[v]=[v,0];i[h.id]=_}for(let v=0;v<p;v++){const C=_[v];C[0]=v,C[1]=u[v]}_.sort(Um);for(let v=0;v<8;v++)v<p&&_[v][1]?(o[v][0]=_[v][0],o[v][1]=_[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(Dm);const y=h.morphAttributes.position,m=h.morphAttributes.normal;let f=0;for(let v=0;v<8;v++){const C=o[v],D=C[0],A=C[1];D!==Number.MAX_SAFE_INTEGER&&A?(y&&h.getAttribute("morphTarget"+v)!==y[D]&&h.setAttribute("morphTarget"+v,y[D]),m&&h.getAttribute("morphNormal"+v)!==m[D]&&h.setAttribute("morphNormal"+v,m[D]),s[v]=A,f+=A):(y&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),m&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),s[v]=0)}const E=h.morphTargetsRelative?1:1-f;d.getUniforms().setValue(n,"morphTargetBaseInfluence",E),d.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function Nm(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Pc extends jt{constructor(e,t,i,s,r,a,o,l,c,h){if(h=h!==void 0?h:fi,h!==fi&&h!==ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===fi&&(i=Wn),i===void 0&&h===ji&&(i=ui),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:At,this.minFilter=l!==void 0?l:At,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Lc=new jt,Dc=new Pc(1,1);Dc.compareFunction=gc;const Uc=new Mc,Ic=new vu,Nc=new Ac,gl=[],_l=[],vl=new Float32Array(16),yl=new Float32Array(9),Ml=new Float32Array(4);function Qi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=gl[s];if(r===void 0&&(r=new Float32Array(s),gl[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Rt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ct(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ar(n,e){let t=_l[e];t===void 0&&(t=new Int32Array(e),_l[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Om(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2fv(this.addr,e),Ct(t,e)}}function km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;n.uniform3fv(this.addr,e),Ct(t,e)}}function Bm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4fv(this.addr,e),Ct(t,e)}}function zm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;Ml.set(i),n.uniformMatrix2fv(this.addr,!1,Ml),Ct(t,i)}}function Hm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;yl.set(i),n.uniformMatrix3fv(this.addr,!1,yl),Ct(t,i)}}function Gm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;vl.set(i),n.uniformMatrix4fv(this.addr,!1,vl),Ct(t,i)}}function Vm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Wm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2iv(this.addr,e),Ct(t,e)}}function Xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3iv(this.addr,e),Ct(t,e)}}function qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4iv(this.addr,e),Ct(t,e)}}function Ym(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2uiv(this.addr,e),Ct(t,e)}}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3uiv(this.addr,e),Ct(t,e)}}function Jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4uiv(this.addr,e),Ct(t,e)}}function Km(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?Dc:Lc;t.setTexture2D(e||r,s)}function Zm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ic,s)}function Qm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Nc,s)}function e0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Uc,s)}function t0(n){switch(n){case 5126:return Om;case 35664:return Fm;case 35665:return km;case 35666:return Bm;case 35674:return zm;case 35675:return Hm;case 35676:return Gm;case 5124:case 35670:return Vm;case 35667:case 35671:return Wm;case 35668:case 35672:return Xm;case 35669:case 35673:return qm;case 5125:return Ym;case 36294:return jm;case 36295:return $m;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Km;case 35679:case 36299:case 36307:return Zm;case 35680:case 36300:case 36308:case 36293:return Qm;case 36289:case 36303:case 36311:case 36292:return e0}}function n0(n,e){n.uniform1fv(this.addr,e)}function i0(n,e){const t=Qi(e,this.size,2);n.uniform2fv(this.addr,t)}function s0(n,e){const t=Qi(e,this.size,3);n.uniform3fv(this.addr,t)}function r0(n,e){const t=Qi(e,this.size,4);n.uniform4fv(this.addr,t)}function a0(n,e){const t=Qi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function o0(n,e){const t=Qi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function l0(n,e){const t=Qi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function c0(n,e){n.uniform1iv(this.addr,e)}function h0(n,e){n.uniform2iv(this.addr,e)}function d0(n,e){n.uniform3iv(this.addr,e)}function u0(n,e){n.uniform4iv(this.addr,e)}function f0(n,e){n.uniform1uiv(this.addr,e)}function p0(n,e){n.uniform2uiv(this.addr,e)}function m0(n,e){n.uniform3uiv(this.addr,e)}function g0(n,e){n.uniform4uiv(this.addr,e)}function _0(n,e,t){const i=this.cache,s=e.length,r=Ar(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Ct(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Lc,r[a])}function v0(n,e,t){const i=this.cache,s=e.length,r=Ar(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Ct(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ic,r[a])}function y0(n,e,t){const i=this.cache,s=e.length,r=Ar(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Ct(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Nc,r[a])}function M0(n,e,t){const i=this.cache,s=e.length,r=Ar(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Ct(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Uc,r[a])}function S0(n){switch(n){case 5126:return n0;case 35664:return i0;case 35665:return s0;case 35666:return r0;case 35674:return a0;case 35675:return o0;case 35676:return l0;case 5124:case 35670:return c0;case 35667:case 35671:return h0;case 35668:case 35672:return d0;case 35669:case 35673:return u0;case 5125:return f0;case 36294:return p0;case 36295:return m0;case 36296:return g0;case 35678:case 36198:case 36298:case 36306:case 35682:return _0;case 35679:case 36299:case 36307:return v0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return M0}}class b0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=t0(t.type)}}class E0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=S0(t.type)}}class T0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const oa=/(\w+)(\])?(\[|\.)?/g;function Sl(n,e){n.seq.push(e),n.map[e.id]=e}function x0(n,e,t){const i=n.name,s=i.length;for(oa.lastIndex=0;;){const r=oa.exec(i),a=oa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Sl(t,c===void 0?new b0(o,n,e):new E0(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new T0(o),Sl(t,d)),t=d}}}class ar{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);x0(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function bl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const w0=37297;let A0=0;function R0(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function C0(n){const e=lt.getPrimaries(lt.workingColorSpace),t=lt.getPrimaries(n);let i;switch(e===t?i="":e===pr&&t===fr?i="LinearDisplayP3ToLinearSRGB":e===fr&&t===pr&&(i="LinearSRGBToLinearDisplayP3"),n){case In:case Tr:return[i,"LinearTransferOETF"];case Ft:case Va:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function El(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+R0(n.getShaderSource(e),a)}else return s}function P0(n,e){const t=C0(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function L0(n,e){let t;switch(e){case Vd:t="Linear";break;case Wd:t="Reinhard";break;case Xd:t="OptimizedCineon";break;case za:t="ACESFilmic";break;case Yd:t="AgX";break;case qd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function D0(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Vi).join(`
`)}function U0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Vi).join(`
`)}function I0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function N0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Vi(n){return n!==""}function Tl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const O0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ia(n){return n.replace(O0,k0)}const F0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function k0(n,e){let t=Ke[e];if(t===void 0){const i=F0.get(e);if(i!==void 0)t=Ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ia(t)}const B0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wl(n){return n.replace(B0,z0)}function z0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Al(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function H0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===sc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ba?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ln&&(e="SHADOWMAP_TYPE_VSM"),e}function G0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case qi:case Yi:e="ENVMAP_TYPE_CUBE";break;case Er:e="ENVMAP_TYPE_CUBE_UV";break}return e}function V0(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Yi:e="ENVMAP_MODE_REFRACTION";break}return e}function W0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case rc:e="ENVMAP_BLENDING_MULTIPLY";break;case Hd:e="ENVMAP_BLENDING_MIX";break;case Gd:e="ENVMAP_BLENDING_ADD";break}return e}function X0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function q0(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=H0(t),c=G0(t),h=V0(t),d=W0(t),u=X0(t),p=t.isWebGL2?"":D0(t),_=U0(t),y=I0(r),m=s.createProgram();let f,E,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Vi).join(`
`),f.length>0&&(f+=`
`),E=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Vi).join(`
`),E.length>0&&(E+=`
`)):(f=[Al(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vi).join(`
`),E=[p,Al(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yn?"#define TONE_MAPPING":"",t.toneMapping!==Yn?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Yn?L0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,P0("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vi).join(`
`)),a=Ia(a),a=Tl(a,t),a=xl(a,t),o=Ia(o),o=Tl(o,t),o=xl(o,t),a=wl(a),o=wl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,E=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Xo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const C=v+f+a,D=v+E+o,A=bl(s,s.VERTEX_SHADER,C),L=bl(s,s.FRAGMENT_SHADER,D);s.attachShader(m,A),s.attachShader(m,L),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function z(j){if(n.debug.checkShaderErrors){const he=s.getProgramInfoLog(m).trim(),I=s.getShaderInfoLog(A).trim(),H=s.getShaderInfoLog(L).trim();let B=!0,ee=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(B=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,A,L);else{const Z=El(s,A,"vertex"),X=El(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+he+`
`+Z+`
`+X)}else he!==""?console.warn("THREE.WebGLProgram: Program Info Log:",he):(I===""||H==="")&&(ee=!1);ee&&(j.diagnostics={runnable:B,programLog:he,vertexShader:{log:I,prefix:f},fragmentShader:{log:H,prefix:E}})}s.deleteShader(A),s.deleteShader(L),M=new ar(s,m),x=N0(s,m)}let M;this.getUniforms=function(){return M===void 0&&z(this),M};let x;this.getAttributes=function(){return x===void 0&&z(this),x};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(m,w0)),F},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=A0++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=L,this}let Y0=0;class j0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new $0(e),t.set(e,i)),i}}class $0{constructor(e){this.id=Y0++,this.code=e,this.usedTimes=0}}function J0(n,e,t,i,s,r,a){const o=new Sc,l=new j0,c=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,u=s.vertexTextures;let p=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return M===0?"uv":`uv${M}`}function m(M,x,F,j,he){const I=j.fog,H=he.geometry,B=M.isMeshStandardMaterial?j.environment:null,ee=(M.isMeshStandardMaterial?t:e).get(M.envMap||B),Z=ee&&ee.mapping===Er?ee.image.height:null,X=_[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const te=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Q=te!==void 0?te.length:0;let ye=0;H.morphAttributes.position!==void 0&&(ye=1),H.morphAttributes.normal!==void 0&&(ye=2),H.morphAttributes.color!==void 0&&(ye=3);let J,G,le,ge;if(X){const ve=En[X];J=ve.vertexShader,G=ve.fragmentShader}else J=M.vertexShader,G=M.fragmentShader,l.update(M),le=l.getVertexShaderID(M),ge=l.getFragmentShaderID(M);const Se=n.getRenderTarget(),Me=he.isInstancedMesh===!0,He=he.isBatchedMesh===!0,be=!!M.map,ke=!!M.matcap,V=!!ee,St=!!M.aoMap,Ne=!!M.lightMap,Le=!!M.bumpMap,Ee=!!M.normalMap,rt=!!M.displacementMap,ze=!!M.emissiveMap,R=!!M.metalnessMap,b=!!M.roughnessMap,W=M.anisotropy>0,oe=M.clearcoat>0,ae=M.iridescence>0,se=M.sheen>0,we=M.transmission>0,K=W&&!!M.anisotropyMap,ce=oe&&!!M.clearcoatMap,Re=oe&&!!M.clearcoatNormalMap,qe=oe&&!!M.clearcoatRoughnessMap,ne=ae&&!!M.iridescenceMap,tt=ae&&!!M.iridescenceThicknessMap,$e=se&&!!M.sheenColorMap,We=se&&!!M.sheenRoughnessMap,De=!!M.specularMap,Te=!!M.specularColorMap,Ye=!!M.specularIntensityMap,st=we&&!!M.transmissionMap,pt=we&&!!M.thicknessMap,Je=!!M.gradientMap,pe=!!M.alphaMap,U=M.alphaTest>0,_e=!!M.alphaHash,S=!!M.extensions,N=!!H.attributes.uv1,P=!!H.attributes.uv2,g=!!H.attributes.uv3;let O=Yn;return M.toneMapped&&(Se===null||Se.isXRRenderTarget===!0)&&(O=n.toneMapping),{isWebGL2:h,shaderID:X,shaderType:M.type,shaderName:M.name,vertexShader:J,fragmentShader:G,defines:M.defines,customVertexShaderID:le,customFragmentShaderID:ge,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:He,instancing:Me,instancingColor:Me&&he.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:Se===null?n.outputColorSpace:Se.isXRRenderTarget===!0?Se.texture.colorSpace:In,map:be,matcap:ke,envMap:V,envMapMode:V&&ee.mapping,envMapCubeUVHeight:Z,aoMap:St,lightMap:Ne,bumpMap:Le,normalMap:Ee,displacementMap:u&&rt,emissiveMap:ze,normalMapObjectSpace:Ee&&M.normalMapType===su,normalMapTangentSpace:Ee&&M.normalMapType===Ga,metalnessMap:R,roughnessMap:b,anisotropy:W,anisotropyMap:K,clearcoat:oe,clearcoatMap:ce,clearcoatNormalMap:Re,clearcoatRoughnessMap:qe,iridescence:ae,iridescenceMap:ne,iridescenceThicknessMap:tt,sheen:se,sheenColorMap:$e,sheenRoughnessMap:We,specularMap:De,specularColorMap:Te,specularIntensityMap:Ye,transmission:we,transmissionMap:st,thicknessMap:pt,gradientMap:Je,opaque:M.transparent===!1&&M.blending===Wi,alphaMap:pe,alphaTest:U,alphaHash:_e,combine:M.combine,mapUv:be&&y(M.map.channel),aoMapUv:St&&y(M.aoMap.channel),lightMapUv:Ne&&y(M.lightMap.channel),bumpMapUv:Le&&y(M.bumpMap.channel),normalMapUv:Ee&&y(M.normalMap.channel),displacementMapUv:rt&&y(M.displacementMap.channel),emissiveMapUv:ze&&y(M.emissiveMap.channel),metalnessMapUv:R&&y(M.metalnessMap.channel),roughnessMapUv:b&&y(M.roughnessMap.channel),anisotropyMapUv:K&&y(M.anisotropyMap.channel),clearcoatMapUv:ce&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:Re&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:qe&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:We&&y(M.sheenRoughnessMap.channel),specularMapUv:De&&y(M.specularMap.channel),specularColorMapUv:Te&&y(M.specularColorMap.channel),specularIntensityMapUv:Ye&&y(M.specularIntensityMap.channel),transmissionMapUv:st&&y(M.transmissionMap.channel),thicknessMapUv:pt&&y(M.thicknessMap.channel),alphaMapUv:pe&&y(M.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Ee||W),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,vertexUv1s:N,vertexUv2s:P,vertexUv3s:g,pointsUvs:he.isPoints===!0&&!!H.attributes.uv&&(be||pe),fog:!!I,useFog:M.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:he.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ye,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:O,useLegacyLights:n._useLegacyLights,decodeVideoTexture:be&&M.map.isVideoTexture===!0&&lt.getTransfer(M.map.colorSpace)===vt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Kt,flipSided:M.side===Yt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:S&&M.extensions.derivatives===!0,extensionFragDepth:S&&M.extensions.fragDepth===!0,extensionDrawBuffers:S&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:S&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:S&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function f(M){const x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(const F in M.defines)x.push(F),x.push(M.defines[F]);return M.isRawShaderMaterial===!1&&(E(x,M),v(x,M),x.push(n.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function E(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function v(M,x){o.disableAll(),x.isWebGL2&&o.enable(0),x.supportsVertexTextures&&o.enable(1),x.instancing&&o.enable(2),x.instancingColor&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),M.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.skinning&&o.enable(4),x.morphTargets&&o.enable(5),x.morphNormals&&o.enable(6),x.morphColors&&o.enable(7),x.premultipliedAlpha&&o.enable(8),x.shadowMapEnabled&&o.enable(9),x.useLegacyLights&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function C(M){const x=_[M.type];let F;if(x){const j=En[x];F=Lu.clone(j.uniforms)}else F=M.uniforms;return F}function D(M,x){let F;for(let j=0,he=c.length;j<he;j++){const I=c[j];if(I.cacheKey===x){F=I,++F.usedTimes;break}}return F===void 0&&(F=new q0(n,x,M,r),c.push(F)),F}function A(M){if(--M.usedTimes===0){const x=c.indexOf(M);c[x]=c[c.length-1],c.pop(),M.destroy()}}function L(M){l.remove(M)}function z(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:C,acquireProgram:D,releaseProgram:A,releaseShaderCache:L,programs:c,dispose:z}}function K0(){let n=new WeakMap;function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function t(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function Z0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Rl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Cl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d,u,p,_,y,m){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:_,renderOrder:d.renderOrder,z:y,group:m},n[e]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=_,f.renderOrder=d.renderOrder,f.z=y,f.group=m),e++,f}function o(d,u,p,_,y,m){const f=a(d,u,p,_,y,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(d,u,p,_,y,m){const f=a(d,u,p,_,y,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(d,u){t.length>1&&t.sort(d||Z0),i.length>1&&i.sort(u||Rl),s.length>1&&s.sort(u||Rl)}function h(){for(let d=e,u=n.length;d<u;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Q0(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Cl,n.set(i,[a])):s>=r.length?(a=new Cl,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function eg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Fe};break;case"SpotLight":t={position:new w,direction:new w,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new w,halfWidth:new w,halfHeight:new w};break}return n[e.id]=t,t}}}function tg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ng=0;function ig(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function sg(n,e){const t=new eg,i=tg(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new w);const r=new w,a=new Mt,o=new Mt;function l(h,d){let u=0,p=0,_=0;for(let j=0;j<9;j++)s.probe[j].set(0,0,0);let y=0,m=0,f=0,E=0,v=0,C=0,D=0,A=0,L=0,z=0,M=0;h.sort(ig);const x=d===!0?Math.PI:1;for(let j=0,he=h.length;j<he;j++){const I=h[j],H=I.color,B=I.intensity,ee=I.distance,Z=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=H.r*B*x,p+=H.g*B*x,_+=H.b*B*x;else if(I.isLightProbe){for(let X=0;X<9;X++)s.probe[X].addScaledVector(I.sh.coefficients[X],B);M++}else if(I.isDirectionalLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*x),I.castShadow){const te=I.shadow,Q=i.get(I);Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,s.directionalShadow[y]=Q,s.directionalShadowMap[y]=Z,s.directionalShadowMatrix[y]=I.shadow.matrix,C++}s.directional[y]=X,y++}else if(I.isSpotLight){const X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(H).multiplyScalar(B*x),X.distance=ee,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,s.spot[f]=X;const te=I.shadow;if(I.map&&(s.spotLightMap[L]=I.map,L++,te.updateMatrices(I),I.castShadow&&z++),s.spotLightMatrix[f]=te.matrix,I.castShadow){const Q=i.get(I);Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,s.spotShadow[f]=Q,s.spotShadowMap[f]=Z,A++}f++}else if(I.isRectAreaLight){const X=t.get(I);X.color.copy(H).multiplyScalar(B),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),s.rectArea[E]=X,E++}else if(I.isPointLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*x),X.distance=I.distance,X.decay=I.decay,I.castShadow){const te=I.shadow,Q=i.get(I);Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,Q.shadowCameraNear=te.camera.near,Q.shadowCameraFar=te.camera.far,s.pointShadow[m]=Q,s.pointShadowMap[m]=Z,s.pointShadowMatrix[m]=I.shadow.matrix,D++}s.point[m]=X,m++}else if(I.isHemisphereLight){const X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(B*x),X.groundColor.copy(I.groundColor).multiplyScalar(B*x),s.hemi[v]=X,v++}}E>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=me.LTC_FLOAT_1,s.rectAreaLTC2=me.LTC_FLOAT_2):(s.rectAreaLTC1=me.LTC_HALF_1,s.rectAreaLTC2=me.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=me.LTC_FLOAT_1,s.rectAreaLTC2=me.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=me.LTC_HALF_1,s.rectAreaLTC2=me.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=u,s.ambient[1]=p,s.ambient[2]=_;const F=s.hash;(F.directionalLength!==y||F.pointLength!==m||F.spotLength!==f||F.rectAreaLength!==E||F.hemiLength!==v||F.numDirectionalShadows!==C||F.numPointShadows!==D||F.numSpotShadows!==A||F.numSpotMaps!==L||F.numLightProbes!==M)&&(s.directional.length=y,s.spot.length=f,s.rectArea.length=E,s.point.length=m,s.hemi.length=v,s.directionalShadow.length=C,s.directionalShadowMap.length=C,s.pointShadow.length=D,s.pointShadowMap.length=D,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=C,s.pointShadowMatrix.length=D,s.spotLightMatrix.length=A+L-z,s.spotLightMap.length=L,s.numSpotLightShadowsWithMaps=z,s.numLightProbes=M,F.directionalLength=y,F.pointLength=m,F.spotLength=f,F.rectAreaLength=E,F.hemiLength=v,F.numDirectionalShadows=C,F.numPointShadows=D,F.numSpotShadows=A,F.numSpotMaps=L,F.numLightProbes=M,s.version=ng++)}function c(h,d){let u=0,p=0,_=0,y=0,m=0;const f=d.matrixWorldInverse;for(let E=0,v=h.length;E<v;E++){const C=h[E];if(C.isDirectionalLight){const D=s.directional[u];D.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),D.direction.sub(r),D.direction.transformDirection(f),u++}else if(C.isSpotLight){const D=s.spot[_];D.position.setFromMatrixPosition(C.matrixWorld),D.position.applyMatrix4(f),D.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),D.direction.sub(r),D.direction.transformDirection(f),_++}else if(C.isRectAreaLight){const D=s.rectArea[y];D.position.setFromMatrixPosition(C.matrixWorld),D.position.applyMatrix4(f),o.identity(),a.copy(C.matrixWorld),a.premultiply(f),o.extractRotation(a),D.halfWidth.set(C.width*.5,0,0),D.halfHeight.set(0,C.height*.5,0),D.halfWidth.applyMatrix4(o),D.halfHeight.applyMatrix4(o),y++}else if(C.isPointLight){const D=s.point[p];D.position.setFromMatrixPosition(C.matrixWorld),D.position.applyMatrix4(f),p++}else if(C.isHemisphereLight){const D=s.hemi[m];D.direction.setFromMatrixPosition(C.matrixWorld),D.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:s}}function Pl(n,e){const t=new sg(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function a(d){i.push(d)}function o(d){s.push(d)}function l(d){t.setup(i,d)}function c(d){t.setupView(i,d)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function rg(n,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Pl(n,e),t.set(r,[l])):a>=o.length?(l=new Pl(n,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class ag extends Nn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class og extends Nn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const lg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function hg(n,e,t){let i=new Xa;const s=new xe,r=new xe,a=new yt,o=new ag({depthPacking:iu}),l=new og,c={},h=t.maxTextureSize,d={[Zn]:Yt,[Yt]:Zn,[Kt]:Kt},u=new gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:lg,fragmentShader:cg}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const _=new Tt;_.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Qe(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sc;let f=this.type;this.render=function(A,L,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const M=n.getRenderTarget(),x=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),j=n.state;j.setBlending(qn),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const he=f!==Ln&&this.type===Ln,I=f===Ln&&this.type!==Ln;for(let H=0,B=A.length;H<B;H++){const ee=A[H],Z=ee.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);const X=Z.getFrameExtents();if(s.multiply(X),r.copy(Z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,Z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,Z.mapSize.y=r.y)),Z.map===null||he===!0||I===!0){const Q=this.type!==Ln?{minFilter:At,magFilter:At}:{};Z.map!==null&&Z.map.dispose(),Z.map=new mi(s.x,s.y,Q),Z.map.texture.name=ee.name+".shadowMap",Z.camera.updateProjectionMatrix()}n.setRenderTarget(Z.map),n.clear();const te=Z.getViewportCount();for(let Q=0;Q<te;Q++){const ye=Z.getViewport(Q);a.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),j.viewport(a),Z.updateMatrices(ee,Q),i=Z.getFrustum(),C(L,z,Z.camera,ee,this.type)}Z.isPointLightShadow!==!0&&this.type===Ln&&E(Z,z),Z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(M,x,F)};function E(A,L){const z=e.update(y);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new mi(s.x,s.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(L,null,z,u,y,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(L,null,z,p,y,null)}function v(A,L,z,M){let x=null;const F=z.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(F!==void 0)x=F;else if(x=z.isPointLight===!0?l:o,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const j=x.uuid,he=L.uuid;let I=c[j];I===void 0&&(I={},c[j]=I);let H=I[he];H===void 0&&(H=x.clone(),I[he]=H,L.addEventListener("dispose",D)),x=H}if(x.visible=L.visible,x.wireframe=L.wireframe,M===Ln?x.side=L.shadowSide!==null?L.shadowSide:L.side:x.side=L.shadowSide!==null?L.shadowSide:d[L.side],x.alphaMap=L.alphaMap,x.alphaTest=L.alphaTest,x.map=L.map,x.clipShadows=L.clipShadows,x.clippingPlanes=L.clippingPlanes,x.clipIntersection=L.clipIntersection,x.displacementMap=L.displacementMap,x.displacementScale=L.displacementScale,x.displacementBias=L.displacementBias,x.wireframeLinewidth=L.wireframeLinewidth,x.linewidth=L.linewidth,z.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const j=n.properties.get(x);j.light=z}return x}function C(A,L,z,M,x){if(A.visible===!1)return;if(A.layers.test(L.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===Ln)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,A.matrixWorld);const he=e.update(A),I=A.material;if(Array.isArray(I)){const H=he.groups;for(let B=0,ee=H.length;B<ee;B++){const Z=H[B],X=I[Z.materialIndex];if(X&&X.visible){const te=v(A,X,M,x);A.onBeforeShadow(n,A,L,z,he,te,Z),n.renderBufferDirect(z,null,he,te,A,Z),A.onAfterShadow(n,A,L,z,he,te,Z)}}}else if(I.visible){const H=v(A,I,M,x);A.onBeforeShadow(n,A,L,z,he,H,null),n.renderBufferDirect(z,null,he,H,A,null),A.onAfterShadow(n,A,L,z,he,H,null)}}const j=A.children;for(let he=0,I=j.length;he<I;he++)C(j[he],L,z,M,x)}function D(A){A.target.removeEventListener("dispose",D);for(const z in c){const M=c[z],x=A.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}function dg(n,e,t){const i=t.isWebGL2;function s(){let U=!1;const _e=new yt;let S=null;const N=new yt(0,0,0,0);return{setMask:function(P){S!==P&&!U&&(n.colorMask(P,P,P,P),S=P)},setLocked:function(P){U=P},setClear:function(P,g,O,ie,ve){ve===!0&&(P*=ie,g*=ie,O*=ie),_e.set(P,g,O,ie),N.equals(_e)===!1&&(n.clearColor(P,g,O,ie),N.copy(_e))},reset:function(){U=!1,S=null,N.set(-1,0,0,0)}}}function r(){let U=!1,_e=null,S=null,N=null;return{setTest:function(P){P?He(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(P){_e!==P&&!U&&(n.depthMask(P),_e=P)},setFunc:function(P){if(S!==P){switch(P){case Id:n.depthFunc(n.NEVER);break;case Nd:n.depthFunc(n.ALWAYS);break;case Od:n.depthFunc(n.LESS);break;case dr:n.depthFunc(n.LEQUAL);break;case Fd:n.depthFunc(n.EQUAL);break;case kd:n.depthFunc(n.GEQUAL);break;case Bd:n.depthFunc(n.GREATER);break;case zd:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}S=P}},setLocked:function(P){U=P},setClear:function(P){N!==P&&(n.clearDepth(P),N=P)},reset:function(){U=!1,_e=null,S=null,N=null}}}function a(){let U=!1,_e=null,S=null,N=null,P=null,g=null,O=null,ie=null,ve=null;return{setTest:function(ue){U||(ue?He(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(ue){_e!==ue&&!U&&(n.stencilMask(ue),_e=ue)},setFunc:function(ue,Ce,it){(S!==ue||N!==Ce||P!==it)&&(n.stencilFunc(ue,Ce,it),S=ue,N=Ce,P=it)},setOp:function(ue,Ce,it){(g!==ue||O!==Ce||ie!==it)&&(n.stencilOp(ue,Ce,it),g=ue,O=Ce,ie=it)},setLocked:function(ue){U=ue},setClear:function(ue){ve!==ue&&(n.clearStencil(ue),ve=ue)},reset:function(){U=!1,_e=null,S=null,N=null,P=null,g=null,O=null,ie=null,ve=null}}}const o=new s,l=new r,c=new a,h=new WeakMap,d=new WeakMap;let u={},p={},_=new WeakMap,y=[],m=null,f=!1,E=null,v=null,C=null,D=null,A=null,L=null,z=null,M=new Fe(0,0,0),x=0,F=!1,j=null,he=null,I=null,H=null,B=null;const ee=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,X=0;const te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(te)[1]),Z=X>=1):te.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),Z=X>=2);let Q=null,ye={};const J=n.getParameter(n.SCISSOR_BOX),G=n.getParameter(n.VIEWPORT),le=new yt().fromArray(J),ge=new yt().fromArray(G);function Se(U,_e,S,N){const P=new Uint8Array(4),g=n.createTexture();n.bindTexture(U,g),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let O=0;O<S;O++)i&&(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)?n.texImage3D(_e,0,n.RGBA,1,1,N,0,n.RGBA,n.UNSIGNED_BYTE,P):n.texImage2D(_e+O,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,P);return g}const Me={};Me[n.TEXTURE_2D]=Se(n.TEXTURE_2D,n.TEXTURE_2D,1),Me[n.TEXTURE_CUBE_MAP]=Se(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Me[n.TEXTURE_2D_ARRAY]=Se(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Me[n.TEXTURE_3D]=Se(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),He(n.DEPTH_TEST),l.setFunc(dr),ze(!1),R(fo),He(n.CULL_FACE),Ee(qn);function He(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function be(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function ke(U,_e){return p[U]!==_e?(n.bindFramebuffer(U,_e),p[U]=_e,i&&(U===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=_e),U===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=_e)),!0):!1}function V(U,_e){let S=y,N=!1;if(U)if(S=_.get(_e),S===void 0&&(S=[],_.set(_e,S)),U.isWebGLMultipleRenderTargets){const P=U.texture;if(S.length!==P.length||S[0]!==n.COLOR_ATTACHMENT0){for(let g=0,O=P.length;g<O;g++)S[g]=n.COLOR_ATTACHMENT0+g;S.length=P.length,N=!0}}else S[0]!==n.COLOR_ATTACHMENT0&&(S[0]=n.COLOR_ATTACHMENT0,N=!0);else S[0]!==n.BACK&&(S[0]=n.BACK,N=!0);N&&(t.isWebGL2?n.drawBuffers(S):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(S))}function St(U){return m!==U?(n.useProgram(U),m=U,!0):!1}const Ne={[oi]:n.FUNC_ADD,[yd]:n.FUNC_SUBTRACT,[Md]:n.FUNC_REVERSE_SUBTRACT};if(i)Ne[go]=n.MIN,Ne[_o]=n.MAX;else{const U=e.get("EXT_blend_minmax");U!==null&&(Ne[go]=U.MIN_EXT,Ne[_o]=U.MAX_EXT)}const Le={[Sd]:n.ZERO,[bd]:n.ONE,[Ed]:n.SRC_COLOR,[wa]:n.SRC_ALPHA,[Cd]:n.SRC_ALPHA_SATURATE,[Ad]:n.DST_COLOR,[xd]:n.DST_ALPHA,[Td]:n.ONE_MINUS_SRC_COLOR,[Aa]:n.ONE_MINUS_SRC_ALPHA,[Rd]:n.ONE_MINUS_DST_COLOR,[wd]:n.ONE_MINUS_DST_ALPHA,[Pd]:n.CONSTANT_COLOR,[Ld]:n.ONE_MINUS_CONSTANT_COLOR,[Dd]:n.CONSTANT_ALPHA,[Ud]:n.ONE_MINUS_CONSTANT_ALPHA};function Ee(U,_e,S,N,P,g,O,ie,ve,ue){if(U===qn){f===!0&&(be(n.BLEND),f=!1);return}if(f===!1&&(He(n.BLEND),f=!0),U!==vd){if(U!==E||ue!==F){if((v!==oi||A!==oi)&&(n.blendEquation(n.FUNC_ADD),v=oi,A=oi),ue)switch(U){case Wi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xa:n.blendFunc(n.ONE,n.ONE);break;case po:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case mo:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Wi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xa:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case po:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case mo:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}C=null,D=null,L=null,z=null,M.set(0,0,0),x=0,E=U,F=ue}return}P=P||_e,g=g||S,O=O||N,(_e!==v||P!==A)&&(n.blendEquationSeparate(Ne[_e],Ne[P]),v=_e,A=P),(S!==C||N!==D||g!==L||O!==z)&&(n.blendFuncSeparate(Le[S],Le[N],Le[g],Le[O]),C=S,D=N,L=g,z=O),(ie.equals(M)===!1||ve!==x)&&(n.blendColor(ie.r,ie.g,ie.b,ve),M.copy(ie),x=ve),E=U,F=!1}function rt(U,_e){U.side===Kt?be(n.CULL_FACE):He(n.CULL_FACE);let S=U.side===Yt;_e&&(S=!S),ze(S),U.blending===Wi&&U.transparent===!1?Ee(qn):Ee(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),o.setMask(U.colorWrite);const N=U.stencilWrite;c.setTest(N),N&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),W(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?He(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function ze(U){j!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),j=U)}function R(U){U!==gd?(He(n.CULL_FACE),U!==he&&(U===fo?n.cullFace(n.BACK):U===_d?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),he=U}function b(U){U!==I&&(Z&&n.lineWidth(U),I=U)}function W(U,_e,S){U?(He(n.POLYGON_OFFSET_FILL),(H!==_e||B!==S)&&(n.polygonOffset(_e,S),H=_e,B=S)):be(n.POLYGON_OFFSET_FILL)}function oe(U){U?He(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function ae(U){U===void 0&&(U=n.TEXTURE0+ee-1),Q!==U&&(n.activeTexture(U),Q=U)}function se(U,_e,S){S===void 0&&(Q===null?S=n.TEXTURE0+ee-1:S=Q);let N=ye[S];N===void 0&&(N={type:void 0,texture:void 0},ye[S]=N),(N.type!==U||N.texture!==_e)&&(Q!==S&&(n.activeTexture(S),Q=S),n.bindTexture(U,_e||Me[U]),N.type=U,N.texture=_e)}function we(){const U=ye[Q];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function K(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Re(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function qe(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $e(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function We(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function De(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ye(U){le.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),le.copy(U))}function st(U){ge.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),ge.copy(U))}function pt(U,_e){let S=d.get(_e);S===void 0&&(S=new WeakMap,d.set(_e,S));let N=S.get(U);N===void 0&&(N=n.getUniformBlockIndex(_e,U.name),S.set(U,N))}function Je(U,_e){const N=d.get(_e).get(U);h.get(_e)!==N&&(n.uniformBlockBinding(_e,N,U.__bindingPointIndex),h.set(_e,N))}function pe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Q=null,ye={},p={},_=new WeakMap,y=[],m=null,f=!1,E=null,v=null,C=null,D=null,A=null,L=null,z=null,M=new Fe(0,0,0),x=0,F=!1,j=null,he=null,I=null,H=null,B=null,le.set(0,0,n.canvas.width,n.canvas.height),ge.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:He,disable:be,bindFramebuffer:ke,drawBuffers:V,useProgram:St,setBlending:Ee,setMaterial:rt,setFlipSided:ze,setCullFace:R,setLineWidth:b,setPolygonOffset:W,setScissorTest:oe,activeTexture:ae,bindTexture:se,unbindTexture:we,compressedTexImage2D:K,compressedTexImage3D:ce,texImage2D:De,texImage3D:Te,updateUBOMapping:pt,uniformBlockBinding:Je,texStorage2D:$e,texStorage3D:We,texSubImage2D:Re,texSubImage3D:qe,compressedTexSubImage2D:ne,compressedTexSubImage3D:tt,scissor:Ye,viewport:st,reset:pe}}function ug(n,e,t,i,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,b){return p?new OffscreenCanvas(R,b):_r("canvas")}function y(R,b,W,oe){let ae=1;if((R.width>oe||R.height>oe)&&(ae=oe/Math.max(R.width,R.height)),ae<1||b===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const se=b?Ua:Math.floor,we=se(ae*R.width),K=se(ae*R.height);d===void 0&&(d=_(we,K));const ce=W?_(we,K):d;return ce.width=we,ce.height=K,ce.getContext("2d").drawImage(R,0,0,we,K),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+we+"x"+K+")."),ce}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return qo(R.width)&&qo(R.height)}function f(R){return o?!1:R.wrapS!==yn||R.wrapT!==yn||R.minFilter!==At&&R.minFilter!==hn}function E(R,b){return R.generateMipmaps&&b&&R.minFilter!==At&&R.minFilter!==hn}function v(R){n.generateMipmap(R)}function C(R,b,W,oe,ae=!1){if(o===!1)return b;if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let se=b;if(b===n.RED&&(W===n.FLOAT&&(se=n.R32F),W===n.HALF_FLOAT&&(se=n.R16F),W===n.UNSIGNED_BYTE&&(se=n.R8)),b===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(se=n.R8UI),W===n.UNSIGNED_SHORT&&(se=n.R16UI),W===n.UNSIGNED_INT&&(se=n.R32UI),W===n.BYTE&&(se=n.R8I),W===n.SHORT&&(se=n.R16I),W===n.INT&&(se=n.R32I)),b===n.RG&&(W===n.FLOAT&&(se=n.RG32F),W===n.HALF_FLOAT&&(se=n.RG16F),W===n.UNSIGNED_BYTE&&(se=n.RG8)),b===n.RGBA){const we=ae?ur:lt.getTransfer(oe);W===n.FLOAT&&(se=n.RGBA32F),W===n.HALF_FLOAT&&(se=n.RGBA16F),W===n.UNSIGNED_BYTE&&(se=we===vt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function D(R,b,W){return E(R,W)===!0||R.isFramebufferTexture&&R.minFilter!==At&&R.minFilter!==hn?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function A(R){return R===At||R===vo||R===Dr?n.NEAREST:n.LINEAR}function L(R){const b=R.target;b.removeEventListener("dispose",L),M(b),b.isVideoTexture&&h.delete(b)}function z(R){const b=R.target;b.removeEventListener("dispose",z),F(b)}function M(R){const b=i.get(R);if(b.__webglInit===void 0)return;const W=R.source,oe=u.get(W);if(oe){const ae=oe[b.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&x(R),Object.keys(oe).length===0&&u.delete(W)}i.remove(R)}function x(R){const b=i.get(R);n.deleteTexture(b.__webglTexture);const W=R.source,oe=u.get(W);delete oe[b.__cacheKey],a.memory.textures--}function F(R){const b=R.texture,W=i.get(R),oe=i.get(b);if(oe.__webglTexture!==void 0&&(n.deleteTexture(oe.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(W.__webglFramebuffer[ae]))for(let se=0;se<W.__webglFramebuffer[ae].length;se++)n.deleteFramebuffer(W.__webglFramebuffer[ae][se]);else n.deleteFramebuffer(W.__webglFramebuffer[ae]);W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer[ae])}else{if(Array.isArray(W.__webglFramebuffer))for(let ae=0;ae<W.__webglFramebuffer.length;ae++)n.deleteFramebuffer(W.__webglFramebuffer[ae]);else n.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&n.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let ae=0;ae<W.__webglColorRenderbuffer.length;ae++)W.__webglColorRenderbuffer[ae]&&n.deleteRenderbuffer(W.__webglColorRenderbuffer[ae]);W.__webglDepthRenderbuffer&&n.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ae=0,se=b.length;ae<se;ae++){const we=i.get(b[ae]);we.__webglTexture&&(n.deleteTexture(we.__webglTexture),a.memory.textures--),i.remove(b[ae])}i.remove(b),i.remove(R)}let j=0;function he(){j=0}function I(){const R=j;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),j+=1,R}function H(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function B(R,b){const W=i.get(R);if(R.isVideoTexture&&rt(R),R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){const oe=R.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(W,R,b);return}}t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+b)}function ee(R,b){const W=i.get(R);if(R.version>0&&W.__version!==R.version){le(W,R,b);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+b)}function Z(R,b){const W=i.get(R);if(R.version>0&&W.__version!==R.version){le(W,R,b);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+b)}function X(R,b){const W=i.get(R);if(R.version>0&&W.__version!==R.version){ge(W,R,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+b)}const te={[Ss]:n.REPEAT,[yn]:n.CLAMP_TO_EDGE,[Pa]:n.MIRRORED_REPEAT},Q={[At]:n.NEAREST,[vo]:n.NEAREST_MIPMAP_NEAREST,[Dr]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[jd]:n.LINEAR_MIPMAP_NEAREST,[bs]:n.LINEAR_MIPMAP_LINEAR},ye={[ru]:n.NEVER,[du]:n.ALWAYS,[au]:n.LESS,[gc]:n.LEQUAL,[ou]:n.EQUAL,[hu]:n.GEQUAL,[lu]:n.GREATER,[cu]:n.NOTEQUAL};function J(R,b,W){if(W?(n.texParameteri(R,n.TEXTURE_WRAP_S,te[b.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,te[b.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,te[b.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,Q[b.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,Q[b.minFilter])):(n.texParameteri(R,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(R,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(b.wrapS!==yn||b.wrapT!==yn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(R,n.TEXTURE_MAG_FILTER,A(b.magFilter)),n.texParameteri(R,n.TEXTURE_MIN_FILTER,A(b.minFilter)),b.minFilter!==At&&b.minFilter!==hn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,ye[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const oe=e.get("EXT_texture_filter_anisotropic");if(b.magFilter===At||b.minFilter!==Dr&&b.minFilter!==bs||b.type===Xn&&e.has("OES_texture_float_linear")===!1||o===!1&&b.type===Es&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||i.get(b).__currentAnisotropy)&&(n.texParameterf(R,oe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy)}}function G(R,b){let W=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",L));const oe=b.source;let ae=u.get(oe);ae===void 0&&(ae={},u.set(oe,ae));const se=H(b);if(se!==R.__cacheKey){ae[se]===void 0&&(ae[se]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ae[se].usedTimes++;const we=ae[R.__cacheKey];we!==void 0&&(ae[R.__cacheKey].usedTimes--,we.usedTimes===0&&x(b)),R.__cacheKey=se,R.__webglTexture=ae[se].texture}return W}function le(R,b,W){let oe=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(oe=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(oe=n.TEXTURE_3D);const ae=G(R,b),se=b.source;t.bindTexture(oe,R.__webglTexture,n.TEXTURE0+W);const we=i.get(se);if(se.version!==we.__version||ae===!0){t.activeTexture(n.TEXTURE0+W);const K=lt.getPrimaries(lt.workingColorSpace),ce=b.colorSpace===un?null:lt.getPrimaries(b.colorSpace),Re=b.colorSpace===un||K===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const qe=f(b)&&m(b.image)===!1;let ne=y(b.image,qe,!1,s.maxTextureSize);ne=ze(b,ne);const tt=m(ne)||o,$e=r.convert(b.format,b.colorSpace);let We=r.convert(b.type),De=C(b.internalFormat,$e,We,b.colorSpace,b.isVideoTexture);J(oe,b,tt);let Te;const Ye=b.mipmaps,st=o&&b.isVideoTexture!==!0&&De!==pc,pt=we.__version===void 0||ae===!0,Je=D(b,ne,tt);if(b.isDepthTexture)De=n.DEPTH_COMPONENT,o?b.type===Xn?De=n.DEPTH_COMPONENT32F:b.type===Wn?De=n.DEPTH_COMPONENT24:b.type===ui?De=n.DEPTH24_STENCIL8:De=n.DEPTH_COMPONENT16:b.type===Xn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===fi&&De===n.DEPTH_COMPONENT&&b.type!==Ha&&b.type!==Wn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=Wn,We=r.convert(b.type)),b.format===ji&&De===n.DEPTH_COMPONENT&&(De=n.DEPTH_STENCIL,b.type!==ui&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=ui,We=r.convert(b.type))),pt&&(st?t.texStorage2D(n.TEXTURE_2D,1,De,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,De,ne.width,ne.height,0,$e,We,null));else if(b.isDataTexture)if(Ye.length>0&&tt){st&&pt&&t.texStorage2D(n.TEXTURE_2D,Je,De,Ye[0].width,Ye[0].height);for(let pe=0,U=Ye.length;pe<U;pe++)Te=Ye[pe],st?t.texSubImage2D(n.TEXTURE_2D,pe,0,0,Te.width,Te.height,$e,We,Te.data):t.texImage2D(n.TEXTURE_2D,pe,De,Te.width,Te.height,0,$e,We,Te.data);b.generateMipmaps=!1}else st?(pt&&t.texStorage2D(n.TEXTURE_2D,Je,De,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne.width,ne.height,$e,We,ne.data)):t.texImage2D(n.TEXTURE_2D,0,De,ne.width,ne.height,0,$e,We,ne.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){st&&pt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,De,Ye[0].width,Ye[0].height,ne.depth);for(let pe=0,U=Ye.length;pe<U;pe++)Te=Ye[pe],b.format!==Mn?$e!==null?st?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,pe,0,0,0,Te.width,Te.height,ne.depth,$e,Te.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,pe,De,Te.width,Te.height,ne.depth,0,Te.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?t.texSubImage3D(n.TEXTURE_2D_ARRAY,pe,0,0,0,Te.width,Te.height,ne.depth,$e,We,Te.data):t.texImage3D(n.TEXTURE_2D_ARRAY,pe,De,Te.width,Te.height,ne.depth,0,$e,We,Te.data)}else{st&&pt&&t.texStorage2D(n.TEXTURE_2D,Je,De,Ye[0].width,Ye[0].height);for(let pe=0,U=Ye.length;pe<U;pe++)Te=Ye[pe],b.format!==Mn?$e!==null?st?t.compressedTexSubImage2D(n.TEXTURE_2D,pe,0,0,Te.width,Te.height,$e,Te.data):t.compressedTexImage2D(n.TEXTURE_2D,pe,De,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?t.texSubImage2D(n.TEXTURE_2D,pe,0,0,Te.width,Te.height,$e,We,Te.data):t.texImage2D(n.TEXTURE_2D,pe,De,Te.width,Te.height,0,$e,We,Te.data)}else if(b.isDataArrayTexture)st?(pt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,De,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,$e,We,ne.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,De,ne.width,ne.height,ne.depth,0,$e,We,ne.data);else if(b.isData3DTexture)st?(pt&&t.texStorage3D(n.TEXTURE_3D,Je,De,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,$e,We,ne.data)):t.texImage3D(n.TEXTURE_3D,0,De,ne.width,ne.height,ne.depth,0,$e,We,ne.data);else if(b.isFramebufferTexture){if(pt)if(st)t.texStorage2D(n.TEXTURE_2D,Je,De,ne.width,ne.height);else{let pe=ne.width,U=ne.height;for(let _e=0;_e<Je;_e++)t.texImage2D(n.TEXTURE_2D,_e,De,pe,U,0,$e,We,null),pe>>=1,U>>=1}}else if(Ye.length>0&&tt){st&&pt&&t.texStorage2D(n.TEXTURE_2D,Je,De,Ye[0].width,Ye[0].height);for(let pe=0,U=Ye.length;pe<U;pe++)Te=Ye[pe],st?t.texSubImage2D(n.TEXTURE_2D,pe,0,0,$e,We,Te):t.texImage2D(n.TEXTURE_2D,pe,De,$e,We,Te);b.generateMipmaps=!1}else st?(pt&&t.texStorage2D(n.TEXTURE_2D,Je,De,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,$e,We,ne)):t.texImage2D(n.TEXTURE_2D,0,De,$e,We,ne);E(b,tt)&&v(oe),we.__version=se.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function ge(R,b,W){if(b.image.length!==6)return;const oe=G(R,b),ae=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+W);const se=i.get(ae);if(ae.version!==se.__version||oe===!0){t.activeTexture(n.TEXTURE0+W);const we=lt.getPrimaries(lt.workingColorSpace),K=b.colorSpace===un?null:lt.getPrimaries(b.colorSpace),ce=b.colorSpace===un||we===K?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Re=b.isCompressedTexture||b.image[0].isCompressedTexture,qe=b.image[0]&&b.image[0].isDataTexture,ne=[];for(let pe=0;pe<6;pe++)!Re&&!qe?ne[pe]=y(b.image[pe],!1,!0,s.maxCubemapSize):ne[pe]=qe?b.image[pe].image:b.image[pe],ne[pe]=ze(b,ne[pe]);const tt=ne[0],$e=m(tt)||o,We=r.convert(b.format,b.colorSpace),De=r.convert(b.type),Te=C(b.internalFormat,We,De,b.colorSpace),Ye=o&&b.isVideoTexture!==!0,st=se.__version===void 0||oe===!0;let pt=D(b,tt,$e);J(n.TEXTURE_CUBE_MAP,b,$e);let Je;if(Re){Ye&&st&&t.texStorage2D(n.TEXTURE_CUBE_MAP,pt,Te,tt.width,tt.height);for(let pe=0;pe<6;pe++){Je=ne[pe].mipmaps;for(let U=0;U<Je.length;U++){const _e=Je[U];b.format!==Mn?We!==null?Ye?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,U,0,0,_e.width,_e.height,We,_e.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,U,Te,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,U,0,0,_e.width,_e.height,We,De,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,U,Te,_e.width,_e.height,0,We,De,_e.data)}}}else{Je=b.mipmaps,Ye&&st&&(Je.length>0&&pt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,pt,Te,ne[0].width,ne[0].height));for(let pe=0;pe<6;pe++)if(qe){Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ne[pe].width,ne[pe].height,We,De,ne[pe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,Te,ne[pe].width,ne[pe].height,0,We,De,ne[pe].data);for(let U=0;U<Je.length;U++){const S=Je[U].image[pe].image;Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,U+1,0,0,S.width,S.height,We,De,S.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,U+1,Te,S.width,S.height,0,We,De,S.data)}}else{Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,We,De,ne[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,Te,We,De,ne[pe]);for(let U=0;U<Je.length;U++){const _e=Je[U];Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,U+1,0,0,We,De,_e.image[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,U+1,Te,We,De,_e.image[pe])}}}E(b,$e)&&v(n.TEXTURE_CUBE_MAP),se.__version=ae.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Se(R,b,W,oe,ae,se){const we=r.convert(W.format,W.colorSpace),K=r.convert(W.type),ce=C(W.internalFormat,we,K,W.colorSpace);if(!i.get(b).__hasExternalTextures){const qe=Math.max(1,b.width>>se),ne=Math.max(1,b.height>>se);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,se,ce,qe,ne,b.depth,0,we,K,null):t.texImage2D(ae,se,ce,qe,ne,0,we,K,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),Ee(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,ae,i.get(W).__webglTexture,0,Le(b)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,oe,ae,i.get(W).__webglTexture,se),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Me(R,b,W){if(n.bindRenderbuffer(n.RENDERBUFFER,R),b.depthBuffer&&!b.stencilBuffer){let oe=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(W||Ee(b)){const ae=b.depthTexture;ae&&ae.isDepthTexture&&(ae.type===Xn?oe=n.DEPTH_COMPONENT32F:ae.type===Wn&&(oe=n.DEPTH_COMPONENT24));const se=Le(b);Ee(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,oe,b.width,b.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,se,oe,b.width,b.height)}else n.renderbufferStorage(n.RENDERBUFFER,oe,b.width,b.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,R)}else if(b.depthBuffer&&b.stencilBuffer){const oe=Le(b);W&&Ee(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,n.DEPTH24_STENCIL8,b.width,b.height):Ee(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,n.DEPTH24_STENCIL8,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,R)}else{const oe=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ae=0;ae<oe.length;ae++){const se=oe[ae],we=r.convert(se.format,se.colorSpace),K=r.convert(se.type),ce=C(se.internalFormat,we,K,se.colorSpace),Re=Le(b);W&&Ee(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,ce,b.width,b.height):Ee(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,ce,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,ce,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function He(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),B(b.depthTexture,0);const oe=i.get(b.depthTexture).__webglTexture,ae=Le(b);if(b.depthTexture.format===fi)Ee(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,oe,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,oe,0);else if(b.depthTexture.format===ji)Ee(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,oe,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function be(R){const b=i.get(R),W=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");He(b.__webglFramebuffer,R)}else if(W){b.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[oe]),b.__webglDepthbuffer[oe]=n.createRenderbuffer(),Me(b.__webglDepthbuffer[oe],R,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=n.createRenderbuffer(),Me(b.__webglDepthbuffer,R,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(R,b,W){const oe=i.get(R);b!==void 0&&Se(oe.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&be(R)}function V(R){const b=R.texture,W=i.get(R),oe=i.get(b);R.addEventListener("dispose",z),R.isWebGLMultipleRenderTargets!==!0&&(oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture()),oe.__version=b.version,a.memory.textures++);const ae=R.isWebGLCubeRenderTarget===!0,se=R.isWebGLMultipleRenderTargets===!0,we=m(R)||o;if(ae){W.__webglFramebuffer=[];for(let K=0;K<6;K++)if(o&&b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer[K]=[];for(let ce=0;ce<b.mipmaps.length;ce++)W.__webglFramebuffer[K][ce]=n.createFramebuffer()}else W.__webglFramebuffer[K]=n.createFramebuffer()}else{if(o&&b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer=[];for(let K=0;K<b.mipmaps.length;K++)W.__webglFramebuffer[K]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(se)if(s.drawBuffers){const K=R.texture;for(let ce=0,Re=K.length;ce<Re;ce++){const qe=i.get(K[ce]);qe.__webglTexture===void 0&&(qe.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&R.samples>0&&Ee(R)===!1){const K=se?b:[b];W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ce=0;ce<K.length;ce++){const Re=K[ce];W.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[ce]);const qe=r.convert(Re.format,Re.colorSpace),ne=r.convert(Re.type),tt=C(Re.internalFormat,qe,ne,Re.colorSpace,R.isXRRenderTarget===!0),$e=Le(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,$e,tt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,W.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Me(W.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ae){t.bindTexture(n.TEXTURE_CUBE_MAP,oe.__webglTexture),J(n.TEXTURE_CUBE_MAP,b,we);for(let K=0;K<6;K++)if(o&&b.mipmaps&&b.mipmaps.length>0)for(let ce=0;ce<b.mipmaps.length;ce++)Se(W.__webglFramebuffer[K][ce],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce);else Se(W.__webglFramebuffer[K],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);E(b,we)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){const K=R.texture;for(let ce=0,Re=K.length;ce<Re;ce++){const qe=K[ce],ne=i.get(qe);t.bindTexture(n.TEXTURE_2D,ne.__webglTexture),J(n.TEXTURE_2D,qe,we),Se(W.__webglFramebuffer,R,qe,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,0),E(qe,we)&&v(n.TEXTURE_2D)}t.unbindTexture()}else{let K=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(o?K=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(K,oe.__webglTexture),J(K,b,we),o&&b.mipmaps&&b.mipmaps.length>0)for(let ce=0;ce<b.mipmaps.length;ce++)Se(W.__webglFramebuffer[ce],R,b,n.COLOR_ATTACHMENT0,K,ce);else Se(W.__webglFramebuffer,R,b,n.COLOR_ATTACHMENT0,K,0);E(b,we)&&v(K),t.unbindTexture()}R.depthBuffer&&be(R)}function St(R){const b=m(R)||o,W=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let oe=0,ae=W.length;oe<ae;oe++){const se=W[oe];if(E(se,b)){const we=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,K=i.get(se).__webglTexture;t.bindTexture(we,K),v(we),t.unbindTexture()}}}function Ne(R){if(o&&R.samples>0&&Ee(R)===!1){const b=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],W=R.width,oe=R.height;let ae=n.COLOR_BUFFER_BIT;const se=[],we=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=i.get(R),ce=R.isWebGLMultipleRenderTargets===!0;if(ce)for(let Re=0;Re<b.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,K.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,K.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,K.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,K.__webglFramebuffer);for(let Re=0;Re<b.length;Re++){se.push(n.COLOR_ATTACHMENT0+Re),R.depthBuffer&&se.push(we);const qe=K.__ignoreDepthValues!==void 0?K.__ignoreDepthValues:!1;if(qe===!1&&(R.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),ce&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,K.__webglColorRenderbuffer[Re]),qe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[we]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[we])),ce){const ne=i.get(b[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,W,oe,0,0,W,oe,ae,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,se)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let Re=0;Re<b.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,K.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,K.__webglColorRenderbuffer[Re]);const qe=i.get(b[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,K.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,qe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,K.__webglMultisampledFramebuffer)}}function Le(R){return Math.min(s.maxSamples,R.samples)}function Ee(R){const b=i.get(R);return o&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function rt(R){const b=a.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function ze(R,b){const W=R.colorSpace,oe=R.format,ae=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Da||W!==In&&W!==un&&(lt.getTransfer(W)===vt?o===!1?e.has("EXT_sRGB")===!0&&oe===Mn?(R.format=Da,R.minFilter=hn,R.generateMipmaps=!1):b=vc.sRGBToLinear(b):(oe!==Mn||ae!==jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),b}this.allocateTextureUnit=I,this.resetTextureUnits=he,this.setTexture2D=B,this.setTexture2DArray=ee,this.setTexture3D=Z,this.setTextureCube=X,this.rebindTextures=ke,this.setupRenderTarget=V,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Ee}function fg(n,e,t){const i=t.isWebGL2;function s(r,a=un){let o;const l=lt.getTransfer(a);if(r===jn)return n.UNSIGNED_BYTE;if(r===lc)return n.UNSIGNED_SHORT_4_4_4_4;if(r===cc)return n.UNSIGNED_SHORT_5_5_5_1;if(r===$d)return n.BYTE;if(r===Jd)return n.SHORT;if(r===Ha)return n.UNSIGNED_SHORT;if(r===oc)return n.INT;if(r===Wn)return n.UNSIGNED_INT;if(r===Xn)return n.FLOAT;if(r===Es)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Kd)return n.ALPHA;if(r===Mn)return n.RGBA;if(r===Zd)return n.LUMINANCE;if(r===Qd)return n.LUMINANCE_ALPHA;if(r===fi)return n.DEPTH_COMPONENT;if(r===ji)return n.DEPTH_STENCIL;if(r===Da)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===hc)return n.RED;if(r===dc)return n.RED_INTEGER;if(r===eu)return n.RG;if(r===uc)return n.RG_INTEGER;if(r===fc)return n.RGBA_INTEGER;if(r===Ur||r===Ir||r===Nr||r===Or)if(l===vt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ur)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ir)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Nr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Or)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ur)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ir)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Nr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Or)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===yo||r===Mo||r===So||r===bo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===yo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Mo)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===So)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===bo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===pc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Eo||r===To)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Eo)return l===vt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===To)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===xo||r===wo||r===Ao||r===Ro||r===Co||r===Po||r===Lo||r===Do||r===Uo||r===Io||r===No||r===Oo||r===Fo||r===ko)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===xo)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===wo)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ao)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ro)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Co)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Po)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Lo)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Do)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Uo)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Io)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===No)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Oo)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Fo)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ko)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Fr||r===Bo||r===zo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Fr)return l===vt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Bo)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===zo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===tu||r===Ho||r===Go||r===Vo)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Fr)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Ho)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Go)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Vo)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ui?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class pg extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Nt extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mg={type:"move"};class la{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,i),f=this._getHandJoint(c,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&u>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Nt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class gg extends Ki{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,_=null;const y=t.getContextAttributes();let m=null,f=null;const E=[],v=[],C=new xe;let D=null;const A=new qt;A.layers.enable(1),A.viewport=new yt;const L=new qt;L.layers.enable(2),L.viewport=new yt;const z=[A,L],M=new pg;M.layers.enable(1),M.layers.enable(2);let x=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let G=E[J];return G===void 0&&(G=new la,E[J]=G),G.getTargetRaySpace()},this.getControllerGrip=function(J){let G=E[J];return G===void 0&&(G=new la,E[J]=G),G.getGripSpace()},this.getHand=function(J){let G=E[J];return G===void 0&&(G=new la,E[J]=G),G.getHandSpace()};function j(J){const G=v.indexOf(J.inputSource);if(G===-1)return;const le=E[G];le!==void 0&&(le.update(J.inputSource,J.frame,c||a),le.dispatchEvent({type:J.type,data:J.inputSource}))}function he(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",he),s.removeEventListener("inputsourceschange",I);for(let J=0;J<E.length;J++){const G=v[J];G!==null&&(v[J]=null,E[J].disconnect(G))}x=null,F=null,e.setRenderTarget(m),p=null,u=null,d=null,s=null,f=null,ye.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",he),s.addEventListener("inputsourceschange",I),y.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(C),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const G={antialias:s.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,G),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new mi(p.framebufferWidth,p.framebufferHeight,{format:Mn,type:jn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let G=null,le=null,ge=null;y.depth&&(ge=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=y.stencil?ji:fi,le=y.stencil?ui:Wn);const Se={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};d=new XRWebGLBinding(s,t),u=d.createProjectionLayer(Se),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),f=new mi(u.textureWidth,u.textureHeight,{format:Mn,type:jn,depthTexture:new Pc(u.textureWidth,u.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const Me=e.properties.get(f);Me.__ignoreDepthValues=u.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ye.setContext(s),ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function I(J){for(let G=0;G<J.removed.length;G++){const le=J.removed[G],ge=v.indexOf(le);ge>=0&&(v[ge]=null,E[ge].disconnect(le))}for(let G=0;G<J.added.length;G++){const le=J.added[G];let ge=v.indexOf(le);if(ge===-1){for(let Me=0;Me<E.length;Me++)if(Me>=v.length){v.push(le),ge=Me;break}else if(v[Me]===null){v[Me]=le,ge=Me;break}if(ge===-1)break}const Se=E[ge];Se&&Se.connect(le)}}const H=new w,B=new w;function ee(J,G,le){H.setFromMatrixPosition(G.matrixWorld),B.setFromMatrixPosition(le.matrixWorld);const ge=H.distanceTo(B),Se=G.projectionMatrix.elements,Me=le.projectionMatrix.elements,He=Se[14]/(Se[10]-1),be=Se[14]/(Se[10]+1),ke=(Se[9]+1)/Se[5],V=(Se[9]-1)/Se[5],St=(Se[8]-1)/Se[0],Ne=(Me[8]+1)/Me[0],Le=He*St,Ee=He*Ne,rt=ge/(-St+Ne),ze=rt*-St;G.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ze),J.translateZ(rt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const R=He+rt,b=be+rt,W=Le-ze,oe=Ee+(ge-ze),ae=ke*be/b*R,se=V*be/b*R;J.projectionMatrix.makePerspective(W,oe,ae,se,R,b),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function Z(J,G){G===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(G.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;M.near=L.near=A.near=J.near,M.far=L.far=A.far=J.far,(x!==M.near||F!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),x=M.near,F=M.far);const G=J.parent,le=M.cameras;Z(M,G);for(let ge=0;ge<le.length;ge++)Z(le[ge],G);le.length===2?ee(M,A,L):M.projectionMatrix.copy(A.projectionMatrix),X(J,M,G)};function X(J,G,le){le===null?J.matrix.copy(G.matrixWorld):(J.matrix.copy(le.matrixWorld),J.matrix.invert(),J.matrix.multiply(G.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(G.projectionMatrix),J.projectionMatrixInverse.copy(G.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=gr*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)};let te=null;function Q(J,G){if(h=G.getViewerPose(c||a),_=G,h!==null){const le=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ge=!1;le.length!==M.cameras.length&&(M.cameras.length=0,ge=!0);for(let Se=0;Se<le.length;Se++){const Me=le[Se];let He=null;if(p!==null)He=p.getViewport(Me);else{const ke=d.getViewSubImage(u,Me);He=ke.viewport,Se===0&&(e.setRenderTargetTextures(f,ke.colorTexture,u.ignoreDepthValues?void 0:ke.depthStencilTexture),e.setRenderTarget(f))}let be=z[Se];be===void 0&&(be=new qt,be.layers.enable(Se),be.viewport=new yt,z[Se]=be),be.matrix.fromArray(Me.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Me.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(He.x,He.y,He.width,He.height),Se===0&&(M.matrix.copy(be.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ge===!0&&M.cameras.push(be)}}for(let le=0;le<E.length;le++){const ge=v[le],Se=E[le];ge!==null&&Se!==void 0&&Se.update(ge,G,c||a)}te&&te(J,G),G.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:G}),_=null}const ye=new Rc;ye.setAnimationLoop(Q),this.setAnimationLoop=function(J){te=J},this.dispose=function(){}}}function _g(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,xc(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,E,v,C){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,C)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),y(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,E,v):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Yt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Yt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const E=e.get(f).envMap;if(E&&(m.envMap.value=E,m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*v,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,E,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=v*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Yt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){const E=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function vg(n,e,t,i){let s={},r={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(E,v){const C=v.program;i.uniformBlockBinding(E,C)}function c(E,v){let C=s[E.id];C===void 0&&(_(E),C=h(E),s[E.id]=C,E.addEventListener("dispose",m));const D=v.program;i.updateUBOMapping(E,D);const A=e.render.frame;r[E.id]!==A&&(u(E),r[E.id]=A)}function h(E){const v=d();E.__bindingPointIndex=v;const C=n.createBuffer(),D=E.__size,A=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,C),n.bufferData(n.UNIFORM_BUFFER,D,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,C),C}function d(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){const v=s[E.id],C=E.uniforms,D=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let A=0,L=C.length;A<L;A++){const z=Array.isArray(C[A])?C[A]:[C[A]];for(let M=0,x=z.length;M<x;M++){const F=z[M];if(p(F,A,M,D)===!0){const j=F.__offset,he=Array.isArray(F.value)?F.value:[F.value];let I=0;for(let H=0;H<he.length;H++){const B=he[H],ee=y(B);typeof B=="number"||typeof B=="boolean"?(F.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,j+I,F.__data)):B.isMatrix3?(F.__data[0]=B.elements[0],F.__data[1]=B.elements[1],F.__data[2]=B.elements[2],F.__data[3]=0,F.__data[4]=B.elements[3],F.__data[5]=B.elements[4],F.__data[6]=B.elements[5],F.__data[7]=0,F.__data[8]=B.elements[6],F.__data[9]=B.elements[7],F.__data[10]=B.elements[8],F.__data[11]=0):(B.toArray(F.__data,I),I+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,j,F.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,v,C,D){const A=E.value,L=v+"_"+C;if(D[L]===void 0)return typeof A=="number"||typeof A=="boolean"?D[L]=A:D[L]=A.clone(),!0;{const z=D[L];if(typeof A=="number"||typeof A=="boolean"){if(z!==A)return D[L]=A,!0}else if(z.equals(A)===!1)return z.copy(A),!0}return!1}function _(E){const v=E.uniforms;let C=0;const D=16;for(let L=0,z=v.length;L<z;L++){const M=Array.isArray(v[L])?v[L]:[v[L]];for(let x=0,F=M.length;x<F;x++){const j=M[x],he=Array.isArray(j.value)?j.value:[j.value];for(let I=0,H=he.length;I<H;I++){const B=he[I],ee=y(B),Z=C%D;Z!==0&&D-Z<ee.boundary&&(C+=D-Z),j.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=C,C+=ee.storage}}}const A=C%D;return A>0&&(C+=D-A),E.__size=C,E.__cache={},this}function y(E){const v={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(v.boundary=4,v.storage=4):E.isVector2?(v.boundary=8,v.storage=8):E.isVector3||E.isColor?(v.boundary=16,v.storage=12):E.isVector4?(v.boundary=16,v.storage=16):E.isMatrix3?(v.boundary=48,v.storage=48):E.isMatrix4?(v.boundary=64,v.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),v}function m(E){const v=E.target;v.removeEventListener("dispose",m);const C=a.indexOf(v.__bindingPointIndex);a.splice(C,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function f(){for(const E in s)n.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}class Ya{constructor(e={}){const{canvas:t=fu(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;i!==null?u=i.getContextAttributes().alpha:u=a;const p=new Uint32Array(4),_=new Int32Array(4);let y=null,m=null;const f=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ft,this._useLegacyLights=!1,this.toneMapping=Yn,this.toneMappingExposure=1;const v=this;let C=!1,D=0,A=0,L=null,z=-1,M=null;const x=new yt,F=new yt;let j=null;const he=new Fe(0);let I=0,H=t.width,B=t.height,ee=1,Z=null,X=null;const te=new yt(0,0,H,B),Q=new yt(0,0,H,B);let ye=!1;const J=new Xa;let G=!1,le=!1,ge=null;const Se=new Mt,Me=new xe,He=new w,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ke(){return L===null?ee:1}let V=i;function St(T,k){for(let Y=0;Y<T.length;Y++){const $=T[Y],q=t.getContext($,k);if(q!==null)return q}return null}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ka}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",U,!1),t.addEventListener("webglcontextcreationerror",_e,!1),V===null){const k=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&k.shift(),V=St(k,T),V===null)throw St(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&V instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),V.getShaderPrecisionFormat===void 0&&(V.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ne,Le,Ee,rt,ze,R,b,W,oe,ae,se,we,K,ce,Re,qe,ne,tt,$e,We,De,Te,Ye,st;function pt(){Ne=new Rm(V),Le=new bm(V,Ne,e),Ne.init(Le),Te=new fg(V,Ne,Le),Ee=new dg(V,Ne,Le),rt=new Lm(V),ze=new K0,R=new ug(V,Ne,Ee,ze,Le,Te,rt),b=new Tm(v),W=new Am(v),oe=new ku(V,Le),Ye=new Mm(V,Ne,oe,Le),ae=new Cm(V,oe,rt,Ye),se=new Nm(V,ae,oe,rt),$e=new Im(V,Le,R),qe=new Em(ze),we=new J0(v,b,W,Ne,Le,Ye,qe),K=new _g(v,ze),ce=new Q0,Re=new rg(Ne,Le),tt=new ym(v,b,W,Ee,se,u,l),ne=new hg(v,se,Le),st=new vg(V,rt,Le,Ee),We=new Sm(V,Ne,rt,Le),De=new Pm(V,Ne,rt,Le),rt.programs=we.programs,v.capabilities=Le,v.extensions=Ne,v.properties=ze,v.renderLists=ce,v.shadowMap=ne,v.state=Ee,v.info=rt}pt();const Je=new gg(v,V);this.xr=Je,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const T=Ne.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ne.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(T){T!==void 0&&(ee=T,this.setSize(H,B,!1))},this.getSize=function(T){return T.set(H,B)},this.setSize=function(T,k,Y=!0){if(Je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=T,B=k,t.width=Math.floor(T*ee),t.height=Math.floor(k*ee),Y===!0&&(t.style.width=T+"px",t.style.height=k+"px"),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(H*ee,B*ee).floor()},this.setDrawingBufferSize=function(T,k,Y){H=T,B=k,ee=Y,t.width=Math.floor(T*Y),t.height=Math.floor(k*Y),this.setViewport(0,0,T,k)},this.getCurrentViewport=function(T){return T.copy(x)},this.getViewport=function(T){return T.copy(te)},this.setViewport=function(T,k,Y,$){T.isVector4?te.set(T.x,T.y,T.z,T.w):te.set(T,k,Y,$),Ee.viewport(x.copy(te).multiplyScalar(ee).floor())},this.getScissor=function(T){return T.copy(Q)},this.setScissor=function(T,k,Y,$){T.isVector4?Q.set(T.x,T.y,T.z,T.w):Q.set(T,k,Y,$),Ee.scissor(F.copy(Q).multiplyScalar(ee).floor())},this.getScissorTest=function(){return ye},this.setScissorTest=function(T){Ee.setScissorTest(ye=T)},this.setOpaqueSort=function(T){Z=T},this.setTransparentSort=function(T){X=T},this.getClearColor=function(T){return T.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor.apply(tt,arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha.apply(tt,arguments)},this.clear=function(T=!0,k=!0,Y=!0){let $=0;if(T){let q=!1;if(L!==null){const fe=L.texture.format;q=fe===fc||fe===uc||fe===dc}if(q){const fe=L.texture.type,Pe=fe===jn||fe===Wn||fe===Ha||fe===ui||fe===lc||fe===cc,Ie=tt.getClearColor(),Be=tt.getClearAlpha(),Oe=Ie.r,Ve=Ie.g,Xe=Ie.b;Pe?(p[0]=Oe,p[1]=Ve,p[2]=Xe,p[3]=Be,V.clearBufferuiv(V.COLOR,0,p)):(_[0]=Oe,_[1]=Ve,_[2]=Xe,_[3]=Be,V.clearBufferiv(V.COLOR,0,_))}else $|=V.COLOR_BUFFER_BIT}k&&($|=V.DEPTH_BUFFER_BIT),Y&&($|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",U,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),ce.dispose(),Re.dispose(),ze.dispose(),b.dispose(),W.dispose(),se.dispose(),Ye.dispose(),st.dispose(),we.dispose(),Je.dispose(),Je.removeEventListener("sessionstart",ve),Je.removeEventListener("sessionend",ue),ge&&(ge.dispose(),ge=null),Ce.stop()};function pe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=rt.autoReset,k=ne.enabled,Y=ne.autoUpdate,$=ne.needsUpdate,q=ne.type;pt(),rt.autoReset=T,ne.enabled=k,ne.autoUpdate=Y,ne.needsUpdate=$,ne.type=q}function _e(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function S(T){const k=T.target;k.removeEventListener("dispose",S),N(k)}function N(T){P(T),ze.remove(T)}function P(T){const k=ze.get(T).programs;k!==void 0&&(k.forEach(function(Y){we.releaseProgram(Y)}),T.isShaderMaterial&&we.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,Y,$,q,fe){k===null&&(k=be);const Pe=q.isMesh&&q.matrixWorld.determinant()<0,Ie=Lt(T,k,Y,$,q);Ee.setMaterial($,Pe);let Be=Y.index,Oe=1;if($.wireframe===!0){if(Be=ae.getWireframeAttribute(Y),Be===void 0)return;Oe=2}const Ve=Y.drawRange,Xe=Y.attributes.position;let gt=Ve.start*Oe,Ot=(Ve.start+Ve.count)*Oe;fe!==null&&(gt=Math.max(gt,fe.start*Oe),Ot=Math.min(Ot,(fe.start+fe.count)*Oe)),Be!==null?(gt=Math.max(gt,0),Ot=Math.min(Ot,Be.count)):Xe!=null&&(gt=Math.max(gt,0),Ot=Math.min(Ot,Xe.count));const bt=Ot-gt;if(bt<0||bt===1/0)return;Ye.setup(q,$,Ie,Y,Be);let Jt,dt=We;if(Be!==null&&(Jt=oe.get(Be),dt=De,dt.setIndex(Jt)),q.isMesh)$.wireframe===!0?(Ee.setLineWidth($.wireframeLinewidth*ke()),dt.setMode(V.LINES)):dt.setMode(V.TRIANGLES);else if(q.isLine){let je=$.linewidth;je===void 0&&(je=1),Ee.setLineWidth(je*ke()),q.isLineSegments?dt.setMode(V.LINES):q.isLineLoop?dt.setMode(V.LINE_LOOP):dt.setMode(V.LINE_STRIP)}else q.isPoints?dt.setMode(V.POINTS):q.isSprite&&dt.setMode(V.TRIANGLES);if(q.isBatchedMesh)dt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else if(q.isInstancedMesh)dt.renderInstances(gt,bt,q.count);else if(Y.isInstancedBufferGeometry){const je=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,vi=Math.min(Y.instanceCount,je);dt.renderInstances(gt,bt,vi)}else dt.render(gt,bt)};function g(T,k,Y){T.transparent===!0&&T.side===Kt&&T.forceSinglePass===!1?(T.side=Yt,T.needsUpdate=!0,ot(T,k,Y),T.side=Zn,T.needsUpdate=!0,ot(T,k,Y),T.side=Kt):ot(T,k,Y)}this.compile=function(T,k,Y=null){Y===null&&(Y=T),m=Re.get(Y),m.init(),E.push(m),Y.traverseVisible(function(q){q.isLight&&q.layers.test(k.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),T!==Y&&T.traverseVisible(function(q){q.isLight&&q.layers.test(k.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),m.setupLights(v._useLegacyLights);const $=new Set;return T.traverse(function(q){const fe=q.material;if(fe)if(Array.isArray(fe))for(let Pe=0;Pe<fe.length;Pe++){const Ie=fe[Pe];g(Ie,Y,q),$.add(Ie)}else g(fe,Y,q),$.add(fe)}),E.pop(),m=null,$},this.compileAsync=function(T,k,Y=null){const $=this.compile(T,k,Y);return new Promise(q=>{function fe(){if($.forEach(function(Pe){ze.get(Pe).currentProgram.isReady()&&$.delete(Pe)}),$.size===0){q(T);return}setTimeout(fe,10)}Ne.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let O=null;function ie(T){O&&O(T)}function ve(){Ce.stop()}function ue(){Ce.start()}const Ce=new Rc;Ce.setAnimationLoop(ie),typeof self<"u"&&Ce.setContext(self),this.setAnimationLoop=function(T){O=T,Je.setAnimationLoop(T),T===null?Ce.stop():Ce.start()},Je.addEventListener("sessionstart",ve),Je.addEventListener("sessionend",ue),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(k),k=Je.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,k,L),m=Re.get(T,E.length),m.init(),E.push(m),Se.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),J.setFromProjectionMatrix(Se),le=this.localClippingEnabled,G=qe.init(this.clippingPlanes,le),y=ce.get(T,f.length),y.init(),f.push(y),it(T,k,0,v.sortObjects),y.finish(),v.sortObjects===!0&&y.sort(Z,X),this.info.render.frame++,G===!0&&qe.beginShadows();const Y=m.state.shadowsArray;if(ne.render(Y,T,k),G===!0&&qe.endShadows(),this.info.autoReset===!0&&this.info.reset(),tt.render(y,T),m.setupLights(v._useLegacyLights),k.isArrayCamera){const $=k.cameras;for(let q=0,fe=$.length;q<fe;q++){const Pe=$[q];nt(y,T,Pe,Pe.viewport)}}else nt(y,T,k);L!==null&&(R.updateMultisampleRenderTarget(L),R.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(v,T,k),Ye.resetDefaultState(),z=-1,M=null,E.pop(),E.length>0?m=E[E.length-1]:m=null,f.pop(),f.length>0?y=f[f.length-1]:y=null};function it(T,k,Y,$){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)Y=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||J.intersectsSprite(T)){$&&He.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Se);const Pe=se.update(T),Ie=T.material;Ie.visible&&y.push(T,Pe,Ie,Y,He.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||J.intersectsObject(T))){const Pe=se.update(T),Ie=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),He.copy(T.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),He.copy(Pe.boundingSphere.center)),He.applyMatrix4(T.matrixWorld).applyMatrix4(Se)),Array.isArray(Ie)){const Be=Pe.groups;for(let Oe=0,Ve=Be.length;Oe<Ve;Oe++){const Xe=Be[Oe],gt=Ie[Xe.materialIndex];gt&&gt.visible&&y.push(T,Pe,gt,Y,He.z,Xe)}}else Ie.visible&&y.push(T,Pe,Ie,Y,He.z,null)}}const fe=T.children;for(let Pe=0,Ie=fe.length;Pe<Ie;Pe++)it(fe[Pe],k,Y,$)}function nt(T,k,Y,$){const q=T.opaque,fe=T.transmissive,Pe=T.transparent;m.setupLightsView(Y),G===!0&&qe.setGlobalState(v.clippingPlanes,Y),fe.length>0&&Pt(q,fe,k,Y),$&&Ee.viewport(x.copy($)),q.length>0&&mt(q,k,Y),fe.length>0&&mt(fe,k,Y),Pe.length>0&&mt(Pe,k,Y),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Pt(T,k,Y,$){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;const fe=Le.isWebGL2;ge===null&&(ge=new mi(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")?Es:jn,minFilter:bs,samples:fe?4:0})),v.getDrawingBufferSize(Me),fe?ge.setSize(Me.x,Me.y):ge.setSize(Ua(Me.x),Ua(Me.y));const Pe=v.getRenderTarget();v.setRenderTarget(ge),v.getClearColor(he),I=v.getClearAlpha(),I<1&&v.setClearColor(16777215,.5),v.clear();const Ie=v.toneMapping;v.toneMapping=Yn,mt(T,Y,$),R.updateMultisampleRenderTarget(ge),R.updateRenderTargetMipmap(ge);let Be=!1;for(let Oe=0,Ve=k.length;Oe<Ve;Oe++){const Xe=k[Oe],gt=Xe.object,Ot=Xe.geometry,bt=Xe.material,Jt=Xe.group;if(bt.side===Kt&&gt.layers.test($.layers)){const dt=bt.side;bt.side=Yt,bt.needsUpdate=!0,at(gt,Y,$,Ot,bt,Jt),bt.side=dt,bt.needsUpdate=!0,Be=!0}}Be===!0&&(R.updateMultisampleRenderTarget(ge),R.updateRenderTargetMipmap(ge)),v.setRenderTarget(Pe),v.setClearColor(he,I),v.toneMapping=Ie}function mt(T,k,Y){const $=k.isScene===!0?k.overrideMaterial:null;for(let q=0,fe=T.length;q<fe;q++){const Pe=T[q],Ie=Pe.object,Be=Pe.geometry,Oe=$===null?Pe.material:$,Ve=Pe.group;Ie.layers.test(Y.layers)&&at(Ie,k,Y,Be,Oe,Ve)}}function at(T,k,Y,$,q,fe){T.onBeforeRender(v,k,Y,$,q,fe),T.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),q.onBeforeRender(v,k,Y,$,T,fe),q.transparent===!0&&q.side===Kt&&q.forceSinglePass===!1?(q.side=Yt,q.needsUpdate=!0,v.renderBufferDirect(Y,k,$,q,T,fe),q.side=Zn,q.needsUpdate=!0,v.renderBufferDirect(Y,k,$,q,T,fe),q.side=Kt):v.renderBufferDirect(Y,k,$,q,T,fe),T.onAfterRender(v,k,Y,$,q,fe)}function ot(T,k,Y){k.isScene!==!0&&(k=be);const $=ze.get(T),q=m.state.lights,fe=m.state.shadowsArray,Pe=q.state.version,Ie=we.getParameters(T,q.state,fe,k,Y),Be=we.getProgramCacheKey(Ie);let Oe=$.programs;$.environment=T.isMeshStandardMaterial?k.environment:null,$.fog=k.fog,$.envMap=(T.isMeshStandardMaterial?W:b).get(T.envMap||$.environment),Oe===void 0&&(T.addEventListener("dispose",S),Oe=new Map,$.programs=Oe);let Ve=Oe.get(Be);if(Ve!==void 0){if($.currentProgram===Ve&&$.lightsStateVersion===Pe)return Qt(T,Ie),Ve}else Ie.uniforms=we.getUniforms(T),T.onBuild(Y,Ie,v),T.onBeforeCompile(Ie,v),Ve=we.acquireProgram(Ie,Be),Oe.set(Be,Ve),$.uniforms=Ie.uniforms;const Xe=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Xe.clippingPlanes=qe.uniform),Qt(T,Ie),$.needsLights=ts(T),$.lightsStateVersion=Pe,$.needsLights&&(Xe.ambientLightColor.value=q.state.ambient,Xe.lightProbe.value=q.state.probe,Xe.directionalLights.value=q.state.directional,Xe.directionalLightShadows.value=q.state.directionalShadow,Xe.spotLights.value=q.state.spot,Xe.spotLightShadows.value=q.state.spotShadow,Xe.rectAreaLights.value=q.state.rectArea,Xe.ltc_1.value=q.state.rectAreaLTC1,Xe.ltc_2.value=q.state.rectAreaLTC2,Xe.pointLights.value=q.state.point,Xe.pointLightShadows.value=q.state.pointShadow,Xe.hemisphereLights.value=q.state.hemi,Xe.directionalShadowMap.value=q.state.directionalShadowMap,Xe.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Xe.spotShadowMap.value=q.state.spotShadowMap,Xe.spotLightMatrix.value=q.state.spotLightMatrix,Xe.spotLightMap.value=q.state.spotLightMap,Xe.pointShadowMap.value=q.state.pointShadowMap,Xe.pointShadowMatrix.value=q.state.pointShadowMatrix),$.currentProgram=Ve,$.uniformsList=null,Ve}function $t(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=ar.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Qt(T,k){const Y=ze.get(T);Y.outputColorSpace=k.outputColorSpace,Y.batching=k.batching,Y.instancing=k.instancing,Y.instancingColor=k.instancingColor,Y.skinning=k.skinning,Y.morphTargets=k.morphTargets,Y.morphNormals=k.morphNormals,Y.morphColors=k.morphColors,Y.morphTargetsCount=k.morphTargetsCount,Y.numClippingPlanes=k.numClippingPlanes,Y.numIntersection=k.numClipIntersection,Y.vertexAlphas=k.vertexAlphas,Y.vertexTangents=k.vertexTangents,Y.toneMapping=k.toneMapping}function Lt(T,k,Y,$,q){k.isScene!==!0&&(k=be),R.resetTextureUnits();const fe=k.fog,Pe=$.isMeshStandardMaterial?k.environment:null,Ie=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:In,Be=($.isMeshStandardMaterial?W:b).get($.envMap||Pe),Oe=$.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ve=!!Y.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Xe=!!Y.morphAttributes.position,gt=!!Y.morphAttributes.normal,Ot=!!Y.morphAttributes.color;let bt=Yn;$.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(bt=v.toneMapping);const Jt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,dt=Jt!==void 0?Jt.length:0,je=ze.get($),vi=m.state.lights;if(G===!0&&(le===!0||T!==M)){const kt=T===M&&$.id===z;qe.setState($,T,kt)}let _t=!1;$.version===je.__version?(je.needsLights&&je.lightsStateVersion!==vi.state.version||je.outputColorSpace!==Ie||q.isBatchedMesh&&je.batching===!1||!q.isBatchedMesh&&je.batching===!0||q.isInstancedMesh&&je.instancing===!1||!q.isInstancedMesh&&je.instancing===!0||q.isSkinnedMesh&&je.skinning===!1||!q.isSkinnedMesh&&je.skinning===!0||q.isInstancedMesh&&je.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&je.instancingColor===!1&&q.instanceColor!==null||je.envMap!==Be||$.fog===!0&&je.fog!==fe||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==qe.numPlanes||je.numIntersection!==qe.numIntersection)||je.vertexAlphas!==Oe||je.vertexTangents!==Ve||je.morphTargets!==Xe||je.morphNormals!==gt||je.morphColors!==Ot||je.toneMapping!==bt||Le.isWebGL2===!0&&je.morphTargetsCount!==dt)&&(_t=!0):(_t=!0,je.__version=$.version);let Sn=je.currentProgram;_t===!0&&(Sn=ot($,k,q));let de=!1,Ue=!1,Dt=!1;const ut=Sn.getUniforms(),an=je.uniforms;if(Ee.useProgram(Sn.program)&&(de=!0,Ue=!0,Dt=!0),$.id!==z&&(z=$.id,Ue=!0),de||M!==T){ut.setValue(V,"projectionMatrix",T.projectionMatrix),ut.setValue(V,"viewMatrix",T.matrixWorldInverse);const kt=ut.map.cameraPosition;kt!==void 0&&kt.setValue(V,He.setFromMatrixPosition(T.matrixWorld)),Le.logarithmicDepthBuffer&&ut.setValue(V,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&ut.setValue(V,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Ue=!0,Dt=!0)}if(q.isSkinnedMesh){ut.setOptional(V,q,"bindMatrix"),ut.setOptional(V,q,"bindMatrixInverse");const kt=q.skeleton;kt&&(Le.floatVertexTextures?(kt.boneTexture===null&&kt.computeBoneTexture(),ut.setValue(V,"boneTexture",kt.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}q.isBatchedMesh&&(ut.setOptional(V,q,"batchingTexture"),ut.setValue(V,"batchingTexture",q._matricesTexture,R));const on=Y.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0&&Le.isWebGL2===!0)&&$e.update(q,Y,Sn),(Ue||je.receiveShadow!==q.receiveShadow)&&(je.receiveShadow=q.receiveShadow,ut.setValue(V,"receiveShadow",q.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(an.envMap.value=Be,an.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),Ue&&(ut.setValue(V,"toneMappingExposure",v.toneMappingExposure),je.needsLights&&fn(an,Dt),fe&&$.fog===!0&&K.refreshFogUniforms(an,fe),K.refreshMaterialUniforms(an,$,ee,B,ge),ar.upload(V,$t(je),an,R)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(ar.upload(V,$t(je),an,R),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&ut.setValue(V,"center",q.center),ut.setValue(V,"modelViewMatrix",q.modelViewMatrix),ut.setValue(V,"normalMatrix",q.normalMatrix),ut.setValue(V,"modelMatrix",q.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const kt=$.uniformsGroups;for(let yi=0,Xc=kt.length;yi<Xc;yi++)if(Le.isWebGL2){const to=kt[yi];st.update(to,Sn),st.bind(to,Sn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Sn}function fn(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function ts(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,k,Y){ze.get(T.texture).__webglTexture=k,ze.get(T.depthTexture).__webglTexture=Y;const $=ze.get(T);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=Y===void 0,$.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,k){const Y=ze.get(T);Y.__webglFramebuffer=k,Y.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,Y=0){L=T,D=k,A=Y;let $=!0,q=null,fe=!1,Pe=!1;if(T){const Be=ze.get(T);Be.__useDefaultFramebuffer!==void 0?(Ee.bindFramebuffer(V.FRAMEBUFFER,null),$=!1):Be.__webglFramebuffer===void 0?R.setupRenderTarget(T):Be.__hasExternalTextures&&R.rebindTextures(T,ze.get(T.texture).__webglTexture,ze.get(T.depthTexture).__webglTexture);const Oe=T.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Pe=!0);const Ve=ze.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ve[k])?q=Ve[k][Y]:q=Ve[k],fe=!0):Le.isWebGL2&&T.samples>0&&R.useMultisampledRTT(T)===!1?q=ze.get(T).__webglMultisampledFramebuffer:Array.isArray(Ve)?q=Ve[Y]:q=Ve,x.copy(T.viewport),F.copy(T.scissor),j=T.scissorTest}else x.copy(te).multiplyScalar(ee).floor(),F.copy(Q).multiplyScalar(ee).floor(),j=ye;if(Ee.bindFramebuffer(V.FRAMEBUFFER,q)&&Le.drawBuffers&&$&&Ee.drawBuffers(T,q),Ee.viewport(x),Ee.scissor(F),Ee.setScissorTest(j),fe){const Be=ze.get(T.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+k,Be.__webglTexture,Y)}else if(Pe){const Be=ze.get(T.texture),Oe=k||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Be.__webglTexture,Y||0,Oe)}z=-1},this.readRenderTargetPixels=function(T,k,Y,$,q,fe,Pe){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=ze.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ie=Ie[Pe]),Ie){Ee.bindFramebuffer(V.FRAMEBUFFER,Ie);try{const Be=T.texture,Oe=Be.format,Ve=Be.type;if(Oe!==Mn&&Te.convert(Oe)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Xe=Ve===Es&&(Ne.has("EXT_color_buffer_half_float")||Le.isWebGL2&&Ne.has("EXT_color_buffer_float"));if(Ve!==jn&&Te.convert(Ve)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===Xn&&(Le.isWebGL2||Ne.has("OES_texture_float")||Ne.has("WEBGL_color_buffer_float")))&&!Xe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-$&&Y>=0&&Y<=T.height-q&&V.readPixels(k,Y,$,q,Te.convert(Oe),Te.convert(Ve),fe)}finally{const Be=L!==null?ze.get(L).__webglFramebuffer:null;Ee.bindFramebuffer(V.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(T,k,Y=0){const $=Math.pow(2,-Y),q=Math.floor(k.image.width*$),fe=Math.floor(k.image.height*$);R.setTexture2D(k,0),V.copyTexSubImage2D(V.TEXTURE_2D,Y,0,0,T.x,T.y,q,fe),Ee.unbindTexture()},this.copyTextureToTexture=function(T,k,Y,$=0){const q=k.image.width,fe=k.image.height,Pe=Te.convert(Y.format),Ie=Te.convert(Y.type);R.setTexture2D(Y,0),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,Y.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,Y.unpackAlignment),k.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,$,T.x,T.y,q,fe,Pe,Ie,k.image.data):k.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,$,T.x,T.y,k.mipmaps[0].width,k.mipmaps[0].height,Pe,k.mipmaps[0].data):V.texSubImage2D(V.TEXTURE_2D,$,T.x,T.y,Pe,Ie,k.image),$===0&&Y.generateMipmaps&&V.generateMipmap(V.TEXTURE_2D),Ee.unbindTexture()},this.copyTextureToTexture3D=function(T,k,Y,$,q=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fe=T.max.x-T.min.x+1,Pe=T.max.y-T.min.y+1,Ie=T.max.z-T.min.z+1,Be=Te.convert($.format),Oe=Te.convert($.type);let Ve;if($.isData3DTexture)R.setTexture3D($,0),Ve=V.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)R.setTexture2DArray($,0),Ve=V.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,$.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,$.unpackAlignment);const Xe=V.getParameter(V.UNPACK_ROW_LENGTH),gt=V.getParameter(V.UNPACK_IMAGE_HEIGHT),Ot=V.getParameter(V.UNPACK_SKIP_PIXELS),bt=V.getParameter(V.UNPACK_SKIP_ROWS),Jt=V.getParameter(V.UNPACK_SKIP_IMAGES),dt=Y.isCompressedTexture?Y.mipmaps[q]:Y.image;V.pixelStorei(V.UNPACK_ROW_LENGTH,dt.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,dt.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,T.min.x),V.pixelStorei(V.UNPACK_SKIP_ROWS,T.min.y),V.pixelStorei(V.UNPACK_SKIP_IMAGES,T.min.z),Y.isDataTexture||Y.isData3DTexture?V.texSubImage3D(Ve,q,k.x,k.y,k.z,fe,Pe,Ie,Be,Oe,dt.data):Y.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),V.compressedTexSubImage3D(Ve,q,k.x,k.y,k.z,fe,Pe,Ie,Be,dt.data)):V.texSubImage3D(Ve,q,k.x,k.y,k.z,fe,Pe,Ie,Be,Oe,dt),V.pixelStorei(V.UNPACK_ROW_LENGTH,Xe),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,gt),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Ot),V.pixelStorei(V.UNPACK_SKIP_ROWS,bt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Jt),q===0&&$.generateMipmaps&&V.generateMipmap(Ve),Ee.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),Ee.unbindTexture()},this.resetState=function(){D=0,A=0,L=null,Ee.reset(),Ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Va?"display-p3":"srgb",t.unpackColorSpace=lt.workingColorSpace===Tr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ft?pi:mc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===pi?Ft:In}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class yg extends Ya{}yg.prototype.isWebGL1Renderer=!0;class ja{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Fe(e),this.density=t}clone(){return new ja(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Oc extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Mg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=La,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new w;class vr{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Dn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),s=ht(s,this.array),r=ht(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new rn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new vr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Na extends Nn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Oi;const as=new w,Fi=new w,ki=new w,Bi=new xe,os=new xe,Fc=new Mt,Qs=new w,ls=new w,er=new w,Ll=new xe,ca=new xe,Dl=new xe;class Ul extends Et{constructor(e=new Na){if(super(),this.isSprite=!0,this.type="Sprite",Oi===void 0){Oi=new Tt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Mg(t,5);Oi.setIndex([0,1,2,0,2,3]),Oi.setAttribute("position",new vr(i,3,0,!1)),Oi.setAttribute("uv",new vr(i,2,3,!1))}this.geometry=Oi,this.material=e,this.center=new xe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fi.setFromMatrixScale(this.matrixWorld),Fc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ki.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fi.multiplyScalar(-ki.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;tr(Qs.set(-.5,-.5,0),ki,a,Fi,s,r),tr(ls.set(.5,-.5,0),ki,a,Fi,s,r),tr(er.set(.5,.5,0),ki,a,Fi,s,r),Ll.set(0,0),ca.set(1,0),Dl.set(1,1);let o=e.ray.intersectTriangle(Qs,ls,er,!1,as);if(o===null&&(tr(ls.set(-.5,.5,0),ki,a,Fi,s,r),ca.set(0,1),o=e.ray.intersectTriangle(Qs,er,ls,!1,as),o===null))return;const l=e.ray.origin.distanceTo(as);l<e.near||l>e.far||t.push({distance:l,point:as.clone(),uv:dn.getInterpolation(as,Qs,ls,er,Ll,ca,Dl,new xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function tr(n,e,t,i,s,r){Bi.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(os.x=r*Bi.x-s*Bi.y,os.y=s*Bi.x+r*Bi.y):os.copy(Bi),n.copy(e),n.x+=os.x,n.y+=os.y,n.applyMatrix4(Fc)}class Sg extends jt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=At,h=At,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class or extends Nn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Il=new w,Nl=new w,Ol=new Mt,ha=new Wa,nr=new Ps;class da extends Et{constructor(e=new Tt,t=new or){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Il.fromBufferAttribute(t,s-1),Nl.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Il.distanceTo(Nl);e.setAttribute("lineDistance",new ft(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),nr.copy(i.boundingSphere),nr.applyMatrix4(s),nr.radius+=r,e.ray.intersectsSphere(nr)===!1)return;Ol.copy(s).invert(),ha.copy(e.ray).applyMatrix4(Ol);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new w,h=new w,d=new w,u=new w,p=this.isLineSegments?2:1,_=i.index,m=i.attributes.position;if(_!==null){const f=Math.max(0,a.start),E=Math.min(_.count,a.start+a.count);for(let v=f,C=E-1;v<C;v+=p){const D=_.getX(v),A=_.getX(v+1);if(c.fromBufferAttribute(m,D),h.fromBufferAttribute(m,A),ha.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const z=e.ray.origin.distanceTo(u);z<e.near||z>e.far||t.push({distance:z,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,a.start),E=Math.min(m.count,a.start+a.count);for(let v=f,C=E-1;v<C;v+=p){if(c.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),ha.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(u);A<e.near||A>e.far||t.push({distance:A,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}class kc extends Nn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Fl=new Mt,Oa=new Wa,ir=new Ps,sr=new w;class bg extends Et{constructor(e=new Tt,t=new kc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ir.copy(i.boundingSphere),ir.applyMatrix4(s),ir.radius+=r,e.ray.intersectsSphere(ir)===!1)return;Fl.copy(s).invert(),Oa.copy(e.ray).applyMatrix4(Fl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=u,y=p;_<y;_++){const m=c.getX(_);sr.fromBufferAttribute(d,m),kl(sr,m,l,s,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=u,y=p;_<y;_++)sr.fromBufferAttribute(d,_),kl(sr,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function kl(n,e,t,i,s,r,a){const o=Oa.distanceSqToPoint(n);if(o<t){const l=new w;Oa.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Ts extends jt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class On{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);const h=i[s],u=i[s+1]-h,p=(a-h)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new xe:new w);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new w,s=[],r=[],a=[],o=new w,l=new Mt;for(let p=0;p<=e;p++){const _=p/e;s[p]=this.getTangentAt(_,new w)}r[0]=new w,a[0]=new w;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(Ht(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,_))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Ht(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let _=1;_<=e;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],p*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Bc extends On{constructor(e=0,t=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const i=t||new xe,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*d+this.aX,c=u*d+p*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Eg extends Bc{constructor(e,t,i,s,r,a){super(e,t,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function $a(){let n=0,e=0,t=0,i=0;function s(r,a,o,l){n=r,e=o,t=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,p*=h,s(a,o,u,p)},calc:function(r){const a=r*r,o=a*r;return n+e*r+t*a+i*o}}}const rr=new w,ua=new $a,fa=new $a,pa=new $a;class Tg extends On{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new w){const i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(rr.subVectors(s[0],s[1]).add(s[0]),c=rr);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(rr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=rr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(d),p),y=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);y<1e-4&&(y=1),_<1e-4&&(_=y),m<1e-4&&(m=y),ua.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,_,y,m),fa.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,_,y,m),pa.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,_,y,m)}else this.curveType==="catmullrom"&&(ua.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),fa.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),pa.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(ua.calc(l),fa.calc(l),pa.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new w().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Bl(n,e,t,i,s){const r=(i-e)*.5,a=(s-t)*.5,o=n*n,l=n*o;return(2*t-2*i+r+a)*l+(-3*t+3*i-2*r-a)*o+r*n+t}function xg(n,e){const t=1-n;return t*t*e}function wg(n,e){return 2*(1-n)*n*e}function Ag(n,e){return n*n*e}function us(n,e,t,i){return xg(n,e)+wg(n,t)+Ag(n,i)}function Rg(n,e){const t=1-n;return t*t*t*e}function Cg(n,e){const t=1-n;return 3*t*t*n*e}function Pg(n,e){return 3*(1-n)*n*n*e}function Lg(n,e){return n*n*n*e}function fs(n,e,t,i,s){return Rg(n,e)+Cg(n,t)+Pg(n,i)+Lg(n,s)}class Dg extends On{constructor(e=new xe,t=new xe,i=new xe,s=new xe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new xe){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(fs(e,s.x,r.x,a.x,o.x),fs(e,s.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ug extends On{constructor(e=new w,t=new w,i=new w,s=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new w){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(fs(e,s.x,r.x,a.x,o.x),fs(e,s.y,r.y,a.y,o.y),fs(e,s.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ig extends On{constructor(e=new xe,t=new xe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new xe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new xe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ng extends On{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Og extends On{constructor(e=new xe,t=new xe,i=new xe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new xe){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(us(e,s.x,r.x,a.x),us(e,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ps extends On{constructor(e=new w,t=new w,i=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new w){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(us(e,s.x,r.x,a.x),us(e,s.y,r.y,a.y),us(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fg extends On{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new xe){const i=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return i.set(Bl(o,l.x,c.x,h.x,d.x),Bl(o,l.y,c.y,h.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new xe().fromArray(s))}return this}}var kg=Object.freeze({__proto__:null,ArcCurve:Eg,CatmullRomCurve3:Tg,CubicBezierCurve:Dg,CubicBezierCurve3:Ug,EllipseCurve:Bc,LineCurve:Ig,LineCurve3:Ng,QuadraticBezierCurve:Og,QuadraticBezierCurve3:ps,SplineCurve:Fg});class _i extends Tt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],p=[];let _=0;const y=[],m=i/2;let f=0;E(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ft(d,3)),this.setAttribute("normal",new ft(u,3)),this.setAttribute("uv",new ft(p,2));function E(){const C=new w,D=new w;let A=0;const L=(t-e)/i;for(let z=0;z<=r;z++){const M=[],x=z/r,F=x*(t-e)+e;for(let j=0;j<=s;j++){const he=j/s,I=he*l+o,H=Math.sin(I),B=Math.cos(I);D.x=F*H,D.y=-x*i+m,D.z=F*B,d.push(D.x,D.y,D.z),C.set(H,L,B).normalize(),u.push(C.x,C.y,C.z),p.push(he,1-x),M.push(_++)}y.push(M)}for(let z=0;z<s;z++)for(let M=0;M<r;M++){const x=y[M][z],F=y[M+1][z],j=y[M+1][z+1],he=y[M][z+1];h.push(x,F,he),h.push(F,j,he),A+=6}c.addGroup(f,A,0),f+=A}function v(C){const D=_,A=new xe,L=new w;let z=0;const M=C===!0?e:t,x=C===!0?1:-1;for(let j=1;j<=s;j++)d.push(0,m*x,0),u.push(0,x,0),p.push(.5,.5),_++;const F=_;for(let j=0;j<=s;j++){const I=j/s*l+o,H=Math.cos(I),B=Math.sin(I);L.x=M*B,L.y=m*x,L.z=M*H,d.push(L.x,L.y,L.z),u.push(0,x,0),A.x=H*.5+.5,A.y=B*.5*x+.5,p.push(A.x,A.y),_++}for(let j=0;j<s;j++){const he=D+j,I=F+j;C===!0?h.push(I,I+1,he):h.push(I+1,I,he),z+=3}c.addGroup(f,z,C===!0?1:2),f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ja extends _i{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ja(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ka extends Tt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new ft(r,3)),this.setAttribute("normal",new ft(r.slice(),3)),this.setAttribute("uv",new ft(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(E){const v=new w,C=new w,D=new w;for(let A=0;A<t.length;A+=3)p(t[A+0],v),p(t[A+1],C),p(t[A+2],D),l(v,C,D,E)}function l(E,v,C,D){const A=D+1,L=[];for(let z=0;z<=A;z++){L[z]=[];const M=E.clone().lerp(C,z/A),x=v.clone().lerp(C,z/A),F=A-z;for(let j=0;j<=F;j++)j===0&&z===A?L[z][j]=M:L[z][j]=M.clone().lerp(x,j/F)}for(let z=0;z<A;z++)for(let M=0;M<2*(A-z)-1;M++){const x=Math.floor(M/2);M%2===0?(u(L[z][x+1]),u(L[z+1][x]),u(L[z][x])):(u(L[z][x+1]),u(L[z+1][x+1]),u(L[z+1][x]))}}function c(E){const v=new w;for(let C=0;C<r.length;C+=3)v.x=r[C+0],v.y=r[C+1],v.z=r[C+2],v.normalize().multiplyScalar(E),r[C+0]=v.x,r[C+1]=v.y,r[C+2]=v.z}function h(){const E=new w;for(let v=0;v<r.length;v+=3){E.x=r[v+0],E.y=r[v+1],E.z=r[v+2];const C=m(E)/2/Math.PI+.5,D=f(E)/Math.PI+.5;a.push(C,1-D)}_(),d()}function d(){for(let E=0;E<a.length;E+=6){const v=a[E+0],C=a[E+2],D=a[E+4],A=Math.max(v,C,D),L=Math.min(v,C,D);A>.9&&L<.1&&(v<.2&&(a[E+0]+=1),C<.2&&(a[E+2]+=1),D<.2&&(a[E+4]+=1))}}function u(E){r.push(E.x,E.y,E.z)}function p(E,v){const C=E*3;v.x=e[C+0],v.y=e[C+1],v.z=e[C+2]}function _(){const E=new w,v=new w,C=new w,D=new w,A=new xe,L=new xe,z=new xe;for(let M=0,x=0;M<r.length;M+=9,x+=6){E.set(r[M+0],r[M+1],r[M+2]),v.set(r[M+3],r[M+4],r[M+5]),C.set(r[M+6],r[M+7],r[M+8]),A.set(a[x+0],a[x+1]),L.set(a[x+2],a[x+3]),z.set(a[x+4],a[x+5]),D.copy(E).add(v).add(C).divideScalar(3);const F=m(D);y(A,x+0,E,F),y(L,x+2,v,F),y(z,x+4,C,F)}}function y(E,v,C,D){D<0&&E.x===1&&(a[v]=E.x-1),C.x===0&&C.z===0&&(a[v]=D/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function f(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ka(e.vertices,e.indices,e.radius,e.details)}}class Za extends Ka{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Za(e.radius,e.detail)}}class ms extends Tt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let d=e;const u=(t-e)/s,p=new w,_=new xe;for(let y=0;y<=s;y++){for(let m=0;m<=i;m++){const f=r+m/i*a;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),_.x=(p.x/t+1)/2,_.y=(p.y/t+1)/2,h.push(_.x,_.y)}d+=u}for(let y=0;y<s;y++){const m=y*(i+1);for(let f=0;f<i;f++){const E=f+m,v=E,C=E+i+1,D=E+i+2,A=E+1;o.push(v,C,A),o.push(C,D,A)}}this.setIndex(o),this.setAttribute("position",new ft(l,3)),this.setAttribute("normal",new ft(c,3)),this.setAttribute("uv",new ft(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ms(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class vn extends Tt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new w,u=new w,p=[],_=[],y=[],m=[];for(let f=0;f<=i;f++){const E=[],v=f/i;let C=0;f===0&&a===0?C=.5/t:f===i&&l===Math.PI&&(C=-.5/t);for(let D=0;D<=t;D++){const A=D/t;d.x=-e*Math.cos(s+A*r)*Math.sin(a+v*o),d.y=e*Math.cos(a+v*o),d.z=e*Math.sin(s+A*r)*Math.sin(a+v*o),_.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),m.push(A+C,1-v),E.push(c++)}h.push(E)}for(let f=0;f<i;f++)for(let E=0;E<t;E++){const v=h[f][E+1],C=h[f][E],D=h[f+1][E],A=h[f+1][E+1];(f!==0||a>0)&&p.push(v,C,A),(f!==i-1||l<Math.PI)&&p.push(C,D,A)}this.setIndex(p),this.setAttribute("position",new ft(_,3)),this.setAttribute("normal",new ft(y,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Rr extends Tt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new w,d=new w,u=new w;for(let p=0;p<=i;p++)for(let _=0;_<=s;_++){const y=_/s*r,m=p/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(y),d.y=(e+t*Math.cos(m))*Math.sin(y),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(_/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let _=1;_<=s;_++){const y=(s+1)*p+_-1,m=(s+1)*(p-1)+_-1,f=(s+1)*(p-1)+_,E=(s+1)*p+_;a.push(y,m,E),a.push(m,f,E)}this.setIndex(a),this.setAttribute("position",new ft(o,3)),this.setAttribute("normal",new ft(l,3)),this.setAttribute("uv",new ft(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class gs extends Tt{constructor(e=new ps(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new w,l=new w,c=new xe;let h=new w;const d=[],u=[],p=[],_=[];y(),this.setIndex(_),this.setAttribute("position",new ft(d,3)),this.setAttribute("normal",new ft(u,3)),this.setAttribute("uv",new ft(p,2));function y(){for(let v=0;v<t;v++)m(v);m(r===!1?t:0),E(),f()}function m(v){h=e.getPointAt(v/t,h);const C=a.normals[v],D=a.binormals[v];for(let A=0;A<=s;A++){const L=A/s*Math.PI*2,z=Math.sin(L),M=-Math.cos(L);l.x=M*C.x+z*D.x,l.y=M*C.y+z*D.y,l.z=M*C.z+z*D.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,d.push(o.x,o.y,o.z)}}function f(){for(let v=1;v<=t;v++)for(let C=1;C<=s;C++){const D=(s+1)*(v-1)+(C-1),A=(s+1)*v+(C-1),L=(s+1)*v+C,z=(s+1)*(v-1)+C;_.push(D,A,z),_.push(A,L,z)}}function E(){for(let v=0;v<=t;v++)for(let C=0;C<=s;C++)c.x=v/t,c.y=C/s,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new gs(new kg[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class _s extends Nn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ga,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Bg extends Nn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Fe(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ga,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Cr extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const ma=new Mt,zl=new w,Hl=new w;class Qa{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xa,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;zl.setFromMatrixPosition(e.matrixWorld),t.position.copy(zl),Hl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hl),t.updateMatrixWorld(),ma.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ma),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ma)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class zg extends Qa{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=gr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Hg extends Cr{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new zg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Gl=new Mt,cs=new w,ga=new w;class Gg extends Qa{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xe(4,2),this._viewportCount=6,this._viewports=[new yt(2,1,1,1),new yt(0,1,1,1),new yt(3,1,1,1),new yt(1,1,1,1),new yt(3,0,1,1),new yt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),cs.setFromMatrixPosition(e.matrixWorld),i.position.copy(cs),ga.copy(i.position),ga.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ga),i.updateMatrixWorld(),s.makeTranslation(-cs.x,-cs.y,-cs.z),Gl.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gl)}}class zi extends Cr{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Gg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Vg extends Qa{constructor(){super(new Cc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yr extends Cr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new Vg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class zc extends Cr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ka}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ka);function es(n){return Zt[n]??Zt.boar}let Xt=null;const Vl=new Map;function Wg(n,e,t){const i=document.createElement("canvas");i.width=256,i.height=256;const s=i.getContext("2d");if(!s)return new Ts(i);switch(n){case"cobra":case"eel":{s.fillStyle=e,s.fillRect(0,0,256,256),s.strokeStyle=t,s.lineWidth=3;const a=32;for(let o=-a;o<256+a;o+=a/2){const l=Math.floor(o/(a/2))%2*(a/2);for(let c=-a;c<256+a;c+=a)s.beginPath(),s.arc(c+l+a/2,o,a/2,0,Math.PI),s.stroke()}break}case"tiger":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle="#121212";for(let a=0;a<8;a++){const o=20+a*32+Math.random()*8;s.beginPath(),s.moveTo(0,o),s.quadraticCurveTo(80,o+15,120,o+5),s.quadraticCurveTo(80,o+25,0,o+30),s.closePath(),s.fill(),s.beginPath(),s.moveTo(256,o+10),s.quadraticCurveTo(176,o+25,136,o+15),s.quadraticCurveTo(176,o+35,256,o+40),s.closePath(),s.fill()}break}case"ant":case"scorpion":{s.fillStyle=e,s.fillRect(0,0,256,256);for(let a=0;a<256;a+=32){const o=s.createLinearGradient(0,a,0,a+32);o.addColorStop(0,t),o.addColorStop(.3,e),o.addColorStop(.7,e),o.addColorStop(1,t),s.fillStyle=o,s.fillRect(0,a,256,28)}break}case"eagle":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t;const a=24;for(let o=0;o<256+a;o+=a){const l=Math.floor(o/a)%2*20;for(let c=-20;c<276;c+=40)s.beginPath(),s.moveTo(c+l,o),s.lineTo(c+l+20,o+15),s.lineTo(c+l+40,o),s.lineTo(c+l+20,o-5),s.closePath(),s.fill()}break}case"boar":case"rhino":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t;for(let a=0;a<250;a++){const o=Math.random()*256,l=Math.random()*256,c=1.5+Math.random()*2.5;s.beginPath(),s.arc(o,l,c,0,Math.PI*2),s.fill()}break}case"wolf":case"bear":case"rabbit":{s.fillStyle=e,s.fillRect(0,0,256,256),s.strokeStyle=t,s.lineWidth=1.5;for(let a=0;a<350;a++){const o=Math.random()*256,l=Math.random()*256,c=4+Math.random()*7,h=Math.PI/4+(Math.random()-.5)*.3;s.beginPath(),s.moveTo(o,l),s.lineTo(o+Math.cos(h)*c,l+Math.sin(h)*c),s.stroke()}break}case"dragon":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t;for(let a=0;a<12;a++){const o=a%2*22;for(let l=0;l<8;l++){const c=l*44+o-22,h=a*24-12;s.beginPath(),s.moveTo(c+22,h),s.lineTo(c+44,h+16),s.lineTo(c+22,h+24),s.lineTo(c,h+16),s.closePath(),s.globalAlpha=.35,s.fill()}}s.globalAlpha=1;break}case"jellyfish":{s.fillStyle=e,s.fillRect(0,0,256,256);for(let a=0;a<6;a++){const o=20+a*36,l=s.createRadialGradient(128,128,o-12,128,128,o);l.addColorStop(0,t+"00"),l.addColorStop(.5,t+"55"),l.addColorStop(1,t+"00"),s.fillStyle=l,s.fillRect(0,0,256,256)}break}default:{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t,s.globalAlpha=.15;for(let a=0;a<100;a++){const o=Math.random()*256,l=Math.random()*256,c=2+Math.random()*4;s.beginPath(),s.arc(o,l,c,0,Math.PI*2),s.fill()}s.globalAlpha=1;break}}const r=new Ts(i);return r.wrapS=Ss,r.wrapT=Ss,r.repeat.set(2,2),r}function Xg(n,e,t){const i=`${n}_${e}_${t}`;let s=Vl.get(i);return s||(s=Wg(n,e,t),Vl.set(i,s)),s}function ci(n,e=.04){if(!n.geometry||n.getObjectByName("toon_outline"))return;const t=n.geometry.clone(),i=new It({color:new Fe(657940),side:Yt}),s=new Qe(t,i);s.name="toon_outline",t.computeBoundingSphere();const r=t.boundingSphere?t.boundingSphere.radius:1,a=Math.max(.05,r),o=1+e/a;s.scale.setScalar(o),n.add(s)}let _a=null;function qg(){if(!_a){const n=new Uint8Array([0,80,160,255]),e=new Sg(n,n.length,1,hc);e.minFilter=At,e.magFilter=At,e.needsUpdate=!0,_a=e}return _a}function hi(n,e={}){const t={color:new Fe(n),gradientMap:qg(),emissive:e.emissive?new Fe(e.emissive):new Fe(0),emissiveIntensity:e.emissiveI??0};if(Xt&&!e.noTexture){const i=es(Xt);t.map=Xg(Xt,n,i.accent||i.shade),t.color=new Fe(16777215)}return new Bg(t)}function Ge(n,e,t={}){const i=new Qe(new vn(n,22,18),hi(e,t));return t.noOutline||ci(i),i}function wt(n,e,t,i={}){const s=new Qe(new Ja(n,e,16),hi(t,i));return i.noOutline||ci(s),s}function nn(n,e,t,i,s={}){const r=new Qe(new _i(n,e,t,16),hi(i,s));return s.noOutline||ci(r),r}function Mr(){const n=document.createElement("canvas");n.width=64,n.height=64;const e=n.getContext("2d");if(e){const r=e.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(0, 0, 0, 0.75)"),r.addColorStop(.5,"rgba(0, 0, 0, 0.35)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=r,e.fillRect(0,0,64,64)}const t=new Ts(n),i=new It({map:t,transparent:!0,depthWrite:!1}),s=new Qe(new wr(1.6,1.6),i);return s.rotation.x=-Math.PI/2,s.position.y=.19,s.name="shadow",s}function Yg(n,e,t,i=.09){for(const s of[-1,1]){const r=Ge(i,"#ffffff",{noOutline:!0,noTexture:!0});r.name=`eye_${s===1?"r":"l"}`,r.position.set(s*.22,e,t),n.add(r);const a=Ge(i*.55,"#0a0a0a",{noOutline:!0,noTexture:!0});a.name=`pupil_${s===1?"r":"l"}`,a.position.set(s*.22,e,t+i*.7),n.add(a)}}function jg(n){const e=new Nt,t=es(n);if(n==="ant"){const i=Ge(.65,t.fill,{});i.scale.set(1,.9,1.2),i.position.set(0,0,.45),i.castShadow=!0,e.add(i);const s=nn(.12,.12,.4,t.shade,{});s.rotation.x=Math.PI/2,s.position.set(0,-.1,0),e.add(s);const r=Ge(.82,t.fill,{});r.scale.set(1,.85,1.55),r.position.set(0,-.1,-.65),r.castShadow=!0,e.add(r)}else if(n==="scorpion"){const i=Ge(.72,t.fill,{});i.scale.set(1.1,.75,.95),i.position.set(0,.05,.5),i.castShadow=!0,e.add(i);for(let s=0;s<4;s++){const r=Ge(.68-s*.05,s%2===0?t.fill:t.shade,{});r.scale.set(1.1-s*.04,.7-s*.03,.5),r.position.set(0,-.05-s*.02,.1-s*.32),r.castShadow=!0,e.add(r)}}else if(n==="crab"){const i=Ge(1.05,t.fill,{});i.scale.set(1.48,.56,1.24),i.castShadow=!0,e.add(i);for(const s of[-1,1]){const r=wt(.12,.45,t.accent,{});r.position.set(s*1.45,.1,-.1),r.rotation.z=-s*1.15,e.add(r)}}else if(n==="rhino"){const i=Ge(1.22,t.fill,{});i.scale.set(1.22,1.04,1.34),i.castShadow=!0,e.add(i);for(const s of[-1,1]){const r=Ge(.92,t.accent,{});r.scale.set(.18,.92,1.12),r.position.set(s*.74,.05,0),e.add(r)}}else if(n==="gorilla"){const i=Ge(1.26,t.fill,{});i.scale.set(1.28,1.18,1.18),i.castShadow=!0,e.add(i);const s=Ge(.88,"#b0b6c2",{});s.scale.set(1.04,.38,.86),s.position.set(0,.72,-.16),e.add(s)}else if(n==="eel"){const i=Ge(.82,t.fill,{});i.scale.set(.72,.72,1.84),i.castShadow=!0,e.add(i);const s=nn(.01,.14,2.1,t.accent,{emissive:t.accent,emissiveI:.65});s.position.set(0,.54,-.22),s.rotation.x=Math.PI/2+.08,e.add(s)}else if(n==="cobra"){const i=Ge(.84,t.fill,{});i.scale.set(.78,.78,1.62),i.castShadow=!0,e.add(i);const s=Ge(.68,t.accent,{});s.scale.set(.64,.32,1.38),s.position.set(0,-.42,.28),e.add(s)}else if(n==="tiger"){const i=Ge(1.02,t.fill,{});i.scale.set(1.05,.92,1.25),i.castShadow=!0,e.add(i);for(let s=-3;s<=3;s++){const r=nn(.02,.02,1.6,"#121212",{});r.position.set(-.95,0,s*.3),r.rotation.z=.25,e.add(r);const a=nn(.02,.02,1.6,"#121212",{});a.position.set(.95,0,s*.3),a.rotation.z=-.25,e.add(a)}}else{const i=Ge(1.02,t.fill);i.scale.set(1.05,.92,1.2),i.castShadow=!0,e.add(i);const s=Ge(.7,t.accent,{});s.scale.set(.88,.58,.98),s.position.set(0,-.44,.24),e.add(s)}return e}function $g(n){const e=new Nt;e.scale.setScalar(.82);const t=es(n),i=Ge(.62,t.fill);i.castShadow=!0,e.add(i);let s="#ffffff",r=.5;n==="eel"?(s="#39ff14",r=2):n==="gecko"?(s="#ffd700",r=2.2):(n==="cobra"||n==="scorpion")&&(s="#ff3b30",r=1.8),Yg(e,.12,.5,.09),e.children.forEach(c=>{if(c instanceof Qe&&c.position.z>.52&&r>1){const h=c.material;h.emissive&&(h.emissive.set(new Fe(s)),h.emissiveIntensity=r)}});const a=Ge(.22,t.fill);a.name="lower_jaw",a.scale.set(1,.4,1.25),a.position.set(0,-.28,.22),a.castShadow=!0,e.add(a);const o=(c,h,d,u=t.fill)=>{for(const p of[-1,1]){const _=wt(h,c,u);_.position.set(p*.32,.55,-.05),_.rotation.z=-p*d,e.add(_)}},l=(c,h=t.accent)=>{for(const d of[-1,1]){const u=wt(.1,c,h,{noTexture:!0});u.position.set(d*.3,.55,.2),u.rotation.z=-d*.4,e.add(u)}};switch(n){case"rabbit":{for(const c of[-1,1]){const h=c===1?"r":"l",d=nn(.14,.16,.35,t.fill);d.name=`ear_${h}_0`,d.position.set(c*.32,.55,-.05),d.rotation.z=-c*.05;const u=wt(.12,.35,t.fill);u.name=`ear_${h}_1`,u.position.set(0,.35,0),d.add(u),e.add(d)}break}case"wolf":o(.34,.2,.5);break;case"tiger":{o(.26,.22,.7);const c=Ge(.24,t.accent);c.position.set(0,-.15,.5),e.add(c);break}case"bear":{for(const c of[-1,1]){const h=Ge(.2,t.fill);h.position.set(c*.4,.5,-.1),e.add(h)}break}case"boar":{for(const h of[-1,1]){const d=wt(.06,.4,"#e8e0c0",{noTexture:!0});d.position.set(h*.18,.12,.3),d.rotation.set(.6,0,h*.3),a.add(d)}const c=Ge(.32,t.shade);c.scale.set(1,.8,.9),c.position.set(0,-.1,.55),e.add(c);break}case"rhino":{const c=wt(.16,.7,t.accent,{noTexture:!0});c.position.set(0,.05,.7),c.rotation.x=1.35,e.add(c);const h=wt(.1,.34,t.accent,{noTexture:!0});h.position.set(0,.32,.52),h.rotation.x=1.25,e.add(h);break}case"eagle":{const c=wt(.18,.5,"#f0b020",{noTexture:!0});c.position.set(0,-.05,.62),c.rotation.x=1.4,e.add(c);for(let h=-1;h<=1;h++){const d=wt(.04,.3,t.accent);d.position.set(h*.14,.58,-.18),d.rotation.set(-.4,0,h*.2),e.add(d)}break}case"cobra":{const c=Ge(.55,t.fill);c.scale.set(1.5,1.4,.3),c.position.set(0,.1,-.2),e.add(c);for(const h of[-1,1]){const d=wt(.04,.22,"#ffffff",{noTexture:!0});d.position.set(h*.15,-.22,.52),d.rotation.x=-.2,e.add(d)}break}case"ant":case"scorpion":{for(const c of[-1,1]){const h=nn(.03,.05,.4,t.shade,{noTexture:!0});h.position.set(c*.18,-.25,.5),h.rotation.x=1.1,e.add(h)}if(n==="ant")for(const c of[-1,1]){const h=nn(.02,.02,.5,t.accent,{noTexture:!0});h.position.set(c*.18,.6,.2),h.rotation.z=-c*.4,e.add(h)}break}case"gorilla":case"gecko":l(1e-4);break;case"eel":{const c=wt(.12,.4,t.accent,{emissive:t.accent,emissiveI:.4,noTexture:!0});c.position.set(0,.6,-.1),e.add(c);break}case"dragon":{for(const u of[-1,1]){const p=wt(.1,.55,t.accent,{noTexture:!0});p.position.set(u*.32,.62,-.1),p.rotation.set(-.15,0,u*.45),e.add(p)}const c=Ge(.35,t.shade);c.scale.set(1,.75,1.1),c.position.set(0,-.08,.52),e.add(c);const h=new It({color:16732192}),d=new Qe(new vn(.18,8,8),h);d.position.set(0,-.32,.38),e.add(d);break}case"jellyfish":{const c=Ge(.62,t.fill);c.scale.set(1.2,.7,1.2);const h=c.material;h.transparent=!0,h.opacity=.72,c.position.set(0,.2,0),e.add(c);for(let d=0;d<5;d++){const u=d/5*Math.PI*2,p=nn(.03,.02,.5,t.accent,{emissive:t.accent,emissiveI:.6,noTexture:!0});p.position.set(Math.cos(u)*.28,-.5,Math.sin(u)*.28),e.add(p)}break}default:o(.3,.16,.4)}return e}function Wl(n,e){const t=new Nt,i=es(n),s=e?.45:-.5,r=e?1.15:1.25;if(e&&n==="eagle"){for(const a of[-1,1]){const o=new Nt;o.name=`wing_${a===1?"r":"l"}`;const l=new Tt,c=new Float32Array([0,0,0,a*2.2,1.2,-.4,a*1.8,0,-1.2,a*.9,-.2,-.8]),h=[0,1,2,0,2,3];l.setAttribute("position",new rn(c,3)),l.setIndex(h),l.computeVertexNormals();const d=new Qe(l,hi(i.fill,{}));d.material.side=Kt,d.castShadow=!0,o.add(d),ci(d),o.position.set(a*.65,.2,-.15),t.add(o)}return t}if(e&&n==="crab"){for(const a of[-1,1]){const o=new Nt,l=nn(.14,.18,.8,i.fill,{});l.rotation.z=a*.45,l.position.set(a*.65,-.3,s),l.castShadow=!0,o.add(l);const c=Ge(.38,i.accent,{});c.position.set(a*.95,-.55,s+.15),c.scale.set(1.2,.85,1.05),c.castShadow=!0,o.add(c);const h=wt(.08,.36,i.accent,{noTexture:!0});h.position.set(a*1.15,-.65,s+.36),h.rotation.set(.4,0,-a*.5),o.add(h);const d=wt(.06,.3,i.shade,{noTexture:!0});d.position.set(a*.95,-.72,s+.3),d.rotation.set(.6,0,a*.2),o.add(d),t.add(o)}return t}if(e&&n==="scorpion"){for(const a of[-1,1]){const o=new Nt,l=nn(.1,.13,.9,i.fill,{});l.rotation.z=a*.5,l.position.set(a*.7,-.3,s),l.castShadow=!0,o.add(l);const c=Ge(.28,i.accent,{});c.position.set(a*1,-.65,s+.25),c.scale.set(1,.7,1.25),o.add(c);const h=wt(.06,.3,i.accent,{noTexture:!0});h.position.set(a*1.1,-.75,s+.42),h.rotation.set(.3,0,-a*.3),o.add(h);const d=wt(.05,.24,i.shade,{noTexture:!0});d.position.set(a*.9,-.8,s+.38),d.rotation.set(.5,0,a*.1),o.add(d),t.add(o)}return t}if(["ant","scorpion"].includes(n)){for(const a of[-1,1]){const o=new Nt,l=Ge(.13,i.shade,{});l.position.set(a*.52,-.4,s),o.add(l);const c=nn(.09,.09,.32,i.shade,{});c.position.set(a*.52,-.4,s),c.rotation.z=a*.82,c.castShadow=!0,o.add(c);const h=Ge(.11,i.fill,{});h.position.set(a*.76,-.72,s+.08),o.add(h);const d=nn(.065,.065,.82,i.fill,{});d.position.set(a*.76,-.72,s+.08),d.rotation.z=a*.42,d.castShadow=!0,o.add(d);const u=Ge(.08,i.shade,{});u.position.set(a*.92,-1.22,s+.16),o.add(u);const p=nn(.045,.032,.92,i.shade,{});p.position.set(a*.92,-1.22,s+.16),p.rotation.z=-a*.58,p.castShadow=!0,o.add(p),t.add(o)}return t}if(!e&&n==="rabbit"){for(const a of[-1,1]){const o=new Nt,l=Ge(.36,i.fill,{});l.scale.set(.9,1.25,.9),l.position.set(a*.56,-.22,s),l.castShadow=!0,o.add(l);const c=new w(a*.56,-.42,s),h=new w(a*.76,-.72,s-.15),d=new w(a*.56,-.92,s+.15),u=new ps(c,h,d),p=new gs(u,10,.12,8,!1),_=new Qe(p,hi(i.fill,{}));_.castShadow=!0,o.add(_),ci(_);const y=Ge(.14,i.fill,{});y.position.copy(h),o.add(y);const m=Ge(.18,i.shade,{});m.scale.set(.8,.38,1.45),m.position.copy(d),m.castShadow=!0,o.add(m),t.add(o)}return t}if(e&&n==="gorilla"){for(const a of[-1,1]){const o=new Nt,l=Ge(.35,i.shade,{});l.position.set(a*.64,0,s+.08),o.add(l);const c=new w(a*.64,0,s+.08),h=new w(a*.92,-.65,s+.2),d=new w(a*.68,-1.3,s+.24),u=new ps(c,h,d),p=new gs(u,12,.25,8,!1),_=new Qe(p,hi(i.fill,{}));_.castShadow=!0,o.add(_),ci(_);const y=Ge(.24,i.fill,{});y.position.copy(h),o.add(y);const m=Ge(.38,i.shade,{});m.position.copy(d),m.castShadow=!0,o.add(m),t.add(o)}return t}for(const a of[-1,1]){const o=new Nt,l=Ge(.22,i.shade,{});l.position.set(a*.55,0,s),o.add(l);const c=new w(a*.55,0,s),h=new w(a*.8,-r*.45,s+(e?.15:-.15)),d=new w(a*.55,-r*.9,s+(e?.1:0)),u=new ps(c,h,d),p=new gs(u,12,.16,8,!1),_=new Qe(p,hi(i.fill,{}));_.castShadow=!0,o.add(_),ci(_);const y=Ge(.16,i.fill,{});y.position.copy(h),o.add(y);const m=Ge(.2,i.shade);if(m.scale.set(1,.7,1.3),m.position.copy(d),m.castShadow=!0,o.add(m),e&&["bear","tiger","gorilla","crab","scorpion"].includes(n))for(const f of[-1,0,1]){const E=wt(.04,.18,i.accent,{noTexture:!0});E.position.set(d.x+f*.07,d.y-.05,d.z+.28),E.rotation.x=1.2,E.castShadow=!0,o.add(E)}t.add(o)}return t}function Jg(n){const e=new Nt;e.name="tail";const t=es(n);if(n==="eagle"){for(let r=-2;r<=2;r++){const a=Ge(.14,t.fill,{});a.scale.set(.6,.04,1.42),a.position.set(r*.13,.08,-1.22),a.rotation.set(-.24,r*.11,0),a.castShadow=!0,e.add(a)}return e}if(n==="rabbit"){const r=Ge(.24,t.accent,{});return r.position.set(0,.22,-.92),r.castShadow=!0,e.add(r),e}let i=e;const s=n==="scorpion"||n==="cobra"||n==="tiger"?8:6;for(let r=0;r<s;r++){const a=r/(s-1),o=new Nt;o.name=`tail_seg_${r}`,r===0?o.position.set(0,.1,-.9):n==="scorpion"?o.position.set(0,1.45/s,-1.22/s):n==="cobra"?o.position.set(0,-.45/s,-1.35/s):n==="tiger"?o.position.set(0,-.2/s,-1.38/s):o.position.set(0,.25/s,-1.1/s);let l;if(n==="scorpion"){const c=.24*(1-a*.44);l=Ge(c,r%2===0?t.fill:t.shade,{})}else n==="cobra"?l=Ge(.24*(1-a*.72),t.fill):n==="tiger"?l=Ge(.18*(1-a*.42),r%2===0?t.fill:"#0d0d0d"):l=Ge(.26*(1-a*.7),t.fill);if(l.castShadow=!0,o.add(l),r===s-1){if(n==="scorpion"){const c=Ge(.18,t.accent,{emissive:t.accent,emissiveI:.55});c.position.set(0,.14,.14),o.add(c);const h=wt(.04,.24,"#0f0f0f",{});h.rotation.x=-1.25,h.position.set(0,.24,.24),o.add(h)}else if(n==="cobra"){const c=wt(.12,.34,t.accent,{});c.rotation.x=-.6,c.position.set(0,.2,-.4),o.add(c)}else if(n==="eel"||n==="default"){const c=wt(.25,.5,t.accent,{emissive:t.accent,emissiveI:.5});c.rotation.x=-1.4,c.position.set(0,.1,-.4),o.add(c)}}i.add(o),i=o}return e}function xs(n){const e=new Nt,t={body:r=>r.position.set(0,1.4,0),head:r=>r.position.set(0,2.15,.95),forelimbs:r=>r.position.set(0,1.4,0),hindlimbs:r=>r.position.set(0,1.4,0),tail:r=>r.position.set(0,1.3,-.3)},i={body:()=>{Xt=n.body;const r=jg(n.body);return Xt=null,r},head:()=>{Xt=n.head;const r=$g(n.head);return Xt=null,r},forelimbs:()=>{Xt=n.forelimbs;const r=Wl(n.forelimbs,!0);return Xt=null,r},hindlimbs:()=>{Xt=n.hindlimbs;const r=Wl(n.hindlimbs,!1);return Xt=null,r},tail:()=>{Xt=n.tail;const r=Jg(n.tail);return Xt=null,r}};for(const r of Jn){const a=i[r]();t[r](a),a.name=r,e.add(a)}Xt=n.body;const s=Ge(.4,es(n.body).fill);if(Xt=null,s.name="neck",s.scale.set(.8,.9,.8),s.position.set(0,1.85,.55),e.add(s),n.head==="eel"||n.body==="eel"){const r=new zi(65535,1.3,7);r.position.set(0,1.6,.4),e.add(r)}if(n.head==="cobra"||n.head==="scorpion"||n.tail==="scorpion"){const r=new zi(3800852,1.1,6);r.position.set(0,1.8,.8),e.add(r)}if(n.head==="eagle"||n.head==="tiger"||n.body==="tiger"){const r=new zi(16768358,.9,6);r.position.set(0,1.7,.6),e.add(r)}if(n.body==="rhino"||n.body==="bear"||n.body==="gorilla"){const r=new zi(16729105,.8,5);r.position.set(0,1.1,-.2),e.add(r)}if(n.head==="dragon"||n.body==="dragon"){const r=new zi(16732176,1.5,8);r.position.set(0,1.6,.5),e.add(r)}if(n.head==="jellyfish"||n.body==="jellyfish"){const r=new zi(9453823,1.2,7);r.position.set(0,1.7,.3),e.add(r)}return e}function Kg(n,e,t=220){const i=new Ya({antialias:!0,alpha:!0});i.setSize(t,t),i.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),i.shadowMap.enabled=!0,i.shadowMap.type=Ba,i.toneMapping=za,i.toneMappingExposure=1.25,n.appendChild(i.domElement);const s=new Oc,r=new qt(40,1,.1,100);r.position.set(0,2.2,7.2),r.lookAt(0,1.6,0),s.add(new zc(6715306,.7));const a=new yr(16773597,1.25);a.position.set(-4,6,5),a.castShadow=!0,a.shadow.mapSize.width=1024,a.shadow.mapSize.height=1024,a.shadow.bias=-.001,s.add(a);const o=new yr(10185983,.7);o.position.set(5,2,-4),s.add(o);const l=new _i(1.6,1.8,.25,32),c=new _s({color:2042167,roughness:.2,metalness:.8}),h=new Qe(l,c);h.position.y=.05,h.receiveShadow=!0,s.add(h);const d=new Rr(1.6,.06,16,64),u=new _s({color:10185983,emissive:10185983,emissiveIntensity:1.5,roughness:.1}),p=new Qe(d,u);p.rotation.x=Math.PI/2,p.position.y=.18,s.add(p);const _=40,y=new Tt,m=new Float32Array(_*3),f=[],E=[];for(let G=0;G<_;G++){const le=Math.random()*Math.PI*2,ge=.2+Math.random()*1.3;m[G*3]=Math.cos(le)*ge,m[G*3+1]=Math.random()*3.5,m[G*3+2]=Math.sin(le)*ge,f.push(.008+Math.random()*.015),E.push(Math.random()*Math.PI*2)}y.setAttribute("position",new rn(m,3));const v=new kc({color:10185983,size:.08,transparent:!0,opacity:.6}),C=new bg(y,v);s.add(C);let D=e,A=xs(e);s.add(A);const L=Mr();s.add(L);let z=!1,M={x:0,y:0},x={x:0,y:.3};n.style.cursor="grab";const F=G=>{z=!0,M={x:G.clientX,y:G.clientY},n.style.cursor="grabbing"},j=G=>{if(!z)return;const le={x:G.clientX-M.x,y:G.clientY-M.y};x.y+=le.x*.01,x.x+=le.y*.01,x.x=Math.max(-.6,Math.min(.6,x.x)),M={x:G.clientX,y:G.clientY}},he=()=>{z=!1,n.style.cursor="grab"},I=G=>{G.touches.length===1&&(z=!0,M={x:G.touches[0].clientX,y:G.touches[0].clientY})},H=G=>{if(!z||G.touches.length!==1)return;const le={x:G.touches[0].clientX-M.x,y:G.touches[0].clientY-M.y};x.y+=le.x*.01,x.x+=le.y*.01,x.x=Math.max(-.6,Math.min(.6,x.x)),M={x:G.touches[0].clientX,y:G.touches[0].clientY}};let B={x:0,y:0};const ee=G=>{const le=n.getBoundingClientRect();if(le.width===0||le.height===0)return;const ge=le.left+le.width/2,Se=le.top+le.height/2;B.x=(G.clientX-ge)/(le.width*2),B.y=(G.clientY-Se)/(le.height*2),B.x=Math.max(-1,Math.min(1,B.x)),B.y=Math.max(-1,Math.min(1,B.y))};n.addEventListener("mousedown",F),window.addEventListener("mousemove",j),window.addEventListener("mouseup",he),n.addEventListener("touchstart",I),window.addEventListener("touchmove",H),window.addEventListener("touchend",he),window.addEventListener("mousemove",ee);let Z=0,X=0,te=0,Q=!1;function ye(){if(Q)return;X+=.016,z||(x.y+=.005),A.rotation.y=x.y,A.rotation.x=x.x;const G=A.getObjectByName("body"),le=A.getObjectByName("neck"),ge=A.getObjectByName("head"),Se=A.getObjectByName("forelimbs"),Me=A.getObjectByName("hindlimbs"),He=D.forelimbs==="eagle"||D.body==="eagle"||D.body==="dragon",be=D.body==="cobra"||D.body==="eel"||D.body==="jellyfish",ke=["bear","rhino","gorilla","boar"].includes(D.body),V=["ant","scorpion","crab"].includes(D.body);if(He){if(A.position.y=Math.sin(X*2.2)*.15+.35,A.position.x=0,G){const K=Math.sin(X*3)*.015;G.scale.set(1.04+K,.94-K,1.18+K),G.rotation.x=.12+Math.sin(X*2.2)*.04,G.rotation.y=0}Se&&(Se.rotation.x=.25),Me&&(Me.rotation.x=.4)}else if(be)A.position.y=Math.sin(X*1.8)*.03+.1,A.position.x=0,G&&(G.rotation.y=Math.sin(X*2.2)*.12,G.rotation.x=Math.cos(X*1.8)*.05,G.scale.set(1.05,.92,1.2)),le&&(le.rotation.y=-Math.sin(X*2.2)*.08);else if(ke){if(A.position.y=.05,G){const K=Math.sin(X*1.2)*.035;G.scale.set(1.1+K,.88-K,1.25+K),G.rotation.x=0,G.rotation.y=Math.sin(X*.8)*.04}A.position.x=Math.sin(X*.8)*.05}else if(V){if(A.position.y=.02+Math.sin(X*4.5)*.01,A.position.x=0,G){const ce=Math.sin(X*4)*.018;G.scale.set(1.03+ce,.94-ce,1.2+ce),G.rotation.x=.02,G.rotation.y=0}const K=Math.sin(X*15)*.02;Se&&(Se.rotation.z=K),Me&&(Me.rotation.z=-K)}else if(A.position.y=Math.sin(X*1.4)*.04+.1,A.position.x=0,G){const K=Math.sin(X*2.5)*.02;G.scale.set(1.05+K,.92-K,1.2+K),G.rotation.set(0,0,0)}if(ge){const K=B.x*.6;let ce=B.y*.4+Math.sin(X*1.2)*.03;if(He)ce-=.08;else if(be){const Re=-Math.sin(X*2.2)*.08;ge.rotation.y+=(K+Re-ge.rotation.y)*.1,ge.rotation.x+=(ce-ge.rotation.x)*.1}else if(V){const Re=(Math.sin(X*12)+Math.cos(X*19))*.018;ge.rotation.y+=(K+Re*1.5-ge.rotation.y)*.12,ge.rotation.x+=(ce+Re-ge.rotation.x)*.12}!be&&!V&&(ge.rotation.y+=(K-ge.rotation.y)*.1,ge.rotation.x+=(ce-ge.rotation.x)*.1)}const St=A.getObjectByName("ear_l_0"),Ne=A.getObjectByName("ear_l_1"),Le=A.getObjectByName("ear_r_0"),Ee=A.getObjectByName("ear_r_1");if(St&&Le){const K=Math.sin(X*4)*.08,ce=Math.cos(X*3)*.05;St.rotation.x=K,St.rotation.z=-.05+ce,Ne&&(Ne.rotation.x=K*1.5,Ne.rotation.z=ce*.8),Le.rotation.x=K,Le.rotation.z=.05-ce,Ee&&(Ee.rotation.x=K*1.5,Ee.rotation.z=-ce*.8)}const rt=A.getObjectByName("lower_jaw");if(rt){const K=Math.max(0,Math.sin(X*1.5)*.08);rt.rotation.x=K}Math.random()<.008&&te===0&&(te=10);let ze=1;te>0&&(te--,te>5?ze=.1+(te-5)*.18:ze=.1+(5-te)*.18);for(const K of["_r","_l"]){const ce=A.getObjectByName(`eye${K}`),Re=A.getObjectByName(`pupil${K}`);ce&&(ce.scale.y=ze),Re&&(Re.scale.y=ze)}const R=be?4.5:ke?2:3.2,b=be?.32:ke?.08:.15;for(let K=0;K<8;K++){const ce=A.getObjectByName(`tail_seg_${K}`);ce&&(ce.rotation.y=Math.sin(X*R-K*.32)*b)}const W=A.getObjectByName("tail");W&&!A.getObjectByName("tail_seg_0")&&(W.rotation.y=Math.sin(X*3.2)*.15);const oe=A.getObjectByName("wing_r"),ae=A.getObjectByName("wing_l");if(oe&&ae){const K=Math.sin(X*(He?10:5))*(He?.45:.25);oe.rotation.z=K,ae.rotation.z=-K}const se=C.geometry.attributes.position;for(let K=0;K<_;K++){let ce=se.getY(K)+f[K];ce>3.5&&(ce=.2),se.setY(K,ce);const Re=E[K]+X;let qe=se.getX(K)+Math.sin(Re)*.003,ne=se.getZ(K)+Math.cos(Re)*.003;se.setX(K,qe),se.setZ(K,ne)}se.needsUpdate=!0;const we=s.getObjectByName("shadow");if(we){const K=A.position.y,ce=Math.max(.2,1.2-K*.8);we.scale.set(ce,ce,1),we.material.opacity=Math.max(.1,.55-K*.65)}i.render(s,r),Z=requestAnimationFrame(ye)}ye();function J(G){G.traverse(le=>{const ge=le;ge.geometry&&ge.geometry.dispose();const Se=ge.material;Array.isArray(Se)?Se.forEach(Me=>Me.dispose()):Se&&Se.dispose()})}return{setGenome(G){D=G,s.remove(A),J(A),A=xs(G),s.add(A)},dispose(){Q=!0,cancelAnimationFrame(Z),J(A),h.geometry.dispose(),c.dispose(),d.dispose(),u.dispose(),y.dispose(),v.dispose(),L.geometry.dispose(),L.material.dispose(),n.removeEventListener("mousedown",F),window.removeEventListener("mousemove",j),window.removeEventListener("mouseup",he),n.removeEventListener("touchstart",I),window.removeEventListener("touchmove",H),window.removeEventListener("touchend",he),window.removeEventListener("mousemove",ee),i.dispose(),i.domElement.remove()}}}const Zg=Object.freeze(Object.defineProperty({__proto__:null,buildCreatureModel:xs,createSoftShadowMesh:Mr,mountCreature3D:Kg},Symbol.toStringTag,{value:"Module"})),cn=960,_n=420,Pn=300;function Qg(n,e,t,i=1){const s=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches??!1,r=i===0||s;if(r)return setTimeout(()=>t(e.winner),20),()=>{};let a=null,o=!1,l=null,c=null,h=null,d=null,u=null,p=null,_=null,y=null,m=null,f=null,E=0,v=null,C=null,D=null,A=null;const L=[],z=[],M=[],x=[];let F=null,j=null;const he=e.events.filter(S=>S.kind==="start"),I=he.find(S=>S.side==="a"),H=he.find(S=>S.side==="b"),B={a:Xl("a",I,250),b:Xl("b",H,cn-250)},ee=[],Z=[],X=[],te=[];let Q=0;const ye=[...e.events].sort((S,N)=>S.t-N.t);let J=0,G=0;const le=ql(Math.round(ql(e.ticks,450,950)/i),1,2400),ge=e.ticks/le;let Se=0,Me=0,He=!1,be={active:!1,casterSide:"a",timer:0,duration:0,ability:"",value:0};const ke=60;try{l=new Ya({canvas:n,antialias:!0,alpha:!1}),l.setSize(cn,_n),l.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),l.shadowMap.enabled=!0,l.shadowMap.type=Ba,l.toneMapping=za,l.toneMappingExposure=1.25,c=new Oc,c.background=new Fe(923440),c.fog=new ja(923440,.012),h=new qt(38,cn/_n,.1,100),h.position.set(0,14,22),h.lookAt(0,1.2,0),v=new zc(4478344,.9),c.add(v),C=new yr(16772565,1.5),C.position.set(-6,12,8),C.castShadow=!0,C.shadow.mapSize.width=1024,C.shadow.mapSize.height=1024,c.add(C),D=new yr(10185983,.8),D.position.set(6,4,-6),c.add(D),A=new Hg(16777215,0,18,Math.PI/4,.5,1),A.position.set(0,10,0),A.castShadow=!0,c.add(A);const S=3,N=new _i(.3,1.2,14,16,1,!0),P=new It({color:8037119,transparent:!0,opacity:.12,blending:xa,side:Kt,depthWrite:!1});for(let ue=0;ue<S;ue++){const Ce=new Qe(N,P);Ce.position.set(-6+ue*6+(Math.random()-.5)*2,7,-3+(Math.random()-.5)*2),Ce.rotation.z=(Math.random()-.5)*.15,Ce.rotation.x=(Math.random()-.5)*.15,Ce.name=`light_ray_${ue}`,c.add(Ce)}u=new Nt;const g=new _i(10,10.5,.8,64);_=new _s({color:1450559,metalness:.8,roughness:.3}),p=new Qe(g,_),p.position.y=-.4,p.receiveShadow=!0,u.add(p),y=new Rr(10.2,.1,16,64),m=new _s({color:8037119,emissive:8037119,emissiveIntensity:1.2});const O=new Qe(y,m);O.rotation.x=Math.PI/2,O.position.y=.01,u.add(O),c.add(u);const ie=Mr(),ve=Mr();c.add(ie),c.add(ve),d={a:{model:xs(I.genome),shadow:ie,basePos:new w(-4,0,.5),shake:0,lunge:0,dodgeOffset:0,flash:0,time:0,actionState:"idle",actionTimer:0,actionDuration:0,dodgeDir:0,blinkTimer:0,deathTimer:0,actionTimerAccumulator:0,vocalTimer:Math.floor(Math.random()*300+200)},b:{model:xs(H.genome),shadow:ve,basePos:new w(4,0,-.5),shake:0,lunge:0,dodgeOffset:0,flash:0,time:Math.PI,actionState:"idle",actionTimer:0,actionDuration:0,dodgeDir:0,blinkTimer:0,deathTimer:0,actionTimerAccumulator:0,vocalTimer:Math.floor(Math.random()*300+350)}},d.a.model.position.copy(d.a.basePos),d.a.model.rotation.y=Math.PI/2-.4,c.add(d.a.model),d.b.model.position.copy(d.b.basePos),d.b.model.rotation.y=-Math.PI/2+.4,c.add(d.b.model),F=document.createElement("div"),F.className="arena-hud-overlay",F.style.position="absolute",F.style.top="20px",F.style.left="0",F.style.right="0",F.style.pointerEvents="none",F.style.display="flex",F.style.justifyContent="space-between",F.style.padding="0 40px",F.style.fontFamily="Inter, system-ui, sans-serif",F.innerHTML=`
      <div class="hud-bar player-hud" style="background: rgba(12,18,34,0.85); border: 1px solid rgba(122,162,255,0.25); border-radius: 12px; padding: 12px 20px; width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); backdrop-filter: blur(8px);">
        <div class="hud-name" style="font-weight: 700; font-size: 15px; color: #e7ecf7; margin-bottom: 6px;">${I.name}</div>
        <div class="hud-hp-bg" style="background: #0c1222; border-radius: 9px; height: 18px; overflow: hidden; width: 100%;">
          <div class="hud-hp-fill" style="background: linear-gradient(90deg, #36c08a, #6ce5b1); height: 100%; width: 100%; transition: width 0.2s ease;"></div>
        </div>
        <div class="hud-text" style="font-size: 12px; color: #93a0bd; margin-top: 4px; text-align: right;">${I.maxHp}/${I.maxHp}</div>
      </div>
      <div class="hud-bar opponent-hud" style="background: rgba(12,18,34,0.85); border: 1px solid rgba(122,162,255,0.25); border-radius: 12px; padding: 12px 20px; width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); backdrop-filter: blur(8px);">
        <div class="hud-name" style="font-weight: 700; font-size: 15px; color: #e7ecf7; margin-bottom: 6px; text-align: right;">${H.name}</div>
        <div class="hud-hp-bg" style="background: #0c1222; border-radius: 9px; height: 18px; overflow: hidden; width: 100%;">
          <div class="hud-hp-fill" style="background: linear-gradient(90deg, #36c08a, #6ce5b1); height: 100%; width: 100%; transition: width 0.2s ease;"></div>
        </div>
        <div class="hud-text" style="font-size: 12px; color: #93a0bd; margin-top: 4px; text-align: left;">${H.maxHp}/${H.maxHp}</div>
      </div>
    `,n.parentElement?.style.setProperty("position","relative"),n.parentElement?.appendChild(F),j=document.createElement("canvas"),j.width=cn,j.height=_n,j.style.position="absolute",j.style.top="0",j.style.left="0",j.style.pointerEvents="none",j.style.display="none",n.parentElement?.appendChild(j),o=!0}catch(S){if(console.warn("WebGL not supported, falling back to 2D canvas:",S),o=!1,a=n.getContext("2d"),a){const N=Math.min(window.devicePixelRatio||1,3);n.width=Math.round(cn*N),n.height=Math.round(_n*N),a.scale(N,N)}}function V(){Me++;let S=1;if(o&&E>0&&(E--,S=.28),!(o&&be.active))for(G+=ge*S;J<ye.length&&ye[J].t<=G;)We(ye[J]),J++;if(o&&d&&l&&c&&h){for(const P of["a","b"])B[P].displayHp+=(B[P].targetHp-B[P].displayHp)*.25;if(Me<ke){const P=Me/ke,g=P*(2-P);h.position.set(0,14-g*6.5,22-g*7.5),h.lookAt(0,1.2,0),j&&(j.style.display="none")}else if(be.active){be.timer++;const P=be.timer/be.duration,g=d[be.casterSide],O=g.basePos.clone().add(new w(be.casterSide==="a"?2.5:-2.5,2.2,5)),ie=g.basePos.clone().add(new w(0,1.4,0));if(h.position.lerp(O,.12),h.lookAt(new w(0,1.2,0).lerp(ie,.5)),j&&(j.style.display="block",we(j)),A.target=g.model,v.intensity=.9*(1-Math.sin(P*Math.PI)*.85),C.intensity=1.5*(1-Math.sin(P*Math.PI)*.9),D.intensity=.8*(1-Math.sin(P*Math.PI)*.8),A.intensity=Math.sin(P*Math.PI)*4.5,be.timer%3===0&&P<.8){const ve=be.ability==="spit"?"#39ff14":be.ability==="shock"?"#c39bff":be.ability==="leech"?"#ff3b30":"#ffae19";K(g.model.position,ve)}be.timer>=be.duration&&(be.active=!1,be.onComplete&&be.onComplete(),A.intensity=0)}else{j&&(j.style.display="none");const P=new w(0,7.5,14.5),g=new w(0,1.2,0),O=d.a.actionState,ie=d.b.actionState;if(O==="windup"||O==="strike"?(P.add(new w(.8,-.4,-.6)),g.add(new w(.5,0,0))):(ie==="windup"||ie==="strike")&&(P.add(new w(-.8,-.4,-.6)),g.add(new w(-.5,0,0))),h.position.lerp(P,.08),h.lookAt(g),v.intensity+=(.9-v.intensity)*.1,C.intensity+=(1.5-C.intensity)*.1,D.intensity+=(.8-D.intensity)*.1,A.intensity+=(0-A.intensity)*.1,Q>.01){Q*=.85;const ve=(Math.random()-.5)*Q,ue=(Math.random()-.5)*Q*.5;h.position.add(new w(ve,ue,0))}}for(let P=z.length-1;P>=0;P--){const g=z[P];if(g.progress+=g.speed*S,g.progress>=1)c.remove(g.mesh),g.mesh.geometry.dispose(),g.mesh.material.dispose(),g.onHit(),z.splice(P,1);else{const O=new w().lerpVectors(g.start,g.end,g.progress);O.y+=Math.sin(g.progress*Math.PI)*1.5,g.mesh.position.copy(O);const ie=new vn(.04,4,4),ve=new It({color:new Fe(g.colorHex),transparent:!0,opacity:.7}),ue=new Qe(ie,ve);ue.position.copy(O),c.add(ue),L.push({mesh:ue,velocity:new w((Math.random()-.5)*.01,.01,(Math.random()-.5)*.01),life:.4,decay:.04*S})}}for(let P=L.length-1;P>=0;P--){const g=L[P];g.mesh.position.addScaledVector(g.velocity,S),g.mesh.geometry.type==="RingGeometry"?g.mesh.scale.addScalar(.14*S):g.mesh.geometry.type==="IcosahedronGeometry"?g.mesh.scale.addScalar(.015*S):g.mesh.geometry.type==="BoxGeometry"?(g.velocity.y-=.005*S,g.mesh.rotation.x+=.04*S,g.mesh.rotation.y+=.06*S,g.mesh.position.y<.05&&g.velocity.y<0&&(g.mesh.position.y=.05,g.velocity.y=-g.velocity.y*.45,g.velocity.x*=.6,g.velocity.z*=.6)):(g.mesh.material.color.getHexString()==="b0b6c2"&&g.mesh.scale.addScalar(.06*S),g.velocity.y-=.003*S),g.life-=g.decay*S,g.mesh.material.opacity=Math.max(0,g.life),g.life<=0&&(c.remove(g.mesh),g.mesh.geometry.dispose(),g.mesh.material.dispose(),L.splice(P,1))}for(let P=M.length-1;P>=0;P--){const g=M[P];if(g.life--,g.life<=0){c.remove(g.line),g.line.geometry.dispose(),g.line.material.dispose(),M.splice(P,1);continue}const O=g.line.geometry.attributes.position,ie=10,ve=g.x2-g.x1,ue=g.y2-g.y1,Ce=g.z2-g.z1;if(g.kind==="tether_1"||g.kind==="tether_2"){const it=new w(ve,ue,Ce);it.normalize();const nt=new w(0,1,0).cross(it);nt.lengthSq()<.001&&nt.copy(new w(1,0,0).cross(it)),nt.normalize();const Pt=new w().crossVectors(it,nt).normalize();for(let mt=0;mt<=ie;mt++){const at=mt/ie,ot=g.x1+ve*at,$t=g.y1+ue*at,Qt=g.z1+Ce*at,Lt=at*Math.PI*5.5+Me*.24+(g.kind==="tether_2"?Math.PI:0),fn=.25*Math.sin(at*Math.PI),ts=ot+(nt.x*Math.cos(Lt)+Pt.x*Math.sin(Lt))*fn,T=$t+(nt.y*Math.cos(Lt)+Pt.y*Math.sin(Lt))*fn,k=Qt+(nt.z*Math.cos(Lt)+Pt.z*Math.sin(Lt))*fn;O.setXYZ(mt,ts,T,k)}}else{const it=Math.hypot(ve,ue,Ce)||1,nt=-ue/it,Pt=ve/it;for(let mt=0;mt<=ie;mt++){const at=mt/ie,ot=g.x1+ve*at,$t=g.y1+ue*at,Qt=g.z1+Ce*at;let Lt=0;g.kind==="lightning"?Lt=(Math.random()-.5)*.5*Math.sin(at*Math.PI):Lt=Math.sin(at*Math.PI*3+Me*.4)*.2*Math.sin(at*Math.PI),O.setXYZ(mt,ot+nt*Lt,$t+Pt*Lt,Qt)}}O.needsUpdate=!0}for(let P=x.length-1;P>=0;P--){const g=x[P];g.sprite.position.add(g.velocity),g.velocity.y-=.001,g.life-=g.decay,g.sprite.material.opacity=g.life,g.life<=0&&(c.remove(g.sprite),g.sprite.material.map?.dispose(),g.sprite.material.dispose(),x.splice(P,1))}if(u){const P=.5+Math.sin(Me*.08)*.3;u.children.forEach(g=>{if(g instanceof Qe){const O=g.material;O&&O.emissiveIntensity!==void 0&&(O.emissiveIntensity=P*1.5)}})}for(let P=0;P<3;P++){const g=c.getObjectByName(`light_ray_${P}`);g instanceof Qe&&(g.rotation.y+=.003,g.material.opacity=.1+Math.sin(Me*.02+P)*.04)}if(Me===ke&&(Q=1.8,Ee(d.a.model.position,18),Ee(d.b.model.position,18),R(d.a.model.position,1.2),R(d.b.model.position,1.2),ze(d.a.model.position,8),ze(d.b.model.position,8)),Me>=ke&&Me<ke+30&&Me%10===0)for(const P of["a","b"]){const O=d[P].model.getObjectByName("head");if(O){const ie=new w;O.getWorldPosition(ie),ie.z+=P==="a"?.5:-.5,rt(ie,"#c39bff")}}for(const P of["a","b"]){const g=d[P],O=B[P],ve=d[P==="a"?"b":"a"];if(g.time+=.016*S,O.displayHp>.5&&Me>ke+60&&g.actionState==="idle"&&(g.vocalTimer-=S,g.vocalTimer<=0)){const de=g.model.getObjectByName("head");if(de){const Ue=new w;de.getWorldPosition(Ue),Ue.z+=P==="a"?.5:-.5;const Dt=O.genome.body==="eel"?"#50e8d0":O.genome.body==="cobra"?"#a8e030":O.genome.body==="dragon"?"#ff6030":"#e8d8a0";rt(Ue,Dt)}g.vocalTimer=Math.floor(Math.random()*300+480)}g.actionTimerAccumulator+=S;let ue=0;g.actionTimerAccumulator>=1&&(ue=Math.floor(g.actionTimerAccumulator),g.actionTimerAccumulator-=ue);for(let de=0;de<ue;de++)if(g.actionState==="windup")g.actionTimer++,g.actionTimer>=g.actionDuration&&(g.actionState="strike",g.actionTimer=0,g.actionDuration=5,Ee(g.model.position,8));else if(g.actionState==="strike"){g.actionTimer++;const Ue=O,Dt=Ue.genome.forelimbs==="eagle"||Ue.genome.body==="eagle"||Ue.genome.body==="dragon",ut=["crab","scorpion","eagle"].includes(Ue.genome.forelimbs),an=Ue.genome.forelimbs==="gorilla",on=["cobra","eel","jellyfish"].includes(Ue.genome.body);Dt&&Math.random()<.7&&Ne(g.model.position,P),an&&g.actionTimer===1&&Ee(g.model.position,18),on&&Math.random()<.4&&Le(g.model.position.clone().add(new w(0,.4,0)),"#39ff14",3,.07),g.actionTimer>=g.actionDuration&&(g.onHitCallback&&(g.onHitCallback(),g.onHitCallback=void 0),ut&&St(g.model.position,P),g.actionState="recover",g.actionTimer=0,g.actionDuration=18)}else g.actionState==="recover"||g.actionState==="dodge"?(g.actionTimer++,g.actionTimer>=g.actionDuration&&(g.actionState="idle",g.actionTimer=0)):Math.random()<.003&&O.displayHp>.5&&(g.actionState="dodge",g.actionTimer=0,g.actionDuration=24,g.dodgeDir=Math.random()<.5?1:-1);const Ce=g.actionTimer+g.actionTimerAccumulator;if(g.actionState==="windup"){const de=Math.min(1,Ce/g.actionDuration);g.lunge=-.4*de,g.model.rotation.z=P==="a"?-.12:.12}else if(g.actionState==="strike"){const de=Math.min(1,Ce/g.actionDuration);g.lunge=-.4+2.2*de,g.model.rotation.z=P==="a"?.22:-.22}else if(g.actionState==="recover"){const de=Math.min(1,Ce/g.actionDuration);g.lunge=1.8*(1-de*(2-de)),g.model.rotation.z=0}else if(g.actionState==="dodge"){const de=g.actionDuration/2;Ce<de?g.dodgeOffset=g.dodgeDir*1.5*(Ce/de):g.dodgeOffset=g.dodgeDir*1.5*(1-(Ce-de)/de)}else g.lunge=0,g.dodgeOffset=0;const it=ve.basePos.clone().sub(g.basePos).normalize(),nt=new w(-it.z,0,it.x).normalize();let Pt=0,mt=0;g.shake>.01&&(g.shake*=.9,Pt=(Math.random()-.5)*g.shake,mt=(Math.random()-.5)*g.shake*.4);const at=g.basePos.clone().add(it.multiplyScalar(g.lunge)).add(nt.multiplyScalar(g.dodgeOffset)).add(new w(Pt,mt,0)),ot=O.displayHp>.5,$t=O.genome.forelimbs==="eagle"||O.genome.body==="eagle"||O.genome.body==="dragon",Qt=O.genome.body==="cobra"||O.genome.body==="eel"||O.genome.body==="jellyfish",Lt=["bear","rhino","gorilla","boar"].includes(O.genome.body),fn=["ant","scorpion","crab"].includes(O.genome.body),ts=O.genome.forelimbs==="crab"||O.genome.forelimbs==="scorpion",T=O.genome.forelimbs==="eagle",k=["scorpion","cobra","eel","tiger","dragon","jellyfish"].includes(O.genome.tail),Y=["boar","wolf","bear","rhino","cobra","dragon"].includes(O.genome.head),$=O.genome.forelimbs==="gorilla";if(ot)if(Me<ke){const de=Me/ke,Ue=8*(1-de*de);at.y+=Ue+.1}else{let de=Math.sin(g.time*2.5)*.08+.1;if($t?de=Math.sin(g.time*2.2)*.15+.35:Qt?de=Math.sin(g.time*1.8)*.03+.1:Lt?de=.05:fn&&(de=.02+Math.sin(g.time*4.5)*.01),at.y+=de,g.actionState==="windup"){const Ue=g.actionTimer/g.actionDuration;T?at.y+=Ue*1.4:$&&(at.y+=Ue*.8)}else if(g.actionState==="strike"){const Ue=g.actionTimer/g.actionDuration;T?at.y+=1.4*(1-Ue)+Math.sin(Ue*Math.PI)*.5:$&&(at.y+=.8*(1-Ue))}}else{g.deathTimer++;const de=Math.min(1,g.deathTimer/30);at.y=.1-de*.7,g.model.rotation.z=(P==="a"?-.8:.8)*Math.min(1,g.deathTimer/15),g.model.traverse(Dt=>{const ut=Dt;ut.isMesh&&ut.material&&(Array.isArray(ut.material)?ut.material:[ut.material]).forEach(on=>{on.transparent=!0,on.opacity=Math.max(0,1-(g.deathTimer-15)/35)})}),(J<ye.length||Me<=le)&&Math.random()<.1&&Le(g.model.position,"#555555",3,.03)}if(g.model.position.copy(at),g.shadow){g.shadow.position.set(at.x,.19,at.z);const de=at.y,Ue=Math.max(.2,1.2-de*.8);g.shadow.scale.set(Ue,Ue,1),ot?g.shadow.material.opacity=Math.max(.1,.55-de*.65):(g.shadow.material.transparent=!0,g.shadow.material.opacity=Math.max(0,.55-g.deathTimer/30))}const q=P==="a"?Math.PI/2-.4:-Math.PI/2+.4;if(ot){if(g.actionState==="strike"&&k){const de=g.actionTimer/g.actionDuration;g.model.rotation.y=q+Math.sin(de*Math.PI)*Math.PI*(P==="a"?2:-2)}else g.model.rotation.y+=(q-g.model.rotation.y)*.15;if(g.actionState==="windup"&&$)g.model.rotation.z+=((P==="a"?-.25:.25)-g.model.rotation.z)*.15;else if(g.actionState==="strike"&&T){const de=g.actionTimer/g.actionDuration;g.model.rotation.z=(P==="a"?.35:-.35)*(1-de*2.5)}else g.actionState==="strike"&&!T?g.model.rotation.z=P==="a"?.22:-.22:g.actionState==="windup"&&!$?g.model.rotation.z=P==="a"?-.12:.12:g.model.rotation.z+=(0-g.model.rotation.z)*.15}const fe=g.model.getObjectByName("body"),Pe=g.model.getObjectByName("neck"),Ie=g.model.getObjectByName("forelimbs"),Be=g.model.getObjectByName("hindlimbs");if(ot){if(fe)if($t){const de=Math.sin(g.time*3)*.015;fe.scale.set(1.04+de,.94-de,1.18+de),fe.rotation.x=.12+Math.sin(g.time*2.2)*.04,fe.rotation.y=0}else if(Qt)fe.rotation.y=Math.sin(g.time*2.2)*.12,fe.rotation.x=Math.cos(g.time*1.8)*.05,fe.scale.set(1.05,.92,1.2);else if(Lt){const de=Math.sin(g.time*1.2)*.035;fe.scale.set(1.1+de,.88-de,1.25+de),fe.rotation.x=0,fe.rotation.y=Math.sin(g.time*.8)*.04}else if(fn){const de=Math.sin(g.time*4)*.018;fe.scale.set(1.03+de,.94-de,1.2+de),fe.rotation.x=.02,fe.rotation.y=0}else{const de=Math.sin(g.time*2.5)*.02;fe.scale.set(1.05+de,.92-de,1.2+de),fe.rotation.set(0,0,0)}if(Pe&&Qt&&(Pe.rotation.y=-Math.sin(g.time*2.2)*.08),Ie)if(Ie.rotation.set(0,0,0),g.actionState==="strike"&&ts){const de=g.actionTimer/g.actionDuration;Ie.rotation.y=Math.sin(de*Math.PI)*(P==="a"?.9:-.9),Ie.rotation.x=Math.sin(de*Math.PI)*.4}else if(g.actionState==="strike"&&$){const de=g.actionTimer/g.actionDuration;Ie.rotation.x=-1.3*de}else $t?Ie.rotation.x=.25:fn&&(Ie.rotation.z=Math.sin(g.time*15)*.02);Be&&(Be.rotation.set(0,0,0),$t?Be.rotation.x=.4:fn&&(Be.rotation.z=-Math.sin(g.time*15)*.02))}const Oe=g.model.getObjectByName("head");if(Oe&&ot&&ve)if(Me>ke-20&&Me<ke+40)Oe.rotation.x=-.35,Oe.rotation.y=P==="a"?.2:-.2;else if(g.actionState==="strike"&&Y){const de=g.actionTimer/g.actionDuration;Oe.position.z=Math.sin(de*Math.PI)*.6,Oe.rotation.set(0,0,0)}else{Oe.position.z+=(0-Oe.position.z)*.15;const de=new w;Oe.getWorldPosition(de);const Ue=new w;ve.model.getWorldPosition(Ue),Ue.y+=1.6;const Dt=Oe.parent.worldToLocal(Ue.clone()),ut=Math.atan2(Dt.x,Dt.z),an=-Math.atan2(Dt.y,Math.hypot(Dt.x,Dt.z));let on=Math.max(-.6,Math.min(.6,ut)),kt=Math.max(-.4,Math.min(.4,an));if($t)kt-=.08;else if(Qt)on+=-Math.sin(g.time*2.2)*.08;else if(fn){const yi=(Math.sin(g.time*12)+Math.cos(g.time*19))*.018;on+=yi*1.5,kt+=yi}Oe.rotation.y+=(on-Oe.rotation.y)*.1,Oe.rotation.x+=(kt-Oe.rotation.x)*.1}const Ve=g.model.getObjectByName("ear_l_0"),Xe=g.model.getObjectByName("ear_l_1"),gt=g.model.getObjectByName("ear_r_0"),Ot=g.model.getObjectByName("ear_r_1");if(Ve&&gt&&ot){const de=Math.sin(g.time*4)*.08,Ue=Math.cos(g.time*3)*.05;Ve.rotation.x=de,Ve.rotation.z=-.05+Ue,Xe&&(Xe.rotation.x=de*1.5,Xe.rotation.z=Ue*.8),gt.rotation.x=de,gt.rotation.z=.05-Ue,Ot&&(Ot.rotation.x=de*1.5,Ot.rotation.z=-Ue*.8)}const bt=g.model.getObjectByName("lower_jaw");if(bt&&ot){let de=0;Me>ke-20&&Me<ke+40?de=.35:g.actionState==="windup"||g.actionState==="strike"?de=Y?.45:.25:de=Math.max(0,Math.sin(g.time*1.8)*.06),bt.rotation.x=de}Math.random()<.008&&g.blinkTimer===0&&(g.blinkTimer=10);let Jt=1;g.blinkTimer>0&&(g.blinkTimer--,g.blinkTimer>5?Jt=.1+(g.blinkTimer-5)*.18:Jt=.1+(5-g.blinkTimer)*.18);for(const de of["_r","_l"]){const Ue=g.model.getObjectByName(`eye${de}`),Dt=g.model.getObjectByName(`pupil${de}`);Ue&&(Ue.scale.y=Jt),Dt&&(Dt.scale.y=Jt)}const dt=Qt?4.5:Lt?2:3.5,je=Qt?.32:Lt?.08:.15;for(let de=0;de<8;de++){const Ue=g.model.getObjectByName(`tail_seg_${de}`);Ue&&(Ue.rotation.y=Math.sin(g.time*dt-de*.32)*je)}const vi=g.model.getObjectByName("tail");vi&&!g.model.getObjectByName("tail_seg_0")&&ot&&(vi.rotation.y=Math.sin(g.time*dt)*je);const _t=g.model.getObjectByName("wing_r"),Sn=g.model.getObjectByName("wing_l");if(_t&&Sn&&ot){const de=Math.sin(g.time*($t?10:6))*($t?.45:.3);_t.rotation.z=de,Sn.rotation.z=-de}g.flash>.5?(g.flash*=.92,f||(f=new It({color:16777215})),g.model.traverse(de=>{const Ue=de;Ue.isMesh&&Ue.material&&(Ue.originalMaterial||(Ue.originalMaterial=Ue.material),Ue.material=f)})):(g.flash>.02?g.flash*=.92:g.flash=0,g.model.traverse(de=>{const Ue=de;Ue.isMesh&&Ue.originalMaterial&&(Ue.material=Ue.originalMaterial,delete Ue.originalMaterial)}))}if(l.render(c,h),F){const P=F.querySelector(".player-hud .hud-hp-fill"),g=F.querySelector(".player-hud .hud-text"),O=Math.max(0,B.a.displayHp)/B.a.maxHp*100;P.style.width=`${O}%`,P.style.background=O>30?"linear-gradient(90deg, #36c08a, #6ce5b1)":"linear-gradient(90deg, #ff6b81, #ff97a6)",g.textContent=`${Math.max(0,Math.round(B.a.displayHp))}/${B.a.maxHp}`;const ie=F.querySelector(".opponent-hud .hud-hp-fill"),ve=F.querySelector(".opponent-hud .hud-text"),ue=Math.max(0,B.b.displayHp)/B.b.maxHp*100;ie.style.width=`${ue}%`,ie.style.background=ue>30?"linear-gradient(90deg, #36c08a, #6ce5b1)":"linear-gradient(90deg, #ff6b81, #ff97a6)",ve.textContent=`${Math.max(0,Math.round(B.b.displayHp))}/${B.b.maxHp}`}}else{for(const P of["a","b"]){const g=B[P];g.displayHp+=(g.targetHp-g.displayHp)*.25,g.shake*=.8,g.lunge*=.82,g.flash*=.85,g.attackAnim=Math.max(0,g.attackAnim-.065),g.hitAnim=Math.max(0,g.hitAnim-.055);const O=P==="a"?1:-1;g.x=g.baseX+g.lunge*O}for(let P=ee.length-1;P>=0;P--){const g=ee[P];g.y+=g.vy,g.vy+=.06,g.life-=1,g.life<=0&&ee.splice(P,1)}for(let P=Z.length-1;P>=0;P--){const g=Z[P];g.x+=g.vx,g.y+=g.vy,g.vy+=.18,g.vx*=.98,g.life-=1,g.life<=0&&Z.splice(P,1)}for(let P=X.length-1;P>=0;P--)X[P].life-=1,X[P].life<=0&&X.splice(P,1);for(let P=te.length-1;P>=0;P--){const g=te[P];g.x+=g.vx,g.y+=g.vy,Z.push({x:g.x,y:g.y,vx:0,vy:0,life:8,maxLife:8,color:g.trail,size:g.size*.7});const O=g.tx-g.x,ie=g.ty-g.y;(O*O+ie*ie<220||Me>le+400)&&(g.onHit(),te.splice(P,1))}Q*=.85,Ye()}if(J>=ye.length&&Me>le&&ee.length===0&&te.length===0&&X.length===0&&z.length===0&&L.length===0&&x.length===0){He||(He=!0,F&&(F.remove(),F=null),t(e.winner));return}Se=requestAnimationFrame(V)}const St=(S,N)=>{const P=N==="a"?1:-1,g=[[-.18*P,.55],[0,.4],[.18*P,.55]];for(const[O,ie]of g){const ve=S.clone().add(new w(O-.22*P,ie+.22,0)),ue=S.clone().add(new w(O+.22*P,ie-.22,0)),Ce=new Tt().setFromPoints([ve,ue]),it=new or({color:16777215,transparent:!0,opacity:.9}),nt=new da(Ce,it);c?.add(nt),M.push({line:nt,life:14,maxLife:14,kind:"lightning",x1:ve.x,y1:ve.y,z1:ve.z,x2:ue.x,y2:ue.y,z2:ue.z})}},Ne=(S,N)=>{const P=N==="a"?-1:1,g=S.clone().add(new w(P*.6+(Math.random()-.5)*.25,(Math.random()-.5)*.5,0)),O=S.clone().add(new w(P*1.8+(Math.random()-.5)*.15,(Math.random()-.5)*.3,0)),ie=new Tt().setFromPoints([g,O]),ve=new or({color:15658751,transparent:!0,opacity:.75}),ue=new da(ie,ve);c?.add(ue),M.push({line:ue,life:9,maxLife:9,kind:"lightning",x1:g.x,y1:g.y,z1:g.z,x2:O.x,y2:O.y,z2:O.z})},Le=(S,N,P=20,g=.12)=>{const O=new vn(.06,6,6),ie=new It({color:new Fe(N),transparent:!0,opacity:.9});for(let ve=0;ve<P;ve++){const ue=new Qe(O,ie.clone());ue.position.copy(S).add(new w((Math.random()-.5)*.4,(Math.random()-.5)*.4,(Math.random()-.5)*.4)),c?.add(ue),L.push({mesh:ue,velocity:new w((Math.random()-.5)*g*2,(Math.random()-.2)*g*2,(Math.random()-.5)*g*2),life:1,decay:.02+Math.random()*.02})}},Ee=(S,N=15)=>{const P=new vn(.18,8,8),g=new It({color:new Fe(11581122),transparent:!0,opacity:.6,depthWrite:!1});for(let O=0;O<N;O++){const ie=new Qe(P,g.clone()),ve=Math.random()*Math.PI*2,ue=.2+Math.random()*.8;ie.position.set(S.x+Math.cos(ve)*ue,.2,S.z+Math.sin(ve)*ue),c?.add(ie),L.push({mesh:ie,velocity:new w(Math.cos(ve)*(.02+Math.random()*.04),.01+Math.random()*.03,Math.sin(ve)*(.02+Math.random()*.04)),life:.7,decay:.02+Math.random()*.02})}},rt=(S,N)=>{const P=new ms(.1,.12,32),g=new It({color:new Fe(N),side:Kt,transparent:!0,opacity:.8,depthWrite:!1}),O=new Qe(P,g);O.position.copy(S),h&&O.lookAt(h.position),c?.add(O),L.push({mesh:O,velocity:new w(0,0,0),life:.8,decay:.03})},ze=(S,N=12)=>{const P=new Zi(.14,.14,.14),g=new _s({color:5919557,roughness:.9});for(let O=0;O<N;O++){const ie=new Qe(P,g.clone());ie.position.copy(S).add(new w((Math.random()-.5)*.6,.1,(Math.random()-.5)*.6)),ie.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),c?.add(ie),L.push({mesh:ie,velocity:new w((Math.random()-.5)*.16,.06+Math.random()*.15,(Math.random()-.5)*.16),life:1,decay:.015+Math.random()*.01})}},R=(S,N=1.3)=>{const P=new ms(N*.8,N,24),g=new It({color:461074,side:Kt,transparent:!0,opacity:.85,depthWrite:!1}),O=new Qe(P,g);O.rotation.x=Math.PI/2,O.position.set(S.x,.02,S.z),c?.add(O),L.push({mesh:O,velocity:new w(0,0,0),life:1.3,decay:.012})},b=(S,N=12)=>{const P=new vn(.08,6,6),g=new It({color:3800852,transparent:!0,opacity:.8});for(let O=0;O<N;O++){const ie=new Qe(P,g.clone());ie.position.copy(S).add(new w((Math.random()-.5)*.5,.2,(Math.random()-.5)*.5)),c?.add(ie),L.push({mesh:ie,velocity:new w((Math.random()-.5)*.01,.015+Math.random()*.02,(Math.random()-.5)*.01),life:.8,decay:.014})}},W=(S,N)=>{const P=new Za(1.6,1),g=new It({color:new Fe(N),wireframe:!0,transparent:!0,opacity:.75,depthWrite:!1}),O=new Qe(P,g);O.position.copy(S).add(new w(0,.8,0)),c?.add(O),L.push({mesh:O,velocity:new w(0,0,0),life:1,decay:.03})};let oe=null;const ae=()=>{if(!oe){const S=document.createElement("canvas");S.width=64,S.height=64;const N=S.getContext("2d");N&&(N.fillStyle="#36c08a",N.fillRect(26,10,12,44),N.fillRect(10,26,44,12)),oe=new Ts(S)}return oe},se=(S,N=8)=>{const P=new Na({map:ae(),transparent:!0,opacity:.95});for(let g=0;g<N;g++){const O=new Ul(P.clone());O.position.copy(S).add(new w((Math.random()-.5)*.8,.3+Math.random()*.5,(Math.random()-.5)*.8)),O.scale.setScalar(.4),c?.add(O),x.push({sprite:O,velocity:new w((Math.random()-.5)*.008,.025+Math.random()*.015,0),life:1,decay:.018})}};function we(S){const N=S.getContext("2d");if(!N)return;N.clearRect(0,0,cn,_n),N.strokeStyle="rgba(255, 255, 255, 0.35)",N.lineWidth=1.5;const P=cn/2,g=_n/2,O=35;for(let ie=0;ie<O;ie++){const ve=Math.random()*Math.PI*2,ue=40+Math.random()*80,Ce=180+Math.random()*100,it=P+Math.cos(ve)*Ce,nt=g+Math.sin(ve)*Ce,Pt=P+Math.cos(ve)*(Ce+ue),mt=g+Math.sin(ve)*(Ce+ue);N.beginPath(),N.moveTo(it,nt),N.lineTo(Pt,mt),N.stroke()}}const K=(S,N)=>{const P=new vn(.05,4,4),g=new It({color:new Fe(N),transparent:!0,opacity:.9}),O=new Qe(P,g),ie=Math.random()*Math.PI*2,ve=1.8;O.position.set(S.x+Math.cos(ie)*ve,S.y+(Math.random()-.2)*.5,S.z+Math.sin(ie)*ve),c?.add(O);const ue=new w(-Math.sin(ie),0,Math.cos(ie)).normalize(),it=S.clone().sub(O.position).normalize().multiplyScalar(.04).add(ue.multiplyScalar(.03)).add(new w(0,.03,0));L.push({mesh:O,velocity:it,life:.8,decay:.02})},ce=(S,N)=>{const P=new ms(.1,.15,32),g=new It({color:new Fe(N),side:Kt,transparent:!0,opacity:.8,depthWrite:!1}),O=new Qe(P,g);O.position.copy(S).add(new w(0,1,.5)),h&&O.lookAt(h.position),c?.add(O),L.push({mesh:O,velocity:new w(0,0,0),life:.7,decay:.045})},Re=(S,N)=>{const P=new vn(.06,4,4),g=new It({color:new Fe(N),transparent:!0,opacity:.8});for(let O=0;O<16;O++){const ie=new Qe(P,g.clone()),ve=O/16*Math.PI*4,ue=O/16*2;ie.position.set(S.x+Math.cos(ve)*.7,S.y+ue,S.z+Math.sin(ve)*.7),c?.add(ie),L.push({mesh:ie,velocity:new w(0,.02+Math.random()*.015,0),life:1,decay:.02+Math.random()*.01})}};function qe(S,N=1,P){const g=d[S];g.actionState="windup",g.actionTimer=0,g.actionDuration=Math.round(10*N),g.lunge=0,g.onHitCallback=P}const ne=(S,N,P,g)=>{const O=[];for(let nt=0;nt<=10;nt++)O.push(new w);const ve=new Tt().setFromPoints(O),ue=new or({color:new Fe(P)}),Ce=new da(ve,ue);c?.add(Ce);const it=g==="lightning";M.push({line:Ce,life:it?22:40,maxLife:it?22:40,kind:g,x1:S.x,y1:S.y,z1:S.z,x2:N.x,y2:N.y,z2:N.z})},tt=(S,N,P,g)=>{const O=document.createElement("canvas");O.width=256,O.height=128;const ie=O.getContext("2d");if(!ie)return;ie.font=`bold ${g*2}px Inter, sans-serif`,ie.fillStyle=P,ie.textAlign="center",ie.textBaseline="middle",ie.fillText(N,128,64);const ve=new Ts(O),ue=new Na({map:ve,transparent:!0}),Ce=new Ul(ue);Ce.position.copy(S),Ce.scale.set(2,1,1),c?.add(Ce),x.push({sprite:Ce,velocity:new w((Math.random()-.5)*.02,.05,0),life:1,decay:.02})};function $e(S){const N=B[bn(S.by)],P=d[S.by],g=d[bn(S.by)];if(ho(),S.ability==="spit"){const O=P.model.position.clone().add(new w(S.by==="a"?.8:-.8,1.2,0)),ie=g.model.position.clone().add(new w(0,.8,0)),ve=new vn(.18,8,8),ue=new It({color:3800852}),Ce=new Qe(ve,ue);Ce.position.copy(O),c?.add(Ce),z.push({mesh:Ce,start:O,end:ie,progress:0,speed:.018,colorHex:"#39ff14",onHit:()=>{B[bn(S.by)].hitAnim=.9,g.shake=1,g.flash=1,N.targetHp=S.targetHp,Q=Math.max(Q,.8),Le(g.model.position,"#39ff14",15,.15),ce(g.model.position,"#39ff14"),b(g.model.position,12),Ee(g.model.position,10),tt(g.model.position.clone().add(new w(0,2,0)),`${si(S.ability)} ${S.value}`,"#39ff14",26)}})}else if(S.ability==="shock"){const O=P.model.position.clone().add(new w(0,1.2,0)),ie=g.model.position.clone().add(new w(0,.8,0));ne(O,ie,"#c39bff","lightning"),B[bn(S.by)].hitAnim=.9,g.shake=1.2,g.flash=1,N.targetHp=S.targetHp,Q=Math.max(Q,.9),Le(g.model.position,"#c39bff",15,.16),ce(g.model.position,"#c39bff"),ce(g.model.position,"#ffd700"),Ee(g.model.position,10),tt(g.model.position.clone().add(new w(0,2,0)),`${si(S.ability)} ${S.value}`,"#c39bff",26)}else if(S.ability==="leech"){const O=P.model.position.clone().add(new w(0,.8,0)),ie=g.model.position.clone().add(new w(0,.8,0));ne(ie,O,"#ff3b30","tether_1"),ne(ie,O,"#ff3b30","tether_2"),B[bn(S.by)].hitAnim=.9,g.shake=1,g.flash=1,N.targetHp=S.targetHp,Q=Math.max(Q,.7),Le(g.model.position,"#ff3b30",12,.12),ce(g.model.position,"#ff3b30"),Ee(g.model.position,8),tt(g.model.position.clone().add(new w(0,2,0)),`${si(S.ability)} ${S.value}`,"#ff3b30",26)}else if(S.ability==="charge")qe(S.by,1.8,()=>{B[bn(S.by)].hitAnim=1,g.shake=1.4,g.flash=1,N.targetHp=S.targetHp,Q=Math.max(Q,1.2),Le(g.model.position,"#ffae19",18,.22),ce(g.model.position,"#ffae19"),R(g.model.position,1.5),ze(g.model.position,15),Ee(g.model.position,12),tt(g.model.position.clone().add(new w(0,2,0)),`${si(S.ability)} ${S.value}`,"#ffae19",26)});else{P.flash=.8;let O="#7aa2ff";S.ability==="venom"?(O="#9be86c",b(P.model.position,12)):S.ability==="frenzy"?(O="#ff6b81",P.flash=1.3):S.ability==="regenerate"?(O="#6ce5b1",se(P.model.position,10)):S.ability==="armor"&&(O="#7aa2ff",W(P.model.position,"#7aa2ff")),Le(P.model.position,O,14,.14),Re(P.model.position,O),tt(P.model.position.clone().add(new w(0,2,0)),si(S.ability),O,24),S.targetHp!==void 0&&(N.targetHp=S.targetHp)}}function We(S){if(o&&d)switch(S.kind){case"attack":{const N=B[bn(S.by)],P=d[bn(S.by)];qe(S.by,1,()=>{P.shake=S.crit?1:.6,P.flash=1,N.targetHp=S.targetHp,Q=Math.max(Q,S.crit?1.2:.6),S.crit&&(E=35),Le(P.model.position,S.crit?"#ffce6b":"#ff8f6b",S.crit?18:10,S.crit?.2:.12),ce(P.model.position,S.crit?"#ffce6b":"#ff8f6b"),(S.crit||B[S.by].genome.forelimbs==="gorilla")&&(R(P.model.position,S.crit?1.4:1.1),ze(P.model.position,S.crit?10:6)),Ee(P.model.position,S.crit?12:6),co(S.crit),tt(P.model.position.clone().add(new w(0,2,0)),S.crit?`${S.dmg}!`:`${S.dmg}`,S.crit?"#ffce6b":"#ff8f6b",S.crit?38:28)});break}case"ability":{["spit","shock","leech","charge"].includes(S.ability)?be={active:!0,casterSide:S.by,timer:0,duration:45,ability:S.ability,value:S.value,targetHp:S.targetHp,onComplete:()=>{$e(S)}}:$e(S);break}case"poison":{const N=B[S.on];N.targetHp=S.hp;const P=d[S.on];P.flash=.5,Le(P.model.position,"#9be86c",8,.1),tt(P.model.position.clone().add(new w(0,2,0)),`☠ ${S.dmg}`,"#9be86c",22);break}case"heal":{const N=B[S.on];N.targetHp=S.hp,uo();const P=d[S.on];Le(P.model.position,"#6ce5b1",10,.12),tt(P.model.position.clone().add(new w(0,2,0)),`+${S.amount}`,"#6ce5b1",24);break}case"death":{const N=B[S.side];N.flash=1;const P=d[S.side];P.flash=1;break}}else switch(S.kind){case"attack":{const N=B[S.by],P=B[bn(S.by)];N.lunge=85,N.attackAnim=1,P.hitAnim=1,P.shake=S.crit?16:9,P.flash=1,P.targetHp=S.targetHp,Q=Math.max(Q,S.crit?10:5),Te(P,S.crit?"#ffce6b":"#ff8f6b",S.crit?16:9,S.crit?5:3.4),co(S.crit),De(P,S.crit?`${S.dmg}!`:`${S.dmg}`,S.crit?"#ffce6b":"#ff8f6b",S.crit?34:26);break}case"ability":{const N=B[S.by],P=B[bn(S.by)];N.attackAnim=.8,N.lunge=55,N.flash=.6,ho(),!(S.value<0)&&(S.ability==="venom"||S.ability==="armor"||S.ability==="frenzy")?(Te(N,"#7aa2ff",8,2.6),De(N,si(S.ability),"#7aa2ff",20)):S.ability!=="regenerate"&&(P.hitAnim=.9,P.shake=12,P.flash=1,P.targetHp=S.targetHp,Q=Math.max(Q,8),Te(P,"#c39bff",12,4),De(P,`${si(S.ability)} ${S.value}`,"#c39bff",24));break}case"poison":{const N=B[S.on];N.targetHp=S.hp,N.flash=Math.max(N.flash,.5),Te(N,"#9be86c",5,2),De(N,`☠ ${S.dmg}`,"#9be86c",20);break}case"heal":{const N=B[S.on];N.targetHp=S.hp,uo(),Te(N,"#6ce5b1",8,2.4),De(N,`+${S.amount}`,"#6ce5b1",24);break}case"death":{B[S.side].flash=1;break}}}function De(S,N,P,g){ee.push({x:S.baseX+(Math.random()*40-20),y:Pn-110,vy:-2.2,life:55,text:N,color:P,size:g})}function Te(S,N,P,g){if(r)return;const O=S.baseX,ie=Pn-60;for(let ve=0;ve<P;ve++){const ue=Math.random()*Math.PI*2,Ce=g*(.4+Math.random());Z.push({x:O,y:ie,vx:Math.cos(ue)*Ce,vy:Math.sin(ue)*Ce-1.5,life:22+Math.random()*14,maxLife:36,color:N,size:2+Math.random()*3})}}function Ye(){if(!a)return;a.clearRect(0,0,cn,_n),st();const S=s?0:Q,N=(Math.random()*2-1)*S,P=(Math.random()*2-1)*S;a.save(),a.translate(N,P),pt(B.a),pt(B.b);for(const g of Z)a.globalAlpha=Math.max(0,g.life/g.maxLife),a.fillStyle=g.color,a.beginPath(),a.arc(g.x,g.y,g.size,0,Math.PI*2),a.fill();a.globalAlpha=1;for(const g of ee)a.globalAlpha=Math.min(1,g.life/30),a.fillStyle=g.color,a.font=`700 ${g.size}px Inter, system-ui, sans-serif`,a.textAlign="center",a.fillText(g.text,g.x,g.y),a.globalAlpha=1;a.restore(),Je()}function st(){if(!a)return;const S=a.createLinearGradient(0,0,0,_n);S.addColorStop(0,"#0e1730"),S.addColorStop(1,"#0a1120"),a.fillStyle=S,a.fillRect(0,0,cn,_n);const N=a.createLinearGradient(0,Pn,0,_n);N.addColorStop(0,"#16223f"),N.addColorStop(1,"#0c1426"),a.fillStyle=N,a.fillRect(0,Pn,cn,_n-Pn),a.strokeStyle="rgba(122,162,255,0.25)",a.lineWidth=2,a.beginPath(),a.moveTo(0,Pn),a.lineTo(cn,Pn),a.stroke()}function pt(S){if(!a)return;const N=S.displayHp>.5,P=Me,g=N?Math.sin(P*.11+(S.side==="a"?0:Math.PI))*5:0,O=N?Math.sin(P*.07+(S.side==="a"?0:Math.PI*.5)):0,ie=N?Math.sin(P*.022+(S.side==="a"?0:Math.PI))*9:0,ve=(Math.random()*2-1)*S.shake,ue=(Math.random()*2-1)*S.shake*.4,Ce=S.x+ve+ie,it=Pn-72+g+ue,nt=S.attackAnim,Pt=S.hitAnim,mt=S.partEmojis,at=1+S.lunge/85*.2;a.fillStyle="rgba(0,0,0,0.3)",a.beginPath(),a.ellipse(S.x+ie*.4,Pn+6,55*at,13,0,0,Math.PI*2),a.fill(),a.save(),a.translate(Ce,it),S.side==="b"&&a.scale(-1,1),N?Pt>0&&(a.translate(-Pt*10,-Pt*3),a.rotate(-Pt*.14)):(a.globalAlpha=.35,a.rotate(.5),a.translate(0,18));const ot=.52;a.save(),a.translate(-46-nt*8,-6),a.rotate(-.18+Math.sin(P*.18)*.16),a.scale(ot,ot),nc(a,mt.tail,P*.18),a.restore(),a.save(),a.translate(-18-nt*6,14+nt*7),a.rotate(-.04+nt*.1),a.scale(ot*.9,ot*.9),tc(a,mt.hindlimbs,nt),a.restore(),a.save(),a.scale(ot*(1+O*.016),ot*(1-O*.01)),Ql(a,mt.body,O),a.restore(),a.save(),a.translate(20+nt*32,14-nt*14),a.rotate(nt*.6),a.scale(ot*.9,ot*.9),ec(a,mt.forelimbs,nt),a.restore(),a.save(),a.translate(32+nt*18,-40-nt*12),a.rotate(nt*.2-Pt*.16),a.scale(ot,ot),Zl(a,mt.head,P*.18,nt),a.restore(),a.restore(),S.flash>.02&&(a.globalAlpha=S.flash*.38,a.fillStyle="#ff4d6d",a.beginPath(),a.arc(Ce,it-12,80,0,Math.PI*2),a.fill(),a.globalAlpha=1)}function Je(){pe(B.a,40,"left"),pe(B.b,cn-360,"right")}function pe(S,N,P){if(!a)return;const g=320,O=32,ie=Math.max(0,S.displayHp)/S.maxHp;a.fillStyle="#0c1222",U(N,O,g,18,9),a.fill();const ve=a.createLinearGradient(N,0,N+g,0);ve.addColorStop(0,ie>.3?"#36c08a":"#ff6b81"),ve.addColorStop(1,ie>.3?"#6ce5b1":"#ff97a6"),a.fillStyle=ve;const ue=g*ie;ue>0&&(U(P==="left"?N:N+g-ue,O,ue,18,9),a.fill()),a.fillStyle="#e7ecf7",a.font="700 15px Inter, system-ui, sans-serif",a.textBaseline="alphabetic",a.textAlign=P,a.fillText(`${S.name}  ${Math.max(0,Math.round(S.displayHp))}/${S.maxHp}`,P==="left"?N:N+g,O-8)}function U(S,N,P,g,O){a&&(a.beginPath(),a.moveTo(S+O,N),a.arcTo(S+P,N,S+P,N+g,O),a.arcTo(S+P,N+g,S,N+g,O),a.arcTo(S,N+g,S,N,O),a.arcTo(S,N,S+P,N,O),a.closePath())}function _e(S){S.traverse(N=>{const P=N;P.geometry&&P.geometry.dispose();const g=P.material;Array.isArray(g)?g.forEach(O=>O.dispose()):g&&g.dispose()})}return Se=requestAnimationFrame(V),()=>{if(cancelAnimationFrame(Se),o){F&&F.remove(),j&&j.remove();for(let S=0;S<3;S++){const N=c?.getObjectByName(`light_ray_${S}`);N instanceof Qe&&(c?.remove(N),N.geometry.dispose(),N.material.dispose())}d&&c&&(c.remove(d.a.model),_e(d.a.model),c.remove(d.a.shadow),_e(d.a.shadow),c.remove(d.b.model),_e(d.b.model),c.remove(d.b.shadow),_e(d.b.shadow)),u&&c&&(c.remove(u),p?.geometry.dispose(),_?.dispose(),y?.dispose(),m?.dispose()),L.forEach(S=>{c?.remove(S.mesh),S.mesh.geometry.dispose(),S.mesh.material.dispose()}),z.forEach(S=>{c?.remove(S.mesh),S.mesh.geometry.dispose(),S.mesh.material.dispose()}),M.forEach(S=>{c?.remove(S.line),S.line.geometry.dispose(),S.line.material.dispose()}),x.forEach(S=>{c?.remove(S.sprite),S.sprite.material.map?.dispose(),S.sprite.material.dispose()}),l?.dispose()}}}function Xl(n,e,t){return{side:n,name:e.name,emoji:e.emoji,partEmojis:e.partEmojis,genome:e.genome,maxHp:e.maxHp,displayHp:e.maxHp,targetHp:e.maxHp,x:t,baseX:t,shake:0,lunge:0,flash:0,attackAnim:0,hitAnim:0}}function bn(n){return n==="a"?"b":"a"}function ql(n,e,t){return Math.max(e,Math.min(t,n))}function si(n){return{venom:"Venom",regenerate:"Regen",spit:"Spit",charge:"Charge",armor:"Armor",frenzy:"Frenzy",shock:"Shock",leech:"Leech"}[n]??n}let Ae=ch(),vs=null,Hi=!1,va=null,Gn=null,ya=!1;function e_(n){return ya?null:(Gn||(Gn=document.createElement("div"),Gn.className="creature3d-host"),va?va.setGenome(n):jc(async()=>{const{mountCreature3D:e}=await Promise.resolve().then(()=>Zg);return{mountCreature3D:e}},void 0,import.meta.url).then(({mountCreature3D:e})=>{if(Gn)try{va=e(Gn,n,240)}catch{ya=!0,Gn?.remove(),Gn=null}}).catch(()=>{ya=!0}),Gn)}const Hc=[{id:"slow",label:"🐢 Slow",mult:.4},{id:"normal",label:"▶ Normal",mult:1},{id:"fast",label:"⚡ Fast",mult:3},{id:"instant",label:"⏩ Instant",mult:0}];dd(Ae.muted);const Sr=document.getElementById("app");let ws="lab";function eo(n){Ae.player=n,Tn(Ae),sn()}function Gc(){eo(lr(ys(Date.now()),Ae.unlocked))}function Vc(){const n=lr(ys(Date.now()^85),Ae.unlocked),e=ih(Ae.player,n,ys(Date.now()>>>1),{pool:Ae.unlocked});eo(e)}function Wc(){return re("div",{class:"topbar"},[re("div",{class:"brand"},[re("span",{class:"logo"},["🧬"]),re("div",{},[re("h1",{},["Imaginary Creatures"]),re("small",{},["Splice DNA. Build a beast. Win the arena."])])]),re("div",{class:"stats-pills"},[re("span",{class:"pill"},[Ma("Wins",Ae.wins)]),re("span",{class:"pill"},[Ma("Losses",Ae.losses)]),re("span",{class:"pill"},[Ma("Species",Ae.unlocked.length)]),re("button",{class:"pill",title:"Toggle sound",onclick:n=>{const e=ud();Ae.muted=e,Tn(Ae),n.target.textContent=e?"🔇 Sound":"🔊 Sound"}},[Ae.muted?"🔇 Sound":"🔊 Sound"])])])}function Ma(n,e){return re("span",{html:`${n} <b>${e}</b>`})}function t_(){const n=Hc.map(({id:s,label:r,mult:a})=>re("button",{class:Ae.battleSpeed===s?"settings-btn active":"settings-btn",onclick:()=>{Ae.battleSpeed=s,Tn(Ae),sn()},title:`Battle speed: ${s} (${a===0?"instant":a+"×"})`},[r])),e=re("button",{class:Ae.showOpponent?"settings-btn active":"settings-btn",onclick:()=>{Ae.showOpponent=!Ae.showOpponent,Tn(Ae),sn()}},[Ae.showOpponent?"🔭 Opponent":"🔭 Opponent (hidden)"]),t=re("button",{class:Hi?"settings-btn active":"settings-btn",onclick:()=>{Hi=!Hi,sn()}},["🗑 New Game"]),i=re("div",{class:"settings-bar"},[re("div",{class:"settings-group"},[re("span",{class:"settings-label"},["Speed"]),...n]),re("div",{class:"settings-group"},[e]),re("div",{class:"settings-group"},[t])]);if(Hi){const s=[{tier:1,label:"🌱 Tier 1 (5 species)"},{tier:2,label:"🔥 Tier 1+2 (10 species)"},{tier:3,label:"💀 All species unlocked"}].map(({tier:r,label:a})=>re("button",{class:"settings-btn",onclick:()=>{confirm(`Start a new game at ${a}? Current progress will be lost.`)&&(Hi=!1,Ae=Ta(r,Ae),Tn(Ae),sn())}},[a]));i.append(re("div",{class:"settings-newgame"},[re("span",{class:"settings-label"},["Pick start tier:"]),...s,re("button",{class:"settings-btn",onclick:()=>{Hi=!1,sn()}},["✕ Cancel"])]))}return i}function sn(){vs&&(vs(),vs=null),ws="lab",Fa(Sr);const n=re("div",{class:"panel"},[re("h2",{},["Genetics Lab"]),re("div",{class:"slots"},Jn.map(o=>{const l=re("select",{onchange:c=>{const h={...Ae.player,[o]:c.target.value};eo(h)}});for(const c of Ae.unlocked){const h=di(c),d=re("option",{value:c},[`${h.emoji}  ${h.name}`]);Ae.player[o]===c&&(d.selected=!0),l.append(d)}return re("div",{class:"slot"},[re("label",{},[rh(o)]),l])})),re("div",{class:"btnrow"},[re("button",{onclick:Gc},["🎲 Randomize"]),re("button",{onclick:Vc},["🧬 Splice DNA"])]),re("p",{class:"hint"},["Each animal gives different stats and powers depending on the slot it fills. Splice mixes your current creature with a random one — mutations can graft in traits from neither parent. Win fights to unlock stronger species."]),re("p",{class:"hint"},["⌨ Shortcuts: R randomize · S splice · Enter fight"])]),e=Ms(Ae.player),t=gh(Ae.roster,Ae.player),i=e_(Ae.player),s=[re("h2",{},["Your Creature"])];i&&s.push(re("div",{class:"creature3d-stage"},[i])),s.push(ic(e));const r=re("div",{class:"panel"},[...s,re("div",{class:"btnrow"},[re("button",{class:"primary",onclick:br},["⚔ Enter Arena"]),re("button",{disabled:t,onclick:()=>{Ae.roster=ph(Ae.roster,{name:e.name,genome:{...Ae.player}}),Tn(Ae),sn()}},[t?"✓ Saved":"💾 Save"])])]),a=[Wc(),t_(),re("div",{class:"layout"},[n,r])];Ae.showOpponent&&a.push(n_(e)),a.push(i_()),Sr.append(...a)}function n_(n){const e=Jl(n,Ae.wins,Ae.seed),t=Kn(n),i=Kn(e),s=i>t*1.12?re("span",{class:"verdict tough"},["Tougher than you — build to counter"]):i<t*.88?re("span",{class:"verdict easy"},["You out-power them"]):re("span",{class:"verdict even"},["Evenly matched"]);return re("div",{class:"panel opponent-panel"},[re("div",{class:"opponent-head"},[re("h2",{},["⚔ Next Opponent"]),re("div",{class:"btnrow",style:"margin:0"},[re("button",{title:"Scout a different opponent",onclick:()=>{Ae.seed=Ae.seed*1664525+1013904223>>>0,Tn(Ae),sn()}},["🔄 Scout another"])])]),ic(e),re("p",{class:"hint"},[s])])}function i_(){const n=Ae.roster.length===0?[re("p",{class:"hint"},["No saved creatures yet. Build one and hit 💾 Save."])]:Ae.roster.map((e,t)=>{const i=Ms(e.genome,e.name);return re("div",{class:"roster-item"},[re("span",{class:"roster-emoji"},[i.emoji]),re("div",{class:"roster-meta"},[re("div",{class:"roster-name"},[i.name]),re("div",{class:"roster-power"},[`Power ${Kn(i)}`])]),re("div",{class:"roster-actions"},[re("button",{onclick:()=>{Ae.player={...e.genome},Tn(Ae),sn()}},["Load"]),re("button",{title:"Delete","aria-label":`Delete ${i.name}`,onclick:()=>{Ae.roster=mh(Ae.roster,t),Tn(Ae),sn()}},["🗑"])])])});return re("div",{class:"panel roster-panel"},[re("h2",{},[`Saved Roster (${Ae.roster.length}/6)`]),re("div",{class:"roster-grid"},n)])}function br(){fd(),ws="arena";const n=Ms(Ae.player),e=Jl(n,Ae.wins,Ae.seed),t=(Ae.seed^Ae.wins*2654435761)>>>0,i=Qc(n,e,ys(t));Fa(Sr);const s=re("canvas",{id:"arena",role:"img","aria-label":"Battle arena replay"}),r=re("div",{class:"center"},[]);Sr.append(Wc(),re("div",{class:"panel arena-wrap"},[re("div",{class:"arena-fighters"},[re("div",{class:"fighter-tag"},[re("div",{class:"nm"},[`${n.emoji} ${n.name}`]),re("div",{class:"pw"},[`Power ${Kn(n)}`])]),re("div",{class:"fighter-tag right"},[re("div",{class:"nm"},[`${e.name} ${e.emoji}`]),re("div",{class:"pw"},[`Power ${Kn(e)}`])])]),s,r]));const a=Hc.find(o=>o.id===Ae.battleSpeed)?.mult??1;vs=Qg(s,i,o=>{vs=null,s_(r,o,e.name)},a)}function s_(n,e,t){ws="result";const i=e==="a";let s=null;i?(Ae.wins++,s=uh(Ae),pd()):e==="b"&&(Ae.losses++,md()),Ae.seed=Ae.seed*1664525+1013904223>>>0,Tn(Ae);const a=[i?re("div",{class:"result-banner win"},["VICTORY"]):e==="draw"?re("div",{class:"result-banner draw"},["DRAW"]):re("div",{class:"result-banner lose"},["DEFEAT"])];if(a.push(re("p",{class:"hint"},[i?`You beat ${t}.`:e==="draw"?`Stalemate with ${t}.`:`${t} beat you. Tweak your genome and try again.`])),s){const o=di(s);a.push(re("p",{class:"unlock-note"},[`🔓 New species unlocked: ${o.emoji} ${o.name}!`]))}a.push(re("div",{class:"btnrow",style:"justify-content:center"},[re("button",{class:"accent",onclick:br},["⚔ Fight Again"]),re("button",{onclick:sn},["🧪 Back to Lab"])])),Fa(n),n.append(re("div",{class:"fadein"},a))}window.addEventListener("keydown",n=>{const e=n.target?.tagName;e==="SELECT"||e==="INPUT"||e==="TEXTAREA"||(ws==="lab"?n.key==="r"||n.key==="R"?(n.preventDefault(),Gc()):n.key==="s"||n.key==="S"?(n.preventDefault(),Vc()):n.key==="Enter"&&(n.preventDefault(),br()):ws==="result"&&(n.key==="Enter"?(n.preventDefault(),br()):n.key==="Escape"&&(n.preventDefault(),sn())))});if(Qn.length===0)throw new Error("No animals defined");sn();
//# sourceMappingURL=index-DGqniqus.js.map
