---
name: dialog-modal
description: "Use when implementing Dialog [Modal] components. Trigger on: modals, dialogs, confirmation overlays, form overlays, destructive action confirmation, information overlays, or any focused interaction layer that blocks the background until dismissed."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Modal

---

# Component Metadata

```yaml
component: Modal
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Dialog

category:
  - overlay
  - feedback

intent_tags:
  - dialog_modal
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Some workflows require the user to temporarily pause their current task to complete a focused action — confirming a decision, entering information, or reviewing important details. A modal creates a temporary overlay that prevents interaction with the rest of the interface until the task is completed or dismissed.

In RelativityOne, modals are used for destructive action confirmation (delete, reset), object creation and editing, system notices requiring acknowledgment, and short workflows that should not require full page navigation.

### Purpose

Display a focused overlay that requires user interaction before returning to the main interface.

### User Goal

- Confirm important actions
- Enter or edit information
- Review details before proceeding

### Interaction Type

- Confirm actions
- Collect input
- Display information (requiring acknowledgment)

### PrimeReact Component

Use the PrimeReact `Dialog` component. Storybook is the reference for all available props, variants, and usage examples: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html`

### Related Components

- Button (footer actions)
- ConfirmDialog (simple yes/no confirmation without custom content)
- Tooltip (non-blocking contextual hint)
- Drawer (side panel; non-blocking)
- Tooltip (lightweight inline info)

---

# When to Use

1. **Destructive or high-impact confirmation** — deleting objects, removing documents, resetting configurations; especially when the action is irreversible or high-risk.
2. **Collecting structured input** — creating or editing an object, entering metadata, short configuration forms.
3. **Information requiring acknowledgment** — system notices, policy confirmations, status updates the user must read.
4. **Short focused workflows** — steps that should not require navigating away from the current context.

### When to use a question in the title

Use a question ("Are you sure you want to delete this workspace?") when the action is high-risk or destructive, or when there's a reasonable chance the user clicked by accident. Do not use a question for simple, non-critical actions — in Relativity where users repeat tasks frequently, unnecessary questions make flows feel heavy.

---

# When NOT to Use

1. Long workflows with multiple complex steps → use a dedicated page or wizard.
2. Content requiring extensive reading or scrolling → use a dedicated page.
3. Supplemental info the user doesn't need to act on → use Tooltip or SidePanel.
4. When the user needs to interact with the background simultaneously → use Drawer or an inline form.

| Situation | Use Instead |
|---|---|
| Multi-step workflow | Dedicated page or wizard |
| Supplemental / non-blocking info | Tooltip or SidePanel |
| Background interaction needed | Drawer or inline form |
| Inline configuration | Embedded form fields |
| Simple yes/no confirm | ConfirmDialog |

---

# Decision Triggers

```yaml
decision_triggers:

  use_dialog_modal_if:
    - deleting objects, removing documents, resetting configurations; especially when the action is irreversible or high-risk.
    - creating or editing an object, entering metadata, short configuration forms.
    - system notices, policy confirmations, status updates the user must read.
    - steps that should not require navigating away from the current context.
    - ### When to use a question in the title
    - Use a question (\"Are you sure you want to delete this workspace?\") when the action is high-risk or destructive, or when there's a reasonable chance the user clicked by accident. Do not use a questio

  do_not_use_dialog_modal_if:
    - 1. Long workflows with multiple complex steps → use a dedicated page or wizard.
    - 2. Content requiring extensive reading or scrolling → use a dedicated page.
    - 3. Supplemental info the user doesn't need to act on → use Tooltip or SidePanel.
    - 4. When the user needs to interact with the background simultaneously → use Drawer or an inline form.
    - | Situation | Use Instead |
    - | Multi-step workflow | Dedicated page or wizard |
```

---

# Additional Topics

# Configuration (Props)

The PrimeReact `Dialog` is highly configurable. Key decisions when implementing:

### Header and Footer visibility

Both header and footer are optional props, but **at least one must be present** — a modal with neither header nor footer is not valid in Aero v3.

| Configuration | When to use |
|---|---|
| Header + Footer | Standard: forms, confirmations, most modals |
| Header only (no footer) | Informational content the user reads and closes via the × button; no action required |
| Footer only (no header) | Rare; only when a title would be redundant and content is self-explanatory |

When showing a footer, always include a way to cancel or close. When omitting the footer, the close button (×) in the header becomes the only dismiss mechanism — make sure it is visible and accessible.

### Size

PrimeReact allows arbitrary width values. Aero v3 defines three recommended sizes — use these unless there is a specific layout reason to deviate:

| Name | Width | Use When |
|---|---|---|
| Small | `445px` | Simple confirmations, brief messages |
| Medium | `640px` | Standard forms and input modals |
| Large | `1024px` | Complex forms, detailed configuration |

Note: Aero v3 does not define a Large size for plain text-only content — if your modal only contains a text message, use Small or Medium. Large is intended for custom content (forms, inputs, structured layouts).

### Content type

The modal's body accepts any content — plain text, forms, custom layouts. Choose based on what the user needs to do:

- **Text only** — short message, confirmation, or notice
- **Form / custom content** — inputs, selects, structured fields
- **Loading** — async operation in progress; replace body content with a spinner and disable footer actions

---

# Pre-built Variant: DialogDelete (new in 3.0)

`DialogDelete` is a specialized Dialog for delete confirmations. It pre-configures the footer with `ButtonCancel` + `ButtonDelete` and handles the delete-then-close flow automatically.

```tsx
import { DialogDelete } from 'relativity-ui'

<DialogDelete
  visible={showDelete}
  header="Delete workspace?"
  onHide={() => setShowDelete(false)}
  onDelete={handleDeleteAsync}
  deleting={isDeleting}
  deleteDisabled={!canDelete}
>
  <p>This cannot be undone. All documents will be permanently removed.</p>
</DialogDelete>
```

