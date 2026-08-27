---
name: leaderboard
description: "Use when implementing the Leaderboard component for horizontal ranked data display. Trigger on: ranked metrics, reviewer statistics, summary data with units, horizontal scorecards, or any display of ranked items with labels and values."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Leaderboard

---

# Component Metadata

```yaml
component: Leaderboard
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Leaderboard

category:
  - data
  - display

intent_tags:
  - leaderboard
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Some views need to display a ranked set of items — reviewer statistics, scores, metrics — in a compact horizontal format where each item shows a label, a value with units, and optional secondary information. The Leaderboard component provides this specialised display with click-to-select, error states, and tooltip support.

### Purpose

Horizontal display of ranked items with label, value/units, optional secondary label, optional tooltip, and optional circle indicator. Items are clickable; clicking toggles an active state managed externally by the parent.

### Storybook Component

Use the `Leaderboard` component (under Data & Display). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADdata-display-leaderboard--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items*` | `LeaderboardItem[]` | — | Array of items to display |
| `onClickItem*` | `(item: LeaderboardItem) => void` | — | Callback when an item is clicked (toggles active state) |
| `className` | `string` | — | Additional CSS class names |

### LeaderboardItem shape

```ts
{
  id: string
  label: string
  units?: string | number
  secondaryLabel?: string
  tooltip?: string
  showCircle?: boolean
  error?: boolean
  errorMessage?: string
}
```

### Related Components

- DataTable (for tabular ranked data with sorting and row actions)
- Tag (for simpler labelled values without ranking context)
- Badge (for counts or status indicators)

---

# When to Use

1. **Reviewer statistics** — Show reviewers ranked by documents reviewed, with count as the unit.
2. **Summary metrics** — A set of KPIs or scores shown side by side in a compact horizontal band.
3. **Ranked comparisons** — Any scenario where a small set of items (typically 3–6) are compared by a numeric value.

---

# When NOT to Use

1. Many rows of data needing sorting and filtering → use DataTable.
2. A single metric with no ranking context → use a statistic or plain text with a label.
3. Non-ranked lists → use DataTable or a list component.

---

# Decision Triggers

```yaml
decision_triggers:

  use_leaderboard_if:
    - Show reviewers ranked by documents reviewed, with count as the unit.
    - A set of KPIs or scores shown side by side in a compact horizontal band.
    - Any scenario where a small set of items (typically 3–6) are compared by a numeric value.

  do_not_use_leaderboard_if:
    - 1. Many rows of data needing sorting and filtering → use DataTable.
    - 2. A single metric with no ranking context → use a statistic or plain text with a label.
    - 3. Non-ranked lists → use DataTable or a list component.
```

---

# Additional Topics

# Active State

Active state is **controlled externally** — the parent tracks which item is active. Clicking an item calls `onClickItem`; clicking an already-active item deactivates it. The active item shows a border and a close icon. The Leaderboard itself does not manage selection state internally.

---

# Error State

Set `error={true}` and `errorMessage` on an item to display it in an error state instead of its normal value. Use when data for that item is unavailable or failed to load.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between items: `16px`
- Item internal padding: `8px` vertical, `12px` horizontal

---

# Constraints

```yaml
constraints:

  skill_id: leaderboard
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: leaderboard
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Leaderboard and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Each item must be focusable and activatable via Enter/Space
- Active state should be communicated via `aria-pressed` on the item button
- Error items should communicate their error state to screen readers via `aria-label` or visible error text
- Tooltips on items must also be accessible via focus (not hover only)

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
    - DataTable
    - Tag
    - Badge

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Leaderboard
```

---

# Validation Rules

```yaml
validation_rules:

  - id: leaderboard_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: leaderboard_storybook_api
    description: Implement Leaderboard using PrimeReact Leaderboard per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: leaderboard_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Leaderboard from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Leaderboard when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Leaderboard (Leaderboard) per Storybook.
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

- DataTable (for tabular ranked data with sorting and row actions)
- Tag (for simpler labelled values without ranking context)
- Badge (for counts or status indicators)

---
