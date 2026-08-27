---
name: validation-message
description: "Use when implementing ValidationMessage for field-level error display. Trigger on: form field errors, validation failures, required field messages, or any red error text shown below or near an input. Note: ValidationMessage is a custom component, not based on PrimeReact."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# ValidationMessage

---

# Component Metadata

```yaml
component: ValidationMessage
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: ValidationMessage

category:
  - form
  - input

intent_tags:
  - validation_message
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Form fields need a consistent, accessible way to display validation errors — required field, invalid format, server-side rejection. ValidationMessage provides a standardised red error indicator with an icon and message text that appears when a field fails validation.

### Purpose

Display a validation error message with a red error icon. Shown or hidden via the `showMessage` prop; supports custom icon override.

### Storybook Component

Use the custom `ValidationMessage` component (under Form Inputs & Controls). Not based on PrimeReact — custom implementation. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-validationmessage--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `showMessage*` | `boolean` | `true` | Whether to display the message |
| `message*` | `ReactNode` | — | The validation error text |
| `className` | `string` | — | Additional CSS class names |
| `style` | `CSSProperties` | — | Inline styles |
| `icon` | `RelativityIcons` | `StatusError` | Override the default error icon |

Valid `RelativityIcons` values are defined by the design system; see the **icons** skill and the [Icons Storybook docs](https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%96%BC%EF%B8%8Fimages-icons-icons--docs).

### Relationship to FormField

In practice, ValidationMessage is rarely used standalone. Use it through `FormField` or `FormFieldset` via their `validationMessage` and `valid` props — these components handle placement and accessibility associations automatically. Only use ValidationMessage directly when building a custom layout outside FormField.

### Related Components

- FormField (wrapper that manages label, input, and ValidationMessage together)
- FormFieldset (wrapper for groups of inputs)
- Message (block-level feedback — use for page-level summaries)

---

# When to Use

1. **Field validation errors** — "This field is required," "Invalid email format," "Name already in use."
2. **Server-side field errors** — After form submission, showing backend validation failures per field.
3. **Conditional error display** — `showMessage={false}` hides it initially; set to `true` when validation fails.

---

# When NOT to Use

1. Form-wide summary errors → use Message (block-level).
2. Warnings or informational hints that are not errors → use a hint text or Tooltip.
3. Non-form feedback → use Toast or Message.

---

# Decision Triggers

```yaml
decision_triggers:

  use_validation_message_if:
    - \"This field is required,\" \"Invalid email format,\" \"Name already in use.\"
    - After form submission, showing backend validation failures per field.
    - `showMessage={false}` hides it initially; set to `true` when validation fails.

  do_not_use_validation_message_if:
    - 1. Form-wide summary errors → use Message (block-level).
    - 2. Warnings or informational hints that are not errors → use a hint text or Tooltip.
    - 3. Non-form feedback → use Toast or Message.
```

---

# Behavioral Rules

1. Set `showMessage={false}` initially and switch to `true` when validation fails — do not pre-render with an empty message.
2. Message text must be specific and actionable ("Email is required" not "Invalid").
3. Clear the message (`showMessage={false}`) when the user corrects the field.
4. Associate the message with the input via `aria-errormessage` on the input and a matching `id` on the ValidationMessage element — `FormField` handles this automatically via its `errorMessageId` prop.

---

# Layout and Placement

ValidationMessage appears directly below the associated input field, within the same FormField wrapper.

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between input and ValidationMessage: `4px`
- Margin below ValidationMessage before next form element: `8px`
- Icon and text aligned on the same baseline with `4px` gap

---

# Constraints

```yaml
constraints:

  skill_id: validation-message
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: validation-message
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact ValidationMessage and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- The input must have `aria-invalid="true"` when the error is shown
- The input must have `aria-errormessage` pointing to the ValidationMessage element's `id`
- When using `FormField`, pass `errorMessageId` and `valid={false}` — the wrapper handles ARIA associations
- Error message text must be in the DOM when shown — do not rely on color alone

**Common mistakes:**
- Input not associated with message — missing `aria-errormessage`
- `aria-invalid` not set on the input when error is shown
- Generic message text ("Invalid") — be specific

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
    - FormFieldset
    - Message

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - ValidationMessage
```

---

# Validation Rules

```yaml
validation_rules:

  - id: validation-message_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: validation-message_storybook_api
    description: Implement ValidationMessage using PrimeReact ValidationMessage per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: validation-message_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact ValidationMessage from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use ValidationMessage when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: ValidationMessage (ValidationMessage) per Storybook.
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

- FormField (wrapper that manages label, input, and ValidationMessage together)
- FormFieldset (wrapper for groups of inputs)
- Message (block-level feedback — use for page-level summaries)

---
