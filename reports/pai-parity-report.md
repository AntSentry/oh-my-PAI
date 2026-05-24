# PAI OMP Build Parity Report

Source revision: `2fde1bbe9e8f280cd4998e244b53e3c66f3dc8b9`
Generated: `2026-05-23T16:23:29.648Z`

## Functional Matrix

| Surface | Canonical expected | OMP represented | Status | Missing samples |
|---|---:|---:|---|---|
| skills | 45 | 45 | covered | - |
| workflows | 171 | 171 | covered | - |
| skillTools | 38 | 38 | covered | - |
| agents | 18 | 18 | covered | - |
| commands | 3 | 3 | covered | - |
| hooks | 68 | 68 | covered | - |
| tools | 72 | 72 | covered | - |
| algorithm | 14 | 14 | covered | - |
| functions | 256 | 256 | covered | - |
| feedbackLoops | 32 | 32 | covered | - |
| checks | 41 | 41 | covered | - |
| effortLevels | 5 | 5 | covered | - |
| promptPrepend | 5 | 5 | covered | - |

## Prompt Prepend Map

| Target | Prepended resource | Source path |
|---|---|---|
| top-level-session | pai://system-prompt/PAI_SYSTEM_PROMPT.md | PAI/PAI_SYSTEM_PROMPT.md |
| top-level-session | pai://claude/CLAUDE.md | CLAUDE.md |
| top-level-session | pai://claude/imports/startup-context | CLAUDE.md @imports |
| skill-editing-workflow | pai://skills/CLAUDE.md | skills/CLAUDE.md |
| agent-spawn | pai://agent/{name} | agents/{name}.md |

## Gaps

No open parity gaps detected by the matrix probes.
