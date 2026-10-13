// Shared by the prototype and acceptance tests. No clinical information belongs here.
export const DEMO_NOW = '2026-10-13T08:00:00Z';
export const TYPES = ['periodic', 'intake'];
export const STATUS = { incomplete: 'Onvolledig', ready: 'Klaar', scheduled: 'Gepland', cancelled: 'Geannuleerd', completed: 'Afgerond', no_show: 'Niet verschenen' };
export function seed() {
  return {
    schemaVersion: 1,
    cases: [
      { id: 'OH-001', employee: 'DEMO-001', employer: 'Linde Werkplaats', type: 'periodic', workpost: '', status: 'incomplete', slotId: null, version: 1 },
      { id: 'OH-002', employee: 'DEMO-002', employer: 'Linde Werkplaats', type: 'intake', workpost: 'Montage', status: 'ready', slotId: null, version: 1 },
      { id: 'OH-003', employee: 'DEMO-003', employer: 'Koren Atelier', type: 'periodic', workpost: 'Magazijn', status: 'scheduled', slotId: 'S-01', version: 1 },
      { id: 'OH-004', employee: 'DEMO-004', employer: 'Koren Atelier', type: 'periodic', workpost: 'Verpakking', status: 'cancelled', slotId: null, version: 2 }
    ],
    slots: [
      { id: 'S-01', start: '2026-10-15T07:00:00Z', end: '2026-10-15T07:30:00Z', clinician: 'ARTS-DEMO-A', room: 'Kamer 1', types: ['periodic', 'intake'] },
      { id: 'S-02', start: '2026-10-15T08:00:00Z', end: '2026-10-15T08:30:00Z', clinician: 'ARTS-DEMO-A', room: 'Kamer 1', types: ['periodic', 'intake'] },
      { id: 'S-03', start: '2026-10-15T08:30:00Z', end: '2026-10-15T09:00:00Z', clinician: 'ARTS-DEMO-A', room: 'Kamer 1', types: ['periodic'] },
      { id: 'S-04', start: '2026-10-16T07:00:00Z', end: '2026-10-16T07:30:00Z', clinician: 'ARTS-DEMO-B', room: 'Kamer 2', types: ['periodic', 'intake'] }
    ],
    events: [{ id: 'EV-001', caseId: 'OH-001', type: 'received', at: DEMO_NOW, actor: 'seed', detail: 'Aanvraag ontvangen; werkpost ontbreekt.' }],
    outbox: [], processed: {}
  };
}
export class DomainError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}
const fail = (code, text) => { throw new DomainError(code, text); };
const overlap = (a, b) => Date.parse(a.start) < Date.parse(b.end) && Date.parse(b.start) < Date.parse(a.end);
export function occupied(state, slot, employee, excludingId) {
  return state.cases.some(c => {
    if (c.id === excludingId || c.status !== 'scheduled') return false;
    const booked = state.slots.find(s => s.id === c.slotId);
    return booked && overlap(booked, slot) && (booked.clinician === slot.clinician || booked.room === slot.room || c.employee === employee);
  });
}
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k, canonical(value[k])]));
  return value;
}
export function execute(state, command, { role = 'planner', now = DEMO_NOW } = {}) {
  const rights = { planner: ['complete', 'schedule', 'cancel', 'reopen'], coordinator: ['complete', 'schedule', 'cancel', 'reopen', 'outcome'], observer: [] };
  if (!rights[role]?.includes(command.action)) fail('FORBIDDEN', 'Deze rol mag deze actie niet uitvoeren.');
  if (!Number.isFinite(Date.parse(now))) fail('INVALID_TIME', 'Ongeldige klok.');
  if (typeof command.key !== 'string' || !command.key.trim() || command.key.length > 100) fail('KEY_REQUIRED', 'Een geldige idempotentiesleutel is verplicht.');
  const fingerprint = JSON.stringify(canonical({ ...command, role }));
  const prior = Object.hasOwn(state.processed, command.key) ? state.processed[command.key] : null;
  if (prior) {
    if (prior !== fingerprint) fail('KEY_REUSED', 'Dezelfde sleutel bevat een andere opdracht.');
    return { state, replayed: true };
  }
  const current = state.cases.find(c => c.id === command.caseId);
  if (!current) fail('NOT_FOUND', 'Dossier niet gevonden.');
  if (command.version !== current.version) fail('STALE_VERSION', 'Dossier gewijzigd. Ververs voordat je opnieuw probeert.');
  const next = structuredClone(state);
  const c = next.cases.find(c => c.id === current.id);
  const originalSlot = c.slotId;
  let detail = '';
  if (command.action === 'complete') {
    if (!['incomplete', 'ready'].includes(c.status)) fail('INVALID_STATE', 'Alleen ongeplande dossiers kunnen worden aangevuld.');
    if (!TYPES.includes(command.type)) fail('INVALID_TYPE', 'Kies een ondersteund onderzoekstype.');
    if (typeof command.workpost !== 'string' || !command.workpost.trim() || command.workpost.trim().length > 80) fail('MISSING_DATA', 'Werkpost is verplicht (maximaal 80 tekens).');
    c.type = command.type; c.workpost = command.workpost.trim(); c.status = 'ready';
    detail = 'Administratieve gegevens gecontroleerd; dossier is klaar.';
  } else if (command.action === 'schedule') {
    if (c.status !== 'ready') fail('INVALID_STATE', 'Alleen een volledig, klaar dossier kan worden gepland.');
    const slot = next.slots.find(s => s.id === command.slotId);
    if (!slot) fail('INVALID_SLOT', 'Afspraak bestaat niet.');
    if (Date.parse(slot.start) <= Date.parse(now)) fail('PAST_SLOT', 'Deze afspraak ligt niet in de toekomst.');
    if (!slot.types.includes(c.type)) fail('TYPE_MISMATCH', 'Dit tijdslot ondersteunt dit onderzoekstype niet.');
    if (occupied(next, slot, c.employee, c.id)) fail('SLOT_CONFLICT', 'Arts, kamer of medewerker is al geboekt in dit tijdsinterval.');
    c.slotId = slot.id; c.status = 'scheduled'; detail = `Afspraak geboekt: ${slot.id}.`;
  } else if (command.action === 'cancel') {
    if (c.status !== 'scheduled') fail('INVALID_STATE', 'Alleen een geplande afspraak kan worden geannuleerd.');
    const slot = next.slots.find(s => s.id === c.slotId);
    if (Date.parse(slot.start) <= Date.parse(now)) fail('PAST_SLOT', 'Een begonnen afspraak moet via de uitkomst worden verwerkt.');
    if (typeof command.reason !== 'string' || !command.reason.trim() || command.reason.trim().length > 160) fail('REASON_REQUIRED', 'Annuleringsreden is verplicht (maximaal 160 tekens).');
    c.status = 'cancelled'; c.slotId = null; detail = `Annulering: ${command.reason.trim()}`;
  } else if (command.action === 'reopen') {
    if (c.status !== 'cancelled') fail('INVALID_STATE', 'Alleen een geannuleerd dossier kan worden heropend.');
    c.status = 'ready'; detail = 'Heropend voor herplanning; geen automatische reservering.';
  } else if (command.action === 'outcome') {
    if (c.status !== 'scheduled') fail('INVALID_STATE', 'Alleen een geplande afspraak kan worden afgesloten.');
    const slot = next.slots.find(s => s.id === c.slotId);
    if (Date.parse(slot.end) > Date.parse(now)) fail('TOO_EARLY', 'De afspraak is nog niet afgelopen.');
    if (!['completed', 'no_show'].includes(command.outcome)) fail('INVALID_OUTCOME', 'Kies afgerond of niet verschenen.');
    c.status = command.outcome; c.slotId = null; detail = 'Administratieve uitkomst vastgelegd; geen medisch resultaat.';
  }
  c.version++;
  next.events.push({ id: `EV-${String(next.events.length + 1).padStart(3, '0')}`, caseId: c.id, type: command.action, at: now, actor: role, detail, previousSlotId: originalSlot, newSlotId: c.slotId });
  if (['schedule', 'cancel'].includes(command.action)) next.outbox.push({ id: `MSG-${next.outbox.length + 1}`, caseId: c.id, event: command.action, status: 'simulated', slotId: command.action === 'schedule' ? c.slotId : originalSlot });
  Object.defineProperty(next.processed, command.key, { value: fingerprint, enumerable: true, writable: true, configurable: true });
  return { state: next, replayed: false };
}
