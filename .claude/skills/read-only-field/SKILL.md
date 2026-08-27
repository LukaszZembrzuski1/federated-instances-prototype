---
name: read-only-field
description: "Use when implementing ReadOnlyField for displaying non-editable labeled values. Trigger on: read-only form fields, display-only values with labels, view modes of forms, or labeled data that should never be edited."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# ReadOnlyField

---

# Component Metadata

```yaml
component: ReadOnlyField
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: ReadOnlyField

category:
  - form
  - input

intent_tags:
  - read_only_field
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Forms often have a view mode where field values are displayed but not editable. Implementing this as plain text loses the label association and consistent alignment. ReadOnlyField provides a labeled read-only value using the same layout as FormField — consistent positioning, accessible label association, and optional contextual help.

### Purpose

Display a non-editable labeled value with consistent left or top label alignment. Based on FormField. Accessible via native `htmlFor` / `id` association.

### Storybook Component

Use the `ReadOnlyField` component (under Form Inputs & Controls). Based on FormField. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-readonlyfield--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label text |
| `value*` | `T` | — | Value to display |
| `formatter` | `(value: T) => string` | — | Transform value into display string |
| `defaultValue` | `string` | — | Shown when value is empty (e.g., "N/A") |
| `id` | `string` | — | Enables native label association via `htmlFor` |
| `aria-labelledby` | `string` | — | Use when `htmlFor` isn't available (e.g., with legends) |
| `labelPosition` | `'left'\|'top'` | `'left'` | Label position |
| `labelWidth` | `string` | `'200px'` | Width of the label column |
| `contextualHelp` | `ReactNode` | — | Tooltip next to the label |
| `name` | `string\|Path<TData>` | — | Form field name; when inside a FormStateContext, the value is read from form state automatically (new in 3.0) |
| `loading` | `boolean` | `false` | Shows Skeleton while value loads (new in 3.0) |
| `isLoading` | `boolean` | `false` | **Deprecated** — use `loading` instead |

### Related Components

- FormField (editable version with the same layout)
- FormFieldset (for grouped read-only values)

---

# When to Use

1. **Form view mode** — Displaying current values when the form is in read-only state (not being edited).
2. **Detail panels** — Labeled metadata values in a detail or summary view.
3. **Confirmation screens** — Showing user-entered values before final submission.
4. **Mixed forms** — Some fields editable, some read-only in the same layout.

---

# When NOT to Use

1. Editable fields → use FormField with the appropriate input.
2. A value with no label → use plain text or a definition list.
3. Many unlabeled values in a grid → use DataTable.

---

# Decision Triggers

```yaml
decision_triggers:

  use_read_only_field_if:
    - Displaying current values when the form is in read-only state (not being edited).
    - Labeled metadata values in a detail or summary view.
    - Showing user-entered values before final submission.
    - Some fields editable, some read-only in the same layout.

  do_not_use_read_only_field_if:
    - 1. Editable fields → use FormField with the appropriate input.
    - 2. A value with no label → use plain text or a definition list.
    - 3. Many unlabeled values in a grid → use DataTable.
```

---

# Additional Topics

# Formatter

Use `formatter` to transform raw values into display strings:
- Dates → formatted date strings
- Numbers → currency, percentages
- Booleans → "Yes" / "No"
- Empty values → handled by `defaultValue` (e.g., "N/A", "—")

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Match `labelWidth` to adjacent FormField components for alignment
- Gap between ReadOnlyField rows: `16px`

---

# Constraints

```yaml
constraints:

  skill_id: read-only-field
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: read-only-field
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact ReadOnlyField and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Provide `id` so the label can use `htmlFor` for native association. Screen readers announce: "Username, edit text, john.doe, read only"
- When using with a `<legend>` (inside FormFieldset), use `aria-labelledby` instead since legends don't support `htmlFor`
- `loading` renders a Skeleton — the label remains visible so the field is still identifiable while loading
- When inside a `FormStateContext`, the component inherits the form's loading state automatically; you can also override with the local `loading` prop

> **Deprecation note (3.0):** `isLoading` has been renamed to `loading`. Both work, but `isLoading` will be removed in a future major version.

### Form Integration (new in 3.0)

When `name` is provided and the component is inside a `FormStateContext`, `ReadOnlyField` reads its value directly from the form state via `getValues(name)`. The form's global loading state is also inherited. This avoids manually passing `value` in form view modes.

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

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - ReadOnlyField
```

---

# Validation Rules

```yaml
validation_rules:

  - id: read-only-field_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: read-only-field_storybook_api
    description: Implement ReadOnlyField using PrimeReact ReadOnlyField per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: read-only-field_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact ReadOnlyField from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use ReadOnlyField when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: ReadOnlyField (ReadOnlyField) per Storybook.
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

- FormField (editable version with the same layout)
- FormFieldset (for grouped read-only values)

---
