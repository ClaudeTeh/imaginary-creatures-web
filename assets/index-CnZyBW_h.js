(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const xu="modulepreload",Eu=function(n,e){return new URL(n,e).href},sl={},Au=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");s=Promise.allSettled(t.map(c=>{if(c=Eu(c,i),c in sl)return;sl[c]=!0;const h=c.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(!!i)for(let g=o.length-1;g>=0;g--){const v=o[g];if(v.href===c&&(!h||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${u}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":xu,h||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),h)return new Promise((g,v)=>{f.addEventListener("load",g),f.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};function er(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let i=Math.imul(e^e>>>15,1|e);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function fa(n,e){return n()<e}function dh(n,e){return e[Math.floor(n()*e.length)]}function fh(){return Math.random()*4294967295>>>0}const fi=["head","body","forelimbs","hindlimbs","tail"],wu={health:0,attack:0,defense:0,speed:0,energy:0},pa={venom:{id:"venom",name:"Venom",cost:30,description:"Injects poison that deals damage over the next few ticks."},regenerate:{id:"regenerate",name:"Regenerate",cost:40,description:"Heals a chunk of health."},spit:{id:"spit",name:"Acid Spit",cost:25,description:"A ranged burst that ignores part of the enemy's defense."},charge:{id:"charge",name:"Charge",cost:35,description:"A heavy slam dealing big up-front damage."},armor:{id:"armor",name:"Plate Up",cost:30,description:"Temporarily raises defense."},frenzy:{id:"frenzy",name:"Frenzy",cost:35,description:"Sharply raises attack speed for a short time."},shock:{id:"shock",name:"Shock",cost:30,description:"Electric jolt that also briefly slows the enemy."},leech:{id:"leech",name:"Leech",cost:30,description:"Bite that heals for part of the damage dealt."}},rl={thickHide:{id:"thickHide",name:"Thick Hide",description:"+20% defense."},swift:{id:"swift",name:"Swift",description:"+15% speed."},predator:{id:"predator",name:"Predator",description:"+15% attack."},hardy:{id:"hardy",name:"Hardy",description:"+15% health."},keenSenses:{id:"keenSenses",name:"Keen Senses",description:"+10% energy gain."}},ol=100,Ru=4e3;function al(n,e){const t=e.traits.includes("keenSenses")?1.1:1;return{side:n,name:e.name,emoji:e.emoji,partEmojis:e.partEmojis,genome:e.genome,hp:e.stats.health,maxHp:e.stats.health,attack:e.stats.attack,defense:e.stats.defense,speed:Math.max(4,e.stats.speed),energyRegen:(2+e.stats.energy*.1)*t,energy:0,abilities:e.abilities,attackMeter:0,poison:[],armorTicks:0,frenzyTicks:0,slowTicks:0}}function ma(n){return n.armorTicks>0?n.defense*1.5:n.defense}function Cu(n){let e=n.speed;return n.frenzyTicks>0&&(e*=1.6),n.slowTicks>0&&(e*=.7),e}function Pu(n,e){return Math.max(1,Math.round(n.attack-ma(e)*.4))}function Lu(n,e,t){const i=al("a",n),s=al("b",e),r=[],o=[];let a=0;r.push({t:a,kind:"start",side:"a",maxHp:i.maxHp,name:i.name,emoji:i.emoji,partEmojis:i.partEmojis,genome:i.genome}),r.push({t:a,kind:"start",side:"b",maxHp:s.maxHp,name:s.name,emoji:s.emoji,partEmojis:s.partEmojis,genome:s.genome});const l=(h,u)=>{const d=h.abilities.map(g=>pa[g]).filter(g=>h.energy>=g.cost).sort((g,v)=>v.cost-g.cost);if(d.length===0)return!1;const f=d[0];return h.energy-=f.cost,Iu(f.id,h,u,r,o,a),!0};for(;i.hp>0&&s.hp>0&&a<Ru;){a++;for(const h of[i,s])if(h.energy+=h.energyRegen,h.armorTicks>0&&h.armorTicks--,h.frenzyTicks>0&&h.frenzyTicks--,h.slowTicks>0&&h.slowTicks--,h.poison.length>0){let u=0;for(const d of h.poison)u+=d.dmg,d.ticks--;h.poison=h.poison.filter(d=>d.ticks>0),u>0&&(h.hp-=u,r.push({t:a,kind:"poison",on:h.side,dmg:u,hp:Math.max(0,Math.round(h.hp))}))}if(i.hp<=0||s.hp<=0)break;for(const[h,u]of[[i,s],[s,i]])if(!(h.hp<=0||u.hp<=0)&&(l(h,u),!(u.hp<=0)&&(h.attackMeter+=Cu(h),h.attackMeter>=ol))){h.attackMeter-=ol;const d=fa(t,.08);let f=Pu(h,u);d&&(f=Math.round(f*1.5)),u.hp-=f,r.push({t:a,kind:"attack",by:h.side,dmg:f,crit:d,targetHp:Math.max(0,Math.round(u.hp))})}}let c;if(i.hp<=0&&s.hp<=0)c="draw";else if(s.hp<=0)c="a",r.push({t:a,kind:"death",side:"b"});else if(i.hp<=0)c="b",r.push({t:a,kind:"death",side:"a"});else{const h=i.hp/i.maxHp,u=s.hp/s.maxHp;c=h===u?"draw":h>u?"a":"b"}return o.push(`Winner: ${c} after ${a} ticks (A ${Math.max(0,Math.round(i.hp))}/${i.maxHp}, B ${Math.max(0,Math.round(s.hp))}/${s.maxHp})`),{winner:c,ticks:a,events:r,log:o}}function Iu(n,e,t,i,s,r,o){switch(n){case"venom":{const a=Math.max(1,Math.round(e.attack*.3));t.poison.push({dmg:a,ticks:5}),i.push({t:r,kind:"ability",by:e.side,ability:n,value:a,targetHp:Math.max(0,Math.round(t.hp))}),s.push(`${e.name} envenoms ${t.name} (${a}/tick)`);break}case"regenerate":{const a=Math.round(e.maxHp*.18);e.hp=Math.min(e.maxHp,e.hp+a),i.push({t:r,kind:"heal",on:e.side,amount:a,hp:Math.round(e.hp)});break}case"spit":{const a=Math.max(1,Math.round(e.attack*.9-t.defense*.2));t.hp-=a,i.push({t:r,kind:"ability",by:e.side,ability:n,value:a,targetHp:Math.max(0,Math.round(t.hp))});break}case"charge":{const a=Math.max(1,Math.round(e.attack*1.8-ma(t)*.4));t.hp-=a,i.push({t:r,kind:"ability",by:e.side,ability:n,value:a,targetHp:Math.max(0,Math.round(t.hp))});break}case"armor":{e.armorTicks=Math.max(e.armorTicks,35),i.push({t:r,kind:"ability",by:e.side,ability:n,value:35,targetHp:Math.round(e.hp)});break}case"frenzy":{e.frenzyTicks=Math.max(e.frenzyTicks,45),i.push({t:r,kind:"ability",by:e.side,ability:n,value:45,targetHp:Math.round(e.hp)});break}case"shock":{const a=Math.max(1,Math.round(e.attack*.7));t.hp-=a,t.slowTicks=Math.max(t.slowTicks,25),i.push({t:r,kind:"ability",by:e.side,ability:n,value:a,targetHp:Math.max(0,Math.round(t.hp))});break}case"leech":{const a=Math.max(1,Math.round(e.attack*1.1-ma(t)*.4));t.hp-=a;const l=Math.round(a*.5);e.hp=Math.min(e.maxHp,e.hp+l),i.push({t:r,kind:"ability",by:e.side,ability:n,value:a,targetHp:Math.max(0,Math.round(t.hp))}),i.push({t:r,kind:"heal",on:e.side,amount:l,hp:Math.round(e.hp)});break}}}const $n=[{id:"ant",name:"Ant",emoji:"🐜",tier:1,parts:{head:{stats:{attack:6,energy:4},ability:"venom"},body:{stats:{health:18,defense:4}},forelimbs:{stats:{attack:5}},hindlimbs:{stats:{speed:6},trait:"swift"},tail:{stats:{energy:6}}}},{id:"rabbit",name:"Rabbit",emoji:"🐇",tier:1,parts:{head:{stats:{attack:5,energy:7},trait:"keenSenses"},body:{stats:{health:24,speed:3}},forelimbs:{stats:{attack:7}},hindlimbs:{stats:{speed:10},ability:"frenzy",trait:"swift"},tail:{stats:{speed:4}}}},{id:"crab",name:"Crab",emoji:"🦀",tier:1,parts:{head:{stats:{defense:4}},body:{stats:{health:26,defense:8},trait:"thickHide"},forelimbs:{stats:{attack:9,defense:2},ability:"charge"},hindlimbs:{stats:{speed:2}},tail:{stats:{defense:4}}}},{id:"gecko",name:"Gecko",emoji:"🦎",tier:1,parts:{head:{stats:{attack:7,energy:7},ability:"spit"},body:{stats:{health:22,defense:3},ability:"regenerate"},forelimbs:{stats:{attack:8}},hindlimbs:{stats:{speed:8}},tail:{stats:{energy:6},ability:"regenerate"}}},{id:"boar",name:"Boar",emoji:"🐗",tier:1,parts:{head:{stats:{attack:7},ability:"charge"},body:{stats:{health:25,defense:5},trait:"hardy"},forelimbs:{stats:{attack:6}},hindlimbs:{stats:{speed:5}},tail:{stats:{health:6}}}},{id:"wolf",name:"Wolf",emoji:"🐺",tier:2,parts:{head:{stats:{attack:11,energy:4},ability:"leech",trait:"predator"},body:{stats:{health:34,defense:6}},forelimbs:{stats:{attack:10}},hindlimbs:{stats:{speed:11},trait:"swift"},tail:{stats:{speed:5}}}},{id:"cobra",name:"Cobra",emoji:"🐍",tier:2,parts:{head:{stats:{attack:9,energy:8},ability:"venom"},body:{stats:{health:28,defense:4}},forelimbs:{stats:{attack:6}},hindlimbs:{stats:{speed:8}},tail:{stats:{attack:7,energy:4},ability:"venom"}}},{id:"scorpion",name:"Scorpion",emoji:"🦂",tier:2,parts:{head:{stats:{attack:8,defense:3}},body:{stats:{health:30,defense:9},trait:"thickHide"},forelimbs:{stats:{attack:12,energy:4},ability:"venom"},hindlimbs:{stats:{speed:6}},tail:{stats:{attack:10,energy:6},ability:"venom",trait:"predator"}}},{id:"eagle",name:"Eagle",emoji:"🦅",tier:2,parts:{head:{stats:{attack:12,energy:6},trait:"keenSenses"},body:{stats:{health:26,speed:6}},forelimbs:{stats:{attack:9,speed:4},ability:"spit"},hindlimbs:{stats:{speed:13},trait:"swift"},tail:{stats:{speed:7}}}},{id:"gorilla",name:"Gorilla",emoji:"🦍",tier:2,parts:{head:{stats:{attack:10,defense:4}},body:{stats:{health:44,defense:8},trait:"hardy"},forelimbs:{stats:{attack:15},ability:"frenzy",trait:"predator"},hindlimbs:{stats:{speed:6}},tail:{stats:{health:10}}}},{id:"bear",name:"Bear",emoji:"🐻",tier:3,parts:{head:{stats:{attack:14,defense:4},ability:"frenzy"},body:{stats:{health:56,defense:10},trait:"hardy"},forelimbs:{stats:{attack:18},ability:"charge",trait:"predator"},hindlimbs:{stats:{speed:7}},tail:{stats:{health:12}}}},{id:"rhino",name:"Rhino",emoji:"🦏",tier:3,parts:{head:{stats:{attack:16,defense:6},ability:"charge"},body:{stats:{health:64,defense:16},trait:"thickHide",ability:"armor"},forelimbs:{stats:{attack:12}},hindlimbs:{stats:{speed:8}},tail:{stats:{defense:6}}}},{id:"eel",name:"Electric Eel",emoji:"🐡",tier:3,parts:{head:{stats:{attack:12,energy:10},ability:"shock"},body:{stats:{health:32,defense:5},ability:"shock"},forelimbs:{stats:{attack:8,energy:6}},hindlimbs:{stats:{speed:10},trait:"swift"},tail:{stats:{attack:10,energy:8},ability:"shock",trait:"keenSenses"}}},{id:"tiger",name:"Tiger",emoji:"🐅",tier:3,parts:{head:{stats:{attack:15,energy:6},ability:"leech",trait:"predator"},body:{stats:{health:46,defense:8}},forelimbs:{stats:{attack:14},ability:"frenzy"},hindlimbs:{stats:{speed:12},trait:"swift"},tail:{stats:{speed:8}}}},{id:"dragon",name:"Dragon",emoji:"🐉",tier:3,parts:{head:{stats:{attack:18,energy:10},ability:"spit",trait:"predator"},body:{stats:{health:58,defense:10},ability:"frenzy",trait:"hardy"},forelimbs:{stats:{attack:16,energy:6},ability:"charge"},hindlimbs:{stats:{speed:10},trait:"swift"},tail:{stats:{attack:12,energy:8},ability:"shock"}}},{id:"jellyfish",name:"Jellyfish",emoji:"🪼",tier:3,parts:{head:{stats:{attack:10,energy:14},ability:"shock",trait:"keenSenses"},body:{stats:{health:38,defense:6},ability:"regenerate"},forelimbs:{stats:{attack:8,energy:8},ability:"leech"},hindlimbs:{stats:{speed:9},trait:"swift"},tail:{stats:{energy:10},ability:"venom"}}}],Du=Object.fromEntries($n.map(n=>[n.id,n]));function Pi(n){const e=Du[n];if(!e)throw new Error(`Unknown animal id: ${n}`);return e}const Nu=.12;function Uu(n,e,t,i={}){const s=i.mutationRate??Nu,r=i.pool??$n.map(a=>a.id),o={};for(const a of fi)fa(t,s)?o[a]=dh(t,r):o[a]=fa(t,.5)?n[a]:e[a];return o}function Yr(n,e=$n.map(t=>t.id)){const t={};for(const i of fi)t[i]=dh(n,e);return t}function tr(n,e){const t={...wu},i=new Set,s=new Set;for(const o of fi){const l=Pi(n[o]).parts[o];for(const c of Object.keys(l.stats))t[c]+=l.stats[c]??0;l.ability&&i.add(l.ability),l.trait&&s.add(l.trait)}s.has("thickHide")&&(t.defense=Math.round(t.defense*1.2)),s.has("swift")&&(t.speed=Math.round(t.speed*1.15)),s.has("predator")&&(t.attack=Math.round(t.attack*1.15)),s.has("hardy")&&(t.health=Math.round(t.health*1.15));const r=fi.reduce((o,a)=>(o[a]=Pi(n[a]).emoji,o),{});return{name:e??Ou(n),genome:n,emoji:Pi(n.head).emoji,partEmojis:r,stats:t,abilities:[...i],traits:[...s]}}function Ou(n){const e=Pi(n.head).name,t=Pi(n.body).name,i=e.slice(0,Math.ceil(e.length/2)),s=t.slice(Math.floor(t.length/2)),r=(i+s).toLowerCase();return r.charAt(0).toUpperCase()+r.slice(1)}function pi(n){const e=n.stats;return Math.round(e.health*.5+e.attack*2+e.defense*1.5+e.speed*1+e.energy*.4+n.abilities.length*6+n.traits.length*4)}function ph(n){return fi.reduce((e,t)=>(e[t]=n,e),{})}function Fu(n){return{head:"Head",body:"Body",forelimbs:"Forelimbs",hindlimbs:"Hindlimbs",tail:"Tail"}[n]}function mh(n,e,t){const i=er(t^2654435769),s=e<3?1:e<7?2:3,r=$n.filter(h=>h.tier<=s).map(h=>h.id),o=pi(n)*(.85+Math.min(e,12)*.02);let a=Yr(i,r),l=1/0;for(let h=0;h<12;h++){const u=Yr(i,r),d=Math.abs(pi(tr(u))-o);d<l&&(l=d,a=u)}const c=tr(a);return{...c,name:ku(i,c.name)}}function ku(n,e){const t=["Wild","Feral","Rogue","Alpha","Ravenous","Ancient","Savage"];return`${t[Math.floor(n()*t.length)]} ${e}`}const gh="imaginary-creatures.save.v1",Kr=["ant","rabbit","crab","gecko","boar"],Bu=$n.filter(n=>!Kr.includes(n.id)).sort((n,e)=>n.tier-e.tier).map(n=>n.id);function zu(n){return $n.filter(e=>e.tier<=n).map(e=>e.id)}function ga(n=1,e){const t=n===1?[...Kr]:zu(n),i=t[t.length-1]??"boar";return{unlocked:t,player:ph(i),wins:0,losses:0,seed:fh(),muted:e?.muted??!1,roster:[],battleSpeed:e?.battleSpeed??"normal",showOpponent:e?.showOpponent??!0}}function Hu(){try{const n=localStorage.getItem(gh);if(!n)return ga();const e=JSON.parse(n),t=new Set($n.map(r=>r.id)),i=(e.unlocked??Kr).filter(r=>t.has(r)),s=Vu(e.player,i);return{unlocked:i.length?i:[...Kr],player:s,wins:e.wins??0,losses:e.losses??0,seed:e.seed??fh(),muted:e.muted??!1,roster:Gu(e.roster,t),battleSpeed:["slow","normal","fast","instant"].includes(e.battleSpeed)?e.battleSpeed:"normal",showOpponent:e.showOpponent??!0}}catch{return ga()}}function Gu(n,e){return Array.isArray(n)?n.filter(t=>t&&typeof t.name=="string"&&t.genome&&["head","body","forelimbs","hindlimbs","tail"].every(i=>e.has(t.genome[i]))):[]}function Nn(n){try{localStorage.setItem(gh,JSON.stringify(n))}catch{}}function Vu(n,e){const t=e[0]??"boar",i=ph(t);if(!n)return i;const s=new Set(e);return{head:s.has(n.head??"")?n.head:t,body:s.has(n.body??"")?n.body:t,forelimbs:s.has(n.forelimbs??"")?n.forelimbs:t,hindlimbs:s.has(n.hindlimbs??"")?n.hindlimbs:t,tail:s.has(n.tail??"")?n.tail:t}}function Wu(n){for(const e of Bu)if(!n.unlocked.includes(e))return n.unlocked.push(e),e;return null}const Xu=6;function $r(n){return fi.map(e=>n[e]).join("|")}function qu(n,e){const t=$r(e.genome),i=n.filter(s=>$r(s.genome)!==t);return[e,...i].slice(0,Xu)}function ju(n,e){return n.filter((t,i)=>i!==e)}function Yu(n,e){const t=$r(e);return n.some(i=>$r(i.genome)===t)}function re(n,e={},t=[]){const i=document.createElement(n);for(const[s,r]of Object.entries(e))r===void 0||r===!1||(s==="class"?i.className=String(r):s.startsWith("on")&&typeof r=="function"?i.addEventListener(s.slice(2).toLowerCase(),r):s==="html"?i.innerHTML=String(r):i.setAttribute(s,String(r)));for(const s of t)i.append(typeof s=="string"?document.createTextNode(s):s);return i}function Na(n){n.replaceChildren()}function Ku(n){return{health:"#6ce5b1",attack:"#ff8f6b",defense:"#7aa2ff",speed:"#ffce6b",energy:"#c39bff"}[n]??"#9aa7c4"}const on={ant:{fill:"#2a1205",shade:"#120800",accent:"#d43010"},rabbit:{fill:"#f0e6dc",shade:"#b89888",accent:"#ff8898"},crab:{fill:"#d44018",shade:"#922808",accent:"#f8a040"},gecko:{fill:"#4a8c20",shade:"#2a5010",accent:"#a8e030"},boar:{fill:"#5c3820",shade:"#301808",accent:"#c09048"},wolf:{fill:"#888070",shade:"#484038",accent:"#d8ccc0"},cobra:{fill:"#2a6c14",shade:"#184008",accent:"#e8d020"},scorpion:{fill:"#8c7410",shade:"#504000",accent:"#f0c020"},eagle:{fill:"#5a380c",shade:"#2c1808",accent:"#f8f0d0"},gorilla:{fill:"#1c1c14",shade:"#080808",accent:"#706858"},bear:{fill:"#5c2c0c",shade:"#2c1408",accent:"#c08040"},rhino:{fill:"#707060",shade:"#3c3c30",accent:"#c0b898"},eel:{fill:"#106050",shade:"#083028",accent:"#50e8d0"},tiger:{fill:"#c86008",shade:"#6c2e00",accent:"#f0a828"},dragon:{fill:"#7c1010",shade:"#3c0808",accent:"#ff6030"},jellyfish:{fill:"#3c1870",shade:"#1c0840",accent:"#b060ff"}};function $u(n){const e=n.replace("#",""),t=parseInt(e.length===3?e.split("").map(i=>i+i).join(""):e,16);return[t>>16&255,t>>8&255,t&255]}function Mo(n,e){const[t,i,s]=$u(n),r=e<0?0:255,o=Math.abs(e),a=l=>Math.round(l+(r-l)*o);return`rgb(${a(t)},${a(i)},${a(s)})`}function pt(n,e,t,i,s,r){const o=e-i*.42,a=t-i*.42,l=n.createRadialGradient(o,a,i*.04,e,t,i*1.06);return l.addColorStop(0,Mo(s,.55)),l.addColorStop(.22,Mo(s,.16)),l.addColorStop(.62,s),l.addColorStop(.88,r),l.addColorStop(1,Mo(r,-.35)),l}function Qe(n,e,t,i,s,r=0){n.beginPath(),n.ellipse(e,t,i,s,r,0,Math.PI*2)}function _h(n,e,t,i){const s=on[e]??on.boar;switch(n.save(),e){case"ant":Ju(n,s,t);break;case"rabbit":Zu(n,s,i);break;case"crab":Qu(n,s,i);break;case"gecko":ed(n,s);break;case"boar":ll(n,s,i);break;case"wolf":td(n,s,i);break;case"cobra":nd(n,s,t);break;case"scorpion":id(n,s);break;case"eagle":sd(n,s,i);break;case"gorilla":rd(n,s,i);break;case"bear":od(n,s);break;case"rhino":ad(n,s);break;case"eel":ld(n,s,i);break;case"tiger":cd(n,s,i);break;default:ll(n,s,i)}n.restore()}function xs(n,e,t=22,i=20){Qe(n,0,0,t,i),n.fillStyle=pt(n,0,0,t,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke()}function $t(n,e,t,i,s){n.fillStyle=s,n.beginPath(),n.arc(e,t,i,0,Math.PI*2),n.fill(),n.fillStyle="#000",n.beginPath(),n.arc(e+1,t,i*.55,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.6)",n.beginPath(),n.arc(e-i*.3,t-i*.3,i*.3,0,Math.PI*2),n.fill()}function Ju(n,e,t){xs(n,e,18,16),$t(n,10,-7,4,e.accent),n.strokeStyle=e.shade,n.lineWidth=2.5,n.beginPath(),n.moveTo(14,-4),n.quadraticCurveTo(26,-1,24,8),n.stroke(),n.beginPath(),n.moveTo(14,4),n.quadraticCurveTo(26,1,24,-8),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=1.5;const i=Math.sin(t)*5;n.beginPath(),n.moveTo(-3,-16),n.quadraticCurveTo(-14,-34+i,-20,-44+i*.5),n.stroke(),n.beginPath(),n.moveTo(4,-16),n.quadraticCurveTo(-6,-36-i,-12,-44-i*.5),n.stroke(),n.fillStyle=e.accent,n.beginPath(),n.arc(-20,-44+i*.5,2.5,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(-12,-44-i*.5,2.5,0,Math.PI*2),n.fill()}function Zu(n,e,t){n.fillStyle=pt(n,-10,-34,18,e.fill,e.shade),Qe(n,-10,-34,7,18,-.2),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,Qe(n,-10,-34,4,13,-.2),n.fill(),xs(n,e,20,18),$t(n,12,-6,5,e.accent),n.fillStyle=e.accent,n.beginPath(),n.arc(18+t*4,3,3,0,Math.PI*2),n.fill()}function Qu(n,e,t){Qe(n,0,0,28,16),n.fillStyle=pt(n,0,0,28,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(-12,-14),n.lineTo(-14,-24-t*4),n.stroke(),n.beginPath(),n.moveTo(12,-14),n.lineTo(14,-24-t*4),n.stroke(),$t(n,-14,-26-t*4,4,e.accent),$t(n,14,-26-t*4,4,e.accent),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(22,-4),n.quadraticCurveTo(34,0,32,8),n.stroke(),n.beginPath(),n.moveTo(22,4),n.quadraticCurveTo(34,0,32,-8),n.stroke()}function ed(n,e){Qe(n,2,0,26,14,0),n.fillStyle=pt(n,2,0,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),$t(n,14,-6,6,e.accent),n.fillStyle=e.accent,n.globalAlpha=.5,[[-6,-4],[-12,2],[-4,6]].forEach(([t,i])=>{n.beginPath(),n.arc(t,i,2.5,0,Math.PI*2),n.fill()}),n.globalAlpha=1}function ll(n,e,t){n.fillStyle=e.shade,Qe(n,-14,-20,7,9,-.3),n.fill(),n.fillStyle=e.accent,Qe(n,-14,-20,4,6,-.3),n.fill(),xs(n,e,22,20),$t(n,8,-8,4,"#f0e000"),Qe(n,18,4,10,8),n.fillStyle=e.shade,n.fill(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.stroke(),n.strokeStyle="#e0d8b0",n.lineWidth=3,n.beginPath(),n.moveTo(14,8+t*2),n.quadraticCurveTo(28,14,26,22),n.stroke(),n.beginPath(),n.moveTo(14,-8-t*2),n.quadraticCurveTo(28,-14,26,-22),n.stroke()}function td(n,e,t){n.fillStyle=e.fill,n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(-12,-18),n.lineTo(-6,-36),n.lineTo(4,-18),n.closePath(),n.fill(),n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.6,n.beginPath(),n.moveTo(-10,-20),n.lineTo(-6,-32),n.lineTo(2,-20),n.closePath(),n.fill(),n.globalAlpha=1,Qe(n,4,0,26,18),n.fillStyle=pt(n,4,0,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),$t(n,14,-8,5,"#f0d040"),Qe(n,20,4,10,8),n.fillStyle=e.shade,n.fill(),t>.3&&(n.strokeStyle="#f0e0c0",n.lineWidth=2,n.beginPath(),n.moveTo(12,6),n.lineTo(26+t*4,6+t*10),n.stroke())}function nd(n,e,t){n.fillStyle=pt(n,0,0,32,e.fill,e.shade),n.beginPath(),n.ellipse(0,0,32,26,0,Math.PI*.15,Math.PI*.85),n.quadraticCurveTo(-10,14,0,20),n.quadraticCurveTo(10,14,0,0),n.closePath(),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.6,n.beginPath(),n.ellipse(0,-4,18,14,0,Math.PI*.2,Math.PI*.8),n.stroke(),n.globalAlpha=1,Qe(n,6,2,14,10),n.fillStyle=e.fill,n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),$t(n,12,-4,4,e.accent);const i=Math.sin(t*4)*3;n.strokeStyle="#e02020",n.lineWidth=1.5,n.beginPath(),n.moveTo(18,4),n.lineTo(26,4+i),n.moveTo(26,4+i),n.lineTo(30,2+i),n.moveTo(26,4+i),n.lineTo(30,6+i),n.stroke()}function id(n,e){Qe(n,0,0,20,14),n.fillStyle=pt(n,0,0,20,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),$t(n,12,-6,3,e.accent),$t(n,6,-10,2.5,e.accent),n.strokeStyle=e.shade,n.lineWidth=2.5,n.beginPath(),n.moveTo(16,-4),n.quadraticCurveTo(28,-2,26,6),n.stroke(),n.beginPath(),n.moveTo(16,4),n.quadraticCurveTo(28,2,26,-6),n.stroke()}function sd(n,e,t){Qe(n,0,0,22,20),n.fillStyle=pt(n,0,0,22,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.7,Qe(n,2,-2,16,12),n.fill(),n.globalAlpha=1,$t(n,10,-6,5,e.accent),n.fillStyle="#e0b020",n.strokeStyle="#a07010",n.lineWidth=2,n.beginPath(),n.moveTo(16,-2),n.lineTo(34+t*5,-1+t*3),n.lineTo(32+t*5,8+t*4),n.lineTo(18,6),n.closePath(),n.fill(),n.stroke()}function rd(n,e,t){xs(n,e,24,22),n.fillStyle=e.shade,Qe(n,0,-14,20,6),n.fill(),$t(n,10,-8,4.5,"#b06030"),Qe(n,12,6,9,7),n.fillStyle=e.shade,n.fill(),t>.3&&(n.strokeStyle="#e05020",n.lineWidth=3,n.beginPath(),n.arc(12,8+t*4,6,.1,Math.PI-.1),n.stroke())}function od(n,e){n.fillStyle=e.shade,Qe(n,-14,-18,9,8),n.fill(),n.fillStyle=e.fill,Qe(n,-14,-18,6,5),n.fill(),xs(n,e,24,22),$t(n,10,-7,4.5,"#2a1c08"),Qe(n,16,6,10,8),n.fillStyle=e.shade,n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke()}function ad(n,e){Qe(n,0,2,26,22),n.fillStyle=pt(n,0,0,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.5,[[-16,-12,-10,-8],[-6,-18,0,-14]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.quadraticCurveTo((t+s)/2,(i+r)/2-4,s,r),n.stroke()}),n.globalAlpha=1,n.fillStyle=e.shade,n.beginPath(),n.moveTo(14,-14),n.lineTo(22,-36),n.lineTo(28,-14),n.closePath(),n.fill(),$t(n,10,-4,4,e.accent)}function ld(n,e,t){Qe(n,4,0,24,12),n.fillStyle=pt(n,4,0,24,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.7,[-8,-4,0].forEach(i=>{n.beginPath(),n.moveTo(i,-10),n.lineTo(i,10),n.stroke()}),n.globalAlpha=1,$t(n,14,-5,4,e.accent),n.fillStyle=t>.2?"#400820":e.shade,n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(20,-4),n.lineTo(36+t*8,-4+t*6),n.lineTo(36+t*8,4-t*6),n.lineTo(20,4),n.closePath(),n.fill(),n.stroke()}function cd(n,e,t){n.fillStyle=e.fill,n.strokeStyle=e.shade,n.lineWidth=2,Qe(n,-14,-18,7,7),n.fill(),n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.5,Qe(n,-14,-18,4,4),n.fill(),n.globalAlpha=1,xs(n,e,22,20),n.strokeStyle="#1c0c00",n.lineWidth=3,n.globalAlpha=.6,[[-8,-18,-4,6],[0,-20,4,4],[8,-18,12,6]].forEach(([i,s,r,o])=>{n.beginPath(),n.moveTo(i,s),n.lineTo(r,o),n.stroke()}),n.globalAlpha=1,$t(n,10,-7,5,"#f0c040"),Qe(n,16,4,8,7),n.fillStyle=e.shade,n.fill(),t>.2&&(n.strokeStyle="#f8e8d0",n.lineWidth=2,n.beginPath(),n.moveTo(10,6),n.lineTo(24+t*4,6+t*8),n.stroke())}function vh(n,e,t){const i=on[e]??on.boar;switch(n.save(),e){case"ant":hd(n,i);break;case"rabbit":ud(n,i,t);break;case"crab":dd(n,i);break;case"gecko":fd(n,i,t);break;case"boar":cl(n,i,t);break;case"wolf":pd(n,i,t);break;case"cobra":md(n,i,t);break;case"scorpion":gd(n,i);break;case"eagle":_d(n,i,t);break;case"gorilla":vd(n,i,t);break;case"bear":yd(n,i,t);break;case"rhino":Md(n,i);break;case"eel":bd(n,i,t);break;case"tiger":Sd(n,i,t);break;default:cl(n,i,t)}n.restore()}function hd(n,e){Qe(n,10,0,14,12),n.fillStyle=pt(n,10,0,14,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),Qe(n,-12,4,18,14),n.fillStyle=pt(n,-12,4,18,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.6,n.beginPath(),n.ellipse(-12,4,14,10,0,0,Math.PI*2),n.stroke(),n.globalAlpha=1}function ud(n,e,t){const i=1+t*.02,s=1-t*.01;n.scale(i,s),Qe(n,0,0,24,22),n.fillStyle=pt(n,0,0,24,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke()}function dd(n,e){Qe(n,0,0,30,20),n.fillStyle=pt(n,0,0,30,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.globalAlpha=.5,[[-16,0,-10,-16],[0,-4,0,-18],[16,0,10,-16]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke()}),n.globalAlpha=1}function fd(n,e,t){n.scale(1+t*.015,1),Qe(n,0,0,20,14),n.fillStyle=pt(n,0,0,20,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.4,[-12,-4,4,12].forEach(i=>{n.beginPath(),n.arc(i,0,3,0,Math.PI*2),n.fill()}),n.globalAlpha=1}function cl(n,e,t){n.scale(1+t*.02,1+t*.01),Qe(n,0,2,26,22),n.fillStyle=pt(n,0,2,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.5,[-14,-6,2,10,18].forEach(i=>{n.beginPath(),n.moveTo(i,-20),n.lineTo(i-1,-28),n.stroke()}),n.globalAlpha=1}function pd(n,e,t){n.scale(1+t*.018,1),Qe(n,0,0,22,18),n.fillStyle=pt(n,0,0,22,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.25,Qe(n,6,4,10,8),n.fill(),n.globalAlpha=1}function md(n,e,t){n.strokeStyle=pt(n,0,4,20,e.fill,e.shade),n.lineWidth=14+t*2,n.lineCap="round",n.beginPath(),n.moveTo(20,-10),n.bezierCurveTo(28,0,20,14,0,12),n.bezierCurveTo(-20,10,-24,-4,-16,-10),n.bezierCurveTo(-8,-16,8,-8,8,4),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(20,-10),n.bezierCurveTo(28,0,20,14,0,12),n.bezierCurveTo(-20,10,-24,-4,-16,-10),n.stroke()}function gd(n,e){Qe(n,4,0,18,12),n.fillStyle=pt(n,4,0,18,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.6,[-8,-2,4,10].forEach(t=>{n.beginPath(),n.moveTo(t,-10),n.lineTo(t,10),n.stroke()}),n.globalAlpha=1}function _d(n,e,t){n.scale(1+t*.015,1),Qe(n,0,0,22,20),n.fillStyle=pt(n,0,0,22,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.35,Qe(n,4,4,12,10),n.fill(),n.globalAlpha=1,n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.35,[[-16,-10,-8,6],[-8,-14,0,8],[0,-16,8,8]].forEach(([i,s,r,o])=>{n.beginPath(),n.moveTo(i,s),n.lineTo(r,o),n.stroke()}),n.globalAlpha=1}function vd(n,e,t){n.scale(1+t*.025,1+t*.015),Qe(n,0,0,30,26),n.fillStyle=pt(n,0,0,30,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=3,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.2,Qe(n,4,6,14,12),n.fill(),n.globalAlpha=1}function yd(n,e,t){n.scale(1+t*.022,1+t*.012),Qe(n,0,2,28,26),n.fillStyle=pt(n,0,2,28,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke()}function Md(n,e){Qe(n,0,2,32,24),n.fillStyle=pt(n,0,2,32,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=3,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.globalAlpha=.4,[[-20,-14,-24,6],[0,-18,-4,8],[18,-14,20,6]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke()}),n.globalAlpha=1}function bd(n,e,t){n.strokeStyle=pt(n,0,0,20,e.fill,e.shade),n.lineWidth=18+t*2,n.lineCap="round",n.beginPath(),n.moveTo(22,-6),n.bezierCurveTo(10,-4,-10,4,-24,2),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(22,-6),n.bezierCurveTo(10,-4,-10,4,-24,2),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.6,n.beginPath(),n.moveTo(22,-6),n.bezierCurveTo(10,0,-10,8,-24,6),n.stroke(),n.globalAlpha=1}function Sd(n,e,t){n.scale(1+t*.018,1),Qe(n,0,0,24,20),n.fillStyle=pt(n,0,0,24,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle="#1c0c00",n.lineWidth=3,n.globalAlpha=.55,[[-14,-18,-10,14],[-4,-20,0,16],[6,-18,10,14],[16,-14,20,10]].forEach(([i,s,r,o])=>{n.beginPath(),n.moveTo(i,s),n.lineTo(r,o),n.stroke()}),n.globalAlpha=1}function yh(n,e,t){const i=on[e]??on.boar;switch(n.save(),e){case"ant":case"scorpion":Ad(n,i,3,t);break;case"crab":xd(n,i,t);break;case"eagle":Ed(n,i,t);break;case"cobra":case"eel":wd(n,i);break;default:Td(n,i,e,t);break}n.restore()}function Td(n,e,t,i){const s=["gorilla","bear","rhino"].includes(t),r=s?9:7,o=s?28:22;if(n.strokeStyle=e.shade,n.lineWidth=r*2,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(o*.5,o*.6-i*6),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=r*2-3,n.beginPath(),n.moveTo(0,0),n.lineTo(o*.5,o*.6-i*6),n.stroke(),n.fillStyle=e.shade,n.beginPath(),n.arc(o*.5,o*.6-i*6,r+1,0,Math.PI*2),n.fill(),n.fillStyle=e.fill,n.beginPath(),n.arc(o*.5,o*.6-i*6,r,0,Math.PI*2),n.fill(),["wolf","tiger","gecko","gorilla","bear","eagle"].includes(t)){n.strokeStyle="#d8c8a0",n.lineWidth=1.5;const a=o*.5,l=o*.6-i*6;[-6,0,6].forEach(c=>{n.beginPath(),n.moveTo(a+c,l+r),n.lineTo(a+c*.6,l+r+8),n.stroke()})}}function xd(n,e,t){n.strokeStyle=e.shade,n.lineWidth=10,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(18,18),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=7,n.beginPath(),n.moveTo(0,0),n.lineTo(18,18),n.stroke(),n.fillStyle=pt(n,20,20,14,e.fill,e.shade),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(14,14),n.lineTo(34+t*8,8-t*4),n.lineTo(34+t*8,16-t*2),n.closePath(),n.fill(),n.stroke(),n.beginPath(),n.moveTo(14,14),n.lineTo(28+t*6,22+t*4),n.lineTo(26+t*5,14+t),n.closePath(),n.fill(),n.stroke()}function Ed(n,e,t){const i=1+t*.4;n.fillStyle=pt(n,0,0,30,e.fill,e.shade),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-10,-20*i,-30,-28*i,-40,-20*i),n.quadraticCurveTo(-28,-8,0,12),n.closePath(),n.fill(),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.4,[[-10,-6],[-20,-10],[-30,-12]].forEach(([s,r])=>{n.beginPath(),n.moveTo(0,4),n.lineTo(s,r*i),n.stroke()}),n.globalAlpha=1}function Ad(n,e,t,i){n.strokeStyle=e.shade,n.lineWidth=3,n.lineCap="round";for(let s=0;s<t;s++){const r=s/(t-1)*.8+.1,o=8+s*8,a=-8+r*20;n.beginPath(),n.moveTo(s*4-4,0),n.quadraticCurveTo(o+i*6,a,o+12+i*8,a+16),n.stroke()}}function wd(n,e){n.fillStyle=e.shade,n.globalAlpha=.5,n.beginPath(),n.arc(0,0,8,0,Math.PI*2),n.fill(),n.globalAlpha=1}function Mh(n,e,t){const i=on[e]??on.boar;switch(n.save(),e){case"ant":case"scorpion":Id(n,i,3,t);break;case"crab":Ld(n,i);break;case"cobra":case"eel":Dd(n);break;case"eagle":Pd(n,i,t);break;case"rhino":case"boar":Cd(n,i,t);break;default:Rd(n,i,e,t);break}n.restore()}function Rd(n,e,t,i){const r=["gorilla","bear"].includes(t)?10:8;n.strokeStyle=e.shade,n.lineWidth=r*2,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(-6-i*6,20+i*4),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=r*2-4,n.beginPath(),n.moveTo(0,0),n.lineTo(-6-i*6,20+i*4),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=r*1.5,n.lineCap="round",n.beginPath(),n.moveTo(-6-i*6,20+i*4),n.lineTo(-2,36),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=r*1.5-3,n.beginPath(),n.moveTo(-6-i*6,20+i*4),n.lineTo(-2,36),n.stroke(),n.fillStyle=e.shade,n.beginPath(),n.arc(-2,36,r,0,Math.PI*2),n.fill(),n.fillStyle=e.fill,n.beginPath(),n.arc(-2,36,r-2,0,Math.PI*2),n.fill()}function Cd(n,e,t){n.strokeStyle=e.shade,n.lineWidth=14,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(-4-t*5,22),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=10,n.beginPath(),n.moveTo(0,0),n.lineTo(-4-t*5,22),n.stroke(),n.fillStyle="#2a2010",n.beginPath(),n.ellipse(-4,30,9,7,.2,0,Math.PI*2),n.fill()}function Pd(n,e,t){n.strokeStyle=e.shade,n.lineWidth=10,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(-2-t*4,24),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=7,n.beginPath(),n.moveTo(0,0),n.lineTo(-2-t*4,24),n.stroke(),n.strokeStyle="#d0b030",n.lineWidth=2.5;const i=24;[[-10,32],[-2,36],[6,32]].forEach(([s,r])=>{n.beginPath(),n.moveTo(-2,i),n.lineTo(s,r+t*4),n.stroke()})}function Ld(n,e){n.strokeStyle=e.shade,n.lineWidth=5,n.lineCap="round",[[-12,16,-18,28],[-4,18,-6,32],[4,16,8,28]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=3,n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=5})}function Id(n,e,t,i){n.strokeStyle=e.shade,n.lineWidth=3,n.lineCap="round";for(let s=0;s<t;s++)n.beginPath(),n.moveTo(-s*6,0),n.quadraticCurveTo(-8-s*4,14+i*4,-4-s*5,28),n.stroke()}function Dd(n){n.globalAlpha=0,n.globalAlpha=1}function bh(n,e,t){const i=on[e]??on.boar;switch(n.save(),e){case"ant":bo(n,i,t,"short");break;case"rabbit":Nd(n,i);break;case"crab":break;case"gecko":Od(n,i,t);break;case"boar":Ud(n,i,t);break;case"wolf":hl(n,i,t);break;case"cobra":kd(n,i,t);break;case"scorpion":Fd(n,i,t);break;case"eagle":Bd(n,i,t);break;case"gorilla":break;case"bear":break;case"rhino":bo(n,i,t,"medium");break;case"eel":zd(n,i,t);break;case"tiger":hl(n,i,t);break;default:bo(n,i,t,"medium")}n.restore()}function bo(n,e,t,i){const s=i==="short"?20:30,r=Math.sin(t)*6;n.strokeStyle=e.shade,n.lineWidth=5,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-s*.5,r,-s,r*.6),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=3,n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-s*.5,r,-s,r*.6),n.stroke()}function Nd(n,e){n.fillStyle=e.accent,n.beginPath(),n.arc(-6,0,10,0,Math.PI*2),n.fill(),n.fillStyle="#fff",n.globalAlpha=.5,n.beginPath(),n.arc(-5,-2,7,0,Math.PI*2),n.fill(),n.globalAlpha=1}function hl(n,e,t){const i=Math.sin(t)*8;n.strokeStyle=e.shade,n.lineWidth=12,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-18,i,-30,i*1.2),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=9,n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-18,i,-30,i*1.2),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=5,n.globalAlpha=.4,n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-18,i,-30,i*1.2),n.stroke(),n.globalAlpha=1}function Ud(n,e,t){const i=Math.sin(t)*3;n.strokeStyle=e.shade,n.lineWidth=7,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-8,-8+i,-18,-14+i,-20,-6+i),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=5,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-8,-8+i,-18,-14+i,-20,-6+i),n.stroke()}function Od(n,e,t){const i=Math.sin(t)*8;n.strokeStyle=e.shade,n.lineWidth=7,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i,-44,i*.5),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=5,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i,-44,i*.5),n.stroke()}function Fd(n,e,t){const i=Math.sin(t)*4;n.strokeStyle=e.shade,n.lineWidth=9,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-16,-4,-28,-24+i,-22,-38+i),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=7,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-16,-4,-28,-24+i,-22,-38+i),n.stroke(),n.fillStyle=e.accent,n.strokeStyle=e.shade,n.lineWidth=1.5,n.beginPath(),n.moveTo(-24,-38+i),n.lineTo(-18,-50+i),n.lineTo(-14,-38+i),n.closePath(),n.fill(),n.stroke()}function kd(n,e,t){const i=Math.sin(t)*10;n.strokeStyle=e.shade,n.lineWidth=11,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i*.6,-40,i*.4),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=8,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i*.6,-40,i*.4),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.5,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i+2,-28,-i*.6+2,-40,i*.4+2),n.stroke(),n.globalAlpha=1}function Bd(n,e,t){const i=Math.sin(t)*4;[-20,-12,-4,4,12].forEach((s,r)=>{const o=r===2?32:26,a=(s+i)*Math.PI/180,l=-Math.cos(a)*o,c=Math.sin(a)*o;n.strokeStyle=e.shade,n.lineWidth=4+(r===2?2:0),n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(l,c),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=2.5,n.beginPath(),n.moveTo(0,0),n.lineTo(l,c),n.stroke()}),n.fillStyle=e.fill,n.globalAlpha=.3,n.beginPath(),n.moveTo(0,0),[-20,-12,-4,4,12].forEach(s=>{const r=(s+i)*Math.PI/180;n.lineTo(-Math.cos(r)*28,Math.sin(r)*28)}),n.closePath(),n.fill(),n.globalAlpha=1}function zd(n,e,t){const i=Math.sin(t)*6;n.fillStyle=pt(n,-16,i*.5,16,e.fill,e.shade),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-10,-12+i,-28,-18+i*.6,-32,i*.4),n.bezierCurveTo(-28,18+i*.4,-10,12+i,0,0),n.closePath(),n.fill(),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=1.5,n.globalAlpha=.4,[-10,-18,-26].forEach(s=>{n.beginPath(),n.moveTo(s,-8+i*.5),n.lineTo(s-4,8+i*.3),n.stroke()}),n.globalAlpha=1}const Hd={health:90,attack:70,defense:50,speed:70,energy:50},Gd=["health","attack","defense","speed","energy"];function Sh(n){const e=re("div",{class:"bars"},Gd.map(l=>{const c=n.stats[l],h=Math.min(100,c/Hd[l]*100);return re("div",{class:"bar"},[re("span",{},[l]),re("div",{class:"track"},[re("div",{class:"fill",style:`width:${h}%;background:${Ku(l)}`})]),re("span",{class:"val"},[String(c)])])})),t=n.abilities.length>0?n.abilities.map(l=>re("span",{class:"tag ability",title:pa[l].description},[pa[l].name])):[re("span",{class:"tag empty"},["No abilities"])],i=n.traits.map(l=>re("span",{class:"tag trait",title:rl[l].description},[rl[l].name])),s=Math.min(window.devicePixelRatio||1,2),r=100,o=re("canvas",{width:String(r*s),height:String(r*s),style:`width:${r}px;height:${r}px`,"aria-hidden":"true",class:"creature-preview-canvas"});return requestAnimationFrame(()=>{const l=o.getContext("2d");if(!l)return;l.scale(s,s);const c=r/2+4,h=r/2+8,u=n.genome,d=.66,f=on[u.body]??on.boar;l.save(),l.translate(c,h),l.scale(d,d),l.save(),l.translate(-34,0),l.rotate(-.2),bh(l,u.tail,0),l.restore(),l.save(),l.translate(-20,18),l.scale(.92,.92),Mh(l,u.hindlimbs,0),l.restore(),l.save(),l.fillStyle=f.fill,l.strokeStyle=f.shade,l.lineWidth=2,l.beginPath(),l.moveTo(-6,6),l.quadraticCurveTo(20,-2,26,-26),l.quadraticCurveTo(30,-34,22,-34),l.quadraticCurveTo(8,-26,2,-6),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),vh(l,u.body,0),l.restore(),l.save(),l.translate(14,18),l.scale(.92,.92),yh(l,u.forelimbs,0),l.restore(),l.save(),l.translate(24,-30),_h(l,u.head,0,0),l.restore(),l.restore()}),re("div",{class:"creature-card fadein"},[re("div",{class:"creature-head"},[o,re("div",{},[re("h3",{class:"creature-name"},[n.name]),re("div",{class:"creature-sub"},[`Power ${pi(n)}`])])]),e,re("div",{class:"tags"},[...t,...i])])}let xt=null,us=!1;function Vd(n){us=n}function Wd(){return us=!us,us}function Th(){try{const n=window.AudioContext??window.webkitAudioContext;!xt&&n&&(xt=new n),xt&&xt.state==="suspended"&&xt.resume()}catch{xt=null}}function dt(n,e,t,i=.12,s,r=0){if(us||!xt)return;const o=()=>{if(xt)try{const a=xt.currentTime,l=xt.createOscillator(),c=xt.createGain();l.type=t,l.frequency.setValueAtTime(n,a),s!==void 0&&l.frequency.exponentialRampToValueAtTime(s,a+e),c.gain.setValueAtTime(i,a),c.gain.exponentialRampToValueAtTime(1e-4,a+e),l.connect(c).connect(xt.destination),l.start(a),l.stop(a+e)}catch{}};r>0?setTimeout(o,r):o()}function qn(n,e=.08,t=0){if(us||!xt)return;const i=()=>{if(xt)try{const s=xt.sampleRate*n,r=xt.createBuffer(1,s,xt.sampleRate),o=r.getChannelData(0);for(let h=0;h<s;h++)o[h]=Math.random()*2-1;const a=xt.createBufferSource();a.buffer=r;const l=xt.createBiquadFilter();l.type="lowpass",l.frequency.value=220;const c=xt.createGain();c.gain.setValueAtTime(e,xt.currentTime),c.gain.exponentialRampToValueAtTime(1e-4,xt.currentTime+n),a.connect(l).connect(c).connect(xt.destination),a.start(xt.currentTime)}catch{}};t>0?setTimeout(i,t):i()}function ul(n=!1){dt(n?180:130,.08,"square",n?.18:.12,n?60:50),qn(n?.18:.1,n?.14:.08),n&&dt(900,.04,"square",.06,200,15)}function dr(n){switch(n){case"shock":dt(1200,.05,"sawtooth",.12,80),dt(800,.12,"square",.08,200,30),qn(.1,.06,40);break;case"venom":dt(600,.25,"sine",.08,180),qn(.2,.04,20);break;case"spit":dt(300,.08,"sawtooth",.1,800),dt(400,.12,"triangle",.08,100,80),qn(.12,.06,90);break;case"leech":dt(220,.3,"sine",.1,160),dt(330,.3,"sine",.06,240,80);break;case"charge":dt(80,.25,"sawtooth",.15,40),qn(.3,.12);break;case"armor":dt(880,.06,"square",.1,440),dt(660,.12,"triangle",.08,330,40);break;case"frenzy":dt(400,.06,"sawtooth",.12,900),dt(500,.06,"sawtooth",.1,1100,50),dt(600,.08,"sawtooth",.08,1300,100);break;case"regenerate":_a();break;default:dt(420,.18,"sawtooth",.1,760)}}function _a(){dt(660,.22,"sine",.09,990),dt(880,.18,"sine",.06,1320,60)}function Xd(){qn(.6,.15),dt(120,.4,"sawtooth",.12,60),dt(180,.3,"sawtooth",.08,90,150)}function qd(n){n==="#ff6030"?(dt(140,.18,"sawtooth",.07,80),qn(.15,.04,50)):n==="#b060ff"?(dt(880,.15,"sine",.05,660),dt(1100,.1,"sine",.03,880,60)):n==="#50e8d0"?(dt(600,.08,"square",.05,300),qn(.08,.03,20)):dt(280,.14,"triangle",.05,200)}function dl(){qn(.4,.12),dt(200,.5,"sawtooth",.1,40,80)}function jd(){[523,659,784,1047].forEach((n,e)=>dt(n,.18,"triangle",.12,void 0,e*110))}function Yd(){[392,311,247].forEach((n,e)=>dt(n,.24,"sawtooth",.1,void 0,e*140))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ua="160",Kd=0,fl=1,$d=2,xh=1,Oa=2,Xn=3,Kn=0,tn=1,en=2,ci=0,ds=1,va=2,pl=3,ml=4,Jd=5,Ai=100,Zd=101,Qd=102,gl=103,_l=104,ef=200,tf=201,nf=202,sf=203,ya=204,Ma=205,rf=206,of=207,af=208,lf=209,cf=210,hf=211,uf=212,df=213,ff=214,pf=0,mf=1,gf=2,Jr=3,_f=4,vf=5,yf=6,Mf=7,Eh=0,bf=1,Sf=2,hi=0,Tf=1,xf=2,Ef=3,Fa=4,Af=5,wf=6,vl="attached",Rf="detached",Ah=300,gs=301,_s=302,ba=303,Sa=304,ao=306,mi=1e3,vn=1001,Zr=1002,Nt=1003,Ta=1004,qr=1005,rn=1006,wh=1007,Ni=1008,ui=1009,Cf=1010,Pf=1011,ka=1012,Rh=1013,ai=1014,jn=1015,nr=1016,Ch=1017,Ph=1018,Li=1020,Lf=1021,yn=1023,If=1024,Df=1025,Ii=1026,vs=1027,Lh=1028,Ih=1029,Nf=1030,Dh=1031,Nh=1033,So=33776,To=33777,xo=33778,Eo=33779,yl=35840,Ml=35841,bl=35842,Sl=35843,Uh=36196,Tl=37492,xl=37496,El=37808,Al=37809,wl=37810,Rl=37811,Cl=37812,Pl=37813,Ll=37814,Il=37815,Dl=37816,Nl=37817,Ul=37818,Ol=37819,Fl=37820,kl=37821,Ao=36492,Bl=36494,zl=36495,Uf=36283,Hl=36284,Gl=36285,Vl=36286,ir=2300,ys=2301,wo=2302,Wl=2400,Xl=2401,ql=2402,Of=2500,Ff=0,Oh=1,xa=2,Fh=3e3,Di=3001,kf=3200,Bf=3201,Ba=0,zf=1,Mn="",wt="srgb",Vt="srgb-linear",za="display-p3",lo="display-p3-linear",Qr="linear",Tt="srgb",eo="rec709",to="p3",Hi=7680,jl=519,Hf=512,Gf=513,Vf=514,kh=515,Wf=516,Xf=517,qf=518,jf=519,Ea=35044,Yl="300 es",Aa=1035,Yn=2e3,no=2001;class Es{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Kl=1234567;const Vs=Math.PI/180,Ms=180/Math.PI;function Rn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]).toLowerCase()}function Ht(n,e,t){return Math.max(e,Math.min(t,n))}function Ha(n,e){return(n%e+e)%e}function Yf(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Kf(n,e,t){return n!==e?(t-n)/(e-n):0}function Ws(n,e,t){return(1-t)*n+t*e}function $f(n,e,t,i){return Ws(n,e,1-Math.exp(-t*i))}function Jf(n,e=1){return e-Math.abs(Ha(n,e*2)-e)}function Zf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Qf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function ep(n,e){return n+Math.floor(Math.random()*(e-n+1))}function tp(n,e){return n+Math.random()*(e-n)}function np(n){return n*(.5-Math.random())}function ip(n){n!==void 0&&(Kl=n);let e=Kl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sp(n){return n*Vs}function rp(n){return n*Ms}function wa(n){return(n&n-1)===0&&n!==0}function op(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function io(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ap(n,e,t,i,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),h=o((e+i)/2),u=r((e-i)/2),d=o((e-i)/2),f=r((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":n.set(a*h,l*u,l*d,a*c);break;case"YZY":n.set(l*d,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*d,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*f,a*c);break;case"YXY":n.set(l*f,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Dn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const lp={DEG2RAD:Vs,RAD2DEG:Ms,generateUUID:Rn,clamp:Ht,euclideanModulo:Ha,mapLinear:Yf,inverseLerp:Kf,lerp:Ws,damp:$f,pingpong:Jf,smoothstep:Zf,smootherstep:Qf,randInt:ep,randFloat:tp,randFloatSpread:np,seededRandom:ip,degToRad:sp,radToDeg:rp,isPowerOfTwo:wa,ceilPowerOfTwo:op,floorPowerOfTwo:io,setQuaternionFromProperEuler:ap,normalize:ft,denormalize:Dn};class Ee{constructor(e=0,t=0){Ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tt{constructor(e,t,i,s,r,o,a,l,c){tt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],v=s[0],m=s[3],p=s[6],M=s[1],y=s[4],x=s[7],I=s[2],w=s[5],P=s[8];return r[0]=o*v+a*M+l*I,r[3]=o*m+a*y+l*w,r[6]=o*p+a*x+l*P,r[1]=c*v+h*M+u*I,r[4]=c*m+h*y+u*w,r[7]=c*p+h*x+u*P,r[2]=d*v+f*M+g*I,r[5]=d*m+f*y+g*w,r[8]=d*p+f*x+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+i*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*c-h*i)*v,e[2]=(a*i-s*o)*v,e[3]=d*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ro.makeScale(e,t)),this}rotate(e){return this.premultiply(Ro.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ro.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ro=new tt;function Bh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function sr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function cp(){const n=sr("canvas");return n.style.display="block",n}const $l={};function Xs(n){n in $l||($l[n]=!0,console.warn(n))}const Jl=new tt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Zl=new tt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fr={[Vt]:{transfer:Qr,primaries:eo,toReference:n=>n,fromReference:n=>n},[wt]:{transfer:Tt,primaries:eo,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[lo]:{transfer:Qr,primaries:to,toReference:n=>n.applyMatrix3(Zl),fromReference:n=>n.applyMatrix3(Jl)},[za]:{transfer:Tt,primaries:to,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Zl),fromReference:n=>n.applyMatrix3(Jl).convertLinearToSRGB()}},hp=new Set([Vt,lo]),at={enabled:!0,_workingColorSpace:Vt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!hp.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=fr[e].toReference,s=fr[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return fr[n].primaries},getTransfer:function(n){return n===Mn?Qr:fr[n].transfer}};function fs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Co(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Gi;class zh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gi===void 0&&(Gi=sr("canvas")),Gi.width=e.width,Gi.height=e.height;const i=Gi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=sr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=fs(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(fs(t[i]/255)*255):t[i]=fs(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let up=0;class Hh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Rn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Po(s[o].image)):r.push(Po(s[o]))}else r=Po(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Po(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dp=0;class Gt extends Es{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,i=vn,s=vn,r=rn,o=Ni,a=yn,l=ui,c=Gt.DEFAULT_ANISOTROPY,h=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Rn(),this.name="",this.source=new Hh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Xs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Di?wt:Mn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ah)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mi:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case Zr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mi:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case Zr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Xs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===wt?Di:Fh}set encoding(e){Xs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Di?wt:Mn}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Ah;Gt.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,i=0,s=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,x=(f+1)/2,I=(p+1)/2,w=(h+d)/4,P=(u+v)/4,F=(g+m)/4;return y>x&&y>I?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=w/i,r=P/i):x>I?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=w/s,r=F/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=P/r,s=F/r),this.set(i,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-v)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class fp extends Es{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(Xs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Di?wt:Mn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Gt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Hh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends fp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Gh extends Gt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pp extends Gt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*v,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const I=Math.sqrt(y),w=Math.atan2(I,p*M);m=Math.sin(m*w)/I,a=Math.sin(a*w)/I}const x=a*M;if(l=l*m+d*x,c=c*m+f*x,h=h*m+g*x,u=u*m+v*x,m===1-a){const I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),d=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>u){const f=2*Math.sqrt(1+i-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-i-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ht(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,i=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ql.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ql.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),h=2*(a*t-r*s),u=2*(r*i-o*t);return this.x=t+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Lo.copy(this).projectOnVector(e),this.sub(Lo)}reflect(e){return this.sub(Lo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lo=new E,Ql=new gi;class Cn{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Tn):Tn.fromBufferAttribute(r,o),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),pr.copy(i.boundingBox)),pr.applyMatrix4(e.matrixWorld),this.union(pr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Is),mr.subVectors(this.max,Is),Vi.subVectors(e.a,Is),Wi.subVectors(e.b,Is),Xi.subVectors(e.c,Is),Qn.subVectors(Wi,Vi),ei.subVectors(Xi,Wi),_i.subVectors(Vi,Xi);let t=[0,-Qn.z,Qn.y,0,-ei.z,ei.y,0,-_i.z,_i.y,Qn.z,0,-Qn.x,ei.z,0,-ei.x,_i.z,0,-_i.x,-Qn.y,Qn.x,0,-ei.y,ei.x,0,-_i.y,_i.x,0];return!Io(t,Vi,Wi,Xi,mr)||(t=[1,0,0,0,1,0,0,0,1],!Io(t,Vi,Wi,Xi,mr))?!1:(gr.crossVectors(Qn,ei),t=[gr.x,gr.y,gr.z],Io(t,Vi,Wi,Xi,mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kn=[new E,new E,new E,new E,new E,new E,new E,new E],Tn=new E,pr=new Cn,Vi=new E,Wi=new E,Xi=new E,Qn=new E,ei=new E,_i=new E,Is=new E,mr=new E,gr=new E,vi=new E;function Io(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){vi.fromArray(n,r);const a=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),l=e.dot(vi),c=t.dot(vi),h=i.dot(vi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const mp=new Cn,Ds=new E,Do=new E;class On{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):mp.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ds.subVectors(e,this.center);const t=Ds.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ds,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Do.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ds.copy(e.center).add(Do)),this.expandByPoint(Ds.copy(e.center).sub(Do))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new E,No=new E,_r=new E,ti=new E,Uo=new E,vr=new E,Oo=new E;class co{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bn.copy(this.origin).addScaledVector(this.direction,t),Bn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){No.copy(e).add(t).multiplyScalar(.5),_r.copy(t).sub(e).normalize(),ti.copy(this.origin).sub(No);const r=e.distanceTo(t)*.5,o=-this.direction.dot(_r),a=ti.dot(this.direction),l=-ti.dot(_r),c=ti.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(No).addScaledVector(_r,d),f}intersectSphere(e,t){Bn.subVectors(e.center,this.origin);const i=Bn.dot(this.direction),s=Bn.dot(Bn)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Bn)!==null}intersectTriangle(e,t,i,s,r){Uo.subVectors(t,e),vr.subVectors(i,e),Oo.crossVectors(Uo,vr);let o=this.direction.dot(Oo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,e);const l=a*this.direction.dot(vr.crossVectors(ti,vr));if(l<0)return null;const c=a*this.direction.dot(Uo.cross(ti));if(c<0||l+c>o)return null;const h=-a*ti.dot(Oo);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class et{constructor(e,t,i,s,r,o,a,l,c,h,u,d,f,g,v,m){et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,h,u,d,f,g,v,m)}set(e,t,i,s,r,o,a,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new et().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/qi.setFromMatrixColumn(e,0).length(),r=1/qi.setFromMatrixColumn(e,1).length(),o=1/qi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,v=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d+v*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=v+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d-v*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=v-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,v=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=v-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-v*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(gp,e,_p)}lookAt(e,t,i){const s=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),ni.crossVectors(i,ln),ni.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),ni.crossVectors(i,ln)),ni.normalize(),yr.crossVectors(ln,ni),s[0]=ni.x,s[4]=yr.x,s[8]=ln.x,s[1]=ni.y,s[5]=yr.y,s[9]=ln.y,s[2]=ni.z,s[6]=yr.z,s[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],M=i[3],y=i[7],x=i[11],I=i[15],w=s[0],P=s[4],F=s[8],b=s[12],R=s[1],k=s[5],Y=s[9],he=s[13],N=s[2],H=s[6],z=s[10],ee=s[14],Z=s[3],X=s[7],te=s[11],Q=s[15];return r[0]=o*w+a*R+l*N+c*Z,r[4]=o*P+a*k+l*H+c*X,r[8]=o*F+a*Y+l*z+c*te,r[12]=o*b+a*he+l*ee+c*Q,r[1]=h*w+u*R+d*N+f*Z,r[5]=h*P+u*k+d*H+f*X,r[9]=h*F+u*Y+d*z+f*te,r[13]=h*b+u*he+d*ee+f*Q,r[2]=g*w+v*R+m*N+p*Z,r[6]=g*P+v*k+m*H+p*X,r[10]=g*F+v*Y+m*z+p*te,r[14]=g*b+v*he+m*ee+p*Q,r[3]=M*w+y*R+x*N+I*Z,r[7]=M*P+y*k+x*H+I*X,r[11]=M*F+y*Y+x*z+I*te,r[15]=M*b+y*he+x*ee+I*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*a*d+i*c*d+s*a*f-i*l*f)+v*(+t*l*f-t*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+i*o*f+r*a*h-i*c*h)+p*(-s*a*h-t*l*u+t*a*d+s*o*u-i*o*d+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],M=u*m*c-v*d*c+v*l*f-a*m*f-u*l*p+a*d*p,y=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,x=h*v*c-g*u*c+g*a*f-o*v*f-h*a*p+o*u*p,I=g*u*l-h*v*l-g*a*d+o*v*d+h*a*m-o*u*m,w=t*M+i*y+s*x+r*I;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/w;return e[0]=M*P,e[1]=(v*d*r-u*m*r-v*s*f+i*m*f+u*s*p-i*d*p)*P,e[2]=(a*m*r-v*l*r+v*s*c-i*m*c-a*s*p+i*l*p)*P,e[3]=(u*l*r-a*d*r-u*s*c+i*d*c+a*s*f-i*l*f)*P,e[4]=y*P,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*P,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*P,e[7]=(o*d*r-h*l*r+h*s*c-t*d*c-o*s*f+t*l*f)*P,e[8]=x*P,e[9]=(g*u*r-h*v*r-g*i*f+t*v*f+h*i*p-t*u*p)*P,e[10]=(o*v*r-g*a*r+g*i*c-t*v*c-o*i*p+t*a*p)*P,e[11]=(h*a*r-o*u*r-h*i*c+t*u*c+o*i*f-t*a*f)*P,e[12]=I*P,e[13]=(h*v*s-g*u*s+g*i*d-t*v*d-h*i*m+t*u*m)*P,e[14]=(g*a*s-o*v*s-g*i*l+t*v*l+o*i*m-t*a*m)*P,e[15]=(o*u*s-h*a*s+h*i*l-t*u*l-o*i*d+t*a*d)*P,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,M=l*c,y=l*h,x=l*u,I=i.x,w=i.y,P=i.z;return s[0]=(1-(v+p))*I,s[1]=(f+x)*I,s[2]=(g-y)*I,s[3]=0,s[4]=(f-x)*w,s[5]=(1-(d+p))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(g+y)*P,s[9]=(m-M)*P,s[10]=(1-(d+v))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=qi.set(s[0],s[1],s[2]).length();const o=qi.set(s[4],s[5],s[6]).length(),a=qi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],xn.copy(this);const c=1/r,h=1/o,u=1/a;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,t.setFromRotationMatrix(xn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Yn){const l=this.elements,c=2*r/(t-e),h=2*r/(i-s),u=(t+e)/(t-e),d=(i+s)/(i-s);let f,g;if(a===Yn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===no)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Yn){const l=this.elements,c=1/(t-e),h=1/(i-s),u=1/(o-r),d=(t+e)*c,f=(i+s)*h;let g,v;if(a===Yn)g=(o+r)*u,v=-2*u;else if(a===no)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const qi=new E,xn=new et,gp=new E(0,0,0),_p=new E(1,1,1),ni=new E,yr=new E,ln=new E,ec=new et,tc=new gi;class ho{constructor(e=0,t=0,i=0,s=ho.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ec.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ec,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tc.setFromEuler(this),this.setFromQuaternion(tc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ho.DEFAULT_ORDER="XYZ";class Vh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vp=0;const nc=new E,ji=new gi,zn=new et,Mr=new E,Ns=new E,yp=new E,Mp=new gi,ic=new E(1,0,0),sc=new E(0,1,0),rc=new E(0,0,1),bp={type:"added"},Sp={type:"removed"};class Et extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=Rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new E,t=new ho,i=new gi,s=new E(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new et},normalMatrix:{value:new tt}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.multiply(ji),this}rotateOnWorldAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.premultiply(ji),this}rotateX(e){return this.rotateOnAxis(ic,e)}rotateY(e){return this.rotateOnAxis(sc,e)}rotateZ(e){return this.rotateOnAxis(rc,e)}translateOnAxis(e,t){return nc.copy(e).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ic,e)}translateY(e){return this.translateOnAxis(sc,e)}translateZ(e){return this.translateOnAxis(rc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Mr.copy(e):Mr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Ns,Mr,this.up):zn.lookAt(Mr,Ns,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),ji.setFromRotationMatrix(zn),this.quaternion.premultiply(ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(bp)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sp)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,e,yp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,Mp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Et.DEFAULT_UP=new E(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new E,Hn=new E,Fo=new E,Gn=new E,Yi=new E,Ki=new E,oc=new E,ko=new E,Bo=new E,zo=new E;let br=!1;class _n{constructor(e=new E,t=new E,i=new E){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),En.subVectors(e,t),s.cross(En);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){En.subVectors(s,t),Hn.subVectors(i,t),Fo.subVectors(e,t);const o=En.dot(En),a=En.dot(Hn),l=En.dot(Fo),c=Hn.dot(Hn),h=Hn.dot(Fo),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getUV(e,t,i,s,r,o,a,l){return br===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),br=!0),this.getInterpolation(e,t,i,s,r,o,a,l)}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,Gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Gn.x),l.addScaledVector(o,Gn.y),l.addScaledVector(a,Gn.z),l)}static isFrontFacing(e,t,i,s){return En.subVectors(i,t),Hn.subVectors(e,t),En.cross(Hn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),En.cross(Hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _n.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return br===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),br=!0),_n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}getInterpolation(e,t,i,s,r){return _n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return _n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;Yi.subVectors(s,i),Ki.subVectors(r,i),ko.subVectors(e,i);const l=Yi.dot(ko),c=Ki.dot(ko);if(l<=0&&c<=0)return t.copy(i);Bo.subVectors(e,s);const h=Yi.dot(Bo),u=Ki.dot(Bo);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(Yi,o);zo.subVectors(e,r);const f=Yi.dot(zo),g=Ki.dot(zo);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Ki,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return oc.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(oc,a);const p=1/(m+v+d);return o=v*p,a=d*p,t.copy(i).addScaledVector(Yi,o).addScaledVector(Ki,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function Ho(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ae{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=at.workingColorSpace){if(e=Ha(e,1),t=Ht(t,0,1),i=Ht(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Ho(o,r,e+1/3),this.g=Ho(o,r,e),this.b=Ho(o,r,e-1/3)}return at.toWorkingColorSpace(this,s),this}setStyle(e,t=wt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){const i=Wh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fs(e.r),this.g=fs(e.g),this.b=fs(e.b),this}copyLinearToSRGB(e){return this.r=Co(e.r),this.g=Co(e.g),this.b=Co(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return at.fromWorkingColorSpace(Yt.copy(this),e),Math.round(Ht(Yt.r*255,0,255))*65536+Math.round(Ht(Yt.g*255,0,255))*256+Math.round(Ht(Yt.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(Yt.copy(this),t);const i=Yt.r,s=Yt.g,r=Yt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=wt){at.fromWorkingColorSpace(Yt.copy(this),e);const t=Yt.r,i=Yt.g,s=Yt.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ii),this.setHSL(ii.h+e,ii.s+t,ii.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ii),e.getHSL(Sr);const i=Ws(ii.h,Sr.h,t),s=Ws(ii.s,Sr.s,t),r=Ws(ii.l,Sr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new Ae;Ae.NAMES=Wh;let Tp=0;class bn extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=Rn(),this.name="",this.type="Material",this.blending=ds,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ya,this.blendDst=Ma,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=Jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ds&&(i.blending=this.blending),this.side!==Kn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ya&&(i.blendSrc=this.blendSrc),this.blendDst!==Ma&&(i.blendDst=this.blendDst),this.blendEquation!==Ai&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Jr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class At extends bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Eh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const It=new E,Tr=new Ee;class Xt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ea,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Tr.fromBufferAttribute(this,t),Tr.applyMatrix3(e),this.setXY(t,Tr.x,Tr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ft(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array),s=ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ea&&(e.usage=this.usage),e}}class Xh extends Xt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class qh extends Xt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class gt extends Xt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let xp=0;const pn=new et,Go=new Et,$i=new E,cn=new Cn,Us=new Cn,zt=new E;class Rt extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Rn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bh(e)?qh:Xh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new tt().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,i){return pn.makeTranslation(e,t,i),this.applyMatrix4(pn),this}scale(e,t,i){return pn.makeScale(e,t,i),this.applyMatrix4(pn),this}lookAt(e){return Go.lookAt(e),Go.updateMatrix(),this.applyMatrix4(Go.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new gt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new On);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new E,1/0);return}if(e){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Us.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(cn.min,Us.min),cn.expandByPoint(zt),zt.addVectors(cn.max,Us.max),cn.expandByPoint(zt)):(cn.expandByPoint(Us.min),cn.expandByPoint(Us.max))}cn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(zt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)zt.fromBufferAttribute(a,c),l&&($i.fromBufferAttribute(e,c),zt.add($i)),s=Math.max(s,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let R=0;R<a;R++)c[R]=new E,h[R]=new E;const u=new E,d=new E,f=new E,g=new Ee,v=new Ee,m=new Ee,p=new E,M=new E;function y(R,k,Y){u.fromArray(s,R*3),d.fromArray(s,k*3),f.fromArray(s,Y*3),g.fromArray(o,R*2),v.fromArray(o,k*2),m.fromArray(o,Y*2),d.sub(u),f.sub(u),v.sub(g),m.sub(g);const he=1/(v.x*m.y-m.x*v.y);isFinite(he)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-v.y).multiplyScalar(he),M.copy(f).multiplyScalar(v.x).addScaledVector(d,-m.x).multiplyScalar(he),c[R].add(p),c[k].add(p),c[Y].add(p),h[R].add(M),h[k].add(M),h[Y].add(M))}let x=this.groups;x.length===0&&(x=[{start:0,count:i.length}]);for(let R=0,k=x.length;R<k;++R){const Y=x[R],he=Y.start,N=Y.count;for(let H=he,z=he+N;H<z;H+=3)y(i[H+0],i[H+1],i[H+2])}const I=new E,w=new E,P=new E,F=new E;function b(R){P.fromArray(r,R*3),F.copy(P);const k=c[R];I.copy(k),I.sub(P.multiplyScalar(P.dot(k))).normalize(),w.crossVectors(F,k);const he=w.dot(h[R])<0?-1:1;l[R*4]=I.x,l[R*4+1]=I.y,l[R*4+2]=I.z,l[R*4+3]=he}for(let R=0,k=x.length;R<k;++R){const Y=x[R],he=Y.start,N=Y.count;for(let H=he,z=he+N;H<z;H+=3)b(i[H+0]),b(i[H+1]),b(i[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Xt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new E,r=new E,o=new E,a=new E,l=new E,c=new E,h=new E,u=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Xt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Rt,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ac=new et,yi=new co,xr=new On,lc=new E,Ji=new E,Zi=new E,Qi=new E,Vo=new E,Er=new E,Ar=new Ee,wr=new Ee,Rr=new Ee,cc=new E,hc=new E,uc=new E,Cr=new E,Pr=new E;class je extends Et{constructor(e=new Rt,t=new At){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Er.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Vo.fromBufferAttribute(u,e),o?Er.addScaledVector(Vo,h):Er.addScaledVector(Vo.sub(t),h))}t.add(Er)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xr.copy(i.boundingSphere),xr.applyMatrix4(r),yi.copy(e.ray).recast(e.near),!(xr.containsPoint(yi.origin)===!1&&(yi.intersectSphere(xr,lc)===null||yi.origin.distanceToSquared(lc)>(e.far-e.near)**2))&&(ac.copy(r).invert(),yi.copy(e.ray).applyMatrix4(ac),!(i.boundingBox!==null&&yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,yi)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,I=y;x<I;x+=3){const w=a.getX(x),P=a.getX(x+1),F=a.getX(x+2);s=Lr(this,p,e,i,c,h,u,w,P,F),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=a.getX(m),y=a.getX(m+1),x=a.getX(m+2);s=Lr(this,o,e,i,c,h,u,M,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,I=y;x<I;x+=3){const w=x,P=x+1,F=x+2;s=Lr(this,p,e,i,c,h,u,w,P,F),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=m,y=m+1,x=m+2;s=Lr(this,o,e,i,c,h,u,M,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Ep(n,e,t,i,s,r,o,a){let l;if(e.side===tn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Kn,a),l===null)return null;Pr.copy(a),Pr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Pr);return c<t.near||c>t.far?null:{distance:c,point:Pr.clone(),object:n}}function Lr(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Ji),n.getVertexPosition(l,Zi),n.getVertexPosition(c,Qi);const h=Ep(n,e,t,i,Ji,Zi,Qi,Cr);if(h){s&&(Ar.fromBufferAttribute(s,a),wr.fromBufferAttribute(s,l),Rr.fromBufferAttribute(s,c),h.uv=_n.getInterpolation(Cr,Ji,Zi,Qi,Ar,wr,Rr,new Ee)),r&&(Ar.fromBufferAttribute(r,a),wr.fromBufferAttribute(r,l),Rr.fromBufferAttribute(r,c),h.uv1=_n.getInterpolation(Cr,Ji,Zi,Qi,Ar,wr,Rr,new Ee),h.uv2=h.uv1),o&&(cc.fromBufferAttribute(o,a),hc.fromBufferAttribute(o,l),uc.fromBufferAttribute(o,c),h.normal=_n.getInterpolation(Cr,Ji,Zi,Qi,cc,hc,uc,new E),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new E,materialIndex:0};_n.getNormal(Ji,Zi,Qi,u.normal),h.face=u}return h}class As extends Rt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(h,3)),this.setAttribute("uv",new gt(u,2));function g(v,m,p,M,y,x,I,w,P,F,b){const R=x/P,k=I/F,Y=x/2,he=I/2,N=w/2,H=P+1,z=F+1;let ee=0,Z=0;const X=new E;for(let te=0;te<z;te++){const Q=te*k-he;for(let ye=0;ye<H;ye++){const $=ye*R-Y;X[v]=$*M,X[m]=Q*y,X[p]=N,c.push(X.x,X.y,X.z),X[v]=0,X[m]=0,X[p]=w>0?1:-1,h.push(X.x,X.y,X.z),u.push(ye/P),u.push(1-te/F),ee+=1}}for(let te=0;te<F;te++)for(let Q=0;Q<P;Q++){const ye=d+Q+H*te,$=d+Q+H*(te+1),G=d+(Q+1)+H*(te+1),le=d+(Q+1)+H*te;l.push(ye,$,le),l.push($,G,le),Z+=6}a.addGroup(f,Z,b),f+=Z,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new As(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function bs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Zt(n){const e={};for(let t=0;t<n.length;t++){const i=bs(n[t]);for(const s in i)e[s]=i[s]}return e}function Ap(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function jh(n){return n.getRenderTarget()===null?n.outputColorSpace:at.workingColorSpace}const wp={clone:bs,merge:Zt};var Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Cp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bs(e.uniforms),this.uniformsGroups=Ap(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Yh extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=Yn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Kt extends Yh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ms*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ms*2*Math.atan(Math.tan(Vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vs*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const es=-90,ts=1;class Pp extends Et{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Kt(es,ts,e,t);s.layers=this.layers,this.add(s);const r=new Kt(es,ts,e,t);r.layers=this.layers,this.add(r);const o=new Kt(es,ts,e,t);o.layers=this.layers,this.add(o);const a=new Kt(es,ts,e,t);a.layers=this.layers,this.add(a);const l=new Kt(es,ts,e,t);l.layers=this.layers,this.add(l);const c=new Kt(es,ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Yn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===no)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Kh extends Gt{constructor(e,t,i,s,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:gs,super(e,t,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Lp extends Ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(Xs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Di?wt:Mn),this.texture=new Kh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:rn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new As(5,5,5),r=new Oi({name:"CubemapFromEquirect",uniforms:bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:ci});r.uniforms.tEquirect.value=t;const o=new je(s,r),a=t.minFilter;return t.minFilter===Ni&&(t.minFilter=rn),new Pp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const Wo=new E,Ip=new E,Dp=new tt;class Ti{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Wo.subVectors(i,t).cross(Ip.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Wo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Dp.getNormalMatrix(e),s=this.coplanarPoint(Wo).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new On,Ir=new E;class Ga{constructor(e=new Ti,t=new Ti,i=new Ti,s=new Ti,r=new Ti,o=new Ti){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Yn){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],M=s[13],y=s[14],x=s[15];if(i[0].setComponents(l-r,d-c,m-f,x-p).normalize(),i[1].setComponents(l+r,d+c,m+f,x+p).normalize(),i[2].setComponents(l+o,d+h,m+g,x+M).normalize(),i[3].setComponents(l-o,d-h,m-g,x-M).normalize(),i[4].setComponents(l-a,d-u,m-v,x-y).normalize(),t===Yn)i[5].setComponents(l+a,d+u,m+v,x+y).normalize();else if(t===no)i[5].setComponents(a,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476,Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Ir.x=s.normal.x>0?e.max.x:e.min.x,Ir.y=s.normal.y>0?e.max.y:e.min.y,Ir.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ir)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $h(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Np(n,e){const t=e.isWebGL2,i=new WeakMap;function s(c,h){const u=c.array,d=c.usage,f=u.byteLength,g=n.createBuffer();n.bindBuffer(h,g),n.bufferData(h,u,d),c.onUploadCallback();let v;if(u instanceof Float32Array)v=n.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=n.SHORT;else if(u instanceof Uint32Array)v=n.UNSIGNED_INT;else if(u instanceof Int32Array)v=n.INT;else if(u instanceof Int8Array)v=n.BYTE;else if(u instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(n.bindBuffer(u,c),f.count===-1&&g.length===0&&n.bufferSubData(u,0,d),g.length!==0){for(let v=0,m=g.length;v<m;v++){const p=g[v];t?n.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):n.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?n.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):n.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);if(u===void 0)i.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}class uo extends Rt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const M=p*d-o;for(let y=0;y<c;y++){const x=y*u-r;g.push(x,-M,0),v.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const y=M+c*p,x=M+c*(p+1),I=M+1+c*(p+1),w=M+1+c*p;f.push(y,x,w),f.push(x,I,w)}this.setIndex(f),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(v,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uo(e.width,e.height,e.widthSegments,e.heightSegments)}}var Up=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Op=`#ifdef USE_ALPHAHASH
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
#endif`,Fp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bp=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,zp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hp=`#ifdef USE_AOMAP
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
#endif`,Gp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vp=`#ifdef USE_BATCHING
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
#endif`,Wp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Xp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yp=`#ifdef USE_IRIDESCENCE
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
#endif`,Kp=`#ifdef USE_BUMPMAP
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
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,em=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,im=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,sm=`#define PI 3.141592653589793
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
} // validated`,rm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,om=`vec3 transformedNormal = objectNormal;
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
#endif`,am=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,um="gl_FragColor = linearToOutputTexel( gl_FragColor );",dm=`
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
}`,fm=`#ifdef USE_ENVMAP
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
#endif`,pm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mm=`#ifdef USE_ENVMAP
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
#endif`,gm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_m=`#ifdef USE_ENVMAP
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
#endif`,vm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ym=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sm=`#ifdef USE_GRADIENTMAP
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
}`,Tm=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,xm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Em=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wm=`uniform bool receiveShadow;
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
#endif`,Rm=`#ifdef USE_ENVMAP
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
#endif`,Cm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Im=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dm=`PhysicalMaterial material;
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
#endif`,Nm=`struct PhysicalMaterial {
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
}`,Um=`
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
#endif`,Om=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,km=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Hm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Gm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xm=`#if defined( USE_POINTS_UV )
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
#endif`,qm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ym=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Km=`#ifdef USE_MORPHNORMALS
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
#endif`,$m=`#ifdef USE_MORPHTARGETS
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
#endif`,Jm=`#ifdef USE_MORPHTARGETS
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
#endif`,Zm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Qm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,e0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,i0=`#ifdef USE_NORMALMAP
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
#endif`,s0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,l0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,h0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,d0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,f0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,p0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,m0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,g0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,v0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,y0=`float getShadowMask() {
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
}`,M0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,b0=`#ifdef USE_SKINNING
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
#endif`,S0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,T0=`#ifdef USE_SKINNING
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
#endif`,x0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,A0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,w0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,R0=`#ifdef USE_TRANSMISSION
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
#endif`,C0=`#ifdef USE_TRANSMISSION
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
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,I0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const N0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U0=`uniform sampler2D t2D;
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
}`,O0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,k0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z0=`#include <common>
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
}`,H0=`#if DEPTH_PACKING == 3200
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
}`,G0=`#define DISTANCE
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
}`,V0=`#define DISTANCE
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
}`,W0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,X0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q0=`uniform float scale;
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
}`,j0=`uniform vec3 diffuse;
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
}`,Y0=`#include <common>
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
}`,K0=`uniform vec3 diffuse;
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
}`,$0=`#define LAMBERT
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
}`,J0=`#define LAMBERT
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
}`,Z0=`#define MATCAP
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
}`,Q0=`#define MATCAP
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
}`,eg=`#define NORMAL
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
}`,tg=`#define NORMAL
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
}`,ng=`#define PHONG
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
}`,ig=`#define PHONG
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
}`,sg=`#define STANDARD
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
}`,rg=`#define STANDARD
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
}`,og=`#define TOON
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
}`,ag=`#define TOON
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
}`,lg=`uniform float size;
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
}`,cg=`uniform vec3 diffuse;
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
}`,hg=`#include <common>
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
}`,ug=`uniform vec3 color;
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
}`,dg=`uniform float rotation;
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
}`,fg=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Up,alphahash_pars_fragment:Op,alphamap_fragment:Fp,alphamap_pars_fragment:kp,alphatest_fragment:Bp,alphatest_pars_fragment:zp,aomap_fragment:Hp,aomap_pars_fragment:Gp,batching_pars_vertex:Vp,batching_vertex:Wp,begin_vertex:Xp,beginnormal_vertex:qp,bsdfs:jp,iridescence_fragment:Yp,bumpmap_pars_fragment:Kp,clipping_planes_fragment:$p,clipping_planes_pars_fragment:Jp,clipping_planes_pars_vertex:Zp,clipping_planes_vertex:Qp,color_fragment:em,color_pars_fragment:tm,color_pars_vertex:nm,color_vertex:im,common:sm,cube_uv_reflection_fragment:rm,defaultnormal_vertex:om,displacementmap_pars_vertex:am,displacementmap_vertex:lm,emissivemap_fragment:cm,emissivemap_pars_fragment:hm,colorspace_fragment:um,colorspace_pars_fragment:dm,envmap_fragment:fm,envmap_common_pars_fragment:pm,envmap_pars_fragment:mm,envmap_pars_vertex:gm,envmap_physical_pars_fragment:Rm,envmap_vertex:_m,fog_vertex:vm,fog_pars_vertex:ym,fog_fragment:Mm,fog_pars_fragment:bm,gradientmap_pars_fragment:Sm,lightmap_fragment:Tm,lightmap_pars_fragment:xm,lights_lambert_fragment:Em,lights_lambert_pars_fragment:Am,lights_pars_begin:wm,lights_toon_fragment:Cm,lights_toon_pars_fragment:Pm,lights_phong_fragment:Lm,lights_phong_pars_fragment:Im,lights_physical_fragment:Dm,lights_physical_pars_fragment:Nm,lights_fragment_begin:Um,lights_fragment_maps:Om,lights_fragment_end:Fm,logdepthbuf_fragment:km,logdepthbuf_pars_fragment:Bm,logdepthbuf_pars_vertex:zm,logdepthbuf_vertex:Hm,map_fragment:Gm,map_pars_fragment:Vm,map_particle_fragment:Wm,map_particle_pars_fragment:Xm,metalnessmap_fragment:qm,metalnessmap_pars_fragment:jm,morphcolor_vertex:Ym,morphnormal_vertex:Km,morphtarget_pars_vertex:$m,morphtarget_vertex:Jm,normal_fragment_begin:Zm,normal_fragment_maps:Qm,normal_pars_fragment:e0,normal_pars_vertex:t0,normal_vertex:n0,normalmap_pars_fragment:i0,clearcoat_normal_fragment_begin:s0,clearcoat_normal_fragment_maps:r0,clearcoat_pars_fragment:o0,iridescence_pars_fragment:a0,opaque_fragment:l0,packing:c0,premultiplied_alpha_fragment:h0,project_vertex:u0,dithering_fragment:d0,dithering_pars_fragment:f0,roughnessmap_fragment:p0,roughnessmap_pars_fragment:m0,shadowmap_pars_fragment:g0,shadowmap_pars_vertex:_0,shadowmap_vertex:v0,shadowmask_pars_fragment:y0,skinbase_vertex:M0,skinning_pars_vertex:b0,skinning_vertex:S0,skinnormal_vertex:T0,specularmap_fragment:x0,specularmap_pars_fragment:E0,tonemapping_fragment:A0,tonemapping_pars_fragment:w0,transmission_fragment:R0,transmission_pars_fragment:C0,uv_pars_fragment:P0,uv_pars_vertex:L0,uv_vertex:I0,worldpos_vertex:D0,background_vert:N0,background_frag:U0,backgroundCube_vert:O0,backgroundCube_frag:F0,cube_vert:k0,cube_frag:B0,depth_vert:z0,depth_frag:H0,distanceRGBA_vert:G0,distanceRGBA_frag:V0,equirect_vert:W0,equirect_frag:X0,linedashed_vert:q0,linedashed_frag:j0,meshbasic_vert:Y0,meshbasic_frag:K0,meshlambert_vert:$0,meshlambert_frag:J0,meshmatcap_vert:Z0,meshmatcap_frag:Q0,meshnormal_vert:eg,meshnormal_frag:tg,meshphong_vert:ng,meshphong_frag:ig,meshphysical_vert:sg,meshphysical_frag:rg,meshtoon_vert:og,meshtoon_frag:ag,points_vert:lg,points_frag:cg,shadow_vert:hg,shadow_frag:ug,sprite_vert:dg,sprite_frag:fg},me={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},In={basic:{uniforms:Zt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Zt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ae(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Zt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Zt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Zt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ae(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Zt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Zt([me.points,me.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Zt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Zt([me.common,me.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Zt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Zt([me.sprite,me.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Zt([me.common,me.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Zt([me.lights,me.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};In.physical={uniforms:Zt([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Dr={r:0,b:0,g:0};function pg(n,e,t,i,s,r,o){const a=new Ae(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(m,p){let M=!1,y=p.isScene===!0?p.background:null;y&&y.isTexture&&(y=(p.backgroundBlurriness>0?t:e).get(y)),y===null?v(a,l):y&&y.isColor&&(v(y,1),M=!0);const x=n.xr.getEnvironmentBlendMode();x==="additive"?i.buffers.color.setClear(0,0,0,1,o):x==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||M)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),y&&(y.isCubeTexture||y.mapping===ao)?(h===void 0&&(h=new je(new As(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:bs(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=at.getTransfer(y.colorSpace)!==Tt,(u!==y||d!==y.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new je(new uo(2,2),new Oi({name:"BackgroundMaterial",uniforms:bs(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=at.getTransfer(y.colorSpace)!==Tt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,p){m.getRGB(Dr,jh(n)),i.buffers.color.setClear(Dr.r,Dr.g,Dr.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(a,l)},render:g}}function mg(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},l=m(null);let c=l,h=!1;function u(N,H,z,ee,Z){let X=!1;if(o){const te=v(ee,z,H);c!==te&&(c=te,f(c.object)),X=p(N,ee,z,Z),X&&M(N,ee,z,Z)}else{const te=H.wireframe===!0;(c.geometry!==ee.id||c.program!==z.id||c.wireframe!==te)&&(c.geometry=ee.id,c.program=z.id,c.wireframe=te,X=!0)}Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,F(N,H,z,ee),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function d(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function f(N){return i.isWebGL2?n.bindVertexArray(N):r.bindVertexArrayOES(N)}function g(N){return i.isWebGL2?n.deleteVertexArray(N):r.deleteVertexArrayOES(N)}function v(N,H,z){const ee=z.wireframe===!0;let Z=a[N.id];Z===void 0&&(Z={},a[N.id]=Z);let X=Z[H.id];X===void 0&&(X={},Z[H.id]=X);let te=X[ee];return te===void 0&&(te=m(d()),X[ee]=te),te}function m(N){const H=[],z=[],ee=[];for(let Z=0;Z<s;Z++)H[Z]=0,z[Z]=0,ee[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:z,attributeDivisors:ee,object:N,attributes:{},index:null}}function p(N,H,z,ee){const Z=c.attributes,X=H.attributes;let te=0;const Q=z.getAttributes();for(const ye in Q)if(Q[ye].location>=0){const G=Z[ye];let le=X[ye];if(le===void 0&&(ye==="instanceMatrix"&&N.instanceMatrix&&(le=N.instanceMatrix),ye==="instanceColor"&&N.instanceColor&&(le=N.instanceColor)),G===void 0||G.attribute!==le||le&&G.data!==le.data)return!0;te++}return c.attributesNum!==te||c.index!==ee}function M(N,H,z,ee){const Z={},X=H.attributes;let te=0;const Q=z.getAttributes();for(const ye in Q)if(Q[ye].location>=0){let G=X[ye];G===void 0&&(ye==="instanceMatrix"&&N.instanceMatrix&&(G=N.instanceMatrix),ye==="instanceColor"&&N.instanceColor&&(G=N.instanceColor));const le={};le.attribute=G,G&&G.data&&(le.data=G.data),Z[ye]=le,te++}c.attributes=Z,c.attributesNum=te,c.index=ee}function y(){const N=c.newAttributes;for(let H=0,z=N.length;H<z;H++)N[H]=0}function x(N){I(N,0)}function I(N,H){const z=c.newAttributes,ee=c.enabledAttributes,Z=c.attributeDivisors;z[N]=1,ee[N]===0&&(n.enableVertexAttribArray(N),ee[N]=1),Z[N]!==H&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,H),Z[N]=H)}function w(){const N=c.newAttributes,H=c.enabledAttributes;for(let z=0,ee=H.length;z<ee;z++)H[z]!==N[z]&&(n.disableVertexAttribArray(z),H[z]=0)}function P(N,H,z,ee,Z,X,te){te===!0?n.vertexAttribIPointer(N,H,z,Z,X):n.vertexAttribPointer(N,H,z,ee,Z,X)}function F(N,H,z,ee){if(i.isWebGL2===!1&&(N.isInstancedMesh||ee.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const Z=ee.attributes,X=z.getAttributes(),te=H.defaultAttributeValues;for(const Q in X){const ye=X[Q];if(ye.location>=0){let $=Z[Q];if($===void 0&&(Q==="instanceMatrix"&&N.instanceMatrix&&($=N.instanceMatrix),Q==="instanceColor"&&N.instanceColor&&($=N.instanceColor)),$!==void 0){const G=$.normalized,le=$.itemSize,ge=t.get($);if(ge===void 0)continue;const be=ge.buffer,Me=ge.type,He=ge.bytesPerElement,Se=i.isWebGL2===!0&&(Me===n.INT||Me===n.UNSIGNED_INT||$.gpuType===Rh);if($.isInterleavedBufferAttribute){const ke=$.data,V=ke.stride,Ct=$.offset;if(ke.isInstancedInterleavedBuffer){for(let Oe=0;Oe<ye.locationSize;Oe++)I(ye.location+Oe,ke.meshPerAttribute);N.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=ke.meshPerAttribute*ke.count)}else for(let Oe=0;Oe<ye.locationSize;Oe++)x(ye.location+Oe);n.bindBuffer(n.ARRAY_BUFFER,be);for(let Oe=0;Oe<ye.locationSize;Oe++)P(ye.location+Oe,le/ye.locationSize,Me,G,V*He,(Ct+le/ye.locationSize*Oe)*He,Se)}else{if($.isInstancedBufferAttribute){for(let ke=0;ke<ye.locationSize;ke++)I(ye.location+ke,$.meshPerAttribute);N.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ke=0;ke<ye.locationSize;ke++)x(ye.location+ke);n.bindBuffer(n.ARRAY_BUFFER,be);for(let ke=0;ke<ye.locationSize;ke++)P(ye.location+ke,le/ye.locationSize,Me,G,le*He,le/ye.locationSize*ke*He,Se)}}else if(te!==void 0){const G=te[Q];if(G!==void 0)switch(G.length){case 2:n.vertexAttrib2fv(ye.location,G);break;case 3:n.vertexAttrib3fv(ye.location,G);break;case 4:n.vertexAttrib4fv(ye.location,G);break;default:n.vertexAttrib1fv(ye.location,G)}}}}w()}function b(){Y();for(const N in a){const H=a[N];for(const z in H){const ee=H[z];for(const Z in ee)g(ee[Z].object),delete ee[Z];delete H[z]}delete a[N]}}function R(N){if(a[N.id]===void 0)return;const H=a[N.id];for(const z in H){const ee=H[z];for(const Z in ee)g(ee[Z].object),delete ee[Z];delete H[z]}delete a[N.id]}function k(N){for(const H in a){const z=a[H];if(z[N.id]===void 0)continue;const ee=z[N.id];for(const Z in ee)g(ee[Z].object),delete ee[Z];delete z[N.id]}}function Y(){he(),h=!0,c!==l&&(c=l,f(c.object))}function he(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:Y,resetDefaultState:he,dispose:b,releaseStatesOfGeometry:R,releaseStatesOfProgram:k,initAttributes:y,enableAttribute:x,disableUnusedAttributes:w}}function gg(n,e,t,i){const s=i.isWebGL2;let r;function o(h){r=h}function a(h,u){n.drawArrays(r,h,u),t.update(u,r,1)}function l(h,u,d){if(d===0)return;let f,g;if(s)f=n,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),t.update(u,r,d)}function c(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function _g(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),v=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,x=o||e.has("OES_texture_float"),I=y&&x,w=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:y,floatFragmentTextures:x,floatVertexTextures:I,maxSamples:w}}function vg(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Ti,a=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:i,y=M*4;let x=p.clippingState||null;l.value=x,x=h(g,d,y,f);for(let I=0;I!==y;++I)x[I]=t[I];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=f;y!==v;++y,x+=4)o.copy(u[y]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function yg(n){let e=new WeakMap;function t(o,a){return a===ba?o.mapping=gs:a===Sa&&(o.mapping=_s),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===ba||a===Sa)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Lp(l.height/2);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Va extends Yh{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const cs=4,dc=[.125,.215,.35,.446,.526,.582],wi=20,Xo=new Va,fc=new Ae;let qo=null,jo=0,Yo=0;const xi=(1+Math.sqrt(5))/2,ns=1/xi,pc=[new E(1,1,1),new E(-1,1,1),new E(1,1,-1),new E(-1,1,-1),new E(0,xi,ns),new E(0,xi,-ns),new E(ns,0,xi),new E(-ns,0,xi),new E(xi,ns,0),new E(-xi,ns,0)];class mc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){qo=this._renderer.getRenderTarget(),jo=this._renderer.getActiveCubeFace(),Yo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_c(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qo,jo,Yo),e.scissorTest=!1,Nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gs||e.mapping===_s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qo=this._renderer.getRenderTarget(),jo=this._renderer.getActiveCubeFace(),Yo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:nr,format:yn,colorSpace:Vt,depthBuffer:!1},s=gc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gc(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mg(r)),this._blurMaterial=bg(r,e,t)}return s}_compileMaterial(e){const t=new je(this._lodPlanes[0],e);this._renderer.compile(t,Xo)}_sceneToCubeUV(e,t,i,s){const a=new Kt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(fc),h.toneMapping=hi,h.autoClear=!1;const f=new At({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),g=new je(new As,f);let v=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(fc),v=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const y=this._cubeSize;Nr(s,M*y,p>2?y:0,y,y),h.setRenderTarget(s),v&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===gs||e.mapping===_s;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=vc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_c());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new je(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Nr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Xo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=pc[(s-1)%pc.length];this._blur(e,s-1,s,r,o)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new je(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*wi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):wi;m>wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);const p=[];let M=0;for(let P=0;P<wi;++P){const F=P/v,b=Math.exp(-F*F/2);p.push(b),P===0?M+=b:P<m&&(M+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-i;const x=this._sizeLods[s],I=3*x*(s>y-cs?s-y+cs:0),w=4*(this._cubeSize-x);Nr(t,I,w,3*x,2*x),l.setRenderTarget(t),l.render(u,Xo)}}function Mg(n){const e=[],t=[],i=[];let s=n;const r=n-cs+1+dc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-cs?l=dc[o-n+cs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*f),y=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let w=0;w<f;w++){const P=w%3*2/3-1,F=w>2?0:-1,b=[P,F,0,P+2/3,F,0,P+2/3,F+1,0,P,F,0,P+2/3,F+1,0,P,F+1,0];M.set(b,v*g*w),y.set(d,m*g*w);const R=[w,w,w,w,w,w];x.set(R,p*g*w)}const I=new Rt;I.setAttribute("position",new Xt(M,v)),I.setAttribute("uv",new Xt(y,m)),I.setAttribute("faceIndex",new Xt(x,p)),e.push(I),s>cs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function gc(n,e,t){const i=new Ui(n,e,t);return i.texture.mapping=ao,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Nr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function bg(n,e,t){const i=new Float32Array(wi),s=new E(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Wa(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function _c(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wa(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function vc(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Wa(){return`

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
	`}function Sg(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===ba||l===Sa,h=l===gs||l===_s;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new mc(n)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new mc(n));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Tg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function xg(n,e,t,i){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],n.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],n.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let y=0,x=M.length;y<x;y+=3){const I=M[y+0],w=M[y+1],P=M[y+2];d.push(I,w,w,P,P,I)}}else if(g!==void 0){const M=g.array;v=g.version;for(let y=0,x=M.length/3-1;y<x;y+=3){const I=y+0,w=y+1,P=y+2;d.push(I,w,w,P,P,I)}}else return;const m=new(Bh(d)?qh:Xh)(d,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Eg(n,e,t,i){const s=i.isWebGL2;let r;function o(f){r=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function h(f,g){n.drawElements(r,g,a,f*l),t.update(g,r,1)}function u(f,g,v){if(v===0)return;let m,p;if(s)m=n,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,f*l,v),t.update(g,r,v)}function d(f,g,v){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<v;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,f,0,v);let p=0;for(let M=0;M<v;M++)p+=g[M];t.update(p,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function Ag(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function wg(n,e){return n[0]-e[0]}function Rg(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Cg(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,o=new mt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0;let v=r.get(h);if(v===void 0||v.count!==g){let N=function(){Y.dispose(),r.delete(h),h.removeEventListener("dispose",N)};v!==void 0&&v.texture.dispose();const M=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,x=h.morphAttributes.color!==void 0,I=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],P=h.morphAttributes.color||[];let F=0;M===!0&&(F=1),y===!0&&(F=2),x===!0&&(F=3);let b=h.attributes.position.count*F,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const k=new Float32Array(b*R*4*g),Y=new Gh(k,b,R,g);Y.type=jn,Y.needsUpdate=!0;const he=F*4;for(let H=0;H<g;H++){const z=I[H],ee=w[H],Z=P[H],X=b*R*4*H;for(let te=0;te<z.count;te++){const Q=te*he;M===!0&&(o.fromBufferAttribute(z,te),k[X+Q+0]=o.x,k[X+Q+1]=o.y,k[X+Q+2]=o.z,k[X+Q+3]=0),y===!0&&(o.fromBufferAttribute(ee,te),k[X+Q+4]=o.x,k[X+Q+5]=o.y,k[X+Q+6]=o.z,k[X+Q+7]=0),x===!0&&(o.fromBufferAttribute(Z,te),k[X+Q+8]=o.x,k[X+Q+9]=o.y,k[X+Q+10]=o.z,k[X+Q+11]=Z.itemSize===4?o.w:1)}}v={count:g,texture:Y,size:new Ee(b,R)},r.set(h,v),h.addEventListener("dispose",N)}let m=0;for(let M=0;M<d.length;M++)m+=d[M];const p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(n,"morphTargetBaseInfluence",p),u.getUniforms().setValue(n,"morphTargetInfluences",d),u.getUniforms().setValue(n,"morphTargetsTexture",v.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",v.size)}else{const f=d===void 0?0:d.length;let g=i[h.id];if(g===void 0||g.length!==f){g=[];for(let y=0;y<f;y++)g[y]=[y,0];i[h.id]=g}for(let y=0;y<f;y++){const x=g[y];x[0]=y,x[1]=d[y]}g.sort(Rg);for(let y=0;y<8;y++)y<f&&g[y][1]?(a[y][0]=g[y][0],a[y][1]=g[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(wg);const v=h.morphAttributes.position,m=h.morphAttributes.normal;let p=0;for(let y=0;y<8;y++){const x=a[y],I=x[0],w=x[1];I!==Number.MAX_SAFE_INTEGER&&w?(v&&h.getAttribute("morphTarget"+y)!==v[I]&&h.setAttribute("morphTarget"+y,v[I]),m&&h.getAttribute("morphNormal"+y)!==m[I]&&h.setAttribute("morphNormal"+y,m[I]),s[y]=w,p+=w):(v&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),m&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),s[y]=0)}const M=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(n,"morphTargetBaseInfluence",M),u.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function Pg(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Jh extends Gt{constructor(e,t,i,s,r,o,a,l,c,h){if(h=h!==void 0?h:Ii,h!==Ii&&h!==vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ii&&(i=ai),i===void 0&&h===vs&&(i=Li),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Nt,this.minFilter=l!==void 0?l:Nt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Zh=new Gt,Qh=new Jh(1,1);Qh.compareFunction=kh;const eu=new Gh,tu=new pp,nu=new Kh,yc=[],Mc=[],bc=new Float32Array(16),Sc=new Float32Array(9),Tc=new Float32Array(4);function ws(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=yc[s];if(r===void 0&&(r=new Float32Array(s),yc[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Ot(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function fo(n,e){let t=Mc[e];t===void 0&&(t=new Int32Array(e),Mc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Lg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ig(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2fv(this.addr,e),Ft(t,e)}}function Dg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;n.uniform3fv(this.addr,e),Ft(t,e)}}function Ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4fv(this.addr,e),Ft(t,e)}}function Ug(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Ot(t,i))return;Tc.set(i),n.uniformMatrix2fv(this.addr,!1,Tc),Ft(t,i)}}function Og(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Ot(t,i))return;Sc.set(i),n.uniformMatrix3fv(this.addr,!1,Sc),Ft(t,i)}}function Fg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Ot(t,i))return;bc.set(i),n.uniformMatrix4fv(this.addr,!1,bc),Ft(t,i)}}function kg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2iv(this.addr,e),Ft(t,e)}}function zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3iv(this.addr,e),Ft(t,e)}}function Hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4iv(this.addr,e),Ft(t,e)}}function Gg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Vg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2uiv(this.addr,e),Ft(t,e)}}function Wg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3uiv(this.addr,e),Ft(t,e)}}function Xg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4uiv(this.addr,e),Ft(t,e)}}function qg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?Qh:Zh;t.setTexture2D(e||r,s)}function jg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||tu,s)}function Yg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||nu,s)}function Kg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||eu,s)}function $g(n){switch(n){case 5126:return Lg;case 35664:return Ig;case 35665:return Dg;case 35666:return Ng;case 35674:return Ug;case 35675:return Og;case 35676:return Fg;case 5124:case 35670:return kg;case 35667:case 35671:return Bg;case 35668:case 35672:return zg;case 35669:case 35673:return Hg;case 5125:return Gg;case 36294:return Vg;case 36295:return Wg;case 36296:return Xg;case 35678:case 36198:case 36298:case 36306:case 35682:return qg;case 35679:case 36299:case 36307:return jg;case 35680:case 36300:case 36308:case 36293:return Yg;case 36289:case 36303:case 36311:case 36292:return Kg}}function Jg(n,e){n.uniform1fv(this.addr,e)}function Zg(n,e){const t=ws(e,this.size,2);n.uniform2fv(this.addr,t)}function Qg(n,e){const t=ws(e,this.size,3);n.uniform3fv(this.addr,t)}function e_(n,e){const t=ws(e,this.size,4);n.uniform4fv(this.addr,t)}function t_(n,e){const t=ws(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function n_(n,e){const t=ws(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function i_(n,e){const t=ws(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function s_(n,e){n.uniform1iv(this.addr,e)}function r_(n,e){n.uniform2iv(this.addr,e)}function o_(n,e){n.uniform3iv(this.addr,e)}function a_(n,e){n.uniform4iv(this.addr,e)}function l_(n,e){n.uniform1uiv(this.addr,e)}function c_(n,e){n.uniform2uiv(this.addr,e)}function h_(n,e){n.uniform3uiv(this.addr,e)}function u_(n,e){n.uniform4uiv(this.addr,e)}function d_(n,e,t){const i=this.cache,s=e.length,r=fo(t,s);Ot(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Zh,r[o])}function f_(n,e,t){const i=this.cache,s=e.length,r=fo(t,s);Ot(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||tu,r[o])}function p_(n,e,t){const i=this.cache,s=e.length,r=fo(t,s);Ot(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||nu,r[o])}function m_(n,e,t){const i=this.cache,s=e.length,r=fo(t,s);Ot(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||eu,r[o])}function g_(n){switch(n){case 5126:return Jg;case 35664:return Zg;case 35665:return Qg;case 35666:return e_;case 35674:return t_;case 35675:return n_;case 35676:return i_;case 5124:case 35670:return s_;case 35667:case 35671:return r_;case 35668:case 35672:return o_;case 35669:case 35673:return a_;case 5125:return l_;case 36294:return c_;case 36295:return h_;case 36296:return u_;case 35678:case 36198:case 36298:case 36306:case 35682:return d_;case 35679:case 36299:case 36307:return f_;case 35680:case 36300:case 36308:case 36293:return p_;case 36289:case 36303:case 36311:case 36292:return m_}}class __{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=$g(t.type)}}class v_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=g_(t.type)}}class y_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Ko=/(\w+)(\])?(\[|\.)?/g;function xc(n,e){n.seq.push(e),n.map[e.id]=e}function M_(n,e,t){const i=n.name,s=i.length;for(Ko.lastIndex=0;;){const r=Ko.exec(i),o=Ko.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){xc(t,c===void 0?new __(a,n,e):new v_(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new y_(a),xc(t,u)),t=u}}}class jr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);M_(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Ec(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const b_=37297;let S_=0;function T_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function x_(n){const e=at.getPrimaries(at.workingColorSpace),t=at.getPrimaries(n);let i;switch(e===t?i="":e===to&&t===eo?i="LinearDisplayP3ToLinearSRGB":e===eo&&t===to&&(i="LinearSRGBToLinearDisplayP3"),n){case Vt:case lo:return[i,"LinearTransferOETF"];case wt:case za:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ac(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+T_(n.getShaderSource(e),o)}else return s}function E_(n,e){const t=x_(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function A_(n,e){let t;switch(e){case Tf:t="Linear";break;case xf:t="Reinhard";break;case Ef:t="OptimizedCineon";break;case Fa:t="ACESFilmic";break;case wf:t="AgX";break;case Af:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function w_(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(hs).join(`
`)}function R_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(hs).join(`
`)}function C_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function P_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function hs(n){return n!==""}function wc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const L_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ra(n){return n.replace(L_,D_)}const I_=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function D_(n,e){let t=Ze[e];if(t===void 0){const i=I_.get(e);if(i!==void 0)t=Ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ra(t)}const N_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cc(n){return n.replace(N_,U_)}function U_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pc(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function O_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===xh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Oa?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Xn&&(e="SHADOWMAP_TYPE_VSM"),e}function F_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case gs:case _s:e="ENVMAP_TYPE_CUBE";break;case ao:e="ENVMAP_TYPE_CUBE_UV";break}return e}function k_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case _s:e="ENVMAP_MODE_REFRACTION";break}return e}function B_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Eh:e="ENVMAP_BLENDING_MULTIPLY";break;case bf:e="ENVMAP_BLENDING_MIX";break;case Sf:e="ENVMAP_BLENDING_ADD";break}return e}function z_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function H_(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=O_(t),c=F_(t),h=k_(t),u=B_(t),d=z_(t),f=t.isWebGL2?"":w_(t),g=R_(t),v=C_(r),m=s.createProgram();let p,M,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(hs).join(`
`),p.length>0&&(p+=`
`),M=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(hs).join(`
`),M.length>0&&(M+=`
`)):(p=[Pc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hs).join(`
`),M=[f,Pc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hi?"#define TONE_MAPPING":"",t.toneMapping!==hi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==hi?A_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,E_("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hs).join(`
`)),o=Ra(o),o=wc(o,t),o=Rc(o,t),a=Ra(a),a=wc(a,t),a=Rc(a,t),o=Cc(o),a=Cc(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const x=y+p+o,I=y+M+a,w=Ec(s,s.VERTEX_SHADER,x),P=Ec(s,s.FRAGMENT_SHADER,I);s.attachShader(m,w),s.attachShader(m,P),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function F(Y){if(n.debug.checkShaderErrors){const he=s.getProgramInfoLog(m).trim(),N=s.getShaderInfoLog(w).trim(),H=s.getShaderInfoLog(P).trim();let z=!0,ee=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,w,P);else{const Z=Ac(s,w,"vertex"),X=Ac(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+he+`
`+Z+`
`+X)}else he!==""?console.warn("THREE.WebGLProgram: Program Info Log:",he):(N===""||H==="")&&(ee=!1);ee&&(Y.diagnostics={runnable:z,programLog:he,vertexShader:{log:N,prefix:p},fragmentShader:{log:H,prefix:M}})}s.deleteShader(w),s.deleteShader(P),b=new jr(s,m),R=P_(s,m)}let b;this.getUniforms=function(){return b===void 0&&F(this),b};let R;this.getAttributes=function(){return R===void 0&&F(this),R};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(m,b_)),k},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=S_++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=P,this}let G_=0;class V_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new W_(e),t.set(e,i)),i}}class W_{constructor(e){this.id=G_++,this.code=e,this.usedTimes=0}}function X_(n,e,t,i,s,r,o){const a=new Vh,l=new V_,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return b===0?"uv":`uv${b}`}function m(b,R,k,Y,he){const N=Y.fog,H=he.geometry,z=b.isMeshStandardMaterial?Y.environment:null,ee=(b.isMeshStandardMaterial?t:e).get(b.envMap||z),Z=ee&&ee.mapping===ao?ee.image.height:null,X=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const te=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Q=te!==void 0?te.length:0;let ye=0;H.morphAttributes.position!==void 0&&(ye=1),H.morphAttributes.normal!==void 0&&(ye=2),H.morphAttributes.color!==void 0&&(ye=3);let $,G,le,ge;if(X){const ve=In[X];$=ve.vertexShader,G=ve.fragmentShader}else $=b.vertexShader,G=b.fragmentShader,l.update(b),le=l.getVertexShaderID(b),ge=l.getFragmentShaderID(b);const be=n.getRenderTarget(),Me=he.isInstancedMesh===!0,He=he.isBatchedMesh===!0,Se=!!b.map,ke=!!b.matcap,V=!!ee,Ct=!!b.aoMap,Oe=!!b.lightMap,Ie=!!b.bumpMap,Te=!!b.normalMap,lt=!!b.displacementMap,ze=!!b.emissiveMap,C=!!b.metalnessMap,T=!!b.roughnessMap,W=b.anisotropy>0,ae=b.clearcoat>0,oe=b.iridescence>0,se=b.sheen>0,we=b.transmission>0,J=W&&!!b.anisotropyMap,ce=ae&&!!b.clearcoatMap,Ce=ae&&!!b.clearcoatNormalMap,qe=ae&&!!b.clearcoatRoughnessMap,ne=oe&&!!b.iridescenceMap,nt=oe&&!!b.iridescenceThicknessMap,$e=se&&!!b.sheenColorMap,We=se&&!!b.sheenRoughnessMap,De=!!b.specularMap,xe=!!b.specularColorMap,Ye=!!b.specularIntensityMap,ot=we&&!!b.transmissionMap,yt=we&&!!b.thicknessMap,Je=!!b.gradientMap,pe=!!b.alphaMap,D=b.alphaTest>0,_e=!!b.alphaHash,S=!!b.extensions,U=!!H.attributes.uv1,L=!!H.attributes.uv2,_=!!H.attributes.uv3;let O=hi;return b.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(O=n.toneMapping),{isWebGL2:h,shaderID:X,shaderType:b.type,shaderName:b.name,vertexShader:$,fragmentShader:G,defines:b.defines,customVertexShaderID:le,customFragmentShaderID:ge,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:He,instancing:Me,instancingColor:Me&&he.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:be===null?n.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:Vt,map:Se,matcap:ke,envMap:V,envMapMode:V&&ee.mapping,envMapCubeUVHeight:Z,aoMap:Ct,lightMap:Oe,bumpMap:Ie,normalMap:Te,displacementMap:d&&lt,emissiveMap:ze,normalMapObjectSpace:Te&&b.normalMapType===zf,normalMapTangentSpace:Te&&b.normalMapType===Ba,metalnessMap:C,roughnessMap:T,anisotropy:W,anisotropyMap:J,clearcoat:ae,clearcoatMap:ce,clearcoatNormalMap:Ce,clearcoatRoughnessMap:qe,iridescence:oe,iridescenceMap:ne,iridescenceThicknessMap:nt,sheen:se,sheenColorMap:$e,sheenRoughnessMap:We,specularMap:De,specularColorMap:xe,specularIntensityMap:Ye,transmission:we,transmissionMap:ot,thicknessMap:yt,gradientMap:Je,opaque:b.transparent===!1&&b.blending===ds,alphaMap:pe,alphaTest:D,alphaHash:_e,combine:b.combine,mapUv:Se&&v(b.map.channel),aoMapUv:Ct&&v(b.aoMap.channel),lightMapUv:Oe&&v(b.lightMap.channel),bumpMapUv:Ie&&v(b.bumpMap.channel),normalMapUv:Te&&v(b.normalMap.channel),displacementMapUv:lt&&v(b.displacementMap.channel),emissiveMapUv:ze&&v(b.emissiveMap.channel),metalnessMapUv:C&&v(b.metalnessMap.channel),roughnessMapUv:T&&v(b.roughnessMap.channel),anisotropyMapUv:J&&v(b.anisotropyMap.channel),clearcoatMapUv:ce&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:qe&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:We&&v(b.sheenRoughnessMap.channel),specularMapUv:De&&v(b.specularMap.channel),specularColorMapUv:xe&&v(b.specularColorMap.channel),specularIntensityMapUv:Ye&&v(b.specularIntensityMap.channel),transmissionMapUv:ot&&v(b.transmissionMap.channel),thicknessMapUv:yt&&v(b.thicknessMap.channel),alphaMapUv:pe&&v(b.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Te||W),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,vertexUv1s:U,vertexUv2s:L,vertexUv3s:_,pointsUvs:he.isPoints===!0&&!!H.attributes.uv&&(Se||pe),fog:!!N,useFog:b.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:he.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ye,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:O,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Se&&b.map.isVideoTexture===!0&&at.getTransfer(b.map.colorSpace)===Tt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===en,flipSided:b.side===tn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:S&&b.extensions.derivatives===!0,extensionFragDepth:S&&b.extensions.fragDepth===!0,extensionDrawBuffers:S&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:S&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:S&&b.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function p(b){const R=[];if(b.shaderID?R.push(b.shaderID):(R.push(b.customVertexShaderID),R.push(b.customFragmentShaderID)),b.defines!==void 0)for(const k in b.defines)R.push(k),R.push(b.defines[k]);return b.isRawShaderMaterial===!1&&(M(R,b),y(R,b),R.push(n.outputColorSpace)),R.push(b.customProgramCacheKey),R.join()}function M(b,R){b.push(R.precision),b.push(R.outputColorSpace),b.push(R.envMapMode),b.push(R.envMapCubeUVHeight),b.push(R.mapUv),b.push(R.alphaMapUv),b.push(R.lightMapUv),b.push(R.aoMapUv),b.push(R.bumpMapUv),b.push(R.normalMapUv),b.push(R.displacementMapUv),b.push(R.emissiveMapUv),b.push(R.metalnessMapUv),b.push(R.roughnessMapUv),b.push(R.anisotropyMapUv),b.push(R.clearcoatMapUv),b.push(R.clearcoatNormalMapUv),b.push(R.clearcoatRoughnessMapUv),b.push(R.iridescenceMapUv),b.push(R.iridescenceThicknessMapUv),b.push(R.sheenColorMapUv),b.push(R.sheenRoughnessMapUv),b.push(R.specularMapUv),b.push(R.specularColorMapUv),b.push(R.specularIntensityMapUv),b.push(R.transmissionMapUv),b.push(R.thicknessMapUv),b.push(R.combine),b.push(R.fogExp2),b.push(R.sizeAttenuation),b.push(R.morphTargetsCount),b.push(R.morphAttributeCount),b.push(R.numDirLights),b.push(R.numPointLights),b.push(R.numSpotLights),b.push(R.numSpotLightMaps),b.push(R.numHemiLights),b.push(R.numRectAreaLights),b.push(R.numDirLightShadows),b.push(R.numPointLightShadows),b.push(R.numSpotLightShadows),b.push(R.numSpotLightShadowsWithMaps),b.push(R.numLightProbes),b.push(R.shadowMapType),b.push(R.toneMapping),b.push(R.numClippingPlanes),b.push(R.numClipIntersection),b.push(R.depthPacking)}function y(b,R){a.disableAll(),R.isWebGL2&&a.enable(0),R.supportsVertexTextures&&a.enable(1),R.instancing&&a.enable(2),R.instancingColor&&a.enable(3),R.matcap&&a.enable(4),R.envMap&&a.enable(5),R.normalMapObjectSpace&&a.enable(6),R.normalMapTangentSpace&&a.enable(7),R.clearcoat&&a.enable(8),R.iridescence&&a.enable(9),R.alphaTest&&a.enable(10),R.vertexColors&&a.enable(11),R.vertexAlphas&&a.enable(12),R.vertexUv1s&&a.enable(13),R.vertexUv2s&&a.enable(14),R.vertexUv3s&&a.enable(15),R.vertexTangents&&a.enable(16),R.anisotropy&&a.enable(17),R.alphaHash&&a.enable(18),R.batching&&a.enable(19),b.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.skinning&&a.enable(4),R.morphTargets&&a.enable(5),R.morphNormals&&a.enable(6),R.morphColors&&a.enable(7),R.premultipliedAlpha&&a.enable(8),R.shadowMapEnabled&&a.enable(9),R.useLegacyLights&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function x(b){const R=g[b.type];let k;if(R){const Y=In[R];k=wp.clone(Y.uniforms)}else k=b.uniforms;return k}function I(b,R){let k;for(let Y=0,he=c.length;Y<he;Y++){const N=c[Y];if(N.cacheKey===R){k=N,++k.usedTimes;break}}return k===void 0&&(k=new H_(n,R,b,r),c.push(k)),k}function w(b){if(--b.usedTimes===0){const R=c.indexOf(b);c[R]=c[c.length-1],c.pop(),b.destroy()}}function P(b){l.remove(b)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:I,releaseProgram:w,releaseShaderCache:P,programs:c,dispose:F}}function q_(){let n=new WeakMap;function e(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function t(r){n.delete(r)}function i(r,o,a){n.get(r)[o]=a}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function j_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Lc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ic(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(u,d,f,g,v,m){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},n[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function a(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||j_),i.length>1&&i.sort(d||Lc),s.length>1&&s.sort(d||Lc)}function h(){for(let u=e,d=n.length;u<d;u++){const f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Y_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Ic,n.set(i,[o])):s>=r.length?(o=new Ic,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function K_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new Ae};break;case"SpotLight":t={position:new E,direction:new E,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new E,halfWidth:new E,halfHeight:new E};break}return n[e.id]=t,t}}}function $_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let J_=0;function Z_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Q_(n,e){const t=new K_,i=$_(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new E);const r=new E,o=new et,a=new et;function l(h,u){let d=0,f=0,g=0;for(let Y=0;Y<9;Y++)s.probe[Y].set(0,0,0);let v=0,m=0,p=0,M=0,y=0,x=0,I=0,w=0,P=0,F=0,b=0;h.sort(Z_);const R=u===!0?Math.PI:1;for(let Y=0,he=h.length;Y<he;Y++){const N=h[Y],H=N.color,z=N.intensity,ee=N.distance,Z=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)d+=H.r*z*R,f+=H.g*z*R,g+=H.b*z*R;else if(N.isLightProbe){for(let X=0;X<9;X++)s.probe[X].addScaledVector(N.sh.coefficients[X],z);b++}else if(N.isDirectionalLight){const X=t.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity*R),N.castShadow){const te=N.shadow,Q=i.get(N);Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,s.directionalShadow[v]=Q,s.directionalShadowMap[v]=Z,s.directionalShadowMatrix[v]=N.shadow.matrix,x++}s.directional[v]=X,v++}else if(N.isSpotLight){const X=t.get(N);X.position.setFromMatrixPosition(N.matrixWorld),X.color.copy(H).multiplyScalar(z*R),X.distance=ee,X.coneCos=Math.cos(N.angle),X.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),X.decay=N.decay,s.spot[p]=X;const te=N.shadow;if(N.map&&(s.spotLightMap[P]=N.map,P++,te.updateMatrices(N),N.castShadow&&F++),s.spotLightMatrix[p]=te.matrix,N.castShadow){const Q=i.get(N);Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,s.spotShadow[p]=Q,s.spotShadowMap[p]=Z,w++}p++}else if(N.isRectAreaLight){const X=t.get(N);X.color.copy(H).multiplyScalar(z),X.halfWidth.set(N.width*.5,0,0),X.halfHeight.set(0,N.height*.5,0),s.rectArea[M]=X,M++}else if(N.isPointLight){const X=t.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity*R),X.distance=N.distance,X.decay=N.decay,N.castShadow){const te=N.shadow,Q=i.get(N);Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,Q.shadowCameraNear=te.camera.near,Q.shadowCameraFar=te.camera.far,s.pointShadow[m]=Q,s.pointShadowMap[m]=Z,s.pointShadowMatrix[m]=N.shadow.matrix,I++}s.point[m]=X,m++}else if(N.isHemisphereLight){const X=t.get(N);X.skyColor.copy(N.color).multiplyScalar(z*R),X.groundColor.copy(N.groundColor).multiplyScalar(z*R),s.hemi[y]=X,y++}}M>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=me.LTC_FLOAT_1,s.rectAreaLTC2=me.LTC_FLOAT_2):(s.rectAreaLTC1=me.LTC_HALF_1,s.rectAreaLTC2=me.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=me.LTC_FLOAT_1,s.rectAreaLTC2=me.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=me.LTC_HALF_1,s.rectAreaLTC2=me.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=f,s.ambient[2]=g;const k=s.hash;(k.directionalLength!==v||k.pointLength!==m||k.spotLength!==p||k.rectAreaLength!==M||k.hemiLength!==y||k.numDirectionalShadows!==x||k.numPointShadows!==I||k.numSpotShadows!==w||k.numSpotMaps!==P||k.numLightProbes!==b)&&(s.directional.length=v,s.spot.length=p,s.rectArea.length=M,s.point.length=m,s.hemi.length=y,s.directionalShadow.length=x,s.directionalShadowMap.length=x,s.pointShadow.length=I,s.pointShadowMap.length=I,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=x,s.pointShadowMatrix.length=I,s.spotLightMatrix.length=w+P-F,s.spotLightMap.length=P,s.numSpotLightShadowsWithMaps=F,s.numLightProbes=b,k.directionalLength=v,k.pointLength=m,k.spotLength=p,k.rectAreaLength=M,k.hemiLength=y,k.numDirectionalShadows=x,k.numPointShadows=I,k.numSpotShadows=w,k.numSpotMaps=P,k.numLightProbes=b,s.version=J_++)}function c(h,u){let d=0,f=0,g=0,v=0,m=0;const p=u.matrixWorldInverse;for(let M=0,y=h.length;M<y;M++){const x=h[M];if(x.isDirectionalLight){const I=s.directional[d];I.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(p),d++}else if(x.isSpotLight){const I=s.spot[g];I.position.setFromMatrixPosition(x.matrixWorld),I.position.applyMatrix4(p),I.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(p),g++}else if(x.isRectAreaLight){const I=s.rectArea[v];I.position.setFromMatrixPosition(x.matrixWorld),I.position.applyMatrix4(p),a.identity(),o.copy(x.matrixWorld),o.premultiply(p),a.extractRotation(o),I.halfWidth.set(x.width*.5,0,0),I.halfHeight.set(0,x.height*.5,0),I.halfWidth.applyMatrix4(a),I.halfHeight.applyMatrix4(a),v++}else if(x.isPointLight){const I=s.point[f];I.position.setFromMatrixPosition(x.matrixWorld),I.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){const I=s.hemi[m];I.direction.setFromMatrixPosition(x.matrixWorld),I.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:s}}function Dc(n,e){const t=new Q_(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function o(u){i.push(u)}function a(u){s.push(u)}function l(u){t.setup(i,u)}function c(u){t.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function ev(n,e){let t=new WeakMap;function i(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new Dc(n,e),t.set(r,[l])):o>=a.length?(l=new Dc(n,e),a.push(l)):l=a[o],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class tv extends bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class nv extends bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const iv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sv=`uniform sampler2D shadow_pass;
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
}`;function rv(n,e,t){let i=new Ga;const s=new Ee,r=new Ee,o=new mt,a=new tv({depthPacking:Bf}),l=new nv,c={},h=t.maxTextureSize,u={[Kn]:tn,[tn]:Kn,[en]:en},d=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:iv,fragmentShader:sv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Rt;g.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new je(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xh;let p=this.type;this.render=function(w,P,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const b=n.getRenderTarget(),R=n.getActiveCubeFace(),k=n.getActiveMipmapLevel(),Y=n.state;Y.setBlending(ci),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const he=p!==Xn&&this.type===Xn,N=p===Xn&&this.type!==Xn;for(let H=0,z=w.length;H<z;H++){const ee=w[H],Z=ee.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);const X=Z.getFrameExtents();if(s.multiply(X),r.copy(Z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,Z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,Z.mapSize.y=r.y)),Z.map===null||he===!0||N===!0){const Q=this.type!==Xn?{minFilter:Nt,magFilter:Nt}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Ui(s.x,s.y,Q),Z.map.texture.name=ee.name+".shadowMap",Z.camera.updateProjectionMatrix()}n.setRenderTarget(Z.map),n.clear();const te=Z.getViewportCount();for(let Q=0;Q<te;Q++){const ye=Z.getViewport(Q);o.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),Y.viewport(o),Z.updateMatrices(ee,Q),i=Z.getFrustum(),x(P,F,Z.camera,ee,this.type)}Z.isPointLightShadow!==!0&&this.type===Xn&&M(Z,F),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,R,k)};function M(w,P){const F=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ui(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(P,null,F,d,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(P,null,F,f,v,null)}function y(w,P,F,b){let R=null;const k=F.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(k!==void 0)R=k;else if(R=F.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const Y=R.uuid,he=P.uuid;let N=c[Y];N===void 0&&(N={},c[Y]=N);let H=N[he];H===void 0&&(H=R.clone(),N[he]=H,P.addEventListener("dispose",I)),R=H}if(R.visible=P.visible,R.wireframe=P.wireframe,b===Xn?R.side=P.shadowSide!==null?P.shadowSide:P.side:R.side=P.shadowSide!==null?P.shadowSide:u[P.side],R.alphaMap=P.alphaMap,R.alphaTest=P.alphaTest,R.map=P.map,R.clipShadows=P.clipShadows,R.clippingPlanes=P.clippingPlanes,R.clipIntersection=P.clipIntersection,R.displacementMap=P.displacementMap,R.displacementScale=P.displacementScale,R.displacementBias=P.displacementBias,R.wireframeLinewidth=P.wireframeLinewidth,R.linewidth=P.linewidth,F.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const Y=n.properties.get(R);Y.light=F}return R}function x(w,P,F,b,R){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===Xn)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,w.matrixWorld);const he=e.update(w),N=w.material;if(Array.isArray(N)){const H=he.groups;for(let z=0,ee=H.length;z<ee;z++){const Z=H[z],X=N[Z.materialIndex];if(X&&X.visible){const te=y(w,X,b,R);w.onBeforeShadow(n,w,P,F,he,te,Z),n.renderBufferDirect(F,null,he,te,w,Z),w.onAfterShadow(n,w,P,F,he,te,Z)}}}else if(N.visible){const H=y(w,N,b,R);w.onBeforeShadow(n,w,P,F,he,H,null),n.renderBufferDirect(F,null,he,H,w,null),w.onAfterShadow(n,w,P,F,he,H,null)}}const Y=w.children;for(let he=0,N=Y.length;he<N;he++)x(Y[he],P,F,b,R)}function I(w){w.target.removeEventListener("dispose",I);for(const F in c){const b=c[F],R=w.target.uuid;R in b&&(b[R].dispose(),delete b[R])}}}function ov(n,e,t){const i=t.isWebGL2;function s(){let D=!1;const _e=new mt;let S=null;const U=new mt(0,0,0,0);return{setMask:function(L){S!==L&&!D&&(n.colorMask(L,L,L,L),S=L)},setLocked:function(L){D=L},setClear:function(L,_,O,ie,ve){ve===!0&&(L*=ie,_*=ie,O*=ie),_e.set(L,_,O,ie),U.equals(_e)===!1&&(n.clearColor(L,_,O,ie),U.copy(_e))},reset:function(){D=!1,S=null,U.set(-1,0,0,0)}}}function r(){let D=!1,_e=null,S=null,U=null;return{setTest:function(L){L?He(n.DEPTH_TEST):Se(n.DEPTH_TEST)},setMask:function(L){_e!==L&&!D&&(n.depthMask(L),_e=L)},setFunc:function(L){if(S!==L){switch(L){case pf:n.depthFunc(n.NEVER);break;case mf:n.depthFunc(n.ALWAYS);break;case gf:n.depthFunc(n.LESS);break;case Jr:n.depthFunc(n.LEQUAL);break;case _f:n.depthFunc(n.EQUAL);break;case vf:n.depthFunc(n.GEQUAL);break;case yf:n.depthFunc(n.GREATER);break;case Mf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}S=L}},setLocked:function(L){D=L},setClear:function(L){U!==L&&(n.clearDepth(L),U=L)},reset:function(){D=!1,_e=null,S=null,U=null}}}function o(){let D=!1,_e=null,S=null,U=null,L=null,_=null,O=null,ie=null,ve=null;return{setTest:function(de){D||(de?He(n.STENCIL_TEST):Se(n.STENCIL_TEST))},setMask:function(de){_e!==de&&!D&&(n.stencilMask(de),_e=de)},setFunc:function(de,Pe,rt){(S!==de||U!==Pe||L!==rt)&&(n.stencilFunc(de,Pe,rt),S=de,U=Pe,L=rt)},setOp:function(de,Pe,rt){(_!==de||O!==Pe||ie!==rt)&&(n.stencilOp(de,Pe,rt),_=de,O=Pe,ie=rt)},setLocked:function(de){D=de},setClear:function(de){ve!==de&&(n.clearStencil(de),ve=de)},reset:function(){D=!1,_e=null,S=null,U=null,L=null,_=null,O=null,ie=null,ve=null}}}const a=new s,l=new r,c=new o,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,v=[],m=null,p=!1,M=null,y=null,x=null,I=null,w=null,P=null,F=null,b=new Ae(0,0,0),R=0,k=!1,Y=null,he=null,N=null,H=null,z=null;const ee=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,X=0;const te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(te)[1]),Z=X>=1):te.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),Z=X>=2);let Q=null,ye={};const $=n.getParameter(n.SCISSOR_BOX),G=n.getParameter(n.VIEWPORT),le=new mt().fromArray($),ge=new mt().fromArray(G);function be(D,_e,S,U){const L=new Uint8Array(4),_=n.createTexture();n.bindTexture(D,_),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let O=0;O<S;O++)i&&(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)?n.texImage3D(_e,0,n.RGBA,1,1,U,0,n.RGBA,n.UNSIGNED_BYTE,L):n.texImage2D(_e+O,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,L);return _}const Me={};Me[n.TEXTURE_2D]=be(n.TEXTURE_2D,n.TEXTURE_2D,1),Me[n.TEXTURE_CUBE_MAP]=be(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Me[n.TEXTURE_2D_ARRAY]=be(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Me[n.TEXTURE_3D]=be(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),He(n.DEPTH_TEST),l.setFunc(Jr),ze(!1),C(fl),He(n.CULL_FACE),Te(ci);function He(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function Se(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function ke(D,_e){return f[D]!==_e?(n.bindFramebuffer(D,_e),f[D]=_e,i&&(D===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=_e),D===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=_e)),!0):!1}function V(D,_e){let S=v,U=!1;if(D)if(S=g.get(_e),S===void 0&&(S=[],g.set(_e,S)),D.isWebGLMultipleRenderTargets){const L=D.texture;if(S.length!==L.length||S[0]!==n.COLOR_ATTACHMENT0){for(let _=0,O=L.length;_<O;_++)S[_]=n.COLOR_ATTACHMENT0+_;S.length=L.length,U=!0}}else S[0]!==n.COLOR_ATTACHMENT0&&(S[0]=n.COLOR_ATTACHMENT0,U=!0);else S[0]!==n.BACK&&(S[0]=n.BACK,U=!0);U&&(t.isWebGL2?n.drawBuffers(S):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(S))}function Ct(D){return m!==D?(n.useProgram(D),m=D,!0):!1}const Oe={[Ai]:n.FUNC_ADD,[Zd]:n.FUNC_SUBTRACT,[Qd]:n.FUNC_REVERSE_SUBTRACT};if(i)Oe[gl]=n.MIN,Oe[_l]=n.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(Oe[gl]=D.MIN_EXT,Oe[_l]=D.MAX_EXT)}const Ie={[ef]:n.ZERO,[tf]:n.ONE,[nf]:n.SRC_COLOR,[ya]:n.SRC_ALPHA,[cf]:n.SRC_ALPHA_SATURATE,[af]:n.DST_COLOR,[rf]:n.DST_ALPHA,[sf]:n.ONE_MINUS_SRC_COLOR,[Ma]:n.ONE_MINUS_SRC_ALPHA,[lf]:n.ONE_MINUS_DST_COLOR,[of]:n.ONE_MINUS_DST_ALPHA,[hf]:n.CONSTANT_COLOR,[uf]:n.ONE_MINUS_CONSTANT_COLOR,[df]:n.CONSTANT_ALPHA,[ff]:n.ONE_MINUS_CONSTANT_ALPHA};function Te(D,_e,S,U,L,_,O,ie,ve,de){if(D===ci){p===!0&&(Se(n.BLEND),p=!1);return}if(p===!1&&(He(n.BLEND),p=!0),D!==Jd){if(D!==M||de!==k){if((y!==Ai||w!==Ai)&&(n.blendEquation(n.FUNC_ADD),y=Ai,w=Ai),de)switch(D){case ds:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case va:n.blendFunc(n.ONE,n.ONE);break;case pl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ml:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ds:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case va:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case pl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ml:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}x=null,I=null,P=null,F=null,b.set(0,0,0),R=0,M=D,k=de}return}L=L||_e,_=_||S,O=O||U,(_e!==y||L!==w)&&(n.blendEquationSeparate(Oe[_e],Oe[L]),y=_e,w=L),(S!==x||U!==I||_!==P||O!==F)&&(n.blendFuncSeparate(Ie[S],Ie[U],Ie[_],Ie[O]),x=S,I=U,P=_,F=O),(ie.equals(b)===!1||ve!==R)&&(n.blendColor(ie.r,ie.g,ie.b,ve),b.copy(ie),R=ve),M=D,k=!1}function lt(D,_e){D.side===en?Se(n.CULL_FACE):He(n.CULL_FACE);let S=D.side===tn;_e&&(S=!S),ze(S),D.blending===ds&&D.transparent===!1?Te(ci):Te(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),a.setMask(D.colorWrite);const U=D.stencilWrite;c.setTest(U),U&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),W(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?He(n.SAMPLE_ALPHA_TO_COVERAGE):Se(n.SAMPLE_ALPHA_TO_COVERAGE)}function ze(D){Y!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),Y=D)}function C(D){D!==Kd?(He(n.CULL_FACE),D!==he&&(D===fl?n.cullFace(n.BACK):D===$d?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Se(n.CULL_FACE),he=D}function T(D){D!==N&&(Z&&n.lineWidth(D),N=D)}function W(D,_e,S){D?(He(n.POLYGON_OFFSET_FILL),(H!==_e||z!==S)&&(n.polygonOffset(_e,S),H=_e,z=S)):Se(n.POLYGON_OFFSET_FILL)}function ae(D){D?He(n.SCISSOR_TEST):Se(n.SCISSOR_TEST)}function oe(D){D===void 0&&(D=n.TEXTURE0+ee-1),Q!==D&&(n.activeTexture(D),Q=D)}function se(D,_e,S){S===void 0&&(Q===null?S=n.TEXTURE0+ee-1:S=Q);let U=ye[S];U===void 0&&(U={type:void 0,texture:void 0},ye[S]=U),(U.type!==D||U.texture!==_e)&&(Q!==S&&(n.activeTexture(S),Q=S),n.bindTexture(D,_e||Me[D]),U.type=D,U.texture=_e)}function we(){const D=ye[Q];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ce(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function qe(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $e(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function We(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function De(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ye(D){le.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),le.copy(D))}function ot(D){ge.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),ge.copy(D))}function yt(D,_e){let S=u.get(_e);S===void 0&&(S=new WeakMap,u.set(_e,S));let U=S.get(D);U===void 0&&(U=n.getUniformBlockIndex(_e,D.name),S.set(D,U))}function Je(D,_e){const U=u.get(_e).get(D);h.get(_e)!==U&&(n.uniformBlockBinding(_e,U,D.__bindingPointIndex),h.set(_e,U))}function pe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},Q=null,ye={},f={},g=new WeakMap,v=[],m=null,p=!1,M=null,y=null,x=null,I=null,w=null,P=null,F=null,b=new Ae(0,0,0),R=0,k=!1,Y=null,he=null,N=null,H=null,z=null,le.set(0,0,n.canvas.width,n.canvas.height),ge.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:He,disable:Se,bindFramebuffer:ke,drawBuffers:V,useProgram:Ct,setBlending:Te,setMaterial:lt,setFlipSided:ze,setCullFace:C,setLineWidth:T,setPolygonOffset:W,setScissorTest:ae,activeTexture:oe,bindTexture:se,unbindTexture:we,compressedTexImage2D:J,compressedTexImage3D:ce,texImage2D:De,texImage3D:xe,updateUBOMapping:yt,uniformBlockBinding:Je,texStorage2D:$e,texStorage3D:We,texSubImage2D:Ce,texSubImage3D:qe,compressedTexSubImage2D:ne,compressedTexSubImage3D:nt,scissor:Ye,viewport:ot,reset:pe}}function av(n,e,t,i,s,r,o){const a=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,T){return f?new OffscreenCanvas(C,T):sr("canvas")}function v(C,T,W,ae){let oe=1;if((C.width>ae||C.height>ae)&&(oe=ae/Math.max(C.width,C.height)),oe<1||T===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const se=T?io:Math.floor,we=se(oe*C.width),J=se(oe*C.height);u===void 0&&(u=g(we,J));const ce=W?g(we,J):u;return ce.width=we,ce.height=J,ce.getContext("2d").drawImage(C,0,0,we,J),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+we+"x"+J+")."),ce}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function m(C){return wa(C.width)&&wa(C.height)}function p(C){return a?!1:C.wrapS!==vn||C.wrapT!==vn||C.minFilter!==Nt&&C.minFilter!==rn}function M(C,T){return C.generateMipmaps&&T&&C.minFilter!==Nt&&C.minFilter!==rn}function y(C){n.generateMipmap(C)}function x(C,T,W,ae,oe=!1){if(a===!1)return T;if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let se=T;if(T===n.RED&&(W===n.FLOAT&&(se=n.R32F),W===n.HALF_FLOAT&&(se=n.R16F),W===n.UNSIGNED_BYTE&&(se=n.R8)),T===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(se=n.R8UI),W===n.UNSIGNED_SHORT&&(se=n.R16UI),W===n.UNSIGNED_INT&&(se=n.R32UI),W===n.BYTE&&(se=n.R8I),W===n.SHORT&&(se=n.R16I),W===n.INT&&(se=n.R32I)),T===n.RG&&(W===n.FLOAT&&(se=n.RG32F),W===n.HALF_FLOAT&&(se=n.RG16F),W===n.UNSIGNED_BYTE&&(se=n.RG8)),T===n.RGBA){const we=oe?Qr:at.getTransfer(ae);W===n.FLOAT&&(se=n.RGBA32F),W===n.HALF_FLOAT&&(se=n.RGBA16F),W===n.UNSIGNED_BYTE&&(se=we===Tt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function I(C,T,W){return M(C,W)===!0||C.isFramebufferTexture&&C.minFilter!==Nt&&C.minFilter!==rn?Math.log2(Math.max(T.width,T.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?T.mipmaps.length:1}function w(C){return C===Nt||C===Ta||C===qr?n.NEAREST:n.LINEAR}function P(C){const T=C.target;T.removeEventListener("dispose",P),b(T),T.isVideoTexture&&h.delete(T)}function F(C){const T=C.target;T.removeEventListener("dispose",F),k(T)}function b(C){const T=i.get(C);if(T.__webglInit===void 0)return;const W=C.source,ae=d.get(W);if(ae){const oe=ae[T.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&R(C),Object.keys(ae).length===0&&d.delete(W)}i.remove(C)}function R(C){const T=i.get(C);n.deleteTexture(T.__webglTexture);const W=C.source,ae=d.get(W);delete ae[T.__cacheKey],o.memory.textures--}function k(C){const T=C.texture,W=i.get(C),ae=i.get(T);if(ae.__webglTexture!==void 0&&(n.deleteTexture(ae.__webglTexture),o.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(W.__webglFramebuffer[oe]))for(let se=0;se<W.__webglFramebuffer[oe].length;se++)n.deleteFramebuffer(W.__webglFramebuffer[oe][se]);else n.deleteFramebuffer(W.__webglFramebuffer[oe]);W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer[oe])}else{if(Array.isArray(W.__webglFramebuffer))for(let oe=0;oe<W.__webglFramebuffer.length;oe++)n.deleteFramebuffer(W.__webglFramebuffer[oe]);else n.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&n.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let oe=0;oe<W.__webglColorRenderbuffer.length;oe++)W.__webglColorRenderbuffer[oe]&&n.deleteRenderbuffer(W.__webglColorRenderbuffer[oe]);W.__webglDepthRenderbuffer&&n.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let oe=0,se=T.length;oe<se;oe++){const we=i.get(T[oe]);we.__webglTexture&&(n.deleteTexture(we.__webglTexture),o.memory.textures--),i.remove(T[oe])}i.remove(T),i.remove(C)}let Y=0;function he(){Y=0}function N(){const C=Y;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),Y+=1,C}function H(C){const T=[];return T.push(C.wrapS),T.push(C.wrapT),T.push(C.wrapR||0),T.push(C.magFilter),T.push(C.minFilter),T.push(C.anisotropy),T.push(C.internalFormat),T.push(C.format),T.push(C.type),T.push(C.generateMipmaps),T.push(C.premultiplyAlpha),T.push(C.flipY),T.push(C.unpackAlignment),T.push(C.colorSpace),T.join()}function z(C,T){const W=i.get(C);if(C.isVideoTexture&&lt(C),C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){const ae=C.image;if(ae===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(W,C,T);return}}t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+T)}function ee(C,T){const W=i.get(C);if(C.version>0&&W.__version!==C.version){le(W,C,T);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+T)}function Z(C,T){const W=i.get(C);if(C.version>0&&W.__version!==C.version){le(W,C,T);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+T)}function X(C,T){const W=i.get(C);if(C.version>0&&W.__version!==C.version){ge(W,C,T);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+T)}const te={[mi]:n.REPEAT,[vn]:n.CLAMP_TO_EDGE,[Zr]:n.MIRRORED_REPEAT},Q={[Nt]:n.NEAREST,[Ta]:n.NEAREST_MIPMAP_NEAREST,[qr]:n.NEAREST_MIPMAP_LINEAR,[rn]:n.LINEAR,[wh]:n.LINEAR_MIPMAP_NEAREST,[Ni]:n.LINEAR_MIPMAP_LINEAR},ye={[Hf]:n.NEVER,[jf]:n.ALWAYS,[Gf]:n.LESS,[kh]:n.LEQUAL,[Vf]:n.EQUAL,[qf]:n.GEQUAL,[Wf]:n.GREATER,[Xf]:n.NOTEQUAL};function $(C,T,W){if(W?(n.texParameteri(C,n.TEXTURE_WRAP_S,te[T.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,te[T.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,te[T.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Q[T.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Q[T.minFilter])):(n.texParameteri(C,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(C,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(T.wrapS!==vn||T.wrapT!==vn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(C,n.TEXTURE_MAG_FILTER,w(T.magFilter)),n.texParameteri(C,n.TEXTURE_MIN_FILTER,w(T.minFilter)),T.minFilter!==Nt&&T.minFilter!==rn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,ye[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ae=e.get("EXT_texture_filter_anisotropic");if(T.magFilter===Nt||T.minFilter!==qr&&T.minFilter!==Ni||T.type===jn&&e.has("OES_texture_float_linear")===!1||a===!1&&T.type===nr&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||i.get(T).__currentAnisotropy)&&(n.texParameterf(C,ae.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy)}}function G(C,T){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,T.addEventListener("dispose",P));const ae=T.source;let oe=d.get(ae);oe===void 0&&(oe={},d.set(ae,oe));const se=H(T);if(se!==C.__cacheKey){oe[se]===void 0&&(oe[se]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,W=!0),oe[se].usedTimes++;const we=oe[C.__cacheKey];we!==void 0&&(oe[C.__cacheKey].usedTimes--,we.usedTimes===0&&R(T)),C.__cacheKey=se,C.__webglTexture=oe[se].texture}return W}function le(C,T,W){let ae=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ae=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ae=n.TEXTURE_3D);const oe=G(C,T),se=T.source;t.bindTexture(ae,C.__webglTexture,n.TEXTURE0+W);const we=i.get(se);if(se.version!==we.__version||oe===!0){t.activeTexture(n.TEXTURE0+W);const J=at.getPrimaries(at.workingColorSpace),ce=T.colorSpace===Mn?null:at.getPrimaries(T.colorSpace),Ce=T.colorSpace===Mn||J===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const qe=p(T)&&m(T.image)===!1;let ne=v(T.image,qe,!1,s.maxTextureSize);ne=ze(T,ne);const nt=m(ne)||a,$e=r.convert(T.format,T.colorSpace);let We=r.convert(T.type),De=x(T.internalFormat,$e,We,T.colorSpace,T.isVideoTexture);$(ae,T,nt);let xe;const Ye=T.mipmaps,ot=a&&T.isVideoTexture!==!0&&De!==Uh,yt=we.__version===void 0||oe===!0,Je=I(T,ne,nt);if(T.isDepthTexture)De=n.DEPTH_COMPONENT,a?T.type===jn?De=n.DEPTH_COMPONENT32F:T.type===ai?De=n.DEPTH_COMPONENT24:T.type===Li?De=n.DEPTH24_STENCIL8:De=n.DEPTH_COMPONENT16:T.type===jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===Ii&&De===n.DEPTH_COMPONENT&&T.type!==ka&&T.type!==ai&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=ai,We=r.convert(T.type)),T.format===vs&&De===n.DEPTH_COMPONENT&&(De=n.DEPTH_STENCIL,T.type!==Li&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=Li,We=r.convert(T.type))),yt&&(ot?t.texStorage2D(n.TEXTURE_2D,1,De,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,De,ne.width,ne.height,0,$e,We,null));else if(T.isDataTexture)if(Ye.length>0&&nt){ot&&yt&&t.texStorage2D(n.TEXTURE_2D,Je,De,Ye[0].width,Ye[0].height);for(let pe=0,D=Ye.length;pe<D;pe++)xe=Ye[pe],ot?t.texSubImage2D(n.TEXTURE_2D,pe,0,0,xe.width,xe.height,$e,We,xe.data):t.texImage2D(n.TEXTURE_2D,pe,De,xe.width,xe.height,0,$e,We,xe.data);T.generateMipmaps=!1}else ot?(yt&&t.texStorage2D(n.TEXTURE_2D,Je,De,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne.width,ne.height,$e,We,ne.data)):t.texImage2D(n.TEXTURE_2D,0,De,ne.width,ne.height,0,$e,We,ne.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ot&&yt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,De,Ye[0].width,Ye[0].height,ne.depth);for(let pe=0,D=Ye.length;pe<D;pe++)xe=Ye[pe],T.format!==yn?$e!==null?ot?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,pe,0,0,0,xe.width,xe.height,ne.depth,$e,xe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,pe,De,xe.width,xe.height,ne.depth,0,xe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?t.texSubImage3D(n.TEXTURE_2D_ARRAY,pe,0,0,0,xe.width,xe.height,ne.depth,$e,We,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,pe,De,xe.width,xe.height,ne.depth,0,$e,We,xe.data)}else{ot&&yt&&t.texStorage2D(n.TEXTURE_2D,Je,De,Ye[0].width,Ye[0].height);for(let pe=0,D=Ye.length;pe<D;pe++)xe=Ye[pe],T.format!==yn?$e!==null?ot?t.compressedTexSubImage2D(n.TEXTURE_2D,pe,0,0,xe.width,xe.height,$e,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,pe,De,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?t.texSubImage2D(n.TEXTURE_2D,pe,0,0,xe.width,xe.height,$e,We,xe.data):t.texImage2D(n.TEXTURE_2D,pe,De,xe.width,xe.height,0,$e,We,xe.data)}else if(T.isDataArrayTexture)ot?(yt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,De,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,$e,We,ne.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,De,ne.width,ne.height,ne.depth,0,$e,We,ne.data);else if(T.isData3DTexture)ot?(yt&&t.texStorage3D(n.TEXTURE_3D,Je,De,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,$e,We,ne.data)):t.texImage3D(n.TEXTURE_3D,0,De,ne.width,ne.height,ne.depth,0,$e,We,ne.data);else if(T.isFramebufferTexture){if(yt)if(ot)t.texStorage2D(n.TEXTURE_2D,Je,De,ne.width,ne.height);else{let pe=ne.width,D=ne.height;for(let _e=0;_e<Je;_e++)t.texImage2D(n.TEXTURE_2D,_e,De,pe,D,0,$e,We,null),pe>>=1,D>>=1}}else if(Ye.length>0&&nt){ot&&yt&&t.texStorage2D(n.TEXTURE_2D,Je,De,Ye[0].width,Ye[0].height);for(let pe=0,D=Ye.length;pe<D;pe++)xe=Ye[pe],ot?t.texSubImage2D(n.TEXTURE_2D,pe,0,0,$e,We,xe):t.texImage2D(n.TEXTURE_2D,pe,De,$e,We,xe);T.generateMipmaps=!1}else ot?(yt&&t.texStorage2D(n.TEXTURE_2D,Je,De,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,$e,We,ne)):t.texImage2D(n.TEXTURE_2D,0,De,$e,We,ne);M(T,nt)&&y(ae),we.__version=se.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function ge(C,T,W){if(T.image.length!==6)return;const ae=G(C,T),oe=T.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+W);const se=i.get(oe);if(oe.version!==se.__version||ae===!0){t.activeTexture(n.TEXTURE0+W);const we=at.getPrimaries(at.workingColorSpace),J=T.colorSpace===Mn?null:at.getPrimaries(T.colorSpace),ce=T.colorSpace===Mn||we===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Ce=T.isCompressedTexture||T.image[0].isCompressedTexture,qe=T.image[0]&&T.image[0].isDataTexture,ne=[];for(let pe=0;pe<6;pe++)!Ce&&!qe?ne[pe]=v(T.image[pe],!1,!0,s.maxCubemapSize):ne[pe]=qe?T.image[pe].image:T.image[pe],ne[pe]=ze(T,ne[pe]);const nt=ne[0],$e=m(nt)||a,We=r.convert(T.format,T.colorSpace),De=r.convert(T.type),xe=x(T.internalFormat,We,De,T.colorSpace),Ye=a&&T.isVideoTexture!==!0,ot=se.__version===void 0||ae===!0;let yt=I(T,nt,$e);$(n.TEXTURE_CUBE_MAP,T,$e);let Je;if(Ce){Ye&&ot&&t.texStorage2D(n.TEXTURE_CUBE_MAP,yt,xe,nt.width,nt.height);for(let pe=0;pe<6;pe++){Je=ne[pe].mipmaps;for(let D=0;D<Je.length;D++){const _e=Je[D];T.format!==yn?We!==null?Ye?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,D,0,0,_e.width,_e.height,We,_e.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,D,xe,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,D,0,0,_e.width,_e.height,We,De,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,D,xe,_e.width,_e.height,0,We,De,_e.data)}}}else{Je=T.mipmaps,Ye&&ot&&(Je.length>0&&yt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,yt,xe,ne[0].width,ne[0].height));for(let pe=0;pe<6;pe++)if(qe){Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ne[pe].width,ne[pe].height,We,De,ne[pe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,xe,ne[pe].width,ne[pe].height,0,We,De,ne[pe].data);for(let D=0;D<Je.length;D++){const S=Je[D].image[pe].image;Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,D+1,0,0,S.width,S.height,We,De,S.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,D+1,xe,S.width,S.height,0,We,De,S.data)}}else{Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,We,De,ne[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,xe,We,De,ne[pe]);for(let D=0;D<Je.length;D++){const _e=Je[D];Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,D+1,0,0,We,De,_e.image[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,D+1,xe,We,De,_e.image[pe])}}}M(T,$e)&&y(n.TEXTURE_CUBE_MAP),se.__version=oe.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function be(C,T,W,ae,oe,se){const we=r.convert(W.format,W.colorSpace),J=r.convert(W.type),ce=x(W.internalFormat,we,J,W.colorSpace);if(!i.get(T).__hasExternalTextures){const qe=Math.max(1,T.width>>se),ne=Math.max(1,T.height>>se);oe===n.TEXTURE_3D||oe===n.TEXTURE_2D_ARRAY?t.texImage3D(oe,se,ce,qe,ne,T.depth,0,we,J,null):t.texImage2D(oe,se,ce,qe,ne,0,we,J,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),Te(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ae,oe,i.get(W).__webglTexture,0,Ie(T)):(oe===n.TEXTURE_2D||oe>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ae,oe,i.get(W).__webglTexture,se),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Me(C,T,W){if(n.bindRenderbuffer(n.RENDERBUFFER,C),T.depthBuffer&&!T.stencilBuffer){let ae=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(W||Te(T)){const oe=T.depthTexture;oe&&oe.isDepthTexture&&(oe.type===jn?ae=n.DEPTH_COMPONENT32F:oe.type===ai&&(ae=n.DEPTH_COMPONENT24));const se=Ie(T);Te(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,ae,T.width,T.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,se,ae,T.width,T.height)}else n.renderbufferStorage(n.RENDERBUFFER,ae,T.width,T.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,C)}else if(T.depthBuffer&&T.stencilBuffer){const ae=Ie(T);W&&Te(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,n.DEPTH24_STENCIL8,T.width,T.height):Te(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae,n.DEPTH24_STENCIL8,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,C)}else{const ae=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let oe=0;oe<ae.length;oe++){const se=ae[oe],we=r.convert(se.format,se.colorSpace),J=r.convert(se.type),ce=x(se.internalFormat,we,J,se.colorSpace),Ce=Ie(T);W&&Te(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,ce,T.width,T.height):Te(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce,ce,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,ce,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function He(C,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),z(T.depthTexture,0);const ae=i.get(T.depthTexture).__webglTexture,oe=Ie(T);if(T.depthTexture.format===Ii)Te(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0);else if(T.depthTexture.format===vs)Te(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function Se(C){const T=i.get(C),W=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!T.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");He(T.__webglFramebuffer,C)}else if(W){T.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[ae]),T.__webglDepthbuffer[ae]=n.createRenderbuffer(),Me(T.__webglDepthbuffer[ae],C,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=n.createRenderbuffer(),Me(T.__webglDepthbuffer,C,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(C,T,W){const ae=i.get(C);T!==void 0&&be(ae.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&Se(C)}function V(C){const T=C.texture,W=i.get(C),ae=i.get(T);C.addEventListener("dispose",F),C.isWebGLMultipleRenderTargets!==!0&&(ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture()),ae.__version=T.version,o.memory.textures++);const oe=C.isWebGLCubeRenderTarget===!0,se=C.isWebGLMultipleRenderTargets===!0,we=m(C)||a;if(oe){W.__webglFramebuffer=[];for(let J=0;J<6;J++)if(a&&T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer[J]=[];for(let ce=0;ce<T.mipmaps.length;ce++)W.__webglFramebuffer[J][ce]=n.createFramebuffer()}else W.__webglFramebuffer[J]=n.createFramebuffer()}else{if(a&&T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer=[];for(let J=0;J<T.mipmaps.length;J++)W.__webglFramebuffer[J]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(se)if(s.drawBuffers){const J=C.texture;for(let ce=0,Ce=J.length;ce<Ce;ce++){const qe=i.get(J[ce]);qe.__webglTexture===void 0&&(qe.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&C.samples>0&&Te(C)===!1){const J=se?T:[T];W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ce=0;ce<J.length;ce++){const Ce=J[ce];W.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[ce]);const qe=r.convert(Ce.format,Ce.colorSpace),ne=r.convert(Ce.type),nt=x(Ce.internalFormat,qe,ne,Ce.colorSpace,C.isXRRenderTarget===!0),$e=Ie(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,$e,nt,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,W.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Me(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,ae.__webglTexture),$(n.TEXTURE_CUBE_MAP,T,we);for(let J=0;J<6;J++)if(a&&T.mipmaps&&T.mipmaps.length>0)for(let ce=0;ce<T.mipmaps.length;ce++)be(W.__webglFramebuffer[J][ce],C,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce);else be(W.__webglFramebuffer[J],C,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);M(T,we)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){const J=C.texture;for(let ce=0,Ce=J.length;ce<Ce;ce++){const qe=J[ce],ne=i.get(qe);t.bindTexture(n.TEXTURE_2D,ne.__webglTexture),$(n.TEXTURE_2D,qe,we),be(W.__webglFramebuffer,C,qe,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,0),M(qe,we)&&y(n.TEXTURE_2D)}t.unbindTexture()}else{let J=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(a?J=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(J,ae.__webglTexture),$(J,T,we),a&&T.mipmaps&&T.mipmaps.length>0)for(let ce=0;ce<T.mipmaps.length;ce++)be(W.__webglFramebuffer[ce],C,T,n.COLOR_ATTACHMENT0,J,ce);else be(W.__webglFramebuffer,C,T,n.COLOR_ATTACHMENT0,J,0);M(T,we)&&y(J),t.unbindTexture()}C.depthBuffer&&Se(C)}function Ct(C){const T=m(C)||a,W=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ae=0,oe=W.length;ae<oe;ae++){const se=W[ae];if(M(se,T)){const we=C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,J=i.get(se).__webglTexture;t.bindTexture(we,J),y(we),t.unbindTexture()}}}function Oe(C){if(a&&C.samples>0&&Te(C)===!1){const T=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],W=C.width,ae=C.height;let oe=n.COLOR_BUFFER_BIT;const se=[],we=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=i.get(C),ce=C.isWebGLMultipleRenderTargets===!0;if(ce)for(let Ce=0;Ce<T.length;Ce++)t.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,J.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,J.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,J.__webglFramebuffer);for(let Ce=0;Ce<T.length;Ce++){se.push(n.COLOR_ATTACHMENT0+Ce),C.depthBuffer&&se.push(we);const qe=J.__ignoreDepthValues!==void 0?J.__ignoreDepthValues:!1;if(qe===!1&&(C.depthBuffer&&(oe|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&(oe|=n.STENCIL_BUFFER_BIT)),ce&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,J.__webglColorRenderbuffer[Ce]),qe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[we]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[we])),ce){const ne=i.get(T[Ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,W,ae,0,0,W,ae,oe,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,se)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let Ce=0;Ce<T.length;Ce++){t.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,J.__webglColorRenderbuffer[Ce]);const qe=i.get(T[Ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,J.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,qe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,J.__webglMultisampledFramebuffer)}}function Ie(C){return Math.min(s.maxSamples,C.samples)}function Te(C){const T=i.get(C);return a&&C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function lt(C){const T=o.render.frame;h.get(C)!==T&&(h.set(C,T),C.update())}function ze(C,T){const W=C.colorSpace,ae=C.format,oe=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===Aa||W!==Vt&&W!==Mn&&(at.getTransfer(W)===Tt?a===!1?e.has("EXT_sRGB")===!0&&ae===yn?(C.format=Aa,C.minFilter=rn,C.generateMipmaps=!1):T=zh.sRGBToLinear(T):(ae!==yn||oe!==ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),T}this.allocateTextureUnit=N,this.resetTextureUnits=he,this.setTexture2D=z,this.setTexture2DArray=ee,this.setTexture3D=Z,this.setTextureCube=X,this.rebindTextures=ke,this.setupRenderTarget=V,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=be,this.useMultisampledRTT=Te}function lv(n,e,t){const i=t.isWebGL2;function s(r,o=Mn){let a;const l=at.getTransfer(o);if(r===ui)return n.UNSIGNED_BYTE;if(r===Ch)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Ph)return n.UNSIGNED_SHORT_5_5_5_1;if(r===Cf)return n.BYTE;if(r===Pf)return n.SHORT;if(r===ka)return n.UNSIGNED_SHORT;if(r===Rh)return n.INT;if(r===ai)return n.UNSIGNED_INT;if(r===jn)return n.FLOAT;if(r===nr)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Lf)return n.ALPHA;if(r===yn)return n.RGBA;if(r===If)return n.LUMINANCE;if(r===Df)return n.LUMINANCE_ALPHA;if(r===Ii)return n.DEPTH_COMPONENT;if(r===vs)return n.DEPTH_STENCIL;if(r===Aa)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Lh)return n.RED;if(r===Ih)return n.RED_INTEGER;if(r===Nf)return n.RG;if(r===Dh)return n.RG_INTEGER;if(r===Nh)return n.RGBA_INTEGER;if(r===So||r===To||r===xo||r===Eo)if(l===Tt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===So)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===To)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===xo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Eo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===So)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===To)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===xo)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Eo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===yl||r===Ml||r===bl||r===Sl)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===yl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ml)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===bl)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Sl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Uh)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Tl||r===xl)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Tl)return l===Tt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===xl)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===El||r===Al||r===wl||r===Rl||r===Cl||r===Pl||r===Ll||r===Il||r===Dl||r===Nl||r===Ul||r===Ol||r===Fl||r===kl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===El)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Al)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===wl)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Rl)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Cl)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Pl)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ll)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Il)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Dl)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Nl)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ul)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ol)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Fl)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===kl)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ao||r===Bl||r===zl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Ao)return l===Tt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Bl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===zl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Uf||r===Hl||r===Gl||r===Vl)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Ao)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Hl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Gl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Vl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Li?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class cv extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Lt extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hv={type:"move"};class $o{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(hv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Lt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class uv extends Es{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=t.getContextAttributes();let m=null,p=null;const M=[],y=[],x=new Ee;let I=null;const w=new Kt;w.layers.enable(1),w.viewport=new mt;const P=new Kt;P.layers.enable(2),P.viewport=new mt;const F=[w,P],b=new cv;b.layers.enable(1),b.layers.enable(2);let R=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let G=M[$];return G===void 0&&(G=new $o,M[$]=G),G.getTargetRaySpace()},this.getControllerGrip=function($){let G=M[$];return G===void 0&&(G=new $o,M[$]=G),G.getGripSpace()},this.getHand=function($){let G=M[$];return G===void 0&&(G=new $o,M[$]=G),G.getHandSpace()};function Y($){const G=y.indexOf($.inputSource);if(G===-1)return;const le=M[G];le!==void 0&&(le.update($.inputSource,$.frame,c||o),le.dispatchEvent({type:$.type,data:$.inputSource}))}function he(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",he),s.removeEventListener("inputsourceschange",N);for(let $=0;$<M.length;$++){const G=y[$];G!==null&&(y[$]=null,M[$].disconnect(G))}R=null,k=null,e.setRenderTarget(m),f=null,d=null,u=null,s=null,p=null,ye.stop(),i.isPresenting=!1,e.setPixelRatio(I),e.setSize(x.width,x.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",he),s.addEventListener("inputsourceschange",N),v.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(x),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const G={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,G),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Ui(f.framebufferWidth,f.framebufferHeight,{format:yn,type:ui,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let G=null,le=null,ge=null;v.depth&&(ge=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=v.stencil?vs:Ii,le=v.stencil?Li:ai);const be={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(be),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Ui(d.textureWidth,d.textureHeight,{format:yn,type:ui,depthTexture:new Jh(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const Me=e.properties.get(p);Me.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ye.setContext(s),ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function N($){for(let G=0;G<$.removed.length;G++){const le=$.removed[G],ge=y.indexOf(le);ge>=0&&(y[ge]=null,M[ge].disconnect(le))}for(let G=0;G<$.added.length;G++){const le=$.added[G];let ge=y.indexOf(le);if(ge===-1){for(let Me=0;Me<M.length;Me++)if(Me>=y.length){y.push(le),ge=Me;break}else if(y[Me]===null){y[Me]=le,ge=Me;break}if(ge===-1)break}const be=M[ge];be&&be.connect(le)}}const H=new E,z=new E;function ee($,G,le){H.setFromMatrixPosition(G.matrixWorld),z.setFromMatrixPosition(le.matrixWorld);const ge=H.distanceTo(z),be=G.projectionMatrix.elements,Me=le.projectionMatrix.elements,He=be[14]/(be[10]-1),Se=be[14]/(be[10]+1),ke=(be[9]+1)/be[5],V=(be[9]-1)/be[5],Ct=(be[8]-1)/be[0],Oe=(Me[8]+1)/Me[0],Ie=He*Ct,Te=He*Oe,lt=ge/(-Ct+Oe),ze=lt*-Ct;G.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ze),$.translateZ(lt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const C=He+lt,T=Se+lt,W=Ie-ze,ae=Te+(ge-ze),oe=ke*Se/T*C,se=V*Se/T*C;$.projectionMatrix.makePerspective(W,ae,oe,se,C,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function Z($,G){G===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(G.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;b.near=P.near=w.near=$.near,b.far=P.far=w.far=$.far,(R!==b.near||k!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),R=b.near,k=b.far);const G=$.parent,le=b.cameras;Z(b,G);for(let ge=0;ge<le.length;ge++)Z(le[ge],G);le.length===2?ee(b,w,P):b.projectionMatrix.copy(w.projectionMatrix),X($,b,G)};function X($,G,le){le===null?$.matrix.copy(G.matrixWorld):($.matrix.copy(le.matrixWorld),$.matrix.invert(),$.matrix.multiply(G.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(G.projectionMatrix),$.projectionMatrixInverse.copy(G.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ms*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)};let te=null;function Q($,G){if(h=G.getViewerPose(c||o),g=G,h!==null){const le=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let ge=!1;le.length!==b.cameras.length&&(b.cameras.length=0,ge=!0);for(let be=0;be<le.length;be++){const Me=le[be];let He=null;if(f!==null)He=f.getViewport(Me);else{const ke=u.getViewSubImage(d,Me);He=ke.viewport,be===0&&(e.setRenderTargetTextures(p,ke.colorTexture,d.ignoreDepthValues?void 0:ke.depthStencilTexture),e.setRenderTarget(p))}let Se=F[be];Se===void 0&&(Se=new Kt,Se.layers.enable(be),Se.viewport=new mt,F[be]=Se),Se.matrix.fromArray(Me.transform.matrix),Se.matrix.decompose(Se.position,Se.quaternion,Se.scale),Se.projectionMatrix.fromArray(Me.projectionMatrix),Se.projectionMatrixInverse.copy(Se.projectionMatrix).invert(),Se.viewport.set(He.x,He.y,He.width,He.height),be===0&&(b.matrix.copy(Se.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ge===!0&&b.cameras.push(Se)}}for(let le=0;le<M.length;le++){const ge=y[le],be=M[le];ge!==null&&be!==void 0&&be.update(ge,G,c||o)}te&&te($,G),G.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:G}),g=null}const ye=new $h;ye.setAnimationLoop(Q),this.setAnimationLoop=function($){te=$},this.dispose=function(){}}}function dv(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,jh(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,y,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const y=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*y,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function fv(n,e,t,i){let s={},r={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,y){const x=y.program;i.uniformBlockBinding(M,x)}function c(M,y){let x=s[M.id];x===void 0&&(g(M),x=h(M),s[M.id]=x,M.addEventListener("dispose",m));const I=y.program;i.updateUBOMapping(M,I);const w=e.render.frame;r[M.id]!==w&&(d(M),r[M.id]=w)}function h(M){const y=u();M.__bindingPointIndex=y;const x=n.createBuffer(),I=M.__size,w=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,I,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,x),x}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const y=s[M.id],x=M.uniforms,I=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let w=0,P=x.length;w<P;w++){const F=Array.isArray(x[w])?x[w]:[x[w]];for(let b=0,R=F.length;b<R;b++){const k=F[b];if(f(k,w,b,I)===!0){const Y=k.__offset,he=Array.isArray(k.value)?k.value:[k.value];let N=0;for(let H=0;H<he.length;H++){const z=he[H],ee=v(z);typeof z=="number"||typeof z=="boolean"?(k.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,Y+N,k.__data)):z.isMatrix3?(k.__data[0]=z.elements[0],k.__data[1]=z.elements[1],k.__data[2]=z.elements[2],k.__data[3]=0,k.__data[4]=z.elements[3],k.__data[5]=z.elements[4],k.__data[6]=z.elements[5],k.__data[7]=0,k.__data[8]=z.elements[6],k.__data[9]=z.elements[7],k.__data[10]=z.elements[8],k.__data[11]=0):(z.toArray(k.__data,N),N+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Y,k.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,y,x,I){const w=M.value,P=y+"_"+x;if(I[P]===void 0)return typeof w=="number"||typeof w=="boolean"?I[P]=w:I[P]=w.clone(),!0;{const F=I[P];if(typeof w=="number"||typeof w=="boolean"){if(F!==w)return I[P]=w,!0}else if(F.equals(w)===!1)return F.copy(w),!0}return!1}function g(M){const y=M.uniforms;let x=0;const I=16;for(let P=0,F=y.length;P<F;P++){const b=Array.isArray(y[P])?y[P]:[y[P]];for(let R=0,k=b.length;R<k;R++){const Y=b[R],he=Array.isArray(Y.value)?Y.value:[Y.value];for(let N=0,H=he.length;N<H;N++){const z=he[N],ee=v(z),Z=x%I;Z!==0&&I-Z<ee.boundary&&(x+=I-Z),Y.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=x,x+=ee.storage}}}const w=x%I;return w>0&&(x+=I-w),M.__size=x,M.__cache={},this}function v(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){const y=M.target;y.removeEventListener("dispose",m);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Xa{constructor(e={}){const{canvas:t=cp(),context:i=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wt,this._useLegacyLights=!1,this.toneMapping=hi,this.toneMappingExposure=1;const y=this;let x=!1,I=0,w=0,P=null,F=-1,b=null;const R=new mt,k=new mt;let Y=null;const he=new Ae(0);let N=0,H=t.width,z=t.height,ee=1,Z=null,X=null;const te=new mt(0,0,H,z),Q=new mt(0,0,H,z);let ye=!1;const $=new Ga;let G=!1,le=!1,ge=null;const be=new et,Me=new Ee,He=new E,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ke(){return P===null?ee:1}let V=i;function Ct(A,B){for(let j=0;j<A.length;j++){const K=A[j],q=t.getContext(K,B);if(q!==null)return q}return null}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ua}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",_e,!1),V===null){const B=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&B.shift(),V=Ct(B,A),V===null)throw Ct(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&V instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),V.getShaderPrecisionFormat===void 0&&(V.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Oe,Ie,Te,lt,ze,C,T,W,ae,oe,se,we,J,ce,Ce,qe,ne,nt,$e,We,De,xe,Ye,ot;function yt(){Oe=new Tg(V),Ie=new _g(V,Oe,e),Oe.init(Ie),xe=new lv(V,Oe,Ie),Te=new ov(V,Oe,Ie),lt=new Ag(V),ze=new q_,C=new av(V,Oe,Te,ze,Ie,xe,lt),T=new yg(y),W=new Sg(y),ae=new Np(V,Ie),Ye=new mg(V,Oe,ae,Ie),oe=new xg(V,ae,lt,Ye),se=new Pg(V,oe,ae,lt),$e=new Cg(V,Ie,C),qe=new vg(ze),we=new X_(y,T,W,Oe,Ie,Ye,qe),J=new dv(y,ze),ce=new Y_,Ce=new ev(Oe,Ie),nt=new pg(y,T,W,Te,se,d,l),ne=new rv(y,se,Ie),ot=new fv(V,lt,Ie,Te),We=new gg(V,Oe,lt,Ie),De=new Eg(V,Oe,lt,Ie),lt.programs=we.programs,y.capabilities=Ie,y.extensions=Oe,y.properties=ze,y.renderLists=ce,y.shadowMap=ne,y.state=Te,y.info=lt}yt();const Je=new uv(y,V);this.xr=Je,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const A=Oe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Oe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(A){A!==void 0&&(ee=A,this.setSize(H,z,!1))},this.getSize=function(A){return A.set(H,z)},this.setSize=function(A,B,j=!0){if(Je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=A,z=B,t.width=Math.floor(A*ee),t.height=Math.floor(B*ee),j===!0&&(t.style.width=A+"px",t.style.height=B+"px"),this.setViewport(0,0,A,B)},this.getDrawingBufferSize=function(A){return A.set(H*ee,z*ee).floor()},this.setDrawingBufferSize=function(A,B,j){H=A,z=B,ee=j,t.width=Math.floor(A*j),t.height=Math.floor(B*j),this.setViewport(0,0,A,B)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(te)},this.setViewport=function(A,B,j,K){A.isVector4?te.set(A.x,A.y,A.z,A.w):te.set(A,B,j,K),Te.viewport(R.copy(te).multiplyScalar(ee).floor())},this.getScissor=function(A){return A.copy(Q)},this.setScissor=function(A,B,j,K){A.isVector4?Q.set(A.x,A.y,A.z,A.w):Q.set(A,B,j,K),Te.scissor(k.copy(Q).multiplyScalar(ee).floor())},this.getScissorTest=function(){return ye},this.setScissorTest=function(A){Te.setScissorTest(ye=A)},this.setOpaqueSort=function(A){Z=A},this.setTransparentSort=function(A){X=A},this.getClearColor=function(A){return A.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor.apply(nt,arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha.apply(nt,arguments)},this.clear=function(A=!0,B=!0,j=!0){let K=0;if(A){let q=!1;if(P!==null){const fe=P.texture.format;q=fe===Nh||fe===Dh||fe===Ih}if(q){const fe=P.texture.type,Le=fe===ui||fe===ai||fe===ka||fe===Li||fe===Ch||fe===Ph,Ue=nt.getClearColor(),Be=nt.getClearAlpha(),Fe=Ue.r,Ve=Ue.g,Xe=Ue.b;Le?(f[0]=Fe,f[1]=Ve,f[2]=Xe,f[3]=Be,V.clearBufferuiv(V.COLOR,0,f)):(g[0]=Fe,g[1]=Ve,g[2]=Xe,g[3]=Be,V.clearBufferiv(V.COLOR,0,g))}else K|=V.COLOR_BUFFER_BIT}B&&(K|=V.DEPTH_BUFFER_BIT),j&&(K|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),ce.dispose(),Ce.dispose(),ze.dispose(),T.dispose(),W.dispose(),se.dispose(),Ye.dispose(),ot.dispose(),we.dispose(),Je.dispose(),Je.removeEventListener("sessionstart",ve),Je.removeEventListener("sessionend",de),ge&&(ge.dispose(),ge=null),Pe.stop()};function pe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const A=lt.autoReset,B=ne.enabled,j=ne.autoUpdate,K=ne.needsUpdate,q=ne.type;yt(),lt.autoReset=A,ne.enabled=B,ne.autoUpdate=j,ne.needsUpdate=K,ne.type=q}function _e(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function S(A){const B=A.target;B.removeEventListener("dispose",S),U(B)}function U(A){L(A),ze.remove(A)}function L(A){const B=ze.get(A).programs;B!==void 0&&(B.forEach(function(j){we.releaseProgram(j)}),A.isShaderMaterial&&we.releaseShaderCache(A))}this.renderBufferDirect=function(A,B,j,K,q,fe){B===null&&(B=Se);const Le=q.isMesh&&q.matrixWorld.determinant()<0,Ue=Bt(A,B,j,K,q);Te.setMaterial(K,Le);let Be=j.index,Fe=1;if(K.wireframe===!0){if(Be=oe.getWireframeAttribute(j),Be===void 0)return;Fe=2}const Ve=j.drawRange,Xe=j.attributes.position;let bt=Ve.start*Fe,Wt=(Ve.start+Ve.count)*Fe;fe!==null&&(bt=Math.max(bt,fe.start*Fe),Wt=Math.min(Wt,(fe.start+fe.count)*Fe)),Be!==null?(bt=Math.max(bt,0),Wt=Math.min(Wt,Be.count)):Xe!=null&&(bt=Math.max(bt,0),Wt=Math.min(Wt,Xe.count));const Pt=Wt-bt;if(Pt<0||Pt===1/0)return;Ye.setup(q,K,Ue,j,Be);let sn,_t=We;if(Be!==null&&(sn=ae.get(Be),_t=De,_t.setIndex(sn)),q.isMesh)K.wireframe===!0?(Te.setLineWidth(K.wireframeLinewidth*ke()),_t.setMode(V.LINES)):_t.setMode(V.TRIANGLES);else if(q.isLine){let Ke=K.linewidth;Ke===void 0&&(Ke=1),Te.setLineWidth(Ke*ke()),q.isLineSegments?_t.setMode(V.LINES):q.isLineLoop?_t.setMode(V.LINE_LOOP):_t.setMode(V.LINE_STRIP)}else q.isPoints?_t.setMode(V.POINTS):q.isSprite&&_t.setMode(V.TRIANGLES);if(q.isBatchedMesh)_t.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else if(q.isInstancedMesh)_t.renderInstances(bt,Pt,q.count);else if(j.isInstancedBufferGeometry){const Ke=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Bi=Math.min(j.instanceCount,Ke);_t.renderInstances(bt,Pt,Bi)}else _t.render(bt,Pt)};function _(A,B,j){A.transparent===!0&&A.side===en&&A.forceSinglePass===!1?(A.side=tn,A.needsUpdate=!0,ht(A,B,j),A.side=Kn,A.needsUpdate=!0,ht(A,B,j),A.side=en):ht(A,B,j)}this.compile=function(A,B,j=null){j===null&&(j=A),m=Ce.get(j),m.init(),M.push(m),j.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),A!==j&&A.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),m.setupLights(y._useLegacyLights);const K=new Set;return A.traverse(function(q){const fe=q.material;if(fe)if(Array.isArray(fe))for(let Le=0;Le<fe.length;Le++){const Ue=fe[Le];_(Ue,j,q),K.add(Ue)}else _(fe,j,q),K.add(fe)}),M.pop(),m=null,K},this.compileAsync=function(A,B,j=null){const K=this.compile(A,B,j);return new Promise(q=>{function fe(){if(K.forEach(function(Le){ze.get(Le).currentProgram.isReady()&&K.delete(Le)}),K.size===0){q(A);return}setTimeout(fe,10)}Oe.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let O=null;function ie(A){O&&O(A)}function ve(){Pe.stop()}function de(){Pe.start()}const Pe=new $h;Pe.setAnimationLoop(ie),typeof self<"u"&&Pe.setContext(self),this.setAnimationLoop=function(A){O=A,Je.setAnimationLoop(A),A===null?Pe.stop():Pe.start()},Je.addEventListener("sessionstart",ve),Je.addEventListener("sessionend",de),this.render=function(A,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(B),B=Je.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,B,P),m=Ce.get(A,M.length),m.init(),M.push(m),be.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),$.setFromProjectionMatrix(be),le=this.localClippingEnabled,G=qe.init(this.clippingPlanes,le),v=ce.get(A,p.length),v.init(),p.push(v),rt(A,B,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(Z,X),this.info.render.frame++,G===!0&&qe.beginShadows();const j=m.state.shadowsArray;if(ne.render(j,A,B),G===!0&&qe.endShadows(),this.info.autoReset===!0&&this.info.reset(),nt.render(v,A),m.setupLights(y._useLegacyLights),B.isArrayCamera){const K=B.cameras;for(let q=0,fe=K.length;q<fe;q++){const Le=K[q];it(v,A,Le,Le.viewport)}}else it(v,A,B);P!==null&&(C.updateMultisampleRenderTarget(P),C.updateRenderTargetMipmap(P)),A.isScene===!0&&A.onAfterRender(y,A,B),Ye.resetDefaultState(),F=-1,b=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function rt(A,B,j,K){if(A.visible===!1)return;if(A.layers.test(B.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(B);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||$.intersectsSprite(A)){K&&He.setFromMatrixPosition(A.matrixWorld).applyMatrix4(be);const Le=se.update(A),Ue=A.material;Ue.visible&&v.push(A,Le,Ue,j,He.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||$.intersectsObject(A))){const Le=se.update(A),Ue=A.material;if(K&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),He.copy(A.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),He.copy(Le.boundingSphere.center)),He.applyMatrix4(A.matrixWorld).applyMatrix4(be)),Array.isArray(Ue)){const Be=Le.groups;for(let Fe=0,Ve=Be.length;Fe<Ve;Fe++){const Xe=Be[Fe],bt=Ue[Xe.materialIndex];bt&&bt.visible&&v.push(A,Le,bt,j,He.z,Xe)}}else Ue.visible&&v.push(A,Le,Ue,j,He.z,null)}}const fe=A.children;for(let Le=0,Ue=fe.length;Le<Ue;Le++)rt(fe[Le],B,j,K)}function it(A,B,j,K){const q=A.opaque,fe=A.transmissive,Le=A.transparent;m.setupLightsView(j),G===!0&&qe.setGlobalState(y.clippingPlanes,j),fe.length>0&&kt(q,fe,B,j),K&&Te.viewport(R.copy(K)),q.length>0&&Mt(q,B,j),fe.length>0&&Mt(fe,B,j),Le.length>0&&Mt(Le,B,j),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function kt(A,B,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;const fe=Ie.isWebGL2;ge===null&&(ge=new Ui(1,1,{generateMipmaps:!0,type:Oe.has("EXT_color_buffer_half_float")?nr:ui,minFilter:Ni,samples:fe?4:0})),y.getDrawingBufferSize(Me),fe?ge.setSize(Me.x,Me.y):ge.setSize(io(Me.x),io(Me.y));const Le=y.getRenderTarget();y.setRenderTarget(ge),y.getClearColor(he),N=y.getClearAlpha(),N<1&&y.setClearColor(16777215,.5),y.clear();const Ue=y.toneMapping;y.toneMapping=hi,Mt(A,j,K),C.updateMultisampleRenderTarget(ge),C.updateRenderTargetMipmap(ge);let Be=!1;for(let Fe=0,Ve=B.length;Fe<Ve;Fe++){const Xe=B[Fe],bt=Xe.object,Wt=Xe.geometry,Pt=Xe.material,sn=Xe.group;if(Pt.side===en&&bt.layers.test(K.layers)){const _t=Pt.side;Pt.side=tn,Pt.needsUpdate=!0,ct(bt,j,K,Wt,Pt,sn),Pt.side=_t,Pt.needsUpdate=!0,Be=!0}}Be===!0&&(C.updateMultisampleRenderTarget(ge),C.updateRenderTargetMipmap(ge)),y.setRenderTarget(Le),y.setClearColor(he,N),y.toneMapping=Ue}function Mt(A,B,j){const K=B.isScene===!0?B.overrideMaterial:null;for(let q=0,fe=A.length;q<fe;q++){const Le=A[q],Ue=Le.object,Be=Le.geometry,Fe=K===null?Le.material:K,Ve=Le.group;Ue.layers.test(j.layers)&&ct(Ue,B,j,Be,Fe,Ve)}}function ct(A,B,j,K,q,fe){A.onBeforeRender(y,B,j,K,q,fe),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(y,B,j,K,A,fe),q.transparent===!0&&q.side===en&&q.forceSinglePass===!1?(q.side=tn,q.needsUpdate=!0,y.renderBufferDirect(j,B,K,q,A,fe),q.side=Kn,q.needsUpdate=!0,y.renderBufferDirect(j,B,K,q,A,fe),q.side=en):y.renderBufferDirect(j,B,K,q,A,fe),A.onAfterRender(y,B,j,K,q,fe)}function ht(A,B,j){B.isScene!==!0&&(B=Se);const K=ze.get(A),q=m.state.lights,fe=m.state.shadowsArray,Le=q.state.version,Ue=we.getParameters(A,q.state,fe,B,j),Be=we.getProgramCacheKey(Ue);let Fe=K.programs;K.environment=A.isMeshStandardMaterial?B.environment:null,K.fog=B.fog,K.envMap=(A.isMeshStandardMaterial?W:T).get(A.envMap||K.environment),Fe===void 0&&(A.addEventListener("dispose",S),Fe=new Map,K.programs=Fe);let Ve=Fe.get(Be);if(Ve!==void 0){if(K.currentProgram===Ve&&K.lightsStateVersion===Le)return an(A,Ue),Ve}else Ue.uniforms=we.getUniforms(A),A.onBuild(j,Ue,y),A.onBeforeCompile(Ue,y),Ve=we.acquireProgram(Ue,Be),Fe.set(Be,Ve),K.uniforms=Ue.uniforms;const Xe=K.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Xe.clippingPlanes=qe.uniform),an(A,Ue),K.needsLights=Ls(A),K.lightsStateVersion=Le,K.needsLights&&(Xe.ambientLightColor.value=q.state.ambient,Xe.lightProbe.value=q.state.probe,Xe.directionalLights.value=q.state.directional,Xe.directionalLightShadows.value=q.state.directionalShadow,Xe.spotLights.value=q.state.spot,Xe.spotLightShadows.value=q.state.spotShadow,Xe.rectAreaLights.value=q.state.rectArea,Xe.ltc_1.value=q.state.rectAreaLTC1,Xe.ltc_2.value=q.state.rectAreaLTC2,Xe.pointLights.value=q.state.point,Xe.pointLightShadows.value=q.state.pointShadow,Xe.hemisphereLights.value=q.state.hemi,Xe.directionalShadowMap.value=q.state.directionalShadowMap,Xe.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Xe.spotShadowMap.value=q.state.spotShadowMap,Xe.spotLightMatrix.value=q.state.spotLightMatrix,Xe.spotLightMap.value=q.state.spotLightMap,Xe.pointShadowMap.value=q.state.pointShadowMap,Xe.pointShadowMatrix.value=q.state.pointShadowMatrix),K.currentProgram=Ve,K.uniformsList=null,Ve}function nn(A){if(A.uniformsList===null){const B=A.currentProgram.getUniforms();A.uniformsList=jr.seqWithValue(B.seq,A.uniforms)}return A.uniformsList}function an(A,B){const j=ze.get(A);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function Bt(A,B,j,K,q){B.isScene!==!0&&(B=Se),C.resetTextureUnits();const fe=B.fog,Le=K.isMeshStandardMaterial?B.environment:null,Ue=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Vt,Be=(K.isMeshStandardMaterial?W:T).get(K.envMap||Le),Fe=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ve=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Xe=!!j.morphAttributes.position,bt=!!j.morphAttributes.normal,Wt=!!j.morphAttributes.color;let Pt=hi;K.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Pt=y.toneMapping);const sn=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,_t=sn!==void 0?sn.length:0,Ke=ze.get(K),Bi=m.state.lights;if(G===!0&&(le===!0||A!==b)){const qt=A===b&&K.id===F;qe.setState(K,A,qt)}let St=!1;K.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==Bi.state.version||Ke.outputColorSpace!==Ue||q.isBatchedMesh&&Ke.batching===!1||!q.isBatchedMesh&&Ke.batching===!0||q.isInstancedMesh&&Ke.instancing===!1||!q.isInstancedMesh&&Ke.instancing===!0||q.isSkinnedMesh&&Ke.skinning===!1||!q.isSkinnedMesh&&Ke.skinning===!0||q.isInstancedMesh&&Ke.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Ke.instancingColor===!1&&q.instanceColor!==null||Ke.envMap!==Be||K.fog===!0&&Ke.fog!==fe||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==qe.numPlanes||Ke.numIntersection!==qe.numIntersection)||Ke.vertexAlphas!==Fe||Ke.vertexTangents!==Ve||Ke.morphTargets!==Xe||Ke.morphNormals!==bt||Ke.morphColors!==Wt||Ke.toneMapping!==Pt||Ie.isWebGL2===!0&&Ke.morphTargetsCount!==_t)&&(St=!0):(St=!0,Ke.__version=K.version);let Pn=Ke.currentProgram;St===!0&&(Pn=ht(K,B,q));let ue=!1,Ne=!1,Ut=!1;const vt=Pn.getUniforms(),dn=Ke.uniforms;if(Te.useProgram(Pn.program)&&(ue=!0,Ne=!0,Ut=!0),K.id!==F&&(F=K.id,Ne=!0),ue||b!==A){vt.setValue(V,"projectionMatrix",A.projectionMatrix),vt.setValue(V,"viewMatrix",A.matrixWorldInverse);const qt=vt.map.cameraPosition;qt!==void 0&&qt.setValue(V,He.setFromMatrixPosition(A.matrixWorld)),Ie.logarithmicDepthBuffer&&vt.setValue(V,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&vt.setValue(V,"isOrthographic",A.isOrthographicCamera===!0),b!==A&&(b=A,Ne=!0,Ut=!0)}if(q.isSkinnedMesh){vt.setOptional(V,q,"bindMatrix"),vt.setOptional(V,q,"bindMatrixInverse");const qt=q.skeleton;qt&&(Ie.floatVertexTextures?(qt.boneTexture===null&&qt.computeBoneTexture(),vt.setValue(V,"boneTexture",qt.boneTexture,C)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}q.isBatchedMesh&&(vt.setOptional(V,q,"batchingTexture"),vt.setValue(V,"batchingTexture",q._matricesTexture,C));const fn=j.morphAttributes;if((fn.position!==void 0||fn.normal!==void 0||fn.color!==void 0&&Ie.isWebGL2===!0)&&$e.update(q,j,Pn),(Ne||Ke.receiveShadow!==q.receiveShadow)&&(Ke.receiveShadow=q.receiveShadow,vt.setValue(V,"receiveShadow",q.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(dn.envMap.value=Be,dn.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),Ne&&(vt.setValue(V,"toneMappingExposure",y.toneMappingExposure),Ke.needsLights&&Sn(dn,Ut),fe&&K.fog===!0&&J.refreshFogUniforms(dn,fe),J.refreshMaterialUniforms(dn,K,ee,z,ge),jr.upload(V,nn(Ke),dn,C)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(jr.upload(V,nn(Ke),dn,C),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&vt.setValue(V,"center",q.center),vt.setValue(V,"modelViewMatrix",q.modelViewMatrix),vt.setValue(V,"normalMatrix",q.normalMatrix),vt.setValue(V,"modelMatrix",q.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const qt=K.uniformsGroups;for(let zi=0,Tu=qt.length;zi<Tu;zi++)if(Ie.isWebGL2){const il=qt[zi];ot.update(il,Pn),ot.bind(il,Pn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Pn}function Sn(A,B){A.ambientLightColor.needsUpdate=B,A.lightProbe.needsUpdate=B,A.directionalLights.needsUpdate=B,A.directionalLightShadows.needsUpdate=B,A.pointLights.needsUpdate=B,A.pointLightShadows.needsUpdate=B,A.spotLights.needsUpdate=B,A.spotLightShadows.needsUpdate=B,A.rectAreaLights.needsUpdate=B,A.hemisphereLights.needsUpdate=B}function Ls(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(A,B,j){ze.get(A.texture).__webglTexture=B,ze.get(A.depthTexture).__webglTexture=j;const K=ze.get(A);K.__hasExternalTextures=!0,K.__hasExternalTextures&&(K.__autoAllocateDepthBuffer=j===void 0,K.__autoAllocateDepthBuffer||Oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,B){const j=ze.get(A);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(A,B=0,j=0){P=A,I=B,w=j;let K=!0,q=null,fe=!1,Le=!1;if(A){const Be=ze.get(A);Be.__useDefaultFramebuffer!==void 0?(Te.bindFramebuffer(V.FRAMEBUFFER,null),K=!1):Be.__webglFramebuffer===void 0?C.setupRenderTarget(A):Be.__hasExternalTextures&&C.rebindTextures(A,ze.get(A.texture).__webglTexture,ze.get(A.depthTexture).__webglTexture);const Fe=A.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(Le=!0);const Ve=ze.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ve[B])?q=Ve[B][j]:q=Ve[B],fe=!0):Ie.isWebGL2&&A.samples>0&&C.useMultisampledRTT(A)===!1?q=ze.get(A).__webglMultisampledFramebuffer:Array.isArray(Ve)?q=Ve[j]:q=Ve,R.copy(A.viewport),k.copy(A.scissor),Y=A.scissorTest}else R.copy(te).multiplyScalar(ee).floor(),k.copy(Q).multiplyScalar(ee).floor(),Y=ye;if(Te.bindFramebuffer(V.FRAMEBUFFER,q)&&Ie.drawBuffers&&K&&Te.drawBuffers(A,q),Te.viewport(R),Te.scissor(k),Te.setScissorTest(Y),fe){const Be=ze.get(A.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+B,Be.__webglTexture,j)}else if(Le){const Be=ze.get(A.texture),Fe=B||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Be.__webglTexture,j||0,Fe)}F=-1},this.readRenderTargetPixels=function(A,B,j,K,q,fe,Le){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=ze.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(Ue=Ue[Le]),Ue){Te.bindFramebuffer(V.FRAMEBUFFER,Ue);try{const Be=A.texture,Fe=Be.format,Ve=Be.type;if(Fe!==yn&&xe.convert(Fe)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Xe=Ve===nr&&(Oe.has("EXT_color_buffer_half_float")||Ie.isWebGL2&&Oe.has("EXT_color_buffer_float"));if(Ve!==ui&&xe.convert(Ve)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===jn&&(Ie.isWebGL2||Oe.has("OES_texture_float")||Oe.has("WEBGL_color_buffer_float")))&&!Xe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=A.width-K&&j>=0&&j<=A.height-q&&V.readPixels(B,j,K,q,xe.convert(Fe),xe.convert(Ve),fe)}finally{const Be=P!==null?ze.get(P).__webglFramebuffer:null;Te.bindFramebuffer(V.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(A,B,j=0){const K=Math.pow(2,-j),q=Math.floor(B.image.width*K),fe=Math.floor(B.image.height*K);C.setTexture2D(B,0),V.copyTexSubImage2D(V.TEXTURE_2D,j,0,0,A.x,A.y,q,fe),Te.unbindTexture()},this.copyTextureToTexture=function(A,B,j,K=0){const q=B.image.width,fe=B.image.height,Le=xe.convert(j.format),Ue=xe.convert(j.type);C.setTexture2D(j,0),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,j.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,j.unpackAlignment),B.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,K,A.x,A.y,q,fe,Le,Ue,B.image.data):B.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,K,A.x,A.y,B.mipmaps[0].width,B.mipmaps[0].height,Le,B.mipmaps[0].data):V.texSubImage2D(V.TEXTURE_2D,K,A.x,A.y,Le,Ue,B.image),K===0&&j.generateMipmaps&&V.generateMipmap(V.TEXTURE_2D),Te.unbindTexture()},this.copyTextureToTexture3D=function(A,B,j,K,q=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fe=A.max.x-A.min.x+1,Le=A.max.y-A.min.y+1,Ue=A.max.z-A.min.z+1,Be=xe.convert(K.format),Fe=xe.convert(K.type);let Ve;if(K.isData3DTexture)C.setTexture3D(K,0),Ve=V.TEXTURE_3D;else if(K.isDataArrayTexture||K.isCompressedArrayTexture)C.setTexture2DArray(K,0),Ve=V.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,K.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,K.unpackAlignment);const Xe=V.getParameter(V.UNPACK_ROW_LENGTH),bt=V.getParameter(V.UNPACK_IMAGE_HEIGHT),Wt=V.getParameter(V.UNPACK_SKIP_PIXELS),Pt=V.getParameter(V.UNPACK_SKIP_ROWS),sn=V.getParameter(V.UNPACK_SKIP_IMAGES),_t=j.isCompressedTexture?j.mipmaps[q]:j.image;V.pixelStorei(V.UNPACK_ROW_LENGTH,_t.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,_t.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,A.min.x),V.pixelStorei(V.UNPACK_SKIP_ROWS,A.min.y),V.pixelStorei(V.UNPACK_SKIP_IMAGES,A.min.z),j.isDataTexture||j.isData3DTexture?V.texSubImage3D(Ve,q,B.x,B.y,B.z,fe,Le,Ue,Be,Fe,_t.data):j.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),V.compressedTexSubImage3D(Ve,q,B.x,B.y,B.z,fe,Le,Ue,Be,_t.data)):V.texSubImage3D(Ve,q,B.x,B.y,B.z,fe,Le,Ue,Be,Fe,_t),V.pixelStorei(V.UNPACK_ROW_LENGTH,Xe),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,bt),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Wt),V.pixelStorei(V.UNPACK_SKIP_ROWS,Pt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,sn),q===0&&K.generateMipmaps&&V.generateMipmap(Ve),Te.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),Te.unbindTexture()},this.resetState=function(){I=0,w=0,P=null,Te.reset(),Ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===za?"display-p3":"srgb",t.unpackColorSpace=at.workingColorSpace===lo?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===wt?Di:Fh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Di?wt:Vt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class pv extends Xa{}pv.prototype.isWebGL1Renderer=!0;class qa{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ae(e),this.density=t}clone(){return new qa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class iu extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class su{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ea,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Rn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Jt=new E;class rr{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Dn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array),s=ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Xt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new rr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ca extends bn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let is;const Os=new E,ss=new E,rs=new E,os=new Ee,Fs=new Ee,ru=new et,Ur=new E,ks=new E,Or=new E,Nc=new Ee,Jo=new Ee,Uc=new Ee;class Oc extends Et{constructor(e=new Ca){if(super(),this.isSprite=!0,this.type="Sprite",is===void 0){is=new Rt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new su(t,5);is.setIndex([0,1,2,0,2,3]),is.setAttribute("position",new rr(i,3,0,!1)),is.setAttribute("uv",new rr(i,2,3,!1))}this.geometry=is,this.material=e,this.center=new Ee(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ss.setFromMatrixScale(this.matrixWorld),ru.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),rs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ss.multiplyScalar(-rs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Fr(Ur.set(-.5,-.5,0),rs,o,ss,s,r),Fr(ks.set(.5,-.5,0),rs,o,ss,s,r),Fr(Or.set(.5,.5,0),rs,o,ss,s,r),Nc.set(0,0),Jo.set(1,0),Uc.set(1,1);let a=e.ray.intersectTriangle(Ur,ks,Or,!1,Os);if(a===null&&(Fr(ks.set(-.5,.5,0),rs,o,ss,s,r),Jo.set(0,1),a=e.ray.intersectTriangle(Ur,Or,ks,!1,Os),a===null))return;const l=e.ray.origin.distanceTo(Os);l<e.near||l>e.far||t.push({distance:l,point:Os.clone(),uv:_n.getInterpolation(Os,Ur,ks,Or,Nc,Jo,Uc,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Fr(n,e,t,i,s,r){os.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Fs.x=r*os.x-s*os.y,Fs.y=s*os.x+r*os.y):Fs.copy(os),n.copy(e),n.x+=Fs.x,n.y+=Fs.y,n.applyMatrix4(ru)}const Fc=new E,kc=new mt,Bc=new mt,mv=new E,zc=new et,kr=new E,Zo=new On,Hc=new et,Qo=new co;class gv extends je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vl,this.bindMatrix=new et,this.bindMatrixInverse=new et,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Cn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,kr),this.boundingBox.expandByPoint(kr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new On),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,kr),this.boundingSphere.expandByPoint(kr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zo.copy(this.boundingSphere),Zo.applyMatrix4(s),e.ray.intersectsSphere(Zo)!==!1&&(Hc.copy(s).invert(),Qo.copy(e.ray).applyMatrix4(Hc),!(this.boundingBox!==null&&Qo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Qo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new mt,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===vl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Rf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;kc.fromBufferAttribute(s.attributes.skinIndex,e),Bc.fromBufferAttribute(s.attributes.skinWeight,e),Fc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Bc.getComponent(r);if(o!==0){const a=kc.getComponent(r);zc.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),t.addScaledVector(mv.copy(Fc).applyMatrix4(zc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class ou extends Et{constructor(){super(),this.isBone=!0,this.type="Bone"}}class au extends Gt{constructor(e=null,t=1,i=1,s,r,o,a,l,c=Nt,h=Nt,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Gc=new et,_v=new et;class ja{constructor(e=[],t=[]){this.uuid=Rn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new et)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new et;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:_v;Gc.multiplyMatrices(a,t[r]),Gc.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new ja(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new au(t,e,e,yn,jn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new ou),this.bones.push(o),this.boneInverses.push(new et().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=i[s];e.boneInverses.push(a.toArray())}return e}}class Pa extends Xt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const as=new et,Vc=new et,Br=[],Wc=new Cn,vv=new et,Bs=new je,zs=new On;class yv extends je{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pa(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,vv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,as),Wc.copy(e.boundingBox).applyMatrix4(as),this.boundingBox.union(Wc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new On),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,as),zs.copy(e.boundingSphere).applyMatrix4(as),this.boundingSphere.union(zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(i),e.ray.intersectsSphere(zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,as),Vc.multiplyMatrices(i,as),Bs.matrixWorld=Vc,Bs.raycast(e,Br);for(let o=0,a=Br.length;o<a;o++){const l=Br[o];l.instanceId=r,l.object=this,t.push(l)}Br.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Pa(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class qs extends bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xc=new E,qc=new E,jc=new et,ea=new co,zr=new On;class ps extends Et{constructor(e=new Rt,t=new qs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Xc.fromBufferAttribute(t,s-1),qc.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Xc.distanceTo(qc);e.setAttribute("lineDistance",new gt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zr.copy(i.boundingSphere),zr.applyMatrix4(s),zr.radius+=r,e.ray.intersectsSphere(zr)===!1)return;jc.copy(s).invert(),ea.copy(e.ray).applyMatrix4(jc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new E,h=new E,u=new E,d=new E,f=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const p=Math.max(0,o.start),M=Math.min(g.count,o.start+o.count);for(let y=p,x=M-1;y<x;y+=f){const I=g.getX(y),w=g.getX(y+1);if(c.fromBufferAttribute(m,I),h.fromBufferAttribute(m,w),ea.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const F=e.ray.origin.distanceTo(d);F<e.near||F>e.far||t.push({distance:F,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),M=Math.min(m.count,o.start+o.count);for(let y=p,x=M-1;y<x;y+=f){if(c.fromBufferAttribute(m,y),h.fromBufferAttribute(m,y+1),ea.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(d);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const Yc=new E,Kc=new E;class Mv extends ps{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Yc.fromBufferAttribute(t,s),Kc.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Yc.distanceTo(Kc);e.setAttribute("lineDistance",new gt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class bv extends ps{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ya extends bn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const $c=new et,La=new co,Hr=new On,Gr=new E;class lu extends Et{constructor(e=new Rt,t=new Ya){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Hr.copy(i.boundingSphere),Hr.applyMatrix4(s),Hr.radius+=r,e.ray.intersectsSphere(Hr)===!1)return;$c.copy(s).invert(),La.copy(e.ray).applyMatrix4($c);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,v=f;g<v;g++){const m=c.getX(g);Gr.fromBufferAttribute(u,m),Jc(Gr,m,l,s,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,v=f;g<v;g++)Gr.fromBufferAttribute(u,g),Jc(Gr,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Jc(n,e,t,i,s,r,o){const a=La.distanceSqToPoint(n);if(a<t){const l=new E;La.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class or extends Gt{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Jn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const h=i[s],d=i[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new Ee:new E);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new E,s=[],r=[],o=[],a=new E,l=new et;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new E)}r[0]=new E,o[0]=new E;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ht(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Ht(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class cu extends Jn{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const i=t||new Ee,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Sv extends cu{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ka(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const Vr=new E,ta=new Ka,na=new Ka,ia=new Ka;class Tv extends Jn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new E){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Vr.subVectors(s[0],s[1]).add(s[0]),c=Vr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Vr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Vr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),ta.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),na.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),ia.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(ta.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),na.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),ia.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(ta.calc(l),na.calc(l),ia.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new E().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Zc(n,e,t,i,s){const r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function xv(n,e){const t=1-n;return t*t*e}function Ev(n,e){return 2*(1-n)*n*e}function Av(n,e){return n*n*e}function js(n,e,t,i){return xv(n,e)+Ev(n,t)+Av(n,i)}function wv(n,e){const t=1-n;return t*t*t*e}function Rv(n,e){const t=1-n;return 3*t*t*n*e}function Cv(n,e){return 3*(1-n)*n*n*e}function Pv(n,e){return n*n*n*e}function Ys(n,e,t,i,s){return wv(n,e)+Rv(n,t)+Cv(n,i)+Pv(n,s)}class Lv extends Jn{constructor(e=new Ee,t=new Ee,i=new Ee,s=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new Ee){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ys(e,s.x,r.x,o.x,a.x),Ys(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Iv extends Jn{constructor(e=new E,t=new E,i=new E,s=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new E){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ys(e,s.x,r.x,o.x,a.x),Ys(e,s.y,r.y,o.y,a.y),Ys(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Dv extends Jn{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nv extends Jn{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uv extends Jn{constructor(e=new Ee,t=new Ee,i=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ee){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(js(e,s.x,r.x,o.x),js(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ks extends Jn{constructor(e=new E,t=new E,i=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new E){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(js(e,s.x,r.x,o.x),js(e,s.y,r.y,o.y),js(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ov extends Jn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){const i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(Zc(a,l.x,c.x,h.x,u.x),Zc(a,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new Ee().fromArray(s))}return this}}var Fv=Object.freeze({__proto__:null,ArcCurve:Sv,CatmullRomCurve3:Tv,CubicBezierCurve:Lv,CubicBezierCurve3:Iv,EllipseCurve:cu,LineCurve:Dv,LineCurve3:Nv,QuadraticBezierCurve:Uv,QuadraticBezierCurve3:Ks,SplineCurve:Ov});class Fi extends Rt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=i/2;let p=0;M(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new gt(u,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(f,2));function M(){const x=new E,I=new E;let w=0;const P=(t-e)/i;for(let F=0;F<=r;F++){const b=[],R=F/r,k=R*(t-e)+e;for(let Y=0;Y<=s;Y++){const he=Y/s,N=he*l+a,H=Math.sin(N),z=Math.cos(N);I.x=k*H,I.y=-R*i+m,I.z=k*z,u.push(I.x,I.y,I.z),x.set(H,P,z).normalize(),d.push(x.x,x.y,x.z),f.push(he,1-R),b.push(g++)}v.push(b)}for(let F=0;F<s;F++)for(let b=0;b<r;b++){const R=v[b][F],k=v[b+1][F],Y=v[b+1][F+1],he=v[b][F+1];h.push(R,k,he),h.push(k,Y,he),w+=6}c.addGroup(p,w,0),p+=w}function y(x){const I=g,w=new Ee,P=new E;let F=0;const b=x===!0?e:t,R=x===!0?1:-1;for(let Y=1;Y<=s;Y++)u.push(0,m*R,0),d.push(0,R,0),f.push(.5,.5),g++;const k=g;for(let Y=0;Y<=s;Y++){const N=Y/s*l+a,H=Math.cos(N),z=Math.sin(N);P.x=b*z,P.y=m*R,P.z=b*H,u.push(P.x,P.y,P.z),d.push(0,R,0),w.x=H*.5+.5,w.y=z*.5*R+.5,f.push(w.x,w.y),g++}for(let Y=0;Y<s;Y++){const he=I+Y,N=k+Y;x===!0?h.push(N,N+1,he):h.push(N+1,N,he),F+=3}c.addGroup(p,F,x===!0?1:2),p+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $a extends Fi{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new $a(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ja extends Rt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),c(i),h(),this.setAttribute("position",new gt(r,3)),this.setAttribute("normal",new gt(r.slice(),3)),this.setAttribute("uv",new gt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const y=new E,x=new E,I=new E;for(let w=0;w<t.length;w+=3)f(t[w+0],y),f(t[w+1],x),f(t[w+2],I),l(y,x,I,M)}function l(M,y,x,I){const w=I+1,P=[];for(let F=0;F<=w;F++){P[F]=[];const b=M.clone().lerp(x,F/w),R=y.clone().lerp(x,F/w),k=w-F;for(let Y=0;Y<=k;Y++)Y===0&&F===w?P[F][Y]=b:P[F][Y]=b.clone().lerp(R,Y/k)}for(let F=0;F<w;F++)for(let b=0;b<2*(w-F)-1;b++){const R=Math.floor(b/2);b%2===0?(d(P[F][R+1]),d(P[F+1][R]),d(P[F][R])):(d(P[F][R+1]),d(P[F+1][R+1]),d(P[F+1][R]))}}function c(M){const y=new E;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(M),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function h(){const M=new E;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const x=m(M)/2/Math.PI+.5,I=p(M)/Math.PI+.5;o.push(x,1-I)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){const y=o[M+0],x=o[M+2],I=o[M+4],w=Math.max(y,x,I),P=Math.min(y,x,I);w>.9&&P<.1&&(y<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),I<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,y){const x=M*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function g(){const M=new E,y=new E,x=new E,I=new E,w=new Ee,P=new Ee,F=new Ee;for(let b=0,R=0;b<r.length;b+=9,R+=6){M.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),w.set(o[R+0],o[R+1]),P.set(o[R+2],o[R+3]),F.set(o[R+4],o[R+5]),I.copy(M).add(y).add(x).divideScalar(3);const k=m(I);v(w,R+0,M,k),v(P,R+2,y,k),v(F,R+4,x,k)}}function v(M,y,x,I){I<0&&M.x===1&&(o[y]=M.x-1),x.x===0&&x.z===0&&(o[y]=I/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ja(e.vertices,e.indices,e.radius,e.details)}}class Za extends Ja{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Za(e.radius,e.detail)}}class $s extends Rt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/s,f=new E,g=new Ee;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){const p=r+m/i*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<s;v++){const m=v*(i+1);for(let p=0;p<i;p++){const M=p+m,y=M,x=M+i+1,I=M+i+2,w=M+1;a.push(y,x,w),a.push(x,I,w)}}this.setIndex(a),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class wn extends Rt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new E,d=new E,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const M=[],y=p/i;let x=0;p===0&&o===0?x=.5/t:p===i&&l===Math.PI&&(x=-.5/t);for(let I=0;I<=t;I++){const w=I/t;u.x=-e*Math.cos(s+w*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(s+w*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(w+x,1-y),M.push(c++)}h.push(M)}for(let p=0;p<i;p++)for(let M=0;M<t;M++){const y=h[p][M+1],x=h[p][M],I=h[p+1][M],w=h[p+1][M+1];(p!==0||o>0)&&f.push(y,x,w),(p!==i-1||l<Math.PI)&&f.push(x,I,w)}this.setIndex(f),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(v,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class po extends Rt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new E,u=new E,d=new E;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;o.push(v,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new po(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Js extends Rt{constructor(e=new Ks(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new E,l=new E,c=new Ee;let h=new E;const u=[],d=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new gt(u,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(f,2));function v(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),M(),p()}function m(y){h=e.getPointAt(y/t,h);const x=o.normals[y],I=o.binormals[y];for(let w=0;w<=s;w++){const P=w/s*Math.PI*2,F=Math.sin(P),b=-Math.cos(P);l.x=b*x.x+F*I.x,l.y=b*x.y+F*I.y,l.z=b*x.z+F*I.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+i*l.x,a.y=h.y+i*l.y,a.z=h.z+i*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=t;y++)for(let x=1;x<=s;x++){const I=(s+1)*(y-1)+(x-1),w=(s+1)*y+(x-1),P=(s+1)*y+x,F=(s+1)*(y-1)+x;g.push(I,w,F),g.push(w,P,F)}}function M(){for(let y=0;y<=t;y++)for(let x=0;x<=s;x++)c.x=y/t,c.y=x/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Js(new Fv[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class di extends bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zn extends di{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ae(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class hu extends bn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ae(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}function Wr(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function kv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Bv(n){function e(s,r){return n[s]-n[r]}const t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function Qc(n,e,t){const i=n.length,s=new n.constructor(i);for(let r=0,o=0;o!==i;++r){const a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=n[a+l]}return s}function uu(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=n[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do o=r[i],o!==void 0&&(e.push(r.time),t.push(o)),r=n[s++];while(r!==void 0)}class hr{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=t[++i],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}o=i,i=0;break t}break n}for(;i<o;){const a=i+o>>>1;e<t[a]?o=a:i=a+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class zv extends hr{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wl,endingEnd:Wl}}intervalChanged_(e,t,i){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Xl:r=e,a=2*t-i;break;case ql:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Xl:o=e,l=2*i-t;break;case ql:o=1,l=i+s[1]-s[0];break;default:o=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(i-t)/(s-t),v=g*g,m=v*g,p=-d*m+2*d*v-d*g,M=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*v+.5*g,x=f*m-f*v;for(let I=0;I!==a;++I)r[I]=p*o[h+I]+M*o[c+I]+y*o[l+I]+x*o[u+I];return r}}class Hv extends hr{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(i-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class Gv extends hr{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Fn{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Wr(t,this.TimeBufferType),this.values=Wr(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Wr(e.times,Array),values:Wr(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Gv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Hv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new zv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ir:t=this.InterpolantFactoryMethodDiscrete;break;case ys:t=this.InterpolantFactoryMethodLinear;break;case wo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ir;case this.InterpolantFactoryMethodLinear:return ys;case this.InterpolantFactoryMethodSmooth:return wo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){const i=this.times,s=i.length;let r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&kv(s))for(let a=0,l=s.length;a!==l;++a){const c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===wo,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{const u=a*i,d=u-i,f=u+i;for(let g=0;g!==i;++g){const v=t[u+g];if(v!==t[d+g]||v!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*i,d=o*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=ys;class Rs extends Fn{}Rs.prototype.ValueTypeName="bool";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=ir;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;class du extends Fn{}du.prototype.ValueTypeName="color";class Ss extends Fn{}Ss.prototype.ValueTypeName="number";class Vv extends hr{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(s-t);let c=e*a;for(let h=c+a;c!==h;c+=4)gi.slerpFlat(r,0,o,c-a,o,c,l);return r}}class ki extends Fn{InterpolantFactoryMethodLinear(e){return new Vv(this.times,this.values,this.getValueSize(),e)}}ki.prototype.ValueTypeName="quaternion";ki.prototype.DefaultInterpolation=ys;ki.prototype.InterpolantFactoryMethodSmooth=void 0;class Cs extends Fn{}Cs.prototype.ValueTypeName="string";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=ir;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ts extends Fn{}Ts.prototype.ValueTypeName="vector";class Wv{constructor(e,t=-1,i,s=Of){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=Rn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,s=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)t.push(qv(i[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=i.length;r!==o;++r)t.push(Fn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=Bv(l);l=Qc(l,1,h),c=Qc(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Ss(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/i))}return new this(e,-1,o)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,i));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(u,d,f,g,v){if(f.length!==0){const m=[],p=[];uu(f,m,p,g),m.length!==0&&v.push(new u(d,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let v=0;v<d[g].morphTargets.length;v++)f[d[g].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){const y=d[g];m.push(y.time),p.push(y.morphTarget===v?1:0)}s.push(new Ss(".morphTargetInfluence["+v+"]",m,p))}l=f.length*o}else{const f=".bones["+t[u].name+"]";i(Ts,f+".position",d,"pos",s),i(ki,f+".quaternion",d,"rot",s),i(Ts,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,s=e.length;i!==s;++i){const r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Xv(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ss;case"vector":case"vector2":case"vector3":case"vector4":return Ts;case"color":return du;case"quaternion":return ki;case"bool":case"boolean":return Rs;case"string":return Cs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function qv(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Xv(n.type);if(n.times===void 0){const t=[],i=[];uu(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const li={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class jv{constructor(e,t,i){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Yv=new jv;class Ps{constructor(e){this.manager=e!==void 0?e:Yv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ps.DEFAULT_MATERIAL_NAME="__DEFAULT";const Vn={};class Kv extends Error{constructor(e,t){super(e),this.response=t}}class fu extends Ps{constructor(e){super(e)}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=li.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Vn[e]!==void 0){Vn[e].push({onLoad:t,onProgress:i,onError:s});return}Vn[e]=[],Vn[e].push({onLoad:t,onProgress:i,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Vn[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=d?parseInt(d):0,g=f!==0;let v=0;const m=new ReadableStream({start(p){M();function M(){u.read().then(({done:y,value:x})=>{if(y)p.close();else{v+=x.byteLength;const I=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let w=0,P=h.length;w<P;w++){const F=h[w];F.onProgress&&F.onProgress(I)}p.enqueue(x),M()}})}}});return new Response(m)}else throw new Kv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{li.add(e,c);const h=Vn[e];delete Vn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Vn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Vn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class $v extends Ps{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=li.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=sr("img");function l(){h(),li.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Jv extends Ps{constructor(e){super(e)}load(e,t,i,s){const r=new Gt,o=new $v(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class mo extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const sa=new et,eh=new E,th=new E;class Qa{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ga,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;eh.setFromMatrixPosition(e.matrixWorld),t.position.copy(eh),th.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(th),t.updateMatrixWorld(),sa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Zv extends Qa{constructor(){super(new Kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=Ms*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class pu extends mo{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Zv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const nh=new et,Hs=new E,ra=new E;class Qv extends Qa{constructor(){super(new Kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new mt(2,1,1,1),new mt(0,1,1,1),new mt(3,1,1,1),new mt(1,1,1,1),new mt(3,0,1,1),new mt(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Hs.setFromMatrixPosition(e.matrixWorld),i.position.copy(Hs),ra.copy(i.position),ra.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ra),i.updateMatrixWorld(),s.makeTranslation(-Hs.x,-Hs.y,-Hs.z),nh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nh)}}class Ei extends mo{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Qv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ey extends Qa{constructor(){super(new Va(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ar extends mo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new ey}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mu extends mo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Zs{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,s=e.length;i<s;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ty extends Ps{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=li.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return li.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),li.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});li.add(e,l),r.manager.itemStart(e)}}const el="\\[\\]\\.:\\/",ny=new RegExp("["+el+"]","g"),tl="[^"+el+"]",iy="[^"+el.replace("\\.","")+"]",sy=/((?:WC+[\/:])*)/.source.replace("WC",tl),ry=/(WCOD+)?/.source.replace("WCOD",iy),oy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",tl),ay=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",tl),ly=new RegExp("^"+sy+ry+oy+ay+"$"),cy=["material","materials","bones","map"];class hy{constructor(e,t,i){const s=i||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class ut{constructor(e,t,i){this.path=t,this.parsedPath=i||ut.parseTrackName(t),this.node=ut.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new ut.Composite(e,t,i):new ut(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ny,"")}static parseTrackName(e){const t=ly.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);cy.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=i(a.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ut.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[s];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ut.Composite=hy;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ua}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ua);function ih(n,e){if(e===Ff)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===xa||e===Oh){let t=n.getIndex();if(t===null){const o=[],a=n.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);n.setIndex(o),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=t.count-2,s=[];if(e===xa)for(let o=1;o<=i;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}class uy extends Ps{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new gy(t)}),this.register(function(t){return new Ey(t)}),this.register(function(t){return new Ay(t)}),this.register(function(t){return new wy(t)}),this.register(function(t){return new vy(t)}),this.register(function(t){return new yy(t)}),this.register(function(t){return new My(t)}),this.register(function(t){return new by(t)}),this.register(function(t){return new my(t)}),this.register(function(t){return new Sy(t)}),this.register(function(t){return new _y(t)}),this.register(function(t){return new xy(t)}),this.register(function(t){return new Ty(t)}),this.register(function(t){return new fy(t)}),this.register(function(t){return new Ry(t)}),this.register(function(t){return new Cy(t)})}load(e,t,i,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Zs.extractUrlBase(e);o=Zs.resolveURL(c,this.path)}else o=Zs.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new fu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},i,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===gu){try{o[st.KHR_BINARY_GLTF]=new Py(e)}catch(u){s&&s(u);return}r=JSON.parse(o[st.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Vy(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case st.KHR_MATERIALS_UNLIT:o[u]=new py;break;case st.KHR_DRACO_MESH_COMPRESSION:o[u]=new Ly(r,this.dracoLoader);break;case st.KHR_TEXTURE_TRANSFORM:o[u]=new Iy;break;case st.KHR_MESH_QUANTIZATION:o[u]=new Dy;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(i,s)}parseAsync(e,t){const i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}}function dy(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}const st={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class fy{constructor(e){this.parser=e,this.name=st.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let s=t.cache.get(i);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ae(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Vt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ar(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ei(h),c.distance=u;break;case"spot":c=new pu(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,oi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,r=i.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return i._getNodeRef(t.cache,a,l)})}}class py{constructor(){this.name=st.KHR_MATERIALS_UNLIT}getMaterialType(){return At}extendParams(e,t,i){const s=[];e.color=new Ae(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Vt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,wt))}return Promise.all(s)}}class my{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class gy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Zn}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ee(a,a)}return Promise.all(r)}}class _y{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Zn}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class vy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_SHEEN}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Zn}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ae(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Vt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",o.sheenColorTexture,wt)),o.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class yy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Zn}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class My{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_VOLUME}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Zn}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ae().setRGB(a[0],a[1],a[2],Vt),Promise.all(r)}}class by{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_IOR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Zn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Sy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_SPECULAR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Zn}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ae().setRGB(a[0],a[1],a[2],Vt),o.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",o.specularColorTexture,wt)),Promise.all(r)}}class Ty{constructor(e){this.parser=e,this.name=st.EXT_MATERIALS_BUMP}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Zn}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(i.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class xy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Zn}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(i.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class Ey{constructor(e){this.parser=e,this.name=st.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class Ay{constructor(e){this.parser=e,this.name=st.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=i.textureLoader;if(a.uri){const c=i.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,o.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class wy{constructor(e){this.parser=e,this.name=st.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=i.textureLoader;if(a.uri){const c=i.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,o.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ry{constructor(e){this.name=st.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class Cy{constructor(e){this.name=st.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=t.meshes[i.mesh];for(const c of s.primitives)if(c.mode!==gn.TRIANGLES&&c.mode!==gn.TRIANGLE_STRIP&&c.mode!==gn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=i.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const v=new et,m=new E,p=new gi,M=new E(1,1,1),y=new yv(g.geometry,g.material,d);for(let x=0;x<d;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&M.fromBufferAttribute(l.SCALE,x),y.setMatrixAt(x,v.compose(m,p,M));for(const x in l)if(x==="_COLOR_0"){const I=l[x];y.instanceColor=new Pa(I.array,I.itemSize,I.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);Et.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const gu="glTF",Gs=12,sh={JSON:1313821514,BIN:5130562};class Py{constructor(e){this.name=st.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Gs),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==gu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Gs,r=new DataView(e,Gs);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===sh.JSON){const c=new Uint8Array(e,Gs+o,a);this.content=i.decode(c)}else if(l===sh.BIN){const c=Gs+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ly{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=st.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=Ia[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Ia[h]||h.toLowerCase();if(o[h]!==void 0){const d=i.accessors[e.attributes[h]],f=ms[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const g in f.attributes){const v=f.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}u(f)},a,c,Vt,d)})})}}class Iy{constructor(){this.name=st.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Dy{constructor(){this.name=st.KHR_MESH_QUANTIZATION}}class _u extends hr{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=i[r+o];return t}interpolate_(e,t,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=s-t,u=(i-t)/h,d=u*u,f=d*u,g=e*c,v=g-c,m=-2*f+3*d,p=f-d,M=1-m,y=p-d+u;for(let x=0;x!==a;x++){const I=o[v+x+a],w=o[v+x+l]*h,P=o[g+x+a],F=o[g+x]*h;r[x]=M*I+y*w+m*P+p*F}return r}}const Ny=new gi;class Uy extends _u{interpolate_(e,t,i,s){const r=super.interpolate_(e,t,i,s);return Ny.fromArray(r).normalize().toArray(r),r}}const gn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ms={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},rh={9728:Nt,9729:rn,9984:Ta,9985:wh,9986:qr,9987:Ni},oh={33071:vn,33648:Zr,10497:mi},oa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ia={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},si={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Oy={CUBICSPLINE:void 0,LINEAR:ys,STEP:ir},aa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Fy(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new di({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Kn})),n.DefaultMaterial}function bi(n,e,t){for(const i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function oi(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ky(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(i){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):n.attributes.position;o.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):n.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):n.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return i&&(n.morphAttributes.position=h),s&&(n.morphAttributes.normal=u),r&&(n.morphAttributes.color=d),n.morphTargetsRelative=!0,n})}function By(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function zy(n){let e;const t=n.extensions&&n.extensions[st.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+la(t.attributes):e=n.indices+":"+la(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+la(n.targets[i]);return e}function la(n){let e="";const t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function Da(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Hy(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Gy=new et;class Vy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new dy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=!1,r=-1;typeof navigator<"u"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,s=navigator.userAgent.indexOf("Firefox")>-1,r=s?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||i||s&&r<98?this.textureLoader=new Jv(this.options.manager):this.textureLoader=new ty(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new fu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:i,userData:{}};return bi(r,a,s),oi(a,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const s=i.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const s=e(t[i]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){const i=e+":"+t;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return i.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[st.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){i.load(Zs.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){const t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=oa[s.type],a=ms[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new Xt(c,o,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=oa[s.type],c=ms[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let v,m;if(f&&f!==u){const p=Math.floor(d/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let y=t.cache.get(M);y||(v=new c(a,p*f,s.count*f/h),y=new su(v,f/h),t.cache.add(M,y)),m=new rr(y,l,d%f/h,g)}else a===null?v=new c(s.count*l):v=new c(a,d,s.count*l),m=new Xt(v,l,g);if(s.sparse!==void 0){const p=oa.SCALAR,M=ms[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,I=new M(o[1],y,s.sparse.count*p),w=new c(o[2],x,s.sparse.count*l);a!==null&&(m=new Xt(m.array.slice(),m.itemSize,m.normalized));for(let P=0,F=I.length;P<F;P++){const b=I[P];if(m.setX(b,w[P*l]),l>=2&&m.setY(b,w[P*l+1]),l>=3&&m.setZ(b,w[P*l+2]),l>=4&&m.setW(b,w[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,i=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=i.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,i){const s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=rh[d.magFilter]||rn,h.minFilter=rh[d.minFilter]||Ni,h.wrapS=oh[d.wrapS]||mi,h.wrapT=oh[d.wrapT]||mi,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=s.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=i.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(v){const m=new Gt(v);m.needsUpdate=!0,d(m)}),t.load(Zs.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),u.userData.mimeType=o.mimeType||Hy(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,s){const r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[st.KHR_TEXTURE_TRANSFORM]){const a=i.extensions!==void 0?i.extensions[st.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[st.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+i.uuid;let l=this.cache.get(a);l||(l=new Ya,bn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(a,l)),i=l}else if(e.isLine){const a="LineBasicMaterial:"+i.uuid;let l=this.cache.get(a);l||(l=new qs,bn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(a,l)),i=l}if(s||r||o){let a="ClonedMaterial:"+i.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=i.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return di}loadMaterial(e){const t=this,i=this.json,s=this.extensions,r=i.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[st.KHR_MATERIALS_UNLIT]){const u=s[st.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new Ae(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Vt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,wt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=en);const h=r.alphaMode||aa.OPAQUE;if(h===aa.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===aa.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==At&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ee(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==At&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==At){const u=r.emissiveFactor;a.emissive=new Ae().setRGB(u[0],u[1],u[2],Vt)}return r.emissiveTexture!==void 0&&o!==At&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,wt)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),oi(u,r),t.associations.set(u,{materials:e}),r.extensions&&bi(s,u,r),u})}createUniqueName(e){const t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,s=this.primitiveCache;function r(a){return i[st.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return ah(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=zy(c),u=s[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[st.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=ah(new Rt,c,t),s[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,i=this.json,s=this.extensions,r=i.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?Fy(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const v=h[f],m=o[f];let p;const M=c[f];if(m.mode===gn.TRIANGLES||m.mode===gn.TRIANGLE_STRIP||m.mode===gn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new gv(v,M):new je(v,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===gn.TRIANGLE_STRIP?p.geometry=ih(p.geometry,Oh):m.mode===gn.TRIANGLE_FAN&&(p.geometry=ih(p.geometry,xa));else if(m.mode===gn.LINES)p=new Mv(v,M);else if(m.mode===gn.LINE_STRIP)p=new ps(v,M);else if(m.mode===gn.LINE_LOOP)p=new bv(v,M);else if(m.mode===gn.POINTS)p=new lu(v,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&By(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),oi(p,r),m.extensions&&bi(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&bi(s,u[0],r),u[0];const d=new Lt;r.extensions&&bi(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Kt(lp.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new Va(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),oi(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),o=s,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new et;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ja(a,l)})}loadAnimation(e){const t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],g=s.samplers[f.sampler],v=f.target,m=v.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(g),h.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],v=u[3],m=u[4],p=[];for(let M=0,y=d.length;M<y;M++){const x=d[M],I=f[M],w=g[M],P=v[M],F=m[M];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const b=i._createAnimationTracks(x,I,w,P,F);if(b)for(let R=0;R<b.length;R++)p.push(b[R])}return new Wv(r,void 0,p)})}createNodeMesh(e){const t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const o=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){const t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,h=a.length;c<h;c++)o.push(i.getDependency("node",a[c]));const l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Gy)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new ou:c.length>1?h=new Lt:c.length===1?h=c[0]:h=new Et,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),oi(h,r),r.extensions&&bi(i,h,r),r.matrix!==void 0){const u=new et;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],s=this,r=new Lt;i.name&&(r.name=s.createUniqueName(i.name)),oi(r,i),i.extensions&&bi(t,r,i);const o=i.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof bn||d instanceof Gt)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){const o=[],a=e.name?e.name:e.uuid,l=[];si[r.path]===si.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(si[r.path]){case si.weights:c=Ss;break;case si.rotation:c=ki;break;case si.position:case si.scale:c=Ts;break;default:switch(i.itemSize){case 1:c=Ss;break;case 2:case 3:default:c=Ts;break}break}const h=s.interpolation!==void 0?Oy[s.interpolation]:ys,u=this._getArrayFromAccessor(i);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+si[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=Da(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const s=this instanceof ki?Uy:_u;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Wy(n,e,t){const i=e.attributes,s=new Cn;if(i.POSITION!==void 0){const a=t.json.accessors[i.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new E(l[0],l[1],l[2]),new E(c[0],c[1],c[2])),a.normalized){const h=Da(ms[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new E,l=new E;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const v=Da(ms[d.componentType]);l.multiplyScalar(v)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}n.boundingBox=s;const o=new On;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=o}function ah(n,e,t){const i=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){n.setAttribute(a,l)})}for(const o in i){const a=Ia[o]||o.toLowerCase();a in n.attributes||s.push(r(i[o],a))}if(e.indices!==void 0&&!n.index){const o=t.getDependency("accessor",e.indices).then(function(a){n.setIndex(a)});s.push(o)}return at.workingColorSpace!==Vt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),oi(n,e),Wy(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?ky(n,e.targets,t):n})}const Xy=["head","body","forelimbs","hindlimbs","tail"],go={head:1,body:1.6,forelimbs:.9,hindlimbs:.9,tail:1.2},vu=new Map;let Xr=null;function _o(n,e,t){return n.traverse(i=>{i instanceof je&&(i.material=new hu({color:new Ae(e),gradientMap:t}),i.castShadow=!0)}),n}function vo(n,e){const i=new Cn().setFromObject(n).getSize(new E),s=Math.max(i.x,i.y,i.z);s>0&&n.scale.setScalar(e/s);const r=new Cn().setFromObject(n);return n.position.y-=r.min.y,n}async function qy(n,e,t){const i=`${e}/${t}`;try{const s=await n.loadAsync(`/models/${e}/${t}.glb`);vu.set(i,s.scene)}catch{}}async function jy(n,e=new uy){if(Xr)return Xr;const t=[];for(const i of n)for(const s of Xy)t.push(qy(e,i,s));return Xr=Promise.all(t).then(()=>{}),Xr}function yo(n,e){return vu.get(`${n}/${e}`)??null}const Yy=jy($n.map(n=>n.id));function Un(n){return on[n]??on.boar}let Qt=null;const lh=new Map;function Ky(n,e,t){const i=document.createElement("canvas");i.width=256,i.height=256;const s=i.getContext("2d");if(!s)return new or(i);switch(n){case"cobra":case"eel":{s.fillStyle=e,s.fillRect(0,0,256,256),s.strokeStyle=t,s.lineWidth=3;const o=32;for(let a=-o;a<256+o;a+=o/2){const l=Math.floor(a/(o/2))%2*(o/2);for(let c=-o;c<256+o;c+=o)s.beginPath(),s.arc(c+l+o/2,a,o/2,0,Math.PI),s.stroke()}break}case"tiger":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle="#121212";for(let o=0;o<8;o++){const a=20+o*32+Math.random()*8;s.beginPath(),s.moveTo(0,a),s.quadraticCurveTo(80,a+15,120,a+5),s.quadraticCurveTo(80,a+25,0,a+30),s.closePath(),s.fill(),s.beginPath(),s.moveTo(256,a+10),s.quadraticCurveTo(176,a+25,136,a+15),s.quadraticCurveTo(176,a+35,256,a+40),s.closePath(),s.fill()}break}case"ant":case"scorpion":{s.fillStyle=e,s.fillRect(0,0,256,256);for(let o=0;o<256;o+=32){const a=s.createLinearGradient(0,o,0,o+32);a.addColorStop(0,t),a.addColorStop(.3,e),a.addColorStop(.7,e),a.addColorStop(1,t),s.fillStyle=a,s.fillRect(0,o,256,28)}break}case"eagle":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t;const o=24;for(let a=0;a<256+o;a+=o){const l=Math.floor(a/o)%2*20;for(let c=-20;c<276;c+=40)s.beginPath(),s.moveTo(c+l,a),s.lineTo(c+l+20,a+15),s.lineTo(c+l+40,a),s.lineTo(c+l+20,a-5),s.closePath(),s.fill()}break}case"boar":case"rhino":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t;for(let o=0;o<250;o++){const a=Math.random()*256,l=Math.random()*256,c=1.5+Math.random()*2.5;s.beginPath(),s.arc(a,l,c,0,Math.PI*2),s.fill()}break}case"wolf":case"bear":case"rabbit":{s.fillStyle=e,s.fillRect(0,0,256,256),s.strokeStyle=t,s.lineWidth=1.5;for(let o=0;o<350;o++){const a=Math.random()*256,l=Math.random()*256,c=4+Math.random()*7,h=Math.PI/4+(Math.random()-.5)*.3;s.beginPath(),s.moveTo(a,l),s.lineTo(a+Math.cos(h)*c,l+Math.sin(h)*c),s.stroke()}break}case"dragon":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t;for(let o=0;o<12;o++){const a=o%2*22;for(let l=0;l<8;l++){const c=l*44+a-22,h=o*24-12;s.beginPath(),s.moveTo(c+22,h),s.lineTo(c+44,h+16),s.lineTo(c+22,h+24),s.lineTo(c,h+16),s.closePath(),s.globalAlpha=.35,s.fill()}}s.globalAlpha=1;break}case"jellyfish":{s.fillStyle=e,s.fillRect(0,0,256,256);for(let o=0;o<6;o++){const a=20+o*36,l=s.createRadialGradient(128,128,a-12,128,128,a);l.addColorStop(0,t+"00"),l.addColorStop(.5,t+"55"),l.addColorStop(1,t+"00"),s.fillStyle=l,s.fillRect(0,0,256,256)}break}default:{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t,s.globalAlpha=.15;for(let o=0;o<100;o++){const a=Math.random()*256,l=Math.random()*256,c=2+Math.random()*4;s.beginPath(),s.arc(a,l,c,0,Math.PI*2),s.fill()}s.globalAlpha=1;break}}const r=new or(i);return r.wrapS=mi,r.wrapT=mi,r.repeat.set(2,2),r}function $y(n,e,t){const i=`${n}_${e}_${t}`;let s=lh.get(i);return s||(s=Ky(n,e,t),lh.set(i,s)),s}function Ri(n,e=.04){if(!n.geometry||n.getObjectByName("toon_outline"))return;const t=n.geometry.clone(),i=new At({color:new Ae(657940),side:tn}),s=new je(t,i);s.name="toon_outline",t.computeBoundingSphere();const r=t.boundingSphere?t.boundingSphere.radius:1,o=Math.max(.05,r),a=1+e/o;s.scale.setScalar(a),n.add(s)}let ca=null;function ur(){if(!ca){const n=new Uint8Array([0,80,160,255]),e=new au(n,n.length,1,Lh);e.minFilter=Nt,e.magFilter=Nt,e.needsUpdate=!0,ca=e}return ca}function Ci(n,e={}){const t={color:new Ae(n),gradientMap:ur(),emissive:e.emissive?new Ae(e.emissive):new Ae(0),emissiveIntensity:e.emissiveI??0};if(Qt&&!e.noTexture){const i=Un(Qt);t.map=$y(Qt,n,i.accent||i.shade),t.color=new Ae(16777215)}return new hu(t)}function Ge(n,e,t={}){const i=new je(new wn(n,22,18),Ci(e,t));return t.noOutline||Ri(i),i}function Dt(n,e,t,i={}){const s=new je(new $a(n,e,16),Ci(t,i));return i.noOutline||Ri(s),s}function hn(n,e,t,i,s={}){const r=new je(new Fi(n,e,t,16),Ci(i,s));return s.noOutline||Ri(r),r}function so(){const n=document.createElement("canvas");n.width=64,n.height=64;const e=n.getContext("2d");if(e){const r=e.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(0, 0, 0, 0.75)"),r.addColorStop(.5,"rgba(0, 0, 0, 0.35)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=r,e.fillRect(0,0,64,64)}const t=new or(n),i=new At({map:t,transparent:!0,depthWrite:!1}),s=new je(new uo(1.6,1.6),i);return s.rotation.x=-Math.PI/2,s.position.y=.19,s.name="shadow",s}function Jy(n,e,t,i=.09){for(const s of[-1,1]){const r=Ge(i,"#ffffff",{noOutline:!0,noTexture:!0});r.name=`eye_${s===1?"r":"l"}`,r.position.set(s*.22,e,t),n.add(r);const o=Ge(i*.55,"#0a0a0a",{noOutline:!0,noTexture:!0});o.name=`pupil_${s===1?"r":"l"}`,o.position.set(s*.22,e,t+i*.7),n.add(o)}}function Zy(n){const e=yo(n,"body");if(e){const s=e.clone();return _o(s,Un(n).fill,ur()),vo(s,go.body),s}const t=new Lt,i=Un(n);if(n==="ant"){const s=Ge(.65,i.fill,{});s.scale.set(1,.9,1.2),s.position.set(0,0,.45),s.castShadow=!0,t.add(s);const r=hn(.12,.12,.4,i.shade,{});r.rotation.x=Math.PI/2,r.position.set(0,-.1,0),t.add(r);const o=Ge(.82,i.fill,{});o.scale.set(1,.85,1.55),o.position.set(0,-.1,-.65),o.castShadow=!0,t.add(o)}else if(n==="scorpion"){const s=Ge(.72,i.fill,{});s.scale.set(1.1,.75,.95),s.position.set(0,.05,.5),s.castShadow=!0,t.add(s);for(let r=0;r<4;r++){const o=Ge(.68-r*.05,r%2===0?i.fill:i.shade,{});o.scale.set(1.1-r*.04,.7-r*.03,.5),o.position.set(0,-.05-r*.02,.1-r*.32),o.castShadow=!0,t.add(o)}}else if(n==="crab"){const s=Ge(1.05,i.fill,{});s.scale.set(1.48,.56,1.24),s.castShadow=!0,t.add(s);for(const r of[-1,1]){const o=Dt(.12,.45,i.accent,{});o.position.set(r*1.45,.1,-.1),o.rotation.z=-r*1.15,t.add(o)}}else if(n==="rhino"){const s=Ge(1.22,i.fill,{});s.scale.set(1.22,1.04,1.34),s.castShadow=!0,t.add(s);for(const r of[-1,1]){const o=Ge(.92,i.accent,{});o.scale.set(.18,.92,1.12),o.position.set(r*.74,.05,0),t.add(o)}}else if(n==="gorilla"){const s=Ge(1.26,i.fill,{});s.scale.set(1.28,1.18,1.18),s.castShadow=!0,t.add(s);const r=Ge(.88,"#b0b6c2",{});r.scale.set(1.04,.38,.86),r.position.set(0,.72,-.16),t.add(r)}else if(n==="eel"){const s=Ge(.82,i.fill,{});s.scale.set(.72,.72,1.84),s.castShadow=!0,t.add(s);const r=hn(.01,.14,2.1,i.accent,{emissive:i.accent,emissiveI:.65});r.position.set(0,.54,-.22),r.rotation.x=Math.PI/2+.08,t.add(r)}else if(n==="cobra"){const s=Ge(.84,i.fill,{});s.scale.set(.78,.78,1.62),s.castShadow=!0,t.add(s);const r=Ge(.68,i.accent,{});r.scale.set(.64,.32,1.38),r.position.set(0,-.42,.28),t.add(r)}else if(n==="tiger"){const s=Ge(1.02,i.fill,{});s.scale.set(1.05,.92,1.25),s.castShadow=!0,t.add(s);for(let r=-3;r<=3;r++){const o=hn(.02,.02,1.6,"#121212",{});o.position.set(-.95,0,r*.3),o.rotation.z=.25,t.add(o);const a=hn(.02,.02,1.6,"#121212",{});a.position.set(.95,0,r*.3),a.rotation.z=-.25,t.add(a)}}else{const s=Ge(1.02,i.fill);s.scale.set(1.05,.92,1.2),s.castShadow=!0,t.add(s);const r=Ge(.7,i.accent,{});r.scale.set(.88,.58,.98),r.position.set(0,-.44,.24),t.add(r)}return t}function Qy(n){const e=yo(n,"head");if(e){const h=e.clone();return _o(h,Un(n).fill,ur()),vo(h,go.head),h}const t=new Lt;t.scale.setScalar(.82);const i=Un(n),s=Ge(.62,i.fill);s.castShadow=!0,t.add(s);let r="#ffffff",o=.5;n==="eel"?(r="#39ff14",o=2):n==="gecko"?(r="#ffd700",o=2.2):(n==="cobra"||n==="scorpion")&&(r="#ff3b30",o=1.8),Jy(t,.12,.5,.09),t.children.forEach(h=>{if(h instanceof je&&h.position.z>.52&&o>1){const u=h.material;u.emissive&&(u.emissive.set(new Ae(r)),u.emissiveIntensity=o)}});const a=Ge(.22,i.fill);a.name="lower_jaw",a.scale.set(1,.4,1.25),a.position.set(0,-.28,.22),a.castShadow=!0,t.add(a);const l=(h,u,d,f=i.fill)=>{for(const g of[-1,1]){const v=Dt(u,h,f);v.position.set(g*.32,.55,-.05),v.rotation.z=-g*d,t.add(v)}},c=(h,u=i.accent)=>{for(const d of[-1,1]){const f=Dt(.1,h,u,{noTexture:!0});f.position.set(d*.3,.55,.2),f.rotation.z=-d*.4,t.add(f)}};switch(n){case"rabbit":{for(const h of[-1,1]){const u=h===1?"r":"l",d=hn(.14,.16,.35,i.fill);d.name=`ear_${u}_0`,d.position.set(h*.32,.55,-.05),d.rotation.z=-h*.05;const f=Dt(.12,.35,i.fill);f.name=`ear_${u}_1`,f.position.set(0,.35,0),d.add(f),t.add(d)}break}case"wolf":l(.34,.2,.5);break;case"tiger":{l(.26,.22,.7);const h=Ge(.24,i.accent);h.position.set(0,-.15,.5),t.add(h);break}case"bear":{for(const h of[-1,1]){const u=Ge(.2,i.fill);u.position.set(h*.4,.5,-.1),t.add(u)}break}case"boar":{for(const u of[-1,1]){const d=Dt(.06,.4,"#e8e0c0",{noTexture:!0});d.position.set(u*.18,.12,.3),d.rotation.set(.6,0,u*.3),a.add(d)}const h=Ge(.32,i.shade);h.scale.set(1,.8,.9),h.position.set(0,-.1,.55),t.add(h);break}case"rhino":{const h=Dt(.16,.7,i.accent,{noTexture:!0});h.position.set(0,.05,.7),h.rotation.x=1.35,t.add(h);const u=Dt(.1,.34,i.accent,{noTexture:!0});u.position.set(0,.32,.52),u.rotation.x=1.25,t.add(u);break}case"eagle":{const h=Dt(.18,.5,"#f0b020",{noTexture:!0});h.position.set(0,-.05,.62),h.rotation.x=1.4,t.add(h);for(let u=-1;u<=1;u++){const d=Dt(.04,.3,i.accent);d.position.set(u*.14,.58,-.18),d.rotation.set(-.4,0,u*.2),t.add(d)}break}case"cobra":{const h=Ge(.55,i.fill);h.scale.set(1.5,1.4,.3),h.position.set(0,.1,-.2),t.add(h);for(const u of[-1,1]){const d=Dt(.04,.22,"#ffffff",{noTexture:!0});d.position.set(u*.15,-.22,.52),d.rotation.x=-.2,t.add(d)}break}case"ant":case"scorpion":{for(const h of[-1,1]){const u=hn(.03,.05,.4,i.shade,{noTexture:!0});u.position.set(h*.18,-.25,.5),u.rotation.x=1.1,t.add(u)}if(n==="ant")for(const h of[-1,1]){const u=hn(.02,.02,.5,i.accent,{noTexture:!0});u.position.set(h*.18,.6,.2),u.rotation.z=-h*.4,t.add(u)}break}case"gorilla":case"gecko":c(1e-4);break;case"eel":{const h=Dt(.12,.4,i.accent,{emissive:i.accent,emissiveI:.4,noTexture:!0});h.position.set(0,.6,-.1),t.add(h);break}case"dragon":{for(const f of[-1,1]){const g=Dt(.1,.55,i.accent,{noTexture:!0});g.position.set(f*.32,.62,-.1),g.rotation.set(-.15,0,f*.45),t.add(g)}const h=Ge(.35,i.shade);h.scale.set(1,.75,1.1),h.position.set(0,-.08,.52),t.add(h);const u=new At({color:16732192}),d=new je(new wn(.18,8,8),u);d.position.set(0,-.32,.38),t.add(d);break}case"jellyfish":{const h=Ge(.62,i.fill);h.scale.set(1.2,.7,1.2);const u=h.material;u.transparent=!0,u.opacity=.72,h.position.set(0,.2,0),t.add(h);for(let d=0;d<5;d++){const f=d/5*Math.PI*2,g=hn(.03,.02,.5,i.accent,{emissive:i.accent,emissiveI:.6,noTexture:!0});g.position.set(Math.cos(f)*.28,-.5,Math.sin(f)*.28),t.add(g)}break}default:l(.3,.16,.4)}return t}function ch(n,e){const t=e?"forelimbs":"hindlimbs",i=yo(n,t);if(i){const l=i.clone();return _o(l,Un(n).fill,ur()),vo(l,go[t]),l}const s=new Lt,r=Un(n),o=e?.45:-.5,a=e?1.15:1.25;if(e&&n==="eagle"){for(const l of[-1,1]){const c=new Lt;c.name=`wing_${l===1?"r":"l"}`;const h=new Rt,u=new Float32Array([0,0,0,l*2.2,1.2,-.4,l*1.8,0,-1.2,l*.9,-.2,-.8]),d=[0,1,2,0,2,3];h.setAttribute("position",new Xt(u,3)),h.setIndex(d),h.computeVertexNormals();const f=new je(h,Ci(r.fill,{}));f.material.side=en,f.castShadow=!0,c.add(f),Ri(f),c.position.set(l*.65,.2,-.15),s.add(c)}return s}if(e&&n==="crab"){for(const l of[-1,1]){const c=new Lt,h=hn(.14,.18,.8,r.fill,{});h.rotation.z=l*.45,h.position.set(l*.65,-.3,o),h.castShadow=!0,c.add(h);const u=Ge(.38,r.accent,{});u.position.set(l*.95,-.55,o+.15),u.scale.set(1.2,.85,1.05),u.castShadow=!0,c.add(u);const d=Dt(.08,.36,r.accent,{noTexture:!0});d.position.set(l*1.15,-.65,o+.36),d.rotation.set(.4,0,-l*.5),c.add(d);const f=Dt(.06,.3,r.shade,{noTexture:!0});f.position.set(l*.95,-.72,o+.3),f.rotation.set(.6,0,l*.2),c.add(f),s.add(c)}return s}if(e&&n==="scorpion"){for(const l of[-1,1]){const c=new Lt,h=hn(.1,.13,.9,r.fill,{});h.rotation.z=l*.5,h.position.set(l*.7,-.3,o),h.castShadow=!0,c.add(h);const u=Ge(.28,r.accent,{});u.position.set(l*1,-.65,o+.25),u.scale.set(1,.7,1.25),c.add(u);const d=Dt(.06,.3,r.accent,{noTexture:!0});d.position.set(l*1.1,-.75,o+.42),d.rotation.set(.3,0,-l*.3),c.add(d);const f=Dt(.05,.24,r.shade,{noTexture:!0});f.position.set(l*.9,-.8,o+.38),f.rotation.set(.5,0,l*.1),c.add(f),s.add(c)}return s}if(["ant","scorpion"].includes(n)){for(const l of[-1,1]){const c=new Lt,h=Ge(.13,r.shade,{});h.position.set(l*.52,-.4,o),c.add(h);const u=hn(.09,.09,.32,r.shade,{});u.position.set(l*.52,-.4,o),u.rotation.z=l*.82,u.castShadow=!0,c.add(u);const d=Ge(.11,r.fill,{});d.position.set(l*.76,-.72,o+.08),c.add(d);const f=hn(.065,.065,.82,r.fill,{});f.position.set(l*.76,-.72,o+.08),f.rotation.z=l*.42,f.castShadow=!0,c.add(f);const g=Ge(.08,r.shade,{});g.position.set(l*.92,-1.22,o+.16),c.add(g);const v=hn(.045,.032,.92,r.shade,{});v.position.set(l*.92,-1.22,o+.16),v.rotation.z=-l*.58,v.castShadow=!0,c.add(v),s.add(c)}return s}if(!e&&n==="rabbit"){for(const l of[-1,1]){const c=new Lt,h=Ge(.36,r.fill,{});h.scale.set(.9,1.25,.9),h.position.set(l*.56,-.22,o),h.castShadow=!0,c.add(h);const u=new E(l*.56,-.42,o),d=new E(l*.76,-.72,o-.15),f=new E(l*.56,-.92,o+.15),g=new Ks(u,d,f),v=new Js(g,10,.12,8,!1),m=new je(v,Ci(r.fill,{}));m.castShadow=!0,c.add(m),Ri(m);const p=Ge(.14,r.fill,{});p.position.copy(d),c.add(p);const M=Ge(.18,r.shade,{});M.scale.set(.8,.38,1.45),M.position.copy(f),M.castShadow=!0,c.add(M),s.add(c)}return s}if(e&&n==="gorilla"){for(const l of[-1,1]){const c=new Lt,h=Ge(.35,r.shade,{});h.position.set(l*.64,0,o+.08),c.add(h);const u=new E(l*.64,0,o+.08),d=new E(l*.92,-.65,o+.2),f=new E(l*.68,-1.3,o+.24),g=new Ks(u,d,f),v=new Js(g,12,.25,8,!1),m=new je(v,Ci(r.fill,{}));m.castShadow=!0,c.add(m),Ri(m);const p=Ge(.24,r.fill,{});p.position.copy(d),c.add(p);const M=Ge(.38,r.shade,{});M.position.copy(f),M.castShadow=!0,c.add(M),s.add(c)}return s}for(const l of[-1,1]){const c=new Lt,h=Ge(.22,r.shade,{});h.position.set(l*.55,0,o),c.add(h);const u=new E(l*.55,0,o),d=new E(l*.8,-a*.45,o+(e?.15:-.15)),f=new E(l*.55,-a*.9,o+(e?.1:0)),g=new Ks(u,d,f),v=new Js(g,12,.16,8,!1),m=new je(v,Ci(r.fill,{}));m.castShadow=!0,c.add(m),Ri(m);const p=Ge(.16,r.fill,{});p.position.copy(d),c.add(p);const M=Ge(.2,r.shade);if(M.scale.set(1,.7,1.3),M.position.copy(f),M.castShadow=!0,c.add(M),e&&["bear","tiger","gorilla","crab","scorpion"].includes(n))for(const y of[-1,0,1]){const x=Dt(.04,.18,r.accent,{noTexture:!0});x.position.set(f.x+y*.07,f.y-.05,f.z+.28),x.rotation.x=1.2,x.castShadow=!0,c.add(x)}s.add(c)}return s}function eM(n){const e=yo(n,"tail");if(e){const o=e.clone();return _o(o,Un(n).fill,ur()),vo(o,go.tail),o}const t=new Lt;t.name="tail";const i=Un(n);if(n==="eagle"){for(let o=-2;o<=2;o++){const a=Ge(.14,i.fill,{});a.scale.set(.6,.04,1.42),a.position.set(o*.13,.08,-1.22),a.rotation.set(-.24,o*.11,0),a.castShadow=!0,t.add(a)}return t}if(n==="rabbit"){const o=Ge(.24,i.accent,{});return o.position.set(0,.22,-.92),o.castShadow=!0,t.add(o),t}let s=t;const r=n==="scorpion"||n==="cobra"||n==="tiger"?8:6;for(let o=0;o<r;o++){const a=o/(r-1),l=new Lt;l.name=`tail_seg_${o}`,o===0?l.position.set(0,.1,-.9):n==="scorpion"?l.position.set(0,1.45/r,-1.22/r):n==="cobra"?l.position.set(0,-.45/r,-1.35/r):n==="tiger"?l.position.set(0,-.2/r,-1.38/r):l.position.set(0,.25/r,-1.1/r);let c;if(n==="scorpion"){const h=.24*(1-a*.44);c=Ge(h,o%2===0?i.fill:i.shade,{})}else n==="cobra"?c=Ge(.24*(1-a*.72),i.fill):n==="tiger"?c=Ge(.18*(1-a*.42),o%2===0?i.fill:"#0d0d0d"):c=Ge(.26*(1-a*.7),i.fill);if(c.castShadow=!0,l.add(c),o===r-1){if(n==="scorpion"){const h=Ge(.18,i.accent,{emissive:i.accent,emissiveI:.55});h.position.set(0,.14,.14),l.add(h);const u=Dt(.04,.24,"#0f0f0f",{});u.rotation.x=-1.25,u.position.set(0,.24,.24),l.add(u)}else if(n==="cobra"){const h=Dt(.12,.34,i.accent,{});h.rotation.x=-.6,h.position.set(0,.2,-.4),l.add(h)}else if(n==="eel"||n==="default"){const h=Dt(.25,.5,i.accent,{emissive:i.accent,emissiveI:.5});h.rotation.x=-1.4,h.position.set(0,.1,-.4),l.add(h)}}s.add(l),s=l}return t}function lr(n){const e=new Lt,t={body:r=>r.position.set(0,1.4,0),head:r=>r.position.set(0,2.15,.95),forelimbs:r=>r.position.set(0,1.4,0),hindlimbs:r=>r.position.set(0,1.4,0),tail:r=>r.position.set(0,1.3,-.3)},i={body:()=>{Qt=n.body;const r=Zy(n.body);return Qt=null,r},head:()=>{Qt=n.head;const r=Qy(n.head);return Qt=null,r},forelimbs:()=>{Qt=n.forelimbs;const r=ch(n.forelimbs,!0);return Qt=null,r},hindlimbs:()=>{Qt=n.hindlimbs;const r=ch(n.hindlimbs,!1);return Qt=null,r},tail:()=>{Qt=n.tail;const r=eM(n.tail);return Qt=null,r}};for(const r of fi){const o=i[r]();t[r](o),o.name=r,e.add(o)}Qt=n.body;const s=Ge(.4,Un(n.body).fill);if(Qt=null,s.name="neck",s.scale.set(.8,.9,.8),s.position.set(0,1.85,.55),e.add(s),n.head==="eel"||n.body==="eel"){const r=new Ei(65535,1.3,7);r.position.set(0,1.6,.4),e.add(r)}if(n.head==="cobra"||n.head==="scorpion"||n.tail==="scorpion"){const r=new Ei(3800852,1.1,6);r.position.set(0,1.8,.8),e.add(r)}if(n.head==="eagle"||n.head==="tiger"||n.body==="tiger"){const r=new Ei(16768358,.9,6);r.position.set(0,1.7,.6),e.add(r)}if(n.body==="rhino"||n.body==="bear"||n.body==="gorilla"){const r=new Ei(16729105,.8,5);r.position.set(0,1.1,-.2),e.add(r)}if(n.head==="dragon"||n.body==="dragon"){const r=new Ei(16732176,1.5,8);r.position.set(0,1.6,.5),e.add(r)}if(n.head==="jellyfish"||n.body==="jellyfish"){const r=new Ei(9453823,1.2,7);r.position.set(0,1.7,.3),e.add(r)}return e}function tM(n,e,t=220){const i=new Xa({antialias:!0,alpha:!0});i.setSize(t,t),i.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),i.shadowMap.enabled=!0,i.shadowMap.type=Oa,i.toneMapping=Fa,i.toneMappingExposure=1.25,n.appendChild(i.domElement);const s=new iu,r=new Kt(40,1,.1,100);r.position.set(0,2.2,7.2),r.lookAt(0,1.6,0),s.add(new mu(6715306,.7));const o=new ar(16773597,1.25);o.position.set(-4,6,5),o.castShadow=!0,o.shadow.mapSize.width=1024,o.shadow.mapSize.height=1024,o.shadow.bias=-.001,s.add(o);const a=new ar(10185983,.7);a.position.set(5,2,-4),s.add(a);const l=new Fi(1.6,1.8,.25,32),c=new di({color:2042167,roughness:.2,metalness:.8}),h=new je(l,c);h.position.y=.05,h.receiveShadow=!0,s.add(h);const u=new po(1.6,.06,16,64),d=new di({color:10185983,emissive:10185983,emissiveIntensity:1.5,roughness:.1}),f=new je(u,d);f.rotation.x=Math.PI/2,f.position.y=.18,s.add(f);const g=40,v=new Rt,m=new Float32Array(g*3),p=[],M=[];for(let G=0;G<g;G++){const le=Math.random()*Math.PI*2,ge=.2+Math.random()*1.3;m[G*3]=Math.cos(le)*ge,m[G*3+1]=Math.random()*3.5,m[G*3+2]=Math.sin(le)*ge,p.push(.008+Math.random()*.015),M.push(Math.random()*Math.PI*2)}v.setAttribute("position",new Xt(m,3));const y=new Ya({color:10185983,size:.08,transparent:!0,opacity:.6}),x=new lu(v,y);s.add(x);let I=e,w=lr(e);s.add(w);const P=so();s.add(P);let F=!1,b={x:0,y:0},R={x:0,y:.3};n.style.cursor="grab";const k=G=>{F=!0,b={x:G.clientX,y:G.clientY},n.style.cursor="grabbing"},Y=G=>{if(!F)return;const le={x:G.clientX-b.x,y:G.clientY-b.y};R.y+=le.x*.01,R.x+=le.y*.01,R.x=Math.max(-.6,Math.min(.6,R.x)),b={x:G.clientX,y:G.clientY}},he=()=>{F=!1,n.style.cursor="grab"},N=G=>{G.touches.length===1&&(F=!0,b={x:G.touches[0].clientX,y:G.touches[0].clientY})},H=G=>{if(!F||G.touches.length!==1)return;const le={x:G.touches[0].clientX-b.x,y:G.touches[0].clientY-b.y};R.y+=le.x*.01,R.x+=le.y*.01,R.x=Math.max(-.6,Math.min(.6,R.x)),b={x:G.touches[0].clientX,y:G.touches[0].clientY}};let z={x:0,y:0};const ee=G=>{const le=n.getBoundingClientRect();if(le.width===0||le.height===0)return;const ge=le.left+le.width/2,be=le.top+le.height/2;z.x=(G.clientX-ge)/(le.width*2),z.y=(G.clientY-be)/(le.height*2),z.x=Math.max(-1,Math.min(1,z.x)),z.y=Math.max(-1,Math.min(1,z.y))};n.addEventListener("mousedown",k),window.addEventListener("mousemove",Y),window.addEventListener("mouseup",he),n.addEventListener("touchstart",N),window.addEventListener("touchmove",H),window.addEventListener("touchend",he),window.addEventListener("mousemove",ee);let Z=0,X=0,te=0,Q=!1;function ye(){if(Q)return;X+=.016,F||(R.y+=.005),w.rotation.y=R.y,w.rotation.x=R.x;const G=w.getObjectByName("body"),le=w.getObjectByName("neck"),ge=w.getObjectByName("head"),be=w.getObjectByName("forelimbs"),Me=w.getObjectByName("hindlimbs"),He=I.forelimbs==="eagle"||I.body==="eagle"||I.body==="dragon",Se=I.body==="cobra"||I.body==="eel"||I.body==="jellyfish",ke=["bear","rhino","gorilla","boar"].includes(I.body),V=["ant","scorpion","crab"].includes(I.body);if(He){if(w.position.y=Math.sin(X*2.2)*.15+.35,w.position.x=0,G){const J=Math.sin(X*3)*.015;G.scale.set(1.04+J,.94-J,1.18+J),G.rotation.x=.12+Math.sin(X*2.2)*.04,G.rotation.y=0}be&&(be.rotation.x=.25),Me&&(Me.rotation.x=.4)}else if(Se)w.position.y=Math.sin(X*1.8)*.03+.1,w.position.x=0,G&&(G.rotation.y=Math.sin(X*2.2)*.12,G.rotation.x=Math.cos(X*1.8)*.05,G.scale.set(1.05,.92,1.2)),le&&(le.rotation.y=-Math.sin(X*2.2)*.08);else if(ke){if(w.position.y=.05,G){const J=Math.sin(X*1.2)*.035;G.scale.set(1.1+J,.88-J,1.25+J),G.rotation.x=0,G.rotation.y=Math.sin(X*.8)*.04}w.position.x=Math.sin(X*.8)*.05}else if(V){if(w.position.y=.02+Math.sin(X*4.5)*.01,w.position.x=0,G){const ce=Math.sin(X*4)*.018;G.scale.set(1.03+ce,.94-ce,1.2+ce),G.rotation.x=.02,G.rotation.y=0}const J=Math.sin(X*15)*.02;be&&(be.rotation.z=J),Me&&(Me.rotation.z=-J)}else if(w.position.y=Math.sin(X*1.4)*.04+.1,w.position.x=0,G){const J=Math.sin(X*2.5)*.02;G.scale.set(1.05+J,.92-J,1.2+J),G.rotation.set(0,0,0)}if(ge){const J=z.x*.6;let ce=z.y*.4+Math.sin(X*1.2)*.03;if(He)ce-=.08;else if(Se){const Ce=-Math.sin(X*2.2)*.08;ge.rotation.y+=(J+Ce-ge.rotation.y)*.1,ge.rotation.x+=(ce-ge.rotation.x)*.1}else if(V){const Ce=(Math.sin(X*12)+Math.cos(X*19))*.018;ge.rotation.y+=(J+Ce*1.5-ge.rotation.y)*.12,ge.rotation.x+=(ce+Ce-ge.rotation.x)*.12}!Se&&!V&&(ge.rotation.y+=(J-ge.rotation.y)*.1,ge.rotation.x+=(ce-ge.rotation.x)*.1)}const Ct=w.getObjectByName("ear_l_0"),Oe=w.getObjectByName("ear_l_1"),Ie=w.getObjectByName("ear_r_0"),Te=w.getObjectByName("ear_r_1");if(Ct&&Ie){const J=Math.sin(X*4)*.08,ce=Math.cos(X*3)*.05;Ct.rotation.x=J,Ct.rotation.z=-.05+ce,Oe&&(Oe.rotation.x=J*1.5,Oe.rotation.z=ce*.8),Ie.rotation.x=J,Ie.rotation.z=.05-ce,Te&&(Te.rotation.x=J*1.5,Te.rotation.z=-ce*.8)}const lt=w.getObjectByName("lower_jaw");if(lt){const J=Math.max(0,Math.sin(X*1.5)*.08);lt.rotation.x=J}Math.random()<.008&&te===0&&(te=10);let ze=1;te>0&&(te--,te>5?ze=.1+(te-5)*.18:ze=.1+(5-te)*.18);for(const J of["_r","_l"]){const ce=w.getObjectByName(`eye${J}`),Ce=w.getObjectByName(`pupil${J}`);ce&&(ce.scale.y=ze),Ce&&(Ce.scale.y=ze)}const C=Se?4.5:ke?2:3.2,T=Se?.32:ke?.08:.15;for(let J=0;J<8;J++){const ce=w.getObjectByName(`tail_seg_${J}`);ce&&(ce.rotation.y=Math.sin(X*C-J*.32)*T)}const W=w.getObjectByName("tail");W&&!w.getObjectByName("tail_seg_0")&&(W.rotation.y=Math.sin(X*3.2)*.15);const ae=w.getObjectByName("wing_r"),oe=w.getObjectByName("wing_l");if(ae&&oe){const J=Math.sin(X*(He?10:5))*(He?.45:.25);ae.rotation.z=J,oe.rotation.z=-J}const se=x.geometry.attributes.position;for(let J=0;J<g;J++){let ce=se.getY(J)+p[J];ce>3.5&&(ce=.2),se.setY(J,ce);const Ce=M[J]+X;let qe=se.getX(J)+Math.sin(Ce)*.003,ne=se.getZ(J)+Math.cos(Ce)*.003;se.setX(J,qe),se.setZ(J,ne)}se.needsUpdate=!0;const we=s.getObjectByName("shadow");if(we){const J=w.position.y,ce=Math.max(.2,1.2-J*.8);we.scale.set(ce,ce,1),we.material.opacity=Math.max(.1,.55-J*.65)}i.render(s,r),Z=requestAnimationFrame(ye)}ye();function $(G){G.traverse(le=>{const ge=le;ge.geometry&&ge.geometry.dispose();const be=ge.material;Array.isArray(be)?be.forEach(Me=>Me.dispose()):be&&be.dispose()})}return{setGenome(G){I=G,s.remove(w),$(w),w=lr(G),s.add(w)},dispose(){Q=!0,cancelAnimationFrame(Z),$(w),h.geometry.dispose(),c.dispose(),u.dispose(),d.dispose(),v.dispose(),y.dispose(),P.geometry.dispose(),P.material.dispose(),n.removeEventListener("mousedown",k),window.removeEventListener("mousemove",Y),window.removeEventListener("mouseup",he),n.removeEventListener("touchstart",N),window.removeEventListener("touchmove",H),window.removeEventListener("touchend",he),window.removeEventListener("mousemove",ee),i.dispose(),i.domElement.remove()}}}const nM=Object.freeze(Object.defineProperty({__proto__:null,buildCreatureModel:lr,createSoftShadowMesh:so,modelsReady:Yy,mountCreature3D:tM},Symbol.toStringTag,{value:"Module"})),mn=960,An=420,Wn=300;function iM(n,e,t,i=1){const s=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches??!1,r=i===0||s;if(r)return setTimeout(()=>t(e.winner),20),()=>{};let o=null,a=!1,l=null,c=null,h=null,u=null,d=null,f=null,g=null,v=null,m=null,p=null,M=0,y=null,x=null,I=null,w=null;const P=[],F=[],b=[],R=[];let k=null,Y=null;const he=e.events.filter(S=>S.kind==="start"),N=he.find(S=>S.side==="a"),H=he.find(S=>S.side==="b"),z={a:hh("a",N,250),b:hh("b",H,mn-250)},ee=[],Z=[],X=[],te=[];let Q=0;const ye=[...e.events].sort((S,U)=>S.t-U.t);let $=0,G=0;const le=uh(Math.round(uh(e.ticks,450,950)/i),1,2400),ge=e.ticks/le;let be=0,Me=0,He=!1,Se={active:!1,casterSide:"a",timer:0,duration:0,ability:"",value:0};const ke=60;try{l=new Xa({canvas:n,antialias:!0,alpha:!1}),l.setSize(mn,An),l.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),l.shadowMap.enabled=!0,l.shadowMap.type=Oa,l.toneMapping=Fa,l.toneMappingExposure=1.25,c=new iu,c.background=new Ae(923440),c.fog=new qa(923440,.012),h=new Kt(38,mn/An,.1,100),h.position.set(0,14,22),h.lookAt(0,1.2,0),y=new mu(4478344,.9),c.add(y),x=new ar(16772565,1.5),x.position.set(-6,12,8),x.castShadow=!0,x.shadow.mapSize.width=1024,x.shadow.mapSize.height=1024,c.add(x),I=new ar(10185983,.8),I.position.set(6,4,-6),c.add(I),w=new pu(16777215,0,18,Math.PI/4,.5,1),w.position.set(0,10,0),w.castShadow=!0,c.add(w);const S=3,U=new Fi(.3,1.2,14,16,1,!0),L=new At({color:8037119,transparent:!0,opacity:.12,blending:va,side:en,depthWrite:!1});for(let de=0;de<S;de++){const Pe=new je(U,L);Pe.position.set(-6+de*6+(Math.random()-.5)*2,7,-3+(Math.random()-.5)*2),Pe.rotation.z=(Math.random()-.5)*.15,Pe.rotation.x=(Math.random()-.5)*.15,Pe.name=`light_ray_${de}`,c.add(Pe)}d=new Lt;const _=new Fi(10,10.5,.8,64);g=new di({color:1450559,metalness:.8,roughness:.3}),f=new je(_,g),f.position.y=-.4,f.receiveShadow=!0,d.add(f),v=new po(10.2,.1,16,64),m=new di({color:8037119,emissive:8037119,emissiveIntensity:1.2});const O=new je(v,m);O.rotation.x=Math.PI/2,O.position.y=.01,d.add(O),c.add(d);const ie=so(),ve=so();c.add(ie),c.add(ve),u={a:{model:lr(N.genome),shadow:ie,basePos:new E(-4,0,.5),shake:0,lunge:0,dodgeOffset:0,flash:0,time:0,actionState:"idle",actionTimer:0,actionDuration:0,dodgeDir:0,blinkTimer:0,deathTimer:0,actionTimerAccumulator:0,vocalTimer:Math.floor(Math.random()*300+200)},b:{model:lr(H.genome),shadow:ve,basePos:new E(4,0,-.5),shake:0,lunge:0,dodgeOffset:0,flash:0,time:Math.PI,actionState:"idle",actionTimer:0,actionDuration:0,dodgeDir:0,blinkTimer:0,deathTimer:0,actionTimerAccumulator:0,vocalTimer:Math.floor(Math.random()*300+350)}},u.a.model.position.copy(u.a.basePos),u.a.model.rotation.y=Math.PI/2-.4,c.add(u.a.model),u.b.model.position.copy(u.b.basePos),u.b.model.rotation.y=-Math.PI/2+.4,c.add(u.b.model),k=document.createElement("div"),k.className="arena-hud-overlay",k.style.position="absolute",k.style.top="20px",k.style.left="0",k.style.right="0",k.style.pointerEvents="none",k.style.display="flex",k.style.justifyContent="space-between",k.style.padding="0 40px",k.style.fontFamily="Inter, system-ui, sans-serif",k.innerHTML=`
      <div class="hud-bar player-hud" style="background: rgba(12,18,34,0.85); border: 1px solid rgba(122,162,255,0.25); border-radius: 12px; padding: 12px 20px; width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); backdrop-filter: blur(8px);">
        <div class="hud-name" style="font-weight: 700; font-size: 15px; color: #e7ecf7; margin-bottom: 6px;">${N.name}</div>
        <div class="hud-hp-bg" style="background: #0c1222; border-radius: 9px; height: 18px; overflow: hidden; width: 100%;">
          <div class="hud-hp-fill" style="background: linear-gradient(90deg, #36c08a, #6ce5b1); height: 100%; width: 100%; transition: width 0.2s ease;"></div>
        </div>
        <div class="hud-text" style="font-size: 12px; color: #93a0bd; margin-top: 4px; text-align: right;">${N.maxHp}/${N.maxHp}</div>
      </div>
      <div class="hud-bar opponent-hud" style="background: rgba(12,18,34,0.85); border: 1px solid rgba(122,162,255,0.25); border-radius: 12px; padding: 12px 20px; width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); backdrop-filter: blur(8px);">
        <div class="hud-name" style="font-weight: 700; font-size: 15px; color: #e7ecf7; margin-bottom: 6px; text-align: right;">${H.name}</div>
        <div class="hud-hp-bg" style="background: #0c1222; border-radius: 9px; height: 18px; overflow: hidden; width: 100%;">
          <div class="hud-hp-fill" style="background: linear-gradient(90deg, #36c08a, #6ce5b1); height: 100%; width: 100%; transition: width 0.2s ease;"></div>
        </div>
        <div class="hud-text" style="font-size: 12px; color: #93a0bd; margin-top: 4px; text-align: left;">${H.maxHp}/${H.maxHp}</div>
      </div>
    `,n.parentElement?.style.setProperty("position","relative"),n.parentElement?.appendChild(k),Y=document.createElement("canvas"),Y.width=mn,Y.height=An,Y.style.position="absolute",Y.style.top="0",Y.style.left="0",Y.style.pointerEvents="none",Y.style.display="none",n.parentElement?.appendChild(Y),a=!0}catch(S){if(console.warn("WebGL not supported, falling back to 2D canvas:",S),a=!1,o=n.getContext("2d"),o){const U=Math.min(window.devicePixelRatio||1,3);n.width=Math.round(mn*U),n.height=Math.round(An*U),o.scale(U,U)}}function V(){Me++;let S=1;if(a&&M>0&&(M--,S=.28),!(a&&Se.active))for(G+=ge*S;$<ye.length&&ye[$].t<=G;)We(ye[$]),$++;if(a&&u&&l&&c&&h){for(const L of["a","b"])z[L].displayHp+=(z[L].targetHp-z[L].displayHp)*.25;if(Me<ke){const L=Me/ke,_=L*(2-L);h.position.set(0,14-_*6.5,22-_*7.5),h.lookAt(0,1.2,0),Y&&(Y.style.display="none")}else if(Se.active){Se.timer++;const L=Se.timer/Se.duration,_=u[Se.casterSide],O=_.basePos.clone().add(new E(Se.casterSide==="a"?2.5:-2.5,2.2,5)),ie=_.basePos.clone().add(new E(0,1.4,0));if(h.position.lerp(O,.12),h.lookAt(new E(0,1.2,0).lerp(ie,.5)),Y&&(Y.style.display="block",we(Y)),w.target=_.model,y.intensity=.9*(1-Math.sin(L*Math.PI)*.85),x.intensity=1.5*(1-Math.sin(L*Math.PI)*.9),I.intensity=.8*(1-Math.sin(L*Math.PI)*.8),w.intensity=Math.sin(L*Math.PI)*4.5,Se.timer%3===0&&L<.8){const ve=Se.ability==="spit"?"#39ff14":Se.ability==="shock"?"#c39bff":Se.ability==="leech"?"#ff3b30":"#ffae19";J(_.model.position,ve)}Se.timer>=Se.duration&&(Se.active=!1,Se.onComplete&&Se.onComplete(),w.intensity=0)}else{Y&&(Y.style.display="none");const L=new E(0,7.5,14.5),_=new E(0,1.2,0),O=u.a.actionState,ie=u.b.actionState;if(O==="windup"||O==="strike"?(L.add(new E(.8,-.4,-.6)),_.add(new E(.5,0,0))):(ie==="windup"||ie==="strike")&&(L.add(new E(-.8,-.4,-.6)),_.add(new E(-.5,0,0))),h.position.lerp(L,.08),h.lookAt(_),y.intensity+=(.9-y.intensity)*.1,x.intensity+=(1.5-x.intensity)*.1,I.intensity+=(.8-I.intensity)*.1,w.intensity+=(0-w.intensity)*.1,Q>.01){Q*=.85;const ve=(Math.random()-.5)*Q,de=(Math.random()-.5)*Q*.5;h.position.add(new E(ve,de,0))}}for(let L=F.length-1;L>=0;L--){const _=F[L];if(_.progress+=_.speed*S,_.progress>=1)c.remove(_.mesh),_.mesh.geometry.dispose(),_.mesh.material.dispose(),_.onHit(),F.splice(L,1);else{const O=new E().lerpVectors(_.start,_.end,_.progress);O.y+=Math.sin(_.progress*Math.PI)*1.5,_.mesh.position.copy(O);const ie=new wn(.04,4,4),ve=new At({color:new Ae(_.colorHex),transparent:!0,opacity:.7}),de=new je(ie,ve);de.position.copy(O),c.add(de),P.push({mesh:de,velocity:new E((Math.random()-.5)*.01,.01,(Math.random()-.5)*.01),life:.4,decay:.04*S})}}for(let L=P.length-1;L>=0;L--){const _=P[L];_.mesh.position.addScaledVector(_.velocity,S),_.mesh.geometry.type==="RingGeometry"?_.mesh.scale.addScalar(.14*S):_.mesh.geometry.type==="IcosahedronGeometry"?_.mesh.scale.addScalar(.015*S):_.mesh.geometry.type==="BoxGeometry"?(_.velocity.y-=.005*S,_.mesh.rotation.x+=.04*S,_.mesh.rotation.y+=.06*S,_.mesh.position.y<.05&&_.velocity.y<0&&(_.mesh.position.y=.05,_.velocity.y=-_.velocity.y*.45,_.velocity.x*=.6,_.velocity.z*=.6)):(_.mesh.material.color.getHexString()==="b0b6c2"&&_.mesh.scale.addScalar(.06*S),_.velocity.y-=.003*S),_.life-=_.decay*S,_.mesh.material.opacity=Math.max(0,_.life),_.life<=0&&(c.remove(_.mesh),_.mesh.geometry.dispose(),_.mesh.material.dispose(),P.splice(L,1))}for(let L=b.length-1;L>=0;L--){const _=b[L];if(_.life--,_.life<=0){c.remove(_.line),_.line.geometry.dispose(),_.line.material.dispose(),b.splice(L,1);continue}const O=_.line.geometry.attributes.position,ie=10,ve=_.x2-_.x1,de=_.y2-_.y1,Pe=_.z2-_.z1;if(_.kind==="tether_1"||_.kind==="tether_2"){const rt=new E(ve,de,Pe);rt.normalize();const it=new E(0,1,0).cross(rt);it.lengthSq()<.001&&it.copy(new E(1,0,0).cross(rt)),it.normalize();const kt=new E().crossVectors(rt,it).normalize();for(let Mt=0;Mt<=ie;Mt++){const ct=Mt/ie,ht=_.x1+ve*ct,nn=_.y1+de*ct,an=_.z1+Pe*ct,Bt=ct*Math.PI*5.5+Me*.24+(_.kind==="tether_2"?Math.PI:0),Sn=.25*Math.sin(ct*Math.PI),Ls=ht+(it.x*Math.cos(Bt)+kt.x*Math.sin(Bt))*Sn,A=nn+(it.y*Math.cos(Bt)+kt.y*Math.sin(Bt))*Sn,B=an+(it.z*Math.cos(Bt)+kt.z*Math.sin(Bt))*Sn;O.setXYZ(Mt,Ls,A,B)}}else{const rt=Math.hypot(ve,de,Pe)||1,it=-de/rt,kt=ve/rt;for(let Mt=0;Mt<=ie;Mt++){const ct=Mt/ie,ht=_.x1+ve*ct,nn=_.y1+de*ct,an=_.z1+Pe*ct;let Bt=0;_.kind==="lightning"?Bt=(Math.random()-.5)*.5*Math.sin(ct*Math.PI):Bt=Math.sin(ct*Math.PI*3+Me*.4)*.2*Math.sin(ct*Math.PI),O.setXYZ(Mt,ht+it*Bt,nn+kt*Bt,an)}}O.needsUpdate=!0}for(let L=R.length-1;L>=0;L--){const _=R[L];_.sprite.position.add(_.velocity),_.velocity.y-=.001,_.life-=_.decay,_.sprite.material.opacity=_.life,_.life<=0&&(c.remove(_.sprite),_.sprite.material.map?.dispose(),_.sprite.material.dispose(),R.splice(L,1))}if(d){const L=.5+Math.sin(Me*.08)*.3;d.children.forEach(_=>{if(_ instanceof je){const O=_.material;O&&O.emissiveIntensity!==void 0&&(O.emissiveIntensity=L*1.5)}})}for(let L=0;L<3;L++){const _=c.getObjectByName(`light_ray_${L}`);_ instanceof je&&(_.rotation.y+=.003,_.material.opacity=.1+Math.sin(Me*.02+L)*.04)}if(Me===ke&&(Q=1.8,Te(u.a.model.position,18),Te(u.b.model.position,18),C(u.a.model.position,1.2),C(u.b.model.position,1.2),ze(u.a.model.position,8),ze(u.b.model.position,8),Xd()),Me>=ke&&Me<ke+30&&Me%10===0)for(const L of["a","b"]){const O=u[L].model.getObjectByName("head");if(O){const ie=new E;O.getWorldPosition(ie),ie.z+=L==="a"?.5:-.5,lt(ie,"#c39bff")}}for(const L of["a","b"]){const _=u[L],O=z[L],ve=u[L==="a"?"b":"a"];if(_.time+=.016*S,O.displayHp>.5&&Me>ke+60&&_.actionState==="idle"&&(_.vocalTimer-=S,_.vocalTimer<=0)){const ue=_.model.getObjectByName("head");if(ue){const Ne=new E;ue.getWorldPosition(Ne),Ne.z+=L==="a"?.5:-.5;const Ut=O.genome.body==="eel"?"#50e8d0":O.genome.body==="cobra"?"#a8e030":O.genome.body==="dragon"?"#ff6030":O.genome.body==="jellyfish"?"#b060ff":"#e8d8a0";lt(Ne,Ut),qd(Ut)}_.vocalTimer=Math.floor(Math.random()*300+480)}_.actionTimerAccumulator+=S;let de=0;_.actionTimerAccumulator>=1&&(de=Math.floor(_.actionTimerAccumulator),_.actionTimerAccumulator-=de);for(let ue=0;ue<de;ue++)if(_.actionState==="windup")_.actionTimer++,_.actionTimer>=_.actionDuration&&(_.actionState="strike",_.actionTimer=0,_.actionDuration=5,Te(_.model.position,8));else if(_.actionState==="strike"){_.actionTimer++;const Ne=O,Ut=Ne.genome.forelimbs==="eagle"||Ne.genome.body==="eagle"||Ne.genome.body==="dragon",vt=["crab","scorpion","eagle"].includes(Ne.genome.forelimbs),dn=Ne.genome.forelimbs==="gorilla",fn=["cobra","eel","jellyfish"].includes(Ne.genome.body);Ut&&Math.random()<.7&&Oe(_.model.position,L),dn&&_.actionTimer===1&&Te(_.model.position,18),fn&&Math.random()<.4&&Ie(_.model.position.clone().add(new E(0,.4,0)),"#39ff14",3,.07),_.actionTimer>=_.actionDuration&&(_.onHitCallback&&(_.onHitCallback(),_.onHitCallback=void 0),vt&&Ct(_.model.position,L),_.actionState="recover",_.actionTimer=0,_.actionDuration=18)}else _.actionState==="recover"||_.actionState==="dodge"?(_.actionTimer++,_.actionTimer>=_.actionDuration&&(_.actionState="idle",_.actionTimer=0)):Math.random()<.003&&O.displayHp>.5&&(_.actionState="dodge",_.actionTimer=0,_.actionDuration=24,_.dodgeDir=Math.random()<.5?1:-1);const Pe=_.actionTimer+_.actionTimerAccumulator;if(_.actionState==="windup"){const ue=Math.min(1,Pe/_.actionDuration);_.lunge=-.4*ue,_.model.rotation.z=L==="a"?-.12:.12}else if(_.actionState==="strike"){const ue=Math.min(1,Pe/_.actionDuration);_.lunge=-.4+2.2*ue,_.model.rotation.z=L==="a"?.22:-.22}else if(_.actionState==="recover"){const ue=Math.min(1,Pe/_.actionDuration);_.lunge=1.8*(1-ue*(2-ue)),_.model.rotation.z=0}else if(_.actionState==="dodge"){const ue=_.actionDuration/2;Pe<ue?_.dodgeOffset=_.dodgeDir*1.5*(Pe/ue):_.dodgeOffset=_.dodgeDir*1.5*(1-(Pe-ue)/ue)}else _.lunge=0,_.dodgeOffset=0;const rt=ve.basePos.clone().sub(_.basePos).normalize(),it=new E(-rt.z,0,rt.x).normalize();let kt=0,Mt=0;_.shake>.01&&(_.shake*=.9,kt=(Math.random()-.5)*_.shake,Mt=(Math.random()-.5)*_.shake*.4);const ct=_.basePos.clone().add(rt.multiplyScalar(_.lunge)).add(it.multiplyScalar(_.dodgeOffset)).add(new E(kt,Mt,0)),ht=O.displayHp>.5,nn=O.genome.forelimbs==="eagle"||O.genome.body==="eagle"||O.genome.body==="dragon",an=O.genome.body==="cobra"||O.genome.body==="eel"||O.genome.body==="jellyfish",Bt=["bear","rhino","gorilla","boar"].includes(O.genome.body),Sn=["ant","scorpion","crab"].includes(O.genome.body),Ls=O.genome.forelimbs==="crab"||O.genome.forelimbs==="scorpion",A=O.genome.forelimbs==="eagle",B=["scorpion","cobra","eel","tiger","dragon","jellyfish"].includes(O.genome.tail),j=["boar","wolf","bear","rhino","cobra","dragon"].includes(O.genome.head),K=O.genome.forelimbs==="gorilla";if(ht)if(Me<ke){const ue=Me/ke,Ne=8*(1-ue*ue);ct.y+=Ne+.1}else{let ue=Math.sin(_.time*2.5)*.08+.1;if(nn?ue=Math.sin(_.time*2.2)*.15+.35:an?ue=Math.sin(_.time*1.8)*.03+.1:Bt?ue=.05:Sn&&(ue=.02+Math.sin(_.time*4.5)*.01),ct.y+=ue,_.actionState==="windup"){const Ne=_.actionTimer/_.actionDuration;A?ct.y+=Ne*1.4:K&&(ct.y+=Ne*.8)}else if(_.actionState==="strike"){const Ne=_.actionTimer/_.actionDuration;A?ct.y+=1.4*(1-Ne)+Math.sin(Ne*Math.PI)*.5:K&&(ct.y+=.8*(1-Ne))}}else{_.deathTimer++;const ue=Math.min(1,_.deathTimer/30);ct.y=.1-ue*.7,_.model.rotation.z=(L==="a"?-.8:.8)*Math.min(1,_.deathTimer/15),_.model.traverse(Ut=>{const vt=Ut;vt.isMesh&&vt.material&&(Array.isArray(vt.material)?vt.material:[vt.material]).forEach(fn=>{fn.transparent=!0,fn.opacity=Math.max(0,1-(_.deathTimer-15)/35)})}),($<ye.length||Me<=le)&&Math.random()<.1&&Ie(_.model.position,"#555555",3,.03)}if(_.model.position.copy(ct),_.shadow){_.shadow.position.set(ct.x,.19,ct.z);const ue=ct.y,Ne=Math.max(.2,1.2-ue*.8);_.shadow.scale.set(Ne,Ne,1),ht?_.shadow.material.opacity=Math.max(.1,.55-ue*.65):(_.shadow.material.transparent=!0,_.shadow.material.opacity=Math.max(0,.55-_.deathTimer/30))}const q=L==="a"?Math.PI/2-.4:-Math.PI/2+.4;if(ht){if(_.actionState==="strike"&&B){const ue=_.actionTimer/_.actionDuration;_.model.rotation.y=q+Math.sin(ue*Math.PI)*Math.PI*(L==="a"?2:-2)}else _.model.rotation.y+=(q-_.model.rotation.y)*.15;if(_.actionState==="windup"&&K)_.model.rotation.z+=((L==="a"?-.25:.25)-_.model.rotation.z)*.15;else if(_.actionState==="strike"&&A){const ue=_.actionTimer/_.actionDuration;_.model.rotation.z=(L==="a"?.35:-.35)*(1-ue*2.5)}else _.actionState==="strike"&&!A?_.model.rotation.z=L==="a"?.22:-.22:_.actionState==="windup"&&!K?_.model.rotation.z=L==="a"?-.12:.12:_.model.rotation.z+=(0-_.model.rotation.z)*.15}const fe=_.model.getObjectByName("body"),Le=_.model.getObjectByName("neck"),Ue=_.model.getObjectByName("forelimbs"),Be=_.model.getObjectByName("hindlimbs");if(ht){if(fe)if(nn){const ue=Math.sin(_.time*3)*.015;fe.scale.set(1.04+ue,.94-ue,1.18+ue),fe.rotation.x=.12+Math.sin(_.time*2.2)*.04,fe.rotation.y=0}else if(an)fe.rotation.y=Math.sin(_.time*2.2)*.12,fe.rotation.x=Math.cos(_.time*1.8)*.05,fe.scale.set(1.05,.92,1.2);else if(Bt){const ue=Math.sin(_.time*1.2)*.035;fe.scale.set(1.1+ue,.88-ue,1.25+ue),fe.rotation.x=0,fe.rotation.y=Math.sin(_.time*.8)*.04}else if(Sn){const ue=Math.sin(_.time*4)*.018;fe.scale.set(1.03+ue,.94-ue,1.2+ue),fe.rotation.x=.02,fe.rotation.y=0}else{const ue=Math.sin(_.time*2.5)*.02;fe.scale.set(1.05+ue,.92-ue,1.2+ue),fe.rotation.set(0,0,0)}if(Le&&an&&(Le.rotation.y=-Math.sin(_.time*2.2)*.08),Ue)if(Ue.rotation.set(0,0,0),_.actionState==="strike"&&Ls){const ue=_.actionTimer/_.actionDuration;Ue.rotation.y=Math.sin(ue*Math.PI)*(L==="a"?.9:-.9),Ue.rotation.x=Math.sin(ue*Math.PI)*.4}else if(_.actionState==="strike"&&K){const ue=_.actionTimer/_.actionDuration;Ue.rotation.x=-1.3*ue}else nn?Ue.rotation.x=.25:Sn&&(Ue.rotation.z=Math.sin(_.time*15)*.02);Be&&(Be.rotation.set(0,0,0),nn?Be.rotation.x=.4:Sn&&(Be.rotation.z=-Math.sin(_.time*15)*.02))}const Fe=_.model.getObjectByName("head");if(Fe&&ht&&ve)if(Me>ke-20&&Me<ke+40)Fe.rotation.x=-.35,Fe.rotation.y=L==="a"?.2:-.2;else if(_.actionState==="strike"&&j){const ue=_.actionTimer/_.actionDuration;Fe.position.z=Math.sin(ue*Math.PI)*.6,Fe.rotation.set(0,0,0)}else{Fe.position.z+=(0-Fe.position.z)*.15;const ue=new E;Fe.getWorldPosition(ue);const Ne=new E;ve.model.getWorldPosition(Ne),Ne.y+=1.6;const Ut=Fe.parent.worldToLocal(Ne.clone()),vt=Math.atan2(Ut.x,Ut.z),dn=-Math.atan2(Ut.y,Math.hypot(Ut.x,Ut.z));let fn=Math.max(-.6,Math.min(.6,vt)),qt=Math.max(-.4,Math.min(.4,dn));if(nn)qt-=.08;else if(an)fn+=-Math.sin(_.time*2.2)*.08;else if(Sn){const zi=(Math.sin(_.time*12)+Math.cos(_.time*19))*.018;fn+=zi*1.5,qt+=zi}Fe.rotation.y+=(fn-Fe.rotation.y)*.1,Fe.rotation.x+=(qt-Fe.rotation.x)*.1}const Ve=_.model.getObjectByName("ear_l_0"),Xe=_.model.getObjectByName("ear_l_1"),bt=_.model.getObjectByName("ear_r_0"),Wt=_.model.getObjectByName("ear_r_1");if(Ve&&bt&&ht){const ue=Math.sin(_.time*4)*.08,Ne=Math.cos(_.time*3)*.05;Ve.rotation.x=ue,Ve.rotation.z=-.05+Ne,Xe&&(Xe.rotation.x=ue*1.5,Xe.rotation.z=Ne*.8),bt.rotation.x=ue,bt.rotation.z=.05-Ne,Wt&&(Wt.rotation.x=ue*1.5,Wt.rotation.z=-Ne*.8)}const Pt=_.model.getObjectByName("lower_jaw");if(Pt&&ht){let ue=0;Me>ke-20&&Me<ke+40?ue=.35:_.actionState==="windup"||_.actionState==="strike"?ue=j?.45:.25:ue=Math.max(0,Math.sin(_.time*1.8)*.06),Pt.rotation.x=ue}Math.random()<.008&&_.blinkTimer===0&&(_.blinkTimer=10);let sn=1;_.blinkTimer>0&&(_.blinkTimer--,_.blinkTimer>5?sn=.1+(_.blinkTimer-5)*.18:sn=.1+(5-_.blinkTimer)*.18);for(const ue of["_r","_l"]){const Ne=_.model.getObjectByName(`eye${ue}`),Ut=_.model.getObjectByName(`pupil${ue}`);Ne&&(Ne.scale.y=sn),Ut&&(Ut.scale.y=sn)}const _t=an?4.5:Bt?2:3.5,Ke=an?.32:Bt?.08:.15;for(let ue=0;ue<8;ue++){const Ne=_.model.getObjectByName(`tail_seg_${ue}`);Ne&&(Ne.rotation.y=Math.sin(_.time*_t-ue*.32)*Ke)}const Bi=_.model.getObjectByName("tail");Bi&&!_.model.getObjectByName("tail_seg_0")&&ht&&(Bi.rotation.y=Math.sin(_.time*_t)*Ke);const St=_.model.getObjectByName("wing_r"),Pn=_.model.getObjectByName("wing_l");if(St&&Pn&&ht){const ue=Math.sin(_.time*(nn?10:6))*(nn?.45:.3);St.rotation.z=ue,Pn.rotation.z=-ue}_.flash>.5?(_.flash*=.92,p||(p=new At({color:16777215})),_.model.traverse(ue=>{const Ne=ue;Ne.isMesh&&Ne.material&&(Ne.originalMaterial||(Ne.originalMaterial=Ne.material),Ne.material=p)})):(_.flash>.02?_.flash*=.92:_.flash=0,_.model.traverse(ue=>{const Ne=ue;Ne.isMesh&&Ne.originalMaterial&&(Ne.material=Ne.originalMaterial,delete Ne.originalMaterial)}))}if(l.render(c,h),k){const L=k.querySelector(".player-hud .hud-hp-fill"),_=k.querySelector(".player-hud .hud-text"),O=Math.max(0,z.a.displayHp)/z.a.maxHp*100;L.style.width=`${O}%`,L.style.background=O>30?"linear-gradient(90deg, #36c08a, #6ce5b1)":"linear-gradient(90deg, #ff6b81, #ff97a6)",_.textContent=`${Math.max(0,Math.round(z.a.displayHp))}/${z.a.maxHp}`;const ie=k.querySelector(".opponent-hud .hud-hp-fill"),ve=k.querySelector(".opponent-hud .hud-text"),de=Math.max(0,z.b.displayHp)/z.b.maxHp*100;ie.style.width=`${de}%`,ie.style.background=de>30?"linear-gradient(90deg, #36c08a, #6ce5b1)":"linear-gradient(90deg, #ff6b81, #ff97a6)",ve.textContent=`${Math.max(0,Math.round(z.b.displayHp))}/${z.b.maxHp}`}}else{for(const L of["a","b"]){const _=z[L];_.displayHp+=(_.targetHp-_.displayHp)*.25,_.shake*=.8,_.lunge*=.82,_.flash*=.85,_.attackAnim=Math.max(0,_.attackAnim-.065),_.hitAnim=Math.max(0,_.hitAnim-.055);const O=L==="a"?1:-1;_.x=_.baseX+_.lunge*O}for(let L=ee.length-1;L>=0;L--){const _=ee[L];_.y+=_.vy,_.vy+=.06,_.life-=1,_.life<=0&&ee.splice(L,1)}for(let L=Z.length-1;L>=0;L--){const _=Z[L];_.x+=_.vx,_.y+=_.vy,_.vy+=.18,_.vx*=.98,_.life-=1,_.life<=0&&Z.splice(L,1)}for(let L=X.length-1;L>=0;L--)X[L].life-=1,X[L].life<=0&&X.splice(L,1);for(let L=te.length-1;L>=0;L--){const _=te[L];_.x+=_.vx,_.y+=_.vy,Z.push({x:_.x,y:_.y,vx:0,vy:0,life:8,maxLife:8,color:_.trail,size:_.size*.7});const O=_.tx-_.x,ie=_.ty-_.y;(O*O+ie*ie<220||Me>le+400)&&(_.onHit(),te.splice(L,1))}Q*=.85,Ye()}if($>=ye.length&&Me>le&&ee.length===0&&te.length===0&&X.length===0&&F.length===0&&P.length===0&&R.length===0){He||(He=!0,k&&(k.remove(),k=null),t(e.winner));return}be=requestAnimationFrame(V)}const Ct=(S,U)=>{const L=U==="a"?1:-1,_=[[-.18*L,.55],[0,.4],[.18*L,.55]];for(const[O,ie]of _){const ve=S.clone().add(new E(O-.22*L,ie+.22,0)),de=S.clone().add(new E(O+.22*L,ie-.22,0)),Pe=new Rt().setFromPoints([ve,de]),rt=new qs({color:16777215,transparent:!0,opacity:.9}),it=new ps(Pe,rt);c?.add(it),b.push({line:it,life:14,maxLife:14,kind:"lightning",x1:ve.x,y1:ve.y,z1:ve.z,x2:de.x,y2:de.y,z2:de.z})}},Oe=(S,U)=>{const L=U==="a"?-1:1,_=S.clone().add(new E(L*.6+(Math.random()-.5)*.25,(Math.random()-.5)*.5,0)),O=S.clone().add(new E(L*1.8+(Math.random()-.5)*.15,(Math.random()-.5)*.3,0)),ie=new Rt().setFromPoints([_,O]),ve=new qs({color:15658751,transparent:!0,opacity:.75}),de=new ps(ie,ve);c?.add(de),b.push({line:de,life:9,maxLife:9,kind:"lightning",x1:_.x,y1:_.y,z1:_.z,x2:O.x,y2:O.y,z2:O.z})},Ie=(S,U,L=20,_=.12)=>{const O=new wn(.06,6,6),ie=new At({color:new Ae(U),transparent:!0,opacity:.9});for(let ve=0;ve<L;ve++){const de=new je(O,ie.clone());de.position.copy(S).add(new E((Math.random()-.5)*.4,(Math.random()-.5)*.4,(Math.random()-.5)*.4)),c?.add(de),P.push({mesh:de,velocity:new E((Math.random()-.5)*_*2,(Math.random()-.2)*_*2,(Math.random()-.5)*_*2),life:1,decay:.02+Math.random()*.02})}},Te=(S,U=15)=>{const L=new wn(.18,8,8),_=new At({color:new Ae(11581122),transparent:!0,opacity:.6,depthWrite:!1});for(let O=0;O<U;O++){const ie=new je(L,_.clone()),ve=Math.random()*Math.PI*2,de=.2+Math.random()*.8;ie.position.set(S.x+Math.cos(ve)*de,.2,S.z+Math.sin(ve)*de),c?.add(ie),P.push({mesh:ie,velocity:new E(Math.cos(ve)*(.02+Math.random()*.04),.01+Math.random()*.03,Math.sin(ve)*(.02+Math.random()*.04)),life:.7,decay:.02+Math.random()*.02})}},lt=(S,U)=>{const L=new $s(.1,.12,32),_=new At({color:new Ae(U),side:en,transparent:!0,opacity:.8,depthWrite:!1}),O=new je(L,_);O.position.copy(S),h&&O.lookAt(h.position),c?.add(O),P.push({mesh:O,velocity:new E(0,0,0),life:.8,decay:.03})},ze=(S,U=12)=>{const L=new As(.14,.14,.14),_=new di({color:5919557,roughness:.9});for(let O=0;O<U;O++){const ie=new je(L,_.clone());ie.position.copy(S).add(new E((Math.random()-.5)*.6,.1,(Math.random()-.5)*.6)),ie.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),c?.add(ie),P.push({mesh:ie,velocity:new E((Math.random()-.5)*.16,.06+Math.random()*.15,(Math.random()-.5)*.16),life:1,decay:.015+Math.random()*.01})}},C=(S,U=1.3)=>{const L=new $s(U*.8,U,24),_=new At({color:461074,side:en,transparent:!0,opacity:.85,depthWrite:!1}),O=new je(L,_);O.rotation.x=Math.PI/2,O.position.set(S.x,.02,S.z),c?.add(O),P.push({mesh:O,velocity:new E(0,0,0),life:1.3,decay:.012})},T=(S,U=12)=>{const L=new wn(.08,6,6),_=new At({color:3800852,transparent:!0,opacity:.8});for(let O=0;O<U;O++){const ie=new je(L,_.clone());ie.position.copy(S).add(new E((Math.random()-.5)*.5,.2,(Math.random()-.5)*.5)),c?.add(ie),P.push({mesh:ie,velocity:new E((Math.random()-.5)*.01,.015+Math.random()*.02,(Math.random()-.5)*.01),life:.8,decay:.014})}},W=(S,U)=>{const L=new Za(1.6,1),_=new At({color:new Ae(U),wireframe:!0,transparent:!0,opacity:.75,depthWrite:!1}),O=new je(L,_);O.position.copy(S).add(new E(0,.8,0)),c?.add(O),P.push({mesh:O,velocity:new E(0,0,0),life:1,decay:.03})};let ae=null;const oe=()=>{if(!ae){const S=document.createElement("canvas");S.width=64,S.height=64;const U=S.getContext("2d");U&&(U.fillStyle="#36c08a",U.fillRect(26,10,12,44),U.fillRect(10,26,44,12)),ae=new or(S)}return ae},se=(S,U=8)=>{const L=new Ca({map:oe(),transparent:!0,opacity:.95});for(let _=0;_<U;_++){const O=new Oc(L.clone());O.position.copy(S).add(new E((Math.random()-.5)*.8,.3+Math.random()*.5,(Math.random()-.5)*.8)),O.scale.setScalar(.4),c?.add(O),R.push({sprite:O,velocity:new E((Math.random()-.5)*.008,.025+Math.random()*.015,0),life:1,decay:.018})}};function we(S){const U=S.getContext("2d");if(!U)return;U.clearRect(0,0,mn,An),U.strokeStyle="rgba(255, 255, 255, 0.35)",U.lineWidth=1.5;const L=mn/2,_=An/2,O=35;for(let ie=0;ie<O;ie++){const ve=Math.random()*Math.PI*2,de=40+Math.random()*80,Pe=180+Math.random()*100,rt=L+Math.cos(ve)*Pe,it=_+Math.sin(ve)*Pe,kt=L+Math.cos(ve)*(Pe+de),Mt=_+Math.sin(ve)*(Pe+de);U.beginPath(),U.moveTo(rt,it),U.lineTo(kt,Mt),U.stroke()}}const J=(S,U)=>{const L=new wn(.05,4,4),_=new At({color:new Ae(U),transparent:!0,opacity:.9}),O=new je(L,_),ie=Math.random()*Math.PI*2,ve=1.8;O.position.set(S.x+Math.cos(ie)*ve,S.y+(Math.random()-.2)*.5,S.z+Math.sin(ie)*ve),c?.add(O);const de=new E(-Math.sin(ie),0,Math.cos(ie)).normalize(),rt=S.clone().sub(O.position).normalize().multiplyScalar(.04).add(de.multiplyScalar(.03)).add(new E(0,.03,0));P.push({mesh:O,velocity:rt,life:.8,decay:.02})},ce=(S,U)=>{const L=new $s(.1,.15,32),_=new At({color:new Ae(U),side:en,transparent:!0,opacity:.8,depthWrite:!1}),O=new je(L,_);O.position.copy(S).add(new E(0,1,.5)),h&&O.lookAt(h.position),c?.add(O),P.push({mesh:O,velocity:new E(0,0,0),life:.7,decay:.045})},Ce=(S,U)=>{const L=new wn(.06,4,4),_=new At({color:new Ae(U),transparent:!0,opacity:.8});for(let O=0;O<16;O++){const ie=new je(L,_.clone()),ve=O/16*Math.PI*4,de=O/16*2;ie.position.set(S.x+Math.cos(ve)*.7,S.y+de,S.z+Math.sin(ve)*.7),c?.add(ie),P.push({mesh:ie,velocity:new E(0,.02+Math.random()*.015,0),life:1,decay:.02+Math.random()*.01})}};function qe(S,U=1,L){const _=u[S];_.actionState="windup",_.actionTimer=0,_.actionDuration=Math.round(10*U),_.lunge=0,_.onHitCallback=L}const ne=(S,U,L,_)=>{const O=[];for(let it=0;it<=10;it++)O.push(new E);const ve=new Rt().setFromPoints(O),de=new qs({color:new Ae(L)}),Pe=new ps(ve,de);c?.add(Pe);const rt=_==="lightning";b.push({line:Pe,life:rt?22:40,maxLife:rt?22:40,kind:_,x1:S.x,y1:S.y,z1:S.z,x2:U.x,y2:U.y,z2:U.z})},nt=(S,U,L,_)=>{const O=document.createElement("canvas");O.width=256,O.height=128;const ie=O.getContext("2d");if(!ie)return;ie.font=`bold ${_*2}px Inter, sans-serif`,ie.fillStyle=L,ie.textAlign="center",ie.textBaseline="middle",ie.fillText(U,128,64);const ve=new or(O),de=new Ca({map:ve,transparent:!0}),Pe=new Oc(de);Pe.position.copy(S),Pe.scale.set(2,1,1),c?.add(Pe),R.push({sprite:Pe,velocity:new E((Math.random()-.5)*.02,.05,0),life:1,decay:.02})};function $e(S){const U=z[Ln(S.by)],L=u[S.by],_=u[Ln(S.by)];if(dr(S.ability),S.ability==="spit"){const O=L.model.position.clone().add(new E(S.by==="a"?.8:-.8,1.2,0)),ie=_.model.position.clone().add(new E(0,.8,0)),ve=new wn(.18,8,8),de=new At({color:3800852}),Pe=new je(ve,de);Pe.position.copy(O),c?.add(Pe),F.push({mesh:Pe,start:O,end:ie,progress:0,speed:.018,colorHex:"#39ff14",onHit:()=>{z[Ln(S.by)].hitAnim=.9,_.shake=1,_.flash=1,U.targetHp=S.targetHp,Q=Math.max(Q,.8),Ie(_.model.position,"#39ff14",15,.15),ce(_.model.position,"#39ff14"),T(_.model.position,12),Te(_.model.position,10),nt(_.model.position.clone().add(new E(0,2,0)),`${Si(S.ability)} ${S.value}`,"#39ff14",26)}})}else if(S.ability==="shock"){const O=L.model.position.clone().add(new E(0,1.2,0)),ie=_.model.position.clone().add(new E(0,.8,0));ne(O,ie,"#c39bff","lightning"),z[Ln(S.by)].hitAnim=.9,_.shake=1.2,_.flash=1,U.targetHp=S.targetHp,Q=Math.max(Q,.9),Ie(_.model.position,"#c39bff",15,.16),ce(_.model.position,"#c39bff"),ce(_.model.position,"#ffd700"),Te(_.model.position,10),nt(_.model.position.clone().add(new E(0,2,0)),`${Si(S.ability)} ${S.value}`,"#c39bff",26)}else if(S.ability==="leech"){const O=L.model.position.clone().add(new E(0,.8,0)),ie=_.model.position.clone().add(new E(0,.8,0));ne(ie,O,"#ff3b30","tether_1"),ne(ie,O,"#ff3b30","tether_2"),z[Ln(S.by)].hitAnim=.9,_.shake=1,_.flash=1,U.targetHp=S.targetHp,Q=Math.max(Q,.7),Ie(_.model.position,"#ff3b30",12,.12),ce(_.model.position,"#ff3b30"),Te(_.model.position,8),nt(_.model.position.clone().add(new E(0,2,0)),`${Si(S.ability)} ${S.value}`,"#ff3b30",26)}else if(S.ability==="charge")qe(S.by,1.8,()=>{z[Ln(S.by)].hitAnim=1,_.shake=1.4,_.flash=1,U.targetHp=S.targetHp,Q=Math.max(Q,1.2),Ie(_.model.position,"#ffae19",18,.22),ce(_.model.position,"#ffae19"),C(_.model.position,1.5),ze(_.model.position,15),Te(_.model.position,12),nt(_.model.position.clone().add(new E(0,2,0)),`${Si(S.ability)} ${S.value}`,"#ffae19",26)});else{L.flash=.8;let O="#7aa2ff";S.ability==="venom"?(O="#9be86c",T(L.model.position,12)):S.ability==="frenzy"?(O="#ff6b81",L.flash=1.3):S.ability==="regenerate"?(O="#6ce5b1",se(L.model.position,10)):S.ability==="armor"&&(O="#7aa2ff",W(L.model.position,"#7aa2ff")),Ie(L.model.position,O,14,.14),Ce(L.model.position,O),nt(L.model.position.clone().add(new E(0,2,0)),Si(S.ability),O,24),S.targetHp!==void 0&&(U.targetHp=S.targetHp)}}function We(S){if(a&&u)switch(S.kind){case"attack":{const U=z[Ln(S.by)],L=u[Ln(S.by)];qe(S.by,1,()=>{L.shake=S.crit?1:.6,L.flash=1,U.targetHp=S.targetHp,Q=Math.max(Q,S.crit?1.2:.6),S.crit&&(M=35),Ie(L.model.position,S.crit?"#ffce6b":"#ff8f6b",S.crit?18:10,S.crit?.2:.12),ce(L.model.position,S.crit?"#ffce6b":"#ff8f6b"),(S.crit||z[S.by].genome.forelimbs==="gorilla")&&(C(L.model.position,S.crit?1.4:1.1),ze(L.model.position,S.crit?10:6)),Te(L.model.position,S.crit?12:6),ul(S.crit),nt(L.model.position.clone().add(new E(0,2,0)),S.crit?`${S.dmg}!`:`${S.dmg}`,S.crit?"#ffce6b":"#ff8f6b",S.crit?38:28)});break}case"ability":{["spit","shock","leech","charge"].includes(S.ability)?Se={active:!0,casterSide:S.by,timer:0,duration:45,ability:S.ability,value:S.value,targetHp:S.targetHp,onComplete:()=>{$e(S)}}:$e(S);break}case"poison":{const U=z[S.on];U.targetHp=S.hp,dr("venom");const L=u[S.on];L.flash=.5,Ie(L.model.position,"#9be86c",8,.1),nt(L.model.position.clone().add(new E(0,2,0)),`☠ ${S.dmg}`,"#9be86c",22);break}case"heal":{const U=z[S.on];U.targetHp=S.hp,_a();const L=u[S.on];Ie(L.model.position,"#6ce5b1",10,.12),nt(L.model.position.clone().add(new E(0,2,0)),`+${S.amount}`,"#6ce5b1",24);break}case"death":{const U=z[S.side];U.flash=1;const L=u[S.side];L.flash=1,dl();break}}else switch(S.kind){case"attack":{const U=z[S.by],L=z[Ln(S.by)];U.lunge=85,U.attackAnim=1,L.hitAnim=1,L.shake=S.crit?16:9,L.flash=1,L.targetHp=S.targetHp,Q=Math.max(Q,S.crit?10:5),xe(L,S.crit?"#ffce6b":"#ff8f6b",S.crit?16:9,S.crit?5:3.4),ul(S.crit),De(L,S.crit?`${S.dmg}!`:`${S.dmg}`,S.crit?"#ffce6b":"#ff8f6b",S.crit?34:26);break}case"ability":{const U=z[S.by],L=z[Ln(S.by)];U.attackAnim=.8,U.lunge=55,U.flash=.6,dr(S.ability),!(S.value<0)&&(S.ability==="venom"||S.ability==="armor"||S.ability==="frenzy")?(xe(U,"#7aa2ff",8,2.6),De(U,Si(S.ability),"#7aa2ff",20)):S.ability!=="regenerate"&&(L.hitAnim=.9,L.shake=12,L.flash=1,L.targetHp=S.targetHp,Q=Math.max(Q,8),xe(L,"#c39bff",12,4),De(L,`${Si(S.ability)} ${S.value}`,"#c39bff",24));break}case"poison":{const U=z[S.on];U.targetHp=S.hp,U.flash=Math.max(U.flash,.5),dr("venom"),xe(U,"#9be86c",5,2),De(U,`☠ ${S.dmg}`,"#9be86c",20);break}case"heal":{const U=z[S.on];U.targetHp=S.hp,_a(),xe(U,"#6ce5b1",8,2.4),De(U,`+${S.amount}`,"#6ce5b1",24);break}case"death":{z[S.side].flash=1,dl();break}}}function De(S,U,L,_){ee.push({x:S.baseX+(Math.random()*40-20),y:Wn-110,vy:-2.2,life:55,text:U,color:L,size:_})}function xe(S,U,L,_){if(r)return;const O=S.baseX,ie=Wn-60;for(let ve=0;ve<L;ve++){const de=Math.random()*Math.PI*2,Pe=_*(.4+Math.random());Z.push({x:O,y:ie,vx:Math.cos(de)*Pe,vy:Math.sin(de)*Pe-1.5,life:22+Math.random()*14,maxLife:36,color:U,size:2+Math.random()*3})}}function Ye(){if(!o)return;o.clearRect(0,0,mn,An),ot();const S=s?0:Q,U=(Math.random()*2-1)*S,L=(Math.random()*2-1)*S;o.save(),o.translate(U,L),yt(z.a),yt(z.b);for(const _ of Z)o.globalAlpha=Math.max(0,_.life/_.maxLife),o.fillStyle=_.color,o.beginPath(),o.arc(_.x,_.y,_.size,0,Math.PI*2),o.fill();o.globalAlpha=1;for(const _ of ee)o.globalAlpha=Math.min(1,_.life/30),o.fillStyle=_.color,o.font=`700 ${_.size}px Inter, system-ui, sans-serif`,o.textAlign="center",o.fillText(_.text,_.x,_.y),o.globalAlpha=1;o.restore(),Je()}function ot(){if(!o)return;const S=o.createLinearGradient(0,0,0,An);S.addColorStop(0,"#0e1730"),S.addColorStop(1,"#0a1120"),o.fillStyle=S,o.fillRect(0,0,mn,An);const U=o.createLinearGradient(0,Wn,0,An);U.addColorStop(0,"#16223f"),U.addColorStop(1,"#0c1426"),o.fillStyle=U,o.fillRect(0,Wn,mn,An-Wn),o.strokeStyle="rgba(122,162,255,0.25)",o.lineWidth=2,o.beginPath(),o.moveTo(0,Wn),o.lineTo(mn,Wn),o.stroke()}function yt(S){if(!o)return;const U=S.displayHp>.5,L=Me,_=U?Math.sin(L*.11+(S.side==="a"?0:Math.PI))*5:0,O=U?Math.sin(L*.07+(S.side==="a"?0:Math.PI*.5)):0,ie=U?Math.sin(L*.022+(S.side==="a"?0:Math.PI))*9:0,ve=(Math.random()*2-1)*S.shake,de=(Math.random()*2-1)*S.shake*.4,Pe=S.x+ve+ie,rt=Wn-72+_+de,it=S.attackAnim,kt=S.hitAnim,Mt=S.partEmojis,ct=1+S.lunge/85*.2;o.fillStyle="rgba(0,0,0,0.3)",o.beginPath(),o.ellipse(S.x+ie*.4,Wn+6,55*ct,13,0,0,Math.PI*2),o.fill(),o.save(),o.translate(Pe,rt),S.side==="b"&&o.scale(-1,1),U?kt>0&&(o.translate(-kt*10,-kt*3),o.rotate(-kt*.14)):(o.globalAlpha=.35,o.rotate(.5),o.translate(0,18));const ht=.52;o.save(),o.translate(-46-it*8,-6),o.rotate(-.18+Math.sin(L*.18)*.16),o.scale(ht,ht),bh(o,Mt.tail,L*.18),o.restore(),o.save(),o.translate(-18-it*6,14+it*7),o.rotate(-.04+it*.1),o.scale(ht*.9,ht*.9),Mh(o,Mt.hindlimbs,it),o.restore(),o.save(),o.scale(ht*(1+O*.016),ht*(1-O*.01)),vh(o,Mt.body,O),o.restore(),o.save(),o.translate(20+it*32,14-it*14),o.rotate(it*.6),o.scale(ht*.9,ht*.9),yh(o,Mt.forelimbs,it),o.restore(),o.save(),o.translate(32+it*18,-40-it*12),o.rotate(it*.2-kt*.16),o.scale(ht,ht),_h(o,Mt.head,L*.18,it),o.restore(),o.restore(),S.flash>.02&&(o.globalAlpha=S.flash*.38,o.fillStyle="#ff4d6d",o.beginPath(),o.arc(Pe,rt-12,80,0,Math.PI*2),o.fill(),o.globalAlpha=1)}function Je(){pe(z.a,40,"left"),pe(z.b,mn-360,"right")}function pe(S,U,L){if(!o)return;const _=320,O=32,ie=Math.max(0,S.displayHp)/S.maxHp;o.fillStyle="#0c1222",D(U,O,_,18,9),o.fill();const ve=o.createLinearGradient(U,0,U+_,0);ve.addColorStop(0,ie>.3?"#36c08a":"#ff6b81"),ve.addColorStop(1,ie>.3?"#6ce5b1":"#ff97a6"),o.fillStyle=ve;const de=_*ie;de>0&&(D(L==="left"?U:U+_-de,O,de,18,9),o.fill()),o.fillStyle="#e7ecf7",o.font="700 15px Inter, system-ui, sans-serif",o.textBaseline="alphabetic",o.textAlign=L,o.fillText(`${S.name}  ${Math.max(0,Math.round(S.displayHp))}/${S.maxHp}`,L==="left"?U:U+_,O-8)}function D(S,U,L,_,O){o&&(o.beginPath(),o.moveTo(S+O,U),o.arcTo(S+L,U,S+L,U+_,O),o.arcTo(S+L,U+_,S,U+_,O),o.arcTo(S,U+_,S,U,O),o.arcTo(S,U,S+L,U,O),o.closePath())}function _e(S){S.traverse(U=>{const L=U;L.geometry&&L.geometry.dispose();const _=L.material;Array.isArray(_)?_.forEach(O=>O.dispose()):_&&_.dispose()})}return be=requestAnimationFrame(V),()=>{if(cancelAnimationFrame(be),a){k&&k.remove(),Y&&Y.remove();for(let S=0;S<3;S++){const U=c?.getObjectByName(`light_ray_${S}`);U instanceof je&&(c?.remove(U),U.geometry.dispose(),U.material.dispose())}u&&c&&(c.remove(u.a.model),_e(u.a.model),c.remove(u.a.shadow),_e(u.a.shadow),c.remove(u.b.model),_e(u.b.model),c.remove(u.b.shadow),_e(u.b.shadow)),d&&c&&(c.remove(d),f?.geometry.dispose(),g?.dispose(),v?.dispose(),m?.dispose()),P.forEach(S=>{c?.remove(S.mesh),S.mesh.geometry.dispose(),S.mesh.material.dispose()}),F.forEach(S=>{c?.remove(S.mesh),S.mesh.geometry.dispose(),S.mesh.material.dispose()}),b.forEach(S=>{c?.remove(S.line),S.line.geometry.dispose(),S.line.material.dispose()}),R.forEach(S=>{c?.remove(S.sprite),S.sprite.material.map?.dispose(),S.sprite.material.dispose()}),l?.dispose()}}}function hh(n,e,t){return{side:n,name:e.name,emoji:e.emoji,partEmojis:e.partEmojis,genome:e.genome,maxHp:e.maxHp,displayHp:e.maxHp,targetHp:e.maxHp,x:t,baseX:t,shake:0,lunge:0,flash:0,attackAnim:0,hitAnim:0}}function Ln(n){return n==="a"?"b":"a"}function uh(n,e,t){return Math.max(e,Math.min(t,n))}function Si(n){return{venom:"Venom",regenerate:"Regen",spit:"Spit",charge:"Charge",armor:"Armor",frenzy:"Frenzy",shock:"Shock",leech:"Leech"}[n]??n}let Re=Hu(),Qs=null,ls=!1,ha=null,ri=null,ua=!1;function sM(n){return ua?null:(ri||(ri=document.createElement("div"),ri.className="creature3d-host"),ha?ha.setGenome(n):Au(async()=>{const{mountCreature3D:e,modelsReady:t}=await Promise.resolve().then(()=>nM);return{mountCreature3D:e,modelsReady:t}},void 0,import.meta.url).then(({mountCreature3D:e,modelsReady:t})=>{const i=document.getElementById("models-loading-overlay");return i&&(i.style.display="flex"),t.then(()=>{if(i&&(i.style.display="none"),!!ri)try{ha=e(ri,n,240)}catch{ua=!0,ri?.remove(),ri=null}})}).catch(()=>{const e=document.getElementById("models-loading-overlay");e&&(e.style.display="none"),ua=!0}),ri)}const yu=[{id:"slow",label:"🐢 Slow",mult:.4},{id:"normal",label:"▶ Normal",mult:1},{id:"fast",label:"⚡ Fast",mult:3},{id:"instant",label:"⏩ Instant",mult:0}];Vd(Re.muted);const ro=document.getElementById("app");let cr="lab";function nl(n){Re.player=n,Nn(Re),un()}function Mu(){nl(Yr(er(Date.now()),Re.unlocked))}function bu(){const n=Yr(er(Date.now()^85),Re.unlocked),e=Uu(Re.player,n,er(Date.now()>>>1),{pool:Re.unlocked});nl(e)}function Su(){return re("div",{class:"topbar"},[re("div",{class:"brand"},[re("span",{class:"logo"},["🧬"]),re("div",{},[re("h1",{},["Imaginary Creatures"]),re("small",{},["Splice DNA. Build a beast. Win the arena."])])]),re("div",{class:"stats-pills"},[re("span",{class:"pill"},[da("Wins",Re.wins)]),re("span",{class:"pill"},[da("Losses",Re.losses)]),re("span",{class:"pill"},[da("Species",Re.unlocked.length)]),re("button",{class:"pill",title:"Toggle sound",onclick:n=>{Th();const e=Wd();Re.muted=e,Nn(Re),n.target.textContent=e?"🔇 Sound":"🔊 Sound"}},[Re.muted?"🔇 Sound":"🔊 Sound"])])])}function da(n,e){return re("span",{html:`${n} <b>${e}</b>`})}function rM(){const n=yu.map(({id:s,label:r,mult:o})=>re("button",{class:Re.battleSpeed===s?"settings-btn active":"settings-btn",onclick:()=>{Re.battleSpeed=s,Nn(Re),un()},title:`Battle speed: ${s} (${o===0?"instant":o+"×"})`},[r])),e=re("button",{class:Re.showOpponent?"settings-btn active":"settings-btn",onclick:()=>{Re.showOpponent=!Re.showOpponent,Nn(Re),un()}},[Re.showOpponent?"🔭 Opponent":"🔭 Opponent (hidden)"]),t=re("button",{class:ls?"settings-btn active":"settings-btn",onclick:()=>{ls=!ls,un()}},["🗑 New Game"]),i=re("div",{class:"settings-bar"},[re("div",{class:"settings-group"},[re("span",{class:"settings-label"},["Speed"]),...n]),re("div",{class:"settings-group"},[e]),re("div",{class:"settings-group"},[t])]);if(ls){const s=[{tier:1,label:"🌱 Tier 1 (5 species)"},{tier:2,label:"🔥 Tier 1+2 (10 species)"},{tier:3,label:"💀 All species unlocked"}].map(({tier:r,label:o})=>re("button",{class:"settings-btn",onclick:()=>{confirm(`Start a new game at ${o}? Current progress will be lost.`)&&(ls=!1,Re=ga(r,Re),Nn(Re),un())}},[o]));i.append(re("div",{class:"settings-newgame"},[re("span",{class:"settings-label"},["Pick start tier:"]),...s,re("button",{class:"settings-btn",onclick:()=>{ls=!1,un()}},["✕ Cancel"])]))}return i}function un(){Qs&&(Qs(),Qs=null),cr="lab",Na(ro);const n=re("div",{class:"panel"},[re("h2",{},["Genetics Lab"]),re("div",{class:"slots"},fi.map(a=>{const l=re("select",{onchange:c=>{const h={...Re.player,[a]:c.target.value};nl(h)}});for(const c of Re.unlocked){const h=Pi(c),u=re("option",{value:c},[`${h.emoji}  ${h.name}`]);Re.player[a]===c&&(u.selected=!0),l.append(u)}return re("div",{class:"slot"},[re("label",{},[Fu(a)]),l])})),re("div",{class:"btnrow"},[re("button",{onclick:Mu},["🎲 Randomize"]),re("button",{onclick:bu},["🧬 Splice DNA"])]),re("p",{class:"hint"},["Each animal gives different stats and powers depending on the slot it fills. Splice mixes your current creature with a random one — mutations can graft in traits from neither parent. Win fights to unlock stronger species."]),re("p",{class:"hint"},["⌨ Shortcuts: R randomize · S splice · Enter fight"])]),e=tr(Re.player),t=Yu(Re.roster,Re.player),i=sM(Re.player),s=[re("h2",{},["Your Creature"])];i&&s.push(re("div",{class:"creature3d-stage"},[i])),s.push(Sh(e));const r=re("div",{class:"panel"},[...s,re("div",{class:"btnrow"},[re("button",{class:"primary",onclick:oo},["⚔ Enter Arena"]),re("button",{disabled:t,onclick:()=>{Re.roster=qu(Re.roster,{name:e.name,genome:{...Re.player}}),Nn(Re),un()}},[t?"✓ Saved":"💾 Save"])])]),o=[Su(),rM(),re("div",{class:"layout"},[n,r])];Re.showOpponent&&o.push(oM(e)),o.push(aM()),ro.append(...o)}function oM(n){const e=mh(n,Re.wins,Re.seed),t=pi(n),i=pi(e),s=i>t*1.12?re("span",{class:"verdict tough"},["Tougher than you — build to counter"]):i<t*.88?re("span",{class:"verdict easy"},["You out-power them"]):re("span",{class:"verdict even"},["Evenly matched"]);return re("div",{class:"panel opponent-panel"},[re("div",{class:"opponent-head"},[re("h2",{},["⚔ Next Opponent"]),re("div",{class:"btnrow",style:"margin:0"},[re("button",{title:"Scout a different opponent",onclick:()=>{Re.seed=Re.seed*1664525+1013904223>>>0,Nn(Re),un()}},["🔄 Scout another"])])]),Sh(e),re("p",{class:"hint"},[s])])}function aM(){const n=Re.roster.length===0?[re("p",{class:"hint"},["No saved creatures yet. Build one and hit 💾 Save."])]:Re.roster.map((e,t)=>{const i=tr(e.genome,e.name);return re("div",{class:"roster-item"},[re("span",{class:"roster-emoji"},[i.emoji]),re("div",{class:"roster-meta"},[re("div",{class:"roster-name"},[i.name]),re("div",{class:"roster-power"},[`Power ${pi(i)}`])]),re("div",{class:"roster-actions"},[re("button",{onclick:()=>{Re.player={...e.genome},Nn(Re),un()}},["Load"]),re("button",{title:"Delete","aria-label":`Delete ${i.name}`,onclick:()=>{Re.roster=ju(Re.roster,t),Nn(Re),un()}},["🗑"])])])});return re("div",{class:"panel roster-panel"},[re("h2",{},[`Saved Roster (${Re.roster.length}/6)`]),re("div",{class:"roster-grid"},n)])}function oo(){Th(),cr="arena";const n=tr(Re.player),e=mh(n,Re.wins,Re.seed),t=(Re.seed^Re.wins*2654435761)>>>0,i=Lu(n,e,er(t));Na(ro);const s=re("canvas",{id:"arena",role:"img","aria-label":"Battle arena replay"}),r=re("div",{class:"center"},[]);ro.append(Su(),re("div",{class:"panel arena-wrap"},[re("div",{class:"arena-fighters"},[re("div",{class:"fighter-tag"},[re("div",{class:"nm"},[`${n.emoji} ${n.name}`]),re("div",{class:"pw"},[`Power ${pi(n)}`])]),re("div",{class:"fighter-tag right"},[re("div",{class:"nm"},[`${e.name} ${e.emoji}`]),re("div",{class:"pw"},[`Power ${pi(e)}`])])]),s,r]));const o=yu.find(a=>a.id===Re.battleSpeed)?.mult??1;Qs=iM(s,i,a=>{Qs=null,lM(r,a,e.name)},o)}function lM(n,e,t){cr="result";const i=e==="a";let s=null;i?(Re.wins++,s=Wu(Re),jd()):e==="b"&&(Re.losses++,Yd()),Re.seed=Re.seed*1664525+1013904223>>>0,Nn(Re);const o=[i?re("div",{class:"result-banner win"},["VICTORY"]):e==="draw"?re("div",{class:"result-banner draw"},["DRAW"]):re("div",{class:"result-banner lose"},["DEFEAT"])];if(o.push(re("p",{class:"hint"},[i?`You beat ${t}.`:e==="draw"?`Stalemate with ${t}.`:`${t} beat you. Tweak your genome and try again.`])),s){const a=Pi(s);o.push(re("p",{class:"unlock-note"},[`🔓 New species unlocked: ${a.emoji} ${a.name}!`]))}o.push(re("div",{class:"btnrow",style:"justify-content:center"},[re("button",{class:"accent",onclick:oo},["⚔ Fight Again"]),re("button",{onclick:un},["🧪 Back to Lab"])])),Na(n),n.append(re("div",{class:"fadein"},o))}window.addEventListener("keydown",n=>{const e=n.target?.tagName;e==="SELECT"||e==="INPUT"||e==="TEXTAREA"||(cr==="lab"?n.key==="r"||n.key==="R"?(n.preventDefault(),Mu()):n.key==="s"||n.key==="S"?(n.preventDefault(),bu()):n.key==="Enter"&&(n.preventDefault(),oo()):cr==="result"&&(n.key==="Enter"?(n.preventDefault(),oo()):n.key==="Escape"&&(n.preventDefault(),un())))});if($n.length===0)throw new Error("No animals defined");un();
//# sourceMappingURL=index-CnZyBW_h.js.map
