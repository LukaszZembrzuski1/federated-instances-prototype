---
name: note
description: "Use when implementing the Note component for displaying informational callouts. Trigger on: informational notes, hints, callout boxes, advisory text blocks, or any styled container for supplementary information that should stand out from the main content."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Note

---

# Component Metadata

```yaml
component: Note
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Note

category:
  - data
  - display

intent_tags:
  - note
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Documentation, help text, and warnings sometimes need to stand out from the surrounding content without the severity of an error or warning Message. Note provides a simple styled container for informational content.

### Purpose

Display informational content in a visually distinct container. Accepts any ReactNode children — plain text, lists, headings, or mixed content.

### Storybook Component

Use the `Note` component (under Containment). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-note--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children*` | `ReactNode` | — | Content to display inside the Note |
| `className` | `string` | — | Additional CSS class names |

### Related Components

- Message (for success/error/warning/info feedback with severity styling)
- ValidationMessage (for field-level validation errors)
- Tooltip (for hover-only supplemental info)

---

# When to Use

1. **Informational callouts** — "Note: This setting applies to all users in the workspace."
2. **Help or guidance text** — Advisory content that supplements a form or config screen.
3. **Documentation-style notes** — Content with a title and structured text (list, paragraphs) that should visually separate from surrounding content.

---

# When NOT to Use

1. Success, error, warning, or info feedback with severity → use Message.
2. Field-level validation errors → use ValidationMessage.
3. Brief hover hint → use Tooltip.

---

# Decision Triggers

```yaml
decision_triggers:

  use_note_if:
    - \"Note: This setting applies to all users in the workspace.\"
    - Advisory content that supplements a form or config screen.
    - Content with a title and structured text (list, paragraphs) that should visually separate from surrounding content.

  do_not_use_note_if:
    - 1. Success, error, warning, or info feedback with severity → use Message.
    - 2. Field-level validation errors → use ValidationMessage.
    - 3. Brief hover hint → use Tooltip.
```

---

# Additional Topics

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Internal padding: `12px` vertical, `16px` horizontal
- Margin above and below in the flow: `16px`

---

# Constraints

```yaml
constraints:

  skill_id: note
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: note
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Note and this skill's sections
```

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
    - Message
    - ValidationMessage
    - Tooltip

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Note
```

---

# Validation Rules

```yaml
validation_rules:

  - id: note_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: note_storybook_api
    description: Implement Note using PrimeReact Note per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: note_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Note from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Note when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Note (Note) per Storybook.
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

- Message (for success/error/warning/info feedback with severity styling)
- ValidationMessage (for field-level validation errors)
- Tooltip (for hover-only supplemental info)

---
