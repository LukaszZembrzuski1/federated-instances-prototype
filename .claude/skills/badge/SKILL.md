---
name: badge
description: "Use when implementing Badge for numerical counts or status indicators. Trigger on: badges, count indicators, notification counts, unread counts, or small numerical labels attached to or near another element."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Badge

---

# Component Metadata

```yaml
component: Badge
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Badge

category:
  - data
  - display

intent_tags:
  - badge
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Purpose

Display a numerical value or status indicator — a count, a notification number, an unread indicator — as a small labelled element. Supports severity colours and three sizes.

### Storybook Component

Use the `Badge` component (under Feedback). Built on PrimeReact Badge. Pre-composed severity variants: `BadgeInfo`, `BadgeWarning`, `BadgeDanger`, `BadgeSuccess`. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADfeedback-badge--docs`

### Props

| Prop | Type | Default | Options | Description |
|---|---|---|---|---|
| `value` | `string\|number` | — | — | Value displayed inside the badge |
| `severity` | `string` | `'info'` | `info`, `warning`, `danger`, `success` | Colour variant |
| `size` | `string` | — | `normal`, `large`, `xlarge` | Size of the badge |

> **Note on severity naming:** Badge uses `'danger'` (not `'negative'`) for the destructive/alert colour. This matches PrimeReact for Badge. **Button** uses the same code token **`danger`** / **`ButtonDanger`** (Figma **Danger**); legacy **`negative`** on Button is deprecated.

### Pre-composed severity variants

Use `BadgeInfo`, `BadgeWarning`, `BadgeDanger`, or `BadgeSuccess` directly instead of manually setting `severity` each time.

### Related Components

- Tag (text labels and status pills — use for non-numerical content)
- Chip (compact interactive labels — use when the label is removable or part of an input)

---

# When to Use

1. **Notification count** — Unread messages, pending tasks, alerts: "5" on a notification bell.
2. **Item count** — Number of documents, results, or items in a category.
3. **Status indicator** — A coloured badge communicating success, warning, danger, or info state alongside an element.

---

# When NOT to Use

1. Text status labels (not numbers) → use Tag.
2. Removable interactive labels → use Chip.
3. Long descriptive labels → use Tag or ValidationMessage.

---

# Decision Triggers

```yaml
decision_triggers:

  use_badge_if:
    - Unread messages, pending tasks, alerts: \"5\" on a notification bell.
    - Number of documents, results, or items in a category.
    - A coloured badge communicating success, warning, danger, or info state alongside an element.

  do_not_use_badge_if:
    - 1. Text status labels (not numbers) → use Tag.
    - 2. Removable interactive labels → use Chip.
    - 3. Long descriptive labels → use Tag or ValidationMessage.
```

---

# Additional Topics

# Badge vs Tag

| | Badge | Tag |
|---|---|---|
| **Content** | Numbers or very short counts | Text labels, status words |
| **Use case** | "5 unread," "12 items" | "Active," "Draft," "In Review" |
| **Severity** | info, warning, danger, success | info, warning, danger, success, secondary, contrast |

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- When overlaid on an icon (notification pattern): positioned at top-right corner with `-4px` offset
- When inline with text: `4px` gap between badge and surrounding content

---

# Constraints

```yaml
constraints:

  skill_id: badge
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: badge
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Badge and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Badge value must be readable by screen readers — do not rely on colour alone
- When used as a notification count on an icon button, include the count in the button's `aria-label` (e.g., "Notifications, 5 unread")
- Severity colour must be supplemented by the value text — never use an empty badge to convey status

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
    - Chip

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Badge
```

---

# Validation Rules

```yaml
validation_rules:

  - id: badge_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: badge_storybook_api
    description: Implement Badge using PrimeReact Badge per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: badge_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Badge from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Badge when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Badge (Badge) per Storybook.
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

- Tag (text labels and status pills — use for non-numerical content)
- Chip (compact interactive labels — use when the label is removable or part of an input)

---
