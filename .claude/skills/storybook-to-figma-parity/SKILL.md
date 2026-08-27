---
name: storybook-to-figma-parity
description: "Reconstruct Figma Design System components from Storybook using MCPs, reusing existing Figma tokens, styles, and icon components (token-parity workflow). Trigger when the user asks to mirror Storybook into Figma, audit Figma vs Storybook for token/style drift, or rebuild a component in Figma without creating new tokens."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Storybook → Figma component reconstruction (token‑parity)

This skill reconstructs Figma Design System components from Storybook using MCPs,
**reusing existing Figma tokens, styles, and icon components**.

It assumes that Storybook and Figma share the same semantic design foundations
(colors, typography, spacing, radius, shadows, icons), even if naming formats differ.

The agent must bind to existing Figma variables and styles.
Token creation, guessing, or hardcoded values are not allowed.

---

## Core principles

1. Figma tokens and styles are the source of truth for what is created in Figma
2. Storybook MCP provides semantic intent and token identifiers, not pixel truth
3. Token mapping must be deterministic and repeatable
4. If a token cannot be resolved safely, the process must stop and report

---

## Phase 0 — Discover existing Figma foundations

Before reconstructing any component:

- Identify existing Figma variables using the `$token-name` convention
  - e.g. `$color-border-primary`, `$spacing-sm`, `$radius-md`, `$font-style-h1`
- Identify named text styles
  - e.g. `H1`, `H2`, `Body`, `Caption`
- Identify existing icon components intended for instance swap

These foundations must be reused. Do not create new tokens or styles.

---

## Phase 1 — Read tokens and intent from Storybook MCP

When consuming Storybook MCP data:

- Prefer **explicit token identifiers**
  - e.g. `--color-border-primary`, `--font-style-h1`
- If only **semantic intent** is exposed
  - e.g. `variant="h1"`, `appearance="primary"`
  treat this as a semantic token reference, not a visual value
- Do NOT derive tokens from rendered values or screenshots
- Do NOT infer tokens from computed styles if a semantic token or intent exists

---

## Phase 2 — Deterministic token & style mapping

All token resolution must follow the rules below.
No guessing or fuzzy matching is allowed.

---

### 2.1 Color, spacing, radius, shadows

**Rule: direct name normalization**

If Storybook exposes a token like: `--color-border-primary`, resolve it as: `$color-border-primary`
Mapping steps:
- Strip leading `--`
- Prefix with `$`
- Use the variable only if it already exists in Figma
- Do NOT create new variables

Examples:
- `--color-border-primary` → `$color-border-primary`
- `--spacing-sm` → `$spacing-sm`
- `--radius-md` → `$radius-md`

---

### 2.2 Typography (styles + variables)

This design system uses:
- Named text styles (e.g. `H1`, `H2`, `Body`)
- Typography variables (e.g. `$font-style-h1`)

**Resolution order (mandatory):**

1. If a named text style exists for the semantic role → apply the text style
2. Otherwise, if a `$font-style-*` variable exists → bind text properties to the variable
3. Otherwise → stop and report

Examples:
- Storybook semantic: `variant="h1"` → apply `H1` text style
- Storybook token: `--font-style-h1` → bind to `$font-style-h1`

Do NOT partially bind typography (all properties must come from the style or variable).

---

### 2.3 Icons

When Storybook exposes:
- icon name
- icon slot
- or semantic icon role

The agent must:
- Use instance swap with an existing icon component from the Figma DS
- Match by exact name or an explicit deterministic mapping rule

If no matching icon exists:
- Insert a placeholder
- Flag for manual review
- Do NOT create new icon components

## Phase 3 State naming & mapping rules (Storybook → Figma)

Storybook exposes component states using implementation-level names.
Figma models a subset of these as persistent UI states.

The agent MUST map Storybook states to Figma states deterministically
using the rules below.

---

### Persistent UI states (modeled in Figma)

The following states are valid and expected in Figma:

- Default
- Hover
- Selected (focus-equivalent)
- Active (e.g. dropdown open / closed)
- Disabled
- Error
- ReadOnly

These states may be represented as:
- values of an existing `State` property, or
- boolean properties (depending on the component API)

---

### Accessibility-only states (NOT modeled in Figma)

Some Storybook states exist only for accessibility support
and MUST NOT be represented in Figma:

- `focus-visible`
- keyboard-only focus mechanics
- aria-only interaction cues

Rules:
- Do NOT create Figma variants or states for accessibility-only mechanics
- Do NOT introduce a `FocusVisible` state
- Accessibility intent is preserved via documentation and semantics, not variants

---

### Error state representation (enum vs boolean)

Error may be represented in Figma in one of two ways:

1. As a value in an existing `State` enum (e.g. `State = Error`)
2. As a boolean property (e.g. `isErrored = true`)

Decision rule (mandatory):

- If the component already has a `State` property that includes `Error`:
  - Use `State = Error`
  - Do NOT introduce an error boolean
- Otherwise:
  - Use a boolean error property (e.g. `isErrored`)
  - Do NOT introduce a `State = Error` variant

Never mix both representations for the same component.

---

### Deterministic mapping table

| Storybook state | Figma state |
|-----------------|-------------|
| `hover` | `Hover` |
| `focused` | `Selected` |
| `active` | `Active` |
| `invalid` | `Error` or `isErrored = true` |
| `error` | `Error` or `isErrored = true` |
| `disabled` | `Disabled` |
| `readOnly` | `ReadOnly` |
| `focus-visible` | not represented |

---

### Failure and stop conditions

If:
- a Storybook state cannot be mapped using the rules above
- or both `State = Error` and `isErrored` exist simultaneously

Then:
- Do NOT invent a new state
- Do NOT merge representations
- Stop and report the inconsistency

---

### Deterministic state memory

Once a state mapping and representation is chosen for a component:
- Reuse it consistently across all variants
- Do NOT reinterpret the same Storybook state differently later


## Slot vs variant decision rules

When Storybook exposes differences in:
- text content
- icons
- badges
- actions
- helper content

Rules:
- If the structure is the same and content varies → use Slots (Figma feature that appear with a pink outline)
- If structure or layout changes → consider variants

Do NOT create variants for:
- label text
- placeholder text
- icon swaps
- helper or error messages

Slots are preferred over variants whenever possible.

## Accessibility binding rules

When Storybook exposes accessibility semantics (e.g. aria attributes):

- `aria-invalid` maps to:
  - `State = Error` or `isErrored = true`
  - error messaging slot
- `aria-disabled` maps to:
  - `State = Disabled` or `disabled = true`

Accessibility semantics must be preserved.
Visual styling alone is not sufficient.

## Out of scope

Do NOT attempt to reconstruct:
- internal Storybook‑only stories
- demo‑only props
- testing utilities
- mock data variations

## Human review expectation

This skill produces a best‑effort reconstruction.
Final approval and adjustments are expected from a human designer.
