# Kies je leesroute

## Twee minuten

1. Lees de [one-pager](application-kit/executive/one-page-summary.md).
2. Open de [demo met rondleiding](https://phlppgdfry.github.io/occupational-health-analysis-case/demo/?tour), lokaal via `npm run dev`, daarna `http://localhost:8047/demo/?tour`.

## Vijf minuten

1. Bekijk [probleem en aannames](docs/00-context/context.md).
2. Lees [annulering en herplanning](docs/02-requirements/functional-spec.md).
3. Bekijk [proces](docs/03-processes/processes.md) en [bewijsmatrix](EVIDENCE.md).

## Vijftien minuten

Volg [discovery](docs/01-discovery/discovery.md) → [requirements](docs/02-requirements/catalogue.md) → [proces](docs/03-processes/processes.md) → [architectuur](docs/04-design/architecture.md) → [API](docs/05-integration/contract.md) → [tests](docs/06-validation/test-strategy.md) → [UAT](docs/06-validation/uat.md) → [pilot](docs/07-delivery/rollout.md) → [support](docs/08-handover/runbook.md).

## Technisch beoordelen

Voer `npm run check` uit. Vergelijk FR-04 / AC-15 in de catalogus met `execute()` in [domain.mjs](site/assets/domain.mjs) en de [test](tests/domain.test.mjs). Lees [ADR-02](docs/adr/02-capacity.md) om te zien waarom één slot-ID niet voldoende is. Browserchecks: `npm ci`, `npx playwright install chromium`, `npm run test:ui`.

De [publieke site](https://phlppgdfry.github.io/occupational-health-analysis-case/) en [rondleiding](https://phlppgdfry.github.io/occupational-health-analysis-case/demo/?tour) zijn zonder installatie te openen. De lokale instructies zijn voor codecontrole en eigen aanpassingen. [Screenshots](docs/screenshots/README.md) geven bewijs zonder JavaScript.
