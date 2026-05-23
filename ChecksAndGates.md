# ChecksAndGates — Executable PAI Doctrine in OMP

Checks must be executable gates, not prose. A perfect analog fails closed when a required check cannot run.

## Mode and effort checks

- `pai://check/mode-classifier-present` — PromptProcessing produced MODE.
- `pai://check/tier-present-for-algorithm` — ALGORITHM has E1-E5.
- `pai://check/explicit-effort-override` — /e1-/e5 override honored.
- `pai://check/context-override` — follow-up prompts can escalate under Algorithm rules.

## Algorithm phase checks

- `pai://check/intent-echo` — OBSERVE starts with one-sentence restatement.
- `pai://check/preflight-gates` — diagnostic/deploy/external/research gates fired when triggered.
- `pai://check/reproduce-first` — bugs have reproduction before suspect code reads.
- `pai://check/capability-name-audit` — thinking capabilities are from closed enumeration.
- `pai://check/thinking-floor` — E2+ hard floor met.
- `pai://check/delegation-floor` — soft floor met or justified.
- `pai://check/capability-invocation` — every selected capability was actually invoked.
- `pai://check/deliverable-manifest` — every explicit subtask mapped.
- `pai://check/reread-user-message` — final explicit asks all addressed.

## ISA checks

- `pai://check/isa-home` — project vs task ISA selected correctly.
- `pai://check/isa-section-completeness` — tier-required sections populated.
- `pai://check/isc-granularity` — one binary probe per criterion.
- `pai://check/isc-id-stability` — no renumbering, splits use N.M.
- `pai://check/anti-criterion-present` — at least one Anti criterion.
- `pai://check/antecedent-present-when-experiential` — experiential goals include antecedent.
- `pai://check/verification-evidence` — no [x] without evidence.
- `pai://check/changelog-crl-complete` — conjecture/refutation/learning/criterion_now all present.

## Verification checks

- `pai://check/live-probe-required` — user-facing artifacts have live probes.
- `pai://check/advisor-boundary` — Advisor called where required.
- `pai://check/cato-e4-e5` — Cato called at E4/E5.
- `pai://check/conflict-surfacing` — empirical/advisor conflict recalled, max two.
- `pai://check/deferred-verify-task-id` — deferred verification has follow-up id.

## Security and containment checks

- `pai://check/security-pipeline-pretool` — dangerous tools pass security.
- `pai://check/secret-scan` — secrets detected before persistence/exposure.
- `pai://check/content-scanner` — fetched content scanned for injection.
- `pai://check/containment-zone` — protected paths obey containment policy.
- `pai://check/permission-route` — permission changes surface to user.

## Lazy-context checks

- `pai://check/no-eager-pai-bodies` — startup prompt has no PAI bodies.
- `pai://check/lease-created-on-materialize` — every body load creates ContextLease.
- `pai://check/lease-expired` — phase/workflow/tool leases unload.
- `pai://check/resource-represented` — all audited resources have manifest entries.
- `pai://check/inventory-counts` — exact counts match audited revision or migration notes.
