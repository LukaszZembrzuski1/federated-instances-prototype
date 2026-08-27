---
name: split-button
description: "Use when implementing SplitButton for a primary action with an additional dropdown of related actions. Trigger on: split buttons, save with options, export with format choices, or any single default action that has related secondary actions in a dropdown."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# SplitButton

---

# Component Metadata

```yaml
component: SplitButton
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: SplitButton

category:
  - component
  - utility

intent_tags:
  - split_button
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need a primary default action with a small set of related secondary options without showing all options as separate buttons. SplitButton combines a primary clickable button with a dropdown arrow that reveals additional actions.

In RelativityOne, SplitButton is used for Save (with Save As, Save Draft options), Export (with format choices), or Run (with Run in Background option).

### Purpose

One button with two interaction zones: clicking the label fires the primary action; clicking the dropdown arrow opens a menu of additional related actions.

### Storybook Component

Use the `SplitButton` component (under Containment). Built on PrimeReact SplitButton. Default severity is **secondary**. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-splitbutton--docs`

Also see `SplitButtonStateful` for a controlled variant.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label for the primary button |
| `severity` | `'secondary'\|'primary'` | `'secondary'` | Visual style — defaults to secondary |
| `model` | `MenuItem[]` | — | Items in the dropdown menu |
| `onClick` | `function` | — | Callback for the primary button click |
| `menuIconDirection` | `'down'\|'up'` | `'down'` | Rotate arrow — use `'up'` when menu opens upward (buttons near bottom of screen) |

### Related Components

- Button (single action with no dropdown)
- Menu (list of actions without a primary button)
- Dropdown (value selection, not action triggering)

---

# When to Use

1. **Save with options** — "Save" as primary; dropdown offers "Save As," "Save Draft."
2. **Export with formats** — "Export" as primary; dropdown offers PDF, CSV, Native.
3. **Run with variants** — "Run" as primary; dropdown offers "Run in Background," "Schedule."
4. Any scenario where one action is clearly the most common and 2–4 related actions are secondary.

---

# When NOT to Use

1. All actions are equally important → use separate Buttons or a Menu.
2. Only one action → use Button.
3. Selecting a value (not triggering an action) → use Dropdown.
4. More than 4–5 dropdown items → consider a Menu instead.

---

# Decision Triggers

```yaml
decision_triggers:

  use_split_button_if:
    - \"Save\" as primary; dropdown offers \"Save As,\" \"Save Draft.\"
    - \"Export\" as primary; dropdown offers PDF, CSV, Native.
    - \"Run\" as primary; dropdown offers \"Run in Background,\" \"Schedule.\"
    - 4. Any scenario where one action is clearly the most common and 2–4 related actions are secondary.

  do_not_use_split_button_if:
    - 1. All actions are equally important → use separate Buttons or a Menu.
    - 2. Only one action → use Button.
    - 3. Selecting a value (not triggering an action) → use Dropdown.
    - 4. More than 4–5 dropdown items → consider a Menu instead.
```

---

# Additional Topics

# Severity

SplitButton defaults to `severity="secondary"`. Use `severity="primary"` only when the SplitButton is the primary call-to-action in the context and there is no competing primary Button.

Apply the same hierarchy rules as Button: one primary per context. Do not use a primary SplitButton alongside a primary Button.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between SplitButton and other buttons: `8px`
- Dropdown item padding: `8px` vertical, `16px` horizontal

---

# Behavioral Rules

1. Primary button label must describe the default action clearly.
2. Dropdown items must be related to the primary action — do not put unrelated actions in the menu.
3. Use `menuIconDirection="up"` when the button is near the bottom of the viewport so the menu opens upward.
4. Min gap between SplitButton and adjacent buttons: `8px`.

---

# Constraints

```yaml
constraints:

  skill_id: split-button
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: split-button
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact SplitButton and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Primary button portion and dropdown arrow are separate focusable controls
- Primary button: accessible name from `label`
- Dropdown arrow: accessible name ("More actions" or similar)
- Keyboard: Tab to primary button, Tab again to dropdown arrow; Enter/Space on arrow opens menu; arrow keys navigate; Escape closes

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
    - Button
    - Menu
    - Dropdown

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - SplitButton
```

---

# Validation Rules

```yaml
validation_rules:

  - id: split-button_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: split-button_storybook_api
    description: Implement SplitButton using PrimeReact SplitButton per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: split-button_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact SplitButton from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use SplitButton when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: SplitButton (SplitButton) per Storybook.
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

- Button (single action with no dropdown)
- Menu (list of actions without a primary button)
- Dropdown (value selection, not action triggering)

---
