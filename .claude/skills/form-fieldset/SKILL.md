---
name: form-fieldset
description: "Use when implementing FormFieldset for groups of related form inputs. Trigger on: radio button groups, checkbox groups, grouped form controls under a shared legend, or any set of inputs that belong to a single logical field."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# FormFieldset

---

# Component Metadata

```yaml
component: FormFieldset
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Fieldset

category:
  - form
  - input

intent_tags:
  - form_fieldset
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Groups of related inputs — radio buttons, checkboxes, linked dropdowns — need a shared legend, consistent layout, and group-level validation. FormFieldset provides this wrapper with the same standardised label/validation/help pattern as FormField, but for groups.

### Purpose

Wrap a group of related inputs with a legend, optional validation message, optional contextual help, and consistent vertical or horizontal layout. Used for RadioButtonGroup, checkbox groups, and other multi-input fields that share a label.

### Storybook Component

Use the `FormFieldset` component (under Form Inputs & Controls). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-formfieldset--docs`

**Ready-to-use variant:** `RadioButtonGroup` — a pre-composed FormFieldset with RadioButtons.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `legend` | `string` | — | Label text for the group |
| `labelPosition` | `'left'\|'top'` | `'left'` | Position of the legend |
| `legendWidth` | `string` | `'200px'` | Width of the legend column |
| `legendStrictWidth` | `boolean` | `true` | Enforce strict legend width |
| `required` | `boolean` | `false` | Shows required indicator |
| `valid` | `boolean` | `true` | When `false` + `validationMessage`, shows error state |
| `validationMessage` | `string` | — | Error message for the group |
| `contextualHelp` | `string` | — | Tooltip content next to the legend |
| `layout` | `'vertical'\|'horizontal'` | `'vertical'` | Layout of children |
| `readOnly` | `boolean` | `false` | Readonly mode |
| `displayValue` | `string` | — | Value shown in readonly mode |
| `disabled` | `boolean` | — | Disables all children |
| `isLoading` | `boolean` | `false` | Shows Skeleton placeholder |
| `additionalContent` | `ReactNode` | — | Extra content below the group |

### Related Components

- FormField (for single inputs)
- RadioButton / RadioButtonGroup (most common child)
- Checkbox / CheckboxGroup (common child)
- ValidationMessage (used internally for errors)

---

# When to Use

1. **Radio button groups** — Use `RadioButtonGroup` (pre-composed variant) or FormFieldset wrapping RadioButtons.
2. **Checkbox groups** — Multiple checkboxes that belong to a single logical question.
3. **Grouped controls** — Any set of related inputs sharing a label/legend (e.g., date range with From/To inputs).

---

# When NOT to Use

1. A single input → use FormField instead.
2. A full form section heading (not a label for a specific group) → use a heading element or Panel.

---

# Decision Triggers

```yaml
decision_triggers:

  use_form_fieldset_if:
    - Use `RadioButtonGroup` (pre-composed variant) or FormFieldset wrapping RadioButtons.
    - Multiple checkboxes that belong to a single logical question.
    - Any set of related inputs sharing a label/legend (e.g., date range with From/To inputs).

  do_not_use_form_fieldset_if:
    - 1. A single input → use FormField instead.
    - 2. A full form section heading (not a label for a specific group) → use a heading element or Panel.
```

---

# Additional Topics

# Layout Options

- **Vertical (default):** children stacked; use for radio/checkbox groups with 2+ options
- **Horizontal:** children on the same row; use for compact groups of 2–3 short options or for inline paired controls

Match `labelPosition` to the surrounding FormField components for consistent form alignment.

---

# Readonly Mode

Set `readOnly={true}` and `displayValue="Green"` to show the selected value as plain text. The component uses `aria-labelledby` to associate the legend with the displayed value so screen readers announce them together.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between FormFieldset rows (vertical layout): `8px`
- Gap between options (horizontal layout): `16px`
- Gap between FormFieldset and adjacent FormField: `16px`
- Legend width (left position): `200px` default — match `legendWidth` to `labelWidth` of adjacent FormFields

---

# Constraints

```yaml
constraints:

  skill_id: form-fieldset
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: form-fieldset
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Fieldset and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- FormFieldset renders as a `<fieldset>` with a `<legend>` — this is the correct semantic element for grouped inputs
- Screen readers announce the legend when focus enters each child input
- Group-level `validationMessage` should also be associated with the group via `aria-describedby` if needed
- In readonly mode, `aria-labelledby` connects the legend to the displayed value

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
    - FormField
    - RadioButton / RadioButtonGroup
    - Checkbox / CheckboxGroup
    - ValidationMessage

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Fieldset
```

---

# Validation Rules

```yaml
validation_rules:

  - id: form-fieldset_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: form-fieldset_storybook_api
    description: Implement FormFieldset using PrimeReact Fieldset per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: form-fieldset_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using FormField to wrap a group of radio buttons — use FormFieldset or RadioButtonGroup.
**Severity:** Medium

## Anti-pattern 2
**Problem:** Setting `displayValue` without `readOnly={true}` — the display value only shows in readonly mode.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Mixing `labelPosition` with adjacent FormFields — keep consistent across the form.
**Severity:** Medium


---

# Component Decision Logic

**Default:** Use FormFieldset when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: FormFieldset (Fieldset) per Storybook.
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

- FormField (for single inputs)
- RadioButton / RadioButtonGroup (most common child)
- Checkbox / CheckboxGroup (common child)
- ValidationMessage (used internally for errors)

---
