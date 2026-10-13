import { seed, execute, occupied, STATUS, DEMO_NOW } from './domain.mjs';
import { createTour } from './tour.js';
const STORAGE = 'aster-preventie-v1';
const $ = selector => document.querySelector(selector);
const safe = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date = iso => new Intl.DateTimeFormat('nl-BE',{ timeZone:'Europe/Brussels',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(iso));
let state = seed(), selected = 'OH-001', role = 'planner', view = 'workplace', storageAvailable = true;
try {const raw=JSON.parse(localStorage.getItem(STORAGE));if(raw?.schemaVersion === 1 && Array.isArray(raw.cases) && raw.cases.length === 4 && Array.isArray(raw.slots) && Array.isArray(raw.events) && Array.isArray(raw.outbox) && raw.processed) state=raw;} catch {state=seed();}
let model;
try { const response=await fetch('../assets/case.json'); if(!response.ok) throw new Error('model unavailable'); model=await response.json(); } catch { model={requirements:[],decisions:[],kpis:[]}; $('#notice').textContent='De analysegegevens konden niet laden. De werkplek blijft beschikbaar.';$('#notice').classList.remove('hidden'); }
function persist() { try {localStorage.setItem(STORAGE,JSON.stringify(state));} catch {storageAvailable=false;} }
function notice(text,error=false) {$('#notice').textContent=text;$('#notice').className=`notice${error?' error':''}`;}
function act(action,extra={}) {
  const c=state.cases.find(c=>c.id===selected);
  try {state=execute(state,{action,caseId:selected,version:c.version,key:crypto.randomUUID(),...extra},{role}).state;persist();notice(storageAvailable?'Wijziging opgeslagen in de demo.':'Wijziging uitgevoerd; browseropslag is niet beschikbaar.');render();} catch(e) {notice(`${e.code}: ${e.message}`,true);}
}
function renderList() {
  const q=$('#search').value.toLowerCase(), status=$('#status-filter').value;
  const cases=state.cases.filter(c=>(status==='all'||c.status===status)&&`${c.id} ${c.employee} ${c.employer}`.toLowerCase().includes(q));
  $('#list').innerHTML=cases.length?`<table class="case-table"><caption class="sr-only">Aanvragen; selecteer een dossier voor details</caption><thead><tr><th scope="col">Dossier</th><th scope="col">Medewerker</th><th scope="col">Status</th><th scope="col">Afspraak</th></tr></thead><tbody>${cases.map(c=>`<tr class="${c.id===selected?'selected':''}"><td><button class="dossier-button" data-select="${c.id}" aria-pressed="${c.id===selected}">${c.id}</button></td><td>${c.employee}</td><td><span class="status status-${c.status}">${STATUS[c.status]}</span></td><td>${c.slotId?date(state.slots.find(s=>s.id===c.slotId).start):'—'}</td></tr>`).join('')}</tbody></table>`:'<p class="empty">Geen dossiers gevonden. Pas de filters aan.</p>';
  document.querySelectorAll('[data-select]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.select;render();}));
}
function renderSlots() {
  const c=state.cases.find(c=>c.id===selected);
  $('#slot-list').innerHTML=state.slots.map(s=>{const taken=occupied(state,s,c.employee);const incompatible=!s.types.includes(c.type); const available=!taken&&!incompatible;
    return `<div class="slot ${available?'free':''}"><strong>${date(s.start)}</strong><p>${s.room} · ${s.clinician}</p><p>${taken?'Bezet':incompatible?'Ander onderzoekstype':'Beschikbaar'}</p><button data-book="${s.id}" ${!available||c.status!=='ready'||role==='observer'?'disabled':''}>${taken?'Bezet':'Afspraak boeken'}</button></div>`;}).join('');
  document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>act('schedule',{slotId:b.dataset.book})));
}
function renderDetail() {
  const c=state.cases.find(c=>c.id===selected), disabled=role==='observer';
  const events=state.events.filter(e=>e.caseId===selected);
  let controls='';
  if(['incomplete','ready'].includes(c.status)) controls=`<form id="complete-form"><label>Onderzoekstype<select name="type" ${disabled?'disabled':''}><option value="periodic" ${c.type==='periodic'?'selected':''}>Periodiek onderzoek</option><option value="intake" ${c.type==='intake'?'selected':''}>Intakeonderzoek</option></select></label><label>Werkpost<input name="workpost" maxlength="80" required value="${safe(c.workpost)}" ${disabled?'disabled':''}></label><button class="primary" ${disabled?'disabled':''}>Gegevens aanvullen</button></form>${c.status==='ready'?'<p class="muted">Gegevens volledig. Kies links een beschikbare afspraak.</p>':''}`;
  if(c.status==='scheduled') controls=`<p><strong>Afspraak:</strong> ${date(state.slots.find(s=>s.id===c.slotId).start)}</p><form id="cancel-form"><label>Annuleringsreden<textarea name="reason" maxlength="160" required rows="2" ${disabled?'disabled':''}></textarea></label><button class="primary" ${disabled?'disabled':''}>Afspraak annuleren</button></form><p class="muted">De oude plek komt direct vrij. Herplanning is een aparte actie.</p>${role==='coordinator'?'<button id="outcome" class="secondary-action" disabled>Uitkomst na afloop registreren</button><p class="muted">Afspraak ligt na de demoklok. Uitkomstregels zijn uitvoerbaar getest.</p>':''}`;
  if(c.status==='cancelled') controls=`<p>De vorige reservering is vrijgegeven. Heropen dit dossier om bewust een nieuw tijdslot te kiezen.</p><button class="primary secondary-action" id="reopen" ${disabled?'disabled':''}>Heropenen voor herplanning</button>`;
  if(['completed','no_show'].includes(c.status)) controls='<p>Administratief afgesloten. Nieuwe onderzoeken starten met een nieuwe aanvraag.</p>';
  $('#detail').innerHTML=`<h2>${c.id}</h2><p class="person">${c.employee} · ${safe(c.employer)}</p><div class="state-banner ${c.status}">${c.status==='incomplete'?'Informatie ontbreekt':STATUS[c.status]}</div>${controls}<section class="activities" id="activities"><h3>Activiteiten</h3>${events.length?`<ol class="events">${events.toReversed().map(e=>`<li>${safe(e.detail)}<small>${date(e.at)} · ${safe(e.actor)} · ${e.id}</small></li>`).join('')}</ol>`:'<p class="muted">Geen wijziging in deze demosessie.</p>'}<p class="muted">Versie ${c.version} · ${state.outbox.filter(m=>m.caseId===c.id).length} gesimuleerde berichten</p></section>`;
  $('#complete-form')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);act('complete',{type:f.get('type'),workpost:f.get('workpost')});});
  $('#cancel-form')?.addEventListener('submit',e=>{e.preventDefault();act('cancel',{reason:new FormData(e.target).get('reason')});});
  $('#reopen')?.addEventListener('click',()=>act('reopen'));
}
const repo='https://github.com/phlppgdfry/occupational-health-analysis-case/blob/main/';
function renderReading() {
  if(view==='analysis') $('#reading').innerHTML=`<h2>Van klantvraag naar acceptatietest</h2><p class="intro">P-03: “Een annulering moet de vrijgekomen plek opnieuw beschikbaar maken.” FR-04 → R-04 → AC-15 → K-04. Dit is dezelfde keten in de specificatie, domeinregels en tests.</p>${model.requirements.map(r=>`<article class="rule-row"><h3>${r.id} · ${safe(r.title)}</h3><p>${safe(r.story)}</p><p><strong>Acceptatie:</strong> ${safe(r.acceptance)}</p><p class="meta">${r.priority} · ${r.owner} · ${r.rule} · ${r.tests.join(', ')} · ${r.kpi}</p></article>`).join('')}<p><a href="${repo}docs/02-requirements/catalogue.md">Volledige requirements en traceerbaarheid</a></p>`;
  if(view==='decisions') $('#reading').innerHTML=`<h2>Beslissingen en alternatieven</h2><p class="intro">Elke keuze heeft een reden, een verworpen alternatief en een grens waar herziening nodig is.</p>${model.decisions.map(d=>`<article class="rule-row"><h3>${d.id} · ${safe(d.title)}</h3><p>${safe(d.reason)}</p><p><strong>Alternatief:</strong> ${safe(d.alternative)}</p><p><a href="${repo}${d.path}">Lees de volledige afweging</a></p></article>`).join('')}`;
  if(view==='guide') $('#reading').innerHTML=`<h2>Een aanvraag verwerken</h2><p class="intro">De werkplek ondersteunt administratieve planning. Voer uitsluitend fictieve gegevens in.</p><h3>1. Controleer de aanvraag</h3><p>Selecteer OH-001. Vul Werkpost in en bevestig Gegevens aanvullen. Het dossier wordt Klaar; het activiteitenlog krijgt een nieuw record.</p><h3>2. Plan een passende afspraak</h3><p>Kies een beschikbare afspraak. Bezet is niet boekbaar. Alleen volledige dossiers kunnen worden gepland; ieder onderzoekstype heeft passende tijdslots.</p><h3>3. Annuleer en herplan</h3><p>Geef bij een geplande afspraak een reden en annuleer. De capaciteit komt vrij. Kies daarna Heropenen voor herplanning en selecteer bewust een nieuwe afspraak.</p><h3>4. Controleer wat veranderde</h3><p>Het activiteitenlog en het versienummer veranderen bij iedere geslaagde actie. Berichten zijn gesimuleerd: er wordt geen e-mail verstuurd.</p><h3>Fout of onverwacht gedrag?</h3><p>Bij een verouderde versie: ververs en bekijk de laatste status. Bij een conflict: kies een ander tijdslot. De knop Reset demo verwijdert alleen deze demo-opslag. Rolkeuze simuleert rechten; ze is geen echte login.</p><p><a href="${repo}docs/08-handover/user-guide.md">Handleiding en supportinformatie</a></p>`;
}
function setView(next) {view=next;$('#workplace').classList.toggle('hidden',next!=='workplace');$('#reading').classList.toggle('hidden',next==='workplace');document.querySelectorAll('[data-view]').forEach(b=>{if(b.dataset.view===next)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});if(next!=='workplace') renderReading();}
function render() {$('#metrics').innerHTML=`<div class="metric"><strong>${state.cases.length}</strong>dossiers</div><div class="metric"><strong>${state.cases.filter(c=>['incomplete','ready'].includes(c.status)).length}</strong>te plannen</div><div class="metric"><strong>${state.cases.filter(c=>c.status==='scheduled').length}</strong>afspraak${state.cases.filter(c=>c.status==='scheduled').length===1?'':'en'}</div>`;renderList();renderSlots();renderDetail();}
function reset() {state=seed();selected='OH-001';role='planner';$('#role').value=role;$('#search').value='';$('#status-filter').value='all';persist();setView('workplace');render();$('#notice').classList.add('hidden');}
$('#reset').addEventListener('click',reset);$('#search').addEventListener('input',renderList);$('#status-filter').addEventListener('change',renderList);$('#role').addEventListener('change',e=>{role=e.target.value;render();});document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
render();
function tourState(stage) {
  reset();
  if(stage>=2)state=execute(state,{action:'complete',caseId:'OH-001',version:1,key:'tour-complete',type:'periodic',workpost:'Montage'}).state;
  if(stage>=3)state=execute(state,{action:'schedule',caseId:'OH-001',version:2,key:'tour-schedule',slotId:'S-02'}).state;
  if(stage>=4)state=execute(state,{action:'cancel',caseId:'OH-001',version:3,key:'tour-cancel',reason:'Medewerker verhinderd'}).state;
  if(stage>=5)state=execute(state,{action:'reopen',caseId:'OH-001',version:4,key:'tour-reopen'}).state;
  if(stage>=6)state=execute(state,{action:'schedule',caseId:'OH-001',version:5,key:'tour-reschedule',slotId:'S-04'}).state;
  persist();render();
}
const tour=createTour([
  {focus:'#list',text:'Vier fictieve aanvragen, één onvolledig dossier. De analist begint bij het procesprobleem: ontbrekende gegevens en onduidelijke opvolging.',before:()=>tourState(0)},
  {focus:'#detail',text:'ADR-01: eerst volledigheid, dan reserveren. Werkpost ontbreekt; planning blijft geblokkeerd. Dit is FR-01 en AC-01.',before:()=>tourState(1)},
  {focus:'#detail',text:'Gegevens aangevuld: status Klaar, versie 2 en een gebeurtenis in het log. Dezelfde R-01 draait in de browser en in AC-03.',before:()=>tourState(2)},
  {focus:'#slots',text:'Een passend vrij tijdslot is geboekt. R-03 toetst overlap voor arts, kamer én medewerker; een andere slot-ID omzeilt die regel niet.',before:()=>tourState(3)},
  {focus:'#detail',text:'Annulering met reden geeft de oude capaciteit meteen vrij. Het log bewaart de oorspronkelijke afspraak: klantvraag P-03 → FR-04 → AC-15.',before:()=>tourState(4)},
  {focus:'#detail',text:'Heropenen reserveert niets. De planner kiest daarna bewust een nieuwe datum; geen automatische afspraak die de medewerker niet kan bijwonen.',before:()=>tourState(5)},
  {focus:'#activities',text:'Nieuwe afspraak bevestigd; het activiteitenlog toont aanvullen, plannen, annuleren, heropenen en herplannen. Berichten zijn uitsluitend gesimuleerd.',before:()=>tourState(6)},
  {focus:'#reading',text:'De analyse koppelt iedere requirement aan regel, test en meetplan. Dit prototype bevat geen echte login, servertransacties, medische gegevens of verstuurde berichten. Documentatie en tests staan in de repo.',before:()=>{tourState(6);setView('analysis');}}
],{label:'Rondleiding door de case',labels:{step:'Stap',of:'van',back:'Terug',next:'Volgende',finish:'Klaar',close:'Sluiten'}});
$('#btn-tour').addEventListener('click',()=>tour.start());
