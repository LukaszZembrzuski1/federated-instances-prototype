---
name: paginator
description: "Use when implementing the Paginator component for navigating large datasets across pages. Trigger on: pagination controls, page navigation, rows per page selector, next/previous page, or any dataset split across multiple pages."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Paginator

---

# Component Metadata

```yaml
component: Paginator
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Paginator

category:
  - data
  - display

intent_tags:
  - paginator
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Large datasets cannot be shown all at once without degrading performance and usability. A paginator breaks the dataset into pages and gives users controls to navigate between them, see their position, and optionally change how many rows appear per page.

### Purpose

Navigate a paginated dataset. Displays page links, previous/next controls, optional rows-per-page selector, and current page report. Built on PrimeReact Paginator.

### Storybook Component

Use the `Paginator` component (under Navigation). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADnavigation-paginator--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `first` | `number` | — | Index of the first record on the current page (0-based) |
| `rows` | `number` | — | Number of rows per page |
| `totalRecords` | `number` | — | Total number of records in the dataset |
| `rowsPerPageOptions` | `number[]` | — | Options for rows-per-page selector (e.g., `[10, 25, 50]`) |
| `pageLinkSize` | `number` | — | Number of page number links to display |
| `template` | `string` | — | Layout template for paginator elements |
| `currentPageReportTemplate` | `string` | — | Template string for current page report (e.g., `"{first}-{last} of {totalRecords}"`) |
| `onPageChange` | `function` | — | Callback when page or rows changes |

### Related Components

- DataTable (most common parent — has built-in paginator integration)
- Toolbar [Action Bar] (paginator is often placed in a toolbar)
- Spinner / Skeleton (loading state while page data fetches)

---

# When to Use

Use Paginator whenever a dataset has more items than fit comfortably in a single view. Always pair with a data component (DataTable, Tree, custom list) that respects `first` and `rows` to slice the dataset.

---

# When NOT to Use

1. Small datasets that fit on one screen → no pagination needed.
2. Infinite scroll patterns → Paginator is not designed for append-on-scroll; use virtual scrolling instead.
3. Step-by-step user flows → use Steps.

---

# Decision Triggers

```yaml
decision_triggers:

  use_paginator_if:
    - Use Paginator whenever a dataset has more items than fit comfortably in a single view. Always pair with a data component (DataTable, Tree, custom list) that respects `first` and `rows` to slice the da

  do_not_use_paginator_if:
    - 1. Small datasets that fit on one screen → no pagination needed.
    - 2. Infinite scroll patterns → Paginator is not designed for append-on-scroll; use virtual scrolling instead.
    - 3. Step-by-step user flows → use Steps.
```

---

# Additional Topics

# Placement

Paginator is typically placed:
- **Below a DataTable** — as part of the table's footer
- **In a Toolbar [Action Bar]** — when pagination controls need to share space with other actions
- **Above and below** — for very long lists where users may page from either end

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Margin above paginator (when below a table): `8px`
- Internal control spacing: follows token scale

---

# Behavioral Rules

1. `first` and `rows` together define the current page slice — pass both to your data fetching logic.
2. Always provide `totalRecords` so the paginator can calculate total pages and display accurate page report text.
3. Use `rowsPerPageOptions` when users benefit from choosing their own page size (e.g., power users reviewing long lists).
4. On page change, scroll the data view back to the top.

---

# Constraints

```yaml
constraints:

  skill_id: paginator
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: paginator
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Paginator and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Page links must be `<button>` or `<a>` elements with accessible names ("Page 1", "Page 2", "Next page", "Previous page")
- Current page should have `aria-current="page"`
- Rows-per-page selector must be labelled ("Rows per page")
- Page change should not move focus unexpectedly — keep focus on the paginator control that was activated

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
    - Toolbar [Action Bar]
    - Spinner / Skeleton

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Paginator
```

---

# Validation Rules

```yaml
validation_rules:

  - id: paginator_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: paginator_storybook_api
    description: Implement Paginator using PrimeReact Paginator per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: paginator_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Paginator from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Paginator when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Paginator (Paginator) per Storybook.
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

- DataTable (most common parent — has built-in paginator integration)
- Toolbar [Action Bar] (paginator is often placed in a toolbar)
- Spinner / Skeleton (loading state while page data fetches)

---
