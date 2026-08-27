---
name: modal-input
description: "Use when implementing ModalInput for displaying a read-only value with a Select button that opens a modal for complex value selection. Trigger on: picker inputs, modal selectors, fields where the user clicks Select to open a dialog with a DataTable, Tree, PickList, or MultiSelect for choosing a value."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# ModalInput

---

# Component Metadata

```yaml
component: ModalInput
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Relativity UI (code-only; no Aero v3 Figma component — composes ConfirmDialog + read-only display)
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: ModalInput

category:
  - form
  - input

intent_tags:
  - modal_input
  - relativity_ui

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview

### Problem

Some form fields need complex selection that cannot fit in a dropdown — choosing from a DataTable, a Tree, a PickList, or a MultiSelect with filtering. ModalInput provides a read-only display of the current value with "Select" and "Clear" buttons, opening a ConfirmDialog where the user makes their selection and confirms with "Accept" or cancels.

In RelativityOne, ModalInput is used for selecting documents, fields, user roles, saved searches, and other entities that require a browsable or searchable selection interface.

### Purpose

Display a read-only value with Select / Clear actions. The Select button opens a ConfirmDialog containing custom content (any React node) where the user picks a value. On Accept, the value is committed; on Cancel, the draft is discarded.

### Storybook Component

Use the `ModalInput` component (under Form Inputs & Controls). For use with a label in forms, use `ModalInputField` (pre-composed with FormField). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-modalinput--docs`

### Props (ModalInput)

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `T \| null` | — | Current committed value |
| `modalContent` | `(draft: T \| undefined, setDraft: (v: T \| undefined) => void) => ReactNode` | — | Render function for the dialog body; receives draft value and setter |
| `onAccept` | `(value: T \| undefined) => void` | — | Called with the draft value when user confirms |
| `onClear` | `MouseEventHandler` | — | Called when Clear button is clicked |
| `onOpen` | `MouseEventHandler` | — | Called when Select button is clicked |
| `onCancel` | `() => void` | — | Called when user cancels the dialog |
| `formatter` | `(value: T \| null \| undefined) => string` | — | Formats value for display in the read-only area |
| `valueComparator` | `(a: T, b: T) => boolean` | — | Custom equality check for non-primitive values |
| `readOnly` | `boolean` | — | Hides Select/Clear buttons; shows read-only text |
| `disabled` | `boolean` | — | Disables Select/Clear buttons |
| `defaultValue` | `string` | `'-'` | Placeholder when readOnly and no value |
| `inputId` | `string` | auto | Stable id for the read-only value element |
| `pt` | `ModalInputPassThroughOptions` | — | Pass-through props for `dialog`, `selectButton`, `clearButton` |

### ModalInputField Props

`ModalInputField` wraps `ModalInput` with `FormField` for form integration. Accepts all `ModalInput` props plus:

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Field label |
| `labelPosition` | `'left'\|'top'` | Label position |
| `required` | `boolean` | Shows required indicator |
| `valid` | `boolean` | Controls validation state |
| `validationMessage` | `string` | Error message |

### Related Components

