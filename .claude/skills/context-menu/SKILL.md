---
name: context-menu
description: "Use when implementing ContextMenu for right-click triggered overlay menus. Trigger on: right-click menus, contextual actions on a specific item or region, or any overlay menu that appears on right-click rather than a button click."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# ContextMenu

---

# Component Metadata

```yaml
component: ContextMenu
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: ContextMenu

category:
  - overlay
  - feedback

intent_tags:
  - context_menu
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to trigger actions on a specific item — a document row, a workspace, a search result — without cluttering the UI with visible buttons. A context menu appears on right-click and presents a list of relevant actions in context.

In RelativityOne, context menus provide row-level actions in document review (tag, code, view native), workspace management (edit, archive, delete), and admin lists where exposing all actions inline would overload the UI.

### Purpose

Display an overlay menu of actions on right-click of a target element. Disappears when an action is chosen or the user clicks elsewhere.

### Storybook Component

Use the `ContextMenu` component (under Containment). Built on PrimeReact ContextMenu. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-contextmenu--docs`

### Props

| Prop | Type | Description |
|---|---|---|
| `model` | `MenuItem[]` | Array of menu items (label, icon, command, items for submenu) |
| `ref` | `RefObject` | Ref for programmatic control (show/hide) |
| `global` | `boolean` | Attaches to the document instead of a specific target — right-click anywhere triggers it |
| `appendTo` | `DOM element` | Where the overlay panel is mounted |

### Related Components

- Menu (inline or popup action list triggered by a button click, not right-click)
- SplitButton (one default action + dropdown of more)
- Button (single explicit action)

---

# When to Use

1. **Row-level actions in a table** — Right-click on a document or workspace row reveals tag, edit, delete, archive.
2. **Region or canvas actions** — Right-click on a diagram, canvas, or content area to reveal contextual options.
3. **Global fallback** — Use `global={true}` sparingly when a right-click anywhere in a region should trigger the menu.

---

# When NOT to Use

1. Actions triggered by a visible button click → use Menu (popup) or SplitButton.
2. A small number of actions that fit inline → use Button or icon buttons with Tooltips.
3. Destructive actions without confirmation → pair ContextMenu items with ConfirmDialog or ConfirmPopup.

---

# Decision Triggers

```yaml
decision_triggers:

  use_context_menu_if:
    - Right-click on a document or workspace row reveals tag, edit, delete, archive.
    - Right-click on a diagram, canvas, or content area to reveal contextual options.
    - Use `global={true}` sparingly when a right-click anywhere in a region should trigger the menu.

  do_not_use_context_menu_if:
    - 1. Actions triggered by a visible button click → use Menu (popup) or SplitButton.
    - 2. A small number of actions that fit inline → use Button or icon buttons with Tooltips.
    - 3. Destructive actions without confirmation → pair ContextMenu items with ConfirmDialog or ConfirmPopup.
```

---

# Additional Topics

# Menu Item Structure

```ts
{
  label: string
  icon?: string
  command?: (e) => void
  items?: MenuItem[]  // submenu
  separator?: boolean // inserts a Divider
  disabled?: boolean
}
```

Use `separator: true` to group related actions with a Divider between groups.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Menu item padding: `8px` vertical, `16px` horizontal
- Separator margin: `4px` vertical
- Menu appears at cursor position — ensure it stays within the viewport (PrimeReact handles repositioning)

---

# Behavioral Rules

1. Only show contextually relevant actions — do not show a generic full action list. Items must apply to the right-clicked item.
2. Destructive items (Delete, Remove) should be visually distinct and trigger a confirmation step.
3. Menu must close on: action selected, click outside, Escape key.
4. Use submenu (`items` array) only one level deep — deeper nesting is hard to navigate.

---

# Constraints

```yaml
constraints:

  skill_id: context-menu
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: context-menu
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact ContextMenu and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Context menu is triggered by right-click — also provide a keyboard equivalent (e.g., a visible "Actions" button or the application key / Shift+F10)
- When open: `role="menu"` with `role="menuitem"` on each item
- Keyboard navigation: arrow keys to navigate items, Enter to activate, Escape to close
- Focus moves into the menu when it opens; returns to the trigger on close

**Common mistakes:**
- No keyboard alternative to right-click — keyboard-only users cannot access the menu
- Destructive actions without a confirmation step
- Menu not closing on Escape

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
    - Menu
    - SplitButton
    - Button

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - ContextMenu
```

---

# Validation Rules

```yaml
validation_rules:

  - id: context-menu_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: context-menu_storybook_api
    description: Implement ContextMenu using PrimeReact ContextMenu per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: context-menu_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact ContextMenu from Storybook.
**Severity:** High


---

# Component Decision Logic

**User right-clicks a document row to tag, edit, or remove it:**
→ ContextMenu with relevant items. Pair Remove with ConfirmPopup.

**User clicks a visible "More actions" button:**
→ Not a ContextMenu. Use Menu (popup) or SplitButton.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: ContextMenu (ContextMenu) per Storybook.
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

- Menu (inline or popup action list triggered by a button click, not right-click)
- SplitButton (one default action + dropdown of more)
- Button (single explicit action)

---
