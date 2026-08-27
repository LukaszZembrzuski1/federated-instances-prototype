---
name: message
description: "Use when implementing block-level Message components for persistent feedback. Trigger on: form validation summaries, save or submit results, persistent errors, warnings, or info banners that stay visible until dismissed or the page changes."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Message

---

# Component Metadata

```yaml
component: Message
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Message

category:
  - data
  - display

intent_tags:
  - message
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to see important feedback in context—success, error, warning, or info—that stays visible until dismissed or they navigate away. A message is a block-level component with icon, text, and optional dismiss; more prominent than a toast and persistent in the layout.

In RelativityOne, messages are used for form validation summaries, save success confirmations, permission or license warnings, connection errors, and any block-level feedback in document review, workspace config, admin, or search.

### Purpose

Display a persistent block of feedback — success, error, warning, or info — with icon and text; optional close and optional actions (e.g., Retry).

### User Goal

- Read important feedback
- Dismiss when acknowledged (if dismissible)
- Act on error (retry, fix field) when actions are provided

### Interaction Type

- Display information
- Trigger actions (dismiss, retry)

### PrimeReact Component

Use the PrimeReact `Message` component. Storybook is the reference for props and API: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html`

### Related Components

- ValidationMessage (field-level feedback)
- Toast (transient, non-blocking)
- Modal (blocking acknowledgment)

---

# When to Use

1. **Form validation summary** — "Please fix the errors below" at the top of a form; stays until the user corrects or dismisses.
2. **Save or submit result** — "Workspace saved" at the top of a view when a more prominent, persistent confirmation is needed over a toast.
3. **Error requiring attention** — "Unable to load documents. Check your connection." with optional Retry; permission denied; license expired.
4. **Warning or info that should stay visible** — "This workspace will be archived in 30 days"; maintenance notice; feature announcement.

| Situation | Use Instead |
|---|---|
| Field-level error | ValidationMessage |
| Short, non-blocking feedback | Toast |
| Critical, must acknowledge | Modal |
| Many errors | ValidationMessage per field + summary Message |

---

# When NOT to Use

_See substitutes in Storybook and Related Components._

---

# Decision Triggers

```yaml
decision_triggers:

  use_message_if:
    - \"Please fix the errors below\" at the top of a form; stays until the user corrects or dismisses.
    - \"Workspace saved\" at the top of a view when a more prominent, persistent confirmation is needed over a toast.
    - \"Unable to load documents. Check your connection.\" with optional Retry; permission denied; license expired.
    - \"This workspace will be archived in 30 days\"; maintenance notice; feature announcement.
    - | Situation | Use Instead |
    - | Field-level error | ValidationMessage |

  do_not_use_message_if:
    - see When to Use section in this skill
```

---

# Additional Topics

# Component Variants

### Success
Confirm a successful action (saved, created, updated). Use cases: save success, export queued, settings updated.

### Error
Something went wrong; user may need to act. Use cases: load failed, validation summary, permission denied, server error.

### Warning
Caution or limitation; not necessarily blocking. Use cases: deprecation notice, quota approaching, irreversible action notice.

### Info
Informational notice. Use cases: new feature, maintenance window, tips.

---

# Component States

- Visible (default when rendered)
- Dismissed (closed by user; removed or hidden)
- Expanded (optional; detail section visible)
- Loading (optional; e.g., retry in progress)

When a form is re-submitted, clear or update the message — do not leave stale error messages visible after the user has corrected the issue.

---

# Behavioral Rules

1. Place the message where it will be seen in context — top of form, top of view, or top of modal. Do not hide it below the fold.
2. Error messages must describe what went wrong and, when possible, what to do next. Avoid generic "An error occurred."
3. When dismissible, provide a visible close control accessible by keyboard (Tab, Enter/Space).
4. Consolidate multiple messages — do not stack several at once. Use one summary or a list within one message.

---

# Layout and Placement

## Placement

Message appears at the top of a form, content area, or modal. It follows container flow but uses a readability width cap (max `800px`, with a larger cap at large viewport band `>=1600px`), then wraps text within that cap. Position below the breadcrumb or page title and above the main content or form fields.

## Common Patterns

- Icon (left) + text + optional close (right)
- Optional expandable detail or "Learn more" link
- Optional action button (Retry, Fix, Dismiss)
- Background and border color by severity (success, error, warning, info)

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Margin above and below the message block: `16px`
- Internal padding: `12px` vertical, `16px` horizontal
- Gap between icon and text: `8px`
- Gap between message and the form or content below: `16px`
- Respect message readability caps (max `800px`, larger at `>=1600px`) instead of forcing full-width stretch in all contexts
- Keep message body text to `<= 80` characters per line where feasible

---

# Constraints

```yaml
constraints:

  skill_id: message
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: message
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Message and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- `role="alert"` for errors and critical warnings — announced immediately by screen readers
- `role="status"` for success/info — polite announcement
- `aria-live="assertive"` for errors; `aria-live="polite"` for success/info
- Message text must be in the DOM; do not rely only on color — always include icon and text
- Dismiss button must have an accessible name ("Dismiss" or "Close message")

**Common mistakes:**
- Error message not announced (missing `role="alert"` or live region)
- Using only color for severity — include icon and text
- Dismiss button not keyboard-reachable
- Generic error text with no actionable detail

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
    - Used with
    - ValidationMessage
    - Toast
    - Modal

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Message
```

---

# Validation Rules

```yaml
validation_rules:

  - id: message_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: message_storybook_api
    description: Implement Message using PrimeReact Message per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: message_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using Message for field-level errors — use ValidationMessage next to the specific field.
**Severity:** Medium

## Anti-pattern 2
**Problem:** Using Message for short, one-time feedback — use Toast.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Generic error text ("An error occurred") with no next step.
**Severity:** Medium

## Anti-pattern 4
**Problem:** Stacking multiple messages — consolidate or prioritize.
**Severity:** Medium


---

# Component Decision Logic

**Form has 3 validation errors:**
→ Message (error, summary at top) + ValidationMessage per field for detail.

**User saved workspace; confirm "Workspace saved":**
→ Message (success) if persistence matters; Toast if feedback can disappear quickly.

**Email field is empty and required:**
→ Not a Message. Use ValidationMessage next to the email field.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Message (Message) per Storybook.
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

**Used with:** Form (validation summary, save result), Button (retry, dismiss), ValidationMessage (field-level companion), Modal (message inside modal)

**Confused with:**
- ValidationMessage — next to a specific control, not block-level
- Toast — transient, disappears automatically
- Modal — blocking, requires user acknowledgment
