---
name: confirm-dialog
description: "Use when implementing ConfirmDialog components for explicit confirmation of destructive or high-impact actions. Trigger on: delete confirmation, overwrite confirmation, irreversible actions, bulk destructive actions, or yes/no dialogs before a consequential operation."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# ConfirmDialog

---

# Component Metadata

```yaml
component: ConfirmDialog
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: ConfirmDialog

category:
  - overlay
  - feedback

intent_tags:
  - confirm_dialog
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Destructive or high-impact actions — deleting data, removing access, overwriting settings — should require explicit user confirmation to prevent mistakes. A confirm dialog presents a clear message and confirm/cancel choices in a blocking overlay so the user must decide before the action runs.

In RelativityOne, confirm dialogs are used for deleting documents or workspaces, removing users or permissions, resetting configurations, overwriting saved searches, and similar actions in document review, admin, and workspace configuration.

### Purpose

Require the user to explicitly confirm or cancel a single, consequential action before it is executed.

### User Goal

- Acknowledge what will happen and choose to proceed or cancel
- Avoid accidental destructive or irreversible actions

### Interaction Type

- Confirm actions

### PrimeReact Component

Use the PrimeReact `ConfirmDialog` component. For contextual confirmation anchored near a trigger, use `ConfirmPopup` instead. Storybook is the reference for props and API: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html`

### Related Components

- Modal (for confirmations that require additional form input)
- ConfirmPopup (contextual, less critical confirmations)
- Toast (feedback after the action completes)
- Button (the triggering action)

---

# When to Use

1. **Destructive actions** — Delete document, remove from workspace, delete saved search, or remove user from group; with clear consequence statement.
2. **Overwrite or replace** — Overwriting an existing saved search, workspace setting, or export file when the operation cannot be undone.
3. **Irreversible or high-impact changes** — Resetting indexing settings, clearing all tags, or revoking admin permissions.
4. **Bulk actions that cannot be easily undone** — "Remove all selected documents from this workspace" or "Delete these 50 saved searches."

---

# When NOT to Use

1. Non-destructive or easily reversible actions — use the action directly, optionally with Toast feedback.
2. When the user must provide additional input (reason, name) — use Modal with a form.
3. Multi-step or complex decisions — use a dedicated flow or Modal.
4. Simple feedback only — use Toast or Message.

| Situation | Use Instead |
|---|---|
| Need to collect input | Modal with form |
| Multi-step decision | Wizard or dedicated page |
| Non-destructive action | Direct action + Toast |
| Informational feedback only | Toast or Message |
| Contextual confirm near trigger | ConfirmPopup |

---

# Decision Triggers

```yaml
decision_triggers:

  use_confirm_dialog_if:
    - Delete document, remove from workspace, delete saved search, or remove user from group; with clear consequence statement.
    - Overwriting an existing saved search, workspace setting, or export file when the operation cannot be undone.
    - Resetting indexing settings, clearing all tags, or revoking admin permissions.
    - \"Remove all selected documents from this workspace\" or \"Delete these 50 saved searches.\"

  do_not_use_confirm_dialog_if:
    - 1. Non-destructive or easily reversible actions — use the action directly, optionally with Toast feedback.
    - 2. When the user must provide additional input (reason, name) — use Modal with a form.
    - 3. Multi-step or complex decisions — use a dedicated flow or Modal.
    - 4. Simple feedback only — use Toast or Message.
    - | Situation | Use Instead |
    - | Need to collect input | Modal with form |
```

---

# Additional Topics

# Component Variants

### Delete / Remove Confirmation
Confirm deletion or removal. Use cases: delete document or workspace, remove user from group, remove tag.

### Overwrite Confirmation
Confirm replacing existing data. Use cases: overwrite saved search, replace workspace setting, save over existing export.

### Warning Before Proceeding
Warn about side effects before continuing. Use cases: "You will lose unsaved changes," long-running job warning, license or permission warning.

---

# Component States

- Hidden
- Visible (message and buttons shown)
- Loading (after user clicks Confirm while request is in progress — disable buttons or show spinner)

Closing via × or clicking outside should be treated as Cancel for destructive actions. Avoid dismissing without an explicit choice unless the product explicitly supports "click outside to cancel."

---

# Behavioral Rules

1. Message must state clearly what will happen and what is at risk (e.g., "This cannot be undone").
2. Button labels must be unambiguous — use "Delete" / "Cancel" or "Overwrite" / "Keep original"; avoid generic "Yes" / "No" for destructive actions.
3. The destructive option must use the **Danger** button style (`ButtonDanger`, **`ButtonDelete`**, or `severity="danger"`). Default focus should be on Cancel — the safer option.
4. Only one confirm dialog at a time; do not stack.

---

# Layout and Placement

## Placement

Confirm dialog appears centered in the viewport, above dimmed background content, and blocks interaction until the user chooses.

## Common Patterns

- Title: short question or action name ("Delete document?")
- Body: one to two sentences explaining the consequence
- Footer: Danger / destructive primary action (e.g., "Delete") on the left, secondary Cancel on the right
- Default focus on Cancel

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Internal content padding: `16px` horizontal, `12px` vertical (header), `16px` (body), `16px` (footer)
- Gap between footer buttons: `8px`
- Keep content short — no long paragraphs or form inputs
- Do not nest another modal or confirm inside

---

# Constraints

```yaml
constraints:

  skill_id: confirm-dialog
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
  component_skill: confirm-dialog
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact ConfirmDialog and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- `role="alertdialog"` for critical confirmations — announced immediately by assistive technology
- `aria-modal="true"`, `aria-labelledby` referencing the title, `aria-describedby` referencing the message
- Focus moves into the dialog on open — default to Cancel (the safe option)
- Escape closes and cancels the action
- Tab cycles within the dialog (typically two buttons)
- Focus returns to the triggering element on cancel

**Common mistakes:**
- Using "Yes" / "No" labels without context — screen reader users cannot tell which is destructive
- Not moving focus into the dialog — keyboard users remain stuck in the background
- Vague message text — the consequence must be explicit

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
    - Modal
    - ConfirmPopup
    - Toast

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - ConfirmDialog
```

---

# Validation Rules

```yaml
validation_rules:

  - id: confirm-dialog_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: confirm-dialog_storybook_api
    description: Implement ConfirmDialog using PrimeReact ConfirmDialog per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: confirm-dialog_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Confirming every small action — reserve for destructive or irreversible actions only.
**Severity:** Medium

## Anti-pattern 2
**Problem:** Vague message ("Are you sure?") without stating what will happen.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Using ConfirmDialog when the user must type something (e.g., type "DELETE") — use Modal with an input field instead.
**Severity:** Medium

## Anti-pattern 4
**Problem:** Stacking multiple confirm dialogs.
**Severity:** Medium


---

# Component Decision Logic

**User clicks "Delete" on a saved search:**
→ ConfirmDialog. Alternatively, an undo pattern (delete + Toast with Undo) if the product supports restoring data.

**User toggles "Include attachments":**
→ Not a ConfirmDialog. Direct toggle; optional Toast: "Setting updated."

**User must enter a reason before deleting a workspace:**
→ Not a ConfirmDialog. Use Modal with a form (reason field + Delete / Cancel).

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: ConfirmDialog (ConfirmDialog) per Storybook.
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

**Used with:** Button (destructive actions), DataTable (row delete, bulk delete), Modal (when confirmation needs a form)

**Confused with:**
- Modal — general purpose; use for forms or content requiring more space
- ConfirmPopup — contextual, near trigger; for less critical or row-level confirmations
- Toast — feedback only; no user choice required
