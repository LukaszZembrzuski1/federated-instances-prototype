---
name: tertiary-navigation
description: "Use when implementing TertiaryNavigation for collapsible side navigation with a list of items. Trigger on: section navigation panels, workspace navigation, left-side nav with collapsible items, or navigation panels with status indicators on items."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# TertiaryNavigation

---

# Component Metadata

```yaml
component: TertiaryNavigation
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: TertiaryNavigation

category:
  - navigation
  - layout

intent_tags:
  - tertiary_navigation
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Complex applications have sections within a workspace or view that need their own navigation — a list of items the user can click to switch context, with the ability to collapse the navigation when more space is needed. TertiaryNavigation provides a labelled, collapsible side navigation component with support for item statuses.

### Purpose

Display a collapsible side navigation panel with a header, a list of clickable items, optional item statuses, and a toggle to collapse/expand. TertiaryNavigationButton and TertiaryNavigationPanel can be placed independently in the DOM and stay synchronised via context.

### Storybook Component

Use the `TertiaryNavigation` component (under Navigation). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADnavigation-tertiarynavigation--docs`

### Sub-components

- `TertiaryNavigation` — Provider that manages open/close state
- `TertiaryNavigationPanel` — The visible navigation panel with header and items
- `TertiaryNavigationButton` — The toggle button that can be placed anywhere in the layout

Key feature: `TertiaryNavigationButton` and `TertiaryNavigationPanel` can be placed in **completely different parts of the DOM** and stay synchronised via context. This allows the toggle to live in a toolbar while the panel lives in a sidebar.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `header*` | `string` | — | Header text at the top of the navigation |
| `items*` | `TertiaryNavigationItem[]` | — | Array of navigation items |
| `width` | `number` | `320` | Width of the navigation panel in px |
| `attached` | `boolean` | `false` | Attaches to left edge (removes left border radius) |
| `maxHeight` | `string\|number` | `'100%'` | Max height; set for scrollable item lists |

### TertiaryNavigationItem shape

```ts
{
  id: string
  label: string
  status?: 'completed' | 'in progress' | 'not started' | 'skipped' | 'warning' | 'error'
}
```

### Related Components

- SidePanel (simpler inline show/hide panel; no item list or statuses)
- Drawer (collapsible container; no item list)
- Sidebar [Flyout] (overlay from edge; not inline navigation)
- Steps (linear step-by-step flow with fixed sequence)

---

# When to Use

1. **Workspace section navigation** — Browse, Documents, Search, Analytics as a side nav within a workspace.
2. **Workflow navigation with status** — Multi-step workflows where items have statuses (completed, in progress, not started) that users navigate between non-linearly.
3. **Complex application navigation** — When a workspace has many sections (10+) and the list needs to scroll.
4. **Detached toggle pattern** — When the toggle button must live in the app header or toolbar while the panel is in the sidebar.

---

# When NOT to Use

1. Linear step-by-step flows where order is enforced → use Steps.
2. Simple top-level navigation → use the app's primary navigation.
3. A small number of sections (2–4) where tabs would suffice → use TabView.
4. Navigation that should overlay content → use Sidebar [Flyout].

---

# Decision Triggers

```yaml
decision_triggers:

  use_tertiary_navigation_if:
    - Browse, Documents, Search, Analytics as a side nav within a workspace.
    - Multi-step workflows where items have statuses (completed, in progress, not started) that users navigate between non-linearly.
    - When a workspace has many sections (10+) and the list needs to scroll.
    - When the toggle button must live in the app header or toolbar while the panel is in the sidebar.

  do_not_use_tertiary_navigation_if:
    - 1. Linear step-by-step flows where order is enforced → use Steps.
    - 2. Simple top-level navigation → use the app's primary navigation.
    - 3. A small number of sections (2–4) where tabs would suffice → use TabView.
    - 4. Navigation that should overlay content → use Sidebar [Flyout].
```

---

# Additional Topics

# Item Status Reference

| Status | Use When |
|---|---|
| `completed` | Item/step is done |
| `in progress` | Currently active item |
| `not started` | Future item, not yet begun |
| `skipped` | Intentionally bypassed |
| `warning` | Needs attention but not blocking |
| `error` | Failed or requires correction |

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Default panel width: `320px`; adjust with `width` prop as needed
- Navigation items: `8px` vertical padding per item
- Internal panel padding: `16px` horizontal, `12px` vertical

---

# Behavioral Rules

1. Use `defaultOpened={false}` on `TertiaryNavigation` to start collapsed when the navigation is supplementary.
2. Set `maxHeight` when the item list can grow long — enables scrolling within the panel without expanding the page.
3. Use `attached={true}` when the panel is flush with the left edge of the layout (no rounded left corner).
4. Item statuses are predefined — use them to communicate workflow progress, not arbitrary colours.

---

# Constraints

```yaml
constraints:

  skill_id: tertiary-navigation
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: tertiary-navigation
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact TertiaryNavigation and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- The navigation panel should have `role="navigation"` and an accessible name (via the `header` prop)
- Each item should be focusable and activatable via Enter/Space
- The collapse toggle must have an accessible name ("Collapse navigation" / "Expand navigation")
- Selected item should have `aria-current="page"` or `aria-selected="true"`

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
    - SidePanel
    - Drawer
    - Sidebar [Flyout]
    - Steps

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - TertiaryNavigation
```

---

# Validation Rules

```yaml
validation_rules:

  - id: tertiary-navigation_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: tertiary-navigation_storybook_api
    description: Implement TertiaryNavigation using PrimeReact TertiaryNavigation per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: tertiary-navigation_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact TertiaryNavigation from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use TertiaryNavigation when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: TertiaryNavigation (TertiaryNavigation) per Storybook.
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

- SidePanel (simpler inline show/hide panel; no item list or statuses)
- Drawer (collapsible container; no item list)
- Sidebar [Flyout] (overlay from edge; not inline navigation)
- Steps (linear step-by-step flow with fixed sequence)

---
