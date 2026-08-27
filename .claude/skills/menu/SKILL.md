---
name: menu
description: "Use when implementing the Menu component for lists of actions or navigation items. Trigger on: action menus, overflow menus, dropdown action lists, \"More options\" menus, menus with submenus, or any list of clickable actions triggered by a button."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Menu

---

# Component Metadata

```yaml
component: Menu
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Menu

category:
  - overlay
  - feedback

intent_tags:
  - menu
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to choose from a list of actions — grouped, with icons, with submenus — triggered by clicking a button. Menu provides a clean overlay or inline list of items with full support for separators, icons, and nested submenus.

In RelativityOne, Menu is used for "More actions" overflows, file/edit/view menus in toolbars, contextual action lists in panels, and anywhere a set of related actions is grouped behind a single trigger.

### Purpose

Display a list of overlay menu items triggered by a button click. Supports inline (always visible), popup (overlay on click), submenus, separators, and icons. The `MenuButton` variant combines Button + Menu without requiring ref management.

### Storybook Component

Use the `Menu` component (under Form Inputs & Controls). Built on PrimeReact Menu. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-menu--docs`

### Props

| Prop | Type | Description |
|---|---|---|
| `model` | `MenuItem[]` | Array of menu items |
| `ref` | `RefObject` | Ref for programmatic control (show/hide) — required for popup mode |
| `popup` | `boolean` | Display as a popup overlay (requires `PrimeReactProvider` in scope) |

### MenuButton variant

Use `MenuButton` when you need a button that opens a popup Menu without managing a `ref` manually. Supports `iconLeft`, `severity`, and `size` props alongside the standard Menu `model`.

```tsx
<MenuButton label="Options" model={items} />
<MenuButton label="More" severity="tertiary" size="small" iconLeft="..." model={items} />
```

### MenuItem structure

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

### Related Components

- ContextMenu (triggered by right-click, not button click)
- SplitButton (one default action + dropdown)
- Dropdown (value selection, not action triggering)
- TieredMenu → not in Storybook; use Menu with submenu support instead

---

# When to Use

1. **"More actions" or overflow** — A button reveals a list of actions that do not fit inline.
2. **Toolbar action groups** — File, Edit, View menus in a toolbar.
3. **Contextual action panel** — A set of actions for a selected item or current view.
4. **Actions with submenus** — File → New → Document / Spreadsheet.

---

# When NOT to Use

1. Right-click triggered menu → use ContextMenu.
2. One default action with a few alternatives → use SplitButton.
3. Selecting a value (not triggering an action) → use Dropdown.
4. Navigation between sections → use TabView, TertiaryNavigation, or Breadcrumb.

---

# Decision Triggers

```yaml
decision_triggers:

  use_menu_if:
    - A button reveals a list of actions that do not fit inline.
    - File, Edit, View menus in a toolbar.
    - A set of actions for a selected item or current view.
    - File → New → Document / Spreadsheet.

  do_not_use_menu_if:
    - 1. Right-click triggered menu → use ContextMenu.
    - 2. One default action with a few alternatives → use SplitButton.
    - 3. Selecting a value (not triggering an action) → use Dropdown.
    - 4. Navigation between sections → use TabView, TertiaryNavigation, or Breadcrumb.
```

---

# Additional Topics

# Popup Mode

Set `popup={true}` to render the Menu as an overlay triggered by a button click. Requires `PrimeReactProvider` in scope.

```tsx
const menuRef = useRef(null);
<Button onClick={(e) => menuRef.current.toggle(e)} label="Options" />
<Menu ref={menuRef} model={items} popup />
```

Or use `MenuButton` to avoid ref management entirely.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Menu item padding: `8px` vertical, `16px` horizontal
- Separator margin: `4px` vertical
- Gap between trigger button and menu: `4px`

---

# Behavioral Rules

1. Group related actions with `separator: true` items between groups.
2. Keep menus short — more than 8–10 items suggests the actions need regrouping.
3. Destructive items (Delete, Remove) should be last in the list or in a separate group, and must trigger a confirmation step.
4. Menu closes on: action selected, click outside, Escape key.

---

# Constraints

```yaml
constraints:

  skill_id: menu
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: menu
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Menu and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Trigger button must have an accessible name ("More options", "File", etc.)
- Menu container: `role="menu"`; each item: `role="menuitem"`
- Keyboard: Enter/Space on trigger opens menu; arrow keys navigate items; Enter activates; Escape closes; Tab closes and returns focus to trigger
- Submenus: arrow right opens; arrow left closes; Escape returns to parent

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
    - ContextMenu
    - SplitButton
    - Dropdown
    - TieredMenu → not in Storybook; use Menu with submenu support instead

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Menu
```

---

# Validation Rules

```yaml
validation_rules:

  - id: menu_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: menu_storybook_api
    description: Implement Menu using PrimeReact Menu per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: menu_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Menu from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Menu when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Menu (Menu) per Storybook.
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

- ContextMenu (triggered by right-click, not button click)
- SplitButton (one default action + dropdown)
- Dropdown (value selection, not action triggering)
- TieredMenu → not in Storybook; use Menu with submenu support instead

---
