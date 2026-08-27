---
name: spinner
description: "Use when implementing the Spinner component for loading or progress states. Trigger on: loading indicators, saving states, circular progress, multi-step progress indicators, indeterminate waits, or progress with a known number of steps."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Spinner

---

# Component Metadata

```yaml
component: Spinner
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Spinner

category:
  - data
  - display

intent_tags:
  - spinner
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need visual feedback when the system is working — whether the duration is unknown (indeterminate) or measurable as a step count (determinate). The Spinner provides a circular animated indicator for both cases, with optional severity colors and text labels.

In RelativityOne, Spinner is used for saving forms, loading content, and multi-step background operations where step-level progress is meaningful.

### Purpose

Display a circular loading or progress indicator — indeterminate (spinning animation) or determinate (step X of Y as a circular arc). Supports severity colors and accompanying text.

### Storybook Component

Use the `Spinner` component (under Feedback). Storybook is the reference for props and API: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADfeedback-spinner--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `step` | `number` | — | Current step in a determinate flow |
| `totalSteps` | `3\|4\|5\|6` | `4` | Total steps — controls the circular arc length |
| `aria-label` | `string` | — | Accessible label for the spinner |
| `severity` | `"info"\|"warning"\|"error"\|"success"` | — | Controls spinner color |
| `text` | `string` | — | Text displayed alongside the spinner |
| `message` | `string` | — | Message displayed below the spinner (replaces `bottomMessage`) |
| `bottomMessage` | `string` | — | **Deprecated** — use `message` instead |
| `inline` | `boolean` | — | Renders the spinner inline (new in 3.0) |

### Related Components

- ProgressBar (horizontal bar for percentage-based progress)
- Skeleton (loading placeholder for content with known structure)
- Toast (completion message after operation finishes)

---

# When to Use

1. **Indeterminate loading** — Duration or progress is unknown: saving a form, loading data, submitting a search. Use the basic spinning animation with no step props.
2. **Determinate step progress** — A multi-step operation where the current step number is known (e.g., "Step 2 of 4"). Set `step` and `totalSteps` to show circular arc progress.
3. **Severity-coded progress** — Operations that can succeed, warn, or error during multi-step flows. Use `severity` to color the spinner appropriately.
4. **In-button or inline loading** — Small spinner replacing or alongside a button label while an action is in progress.

| Situation | Use Instead |
|---|---|
| Progress known as a percentage | ProgressBar |
| Loading content with a known structure | Skeleton |
| Completion feedback | Toast |
| Very fast operation (< 300ms) | No indicator (avoid flash) |

---

# When NOT to Use

_See substitutes in Storybook and Related Components._

---

# Decision Triggers

```yaml
decision_triggers:

  use_spinner_if:
    - Duration or progress is unknown: saving a form, loading data, submitting a search. Use the basic spinning animation with no step props.
    - A multi-step operation where the current step number is known (e.g., \"Step 2 of 4\"). Set `step` and `totalSteps` to show circular arc progress.
    - Operations that can succeed, warn, or error during multi-step flows. Use `severity` to color the spinner appropriately.
    - Small spinner replacing or alongside a button label while an action is in progress.
    - | Situation | Use Instead |
    - | Progress known as a percentage | ProgressBar |

  do_not_use_spinner_if:
    - see When to Use section in this skill
```

---

# Additional Topics

# Modes

### Indeterminate
No `step` or `totalSteps` props. Shows a continuously spinning animation indicating work is in progress with no measurable completion point.

### Determinate (Step-based)
Set `step` and `totalSteps`. Shows a circular arc that fills proportionally to the current step. Supported `totalSteps` values: 3, 4, 5, 6.

Example: `step={2}` `totalSteps={4}` → "Step 2 of 4" with the arc half filled.

### With Severity
Add `severity` to color the spinner: `info` (blue), `success` (green), `warning` (yellow), `error` (red). Use with a `message` to explain the severity (e.g., "Warning: low disk space").

> **Deprecation note (3.0):** `bottomMessage` has been renamed to `message`. Both work, but `bottomMessage` will be removed in a future major version.

---

# Behavioral Rules

1. Pair with a `text` or `bottomMessage` when it is not obvious what is loading — screen reader users and anxious users benefit from knowing what is happening.
2. Use determinate mode (step/totalSteps) whenever the number of steps is known — it reduces perceived wait time compared to indeterminate.
3. Remove the spinner when the operation completes or fails — do not leave it running indefinitely.
4. For in-button loading, disable the button while the spinner is active and restore it on completion.
5. Respect `prefers-reduced-motion` — use a reduced or static state when motion is reduced.

---

# Layout and Placement

- **In button:** spinner replaces or accompanies the label while the action is loading
- **Inline / section:** centred in the loading content area
- **Overlay / modal:** centred with a `text` or `bottomMessage` label
- **Step indicator:** use with `bottomMessage` to show step label (e.g., "Processing documents...")

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between spinner and text label: `8px`
- Margin around inline spinner: `8px` on each side
- Overlay padding from container edges: `16px` minimum

---

# Constraints

```yaml
constraints:

  skill_id: spinner
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: spinner
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Spinner and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Always set `aria-label` when the spinner has no visible text label — screen readers need to announce the loading state
- Set `aria-busy="true"` on the region being loaded; set to `false` when done
- For determinate mode, the step information ("Step 2 of 4") should be conveyed via `aria-label` or a visible text label
- Spinner graphic is decorative — rely on `aria-label` or live regions for the announcement, not the visual arc

**Common mistakes:**
- No `aria-label` and no visible text — screen reader is silent
- Spinner left running after an error — replace with an error Message
- Using indeterminate spinner when step count is known — use determinate mode

---

# Relationship Mapping

```yaml
relationships:

  companions:
    default:
      - FormField
      - Panel

  substitutes:
    see_related_components:
    - ProgressBar
    - Skeleton

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Spinner
```

---

# Validation Rules

```yaml
validation_rules:

  - id: spinner_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: spinner_storybook_api
    description: Implement Spinner using PrimeReact Spinner per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: spinner_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using Spinner when a percentage is available — use ProgressBar instead.
**Severity:** Medium

## Anti-pattern 2
**Problem:** Using indeterminate spinner when step count is known — use `step`/`totalSteps`.
**Severity:** Medium

## Anti-pattern 3
**Problem:** No text or label — users and screen readers cannot tell what is happening.
**Severity:** Medium

## Anti-pattern 4
**Problem:** Spinner left visible after failure — replace with error feedback.
**Severity:** Medium


---

# Component Decision Logic

**User clicks Save; form submits; duration unknown:**
→ Spinner (indeterminate, in button or inline). Disable button while loading.

**Background job has 4 steps; currently on step 2:**
→ Spinner (determinate: `step={2}` `totalSteps={4}`). Add `bottomMessage` describing the current step.

**Export running; backend reports 45% complete:**
→ Not a Spinner. Use ProgressBar (percentage-based).

**Loading table data; row structure is known:**
→ Spinner or Skeleton. Skeleton preferred when structure is predictable.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Spinner (Spinner) per Storybook.
Notes: Align spacing and colors with Aero v3 and `relativity-tokens.json`.

## Scenario — Not appropriate
User intent: A different interaction pattern (selection, navigation, destructive confirm).
Recommended: Choose the component listed in When NOT to Use.
Notes: Cross-check Figma Aero and Storybook naming.

## Scenario — Accessibility
User intent: Keyboard and screen reader access.
Recommended: Follow Accessibility Requirements and PrimeReact docs.
Notes: Do not remove visible focus.

---

# Related Components

**Used with:** Button (loading state), Modal (blocking wait), Skeleton (content loading with known structure), Toast (completion message)

**Confused with:**
- ProgressBar — horizontal bar showing percentage; use when % is available
- Skeleton — content placeholder mirroring real layout; use when structure is known
