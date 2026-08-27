---
name: resizable-group
description: "Use when implementing ResizableGroup for user-resizable split layouts. Trigger on: split panes, resizable panels, horizontal or vertical split views, adjustable layout regions, or any layout where users can drag a divider to resize sections."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# ResizableGroup

---

# Component Metadata

```yaml
component: ResizableGroup
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: ResizableGroup

category:
  - navigation
  - layout

intent_tags:
  - resizable_group
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Some views need two or more regions where the user can adjust the relative size — a file browser alongside a preview, a filter panel alongside a results list, or a document viewer with a coding panel. ResizableGroup provides a drag-to-resize split layout with configurable min/max sizes and optional collapse.

### Purpose

Resizable split layout with horizontal or vertical orientation. Declare ResizablePanel children; resize handles are injected automatically between them. Built on `react-resizable-panels`.

### Storybook Component

Use `ResizableGroup` (under Containment). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-resizablegroup--docs`

### Components

| Component | Role |
|---|---|
| `ResizableGroup` | Container — sets orientation, disabled state, layout defaults |
| `ResizablePanel` | Individual resizable region — configure size, min/max, collapsible |
| `ResizableSeparator` | Injected automatically between panels — do not add manually |

### ResizableGroup Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal'\|'vertical'` | `'horizontal'` | Split direction |
| `defaultLayout` | `Layout` | — | Default size distribution (for persistence) |
| `disabled` | `boolean` | — | Disables all resize handles |
| `onLayoutChange` | `function` | — | Called during resize (every move) |
| `onLayoutChanged` | `function` | — | Called after resize completes — use this for saving layouts |

### ResizablePanel Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultSize` | `string\|number` | — | Initial size (e.g., `"50%"` or `200` for px) |
| `minSize` | `string\|number` | `0%` | Minimum size |
| `maxSize` | `string\|number` | `100%` | Maximum size |
| `collapsible` | `boolean` | `false` | Panel can collapse when dragged below minSize |
| `collapsedSize` | `string\|number` | `0` | Size when collapsed |
| `disabled` | `boolean` | — | Prevents this panel from being resized |

### Related Components

- Drawer (collapsible sidebar, not user-resizable)
- SidePanel (inline show/hide, not user-resizable)
- Panel (static container)

---

# When to Use

1. **Document viewer with coding panel** — User can resize the viewer vs the coding form.
2. **Filter panel + results list** — User can give more space to results or filters.
3. **Split editor** — Two panes for comparing or editing content side by side.
4. **Adjustable workspace layout** — Any view where user panel size preferences should be saved and restored.

---

# When NOT to Use

1. Fixed layout where users should not resize → use standard CSS layout or Panel.
2. Simple collapsible sidebar → use Drawer.
3. Panels that toggle fully hidden/visible → use SidePanel or Sidebar [Flyout].

---

# Decision Triggers

```yaml
decision_triggers:

  use_resizable_group_if:
    - User can resize the viewer vs the coding form.
    - User can give more space to results or filters.
    - Two panes for comparing or editing content side by side.
    - Any view where user panel size preferences should be saved and restored.

  do_not_use_resizable_group_if:
    - 1. Fixed layout where users should not resize → use standard CSS layout or Panel.
    - 2. Simple collapsible sidebar → use Drawer.
    - 3. Panels that toggle fully hidden/visible → use SidePanel or Sidebar [Flyout].
```

---

# Additional Topics

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- The resize separator should be visually distinct — a visible handle or border line
- Internal panel content padding: `16px` on all sides

---

# Behavioral Rules

1. Use `onLayoutChanged` (not `onLayoutChange`) to save layout state — it fires once when the pointer is released, not on every pixel of movement.
2. Set `minSize` on each panel to prevent accidental full collapse. Use `collapsible` only when intentional collapse to zero is desired.
3. Use `defaultLayout` to restore a user's saved layout from preferences or local storage.

---

# Constraints

```yaml
constraints:

  skill_id: resizable-group
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: resizable-group
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact ResizableGroup and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- The ResizableSeparator should have `role="separator"` with `aria-orientation`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Keyboard resize: focus the separator and use arrow keys to adjust
- `aria-label` on the separator to identify which panels it divides (e.g., "Resize between filter panel and results")

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
    - SidePanel
    - Panel

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - ResizableGroup
```

---

# Validation Rules

```yaml
validation_rules:

  - id: resizable-group_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: resizable-group_storybook_api
    description: Implement ResizableGroup using PrimeReact ResizableGroup per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: resizable-group_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact ResizableGroup from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use ResizableGroup when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: ResizableGroup (ResizableGroup) per Storybook.
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

- Drawer (collapsible sidebar, not user-resizable)
- SidePanel (inline show/hide, not user-resizable)
- Panel (static container)

---
