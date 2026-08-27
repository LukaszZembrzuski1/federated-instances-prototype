---
name: divider
description: "Use when implementing Divider components for visual separation. Trigger on: section separators, horizontal rules, vertical rules between toolbar groups, menu group dividers, or content block separators."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Divider

---

# Component Metadata

```yaml
component: Divider
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Divider

category:
  - data
  - display

intent_tags:
  - divider
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need visual separation between sections, list items, or grouped controls without adding a full panel or heading. A Divider is a line — horizontal or vertical — that creates a clear break and improves scanability.

In RelativityOne, dividers separate form sections, group menu items (actions vs destructive), divide toolbar button groups, and separate content blocks in document review, workspace config, admin, or search.

### Purpose

Provide a visual separator between content blocks, list items, or UI groups. Supports horizontal and vertical orientation, line style variants, and optional text/content in the middle.

### Storybook Component

Use the `Divider` component (under Containment). Built on PrimeReact Divider. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-divider--docs`

### Props

| Prop | Type | Options | Description |
|---|---|---|---|
| `layout` | `string` | `horizontal`, `vertical` | Orientation |
| `type` | `string` | `solid`, `dashed`, `dotted` | Border style |
| `align` | `string` | `left`, `center`, `right`, `top`, `bottom` | Alignment of content within the divider |

### Related Components

- Panel (section with title — use instead when strong grouping is needed)
- Menu (dividers between item groups)
- Toolbar [Action Bar] (vertical dividers between button groups)

---

# When to Use

1. **Between form or content sections** — Between "Details" and "Settings" blocks when not using Panel; between steps in a form.
2. **Between menu or list groups** — In a dropdown or context menu: group 1 (Open, Edit), divider, group 2 (Delete, Archive).
3. **In a toolbar** — Vertical divider between logical button groups (view controls | filter | export).
4. **With a label** — "OR" between login options, "Optional" before an optional section.

---

# When NOT to Use

1. A heading or Panel already provides the separation — avoid redundancy.
2. The break should be resizable → use ResizableGroup.
3. Only spacing is needed with no line → use margin.
4. Strong structural grouping with a title is needed → use Panel or FormFieldset.

| Situation | Use Instead |
|---|---|
| Section with title | Panel or heading |
| Resizable split | ResizableGroup |
| Only spacing, no line | Margin |
| Strong grouping | Panel, FormFieldset |

---

# Decision Triggers

```yaml
decision_triggers:

  use_divider_if:
    - Between \"Details\" and \"Settings\" blocks when not using Panel; between steps in a form.
    - In a dropdown or context menu: group 1 (Open, Edit), divider, group 2 (Delete, Archive).
    - Vertical divider between logical button groups (view controls | filter | export).
    - \"OR\" between login options, \"Optional\" before an optional section.

  do_not_use_divider_if:
    - 1. A heading or Panel already provides the separation — avoid redundancy.
    - 2. The break should be resizable → use ResizableGroup.
    - 3. Only spacing is needed with no line → use margin.
    - 4. Strong structural grouping with a title is needed → use Panel or FormFieldset.
    - | Situation | Use Instead |
    - | Section with title | Panel or heading |
```

---

# Behavioral Rules

1. Use semantic `<hr>` for major section breaks — screen readers can announce "separator."
2. Decorative dividers (between toolbar buttons) should be `aria-hidden="true"` so they don't add noise.
3. Do not overuse — too many dividers create visual noise. Prefer spacing or Panel grouping.
4. Line color must have sufficient contrast against the background to be visible.

---

# Layout and Placement

- **Horizontal:** full width of the parent container; between sections or list items
- **Vertical:** full height of its container; between inline elements like toolbar groups

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Margin above and below a horizontal divider: `8px` minimum
- Margin left and right of a vertical divider: `4px` or `8px`
- Content within a divider (e.g., "OR" label): `8px` padding each side

---

# Constraints

```yaml
constraints:

  skill_id: divider
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: divider
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Divider and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Major section breaks: use `<hr>` for semantic meaning
- Decorative dividers (toolbar, menu): add `aria-hidden="true"`
- Label content inside a divider (e.g., "OR"): must be in the DOM as real text, not only visual
- Divider itself has no focus; Tab skips past it

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
    - Panel
    - Menu
    - Toolbar [Action Bar]

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Divider
```

---

# Validation Rules

```yaml
validation_rules:

  - id: divider_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: divider_storybook_api
    description: Implement Divider using PrimeReact Divider per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: divider_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Divider from Storybook.
**Severity:** High


---

# Component Decision Logic

**Menu has "Open, Edit" then "Delete" — need a visual group break:**
→ Divider between the groups.

**User needs to resize two panels:**
→ Not a Divider. Use ResizableGroup.

**Two form sections need clear separation and titles:**
→ Consider Panel or FormFieldset with headings — stronger structure than a Divider.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Divider (Divider) per Storybook.
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

- Panel (section with title — use instead when strong grouping is needed)
- Menu (dividers between item groups)
- Toolbar [Action Bar] (vertical dividers between button groups)

---
