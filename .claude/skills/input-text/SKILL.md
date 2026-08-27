---
name: input-text
description: "Use when implementing InputText for single-line text input. Trigger on: text fields, name inputs, search fields, single-line free text, or any field where the user types a short plain-text value."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# InputText

---

# Component Metadata

```yaml
component: InputText
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: InputText

category:
  - form
  - input

intent_tags:
  - input_text
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to enter short plain-text values — names, titles, search terms, IDs — in a single-line field.

### Purpose

Single-line plain text input. Supports placeholder, disabled, invalid, and read-only states. Use within `InputTextField` for label and validation in forms.

### Storybook Component

Use the `InputText` component (under Form Inputs & Controls). Built on PrimeReact InputText. For use with a label, use `InputTextField` (preferred). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-inputtext--docs`

### Props

| Prop | Type | Description |
|---|---|---|
| `value` | `string` | Current value |
| `onChange` | `function` | Change event handler |
| `placeholder` | `string` | Placeholder text |
| `disabled` | `boolean` | Disables the input |
| `invalid` | `boolean` | Invalid state styling (red border) |
| `readOnly` | `boolean` | Displays value as plain text |
| `size` | `number` | Width in characters |

### Related Components

- InputTextarea (multi-line)
- InputNumber (numeric input)
- Editor (rich text)
- InputTextField (preferred — pre-composed with FormField)

---

# When to Use

1. **Short plain text** — Name, title, workspace name, email address.
2. **Search or filter field** — Inline search input.
3. **ID or code** — Single-line identifier.

---

# When NOT to Use

1. Multi-line text → use InputTextarea.
2. Numeric input → use InputNumber.
3. Formatted rich text → use Editor.
4. Fixed set of options → use Dropdown or RadioButton.

---

# Decision Triggers

```yaml
decision_triggers:

  use_input_text_if:
    - Name, title, workspace name, email address.
    - Inline search input.
    - Single-line identifier.

  do_not_use_input_text_if:
    - 1. Multi-line text → use InputTextarea.
    - 2. Numeric input → use InputNumber.
    - 3. Formatted rich text → use Editor.
    - 4. Fixed set of options → use Dropdown or RadioButton.
```

---

# Additional Topics

# Preferred Usage: InputTextField

Use `InputTextField` in forms — wraps InputText with FormField providing label, required indicator, and validation message:

```tsx
<InputTextField
  label="Workspace name"
  required
  value={name}
  onChange={(e) => setName(e.target.value)}
  valid={isValid}
  validationMessage="Name is required"
/>
```

Use bare `InputText` only for standalone search/filter inputs outside a form layout.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between stacked form fields: `16px`

---

# Constraints

```yaml
constraints:

  skill_id: input-text
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
  component_skill: input-text
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact InputText and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Always associate with a `<label>` — use `InputTextField` or `inputId` + `<label htmlFor>`
- `aria-invalid="true"` + `aria-errormessage` when `invalid={true}`
- `placeholder` is not an accessible label substitute

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
    - InputTextarea
    - InputNumber
    - Editor
    - InputTextField

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - InputText
```

---

# Validation Rules

```yaml
validation_rules:

  - id: input-text_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: input-text_storybook_api
    description: Implement InputText using PrimeReact InputText per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: input-text_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact InputText from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use InputText when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: InputText (InputText) per Storybook.
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

- InputTextarea (multi-line)
- InputNumber (numeric input)
- Editor (rich text)
- InputTextField (preferred — pre-composed with FormField)

---
