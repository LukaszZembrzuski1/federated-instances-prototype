---
name: drawer
description: "Use when implementing the Drawer component as a collapsible sidebar alongside the main content area. Trigger on: collapsible side panels, persistent sidebars that can be collapsed to save space, or any sidebar that stays in the layout when collapsed rather than disappearing."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Drawer

---

# Component Metadata

```yaml
component: Drawer
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Drawer

category:
  - overlay
  - feedback

intent_tags:
  - drawer
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need a persistent sidebar alongside the main application area that can be collapsed when more space is needed. Unlike a modal or floating panel, the Drawer stays in the layout — it narrows when collapsed rather than disappearing — so users can expand it again without losing context.

In RelativityOne, the Drawer can be used for structured sidebars in document review, configuration panels, or any persistent secondary content that users may want to collapse to reclaim horizontal space.

### Purpose

Provide a collapsible sidebar container that sits alongside the main content. Expands and collapses in place using a `<<` / `>>` toggle — does not overlay or block the main content.

### User Goal

- Access structured secondary content alongside the main view
- Collapse the sidebar to gain more working space
- Expand it again when needed without navigating away

### Interaction Type

- Display information
- Navigate (when used as a navigation sidebar)
- Collect input (when used as a filter or config panel)

### Storybook Component

Use the `Drawer` component. Storybook is the reference for props and API: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-drawer--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — (required) | Title displayed in the drawer header |
| `initialCollapsed` | `boolean` | `true` | Whether the drawer starts collapsed |
| `children` | `ReactNode` | — | Content displayed inside the drawer body |

### Related Components

- SidePanel (inline show/hide; fully hides rather than collapses)
- Modal (blocking overlay; not part of layout)
- Panel (static container; no collapse behaviour)

---

# When to Use

1. **Persistent collapsible sidebar** — Content that should always be accessible alongside the main area but can be collapsed to save space (e.g., a filter panel, a document metadata sidebar, a tools panel).
2. **Structured secondary content** — When the sidebar has a clear title and contained content that belongs alongside the main view for the duration of the session.
3. **User-controlled space management** — When users should be able to choose how much space the sidebar takes up by collapsing or expanding it themselves.

---

# When NOT to Use

1. Content the user must complete before continuing → use Modal.
2. Transient contextual content anchored to a specific trigger → use Tooltip.
3. A navigation panel that should be fully hidden rather than collapsed → use SidePanel.
4. A simple static container with no collapse behaviour → use Panel.

| Situation | Use Instead |
|---|---|
| Must complete before other interaction | Modal |
| Triggered contextual content | Tooltip |
| Fully hidden/shown navigation panel | SidePanel |
| Static side container | Panel |

---

# Decision Triggers

```yaml
decision_triggers:

  use_drawer_if:
    - Content that should always be accessible alongside the main area but can be collapsed to save space (e.g., a filter panel, a document metadata sidebar, a tools panel).
    - When the sidebar has a clear title and contained content that belongs alongside the main view for the duration of the session.
    - When users should be able to choose how much space the sidebar takes up by collapsing or expanding it themselves.

  do_not_use_drawer_if:
    - 1. Content the user must complete before continuing → use Modal.
    - 2. Transient contextual content anchored to a specific trigger → use Tooltip.
    - 3. A navigation panel that should be fully hidden rather than collapsed → use SidePanel.
    - 4. A simple static container with no collapse behaviour → use Panel.
    - | Situation | Use Instead |
    - | Must complete before other interaction | Modal |
```

---

# Additional Topics

# Component States

- Expanded (full width, content visible)
- Collapsed (narrow strip, content hidden, toggle still visible)

---

# Distinguishing Drawer from SidePanel and Tooltip

| | Drawer | SidePanel | Tooltip |
|---|---|---|---|
| **Layout effect** | Always in layout; collapses to narrow strip | Inline in document flow; fully shows or hides | Floats above layout; no layout effect |
| **Dismissal** | Collapse via `<<` button; remains as narrow strip | Fully hidden via X or external toggle | Dismissed on click-outside |
| **Persistence** | Always present (expanded or collapsed) | Shown or hidden per toggle | Transient per interaction |
| **Best for** | Persistent sidebar with structured content | Navigation, filters, secondary content panels | Contextual pickers, previews, options |

---

# Behavioral Rules

1. The Drawer collapses in place — it narrows but remains in the layout. It does not overlay content.
2. The `<<` / `>>` toggle in the header controls expand/collapse. This must always be visible and keyboard accessible.
3. Start collapsed (`initialCollapsed: true`) by default unless the sidebar content is critical and should be immediately visible.
4. When collapsed, the Drawer should still reserve its collapsed width in the layout so the main content area does not jump.

---

# Layout and Placement

## Placement

The Drawer sits alongside the main content area — typically on the left or right side — as a sibling in the layout, not an overlay. The main content area adjusts its width when the Drawer expands or collapses.

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Internal content padding: `16px` horizontal, `12px` vertical
- Header: title + collapse toggle with `8px` gap between them
- Border between Drawer and main content: `1px solid $color-border-secondary` (`#D0D9E7`)

---

# Constraints

```yaml
constraints:

  skill_id: drawer
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
  component_skill: drawer
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Drawer and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- The collapse/expand toggle must have an accessible name ("Collapse sidebar" / "Expand sidebar")
- When collapsed, the drawer content must be hidden from the tab order (`aria-hidden="true"` or `display: none` on the body)
- When expanded, focus management is not required (it is not a modal), but all interactive content inside must be reachable via Tab
- `aria-expanded` on the toggle button to communicate current state

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
    - Modal
    - Tooltip

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Drawer
```

---

# Validation Rules

```yaml
validation_rules:

  - id: drawer_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: drawer_storybook_api
    description: Implement Drawer using PrimeReact Drawer per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: drawer_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using Drawer as a modal or overlay — it is always in the layout, never overlaying.
**Severity:** Medium

## Anti-pattern 2
**Problem:** Setting `initialCollapsed: false` when the sidebar is not immediately needed — start collapsed to give users more workin
**Severity:** Medium

## Anti-pattern 3
**Problem:** Hiding content inside a collapsed Drawer that is still in the tab order — remove it from tab order when collapsed.
**Severity:** Medium


---

# Component Decision Logic

**Default:** Use Drawer when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Drawer (Drawer) per Storybook.
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

**Used with:** Panel (content inside the drawer body), SidePanel (alternative for fully hideable panels), DataTable or main content (what sits alongside the Drawer)

**Confused with:**
- SidePanel — inline component that fully hides/shows; does not collapse to a narrow strip
- Modal — blocking overlay; not part of layout
- Tooltip — floating, anchored to a trigger; does not affect layout
