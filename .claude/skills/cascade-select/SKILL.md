---
name: cascade-select
description: "Use when implementing CascadeSelect for hierarchical option selection. Trigger on: nested dropdowns, hierarchical selects, country/region/city selectors, category/subcategory pickers, or any selection where options have a parent-child tree structure."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# CascadeSelect

---

# Component Metadata

```yaml
component: CascadeSelect
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: CascadeSelect

category:
  - form
  - input

intent_tags:
  - cascade_select
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Some selections have a hierarchy — continent → country → city, or category → subcategory → item. A flat dropdown can't represent this cleanly. CascadeSelect lets users navigate nested option groups by expanding each level inline, picking the leaf value.

### Purpose

Select a value from a hierarchical (nested) options tree. Each level expands on hover or click to reveal child options. Returns the selected leaf value.

### Storybook Component

Use the `CascadeSelect` component (under Form Inputs & Controls). Built on PrimeReact CascadeSelect. For use with a label, use `CascadeSelectField` (pre-composed with FormField). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-cascadeselect--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `array` | — | Hierarchical options tree |
| `optionLabel` | `string` | — | Property name for option display label |
| `optionGroupLabel` | `string` | — | Property name for group label |
| `optionGroupChildren` | `string` | — | Property name for children array |
| `value` | `any` | — | Currently selected leaf value |
| `onChange` | `function` | — | Callback when selection changes |
| `placeholder` | `string` | — | Placeholder text when no value selected |
| `disabled` | `boolean` | — | Disables the input |
| `readOnly` | `boolean` | — | Displays selected value as plain text |

### Related Components

- Dropdown (flat list; use when options are not hierarchical)
- MultiSelect (multiple selection from flat list)
- FormField / CascadeSelectField (wrapper with label)

---

# When to Use

1. **Geographic hierarchy** — Select continent → country → city or state.
2. **Category hierarchy** — Product category → subcategory → item.
3. **Organisational hierarchy** — Division → department → team.
4. **Any nested selection** — When options have 2+ levels of parent-child structure.

---

# When NOT to Use

1. Flat list of options with no hierarchy → use Dropdown.
2. Multiple selections from a flat list → use MultiSelect.
3. Hierarchy with more than 3 levels → consider a dedicated tree picker (Tree) for better usability.

| Situation | Use Instead |
|---|---|
| Flat option list | Dropdown |
| Multiple selections | MultiSelect |
| Deep hierarchy (4+ levels) | Tree |

---

# Decision Triggers

```yaml
decision_triggers:

  use_cascade_select_if:
    - Select continent → country → city or state.
    - Product category → subcategory → item.
    - Division → department → team.
    - When options have 2+ levels of parent-child structure.

  do_not_use_cascade_select_if:
    - 1. Flat list of options with no hierarchy → use Dropdown.
    - 2. Multiple selections from a flat list → use MultiSelect.
    - 3. Hierarchy with more than 3 levels → consider a dedicated tree picker (Tree) for better usability.
    - | Situation | Use Instead |
    - | Flat option list | Dropdown |
    - | Multiple selections | MultiSelect |
```

---

# Additional Topics

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

Use within FormField / CascadeSelectField for consistent label alignment and spacing.

---

# Behavioral Rules

1. Always set `optionLabel`, `optionGroupLabel`, and `optionGroupChildren` to match your data structure.
2. Use `placeholder` so users understand the field is interactive before selection.
3. Use `CascadeSelectField` (not bare CascadeSelect) when the field needs a label — it handles label, required indicator, and validation message automatically.
4. Use `readOnly` to display the selected value as plain text in view mode.

---

# Constraints

```yaml
constraints:

  skill_id: cascade-select
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: cascade-select
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact CascadeSelect and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- The trigger (dropdown button) must have an accessible name (via label in CascadeSelectField or explicit `aria-label`)
- Keyboard navigation: Enter/Space opens the dropdown; arrow keys navigate levels; Enter selects; Escape closes
- Screen readers should announce the selected value and the field label

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
    - Dropdown
    - MultiSelect
    - FormField / CascadeSelectField

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - CascadeSelect
```

---

# Validation Rules

```yaml
validation_rules:

  - id: cascade-select_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: cascade-select_storybook_api
    description: Implement CascadeSelect using PrimeReact CascadeSelect per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: cascade-select_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact CascadeSelect from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use CascadeSelect when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: CascadeSelect (CascadeSelect) per Storybook.
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

- Dropdown (flat list; use when options are not hierarchical)
- MultiSelect (multiple selection from flat list)
- FormField / CascadeSelectField (wrapper with label)

---
