---
name: input-number
description: "Use when implementing InputNumber for numeric input fields. Trigger on: number fields, quantity inputs, min/max constrained numbers, currency fields, percentage inputs, or any field where the user enters a numeric value."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# InputNumber

---

# Component Metadata

```yaml
component: InputNumber
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: InputNumber

category:
  - form
  - input

intent_tags:
  - input_number
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to enter numeric values — quantities, prices, percentages — with optional min/max constraints, increment/decrement controls, and formatting. A plain text input allows invalid values; InputNumber enforces numeric input and can display formatted values.

### Purpose

Numeric input with optional min/max/step constraints, increment/decrement buttons, and mode-based formatting (decimal, currency). Supports read-only and disabled states.

### Storybook Component

Use the `InputNumber` component (under Form Inputs & Controls). Built on PrimeReact InputNumber. For use with a label, use `InputNumberField` (preferred). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-inputnumber--docs`

### Props

| Prop | Type | Description |
|---|---|---|
| `value` | `number` | Current value |
| `onChange` | `function` | Change event handler |
| `placeholder` | `string` | Placeholder text |
| `min` | `number` | Minimum allowed value |
| `max` | `number` | Maximum allowed value |
| `step` | `number` | Increment/decrement step |
| `showButtons` | `boolean` | Show +/− increment buttons |
| `buttonLayout` | `'stacked'\|'horizontal'\|'vertical'` | Button layout when shown |
| `mode` | `string` | Formatting mode (decimal, currency) |
| `disabled` | `boolean` | Disables the input |
| `invalid` | `boolean` | Invalid state styling |
| `readOnly` | `boolean` | Displays value as plain text |

### Related Components

- InputText (plain text — use only if numeric validation is not needed)
- InputNumberField (preferred — pre-composed with FormField)

---

# When to Use

1. **Quantities** — Document count, page count, batch size.
2. **Constrained ranges** — Percentage (0–100), priority level (1–5).
3. **Currency or decimal** — Price, rate, score with formatted display.
4. **Stepper** — Any value users adjust up/down in increments (use `showButtons`).

---

# When NOT to Use

1. Free text that happens to be numeric (ID, code) → use InputText.
2. A value selected from a fixed set → use Dropdown or RadioButton.

---

# Decision Triggers

```yaml
decision_triggers:

  use_input_number_if:
    - Document count, page count, batch size.
    - Percentage (0–100), priority level (1–5).
    - Price, rate, score with formatted display.
    - Any value users adjust up/down in increments (use `showButtons`).

  do_not_use_input_number_if:
    - 1. Free text that happens to be numeric (ID, code) → use InputText.
    - 2. A value selected from a fixed set → use Dropdown or RadioButton.
```

---

# Additional Topics

# Preferred Usage: InputNumberField

```tsx
<InputNumberField
  label="Batch size"
  value={batchSize}
  onChange={(e) => setBatchSize(e.value)}
  min={1}
  max={1000}
  showButtons
/>
```

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between stacked form fields: `16px`

---

# Constraints

```yaml
constraints:

  skill_id: input-number
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
  component_skill: input-number
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact InputNumber and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Use `InputNumberField` or associate with a `<label>` via `inputId` + `<label htmlFor>`
- `aria-invalid="true"` when `invalid={true}`
- Increment/decrement buttons must have accessible names ("+", "−" or "Increase", "Decrease")
- Screen reader announces current value when it changes

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
    - InputText
    - InputNumberField

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - InputNumber
```

---

# Validation Rules

```yaml
validation_rules:

  - id: input-number_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: input-number_storybook_api
    description: Implement InputNumber using PrimeReact InputNumber per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: input-number_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact InputNumber from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use InputNumber when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: InputNumber (InputNumber) per Storybook.
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

- InputText (plain text — use only if numeric validation is not needed)
- InputNumberField (preferred — pre-composed with FormField)

---
