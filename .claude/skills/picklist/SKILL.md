---
name: picklist
description: "Use when implementing PickList for moving items between two lists. Trigger on: available/selected item lists, dual-list selection, move items between source and target, checkbox-based multi-selection with two lists, or any UI where users transfer items from one list to another."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# PickList

---

# Component Metadata

```yaml
component: PickList
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Picklist

category:
  - form
  - input

intent_tags:
  - picklist
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users sometimes need to select a subset of items from a larger pool by moving them between an "Available" list and a "Selected" list. A PickList provides this dual-list transfer UI — clearer than a MultiSelect when the distinction between available and selected needs to be persistent and visible.

### Purpose

Transfer items between a source list (Available) and a target list (Selected). Supports simple click-to-move, checkbox selection, and optional move-up/down controls within each list.

### Storybook Component

Use the `PickList` component (under Data & Display). Built on PrimeReact PickList. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADdata-display-picklist--docs`

### Variants

| Component | Use When |
|---|---|
| `PickList` | Full-featured with move controls between lists |
| `PickListSimple` | Streamlined without source/target move controls |
| `PickListWithCheckbox` | Checkbox-based selection before moving |

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `dataKey*` | `string` | — | Unique key property for items |
| `source` | `array` | — | Available items |
| `target` | `array` | — | Selected items |
| `sourceHeader` | `string` | `'Available'` | Header for the source list |
| `targetHeader` | `string` | `'Selected'` | Header for the target list |
| `showSourceControls` | `boolean` | — | Show reorder controls for source list |
| `showTargetControls` | `boolean` | — | Show reorder controls for target list |
| `onChange` | `function` | — | Callback when items move between lists |
| `breakpoint` | `string` | — | Breakpoint at which lists stack vertically |

### Related Components

- MultiSelect (single-panel multi-selection via dropdown; use when visual separation of available/selected is not needed)
- Checkbox / CheckboxGroup (for smaller sets where all options fit in a form)
- DataTable (for selected items that need more complex display)

---

# When to Use

1. **Permission or role assignment** — Move users into a "selected" group from a larger pool.
2. **Column or field selection** — Choose which fields or columns appear in a view.
3. **Ordered selection** — When the order of selected items matters (use `showTargetControls`).
4. **Large pool with explicit selection** — When a dropdown or checkbox list would be too long and the distinction between available and selected needs to persist visibly.

---

# When NOT to Use

1. Small fixed set of options (≤ 8) → use MultiSelect or Checkbox.
2. Single selection → use Dropdown or RadioButton.
3. Items that need rich row display with actions → use DataTable with row selection.

---

# Decision Triggers

```yaml
decision_triggers:

  use_picklist_if:
    - Move users into a \"selected\" group from a larger pool.
    - Choose which fields or columns appear in a view.
    - When the order of selected items matters (use `showTargetControls`).
    - When a dropdown or checkbox list would be too long and the distinction between available and selected needs to persist visibly.

  do_not_use_picklist_if:
    - 1. Small fixed set of options (≤ 8) → use MultiSelect or Checkbox.
    - 2. Single selection → use Dropdown or RadioButton.
    - 3. Items that need rich row display with actions → use DataTable with row selection.
```

---

# Additional Topics

# Variant Selection Guide

- **PickList** — Use when users need to move items one by one and optionally reorder
- **PickListSimple** — Use when source/target controls are not needed and a cleaner UI is preferred
- **PickListWithCheckbox** — Use when users select multiple items first and then move them in batch

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between the two lists: `16px`
- List item padding: `8px` vertical, `16px` horizontal
- List header padding: `8px` vertical, `16px` horizontal

---

# Constraints

```yaml
constraints:

  skill_id: picklist
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: picklist
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Picklist and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Both lists must have accessible labels (via `sourceHeader` / `targetHeader` or `aria-label`)
- Transfer buttons must have accessible names ("Move to Selected", "Move to Available")
- Keyboard: Tab to list, arrow keys to navigate items, Space to select, Enter to activate transfer button
- Selected items should have `aria-selected="true"`

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
    - MultiSelect
    - Checkbox / CheckboxGroup
    - DataTable

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Picklist
```

---

# Validation Rules

```yaml
validation_rules:

  - id: picklist_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: picklist_storybook_api
    description: Implement PickList using PrimeReact Picklist per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: picklist_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Picklist from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use PickList when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: PickList (Picklist) per Storybook.
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

- MultiSelect (single-panel multi-selection via dropdown; use when visual separation of available/selected is not needed)
- Checkbox / CheckboxGroup (for smaller sets where all options fit in a form)
- DataTable (for selected items that need more complex display)

---
