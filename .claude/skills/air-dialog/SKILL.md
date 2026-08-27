---
name: air-dialog
description: "Use when implementing AirDialog for aiR product confirmation dialogs. Trigger on: aiR feature confirmation dialogs, dialogs with an AirHeader, accept/reject dialogs in the aiR product context."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# AirDialog

---

# Component Metadata

```yaml
component: AirDialog
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: AirDialog

category:
  - overlay
  - feedback

intent_tags:
  - air_dialog
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

The aiR product needs confirmation dialogs that match its branding — using AirHeader as the dialog header instead of a standard title. AirDialog wraps PrimeReact ConfirmDialog with optional AirHeader rendering and consistent accept/reject button labelling.

### Purpose

Confirmation dialog built on PrimeReact ConfirmDialog, with optional AirHeader integration for aiR product branding. Provides accept and reject actions with custom labels.

### Storybook Component

Use the `AirDialog` component (under Air Components). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADair-components-airdialog--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | — | Message body text |
| `airHeader` | `boolean` | `false` | Enable AirHeader rendering in the dialog |
| `airHeaderContent` | `ReactNode` | — | Content rendered inside AirHeader |
| `acceptLabel` | `string` | — | Label for the accept button |
| `rejectLabel` | `string` | — | Label for the reject button |
| `visible` | `boolean` | — | Whether the dialog is visible |
| `modal` | `boolean` | — | Whether the dialog is modal |
| `onHide` | `function` | — | Callback to hide the dialog |
| `accept` | `function` | — | Callback for accept action |
| `reject` | `function` | — | Callback for reject action |
| `closable` | `boolean` | — | Whether the dialog can be closed via × button |

### Related Components

- AirHeader (the branding header component used inside AirDialog)
- ConfirmDialog (standard confirmation dialog without aiR branding)
- Dialog [Modal] (general purpose modal)

---

# When to Use

Use AirDialog specifically in the **aiR product context** when a confirmation dialog needs to display AirHeader branding. For standard (non-aiR) confirmation dialogs, use ConfirmDialog.

---

# When NOT to Use

1. Non-aiR confirmation dialogs → use ConfirmDialog.
2. Dialogs needing form input → use Dialog [Modal].
3. Dialogs with custom content beyond a message and accept/reject → use Dialog [Modal].

---

# Decision Triggers

```yaml
decision_triggers:

  use_air_dialog_if:
    - Use AirDialog specifically in the **aiR product context** when a confirmation dialog needs to display AirHeader branding. For standard (non-aiR) confirmation dialogs, use ConfirmDialog.

  do_not_use_air_dialog_if:
    - 1. Non-aiR confirmation dialogs → use ConfirmDialog.
    - 2. Dialogs needing form input → use Dialog [Modal].
    - 3. Dialogs with custom content beyond a message and accept/reject → use Dialog [Modal].
```

---

# Behavioral Rules

1. Always provide explicit `acceptLabel` and `rejectLabel` — avoid generic "Yes" / "No" when context makes the action clear (e.g., "Confirm Analysis" / "Cancel").
2. Set `airHeader={true}` and provide `airHeaderContent` only when the aiR branding is appropriate for the context.
3. Default focus should land on the reject/cancel option when the accept action is irreversible.

---

# Constraints

```yaml
constraints:

  skill_id: air-dialog
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
  focus_management_required: true
  escape_dismissal_document_in_storybook: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: air-dialog
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact AirDialog and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Inherits ConfirmDialog accessibility: `role="alertdialog"`, focus management, Escape to close
- `acceptLabel` and `rejectLabel` must be descriptive enough to be understood by screen reader users without visual context

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
    - AirHeader
    - ConfirmDialog
    - Dialog [Modal]

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - AirDialog
```

---

# Validation Rules

```yaml
validation_rules:

  - id: air-dialog_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: air-dialog_storybook_api
    description: Implement AirDialog using PrimeReact AirDialog per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: air-dialog_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact AirDialog from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use AirDialog when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: AirDialog (AirDialog) per Storybook.
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
