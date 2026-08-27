---
name: dropdown
description: "Use when implementing Dropdown for single-item selection from a list. Trigger on: dropdowns, single select, \"select from list\", option pickers, or any field where the user chooses one value from a predefined set."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Dropdown

---

# Component Metadata

```yaml
component: Dropdown
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Dropdown

category:
  - overlay
  - feedback

intent_tags:
  - dropdown
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to select a single value from a list of options. A dropdown keeps the UI compact by hiding the options until the user opens it, making it suitable for long lists or forms where space is limited.

In RelativityOne, Dropdown is used for selecting a workspace, a field type, a saved search, a sort option, a status, or any single-value selection from a defined list.

### Purpose

Single-item selection from a list of options. The selected value is displayed in the trigger; the full list appears in an overlay on click. Supports editable mode (free text + options), read-only display, and disabled state.

### Storybook Component

Use the `Dropdown` component (under Form Inputs & Controls). Built on PrimeReact Dropdown. For use with a label, use `DropdownField` (preferred). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-dropdown--docs`

### Props

| Prop | Type | Description |
|---|---|---|
| `options` | `array` | Selectable options |
| `value` | `any` | Selected value |
| `onChange` | `function` | Callback when selection changes |
| `optionLabel` | `string` | Property name to display from option object |
| `placeholder` | `string` | Text shown when no value is selected |
| `editable` | `boolean` | Allow free text in addition to selecting from options |
| `disabled` | `boolean` | Disables the dropdown |
| `readOnly` | `boolean` | Displays selected value as plain text |

### Related Components

- MultiSelect (multiple selections from a list)
- RadioButton (single selection; use when ≤ 5 options and all should be visible at once)
- CascadeSelect (hierarchical options with nested levels)
- DropdownField (preferred — pre-composed with FormField)

---

# When to Use

1. **Single selection from a long list** — Choose a workspace, field, status, or type from many options.
2. **Compact single select** — When a RadioButton list would take too much space (typically 5+ options).
3. **Editable select** — Use `editable={true}` when users can type a custom value in addition to selecting from options.
4. **Form field with label** — Always use `DropdownField` in forms.

---

# When NOT to Use

1. Multiple selections needed → use MultiSelect.
2. 2–4 options and space allows → use RadioButton (always visible, faster to scan).
3. Hierarchical options → use CascadeSelect.
4. Selecting from a list with moving items between two groups → use PickList.

| Situation | Use Instead |
|---|---|
| Multiple selections | MultiSelect |
| 2–4 mutually exclusive options | RadioButton |
| Hierarchical options | CascadeSelect |
| Dual-list transfer | PickList |

---

# Decision Triggers

```yaml
decision_triggers:

  use_dropdown_if:
    - Choose a workspace, field, status, or type from many options.
    - When a RadioButton list would take too much space (typically 5+ options).
    - Use `editable={true}` when users can type a custom value in addition to selecting from options.
    - Always use `DropdownField` in forms.

  do_not_use_dropdown_if:
    - 1. Multiple selections needed → use MultiSelect.
    - 2. 2–4 options and space allows → use RadioButton (always visible, faster to scan).
    - 3. Hierarchical options → use CascadeSelect.
    - 4. Selecting from a list with moving items between two groups → use PickList.
    - | Situation | Use Instead |
    - | Multiple selections | MultiSelect |
```

---

# Additional Topics

# Editable Mode

Set `editable={true}` when users should be able to type a custom value not in the list — for example, entering a custom export format or a specific version number. The typed value is returned alongside selections from the list.

---

# Preferred Usage: DropdownField

```tsx
<DropdownField
  label="Field type"
  options={fieldTypes}
  value={selectedType}
  onChange={(e) => setSelectedType(e.value)}
  optionLabel="name"
  placeholder="Select a type"
  required
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

  skill_id: dropdown
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: dropdown
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Dropdown and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Use `DropdownField` or associate with a `<label>` via `inputId` + `<label htmlFor>`
- `aria-invalid="true"` when invalid
- Keyboard: Enter/Space opens; arrow keys navigate; Enter selects; Escape closes
- Selected value must be announced when dropdown closes

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
    - RadioButton
    - CascadeSelect
    - DropdownField

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Dropdown
```

---

# Validation Rules

```yaml
validation_rules:

  - id: dropdown_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: dropdown_storybook_api
    description: Implement Dropdown using PrimeReact Dropdown per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: dropdown_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Dropdown from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Dropdown when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Dropdown (Dropdown) per Storybook.
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

- MultiSelect (multiple selections from a list)
- RadioButton (single selection; use when ≤ 5 options and all should be visible at once)
- CascadeSelect (hierarchical options with nested levels)
- DropdownField (preferred — pre-composed with FormField)

---
