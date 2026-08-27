---
name: radio-button
description: "Use when implementing RadioButton for mutually exclusive single selection. Trigger on: radio buttons, choose one from a set, mutually exclusive options, or any selection where choosing one automatically deselects others."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# RadioButton

---

# Component Metadata

```yaml
component: RadioButton
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: RadioButton

category:
  - form
  - input

intent_tags:
  - radio_button
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to choose exactly one option from a fixed set — a view mode, a priority level, a format — where selecting one deselects the others.

### Purpose

Mutually exclusive single selection from a group. Checking one radio automatically unchecks the others in the same `name` group. Supports invalid state and read-only display.

### Storybook Component

Use the `RadioButton` component (under Form Inputs & Controls). Built on PrimeReact RadioButton. Sub-components: `RadioButtonInput` (with label), `RadioButtonGroup` (pre-composed FormFieldset — preferred for forms). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-radiobutton--docs`

> **Note:** PrimeReact does not currently support an error icon for radio buttons in invalid state — only the border turns red.

### Props

| Prop | Type | Description |
|---|---|---|
| `checked` | `boolean` | Whether this radio is selected |
| `onChange` | `function` | Change event handler |
| `inputId` | `string` | Unique id (for label association) |
| `name` | `string` | Radio group name — all radios with same name are mutually exclusive |
| `value` | `any` | Value associated with this radio |
| `disabled` | `boolean` | Disables this radio |
| `invalid` | `boolean` | Invalid state styling |
| `readOnly` | `boolean` | Displays selected state as plain text |
| `label` | `string` | Label shown in read-only mode |

### Related Components

- RadioButtonGroup (preferred — pre-composed FormFieldset + RadioButtons)
- Checkbox (multi-select — multiple options can be selected)
- InputSwitch (binary on/off)
- Dropdown (single select from many options, 5+)

---

# When to Use

1. **Choose one from 2–5 options** — "Small / Medium / Large," "Yes / No," "High / Medium / Low."
2. **Configuration settings** — A single value from a defined set of choices.
3. **Coding or classification** — Selecting one code value from a controlled vocabulary.

---

# When NOT to Use

1. Multiple options can be selected → use Checkbox.
2. Binary on/off setting → use InputSwitch.
3. More than 5–6 options → use Dropdown.
4. A single action → use Button.

---

# Decision Triggers

```yaml
decision_triggers:

  use_radio_button_if:
    - \"Small / Medium / Large,\" \"Yes / No,\" \"High / Medium / Low.\"
    - A single value from a defined set of choices.
    - Selecting one code value from a controlled vocabulary.

  do_not_use_radio_button_if:
    - 1. Multiple options can be selected → use Checkbox.
    - 2. Binary on/off setting → use InputSwitch.
    - 3. More than 5–6 options → use Dropdown.
    - 4. A single action → use Button.
```

---

# Additional Topics

# Preferred Usage: RadioButtonGroup

Use `RadioButtonGroup` for all form use cases — it handles FormFieldset wrapping, layout, and validation automatically.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between radio and its label: `8px`
- Gap between radio items (vertical): `8px`
- Gap between radio items (horizontal): `16px`

---

# Constraints

```yaml
constraints:

  skill_id: radio-button
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: radio-button
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact RadioButton and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- All radios in a group must share the same `name` prop
- Wrap in `FormFieldset` or use `RadioButtonGroup` for shared `<legend>`
- `inputId` + `<label htmlFor>` on each radio
- Arrow keys navigate within a group; Tab moves focus outside the group

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
    - RadioButtonGroup
    - Checkbox
    - InputSwitch
    - Dropdown

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - RadioButton
```

---

# Validation Rules

```yaml
validation_rules:

  - id: radio-button_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: radio-button_storybook_api
    description: Implement RadioButton using PrimeReact RadioButton per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: radio-button_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact RadioButton from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use RadioButton when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: RadioButton (RadioButton) per Storybook.
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

- RadioButtonGroup (preferred — pre-composed FormFieldset + RadioButtons)
- Checkbox (multi-select — multiple options can be selected)
- InputSwitch (binary on/off)
- Dropdown (single select from many options, 5+)

---
