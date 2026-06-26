(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const kd="modulepreload",Fd=function(n,e){return new URL(n,e).href},vl={},Bd=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=Promise.allSettled(t.map(c=>{if(c=Fd(c,i),c in vl)return;vl[c]=!0;const h=c.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!i)for(let g=a.length-1;g>=0;g--){const v=a[g];if(v.href===c&&(!h||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":kd,h||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),h)return new Promise((g,v)=>{f.addEventListener("load",g),f.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};function zi(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let i=Math.imul(e^e>>>15,1|e);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function Ao(n,e){return n()<e}function wh(n,e){return e[Math.floor(n()*e.length)]}function Rh(){return Math.random()*4294967295>>>0}const yi=["head","body","forelimbs","hindlimbs","tail"],zd={health:0,attack:0,defense:0,speed:0,energy:0},dr={venom:{id:"venom",name:"Venom",cost:30,description:"Injects poison that deals damage over the next few ticks."},regenerate:{id:"regenerate",name:"Regenerate",cost:40,description:"Heals a chunk of health."},spit:{id:"spit",name:"Acid Spit",cost:25,description:"A ranged burst that ignores part of the enemy's defense."},charge:{id:"charge",name:"Charge",cost:35,description:"A heavy slam dealing big up-front damage."},armor:{id:"armor",name:"Plate Up",cost:30,description:"Temporarily raises defense."},frenzy:{id:"frenzy",name:"Frenzy",cost:35,description:"Sharply raises attack speed for a short time."},shock:{id:"shock",name:"Shock",cost:30,description:"Electric jolt that also briefly slows the enemy."},leech:{id:"leech",name:"Leech",cost:30,description:"Bite that heals for part of the damage dealt."}},yl={thickHide:{id:"thickHide",name:"Thick Hide",description:"+20% defense."},swift:{id:"swift",name:"Swift",description:"+15% speed."},predator:{id:"predator",name:"Predator",description:"+15% attack."},hardy:{id:"hardy",name:"Hardy",description:"+15% health."},keenSenses:{id:"keenSenses",name:"Keen Senses",description:"+10% energy gain."}},aa={dragon:"fire",cobra:"air",eel:"water",jellyfish:"water",wolf:"nature",bear:"nature",gorilla:"nature",tiger:"fire",rhino:"earth",boar:"earth",scorpion:"earth",eagle:"air",ant:"electric",crab:"electric",rabbit:"electric",gecko:"electric",panther:"nature",mantis:"air"},Hd={fire:{nature:1.2,water:.83},water:{fire:1.2,earth:1.2,nature:.83},nature:{earth:1.2,water:1.2,fire:.83},earth:{fire:1.2,electric:1.2,water:.83},air:{nature:1.2,earth:1.2,electric:.83},electric:{water:1.2,air:1.2,earth:.83}};function Ch(n,e){const t=aa[n]??"normal",i=aa[e]??"normal";return Hd[t]?.[i]??1}const Ml=100,Gd=4e3;function bl(n,e){const t=e.traits.includes("keenSenses")?1.1:1;return{side:n,name:e.name,emoji:e.emoji,partEmojis:e.partEmojis,genome:e.genome,hp:e.stats.health,maxHp:e.stats.health,attack:e.stats.attack,defense:e.stats.defense,speed:Math.max(4,e.stats.speed),energyRegen:(2+e.stats.energy*.1)*t,energy:0,abilities:e.abilities,attackMeter:0,poison:[],armorTicks:0,frenzyTicks:0,slowTicks:0}}function wo(n){return n.armorTicks>0?n.defense*1.5:n.defense}function Vd(n){let e=n.speed;return n.frenzyTicks>0&&(e*=1.6),n.slowTicks>0&&(e*=.7),e}function Wd(n,e){const t=Ch(n.genome.body??"",e.genome.body??"");return Math.max(1,Math.round((n.attack-wo(e)*.4)*t))}function Ph(n,e,t){const i=bl("a",n),s=bl("b",e),r=[],a=[];let o=0;r.push({t:o,kind:"start",side:"a",maxHp:i.maxHp,name:i.name,emoji:i.emoji,partEmojis:i.partEmojis,genome:i.genome}),r.push({t:o,kind:"start",side:"b",maxHp:s.maxHp,name:s.name,emoji:s.emoji,partEmojis:s.partEmojis,genome:s.genome});const l=(h,d)=>{const u=h.abilities.map(g=>dr[g]).filter(g=>h.energy>=g.cost).sort((g,v)=>v.cost-g.cost);if(u.length===0)return!1;const f=u[0];return h.energy-=f.cost,Xd(f.id,h,d,r,a,o),!0};for(;i.hp>0&&s.hp>0&&o<Gd;){o++;for(const h of[i,s])if(h.energy+=h.energyRegen,h.armorTicks>0&&h.armorTicks--,h.frenzyTicks>0&&h.frenzyTicks--,h.slowTicks>0&&h.slowTicks--,h.poison.length>0){let d=0;for(const u of h.poison)d+=u.dmg,u.ticks--;h.poison=h.poison.filter(u=>u.ticks>0),d>0&&(h.hp-=d,r.push({t:o,kind:"poison",on:h.side,dmg:d,hp:Math.max(0,Math.round(h.hp))}))}if(i.hp<=0||s.hp<=0)break;for(const[h,d]of[[i,s],[s,i]])if(!(h.hp<=0||d.hp<=0)&&(l(h,d),!(d.hp<=0)&&(h.attackMeter+=Vd(h),h.attackMeter>=Ml))){h.attackMeter-=Ml;const u=Ao(t,.08);let f=Wd(h,d);u&&(f=Math.round(f*1.5)),d.hp-=f,r.push({t:o,kind:"attack",by:h.side,dmg:f,crit:u,targetHp:Math.max(0,Math.round(d.hp)),typeMultiplier:Ch(h.genome.body??"",d.genome.body??"")})}}let c;if(i.hp<=0&&s.hp<=0)c="draw";else if(s.hp<=0)c="a",r.push({t:o,kind:"death",side:"b"});else if(i.hp<=0)c="b",r.push({t:o,kind:"death",side:"a"});else{const h=i.hp/i.maxHp,d=s.hp/s.maxHp;c=h===d?"draw":h>d?"a":"b"}return a.push(`Winner: ${c} after ${o} ticks (A ${Math.max(0,Math.round(i.hp))}/${i.maxHp}, B ${Math.max(0,Math.round(s.hp))}/${s.maxHp})`),{winner:c,ticks:o,events:r,log:a}}function Xd(n,e,t,i,s,r,a){switch(n){case"venom":{const o=Math.max(1,Math.round(e.attack*.3));t.poison.push({dmg:o,ticks:5}),i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))}),s.push(`${e.name} envenoms ${t.name} (${o}/tick)`);break}case"regenerate":{const o=Math.round(e.maxHp*.18);e.hp=Math.min(e.maxHp,e.hp+o),i.push({t:r,kind:"heal",on:e.side,amount:o,hp:Math.round(e.hp)});break}case"spit":{const o=Math.max(1,Math.round(e.attack*.9-t.defense*.2));t.hp-=o,i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))});break}case"charge":{const o=Math.max(1,Math.round(e.attack*1.8-wo(t)*.4));t.hp-=o,i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))});break}case"armor":{e.armorTicks=Math.max(e.armorTicks,35),i.push({t:r,kind:"ability",by:e.side,ability:n,value:35,targetHp:Math.round(e.hp)});break}case"frenzy":{e.frenzyTicks=Math.max(e.frenzyTicks,45),i.push({t:r,kind:"ability",by:e.side,ability:n,value:45,targetHp:Math.round(e.hp)});break}case"shock":{const o=Math.max(1,Math.round(e.attack*.7));t.hp-=o,t.slowTicks=Math.max(t.slowTicks,25),i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))});break}case"leech":{const o=Math.max(1,Math.round(e.attack*1.1-wo(t)*.4));t.hp-=o;const l=Math.round(o*.5);e.hp=Math.min(e.maxHp,e.hp+l),i.push({t:r,kind:"ability",by:e.side,ability:n,value:o,targetHp:Math.max(0,Math.round(t.hp))}),i.push({t:r,kind:"heal",on:e.side,amount:l,hp:Math.round(e.hp)});break}}}const zt=[{id:"ant",name:"Ant",emoji:"🐜",tier:1,parts:{head:{stats:{attack:6,energy:4},ability:"venom"},body:{stats:{health:18,defense:4}},forelimbs:{stats:{attack:5}},hindlimbs:{stats:{speed:6},trait:"swift"},tail:{stats:{energy:6}}}},{id:"rabbit",name:"Rabbit",emoji:"🐇",tier:1,parts:{head:{stats:{attack:5,energy:7},trait:"keenSenses"},body:{stats:{health:24,speed:3}},forelimbs:{stats:{attack:7}},hindlimbs:{stats:{speed:10},ability:"frenzy",trait:"swift"},tail:{stats:{speed:4}}}},{id:"crab",name:"Crab",emoji:"🦀",tier:1,parts:{head:{stats:{defense:4}},body:{stats:{health:26,defense:8},trait:"thickHide"},forelimbs:{stats:{attack:9,defense:2},ability:"charge"},hindlimbs:{stats:{speed:2}},tail:{stats:{defense:4}}}},{id:"gecko",name:"Gecko",emoji:"🦎",tier:1,parts:{head:{stats:{attack:7,energy:7},ability:"spit"},body:{stats:{health:22,defense:3},ability:"regenerate"},forelimbs:{stats:{attack:8}},hindlimbs:{stats:{speed:8}},tail:{stats:{energy:6},ability:"regenerate"}}},{id:"boar",name:"Boar",emoji:"🐗",tier:1,parts:{head:{stats:{attack:7},ability:"charge"},body:{stats:{health:25,defense:5},trait:"hardy"},forelimbs:{stats:{attack:6}},hindlimbs:{stats:{speed:5}},tail:{stats:{health:6}}}},{id:"wolf",name:"Wolf",emoji:"🐺",tier:2,parts:{head:{stats:{attack:11,energy:4},ability:"leech",trait:"predator"},body:{stats:{health:34,defense:6}},forelimbs:{stats:{attack:10}},hindlimbs:{stats:{speed:11},trait:"swift"},tail:{stats:{speed:5}}}},{id:"cobra",name:"Cobra",emoji:"🐍",tier:2,parts:{head:{stats:{attack:9,energy:8},ability:"venom"},body:{stats:{health:28,defense:4}},forelimbs:{stats:{attack:6}},hindlimbs:{stats:{speed:8}},tail:{stats:{attack:7,energy:4},ability:"venom"}}},{id:"scorpion",name:"Scorpion",emoji:"🦂",tier:2,parts:{head:{stats:{attack:8,defense:3}},body:{stats:{health:30,defense:9},trait:"thickHide"},forelimbs:{stats:{attack:12,energy:4},ability:"venom"},hindlimbs:{stats:{speed:6}},tail:{stats:{attack:10,energy:6},ability:"venom",trait:"predator"}}},{id:"eagle",name:"Eagle",emoji:"🦅",tier:2,parts:{head:{stats:{attack:12,energy:6},trait:"keenSenses"},body:{stats:{health:26,speed:6}},forelimbs:{stats:{attack:9,speed:4},ability:"spit"},hindlimbs:{stats:{speed:13},trait:"swift"},tail:{stats:{speed:7}}}},{id:"gorilla",name:"Gorilla",emoji:"🦍",tier:2,parts:{head:{stats:{attack:10,defense:4}},body:{stats:{health:44,defense:8},trait:"hardy"},forelimbs:{stats:{attack:15},ability:"frenzy",trait:"predator"},hindlimbs:{stats:{speed:6}},tail:{stats:{health:10}}}},{id:"bear",name:"Bear",emoji:"🐻",tier:3,parts:{head:{stats:{attack:14,defense:4},ability:"frenzy"},body:{stats:{health:56,defense:10},trait:"hardy"},forelimbs:{stats:{attack:18},ability:"charge",trait:"predator"},hindlimbs:{stats:{speed:7}},tail:{stats:{health:12}}}},{id:"rhino",name:"Rhino",emoji:"🦏",tier:3,parts:{head:{stats:{attack:16,defense:6},ability:"charge"},body:{stats:{health:64,defense:16},trait:"thickHide",ability:"armor"},forelimbs:{stats:{attack:12}},hindlimbs:{stats:{speed:8}},tail:{stats:{defense:6}}}},{id:"eel",name:"Electric Eel",emoji:"🐡",tier:3,parts:{head:{stats:{attack:12,energy:10},ability:"shock"},body:{stats:{health:32,defense:5},ability:"shock"},forelimbs:{stats:{attack:8,energy:6}},hindlimbs:{stats:{speed:10},trait:"swift"},tail:{stats:{attack:10,energy:8},ability:"shock",trait:"keenSenses"}}},{id:"tiger",name:"Tiger",emoji:"🐅",tier:3,parts:{head:{stats:{attack:15,energy:6},ability:"leech",trait:"predator"},body:{stats:{health:46,defense:8}},forelimbs:{stats:{attack:14},ability:"frenzy"},hindlimbs:{stats:{speed:12},trait:"swift"},tail:{stats:{speed:8}}}},{id:"dragon",name:"Dragon",emoji:"🐉",tier:3,parts:{head:{stats:{attack:14,energy:8},ability:"spit",trait:"predator"},body:{stats:{health:52,defense:8},ability:"frenzy",trait:"hardy"},forelimbs:{stats:{attack:12,energy:5},ability:"charge"},hindlimbs:{stats:{speed:8}},tail:{stats:{attack:10,energy:6},ability:"shock"}}},{id:"jellyfish",name:"Jellyfish",emoji:"🪼",tier:3,parts:{head:{stats:{attack:10,energy:14},ability:"shock",trait:"keenSenses"},body:{stats:{health:38,defense:6},ability:"regenerate"},forelimbs:{stats:{attack:8,energy:8},ability:"leech"},hindlimbs:{stats:{speed:9},trait:"swift"},tail:{stats:{energy:10},ability:"venom"}}},{id:"panther",name:"Panther",emoji:"🐆",tier:2,parts:{head:{stats:{attack:13,energy:5},ability:"leech",trait:"predator"},body:{stats:{health:32,defense:5}},forelimbs:{stats:{attack:11},ability:"frenzy"},hindlimbs:{stats:{speed:14},trait:"swift"},tail:{stats:{speed:6}}}},{id:"mantis",name:"Mantis",emoji:"🦗",tier:2,parts:{head:{stats:{attack:11,energy:6},trait:"keenSenses"},body:{stats:{health:22,defense:4}},forelimbs:{stats:{attack:14,energy:5},ability:"charge"},hindlimbs:{stats:{speed:10},trait:"swift"},tail:{stats:{attack:6}}}}],qd=Object.fromEntries(zt.map(n=>[n.id,n]));function Ss(n){const e=qd[n];if(!e)throw new Error(`Unknown animal id: ${n}`);return e}const jd=.12;function Yd(n,e,t,i={}){const s=i.mutationRate??jd,r=i.pool??zt.map(o=>o.id),a={};for(const o of yi)Ao(t,s)?a[o]=wh(t,r):a[o]=Ao(t,.5)?n[o]:e[o];return a}function oa(n,e=zt.map(t=>t.id)){const t={};for(const i of yi)t[i]=wh(n,e);return t}function Hi(n,e){const t={...zd},i=new Set,s=new Set;for(const a of yi){const l=Ss(n[a]).parts[a];for(const c of Object.keys(l.stats))t[c]+=l.stats[c]??0;l.ability&&i.add(l.ability),l.trait&&s.add(l.trait)}s.has("thickHide")&&(t.defense=Math.round(t.defense*1.2)),s.has("swift")&&(t.speed=Math.round(t.speed*1.15)),s.has("predator")&&(t.attack=Math.round(t.attack*1.15)),s.has("hardy")&&(t.health=Math.round(t.health*1.15));const r=yi.reduce((a,o)=>(a[o]=Ss(n[o]).emoji,a),{});return{name:e??$d(n),genome:n,emoji:Ss(n.head).emoji,partEmojis:r,stats:t,abilities:[...i],traits:[...s]}}function $d(n){const e=Ss(n.head).name,t=Ss(n.body).name,i=e.slice(0,Math.ceil(e.length/2)),s=t.slice(Math.floor(t.length/2)),r=(i+s).toLowerCase();return r.charAt(0).toUpperCase()+r.slice(1)}function Fn(n){const e=n.stats;return Math.round(e.health*.5+e.attack*2+e.defense*1.5+e.speed*1+e.energy*.4+n.abilities.length*6+n.traits.length*4)}function ya(n){return yi.reduce((e,t)=>(e[t]=n,e),{})}function Kd(n){return{head:"Head",body:"Body",forelimbs:"Forelimbs",hindlimbs:"Hindlimbs",tail:"Tail"}[n]}function Lh(n,e,t){const i=zi(t^2654435769),s=e<3?1:e<7?2:3,r=zt.filter(h=>h.tier<=s).map(h=>h.id),a=Fn(n)*(.85+Math.min(e,12)*.02);let o=oa(i,r),l=1/0;for(let h=0;h<12;h++){const d=oa(i,r),u=Math.abs(Fn(Hi(d))-a);u<l&&(l=u,o=d)}const c=Hi(o);return{...c,name:Jd(i,c.name)}}function Jd(n,e){const t=["Wild","Feral","Rogue","Alpha","Ravenous","Ancient","Savage"];return`${t[Math.floor(n()*t.length)]} ${e}`}const Ih="imaginary-creatures.save.v1",la=["ant","rabbit","crab","gecko","boar"],Zd=zt.filter(n=>!la.includes(n.id)).sort((n,e)=>n.tier-e.tier).map(n=>n.id);function Qd(n){return zt.filter(e=>e.tier<=n).map(e=>e.id)}function Ro(n=1,e){const t=n===1?[...la]:Qd(n),i=t[t.length-1]??"boar";return{unlocked:t,player:ya(i),wins:0,losses:0,streak:0,seed:Rh(),muted:e?.muted??!1,roster:[],battleSpeed:e?.battleSpeed??"normal",showOpponent:e?.showOpponent??!0,achievements:[]}}function eu(){try{const n=localStorage.getItem(Ih);if(!n)return Ro();const e=JSON.parse(n),t=new Set(zt.map(r=>r.id)),i=(e.unlocked??la).filter(r=>t.has(r)),s=nu(e.player,i);return{unlocked:i.length?i:[...la],player:s,wins:e.wins??0,losses:e.losses??0,streak:e.streak??0,seed:e.seed??Rh(),muted:e.muted??!1,roster:tu(e.roster,t),battleSpeed:["slow","normal","fast","instant"].includes(e.battleSpeed)?e.battleSpeed:"normal",showOpponent:e.showOpponent??!0,achievements:e.achievements??[]}}catch{return Ro()}}function tu(n,e){return Array.isArray(n)?n.filter(t=>t&&typeof t.name=="string"&&t.genome&&["head","body","forelimbs","hindlimbs","tail"].every(i=>e.has(t.genome[i]))):[]}function In(n){try{localStorage.setItem(Ih,JSON.stringify(n))}catch{}}function nu(n,e){const t=e[0]??"boar",i=ya(t);if(!n)return i;const s=new Set(e);return{head:s.has(n.head??"")?n.head:t,body:s.has(n.body??"")?n.body:t,forelimbs:s.has(n.forelimbs??"")?n.forelimbs:t,hindlimbs:s.has(n.hindlimbs??"")?n.hindlimbs:t,tail:s.has(n.tail??"")?n.tail:t}}function iu(n){for(const e of Zd)if(!n.unlocked.includes(e))return n.unlocked.push(e),e;return null}const su=6;function ca(n){return yi.map(e=>n[e]).join("|")}function ru(n,e){const t=ca(e.genome),i=n.filter(s=>ca(s.genome)!==t);return[e,...i].slice(0,su)}function au(n,e){return n.filter((t,i)=>i!==e)}function ou(n,e){const t=ca(e);return n.some(i=>ca(i.genome)===t)}function B(n,e={},t=[]){const i=document.createElement(n);for(const[s,r]of Object.entries(e))r===void 0||r===!1||(s==="class"?i.className=String(r):s.startsWith("on")&&typeof r=="function"?i.addEventListener(s.slice(2).toLowerCase(),r):s==="html"?i.innerHTML=String(r):i.setAttribute(s,String(r)));for(const s of t)i.append(typeof s=="string"?document.createTextNode(s):s);return i}function yr(n){n.replaceChildren()}function lu(n){return{health:"#6ce5b1",attack:"#ff8f6b",defense:"#7aa2ff",speed:"#ffce6b",energy:"#c39bff"}[n]??"#9aa7c4"}const dn={ant:{fill:"#2a1205",shade:"#120800",accent:"#d43010"},rabbit:{fill:"#f0e6dc",shade:"#b89888",accent:"#ff8898"},crab:{fill:"#d44018",shade:"#922808",accent:"#f8a040"},gecko:{fill:"#4a8c20",shade:"#2a5010",accent:"#a8e030"},boar:{fill:"#5c3820",shade:"#301808",accent:"#c09048"},wolf:{fill:"#888070",shade:"#484038",accent:"#d8ccc0"},cobra:{fill:"#2a6c14",shade:"#184008",accent:"#e8d020"},scorpion:{fill:"#8c7410",shade:"#504000",accent:"#f0c020"},eagle:{fill:"#5a380c",shade:"#2c1808",accent:"#f8f0d0"},gorilla:{fill:"#1c1c14",shade:"#080808",accent:"#706858"},bear:{fill:"#5c2c0c",shade:"#2c1408",accent:"#c08040"},rhino:{fill:"#707060",shade:"#3c3c30",accent:"#c0b898"},eel:{fill:"#106050",shade:"#083028",accent:"#50e8d0"},tiger:{fill:"#c86008",shade:"#6c2e00",accent:"#f0a828"},dragon:{fill:"#7c1010",shade:"#3c0808",accent:"#ff6030"},jellyfish:{fill:"#3c1870",shade:"#1c0840",accent:"#b060ff"},panther:{fill:"#1a1a2e",shade:"#0d0d18",accent:"#9060e0"},mantis:{fill:"#3a7c20",shade:"#1e4410",accent:"#a0e840"}};function cu(n){const e=n.replace("#",""),t=parseInt(e.length===3?e.split("").map(i=>i+i).join(""):e,16);return[t>>16&255,t>>8&255,t&255]}function Na(n,e){const[t,i,s]=cu(n),r=e<0?0:255,a=Math.abs(e),o=l=>Math.round(l+(r-l)*a);return`rgb(${o(t)},${o(i)},${o(s)})`}function yt(n,e,t,i,s,r){const a=e-i*.42,o=t-i*.42,l=n.createRadialGradient(a,o,i*.04,e,t,i*1.06);return l.addColorStop(0,Na(s,.55)),l.addColorStop(.22,Na(s,.16)),l.addColorStop(.62,s),l.addColorStop(.88,r),l.addColorStop(1,Na(r,-.35)),l}function tt(n,e,t,i,s,r=0){n.beginPath(),n.ellipse(e,t,i,s,r,0,Math.PI*2)}function Dh(n,e,t,i){const s=dn[e]??dn.boar;switch(n.save(),e){case"ant":hu(n,s,t);break;case"rabbit":du(n,s,i);break;case"crab":uu(n,s,i);break;case"gecko":fu(n,s);break;case"boar":Sl(n,s,i);break;case"wolf":pu(n,s,i);break;case"cobra":mu(n,s,t);break;case"scorpion":gu(n,s);break;case"eagle":_u(n,s,i);break;case"gorilla":vu(n,s,i);break;case"bear":yu(n,s);break;case"rhino":Mu(n,s);break;case"eel":bu(n,s,i);break;case"tiger":Su(n,s,i);break;default:Sl(n,s,i)}n.restore()}function Os(n,e,t=22,i=20){tt(n,0,0,t,i),n.fillStyle=yt(n,0,0,t,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke()}function en(n,e,t,i,s){n.fillStyle=s,n.beginPath(),n.arc(e,t,i,0,Math.PI*2),n.fill(),n.fillStyle="#000",n.beginPath(),n.arc(e+1,t,i*.55,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.6)",n.beginPath(),n.arc(e-i*.3,t-i*.3,i*.3,0,Math.PI*2),n.fill()}function hu(n,e,t){Os(n,e,18,16),en(n,10,-7,4,e.accent),n.strokeStyle=e.shade,n.lineWidth=2.5,n.beginPath(),n.moveTo(14,-4),n.quadraticCurveTo(26,-1,24,8),n.stroke(),n.beginPath(),n.moveTo(14,4),n.quadraticCurveTo(26,1,24,-8),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=1.5;const i=Math.sin(t)*5;n.beginPath(),n.moveTo(-3,-16),n.quadraticCurveTo(-14,-34+i,-20,-44+i*.5),n.stroke(),n.beginPath(),n.moveTo(4,-16),n.quadraticCurveTo(-6,-36-i,-12,-44-i*.5),n.stroke(),n.fillStyle=e.accent,n.beginPath(),n.arc(-20,-44+i*.5,2.5,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(-12,-44-i*.5,2.5,0,Math.PI*2),n.fill()}function du(n,e,t){n.fillStyle=yt(n,-10,-34,18,e.fill,e.shade),tt(n,-10,-34,7,18,-.2),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,tt(n,-10,-34,4,13,-.2),n.fill(),Os(n,e,20,18),en(n,12,-6,5,e.accent),n.fillStyle=e.accent,n.beginPath(),n.arc(18+t*4,3,3,0,Math.PI*2),n.fill()}function uu(n,e,t){tt(n,0,0,28,16),n.fillStyle=yt(n,0,0,28,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(-12,-14),n.lineTo(-14,-24-t*4),n.stroke(),n.beginPath(),n.moveTo(12,-14),n.lineTo(14,-24-t*4),n.stroke(),en(n,-14,-26-t*4,4,e.accent),en(n,14,-26-t*4,4,e.accent),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(22,-4),n.quadraticCurveTo(34,0,32,8),n.stroke(),n.beginPath(),n.moveTo(22,4),n.quadraticCurveTo(34,0,32,-8),n.stroke()}function fu(n,e){tt(n,2,0,26,14,0),n.fillStyle=yt(n,2,0,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),en(n,14,-6,6,e.accent),n.fillStyle=e.accent,n.globalAlpha=.5,[[-6,-4],[-12,2],[-4,6]].forEach(([t,i])=>{n.beginPath(),n.arc(t,i,2.5,0,Math.PI*2),n.fill()}),n.globalAlpha=1}function Sl(n,e,t){n.fillStyle=e.shade,tt(n,-14,-20,7,9,-.3),n.fill(),n.fillStyle=e.accent,tt(n,-14,-20,4,6,-.3),n.fill(),Os(n,e,22,20),en(n,8,-8,4,"#f0e000"),tt(n,18,4,10,8),n.fillStyle=e.shade,n.fill(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.stroke(),n.strokeStyle="#e0d8b0",n.lineWidth=3,n.beginPath(),n.moveTo(14,8+t*2),n.quadraticCurveTo(28,14,26,22),n.stroke(),n.beginPath(),n.moveTo(14,-8-t*2),n.quadraticCurveTo(28,-14,26,-22),n.stroke()}function pu(n,e,t){n.fillStyle=e.fill,n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(-12,-18),n.lineTo(-6,-36),n.lineTo(4,-18),n.closePath(),n.fill(),n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.6,n.beginPath(),n.moveTo(-10,-20),n.lineTo(-6,-32),n.lineTo(2,-20),n.closePath(),n.fill(),n.globalAlpha=1,tt(n,4,0,26,18),n.fillStyle=yt(n,4,0,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),en(n,14,-8,5,"#f0d040"),tt(n,20,4,10,8),n.fillStyle=e.shade,n.fill(),t>.3&&(n.strokeStyle="#f0e0c0",n.lineWidth=2,n.beginPath(),n.moveTo(12,6),n.lineTo(26+t*4,6+t*10),n.stroke())}function mu(n,e,t){n.fillStyle=yt(n,0,0,32,e.fill,e.shade),n.beginPath(),n.ellipse(0,0,32,26,0,Math.PI*.15,Math.PI*.85),n.quadraticCurveTo(-10,14,0,20),n.quadraticCurveTo(10,14,0,0),n.closePath(),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.6,n.beginPath(),n.ellipse(0,-4,18,14,0,Math.PI*.2,Math.PI*.8),n.stroke(),n.globalAlpha=1,tt(n,6,2,14,10),n.fillStyle=e.fill,n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),en(n,12,-4,4,e.accent);const i=Math.sin(t*4)*3;n.strokeStyle="#e02020",n.lineWidth=1.5,n.beginPath(),n.moveTo(18,4),n.lineTo(26,4+i),n.moveTo(26,4+i),n.lineTo(30,2+i),n.moveTo(26,4+i),n.lineTo(30,6+i),n.stroke()}function gu(n,e){tt(n,0,0,20,14),n.fillStyle=yt(n,0,0,20,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),en(n,12,-6,3,e.accent),en(n,6,-10,2.5,e.accent),n.strokeStyle=e.shade,n.lineWidth=2.5,n.beginPath(),n.moveTo(16,-4),n.quadraticCurveTo(28,-2,26,6),n.stroke(),n.beginPath(),n.moveTo(16,4),n.quadraticCurveTo(28,2,26,-6),n.stroke()}function _u(n,e,t){tt(n,0,0,22,20),n.fillStyle=yt(n,0,0,22,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.7,tt(n,2,-2,16,12),n.fill(),n.globalAlpha=1,en(n,10,-6,5,e.accent),n.fillStyle="#e0b020",n.strokeStyle="#a07010",n.lineWidth=2,n.beginPath(),n.moveTo(16,-2),n.lineTo(34+t*5,-1+t*3),n.lineTo(32+t*5,8+t*4),n.lineTo(18,6),n.closePath(),n.fill(),n.stroke()}function vu(n,e,t){Os(n,e,24,22),n.fillStyle=e.shade,tt(n,0,-14,20,6),n.fill(),en(n,10,-8,4.5,"#b06030"),tt(n,12,6,9,7),n.fillStyle=e.shade,n.fill(),t>.3&&(n.strokeStyle="#e05020",n.lineWidth=3,n.beginPath(),n.arc(12,8+t*4,6,.1,Math.PI-.1),n.stroke())}function yu(n,e){n.fillStyle=e.shade,tt(n,-14,-18,9,8),n.fill(),n.fillStyle=e.fill,tt(n,-14,-18,6,5),n.fill(),Os(n,e,24,22),en(n,10,-7,4.5,"#2a1c08"),tt(n,16,6,10,8),n.fillStyle=e.shade,n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke()}function Mu(n,e){tt(n,0,2,26,22),n.fillStyle=yt(n,0,0,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.5,[[-16,-12,-10,-8],[-6,-18,0,-14]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.quadraticCurveTo((t+s)/2,(i+r)/2-4,s,r),n.stroke()}),n.globalAlpha=1,n.fillStyle=e.shade,n.beginPath(),n.moveTo(14,-14),n.lineTo(22,-36),n.lineTo(28,-14),n.closePath(),n.fill(),en(n,10,-4,4,e.accent)}function bu(n,e,t){tt(n,4,0,24,12),n.fillStyle=yt(n,4,0,24,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.7,[-8,-4,0].forEach(i=>{n.beginPath(),n.moveTo(i,-10),n.lineTo(i,10),n.stroke()}),n.globalAlpha=1,en(n,14,-5,4,e.accent),n.fillStyle=t>.2?"#400820":e.shade,n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(20,-4),n.lineTo(36+t*8,-4+t*6),n.lineTo(36+t*8,4-t*6),n.lineTo(20,4),n.closePath(),n.fill(),n.stroke()}function Su(n,e,t){n.fillStyle=e.fill,n.strokeStyle=e.shade,n.lineWidth=2,tt(n,-14,-18,7,7),n.fill(),n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.5,tt(n,-14,-18,4,4),n.fill(),n.globalAlpha=1,Os(n,e,22,20),n.strokeStyle="#1c0c00",n.lineWidth=3,n.globalAlpha=.6,[[-8,-18,-4,6],[0,-20,4,4],[8,-18,12,6]].forEach(([i,s,r,a])=>{n.beginPath(),n.moveTo(i,s),n.lineTo(r,a),n.stroke()}),n.globalAlpha=1,en(n,10,-7,5,"#f0c040"),tt(n,16,4,8,7),n.fillStyle=e.shade,n.fill(),t>.2&&(n.strokeStyle="#f8e8d0",n.lineWidth=2,n.beginPath(),n.moveTo(10,6),n.lineTo(24+t*4,6+t*8),n.stroke())}function Nh(n,e,t){const i=dn[e]??dn.boar;switch(n.save(),e){case"ant":Tu(n,i);break;case"rabbit":xu(n,i,t);break;case"crab":Eu(n,i);break;case"gecko":Au(n,i,t);break;case"boar":Tl(n,i,t);break;case"wolf":wu(n,i,t);break;case"cobra":Ru(n,i,t);break;case"scorpion":Cu(n,i);break;case"eagle":Pu(n,i,t);break;case"gorilla":Lu(n,i,t);break;case"bear":Iu(n,i,t);break;case"rhino":Du(n,i);break;case"eel":Nu(n,i,t);break;case"tiger":Uu(n,i,t);break;default:Tl(n,i,t)}n.restore()}function Tu(n,e){tt(n,10,0,14,12),n.fillStyle=yt(n,10,0,14,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),tt(n,-12,4,18,14),n.fillStyle=yt(n,-12,4,18,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.6,n.beginPath(),n.ellipse(-12,4,14,10,0,0,Math.PI*2),n.stroke(),n.globalAlpha=1}function xu(n,e,t){const i=1+t*.02,s=1-t*.01;n.scale(i,s),tt(n,0,0,24,22),n.fillStyle=yt(n,0,0,24,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke()}function Eu(n,e){tt(n,0,0,30,20),n.fillStyle=yt(n,0,0,30,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.globalAlpha=.5,[[-16,0,-10,-16],[0,-4,0,-18],[16,0,10,-16]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke()}),n.globalAlpha=1}function Au(n,e,t){n.scale(1+t*.015,1),tt(n,0,0,20,14),n.fillStyle=yt(n,0,0,20,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.4,[-12,-4,4,12].forEach(i=>{n.beginPath(),n.arc(i,0,3,0,Math.PI*2),n.fill()}),n.globalAlpha=1}function Tl(n,e,t){n.scale(1+t*.02,1+t*.01),tt(n,0,2,26,22),n.fillStyle=yt(n,0,2,26,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.5,[-14,-6,2,10,18].forEach(i=>{n.beginPath(),n.moveTo(i,-20),n.lineTo(i-1,-28),n.stroke()}),n.globalAlpha=1}function wu(n,e,t){n.scale(1+t*.018,1),tt(n,0,0,22,18),n.fillStyle=yt(n,0,0,22,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.25,tt(n,6,4,10,8),n.fill(),n.globalAlpha=1}function Ru(n,e,t){n.strokeStyle=yt(n,0,4,20,e.fill,e.shade),n.lineWidth=14+t*2,n.lineCap="round",n.beginPath(),n.moveTo(20,-10),n.bezierCurveTo(28,0,20,14,0,12),n.bezierCurveTo(-20,10,-24,-4,-16,-10),n.bezierCurveTo(-8,-16,8,-8,8,4),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(20,-10),n.bezierCurveTo(28,0,20,14,0,12),n.bezierCurveTo(-20,10,-24,-4,-16,-10),n.stroke()}function Cu(n,e){tt(n,4,0,18,12),n.fillStyle=yt(n,4,0,18,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.6,[-8,-2,4,10].forEach(t=>{n.beginPath(),n.moveTo(t,-10),n.lineTo(t,10),n.stroke()}),n.globalAlpha=1}function Pu(n,e,t){n.scale(1+t*.015,1),tt(n,0,0,22,20),n.fillStyle=yt(n,0,0,22,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.35,tt(n,4,4,12,10),n.fill(),n.globalAlpha=1,n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.35,[[-16,-10,-8,6],[-8,-14,0,8],[0,-16,8,8]].forEach(([i,s,r,a])=>{n.beginPath(),n.moveTo(i,s),n.lineTo(r,a),n.stroke()}),n.globalAlpha=1}function Lu(n,e,t){n.scale(1+t*.025,1+t*.015),tt(n,0,0,30,26),n.fillStyle=yt(n,0,0,30,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=3,n.stroke(),n.fillStyle=e.accent,n.globalAlpha=.2,tt(n,4,6,14,12),n.fill(),n.globalAlpha=1}function Iu(n,e,t){n.scale(1+t*.022,1+t*.012),tt(n,0,2,28,26),n.fillStyle=yt(n,0,2,28,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2.5,n.stroke()}function Du(n,e){tt(n,0,2,32,24),n.fillStyle=yt(n,0,2,32,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=3,n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.globalAlpha=.4,[[-20,-14,-24,6],[0,-18,-4,8],[18,-14,20,6]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke()}),n.globalAlpha=1}function Nu(n,e,t){n.strokeStyle=yt(n,0,0,20,e.fill,e.shade),n.lineWidth=18+t*2,n.lineCap="round",n.beginPath(),n.moveTo(22,-6),n.bezierCurveTo(10,-4,-10,4,-24,2),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(22,-6),n.bezierCurveTo(10,-4,-10,4,-24,2),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.6,n.beginPath(),n.moveTo(22,-6),n.bezierCurveTo(10,0,-10,8,-24,6),n.stroke(),n.globalAlpha=1}function Uu(n,e,t){n.scale(1+t*.018,1),tt(n,0,0,24,20),n.fillStyle=yt(n,0,0,24,e.fill,e.shade),n.fill(),n.strokeStyle=e.shade,n.lineWidth=2,n.stroke(),n.strokeStyle="#1c0c00",n.lineWidth=3,n.globalAlpha=.55,[[-14,-18,-10,14],[-4,-20,0,16],[6,-18,10,14],[16,-14,20,10]].forEach(([i,s,r,a])=>{n.beginPath(),n.moveTo(i,s),n.lineTo(r,a),n.stroke()}),n.globalAlpha=1}function Uh(n,e,t){const i=dn[e]??dn.boar;switch(n.save(),e){case"ant":case"scorpion":Bu(n,i,3,t);break;case"crab":ku(n,i,t);break;case"eagle":Fu(n,i,t);break;case"cobra":case"eel":zu(n,i);break;default:Ou(n,i,e,t);break}n.restore()}function Ou(n,e,t,i){const s=["gorilla","bear","rhino"].includes(t),r=s?9:7,a=s?28:22;if(n.strokeStyle=e.shade,n.lineWidth=r*2,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(a*.5,a*.6-i*6),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=r*2-3,n.beginPath(),n.moveTo(0,0),n.lineTo(a*.5,a*.6-i*6),n.stroke(),n.fillStyle=e.shade,n.beginPath(),n.arc(a*.5,a*.6-i*6,r+1,0,Math.PI*2),n.fill(),n.fillStyle=e.fill,n.beginPath(),n.arc(a*.5,a*.6-i*6,r,0,Math.PI*2),n.fill(),["wolf","tiger","gecko","gorilla","bear","eagle"].includes(t)){n.strokeStyle="#d8c8a0",n.lineWidth=1.5;const o=a*.5,l=a*.6-i*6;[-6,0,6].forEach(c=>{n.beginPath(),n.moveTo(o+c,l+r),n.lineTo(o+c*.6,l+r+8),n.stroke()})}}function ku(n,e,t){n.strokeStyle=e.shade,n.lineWidth=10,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(18,18),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=7,n.beginPath(),n.moveTo(0,0),n.lineTo(18,18),n.stroke(),n.fillStyle=yt(n,20,20,14,e.fill,e.shade),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(14,14),n.lineTo(34+t*8,8-t*4),n.lineTo(34+t*8,16-t*2),n.closePath(),n.fill(),n.stroke(),n.beginPath(),n.moveTo(14,14),n.lineTo(28+t*6,22+t*4),n.lineTo(26+t*5,14+t),n.closePath(),n.fill(),n.stroke()}function Fu(n,e,t){const i=1+t*.4;n.fillStyle=yt(n,0,0,30,e.fill,e.shade),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-10,-20*i,-30,-28*i,-40,-20*i),n.quadraticCurveTo(-28,-8,0,12),n.closePath(),n.fill(),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=1.5,n.globalAlpha=.4,[[-10,-6],[-20,-10],[-30,-12]].forEach(([s,r])=>{n.beginPath(),n.moveTo(0,4),n.lineTo(s,r*i),n.stroke()}),n.globalAlpha=1}function Bu(n,e,t,i){n.strokeStyle=e.shade,n.lineWidth=3,n.lineCap="round";for(let s=0;s<t;s++){const r=s/(t-1)*.8+.1,a=8+s*8,o=-8+r*20;n.beginPath(),n.moveTo(s*4-4,0),n.quadraticCurveTo(a+i*6,o,a+12+i*8,o+16),n.stroke()}}function zu(n,e){n.fillStyle=e.shade,n.globalAlpha=.5,n.beginPath(),n.arc(0,0,8,0,Math.PI*2),n.fill(),n.globalAlpha=1}function Oh(n,e,t){const i=dn[e]??dn.boar;switch(n.save(),e){case"ant":case"scorpion":Xu(n,i,3,t);break;case"crab":Wu(n,i);break;case"cobra":case"eel":qu(n);break;case"eagle":Vu(n,i,t);break;case"rhino":case"boar":Gu(n,i,t);break;default:Hu(n,i,e,t);break}n.restore()}function Hu(n,e,t,i){const r=["gorilla","bear"].includes(t)?10:8;n.strokeStyle=e.shade,n.lineWidth=r*2,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(-6-i*6,20+i*4),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=r*2-4,n.beginPath(),n.moveTo(0,0),n.lineTo(-6-i*6,20+i*4),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=r*1.5,n.lineCap="round",n.beginPath(),n.moveTo(-6-i*6,20+i*4),n.lineTo(-2,36),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=r*1.5-3,n.beginPath(),n.moveTo(-6-i*6,20+i*4),n.lineTo(-2,36),n.stroke(),n.fillStyle=e.shade,n.beginPath(),n.arc(-2,36,r,0,Math.PI*2),n.fill(),n.fillStyle=e.fill,n.beginPath(),n.arc(-2,36,r-2,0,Math.PI*2),n.fill()}function Gu(n,e,t){n.strokeStyle=e.shade,n.lineWidth=14,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(-4-t*5,22),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=10,n.beginPath(),n.moveTo(0,0),n.lineTo(-4-t*5,22),n.stroke(),n.fillStyle="#2a2010",n.beginPath(),n.ellipse(-4,30,9,7,.2,0,Math.PI*2),n.fill()}function Vu(n,e,t){n.strokeStyle=e.shade,n.lineWidth=10,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(-2-t*4,24),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=7,n.beginPath(),n.moveTo(0,0),n.lineTo(-2-t*4,24),n.stroke(),n.strokeStyle="#d0b030",n.lineWidth=2.5;const i=24;[[-10,32],[-2,36],[6,32]].forEach(([s,r])=>{n.beginPath(),n.moveTo(-2,i),n.lineTo(s,r+t*4),n.stroke()})}function Wu(n,e){n.strokeStyle=e.shade,n.lineWidth=5,n.lineCap="round",[[-12,16,-18,28],[-4,18,-6,32],[4,16,8,28]].forEach(([t,i,s,r])=>{n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=3,n.beginPath(),n.moveTo(t,i),n.lineTo(s,r),n.stroke(),n.strokeStyle=e.shade,n.lineWidth=5})}function Xu(n,e,t,i){n.strokeStyle=e.shade,n.lineWidth=3,n.lineCap="round";for(let s=0;s<t;s++)n.beginPath(),n.moveTo(-s*6,0),n.quadraticCurveTo(-8-s*4,14+i*4,-4-s*5,28),n.stroke()}function qu(n){n.globalAlpha=0,n.globalAlpha=1}function kh(n,e,t){const i=dn[e]??dn.boar;switch(n.save(),e){case"ant":Ua(n,i,t,"short");break;case"rabbit":ju(n,i);break;case"crab":break;case"gecko":$u(n,i,t);break;case"boar":Yu(n,i,t);break;case"wolf":xl(n,i,t);break;case"cobra":Ju(n,i,t);break;case"scorpion":Ku(n,i,t);break;case"eagle":Zu(n,i,t);break;case"gorilla":break;case"bear":break;case"rhino":Ua(n,i,t,"medium");break;case"eel":Qu(n,i,t);break;case"tiger":xl(n,i,t);break;default:Ua(n,i,t,"medium")}n.restore()}function Ua(n,e,t,i){const s=i==="short"?20:30,r=Math.sin(t)*6;n.strokeStyle=e.shade,n.lineWidth=5,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-s*.5,r,-s,r*.6),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=3,n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-s*.5,r,-s,r*.6),n.stroke()}function ju(n,e){n.fillStyle=e.accent,n.beginPath(),n.arc(-6,0,10,0,Math.PI*2),n.fill(),n.fillStyle="#fff",n.globalAlpha=.5,n.beginPath(),n.arc(-5,-2,7,0,Math.PI*2),n.fill(),n.globalAlpha=1}function xl(n,e,t){const i=Math.sin(t)*8;n.strokeStyle=e.shade,n.lineWidth=12,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-18,i,-30,i*1.2),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=9,n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-18,i,-30,i*1.2),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=5,n.globalAlpha=.4,n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(-18,i,-30,i*1.2),n.stroke(),n.globalAlpha=1}function Yu(n,e,t){const i=Math.sin(t)*3;n.strokeStyle=e.shade,n.lineWidth=7,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-8,-8+i,-18,-14+i,-20,-6+i),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=5,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-8,-8+i,-18,-14+i,-20,-6+i),n.stroke()}function $u(n,e,t){const i=Math.sin(t)*8;n.strokeStyle=e.shade,n.lineWidth=7,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i,-44,i*.5),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=5,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i,-44,i*.5),n.stroke()}function Ku(n,e,t){const i=Math.sin(t)*4;n.strokeStyle=e.shade,n.lineWidth=9,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-16,-4,-28,-24+i,-22,-38+i),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=7,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-16,-4,-28,-24+i,-22,-38+i),n.stroke(),n.fillStyle=e.accent,n.strokeStyle=e.shade,n.lineWidth=1.5,n.beginPath(),n.moveTo(-24,-38+i),n.lineTo(-18,-50+i),n.lineTo(-14,-38+i),n.closePath(),n.fill(),n.stroke()}function Ju(n,e,t){const i=Math.sin(t)*10;n.strokeStyle=e.shade,n.lineWidth=11,n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i*.6,-40,i*.4),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=8,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i,-28,-i*.6,-40,i*.4),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=2,n.globalAlpha=.5,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-12,i+2,-28,-i*.6+2,-40,i*.4+2),n.stroke(),n.globalAlpha=1}function Zu(n,e,t){const i=Math.sin(t)*4;[-20,-12,-4,4,12].forEach((s,r)=>{const a=r===2?32:26,o=(s+i)*Math.PI/180,l=-Math.cos(o)*a,c=Math.sin(o)*a;n.strokeStyle=e.shade,n.lineWidth=4+(r===2?2:0),n.lineCap="round",n.beginPath(),n.moveTo(0,0),n.lineTo(l,c),n.stroke(),n.strokeStyle=e.fill,n.lineWidth=2.5,n.beginPath(),n.moveTo(0,0),n.lineTo(l,c),n.stroke()}),n.fillStyle=e.fill,n.globalAlpha=.3,n.beginPath(),n.moveTo(0,0),[-20,-12,-4,4,12].forEach(s=>{const r=(s+i)*Math.PI/180;n.lineTo(-Math.cos(r)*28,Math.sin(r)*28)}),n.closePath(),n.fill(),n.globalAlpha=1}function Qu(n,e,t){const i=Math.sin(t)*6;n.fillStyle=yt(n,-16,i*.5,16,e.fill,e.shade),n.strokeStyle=e.shade,n.lineWidth=2,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(-10,-12+i,-28,-18+i*.6,-32,i*.4),n.bezierCurveTo(-28,18+i*.4,-10,12+i,0,0),n.closePath(),n.fill(),n.stroke(),n.strokeStyle=e.accent,n.lineWidth=1.5,n.globalAlpha=.4,[-10,-18,-26].forEach(s=>{n.beginPath(),n.moveTo(s,-8+i*.5),n.lineTo(s-4,8+i*.3),n.stroke()}),n.globalAlpha=1}const ef={health:90,attack:70,defense:50,speed:70,energy:50},tf=["health","attack","defense","speed","energy"];function Fh(n){const e=B("div",{class:"bars"},tf.map(l=>{const c=n.stats[l],h=Math.min(100,c/ef[l]*100);return B("div",{class:"bar"},[B("span",{},[l]),B("div",{class:"track"},[B("div",{class:"fill",style:`width:${h}%;background:${lu(l)}`})]),B("span",{class:"val"},[String(c)])])})),t=n.abilities.length>0?n.abilities.map(l=>B("span",{class:"tag ability",title:dr[l].description},[dr[l].name])):[B("span",{class:"tag empty"},["No abilities"])],i=n.traits.map(l=>B("span",{class:"tag trait",title:yl[l].description},[yl[l].name])),s=Math.min(window.devicePixelRatio||1,2),r=100,a=B("canvas",{width:String(r*s),height:String(r*s),style:`width:${r}px;height:${r}px`,"aria-hidden":"true",class:"creature-preview-canvas"});return requestAnimationFrame(()=>{const l=a.getContext("2d");if(!l)return;l.scale(s,s);const c=r/2+4,h=r/2+8,d=n.genome,u=.66,f=dn[d.body]??dn.boar;l.save(),l.translate(c,h),l.scale(u,u),l.save(),l.translate(-34,0),l.rotate(-.2),kh(l,d.tail,0),l.restore(),l.save(),l.translate(-20,18),l.scale(.92,.92),Oh(l,d.hindlimbs,0),l.restore(),l.save(),l.fillStyle=f.fill,l.strokeStyle=f.shade,l.lineWidth=2,l.beginPath(),l.moveTo(-6,6),l.quadraticCurveTo(20,-2,26,-26),l.quadraticCurveTo(30,-34,22,-34),l.quadraticCurveTo(8,-26,2,-6),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),Nh(l,d.body,0),l.restore(),l.save(),l.translate(14,18),l.scale(.92,.92),Uh(l,d.forelimbs,0),l.restore(),l.save(),l.translate(24,-30),Dh(l,d.head,0,0),l.restore(),l.restore()}),B("div",{class:"creature-card fadein"},[B("div",{class:"creature-head"},[a,B("div",{},[B("h3",{class:"creature-name"},[n.name]),B("div",{class:"creature-sub"},[`Power ${Fn(n)}`])])]),e,B("div",{class:"tags"},[...t,...i])])}let vt=null,kn=!1;function nf(n){kn=n}function sf(){return kn=!kn,kn}function qo(){try{const n=window.AudioContext??window.webkitAudioContext;!vt&&n&&(vt=new n),vt&&vt.state==="suspended"&&vt.resume()}catch{vt=null}}function lt(n,e,t,i=.12,s,r=0){if(kn||!vt)return;const a=()=>{if(vt)try{const o=vt.currentTime,l=vt.createOscillator(),c=vt.createGain();l.type=t,l.frequency.setValueAtTime(n,o),s!==void 0&&l.frequency.exponentialRampToValueAtTime(s,o+e),c.gain.setValueAtTime(i,o),c.gain.exponentialRampToValueAtTime(1e-4,o+e),l.connect(c).connect(vt.destination),l.start(o),l.stop(o+e)}catch{}};r>0?setTimeout(a,r):a()}function mn(n,e=.08,t=0){if(kn||!vt)return;const i=()=>{if(vt)try{const s=vt.sampleRate*n,r=vt.createBuffer(1,s,vt.sampleRate),a=r.getChannelData(0);for(let h=0;h<s;h++)a[h]=Math.random()*2-1;const o=vt.createBufferSource();o.buffer=r;const l=vt.createBiquadFilter();l.type="lowpass",l.frequency.value=220;const c=vt.createGain();c.gain.setValueAtTime(e,vt.currentTime),c.gain.exponentialRampToValueAtTime(1e-4,vt.currentTime+n),o.connect(l).connect(c).connect(vt.destination),o.start(vt.currentTime)}catch{}};t>0?setTimeout(i,t):i()}function El(n=!1){lt(n?180:130,.08,"square",n?.18:.12,n?60:50),mn(n?.18:.1,n?.14:.08),n&&lt(900,.04,"square",.06,200,15)}function xr(n){switch(n){case"shock":lt(1200,.05,"sawtooth",.12,80),lt(800,.12,"square",.08,200,30),mn(.1,.06,40);break;case"venom":lt(600,.25,"sine",.08,180),mn(.2,.04,20);break;case"spit":lt(300,.08,"sawtooth",.1,800),lt(400,.12,"triangle",.08,100,80),mn(.12,.06,90);break;case"leech":lt(220,.3,"sine",.1,160),lt(330,.3,"sine",.06,240,80);break;case"charge":lt(80,.25,"sawtooth",.15,40),mn(.3,.12);break;case"armor":lt(880,.06,"square",.1,440),lt(660,.12,"triangle",.08,330,40);break;case"frenzy":lt(400,.06,"sawtooth",.12,900),lt(500,.06,"sawtooth",.1,1100,50),lt(600,.08,"sawtooth",.08,1300,100);break;case"regenerate":Co();break;default:lt(420,.18,"sawtooth",.1,760)}}function Co(){lt(660,.22,"sine",.09,990),lt(880,.18,"sine",.06,1320,60)}function rf(){mn(.6,.15),lt(120,.4,"sawtooth",.12,60),lt(180,.3,"sawtooth",.08,90,150)}function af(n){n==="#ff6030"?(lt(140,.18,"sawtooth",.07,80),mn(.15,.04,50)):n==="#b060ff"?(lt(880,.15,"sine",.05,660),lt(1100,.1,"sine",.03,880,60)):n==="#50e8d0"?(lt(600,.08,"square",.05,300),mn(.08,.03,20)):lt(280,.14,"triangle",.05,200)}function Al(){mn(.4,.12),lt(200,.5,"sawtooth",.1,40,80)}function of(n){if(kn||!vt)return()=>{};const e={forest:[261.6,293.7,329.6,392,440],sky:[293.7,329.6,392,440,523.3],ocean:[261.6,311.1,349.2,392,466.2],volcano:[220,246.9,293.7,329.6,369.9],desert:[246.9,277.2,329.6,369.9,415.3]},t=e[n]??e.forest;let i=!1,s=0,r=null;const a=()=>{if(i||kn||!vt)return;const o=t[s%t.length];lt(o,.35,"triangle",.04),s%4===0&&lt(o/2,.6,"sine",.03),s++,r=setTimeout(a,420)};return r=setTimeout(a,600),()=>{i=!0,r!==null&&clearTimeout(r)}}function lf(n){if(kn||!vt)return()=>{};let e=!1,t=null;const i=()=>{if(e||kn||!vt)return;switch(n){case"forest":Math.random()<.6&&lt(2200+Math.random()*400,.06,"sine",.02,2800);break;case"sky":mn(.4,.015),lt(180,.5,"sine",.01,220);break;case"ocean":mn(.8,.018),lt(80,.6,"sine",.01,100);break;case"volcano":mn(.5,.02),Math.random()<.3&&lt(60,.4,"sawtooth",.015,40);break;case"desert":mn(.6,.01),Math.random()<.2&&lt(900+Math.random()*200,.08,"sine",.008,700);break}const s=1800+Math.random()*1200;t=setTimeout(i,s)};return t=setTimeout(i,2e3+Math.random()*1e3),()=>{e=!0,t!==null&&clearTimeout(t)}}function cf(){[523,659,784,1047].forEach((n,e)=>lt(n,.18,"triangle",.12,void 0,e*110))}function hf(){[392,311,247].forEach((n,e)=>lt(n,.24,"sawtooth",.1,void 0,e*140))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const jo="160",df=0,wl=1,uf=2,Bh=1,Yo=2,Jn=3,ei=0,ln=1,Qt=2,mi=0,Ts=1,Po=2,Rl=3,Cl=4,ff=5,Ii=100,pf=101,mf=102,Pl=103,Ll=104,gf=200,_f=201,vf=202,yf=203,Lo=204,Io=205,Mf=206,bf=207,Sf=208,Tf=209,xf=210,Ef=211,Af=212,wf=213,Rf=214,Cf=0,Pf=1,Lf=2,ha=3,If=4,Df=5,Nf=6,Uf=7,zh=0,Of=1,kf=2,gi=0,Ff=1,Bf=2,zf=3,$o=4,Hf=5,Gf=6,Il="attached",Vf="detached",Hh=300,ws=301,Rs=302,Do=303,No=304,Ma=306,Mi=1e3,bn=1001,da=1002,kt=1003,Uo=1004,sa=1005,cn=1006,Gh=1007,Gi=1008,_i=1009,Wf=1010,Xf=1011,Ko=1012,Vh=1013,fi=1014,Zn=1015,ur=1016,Wh=1017,Xh=1018,Oi=1020,qf=1021,Sn=1023,jf=1024,Yf=1025,ki=1026,Cs=1027,qh=1028,jh=1029,$f=1030,Yh=1031,$h=1033,Oa=33776,ka=33777,Fa=33778,Ba=33779,Dl=35840,Nl=35841,Ul=35842,Ol=35843,Kh=36196,kl=37492,Fl=37496,Bl=37808,zl=37809,Hl=37810,Gl=37811,Vl=37812,Wl=37813,Xl=37814,ql=37815,jl=37816,Yl=37817,$l=37818,Kl=37819,Jl=37820,Zl=37821,za=36492,Ql=36494,ec=36495,Kf=36283,tc=36284,nc=36285,ic=36286,fr=2300,Ps=2301,Ha=2302,sc=2400,rc=2401,ac=2402,Jf=2500,Zf=0,Jh=1,Oo=2,Zh=3e3,Fi=3001,Qf=3200,ep=3201,Jo=0,tp=1,Tn="",Lt="srgb",Yt="srgb-linear",Zo="display-p3",ba="display-p3-linear",ua="linear",Et="srgb",fa="rec709",pa="p3",Ji=7680,oc=519,np=512,ip=513,sp=514,Qh=515,rp=516,ap=517,op=518,lp=519,ko=35044,lc="300 es",Fo=1035,Qn=2e3,ma=2001;class ks{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let cc=1234567;const tr=Math.PI/180,Ls=180/Math.PI;function Dn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function Xt(n,e,t){return Math.max(e,Math.min(t,n))}function Qo(n,e){return(n%e+e)%e}function cp(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function hp(n,e,t){return n!==e?(t-n)/(e-n):0}function nr(n,e,t){return(1-t)*n+t*e}function dp(n,e,t,i){return nr(n,e,1-Math.exp(-t*i))}function up(n,e=1){return e-Math.abs(Qo(n,e*2)-e)}function fp(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function pp(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function mp(n,e){return n+Math.floor(Math.random()*(e-n+1))}function gp(n,e){return n+Math.random()*(e-n)}function _p(n){return n*(.5-Math.random())}function vp(n){n!==void 0&&(cc=n);let e=cc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yp(n){return n*tr}function Mp(n){return n*Ls}function Bo(n){return(n&n-1)===0&&n!==0}function bp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ga(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Sp(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),d=r((e-i)/2),u=a((e-i)/2),f=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function On(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function _t(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Tp={DEG2RAD:tr,RAD2DEG:Ls,generateUUID:Dn,clamp:Xt,euclideanModulo:Qo,mapLinear:cp,inverseLerp:hp,lerp:nr,damp:dp,pingpong:up,smoothstep:fp,smootherstep:pp,randInt:mp,randFloat:gp,randFloatSpread:_p,seededRandom:vp,degToRad:yp,radToDeg:Mp,isPowerOfTwo:Bo,ceilPowerOfTwo:bp,floorPowerOfTwo:ga,setQuaternionFromProperEuler:Sp,normalize:_t,denormalize:On};class Ee{constructor(e=0,t=0){Ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class rt{constructor(e,t,i,s,r,a,o,l,c){rt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],v=s[0],m=s[3],p=s[6],M=s[1],y=s[4],x=s[7],L=s[2],R=s[5],P=s[8];return r[0]=a*v+o*M+l*L,r[3]=a*m+o*y+l*R,r[6]=a*p+o*x+l*P,r[1]=c*v+h*M+d*L,r[4]=c*m+h*y+d*R,r[7]=c*p+h*x+d*P,r[2]=u*v+f*M+g*L,r[5]=u*m+f*y+g*R,r[8]=u*p+f*x+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=t*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*c-h*i)*v,e[2]=(o*i-s*a)*v,e[3]=u*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ga.makeScale(e,t)),this}rotate(e){return this.premultiply(Ga.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ga.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ga=new rt;function ed(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function pr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function xp(){const n=pr("canvas");return n.style.display="block",n}const hc={};function ir(n){n in hc||(hc[n]=!0,console.warn(n))}const dc=new rt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),uc=new rt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Er={[Yt]:{transfer:ua,primaries:fa,toReference:n=>n,fromReference:n=>n},[Lt]:{transfer:Et,primaries:fa,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ba]:{transfer:ua,primaries:pa,toReference:n=>n.applyMatrix3(uc),fromReference:n=>n.applyMatrix3(dc)},[Zo]:{transfer:Et,primaries:pa,toReference:n=>n.convertSRGBToLinear().applyMatrix3(uc),fromReference:n=>n.applyMatrix3(dc).convertLinearToSRGB()}},Ep=new Set([Yt,ba]),ut={enabled:!0,_workingColorSpace:Yt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Ep.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Er[e].toReference,s=Er[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Er[n].primaries},getTransfer:function(n){return n===Tn?ua:Er[n].transfer}};function xs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Va(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Zi;class td{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Zi===void 0&&(Zi=pr("canvas")),Zi.width=e.width,Zi.height=e.height;const i=Zi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Zi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=pr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=xs(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(xs(t[i]/255)*255):t[i]=xs(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ap=0;class nd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=Dn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Wa(s[a].image)):r.push(Wa(s[a]))}else r=Wa(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Wa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?td.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wp=0;class qt extends ks{constructor(e=qt.DEFAULT_IMAGE,t=qt.DEFAULT_MAPPING,i=bn,s=bn,r=cn,a=Gi,o=Sn,l=_i,c=qt.DEFAULT_ANISOTROPY,h=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=Dn(),this.name="",this.source=new nd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ir("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Fi?Lt:Tn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mi:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mi:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ir("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Lt?Fi:Zh}set encoding(e){ir("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Fi?Lt:Tn}}qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=Hh;qt.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,t=0,i=0,s=1){Mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,x=(f+1)/2,L=(p+1)/2,R=(h+u)/4,P=(d+v)/4,k=(g+m)/4;return y>x&&y>L?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=R/i,r=P/i):x>L?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=R/s,r=k/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=P/r,s=k/r),this.set(i,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-v)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rp extends ks{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(ir("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Fi?Lt:Tn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new qt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new nd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vi extends Rp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class id extends qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cp extends qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3];const u=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(d!==v||l!==u||c!==f||h!==g){let m=1-o;const p=l*u+c*f+h*g+d*v,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const L=Math.sqrt(y),R=Math.atan2(L,p*M);m=Math.sin(m*R)/L,o=Math.sin(o*R)/L}const x=o*M;if(l=l*m+u*x,c=c*m+f*x,h=h*m+g*x,d=d*m+v*x,m===1-o){const L=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=L,c*=L,h*=L,d*=L}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),d=o(r/2),u=l(i/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*d+this._w*u,this._x=i*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,i=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Xa.copy(this).projectOnVector(e),this.sub(Xa)}reflect(e){return this.sub(Xa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xa=new E,fc=new bi;class Nn{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,An):An.fromBufferAttribute(r,a),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ar.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ar.copy(i.boundingBox)),Ar.applyMatrix4(e.matrixWorld),this.union(Ar)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ws),wr.subVectors(this.max,Ws),Qi.subVectors(e.a,Ws),es.subVectors(e.b,Ws),ts.subVectors(e.c,Ws),ri.subVectors(es,Qi),ai.subVectors(ts,es),Ti.subVectors(Qi,ts);let t=[0,-ri.z,ri.y,0,-ai.z,ai.y,0,-Ti.z,Ti.y,ri.z,0,-ri.x,ai.z,0,-ai.x,Ti.z,0,-Ti.x,-ri.y,ri.x,0,-ai.y,ai.x,0,-Ti.y,Ti.x,0];return!qa(t,Qi,es,ts,wr)||(t=[1,0,0,0,1,0,0,0,1],!qa(t,Qi,es,ts,wr))?!1:(Rr.crossVectors(ri,ai),t=[Rr.x,Rr.y,Rr.z],qa(t,Qi,es,ts,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Wn=[new E,new E,new E,new E,new E,new E,new E,new E],An=new E,Ar=new Nn,Qi=new E,es=new E,ts=new E,ri=new E,ai=new E,Ti=new E,Ws=new E,wr=new E,Rr=new E,xi=new E;function qa(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){xi.fromArray(n,r);const o=s.x*Math.abs(xi.x)+s.y*Math.abs(xi.y)+s.z*Math.abs(xi.z),l=e.dot(xi),c=t.dot(xi),h=i.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Pp=new Nn,Xs=new E,ja=new E;class zn{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Pp.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xs.subVectors(e,this.center);const t=Xs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Xs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ja.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xs.copy(e.center).add(ja)),this.expandByPoint(Xs.copy(e.center).sub(ja))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Xn=new E,Ya=new E,Cr=new E,oi=new E,$a=new E,Pr=new E,Ka=new E;class Sa{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xn.copy(this.origin).addScaledVector(this.direction,t),Xn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ya.copy(e).add(t).multiplyScalar(.5),Cr.copy(t).sub(e).normalize(),oi.copy(this.origin).sub(Ya);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Cr),o=oi.dot(this.direction),l=-oi.dot(Cr),c=oi.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ya).addScaledVector(Cr,u),f}intersectSphere(e,t){Xn.subVectors(e.center,this.origin);const i=Xn.dot(this.direction),s=Xn.dot(Xn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Xn)!==null}intersectTriangle(e,t,i,s,r){$a.subVectors(t,e),Pr.subVectors(i,e),Ka.crossVectors($a,Pr);let a=this.direction.dot(Ka),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;oi.subVectors(this.origin,e);const l=o*this.direction.dot(Pr.crossVectors(oi,Pr));if(l<0)return null;const c=o*this.direction.dot($a.cross(oi));if(c<0||l+c>a)return null;const h=-o*oi.dot(Ka);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nt{constructor(e,t,i,s,r,a,o,l,c,h,d,u,f,g,v,m){nt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,d,u,f,g,v,m)}set(e,t,i,s,r,a,o,l,c,h,d,u,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),r=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lp,e,Ip)}lookAt(e,t,i){const s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),li.crossVectors(i,un),li.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),li.crossVectors(i,un)),li.normalize(),Lr.crossVectors(un,li),s[0]=li.x,s[4]=Lr.x,s[8]=un.x,s[1]=li.y,s[5]=Lr.y,s[9]=un.y,s[2]=li.z,s[6]=Lr.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],M=i[3],y=i[7],x=i[11],L=i[15],R=s[0],P=s[4],k=s[8],b=s[12],A=s[1],V=s[5],Z=s[9],se=s[13],N=s[2],W=s[6],$=s[10],J=s[14],te=s[3],Y=s[7],ee=s[11],ce=s[15];return r[0]=a*R+o*A+l*N+c*te,r[4]=a*P+o*V+l*W+c*Y,r[8]=a*k+o*Z+l*$+c*ee,r[12]=a*b+o*se+l*J+c*ce,r[1]=h*R+d*A+u*N+f*te,r[5]=h*P+d*V+u*W+f*Y,r[9]=h*k+d*Z+u*$+f*ee,r[13]=h*b+d*se+u*J+f*ce,r[2]=g*R+v*A+m*N+p*te,r[6]=g*P+v*V+m*W+p*Y,r[10]=g*k+v*Z+m*$+p*ee,r[14]=g*b+v*se+m*J+p*ce,r[3]=M*R+y*A+x*N+L*te,r[7]=M*P+y*V+x*W+L*Y,r[11]=M*k+y*Z+x*$+L*ee,r[15]=M*b+y*se+x*J+L*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*d-s*c*d-r*o*u+i*c*u+s*o*f-i*l*f)+v*(+t*l*f-t*c*u+r*a*u-s*a*f+s*c*h-r*l*h)+m*(+t*c*d-t*o*f-r*a*d+i*a*f+r*o*h-i*c*h)+p*(-s*o*h-t*l*d+t*o*u+s*a*d-i*a*u+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],M=d*m*c-v*u*c+v*l*f-o*m*f-d*l*p+o*u*p,y=g*u*c-h*m*c-g*l*f+a*m*f+h*l*p-a*u*p,x=h*v*c-g*d*c+g*o*f-a*v*f-h*o*p+a*d*p,L=g*d*l-h*v*l-g*o*u+a*v*u+h*o*m-a*d*m,R=t*M+i*y+s*x+r*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return e[0]=M*P,e[1]=(v*u*r-d*m*r-v*s*f+i*m*f+d*s*p-i*u*p)*P,e[2]=(o*m*r-v*l*r+v*s*c-i*m*c-o*s*p+i*l*p)*P,e[3]=(d*l*r-o*u*r-d*s*c+i*u*c+o*s*f-i*l*f)*P,e[4]=y*P,e[5]=(h*m*r-g*u*r+g*s*f-t*m*f-h*s*p+t*u*p)*P,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*P,e[7]=(a*u*r-h*l*r+h*s*c-t*u*c-a*s*f+t*l*f)*P,e[8]=x*P,e[9]=(g*d*r-h*v*r-g*i*f+t*v*f+h*i*p-t*d*p)*P,e[10]=(a*v*r-g*o*r+g*i*c-t*v*c-a*i*p+t*o*p)*P,e[11]=(h*o*r-a*d*r-h*i*c+t*d*c+a*i*f-t*o*f)*P,e[12]=L*P,e[13]=(h*v*s-g*d*s+g*i*u-t*v*u-h*i*m+t*d*m)*P,e[14]=(g*o*s-a*v*s-g*i*l+t*v*l+a*i*m-t*o*m)*P,e[15]=(a*d*s-h*o*s+h*i*l-t*d*l-a*i*u+t*o*u)*P,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,v=a*h,m=a*d,p=o*d,M=l*c,y=l*h,x=l*d,L=i.x,R=i.y,P=i.z;return s[0]=(1-(v+p))*L,s[1]=(f+x)*L,s[2]=(g-y)*L,s[3]=0,s[4]=(f-x)*R,s[5]=(1-(u+p))*R,s[6]=(m+M)*R,s[7]=0,s[8]=(g+y)*P,s[9]=(m-M)*P,s[10]=(1-(u+v))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=ns.set(s[0],s[1],s[2]).length();const a=ns.set(s[4],s[5],s[6]).length(),o=ns.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],wn.copy(this);const c=1/r,h=1/a,d=1/o;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=d,wn.elements[9]*=d,wn.elements[10]*=d,t.setFromRotationMatrix(wn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Qn){const l=this.elements,c=2*r/(t-e),h=2*r/(i-s),d=(t+e)/(t-e),u=(i+s)/(i-s);let f,g;if(o===Qn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===ma)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Qn){const l=this.elements,c=1/(t-e),h=1/(i-s),d=1/(a-r),u=(t+e)*c,f=(i+s)*h;let g,v;if(o===Qn)g=(a+r)*d,v=-2*d;else if(o===ma)g=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ns=new E,wn=new nt,Lp=new E(0,0,0),Ip=new E(1,1,1),li=new E,Lr=new E,un=new E,pc=new nt,mc=new bi;class Ta{constructor(e=0,t=0,i=0,s=Ta.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return pc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mc.setFromEuler(this),this.setFromQuaternion(mc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ta.DEFAULT_ORDER="XYZ";class sd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Dp=0;const gc=new E,is=new bi,qn=new nt,Ir=new E,qs=new E,Np=new E,Up=new bi,_c=new E(1,0,0),vc=new E(0,1,0),yc=new E(0,0,1),Op={type:"added"},kp={type:"removed"};class Ct extends ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dp++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new E,t=new Ta,i=new bi,s=new E(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new nt},normalMatrix:{value:new rt}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(_c,e)}rotateY(e){return this.rotateOnAxis(vc,e)}rotateZ(e){return this.rotateOnAxis(yc,e)}translateOnAxis(e,t){return gc.copy(e).applyQuaternion(this.quaternion),this.position.add(gc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_c,e)}translateY(e){return this.translateOnAxis(vc,e)}translateZ(e){return this.translateOnAxis(yc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ir.copy(e):Ir.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(qs,Ir,this.up):qn.lookAt(Ir,qs,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),is.setFromRotationMatrix(qn),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Op)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kp)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,e,Np),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,Up,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Ct.DEFAULT_UP=new E(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new E,jn=new E,Ja=new E,Yn=new E,ss=new E,rs=new E,Mc=new E,Za=new E,Qa=new E,eo=new E;let Dr=!1;class Mn{constructor(e=new E,t=new E,i=new E){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Rn.subVectors(e,t),s.cross(Rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Rn.subVectors(s,t),jn.subVectors(i,t),Ja.subVectors(e,t);const a=Rn.dot(Rn),o=Rn.dot(jn),l=Rn.dot(Ja),c=jn.dot(jn),h=jn.dot(Ja),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getUV(e,t,i,s,r,a,o,l){return Dr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Dr=!0),this.getInterpolation(e,t,i,s,r,a,o,l)}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Yn.x),l.addScaledVector(a,Yn.y),l.addScaledVector(o,Yn.z),l)}static isFrontFacing(e,t,i,s){return Rn.subVectors(i,t),jn.subVectors(e,t),Rn.cross(jn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Rn.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return Dr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Dr=!0),Mn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}getInterpolation(e,t,i,s,r){return Mn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;ss.subVectors(s,i),rs.subVectors(r,i),Za.subVectors(e,i);const l=ss.dot(Za),c=rs.dot(Za);if(l<=0&&c<=0)return t.copy(i);Qa.subVectors(e,s);const h=ss.dot(Qa),d=rs.dot(Qa);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(ss,a);eo.subVectors(e,r);const f=ss.dot(eo),g=rs.dot(eo);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(rs,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Mc.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(Mc,o);const p=1/(m+v+u);return a=v*p,o=u*p,t.copy(i).addScaledVector(ss,a).addScaledVector(rs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const rd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function to(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Re{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=ut.workingColorSpace){return this.r=e,this.g=t,this.b=i,ut.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=ut.workingColorSpace){if(e=Qo(e,1),t=Xt(t,0,1),i=Xt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=to(a,r,e+1/3),this.g=to(a,r,e),this.b=to(a,r,e-1/3)}return ut.toWorkingColorSpace(this,s),this}setStyle(e,t=Lt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){const i=rd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xs(e.r),this.g=xs(e.g),this.b=xs(e.b),this}copyLinearToSRGB(e){return this.r=Va(e.r),this.g=Va(e.g),this.b=Va(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return ut.fromWorkingColorSpace(Jt.copy(this),e),Math.round(Xt(Jt.r*255,0,255))*65536+Math.round(Xt(Jt.g*255,0,255))*256+Math.round(Xt(Jt.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace(Jt.copy(this),t);const i=Jt.r,s=Jt.g,r=Jt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Lt){ut.fromWorkingColorSpace(Jt.copy(this),e);const t=Jt.r,i=Jt.g,s=Jt.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ci),this.setHSL(ci.h+e,ci.s+t,ci.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ci),e.getHSL(Nr);const i=nr(ci.h,Nr.h,t),s=nr(ci.s,Nr.s,t),r=nr(ci.l,Nr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new Re;Re.NAMES=rd;let Fp=0;class xn extends ks{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fp++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=Ts,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lo,this.blendDst=Io,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=ha,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=oc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ji,this.stencilZFail=Ji,this.stencilZPass=Ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ts&&(i.blending=this.blending),this.side!==ei&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Lo&&(i.blendSrc=this.blendSrc),this.blendDst!==Io&&(i.blendDst=this.blendDst),this.blendEquation!==Ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ha&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==oc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ji&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ji&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ji&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Rt extends xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=zh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ut=new E,Ur=new Ee;class jt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ko,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ur.fromBufferAttribute(this,t),Ur.applyMatrix3(e),this.setXY(t,Ur.x,Ur.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=On(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=_t(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=On(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=On(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=On(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=On(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),i=_t(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),i=_t(i,this.array),s=_t(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),i=_t(i,this.array),s=_t(s,this.array),r=_t(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ko&&(e.usage=this.usage),e}}class ad extends jt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class od extends jt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class bt extends jt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Bp=0;const _n=new nt,no=new Ct,as=new E,fn=new Nn,js=new Nn,Wt=new E;class Pt extends ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ed(e)?od:ad)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new rt().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,i){return _n.makeTranslation(e,t,i),this.applyMatrix4(_n),this}scale(e,t,i){return _n.makeScale(e,t,i),this.applyMatrix4(_n),this}lookAt(e){return no.lookAt(e),no.updateMatrix(),this.applyMatrix4(no.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new bt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new E,1/0);return}if(e){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];js.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(fn.min,js.min),fn.expandByPoint(Wt),Wt.addVectors(fn.max,js.max),fn.expandByPoint(Wt)):(fn.expandByPoint(js.min),fn.expandByPoint(js.max))}fn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Wt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Wt.fromBufferAttribute(o,c),l&&(as.fromBufferAttribute(e,c),Wt.add(as)),s=Math.max(s,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let A=0;A<o;A++)c[A]=new E,h[A]=new E;const d=new E,u=new E,f=new E,g=new Ee,v=new Ee,m=new Ee,p=new E,M=new E;function y(A,V,Z){d.fromArray(s,A*3),u.fromArray(s,V*3),f.fromArray(s,Z*3),g.fromArray(a,A*2),v.fromArray(a,V*2),m.fromArray(a,Z*2),u.sub(d),f.sub(d),v.sub(g),m.sub(g);const se=1/(v.x*m.y-m.x*v.y);isFinite(se)&&(p.copy(u).multiplyScalar(m.y).addScaledVector(f,-v.y).multiplyScalar(se),M.copy(f).multiplyScalar(v.x).addScaledVector(u,-m.x).multiplyScalar(se),c[A].add(p),c[V].add(p),c[Z].add(p),h[A].add(M),h[V].add(M),h[Z].add(M))}let x=this.groups;x.length===0&&(x=[{start:0,count:i.length}]);for(let A=0,V=x.length;A<V;++A){const Z=x[A],se=Z.start,N=Z.count;for(let W=se,$=se+N;W<$;W+=3)y(i[W+0],i[W+1],i[W+2])}const L=new E,R=new E,P=new E,k=new E;function b(A){P.fromArray(r,A*3),k.copy(P);const V=c[A];L.copy(V),L.sub(P.multiplyScalar(P.dot(V))).normalize(),R.crossVectors(k,V);const se=R.dot(h[A])<0?-1:1;l[A*4]=L.x,l[A*4+1]=L.y,l[A*4+2]=L.z,l[A*4+3]=se}for(let A=0,V=x.length;A<V;++A){const Z=x[A],se=Z.start,N=Z.count;for(let W=se,$=se+N;W<$;W+=3)b(i[W+0]),b(i[W+1]),b(i[W+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new E,r=new E,a=new E,o=new E,l=new E,c=new E,h=new E,d=new E;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new jt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bc=new nt,Ei=new Sa,Or=new zn,Sc=new E,os=new E,ls=new E,cs=new E,io=new E,kr=new E,Fr=new Ee,Br=new Ee,zr=new Ee,Tc=new E,xc=new E,Ec=new E,Hr=new E,Gr=new E;class $e extends Ct{constructor(e=new Pt,t=new Rt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){kr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(io.fromBufferAttribute(d,e),a?kr.addScaledVector(io,h):kr.addScaledVector(io.sub(t),h))}t.add(kr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Or.copy(i.boundingSphere),Or.applyMatrix4(r),Ei.copy(e.ray).recast(e.near),!(Or.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Or,Sc)===null||Ei.origin.distanceToSquared(Sc)>(e.far-e.near)**2))&&(bc.copy(r).invert(),Ei.copy(e.ray).applyMatrix4(bc),!(i.boundingBox!==null&&Ei.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,L=y;x<L;x+=3){const R=o.getX(x),P=o.getX(x+1),k=o.getX(x+2);s=Vr(this,p,e,i,c,h,d,R,P,k),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=o.getX(m),y=o.getX(m+1),x=o.getX(m+2);s=Vr(this,a,e,i,c,h,d,M,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,L=y;x<L;x+=3){const R=x,P=x+1,k=x+2;s=Vr(this,p,e,i,c,h,d,R,P,k),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=m,y=m+1,x=m+2;s=Vr(this,a,e,i,c,h,d,M,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function zp(n,e,t,i,s,r,a,o){let l;if(e.side===ln?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===ei,o),l===null)return null;Gr.copy(o),Gr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Gr);return c<t.near||c>t.far?null:{distance:c,point:Gr.clone(),object:n}}function Vr(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,os),n.getVertexPosition(l,ls),n.getVertexPosition(c,cs);const h=zp(n,e,t,i,os,ls,cs,Hr);if(h){s&&(Fr.fromBufferAttribute(s,o),Br.fromBufferAttribute(s,l),zr.fromBufferAttribute(s,c),h.uv=Mn.getInterpolation(Hr,os,ls,cs,Fr,Br,zr,new Ee)),r&&(Fr.fromBufferAttribute(r,o),Br.fromBufferAttribute(r,l),zr.fromBufferAttribute(r,c),h.uv1=Mn.getInterpolation(Hr,os,ls,cs,Fr,Br,zr,new Ee),h.uv2=h.uv1),a&&(Tc.fromBufferAttribute(a,o),xc.fromBufferAttribute(a,l),Ec.fromBufferAttribute(a,c),h.normal=Mn.getInterpolation(Hr,os,ls,cs,Tc,xc,Ec,new E),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new E,materialIndex:0};Mn.getNormal(os,ls,cs,d.normal),h.face=d}return h}class Fs extends Pt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(h,3)),this.setAttribute("uv",new bt(d,2));function g(v,m,p,M,y,x,L,R,P,k,b){const A=x/P,V=L/k,Z=x/2,se=L/2,N=R/2,W=P+1,$=k+1;let J=0,te=0;const Y=new E;for(let ee=0;ee<$;ee++){const ce=ee*V-se;for(let ve=0;ve<W;ve++){const K=ve*A-Z;Y[v]=K*M,Y[m]=ce*y,Y[p]=N,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[m]=0,Y[p]=R>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(ve/P),d.push(1-ee/k),J+=1}}for(let ee=0;ee<k;ee++)for(let ce=0;ce<P;ce++){const ve=u+ce+W*ee,K=u+ce+W*(ee+1),O=u+(ce+1)+W*(ee+1),re=u+(ce+1)+W*ee;l.push(ve,K,re),l.push(K,O,re),te+=6}o.addGroup(f,te,b),f+=te,u+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Is(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function an(n){const e={};for(let t=0;t<n.length;t++){const i=Is(n[t]);for(const s in i)e[s]=i[s]}return e}function Hp(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ld(n){return n.getRenderTarget()===null?n.outputColorSpace:ut.workingColorSpace}const Gp={clone:Is,merge:an};var Vp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wi extends xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vp,this.fragmentShader=Wp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Is(e.uniforms),this.uniformsGroups=Hp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class cd extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=Qn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Zt extends cd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ls*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(tr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const hs=-90,ds=1;class Xp extends Ct{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Zt(hs,ds,e,t);s.layers=this.layers,this.add(s);const r=new Zt(hs,ds,e,t);r.layers=this.layers,this.add(r);const a=new Zt(hs,ds,e,t);a.layers=this.layers,this.add(a);const o=new Zt(hs,ds,e,t);o.layers=this.layers,this.add(o);const l=new Zt(hs,ds,e,t);l.layers=this.layers,this.add(l);const c=new Zt(hs,ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Qn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ma)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class hd extends qt{constructor(e,t,i,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:ws,super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qp extends Vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(ir("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Fi?Lt:Tn),this.texture=new hd(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:cn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Fs(5,5,5),r=new Wi({name:"CubemapFromEquirect",uniforms:Is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:mi});r.uniforms.tEquirect.value=t;const a=new $e(s,r),o=t.minFilter;return t.minFilter===Gi&&(t.minFilter=cn),new Xp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const so=new E,jp=new E,Yp=new rt;class Ci{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=so.subVectors(i,t).cross(jp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(so),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Yp.getNormalMatrix(e),s=this.coplanarPoint(so).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ai=new zn,Wr=new E;class el{constructor(e=new Ci,t=new Ci,i=new Ci,s=new Ci,r=new Ci,a=new Ci){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Qn){const i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],M=s[13],y=s[14],x=s[15];if(i[0].setComponents(l-r,u-c,m-f,x-p).normalize(),i[1].setComponents(l+r,u+c,m+f,x+p).normalize(),i[2].setComponents(l+a,u+h,m+g,x+M).normalize(),i[3].setComponents(l-a,u-h,m-g,x-M).normalize(),i[4].setComponents(l-o,u-d,m-v,x-y).normalize(),t===Qn)i[5].setComponents(l+o,u+d,m+v,x+y).normalize();else if(t===ma)i[5].setComponents(o,d,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){return Ai.center.set(0,0,0),Ai.radius=.7071067811865476,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Wr.x=s.normal.x>0?e.max.x:e.min.x,Wr.y=s.normal.y>0?e.max.y:e.min.y,Wr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function dd(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function $p(n,e){const t=e.isWebGL2,i=new WeakMap;function s(c,h){const d=c.array,u=c.usage,f=d.byteLength,g=n.createBuffer();n.bindBuffer(h,g),n.bufferData(h,d,u),c.onUploadCallback();let v;if(d instanceof Float32Array)v=n.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)v=n.SHORT;else if(d instanceof Uint32Array)v=n.UNSIGNED_INT;else if(d instanceof Int32Array)v=n.INT;else if(d instanceof Int8Array)v=n.BYTE;else if(d instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:v,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,d){const u=h.array,f=h._updateRange,g=h.updateRanges;if(n.bindBuffer(d,c),f.count===-1&&g.length===0&&n.bufferSubData(d,0,u),g.length!==0){for(let v=0,m=g.length;v<m;v++){const p=g[v];t?n.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u,p.start,p.count):n.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?n.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):n.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=i.get(c);(!u||u.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=i.get(c);if(d===void 0)i.set(c,s(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:a,remove:o,update:l}}class xa extends Pt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const M=p*u-a;for(let y=0;y<c;y++){const x=y*d-r;g.push(x,-M,0),v.push(0,0,1),m.push(y/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const y=M+c*p,x=M+c*(p+1),L=M+1+c*(p+1),R=M+1+c*p;f.push(y,x,R),f.push(x,L,R)}this.setIndex(f),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(v,3)),this.setAttribute("uv",new bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.width,e.height,e.widthSegments,e.heightSegments)}}var Kp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jp=`#ifdef USE_ALPHAHASH
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
#endif`,Zp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,em=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,tm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nm=`#ifdef USE_AOMAP
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
#endif`,im=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sm=`#ifdef USE_BATCHING
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
#endif`,rm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,am=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,om=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cm=`#ifdef USE_IRIDESCENCE
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
#endif`,hm=`#ifdef USE_BUMPMAP
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
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_m=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,vm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,ym=`#define PI 3.141592653589793
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
} // validated`,Mm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bm=`vec3 transformedNormal = objectNormal;
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
#endif`,Sm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Em=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Am="gl_FragColor = linearToOutputTexel( gl_FragColor );",wm=`
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
}`,Rm=`#ifdef USE_ENVMAP
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
#endif`,Cm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pm=`#ifdef USE_ENVMAP
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
#endif`,Lm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Im=`#ifdef USE_ENVMAP
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
#endif`,Dm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Um=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Om=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,km=`#ifdef USE_GRADIENTMAP
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
}`,Fm=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Bm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gm=`uniform bool receiveShadow;
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
#endif`,Vm=`#ifdef USE_ENVMAP
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
#endif`,Wm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ym=`PhysicalMaterial material;
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
#endif`,$m=`struct PhysicalMaterial {
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
}`,Km=`
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
#endif`,Jm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,e0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,t0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,n0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,i0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,s0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,r0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,a0=`#if defined( USE_POINTS_UV )
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
#endif`,o0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,l0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,c0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,h0=`#ifdef USE_MORPHNORMALS
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
#endif`,d0=`#ifdef USE_MORPHTARGETS
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
#endif`,u0=`#ifdef USE_MORPHTARGETS
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
#endif`,f0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,p0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,m0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,v0=`#ifdef USE_NORMALMAP
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
#endif`,y0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,M0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,b0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,S0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,T0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,x0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,E0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,A0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,w0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,R0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,C0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,P0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,L0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,I0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,D0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,N0=`float getShadowMask() {
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
}`,U0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,O0=`#ifdef USE_SKINNING
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
#endif`,k0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,F0=`#ifdef USE_SKINNING
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
#endif`,B0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,z0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,H0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,G0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,V0=`#ifdef USE_TRANSMISSION
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
#endif`,W0=`#ifdef USE_TRANSMISSION
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
#endif`,X0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,j0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,K0=`uniform sampler2D t2D;
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
}`,J0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Z0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`#include <common>
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
}`,ng=`#if DEPTH_PACKING == 3200
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
}`,ig=`#define DISTANCE
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
}`,sg=`#define DISTANCE
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
}`,rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`uniform float scale;
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
}`,lg=`uniform vec3 diffuse;
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
}`,cg=`#include <common>
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
}`,hg=`uniform vec3 diffuse;
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
}`,dg=`#define LAMBERT
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
}`,ug=`#define LAMBERT
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
}`,fg=`#define MATCAP
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
}`,pg=`#define MATCAP
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
}`,mg=`#define NORMAL
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
}`,gg=`#define NORMAL
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
}`,_g=`#define PHONG
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
}`,vg=`#define PHONG
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
}`,yg=`#define STANDARD
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
}`,Mg=`#define STANDARD
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
}`,bg=`#define TOON
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
}`,Sg=`#define TOON
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
}`,Tg=`uniform float size;
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
}`,xg=`uniform vec3 diffuse;
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
}`,Eg=`#include <common>
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
}`,Ag=`uniform vec3 color;
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
}`,wg=`uniform float rotation;
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
}`,Rg=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:Kp,alphahash_pars_fragment:Jp,alphamap_fragment:Zp,alphamap_pars_fragment:Qp,alphatest_fragment:em,alphatest_pars_fragment:tm,aomap_fragment:nm,aomap_pars_fragment:im,batching_pars_vertex:sm,batching_vertex:rm,begin_vertex:am,beginnormal_vertex:om,bsdfs:lm,iridescence_fragment:cm,bumpmap_pars_fragment:hm,clipping_planes_fragment:dm,clipping_planes_pars_fragment:um,clipping_planes_pars_vertex:fm,clipping_planes_vertex:pm,color_fragment:mm,color_pars_fragment:gm,color_pars_vertex:_m,color_vertex:vm,common:ym,cube_uv_reflection_fragment:Mm,defaultnormal_vertex:bm,displacementmap_pars_vertex:Sm,displacementmap_vertex:Tm,emissivemap_fragment:xm,emissivemap_pars_fragment:Em,colorspace_fragment:Am,colorspace_pars_fragment:wm,envmap_fragment:Rm,envmap_common_pars_fragment:Cm,envmap_pars_fragment:Pm,envmap_pars_vertex:Lm,envmap_physical_pars_fragment:Vm,envmap_vertex:Im,fog_vertex:Dm,fog_pars_vertex:Nm,fog_fragment:Um,fog_pars_fragment:Om,gradientmap_pars_fragment:km,lightmap_fragment:Fm,lightmap_pars_fragment:Bm,lights_lambert_fragment:zm,lights_lambert_pars_fragment:Hm,lights_pars_begin:Gm,lights_toon_fragment:Wm,lights_toon_pars_fragment:Xm,lights_phong_fragment:qm,lights_phong_pars_fragment:jm,lights_physical_fragment:Ym,lights_physical_pars_fragment:$m,lights_fragment_begin:Km,lights_fragment_maps:Jm,lights_fragment_end:Zm,logdepthbuf_fragment:Qm,logdepthbuf_pars_fragment:e0,logdepthbuf_pars_vertex:t0,logdepthbuf_vertex:n0,map_fragment:i0,map_pars_fragment:s0,map_particle_fragment:r0,map_particle_pars_fragment:a0,metalnessmap_fragment:o0,metalnessmap_pars_fragment:l0,morphcolor_vertex:c0,morphnormal_vertex:h0,morphtarget_pars_vertex:d0,morphtarget_vertex:u0,normal_fragment_begin:f0,normal_fragment_maps:p0,normal_pars_fragment:m0,normal_pars_vertex:g0,normal_vertex:_0,normalmap_pars_fragment:v0,clearcoat_normal_fragment_begin:y0,clearcoat_normal_fragment_maps:M0,clearcoat_pars_fragment:b0,iridescence_pars_fragment:S0,opaque_fragment:T0,packing:x0,premultiplied_alpha_fragment:E0,project_vertex:A0,dithering_fragment:w0,dithering_pars_fragment:R0,roughnessmap_fragment:C0,roughnessmap_pars_fragment:P0,shadowmap_pars_fragment:L0,shadowmap_pars_vertex:I0,shadowmap_vertex:D0,shadowmask_pars_fragment:N0,skinbase_vertex:U0,skinning_pars_vertex:O0,skinning_vertex:k0,skinnormal_vertex:F0,specularmap_fragment:B0,specularmap_pars_fragment:z0,tonemapping_fragment:H0,tonemapping_pars_fragment:G0,transmission_fragment:V0,transmission_pars_fragment:W0,uv_pars_fragment:X0,uv_pars_vertex:q0,uv_vertex:j0,worldpos_vertex:Y0,background_vert:$0,background_frag:K0,backgroundCube_vert:J0,backgroundCube_frag:Z0,cube_vert:Q0,cube_frag:eg,depth_vert:tg,depth_frag:ng,distanceRGBA_vert:ig,distanceRGBA_frag:sg,equirect_vert:rg,equirect_frag:ag,linedashed_vert:og,linedashed_frag:lg,meshbasic_vert:cg,meshbasic_frag:hg,meshlambert_vert:dg,meshlambert_frag:ug,meshmatcap_vert:fg,meshmatcap_frag:pg,meshnormal_vert:mg,meshnormal_frag:gg,meshphong_vert:_g,meshphong_frag:vg,meshphysical_vert:yg,meshphysical_frag:Mg,meshtoon_vert:bg,meshtoon_frag:Sg,points_vert:Tg,points_frag:xg,shadow_vert:Eg,shadow_frag:Ag,sprite_vert:wg,sprite_frag:Rg},_e={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},Un={basic:{uniforms:an([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:an([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Re(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:an([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:an([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:an([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Re(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:an([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:an([_e.points,_e.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:an([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:an([_e.common,_e.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:an([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:an([_e.sprite,_e.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:an([_e.common,_e.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:an([_e.lights,_e.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Un.physical={uniforms:an([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Xr={r:0,b:0,g:0};function Cg(n,e,t,i,s,r,a){const o=new Re(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(m,p){let M=!1,y=p.isScene===!0?p.background:null;y&&y.isTexture&&(y=(p.backgroundBlurriness>0?t:e).get(y)),y===null?v(o,l):y&&y.isColor&&(v(y,1),M=!0);const x=n.xr.getEnvironmentBlendMode();x==="additive"?i.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Ma)?(h===void 0&&(h=new $e(new Fs(1,1,1),new Wi({name:"BackgroundCubeMaterial",uniforms:Is(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=ut.getTransfer(y.colorSpace)!==Et,(d!==y||u!==y.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,d=y,u=y.version,f=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new $e(new xa(2,2),new Wi({name:"BackgroundMaterial",uniforms:Is(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=ut.getTransfer(y.colorSpace)!==Et,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||u!==y.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,u=y.version,f=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,p){m.getRGB(Xr,ld(n)),i.buffers.color.setClear(Xr.r,Xr.g,Xr.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(o,l)},render:g}}function Pg(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=m(null);let c=l,h=!1;function d(N,W,$,J,te){let Y=!1;if(a){const ee=v(J,$,W);c!==ee&&(c=ee,f(c.object)),Y=p(N,J,$,te),Y&&M(N,J,$,te)}else{const ee=W.wireframe===!0;(c.geometry!==J.id||c.program!==$.id||c.wireframe!==ee)&&(c.geometry=J.id,c.program=$.id,c.wireframe=ee,Y=!0)}te!==null&&t.update(te,n.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,k(N,W,$,J),te!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(te).buffer))}function u(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function f(N){return i.isWebGL2?n.bindVertexArray(N):r.bindVertexArrayOES(N)}function g(N){return i.isWebGL2?n.deleteVertexArray(N):r.deleteVertexArrayOES(N)}function v(N,W,$){const J=$.wireframe===!0;let te=o[N.id];te===void 0&&(te={},o[N.id]=te);let Y=te[W.id];Y===void 0&&(Y={},te[W.id]=Y);let ee=Y[J];return ee===void 0&&(ee=m(u()),Y[J]=ee),ee}function m(N){const W=[],$=[],J=[];for(let te=0;te<s;te++)W[te]=0,$[te]=0,J[te]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:$,attributeDivisors:J,object:N,attributes:{},index:null}}function p(N,W,$,J){const te=c.attributes,Y=W.attributes;let ee=0;const ce=$.getAttributes();for(const ve in ce)if(ce[ve].location>=0){const O=te[ve];let re=Y[ve];if(re===void 0&&(ve==="instanceMatrix"&&N.instanceMatrix&&(re=N.instanceMatrix),ve==="instanceColor"&&N.instanceColor&&(re=N.instanceColor)),O===void 0||O.attribute!==re||re&&O.data!==re.data)return!0;ee++}return c.attributesNum!==ee||c.index!==J}function M(N,W,$,J){const te={},Y=W.attributes;let ee=0;const ce=$.getAttributes();for(const ve in ce)if(ce[ve].location>=0){let O=Y[ve];O===void 0&&(ve==="instanceMatrix"&&N.instanceMatrix&&(O=N.instanceMatrix),ve==="instanceColor"&&N.instanceColor&&(O=N.instanceColor));const re={};re.attribute=O,O&&O.data&&(re.data=O.data),te[ve]=re,ee++}c.attributes=te,c.attributesNum=ee,c.index=J}function y(){const N=c.newAttributes;for(let W=0,$=N.length;W<$;W++)N[W]=0}function x(N){L(N,0)}function L(N,W){const $=c.newAttributes,J=c.enabledAttributes,te=c.attributeDivisors;$[N]=1,J[N]===0&&(n.enableVertexAttribArray(N),J[N]=1),te[N]!==W&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,W),te[N]=W)}function R(){const N=c.newAttributes,W=c.enabledAttributes;for(let $=0,J=W.length;$<J;$++)W[$]!==N[$]&&(n.disableVertexAttribArray($),W[$]=0)}function P(N,W,$,J,te,Y,ee){ee===!0?n.vertexAttribIPointer(N,W,$,te,Y):n.vertexAttribPointer(N,W,$,J,te,Y)}function k(N,W,$,J){if(i.isWebGL2===!1&&(N.isInstancedMesh||J.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const te=J.attributes,Y=$.getAttributes(),ee=W.defaultAttributeValues;for(const ce in Y){const ve=Y[ce];if(ve.location>=0){let K=te[ce];if(K===void 0&&(ce==="instanceMatrix"&&N.instanceMatrix&&(K=N.instanceMatrix),ce==="instanceColor"&&N.instanceColor&&(K=N.instanceColor)),K!==void 0){const O=K.normalized,re=K.itemSize,me=t.get(K);if(me===void 0)continue;const be=me.buffer,ke=me.type,Te=me.bytesPerElement,De=i.isWebGL2===!0&&(ke===n.INT||ke===n.UNSIGNED_INT||K.gpuType===Vh);if(K.isInterleavedBufferAttribute){const Ke=K.data,X=Ke.stride,At=K.offset;if(Ke.isInstancedInterleavedBuffer){for(let Ne=0;Ne<ve.locationSize;Ne++)L(ve.location+Ne,Ke.meshPerAttribute);N.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Ke.meshPerAttribute*Ke.count)}else for(let Ne=0;Ne<ve.locationSize;Ne++)x(ve.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,be);for(let Ne=0;Ne<ve.locationSize;Ne++)P(ve.location+Ne,re/ve.locationSize,ke,O,X*Te,(At+re/ve.locationSize*Ne)*Te,De)}else{if(K.isInstancedBufferAttribute){for(let Ke=0;Ke<ve.locationSize;Ke++)L(ve.location+Ke,K.meshPerAttribute);N.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Ke=0;Ke<ve.locationSize;Ke++)x(ve.location+Ke);n.bindBuffer(n.ARRAY_BUFFER,be);for(let Ke=0;Ke<ve.locationSize;Ke++)P(ve.location+Ke,re/ve.locationSize,ke,O,re*Te,re/ve.locationSize*Ke*Te,De)}}else if(ee!==void 0){const O=ee[ce];if(O!==void 0)switch(O.length){case 2:n.vertexAttrib2fv(ve.location,O);break;case 3:n.vertexAttrib3fv(ve.location,O);break;case 4:n.vertexAttrib4fv(ve.location,O);break;default:n.vertexAttrib1fv(ve.location,O)}}}}R()}function b(){Z();for(const N in o){const W=o[N];for(const $ in W){const J=W[$];for(const te in J)g(J[te].object),delete J[te];delete W[$]}delete o[N]}}function A(N){if(o[N.id]===void 0)return;const W=o[N.id];for(const $ in W){const J=W[$];for(const te in J)g(J[te].object),delete J[te];delete W[$]}delete o[N.id]}function V(N){for(const W in o){const $=o[W];if($[N.id]===void 0)continue;const J=$[N.id];for(const te in J)g(J[te].object),delete J[te];delete $[N.id]}}function Z(){se(),h=!0,c!==l&&(c=l,f(c.object))}function se(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:Z,resetDefaultState:se,dispose:b,releaseStatesOfGeometry:A,releaseStatesOfProgram:V,initAttributes:y,enableAttribute:x,disableUnusedAttributes:R}}function Lg(n,e,t,i){const s=i.isWebGL2;let r;function a(h){r=h}function o(h,d){n.drawArrays(r,h,d),t.update(d,r,1)}function l(h,d,u){if(u===0)return;let f,g;if(s)f=n,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,d,u),t.update(d,r,u)}function c(h,d,u){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{f.multiDrawArraysWEBGL(r,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Ig(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),u=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),v=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=u>0,x=a||e.has("OES_texture_float"),L=y&&x,R=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:y,floatFragmentTextures:x,floatVertexTextures:L,maxSamples:R}}function Dg(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Ci,o=new rt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:i,y=M*4;let x=p.clippingState||null;l.value=x,x=h(g,u,y,f);for(let L=0;L!==y;++L)x[L]=t[L];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=f;y!==v;++y,x+=4)a.copy(d[y]).applyMatrix4(M,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Ng(n){let e=new WeakMap;function t(a,o){return o===Do?a.mapping=ws:o===No&&(a.mapping=Rs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Do||o===No)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new qp(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class tl extends cd{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ys=4,Ac=[.125,.215,.35,.446,.526,.582],Di=20,ro=new tl,wc=new Re;let ao=null,oo=0,lo=0;const Pi=(1+Math.sqrt(5))/2,us=1/Pi,Rc=[new E(1,1,1),new E(-1,1,1),new E(1,1,-1),new E(-1,1,-1),new E(0,Pi,us),new E(0,Pi,-us),new E(us,0,Pi),new E(-us,0,Pi),new E(Pi,us,0),new E(-Pi,us,0)];class Cc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){ao=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ao,oo,lo),e.scissorTest=!1,qr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ws||e.mapping===Rs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ao=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:ur,format:Sn,colorSpace:Yt,depthBuffer:!1},s=Pc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pc(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ug(r)),this._blurMaterial=Og(r,e,t)}return s}_compileMaterial(e){const t=new $e(this._lodPlanes[0],e);this._renderer.compile(t,ro)}_sceneToCubeUV(e,t,i,s){const o=new Zt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(wc),h.toneMapping=gi,h.autoClear=!1;const f=new Rt({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),g=new $e(new Fs,f);let v=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(wc),v=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const y=this._cubeSize;qr(s,M*y,p>2?y:0,y,y),h.setRenderTarget(s),v&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ws||e.mapping===Rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new $e(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;qr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,ro)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Rc[(s-1)%Rc.length];this._blur(e,s-1,s,r,a)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new $e(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Di-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Di;m>Di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);const p=[];let M=0;for(let P=0;P<Di;++P){const k=P/v,b=Math.exp(-k*k/2);p.push(b),P===0?M+=b:P<m&&(M+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-i;const x=this._sizeLods[s],L=3*x*(s>y-ys?s-y+ys:0),R=4*(this._cubeSize-x);qr(t,L,R,3*x,2*x),l.setRenderTarget(t),l.render(d,ro)}}function Ug(n){const e=[],t=[],i=[];let s=n;const r=n-ys+1+Ac.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-ys?l=Ac[a-n+ys-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*f),y=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let R=0;R<f;R++){const P=R%3*2/3-1,k=R>2?0:-1,b=[P,k,0,P+2/3,k,0,P+2/3,k+1,0,P,k,0,P+2/3,k+1,0,P,k+1,0];M.set(b,v*g*R),y.set(u,m*g*R);const A=[R,R,R,R,R,R];x.set(A,p*g*R)}const L=new Pt;L.setAttribute("position",new jt(M,v)),L.setAttribute("uv",new jt(y,m)),L.setAttribute("faceIndex",new jt(x,p)),e.push(L),s>ys&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Pc(n,e,t){const i=new Vi(n,e,t);return i.texture.mapping=Ma,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Og(n,e,t){const i=new Float32Array(Di),s=new E(0,1,0);return new Wi({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:nl(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Lc(){return new Wi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nl(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Ic(){return new Wi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function nl(){return`

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
	`}function kg(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Do||l===No,h=l===ws||l===Rs;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=e.get(o);return t===null&&(t=new Cc(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),e.set(o,d),d.texture}else{if(e.has(o))return e.get(o).texture;{const d=o.image;if(c&&d&&d.height>0||h&&d&&s(d)){t===null&&(t=new Cc(n));const u=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,u),o.addEventListener("dispose",r),u.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Fg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Bg(n,e,t,i){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)e.update(u[g],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],n.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let y=0,x=M.length;y<x;y+=3){const L=M[y+0],R=M[y+1],P=M[y+2];u.push(L,R,R,P,P,L)}}else if(g!==void 0){const M=g.array;v=g.version;for(let y=0,x=M.length/3-1;y<x;y+=3){const L=y+0,R=y+1,P=y+2;u.push(L,R,R,P,P,L)}}else return;const m=new(ed(u)?od:ad)(u,1);m.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function zg(n,e,t,i){const s=i.isWebGL2;let r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,g){n.drawElements(r,g,o,f*l),t.update(g,r,1)}function d(f,g,v){if(v===0)return;let m,p;if(s)m=n,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,f*l,v),t.update(g,r,v)}function u(f,g,v){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<v;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,f,0,v);let p=0;for(let M=0;M<v;M++)p+=g[M];t.update(p,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function Hg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Gg(n,e){return n[0]-e[0]}function Vg(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Wg(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,a=new Mt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,d){const u=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0;let v=r.get(h);if(v===void 0||v.count!==g){let N=function(){Z.dispose(),r.delete(h),h.removeEventListener("dispose",N)};v!==void 0&&v.texture.dispose();const M=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,x=h.morphAttributes.color!==void 0,L=h.morphAttributes.position||[],R=h.morphAttributes.normal||[],P=h.morphAttributes.color||[];let k=0;M===!0&&(k=1),y===!0&&(k=2),x===!0&&(k=3);let b=h.attributes.position.count*k,A=1;b>e.maxTextureSize&&(A=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const V=new Float32Array(b*A*4*g),Z=new id(V,b,A,g);Z.type=Zn,Z.needsUpdate=!0;const se=k*4;for(let W=0;W<g;W++){const $=L[W],J=R[W],te=P[W],Y=b*A*4*W;for(let ee=0;ee<$.count;ee++){const ce=ee*se;M===!0&&(a.fromBufferAttribute($,ee),V[Y+ce+0]=a.x,V[Y+ce+1]=a.y,V[Y+ce+2]=a.z,V[Y+ce+3]=0),y===!0&&(a.fromBufferAttribute(J,ee),V[Y+ce+4]=a.x,V[Y+ce+5]=a.y,V[Y+ce+6]=a.z,V[Y+ce+7]=0),x===!0&&(a.fromBufferAttribute(te,ee),V[Y+ce+8]=a.x,V[Y+ce+9]=a.y,V[Y+ce+10]=a.z,V[Y+ce+11]=te.itemSize===4?a.w:1)}}v={count:g,texture:Z,size:new Ee(b,A)},r.set(h,v),h.addEventListener("dispose",N)}let m=0;for(let M=0;M<u.length;M++)m+=u[M];const p=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(n,"morphTargetBaseInfluence",p),d.getUniforms().setValue(n,"morphTargetInfluences",u),d.getUniforms().setValue(n,"morphTargetsTexture",v.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",v.size)}else{const f=u===void 0?0:u.length;let g=i[h.id];if(g===void 0||g.length!==f){g=[];for(let y=0;y<f;y++)g[y]=[y,0];i[h.id]=g}for(let y=0;y<f;y++){const x=g[y];x[0]=y,x[1]=u[y]}g.sort(Vg);for(let y=0;y<8;y++)y<f&&g[y][1]?(o[y][0]=g[y][0],o[y][1]=g[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(Gg);const v=h.morphAttributes.position,m=h.morphAttributes.normal;let p=0;for(let y=0;y<8;y++){const x=o[y],L=x[0],R=x[1];L!==Number.MAX_SAFE_INTEGER&&R?(v&&h.getAttribute("morphTarget"+y)!==v[L]&&h.setAttribute("morphTarget"+y,v[L]),m&&h.getAttribute("morphNormal"+y)!==m[L]&&h.setAttribute("morphNormal"+y,m[L]),s[y]=R,p+=R):(v&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),m&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),s[y]=0)}const M=h.morphTargetsRelative?1:1-p;d.getUniforms().setValue(n,"morphTargetBaseInfluence",M),d.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function Xg(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class ud extends qt{constructor(e,t,i,s,r,a,o,l,c,h){if(h=h!==void 0?h:ki,h!==ki&&h!==Cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ki&&(i=fi),i===void 0&&h===Cs&&(i=Oi),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:kt,this.minFilter=l!==void 0?l:kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const fd=new qt,pd=new ud(1,1);pd.compareFunction=Qh;const md=new id,gd=new Cp,_d=new hd,Dc=[],Nc=[],Uc=new Float32Array(16),Oc=new Float32Array(9),kc=new Float32Array(4);function Bs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Dc[s];if(r===void 0&&(r=new Float32Array(s),Dc[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Ht(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Gt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ea(n,e){let t=Nc[e];t===void 0&&(t=new Int32Array(e),Nc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function qg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2fv(this.addr,e),Gt(t,e)}}function Yg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;n.uniform3fv(this.addr,e),Gt(t,e)}}function $g(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4fv(this.addr,e),Gt(t,e)}}function Kg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Ht(t,i))return;kc.set(i),n.uniformMatrix2fv(this.addr,!1,kc),Gt(t,i)}}function Jg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Ht(t,i))return;Oc.set(i),n.uniformMatrix3fv(this.addr,!1,Oc),Gt(t,i)}}function Zg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Ht(t,i))return;Uc.set(i),n.uniformMatrix4fv(this.addr,!1,Uc),Gt(t,i)}}function Qg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function e_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2iv(this.addr,e),Gt(t,e)}}function t_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3iv(this.addr,e),Gt(t,e)}}function n_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4iv(this.addr,e),Gt(t,e)}}function i_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function s_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2uiv(this.addr,e),Gt(t,e)}}function r_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3uiv(this.addr,e),Gt(t,e)}}function a_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4uiv(this.addr,e),Gt(t,e)}}function o_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?pd:fd;t.setTexture2D(e||r,s)}function l_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||gd,s)}function c_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||_d,s)}function h_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||md,s)}function d_(n){switch(n){case 5126:return qg;case 35664:return jg;case 35665:return Yg;case 35666:return $g;case 35674:return Kg;case 35675:return Jg;case 35676:return Zg;case 5124:case 35670:return Qg;case 35667:case 35671:return e_;case 35668:case 35672:return t_;case 35669:case 35673:return n_;case 5125:return i_;case 36294:return s_;case 36295:return r_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return o_;case 35679:case 36299:case 36307:return l_;case 35680:case 36300:case 36308:case 36293:return c_;case 36289:case 36303:case 36311:case 36292:return h_}}function u_(n,e){n.uniform1fv(this.addr,e)}function f_(n,e){const t=Bs(e,this.size,2);n.uniform2fv(this.addr,t)}function p_(n,e){const t=Bs(e,this.size,3);n.uniform3fv(this.addr,t)}function m_(n,e){const t=Bs(e,this.size,4);n.uniform4fv(this.addr,t)}function g_(n,e){const t=Bs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function __(n,e){const t=Bs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function v_(n,e){const t=Bs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function y_(n,e){n.uniform1iv(this.addr,e)}function M_(n,e){n.uniform2iv(this.addr,e)}function b_(n,e){n.uniform3iv(this.addr,e)}function S_(n,e){n.uniform4iv(this.addr,e)}function T_(n,e){n.uniform1uiv(this.addr,e)}function x_(n,e){n.uniform2uiv(this.addr,e)}function E_(n,e){n.uniform3uiv(this.addr,e)}function A_(n,e){n.uniform4uiv(this.addr,e)}function w_(n,e,t){const i=this.cache,s=e.length,r=Ea(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Gt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||fd,r[a])}function R_(n,e,t){const i=this.cache,s=e.length,r=Ea(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Gt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||gd,r[a])}function C_(n,e,t){const i=this.cache,s=e.length,r=Ea(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Gt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||_d,r[a])}function P_(n,e,t){const i=this.cache,s=e.length,r=Ea(t,s);Ht(i,r)||(n.uniform1iv(this.addr,r),Gt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||md,r[a])}function L_(n){switch(n){case 5126:return u_;case 35664:return f_;case 35665:return p_;case 35666:return m_;case 35674:return g_;case 35675:return __;case 35676:return v_;case 5124:case 35670:return y_;case 35667:case 35671:return M_;case 35668:case 35672:return b_;case 35669:case 35673:return S_;case 5125:return T_;case 36294:return x_;case 36295:return E_;case 36296:return A_;case 35678:case 36198:case 36298:case 36306:case 35682:return w_;case 35679:case 36299:case 36307:return R_;case 35680:case 36300:case 36308:case 36293:return C_;case 36289:case 36303:case 36311:case 36292:return P_}}class I_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=d_(t.type)}}class D_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=L_(t.type)}}class N_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const co=/(\w+)(\])?(\[|\.)?/g;function Fc(n,e){n.seq.push(e),n.map[e.id]=e}function U_(n,e,t){const i=n.name,s=i.length;for(co.lastIndex=0;;){const r=co.exec(i),a=co.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Fc(t,c===void 0?new I_(o,n,e):new D_(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new N_(o),Fc(t,d)),t=d}}}class ra{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);U_(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Bc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const O_=37297;let k_=0;function F_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function B_(n){const e=ut.getPrimaries(ut.workingColorSpace),t=ut.getPrimaries(n);let i;switch(e===t?i="":e===pa&&t===fa?i="LinearDisplayP3ToLinearSRGB":e===fa&&t===pa&&(i="LinearSRGBToLinearDisplayP3"),n){case Yt:case ba:return[i,"LinearTransferOETF"];case Lt:case Zo:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function zc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+F_(n.getShaderSource(e),a)}else return s}function z_(n,e){const t=B_(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function H_(n,e){let t;switch(e){case Ff:t="Linear";break;case Bf:t="Reinhard";break;case zf:t="OptimizedCineon";break;case $o:t="ACESFilmic";break;case Gf:t="AgX";break;case Hf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function G_(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ms).join(`
`)}function V_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ms).join(`
`)}function W_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function X_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ms(n){return n!==""}function Hc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function zo(n){return n.replace(q_,Y_)}const j_=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Y_(n,e){let t=et[e];if(t===void 0){const i=j_.get(e);if(i!==void 0)t=et[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return zo(t)}const $_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vc(n){return n.replace($_,K_)}function K_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wc(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function J_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Bh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Yo?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Jn&&(e="SHADOWMAP_TYPE_VSM"),e}function Z_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ws:case Rs:e="ENVMAP_TYPE_CUBE";break;case Ma:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Q_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Rs:e="ENVMAP_MODE_REFRACTION";break}return e}function ev(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case zh:e="ENVMAP_BLENDING_MULTIPLY";break;case Of:e="ENVMAP_BLENDING_MIX";break;case kf:e="ENVMAP_BLENDING_ADD";break}return e}function tv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function nv(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=J_(t),c=Z_(t),h=Q_(t),d=ev(t),u=tv(t),f=t.isWebGL2?"":G_(t),g=V_(t),v=W_(r),m=s.createProgram();let p,M,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ms).join(`
`),p.length>0&&(p+=`
`),M=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ms).join(`
`),M.length>0&&(M+=`
`)):(p=[Wc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),M=[f,Wc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gi?"#define TONE_MAPPING":"",t.toneMapping!==gi?et.tonemapping_pars_fragment:"",t.toneMapping!==gi?H_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,z_("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ms).join(`
`)),a=zo(a),a=Hc(a,t),a=Gc(a,t),o=zo(o),o=Hc(o,t),o=Gc(o,t),a=Vc(a),o=Vc(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===lc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===lc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const x=y+p+a,L=y+M+o,R=Bc(s,s.VERTEX_SHADER,x),P=Bc(s,s.FRAGMENT_SHADER,L);s.attachShader(m,R),s.attachShader(m,P),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function k(Z){if(n.debug.checkShaderErrors){const se=s.getProgramInfoLog(m).trim(),N=s.getShaderInfoLog(R).trim(),W=s.getShaderInfoLog(P).trim();let $=!0,J=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,R,P);else{const te=zc(s,R,"vertex"),Y=zc(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+se+`
`+te+`
`+Y)}else se!==""?console.warn("THREE.WebGLProgram: Program Info Log:",se):(N===""||W==="")&&(J=!1);J&&(Z.diagnostics={runnable:$,programLog:se,vertexShader:{log:N,prefix:p},fragmentShader:{log:W,prefix:M}})}s.deleteShader(R),s.deleteShader(P),b=new ra(s,m),A=X_(s,m)}let b;this.getUniforms=function(){return b===void 0&&k(this),b};let A;this.getAttributes=function(){return A===void 0&&k(this),A};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=s.getProgramParameter(m,O_)),V},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=k_++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=R,this.fragmentShader=P,this}let iv=0;class sv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new rv(e),t.set(e,i)),i}}class rv{constructor(e){this.id=iv++,this.code=e,this.usedTimes=0}}function av(n,e,t,i,s,r,a){const o=new sd,l=new sv,c=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return b===0?"uv":`uv${b}`}function m(b,A,V,Z,se){const N=Z.fog,W=se.geometry,$=b.isMeshStandardMaterial?Z.environment:null,J=(b.isMeshStandardMaterial?t:e).get(b.envMap||$),te=J&&J.mapping===Ma?J.image.height:null,Y=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const ee=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ce=ee!==void 0?ee.length:0;let ve=0;W.morphAttributes.position!==void 0&&(ve=1),W.morphAttributes.normal!==void 0&&(ve=2),W.morphAttributes.color!==void 0&&(ve=3);let K,O,re,me;if(Y){const $t=Un[Y];K=$t.vertexShader,O=$t.fragmentShader}else K=b.vertexShader,O=b.fragmentShader,l.update(b),re=l.getVertexShaderID(b),me=l.getFragmentShaderID(b);const be=n.getRenderTarget(),ke=se.isInstancedMesh===!0,Te=se.isBatchedMesh===!0,De=!!b.map,Ke=!!b.matcap,X=!!J,At=!!b.aoMap,Ne=!!b.lightMap,Ge=!!b.bumpMap,ge=!!b.normalMap,ct=!!b.displacementMap,Ie=!!b.emissiveMap,w=!!b.metalnessMap,T=!!b.roughnessMap,q=b.anisotropy>0,le=b.clearcoat>0,ae=b.iridescence>0,ne=b.sheen>0,Se=b.transmission>0,Q=q&&!!b.anisotropyMap,he=le&&!!b.clearcoatMap,Ce=le&&!!b.clearcoatNormalMap,Je=le&&!!b.clearcoatRoughnessMap,oe=ae&&!!b.iridescenceMap,ht=ae&&!!b.iridescenceThicknessMap,it=ne&&!!b.sheenColorMap,je=ne&&!!b.sheenRoughnessMap,Fe=!!b.specularMap,Pe=!!b.specularColorMap,We=!!b.specularIntensityMap,dt=Se&&!!b.transmissionMap,Tt=Se&&!!b.thicknessMap,Qe=!!b.gradientMap,de=!!b.alphaMap,D=b.alphaTest>0,ye=!!b.alphaHash,Me=!!b.extensions,Be=!!W.attributes.uv1,Ue=!!W.attributes.uv2,mt=!!W.attributes.uv3;let gt=gi;return b.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(gt=n.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:b.type,shaderName:b.name,vertexShader:K,fragmentShader:O,defines:b.defines,customVertexShaderID:re,customFragmentShaderID:me,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Te,instancing:ke,instancingColor:ke&&se.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:be===null?n.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:Yt,map:De,matcap:Ke,envMap:X,envMapMode:X&&J.mapping,envMapCubeUVHeight:te,aoMap:At,lightMap:Ne,bumpMap:Ge,normalMap:ge,displacementMap:u&&ct,emissiveMap:Ie,normalMapObjectSpace:ge&&b.normalMapType===tp,normalMapTangentSpace:ge&&b.normalMapType===Jo,metalnessMap:w,roughnessMap:T,anisotropy:q,anisotropyMap:Q,clearcoat:le,clearcoatMap:he,clearcoatNormalMap:Ce,clearcoatRoughnessMap:Je,iridescence:ae,iridescenceMap:oe,iridescenceThicknessMap:ht,sheen:ne,sheenColorMap:it,sheenRoughnessMap:je,specularMap:Fe,specularColorMap:Pe,specularIntensityMap:We,transmission:Se,transmissionMap:dt,thicknessMap:Tt,gradientMap:Qe,opaque:b.transparent===!1&&b.blending===Ts,alphaMap:de,alphaTest:D,alphaHash:ye,combine:b.combine,mapUv:De&&v(b.map.channel),aoMapUv:At&&v(b.aoMap.channel),lightMapUv:Ne&&v(b.lightMap.channel),bumpMapUv:Ge&&v(b.bumpMap.channel),normalMapUv:ge&&v(b.normalMap.channel),displacementMapUv:ct&&v(b.displacementMap.channel),emissiveMapUv:Ie&&v(b.emissiveMap.channel),metalnessMapUv:w&&v(b.metalnessMap.channel),roughnessMapUv:T&&v(b.roughnessMap.channel),anisotropyMapUv:Q&&v(b.anisotropyMap.channel),clearcoatMapUv:he&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Je&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:it&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:je&&v(b.sheenRoughnessMap.channel),specularMapUv:Fe&&v(b.specularMap.channel),specularColorMapUv:Pe&&v(b.specularColorMap.channel),specularIntensityMapUv:We&&v(b.specularIntensityMap.channel),transmissionMapUv:dt&&v(b.transmissionMap.channel),thicknessMapUv:Tt&&v(b.thicknessMap.channel),alphaMapUv:de&&v(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ge||q),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,vertexUv1s:Be,vertexUv2s:Ue,vertexUv3s:mt,pointsUvs:se.isPoints===!0&&!!W.attributes.uv&&(De||de),fog:!!N,useFog:b.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:se.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:ve,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&V.length>0,shadowMapType:n.shadowMap.type,toneMapping:gt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:De&&b.map.isVideoTexture===!0&&ut.getTransfer(b.map.colorSpace)===Et,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Qt,flipSided:b.side===ln,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:Me&&b.extensions.derivatives===!0,extensionFragDepth:Me&&b.extensions.fragDepth===!0,extensionDrawBuffers:Me&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:Me&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Me&&b.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function p(b){const A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(const V in b.defines)A.push(V),A.push(b.defines[V]);return b.isRawShaderMaterial===!1&&(M(A,b),y(A,b),A.push(n.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function M(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function y(b,A){o.disableAll(),A.isWebGL2&&o.enable(0),A.supportsVertexTextures&&o.enable(1),A.instancing&&o.enable(2),A.instancingColor&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),b.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.skinning&&o.enable(4),A.morphTargets&&o.enable(5),A.morphNormals&&o.enable(6),A.morphColors&&o.enable(7),A.premultipliedAlpha&&o.enable(8),A.shadowMapEnabled&&o.enable(9),A.useLegacyLights&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),b.push(o.mask)}function x(b){const A=g[b.type];let V;if(A){const Z=Un[A];V=Gp.clone(Z.uniforms)}else V=b.uniforms;return V}function L(b,A){let V;for(let Z=0,se=c.length;Z<se;Z++){const N=c[Z];if(N.cacheKey===A){V=N,++V.usedTimes;break}}return V===void 0&&(V=new nv(n,A,b,r),c.push(V)),V}function R(b){if(--b.usedTimes===0){const A=c.indexOf(b);c[A]=c[c.length-1],c.pop(),b.destroy()}}function P(b){l.remove(b)}function k(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:L,releaseProgram:R,releaseShaderCache:P,programs:c,dispose:k}}function ov(){let n=new WeakMap;function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function t(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function lv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Xc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function qc(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d,u,f,g,v,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=m),e++,p}function o(d,u,f,g,v,m){const p=a(d,u,f,g,v,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(d,u,f,g,v,m){const p=a(d,u,f,g,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(d,u){t.length>1&&t.sort(d||lv),i.length>1&&i.sort(u||Xc),s.length>1&&s.sort(u||Xc)}function h(){for(let d=e,u=n.length;d<u;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function cv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new qc,n.set(i,[a])):s>=r.length?(a=new qc,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function hv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new Re};break;case"SpotLight":t={position:new E,direction:new E,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new E,halfWidth:new E,halfHeight:new E};break}return n[e.id]=t,t}}}function dv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let uv=0;function fv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function pv(n,e){const t=new hv,i=dv(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new E);const r=new E,a=new nt,o=new nt;function l(h,d){let u=0,f=0,g=0;for(let Z=0;Z<9;Z++)s.probe[Z].set(0,0,0);let v=0,m=0,p=0,M=0,y=0,x=0,L=0,R=0,P=0,k=0,b=0;h.sort(fv);const A=d===!0?Math.PI:1;for(let Z=0,se=h.length;Z<se;Z++){const N=h[Z],W=N.color,$=N.intensity,J=N.distance,te=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)u+=W.r*$*A,f+=W.g*$*A,g+=W.b*$*A;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)s.probe[Y].addScaledVector(N.sh.coefficients[Y],$);b++}else if(N.isDirectionalLight){const Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity*A),N.castShadow){const ee=N.shadow,ce=i.get(N);ce.shadowBias=ee.bias,ce.shadowNormalBias=ee.normalBias,ce.shadowRadius=ee.radius,ce.shadowMapSize=ee.mapSize,s.directionalShadow[v]=ce,s.directionalShadowMap[v]=te,s.directionalShadowMatrix[v]=N.shadow.matrix,x++}s.directional[v]=Y,v++}else if(N.isSpotLight){const Y=t.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(W).multiplyScalar($*A),Y.distance=J,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,s.spot[p]=Y;const ee=N.shadow;if(N.map&&(s.spotLightMap[P]=N.map,P++,ee.updateMatrices(N),N.castShadow&&k++),s.spotLightMatrix[p]=ee.matrix,N.castShadow){const ce=i.get(N);ce.shadowBias=ee.bias,ce.shadowNormalBias=ee.normalBias,ce.shadowRadius=ee.radius,ce.shadowMapSize=ee.mapSize,s.spotShadow[p]=ce,s.spotShadowMap[p]=te,R++}p++}else if(N.isRectAreaLight){const Y=t.get(N);Y.color.copy(W).multiplyScalar($),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),s.rectArea[M]=Y,M++}else if(N.isPointLight){const Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity*A),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){const ee=N.shadow,ce=i.get(N);ce.shadowBias=ee.bias,ce.shadowNormalBias=ee.normalBias,ce.shadowRadius=ee.radius,ce.shadowMapSize=ee.mapSize,ce.shadowCameraNear=ee.camera.near,ce.shadowCameraFar=ee.camera.far,s.pointShadow[m]=ce,s.pointShadowMap[m]=te,s.pointShadowMatrix[m]=N.shadow.matrix,L++}s.point[m]=Y,m++}else if(N.isHemisphereLight){const Y=t.get(N);Y.skyColor.copy(N.color).multiplyScalar($*A),Y.groundColor.copy(N.groundColor).multiplyScalar($*A),s.hemi[y]=Y,y++}}M>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=_e.LTC_FLOAT_1,s.rectAreaLTC2=_e.LTC_FLOAT_2):(s.rectAreaLTC1=_e.LTC_HALF_1,s.rectAreaLTC2=_e.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=_e.LTC_FLOAT_1,s.rectAreaLTC2=_e.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=_e.LTC_HALF_1,s.rectAreaLTC2=_e.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=u,s.ambient[1]=f,s.ambient[2]=g;const V=s.hash;(V.directionalLength!==v||V.pointLength!==m||V.spotLength!==p||V.rectAreaLength!==M||V.hemiLength!==y||V.numDirectionalShadows!==x||V.numPointShadows!==L||V.numSpotShadows!==R||V.numSpotMaps!==P||V.numLightProbes!==b)&&(s.directional.length=v,s.spot.length=p,s.rectArea.length=M,s.point.length=m,s.hemi.length=y,s.directionalShadow.length=x,s.directionalShadowMap.length=x,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=R,s.spotShadowMap.length=R,s.directionalShadowMatrix.length=x,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=R+P-k,s.spotLightMap.length=P,s.numSpotLightShadowsWithMaps=k,s.numLightProbes=b,V.directionalLength=v,V.pointLength=m,V.spotLength=p,V.rectAreaLength=M,V.hemiLength=y,V.numDirectionalShadows=x,V.numPointShadows=L,V.numSpotShadows=R,V.numSpotMaps=P,V.numLightProbes=b,s.version=uv++)}function c(h,d){let u=0,f=0,g=0,v=0,m=0;const p=d.matrixWorldInverse;for(let M=0,y=h.length;M<y;M++){const x=h[M];if(x.isDirectionalLight){const L=s.directional[u];L.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),u++}else if(x.isSpotLight){const L=s.spot[g];L.position.setFromMatrixPosition(x.matrixWorld),L.position.applyMatrix4(p),L.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),g++}else if(x.isRectAreaLight){const L=s.rectArea[v];L.position.setFromMatrixPosition(x.matrixWorld),L.position.applyMatrix4(p),o.identity(),a.copy(x.matrixWorld),a.premultiply(p),o.extractRotation(a),L.halfWidth.set(x.width*.5,0,0),L.halfHeight.set(0,x.height*.5,0),L.halfWidth.applyMatrix4(o),L.halfHeight.applyMatrix4(o),v++}else if(x.isPointLight){const L=s.point[f];L.position.setFromMatrixPosition(x.matrixWorld),L.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){const L=s.hemi[m];L.direction.setFromMatrixPosition(x.matrixWorld),L.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:s}}function jc(n,e){const t=new pv(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function a(d){i.push(d)}function o(d){s.push(d)}function l(d){t.setup(i,d)}function c(d){t.setupView(i,d)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function mv(n,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new jc(n,e),t.set(r,[l])):a>=o.length?(l=new jc(n,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class gv extends xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _v extends xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yv=`uniform sampler2D shadow_pass;
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
}`;function Mv(n,e,t){let i=new el;const s=new Ee,r=new Ee,a=new Mt,o=new gv({depthPacking:ep}),l=new _v,c={},h=t.maxTextureSize,d={[ei]:ln,[ln]:ei,[Qt]:Qt},u=new Wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:vv,fragmentShader:yv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Pt;g.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new $e(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bh;let p=this.type;this.render=function(R,P,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const b=n.getRenderTarget(),A=n.getActiveCubeFace(),V=n.getActiveMipmapLevel(),Z=n.state;Z.setBlending(mi),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const se=p!==Jn&&this.type===Jn,N=p===Jn&&this.type!==Jn;for(let W=0,$=R.length;W<$;W++){const J=R[W],te=J.shadow;if(te===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(te.autoUpdate===!1&&te.needsUpdate===!1)continue;s.copy(te.mapSize);const Y=te.getFrameExtents();if(s.multiply(Y),r.copy(te.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,te.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,te.mapSize.y=r.y)),te.map===null||se===!0||N===!0){const ce=this.type!==Jn?{minFilter:kt,magFilter:kt}:{};te.map!==null&&te.map.dispose(),te.map=new Vi(s.x,s.y,ce),te.map.texture.name=J.name+".shadowMap",te.camera.updateProjectionMatrix()}n.setRenderTarget(te.map),n.clear();const ee=te.getViewportCount();for(let ce=0;ce<ee;ce++){const ve=te.getViewport(ce);a.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),Z.viewport(a),te.updateMatrices(J,ce),i=te.getFrustum(),x(P,k,te.camera,J,this.type)}te.isPointLightShadow!==!0&&this.type===Jn&&M(te,k),te.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,A,V)};function M(R,P){const k=e.update(v);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Vi(s.x,s.y)),u.uniforms.shadow_pass.value=R.map.texture,u.uniforms.resolution.value=R.mapSize,u.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(P,null,k,u,v,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(P,null,k,f,v,null)}function y(R,P,k,b){let A=null;const V=k.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(V!==void 0)A=V;else if(A=k.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const Z=A.uuid,se=P.uuid;let N=c[Z];N===void 0&&(N={},c[Z]=N);let W=N[se];W===void 0&&(W=A.clone(),N[se]=W,P.addEventListener("dispose",L)),A=W}if(A.visible=P.visible,A.wireframe=P.wireframe,b===Jn?A.side=P.shadowSide!==null?P.shadowSide:P.side:A.side=P.shadowSide!==null?P.shadowSide:d[P.side],A.alphaMap=P.alphaMap,A.alphaTest=P.alphaTest,A.map=P.map,A.clipShadows=P.clipShadows,A.clippingPlanes=P.clippingPlanes,A.clipIntersection=P.clipIntersection,A.displacementMap=P.displacementMap,A.displacementScale=P.displacementScale,A.displacementBias=P.displacementBias,A.wireframeLinewidth=P.wireframeLinewidth,A.linewidth=P.linewidth,k.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const Z=n.properties.get(A);Z.light=k}return A}function x(R,P,k,b,A){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&A===Jn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,R.matrixWorld);const se=e.update(R),N=R.material;if(Array.isArray(N)){const W=se.groups;for(let $=0,J=W.length;$<J;$++){const te=W[$],Y=N[te.materialIndex];if(Y&&Y.visible){const ee=y(R,Y,b,A);R.onBeforeShadow(n,R,P,k,se,ee,te),n.renderBufferDirect(k,null,se,ee,R,te),R.onAfterShadow(n,R,P,k,se,ee,te)}}}else if(N.visible){const W=y(R,N,b,A);R.onBeforeShadow(n,R,P,k,se,W,null),n.renderBufferDirect(k,null,se,W,R,null),R.onAfterShadow(n,R,P,k,se,W,null)}}const Z=R.children;for(let se=0,N=Z.length;se<N;se++)x(Z[se],P,k,b,A)}function L(R){R.target.removeEventListener("dispose",L);for(const k in c){const b=c[k],A=R.target.uuid;A in b&&(b[A].dispose(),delete b[A])}}}function bv(n,e,t){const i=t.isWebGL2;function s(){let D=!1;const ye=new Mt;let Me=null;const Be=new Mt(0,0,0,0);return{setMask:function(Ue){Me!==Ue&&!D&&(n.colorMask(Ue,Ue,Ue,Ue),Me=Ue)},setLocked:function(Ue){D=Ue},setClear:function(Ue,mt,gt,It,$t){$t===!0&&(Ue*=It,mt*=It,gt*=It),ye.set(Ue,mt,gt,It),Be.equals(ye)===!1&&(n.clearColor(Ue,mt,gt,It),Be.copy(ye))},reset:function(){D=!1,Me=null,Be.set(-1,0,0,0)}}}function r(){let D=!1,ye=null,Me=null,Be=null;return{setTest:function(Ue){Ue?Te(n.DEPTH_TEST):De(n.DEPTH_TEST)},setMask:function(Ue){ye!==Ue&&!D&&(n.depthMask(Ue),ye=Ue)},setFunc:function(Ue){if(Me!==Ue){switch(Ue){case Cf:n.depthFunc(n.NEVER);break;case Pf:n.depthFunc(n.ALWAYS);break;case Lf:n.depthFunc(n.LESS);break;case ha:n.depthFunc(n.LEQUAL);break;case If:n.depthFunc(n.EQUAL);break;case Df:n.depthFunc(n.GEQUAL);break;case Nf:n.depthFunc(n.GREATER);break;case Uf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Me=Ue}},setLocked:function(Ue){D=Ue},setClear:function(Ue){Be!==Ue&&(n.clearDepth(Ue),Be=Ue)},reset:function(){D=!1,ye=null,Me=null,Be=null}}}function a(){let D=!1,ye=null,Me=null,Be=null,Ue=null,mt=null,gt=null,It=null,$t=null;return{setTest:function(ft){D||(ft?Te(n.STENCIL_TEST):De(n.STENCIL_TEST))},setMask:function(ft){ye!==ft&&!D&&(n.stencilMask(ft),ye=ft)},setFunc:function(ft,Vt,tn){(Me!==ft||Be!==Vt||Ue!==tn)&&(n.stencilFunc(ft,Vt,tn),Me=ft,Be=Vt,Ue=tn)},setOp:function(ft,Vt,tn){(mt!==ft||gt!==Vt||It!==tn)&&(n.stencilOp(ft,Vt,tn),mt=ft,gt=Vt,It=tn)},setLocked:function(ft){D=ft},setClear:function(ft){$t!==ft&&(n.clearStencil(ft),$t=ft)},reset:function(){D=!1,ye=null,Me=null,Be=null,Ue=null,mt=null,gt=null,It=null,$t=null}}}const o=new s,l=new r,c=new a,h=new WeakMap,d=new WeakMap;let u={},f={},g=new WeakMap,v=[],m=null,p=!1,M=null,y=null,x=null,L=null,R=null,P=null,k=null,b=new Re(0,0,0),A=0,V=!1,Z=null,se=null,N=null,W=null,$=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let te=!1,Y=0;const ee=n.getParameter(n.VERSION);ee.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(ee)[1]),te=Y>=1):ee.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),te=Y>=2);let ce=null,ve={};const K=n.getParameter(n.SCISSOR_BOX),O=n.getParameter(n.VIEWPORT),re=new Mt().fromArray(K),me=new Mt().fromArray(O);function be(D,ye,Me,Be){const Ue=new Uint8Array(4),mt=n.createTexture();n.bindTexture(D,mt),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let gt=0;gt<Me;gt++)i&&(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)?n.texImage3D(ye,0,n.RGBA,1,1,Be,0,n.RGBA,n.UNSIGNED_BYTE,Ue):n.texImage2D(ye+gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ue);return mt}const ke={};ke[n.TEXTURE_2D]=be(n.TEXTURE_2D,n.TEXTURE_2D,1),ke[n.TEXTURE_CUBE_MAP]=be(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ke[n.TEXTURE_2D_ARRAY]=be(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ke[n.TEXTURE_3D]=be(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Te(n.DEPTH_TEST),l.setFunc(ha),Ie(!1),w(wl),Te(n.CULL_FACE),ge(mi);function Te(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function De(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function Ke(D,ye){return f[D]!==ye?(n.bindFramebuffer(D,ye),f[D]=ye,i&&(D===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ye),D===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ye)),!0):!1}function X(D,ye){let Me=v,Be=!1;if(D)if(Me=g.get(ye),Me===void 0&&(Me=[],g.set(ye,Me)),D.isWebGLMultipleRenderTargets){const Ue=D.texture;if(Me.length!==Ue.length||Me[0]!==n.COLOR_ATTACHMENT0){for(let mt=0,gt=Ue.length;mt<gt;mt++)Me[mt]=n.COLOR_ATTACHMENT0+mt;Me.length=Ue.length,Be=!0}}else Me[0]!==n.COLOR_ATTACHMENT0&&(Me[0]=n.COLOR_ATTACHMENT0,Be=!0);else Me[0]!==n.BACK&&(Me[0]=n.BACK,Be=!0);Be&&(t.isWebGL2?n.drawBuffers(Me):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Me))}function At(D){return m!==D?(n.useProgram(D),m=D,!0):!1}const Ne={[Ii]:n.FUNC_ADD,[pf]:n.FUNC_SUBTRACT,[mf]:n.FUNC_REVERSE_SUBTRACT};if(i)Ne[Pl]=n.MIN,Ne[Ll]=n.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(Ne[Pl]=D.MIN_EXT,Ne[Ll]=D.MAX_EXT)}const Ge={[gf]:n.ZERO,[_f]:n.ONE,[vf]:n.SRC_COLOR,[Lo]:n.SRC_ALPHA,[xf]:n.SRC_ALPHA_SATURATE,[Sf]:n.DST_COLOR,[Mf]:n.DST_ALPHA,[yf]:n.ONE_MINUS_SRC_COLOR,[Io]:n.ONE_MINUS_SRC_ALPHA,[Tf]:n.ONE_MINUS_DST_COLOR,[bf]:n.ONE_MINUS_DST_ALPHA,[Ef]:n.CONSTANT_COLOR,[Af]:n.ONE_MINUS_CONSTANT_COLOR,[wf]:n.CONSTANT_ALPHA,[Rf]:n.ONE_MINUS_CONSTANT_ALPHA};function ge(D,ye,Me,Be,Ue,mt,gt,It,$t,ft){if(D===mi){p===!0&&(De(n.BLEND),p=!1);return}if(p===!1&&(Te(n.BLEND),p=!0),D!==ff){if(D!==M||ft!==V){if((y!==Ii||R!==Ii)&&(n.blendEquation(n.FUNC_ADD),y=Ii,R=Ii),ft)switch(D){case Ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Po:n.blendFunc(n.ONE,n.ONE);break;case Rl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Cl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Po:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Rl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Cl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}x=null,L=null,P=null,k=null,b.set(0,0,0),A=0,M=D,V=ft}return}Ue=Ue||ye,mt=mt||Me,gt=gt||Be,(ye!==y||Ue!==R)&&(n.blendEquationSeparate(Ne[ye],Ne[Ue]),y=ye,R=Ue),(Me!==x||Be!==L||mt!==P||gt!==k)&&(n.blendFuncSeparate(Ge[Me],Ge[Be],Ge[mt],Ge[gt]),x=Me,L=Be,P=mt,k=gt),(It.equals(b)===!1||$t!==A)&&(n.blendColor(It.r,It.g,It.b,$t),b.copy(It),A=$t),M=D,V=!1}function ct(D,ye){D.side===Qt?De(n.CULL_FACE):Te(n.CULL_FACE);let Me=D.side===ln;ye&&(Me=!Me),Ie(Me),D.blending===Ts&&D.transparent===!1?ge(mi):ge(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),o.setMask(D.colorWrite);const Be=D.stencilWrite;c.setTest(Be),Be&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),q(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Te(n.SAMPLE_ALPHA_TO_COVERAGE):De(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(D){Z!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),Z=D)}function w(D){D!==df?(Te(n.CULL_FACE),D!==se&&(D===wl?n.cullFace(n.BACK):D===uf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):De(n.CULL_FACE),se=D}function T(D){D!==N&&(te&&n.lineWidth(D),N=D)}function q(D,ye,Me){D?(Te(n.POLYGON_OFFSET_FILL),(W!==ye||$!==Me)&&(n.polygonOffset(ye,Me),W=ye,$=Me)):De(n.POLYGON_OFFSET_FILL)}function le(D){D?Te(n.SCISSOR_TEST):De(n.SCISSOR_TEST)}function ae(D){D===void 0&&(D=n.TEXTURE0+J-1),ce!==D&&(n.activeTexture(D),ce=D)}function ne(D,ye,Me){Me===void 0&&(ce===null?Me=n.TEXTURE0+J-1:Me=ce);let Be=ve[Me];Be===void 0&&(Be={type:void 0,texture:void 0},ve[Me]=Be),(Be.type!==D||Be.texture!==ye)&&(ce!==Me&&(n.activeTexture(Me),ce=Me),n.bindTexture(D,ye||ke[D]),Be.type=D,Be.texture=ye)}function Se(){const D=ve[ce];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Q(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function he(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Je(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function oe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ht(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function je(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Fe(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function We(D){re.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),re.copy(D))}function dt(D){me.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),me.copy(D))}function Tt(D,ye){let Me=d.get(ye);Me===void 0&&(Me=new WeakMap,d.set(ye,Me));let Be=Me.get(D);Be===void 0&&(Be=n.getUniformBlockIndex(ye,D.name),Me.set(D,Be))}function Qe(D,ye){const Be=d.get(ye).get(D);h.get(ye)!==Be&&(n.uniformBlockBinding(ye,Be,D.__bindingPointIndex),h.set(ye,Be))}function de(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ce=null,ve={},f={},g=new WeakMap,v=[],m=null,p=!1,M=null,y=null,x=null,L=null,R=null,P=null,k=null,b=new Re(0,0,0),A=0,V=!1,Z=null,se=null,N=null,W=null,$=null,re.set(0,0,n.canvas.width,n.canvas.height),me.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Te,disable:De,bindFramebuffer:Ke,drawBuffers:X,useProgram:At,setBlending:ge,setMaterial:ct,setFlipSided:Ie,setCullFace:w,setLineWidth:T,setPolygonOffset:q,setScissorTest:le,activeTexture:ae,bindTexture:ne,unbindTexture:Se,compressedTexImage2D:Q,compressedTexImage3D:he,texImage2D:Fe,texImage3D:Pe,updateUBOMapping:Tt,uniformBlockBinding:Qe,texStorage2D:it,texStorage3D:je,texSubImage2D:Ce,texSubImage3D:Je,compressedTexSubImage2D:oe,compressedTexSubImage3D:ht,scissor:We,viewport:dt,reset:de}}function Sv(n,e,t,i,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,T){return f?new OffscreenCanvas(w,T):pr("canvas")}function v(w,T,q,le){let ae=1;if((w.width>le||w.height>le)&&(ae=le/Math.max(w.width,w.height)),ae<1||T===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const ne=T?ga:Math.floor,Se=ne(ae*w.width),Q=ne(ae*w.height);d===void 0&&(d=g(Se,Q));const he=q?g(Se,Q):d;return he.width=Se,he.height=Q,he.getContext("2d").drawImage(w,0,0,Se,Q),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+Se+"x"+Q+")."),he}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function m(w){return Bo(w.width)&&Bo(w.height)}function p(w){return o?!1:w.wrapS!==bn||w.wrapT!==bn||w.minFilter!==kt&&w.minFilter!==cn}function M(w,T){return w.generateMipmaps&&T&&w.minFilter!==kt&&w.minFilter!==cn}function y(w){n.generateMipmap(w)}function x(w,T,q,le,ae=!1){if(o===!1)return T;if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ne=T;if(T===n.RED&&(q===n.FLOAT&&(ne=n.R32F),q===n.HALF_FLOAT&&(ne=n.R16F),q===n.UNSIGNED_BYTE&&(ne=n.R8)),T===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(ne=n.R8UI),q===n.UNSIGNED_SHORT&&(ne=n.R16UI),q===n.UNSIGNED_INT&&(ne=n.R32UI),q===n.BYTE&&(ne=n.R8I),q===n.SHORT&&(ne=n.R16I),q===n.INT&&(ne=n.R32I)),T===n.RG&&(q===n.FLOAT&&(ne=n.RG32F),q===n.HALF_FLOAT&&(ne=n.RG16F),q===n.UNSIGNED_BYTE&&(ne=n.RG8)),T===n.RGBA){const Se=ae?ua:ut.getTransfer(le);q===n.FLOAT&&(ne=n.RGBA32F),q===n.HALF_FLOAT&&(ne=n.RGBA16F),q===n.UNSIGNED_BYTE&&(ne=Se===Et?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(ne=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(ne=n.RGB5_A1)}return(ne===n.R16F||ne===n.R32F||ne===n.RG16F||ne===n.RG32F||ne===n.RGBA16F||ne===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function L(w,T,q){return M(w,q)===!0||w.isFramebufferTexture&&w.minFilter!==kt&&w.minFilter!==cn?Math.log2(Math.max(T.width,T.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?T.mipmaps.length:1}function R(w){return w===kt||w===Uo||w===sa?n.NEAREST:n.LINEAR}function P(w){const T=w.target;T.removeEventListener("dispose",P),b(T),T.isVideoTexture&&h.delete(T)}function k(w){const T=w.target;T.removeEventListener("dispose",k),V(T)}function b(w){const T=i.get(w);if(T.__webglInit===void 0)return;const q=w.source,le=u.get(q);if(le){const ae=le[T.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&A(w),Object.keys(le).length===0&&u.delete(q)}i.remove(w)}function A(w){const T=i.get(w);n.deleteTexture(T.__webglTexture);const q=w.source,le=u.get(q);delete le[T.__cacheKey],a.memory.textures--}function V(w){const T=w.texture,q=i.get(w),le=i.get(T);if(le.__webglTexture!==void 0&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(q.__webglFramebuffer[ae]))for(let ne=0;ne<q.__webglFramebuffer[ae].length;ne++)n.deleteFramebuffer(q.__webglFramebuffer[ae][ne]);else n.deleteFramebuffer(q.__webglFramebuffer[ae]);q.__webglDepthbuffer&&n.deleteRenderbuffer(q.__webglDepthbuffer[ae])}else{if(Array.isArray(q.__webglFramebuffer))for(let ae=0;ae<q.__webglFramebuffer.length;ae++)n.deleteFramebuffer(q.__webglFramebuffer[ae]);else n.deleteFramebuffer(q.__webglFramebuffer);if(q.__webglDepthbuffer&&n.deleteRenderbuffer(q.__webglDepthbuffer),q.__webglMultisampledFramebuffer&&n.deleteFramebuffer(q.__webglMultisampledFramebuffer),q.__webglColorRenderbuffer)for(let ae=0;ae<q.__webglColorRenderbuffer.length;ae++)q.__webglColorRenderbuffer[ae]&&n.deleteRenderbuffer(q.__webglColorRenderbuffer[ae]);q.__webglDepthRenderbuffer&&n.deleteRenderbuffer(q.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let ae=0,ne=T.length;ae<ne;ae++){const Se=i.get(T[ae]);Se.__webglTexture&&(n.deleteTexture(Se.__webglTexture),a.memory.textures--),i.remove(T[ae])}i.remove(T),i.remove(w)}let Z=0;function se(){Z=0}function N(){const w=Z;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),Z+=1,w}function W(w){const T=[];return T.push(w.wrapS),T.push(w.wrapT),T.push(w.wrapR||0),T.push(w.magFilter),T.push(w.minFilter),T.push(w.anisotropy),T.push(w.internalFormat),T.push(w.format),T.push(w.type),T.push(w.generateMipmaps),T.push(w.premultiplyAlpha),T.push(w.flipY),T.push(w.unpackAlignment),T.push(w.colorSpace),T.join()}function $(w,T){const q=i.get(w);if(w.isVideoTexture&&ct(w),w.isRenderTargetTexture===!1&&w.version>0&&q.__version!==w.version){const le=w.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{re(q,w,T);return}}t.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+T)}function J(w,T){const q=i.get(w);if(w.version>0&&q.__version!==w.version){re(q,w,T);return}t.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+T)}function te(w,T){const q=i.get(w);if(w.version>0&&q.__version!==w.version){re(q,w,T);return}t.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+T)}function Y(w,T){const q=i.get(w);if(w.version>0&&q.__version!==w.version){me(q,w,T);return}t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+T)}const ee={[Mi]:n.REPEAT,[bn]:n.CLAMP_TO_EDGE,[da]:n.MIRRORED_REPEAT},ce={[kt]:n.NEAREST,[Uo]:n.NEAREST_MIPMAP_NEAREST,[sa]:n.NEAREST_MIPMAP_LINEAR,[cn]:n.LINEAR,[Gh]:n.LINEAR_MIPMAP_NEAREST,[Gi]:n.LINEAR_MIPMAP_LINEAR},ve={[np]:n.NEVER,[lp]:n.ALWAYS,[ip]:n.LESS,[Qh]:n.LEQUAL,[sp]:n.EQUAL,[op]:n.GEQUAL,[rp]:n.GREATER,[ap]:n.NOTEQUAL};function K(w,T,q){if(q?(n.texParameteri(w,n.TEXTURE_WRAP_S,ee[T.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,ee[T.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,ee[T.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,ce[T.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,ce[T.minFilter])):(n.texParameteri(w,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(w,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(T.wrapS!==bn||T.wrapT!==bn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(w,n.TEXTURE_MAG_FILTER,R(T.magFilter)),n.texParameteri(w,n.TEXTURE_MIN_FILTER,R(T.minFilter)),T.minFilter!==kt&&T.minFilter!==cn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,ve[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const le=e.get("EXT_texture_filter_anisotropic");if(T.magFilter===kt||T.minFilter!==sa&&T.minFilter!==Gi||T.type===Zn&&e.has("OES_texture_float_linear")===!1||o===!1&&T.type===ur&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||i.get(T).__currentAnisotropy)&&(n.texParameterf(w,le.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy)}}function O(w,T){let q=!1;w.__webglInit===void 0&&(w.__webglInit=!0,T.addEventListener("dispose",P));const le=T.source;let ae=u.get(le);ae===void 0&&(ae={},u.set(le,ae));const ne=W(T);if(ne!==w.__cacheKey){ae[ne]===void 0&&(ae[ne]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ae[ne].usedTimes++;const Se=ae[w.__cacheKey];Se!==void 0&&(ae[w.__cacheKey].usedTimes--,Se.usedTimes===0&&A(T)),w.__cacheKey=ne,w.__webglTexture=ae[ne].texture}return q}function re(w,T,q){let le=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(le=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(le=n.TEXTURE_3D);const ae=O(w,T),ne=T.source;t.bindTexture(le,w.__webglTexture,n.TEXTURE0+q);const Se=i.get(ne);if(ne.version!==Se.__version||ae===!0){t.activeTexture(n.TEXTURE0+q);const Q=ut.getPrimaries(ut.workingColorSpace),he=T.colorSpace===Tn?null:ut.getPrimaries(T.colorSpace),Ce=T.colorSpace===Tn||Q===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Je=p(T)&&m(T.image)===!1;let oe=v(T.image,Je,!1,s.maxTextureSize);oe=Ie(T,oe);const ht=m(oe)||o,it=r.convert(T.format,T.colorSpace);let je=r.convert(T.type),Fe=x(T.internalFormat,it,je,T.colorSpace,T.isVideoTexture);K(le,T,ht);let Pe;const We=T.mipmaps,dt=o&&T.isVideoTexture!==!0&&Fe!==Kh,Tt=Se.__version===void 0||ae===!0,Qe=L(T,oe,ht);if(T.isDepthTexture)Fe=n.DEPTH_COMPONENT,o?T.type===Zn?Fe=n.DEPTH_COMPONENT32F:T.type===fi?Fe=n.DEPTH_COMPONENT24:T.type===Oi?Fe=n.DEPTH24_STENCIL8:Fe=n.DEPTH_COMPONENT16:T.type===Zn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===ki&&Fe===n.DEPTH_COMPONENT&&T.type!==Ko&&T.type!==fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=fi,je=r.convert(T.type)),T.format===Cs&&Fe===n.DEPTH_COMPONENT&&(Fe=n.DEPTH_STENCIL,T.type!==Oi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=Oi,je=r.convert(T.type))),Tt&&(dt?t.texStorage2D(n.TEXTURE_2D,1,Fe,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,Fe,oe.width,oe.height,0,it,je,null));else if(T.isDataTexture)if(We.length>0&&ht){dt&&Tt&&t.texStorage2D(n.TEXTURE_2D,Qe,Fe,We[0].width,We[0].height);for(let de=0,D=We.length;de<D;de++)Pe=We[de],dt?t.texSubImage2D(n.TEXTURE_2D,de,0,0,Pe.width,Pe.height,it,je,Pe.data):t.texImage2D(n.TEXTURE_2D,de,Fe,Pe.width,Pe.height,0,it,je,Pe.data);T.generateMipmaps=!1}else dt?(Tt&&t.texStorage2D(n.TEXTURE_2D,Qe,Fe,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe.width,oe.height,it,je,oe.data)):t.texImage2D(n.TEXTURE_2D,0,Fe,oe.width,oe.height,0,it,je,oe.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){dt&&Tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Qe,Fe,We[0].width,We[0].height,oe.depth);for(let de=0,D=We.length;de<D;de++)Pe=We[de],T.format!==Sn?it!==null?dt?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Pe.width,Pe.height,oe.depth,it,Pe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,Fe,Pe.width,Pe.height,oe.depth,0,Pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Pe.width,Pe.height,oe.depth,it,je,Pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,Fe,Pe.width,Pe.height,oe.depth,0,it,je,Pe.data)}else{dt&&Tt&&t.texStorage2D(n.TEXTURE_2D,Qe,Fe,We[0].width,We[0].height);for(let de=0,D=We.length;de<D;de++)Pe=We[de],T.format!==Sn?it!==null?dt?t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,Pe.width,Pe.height,it,Pe.data):t.compressedTexImage2D(n.TEXTURE_2D,de,Fe,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage2D(n.TEXTURE_2D,de,0,0,Pe.width,Pe.height,it,je,Pe.data):t.texImage2D(n.TEXTURE_2D,de,Fe,Pe.width,Pe.height,0,it,je,Pe.data)}else if(T.isDataArrayTexture)dt?(Tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Qe,Fe,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,it,je,oe.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Fe,oe.width,oe.height,oe.depth,0,it,je,oe.data);else if(T.isData3DTexture)dt?(Tt&&t.texStorage3D(n.TEXTURE_3D,Qe,Fe,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,it,je,oe.data)):t.texImage3D(n.TEXTURE_3D,0,Fe,oe.width,oe.height,oe.depth,0,it,je,oe.data);else if(T.isFramebufferTexture){if(Tt)if(dt)t.texStorage2D(n.TEXTURE_2D,Qe,Fe,oe.width,oe.height);else{let de=oe.width,D=oe.height;for(let ye=0;ye<Qe;ye++)t.texImage2D(n.TEXTURE_2D,ye,Fe,de,D,0,it,je,null),de>>=1,D>>=1}}else if(We.length>0&&ht){dt&&Tt&&t.texStorage2D(n.TEXTURE_2D,Qe,Fe,We[0].width,We[0].height);for(let de=0,D=We.length;de<D;de++)Pe=We[de],dt?t.texSubImage2D(n.TEXTURE_2D,de,0,0,it,je,Pe):t.texImage2D(n.TEXTURE_2D,de,Fe,it,je,Pe);T.generateMipmaps=!1}else dt?(Tt&&t.texStorage2D(n.TEXTURE_2D,Qe,Fe,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,it,je,oe)):t.texImage2D(n.TEXTURE_2D,0,Fe,it,je,oe);M(T,ht)&&y(le),Se.__version=ne.version,T.onUpdate&&T.onUpdate(T)}w.__version=T.version}function me(w,T,q){if(T.image.length!==6)return;const le=O(w,T),ae=T.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+q);const ne=i.get(ae);if(ae.version!==ne.__version||le===!0){t.activeTexture(n.TEXTURE0+q);const Se=ut.getPrimaries(ut.workingColorSpace),Q=T.colorSpace===Tn?null:ut.getPrimaries(T.colorSpace),he=T.colorSpace===Tn||Se===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ce=T.isCompressedTexture||T.image[0].isCompressedTexture,Je=T.image[0]&&T.image[0].isDataTexture,oe=[];for(let de=0;de<6;de++)!Ce&&!Je?oe[de]=v(T.image[de],!1,!0,s.maxCubemapSize):oe[de]=Je?T.image[de].image:T.image[de],oe[de]=Ie(T,oe[de]);const ht=oe[0],it=m(ht)||o,je=r.convert(T.format,T.colorSpace),Fe=r.convert(T.type),Pe=x(T.internalFormat,je,Fe,T.colorSpace),We=o&&T.isVideoTexture!==!0,dt=ne.__version===void 0||le===!0;let Tt=L(T,ht,it);K(n.TEXTURE_CUBE_MAP,T,it);let Qe;if(Ce){We&&dt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,Pe,ht.width,ht.height);for(let de=0;de<6;de++){Qe=oe[de].mipmaps;for(let D=0;D<Qe.length;D++){const ye=Qe[D];T.format!==Sn?je!==null?We?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,D,0,0,ye.width,ye.height,je,ye.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,D,Pe,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,D,0,0,ye.width,ye.height,je,Fe,ye.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,D,Pe,ye.width,ye.height,0,je,Fe,ye.data)}}}else{Qe=T.mipmaps,We&&dt&&(Qe.length>0&&Tt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,Pe,oe[0].width,oe[0].height));for(let de=0;de<6;de++)if(Je){We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,oe[de].width,oe[de].height,je,Fe,oe[de].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Pe,oe[de].width,oe[de].height,0,je,Fe,oe[de].data);for(let D=0;D<Qe.length;D++){const Me=Qe[D].image[de].image;We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,D+1,0,0,Me.width,Me.height,je,Fe,Me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,D+1,Pe,Me.width,Me.height,0,je,Fe,Me.data)}}else{We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,je,Fe,oe[de]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Pe,je,Fe,oe[de]);for(let D=0;D<Qe.length;D++){const ye=Qe[D];We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,D+1,0,0,je,Fe,ye.image[de]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,D+1,Pe,je,Fe,ye.image[de])}}}M(T,it)&&y(n.TEXTURE_CUBE_MAP),ne.__version=ae.version,T.onUpdate&&T.onUpdate(T)}w.__version=T.version}function be(w,T,q,le,ae,ne){const Se=r.convert(q.format,q.colorSpace),Q=r.convert(q.type),he=x(q.internalFormat,Se,Q,q.colorSpace);if(!i.get(T).__hasExternalTextures){const Je=Math.max(1,T.width>>ne),oe=Math.max(1,T.height>>ne);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,ne,he,Je,oe,T.depth,0,Se,Q,null):t.texImage2D(ae,ne,he,Je,oe,0,Se,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),ge(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,ae,i.get(q).__webglTexture,0,Ge(T)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,le,ae,i.get(q).__webglTexture,ne),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(w,T,q){if(n.bindRenderbuffer(n.RENDERBUFFER,w),T.depthBuffer&&!T.stencilBuffer){let le=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(q||ge(T)){const ae=T.depthTexture;ae&&ae.isDepthTexture&&(ae.type===Zn?le=n.DEPTH_COMPONENT32F:ae.type===fi&&(le=n.DEPTH_COMPONENT24));const ne=Ge(T);ge(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,le,T.width,T.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,le,T.width,T.height)}else n.renderbufferStorage(n.RENDERBUFFER,le,T.width,T.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,w)}else if(T.depthBuffer&&T.stencilBuffer){const le=Ge(T);q&&ge(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,n.DEPTH24_STENCIL8,T.width,T.height):ge(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,n.DEPTH24_STENCIL8,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,w)}else{const le=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let ae=0;ae<le.length;ae++){const ne=le[ae],Se=r.convert(ne.format,ne.colorSpace),Q=r.convert(ne.type),he=x(ne.internalFormat,Se,Q,ne.colorSpace),Ce=Ge(T);q&&ge(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,he,T.width,T.height):ge(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce,he,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,he,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Te(w,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),$(T.depthTexture,0);const le=i.get(T.depthTexture).__webglTexture,ae=Ge(T);if(T.depthTexture.format===ki)ge(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,le,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,le,0);else if(T.depthTexture.format===Cs)ge(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,le,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function De(w){const T=i.get(w),q=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!T.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Te(T.__webglFramebuffer,w)}else if(q){T.__webglDepthbuffer=[];for(let le=0;le<6;le++)t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[le]),T.__webglDepthbuffer[le]=n.createRenderbuffer(),ke(T.__webglDepthbuffer[le],w,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=n.createRenderbuffer(),ke(T.__webglDepthbuffer,w,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ke(w,T,q){const le=i.get(w);T!==void 0&&be(le.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&De(w)}function X(w){const T=w.texture,q=i.get(w),le=i.get(T);w.addEventListener("dispose",k),w.isWebGLMultipleRenderTargets!==!0&&(le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture()),le.__version=T.version,a.memory.textures++);const ae=w.isWebGLCubeRenderTarget===!0,ne=w.isWebGLMultipleRenderTargets===!0,Se=m(w)||o;if(ae){q.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(o&&T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer[Q]=[];for(let he=0;he<T.mipmaps.length;he++)q.__webglFramebuffer[Q][he]=n.createFramebuffer()}else q.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(o&&T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer=[];for(let Q=0;Q<T.mipmaps.length;Q++)q.__webglFramebuffer[Q]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(ne)if(s.drawBuffers){const Q=w.texture;for(let he=0,Ce=Q.length;he<Ce;he++){const Je=i.get(Q[he]);Je.__webglTexture===void 0&&(Je.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&w.samples>0&&ge(w)===!1){const Q=ne?T:[T];q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let he=0;he<Q.length;he++){const Ce=Q[he];q.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[he]);const Je=r.convert(Ce.format,Ce.colorSpace),oe=r.convert(Ce.type),ht=x(Ce.internalFormat,Je,oe,Ce.colorSpace,w.isXRRenderTarget===!0),it=Ge(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,it,ht,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,q.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),ke(q.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ae){t.bindTexture(n.TEXTURE_CUBE_MAP,le.__webglTexture),K(n.TEXTURE_CUBE_MAP,T,Se);for(let Q=0;Q<6;Q++)if(o&&T.mipmaps&&T.mipmaps.length>0)for(let he=0;he<T.mipmaps.length;he++)be(q.__webglFramebuffer[Q][he],w,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,he);else be(q.__webglFramebuffer[Q],w,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);M(T,Se)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){const Q=w.texture;for(let he=0,Ce=Q.length;he<Ce;he++){const Je=Q[he],oe=i.get(Je);t.bindTexture(n.TEXTURE_2D,oe.__webglTexture),K(n.TEXTURE_2D,Je,Se),be(q.__webglFramebuffer,w,Je,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,0),M(Je,Se)&&y(n.TEXTURE_2D)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(o?Q=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Q,le.__webglTexture),K(Q,T,Se),o&&T.mipmaps&&T.mipmaps.length>0)for(let he=0;he<T.mipmaps.length;he++)be(q.__webglFramebuffer[he],w,T,n.COLOR_ATTACHMENT0,Q,he);else be(q.__webglFramebuffer,w,T,n.COLOR_ATTACHMENT0,Q,0);M(T,Se)&&y(Q),t.unbindTexture()}w.depthBuffer&&De(w)}function At(w){const T=m(w)||o,q=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let le=0,ae=q.length;le<ae;le++){const ne=q[le];if(M(ne,T)){const Se=w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Q=i.get(ne).__webglTexture;t.bindTexture(Se,Q),y(Se),t.unbindTexture()}}}function Ne(w){if(o&&w.samples>0&&ge(w)===!1){const T=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],q=w.width,le=w.height;let ae=n.COLOR_BUFFER_BIT;const ne=[],Se=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=i.get(w),he=w.isWebGLMultipleRenderTargets===!0;if(he)for(let Ce=0;Ce<T.length;Ce++)t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Q.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglFramebuffer);for(let Ce=0;Ce<T.length;Ce++){ne.push(n.COLOR_ATTACHMENT0+Ce),w.depthBuffer&&ne.push(Se);const Je=Q.__ignoreDepthValues!==void 0?Q.__ignoreDepthValues:!1;if(Je===!1&&(w.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),he&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Q.__webglColorRenderbuffer[Ce]),Je===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Se]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Se])),he){const oe=i.get(T[Ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,q,le,0,0,q,le,ae,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ne)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let Ce=0;Ce<T.length;Ce++){t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,Q.__webglColorRenderbuffer[Ce]);const Je=i.get(T[Ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,Je,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglMultisampledFramebuffer)}}function Ge(w){return Math.min(s.maxSamples,w.samples)}function ge(w){const T=i.get(w);return o&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function ct(w){const T=a.render.frame;h.get(w)!==T&&(h.set(w,T),w.update())}function Ie(w,T){const q=w.colorSpace,le=w.format,ae=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===Fo||q!==Yt&&q!==Tn&&(ut.getTransfer(q)===Et?o===!1?e.has("EXT_sRGB")===!0&&le===Sn?(w.format=Fo,w.minFilter=cn,w.generateMipmaps=!1):T=td.sRGBToLinear(T):(le!==Sn||ae!==_i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),T}this.allocateTextureUnit=N,this.resetTextureUnits=se,this.setTexture2D=$,this.setTexture2DArray=J,this.setTexture3D=te,this.setTextureCube=Y,this.rebindTextures=Ke,this.setupRenderTarget=X,this.updateRenderTargetMipmap=At,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=be,this.useMultisampledRTT=ge}function Tv(n,e,t){const i=t.isWebGL2;function s(r,a=Tn){let o;const l=ut.getTransfer(a);if(r===_i)return n.UNSIGNED_BYTE;if(r===Wh)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Xh)return n.UNSIGNED_SHORT_5_5_5_1;if(r===Wf)return n.BYTE;if(r===Xf)return n.SHORT;if(r===Ko)return n.UNSIGNED_SHORT;if(r===Vh)return n.INT;if(r===fi)return n.UNSIGNED_INT;if(r===Zn)return n.FLOAT;if(r===ur)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===qf)return n.ALPHA;if(r===Sn)return n.RGBA;if(r===jf)return n.LUMINANCE;if(r===Yf)return n.LUMINANCE_ALPHA;if(r===ki)return n.DEPTH_COMPONENT;if(r===Cs)return n.DEPTH_STENCIL;if(r===Fo)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===qh)return n.RED;if(r===jh)return n.RED_INTEGER;if(r===$f)return n.RG;if(r===Yh)return n.RG_INTEGER;if(r===$h)return n.RGBA_INTEGER;if(r===Oa||r===ka||r===Fa||r===Ba)if(l===Et)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Oa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ka)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Fa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ba)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Oa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ka)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Fa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ba)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Dl||r===Nl||r===Ul||r===Ol)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Dl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Nl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ul)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ol)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Kh)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===kl||r===Fl)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===kl)return l===Et?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Fl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Bl||r===zl||r===Hl||r===Gl||r===Vl||r===Wl||r===Xl||r===ql||r===jl||r===Yl||r===$l||r===Kl||r===Jl||r===Zl)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Bl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===zl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Hl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Gl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Vl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Wl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Xl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ql)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===jl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Yl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===$l)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Kl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Jl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Zl)return l===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===za||r===Ql||r===ec)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===za)return l===Et?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ql)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ec)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Kf||r===tc||r===nc||r===ic)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===za)return o.COMPRESSED_RED_RGTC1_EXT;if(r===tc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===nc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ic)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Oi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class xv extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Nt extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ev={type:"move"};class ho{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ev)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Nt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Av extends ks{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const v=t.getContextAttributes();let m=null,p=null;const M=[],y=[],x=new Ee;let L=null;const R=new Zt;R.layers.enable(1),R.viewport=new Mt;const P=new Zt;P.layers.enable(2),P.viewport=new Mt;const k=[R,P],b=new xv;b.layers.enable(1),b.layers.enable(2);let A=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let O=M[K];return O===void 0&&(O=new ho,M[K]=O),O.getTargetRaySpace()},this.getControllerGrip=function(K){let O=M[K];return O===void 0&&(O=new ho,M[K]=O),O.getGripSpace()},this.getHand=function(K){let O=M[K];return O===void 0&&(O=new ho,M[K]=O),O.getHandSpace()};function Z(K){const O=y.indexOf(K.inputSource);if(O===-1)return;const re=M[O];re!==void 0&&(re.update(K.inputSource,K.frame,c||a),re.dispatchEvent({type:K.type,data:K.inputSource}))}function se(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",se),s.removeEventListener("inputsourceschange",N);for(let K=0;K<M.length;K++){const O=y[K];O!==null&&(y[K]=null,M[K].disconnect(O))}A=null,V=null,e.setRenderTarget(m),f=null,u=null,d=null,s=null,p=null,ve.stop(),i.isPresenting=!1,e.setPixelRatio(L),e.setSize(x.width,x.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",se),s.addEventListener("inputsourceschange",N),v.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(x),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const O={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,O),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Vi(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:_i,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let O=null,re=null,me=null;v.depth&&(me=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,O=v.stencil?Cs:ki,re=v.stencil?Oi:fi);const be={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};d=new XRWebGLBinding(s,t),u=d.createProjectionLayer(be),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),p=new Vi(u.textureWidth,u.textureHeight,{format:Sn,type:_i,depthTexture:new ud(u.textureWidth,u.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const ke=e.properties.get(p);ke.__ignoreDepthValues=u.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ve.setContext(s),ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function N(K){for(let O=0;O<K.removed.length;O++){const re=K.removed[O],me=y.indexOf(re);me>=0&&(y[me]=null,M[me].disconnect(re))}for(let O=0;O<K.added.length;O++){const re=K.added[O];let me=y.indexOf(re);if(me===-1){for(let ke=0;ke<M.length;ke++)if(ke>=y.length){y.push(re),me=ke;break}else if(y[ke]===null){y[ke]=re,me=ke;break}if(me===-1)break}const be=M[me];be&&be.connect(re)}}const W=new E,$=new E;function J(K,O,re){W.setFromMatrixPosition(O.matrixWorld),$.setFromMatrixPosition(re.matrixWorld);const me=W.distanceTo($),be=O.projectionMatrix.elements,ke=re.projectionMatrix.elements,Te=be[14]/(be[10]-1),De=be[14]/(be[10]+1),Ke=(be[9]+1)/be[5],X=(be[9]-1)/be[5],At=(be[8]-1)/be[0],Ne=(ke[8]+1)/ke[0],Ge=Te*At,ge=Te*Ne,ct=me/(-At+Ne),Ie=ct*-At;O.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ie),K.translateZ(ct),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();const w=Te+ct,T=De+ct,q=Ge-Ie,le=ge+(me-Ie),ae=Ke*De/T*w,ne=X*De/T*w;K.projectionMatrix.makePerspective(q,le,ae,ne,w,T),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function te(K,O){O===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(O.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;b.near=P.near=R.near=K.near,b.far=P.far=R.far=K.far,(A!==b.near||V!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),A=b.near,V=b.far);const O=K.parent,re=b.cameras;te(b,O);for(let me=0;me<re.length;me++)te(re[me],O);re.length===2?J(b,R,P):b.projectionMatrix.copy(R.projectionMatrix),Y(K,b,O)};function Y(K,O,re){re===null?K.matrix.copy(O.matrixWorld):(K.matrix.copy(re.matrixWorld),K.matrix.invert(),K.matrix.multiply(O.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(O.projectionMatrix),K.projectionMatrixInverse.copy(O.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ls*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)};let ee=null;function ce(K,O){if(h=O.getViewerPose(c||a),g=O,h!==null){const re=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let me=!1;re.length!==b.cameras.length&&(b.cameras.length=0,me=!0);for(let be=0;be<re.length;be++){const ke=re[be];let Te=null;if(f!==null)Te=f.getViewport(ke);else{const Ke=d.getViewSubImage(u,ke);Te=Ke.viewport,be===0&&(e.setRenderTargetTextures(p,Ke.colorTexture,u.ignoreDepthValues?void 0:Ke.depthStencilTexture),e.setRenderTarget(p))}let De=k[be];De===void 0&&(De=new Zt,De.layers.enable(be),De.viewport=new Mt,k[be]=De),De.matrix.fromArray(ke.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(ke.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Te.x,Te.y,Te.width,Te.height),be===0&&(b.matrix.copy(De.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),me===!0&&b.cameras.push(De)}}for(let re=0;re<M.length;re++){const me=y[re],be=M[re];me!==null&&be!==void 0&&be.update(me,O,c||a)}ee&&ee(K,O),O.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:O}),g=null}const ve=new dd;ve.setAnimationLoop(ce),this.setAnimationLoop=function(K){ee=K},this.dispose=function(){}}}function wv(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,ld(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,y,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ln&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ln&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const y=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*y,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ln&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Rv(n,e,t,i){let s={},r={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,y){const x=y.program;i.uniformBlockBinding(M,x)}function c(M,y){let x=s[M.id];x===void 0&&(g(M),x=h(M),s[M.id]=x,M.addEventListener("dispose",m));const L=y.program;i.updateUBOMapping(M,L);const R=e.render.frame;r[M.id]!==R&&(u(M),r[M.id]=R)}function h(M){const y=d();M.__bindingPointIndex=y;const x=n.createBuffer(),L=M.__size,R=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,L,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,x),x}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const y=s[M.id],x=M.uniforms,L=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let R=0,P=x.length;R<P;R++){const k=Array.isArray(x[R])?x[R]:[x[R]];for(let b=0,A=k.length;b<A;b++){const V=k[b];if(f(V,R,b,L)===!0){const Z=V.__offset,se=Array.isArray(V.value)?V.value:[V.value];let N=0;for(let W=0;W<se.length;W++){const $=se[W],J=v($);typeof $=="number"||typeof $=="boolean"?(V.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,Z+N,V.__data)):$.isMatrix3?(V.__data[0]=$.elements[0],V.__data[1]=$.elements[1],V.__data[2]=$.elements[2],V.__data[3]=0,V.__data[4]=$.elements[3],V.__data[5]=$.elements[4],V.__data[6]=$.elements[5],V.__data[7]=0,V.__data[8]=$.elements[6],V.__data[9]=$.elements[7],V.__data[10]=$.elements[8],V.__data[11]=0):($.toArray(V.__data,N),N+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Z,V.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,y,x,L){const R=M.value,P=y+"_"+x;if(L[P]===void 0)return typeof R=="number"||typeof R=="boolean"?L[P]=R:L[P]=R.clone(),!0;{const k=L[P];if(typeof R=="number"||typeof R=="boolean"){if(k!==R)return L[P]=R,!0}else if(k.equals(R)===!1)return k.copy(R),!0}return!1}function g(M){const y=M.uniforms;let x=0;const L=16;for(let P=0,k=y.length;P<k;P++){const b=Array.isArray(y[P])?y[P]:[y[P]];for(let A=0,V=b.length;A<V;A++){const Z=b[A],se=Array.isArray(Z.value)?Z.value:[Z.value];for(let N=0,W=se.length;N<W;N++){const $=se[N],J=v($),te=x%L;te!==0&&L-te<J.boundary&&(x+=L-te),Z.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=x,x+=J.storage}}}const R=x%L;return R>0&&(x+=L-R),M.__size=x,M.__cache={},this}function v(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){const y=M.target;y.removeEventListener("dispose",m);const x=a.indexOf(y.__bindingPointIndex);a.splice(x,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class il{constructor(e={}){const{canvas:t=xp(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;i!==null?u=i.getContextAttributes().alpha:u=a;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Lt,this._useLegacyLights=!1,this.toneMapping=gi,this.toneMappingExposure=1;const y=this;let x=!1,L=0,R=0,P=null,k=-1,b=null;const A=new Mt,V=new Mt;let Z=null;const se=new Re(0);let N=0,W=t.width,$=t.height,J=1,te=null,Y=null;const ee=new Mt(0,0,W,$),ce=new Mt(0,0,W,$);let ve=!1;const K=new el;let O=!1,re=!1,me=null;const be=new nt,ke=new Ee,Te=new E,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ke(){return P===null?J:1}let X=i;function At(S,U){for(let G=0;G<S.length;G++){const H=S[G],F=t.getContext(H,U);if(F!==null)return F}return null}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${jo}`),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",ye,!1),X===null){const U=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&U.shift(),X=At(U,S),X===null)throw At(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&X instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),X.getShaderPrecisionFormat===void 0&&(X.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Ne,Ge,ge,ct,Ie,w,T,q,le,ae,ne,Se,Q,he,Ce,Je,oe,ht,it,je,Fe,Pe,We,dt;function Tt(){Ne=new Fg(X),Ge=new Ig(X,Ne,e),Ne.init(Ge),Pe=new Tv(X,Ne,Ge),ge=new bv(X,Ne,Ge),ct=new Hg(X),Ie=new ov,w=new Sv(X,Ne,ge,Ie,Ge,Pe,ct),T=new Ng(y),q=new kg(y),le=new $p(X,Ge),We=new Pg(X,Ne,le,Ge),ae=new Bg(X,le,ct,We),ne=new Xg(X,ae,le,ct),it=new Wg(X,Ge,w),Je=new Dg(Ie),Se=new av(y,T,q,Ne,Ge,We,Je),Q=new wv(y,Ie),he=new cv,Ce=new mv(Ne,Ge),ht=new Cg(y,T,q,ge,ne,u,l),oe=new Mv(y,ne,Ge),dt=new Rv(X,ct,Ge,ge),je=new Lg(X,Ne,ct,Ge),Fe=new zg(X,Ne,ct,Ge),ct.programs=Se.programs,y.capabilities=Ge,y.extensions=Ne,y.properties=Ie,y.renderLists=he,y.shadowMap=oe,y.state=ge,y.info=ct}Tt();const Qe=new Av(y,X);this.xr=Qe,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const S=Ne.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ne.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(S){S!==void 0&&(J=S,this.setSize(W,$,!1))},this.getSize=function(S){return S.set(W,$)},this.setSize=function(S,U,G=!0){if(Qe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,$=U,t.width=Math.floor(S*J),t.height=Math.floor(U*J),G===!0&&(t.style.width=S+"px",t.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(W*J,$*J).floor()},this.setDrawingBufferSize=function(S,U,G){W=S,$=U,J=G,t.width=Math.floor(S*G),t.height=Math.floor(U*G),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(A)},this.getViewport=function(S){return S.copy(ee)},this.setViewport=function(S,U,G,H){S.isVector4?ee.set(S.x,S.y,S.z,S.w):ee.set(S,U,G,H),ge.viewport(A.copy(ee).multiplyScalar(J).floor())},this.getScissor=function(S){return S.copy(ce)},this.setScissor=function(S,U,G,H){S.isVector4?ce.set(S.x,S.y,S.z,S.w):ce.set(S,U,G,H),ge.scissor(V.copy(ce).multiplyScalar(J).floor())},this.getScissorTest=function(){return ve},this.setScissorTest=function(S){ge.setScissorTest(ve=S)},this.setOpaqueSort=function(S){te=S},this.setTransparentSort=function(S){Y=S},this.getClearColor=function(S){return S.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor.apply(ht,arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha.apply(ht,arguments)},this.clear=function(S=!0,U=!0,G=!0){let H=0;if(S){let F=!1;if(P!==null){const pe=P.texture.format;F=pe===$h||pe===Yh||pe===jh}if(F){const pe=P.texture.type,xe=pe===_i||pe===fi||pe===Ko||pe===Oi||pe===Wh||pe===Xh,we=ht.getClearColor(),Oe=ht.getClearAlpha(),Ze=we.r,Ve=we.g,Ye=we.b;xe?(f[0]=Ze,f[1]=Ve,f[2]=Ye,f[3]=Oe,X.clearBufferuiv(X.COLOR,0,f)):(g[0]=Ze,g[1]=Ve,g[2]=Ye,g[3]=Oe,X.clearBufferiv(X.COLOR,0,g))}else H|=X.COLOR_BUFFER_BIT}U&&(H|=X.DEPTH_BUFFER_BIT),G&&(H|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),he.dispose(),Ce.dispose(),Ie.dispose(),T.dispose(),q.dispose(),ne.dispose(),We.dispose(),dt.dispose(),Se.dispose(),Qe.dispose(),Qe.removeEventListener("sessionstart",$t),Qe.removeEventListener("sessionend",ft),me&&(me.dispose(),me=null),Vt.stop()};function de(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const S=ct.autoReset,U=oe.enabled,G=oe.autoUpdate,H=oe.needsUpdate,F=oe.type;Tt(),ct.autoReset=S,oe.enabled=U,oe.autoUpdate=G,oe.needsUpdate=H,oe.type=F}function ye(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Me(S){const U=S.target;U.removeEventListener("dispose",Me),Be(U)}function Be(S){Ue(S),Ie.remove(S)}function Ue(S){const U=Ie.get(S).programs;U!==void 0&&(U.forEach(function(G){Se.releaseProgram(G)}),S.isShaderMaterial&&Se.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,G,H,F,pe){U===null&&(U=De);const xe=F.isMesh&&F.matrixWorld.determinant()<0,we=Le(S,U,G,H,F);ge.setMaterial(H,xe);let Oe=G.index,Ze=1;if(H.wireframe===!0){if(Oe=ae.getWireframeAttribute(G),Oe===void 0)return;Ze=2}const Ve=G.drawRange,Ye=G.attributes.position;let wt=Ve.start*Ze,Ft=(Ve.start+Ve.count)*Ze;pe!==null&&(wt=Math.max(wt,pe.start*Ze),Ft=Math.min(Ft,(pe.start+pe.count)*Ze)),Oe!==null?(wt=Math.max(wt,0),Ft=Math.min(Ft,Oe.count)):Ye!=null&&(wt=Math.max(wt,0),Ft=Math.min(Ft,Ye.count));const Dt=Ft-wt;if(Dt<0||Dt===1/0)return;We.setup(F,H,we,G,Oe);let xt,St=je;if(Oe!==null&&(xt=le.get(Oe),St=Fe,St.setIndex(xt)),F.isMesh)H.wireframe===!0?(ge.setLineWidth(H.wireframeLinewidth*Ke()),St.setMode(X.LINES)):St.setMode(X.TRIANGLES);else if(F.isLine){let qe=H.linewidth;qe===void 0&&(qe=1),ge.setLineWidth(qe*Ke()),F.isLineSegments?St.setMode(X.LINES):F.isLineLoop?St.setMode(X.LINE_LOOP):St.setMode(X.LINE_STRIP)}else F.isPoints?St.setMode(X.POINTS):F.isSprite&&St.setMode(X.TRIANGLES);if(F.isBatchedMesh)St.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)St.renderInstances(wt,Dt,F.count);else if(G.isInstancedBufferGeometry){const qe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ii=Math.min(G.instanceCount,qe);St.renderInstances(wt,Dt,ii)}else St.render(wt,Dt)};function mt(S,U,G){S.transparent===!0&&S.side===Qt&&S.forceSinglePass===!1?(S.side=ln,S.needsUpdate=!0,z(S,U,G),S.side=ei,S.needsUpdate=!0,z(S,U,G),S.side=Qt):z(S,U,G)}this.compile=function(S,U,G=null){G===null&&(G=S),m=Ce.get(G),m.init(),M.push(m),G.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),S!==G&&S.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights(y._useLegacyLights);const H=new Set;return S.traverse(function(F){const pe=F.material;if(pe)if(Array.isArray(pe))for(let xe=0;xe<pe.length;xe++){const we=pe[xe];mt(we,G,F),H.add(we)}else mt(pe,G,F),H.add(pe)}),M.pop(),m=null,H},this.compileAsync=function(S,U,G=null){const H=this.compile(S,U,G);return new Promise(F=>{function pe(){if(H.forEach(function(xe){Ie.get(xe).currentProgram.isReady()&&H.delete(xe)}),H.size===0){F(S);return}setTimeout(pe,10)}Ne.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let gt=null;function It(S){gt&&gt(S)}function $t(){Vt.stop()}function ft(){Vt.start()}const Vt=new dd;Vt.setAnimationLoop(It),typeof self<"u"&&Vt.setContext(self),this.setAnimationLoop=function(S){gt=S,Qe.setAnimationLoop(S),S===null?Vt.stop():Vt.start()},Qe.addEventListener("sessionstart",$t),Qe.addEventListener("sessionend",ft),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Qe.enabled===!0&&Qe.isPresenting===!0&&(Qe.cameraAutoUpdate===!0&&Qe.updateCamera(U),U=Qe.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,U,P),m=Ce.get(S,M.length),m.init(),M.push(m),be.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),K.setFromProjectionMatrix(be),re=this.localClippingEnabled,O=Je.init(this.clippingPlanes,re),v=he.get(S,p.length),v.init(),p.push(v),tn(S,U,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(te,Y),this.info.render.frame++,O===!0&&Je.beginShadows();const G=m.state.shadowsArray;if(oe.render(G,S,U),O===!0&&Je.endShadows(),this.info.autoReset===!0&&this.info.reset(),ht.render(v,S),m.setupLights(y._useLegacyLights),U.isArrayCamera){const H=U.cameras;for(let F=0,pe=H.length;F<pe;F++){const xe=H[F];C(v,S,xe,xe.viewport)}}else C(v,S,U);P!==null&&(w.updateMultisampleRenderTarget(P),w.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(y,S,U),We.resetDefaultState(),k=-1,b=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function tn(S,U,G,H){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||K.intersectsSprite(S)){H&&Te.setFromMatrixPosition(S.matrixWorld).applyMatrix4(be);const xe=ne.update(S),we=S.material;we.visible&&v.push(S,xe,we,G,Te.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||K.intersectsObject(S))){const xe=ne.update(S),we=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Te.copy(S.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Te.copy(xe.boundingSphere.center)),Te.applyMatrix4(S.matrixWorld).applyMatrix4(be)),Array.isArray(we)){const Oe=xe.groups;for(let Ze=0,Ve=Oe.length;Ze<Ve;Ze++){const Ye=Oe[Ze],wt=we[Ye.materialIndex];wt&&wt.visible&&v.push(S,xe,wt,G,Te.z,Ye)}}else we.visible&&v.push(S,xe,we,G,Te.z,null)}}const pe=S.children;for(let xe=0,we=pe.length;xe<we;xe++)tn(pe[xe],U,G,H)}function C(S,U,G,H){const F=S.opaque,pe=S.transmissive,xe=S.transparent;m.setupLightsView(G),O===!0&&Je.setGlobalState(y.clippingPlanes,G),pe.length>0&&j(F,pe,U,G),H&&ge.viewport(A.copy(H)),F.length>0&&I(F,U,G),pe.length>0&&I(pe,U,G),xe.length>0&&I(xe,U,G),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function j(S,U,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const pe=Ge.isWebGL2;me===null&&(me=new Vi(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")?ur:_i,minFilter:Gi,samples:pe?4:0})),y.getDrawingBufferSize(ke),pe?me.setSize(ke.x,ke.y):me.setSize(ga(ke.x),ga(ke.y));const xe=y.getRenderTarget();y.setRenderTarget(me),y.getClearColor(se),N=y.getClearAlpha(),N<1&&y.setClearColor(16777215,.5),y.clear();const we=y.toneMapping;y.toneMapping=gi,I(S,G,H),w.updateMultisampleRenderTarget(me),w.updateRenderTargetMipmap(me);let Oe=!1;for(let Ze=0,Ve=U.length;Ze<Ve;Ze++){const Ye=U[Ze],wt=Ye.object,Ft=Ye.geometry,Dt=Ye.material,xt=Ye.group;if(Dt.side===Qt&&wt.layers.test(H.layers)){const St=Dt.side;Dt.side=ln,Dt.needsUpdate=!0,_(wt,G,H,Ft,Dt,xt),Dt.side=St,Dt.needsUpdate=!0,Oe=!0}}Oe===!0&&(w.updateMultisampleRenderTarget(me),w.updateRenderTargetMipmap(me)),y.setRenderTarget(xe),y.setClearColor(se,N),y.toneMapping=we}function I(S,U,G){const H=U.isScene===!0?U.overrideMaterial:null;for(let F=0,pe=S.length;F<pe;F++){const xe=S[F],we=xe.object,Oe=xe.geometry,Ze=H===null?xe.material:H,Ve=xe.group;we.layers.test(G.layers)&&_(we,U,G,Oe,Ze,Ve)}}function _(S,U,G,H,F,pe){S.onBeforeRender(y,U,G,H,F,pe),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(y,U,G,H,S,pe),F.transparent===!0&&F.side===Qt&&F.forceSinglePass===!1?(F.side=ln,F.needsUpdate=!0,y.renderBufferDirect(G,U,H,F,S,pe),F.side=ei,F.needsUpdate=!0,y.renderBufferDirect(G,U,H,F,S,pe),F.side=Qt):y.renderBufferDirect(G,U,H,F,S,pe),S.onAfterRender(y,U,G,H,F,pe)}function z(S,U,G){U.isScene!==!0&&(U=De);const H=Ie.get(S),F=m.state.lights,pe=m.state.shadowsArray,xe=F.state.version,we=Se.getParameters(S,F.state,pe,U,G),Oe=Se.getProgramCacheKey(we);let Ze=H.programs;H.environment=S.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(S.isMeshStandardMaterial?q:T).get(S.envMap||H.environment),Ze===void 0&&(S.addEventListener("dispose",Me),Ze=new Map,H.programs=Ze);let Ve=Ze.get(Oe);if(Ve!==void 0){if(H.currentProgram===Ve&&H.lightsStateVersion===xe)return Ae(S,we),Ve}else we.uniforms=Se.getUniforms(S),S.onBuild(G,we,y),S.onBeforeCompile(we,y),Ve=Se.acquireProgram(we,Oe),Ze.set(Oe,Ve),H.uniforms=we.uniforms;const Ye=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ye.clippingPlanes=Je.uniform),Ae(S,we),H.needsLights=st(S),H.lightsStateVersion=xe,H.needsLights&&(Ye.ambientLightColor.value=F.state.ambient,Ye.lightProbe.value=F.state.probe,Ye.directionalLights.value=F.state.directional,Ye.directionalLightShadows.value=F.state.directionalShadow,Ye.spotLights.value=F.state.spot,Ye.spotLightShadows.value=F.state.spotShadow,Ye.rectAreaLights.value=F.state.rectArea,Ye.ltc_1.value=F.state.rectAreaLTC1,Ye.ltc_2.value=F.state.rectAreaLTC2,Ye.pointLights.value=F.state.point,Ye.pointLightShadows.value=F.state.pointShadow,Ye.hemisphereLights.value=F.state.hemi,Ye.directionalShadowMap.value=F.state.directionalShadowMap,Ye.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ye.spotShadowMap.value=F.state.spotShadowMap,Ye.spotLightMatrix.value=F.state.spotLightMatrix,Ye.spotLightMap.value=F.state.spotLightMap,Ye.pointShadowMap.value=F.state.pointShadowMap,Ye.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Ve,H.uniformsList=null,Ve}function ie(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=ra.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Ae(S,U){const G=Ie.get(S);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function Le(S,U,G,H,F){U.isScene!==!0&&(U=De),w.resetTextureUnits();const pe=U.fog,xe=H.isMeshStandardMaterial?U.environment:null,we=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Yt,Oe=(H.isMeshStandardMaterial?q:T).get(H.envMap||xe),Ze=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ve=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ye=!!G.morphAttributes.position,wt=!!G.morphAttributes.normal,Ft=!!G.morphAttributes.color;let Dt=gi;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Dt=y.toneMapping);const xt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,St=xt!==void 0?xt.length:0,qe=Ie.get(H),ii=m.state.lights;if(O===!0&&(re===!0||S!==b)){const nn=S===b&&H.id===k;Je.setState(H,S,nn)}let at=!1;H.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==ii.state.version||qe.outputColorSpace!==we||F.isBatchedMesh&&qe.batching===!1||!F.isBatchedMesh&&qe.batching===!0||F.isInstancedMesh&&qe.instancing===!1||!F.isInstancedMesh&&qe.instancing===!0||F.isSkinnedMesh&&qe.skinning===!1||!F.isSkinnedMesh&&qe.skinning===!0||F.isInstancedMesh&&qe.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&qe.instancingColor===!1&&F.instanceColor!==null||qe.envMap!==Oe||H.fog===!0&&qe.fog!==pe||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Je.numPlanes||qe.numIntersection!==Je.numIntersection)||qe.vertexAlphas!==Ze||qe.vertexTangents!==Ve||qe.morphTargets!==Ye||qe.morphNormals!==wt||qe.morphColors!==Ft||qe.toneMapping!==Dt||Ge.isWebGL2===!0&&qe.morphTargetsCount!==St)&&(at=!0):(at=!0,qe.__version=H.version);let En=qe.currentProgram;at===!0&&(En=z(H,U,F));let Yi=!1,Gn=!1,Si=!1;const Bt=En.getUniforms(),gn=qe.uniforms;if(ge.useProgram(En.program)&&(Yi=!0,Gn=!0,Si=!0),H.id!==k&&(k=H.id,Gn=!0),Yi||b!==S){Bt.setValue(X,"projectionMatrix",S.projectionMatrix),Bt.setValue(X,"viewMatrix",S.matrixWorldInverse);const nn=Bt.map.cameraPosition;nn!==void 0&&nn.setValue(X,Te.setFromMatrixPosition(S.matrixWorld)),Ge.logarithmicDepthBuffer&&Bt.setValue(X,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Bt.setValue(X,"isOrthographic",S.isOrthographicCamera===!0),b!==S&&(b=S,Gn=!0,Si=!0)}if(F.isSkinnedMesh){Bt.setOptional(X,F,"bindMatrix"),Bt.setOptional(X,F,"bindMatrixInverse");const nn=F.skeleton;nn&&(Ge.floatVertexTextures?(nn.boneTexture===null&&nn.computeBoneTexture(),Bt.setValue(X,"boneTexture",nn.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(Bt.setOptional(X,F,"batchingTexture"),Bt.setValue(X,"batchingTexture",F._matricesTexture,w));const $i=G.morphAttributes;if(($i.position!==void 0||$i.normal!==void 0||$i.color!==void 0&&Ge.isWebGL2===!0)&&it.update(F,G,En),(Gn||qe.receiveShadow!==F.receiveShadow)&&(qe.receiveShadow=F.receiveShadow,Bt.setValue(X,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(gn.envMap.value=Oe,gn.flipEnvMap.value=Oe.isCubeTexture&&Oe.isRenderTargetTexture===!1?-1:1),Gn&&(Bt.setValue(X,"toneMappingExposure",y.toneMappingExposure),qe.needsLights&&ze(gn,Si),pe&&H.fog===!0&&Q.refreshFogUniforms(gn,pe),Q.refreshMaterialUniforms(gn,H,J,$,me),ra.upload(X,ie(qe),gn,w)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ra.upload(X,ie(qe),gn,w),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Bt.setValue(X,"center",F.center),Bt.setValue(X,"modelViewMatrix",F.modelViewMatrix),Bt.setValue(X,"normalMatrix",F.normalMatrix),Bt.setValue(X,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const nn=H.uniformsGroups;for(let Ki=0,Sr=nn.length;Ki<Sr;Ki++)if(Ge.isWebGL2){const Vs=nn[Ki];dt.update(Vs,En),dt.bind(Vs,En)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return En}function ze(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function st(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,U,G){Ie.get(S.texture).__webglTexture=U,Ie.get(S.depthTexture).__webglTexture=G;const H=Ie.get(S);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,U){const G=Ie.get(S);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,G=0){P=S,L=U,R=G;let H=!0,F=null,pe=!1,xe=!1;if(S){const Oe=Ie.get(S);Oe.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(X.FRAMEBUFFER,null),H=!1):Oe.__webglFramebuffer===void 0?w.setupRenderTarget(S):Oe.__hasExternalTextures&&w.rebindTextures(S,Ie.get(S.texture).__webglTexture,Ie.get(S.depthTexture).__webglTexture);const Ze=S.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(xe=!0);const Ve=Ie.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ve[U])?F=Ve[U][G]:F=Ve[U],pe=!0):Ge.isWebGL2&&S.samples>0&&w.useMultisampledRTT(S)===!1?F=Ie.get(S).__webglMultisampledFramebuffer:Array.isArray(Ve)?F=Ve[G]:F=Ve,A.copy(S.viewport),V.copy(S.scissor),Z=S.scissorTest}else A.copy(ee).multiplyScalar(J).floor(),V.copy(ce).multiplyScalar(J).floor(),Z=ve;if(ge.bindFramebuffer(X.FRAMEBUFFER,F)&&Ge.drawBuffers&&H&&ge.drawBuffers(S,F),ge.viewport(A),ge.scissor(V),ge.setScissorTest(Z),pe){const Oe=Ie.get(S.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+U,Oe.__webglTexture,G)}else if(xe){const Oe=Ie.get(S.texture),Ze=U||0;X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,Oe.__webglTexture,G||0,Ze)}k=-1},this.readRenderTargetPixels=function(S,U,G,H,F,pe,xe){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Ie.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(we=we[xe]),we){ge.bindFramebuffer(X.FRAMEBUFFER,we);try{const Oe=S.texture,Ze=Oe.format,Ve=Oe.type;if(Ze!==Sn&&Pe.convert(Ze)!==X.getParameter(X.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ye=Ve===ur&&(Ne.has("EXT_color_buffer_half_float")||Ge.isWebGL2&&Ne.has("EXT_color_buffer_float"));if(Ve!==_i&&Pe.convert(Ve)!==X.getParameter(X.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===Zn&&(Ge.isWebGL2||Ne.has("OES_texture_float")||Ne.has("WEBGL_color_buffer_float")))&&!Ye){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-H&&G>=0&&G<=S.height-F&&X.readPixels(U,G,H,F,Pe.convert(Ze),Pe.convert(Ve),pe)}finally{const Oe=P!==null?Ie.get(P).__webglFramebuffer:null;ge.bindFramebuffer(X.FRAMEBUFFER,Oe)}}},this.copyFramebufferToTexture=function(S,U,G=0){const H=Math.pow(2,-G),F=Math.floor(U.image.width*H),pe=Math.floor(U.image.height*H);w.setTexture2D(U,0),X.copyTexSubImage2D(X.TEXTURE_2D,G,0,0,S.x,S.y,F,pe),ge.unbindTexture()},this.copyTextureToTexture=function(S,U,G,H=0){const F=U.image.width,pe=U.image.height,xe=Pe.convert(G.format),we=Pe.convert(G.type);w.setTexture2D(G,0),X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,G.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,G.unpackAlignment),U.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,H,S.x,S.y,F,pe,xe,we,U.image.data):U.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,H,S.x,S.y,U.mipmaps[0].width,U.mipmaps[0].height,xe,U.mipmaps[0].data):X.texSubImage2D(X.TEXTURE_2D,H,S.x,S.y,xe,we,U.image),H===0&&G.generateMipmaps&&X.generateMipmap(X.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(S,U,G,H,F=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const pe=S.max.x-S.min.x+1,xe=S.max.y-S.min.y+1,we=S.max.z-S.min.z+1,Oe=Pe.convert(H.format),Ze=Pe.convert(H.type);let Ve;if(H.isData3DTexture)w.setTexture3D(H,0),Ve=X.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)w.setTexture2DArray(H,0),Ve=X.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,H.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,H.unpackAlignment);const Ye=X.getParameter(X.UNPACK_ROW_LENGTH),wt=X.getParameter(X.UNPACK_IMAGE_HEIGHT),Ft=X.getParameter(X.UNPACK_SKIP_PIXELS),Dt=X.getParameter(X.UNPACK_SKIP_ROWS),xt=X.getParameter(X.UNPACK_SKIP_IMAGES),St=G.isCompressedTexture?G.mipmaps[F]:G.image;X.pixelStorei(X.UNPACK_ROW_LENGTH,St.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,St.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,S.min.x),X.pixelStorei(X.UNPACK_SKIP_ROWS,S.min.y),X.pixelStorei(X.UNPACK_SKIP_IMAGES,S.min.z),G.isDataTexture||G.isData3DTexture?X.texSubImage3D(Ve,F,U.x,U.y,U.z,pe,xe,we,Oe,Ze,St.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),X.compressedTexSubImage3D(Ve,F,U.x,U.y,U.z,pe,xe,we,Oe,St.data)):X.texSubImage3D(Ve,F,U.x,U.y,U.z,pe,xe,we,Oe,Ze,St),X.pixelStorei(X.UNPACK_ROW_LENGTH,Ye),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,wt),X.pixelStorei(X.UNPACK_SKIP_PIXELS,Ft),X.pixelStorei(X.UNPACK_SKIP_ROWS,Dt),X.pixelStorei(X.UNPACK_SKIP_IMAGES,xt),F===0&&H.generateMipmaps&&X.generateMipmap(Ve),ge.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?w.setTextureCube(S,0):S.isData3DTexture?w.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?w.setTexture2DArray(S,0):w.setTexture2D(S,0),ge.unbindTexture()},this.resetState=function(){L=0,R=0,P=null,ge.reset(),We.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Zo?"display-p3":"srgb",t.unpackColorSpace=ut.workingColorSpace===ba?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Lt?Fi:Zh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Fi?Lt:Yt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Cv extends il{}Cv.prototype.isWebGL1Renderer=!0;class sl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Re(e),this.density=t}clone(){return new sl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class vd extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class yd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ko,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const rn=new E;class mr{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=On(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=On(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=On(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=On(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),i=_t(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),i=_t(i,this.array),s=_t(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),i=_t(i,this.array),s=_t(s,this.array),r=_t(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new mr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ho extends xn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let fs;const Ys=new E,ps=new E,ms=new E,gs=new Ee,$s=new Ee,Md=new nt,jr=new E,Ks=new E,Yr=new E,Yc=new Ee,uo=new Ee,$c=new Ee;class Kc extends Ct{constructor(e=new Ho){if(super(),this.isSprite=!0,this.type="Sprite",fs===void 0){fs=new Pt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new yd(t,5);fs.setIndex([0,1,2,0,2,3]),fs.setAttribute("position",new mr(i,3,0,!1)),fs.setAttribute("uv",new mr(i,2,3,!1))}this.geometry=fs,this.material=e,this.center=new Ee(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ps.setFromMatrixScale(this.matrixWorld),Md.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ms.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ps.multiplyScalar(-ms.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;$r(jr.set(-.5,-.5,0),ms,a,ps,s,r),$r(Ks.set(.5,-.5,0),ms,a,ps,s,r),$r(Yr.set(.5,.5,0),ms,a,ps,s,r),Yc.set(0,0),uo.set(1,0),$c.set(1,1);let o=e.ray.intersectTriangle(jr,Ks,Yr,!1,Ys);if(o===null&&($r(Ks.set(-.5,.5,0),ms,a,ps,s,r),uo.set(0,1),o=e.ray.intersectTriangle(jr,Yr,Ks,!1,Ys),o===null))return;const l=e.ray.origin.distanceTo(Ys);l<e.near||l>e.far||t.push({distance:l,point:Ys.clone(),uv:Mn.getInterpolation(Ys,jr,Ks,Yr,Yc,uo,$c,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function $r(n,e,t,i,s,r){gs.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?($s.x=r*gs.x-s*gs.y,$s.y=s*gs.x+r*gs.y):$s.copy(gs),n.copy(e),n.x+=$s.x,n.y+=$s.y,n.applyMatrix4(Md)}const Jc=new E,Zc=new Mt,Qc=new Mt,Pv=new E,eh=new nt,Kr=new E,fo=new zn,th=new nt,po=new Sa;class Lv extends $e{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Il,this.bindMatrix=new nt,this.bindMatrixInverse=new nt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Nn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Kr),this.boundingBox.expandByPoint(Kr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new zn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Kr),this.boundingSphere.expandByPoint(Kr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fo.copy(this.boundingSphere),fo.applyMatrix4(s),e.ray.intersectsSphere(fo)!==!1&&(th.copy(s).invert(),po.copy(e.ray).applyMatrix4(th),!(this.boundingBox!==null&&po.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,po)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Mt,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Il?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Vf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;Zc.fromBufferAttribute(s.attributes.skinIndex,e),Qc.fromBufferAttribute(s.attributes.skinWeight,e),Jc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Qc.getComponent(r);if(a!==0){const o=Zc.getComponent(r);eh.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(Pv.copy(Jc).applyMatrix4(eh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class bd extends Ct{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Sd extends qt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=kt,h=kt,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const nh=new nt,Iv=new nt;class rl{constructor(e=[],t=[]){this.uuid=Dn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new nt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new nt;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Iv;nh.multiplyMatrices(o,t[r]),nh.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new rl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new Sd(t,e,e,Sn,Zn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new bd),this.bones.push(a),this.boneInverses.push(new nt().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class Go extends jt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const _s=new nt,ih=new nt,Jr=[],sh=new Nn,Dv=new nt,Js=new $e,Zs=new zn;class Nv extends $e{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Go(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Dv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,_s),sh.copy(e.boundingBox).applyMatrix4(_s),this.boundingBox.union(sh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new zn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,_s),Zs.copy(e.boundingSphere).applyMatrix4(_s),this.boundingSphere.union(Zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Js.geometry=this.geometry,Js.material=this.material,Js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zs.copy(this.boundingSphere),Zs.applyMatrix4(i),e.ray.intersectsSphere(Zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,_s),ih.multiplyMatrices(i,_s),Js.matrixWorld=ih,Js.raycast(e,Jr);for(let a=0,o=Jr.length;a<o;a++){const l=Jr[a];l.instanceId=r,l.object=this,t.push(l)}Jr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Go(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class sr extends xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const rh=new E,ah=new E,oh=new nt,mo=new Sa,Zr=new zn;class Es extends Ct{constructor(e=new Pt,t=new sr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)rh.fromBufferAttribute(t,s-1),ah.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=rh.distanceTo(ah);e.setAttribute("lineDistance",new bt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(s),Zr.radius+=r,e.ray.intersectsSphere(Zr)===!1)return;oh.copy(s).invert(),mo.copy(e.ray).applyMatrix4(oh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new E,h=new E,d=new E,u=new E,f=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const p=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let y=p,x=M-1;y<x;y+=f){const L=g.getX(y),R=g.getX(y+1);if(c.fromBufferAttribute(m,L),h.fromBufferAttribute(m,R),mo.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const k=e.ray.origin.distanceTo(u);k<e.near||k>e.far||t.push({distance:k,point:d.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let y=p,x=M-1;y<x;y+=f){if(c.fromBufferAttribute(m,y),h.fromBufferAttribute(m,y+1),mo.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const R=e.ray.origin.distanceTo(u);R<e.near||R>e.far||t.push({distance:R,point:d.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const lh=new E,ch=new E;class Uv extends Es{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)lh.fromBufferAttribute(t,s),ch.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+lh.distanceTo(ch);e.setAttribute("lineDistance",new bt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ov extends Es{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Aa extends xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hh=new nt,Vo=new Sa,Qr=new zn,ea=new E;class al extends Ct{constructor(e=new Pt,t=new Aa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qr.copy(i.boundingSphere),Qr.applyMatrix4(s),Qr.radius+=r,e.ray.intersectsSphere(Qr)===!1)return;hh.copy(s).invert(),Vo.copy(e.ray).applyMatrix4(hh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,v=f;g<v;g++){const m=c.getX(g);ea.fromBufferAttribute(d,m),dh(ea,m,l,s,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,v=f;g<v;g++)ea.fromBufferAttribute(d,g),dh(ea,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function dh(n,e,t,i,s,r,a){const o=Vo.distanceSqToPoint(n);if(o<t){const l=new E;Vo.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class gr extends qt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ti{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);const h=i[s],u=i[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new Ee:new E);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new E,s=[],r=[],a=[],o=new E,l=new nt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new E)}r[0]=new E,a[0]=new E;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Xt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Xt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Td extends ti{constructor(e=0,t=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const i=t||new Ee,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class kv extends Td{constructor(e,t,i,s,r,a){super(e,t,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ol(){let n=0,e=0,t=0,i=0;function s(r,a,o,l){n=r,e=o,t=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return n+e*r+t*a+i*o}}}const ta=new E,go=new ol,_o=new ol,vo=new ol;class Fv extends ti{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new E){const i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(ta.subVectors(s[0],s[1]).add(s[0]),c=ta);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(ta.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ta),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),go.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,v,m),_o.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,v,m),vo.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(go.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),_o.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),vo.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(go.calc(l),_o.calc(l),vo.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new E().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function uh(n,e,t,i,s){const r=(i-e)*.5,a=(s-t)*.5,o=n*n,l=n*o;return(2*t-2*i+r+a)*l+(-3*t+3*i-2*r-a)*o+r*n+t}function Bv(n,e){const t=1-n;return t*t*e}function zv(n,e){return 2*(1-n)*n*e}function Hv(n,e){return n*n*e}function rr(n,e,t,i){return Bv(n,e)+zv(n,t)+Hv(n,i)}function Gv(n,e){const t=1-n;return t*t*t*e}function Vv(n,e){const t=1-n;return 3*t*t*n*e}function Wv(n,e){return 3*(1-n)*n*n*e}function Xv(n,e){return n*n*n*e}function ar(n,e,t,i,s){return Gv(n,e)+Vv(n,t)+Wv(n,i)+Xv(n,s)}class qv extends ti{constructor(e=new Ee,t=new Ee,i=new Ee,s=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new Ee){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ar(e,s.x,r.x,a.x,o.x),ar(e,s.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class jv extends ti{constructor(e=new E,t=new E,i=new E,s=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new E){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ar(e,s.x,r.x,a.x,o.x),ar(e,s.y,r.y,a.y,o.y),ar(e,s.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Yv extends ti{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $v extends ti{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kv extends ti{constructor(e=new Ee,t=new Ee,i=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ee){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(rr(e,s.x,r.x,a.x),rr(e,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class or extends ti{constructor(e=new E,t=new E,i=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new E){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(rr(e,s.x,r.x,a.x),rr(e,s.y,r.y,a.y),rr(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jv extends ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){const i=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return i.set(uh(o,l.x,c.x,h.x,d.x),uh(o,l.y,c.y,h.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new Ee().fromArray(s))}return this}}var Zv=Object.freeze({__proto__:null,ArcCurve:kv,CatmullRomCurve3:Fv,CubicBezierCurve:qv,CubicBezierCurve3:jv,EllipseCurve:Td,LineCurve:Yv,LineCurve3:$v,QuadraticBezierCurve:Kv,QuadraticBezierCurve3:or,SplineCurve:Jv});class Xi extends Pt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const v=[],m=i/2;let p=0;M(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new bt(d,3)),this.setAttribute("normal",new bt(u,3)),this.setAttribute("uv",new bt(f,2));function M(){const x=new E,L=new E;let R=0;const P=(t-e)/i;for(let k=0;k<=r;k++){const b=[],A=k/r,V=A*(t-e)+e;for(let Z=0;Z<=s;Z++){const se=Z/s,N=se*l+o,W=Math.sin(N),$=Math.cos(N);L.x=V*W,L.y=-A*i+m,L.z=V*$,d.push(L.x,L.y,L.z),x.set(W,P,$).normalize(),u.push(x.x,x.y,x.z),f.push(se,1-A),b.push(g++)}v.push(b)}for(let k=0;k<s;k++)for(let b=0;b<r;b++){const A=v[b][k],V=v[b+1][k],Z=v[b+1][k+1],se=v[b][k+1];h.push(A,V,se),h.push(V,Z,se),R+=6}c.addGroup(p,R,0),p+=R}function y(x){const L=g,R=new Ee,P=new E;let k=0;const b=x===!0?e:t,A=x===!0?1:-1;for(let Z=1;Z<=s;Z++)d.push(0,m*A,0),u.push(0,A,0),f.push(.5,.5),g++;const V=g;for(let Z=0;Z<=s;Z++){const N=Z/s*l+o,W=Math.cos(N),$=Math.sin(N);P.x=b*$,P.y=m*A,P.z=b*W,d.push(P.x,P.y,P.z),u.push(0,A,0),R.x=W*.5+.5,R.y=$*.5*A+.5,f.push(R.x,R.y),g++}for(let Z=0;Z<s;Z++){const se=L+Z,N=V+Z;x===!0?h.push(N,N+1,se):h.push(N+1,N,se),k+=3}c.addGroup(p,k,x===!0?1:2),p+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ll extends Xi{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ll(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class cl extends Pt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new bt(r,3)),this.setAttribute("normal",new bt(r.slice(),3)),this.setAttribute("uv",new bt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const y=new E,x=new E,L=new E;for(let R=0;R<t.length;R+=3)f(t[R+0],y),f(t[R+1],x),f(t[R+2],L),l(y,x,L,M)}function l(M,y,x,L){const R=L+1,P=[];for(let k=0;k<=R;k++){P[k]=[];const b=M.clone().lerp(x,k/R),A=y.clone().lerp(x,k/R),V=R-k;for(let Z=0;Z<=V;Z++)Z===0&&k===R?P[k][Z]=b:P[k][Z]=b.clone().lerp(A,Z/V)}for(let k=0;k<R;k++)for(let b=0;b<2*(R-k)-1;b++){const A=Math.floor(b/2);b%2===0?(u(P[k][A+1]),u(P[k+1][A]),u(P[k][A])):(u(P[k][A+1]),u(P[k+1][A+1]),u(P[k+1][A]))}}function c(M){const y=new E;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(M),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function h(){const M=new E;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const x=m(M)/2/Math.PI+.5,L=p(M)/Math.PI+.5;a.push(x,1-L)}g(),d()}function d(){for(let M=0;M<a.length;M+=6){const y=a[M+0],x=a[M+2],L=a[M+4],R=Math.max(y,x,L),P=Math.min(y,x,L);R>.9&&P<.1&&(y<.2&&(a[M+0]+=1),x<.2&&(a[M+2]+=1),L<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,y){const x=M*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function g(){const M=new E,y=new E,x=new E,L=new E,R=new Ee,P=new Ee,k=new Ee;for(let b=0,A=0;b<r.length;b+=9,A+=6){M.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),R.set(a[A+0],a[A+1]),P.set(a[A+2],a[A+3]),k.set(a[A+4],a[A+5]),L.copy(M).add(y).add(x).divideScalar(3);const V=m(L);v(R,A+0,M,V),v(P,A+2,y,V),v(k,A+4,x,V)}}function v(M,y,x,L){L<0&&M.x===1&&(a[y]=M.x-1),x.x===0&&x.z===0&&(a[y]=L/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cl(e.vertices,e.indices,e.radius,e.details)}}class hl extends cl{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new hl(e.radius,e.detail)}}class bs extends Pt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let d=e;const u=(t-e)/s,f=new E,g=new Ee;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){const p=r+m/i*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}d+=u}for(let v=0;v<s;v++){const m=v*(i+1);for(let p=0;p<i;p++){const M=p+m,y=M,x=M+i+1,L=M+i+2,R=M+1;o.push(y,x,R),o.push(x,L,R)}}this.setIndex(o),this.setAttribute("position",new bt(l,3)),this.setAttribute("normal",new bt(c,3)),this.setAttribute("uv",new bt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ln extends Pt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new E,u=new E,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const M=[],y=p/i;let x=0;p===0&&a===0?x=.5/t:p===i&&l===Math.PI&&(x=-.5/t);for(let L=0;L<=t;L++){const R=L/t;d.x=-e*Math.cos(s+R*r)*Math.sin(a+y*o),d.y=e*Math.cos(a+y*o),d.z=e*Math.sin(s+R*r)*Math.sin(a+y*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(R+x,1-y),M.push(c++)}h.push(M)}for(let p=0;p<i;p++)for(let M=0;M<t;M++){const y=h[p][M+1],x=h[p][M],L=h[p+1][M],R=h[p+1][M+1];(p!==0||a>0)&&f.push(y,x,R),(p!==i-1||l<Math.PI)&&f.push(x,L,R)}this.setIndex(f),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(v,3)),this.setAttribute("uv",new bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class wa extends Pt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new E,d=new E,u=new E;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(v),d.y=(e+t*Math.cos(m))*Math.sin(v),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;a.push(v,m,M),a.push(m,p,M)}this.setIndex(a),this.setAttribute("position",new bt(o,3)),this.setAttribute("normal",new bt(l,3)),this.setAttribute("uv",new bt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wa(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class lr extends Pt{constructor(e=new or(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new E,l=new E,c=new Ee;let h=new E;const d=[],u=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new bt(d,3)),this.setAttribute("normal",new bt(u,3)),this.setAttribute("uv",new bt(f,2));function v(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),M(),p()}function m(y){h=e.getPointAt(y/t,h);const x=a.normals[y],L=a.binormals[y];for(let R=0;R<=s;R++){const P=R/s*Math.PI*2,k=Math.sin(P),b=-Math.cos(P);l.x=b*x.x+k*L.x,l.y=b*x.y+k*L.y,l.z=b*x.z+k*L.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let y=1;y<=t;y++)for(let x=1;x<=s;x++){const L=(s+1)*(y-1)+(x-1),R=(s+1)*y+(x-1),P=(s+1)*y+x,k=(s+1)*(y-1)+x;g.push(L,R,k),g.push(R,P,k)}}function M(){for(let y=0;y<=t;y++)for(let x=0;x<=s;x++)c.x=y/t,c.y=x/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new lr(new Zv[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class vi extends xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jo,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ni extends vi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Re(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class xd extends xn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Re(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jo,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}function na(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Qv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ey(n){function e(s,r){return n[s]-n[r]}const t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function fh(n,e,t){const i=n.length,s=new n.constructor(i);for(let r=0,a=0;a!==i;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=n[o+l]}return s}function Ed(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=n[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=n[s++];while(r!==void 0)}class Mr{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){const o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class ty extends Mr{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sc,endingEnd:sc}}intervalChanged_(e,t,i){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case rc:r=e,o=2*t-i;break;case ac:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case rc:a=e,l=2*i-t;break;case ac:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-t)/(s-t),v=g*g,m=v*g,p=-u*m+2*u*v-u*g,M=(1+u)*m+(-1.5-2*u)*v+(-.5+u)*g+1,y=(-1-f)*m+(1.5+f)*v+.5*g,x=f*m-f*v;for(let L=0;L!==o;++L)r[L]=p*a[h+L]+M*a[c+L]+y*a[l+L]+x*a[d+L];return r}}class ny extends Mr{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}}class iy extends Mr{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Hn{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=na(t,this.TimeBufferType),this.values=na(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:na(e.times,Array),values:na(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new iy(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ny(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ty(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case fr:t=this.InterpolantFactoryMethodDiscrete;break;case Ps:t=this.InterpolantFactoryMethodLinear;break;case Ha:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fr;case this.InterpolantFactoryMethodLinear:return Ps;case this.InterpolantFactoryMethodSmooth:return Ha}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){const i=this.times,s=i.length;let r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Qv(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ha,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{const d=o*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){const v=t[d+g];if(v!==t[u+g]||v!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const d=o*i,u=a*i;for(let f=0;f!==i;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Hn.prototype.TimeBufferType=Float32Array;Hn.prototype.ValueBufferType=Float32Array;Hn.prototype.DefaultInterpolation=Ps;class zs extends Hn{}zs.prototype.ValueTypeName="bool";zs.prototype.ValueBufferType=Array;zs.prototype.DefaultInterpolation=fr;zs.prototype.InterpolantFactoryMethodLinear=void 0;zs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ad extends Hn{}Ad.prototype.ValueTypeName="color";class Ds extends Hn{}Ds.prototype.ValueTypeName="number";class sy extends Mr{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t);let c=e*o;for(let h=c+o;c!==h;c+=4)bi.slerpFlat(r,0,a,c-o,a,c,l);return r}}class qi extends Hn{InterpolantFactoryMethodLinear(e){return new sy(this.times,this.values,this.getValueSize(),e)}}qi.prototype.ValueTypeName="quaternion";qi.prototype.DefaultInterpolation=Ps;qi.prototype.InterpolantFactoryMethodSmooth=void 0;class Hs extends Hn{}Hs.prototype.ValueTypeName="string";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=fr;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ns extends Hn{}Ns.prototype.ValueTypeName="vector";class ry{constructor(e,t=-1,i,s=Jf){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=Dn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(oy(i[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=i.length;r!==a;++r)t.push(Hn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=ey(l);l=fh(l,1,h),c=fh(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Ds(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const d=h[1];let u=s[d];u||(s[d]=u=[]),u.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(d,u,f,g,v){if(f.length!==0){const m=[],p=[];Ed(f,m,p,g),m.length!==0&&v.push(new d(u,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let v=0;v<u[g].morphTargets.length;v++)f[u[g].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let M=0;M!==u[g].morphTargets.length;++M){const y=u[g];m.push(y.time),p.push(y.morphTarget===v?1:0)}s.push(new Ds(".morphTargetInfluence["+v+"]",m,p))}l=f.length*a}else{const f=".bones["+t[d].name+"]";i(Ns,f+".position",u,"pos",s),i(qi,f+".quaternion",u,"rot",s),i(Ns,f+".scale",u,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,s=e.length;i!==s;++i){const r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function ay(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ds;case"vector":case"vector2":case"vector3":case"vector4":return Ns;case"color":return Ad;case"quaternion":return qi;case"bool":case"boolean":return zs;case"string":return Hs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function oy(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ay(n.type);if(n.times===void 0){const t=[],i=[];Ed(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const pi={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class ly{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const cy=new ly;class Gs{constructor(e){this.manager=e!==void 0?e:cy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Gs.DEFAULT_MATERIAL_NAME="__DEFAULT";const $n={};class hy extends Error{constructor(e,t){super(e),this.response=t}}class wd extends Gs{constructor(e){super(e)}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=pi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if($n[e]!==void 0){$n[e].push({onLoad:t,onProgress:i,onError:s});return}$n[e]=[],$n[e].push({onLoad:t,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=$n[e],d=c.body.getReader(),u=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=u?parseInt(u):0,g=f!==0;let v=0;const m=new ReadableStream({start(p){M();function M(){d.read().then(({done:y,value:x})=>{if(y)p.close();else{v+=x.byteLength;const L=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let R=0,P=h.length;R<P;R++){const k=h[R];k.onProgress&&k.onProgress(L)}p.enqueue(x),M()}})}}});return new Response(m)}else throw new hy(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{pi.add(e,c);const h=$n[e];delete $n[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=$n[e];if(h===void 0)throw this.manager.itemError(e),c;delete $n[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class dy extends Gs{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=pi.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=pr("img");function l(){h(),pi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(d){h(),s&&s(d),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class uy extends Gs{constructor(e){super(e)}load(e,t,i,s){const r=new qt,a=new dy(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class Ra extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const yo=new nt,ph=new E,mh=new E;class dl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new el,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ph.setFromMatrixPosition(e.matrixWorld),t.position.copy(ph),mh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(mh),t.updateMatrixWorld(),yo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class fy extends dl{constructor(){super(new Zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=Ls*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Rd extends Ra{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new fy}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const gh=new nt,Qs=new E,Mo=new E;class py extends dl{constructor(){super(new Zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new Mt(2,1,1,1),new Mt(0,1,1,1),new Mt(3,1,1,1),new Mt(1,1,1,1),new Mt(3,0,1,1),new Mt(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Qs.setFromMatrixPosition(e.matrixWorld),i.position.copy(Qs),Mo.copy(i.position),Mo.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Mo),i.updateMatrixWorld(),s.makeTranslation(-Qs.x,-Qs.y,-Qs.z),gh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gh)}}class Li extends Ra{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new py}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class my extends dl{constructor(){super(new tl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _r extends Ra{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new my}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Cd extends Ra{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class cr{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,s=e.length;i<s;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class gy extends Gs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=pi.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return pi.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),pi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});pi.add(e,l),r.manager.itemStart(e)}}const ul="\\[\\]\\.:\\/",_y=new RegExp("["+ul+"]","g"),fl="[^"+ul+"]",vy="[^"+ul.replace("\\.","")+"]",yy=/((?:WC+[\/:])*)/.source.replace("WC",fl),My=/(WCOD+)?/.source.replace("WCOD",vy),by=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fl),Sy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fl),Ty=new RegExp("^"+yy+My+by+Sy+"$"),xy=["material","materials","bones","map"];class Ey{constructor(e,t,i){const s=i||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class pt{constructor(e,t,i){this.path=t,this.parsedPath=i||pt.parseTrackName(t),this.node=pt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new pt.Composite(e,t,i):new pt(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(_y,"")}static parseTrackName(e){const t=Ty.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);xy.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=pt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}pt.Composite=Ey;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jo);function _h(n,e){if(e===Zf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Oo||e===Jh){let t=n.getIndex();if(t===null){const a=[],o=n.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);n.setIndex(a),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=t.count-2,s=[];if(e===Oo)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}class Ay extends Gs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ly(t)}),this.register(function(t){return new zy(t)}),this.register(function(t){return new Hy(t)}),this.register(function(t){return new Gy(t)}),this.register(function(t){return new Dy(t)}),this.register(function(t){return new Ny(t)}),this.register(function(t){return new Uy(t)}),this.register(function(t){return new Oy(t)}),this.register(function(t){return new Py(t)}),this.register(function(t){return new ky(t)}),this.register(function(t){return new Iy(t)}),this.register(function(t){return new By(t)}),this.register(function(t){return new Fy(t)}),this.register(function(t){return new Ry(t)}),this.register(function(t){return new Vy(t)}),this.register(function(t){return new Wy(t)})}load(e,t,i,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=cr.extractUrlBase(e);a=cr.resolveURL(c,this.path)}else a=cr.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new wd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Pd){try{a[ot.KHR_BINARY_GLTF]=new Xy(e)}catch(d){s&&s(d);return}r=JSON.parse(a[ot.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new sM(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const d=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(d){case ot.KHR_MATERIALS_UNLIT:a[d]=new Cy;break;case ot.KHR_DRACO_MESH_COMPRESSION:a[d]=new qy(r,this.dracoLoader);break;case ot.KHR_TEXTURE_TRANSFORM:a[d]=new jy;break;case ot.KHR_MESH_QUANTIZATION:a[d]=new Yy;break;default:u.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,s)}parseAsync(e,t){const i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}}function wy(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}const ot={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ry{constructor(e){this.parser=e,this.name=ot.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let s=t.cache.get(i);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Re(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Yt);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new _r(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Li(h),c.distance=d;break;case"spot":c=new Rd(h),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,ui(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class Cy{constructor(){this.name=ot.KHR_MATERIALS_UNLIT}getMaterialType(){return Rt}extendParams(e,t,i){const s=[];e.color=new Re(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Yt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,Lt))}return Promise.all(s)}}class Py{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Ly{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ee(o,o)}return Promise.all(r)}}class Iy{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Dy{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SHEEN}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Re(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Yt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Lt)),a.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class Ny{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class Uy{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_VOLUME}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Re().setRGB(o[0],o[1],o[2],Yt),Promise.all(r)}}class Oy{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IOR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class ky{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SPECULAR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Re().setRGB(o[0],o[1],o[2],Yt),a.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",a.specularColorTexture,Lt)),Promise.all(r)}}class Fy{constructor(e){this.parser=e,this.name=ot.EXT_MATERIALS_BUMP}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(i.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class By{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(i.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class zy{constructor(e){this.parser=e,this.name=ot.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class Hy{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Gy{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Vy{constructor(e){this.name=ot.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,d=s.byteStride,u=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,d,u,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*d);return a.decodeGltfBuffer(new Uint8Array(f),h,d,u,s.mode,s.filter),f})})}else return null}}class Wy{constructor(e){this.name=ot.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=t.meshes[i.mesh];for(const c of s.primitives)if(c.mode!==yn.TRIANGLES&&c.mode!==yn.TRIANGLE_STRIP&&c.mode!==yn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=i.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),d=h.isGroup?h.children:[h],u=c[0].count,f=[];for(const g of d){const v=new nt,m=new E,p=new bi,M=new E(1,1,1),y=new Nv(g.geometry,g.material,u);for(let x=0;x<u;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&M.fromBufferAttribute(l.SCALE,x),y.setMatrixAt(x,v.compose(m,p,M));for(const x in l)if(x==="_COLOR_0"){const L=l[x];y.instanceColor=new Go(L.array,L.itemSize,L.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);Ct.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Pd="glTF",er=12,vh={JSON:1313821514,BIN:5130562};class Xy{constructor(e){this.name=ot.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,er),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Pd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-er,r=new DataView(e,er);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===vh.JSON){const c=new Uint8Array(e,er+a,o);this.content=i.decode(c)}else if(l===vh.BIN){const c=er+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class qy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ot.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const d=Wo[h]||h.toLowerCase();o[d]=a[h]}for(const h in e.attributes){const d=Wo[h]||h.toLowerCase();if(a[h]!==void 0){const u=i.accessors[e.attributes[h]],f=As[u.componentType];c[d]=f.name,l[d]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,u){s.decodeDracoFile(h,function(f){for(const g in f.attributes){const v=f.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}d(f)},o,c,Yt,u)})})}}class jy{constructor(){this.name=ot.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Yy{constructor(){this.name=ot.KHR_MESH_QUANTIZATION}}class Ld extends Mr{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,d=(i-t)/h,u=d*d,f=u*d,g=e*c,v=g-c,m=-2*f+3*u,p=f-u,M=1-m,y=p-u+d;for(let x=0;x!==o;x++){const L=a[v+x+o],R=a[v+x+l]*h,P=a[g+x+o],k=a[g+x]*h;r[x]=M*L+y*R+m*P+p*k}return r}}const $y=new bi;class Ky extends Ld{interpolate_(e,t,i,s){const r=super.interpolate_(e,t,i,s);return $y.fromArray(r).normalize().toArray(r),r}}const yn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},As={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},yh={9728:kt,9729:cn,9984:Uo,9985:Gh,9986:sa,9987:Gi},Mh={33071:bn,33648:da,10497:Mi},bo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Wo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},hi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Jy={CUBICSPLINE:void 0,LINEAR:Ps,STEP:fr},So={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Zy(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new vi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ei})),n.DefaultMaterial}function wi(n,e,t){for(const i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function ui(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Qy(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const d=e[c];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const d=e[c];if(i){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):n.attributes.position;a.push(u)}if(s){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):n.attributes.normal;o.push(u)}if(r){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):n.attributes.color;l.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],d=c[1],u=c[2];return i&&(n.morphAttributes.position=h),s&&(n.morphAttributes.normal=d),r&&(n.morphAttributes.color=u),n.morphTargetsRelative=!0,n})}function eM(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function tM(n){let e;const t=n.extensions&&n.extensions[ot.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+To(t.attributes):e=n.indices+":"+To(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+To(n.targets[i]);return e}function To(n){let e="";const t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function Xo(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function nM(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const iM=new nt;class sM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new wy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=!1,r=-1;typeof navigator<"u"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,s=navigator.userAgent.indexOf("Firefox")>-1,r=s?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||i||s&&r<98?this.textureLoader=new uy(this.options.manager):this.textureLoader=new gy(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new wd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return wi(r,o,s),ui(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const s=i.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const s=e(t[i]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){const i=e+":"+t;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ot.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){i.load(cr.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){const t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=bo[s.type],o=As[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new jt(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=bo[s.type],c=As[s.componentType],h=c.BYTES_PER_ELEMENT,d=h*l,u=s.byteOffset||0,f=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let v,m;if(f&&f!==d){const p=Math.floor(u/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let y=t.cache.get(M);y||(v=new c(o,p*f,s.count*f/h),y=new yd(v,f/h),t.cache.add(M,y)),m=new mr(y,l,u%f/h,g)}else o===null?v=new c(s.count*l):v=new c(o,u,s.count*l),m=new jt(v,l,g);if(s.sparse!==void 0){const p=bo.SCALAR,M=As[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,L=new M(a[1],y,s.sparse.count*p),R=new c(a[2],x,s.sparse.count*l);o!==null&&(m=new jt(m.array.slice(),m.itemSize,m.normalized));for(let P=0,k=L.length;P<k;P++){const b=L[P];if(m.setX(b,R[P*l]),l>=2&&m.setY(b,R[P*l+1]),l>=3&&m.setZ(b,R[P*l+2]),l>=4&&m.setW(b,R[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const u=(r.samplers||{})[a.sampler]||{};return h.magFilter=yh[u.magFilter]||cn,h.minFilter=yh[u.minFilter]||Gi,h.wrapS=Mh[u.wrapS]||Mi,h.wrapT=Mh[u.wrapT]||Mi,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(d){c=!0;const u=new Blob([d],{type:a.mimeType});return l=o.createObjectURL(u),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(d){return new Promise(function(u,f){let g=u;t.isImageBitmapLoader===!0&&(g=function(v){const m=new qt(v);m.needsUpdate=!0,u(m)}),t.load(cr.resolveURL(d,r.path),g,void 0,f)})}).then(function(d){return c===!0&&o.revokeObjectURL(l),d.userData.mimeType=a.mimeType||nM(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=h,h}assignTexture(e,t,i,s){const r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[ot.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[ot.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[ot.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new Aa,xn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new sr,xn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(s||r||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return vi}loadMaterial(e){const t=this,i=this.json,s=this.extensions,r=i.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[ot.KHR_MATERIALS_UNLIT]){const d=s[ot.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),c.push(d.extendParams(o,r,t))}else{const d=r.pbrMetallicRoughness||{};if(o.color=new Re(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],Yt),o.opacity=u[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",d.baseColorTexture,Lt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Qt);const h=r.alphaMode||So.OPAQUE;if(h===So.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===So.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Rt&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ee(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==Rt&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Rt){const d=r.emissiveFactor;o.emissive=new Re().setRGB(d[0],d[1],d[2],Yt)}return r.emissiveTexture!==void 0&&a!==Rt&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Lt)),Promise.all(c).then(function(){const d=new a(o);return r.name&&(d.name=r.name),ui(d,r),t.associations.set(d,{materials:e}),r.extensions&&wi(s,d,r),d})}createUniqueName(e){const t=pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,s=this.primitiveCache;function r(o){return i[ot.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return bh(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=tM(c),d=s[h];if(d)a.push(d.promise);else{let u;c.extensions&&c.extensions[ot.KHR_DRACO_MESH_COMPRESSION]?u=r(c):u=bh(new Pt,c,t),s[h]={primitive:c,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){const t=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?Zy(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],d=[];for(let f=0,g=h.length;f<g;f++){const v=h[f],m=a[f];let p;const M=c[f];if(m.mode===yn.TRIANGLES||m.mode===yn.TRIANGLE_STRIP||m.mode===yn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Lv(v,M):new $e(v,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===yn.TRIANGLE_STRIP?p.geometry=_h(p.geometry,Jh):m.mode===yn.TRIANGLE_FAN&&(p.geometry=_h(p.geometry,Oo));else if(m.mode===yn.LINES)p=new Uv(v,M);else if(m.mode===yn.LINE_STRIP)p=new Es(v,M);else if(m.mode===yn.LINE_LOOP)p=new Ov(v,M);else if(m.mode===yn.POINTS)p=new al(v,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&eM(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),ui(p,r),m.extensions&&wi(s,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&wi(s,d[0],r),d[0];const u=new Nt;r.extensions&&wi(s,u,r),t.associations.set(u,{meshes:e});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}loadCamera(e){let t;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Zt(Tp.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new tl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),ui(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const d=a[c];if(d){o.push(d);const u=new nt;r!==null&&u.fromArray(r.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new rl(o,l)})}loadAnimation(e){const t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let d=0,u=s.channels.length;d<u;d++){const f=s.channels[d],g=s.samplers[f.sampler],v=f.target,m=v.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(g),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],g=d[2],v=d[3],m=d[4],p=[];for(let M=0,y=u.length;M<y;M++){const x=u[M],L=f[M],R=g[M],P=v[M],k=m[M];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const b=i._createAnimationTracks(x,L,R,P,k);if(b)for(let A=0;A<b.length;A++)p.push(b[A])}return new ry(r,void 0,p)})}createNodeMesh(e){const t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],d=c[1],u=c[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,iM)});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);return h})}_loadNodeShallow(e){const t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new bd:c.length>1?h=new Nt:c.length===1?h=c[0]:h=new Ct,h!==c[0])for(let d=0,u=c.length;d<u;d++)h.add(c[d]);if(r.name&&(h.userData.name=r.name,h.name=a),ui(h,r),r.extensions&&wi(i,h,r),r.matrix!==void 0){const d=new nt;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],s=this,r=new Nt;i.name&&(r.name=s.createUniqueName(i.name)),ui(r,i),i.extensions&&wi(t,r,i);const a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,d=l.length;h<d;h++)r.add(l[h]);const c=h=>{const d=new Map;for(const[u,f]of s.associations)(u instanceof xn||u instanceof qt)&&d.set(u,f);return h.traverse(u=>{const f=s.associations.get(u);f!=null&&d.set(u,f)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];hi[r.path]===hi.weights?e.traverse(function(u){u.morphTargetInfluences&&l.push(u.name?u.name:u.uuid)}):l.push(o);let c;switch(hi[r.path]){case hi.weights:c=Ds;break;case hi.rotation:c=qi;break;case hi.position:case hi.scale:c=Ns;break;default:switch(i.itemSize){case 1:c=Ds;break;case 2:case 3:default:c=Ns;break}break}const h=s.interpolation!==void 0?Jy[s.interpolation]:Ps,d=this._getArrayFromAccessor(i);for(let u=0,f=l.length;u<f;u++){const g=new c(l[u]+"."+hi[r.path],t.array,d,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=Xo(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const s=this instanceof qi?Ky:Ld;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function rM(n,e,t){const i=e.attributes,s=new Nn;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new E(l[0],l[1],l[2]),new E(c[0],c[1],c[2])),o.normalized){const h=Xo(As[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new E,l=new E;for(let c=0,h=r.length;c<h;c++){const d=r[c];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,g=u.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),u.normalized){const v=Xo(As[u.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;const a=new zn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=a}function bh(n,e,t){const i=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){n.setAttribute(o,l)})}for(const a in i){const o=Wo[a]||a.toLowerCase();o in n.attributes||s.push(r(i[a],o))}if(e.indices!==void 0&&!n.index){const a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(a)}return ut.workingColorSpace!==Yt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ut.workingColorSpace}" not supported.`),ui(n,e),rM(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Qy(n,e.targets,t):n})}const aM=["head","body","forelimbs","hindlimbs","tail"],Ca={head:1,body:1.6,forelimbs:.9,hindlimbs:.9,tail:1.2},Id=new Map;let ia=null;function Pa(n,e,t){return n.traverse(i=>{i instanceof $e&&(i.material=new xd({color:new Re(e),gradientMap:t}),i.castShadow=!0)}),n}function La(n,e){const i=new Nn().setFromObject(n).getSize(new E),s=Math.max(i.x,i.y,i.z);s>0&&n.scale.setScalar(e/s);const r=new Nn().setFromObject(n);return n.position.y-=r.min.y,n}async function oM(n,e,t){const i=`${e}/${t}`;try{const s=await n.loadAsync(`/models/${e}/${t}.glb`);Id.set(i,s.scene)}catch{}}async function lM(n,e=new Ay){if(ia)return ia;const t=[];for(const i of n)for(const s of aM)t.push(oM(e,i,s));return ia=Promise.all(t).then(()=>{}),ia}function Ia(n,e){return Id.get(`${n}/${e}`)??null}const cM=lM(zt.map(n=>n.id));function Bn(n){return dn[n]??dn.boar}let on=null;const Sh=new Map;function hM(n,e,t){const i=document.createElement("canvas");i.width=256,i.height=256;const s=i.getContext("2d");if(!s)return new gr(i);switch(n){case"cobra":case"eel":{s.fillStyle=e,s.fillRect(0,0,256,256),s.strokeStyle=t,s.lineWidth=3;const a=32;for(let o=-a;o<256+a;o+=a/2){const l=Math.floor(o/(a/2))%2*(a/2);for(let c=-a;c<256+a;c+=a)s.beginPath(),s.arc(c+l+a/2,o,a/2,0,Math.PI),s.stroke()}break}case"tiger":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle="#121212";for(let a=0;a<8;a++){const o=20+a*32+Math.random()*8;s.beginPath(),s.moveTo(0,o),s.quadraticCurveTo(80,o+15,120,o+5),s.quadraticCurveTo(80,o+25,0,o+30),s.closePath(),s.fill(),s.beginPath(),s.moveTo(256,o+10),s.quadraticCurveTo(176,o+25,136,o+15),s.quadraticCurveTo(176,o+35,256,o+40),s.closePath(),s.fill()}break}case"ant":case"scorpion":{s.fillStyle=e,s.fillRect(0,0,256,256);for(let a=0;a<256;a+=32){const o=s.createLinearGradient(0,a,0,a+32);o.addColorStop(0,t),o.addColorStop(.3,e),o.addColorStop(.7,e),o.addColorStop(1,t),s.fillStyle=o,s.fillRect(0,a,256,28)}break}case"eagle":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t;const a=24;for(let o=0;o<256+a;o+=a){const l=Math.floor(o/a)%2*20;for(let c=-20;c<276;c+=40)s.beginPath(),s.moveTo(c+l,o),s.lineTo(c+l+20,o+15),s.lineTo(c+l+40,o),s.lineTo(c+l+20,o-5),s.closePath(),s.fill()}break}case"boar":case"rhino":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t;for(let a=0;a<250;a++){const o=Math.random()*256,l=Math.random()*256,c=1.5+Math.random()*2.5;s.beginPath(),s.arc(o,l,c,0,Math.PI*2),s.fill()}break}case"wolf":case"bear":case"rabbit":{s.fillStyle=e,s.fillRect(0,0,256,256),s.strokeStyle=t,s.lineWidth=1.5;for(let a=0;a<350;a++){const o=Math.random()*256,l=Math.random()*256,c=4+Math.random()*7,h=Math.PI/4+(Math.random()-.5)*.3;s.beginPath(),s.moveTo(o,l),s.lineTo(o+Math.cos(h)*c,l+Math.sin(h)*c),s.stroke()}break}case"dragon":{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t;for(let a=0;a<12;a++){const o=a%2*22;for(let l=0;l<8;l++){const c=l*44+o-22,h=a*24-12;s.beginPath(),s.moveTo(c+22,h),s.lineTo(c+44,h+16),s.lineTo(c+22,h+24),s.lineTo(c,h+16),s.closePath(),s.globalAlpha=.35,s.fill()}}s.globalAlpha=1;break}case"jellyfish":{s.fillStyle=e,s.fillRect(0,0,256,256);for(let a=0;a<6;a++){const o=20+a*36,l=s.createRadialGradient(128,128,o-12,128,128,o);l.addColorStop(0,t+"00"),l.addColorStop(.5,t+"55"),l.addColorStop(1,t+"00"),s.fillStyle=l,s.fillRect(0,0,256,256)}break}default:{s.fillStyle=e,s.fillRect(0,0,256,256),s.fillStyle=t,s.globalAlpha=.15;for(let a=0;a<100;a++){const o=Math.random()*256,l=Math.random()*256,c=2+Math.random()*4;s.beginPath(),s.arc(o,l,c,0,Math.PI*2),s.fill()}s.globalAlpha=1;break}}const r=new gr(i);return r.wrapS=Mi,r.wrapT=Mi,r.repeat.set(2,2),r}function dM(n,e,t){const i=`${n}_${e}_${t}`;let s=Sh.get(i);return s||(s=hM(n,e,t),Sh.set(i,s)),s}function Ni(n,e=.04){if(!n.geometry||n.getObjectByName("toon_outline"))return;const t=n.geometry.clone(),i=new Rt({color:new Re(657940),side:ln}),s=new $e(t,i);s.name="toon_outline",t.computeBoundingSphere();const r=t.boundingSphere?t.boundingSphere.radius:1,a=Math.max(.05,r),o=1+e/a;s.scale.setScalar(o),n.add(s)}let xo=null;function br(){if(!xo){const n=new Uint8Array([0,80,160,255]),e=new Sd(n,n.length,1,qh);e.minFilter=kt,e.magFilter=kt,e.needsUpdate=!0,xo=e}return xo}function Ui(n,e={}){const t={color:new Re(n),gradientMap:br(),emissive:e.emissive?new Re(e.emissive):new Re(0),emissiveIntensity:e.emissiveI??0};if(on&&!e.noTexture){const i=Bn(on);t.map=dM(on,n,i.accent||i.shade),t.color=new Re(16777215)}return new xd(t)}function Xe(n,e,t={}){const i=new $e(new Ln(n,22,18),Ui(e,t));return t.noOutline||Ni(i),i}function Ot(n,e,t,i={}){const s=new $e(new ll(n,e,16),Ui(t,i));return i.noOutline||Ni(s),s}function pn(n,e,t,i,s={}){const r=new $e(new Xi(n,e,t,16),Ui(i,s));return s.noOutline||Ni(r),r}function _a(){const n=document.createElement("canvas");n.width=64,n.height=64;const e=n.getContext("2d");if(e){const r=e.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(0, 0, 0, 0.75)"),r.addColorStop(.5,"rgba(0, 0, 0, 0.35)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=r,e.fillRect(0,0,64,64)}const t=new gr(n),i=new Rt({map:t,transparent:!0,depthWrite:!1}),s=new $e(new xa(1.6,1.6),i);return s.rotation.x=-Math.PI/2,s.position.y=.19,s.name="shadow",s}function uM(n,e,t,i=.09){for(const s of[-1,1]){const r=Xe(i,"#ffffff",{noOutline:!0,noTexture:!0});r.name=`eye_${s===1?"r":"l"}`,r.position.set(s*.22,e,t),n.add(r);const a=Xe(i*.55,"#0a0a0a",{noOutline:!0,noTexture:!0});a.name=`pupil_${s===1?"r":"l"}`,a.position.set(s*.22,e,t+i*.7),n.add(a)}}function fM(n){const e=Ia(n,"body");if(e){const s=e.clone();return Pa(s,Bn(n).fill,br()),La(s,Ca.body),s}const t=new Nt,i=Bn(n);if(n==="ant"){const s=Xe(.65,i.fill,{});s.scale.set(1,.9,1.2),s.position.set(0,0,.45),s.castShadow=!0,t.add(s);const r=pn(.12,.12,.4,i.shade,{});r.rotation.x=Math.PI/2,r.position.set(0,-.1,0),t.add(r);const a=Xe(.82,i.fill,{});a.scale.set(1,.85,1.55),a.position.set(0,-.1,-.65),a.castShadow=!0,t.add(a)}else if(n==="scorpion"){const s=Xe(.72,i.fill,{});s.scale.set(1.1,.75,.95),s.position.set(0,.05,.5),s.castShadow=!0,t.add(s);for(let r=0;r<4;r++){const a=Xe(.68-r*.05,r%2===0?i.fill:i.shade,{});a.scale.set(1.1-r*.04,.7-r*.03,.5),a.position.set(0,-.05-r*.02,.1-r*.32),a.castShadow=!0,t.add(a)}}else if(n==="crab"){const s=Xe(1.05,i.fill,{});s.scale.set(1.48,.56,1.24),s.castShadow=!0,t.add(s);for(const r of[-1,1]){const a=Ot(.12,.45,i.accent,{});a.position.set(r*1.45,.1,-.1),a.rotation.z=-r*1.15,t.add(a)}}else if(n==="rhino"){const s=Xe(1.22,i.fill,{});s.scale.set(1.22,1.04,1.34),s.castShadow=!0,t.add(s);for(const r of[-1,1]){const a=Xe(.92,i.accent,{});a.scale.set(.18,.92,1.12),a.position.set(r*.74,.05,0),t.add(a)}}else if(n==="gorilla"){const s=Xe(1.26,i.fill,{});s.scale.set(1.28,1.18,1.18),s.castShadow=!0,t.add(s);const r=Xe(.88,"#b0b6c2",{});r.scale.set(1.04,.38,.86),r.position.set(0,.72,-.16),t.add(r)}else if(n==="eel"){const s=Xe(.82,i.fill,{});s.scale.set(.72,.72,1.84),s.castShadow=!0,t.add(s);const r=pn(.01,.14,2.1,i.accent,{emissive:i.accent,emissiveI:.65});r.position.set(0,.54,-.22),r.rotation.x=Math.PI/2+.08,t.add(r)}else if(n==="cobra"){const s=Xe(.84,i.fill,{});s.scale.set(.78,.78,1.62),s.castShadow=!0,t.add(s);const r=Xe(.68,i.accent,{});r.scale.set(.64,.32,1.38),r.position.set(0,-.42,.28),t.add(r)}else if(n==="tiger"){const s=Xe(1.02,i.fill,{});s.scale.set(1.05,.92,1.25),s.castShadow=!0,t.add(s);for(let r=-3;r<=3;r++){const a=pn(.02,.02,1.6,"#121212",{});a.position.set(-.95,0,r*.3),a.rotation.z=.25,t.add(a);const o=pn(.02,.02,1.6,"#121212",{});o.position.set(.95,0,r*.3),o.rotation.z=-.25,t.add(o)}}else{const s=Xe(1.02,i.fill);s.scale.set(1.05,.92,1.2),s.castShadow=!0,t.add(s);const r=Xe(.7,i.accent,{});r.scale.set(.88,.58,.98),r.position.set(0,-.44,.24),t.add(r)}return t}function pM(n){const e=Ia(n,"head");if(e){const h=e.clone();return Pa(h,Bn(n).fill,br()),La(h,Ca.head),h}const t=new Nt;t.scale.setScalar(.82);const i=Bn(n),s=Xe(.62,i.fill);s.castShadow=!0,t.add(s);let r="#ffffff",a=.5;n==="eel"?(r="#39ff14",a=2):n==="gecko"?(r="#ffd700",a=2.2):(n==="cobra"||n==="scorpion")&&(r="#ff3b30",a=1.8),uM(t,.12,.5,.09),t.children.forEach(h=>{if(h instanceof $e&&h.position.z>.52&&a>1){const d=h.material;d.emissive&&(d.emissive.set(new Re(r)),d.emissiveIntensity=a)}});const o=Xe(.22,i.fill);o.name="lower_jaw",o.scale.set(1,.4,1.25),o.position.set(0,-.28,.22),o.castShadow=!0,t.add(o);const l=(h,d,u,f=i.fill)=>{for(const g of[-1,1]){const v=Ot(d,h,f);v.position.set(g*.32,.55,-.05),v.rotation.z=-g*u,t.add(v)}},c=(h,d=i.accent)=>{for(const u of[-1,1]){const f=Ot(.1,h,d,{noTexture:!0});f.position.set(u*.3,.55,.2),f.rotation.z=-u*.4,t.add(f)}};switch(n){case"rabbit":{for(const h of[-1,1]){const d=h===1?"r":"l",u=pn(.14,.16,.35,i.fill);u.name=`ear_${d}_0`,u.position.set(h*.32,.55,-.05),u.rotation.z=-h*.05;const f=Ot(.12,.35,i.fill);f.name=`ear_${d}_1`,f.position.set(0,.35,0),u.add(f),t.add(u)}break}case"wolf":l(.34,.2,.5);break;case"tiger":{l(.26,.22,.7);const h=Xe(.24,i.accent);h.position.set(0,-.15,.5),t.add(h);break}case"bear":{for(const h of[-1,1]){const d=Xe(.2,i.fill);d.position.set(h*.4,.5,-.1),t.add(d)}break}case"boar":{for(const d of[-1,1]){const u=Ot(.06,.4,"#e8e0c0",{noTexture:!0});u.position.set(d*.18,.12,.3),u.rotation.set(.6,0,d*.3),o.add(u)}const h=Xe(.32,i.shade);h.scale.set(1,.8,.9),h.position.set(0,-.1,.55),t.add(h);break}case"rhino":{const h=Ot(.16,.7,i.accent,{noTexture:!0});h.position.set(0,.05,.7),h.rotation.x=1.35,t.add(h);const d=Ot(.1,.34,i.accent,{noTexture:!0});d.position.set(0,.32,.52),d.rotation.x=1.25,t.add(d);break}case"eagle":{const h=Ot(.18,.5,"#f0b020",{noTexture:!0});h.position.set(0,-.05,.62),h.rotation.x=1.4,t.add(h);for(let d=-1;d<=1;d++){const u=Ot(.04,.3,i.accent);u.position.set(d*.14,.58,-.18),u.rotation.set(-.4,0,d*.2),t.add(u)}break}case"cobra":{const h=Xe(.55,i.fill);h.scale.set(1.5,1.4,.3),h.position.set(0,.1,-.2),t.add(h);for(const d of[-1,1]){const u=Ot(.04,.22,"#ffffff",{noTexture:!0});u.position.set(d*.15,-.22,.52),u.rotation.x=-.2,t.add(u)}break}case"ant":case"scorpion":{for(const h of[-1,1]){const d=pn(.03,.05,.4,i.shade,{noTexture:!0});d.position.set(h*.18,-.25,.5),d.rotation.x=1.1,t.add(d)}if(n==="ant")for(const h of[-1,1]){const d=pn(.02,.02,.5,i.accent,{noTexture:!0});d.position.set(h*.18,.6,.2),d.rotation.z=-h*.4,t.add(d)}break}case"gorilla":case"gecko":c(1e-4);break;case"eel":{const h=Ot(.12,.4,i.accent,{emissive:i.accent,emissiveI:.4,noTexture:!0});h.position.set(0,.6,-.1),t.add(h);break}case"dragon":{for(const f of[-1,1]){const g=Ot(.1,.55,i.accent,{noTexture:!0});g.position.set(f*.32,.62,-.1),g.rotation.set(-.15,0,f*.45),t.add(g)}const h=Xe(.35,i.shade);h.scale.set(1,.75,1.1),h.position.set(0,-.08,.52),t.add(h);const d=new Rt({color:16732192}),u=new $e(new Ln(.18,8,8),d);u.position.set(0,-.32,.38),t.add(u);break}case"jellyfish":{const h=Xe(.62,i.fill);h.scale.set(1.2,.7,1.2);const d=h.material;d.transparent=!0,d.opacity=.72,h.position.set(0,.2,0),t.add(h);for(let u=0;u<5;u++){const f=u/5*Math.PI*2,g=pn(.03,.02,.5,i.accent,{emissive:i.accent,emissiveI:.6,noTexture:!0});g.position.set(Math.cos(f)*.28,-.5,Math.sin(f)*.28),t.add(g)}break}default:l(.3,.16,.4)}return t}function Th(n,e){const t=e?"forelimbs":"hindlimbs",i=Ia(n,t);if(i){const l=i.clone();return Pa(l,Bn(n).fill,br()),La(l,Ca[t]),l}const s=new Nt,r=Bn(n),a=e?.45:-.5,o=e?1.15:1.25;if(e&&n==="eagle"){for(const l of[-1,1]){const c=new Nt;c.name=`wing_${l===1?"r":"l"}`;const h=new Pt,d=new Float32Array([0,0,0,l*2.2,1.2,-.4,l*1.8,0,-1.2,l*.9,-.2,-.8]),u=[0,1,2,0,2,3];h.setAttribute("position",new jt(d,3)),h.setIndex(u),h.computeVertexNormals();const f=new $e(h,Ui(r.fill,{}));f.material.side=Qt,f.castShadow=!0,c.add(f),Ni(f),c.position.set(l*.65,.2,-.15),s.add(c)}return s}if(e&&n==="crab"){for(const l of[-1,1]){const c=new Nt,h=pn(.14,.18,.8,r.fill,{});h.rotation.z=l*.45,h.position.set(l*.65,-.3,a),h.castShadow=!0,c.add(h);const d=Xe(.38,r.accent,{});d.position.set(l*.95,-.55,a+.15),d.scale.set(1.2,.85,1.05),d.castShadow=!0,c.add(d);const u=Ot(.08,.36,r.accent,{noTexture:!0});u.position.set(l*1.15,-.65,a+.36),u.rotation.set(.4,0,-l*.5),c.add(u);const f=Ot(.06,.3,r.shade,{noTexture:!0});f.position.set(l*.95,-.72,a+.3),f.rotation.set(.6,0,l*.2),c.add(f),s.add(c)}return s}if(e&&n==="scorpion"){for(const l of[-1,1]){const c=new Nt,h=pn(.1,.13,.9,r.fill,{});h.rotation.z=l*.5,h.position.set(l*.7,-.3,a),h.castShadow=!0,c.add(h);const d=Xe(.28,r.accent,{});d.position.set(l*1,-.65,a+.25),d.scale.set(1,.7,1.25),c.add(d);const u=Ot(.06,.3,r.accent,{noTexture:!0});u.position.set(l*1.1,-.75,a+.42),u.rotation.set(.3,0,-l*.3),c.add(u);const f=Ot(.05,.24,r.shade,{noTexture:!0});f.position.set(l*.9,-.8,a+.38),f.rotation.set(.5,0,l*.1),c.add(f),s.add(c)}return s}if(["ant","scorpion"].includes(n)){for(const l of[-1,1]){const c=new Nt,h=Xe(.13,r.shade,{});h.position.set(l*.52,-.4,a),c.add(h);const d=pn(.09,.09,.32,r.shade,{});d.position.set(l*.52,-.4,a),d.rotation.z=l*.82,d.castShadow=!0,c.add(d);const u=Xe(.11,r.fill,{});u.position.set(l*.76,-.72,a+.08),c.add(u);const f=pn(.065,.065,.82,r.fill,{});f.position.set(l*.76,-.72,a+.08),f.rotation.z=l*.42,f.castShadow=!0,c.add(f);const g=Xe(.08,r.shade,{});g.position.set(l*.92,-1.22,a+.16),c.add(g);const v=pn(.045,.032,.92,r.shade,{});v.position.set(l*.92,-1.22,a+.16),v.rotation.z=-l*.58,v.castShadow=!0,c.add(v),s.add(c)}return s}if(!e&&n==="rabbit"){for(const l of[-1,1]){const c=new Nt,h=Xe(.36,r.fill,{});h.scale.set(.9,1.25,.9),h.position.set(l*.56,-.22,a),h.castShadow=!0,c.add(h);const d=new E(l*.56,-.42,a),u=new E(l*.76,-.72,a-.15),f=new E(l*.56,-.92,a+.15),g=new or(d,u,f),v=new lr(g,10,.12,8,!1),m=new $e(v,Ui(r.fill,{}));m.castShadow=!0,c.add(m),Ni(m);const p=Xe(.14,r.fill,{});p.position.copy(u),c.add(p);const M=Xe(.18,r.shade,{});M.scale.set(.8,.38,1.45),M.position.copy(f),M.castShadow=!0,c.add(M),s.add(c)}return s}if(e&&n==="gorilla"){for(const l of[-1,1]){const c=new Nt,h=Xe(.35,r.shade,{});h.position.set(l*.64,0,a+.08),c.add(h);const d=new E(l*.64,0,a+.08),u=new E(l*.92,-.65,a+.2),f=new E(l*.68,-1.3,a+.24),g=new or(d,u,f),v=new lr(g,12,.25,8,!1),m=new $e(v,Ui(r.fill,{}));m.castShadow=!0,c.add(m),Ni(m);const p=Xe(.24,r.fill,{});p.position.copy(u),c.add(p);const M=Xe(.38,r.shade,{});M.position.copy(f),M.castShadow=!0,c.add(M),s.add(c)}return s}for(const l of[-1,1]){const c=new Nt,h=Xe(.22,r.shade,{});h.position.set(l*.55,0,a),c.add(h);const d=new E(l*.55,0,a),u=new E(l*.8,-o*.45,a+(e?.15:-.15)),f=new E(l*.55,-o*.9,a+(e?.1:0)),g=new or(d,u,f),v=new lr(g,12,.16,8,!1),m=new $e(v,Ui(r.fill,{}));m.castShadow=!0,c.add(m),Ni(m);const p=Xe(.16,r.fill,{});p.position.copy(u),c.add(p);const M=Xe(.2,r.shade);if(M.scale.set(1,.7,1.3),M.position.copy(f),M.castShadow=!0,c.add(M),e&&["bear","tiger","gorilla","crab","scorpion"].includes(n))for(const y of[-1,0,1]){const x=Ot(.04,.18,r.accent,{noTexture:!0});x.position.set(f.x+y*.07,f.y-.05,f.z+.28),x.rotation.x=1.2,x.castShadow=!0,c.add(x)}s.add(c)}return s}function mM(n){const e=Ia(n,"tail");if(e){const a=e.clone();return Pa(a,Bn(n).fill,br()),La(a,Ca.tail),a}const t=new Nt;t.name="tail";const i=Bn(n);if(n==="eagle"){for(let a=-2;a<=2;a++){const o=Xe(.14,i.fill,{});o.scale.set(.6,.04,1.42),o.position.set(a*.13,.08,-1.22),o.rotation.set(-.24,a*.11,0),o.castShadow=!0,t.add(o)}return t}if(n==="rabbit"){const a=Xe(.24,i.accent,{});return a.position.set(0,.22,-.92),a.castShadow=!0,t.add(a),t}let s=t;const r=n==="scorpion"||n==="cobra"||n==="tiger"?8:6;for(let a=0;a<r;a++){const o=a/(r-1),l=new Nt;l.name=`tail_seg_${a}`,a===0?l.position.set(0,.1,-.9):n==="scorpion"?l.position.set(0,1.45/r,-1.22/r):n==="cobra"?l.position.set(0,-.45/r,-1.35/r):n==="tiger"?l.position.set(0,-.2/r,-1.38/r):l.position.set(0,.25/r,-1.1/r);let c;if(n==="scorpion"){const h=.24*(1-o*.44);c=Xe(h,a%2===0?i.fill:i.shade,{})}else n==="cobra"?c=Xe(.24*(1-o*.72),i.fill):n==="tiger"?c=Xe(.18*(1-o*.42),a%2===0?i.fill:"#0d0d0d"):c=Xe(.26*(1-o*.7),i.fill);if(c.castShadow=!0,l.add(c),a===r-1){if(n==="scorpion"){const h=Xe(.18,i.accent,{emissive:i.accent,emissiveI:.55});h.position.set(0,.14,.14),l.add(h);const d=Ot(.04,.24,"#0f0f0f",{});d.rotation.x=-1.25,d.position.set(0,.24,.24),l.add(d)}else if(n==="cobra"){const h=Ot(.12,.34,i.accent,{});h.rotation.x=-.6,h.position.set(0,.2,-.4),l.add(h)}else if(n==="eel"||n==="default"){const h=Ot(.25,.5,i.accent,{emissive:i.accent,emissiveI:.5});h.rotation.x=-1.4,h.position.set(0,.1,-.4),l.add(h)}}s.add(l),s=l}return t}function vr(n){const e=new Nt,t={body:r=>r.position.set(0,1.4,0),head:r=>r.position.set(0,2.15,.95),forelimbs:r=>r.position.set(0,1.4,0),hindlimbs:r=>r.position.set(0,1.4,0),tail:r=>r.position.set(0,1.3,-.3)},i={body:()=>{on=n.body;const r=fM(n.body);return on=null,r},head:()=>{on=n.head;const r=pM(n.head);return on=null,r},forelimbs:()=>{on=n.forelimbs;const r=Th(n.forelimbs,!0);return on=null,r},hindlimbs:()=>{on=n.hindlimbs;const r=Th(n.hindlimbs,!1);return on=null,r},tail:()=>{on=n.tail;const r=mM(n.tail);return on=null,r}};for(const r of yi){const a=i[r]();t[r](a),a.name=r,e.add(a)}on=n.body;const s=Xe(.4,Bn(n.body).fill);if(on=null,s.name="neck",s.scale.set(.8,.9,.8),s.position.set(0,1.85,.55),e.add(s),n.head==="eel"||n.body==="eel"){const r=new Li(65535,1.3,7);r.position.set(0,1.6,.4),e.add(r)}if(n.head==="cobra"||n.head==="scorpion"||n.tail==="scorpion"){const r=new Li(3800852,1.1,6);r.position.set(0,1.8,.8),e.add(r)}if(n.head==="eagle"||n.head==="tiger"||n.body==="tiger"){const r=new Li(16768358,.9,6);r.position.set(0,1.7,.6),e.add(r)}if(n.body==="rhino"||n.body==="bear"||n.body==="gorilla"){const r=new Li(16729105,.8,5);r.position.set(0,1.1,-.2),e.add(r)}if(n.head==="dragon"||n.body==="dragon"){const r=new Li(16732176,1.5,8);r.position.set(0,1.6,.5),e.add(r)}if(n.head==="jellyfish"||n.body==="jellyfish"){const r=new Li(9453823,1.2,7);r.position.set(0,1.7,.3),e.add(r)}return e}function gM(n,e,t=220){const i=new il({antialias:!0,alpha:!0});i.setSize(t,t),i.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),i.shadowMap.enabled=!0,i.shadowMap.type=Yo,i.toneMapping=$o,i.toneMappingExposure=1.25,n.appendChild(i.domElement);const s=new vd,r=new Zt(40,1,.1,100);r.position.set(0,2.2,7.2),r.lookAt(0,1.6,0),s.add(new Cd(6715306,.7));const a=new _r(16773597,1.25);a.position.set(-4,6,5),a.castShadow=!0,a.shadow.mapSize.width=1024,a.shadow.mapSize.height=1024,a.shadow.bias=-.001,s.add(a);const o=new _r(10185983,.7);o.position.set(5,2,-4),s.add(o);const l=new Xi(1.6,1.8,.25,32),c=new vi({color:2042167,roughness:.2,metalness:.8}),h=new $e(l,c);h.position.y=.05,h.receiveShadow=!0,s.add(h);const d=new wa(1.6,.06,16,64),u=new vi({color:10185983,emissive:10185983,emissiveIntensity:1.5,roughness:.1}),f=new $e(d,u);f.rotation.x=Math.PI/2,f.position.y=.18,s.add(f);const g=40,v=new Pt,m=new Float32Array(g*3),p=[],M=[];for(let O=0;O<g;O++){const re=Math.random()*Math.PI*2,me=.2+Math.random()*1.3;m[O*3]=Math.cos(re)*me,m[O*3+1]=Math.random()*3.5,m[O*3+2]=Math.sin(re)*me,p.push(.008+Math.random()*.015),M.push(Math.random()*Math.PI*2)}v.setAttribute("position",new jt(m,3));const y=new Aa({color:10185983,size:.08,transparent:!0,opacity:.6}),x=new al(v,y);s.add(x);let L=e,R=vr(e);s.add(R);const P=_a();s.add(P);let k=!1,b={x:0,y:0},A={x:0,y:.3};n.style.cursor="grab";const V=O=>{k=!0,b={x:O.clientX,y:O.clientY},n.style.cursor="grabbing"},Z=O=>{if(!k)return;const re={x:O.clientX-b.x,y:O.clientY-b.y};A.y+=re.x*.01,A.x+=re.y*.01,A.x=Math.max(-.6,Math.min(.6,A.x)),b={x:O.clientX,y:O.clientY}},se=()=>{k=!1,n.style.cursor="grab"},N=O=>{O.touches.length===1&&(k=!0,b={x:O.touches[0].clientX,y:O.touches[0].clientY})},W=O=>{if(!k||O.touches.length!==1)return;const re={x:O.touches[0].clientX-b.x,y:O.touches[0].clientY-b.y};A.y+=re.x*.01,A.x+=re.y*.01,A.x=Math.max(-.6,Math.min(.6,A.x)),b={x:O.touches[0].clientX,y:O.touches[0].clientY}};let $={x:0,y:0};const J=O=>{const re=n.getBoundingClientRect();if(re.width===0||re.height===0)return;const me=re.left+re.width/2,be=re.top+re.height/2;$.x=(O.clientX-me)/(re.width*2),$.y=(O.clientY-be)/(re.height*2),$.x=Math.max(-1,Math.min(1,$.x)),$.y=Math.max(-1,Math.min(1,$.y))};n.addEventListener("mousedown",V),window.addEventListener("mousemove",Z),window.addEventListener("mouseup",se),n.addEventListener("touchstart",N),window.addEventListener("touchmove",W),window.addEventListener("touchend",se),window.addEventListener("mousemove",J);let te=0,Y=0,ee=0,ce=!1;function ve(){if(ce)return;Y+=.016,k||(A.y+=.005),R.rotation.y=A.y,R.rotation.x=A.x;const O=R.getObjectByName("body"),re=R.getObjectByName("neck"),me=R.getObjectByName("head"),be=R.getObjectByName("forelimbs"),ke=R.getObjectByName("hindlimbs"),Te=L.forelimbs==="eagle"||L.body==="eagle"||L.body==="dragon",De=L.body==="cobra"||L.body==="eel"||L.body==="jellyfish",Ke=["bear","rhino","gorilla","boar"].includes(L.body),X=["ant","scorpion","crab"].includes(L.body);if(Te){if(R.position.y=Math.sin(Y*2.2)*.15+.35,R.position.x=0,O){const Q=Math.sin(Y*3)*.015;O.scale.set(1.04+Q,.94-Q,1.18+Q),O.rotation.x=.12+Math.sin(Y*2.2)*.04,O.rotation.y=0}be&&(be.rotation.x=.25),ke&&(ke.rotation.x=.4)}else if(De)R.position.y=Math.sin(Y*1.8)*.03+.1,R.position.x=0,O&&(O.rotation.y=Math.sin(Y*2.2)*.12,O.rotation.x=Math.cos(Y*1.8)*.05,O.scale.set(1.05,.92,1.2)),re&&(re.rotation.y=-Math.sin(Y*2.2)*.08);else if(Ke){if(R.position.y=.05,O){const Q=Math.sin(Y*1.2)*.035;O.scale.set(1.1+Q,.88-Q,1.25+Q),O.rotation.x=0,O.rotation.y=Math.sin(Y*.8)*.04}R.position.x=Math.sin(Y*.8)*.05}else if(X){if(R.position.y=.02+Math.sin(Y*4.5)*.01,R.position.x=0,O){const he=Math.sin(Y*4)*.018;O.scale.set(1.03+he,.94-he,1.2+he),O.rotation.x=.02,O.rotation.y=0}const Q=Math.sin(Y*15)*.02;be&&(be.rotation.z=Q),ke&&(ke.rotation.z=-Q)}else if(R.position.y=Math.sin(Y*1.4)*.04+.1,R.position.x=0,O){const Q=Math.sin(Y*2.5)*.02;O.scale.set(1.05+Q,.92-Q,1.2+Q),O.rotation.set(0,0,0)}if(me){const Q=$.x*.6;let he=$.y*.4+Math.sin(Y*1.2)*.03;if(Te)he-=.08;else if(De){const Ce=-Math.sin(Y*2.2)*.08;me.rotation.y+=(Q+Ce-me.rotation.y)*.1,me.rotation.x+=(he-me.rotation.x)*.1}else if(X){const Ce=(Math.sin(Y*12)+Math.cos(Y*19))*.018;me.rotation.y+=(Q+Ce*1.5-me.rotation.y)*.12,me.rotation.x+=(he+Ce-me.rotation.x)*.12}!De&&!X&&(me.rotation.y+=(Q-me.rotation.y)*.1,me.rotation.x+=(he-me.rotation.x)*.1)}const At=R.getObjectByName("ear_l_0"),Ne=R.getObjectByName("ear_l_1"),Ge=R.getObjectByName("ear_r_0"),ge=R.getObjectByName("ear_r_1");if(At&&Ge){const Q=Math.sin(Y*4)*.08,he=Math.cos(Y*3)*.05;At.rotation.x=Q,At.rotation.z=-.05+he,Ne&&(Ne.rotation.x=Q*1.5,Ne.rotation.z=he*.8),Ge.rotation.x=Q,Ge.rotation.z=.05-he,ge&&(ge.rotation.x=Q*1.5,ge.rotation.z=-he*.8)}const ct=R.getObjectByName("lower_jaw");if(ct){const Q=Math.max(0,Math.sin(Y*1.5)*.08);ct.rotation.x=Q}Math.random()<.008&&ee===0&&(ee=10);let Ie=1;ee>0&&(ee--,ee>5?Ie=.1+(ee-5)*.18:Ie=.1+(5-ee)*.18);for(const Q of["_r","_l"]){const he=R.getObjectByName(`eye${Q}`),Ce=R.getObjectByName(`pupil${Q}`);he&&(he.scale.y=Ie),Ce&&(Ce.scale.y=Ie)}const w=De?4.5:Ke?2:3.2,T=De?.32:Ke?.08:.15;for(let Q=0;Q<8;Q++){const he=R.getObjectByName(`tail_seg_${Q}`);he&&(he.rotation.y=Math.sin(Y*w-Q*.32)*T)}const q=R.getObjectByName("tail");q&&!R.getObjectByName("tail_seg_0")&&(q.rotation.y=Math.sin(Y*3.2)*.15);const le=R.getObjectByName("wing_r"),ae=R.getObjectByName("wing_l");if(le&&ae){const Q=Math.sin(Y*(Te?10:5))*(Te?.45:.25);le.rotation.z=Q,ae.rotation.z=-Q}const ne=x.geometry.attributes.position;for(let Q=0;Q<g;Q++){let he=ne.getY(Q)+p[Q];he>3.5&&(he=.2),ne.setY(Q,he);const Ce=M[Q]+Y;let Je=ne.getX(Q)+Math.sin(Ce)*.003,oe=ne.getZ(Q)+Math.cos(Ce)*.003;ne.setX(Q,Je),ne.setZ(Q,oe)}ne.needsUpdate=!0;const Se=s.getObjectByName("shadow");if(Se){const Q=R.position.y,he=Math.max(.2,1.2-Q*.8);Se.scale.set(he,he,1),Se.material.opacity=Math.max(.1,.55-Q*.65)}i.render(s,r),te=requestAnimationFrame(ve)}ve();function K(O){O.traverse(re=>{const me=re;me.geometry&&me.geometry.dispose();const be=me.material;Array.isArray(be)?be.forEach(ke=>ke.dispose()):be&&be.dispose()})}return{setGenome(O){L=O,s.remove(R),K(R),R=vr(O),s.add(R)},dispose(){ce=!0,cancelAnimationFrame(te),K(R),h.geometry.dispose(),c.dispose(),d.dispose(),u.dispose(),v.dispose(),y.dispose(),P.geometry.dispose(),P.material.dispose(),n.removeEventListener("mousedown",V),window.removeEventListener("mousemove",Z),window.removeEventListener("mouseup",se),n.removeEventListener("touchstart",N),window.removeEventListener("touchmove",W),window.removeEventListener("touchend",se),window.removeEventListener("mousemove",J),i.dispose(),i.domElement.remove()}}}const _M=Object.freeze(Object.defineProperty({__proto__:null,buildCreatureModel:vr,createSoftShadowMesh:_a,modelsReady:cM,mountCreature3D:gM},Symbol.toStringTag,{value:"Module"})),vn=960,Cn=420,Kn=300;function vM(n){const e={skyHex:396806,fogHex:662026,fogDensity:.014,floorHex:1714704,ambientHex:3359778,particleColor:"#2d6e2d",particleKind:"leaf"},t={skyHex:264207,fogHex:528160,fogDensity:.01,floorHex:2763317,ambientHex:2241365,particleColor:"#c8d8ff",particleKind:"streak"},i={skyHex:133648,fogHex:333088,fogDensity:.016,floorHex:992560,ambientHex:1060928,particleColor:"#20c0a0",particleKind:"bubble"},s={skyHex:983554,fogHex:1705221,fogDensity:.015,floorHex:2756616,ambientHex:4464656,particleColor:"#ff6020",particleKind:"ember"},r={skyHex:985602,fogHex:1708549,fogDensity:.012,floorHex:2760720,ambientHex:4469536,particleColor:"#c0a040",particleKind:"dust"},a=new Set(["wolf","bear","gorilla","tiger","panther"]),o=new Set(["eagle","dragon","mantis"]),l=new Set(["cobra","eel","jellyfish"]),c=new Set(["rhino","boar","scorpion"]);return a.has(n)?e:o.has(n)?t:l.has(n)?i:c.has(n)?s:r}function Dd(n,e,t,i=1){const s=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches??!1,r=i===0||s;if(r)return setTimeout(()=>t(e.winner),20),()=>{};let a=null,o=!1,l=null,c=null,h=null,d=null,u=null,f=null,g=null,v=null,m=null,p=[],M=null,y=0,x=0,L=()=>{},R=()=>{},P=null,k=null,b=null,A=null;const V=[],Z={a:new Set,b:new Set};let se=null;const N=[],W=[],$=[];let J=null,te=null,Y=null,ee=null;const ce=e.events.filter(C=>C.kind==="start"),ve=ce.find(C=>C.side==="a"),K=ce.find(C=>C.side==="b"),O={a:xh("a",ve,250),b:xh("b",K,vn-250)},re=[],me=[],be=[],ke=[];let Te=0;const De=[...e.events].sort((C,j)=>C.t-j.t);let Ke=0,X=0;const At=Eh(Math.round(Eh(e.ticks,450,950)/i),1,2400),Ne=e.ticks/At;let Ge=0,ge=0,ct=!1,Ie={active:!1,casterSide:"a",timer:0,duration:0,ability:"",value:0};const w=60,T=(C,j)=>{const _=new Float32Array(120),z=new Float32Array(40*3);for(let ze=0;ze<40;ze++){_[ze*3]=(Math.random()-.5)*20,_[ze*3+1]=Math.random()*12,_[ze*3+2]=(Math.random()-.5)*20;const st=j.particleKind==="streak"?.08:.02;z[ze*3]=j.particleKind==="streak"?(Math.random()-.5)*st*4:(Math.random()-.5)*st,z[ze*3+1]=j.particleKind==="bubble"||j.particleKind==="ember"?st+Math.random()*st:j.particleKind==="leaf"?-(st+Math.random()*st):(Math.random()-.5)*st*.3,z[ze*3+2]=j.particleKind==="streak"?(Math.random()-.5)*st*2:(Math.random()-.5)*st*.5}const ie=new Pt;ie.setAttribute("position",new jt(_,3));const Ae=new Aa({color:new Re(j.particleColor),size:j.particleKind==="streak"?.08:.12,transparent:!0,opacity:.55,depthWrite:!1}),Le=new al(ie,Ae);C.add(Le),se={mesh:Le,velocities:z,count:40}};try{l=new il({canvas:n,antialias:!0,alpha:!1}),l.setSize(vn,Cn),l.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),l.shadowMap.enabled=!0,l.shadowMap.type=Yo,l.toneMapping=$o,l.toneMappingExposure=1.25;const C=vM(ve.genome.body);c=new vd,c.background=new Re(C.skyHex),c.fog=new sl(C.fogHex,C.fogDensity),h=new Zt(38,vn/Cn,.1,100),h.position.set(0,14,22),h.lookAt(0,1.2,0),P=new Cd(C.ambientHex,.9),c.add(P),k=new _r(16772565,1.5),k.position.set(-6,12,8),k.castShadow=!0,k.shadow.mapSize.width=1024,k.shadow.mapSize.height=1024,c.add(k),b=new _r(10185983,.8),b.position.set(6,4,-6),c.add(b),A=new Rd(16777215,0,18,Math.PI/4,.5,1),A.position.set(0,10,0),A.castShadow=!0,c.add(A);const j=3,I=new Xi(.3,1.2,14,16,1,!0),_=new Rt({color:8037119,transparent:!0,opacity:.12,blending:Po,side:Qt,depthWrite:!1});for(let S=0;S<j;S++){const U=new $e(I,_);U.position.set(-6+S*6+(Math.random()-.5)*2,7,-3+(Math.random()-.5)*2),U.rotation.z=(Math.random()-.5)*.15,U.rotation.x=(Math.random()-.5)*.15,U.name=`light_ray_${S}`,c.add(U)}u=new Nt;const z=new Xi(10,10.5,.8,64);g=new vi({color:C.floorHex,metalness:.8,roughness:.3}),f=new $e(z,g),f.position.y=-.4,f.receiveShadow=!0,u.add(f),v=new wa(10.2,.1,16,64),m=new vi({color:8037119,emissive:8037119,emissiveIntensity:1.2});const ie=new $e(v,m);ie.rotation.x=Math.PI/2,ie.position.y=.01,u.add(ie),c.add(u),p=[];const Ae=[C.ambientHex,C.fogHex];for(let S=0;S<2;S++){const U=1.5+S*1.8,G=U+.18,H=new bs(U,G,64),F=new Rt({color:Ae[S],transparent:!0,opacity:.35-S*.1,side:Qt,depthWrite:!1}),pe=new $e(H,F);pe.rotation.x=-Math.PI/2,pe.position.y=.02,c.add(pe),p.push(pe)}T(c,C);const Le=C.particleKind==="leaf"?"forest":C.particleKind==="streak"?"sky":C.particleKind==="bubble"?"ocean":C.particleKind==="ember"?"volcano":"desert";L=of(Le),R=lf(Le);const ze=_a(),st=_a();c.add(ze),c.add(st),d={a:{model:vr(ve.genome),shadow:ze,basePos:new E(-4,0,.5),shake:0,lunge:0,dodgeOffset:0,flash:0,time:0,actionState:"idle",actionTimer:0,actionDuration:0,dodgeDir:0,blinkTimer:0,deathTimer:0,actionTimerAccumulator:0,vocalTimer:Math.floor(Math.random()*300+200)},b:{model:vr(K.genome),shadow:st,basePos:new E(4,0,-.5),shake:0,lunge:0,dodgeOffset:0,flash:0,time:Math.PI,actionState:"idle",actionTimer:0,actionDuration:0,dodgeDir:0,blinkTimer:0,deathTimer:0,actionTimerAccumulator:0,vocalTimer:Math.floor(Math.random()*300+350)}},d.a.model.position.copy(d.a.basePos),d.a.model.rotation.y=Math.PI/2-.4,c.add(d.a.model),d.b.model.position.copy(d.b.basePos),d.b.model.rotation.y=-Math.PI/2+.4,c.add(d.b.model),J=document.createElement("div"),J.className="arena-hud-overlay",J.style.position="absolute",J.style.top="20px",J.style.left="0",J.style.right="0",J.style.pointerEvents="none",J.style.display="flex",J.style.justifyContent="space-between",J.style.padding="0 40px",J.style.fontFamily="Inter, system-ui, sans-serif",J.innerHTML=`
      <div class="hud-bar player-hud" style="background: rgba(12,18,34,0.85); border: 1px solid rgba(122,162,255,0.25); border-radius: 12px; padding: 12px 20px; width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); backdrop-filter: blur(8px);">
        <div class="hud-name" style="font-weight: 700; font-size: 15px; color: #e7ecf7; margin-bottom: 6px;">${ve.name}</div>
        <div class="hud-hp-bg" style="background: #0c1222; border-radius: 9px; height: 18px; overflow: hidden; width: 100%;">
          <div class="hud-hp-fill" style="background: linear-gradient(90deg, #36c08a, #6ce5b1); height: 100%; width: 100%; transition: width 0.2s ease;"></div>
        </div>
        <div class="hud-text" style="font-size: 12px; color: #93a0bd; margin-top: 4px; text-align: right;">${ve.maxHp}/${ve.maxHp}</div>
      </div>
      <div class="hud-bar opponent-hud" style="background: rgba(12,18,34,0.85); border: 1px solid rgba(122,162,255,0.25); border-radius: 12px; padding: 12px 20px; width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); backdrop-filter: blur(8px);">
        <div class="hud-name" style="font-weight: 700; font-size: 15px; color: #e7ecf7; margin-bottom: 6px; text-align: right;">${K.name}</div>
        <div class="hud-hp-bg" style="background: #0c1222; border-radius: 9px; height: 18px; overflow: hidden; width: 100%;">
          <div class="hud-hp-fill" style="background: linear-gradient(90deg, #36c08a, #6ce5b1); height: 100%; width: 100%; transition: width 0.2s ease;"></div>
        </div>
        <div class="hud-text" style="font-size: 12px; color: #93a0bd; margin-top: 4px; text-align: left;">${K.maxHp}/${K.maxHp}</div>
      </div>
    `,n.parentElement?.style.setProperty("position","relative"),n.parentElement?.appendChild(J),te=document.createElement("div"),te.className="status-bar status-bar-a",Y=document.createElement("div"),Y.className="status-bar status-bar-b",J.appendChild(te),J.appendChild(Y),ee=document.createElement("canvas"),ee.width=vn,ee.height=Cn,ee.style.position="absolute",ee.style.top="0",ee.style.left="0",ee.style.pointerEvents="none",ee.style.display="none",n.parentElement?.appendChild(ee),o=!0}catch(C){if(console.warn("WebGL not supported, falling back to 2D canvas:",C),o=!1,a=n.getContext("2d"),a){const j=Math.min(window.devicePixelRatio||1,3);n.width=Math.round(vn*j),n.height=Math.round(Cn*j),a.scale(j,j)}}function q(){ge++;let C=1;if(o&&y>0&&(y--,C=.28),o&&d&&c&&x>0&&x<=60){x++;const I=e.winner,_=d[I];_.model.position.y=Math.abs(Math.sin(x*.25))*.8,x===5&&(ne(_.model.position,"#ffd700",25,.18),We(_.model.position,"#ffd700")),x===20&&ne(_.model.position,"#c8a84b",15,.14),x===61&&(_.model.position.y=0,x=0,ct||(ct=!0,J&&(J.remove(),J=null),t(e.winner)))}if(!(o&&Ie.active))for(X+=Ne*C;Ke<De.length&&De[Ke].t<=X;)Me(De[Ke]),Ke++;if(o&&d&&l&&c&&h){for(const I of["a","b"])O[I].displayHp+=(O[I].targetHp-O[I].displayHp)*.25;if(ge<w){const I=ge/w,_=I*(2-I);h.position.set(0,14-_*6.5,22-_*7.5),h.lookAt(0,1.2,0),ee&&(ee.style.display="none")}else if(Ie.active){Ie.timer++;const I=Ie.timer/Ie.duration,_=d[Ie.casterSide],z=_.basePos.clone().add(new E(Ie.casterSide==="a"?2.5:-2.5,2.2,5)),ie=_.basePos.clone().add(new E(0,1.4,0));if(h.position.lerp(z,.12),h.lookAt(new E(0,1.2,0).lerp(ie,.5)),ee&&(ee.style.display="block",Fe(ee)),A.target=_.model,P.intensity=.9*(1-Math.sin(I*Math.PI)*.85),k.intensity=1.5*(1-Math.sin(I*Math.PI)*.9),b.intensity=.8*(1-Math.sin(I*Math.PI)*.8),A.intensity=Math.sin(I*Math.PI)*4.5,Ie.timer%3===0&&I<.8){const Ae=Ie.ability==="spit"?"#39ff14":Ie.ability==="shock"?"#c39bff":Ie.ability==="leech"?"#ff3b30":"#ffae19";Pe(_.model.position,Ae)}Ie.timer>=Ie.duration&&(Ie.active=!1,Ie.onComplete&&Ie.onComplete(),A.intensity=0)}else{ee&&(ee.style.display="none");const I=new E(0,7.5,14.5),_=new E(0,1.2,0),z=d.a.actionState,ie=d.b.actionState;if(z==="windup"||z==="strike"?(I.add(new E(.8,-.4,-.6)),_.add(new E(.5,0,0))):(ie==="windup"||ie==="strike")&&(I.add(new E(-.8,-.4,-.6)),_.add(new E(-.5,0,0))),h.position.lerp(I,.08),h.lookAt(_),P.intensity+=(.9-P.intensity)*.1,k.intensity+=(1.5-k.intensity)*.1,b.intensity+=(.8-b.intensity)*.1,A.intensity+=(0-A.intensity)*.1,Te>.01){Te*=.85;const Ae=(Math.random()-.5)*Te,Le=(Math.random()-.5)*Te*.5;h.position.add(new E(Ae,Le,0))}}for(let I=N.length-1;I>=0;I--){const _=N[I];if(_.progress+=_.speed*C,_.progress>=1)c.remove(_.mesh),_.mesh.geometry.dispose(),_.mesh.material.dispose(),_.onHit(),N.splice(I,1);else{const z=new E().lerpVectors(_.start,_.end,_.progress);z.y+=Math.sin(_.progress*Math.PI)*1.5,_.mesh.position.copy(z);const ie=new Ln(.04,4,4),Ae=new Rt({color:new Re(_.colorHex),transparent:!0,opacity:.7}),Le=new $e(ie,Ae);Le.position.copy(z),c.add(Le),V.push({mesh:Le,velocity:new E((Math.random()-.5)*.01,.01,(Math.random()-.5)*.01),life:.4,decay:.04*C})}}for(let I=V.length-1;I>=0;I--){const _=V[I];_.mesh.position.addScaledVector(_.velocity,C),_.mesh.geometry.type==="RingGeometry"?_.mesh.scale.addScalar(.14*C):_.mesh.geometry.type==="IcosahedronGeometry"?_.mesh.scale.addScalar(.015*C):_.mesh.geometry.type==="BoxGeometry"?(_.velocity.y-=.005*C,_.mesh.rotation.x+=.04*C,_.mesh.rotation.y+=.06*C,_.mesh.position.y<.05&&_.velocity.y<0&&(_.mesh.position.y=.05,_.velocity.y=-_.velocity.y*.45,_.velocity.x*=.6,_.velocity.z*=.6)):(_.mesh.material.color.getHexString()==="b0b6c2"&&_.mesh.scale.addScalar(.06*C),_.velocity.y-=.003*C),_.life-=_.decay*C,_.mesh.material.opacity=Math.max(0,_.life),_.life<=0&&(c.remove(_.mesh),_.mesh.geometry.dispose(),_.mesh.material.dispose(),V.splice(I,1))}if(se){const I=se.mesh.geometry.getAttribute("position"),_=I.array,z=se.velocities;for(let ie=0;ie<se.count;ie++)_[ie*3]+=z[ie*3],_[ie*3+1]+=z[ie*3+1],_[ie*3+2]+=z[ie*3+2],_[ie*3+1]>13&&(_[ie*3+1]=-1),_[ie*3+1]<-1&&(_[ie*3+1]=13),Math.abs(_[ie*3])>11&&(_[ie*3]*=-.9),Math.abs(_[ie*3+2])>11&&(_[ie*3+2]*=-.9);I.needsUpdate=!0}for(let I=W.length-1;I>=0;I--){const _=W[I];if(_.life--,_.life<=0){c.remove(_.line),_.line.geometry.dispose(),_.line.material.dispose(),W.splice(I,1);continue}const z=_.line.geometry.attributes.position,ie=10,Ae=_.x2-_.x1,Le=_.y2-_.y1,ze=_.z2-_.z1;if(_.kind==="tether_1"||_.kind==="tether_2"){const st=new E(Ae,Le,ze);st.normalize();const S=new E(0,1,0).cross(st);S.lengthSq()<.001&&S.copy(new E(1,0,0).cross(st)),S.normalize();const U=new E().crossVectors(st,S).normalize();for(let G=0;G<=ie;G++){const H=G/ie,F=_.x1+Ae*H,pe=_.y1+Le*H,xe=_.z1+ze*H,we=H*Math.PI*5.5+ge*.24+(_.kind==="tether_2"?Math.PI:0),Oe=.25*Math.sin(H*Math.PI),Ze=F+(S.x*Math.cos(we)+U.x*Math.sin(we))*Oe,Ve=pe+(S.y*Math.cos(we)+U.y*Math.sin(we))*Oe,Ye=xe+(S.z*Math.cos(we)+U.z*Math.sin(we))*Oe;z.setXYZ(G,Ze,Ve,Ye)}}else{const st=Math.hypot(Ae,Le,ze)||1,S=-Le/st,U=Ae/st;for(let G=0;G<=ie;G++){const H=G/ie,F=_.x1+Ae*H,pe=_.y1+Le*H,xe=_.z1+ze*H;let we=0;_.kind==="lightning"?we=(Math.random()-.5)*.5*Math.sin(H*Math.PI):we=Math.sin(H*Math.PI*3+ge*.4)*.2*Math.sin(H*Math.PI),z.setXYZ(G,F+S*we,pe+U*we,xe)}}z.needsUpdate=!0}for(let I=$.length-1;I>=0;I--){const _=$[I];_.sprite.position.add(_.velocity),_.velocity.y-=.001,_.life-=_.decay,_.sprite.material.opacity=_.life,_.life<=0&&(c.remove(_.sprite),_.sprite.material.map?.dispose(),_.sprite.material.dispose(),$.splice(I,1))}if(u){const I=.5+Math.sin(ge*.08)*.3;u.children.forEach(_=>{if(_ instanceof $e){const z=_.material;z&&z.emissiveIntensity!==void 0&&(z.emissiveIntensity=I*1.5)}})}for(let I=0;I<3;I++){const _=c.getObjectByName(`light_ray_${I}`);_ instanceof $e&&(_.rotation.y+=.003,_.material.opacity=.1+Math.sin(ge*.02+I)*.04)}if(ge===w&&(Te=1.8,Se(d.a.model.position,18),Se(d.b.model.position,18),Ce(d.a.model.position,1.2),Ce(d.b.model.position,1.2),he(d.a.model.position,8),he(d.b.model.position,8),rf()),ge>=w&&ge<w+30&&ge%10===0)for(const I of["a","b"]){const z=d[I].model.getObjectByName("head");if(z){const ie=new E;z.getWorldPosition(ie),ie.z+=I==="a"?.5:-.5,Q(ie,"#c39bff")}}for(const I of["a","b"]){const _=d[I],z=O[I],Ae=d[I==="a"?"b":"a"];if(_.time+=.016*C,z.displayHp>.5&&ge>w+60&&_.actionState==="idle"&&(_.vocalTimer-=C,_.vocalTimer<=0)){const ue=_.model.getObjectByName("head");if(ue){const He=new E;ue.getWorldPosition(He),He.z+=I==="a"?.5:-.5;const sn=z.genome.body==="eel"?"#50e8d0":z.genome.body==="cobra"?"#a8e030":z.genome.body==="dragon"?"#ff6030":z.genome.body==="jellyfish"?"#b060ff":"#e8d8a0";Q(He,sn),af(sn)}_.vocalTimer=Math.floor(Math.random()*300+480)}_.actionTimerAccumulator+=C;let Le=0;_.actionTimerAccumulator>=1&&(Le=Math.floor(_.actionTimerAccumulator),_.actionTimerAccumulator-=Le);for(let ue=0;ue<Le;ue++)if(_.actionState==="windup")_.actionTimer++,_.actionTimer>=_.actionDuration&&(_.actionState="strike",_.actionTimer=0,_.actionDuration=5,Se(_.model.position,8));else if(_.actionState==="strike"){_.actionTimer++;const He=z,sn=He.genome.forelimbs==="eagle"||He.genome.body==="eagle"||He.genome.body==="dragon",Vn=["crab","scorpion","eagle"].includes(He.genome.forelimbs),Tr=He.genome.forelimbs==="gorilla",si=["cobra","eel","jellyfish"].includes(He.genome.body);sn&&Math.random()<.7&&ae(_.model.position,I),Tr&&_.actionTimer===1&&Se(_.model.position,18),si&&Math.random()<.4&&ne(_.model.position.clone().add(new E(0,.4,0)),"#39ff14",3,.07),_.actionTimer>=_.actionDuration&&(_.onHitCallback&&(_.onHitCallback(),_.onHitCallback=void 0),Vn&&le(_.model.position,I),_.actionState="recover",_.actionTimer=0,_.actionDuration=18)}else _.actionState==="recover"||_.actionState==="dodge"?(_.actionTimer++,_.actionTimer>=_.actionDuration&&(_.actionState="idle",_.actionTimer=0)):Math.random()<.003&&z.displayHp>.5&&(_.actionState="dodge",_.actionTimer=0,_.actionDuration=24,_.dodgeDir=Math.random()<.5?1:-1);const ze=_.actionTimer+_.actionTimerAccumulator;if(_.actionState==="windup"){const ue=Math.min(1,ze/_.actionDuration);_.lunge=-.4*ue,_.model.rotation.z=I==="a"?-.12:.12}else if(_.actionState==="strike"){const ue=Math.min(1,ze/_.actionDuration);_.lunge=-.4+2.2*ue,_.model.rotation.z=I==="a"?.22:-.22}else if(_.actionState==="recover"){const ue=Math.min(1,ze/_.actionDuration);_.lunge=1.8*(1-ue*(2-ue)),_.model.rotation.z=0}else if(_.actionState==="dodge"){const ue=_.actionDuration/2;ze<ue?_.dodgeOffset=_.dodgeDir*1.5*(ze/ue):_.dodgeOffset=_.dodgeDir*1.5*(1-(ze-ue)/ue)}else _.lunge=0,_.dodgeOffset=0;const st=Ae.basePos.clone().sub(_.basePos).normalize(),S=new E(-st.z,0,st.x).normalize();let U=0,G=0;_.shake>.01&&(_.shake*=.9,U=(Math.random()-.5)*_.shake,G=(Math.random()-.5)*_.shake*.4);const H=_.basePos.clone().add(st.multiplyScalar(_.lunge)).add(S.multiplyScalar(_.dodgeOffset)).add(new E(U,G,0)),F=z.displayHp>.5,pe=z.genome.forelimbs==="eagle"||z.genome.body==="eagle"||z.genome.body==="dragon",xe=z.genome.body==="cobra"||z.genome.body==="eel"||z.genome.body==="jellyfish",we=["bear","rhino","gorilla","boar"].includes(z.genome.body),Oe=["ant","scorpion","crab"].includes(z.genome.body),Ze=z.genome.forelimbs==="crab"||z.genome.forelimbs==="scorpion",Ve=z.genome.forelimbs==="eagle",Ye=["scorpion","cobra","eel","tiger","dragon","jellyfish"].includes(z.genome.tail),wt=["boar","wolf","bear","rhino","cobra","dragon"].includes(z.genome.head),Ft=z.genome.forelimbs==="gorilla";if(F)if(ge<w){const ue=ge/w,He=8*(1-ue*ue);H.y+=He+.1}else{let ue=Math.sin(_.time*2.5)*.08+.1;if(pe?ue=Math.sin(_.time*2.2)*.15+.35:xe?ue=Math.sin(_.time*1.8)*.03+.1:we?ue=.05:Oe&&(ue=.02+Math.sin(_.time*4.5)*.01),H.y+=ue,_.actionState==="windup"){const He=_.actionTimer/_.actionDuration;Ve?H.y+=He*1.4:Ft&&(H.y+=He*.8)}else if(_.actionState==="strike"){const He=_.actionTimer/_.actionDuration;Ve?H.y+=1.4*(1-He)+Math.sin(He*Math.PI)*.5:Ft&&(H.y+=.8*(1-He))}}else{_.deathTimer++;const ue=Math.min(1,_.deathTimer/30);H.y=.1-ue*.7,_.model.rotation.z=(I==="a"?-.8:.8)*Math.min(1,_.deathTimer/15),_.model.traverse(sn=>{const Vn=sn;Vn.isMesh&&Vn.material&&(Array.isArray(Vn.material)?Vn.material:[Vn.material]).forEach(si=>{si.transparent=!0,si.opacity=Math.max(0,1-(_.deathTimer-15)/35)})}),(Ke<De.length||ge<=At)&&Math.random()<.1&&ne(_.model.position,"#555555",3,.03)}if(_.model.position.copy(H),_.shadow){_.shadow.position.set(H.x,.19,H.z);const ue=H.y,He=Math.max(.2,1.2-ue*.8);_.shadow.scale.set(He,He,1),F?_.shadow.material.opacity=Math.max(.1,.55-ue*.65):(_.shadow.material.transparent=!0,_.shadow.material.opacity=Math.max(0,.55-_.deathTimer/30))}const Dt=I==="a"?Math.PI/2-.4:-Math.PI/2+.4;if(F){if(_.actionState==="strike"&&Ye){const ue=_.actionTimer/_.actionDuration;_.model.rotation.y=Dt+Math.sin(ue*Math.PI)*Math.PI*(I==="a"?2:-2)}else _.model.rotation.y+=(Dt-_.model.rotation.y)*.15;if(_.actionState==="windup"&&Ft)_.model.rotation.z+=((I==="a"?-.25:.25)-_.model.rotation.z)*.15;else if(_.actionState==="strike"&&Ve){const ue=_.actionTimer/_.actionDuration;_.model.rotation.z=(I==="a"?.35:-.35)*(1-ue*2.5)}else _.actionState==="strike"&&!Ve?_.model.rotation.z=I==="a"?.22:-.22:_.actionState==="windup"&&!Ft?_.model.rotation.z=I==="a"?-.12:.12:_.model.rotation.z+=(0-_.model.rotation.z)*.15}const xt=_.model.getObjectByName("body"),St=_.model.getObjectByName("neck"),qe=_.model.getObjectByName("forelimbs"),ii=_.model.getObjectByName("hindlimbs");if(F){if(xt)if(pe){const ue=Math.sin(_.time*3)*.015;xt.scale.set(1.04+ue,.94-ue,1.18+ue),xt.rotation.x=.12+Math.sin(_.time*2.2)*.04,xt.rotation.y=0}else if(xe)xt.rotation.y=Math.sin(_.time*2.2)*.12,xt.rotation.x=Math.cos(_.time*1.8)*.05,xt.scale.set(1.05,.92,1.2);else if(we){const ue=Math.sin(_.time*1.2)*.035;xt.scale.set(1.1+ue,.88-ue,1.25+ue),xt.rotation.x=0,xt.rotation.y=Math.sin(_.time*.8)*.04}else if(Oe){const ue=Math.sin(_.time*4)*.018;xt.scale.set(1.03+ue,.94-ue,1.2+ue),xt.rotation.x=.02,xt.rotation.y=0}else{const ue=Math.sin(_.time*2.5)*.02;xt.scale.set(1.05+ue,.92-ue,1.2+ue),xt.rotation.set(0,0,0)}if(St&&xe&&(St.rotation.y=-Math.sin(_.time*2.2)*.08),qe)if(qe.rotation.set(0,0,0),_.actionState==="strike"&&Ze){const ue=_.actionTimer/_.actionDuration;qe.rotation.y=Math.sin(ue*Math.PI)*(I==="a"?.9:-.9),qe.rotation.x=Math.sin(ue*Math.PI)*.4}else if(_.actionState==="strike"&&Ft){const ue=_.actionTimer/_.actionDuration;qe.rotation.x=-1.3*ue}else pe?qe.rotation.x=.25:Oe&&(qe.rotation.z=Math.sin(_.time*15)*.02);ii&&(ii.rotation.set(0,0,0),pe?ii.rotation.x=.4:Oe&&(ii.rotation.z=-Math.sin(_.time*15)*.02))}const at=_.model.getObjectByName("head");if(at&&F&&Ae)if(ge>w-20&&ge<w+40)at.rotation.x=-.35,at.rotation.y=I==="a"?.2:-.2;else if(_.actionState==="strike"&&wt){const ue=_.actionTimer/_.actionDuration;at.position.z=Math.sin(ue*Math.PI)*.6,at.rotation.set(0,0,0)}else{at.position.z+=(0-at.position.z)*.15;const ue=new E;at.getWorldPosition(ue);const He=new E;Ae.model.getWorldPosition(He),He.y+=1.6;const sn=at.parent.worldToLocal(He.clone()),Vn=Math.atan2(sn.x,sn.z),Tr=-Math.atan2(sn.y,Math.hypot(sn.x,sn.z));let si=Math.max(-.6,Math.min(.6,Vn)),Da=Math.max(-.4,Math.min(.4,Tr));if(pe)Da-=.08;else if(xe)si+=-Math.sin(_.time*2.2)*.08;else if(Oe){const _l=(Math.sin(_.time*12)+Math.cos(_.time*19))*.018;si+=_l*1.5,Da+=_l}at.rotation.y+=(si-at.rotation.y)*.1,at.rotation.x+=(Da-at.rotation.x)*.1}const En=_.model.getObjectByName("ear_l_0"),Yi=_.model.getObjectByName("ear_l_1"),Gn=_.model.getObjectByName("ear_r_0"),Si=_.model.getObjectByName("ear_r_1");if(En&&Gn&&F){const ue=Math.sin(_.time*4)*.08,He=Math.cos(_.time*3)*.05;En.rotation.x=ue,En.rotation.z=-.05+He,Yi&&(Yi.rotation.x=ue*1.5,Yi.rotation.z=He*.8),Gn.rotation.x=ue,Gn.rotation.z=.05-He,Si&&(Si.rotation.x=ue*1.5,Si.rotation.z=-He*.8)}const Bt=_.model.getObjectByName("lower_jaw");if(Bt&&F){let ue=0;ge>w-20&&ge<w+40?ue=.35:_.actionState==="windup"||_.actionState==="strike"?ue=wt?.45:.25:ue=Math.max(0,Math.sin(_.time*1.8)*.06),Bt.rotation.x=ue}Math.random()<.008&&_.blinkTimer===0&&(_.blinkTimer=10);let gn=1;_.blinkTimer>0&&(_.blinkTimer--,_.blinkTimer>5?gn=.1+(_.blinkTimer-5)*.18:gn=.1+(5-_.blinkTimer)*.18);for(const ue of["_r","_l"]){const He=_.model.getObjectByName(`eye${ue}`),sn=_.model.getObjectByName(`pupil${ue}`);He&&(He.scale.y=gn),sn&&(sn.scale.y=gn)}const $i=xe?4.5:we?2:3.5,nn=xe?.32:we?.08:.15;for(let ue=0;ue<8;ue++){const He=_.model.getObjectByName(`tail_seg_${ue}`);He&&(He.rotation.y=Math.sin(_.time*$i-ue*.32)*nn)}const Ki=_.model.getObjectByName("tail");Ki&&!_.model.getObjectByName("tail_seg_0")&&F&&(Ki.rotation.y=Math.sin(_.time*$i)*nn);const Sr=_.model.getObjectByName("wing_r"),Vs=_.model.getObjectByName("wing_l");if(Sr&&Vs&&F){const ue=Math.sin(_.time*(pe?10:6))*(pe?.45:.3);Sr.rotation.z=ue,Vs.rotation.z=-ue}_.flash>.5?(_.flash*=.92,M||(M=new Rt({color:16777215})),_.model.traverse(ue=>{const He=ue;He.isMesh&&He.material&&(He.originalMaterial||(He.originalMaterial=He.material),He.material=M)})):(_.flash>.02?_.flash*=.92:_.flash=0,_.model.traverse(ue=>{const He=ue;He.isMesh&&He.originalMaterial&&(He.material=He.originalMaterial,delete He.originalMaterial)}))}if(l.render(c,h),J){const I=J.querySelector(".player-hud .hud-hp-fill"),_=J.querySelector(".player-hud .hud-text"),z=Math.max(0,O.a.displayHp)/O.a.maxHp*100;I.style.width=`${z}%`,I.style.background=z>30?"linear-gradient(90deg, #36c08a, #6ce5b1)":"linear-gradient(90deg, #ff6b81, #ff97a6)",_.textContent=`${Math.max(0,Math.round(O.a.displayHp))}/${O.a.maxHp}`;const ie=J.querySelector(".opponent-hud .hud-hp-fill"),Ae=J.querySelector(".opponent-hud .hud-text"),Le=Math.max(0,O.b.displayHp)/O.b.maxHp*100;ie.style.width=`${Le}%`,ie.style.background=Le>30?"linear-gradient(90deg, #36c08a, #6ce5b1)":"linear-gradient(90deg, #ff6b81, #ff97a6)",Ae.textContent=`${Math.max(0,Math.round(O.b.displayHp))}/${O.b.maxHp}`}}else{for(const I of["a","b"]){const _=O[I];_.displayHp+=(_.targetHp-_.displayHp)*.25,_.shake*=.8,_.lunge*=.82,_.flash*=.85,_.attackAnim=Math.max(0,_.attackAnim-.065),_.hitAnim=Math.max(0,_.hitAnim-.055);const z=I==="a"?1:-1;_.x=_.baseX+_.lunge*z}for(let I=re.length-1;I>=0;I--){const _=re[I];_.y+=_.vy,_.vy+=.06,_.life-=1,_.life<=0&&re.splice(I,1)}for(let I=me.length-1;I>=0;I--){const _=me[I];_.x+=_.vx,_.y+=_.vy,_.vy+=.18,_.vx*=.98,_.life-=1,_.life<=0&&me.splice(I,1)}for(let I=be.length-1;I>=0;I--)be[I].life-=1,be[I].life<=0&&be.splice(I,1);for(let I=ke.length-1;I>=0;I--){const _=ke[I];_.x+=_.vx,_.y+=_.vy,me.push({x:_.x,y:_.y,vx:0,vy:0,life:8,maxLife:8,color:_.trail,size:_.size*.7});const z=_.tx-_.x,ie=_.ty-_.y;(z*z+ie*ie<220||ge>At+400)&&(_.onHit(),ke.splice(I,1))}Te*=.85,mt()}Ke>=De.length&&ge>At&&re.length===0&&ke.length===0&&be.length===0&&N.length===0&&V.length===0&&$.length===0&&(!ct&&x===0&&(o&&d&&e.winner!=="draw"?x=1:(ct=!0,J&&(J.remove(),J=null),t(e.winner))),x===0||ct)||(Ge=requestAnimationFrame(q))}const le=(C,j)=>{const I=j==="a"?1:-1,_=[[-.18*I,.55],[0,.4],[.18*I,.55]];for(const[z,ie]of _){const Ae=C.clone().add(new E(z-.22*I,ie+.22,0)),Le=C.clone().add(new E(z+.22*I,ie-.22,0)),ze=new Pt().setFromPoints([Ae,Le]),st=new sr({color:16777215,transparent:!0,opacity:.9}),S=new Es(ze,st);c?.add(S),W.push({line:S,life:14,maxLife:14,kind:"lightning",x1:Ae.x,y1:Ae.y,z1:Ae.z,x2:Le.x,y2:Le.y,z2:Le.z})}},ae=(C,j)=>{const I=j==="a"?-1:1,_=C.clone().add(new E(I*.6+(Math.random()-.5)*.25,(Math.random()-.5)*.5,0)),z=C.clone().add(new E(I*1.8+(Math.random()-.5)*.15,(Math.random()-.5)*.3,0)),ie=new Pt().setFromPoints([_,z]),Ae=new sr({color:15658751,transparent:!0,opacity:.75}),Le=new Es(ie,Ae);c?.add(Le),W.push({line:Le,life:9,maxLife:9,kind:"lightning",x1:_.x,y1:_.y,z1:_.z,x2:z.x,y2:z.y,z2:z.z})},ne=(C,j,I=20,_=.12)=>{const z=new Ln(.06,6,6),ie=new Rt({color:new Re(j),transparent:!0,opacity:.9});for(let Ae=0;Ae<I;Ae++){const Le=new $e(z,ie.clone());Le.position.copy(C).add(new E((Math.random()-.5)*.4,(Math.random()-.5)*.4,(Math.random()-.5)*.4)),c?.add(Le),V.push({mesh:Le,velocity:new E((Math.random()-.5)*_*2,(Math.random()-.2)*_*2,(Math.random()-.5)*_*2),life:1,decay:.02+Math.random()*.02})}},Se=(C,j=15)=>{const I=new Ln(.18,8,8),_=new Rt({color:new Re(11581122),transparent:!0,opacity:.6,depthWrite:!1});for(let z=0;z<j;z++){const ie=new $e(I,_.clone()),Ae=Math.random()*Math.PI*2,Le=.2+Math.random()*.8;ie.position.set(C.x+Math.cos(Ae)*Le,.2,C.z+Math.sin(Ae)*Le),c?.add(ie),V.push({mesh:ie,velocity:new E(Math.cos(Ae)*(.02+Math.random()*.04),.01+Math.random()*.03,Math.sin(Ae)*(.02+Math.random()*.04)),life:.7,decay:.02+Math.random()*.02})}},Q=(C,j)=>{const I=new bs(.1,.12,32),_=new Rt({color:new Re(j),side:Qt,transparent:!0,opacity:.8,depthWrite:!1}),z=new $e(I,_);z.position.copy(C),h&&z.lookAt(h.position),c?.add(z),V.push({mesh:z,velocity:new E(0,0,0),life:.8,decay:.03})},he=(C,j=12)=>{const I=new Fs(.14,.14,.14),_=new vi({color:5919557,roughness:.9});for(let z=0;z<j;z++){const ie=new $e(I,_.clone());ie.position.copy(C).add(new E((Math.random()-.5)*.6,.1,(Math.random()-.5)*.6)),ie.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),c?.add(ie),V.push({mesh:ie,velocity:new E((Math.random()-.5)*.16,.06+Math.random()*.15,(Math.random()-.5)*.16),life:1,decay:.015+Math.random()*.01})}},Ce=(C,j=1.3)=>{const I=new bs(j*.8,j,24),_=new Rt({color:461074,side:Qt,transparent:!0,opacity:.85,depthWrite:!1}),z=new $e(I,_);z.rotation.x=Math.PI/2,z.position.set(C.x,.02,C.z),c?.add(z),V.push({mesh:z,velocity:new E(0,0,0),life:1.3,decay:.012})},Je=(C,j=12)=>{const I=new Ln(.08,6,6),_=new Rt({color:3800852,transparent:!0,opacity:.8});for(let z=0;z<j;z++){const ie=new $e(I,_.clone());ie.position.copy(C).add(new E((Math.random()-.5)*.5,.2,(Math.random()-.5)*.5)),c?.add(ie),V.push({mesh:ie,velocity:new E((Math.random()-.5)*.01,.015+Math.random()*.02,(Math.random()-.5)*.01),life:.8,decay:.014})}},oe=(C,j)=>{const I=new hl(1.6,1),_=new Rt({color:new Re(j),wireframe:!0,transparent:!0,opacity:.75,depthWrite:!1}),z=new $e(I,_);z.position.copy(C).add(new E(0,.8,0)),c?.add(z),V.push({mesh:z,velocity:new E(0,0,0),life:1,decay:.03})};let ht=null;const it=()=>{if(!ht){const C=document.createElement("canvas");C.width=64,C.height=64;const j=C.getContext("2d");j&&(j.fillStyle="#36c08a",j.fillRect(26,10,12,44),j.fillRect(10,26,44,12)),ht=new gr(C)}return ht},je=(C,j=8)=>{const I=new Ho({map:it(),transparent:!0,opacity:.95});for(let _=0;_<j;_++){const z=new Kc(I.clone());z.position.copy(C).add(new E((Math.random()-.5)*.8,.3+Math.random()*.5,(Math.random()-.5)*.8)),z.scale.setScalar(.4),c?.add(z),$.push({sprite:z,velocity:new E((Math.random()-.5)*.008,.025+Math.random()*.015,0),life:1,decay:.018})}};function Fe(C){const j=C.getContext("2d");if(!j)return;j.clearRect(0,0,vn,Cn),j.strokeStyle="rgba(255, 255, 255, 0.35)",j.lineWidth=1.5;const I=vn/2,_=Cn/2,z=35;for(let ie=0;ie<z;ie++){const Ae=Math.random()*Math.PI*2,Le=40+Math.random()*80,ze=180+Math.random()*100,st=I+Math.cos(Ae)*ze,S=_+Math.sin(Ae)*ze,U=I+Math.cos(Ae)*(ze+Le),G=_+Math.sin(Ae)*(ze+Le);j.beginPath(),j.moveTo(st,S),j.lineTo(U,G),j.stroke()}}const Pe=(C,j)=>{const I=new Ln(.05,4,4),_=new Rt({color:new Re(j),transparent:!0,opacity:.9}),z=new $e(I,_),ie=Math.random()*Math.PI*2,Ae=1.8;z.position.set(C.x+Math.cos(ie)*Ae,C.y+(Math.random()-.2)*.5,C.z+Math.sin(ie)*Ae),c?.add(z);const Le=new E(-Math.sin(ie),0,Math.cos(ie)).normalize(),st=C.clone().sub(z.position).normalize().multiplyScalar(.04).add(Le.multiplyScalar(.03)).add(new E(0,.03,0));V.push({mesh:z,velocity:st,life:.8,decay:.02})},We=(C,j)=>{const I=new bs(.1,.15,32),_=new Rt({color:new Re(j),side:Qt,transparent:!0,opacity:.8,depthWrite:!1}),z=new $e(I,_);z.position.copy(C).add(new E(0,1,.5)),h&&z.lookAt(h.position),c?.add(z),V.push({mesh:z,velocity:new E(0,0,0),life:.7,decay:.045})},dt=(C,j)=>{const I=new Ln(.06,4,4),_=new Rt({color:new Re(j),transparent:!0,opacity:.8});for(let z=0;z<16;z++){const ie=new $e(I,_.clone()),Ae=z/16*Math.PI*4,Le=z/16*2;ie.position.set(C.x+Math.cos(Ae)*.7,C.y+Le,C.z+Math.sin(Ae)*.7),c?.add(ie),V.push({mesh:ie,velocity:new E(0,.02+Math.random()*.015,0),life:1,decay:.02+Math.random()*.01})}};function Tt(C,j=1,I){const _=d[C];_.actionState="windup",_.actionTimer=0,_.actionDuration=Math.round(10*j),_.lunge=0,_.onHitCallback=I}const Qe=(C,j,I,_)=>{const z=[];for(let S=0;S<=10;S++)z.push(new E);const Ae=new Pt().setFromPoints(z),Le=new sr({color:new Re(I)}),ze=new Es(Ae,Le);c?.add(ze);const st=_==="lightning";W.push({line:ze,life:st?22:40,maxLife:st?22:40,kind:_,x1:C.x,y1:C.y,z1:C.z,x2:j.x,y2:j.y,z2:j.z})},de=(C,j,I,_)=>{const z=document.createElement("canvas");z.width=256,z.height=128;const ie=z.getContext("2d");if(!ie)return;ie.font=`bold ${_*2}px Inter, sans-serif`,ie.fillStyle=I,ie.textAlign="center",ie.textBaseline="middle",ie.fillText(j,128,64);const Ae=new gr(z),Le=new Ho({map:Ae,transparent:!0}),ze=new Kc(Le);ze.position.copy(C),ze.scale.set(2,1,1),c?.add(ze),$.push({sprite:ze,velocity:new E((Math.random()-.5)*.02,.05,0),life:1,decay:.02})};function D(C){const j=O[Pn(C.by)],I=d[C.by],_=d[Pn(C.by)];if(xr(C.ability),C.ability==="spit"){const z=I.model.position.clone().add(new E(C.by==="a"?.8:-.8,1.2,0)),ie=_.model.position.clone().add(new E(0,.8,0)),Ae=new Ln(.18,8,8),Le=new Rt({color:3800852}),ze=new $e(Ae,Le);ze.position.copy(z),c?.add(ze),N.push({mesh:ze,start:z,end:ie,progress:0,speed:.018,colorHex:"#39ff14",onHit:()=>{O[Pn(C.by)].hitAnim=.9,_.shake=1,_.flash=1,j.targetHp=C.targetHp,Te=Math.max(Te,.8),ne(_.model.position,"#39ff14",15,.15),We(_.model.position,"#39ff14"),Je(_.model.position,12),Se(_.model.position,10),de(_.model.position.clone().add(new E(0,2,0)),`${Ri(C.ability)} ${C.value}`,"#39ff14",26)}})}else if(C.ability==="shock"){const z=I.model.position.clone().add(new E(0,1.2,0)),ie=_.model.position.clone().add(new E(0,.8,0));Qe(z,ie,"#c39bff","lightning"),O[Pn(C.by)].hitAnim=.9,_.shake=1.2,_.flash=1,j.targetHp=C.targetHp,Te=Math.max(Te,.9),ne(_.model.position,"#c39bff",15,.16),We(_.model.position,"#c39bff"),We(_.model.position,"#ffd700"),Se(_.model.position,10),de(_.model.position.clone().add(new E(0,2,0)),`${Ri(C.ability)} ${C.value}`,"#c39bff",26)}else if(C.ability==="leech"){const z=I.model.position.clone().add(new E(0,.8,0)),ie=_.model.position.clone().add(new E(0,.8,0));Qe(ie,z,"#ff3b30","tether_1"),Qe(ie,z,"#ff3b30","tether_2"),O[Pn(C.by)].hitAnim=.9,_.shake=1,_.flash=1,j.targetHp=C.targetHp,Te=Math.max(Te,.7),ne(_.model.position,"#ff3b30",12,.12),We(_.model.position,"#ff3b30"),Se(_.model.position,8),de(_.model.position.clone().add(new E(0,2,0)),`${Ri(C.ability)} ${C.value}`,"#ff3b30",26)}else if(C.ability==="charge")Tt(C.by,1.8,()=>{O[Pn(C.by)].hitAnim=1,_.shake=1.4,_.flash=1,j.targetHp=C.targetHp,Te=Math.max(Te,1.2),ne(_.model.position,"#ffae19",18,.22),We(_.model.position,"#ffae19"),Ce(_.model.position,1.5),he(_.model.position,15),Se(_.model.position,12),de(_.model.position.clone().add(new E(0,2,0)),`${Ri(C.ability)} ${C.value}`,"#ffae19",26)});else{I.flash=.8;let z="#7aa2ff";C.ability==="venom"?(z="#9be86c",Je(I.model.position,12)):C.ability==="frenzy"?(z="#ff6b81",I.flash=1.3):C.ability==="regenerate"?(z="#6ce5b1",je(I.model.position,10)):C.ability==="armor"&&(z="#7aa2ff",oe(I.model.position,"#7aa2ff")),ne(I.model.position,z,14,.14),dt(I.model.position,z),de(I.model.position.clone().add(new E(0,2,0)),Ri(C.ability),z,24),C.targetHp!==void 0&&(j.targetHp=C.targetHp)}}function ye(){if(J)for(const C of["a","b"]){const j=C==="a"?te:Y;j&&(j.innerHTML=[...Z[C]].map(I=>`<span class="status-tag">${I}</span>`).join(""))}}function Me(C){if(o&&d)switch(C.kind){case"attack":{const j=O[Pn(C.by)],I=d[Pn(C.by)];Tt(C.by,1,()=>{I.shake=C.crit?1:.6,I.flash=1,j.targetHp=C.targetHp,Te=Math.max(Te,C.crit?1.2:.6),C.crit&&(y=35),ne(I.model.position,C.crit?"#ffce6b":"#ff8f6b",C.crit?18:10,C.crit?.2:.12),We(I.model.position,C.crit?"#ffce6b":"#ff8f6b"),(C.crit||O[C.by].genome.forelimbs==="gorilla")&&(Ce(I.model.position,C.crit?1.4:1.1),he(I.model.position,C.crit?10:6)),Se(I.model.position,C.crit?12:6),El(C.crit),de(I.model.position.clone().add(new E(0,2,0)),C.crit?`${C.dmg}!`:`${C.dmg}`,C.crit?"#ffce6b":"#ff8f6b",C.crit?38:28)});break}case"ability":{["spit","shock","leech","charge"].includes(C.ability)?Ie={active:!0,casterSide:C.by,timer:0,duration:45,ability:C.ability,value:C.value,targetHp:C.targetHp,onComplete:()=>{D(C)}}:D(C),C.ability==="frenzy"?Z[C.by].add("⚡ Frenzy"):C.ability==="armor"?Z[C.by].add("🛡 Armor"):C.ability==="venom"?Z[Pn(C.by)].add("☠ Venom"):C.ability==="regenerate"&&Z[C.by].add("💚 Regen"),ye();break}case"poison":{const j=O[C.on];j.targetHp=C.hp,xr("venom");const I=d[C.on];I.flash=.5,ne(I.model.position,"#9be86c",8,.1),de(I.model.position.clone().add(new E(0,2,0)),`☠ ${C.dmg}`,"#9be86c",22);break}case"heal":{const j=O[C.on];j.targetHp=C.hp,Co();const I=d[C.on];ne(I.model.position,"#6ce5b1",10,.12),de(I.model.position.clone().add(new E(0,2,0)),`+${C.amount}`,"#6ce5b1",24);break}case"death":{const j=O[C.side];j.flash=1;const I=d[C.side];I.flash=1,Al(),Z[C.side].clear(),ye();break}}else switch(C.kind){case"attack":{const j=O[C.by],I=O[Pn(C.by)];j.lunge=85,j.attackAnim=1,I.hitAnim=1,I.shake=C.crit?16:9,I.flash=1,I.targetHp=C.targetHp,Te=Math.max(Te,C.crit?10:5),Ue(I,C.crit?"#ffce6b":"#ff8f6b",C.crit?16:9,C.crit?5:3.4),El(C.crit),Be(I,C.crit?`${C.dmg}!`:`${C.dmg}`,C.crit?"#ffce6b":"#ff8f6b",C.crit?34:26);break}case"ability":{const j=O[C.by],I=O[Pn(C.by)];j.attackAnim=.8,j.lunge=55,j.flash=.6,xr(C.ability),!(C.value<0)&&(C.ability==="venom"||C.ability==="armor"||C.ability==="frenzy")?(Ue(j,"#7aa2ff",8,2.6),Be(j,Ri(C.ability),"#7aa2ff",20)):C.ability!=="regenerate"&&(I.hitAnim=.9,I.shake=12,I.flash=1,I.targetHp=C.targetHp,Te=Math.max(Te,8),Ue(I,"#c39bff",12,4),Be(I,`${Ri(C.ability)} ${C.value}`,"#c39bff",24));break}case"poison":{const j=O[C.on];j.targetHp=C.hp,j.flash=Math.max(j.flash,.5),xr("venom"),Ue(j,"#9be86c",5,2),Be(j,`☠ ${C.dmg}`,"#9be86c",20);break}case"heal":{const j=O[C.on];j.targetHp=C.hp,Co(),Ue(j,"#6ce5b1",8,2.4),Be(j,`+${C.amount}`,"#6ce5b1",24);break}case"death":{O[C.side].flash=1,Al();break}}}function Be(C,j,I,_){re.push({x:C.baseX+(Math.random()*40-20),y:Kn-110,vy:-2.2,life:55,text:j,color:I,size:_})}function Ue(C,j,I,_){if(r)return;const z=C.baseX,ie=Kn-60;for(let Ae=0;Ae<I;Ae++){const Le=Math.random()*Math.PI*2,ze=_*(.4+Math.random());me.push({x:z,y:ie,vx:Math.cos(Le)*ze,vy:Math.sin(Le)*ze-1.5,life:22+Math.random()*14,maxLife:36,color:j,size:2+Math.random()*3})}}function mt(){if(!a)return;a.clearRect(0,0,vn,Cn),gt();const C=s?0:Te,j=(Math.random()*2-1)*C,I=(Math.random()*2-1)*C;a.save(),a.translate(j,I),It(O.a),It(O.b);for(const _ of me)a.globalAlpha=Math.max(0,_.life/_.maxLife),a.fillStyle=_.color,a.beginPath(),a.arc(_.x,_.y,_.size,0,Math.PI*2),a.fill();a.globalAlpha=1;for(const _ of re)a.globalAlpha=Math.min(1,_.life/30),a.fillStyle=_.color,a.font=`700 ${_.size}px Inter, system-ui, sans-serif`,a.textAlign="center",a.fillText(_.text,_.x,_.y),a.globalAlpha=1;a.restore(),$t()}function gt(){if(!a)return;const C=a.createLinearGradient(0,0,0,Cn);C.addColorStop(0,"#0e1730"),C.addColorStop(1,"#0a1120"),a.fillStyle=C,a.fillRect(0,0,vn,Cn);const j=a.createLinearGradient(0,Kn,0,Cn);j.addColorStop(0,"#16223f"),j.addColorStop(1,"#0c1426"),a.fillStyle=j,a.fillRect(0,Kn,vn,Cn-Kn),a.strokeStyle="rgba(122,162,255,0.25)",a.lineWidth=2,a.beginPath(),a.moveTo(0,Kn),a.lineTo(vn,Kn),a.stroke()}function It(C){if(!a)return;const j=C.displayHp>.5,I=ge,_=j?Math.sin(I*.11+(C.side==="a"?0:Math.PI))*5:0,z=j?Math.sin(I*.07+(C.side==="a"?0:Math.PI*.5)):0,ie=j?Math.sin(I*.022+(C.side==="a"?0:Math.PI))*9:0,Ae=(Math.random()*2-1)*C.shake,Le=(Math.random()*2-1)*C.shake*.4,ze=C.x+Ae+ie,st=Kn-72+_+Le,S=C.attackAnim,U=C.hitAnim,G=C.partEmojis,H=1+C.lunge/85*.2;a.fillStyle="rgba(0,0,0,0.3)",a.beginPath(),a.ellipse(C.x+ie*.4,Kn+6,55*H,13,0,0,Math.PI*2),a.fill(),a.save(),a.translate(ze,st),C.side==="b"&&a.scale(-1,1),j?U>0&&(a.translate(-U*10,-U*3),a.rotate(-U*.14)):(a.globalAlpha=.35,a.rotate(.5),a.translate(0,18));const F=.52;a.save(),a.translate(-46-S*8,-6),a.rotate(-.18+Math.sin(I*.18)*.16),a.scale(F,F),kh(a,G.tail,I*.18),a.restore(),a.save(),a.translate(-18-S*6,14+S*7),a.rotate(-.04+S*.1),a.scale(F*.9,F*.9),Oh(a,G.hindlimbs,S),a.restore(),a.save(),a.scale(F*(1+z*.016),F*(1-z*.01)),Nh(a,G.body,z),a.restore(),a.save(),a.translate(20+S*32,14-S*14),a.rotate(S*.6),a.scale(F*.9,F*.9),Uh(a,G.forelimbs,S),a.restore(),a.save(),a.translate(32+S*18,-40-S*12),a.rotate(S*.2-U*.16),a.scale(F,F),Dh(a,G.head,I*.18,S),a.restore(),a.restore(),C.flash>.02&&(a.globalAlpha=C.flash*.38,a.fillStyle="#ff4d6d",a.beginPath(),a.arc(ze,st-12,80,0,Math.PI*2),a.fill(),a.globalAlpha=1)}function $t(){ft(O.a,40,"left"),ft(O.b,vn-360,"right")}function ft(C,j,I){if(!a)return;const _=320,z=32,ie=Math.max(0,C.displayHp)/C.maxHp;a.fillStyle="#0c1222",Vt(j,z,_,18,9),a.fill();const Ae=a.createLinearGradient(j,0,j+_,0);Ae.addColorStop(0,ie>.3?"#36c08a":"#ff6b81"),Ae.addColorStop(1,ie>.3?"#6ce5b1":"#ff97a6"),a.fillStyle=Ae;const Le=_*ie;Le>0&&(Vt(I==="left"?j:j+_-Le,z,Le,18,9),a.fill()),a.fillStyle="#e7ecf7",a.font="700 15px Inter, system-ui, sans-serif",a.textBaseline="alphabetic",a.textAlign=I,a.fillText(`${C.name}  ${Math.max(0,Math.round(C.displayHp))}/${C.maxHp}`,I==="left"?j:j+_,z-8)}function Vt(C,j,I,_,z){a&&(a.beginPath(),a.moveTo(C+z,j),a.arcTo(C+I,j,C+I,j+_,z),a.arcTo(C+I,j+_,C,j+_,z),a.arcTo(C,j+_,C,j,z),a.arcTo(C,j,C+I,j,z),a.closePath())}function tn(C){C.traverse(j=>{const I=j;I.geometry&&I.geometry.dispose();const _=I.material;Array.isArray(_)?_.forEach(z=>z.dispose()):_&&_.dispose()})}return Ge=requestAnimationFrame(q),()=>{if(L(),R(),cancelAnimationFrame(Ge),o){J&&J.remove(),ee&&ee.remove();for(let C=0;C<3;C++){const j=c?.getObjectByName(`light_ray_${C}`);j instanceof $e&&(c?.remove(j),j.geometry.dispose(),j.material.dispose())}d&&c&&(c.remove(d.a.model),tn(d.a.model),c.remove(d.a.shadow),tn(d.a.shadow),c.remove(d.b.model),tn(d.b.model),c.remove(d.b.shadow),tn(d.b.shadow)),u&&c&&(c.remove(u),f?.geometry.dispose(),g?.dispose(),v?.dispose(),m?.dispose()),V.forEach(C=>{c?.remove(C.mesh),C.mesh.geometry.dispose(),C.mesh.material.dispose()}),N.forEach(C=>{c?.remove(C.mesh),C.mesh.geometry.dispose(),C.mesh.material.dispose()}),W.forEach(C=>{c?.remove(C.line),C.line.geometry.dispose(),C.line.material.dispose()}),$.forEach(C=>{c?.remove(C.sprite),C.sprite.material.map?.dispose(),C.sprite.material.dispose()}),se&&c&&(c.remove(se.mesh),se.mesh.geometry.dispose(),se.mesh.material.dispose()),p.forEach(C=>{C.geometry.dispose(),C.material.dispose(),c?.remove(C)}),p=[],l?.dispose()}}}function xh(n,e,t){return{side:n,name:e.name,emoji:e.emoji,partEmojis:e.partEmojis,genome:e.genome,maxHp:e.maxHp,displayHp:e.maxHp,targetHp:e.maxHp,x:t,baseX:t,shake:0,lunge:0,flash:0,attackAnim:0,hitAnim:0}}function Pn(n){return n==="a"?"b":"a"}function Eh(n,e,t){return Math.max(e,Math.min(t,n))}function Ri(n){return{venom:"Venom",regenerate:"Regen",spit:"Spit",charge:"Charge",armor:"Armor",frenzy:"Frenzy",shock:"Shock",leech:"Leech"}[n]??n}let fe=eu(),Bi=null,vs=!1;const yM={first_blood:"🩸 First Victory — You won your first battle!",streak_5:"🔥 On Fire — 5-win streak!",tier1_complete:"🧬 Tier 1 Complete — All starter species unlocked!",ten_wins:"⚔ Veteran — 10 battles won!"};function MM(){const n=[],e=zt.filter(t=>t.tier===1).map(t=>t.id);return fe.wins===1&&!fe.achievements.includes("first_blood")&&n.push("first_blood"),fe.streak===5&&!fe.achievements.includes("streak_5")&&n.push("streak_5"),e.every(t=>fe.unlocked.includes(t))&&!fe.achievements.includes("tier1_complete")&&n.push("tier1_complete"),fe.wins===10&&!fe.achievements.includes("ten_wins")&&n.push("ten_wins"),n}function bM(n){const e=yM[n]??n,t=B("div",{class:"achievement-toast"},[B("div",{class:"achievement-icon"},["🏆"]),B("div",{class:"achievement-text"},[e])]);document.body.appendChild(t),setTimeout(()=>t.classList.add("achievement-show"),50),setTimeout(()=>{t.classList.remove("achievement-show"),setTimeout(()=>t.remove(),400)},3500)}let hr=null,di=null,Eo=!1;function SM(n){return Eo?null:(di||(di=document.createElement("div"),di.className="creature3d-host"),hr?hr.setGenome(n):Bd(async()=>{const{mountCreature3D:e,modelsReady:t}=await Promise.resolve().then(()=>_M);return{mountCreature3D:e,modelsReady:t}},void 0,import.meta.url).then(({mountCreature3D:e,modelsReady:t})=>{const i=document.getElementById("models-loading-overlay");return i&&(i.style.display="flex"),t.then(()=>{if(i&&(i.style.display="none"),!!di)try{hr=e(di,n,240)}catch{Eo=!0,di?.remove(),di=null}})}).catch(()=>{const e=document.getElementById("models-loading-overlay");e&&(e.style.display="none"),Eo=!0}),di)}const pl=[{id:"slow",label:"🐢 Slow",mult:.4},{id:"normal",label:"▶ Normal",mult:1},{id:"fast",label:"⚡ Fast",mult:3},{id:"instant",label:"⏩ Instant",mult:0}];nf(fe.muted);const Us=document.getElementById("app");let ji="lab";function ml(n){fe.player=n,In(fe),hn()}function Nd(){ml(oa(zi(Date.now()),fe.unlocked))}function Ud(){const n=oa(zi(Date.now()^85),fe.unlocked),e=Yd(fe.player,n,zi(Date.now()>>>1),{pool:fe.unlocked});ml(e)}function gl(){return B("div",{class:"topbar"},[B("div",{class:"brand"},[B("span",{class:"logo"},["🧬"]),B("div",{},[B("h1",{},["Imaginary Creatures"]),B("small",{},["Splice DNA. Build a beast. Win the arena."])])]),B("div",{class:"stats-pills"},[B("span",{class:"pill"},[Ah("Wins",fe.wins)]),...fe.streak>=3?[B("span",{class:"streak-badge"},[`🔥×${fe.streak}`])]:[],B("span",{class:"pill"},[Ah("Losses",fe.losses)]),TM(),B("button",{class:"pill",title:"Toggle sound",onclick:n=>{qo();const e=sf();fe.muted=e,In(fe),n.target.textContent=e?"🔇 Sound":"🔊 Sound"}},[fe.muted?"🔇 Sound":"🔊 Sound"])])])}function TM(){const n=zt.length,e=fe.unlocked.length,t=Math.round(e/n*100),i=zt.filter(h=>h.tier===1),s=zt.filter(h=>h.tier===2),r=zt.filter(h=>h.tier===3),a=i.filter(h=>fe.unlocked.includes(h.id)).length,o=s.filter(h=>fe.unlocked.includes(h.id)).length,l=r.filter(h=>fe.unlocked.includes(h.id)).length,c=`Tier 1: ${a}/${i.length} · Tier 2: ${o}/${s.length} · Tier 3: ${l}/${r.length}`;return B("span",{class:"unlock-progress",title:c},[B("span",{},[`🧬 ${e}/${n}`]),B("div",{class:"unlock-progress-bar"},[B("div",{class:"unlock-progress-fill",style:`width:${t}%`},[])])])}function Ah(n,e){return B("span",{html:`${n} <b>${e}</b>`})}function xM(){const n=pl.map(({id:a,label:o,mult:l})=>B("button",{class:fe.battleSpeed===a?"settings-btn active":"settings-btn",onclick:()=>{fe.battleSpeed=a,In(fe),hn()},title:`Battle speed: ${a} (${l===0?"instant":l+"×"})`},[o])),e=B("button",{class:fe.showOpponent?"settings-btn active":"settings-btn",onclick:()=>{fe.showOpponent=!fe.showOpponent,In(fe),hn()}},[fe.showOpponent?"🔭 Opponent":"🔭 Opponent (hidden)"]),t=B("button",{class:vs?"settings-btn active":"settings-btn",onclick:()=>{vs=!vs,hn()}},["🗑 New Game"]),i=B("button",{class:"settings-btn",onclick:()=>RM()},["📖 Bestiary"]),s=B("button",{class:"settings-btn",title:"Daily Challenge — same opponent for everyone today",onclick:()=>IM()},["📅 Daily"]),r=B("div",{class:"settings-bar"},[B("div",{class:"settings-group"},[B("span",{class:"settings-label"},["Speed"]),...n]),B("div",{class:"settings-group"},[e]),B("div",{class:"settings-group"},[t]),B("div",{class:"settings-group"},[i]),B("div",{class:"settings-group"},[s])]);if(vs){const a=[{tier:1,label:"🌱 Tier 1 (5 species)"},{tier:2,label:"🔥 Tier 1+2 (10 species)"},{tier:3,label:"💀 All species unlocked"}].map(({tier:o,label:l})=>B("button",{class:"settings-btn",onclick:()=>{confirm(`Start a new game at ${l}? Current progress will be lost.`)&&(vs=!1,fe=Ro(o,fe),In(fe),hn())}},[l]));r.append(B("div",{class:"settings-newgame"},[B("span",{class:"settings-label"},["Pick start tier:"]),...a,B("button",{class:"settings-btn",onclick:()=>{vs=!1,hn()}},["✕ Cancel"])]))}return r}function EM(n){const e=B("div",{class:"slot-cards"});let t=null;const i=()=>{t?.remove(),t=null};for(const s of zt){const r=fe.unlocked.includes(s.id),o=["animal-card",fe.player[n]===s.id?"selected":"",r?"":"locked"].filter(Boolean).join(" "),l=B("div",{class:o,"data-slot":n,"data-animal-id":s.id},[B("span",{class:"card-emoji"},[s.emoji]),B("span",{class:"card-name"},[s.name])]);r&&(l.addEventListener("click",()=>{ml({...fe.player,[n]:s.id})}),l.addEventListener("mouseenter",()=>{i(),t=AM(s,n),document.body.appendChild(t),wM(t,l),hr?.setGenome(ya(s.id))}),l.addEventListener("mouseleave",()=>{i(),hr?.setGenome(fe.player)})),e.append(l)}return e}function AM(n,e){const t=n.parts[e],i=t.stats,s=[],r=e==="body"?aa[n.id]??null:null,a={fire:"🔥",water:"💧",nature:"🌿",earth:"🪨",air:"💨",electric:"⚡"};r&&s.push(B("div",{class:"tip-type-badge"},[`${a[r]??""} ${r}`]));const o=[["attack","⚔ Attack"],["defense","🛡 Defense"],["health","❤ Health"],["speed","⚡ Speed"],["energy","✨ Energy"]];for(const[l,c]of o){const h=i[l];h!==void 0&&h>0&&s.push(B("div",{class:"tip-stat"},[B("span",{},[c]),B("span",{},[String(h)])]))}if((t.ability||t.trait)&&s.push(B("hr",{class:"tip-divider"})),t.ability){const l=dr[t.ability];s.push(B("div",{class:"tip-ability"},[`🌀 ${l?.name??t.ability}`])),l?.description&&s.push(B("div",{class:"tip-ability-desc"},[l.description]))}return t.trait&&s.push(B("div",{class:"tip-trait"},[`✦ ${t.trait}`])),B("div",{class:"card-tooltip"},s)}function wM(n,e){const t=e.getBoundingClientRect(),i=140,s=140;let r=t.top-i-8,a=t.left+t.width/2-s/2;r<8&&(r=t.bottom+8),a+s>window.innerWidth-8&&(a=t.right-s),a<8&&(a=8),n.style.top=`${r}px`,n.style.left=`${a}px`,n.style.width=`${s}px`}function RM(){ji="bestiary";const n=document.getElementById("app");yr(n);const e=zt.map(s=>{if(!fe.unlocked.includes(s.id))return B("div",{class:"bestiary-card locked"},[B("div",{class:"bestiary-card-emoji"},["🔒"]),B("div",{class:"bestiary-card-name"},["???"]),B("div",{class:"bestiary-card-tier"},["★".repeat(s.tier)])]);const a=s.parts,o=(a.head.stats.attack??0)+(a.forelimbs.stats.attack??0)+(a.tail.stats.attack??0)+(a.body.stats.attack??0)+(a.hindlimbs.stats.attack??0),l=(a.body.stats.defense??0)+(a.head.stats.defense??0),c=a.body.stats.health??0,h=50,d=20,u=80,f=new Set;for(const p of Object.values(a))p.ability&&f.add(p.ability);const g=[...f],v=aa[s.id],m={fire:"🔥",water:"💧",nature:"🌿",earth:"🪨",air:"💨",electric:"⚡"};return B("div",{class:"bestiary-card"},[B("div",{class:"bestiary-card-emoji"},[s.emoji]),B("div",{class:"bestiary-card-name"},[s.name]),B("div",{class:"bestiary-card-tier"},["★".repeat(s.tier)]),...v?[B("div",{class:"bestiary-card-type"},[`${m[v]??""} ${v}`])]:[],B("div",{class:"bestiary-stat-bar-row"},[B("div",{class:"bestiary-stat-bar",style:`width:${Math.round(o/h*48)}px;background:#c85030;`,title:`Attack: ${o}`},[]),B("div",{class:"bestiary-stat-bar",style:`width:${Math.round(l/d*24)}px;background:#3070c8;`,title:`Defense: ${l}`},[]),B("div",{class:"bestiary-stat-bar",style:`width:${Math.round(c/u*32)}px;background:#30a850;`,title:`Health: ${c}`},[])]),...g.length>0?[B("div",{class:"bestiary-abilities"},[...g.map(p=>{const M=dr[p];return B("span",{class:"ability-tag",title:M?`${M.name}: ${M.description}`:p},[M?.name??p])})])]:[]])}),t=[{id:"first_blood",label:"🩸 First Victory"},{id:"streak_5",label:"🔥 On Fire (5-streak)"},{id:"tier1_complete",label:"🧬 Tier 1 Complete"},{id:"ten_wins",label:"⚔ Veteran (10 wins)"}],i=B("div",{style:"margin-top:20px;"},[B("h3",{style:"color:#c8a84b;font-size:14px;margin:0 0 8px;"},["🏆 Achievements"]),B("div",{style:"display:flex;gap:8px;flex-wrap:wrap;"},t.map(({id:s,label:r})=>B("span",{class:fe.achievements.includes(s)?"achievement-badge earned":"achievement-badge"},[r])))]);n.append(B("div",{class:"bestiary-screen"},[B("div",{style:"display:flex;align-items:center;gap:12px;margin-bottom:8px;"},[B("button",{class:"settings-btn",onclick:()=>hn()},["← Back"]),B("h2",{style:"color:#c8a84b;font-size:18px;margin:0;"},["📖 Bestiary"]),B("span",{style:"color:#556677;font-size:13px;"},[`${fe.unlocked.length}/${zt.length} species unlocked`])]),B("div",{class:"bestiary-grid"},e),i]))}function hn(){document.querySelectorAll(".card-tooltip").forEach(o=>o.remove()),Bi&&(Bi(),Bi=null),ji="lab",yr(Us);const n=B("div",{class:"panel"},[B("h2",{},["Genetics Lab"]),B("div",{class:"slots"},yi.map(o=>B("div",{class:"slot"},[B("label",{},[Kd(o)]),EM(o)]))),B("div",{class:"btnrow"},[B("button",{onclick:Nd},["🎲 Randomize"]),B("button",{onclick:Ud},["🧬 Splice DNA"])]),B("p",{class:"hint"},["Each animal gives different stats and powers depending on the slot it fills. Splice mixes your current creature with a random one — mutations can graft in traits from neither parent. Win fights to unlock stronger species."]),B("p",{class:"hint"},["⌨ Shortcuts: R randomize · S splice · Enter fight"])]),e=Hi(fe.player),t=ou(fe.roster,fe.player),i=SM(fe.player),s=[B("h2",{},["Your Creature"])];i&&s.push(B("div",{class:"creature3d-stage"},[i])),s.push(Fh(e));const r=B("div",{class:"panel"},[...s,B("div",{class:"btnrow"},[B("button",{class:"primary",onclick:va},["⚔ Enter Arena"]),B("button",{disabled:t,onclick:()=>{fe.roster=ru(fe.roster,{name:e.name,genome:{...fe.player}}),In(fe),hn()}},[t?"✓ Saved":"💾 Save"])])]),a=[gl(),xM(),B("div",{class:"layout"},[n,r])];fe.showOpponent&&a.push(CM(e)),a.push(PM()),Us.append(...a),requestAnimationFrame(()=>{document.querySelectorAll(".animal-card.selected").forEach(o=>{o.scrollIntoView({block:"nearest",inline:"center"})})})}function CM(n){const e=Lh(n,fe.wins,fe.seed),t=Fn(n),i=Fn(e),s=i>t*1.12?B("span",{class:"verdict tough"},["Tougher than you — build to counter"]):i<t*.88?B("span",{class:"verdict easy"},["You out-power them"]):B("span",{class:"verdict even"},["Evenly matched"]);return B("div",{class:"panel opponent-panel"},[B("div",{class:"opponent-head"},[B("h2",{},["⚔ Next Opponent"]),B("div",{class:"btnrow",style:"margin:0"},[B("button",{title:"Scout a different opponent",onclick:()=>{fe.seed=fe.seed*1664525+1013904223>>>0,In(fe),hn()}},["🔄 Scout another"])])]),Fh(e),B("p",{class:"hint"},[s])])}function PM(){const n=fe.roster.length===0?[B("p",{class:"hint"},["No saved creatures yet. Build one and hit 💾 Save."])]:fe.roster.map((e,t)=>{const i=Hi(e.genome,e.name);return B("div",{class:"roster-item"},[B("span",{class:"roster-emoji"},[i.emoji]),B("div",{class:"roster-meta"},[B("div",{class:"roster-name"},[i.name]),B("div",{class:"roster-power"},[`Power ${Fn(i)}`])]),B("div",{class:"roster-actions"},[B("button",{onclick:()=>{fe.player={...e.genome},In(fe),hn()}},["Load"]),B("button",{title:"Delete","aria-label":`Delete ${i.name}`,onclick:()=>{fe.roster=au(fe.roster,t),In(fe),hn()}},["🗑"])])])});return B("div",{class:"panel roster-panel"},[B("h2",{},[`Saved Roster (${fe.roster.length}/6)`]),B("div",{class:"roster-grid"},n)])}function va(){qo(),ji="arena";const n=Hi(fe.player),e=Lh(n,fe.wins,fe.seed),t=(fe.seed^fe.wins*2654435761)>>>0,i=Ph(n,e,zi(t));yr(Us);const s=B("canvas",{id:"arena",role:"img","aria-label":"Battle arena replay"}),r=B("div",{class:"center"},[]);Us.append(gl(),B("div",{class:"panel arena-wrap"},[B("div",{class:"arena-fighters"},[B("div",{class:"fighter-tag"},[B("div",{class:"nm"},[`${n.emoji} ${n.name}`]),B("div",{class:"pw"},[`Power ${Fn(n)}`])]),B("div",{class:"fighter-tag right"},[B("div",{class:"nm"},[`${e.name} ${e.emoji}`]),B("div",{class:"pw"},[`Power ${Fn(e)}`])])]),s,r]));const a=pl.find(o=>o.id===fe.battleSpeed)?.mult??1;Bi=Dd(s,i,o=>{Bi=null,Od(r,o,e.name)},a)}function Od(n,e,t){ji="result";const i=e==="a";let s=null;i?(fe.wins++,fe.streak++,s=iu(fe),cf()):e==="b"?(fe.losses++,fe.streak=0,hf()):fe.streak=0,fe.seed=fe.seed*1664525+1013904223>>>0,In(fe);const r=MM();r.length>0&&(fe.achievements.push(...r),In(fe),r.forEach((l,c)=>{setTimeout(()=>bM(l),c*1200)}));const o=[i?B("div",{class:"result-banner win"},["VICTORY"]):e==="draw"?B("div",{class:"result-banner draw"},["DRAW"]):B("div",{class:"result-banner lose"},["DEFEAT"])];if(o.push(B("p",{class:"hint"},[i?`You beat ${t}.`:e==="draw"?`Stalemate with ${t}.`:`${t} beat you. Tweak your genome and try again.`])),s){const l=Ss(s);o.push(B("p",{class:"unlock-note"},[`🔓 New species unlocked: ${l.emoji} ${l.name}!`]))}o.push(B("div",{class:"btnrow",style:"justify-content:center"},[B("button",{class:"accent",onclick:va},["⚔ Fight Again"]),B("button",{onclick:hn},["🧪 Back to Lab"])])),yr(n),n.append(B("div",{class:"fadein"},o))}window.addEventListener("keydown",n=>{const e=n.target?.tagName;e==="SELECT"||e==="INPUT"||e==="TEXTAREA"||(ji==="lab"?n.key==="r"||n.key==="R"?(n.preventDefault(),Nd()):n.key==="s"||n.key==="S"?(n.preventDefault(),Ud()):n.key==="Enter"&&(n.preventDefault(),va()):ji==="result"&&(n.key==="Enter"?(n.preventDefault(),va()):n.key==="Escape"&&(n.preventDefault(),hn())))});function LM(){const n=new Date;return(n.getFullYear()*1e4+(n.getMonth()+1)*100+n.getDate())*2654435761>>>0}function IM(){qo();const n=LM(),e=zi(n),t=zt[Math.floor(e()*zt.length)],i=ya(t.id),s=Hi(i),r=Hi(fe.player),a=Ph(r,s,zi(n^3735928559));ji="arena",yr(Us);const o=B("canvas",{id:"arena",role:"img","aria-label":"Daily challenge arena"}),l=B("div",{class:"center"},[]);Us.append(gl(),B("div",{class:"panel arena-wrap"},[B("div",{class:"arena-fighters"},[B("div",{class:"fighter-tag"},[B("div",{class:"nm"},[`${r.emoji} ${r.name}`]),B("div",{class:"pw"},[`Power ${Fn(r)}`])]),B("div",{class:"fighter-tag right"},[B("div",{class:"nm"},[`${s.name} ${s.emoji}`]),B("div",{class:"pw"},[`📅 Daily · Power ${Fn(s)}`])])]),o,l]));const c=pl.find(h=>h.id===fe.battleSpeed)?.mult??1;Bi=Dd(o,a,h=>{Bi=null,Od(l,h,`Daily ${t.name}`)},c)}function DM(){if(localStorage.getItem("ic-tutorial-done"))return;const n=document.getElementById("app");let e=0;const t=[{icon:"🧬",title:"Splice Your Creature",body:"Pick one part from each animal — head, body, arms, legs, tail. Each part brings stats and abilities."},{icon:"⚔",title:"Battle to Unlock",body:"Win fights to unlock more species. Build the ultimate chimera."},{icon:"🔥",title:"Chain Your Wins",body:"Keep a win streak to prove your creature is unbeatable. Check the Bestiary to see all species."}],i=B("div",{class:"tutorial-overlay"},[]),s=()=>{const r=t[e],a=e===t.length-1;i.innerHTML="",i.append(B("div",{class:"tutorial-card"},[B("div",{class:"tutorial-icon"},[r.icon]),B("div",{class:"tutorial-title"},[r.title]),B("div",{class:"tutorial-body"},[r.body]),B("div",{class:"tutorial-dots"},t.map((o,l)=>B("span",{class:l===e?"tutorial-dot active":"tutorial-dot"},[]))),B("button",{class:"accent",onclick:()=>{a?(localStorage.setItem("ic-tutorial-done","1"),i.remove()):(e++,s())}},[a?"Start Playing":"Next →"])]))};s(),n.append(i)}if(zt.length===0)throw new Error("No animals defined");hn();DM();
//# sourceMappingURL=index-B6U3bOg1.js.map
