const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
try {
  const res=await fetch('../assets/case.json');if(!res.ok)throw new Error('catalogue unavailable');const model=await res.json();
  document.getElementById('requirements-list').className='';
  document.getElementById('requirements-list').innerHTML=model.requirements.map(r=>`<article><h3>${r.id} · ${esc(r.title)}</h3><p>${esc(r.story)}</p><p><strong>Acceptatie:</strong> ${esc(r.acceptance)}</p><p class="trace-line">${r.need} → ${r.id} → ${r.rule} → ${r.tests.join(', ')} → ${r.kpi} · ${r.priority} · ${esc(r.owner)}</p></article>`).join('');
  document.getElementById('decision-list').innerHTML=model.decisions.map(d=>`<article><h3>${d.id} · ${esc(d.title)}</h3><p>${esc(d.reason)}</p><p><strong>Alternatief:</strong> ${esc(d.alternative)}</p><a href="https://github.com/phlppgdfry/occupational-health-analysis-case/blob/main/${d.path}">Volledige beslisnotitie</a></article>`).join('');
  document.getElementById('kpi-list').innerHTML=`<table><thead><tr><th scope="col">KPI</th><th scope="col">Illustratieve baseline</th><th scope="col">Illustratief doel</th></tr></thead><tbody>${model.kpis.map(k=>`<tr><td class="kpi-label"><strong>${k.id}</strong> · ${esc(k.name)}<br><span class="muted">${esc(k.definition)}</span></td><td>${esc(k.baseline)}</td><td>${esc(k.target)}</td></tr>`).join('')}</tbody></table>`;
} catch {document.getElementById('requirements-list').textContent='Catalogus kon niet worden geladen. Bekijk de requirementcatalogus in de GitHub-repo.';}
