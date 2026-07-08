# EXECUTION OS

## Documents, not chat. Contracts, not tickets.

### The problem with normal execution

Tasks come from chat. Tickets are written in meetings. Branches are named arbitrarily. Commits say "fix". Reviews check code but not intent. Nothing traces back to a source.

The result: the implementation drifts from the spec. The spec drifts from the intent. Six months later, nobody knows why anything exists.

### The SVARA way

Everything comes from documents. Every task, every sprint, every ticket, every branch, every commit, every review.

Chat is for discussion. Documents are the truth. If it is not in a document, it does not exist.

---

## 01 — The Source Chain

```
DOCUMENT (spec)
  └── CONTRACT (engineering agreement)
       └── TASK (unit of work)
            └── BRANCH (implementation)
                 └── COMMIT (checkpoint)
                      └── REVIEW (verification)
                           └── MERGE (delivery)
```

Every link in this chain traces to the one before it. A commit references a task. A task references a contract. A contract references a document.

No link exists without a parent.

---

## 02 — Sprint Structure

### Sprint zero (complete)

- Company OS
- Category OS
- Knowledge OS
- Experience OS
- Engineering OS
- Execution OS

### Sprint one and beyond

| Phase | Input | Output |
|-------|-------|--------|
| Spec | Document from OS | Approved spec |
| Contract | Approved spec | Engineering contract |
| Tasks | Engineering contract | Tasks with acceptance criteria |
| Implementation | Tasks | Working code |
| Review | Working code | Approved merge |

### Sprint rhythm

| Day | Activity |
|-----|----------|
| 1 | Sprint review + spec approval |
| 2-4 | Implementation |
| 5 | Review + merge + deploy |

---

## 03 — The Task Template

Every task contains:

```
TASK-XXX: [Contract ID] [Brief description]

Trace:
  Document: docs/XX_XXXX/XXXX.md
  Contract: docs/06_EXECUTION/HPXXX.md

Acceptance:
  [ ] — Acceptance criterion 01
  [ ] — Acceptance criterion 02
  [ ] — Acceptance criterion 03
  [ ] — Performance budget met
  [ ] — QA checklist passed

Dependencies:
  - TASK-YYY (blocks)
  - TASK-ZZZ (blocked by)
```

No task is created without a contract reference. No task is started without acceptance criteria.

---

## 04 — Branch Convention

```
<type>/<contract-id>-<description>
```

| Type | When |
|------|------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructure |
| `spec` | Document update |

Examples:
- `feat/HP001-scene-category-intro`
- `fix/HP012-header-scroll`
- `refactor/PL003-platform-timeline`
- `spec/COMPANY-04-outcomes`

---

## 05 — Commit Convention

```
<contract-id> | <message>

<references> (optional)
```

| Element | Rule |
|---------|------|
| Contract ID | Required. Which contract does this serve? |
| Message | Imperative present tense. What does this commit do? |
| References | Optional. TASK-XXX, related contracts |

Examples:
```
HP001 | Implement category intro scene with 3D particle transition
```

```
PL002 | Add platform capability cards with hover expand animation

References: TASK-042
```

---

## 06 — The Review Checklist

Every review verifies:

| Check | What to verify |
|-------|---------------|
| Contract compliance | Does the implementation match the contract? |
| Acceptance criteria | Does every acceptance criterion pass? |
| Performance budget | Is the performance budget met? |
| Ownership rules | Does any component violate ownership (no GSAP, no ScrollTrigger, no camera)? |
| Single source of truth | Is any data duplicated? |
| Spec alignment | Does this disagree with the spec? (If yes, fix implementation, not spec) |

A review that passes all six checks is approved.

A review that fails any check is rejected. No exceptions.

---

## 07 — The QA Gates

### Gate 1 — Pre-commit (developer)

- [ ] Lint passes
- [ ] Type check passes
- [ ] No console.log
- [ ] No TODO comments
- [ ] No placeholder content
- [ ] All text is approved copy (not lorem ipsum)

### Gate 2 — Pre-merge (reviewer)

- [ ] Contract compliance verified
- [ ] Acceptance criteria verified
- [ ] Performance budget verified
- [ ] Ownership rules verified

### Gate 3 — Pre-deploy (automated)

- [ ] Build passes
- [ ] Lighthouse scores pass
- [ ] No regression in bundle size
- [ ] No regression in frame rate

---

## 08 — The Golden Rule

**Every execution artifact traces to a document. Every single one.**

A task without a contract is not a task. It is a request.

A branch without a task is not a branch. It is an experiment.

A commit without a contract ID is not a commit. It is a note.

A review without a contract reference is not a review. It is an opinion.

Chat is for discussion. Documents are the truth. Execution is the proof.
