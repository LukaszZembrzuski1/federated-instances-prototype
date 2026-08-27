---
name: steps
description: "Use when implementing Steps for indicating progress through a multi-step workflow. Trigger on: step indicators, wizards, multi-step forms, onboarding flows, or any sequential process where showing the current step and total steps helps users orient themselves."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Steps

---

# Component Metadata

```yaml
component: Steps
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Steps

category:
  - data
  - display

intent_tags:
  - steps
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users working through a multi-step process — importing data, configuring a workspace, completing an onboarding flow — need to know where they are, how many steps remain, and optionally navigate between steps. Steps provides a visual step indicator for this.

In RelativityOne, Steps is used for import/export wizards, workspace setup flows, processing job configuration, and any sequential multi-step workflow.

### Purpose

Visual indicator showing the steps in a sequential workflow with the current step highlighted. Supports horizontal and vertical layouts. Steps are read-only (non-clickable) by default.

### Storybook Component

Use the `Steps` component (under Navigation). Built on PrimeReact Steps. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADnavigation-steps--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `model` | `MenuItem[]` | — | Array of step items (label required) |
| `activeIndex` | `number` | — | Index of the currently active step (0-based) |
| `readOnly` | `boolean` | `true` | Whether steps are clickable — **defaults to true (not clickable)** |
| `vertical` | `boolean` | `false` | Display steps vertically |
| `longText` | `boolean` | `false` | Allow longer step labels |

> **Important:** Steps are **not clickable by default** (`readOnly={true}`). Set `readOnly={false}` only when users should be able to jump between steps freely (e.g., reviewing a completed workflow). In most wizard flows, keep `readOnly={true}` and control navigation via Next/Back buttons.

### Related Components

- ProgressBar (progress as a percentage, not steps)
- Spinner (indeterminate loading, not a workflow indicator)
- TabView (equal-weight sibling sections, not sequential steps)
- TertiaryNavigation (non-linear navigation with statuses)

---

# When to Use

1. **Multi-step wizards** — Import: Validate → Map → Run → Review. Export: Configure → Preview → Download.
2. **Onboarding flows** — Setup steps shown at the top as the user progresses.
3. **Sequential configuration** — Any workflow where order matters and users benefit from seeing their position.

---

# When NOT to Use

1. Sections are not sequential and users switch freely between them → use TabView.
2. Only loading/progress with a percentage → use ProgressBar.
3. Non-linear navigation with status indicators → use TertiaryNavigation.
4. 2 steps only → consider just a ProgressBar or inline indicator.

---

# Decision Triggers

```yaml
decision_triggers:

  use_steps_if:
    - Import: Validate → Map → Run → Review. Export: Configure → Preview → Download.
    - Setup steps shown at the top as the user progresses.
    - Any workflow where order matters and users benefit from seeing their position.

  do_not_use_steps_if:
    - 1. Sections are not sequential and users switch freely between them → use TabView.
    - 2. Only loading/progress with a percentage → use ProgressBar.
    - 3. Non-linear navigation with status indicators → use TertiaryNavigation.
    - 4. 2 steps only → consider just a ProgressBar or inline indicator.
```

---

# Behavioral Rules

1. Always control `activeIndex` from state — Steps does not manage its own active step.
2. Keep `readOnly={true}` (default) for most wizard flows. Only set `readOnly={false}` if free step navigation is intentional.
3. Pair with Back and Next buttons below the step content — Steps itself provides no navigation controls.
4. Show the step label clearly — if labels are long, set `longText={true}`.
5. Use `vertical={true}` for very long flows or when horizontal space is limited.

---

# Layout and Placement

Steps is placed at the top of the wizard content, above the current step's content panel and navigation buttons.

```
[Steps indicator]
[Current step content]
[Back]  [Next / Finish]
```

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Margin below Steps indicator and above content: `24px`
- Margin above navigation buttons: `24px`
- Step circle size follows Storybook defaults — do not override

---

# Constraints

```yaml
constraints:

  skill_id: steps
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: steps
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Steps and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Each step item should have a meaningful label
- `aria-current="step"` on the active step item
- When `readOnly={false}`, each clickable step is a `<button>` or `<a>` with an accessible name and `aria-current`
- Screen readers should announce the current step and total steps
- Navigation buttons (Back/Next) are separate from the Steps component and must have accessible names

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
    - Spinner
    - TabView
    - TertiaryNavigation

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Steps
```

---

# Validation Rules

```yaml
validation_rules:

  - id: steps_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: steps_storybook_api
    description: Implement Steps using PrimeReact Steps per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: steps_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Steps from Storybook.
**Severity:** High


---

# Component Decision Logic

**User completes: Configure → Preview → Download (3 ordered steps):**
→ Steps with `activeIndex` controlled, `readOnly={true}`, Back/Next buttons.

**User switches freely between Metadata, Tags, Activity:**
→ Not Steps. Use TabView (equal sibling sections, not sequential).

**Export job is 45% complete:**
→ Not Steps. Use ProgressBar.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Steps (Steps) per Storybook.
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

- ProgressBar (progress as a percentage, not steps)
- Spinner (indeterminate loading, not a workflow indicator)
- TabView (equal-weight sibling sections, not sequential steps)
- TertiaryNavigation (non-linear navigation with statuses)

---
