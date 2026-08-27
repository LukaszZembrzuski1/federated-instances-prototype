---
name: carousel
description: "Use when implementing the Carousel component for horizontally scrolling data items. Trigger on: carousels of data cards, horizontally scrollable item collections, cyclic/rotating item displays, or the Carousel (Leaderboard) pattern for scrolling through metric items."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Carousel

---

# Component Metadata

```yaml
component: Carousel
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Carousel

category:
  - data
  - display

intent_tags:
  - carousel
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Some views need to display a collection of data items in a horizontal scrolling or cycling layout — a set of summary cards, metric items, or leaderboard entries — when showing all at once would take too much space. Carousel displays a configurable number of items at a time and lets users scroll through the rest.

In RelativityOne, Carousel is used in the Leaderboard pattern — displaying ranked metric items horizontally with navigation controls to scroll through more items than the viewport can show at once.

### Purpose

Display a collection of items in a cyclic, horizontally scrollable layout. Shows `numVisible` items at a time; scrolls `numScroll` items per navigation action. Supports auto-play, navigation buttons, and page indicators.

### Storybook Component

Use the `Carousel` component (under Navigation). Built on PrimeReact Carousel. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADnavigation-carousel--docs`

### Props

| Prop | Type | Description |
|---|---|---|
| `value` | `array` | Array of items to display |
| `numVisible` | `number` | Number of items visible at one time |
| `numScroll` | `number` | Number of items to scroll per navigation |
| `itemTemplate` | `function` | Render function for each item |
| `page` | `number` | Controlled current page index |
| `circular` | `boolean` | Infinite looping |
| `autoplayInterval` | `number` | Auto-advance interval in ms |
| `showNavigators` | `boolean` | Show prev/next navigation buttons |
| `showIndicators` | `boolean` | Show page dot indicators |

### Related Components

- Leaderboard (the data item component most commonly used inside Carousel)
- DataTable (for all items in a tabular list — no carousel needed)

---

# When to Use

1. **Horizontally scrollable metric cards** — A set of summary items (reviewers, scores, statuses) where only a few fit in the viewport and users scroll to see more.
2. **Collection too wide to show all at once** — When all items at full size would overflow the container.
3. **Cyclic display** — When items should rotate automatically (use `circular` + `autoplayInterval`).

---

# When NOT to Use

1. A small set of items that all fit in view → show them inline, no carousel needed.
2. Users need to compare all items simultaneously → use DataTable or a grid.
3. Image slideshows or media galleries → this Carousel is for data items, not image media.
4. Long lists of data — use DataTable with pagination.

---

# Decision Triggers

```yaml
decision_triggers:

  use_carousel_if:
    - A set of summary items (reviewers, scores, statuses) where only a few fit in the viewport and users scroll to see more.
    - When all items at full size would overflow the container.
    - When items should rotate automatically (use `circular` + `autoplayInterval`).

  do_not_use_carousel_if:
    - 1. A small set of items that all fit in view → show them inline, no carousel needed.
    - 2. Users need to compare all items simultaneously → use DataTable or a grid.
    - 3. Image slideshows or media galleries → this Carousel is for data items, not image media.
    - 4. Long lists of data — use DataTable with pagination.
```

---

# Additional Topics

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between visible items: `16px`
- Navigation button margin from items: `8px`

---

# Behavioral Rules

1. Always provide `showNavigators={true}` so users can scroll — do not rely on indicators alone.
2. Set `numVisible` and `numScroll` to match the available width and item size — do not show partial items.
3. Use `circular={true}` only when looping makes sense for the content (e.g., dashboards).
4. `autoplayInterval` should have pause on hover/focus for accessibility.

---

# Constraints

```yaml
constraints:

  skill_id: carousel
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: carousel
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Carousel and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Navigation buttons (prev/next) must have accessible names ("Previous", "Next")
- Page indicators must communicate current position to screen readers (`aria-label` per dot or a live region)
- If `autoplayInterval` is used: provide a pause control; respect `prefers-reduced-motion`
- Each item in the carousel must be reachable via keyboard Tab when visible

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
    - Leaderboard
    - DataTable

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Carousel
```

---

# Validation Rules

```yaml
validation_rules:

  - id: carousel_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: carousel_storybook_api
    description: Implement Carousel using PrimeReact Carousel per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: carousel_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Carousel from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Carousel when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Carousel (Carousel) per Storybook.
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

- Leaderboard (the data item component most commonly used inside Carousel)
- DataTable (for all items in a tabular list — no carousel needed)

---
