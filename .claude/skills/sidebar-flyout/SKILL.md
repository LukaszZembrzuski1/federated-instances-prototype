---
name: sidebar-flyout
description: "Use when implementing the Sidebar [Flyout] component as an overlay panel from a screen edge. Trigger on: flyout panels, slide-in overlays, panels that appear from the left/right/top/bottom edge over the main content, or full-screen overlay panels."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Sidebar [Flyout]

---

# Component Metadata

```yaml
component: SidebarFlyout
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: SidebarFlyout

category:
  - overlay
  - feedback

intent_tags:
  - sidebar_flyout
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Some interactions require a large panel of content to appear temporarily over the main interface — a document preview, a detailed form, a help panel — without navigating to a new page. The Sidebar [Flyout] slides in from any edge of the screen as an overlay, blocking or dimming the background until dismissed.

### Purpose

Display a panel that slides in from the left, right, top, or bottom of the screen as an overlay. The panel appears on top of the main content and is dismissed by clicking outside, pressing Escape, or explicitly closing it.

### Storybook Component

Use the `Sidebar` component (listed as "Sidebar [Flyout]" under Navigation). Built on PrimeReact Sidebar. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADnavigation-sidebar-flyout--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `'left'\|'right'\|'top'\|'bottom'` | — | Which edge the panel slides from |
| `fullScreen` | `boolean` | — | Adds full-screen mode |
| `modal` | `boolean` | — | Whether to show the backdrop overlay |
| `dismissable` | `boolean` | — | Whether clicking outside closes the panel |
| `showCloseIcon` | `boolean` | — | Whether to show the × close button |
| `blockScroll` | `boolean` | — | Block document scrolling while panel is open |

### Related Components

- SidePanel (inline in document flow; not an overlay)
- Drawer (collapsible sidebar alongside main content; not an overlay)
- Modal / Dialog [Modal] (centred overlay; not edge-anchored)
- Tooltip (small floating panel anchored to a trigger; not edge-anchored)

---

# When to Use

1. **Document or item preview** — Slide in a preview panel from the right over the document list without leaving the view.
2. **Detailed form or configuration** — A form too large for a modal but not warranting a full page navigation.
3. **Help or reference panel** — Contextual help, documentation, or guidance that slides in alongside the current task.
4. **Navigation drawer (mobile-style)** — A navigation menu that slides in from the left on smaller viewports.
5. **Full-screen overlay** — Use `fullScreen` when the content requires full attention and full space.

---

# When NOT to Use

1. Persistent panel that should stay visible alongside content → use SidePanel (inline) or Drawer (collapsible).
2. Small contextual content anchored to a trigger → use Tooltip.
3. Simple confirmation or short form → use Modal / Dialog [Modal].
4. One-line hint → use Tooltip.

| Situation | Use Instead |
|---|---|
| Panel stays visible alongside content | SidePanel or Drawer |
| Small popup anchored to trigger | Tooltip |
| Centred blocking dialog | Modal / Dialog [Modal] |

---

# Decision Triggers

```yaml
decision_triggers:

  use_sidebar_flyout_if:
    - Slide in a preview panel from the right over the document list without leaving the view.
    - A form too large for a modal but not warranting a full page navigation.
    - Contextual help, documentation, or guidance that slides in alongside the current task.
    - A navigation menu that slides in from the left on smaller viewports.
    - Use `fullScreen` when the content requires full attention and full space.

  do_not_use_sidebar_flyout_if:
    - 1. Persistent panel that should stay visible alongside content → use SidePanel (inline) or Drawer (collapsible).
    - 2. Small contextual content anchored to a trigger → use Tooltip.
    - 3. Simple confirmation or short form → use Modal / Dialog [Modal].
    - 4. One-line hint → use Tooltip.
    - | Situation | Use Instead |
    - | Panel stays visible alongside content | SidePanel or Drawer |
```

---

# Additional Topics

# Distinguishing Sidebar [Flyout] from SidePanel and Drawer

| | Sidebar [Flyout] | SidePanel | Drawer |
|---|---|---|---|
| **Nature** | Overlay from screen edge | Inline in document flow | Collapsible inline sidebar |
| **Effect on layout** | None — overlays main content | Shifts layout (shows/hides space) | Shifts layout (collapses to strip) |
| **Dismissal** | Click outside, Esc, or × | X button or external toggle | `<<` collapse button |
| **Persistence** | Transient — opens and closes | Persistent — shown or hidden | Always present — expanded or collapsed |
| **Position** | Any edge (left, right, top, bottom) | Typically left | Typically left or right |

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Internal content padding: `16px` horizontal, `12px` vertical
- Header border-bottom: `1px solid $color-border-secondary` (`#D0D9E7`)
- Shadow: `$box-shadow-level-2` to distinguish from page content

---

# Behavioral Rules

1. The `dismissable` prop controls whether clicking outside closes the panel. Default to `true` for non-critical content; consider `false` for forms with unsaved data.
2. Use `blockScroll` when the panel is large and background interaction would be confusing.
3. Always show a close control (`showCloseIcon` or an explicit close button) — users must be able to dismiss without a mouse.
4. One panel open at a time; do not layer multiple flyouts.

---

# Constraints

```yaml
constraints:

  skill_id: sidebar-flyout
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: sidebar-flyout
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact SidebarFlyout and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- `role="dialog"` or PrimeReact's built-in ARIA attributes handle this
- Focus moves into the panel when it opens
- Focus is trapped inside the panel while open
- Escape closes the panel
- Focus returns to the trigger element when the panel closes
- `aria-label` or `aria-labelledby` on the panel for screen reader announcement

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
    - Modal / Dialog [Modal]
    - Tooltip

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - SidebarFlyout
```

---

# Validation Rules

```yaml
validation_rules:

  - id: sidebar-flyout_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: sidebar-flyout_storybook_api
    description: Implement Sidebar [Flyout] using PrimeReact SidebarFlyout per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: sidebar-flyout_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using Sidebar [Flyout] when content should persist alongside the main view — use SidePanel or Drawer.
**Severity:** Medium

## Anti-pattern 2
**Problem:** No close control — always provide a way to dismiss.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Opening multiple flyout panels simultaneously.
**Severity:** Medium

## Anti-pattern 4
**Problem:** Using for a single-line hint or small picker — use Tooltip.
**Severity:** Medium


---

# Component Decision Logic

**Default:** Use Sidebar [Flyout] when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Sidebar [Flyout] (SidebarFlyout) per Storybook.
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

- SidePanel (inline in document flow; not an overlay)
- Drawer (collapsible sidebar alongside main content; not an overlay)
- Modal / Dialog [Modal] (centred overlay; not edge-anchored)
- Tooltip (small floating panel anchored to a trigger; not edge-anchored)

---
