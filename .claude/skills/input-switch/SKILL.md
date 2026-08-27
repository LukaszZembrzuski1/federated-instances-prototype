---
name: input-switch
description: "Use when implementing InputSwitch for binary on/off settings. Trigger on: toggle switches, enable/disable settings, on/off controls, or any persistent binary state that does not require confirmation."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# InputSwitch

---

# Component Metadata

```yaml
component: InputSwitch
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: InputSwitch

category:
  - form
  - input

intent_tags:
  - input_switch
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Some settings are simply on or off — enable notifications, compact view, auto-save. A switch makes the binary nature clear and the current state immediately visible without requiring form submission.

### Purpose

Toggle a binary on/off state. Changes state immediately on click. Supports disabled, invalid, and read-only states.

### Storybook Component

Use the `InputSwitch` component (under Form Inputs & Controls). Built on PrimeReact InputSwitch. For use with a label, use `InputSwitchField`. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-inputswitch--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Current state |
| `onChange` | `function` | — | Change event handler |
| `inputId` | `string` | — | Unique id (for label association) |
| `disabled` | `boolean` | — | Disables the switch |
| `readOnly` | `boolean` | — | Read-only state |
| `readOnlyTrueValue` | `string` | `'Yes'` | Text in read-only on state |
| `readOnlyFalseValue` | `string` | `'No'` | Text in read-only off state |

### Related Components

- Checkbox (multi-select or independent boolean in a group)
- RadioButton (mutually exclusive single selection)
- Button (action trigger, not state toggle)

---

# When to Use

1. **Binary on/off setting** — Enable notifications, compact view, auto-save.
2. **Immediate effect** — Change takes effect without a Save button.
3. **Single independent toggle** — Standing alone or alongside other toggles.

---

# When NOT to Use

1. Choosing one from multiple options → use RadioButton.
2. Multiple independent options in a list → use Checkbox group.
3. Triggering an action → use Button.
4. Toggle requires confirmation → use Button + ConfirmDialog.

---

# Decision Triggers

```yaml
decision_triggers:

  use_input_switch_if:
    - Enable notifications, compact view, auto-save.
    - Change takes effect without a Save button.
    - Standing alone or alongside other toggles.

  do_not_use_input_switch_if:
    - 1. Choosing one from multiple options → use RadioButton.
    - 2. Multiple independent options in a list → use Checkbox group.
    - 3. Triggering an action → use Button.
    - 4. Toggle requires confirmation → use Button + ConfirmDialog.
```

---

# Additional Topics

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between switch and its label: `8px`
- Gap between stacked switch rows: `8px`

---

# Behavioral Rules

1. Use `InputSwitchField` or `inputId` + `<label htmlFor>` — never render without a label.
2. State changes take effect immediately — no separate Save button needed.
3. Label describes the setting, not the state: "Enable notifications" not "Notifications: On."

---

# Constraints

```yaml
constraints:

  skill_id: input-switch
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
  label_required_for_inputs: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: input-switch
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact InputSwitch and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Always associate with a label via `InputSwitchField` or `inputId` + `<label htmlFor>`
- `aria-checked="true/false"` communicates current state
- Space or Enter toggles a focused switch

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
    - Checkbox
    - RadioButton
    - Button

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - InputSwitch
```

---

# Validation Rules

```yaml
validation_rules:

  - id: input-switch_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: input-switch_storybook_api
    description: Implement InputSwitch using PrimeReact InputSwitch per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: input-switch_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact InputSwitch from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use InputSwitch when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: InputSwitch (InputSwitch) per Storybook.
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

- Checkbox (multi-select or independent boolean in a group)
- RadioButton (mutually exclusive single selection)
- Button (action trigger, not state toggle)

---
