# Aster Prevention · Executive summary

Independent portfolio case study based on a fictional organisation. It contains no confidential information from any real employer or the hiring company. This translated artefact does not establish the candidate's spoken language proficiency.

## Problem and approach

A fictional occupational-health service schedules administrative appointments through separate lists and emails. Incomplete requests, overlapping resources and missed capacity release create rework. The case starts with stakeholder tensions, then connects requirements to process, states, data, interface contracts, acceptance tests and handover.

## Core journey

Complete a missing workpost field, reserve a suitable free slot, cancel with a reason, release capacity, explicitly reopen and choose a new appointment. The active reservation and the historical appointment references are separate.

## Key decisions

Completeness precedes reservation. Conflicts are checked by time interval and clinician, room and employee rather than slot ID alone. Cancellation and rescheduling are separate decisions. The shared domain function drives both the prototype and the executable acceptance tests.

## Evidence and limits

The central trace is P-03 → FR-04 → R-04 → AC-15 → K-04. The test cancels one request and then books another into the freed capacity. The repository also contains a UAT plan, change impact analysis, migration and rollout plan, user guide and support runbook.

The browser prototype has simulated roles, a local activity log and a simulated outbox. It provides no clinical records, real authentication, backend transactions or notification delivery. Production concurrency and tenant authorization remain explicit implementation conditions. All KPI figures are illustrative assumptions, not measured benefits.

[Reading paths](../../START-HERE.md) · [Prototype](../../site/demo/index.html?tour)
