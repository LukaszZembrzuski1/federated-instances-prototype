---
name: form-field
description: "Use when implementing FormField, the standard wrapper for individual form inputs. Trigger on: form fields with labels, labeled inputs, form fields with validation, required fields, fields with contextual help, or any single input that needs a label and error state."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# FormField

---

# Component Metadata

```yaml
component: FormField
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: FormField

category:
  - form
  - input

intent_tags:
  - form_field
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Every form input needs a consistent label, validation message, and optional contextual help. Without a wrapper, developers implement these differently each time — inconsistent alignment, missing accessibility attributes, and varying error patterns. FormField standardises the layout for any single input component.

### Purpose

Wrap any input component with a label, optional validation message, and optional contextual help tooltip. Provides consistent left or top label alignment, loading states, readonly mode, and proper accessibility associations.

### Storybook Component

Use the `FormField` component (under Form Inputs & Controls). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-formfield--docs`

**Ready-to-use field components** (FormField pre-composed with a specific input):
- `CalendarField`, `CascadeSelectField`, `DropdownField`, `InputNumberField`, `InputSwitchField`, `InputTextField`, `InputTextareaField`, `MultiSelectField`, `ReadOnlyField`

Prefer these ready-to-use variants when available. Use base `FormField` only when wrapping a custom or unsupported input.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label text |
| `input*` | `ReactNode` | — | Any input component |
| `labelPosition` | `'left'\|'top'` | `'left'` | Label position |
| `labelWidth` | `string` | `'200px'` | Width of the label column |
| `labelStrictWidth` | `boolean` | `true` | Enforce strict label width |
| `required` | `boolean` | `false` | Shows required indicator |
| `valid` | `boolean` | `true` | When `false` + `validationMessage`, shows error state |
| `validationMessage` | `string` | — | Error message (shown when `valid={false}`) |
| `errorMessageId` | `string` | — | ID for ARIA error association |
| `contextualHelp` | `ReactNode` | — | Tooltip content next to the label |
| `readOnly` | `boolean` | `false` | Switches to read-only display |
| `disabled` | `boolean` | `false` | Disables the field |
| `isLoading` | `boolean` | `false` | Shows Skeleton placeholder |
| `additionalContent` | `ReactNode` | — | Extra content below input and validation message |

### Related Components

- FormFieldset (wrapper for groups of inputs, e.g., radio buttons)
- ValidationMessage (the error component FormField uses internally)
- ReadOnlyField (pre-composed read-only variant)

---

# When to Use

Use FormField for every individual input that needs a label. This includes text inputs, dropdowns, calendars, number inputs, switches, and custom inputs.

Use the ready-to-use `*Field` variants (e.g., `InputTextField`) instead of composing FormField manually when they cover your use case.

---

# When NOT to Use

1. A group of related inputs (radio buttons, checkboxes) → use FormFieldset instead.
2. A display-only value with a label → use ReadOnlyField.
3. An input with no label (hidden label) → still use FormField with `label` and hide it visually with `aria-label` on the input — do not omit the label entirely.

---

# Decision Triggers

```yaml
decision_triggers:

  use_form_field_if:
    - Use FormField for every individual input that needs a label. This includes text inputs, dropdowns, calendars, number inputs, switches, and custom inputs.
    - Use the ready-to-use `*Field` variants (e.g., `InputTextField`) instead of composing FormField manually when they cover your use case.

  do_not_use_form_field_if:
    - 1. A group of related inputs (radio buttons, checkboxes) → use FormFieldset instead.
    - 2. A display-only value with a label → use ReadOnlyField.
    - 3. An input with no label (hidden label) → still use FormField with `label` and hide it visually with `aria-label` on the input — do not omit the label entirely.
```

---

# Additional Topics

# Label Position

- **Left (default):** label and input on the same row. Label width defaults to `200px`. Use for dense forms where vertical space matters.
- **Top:** label above the input. Use for simpler forms or when labels are long.

Align `labelPosition` consistently across all fields in a form — do not mix left and top within the same form group.

---

# Validation Pattern

```
valid={false}
validationMessage="Email is required"
errorMessageId="email-error"
```

Pass the same `errorMessageId` to your input's `aria-errormessage` prop for proper screen reader association. The `FormField` renders the ValidationMessage component internally when `valid={false}` and `validationMessage` is set.

---

# Loading State

Set `isLoading={true}` to replace the input with a Skeleton placeholder. Use this while the form data is fetching — prevents layout shift when the real value loads.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between FormField rows: `16px`
- Label width (left position): `200px` default; adjust with `labelWidth` using consistent values across the form
- Gap between label and input (left position): follows label width; input fills remaining space

---

# Constraints

```yaml
constraints:

  skill_id: form-field
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
  label_required_for_inputs: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: form-field
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact FormField and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- FormField automatically connects the label to the input via `htmlFor` / `id`
- When `valid={false}`, the ValidationMessage is shown and should be linked via `errorMessageId` → `aria-errormessage` on the input
- The input should have `aria-invalid="true"` when `valid={false}`
- `contextualHelp` renders as a Tooltip icon next to the label — its content must be meaningful without requiring the tooltip to be open

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
    - FormFieldset
    - ValidationMessage
    - ReadOnlyField

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - FormField
```

---

# Validation Rules

```yaml
validation_rules:

  - id: form-field_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: form-field_storybook_api
    description: Implement FormField using PrimeReact FormField per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: form-field_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using raw input components without FormField — loses consistent label alignment and error handling.
**Severity:** Medium

## Anti-pattern 2
**Problem:** Mixing `labelPosition` values within the same form — creates visual misalignment.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Setting `validationMessage` but not `valid={false}` — the message won't show.
**Severity:** Medium

## Anti-pattern 4
**Problem:** Not passing `errorMessageId` to the input — ARIA error association is broken.
**Severity:** Medium


---

# Component Decision Logic

**Default:** Use FormField when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: FormField (FormField) per Storybook.
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

- FormFieldset (wrapper for groups of inputs, e.g., radio buttons)
- ValidationMessage (the error component FormField uses internally)
- ReadOnlyField (pre-composed read-only variant)

---
