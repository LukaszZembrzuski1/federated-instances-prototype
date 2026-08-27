---
name: button
description: "Use when implementing Button or IconButton components. Trigger on: primary, secondary, tertiary, or danger (destructive) buttons; save/cancel actions; destructive actions needing confirmation; icon-only buttons; loading states; button groups in forms, toolbars, or modal footers."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Button

---

# Component Metadata

```yaml
component: Button
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Button

category:
  - action
  - confirmation

intent_tags:
  - trigger_action
  - submit_form
  - cancel_action
  - destructive_action
  - icon_only_action
  - loading_state

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview

### Problem

Users need to trigger an action — submit a form, run a search, save settings, cancel, or navigate — with a clear, clickable control. A button provides a labeled action with optional icon, styled by type (primary, secondary, tertiary, danger) and state (hover, focus, disabled, loading). Legacy **`negative`** severity exists as a deprecated alias; prefer **`danger`**.

In RelativityOne, buttons are used for Save/Cancel in forms, Run Search, Export, Tag documents, Add workspace, Delete (with confirm), and every primary and secondary action in document review, workspace config, admin, and search.

### Purpose

Trigger a single action on click or keyboard activation. Supports label, optional icon (left or right), and visual emphasis via type.

### User Goals

- Execute an action (save, run, delete, add)
- Cancel or dismiss
- Navigate (Link type only)

### PrimeReact Component

Use the PrimeReact `Button` component. For icon-only buttons, use `Button` with only an icon prop and an `aria-label`. Icon **names** for the button/icon font surface are covered in the **icons** skill and the Icons Storybook page. Reference: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html` — open Storybook and navigate to the Button docs for props, variants, and examples.

---

# When to Use

1. **Form submit or cancel** — Save workspace, Save search, Cancel in a modal or form.
2. **Primary action on a view** — Run Search, Export, Tag selected documents, Add document.
3. **Destructive action (with confirm)** — Delete workspace, Remove user, Reset config; always pair with Modal or ConfirmDialog.
4. **Secondary or tertiary actions** — Clear filters, View details, Edit.

---

# When NOT to Use

| Situation | Use Instead |
|---|---|
| On/off setting | InputSwitch |
| Pick one from 2–5 options | RadioButton |
| One trigger, multiple actions | SplitButton or Menu |
| Navigate to URL | Link |
| Overflow actions | Menu or Dropdown |
| Repeating row action | Button in row + Tooltip for icon-only |

---

# Decision Triggers

```yaml
decision_triggers:

  use_button_if:
    - user initiates a single, one-time action
    - user submits or saves data
    - user confirms or cancels a task
    - user triggers a process (search, export, run)
    - action requires explicit confirmation before executing

  do_not_use_button_if:
    - control represents an on/off persistent state → use InputSwitch
    - control selects one option from a fixed set → use RadioButton
    - interaction is purely navigational → use Link
    - one control exposes multiple actions → use SplitButton or Menu
```

---

# Component Types

### Primary

Main action on the page, form, or modal (Save, Run, Submit). Use **one primary per context**. Token: `$color-interactive` (`#1460AA`).

### Secondary

Supporting action with lower visual weight (Cancel, Clear, Back). Outlined style; border uses `$color-interactive`.

### Tertiary

Least prominent; for optional or low-priority actions alongside a primary or secondary. No border, minimal fill.

### Danger (destructive)

Destructive or irreversible action (Delete, Remove, Reset). Always pair with a confirmation step (Modal or ConfirmDialog). Token: `$color-alert` (`#BC3131`).

> **Figma / design language:** destructive controls are **Danger**. **relativity-ui:** use `severity="danger"` and **`ButtonDanger`** (or **`ButtonDelete`** for a fixed Delete label). **`severity="negative"`** and **`ButtonNegative`** are **deprecated** aliases — do not use them in new code. Do not invent a separate type name like "Destructive" in API or docs.

### Link

Inline navigation or very low-emphasis action. Renders as styled text link. Use only when the action is navigational or truly tertiary in context.

---

# Pre-built Variants (new in 3.0)

### ButtonDelete

A pre-configured destructive (**danger**) button with a fixed "Delete" label. Use instead of manually setting `severity="danger" label="Delete"`. Accepts all `ButtonProps` except `severity` and `label`.

```tsx
import { ButtonDelete } from 'relativity-ui'

<ButtonDelete onClick={handleDelete} />
<ButtonDelete onClick={handleDelete} loading={isDeleting} disabled={isDeleteDisabled} />
```

Always pair with a confirmation step (Modal, ConfirmDialog, or DialogDelete).

### ButtonCancel

A pre-configured Secondary button with a fixed "Cancel" label. Use instead of manually setting `severity="secondary" label="Cancel"`. Accepts all `ButtonProps` except `severity` and `label`.