| Prop | Type | Description |
|---|---|---|
| `onDelete` | `() => Promise<void>` | Async delete handler; dialog closes automatically when resolved |
| `deleting` | `boolean` | Whether the Delete button shows loading state |
| `deleteDisabled` | `boolean` | Whether the Delete button is disabled |

The dialog is non-closable (no × button) and non-draggable by default — the user must choose Cancel or Delete. All other `DialogProps` are passed through.

---

# Component States

| State | Behavior |
|---|---|
| Hidden | Default; not rendered |
| Visible | Rendered, centered, background blocked |
| Loading | Body shows spinner; footer actions disabled to prevent double submission |
| Disabled actions | Footer buttons disabled while processing; re-enable on completion or failure |

---

# Behavioral Rules

1. Always provide a clear way to dismiss — close button (×) in the header, Cancel in the footer, or both.
2. Background content must be visually dimmed and non-interactive when the curtain is shown.
3. Focus must move into the modal when it opens and return to the triggering element when it closes.
4. The modal must trap focus — keyboard users cannot Tab outside the modal while it is open.
5. Esc should close the modal unless accidental dismissal would cause data loss.

---

# Layout and Placement

## Position

Modals are centered horizontally and vertically in the browser window or parent iFrame.

## Sizing Constraints

- **Max height:** `100vh − 64px` (32px offset from top and bottom of the viewport)
- **Min height:** `154px` (header + footer + single text row)
- If content exceeds max height: the body scrolls; the footer stays anchored at the bottom
- **Curtain (backdrop):** optional — omit when users need to view or reference content behind the modal

## Anatomy and Spacing

All spacing values must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

| Area | Value |
|---|---|
| Header: horizontal padding | `16px` |
| Header: vertical padding | `12px` |
| Header: gap between title and close button | `12px` |
| Header: border-bottom | `1px solid $color-border-secondary` (`#D0D9E7`) |
| Body: top padding | `16px` |
| Body: bottom padding | `24px` |
| Body: horizontal padding | `16px` |
| Footer: horizontal padding | `16px` |
| Footer: bottom padding | `16px` |
| Footer: gap between buttons | `8px` |
| Border radius | `3px` (all corners) |
| Box shadow | `$box-shadow-level-1` |

## Footer Button Order

The footer is **right-aligned**. Within the button group:
- **Primary action (e.g. "Save", "Confirm", "Delete") → LEFT**
- **Secondary action (e.g. "Cancel") → RIGHT**

```
[Footer — right-aligned]
  [ Primary ]  [ Cancel ]
```

## Layout Constraints

- Do not nest modals inside other modals.
- Avoid placing excessive text in a modal — long content belongs on a dedicated page.
- Do not exceed `1024px` width.

---

# Constraints

```yaml
constraints:

  skill_id: dialog-modal
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
  component_skill: dialog-modal
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Dialog and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- `role="dialog"` on the modal container
- `aria-modal="true"` to inform assistive technology the rest of the page is inert
- `aria-labelledby` referencing the modal title element
- Focus moves into the modal on open (first focusable element or the title)
- Focus returns to the triggering element on close
- Focus is trapped inside the modal while open
- Esc closes the modal

**Common mistakes:**
- Opening the modal without moving keyboard focus into it
- Missing `aria-labelledby` — screen readers won't announce the modal's purpose
- Focus escaping the modal via Tab
- No Esc support

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
    - ConfirmDialog
    - Tooltip
    - Drawer
    - Tooltip

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Dialog
      - DialogDelete
```

---

# Validation Rules

```yaml
validation_rules:

  - id: dialog-modal_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: dialog-modal_storybook_api
    description: Implement Modal using PrimeReact Dialog per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: dialog-modal_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using a modal for long, scrollable content — use a dedicated page.
**Severity:** Medium

## Anti-pattern 2
**Problem:** Using a modal for multi-step workflows — use a wizard or dedicated flow.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Stacking modals inside other modals.
**Severity:** Medium

## Anti-pattern 4
**Problem:** Placing the primary action on the right — in Aero v3, primary is always on the **left** within the footer group.
**Severity:** Medium

## Anti-pattern 5
**Problem:** Omitting both header and footer — at least one must be present.
**Severity:** Medium

## Anti-pattern 6
**Problem:** Using "Fullscreen Modal" terminology — this size does not exist in Aero v3; the largest size is `1024px`.
**Severity:** Medium


---

# Component Decision Logic

**User must confirm deleting a workspace:**
→ Modal (text content, Small, header + footer). Question title. Danger / destructive primary + Cancel.

**User creates a new saved search with several fields:**
→ Modal (custom content, Medium or Large). Header + footer with Save + Cancel.

**User must read and acknowledge a system notice, no action needed:**
→ Modal (text content, Small or Medium, header only — no footer). Close via × button.

**User needs to confirm a simple yes/no with no custom content:**
→ Consider ConfirmDialog — simpler API for the same pattern.

**User needs to complete a 4-step configuration wizard:**
→ Not a Modal. Use a dedicated page or wizard flow.

**User needs a side panel that doesn't block the background:**
→ Not a Modal. Use Drawer.

**User should see supplemental help text without losing context:**
→ Not a Modal. Use Tooltip or SidePanel.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Modal (Dialog) per Storybook.
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

**Used with:** Button (footer actions), Form inputs (custom content), DataTable (row-level actions triggering confirmation)

**Confused with:**
- ConfirmDialog — simpler yes/no confirm without custom content layout
- Tooltip — non-blocking, doesn't prevent background interaction
- Drawer — side panel, non-blocking
- Tooltip — lightweight inline info, no actions
