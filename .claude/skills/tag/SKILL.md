---
name: tag
description: "Use when implementing Tag for read-only text labels and status indicators. Trigger on: tags, status labels, category labels, document tags, status pills, or any compact read-only text classification label."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Tag

---

# Component Metadata

```yaml
component: Tag
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Tag

category:
  - data
  - display

intent_tags:
  - tag
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Purpose

Display a read-only text label for classification, status, or categorisation — document tags, status indicators, category labels. Supports severity colours, rounded corners, and an optional icon.

### Storybook Component

Use the `Tag` component (under Feedback). Built on PrimeReact Tag. Pre-composed severity variants: `TagInfo`, `TagWarning`, `TagDanger`, `TagSuccess`. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADfeedback-tag--docs`

### Props

| Prop | Type | Default | Options | Description |
|---|---|---|---|---|
| `value` | `ReactNode` | — | — | Text content of the tag |
| `severity` | `string` | — | `info`, `warning`, `danger`, `success`, `secondary`, `contrast` | Colour variant |
| `rounded` | `boolean` | `true` | — | Rounded corners (default on) |
| `icon` | `string` | — | — | Icon to display in the tag |

> **Note on severity naming:** Tag uses `'danger'` (not `'negative'`) for the alert colour. This is the PrimeReact convention for this component.

### Pre-composed severity variants

Use `TagInfo`, `TagWarning`, `TagDanger`, or `TagSuccess` directly instead of manually setting `severity`.

### Related Components

- Badge (numerical counts — use for numbers, not text labels)
- Chip (interactive/removable labels — use when the label can be removed)
- Chips (multi-value input — use when users type tag values)

---

# When to Use

1. **Document or content tags** — Classification labels applied to documents: "Privileged," "Hot Doc," "Responsive."
2. **Status indicators** — "Active," "Draft," "Archived," "In Review" — use severity to colour by status type.
3. **Category labels** — Read-only attribute labels in lists, cards, or detail views.
4. **Coding values** — Displaying applied codes or classifications in document review.

---

# When NOT to Use

1. Numerical count indicators → use Badge.
2. Removable or interactive labels → use Chip.
3. Labels the user types → use Chips (input) or MultiSelect.
4. Persistent on/off setting → use InputSwitch.

---

# Decision Triggers

```yaml
decision_triggers:

  use_tag_if:
    - Classification labels applied to documents: \"Privileged,\" \"Hot Doc,\" \"Responsive.\"
    - \"Active,\" \"Draft,\" \"Archived,\" \"In Review\" — use severity to colour by status type.
    - Read-only attribute labels in lists, cards, or detail views.
    - Displaying applied codes or classifications in document review.

  do_not_use_tag_if:
    - 1. Numerical count indicators → use Badge.
    - 2. Removable or interactive labels → use Chip.
    - 3. Labels the user types → use Chips (input) or MultiSelect.
    - 4. Persistent on/off setting → use InputSwitch.
```

---

# Additional Topics

# Severity Guide

| Severity | Use for |
|---|---|
| `success` | Completed, approved, responsive |
| `warning` | Needs attention, pending review |
| `danger` | Critical, rejected, overdue |
| `info` | Informational, neutral status |
| `secondary` | Default/neutral label with lower emphasis |
| `contrast` | High-contrast label for dark backgrounds |

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Tag internal padding: `2px` vertical, `8px` horizontal
- Gap between tags in a group: `4px` or `8px`
- Gap between tag and adjacent text/label: `4px`

---

# Constraints

```yaml
constraints:

  skill_id: tag
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: tag
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Tag and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Tag content must be text — do not use icon-only tags without a visible label
- Severity colour must be supplemented by the text value ("Active" not just a green dot)
- Tags are read-only and not focusable; do not add click handlers to Tags — use Chip for interactive labels

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
    - Badge
    - Chip
    - Chips

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Tag
```

---

# Validation Rules

```yaml
validation_rules:

  - id: tag_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: tag_storybook_api
    description: Implement Tag using PrimeReact Tag per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: tag_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Tag from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Tag when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Tag (Tag) per Storybook.
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

- Badge (numerical counts — use for numbers, not text labels)
- Chip (interactive/removable labels — use when the label can be removed)
- Chips (multi-value input — use when users type tag values)

---