```tsx
import { ButtonCancel } from 'relativity-ui'

<ButtonCancel onClick={handleCancel} />
```

Used as the dismiss action in dialogs (e.g. `DialogDelete`), form edit modes (`FormControlsEditMode`), and toolbars alongside primary/save actions.

---

# Sizes

| Size | Height | Padding | Icon button size | Use When |
|---|---|---|---|---|
| Default | `32px` | `16px` horizontal, `8px` vertical | `32×32px` | Standard forms, toolbars, modals |
| Small | `24px` | `12px` horizontal, `4px` vertical | `24×24px` | Dense UIs, table row actions, inline controls |

- Icon inside button: `16px`
- IconButton padding: `4px` all sides (small) / `8px` all sides (default)
- Border radius: `3px` on all buttons
- Buttons expand to fit content or fill their container — do not hardcode a fixed width (Wide sizing was removed from Aero v3 in December 2025)

---

# Component States

| State | Behavior |
|---|---|
| Default | Standard appearance |
| Hover | `$color-interactive-hover` (`#0D4F8F`) |
| Focus | Focus ring shadow; same color as hover |
| Disabled | Non-interactive; `$color-text-disabled` (`#96A3B6`); add Tooltip explaining why when reason is not obvious |
| Loading | Disables button, shows spinner; **update the label** to reflect progress (e.g. "Submitting…"); restore original label on completion |

Loading is a state, not a type. When a button enters loading, the user cannot interact with it — this prevents double submission. Restrict only the relevant button rather than disabling everything globally.

---

# Constraints

```yaml
constraints:

  max_primary_per_context: 1

  destructive_requires_confirmation: true

  icon_only_requires_aria_label: true
  icon_only_requires_tooltip: true

  min_gap_between_buttons_px: 8

  loading_state_requires_label_update: true

  no_fixed_width: true

  correct_destructive_type_name: danger  # Figma: Danger; code: danger / ButtonDanger; negative is deprecated
```

---

# Behavioral Rules

1. Label must describe the action ("Save workspace", not "Submit").
2. One primary button per context (form, modal, toolbar). Avoid competing primaries.
3. Destructive (**danger**) actions require confirmation — never trigger a destructive action on a single click.
4. Icon-only buttons must always have a Tooltip and an `aria-label`.
5. Avoid icon-only buttons for critical actions where a text label would reduce error risk.

---

# Layout and Placement

## Placement Contexts

- **Form footer** — Primary (Save) on the left, Secondary (Cancel) to its right
- **Modal footer** — right-aligned button group; within the group, primary is on the **left**, secondary (Cancel) is on the **right**
- **Toolbar** — primary or most important action first; others in descending order of priority
- **Table row actions** — tertiary or icon buttons; keep consistent position across all rows

## Spacing Rules

All gaps and padding must use Aero spacing tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`. Do not use arbitrary values.

- **Minimum gap between buttons in a group: `8px`** — required for WCAG AA touch target compliance
- IconButton at 24px: virtual 24px circle around each must not overlap; `8px` gap enforces this

---

# Accessibility Requirements

```yaml
accessibility_rules:
  element: button  # never div or span
  keyboard_accessible: true
  activates_on: [Enter, Space]
  tab_order: follows visual reading order
  focus_visible: required  # never remove focus outline without an equivalent indicator
  accessible_name_required: true  # visible label or aria-label for icon-only
  disabled_state: use disabled attribute or aria-disabled
  disabled_tooltip: required when reason is not obvious
  loading_state: announce via aria-live or aria-busy; update visible label
  color_contrast_minimum: WCAG_AA
```

**Common mistakes:**
- Clickable `<div>` with no role or keyboard support
- Icon-only button with no `aria-label` or Tooltip
- Disabled button with no explanation when reason is unclear
- Missing loading label update — screen reader users won't know the state changed

---

# Relationship Mapping

```yaml
relationships:

  companions:
    destructive_action:
      - ConfirmDialog
      - Modal
    form_submission:
      - Form
      - ValidationMessage
    icon_only:
      - Tooltip

  substitutes:
    on_off_state:
      - InputSwitch
    navigation:
      - Link
    select_one_option:
      - RadioButton

  containers:
    - Toolbar
    - Form
    - Modal

  variants:
    grouped_actions:
      - SplitButton
      - Menu
    prebuilt:
      - ButtonDelete
      - ButtonCancel
