---
name: tree
description: "Use when implementing Tree for hierarchical data with expand/collapse. Trigger on: tree view, folder tree, expandable list, parent-child hierarchy, workspace folder structure, or any data with nested levels that users expand and collapse."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Tree

---

# Component Metadata

```yaml
component: Tree
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-18
design_system: Aero v3 (called "Tree Browser" in Figma)
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Tree
figma_component_set: "Tree Browser" on "Tree (Tree Browser)" page
figma_variants:
  - Type=All Collapsed (flat list of top-level folders with expand arrows)
  - Type=Sample Variations (mixed expanded/collapsed with checkboxes and nesting)

category:
  - data
  - display

intent_tags:
  - tree
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to browse and navigate hierarchical data — folder structures, workspace hierarchies, category trees — where items can have children that expand/collapse. A flat DataTable cannot represent this parent-child relationship.

In RelativityOne, Tree is used for folder navigation, workspace folder structures, saved search category trees, and any nested hierarchical browsing.

### Purpose

Display hierarchical (parent-child) data with expand/collapse nodes. Supports selection, filtering, drag-and-drop, expand/collapse all, and tree lines.

### Storybook Component

Use the `Tree` component (under Data & Display). Built on PrimeReact Tree. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADdata-display-tree--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value*` | `TreeNodeType[]` | — | Tree nodes to display |
| `treeLines` | `boolean` | `true` | Show connecting lines between nodes |
| `selectionMode` | `string` | — | Selection mode (single, multiple, checkbox) |
| `filterBy` | `string` | `'label'` | Node field used for filtering |
| `filterMode` | `string` | `'lenient'` | Filter match mode: `lenient` or `strict` |
| `dragDrop` | `boolean` | — | Enable drag-and-drop reordering |
| `allButton` | `boolean` | — | Show Expand All / Collapse All button |
| `expandAllButtonText` | `string` | `'Expand All'` | Label for expand-all action |
| `collapseAllButtonText` | `string` | `'Collapse All'` | Label for collapse-all action |

### Related Components

- DataTable (flat tabular data — use when rows have no parent-child structure)
- TertiaryNavigation (side navigation — use for clickable navigation items with statuses)
- Accordion (collapsible sections — use for flat groups, not nested hierarchies)

---

# When to Use

1. **Folder or file structures** — Workspace folders, document folders, category trees.
2. **Hierarchical navigation** — Browse a nested structure where users expand nodes to see children.
3. **Nested selections** — Select nodes at any level of a hierarchy (use `selectionMode` with checkbox).
4. **Drag-and-drop reordering** — Reorganise hierarchy via drag when `dragDrop={true}`.

---

# When NOT to Use

1. Flat list with no hierarchy → use DataTable.
2. Navigation menu with clickable items and statuses → use TertiaryNavigation.
3. Collapsible content sections (not data) → use Accordion or Panel.

---

# Decision Triggers

```yaml
decision_triggers:

  use_tree_if:
    - Workspace folders, document folders, category trees.
    - Browse a nested structure where users expand nodes to see children.
    - Select nodes at any level of a hierarchy (use `selectionMode` with checkbox).
    - Reorganise hierarchy via drag when `dragDrop={true}`.

  do_not_use_tree_if:
    - 1. Flat list with no hierarchy → use DataTable.
    - 2. Navigation menu with clickable items and statuses → use TertiaryNavigation.
    - 3. Collapsible content sections (not data) → use Accordion or Panel.
```

---

# Additional Topics

# Filter Modes

- **Lenient (default):** Shows a node if the node itself or any of its descendants match. Expanding matched nodes is not required.
- **Strict:** Only shows nodes that directly match the filter; parent nodes are shown only if a child matches.

Use `lenient` for most browsing scenarios; use `strict` only when exact matching is required.

---

# Expand All / Collapse All

Set `allButton={true}` to show Expand All / Collapse All controls above the tree. Useful for trees with many levels where users need a quick way to navigate.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Node item padding: `8px` vertical, `8px` horizontal
- Child indent per level: `16px`
- Tree lines use `$color-border-secondary` (`#D0D9E7`)

---

# Constraints

```yaml
constraints:

  skill_id: tree
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: tree
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Tree and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Tree container: `role="tree"`; each node: `role="treeitem"` with `aria-expanded` (for parents) and `aria-level`
- Keyboard: arrow keys expand/collapse and navigate; Enter activates a node
- Selection: `aria-selected` on selected nodes
- Filter input must have an accessible label
- Expand/Collapse All buttons must have accessible names

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
    - DataTable
    - TertiaryNavigation
    - Accordion

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Tree
```

---

# Validation Rules

```yaml
validation_rules:

  - id: tree_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: tree_storybook_api
    description: Implement Tree using PrimeReact Tree per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: tree_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Tree from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Tree when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Tree (Tree) per Storybook.
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

- DataTable (flat tabular data — use when rows have no parent-child structure)
- TertiaryNavigation (side navigation — use for clickable navigation items with statuses)
- Accordion (collapsible sections — use for flat groups, not nested hierarchies)

---
