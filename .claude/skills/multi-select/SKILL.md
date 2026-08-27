---
name: multi-select
description: "Use when implementing MultiSelect for selecting multiple items from a dropdown list. Trigger on: multi-select, select multiple, filter by multiple values, tag picker from a list, or any field where the user can choose several options from a dropdown."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# MultiSelect

---

# Component Metadata

```yaml
component: MultiSelect
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: MultiSelect

category:
  - form
  - input

intent_tags:
  - multi_select
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to select multiple values from a list — multiple tags, multiple fields, multiple workspaces — in a compact space. MultiSelect provides a dropdown that lets users pick several items, showing selected values as chips in the trigger.

### Purpose

Multiple-item selection from a list. Selected values appear in the trigger area; the full list opens on click. Supports read-only display, list height limit, and max label count.

### Storybook Component

Use the `MultiSelect` component (under Form Inputs & Controls). Built on PrimeReact MultiSelect. For use with a label, use `MultiSelectField` (preferred). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-multiselect--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `array` | — | Selectable options |
| `value` | `array` | — | Array of selected values |
| `onChange` | `function` | — | Callback when selection changes |
| `optionLabel` | `string` | — | Property name to display from option object |
| `placeholder` | `string` | — | Text when nothing selected |
| `listMaxHeight` | `string\|number` | `'200px'` | Max height of the options list |
| `maxSelectedLabels` | `number` | — | Max labels to show before collapsing to count |
| `readOnly` | `boolean` | — | Displays selected values as plain text |

### Related Components

- Dropdown (single selection only)
- Checkbox group (multi-select; use when all options should always be visible, ≤ 8 items)
- Chips (free-form multi-value input without a predefined list)
- MultiSelectField (preferred — pre-composed with FormField)

---

# When to Use

1. **Multiple selections from a long list** — Select multiple tags, fields, groups, or statuses from many options.
2. **Filter by multiple values** — "Show documents tagged with any of: [Tag1] [Tag2] [Tag3]."
3. **Space-efficient multi-select** — When a visible checkbox list would be too tall.

---

# When NOT to Use

1. Only one value can be selected → use Dropdown.
2. Short list (≤ 8 items) that should always be visible → use Checkbox group.
3. User enters free-form values not from a list → use Chips.

| Situation | Use Instead |
|---|---|
| Single selection | Dropdown |
| Short visible list (≤ 8) | Checkbox group |
| Free-form values | Chips |

---

# Decision Triggers

```yaml
decision_triggers:

  use_multi_select_if:
    - Select multiple tags, fields, groups, or statuses from many options.
    - \"Show documents tagged with any of: [Tag1] [Tag2] [Tag3].\"
    - When a visible checkbox list would be too tall.

  do_not_use_multi_select_if:
    - 1. Only one value can be selected → use Dropdown.
    - 2. Short list (≤ 8 items) that should always be visible → use Checkbox group.
    - 3. User enters free-form values not from a list → use Chips.
    - | Situation | Use Instead |
    - | Single selection | Dropdown |
    - | Short visible list (≤ 8) | Checkbox group |
```

---

# Additional Topics

# Preferred Usage: MultiSelectField

```tsx
<MultiSelectField
  label="Tags"
  options={availableTags}
  value={selectedTags}
  onChange={(e) => setSelectedTags(e.value)}
  optionLabel="name"
  placeholder="Select tags"
/>
```

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between stacked form fields: `16px`
- Option item padding: `8px` vertical, `16px` horizontal

---

# Constraints

```yaml
constraints:

  skill_id: multi-select
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: multi-select
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact MultiSelect and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Use `MultiSelectField` or associate with a `<label>`
- `aria-invalid="true"` when invalid
- Selected items should be announced when added/removed
- Keyboard: Enter/Space opens; arrow keys navigate; Space toggles selection; Escape closes

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
    - Checkbox group
    - Chips
    - MultiSelectField

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - MultiSelect
```

---

# Validation Rules

```yaml
validation_rules:

  - id: multi-select_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: multi-select_storybook_api
    description: Implement MultiSelect using PrimeReact MultiSelect per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: multi-select_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact MultiSelect from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use MultiSelect when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: MultiSelect (MultiSelect) per Storybook.
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

- Dropdown (single selection only)
- Checkbox group (multi-select; use when all options should always be visible, ≤ 8 items)
- Chips (free-form multi-value input without a predefined list)
- MultiSelectField (preferred — pre-composed with FormField)

---
