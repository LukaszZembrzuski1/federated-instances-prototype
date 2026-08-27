---
name: chip
description: "Use when implementing Chip for displaying a compact label, attribute, or tag. Trigger on: chips, compact labels, tags with icons, removable tags, or status/severity indicators in a compact pill shape."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Chip

---

# Component Metadata

```yaml
component: Chip
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Chip

category:
  - data
  - display

intent_tags:
  - chip
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need compact visual indicators for attributes, tags, filters, or categories — things that need a label but are too small for a full Badge or Tag. A Chip can optionally be removable and can carry a severity colour to indicate status.

### Purpose

Compact element to represent an input, attribute, or action. Supports text label, icon, image, severity colour, and optional remove button.

### Storybook Component

Use the `Chip` component (under Containment). Built on PrimeReact Chip. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-chip--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Text displayed in the chip |
| `severity` | `'success'\|'warning'\|'danger'\|'info'` | — | Colour variant |
| `icon` | `string` | — | Icon to display in the chip |
| `image` | `string` | — | Image URL to display |
| `removable` | `boolean` | `false` | Whether the chip shows a remove button |

> **Note on severity naming:** Chip uses `'danger'` (not `'negative'`) for the destructive/alert colour. This is the PrimeReact convention for this component.

### Related Components

- Tag (similar display; use Tag for document-level labels and status indicators — see Tag skill for the distinction)
- Chips (multi-value input — use when users type values that become chips)
- Badge (numerical indicators)

---

# When to Use

1. **Filter tags** — Applied filter indicators that the user can remove ("Status: Active ×").
2. **Attribute labels** — Compact labels for attributes, categories, or assigned values.
3. **Status indicators with colour** — Use `severity` to indicate success, warning, danger, or info state.
4. **Removable selections** — Selected items the user can deselect by clicking ×.

---

# When NOT to Use

1. Entering multiple free-form values → use Chips (the input component).
2. Numerical count or status badge → use Badge.
3. A full-sized interactive action → use Button.

---

# Decision Triggers

```yaml
decision_triggers:

  use_chip_if:
    - Applied filter indicators that the user can remove (\"Status: Active ×\").
    - Compact labels for attributes, categories, or assigned values.
    - Use `severity` to indicate success, warning, danger, or info state.
    - Selected items the user can deselect by clicking ×.

  do_not_use_chip_if:
    - 1. Entering multiple free-form values → use Chips (the input component).
    - 2. Numerical count or status badge → use Badge.
    - 3. A full-sized interactive action → use Button.
```

---

# Additional Topics

# Chip vs Tag

Both Chip and Tag display compact labels. The distinction:
- **Chip** — for interactive or removable labels; supports images and icons; used in UI controls (filters, selections)
- **Tag** — for read-only classification labels on content (document tags, status labels); more commonly used for display in lists and tables

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Chip internal padding: `4px` vertical, `8px` horizontal
- Gap between chips in a group: `4px` or `8px`

---

# Constraints

```yaml
constraints:

  skill_id: chip
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: chip
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Chip and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Removable chips: the remove button must have an accessible name ("Remove [label]")
- Severity is conveyed via colour — always include a text label; do not rely on colour alone
- When chips represent filter selections, announce additions/removals via `aria-live`

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
    - Tag
    - Chips
    - Badge

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Chip
```

---

# Validation Rules

```yaml
validation_rules:

  - id: chip_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: chip_storybook_api
    description: Implement Chip using PrimeReact Chip per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: chip_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Chip from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Chip when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Chip (Chip) per Storybook.
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

- Tag (similar display; use Tag for document-level labels and status indicators — see Tag skill for the distinction)
- Chips (multi-value input — use when users type values that become chips)
- Badge (numerical indicators)

---
