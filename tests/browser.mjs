// Browser plugin skill is absent in this session; automated QA uses Playwright.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../site/',import.meta.url));
const shots=fileURLToPath(new URL('../docs/screenshots/',import.meta.url));
const types={'.html':'text/html','.css':'text/css','.mjs':'text/javascript','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.pdf':'application/pdf','.bpmn':'application/xml'};
const server=createServer(async(req,res)=>{
  try {let pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);if(pathname.endsWith('/'))pathname+='index.html';const target=path.resolve(root,'.'+pathname);if(!target.startsWith(root)){res.writeHead(403);res.end();return;}const body=await readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
let browser;
try {
  await mkdir(shots,{recursive:true});
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1536,height:1024},locale:'nl-BE'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(`${base}/demo/`);await page.getByRole('heading',{name:'Planning & opvolging'}).waitFor();
  assert.match(await page.title(),/Aster/);
  await page.screenshot({path:path.join(shots,'desktop.png')});
  await copyFile(path.join(shots,'desktop.png'),path.join(root,'assets/preview.png'));
  await page.getByLabel('Werkpost',{exact:true}).fill('Montage');await page.getByRole('button',{name:'Gegevens aanvullen'}).click();
  assert.match(await page.locator('#detail').innerText(),/Klaar/);
  await page.locator('[data-book="S-02"]').click();assert.match(await page.locator('#detail').innerText(),/Gepland/);
  await page.getByLabel('Annuleringsreden').fill('Medewerker verhinderd');await page.getByRole('button',{name:'Afspraak annuleren'}).click();
  assert.match(await page.locator('#detail').innerText(),/Geannuleerd/);
  assert.equal(await page.locator('[data-book="S-02"]').isDisabled(),true); // current dossier cancelled, but capacity is free
  await page.getByRole('button',{name:'OH-002',exact:true}).click();assert.equal(await page.locator('[data-book="S-02"]').isEnabled(),true);
  await page.getByRole('button',{name:'OH-001',exact:true}).click();await page.getByRole('button',{name:'Heropenen voor herplanning'}).click();
  await page.locator('[data-book="S-04"]').click();assert.match(await page.locator('#detail').innerText(),/16 okt/);
  await page.reload();assert.match(await page.locator('#detail').innerText(),/Gepland/);assert.match(await page.locator('#detail').innerText(),/16 okt/);
  await page.getByRole('button',{name:'Reset demo',exact:true}).click();
  await page.getByRole('searchbox',{name:'Zoek op dossier of medewerker'}).fill('UNKNOWN');assert.match(await page.locator('#list').innerText(),/Geen dossiers gevonden/);
  await page.getByRole('searchbox',{name:'Zoek op dossier of medewerker'}).fill('');
  await page.locator('#status-filter').selectOption('scheduled');assert.equal(await page.locator('[data-select]').count(),1);
  await page.locator('#status-filter').selectOption('all');
  await page.locator('#role').selectOption('observer');assert.equal(await page.getByRole('button',{name:'Gegevens aanvullen'}).isDisabled(),true);
  await page.locator('#role').selectOption('planner');
  await page.getByLabel('Werkpost',{exact:true}).fill('<img src=x onerror=alert(1)>');await page.getByRole('button',{name:'Gegevens aanvullen'}).click();assert.equal(await page.locator('#detail img').count(),0);
  await page.getByRole('button',{name:'Reset demo',exact:true}).click();
  await page.getByRole('button',{name:'Analyse',exact:true}).click();assert.match(await page.locator('#reading').innerText(),/FR-04/);
  await page.getByRole('button',{name:'Beslissingen',exact:true}).click();assert.match(await page.locator('#reading').innerText(),/ADR-02/);
  await page.getByRole('button',{name:'Handleiding',exact:true}).click();assert.match(await page.locator('#reading').innerText(),/Heropenen voor herplanning/);
  await page.goto(`${base}/demo/?tour`);await page.locator('#tour:not(.hidden)').waitFor();
  for(let i=1;i<=8;i++){assert.match(await page.locator('#tour').innerText(),new RegExp(`Stap ${i} van 8`,'i'));await page.screenshot({path:path.join(shots,`tour-${String(i).padStart(2,'0')}.png`)});if(i<8)await page.getByRole('button',{name:'Volgende',exact:true}).click();}
  await page.getByRole('button',{name:'Terug',exact:true}).click();assert.match(await page.locator('#tour').innerText(),/Stap 7 van 8/i);await page.keyboard.press('Escape');assert.equal(await page.locator('#tour').isVisible(),false);
  await page.getByRole('button',{name:'Reset demo',exact:true}).click();await page.setViewportSize({width:375,height:812});await page.screenshot({path:path.join(shots,'mobile.png'),fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,'Mobile horizontal overflow');
  await page.getByLabel('Werkpost',{exact:true}).fill('Montage');await page.getByRole('button',{name:'Gegevens aanvullen'}).click();await page.locator('[data-book="S-02"]').click();assert.match(await page.locator('#detail').innerText(),/Gepland/);
  await page.getByRole('button',{name:'Rondleiding',exact:true}).click();assert.match(await page.locator('#tour').innerText(),/Stap 1 van 8/i);await page.getByRole('button',{name:'Sluiten',exact:true}).click();
  await page.goto(`${base}/case/`);await page.getByRole('heading',{name:'FR-04 · Annuleren met reden en capaciteit vrijgeven'}).waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,'Case reader mobile overflow');
  await page.goto(`${base}/`);await page.getByRole('heading',{name:'Van aanvraag tot herplanning.'}).waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,'Landing mobile overflow');
  await page.setViewportSize({width:1536,height:1024});await page.screenshot({path:path.join(shots,'landing.png'),fullPage:true});
  await page.goto(`${base}/case/`);await page.getByRole('heading',{name:'FR-04 · Annuleren met reden en capaciteit vrijgeven'}).waitFor();await page.screenshot({path:path.join(shots,'analysis.png')});
  await page.goto(`${base}/assets/to-be.svg`);await page.locator('svg').screenshot({path:fileURLToPath(new URL('../docs/diagrams/to-be.png',import.meta.url))});
  assert.deepEqual(errors,[],'Browser errors');
  console.log('Browser QA passed: page identity, core journey, freed capacity, persistence, filters, roles, escaping, reading views, 8 tour steps, keyboard, desktop and 375px. No console/page errors.');
} finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
