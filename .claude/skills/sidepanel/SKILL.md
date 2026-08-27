---
name: sidepanel
description: "Use when implementing the SidePanel component for persistent inline panels. Trigger on: navigation panels, persistent filter sidebars, secondary content panels, or any panel that renders inline in the document flow and is toggled fully visible or fully hidden."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# SidePanel

---

# Component Metadata

```yaml
component: SidePanel
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Sidepanel

category:
  - overlay
  - feedback

intent_tags:
  - sidepanel
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need a persistent panel alongside the main content — for navigation, filters, or secondary content — that can be fully shown or fully hidden using a toggle. Unlike the Drawer which collapses to a narrow strip, the SidePanel is either completely visible or completely hidden.

In RelativityOne, SidePanel is suited for navigation panels (Dashboard, Reports, Settings), persistent filter sidebars, or any secondary content that users toggle on/off and that should render inline without overlaying the main area.

### Purpose

A lightweight inline panel that renders as part of the document flow. Uses CSS transitions for smooth show/hide animations. Ideal for persistent navigation panels, filters, or secondary content.

### User Goal

- Access navigation or secondary content alongside the main view
- Hide the panel to gain full-width space for the main content
- Toggle it back on when needed

### Interaction Type

- Display information
- Navigate (navigation panels)
- Collect input (filter panels)

### Storybook Component

Use the `SidePanel` component. Storybook is the reference for props and API: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADnavigation-sidepanel--docs`

### Related Components

- Drawer (collapses to a narrow strip; always in layout)
- Modal (blocking overlay; not part of layout)
- Panel (static container; no show/hide behaviour)

---

# When to Use

1. **Navigation panels** — A sidebar listing navigation items (Dashboard, Reports, Settings) that can be hidden when the user wants full-width content.
2. **Persistent filter sidebars** — Filter controls that remain visible alongside a list or table and can be toggled off when not needed.
3. **Secondary content** — Supporting content (details, tools, context) that is shown/hidden based on user preference during a session.

---

# When NOT to Use

1. Content the user must complete before continuing → use Modal.
2. Content that should collapse to a narrow strip rather than fully disappear → use Drawer.
3. Transient contextual content anchored to a specific trigger → use Tooltip.
4. A static container with no toggle behaviour → use Panel.

| Situation | Use Instead |
|---|---|
| Must complete before other interaction | Modal |
| Sidebar that collapses but stays in layout | Drawer |
| Triggered contextual content | Tooltip |
| Static side container | Panel |

---

# Decision Triggers

```yaml
decision_triggers:

  use_sidepanel_if:
    - A sidebar listing navigation items (Dashboard, Reports, Settings) that can be hidden when the user wants full-width content.
    - Filter controls that remain visible alongside a list or table and can be toggled off when not needed.
    - Supporting content (details, tools, context) that is shown/hidden based on user preference during a session.

  do_not_use_sidepanel_if:
    - 1. Content the user must complete before continuing → use Modal.
    - 2. Content that should collapse to a narrow strip rather than fully disappear → use Drawer.
    - 3. Transient contextual content anchored to a specific trigger → use Tooltip.
    - 4. A static container with no toggle behaviour → use Panel.
    - | Situation | Use Instead |
    - | Must complete before other interaction | Modal |
```

---

# Additional Topics

# Component States

- Visible (panel rendered inline, main content narrowed)
- Hidden (panel removed from flow, main content full width)

Transitions between states use CSS animations — respect `prefers-reduced-motion` by reducing or disabling the transition.

---

# Distinguishing SidePanel from Drawer and Tooltip

| | SidePanel | Drawer | Tooltip |
|---|---|---|---|
| **Layout effect** | Inline in flow; fully shows or hides | Always in layout; collapses to narrow strip | Floats above layout; no layout effect |
| **Dismissal** | Fully hidden via X or external toggle | Collapse via `<<` button; remains as narrow strip | Dismissed on click-outside |
| **Persistence** | Shown or hidden per toggle | Always present (expanded or collapsed) | Transient per interaction |
| **Best for** | Navigation, filters, secondary content | Persistent sidebar with structured content | Contextual pickers, previews, options |

---

# Behavioral Rules

1. The SidePanel renders **inline in the document flow** — when shown, it takes up space in the layout; when hidden, that space is released and the main content expands.
2. Toggle is controlled via an X button inside the panel or an external control (e.g., a menu icon button in the main area).
3. Uses CSS transitions for smooth show/hide animation.
4. Only one SidePanel should typically be visible at a time in a given layout context.

---

# Layout and Placement

## Placement

The SidePanel sits alongside the main content area — typically on the left — as an inline sibling in the layout. The main content area expands to fill the space when the panel is hidden.

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Internal content padding: `16px` horizontal, `12px` vertical
- Border between SidePanel and main content: `1px solid $color-border-secondary` (`#D0D9E7`)
- Navigation items inside the panel: `8px` vertical padding per item

---

# Constraints

```yaml
constraints:

  skill_id: sidepanel
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: sidepanel
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Sidepanel and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- The external toggle button must have an accessible name ("Show navigation panel" / "Hide navigation panel")
- The X button inside the panel must have an accessible name ("Close panel")
- When hidden, panel content must be removed from the tab order
- When shown, focus does not automatically move into the panel (it is not a modal dialog) — users Tab into it naturally
- `aria-expanded` on the external toggle button to communicate current state

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
    - Drawer
    - Modal
    - Tooltip

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Sidepanel
```

---

# Validation Rules

```yaml
validation_rules:

  - id: sidepanel_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: sidepanel_storybook_api
    description: Implement SidePanel using PrimeReact Sidepanel per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: sidepanel_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using SidePanel as a modal — it is inline and non-blocking; it should never require the user to interact with it befo
**Severity:** Medium

## Anti-pattern 2
**Problem:** Using SidePanel for transient content anchored to a specific trigger — use Tooltip.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Showing the panel by default when the main content is more important — default to hidden if the panel is supplementary.
**Severity:** Medium


---

# Component Decision Logic

**Default:** Use SidePanel when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: SidePanel (Sidepanel) per Storybook.
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

**Used with:** Navigation items, Filter controls, DataTable or main content (what sits alongside the SidePanel)

**Confused with:**
- Drawer — always in layout; collapses to narrow strip rather than fully hiding
- Modal — blocking overlay; not part of the document flow
- Tooltip — floating, anchored to a trigger; does not affect layout