```

---

# Validation Rules

```yaml
validation_rules:

  - id: multiple_primary_buttons
    description: Only one primary button allowed per context
    condition: primary_buttons_in_context > 1
    severity: high
    enforcement: design_review

  - id: danger_without_confirmation
    description: Destructive (danger) actions must require confirmation
    condition: button_type == "danger" AND no_confirm_dialog
    severity: critical
    enforcement: blocking

  - id: wrong_destructive_type_name
    description: Prefer Figma **Danger** and code **`danger`** / **`ButtonDanger`**; do not invent "Destructive" as a component type name; avoid new uses of deprecated **`negative`**
    condition: button_type_named "Destructive" OR uses_deprecated_negative_in_new_code
    severity: high
    enforcement: blocking

  - id: icon_only_missing_label
    description: Icon-only buttons must have an aria-label and Tooltip
    condition: button_has_no_text AND (no_aria_label OR no_tooltip)
    severity: high
    enforcement: blocking

  - id: loading_without_label_update
    description: Loading state must update the visible button label
    condition: button_loading == true AND label_unchanged
    severity: medium
    enforcement: advisory

  - id: button_used_as_toggle
    description: Button should not be used for persistent on/off state
    condition: button_changes_persistent_state
    severity: medium
    enforcement: advisory

  - id: hardcoded_fixed_width
    description: Do not hardcode a fixed width — use container fill instead (Wide removed in Aero v3)
    condition: button_has_fixed_width
    severity: medium
    enforcement: advisory
```

---

# Anti-Patterns

## Treating Figma **Danger** as wrong or calling the code type "Negative" in new work
**Problem:** Design uses **Danger**; **relativity-ui** maps that to **`severity="danger"`** and **`ButtonDanger`**. Confusing agents or engineers with "Negative-only" guidance causes mismatches with the library and the global **design-system** skill.
**Severity:** High

## Using deprecated **`negative`** / **`ButtonNegative`** in new implementations
**Problem:** Aliases remain for backward compatibility but are deprecated; new screens should use **`danger`** / **`ButtonDanger`** / **`ButtonDelete`**.
**Severity:** Medium

## Multiple primary buttons in the same context
**Problem:** Creates decision conflict. Users cannot identify the main action.
**Severity:** High

## Destructive action without confirmation
**Problem:** Users may accidentally perform irreversible actions (delete, reset, remove).
**Severity:** Critical

## Loading state without updating the label
**Problem:** Screen reader users won't know the state changed. Visual users see a spinner with no context.
**Severity:** Medium

## Hardcoded fixed-width buttons
**Problem:** Wide sizing was removed in Aero v3 (December 2025). Use container fill instead.
**Severity:** Medium

## Using a `<div>` or `<span>` as a button
**Problem:** Breaks keyboard navigation and screen reader semantics.
**Severity:** Critical

## Icon-only button with no `aria-label` or Tooltip
**Problem:** Screen reader users and new users have no way to understand the action.
**Severity:** High

## Referencing SpeedDial as a related component
**Problem:** SpeedDial is not part of Aero v3.
**Severity:** Low

---

# Component Decision Logic

**User saves workspace settings:**
→ Primary (Save) + Secondary (Cancel). Standard form/modal pattern.

**User picks Export PDF / CSV / Native from one control:**
→ Not a Button. Use SplitButton or Dropdown — one trigger, multiple actions.

**User selects one of three view modes:**
→ Not a Button. Use RadioButton — picking one from a fixed set of options.

**User toggles "Compact view" on/off:**
→ Not a Button. Use InputSwitch — binary on/off state, not a triggered action.

**User deletes a workspace:**
→ Danger (**destructive**) button or **`ButtonDelete`**, always paired with a confirmation Modal or ConfirmDialog.

**User clicks an icon with no label:**
→ Requires both `aria-label` and Tooltip. Avoid for critical actions.

---

# Example Scenarios

## Scenario — Submit a Form
User intent: Save completed workspace settings.
Recommended: Primary Button ("Save workspace") + Secondary Button ("Cancel")
Notes: Primary left, Secondary right in form footer.

## Scenario — Delete a Workspace
User intent: Permanently remove a workspace.
Recommended: **`ButtonDelete`** or **`ButtonDanger`** → triggers ConfirmDialog → confirmed action
Notes: Never trigger delete on a single click. Use **`danger`** in code; **Danger** in Figma vocabulary.

## Scenario — Run Search with Async Operation
User intent: Execute a search that takes time.
Recommended: Primary Button with loading state
Notes: On click → disable button + show spinner + change label to "Searching…" → restore on complete.

## Scenario — Table Row Actions
User intent: Perform actions on an individual row (edit, delete).
Recommended: Tertiary Button or IconButton (small size)
Notes: Icon-only requires Tooltip + aria-label. Keep position consistent across all rows.

## Scenario — Toggle Compact View
User intent: Turn compact view on or off.
Recommended: InputSwitch — not a Button.
Notes: Persistent on/off state is not a triggered action.

---

# Related Components

**Used with:** Toolbar, Modal (footer actions), Form, ConfirmDialog, Tooltip (icon-only label)

**Confused with:**
- SplitButton — one default action + dropdown of additional actions
- Link — navigation, not an action trigger
- InputSwitch — on/off persistent state, not a one-time action
- RadioButton — selecting one option from a fixed set, not triggering an action
