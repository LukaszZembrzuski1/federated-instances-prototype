---
name: input-textarea
description: "Use when implementing InputTextarea for multi-line text input. Trigger on: textarea, multi-line input, comment box, description field, notes field, or any field where the user types a longer plain-text value across multiple lines."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# InputTextarea

---

# Component Metadata

```yaml
component: InputTextarea
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: InputTextarea

category:
  - form
  - input

intent_tags:
  - input_textarea
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to enter longer plain-text content — descriptions, comments, notes, instructions — that may span multiple lines. A multi-line textarea gives them room to write and see the full content at once.

### Purpose

Multi-line plain text input. Supports placeholder, disabled, invalid, and read-only states. Use within `InputTextareaField` or `FormField` for label and validation in forms.

### Storybook Component

Use the `InputTextarea` component (under Form Inputs & Controls). Built on PrimeReact InputTextarea. For use with a label, use `InputTextareaField` (pre-composed with FormField). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-inputtextarea--docs`

### Props

| Prop | Type | Description |
|---|---|---|
| `value` | `string` | Current value |
| `onChange` | `function` | Change event handler |
| `placeholder` | `string` | Placeholder text |
| `disabled` | `boolean` | Disables the textarea |
| `invalid` | `boolean` | Invalid state styling |
| `readOnly` | `boolean` | Displays value as plain text |
| `rows` | `number` | Initial visible row count |
| `autoResize` | `boolean` | Grow height as user types |

### Related Components

- InputText (single-line)
- Editor (rich text with formatting toolbar)
- InputTextareaField (preferred — pre-composed with FormField)

---

# When to Use

1. **Descriptions and notes** — Workspace description, document note, annotation.
2. **Comments** — Review comment, feedback, explanation.
3. **Instructions or free text** — Search criteria notes, configuration instructions.
4. **Any multi-line plain text** — When line breaks and paragraph length matter but formatting (bold, italic) does not.

---

# When NOT to Use

1. Short single-line text → use InputText.
2. Formatted rich text (bold, lists, headings) → use Editor.
3. A fixed set of options → use Dropdown or RadioButton.

---

# Decision Triggers

```yaml
decision_triggers:

  use_input_textarea_if:
    - Workspace description, document note, annotation.
    - Review comment, feedback, explanation.
    - Search criteria notes, configuration instructions.
    - When line breaks and paragraph length matter but formatting (bold, italic) does not.

  do_not_use_input_textarea_if:
    - 1. Short single-line text → use InputText.
    - 2. Formatted rich text (bold, lists, headings) → use Editor.
    - 3. A fixed set of options → use Dropdown or RadioButton.
```

---

# Additional Topics

# Preferred Usage: InputTextareaField

Use `InputTextareaField` in forms for consistent label, required indicator, and validation:

```tsx
<InputTextareaField
  label="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  valid={isValid}
  validationMessage="Description is required"
/>
```

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between stacked form fields: `16px`
- Minimum height: `3–4 rows` (`rows={3}` or `rows={4}`) for comfortable text entry

---

# Constraints

```yaml
constraints:

  skill_id: input-textarea
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
  component_skill: input-textarea
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact InputTextarea and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Always associate with a `<label>` via `InputTextareaField` or `inputId` + `<label htmlFor>`
- `aria-invalid="true"` + `aria-errormessage` when invalid
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
    - InputText
    - Editor
    - InputTextareaField

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - InputTextarea
```

---

# Validation Rules

```yaml
validation_rules:

  - id: input-textarea_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: input-textarea_storybook_api
    description: Implement InputTextarea using PrimeReact InputTextarea per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: input-textarea_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact InputTextarea from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use InputTextarea when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: InputTextarea (InputTextarea) per Storybook.
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

- InputText (single-line)
- Editor (rich text with formatting toolbar)
- InputTextareaField (preferred — pre-composed with FormField)

---