- Dropdown (simple single-select — use when options are few and don't need a modal)
- MultiSelect (multi-select without modal — use when options are manageable in a dropdown)
- ReadOnlyField (display-only — use when no selection action is needed)
- FormField (label wrapper — ModalInputField uses this internally)

---

# When to Use

1. **Complex entity selection** — Selecting from a large DataTable of documents, users, or workspaces.
2. **Tree-based selection** — Choosing nodes from a hierarchical Tree structure.
3. **PickList-based selection** — Moving items between available and selected lists.
4. **Multi-select with filtering** — When a simple MultiSelect dropdown is too constrained.

---

# When NOT to Use

1. Simple selection from a short list → use Dropdown or MultiSelect.
2. Date or time selection → use Calendar or DateRangeField.
3. Free text input → use InputText.
4. Boolean toggle → use InputSwitch or Checkbox.

| Situation | Use Instead |
|---|---|
| Short option list | Dropdown |
| Date/time | Calendar |
| Free text | InputText |
| Yes/no toggle | InputSwitch |

---

# Decision Triggers

```yaml
decision_triggers:

  use_modal_input_if:
    - Selection requires browsing a large dataset (DataTable)
    - Selection requires navigating a tree hierarchy
    - Selection involves moving items between lists (PickList)
    - The selection UI is too complex for a dropdown
    - User must confirm selection explicitly (Accept/Cancel)

  do_not_use_modal_input_if:
    - Short list of options → use Dropdown
    - Date or time → use Calendar
    - Free text → use InputText
    - Boolean → use InputSwitch or Checkbox
```

---

# Additional Topics

# Draft Pattern

ModalInput uses a **draft pattern**: when the modal opens, the current value is copied into a draft. The user modifies the draft via `setDraft` in the `modalContent` render function. On Accept, the draft is committed via `onAccept`. On Cancel, the draft is discarded and reverted to the original value.

This prevents partial or invalid selections from being committed to the form.

# Dialog Customization

The internal ConfirmDialog can be customized via `pt.dialog`:

```tsx
<ModalInput
  pt={{
    dialog: { header: 'Select Documents', style: { width: '800px' } },
    selectButton: { label: 'Browse' },
    clearButton: { label: 'Reset' },
  }}
  modalContent={(draft, setDraft) => <MySelector value={draft} onChange={setDraft} />}
/>
```

---

# Behavioral Rules

1. Always provide a `formatter` for non-string values — the read-only display must be human-readable.
2. The dialog is non-closable and non-draggable by default — users must choose Accept or Cancel.
3. Use `valueComparator` for complex objects (Map, Set, non-primitive arrays) where reference equality is insufficient.
4. Clear button only appears when the value is non-empty (checked via `hasValue` utility).

---

# Layout and Placement

ModalInput renders inline as a row: read-only value | Select button | Clear button. In forms, use `ModalInputField` for consistent label alignment with other form fields.

## Spacing Rules

**Design system sources:** ModalInput is a code-only composite component — Storybook is the sole source of truth. Its child components (ConfirmDialog, buttons) have Aero v3 Figma counterparts individually.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between buttons: `8px`
- Gap between value display and buttons: `8px`

---

# Constraints

```yaml
constraints:

  skill_id: modal-input
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: false
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: modal-input
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact ConfirmDialog and this skill's sections
```

**Additional accessibility notes:**

- The read-only value has an `id` for label association via `inputId`
- Select and Clear buttons are keyboard-accessible (Enter/Space)
- The ConfirmDialog receives focus when opened and traps focus
- Accept/Cancel buttons have accessible labels (localized via i18n)

**Common mistakes:**
- Missing `formatter` for complex objects — screen readers read "[object Object]"
- No `inputId` for label association when used with a custom label

---

# Relationship Mapping

```yaml
relationships:

  companions:
    default:
      - FormField
      - ConfirmDialog

  substitutes:
    see_related_components:
    - Dropdown
    - MultiSelect
    - ReadOnlyField

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - ModalInput
      - ModalInputField
```

---

# Validation Rules

```yaml
validation_rules:

  - id: modal-input_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: modal-input_storybook_api
    description: Implement ModalInput per Storybook — verify props, ref API, and dialog behavior
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: modal-input_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Using ModalInput for simple selections
**Problem:** ModalInput adds a modal step. For short option lists, a Dropdown is faster and simpler.
**Severity:** Medium

## Missing formatter for complex values
**Problem:** Without a formatter, complex objects display as "[object Object]" in the read-only area.
**Severity:** High

## Not providing a dialog header
**Problem:** The ConfirmDialog opens without context. Always set `pt.dialog.header`.
**Severity:** Medium

---

# Component Decision Logic

**User selects documents from a large list with filtering:**
→ ModalInput with DataTable inside `modalContent`.

**User picks user roles from a short list:**
→ Not a ModalInput. Use MultiSelect dropdown.

**User selects fields to include using a dual-list pattern:**
→ ModalInput with PickList inside `modalContent`.

**User browses a folder tree to select documents:**
→ ModalInput with Tree inside `modalContent`.

---

# Example Scenarios

## Scenario — Document selection
User intent: Select documents from a large dataset with columns and filtering.
Recommended: ModalInput with DataTable inside modalContent.
Notes: Provide a `formatter` that shows document names. Use `pt.dialog.header` for clear context.

## Scenario — Field picker (dual list)
User intent: Move fields between Available and Selected lists.
Recommended: ModalInput with PickList inside modalContent.
Notes: Use `formatter` to join selected field names with commas.

## Scenario — Form integration
User intent: Use ModalInput as a labeled field in a form.
Recommended: ModalInputField with label, required, and validation props.
Notes: Aligns with FormField layout automatically.

---
