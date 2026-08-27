---
name: air-header
description: "Use when implementing AirHeader for aiR product branding headers. Trigger on: aiR product headers, AI feature branding, header components in aiR context, or any component needing the aiR visual identity header."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# AirHeader

---

# Component Metadata

```yaml
component: AirHeader
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: AirHeader

category:
  - component
  - utility

intent_tags:
  - air_header
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

The aiR product has a distinct visual identity that needs to be consistently represented in its UI — dialogs, panels, and feature entry points. AirHeader provides the branded header component that carries this identity.

### Purpose

Branding header component for the aiR product. Used inside AirDialog and other aiR feature surfaces to provide consistent aiR visual identity. Supports icon position and content slots for project titles, subtitles, and links.

### Storybook Component

Use the `AirHeader` component (under Air Components). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADair-components-airheader--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `iconPosition` | `'left'` | `'left'` | Position of the aiR icon |
| `children` | `ReactNode` | — | Content inside the header (project titles, subtitles, links) |

### Content patterns (via children)

- **Basic** — aiR icon only
- **With project name** — Icon + title + subtitle
- **With two items** — Icon + two title/subtitle/link items side by side
- **With three items** — Icon + three items

Use `IconTextItem` components as children to compose multi-item AirHeader layouts.

### Related Components

- AirDialog (uses AirHeader as its dialog header)
- IconTextItem (compose as children for title/subtitle entries)
- ImageIcon (the AiIcon or BrainIcon displayed in the header)

---

# When to Use

Use AirHeader exclusively in the **aiR product context** — dialogs, panels, entry points, and feature headers that need aiR branding. Do not use for standard application headers or non-aiR features.

---

# When NOT to Use

1. Standard application headers → use the app's primary header component.
2. Non-aiR feature dialogs → use Dialog [Modal] with a plain title.
3. General page sections → use a heading element.

---

# Decision Triggers

```yaml
decision_triggers:

  use_air_header_if:
    - Use AirHeader exclusively in the **aiR product context** — dialogs, panels, entry points, and feature headers that need aiR branding. Do not use for standard application headers or non-aiR features.

  do_not_use_air_header_if:
    - 1. Standard application headers → use the app's primary header component.
    - 2. Non-aiR feature dialogs → use Dialog [Modal] with a plain title.
    - 3. General page sections → use a heading element.
```

---

# Additional Topics

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Internal padding follows the aiR branding spec — do not override with arbitrary values
- Gap between icon and content: `8px`
- Gap between multiple content items: `16px`

---

# Constraints

```yaml
constraints:

  skill_id: air-header
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: air-header
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact AirHeader and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- The AirHeader is typically a presentational branding element — ensure any actionable content within it (links via IconTextItem) has proper accessible names
- When used inside AirDialog, the dialog's `aria-labelledby` should reference a visible title within the header content

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
    - AirDialog
    - IconTextItem
    - ImageIcon

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - AirHeader
```

---

# Validation Rules

```yaml
validation_rules:

  - id: air-header_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: air-header_storybook_api
    description: Implement AirHeader using PrimeReact AirHeader per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: air-header_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact AirHeader from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use AirHeader when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: AirHeader (AirHeader) per Storybook.
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
