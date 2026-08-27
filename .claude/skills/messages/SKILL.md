---
name: messages
description: "Use when implementing the Messages component for displaying multiple inline messages via an imperative ref API. Trigger on: message lists, stacked notifications, multiple inline alerts, or when messages need to be shown, replaced, or removed programmatically."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Messages

---

# Component Metadata

```yaml
component: Messages
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Relativity UI (code-only; no Aero v3 Figma component — see Message for the Figma counterpart)
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Messages

category:
  - feedback
  - display

intent_tags:
  - messages
  - relativity_ui

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview

### Problem

Sometimes a single Message block isn't enough — the user needs to see several pieces of feedback at once (validation errors, multi-step results, accumulated warnings). Messages provides an imperative, ref-controlled container that can show, replace, remove, and clear multiple inline messages programmatically.

### Purpose

Display a stack of inline messages controlled via a ref API. Each message has a severity, optional summary/detail text, optional close button, and optional auto-dismiss timer. Unlike the single `Message` component (declarative), `Messages` is **imperative** — you call methods on a ref.

### Storybook Component

Use the `Messages` component (under Feedback). Built on PrimeReact Messages. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADfeedback-message-messages--docs`

### Ref API (MessagesRef)

| Method | Signature | Description |
|---|---|---|
| `show` | `(message \| message[]) => void` | Add one or more messages |
| `replace` | `(message \| message[]) => void` | Clear existing and show new messages |
| `clear` | `() => void` | Remove all messages |
| `remove` | `(message \| message[]) => void` | Remove specific messages by reference |
| `getElement` | `() => HTMLElement` | Access the DOM element |

### MessagesMessage Shape

| Field | Type | Description |
|---|---|---|
| `severity` | `'info'\|'success'\|'warn'\|'error'` | Severity level and color |
| `detail` | `string` | Main message text |
| `summary` | `string` | Optional title above detail |
| `sticky` | `boolean` | Keep visible until manually cleared (default `false`) |
| `closable` | `boolean` | Show a close button (default `false`) |
| `life` | `number` | Auto-dismiss delay in milliseconds |
| `id` | `string` | Unique identifier for targeted removal |

### Props

| Prop | Type | Description |
|---|---|---|
| `ref` | `Ref<MessagesRef>` | Imperative ref for controlling messages |
| `onClick` | `(message: MessagesMessage) => void` | Callback when a message is clicked |
| `onRemove` | `(message: MessagesMessage) => void` | Callback when a message is removed |

### Related Components

- Message (single declarative inline message — use for simple, one-at-a-time feedback)
- Toast (transient, auto-dismissing — use for lightweight, non-blocking feedback)
- ValidationMessage (field-level — use next to specific form inputs)

---

# When to Use

1. **Multiple simultaneous messages** — Batch validation results, multi-step operation feedback, or accumulated warnings that should all be visible.
2. **Programmatic message management** — When messages need to be added, replaced, or removed dynamically based on application logic.
3. **Persistent inline feedback area** — A designated area in the UI where messages appear and can be cleared or replaced as state changes.
4. **Click-to-act messages** — Messages that users can click to navigate or trigger follow-up actions.

---

# When NOT to Use

1. Single static message → use Message.
2. Short, auto-dismissing feedback → use Toast.
3. Field-level validation → use ValidationMessage or ValidationMessage.
4. Blocking acknowledgment → use Modal.

| Situation | Use Instead |
|---|---|
| Single block message | Message |
| Transient notification | Toast |
| Per-field validation | ValidationMessage |
| Must-acknowledge notice | Modal |

---

# Decision Triggers

```yaml
decision_triggers:

  use_messages_if:
    - Multiple messages need to be visible simultaneously
    - Messages are added, replaced, or removed programmatically
    - A persistent feedback area that updates with application state
    - Clickable messages that trigger navigation or actions

  do_not_use_messages_if:
    - Single declarative feedback → use Message
    - Transient non-blocking notification → use Toast
    - Field-level validation → use ValidationMessage
    - Blocking acknowledgment → use Modal
```

---

# Behavioral Rules

1. Use `sticky={true}` for messages that should persist until explicitly cleared — otherwise messages auto-dismiss.
2. Use `replace` instead of `clear` + `show` to prevent flicker when updating message content.
3. Set `closable={true}` when users should be able to dismiss individual messages manually.
4. Messages with `life` auto-dismiss after the specified milliseconds — use for success confirmations.
5. Clear stale messages when the underlying state changes (e.g., after form re-submission).

---

# Layout and Placement

Messages renders as a block container — place it where stacked messages should appear (top of a form, below a toolbar, inside a modal).

## Spacing Rules

**Design system sources:** Messages is a code-only component — Storybook is the sole source of truth. The single Message component has an Aero v3 Figma counterpart; Messages (multi-message container) does not.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between stacked messages: `8px` (handled internally)
- Margin above/below the Messages container: `16px`
- Internal message padding: `12px` vertical, `16px` horizontal

---

# Constraints

```yaml
constraints:

  skill_id: messages
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: false
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: messages
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Messages and this skill's sections
```

**Additional accessibility notes:**

- Messages container uses `aria-live` for dynamic announcements
- Error messages should be announced assertively (`aria-live="assertive"`)
- Close buttons must have accessible names
- Messages rely on icon + text, not color alone, for severity indication

**Common mistakes:**
- Not clearing stale messages when state changes — confuses screen reader users
- Missing `aria-live` region — dynamically added messages are not announced
- Using only color to indicate severity without icon and text

---

# Relationship Mapping

```yaml
relationships:

  companions:
    default:
      - Form
      - Panel

  substitutes:
    see_related_components:
    - Message
    - Toast
    - ValidationMessage

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Messages
```

---

# Validation Rules

```yaml
validation_rules:

  - id: messages_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: messages_storybook_api
    description: Implement Messages using PrimeReact Messages per Storybook — verify ref API and message shape
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: messages_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Using Messages for single static feedback
**Problem:** Messages is ref-controlled and imperative. For a single, always-visible message, use the declarative Message component instead.
**Severity:** Medium

## Not clearing stale messages
**Problem:** Old messages remain visible after the user corrects the issue or re-submits, causing confusion.
**Severity:** Medium

## Using Messages for transient toast-style feedback
**Problem:** Messages is inline and persistent by design. For transient pop-up notifications, use Toast.
**Severity:** Medium

---

# Component Decision Logic

**Multiple validation errors after form submission:**
→ Messages with `show([...errors])`. Use `replace` on re-submit to update.

**Single "Workspace saved" confirmation:**
→ Not Messages. Use Message (declarative) or Toast (transient).

**Field-level "Email is required":**
→ Not Messages. Use ValidationMessage next to the field.

---

# Example Scenarios

## Scenario — Batch validation feedback
User intent: See all validation errors after submitting a form.
Recommended: Messages with `show` passing an array of error messages.
Notes: Use `replace` on re-submit to clear stale errors and show new ones.

## Scenario — Operation progress feedback
User intent: See status updates as a multi-step operation progresses.
Recommended: Messages with `show` for each step, different severities per step.
Notes: Use `sticky={true}` so messages persist until the operation completes.

---
