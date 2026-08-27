---
name: checkbox
description: "Use when implementing Checkbox for multi-selection or standalone boolean fields. Trigger on: checkboxes, multi-select within a list, \"select all\", accept terms, or any boolean field where the user can check or uncheck an option independently of others."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Checkbox

---

# Component Metadata

```yaml
component: Checkbox
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Checkbox

category:
  - form
  - input

intent_tags:
  - checkbox
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to select one or more options from a set independently — each choice does not affect the others. A checkbox lets users check or uncheck each option freely, unlike radio buttons where only one can be selected.

In RelativityOne, checkboxes are used for multi-select in filter lists, "Select all" in document tables, accepting terms, enabling optional features, and any field where multiple values can be true simultaneously.

### Purpose

Boolean input — checked or unchecked. Used standalone (single boolean) or in groups (multi-select). Supports read-only display, invalid state, and a `CheckboxInput` sub-component for label association.

### Storybook Component

Use the `Checkbox` component (under Form Inputs & Controls). Built on PrimeReact Checkbox. For use with a label, use `CheckboxInput`. For groups, wrap in `FormFieldset`. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-checkbox--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked*` | `boolean` | — | Whether the checkbox is checked |
| `onChange` | `function` | — | Change event handler |
| `inputId` | `string` | — | Unique id (for label association) |
| `name` | `string` | — | Name of the input element |
| `value` | `any` | — | Value associated with this checkbox |
| `trueValue` | `any` | — | Value when checked |
| `falseValue` | `any` | — | Value when unchecked |
| `disabled` | `boolean` | — | Disables the checkbox |
| `invalid` | `boolean` | — | Invalid state styling |
| `readOnly` | `boolean` | — | Read-only state |
| `readOnlyTrueValue` | `string` | `'Yes'` | Text shown when checked in read-only mode |
| `readOnlyFalseValue` | `string` | `'No'` | Text shown when unchecked in read-only mode |

### Related Components

- RadioButton (mutually exclusive — only one can be selected from the group)
- InputSwitch (binary on/off persistent setting — use for a single toggle, not a group)
- MultiSelect (multi-selection from a dropdown — use when the list is long or space is limited)
- Dropdown (single selection from a dropdown — use when the option list is too long for radio buttons)
- FormFieldset (wrapper for Checkbox groups with shared legend)
- DataTable (select-all checkbox in table header)

---

# When to Use

1. **Multi-select from a visible list** — Select multiple tags, fields, or categories when the full list should always be visible (typically ≤ 8 options).
2. **Standalone boolean** — "Accept terms," "Enable notifications," "Include attachments."
3. **Select all / partial selection** — DataTable header checkbox for selecting all or some rows.

---

# When NOT to Use

1. Only one option can be selected from a set → use RadioButton.
2. Binary on/off persistent setting → use InputSwitch.
3. Many options (8+) where visible list would be too long → use MultiSelect (multiple) or Dropdown (single).
4. A single action to trigger → use Button.

| Situation | Use Instead |
|---|---|
| Mutually exclusive options | RadioButton |
| Binary on/off setting | InputSwitch |
| Many options, single select | Dropdown |
| Many options, multiple select | MultiSelect |
| Trigger an action | Button |

---

# Decision Triggers

```yaml
decision_triggers:

  use_checkbox_if:
    - Select multiple tags, fields, or categories when the full list should always be visible (typically ≤ 8 options).
    - \"Accept terms,\" \"Enable notifications,\" \"Include attachments.\"
    - DataTable header checkbox for selecting all or some rows.

  do_not_use_checkbox_if:
    - 1. Only one option can be selected from a set → use RadioButton.
    - 2. Binary on/off persistent setting → use InputSwitch.
    - 3. Many options (8+) where visible list would be too long → use MultiSelect (multiple) or Dropdown (single).
    - 4. A single action to trigger → use Button.
    - | Situation | Use Instead |
    - | Mutually exclusive options | RadioButton |
```

---

# Additional Topics

# Read-Only Mode

Set `readOnly={true}` to display the value as plain text ("Yes" / "No") instead of a checkbox control. Customise via `readOnlyTrueValue` and `readOnlyFalseValue`.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between checkbox and its label: `8px`
- Gap between checkbox items (vertical): `8px`
- Gap between checkbox items (horizontal): `16px`

---

# Behavioral Rules

1. Always associate with a visible label via `inputId` + `<label htmlFor>`, or use `CheckboxInput`.
2. In a group, wrap in `FormFieldset` with a shared legend.
3. The "Select all" checkbox must use `aria-checked="mixed"` when some but not all items are selected.
4. Disabled checkboxes must remain visible and communicate their state.

---

# Constraints

```yaml
constraints:

  skill_id: checkbox
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: checkbox
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Checkbox and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Use `inputId` + `<label htmlFor>` or `CheckboxInput`
- Group in `FormFieldset` (`<fieldset>` + `<legend>`) for proper group labelling
- `aria-invalid="true"` on invalid checkboxes
- Indeterminate "select all": `aria-checked="mixed"` + `indeterminate` DOM property
- Space toggles a focused checkbox; Tab moves between checkboxes

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
    - RadioButton
    - InputSwitch
    - MultiSelect
    - Dropdown
    - FormFieldset
    - DataTable

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Checkbox
```

---

# Validation Rules

```yaml
validation_rules:

  - id: checkbox_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: checkbox_storybook_api
    description: Implement Checkbox using PrimeReact Checkbox per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: checkbox_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Checkbox from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Checkbox when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Checkbox (Checkbox) per Storybook.
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

- RadioButton (mutually exclusive — only one can be selected from the group)
- InputSwitch (binary on/off persistent setting — use for a single toggle, not a group)
- MultiSelect (multi-selection from a dropdown — use when the list is long or space is limited)
- Dropdown (single selection from a dropdown — use when the option list is too long for radio buttons)
- FormFieldset (wrapper for Checkbox groups with shared legend)
- DataTable (select-all checkbox in table header)

---
