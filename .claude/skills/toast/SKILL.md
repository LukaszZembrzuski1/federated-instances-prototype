---
name: toast
description: "Use when implementing Toast or notification components. Trigger on: toasts, notifications, success messages, error feedback, transient status messages, background job completion, or non-blocking feedback after an action."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Toast

---

# Component Metadata

```yaml
component: Toast
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Toast

category:
  - overlay
  - feedback

intent_tags:
  - toast
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need immediate, non-blocking feedback after an action completes—such as a save, delete, or background job—without interrupting their workflow. A toast provides a short-lived message that appears temporarily and dismisses automatically or on user action.

In RelativityOne, toasts confirm document tagging, search completion, workspace changes, admin actions, and export or processing status so users can continue working without waiting on a blocking dialog.

### Purpose

Display transient feedback (success, error, warning, or info) that does not require user acknowledgment and disappears after a short time or on dismiss.

### User Goal

- Confirm that an action completed successfully
- Learn that an operation failed or was restricted
- See progress or status without stopping their work

### Interaction Type

- Display information
- Confirm actions (indirect feedback)

### PrimeReact Component

Use the PrimeReact `Toast` component. Storybook is the reference for props and API: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html`

### Related Components

- Message (persistent, block-level)
- ValidationMessage (field-level)
- ConfirmDialog (requires user choice)
- Modal (blocking acknowledgment)

---

# When to Use

1. **Action confirmation** — "Document tagged," "Search saved," or "Workspace setting updated" after the user completes an action.
2. **Background operation completion** — "Export queued" or "Indexing started" so the user can continue working.
3. **Non-blocking errors** — Validation failure on save or permission denied, when the user can correct and retry without leaving the page.
4. **Info or warning that does not require a decision** — "Session will expire in 5 minutes" or "New version available."

---

# When NOT to Use

1. When the user must read and acknowledge the message before continuing → use Modal or ConfirmDialog.
2. For critical errors requiring immediate action or navigation → use Modal or a dedicated error page.
3. For long or multi-line content that needs reading time → use Message.
4. When the same feedback is already shown inline next to a field → use ValidationMessage.

| Situation | Use Instead |
|---|---|
| Must acknowledge message | Modal or ConfirmDialog |
| Critical error requiring action | Modal or dedicated error page |
| Inline validation or field-level feedback | ValidationMessage |
| Persistent or dense status | Message |

---

# Decision Triggers

```yaml
decision_triggers:

  use_toast_if:
    - \"Document tagged,\" \"Search saved,\" or \"Workspace setting updated\" after the user completes an action.
    - \"Export queued\" or \"Indexing started\" so the user can continue working.
    - Validation failure on save or permission denied, when the user can correct and retry without leaving the page.
    - \"Session will expire in 5 minutes\" or \"New version available.\"

  do_not_use_toast_if:
    - 1. When the user must read and acknowledge the message before continuing → use Modal or ConfirmDialog.
    - 2. For critical errors requiring immediate action or navigation → use Modal or a dedicated error page.
    - 3. For long or multi-line content that needs reading time → use Message.
    - 4. When the same feedback is already shown inline next to a field → use ValidationMessage.
    - | Situation | Use Instead |
    - | Must acknowledge message | Modal or ConfirmDialog |
```

---

# Additional Topics

# Component Variants

### Success Toast
Confirm that an action completed. Use cases: document tagged, search saved, workspace setting updated.

### Error Toast
Surface a failure without blocking the UI. Use cases: save failed, permission denied, export failed.

### Warning / Info Toast
Inform of non-critical conditions. Use cases: session expiry notice, background job started, feature reminder.

---

# Component States

- Visible (showing message)
- Dismissing (fade out animation)
- Hidden

New toasts may push or replace previous ones depending on product rules. Focus is not moved to the toast — it is non-intrusive.

---

# Behavioral Rules

1. Auto-dismiss after a short duration (typically 3–5 seconds) unless the message communicates an error requiring attention.
2. Do not stack many toasts — queue them or consolidate into a summary.
3. Keep message text short; one line is ideal.
4. Always provide a way to dismiss (close icon) for all toasts.

---

# Layout and Placement

## Placement

Toasts appear in a fixed corner of the viewport (top-right is standard), above main content but not covering primary UI or navigation.

## Common Patterns

- Single line of text with optional icon
- Optional action link (e.g., "Undo") for reversible actions
- Stacked or queued when multiple toasts are triggered in sequence

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Margin from viewport edges: `16px` minimum on all sides
- Gap between stacked toasts: `8px`
- Internal padding: `12px` vertical, `16px` horizontal
- Do not cover critical UI (primary actions, navigation, or open modals)

---

# Constraints

```yaml
constraints:

  skill_id: toast
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: toast
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Toast and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- `role="status"` for success/info — polite announcement
- `role="alert"` for errors — interrupts assistive technology
- `aria-live` region so screen readers announce new toasts
- Keep text concise and self-contained — it must make sense when read aloud without visual context

**Common mistakes:**
- Using only color or icon to convey severity without text or role
- Auto-dismissing too quickly for screen reader users to hear (minimum 3 seconds for short messages)
- Missing `aria-live` or role so toasts are never announced
- No dismiss control for keyboard users when the toast contains an action

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
    - Message / ValidationMessage
    - Modal
    - ConfirmDialog

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Toast
```

---

# Validation Rules

```yaml
validation_rules:

  - id: toast_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: toast_storybook_api
    description: Implement Toast using PrimeReact Toast per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: toast_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using toasts for information the user must read and acknowledge — use Modal or Message.
**Severity:** Medium

## Anti-pattern 2
**Problem:** Long text or multiple actions in a single toast.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Relying on toasts as the only feedback for critical errors.
**Severity:** Medium

## Anti-pattern 4
**Problem:** Firing many toasts in quick succession without consolidation.
**Severity:** Medium


---

# Component Decision Logic

**User saves a workspace setting and should continue working:**
→ Toast (success). Optionally ValidationMessage near the save control if layout allows.

**User triggers a destructive action and must confirm:**
→ Not a Toast. Use ConfirmDialog or Modal.

**User submits a form and server validation fails:**
→ Toast for a short summary message, or ValidationMessage per field if errors are tied to specific fields.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Toast (Toast) per Storybook.
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

**Used with:** Button (triggering actions), DataTable (row action feedback), Form (submit feedback)

**Confused with:**
- Message / ValidationMessage — persistent, inline; not transient
- Modal — blocking, requires acknowledgment
- ConfirmDialog — requires an explicit user choice
