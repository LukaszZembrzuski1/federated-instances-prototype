---
name: chips
description: "Use when implementing Chips for multi-value text input. Trigger on: chips input, tag input, enter multiple values, comma-separated input, or any field where the user types values that become removable chips."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Chips

---

# Component Metadata

```yaml
component: Chips
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Chips

category:
  - data
  - display

intent_tags:
  - chips
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to enter multiple free-form values — email addresses, keywords, document IDs — one at a time, with each value becoming a removable chip. Unlike a multi-select dropdown, the values are typed rather than chosen from a predefined list.

### Purpose

Multi-value input where each entered value becomes a chip. Users type a value, press Enter (or a separator character), and it becomes a chip they can remove. Supports max entries, duplicate prevention, severity colouring, and read-only display.

### Storybook Component

Use the `Chips` component (under Containment). Built on PrimeReact Chips. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-chips--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `any[]` | — | Array of current chip values |
| `onChange` | `function` | — | Callback when values change |
| `placeholder` | `string` | — | Placeholder in the input |
| `severity` | `'success'\|'warning'\|'danger'\|'info'` | — | Colour for all chips |
| `removable` | `boolean` | `true` | Whether chips can be removed |
| `max` | `number` | — | Maximum number of chips allowed |
| `separator` | `string` | — | Additional character to add a chip (e.g., `','`) |
| `allowDuplicate` | `boolean` | — | Whether duplicate values are allowed |
| `disabled` | `boolean` | `false` | Disables the input |
| `readOnly` | `boolean` | `false` | Display values as plain text |

### Related Components

- MultiSelect (multiple selection from a predefined list — use when options are known)
- Chip (display-only chip — not an input component)
- Tag (read-only label)

---

# When to Use

1. **Free-form multi-value input** — Email addresses, keywords, user-defined tags, document IDs.
2. **Values not from a predefined list** — When users type their own values rather than selecting from options.
3. **Comma or Enter-delimited input** — When users may paste a list of values using `separator=","`.

---

# When NOT to Use

1. Values come from a predefined list → use MultiSelect.
2. Single value input → use InputText.
3. Display-only chips (not input) → use Chip.

---

# Decision Triggers

```yaml
decision_triggers:

  use_chips_if:
    - Email addresses, keywords, user-defined tags, document IDs.
    - When users type their own values rather than selecting from options.
    - When users may paste a list of values using `separator=\",\"`.

  do_not_use_chips_if:
    - 1. Values come from a predefined list → use MultiSelect.
    - 2. Single value input → use InputText.
    - 3. Display-only chips (not input) → use Chip.
```

---

# Additional Topics

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between chips: `4px` or `8px`
- Wrap in `FormField` for consistent label and validation

---

# Behavioral Rules

1. Always provide `placeholder` text explaining how to add values (e.g., "Type and press Enter").
2. Use `max` to prevent runaway entries when there's a sensible limit.
3. Use `allowDuplicate={false}` unless duplicate values have semantic meaning in your use case.
4. Use `separator=","` when users may paste comma-separated lists.

---

# Constraints

```yaml
constraints:

  skill_id: chips
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: chips
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Chips and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Wrap in `FormField` or use `inputId` + `<label htmlFor>` for label association
- Each chip's remove button must have an accessible name ("Remove [value]")
- Announce additions and removals via `aria-live`
- Keyboard: Enter adds a chip; Backspace removes the last chip

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
    - MultiSelect
    - Chip
    - Tag

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Chips
```

---

# Validation Rules

```yaml
validation_rules:

  - id: chips_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: chips_storybook_api
    description: Implement Chips using PrimeReact Chips per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: chips_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Chips from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Chips when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Chips (Chips) per Storybook.
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

- MultiSelect (multiple selection from a predefined list — use when options are known)
- Chip (display-only chip — not an input component)
- Tag (read-only label)

---
