---
name: calendar
description: "Use when implementing Calendar for date or date-range input. Trigger on: date pickers, date fields, date range selectors (\"Between Dates\"), time pickers, or any field where the user selects a date, time, or date range."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Calendar

---

# Component Metadata

```yaml
component: Calendar
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Calendar

category:
  - data
  - display

intent_tags:
  - calendar
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to enter dates — a due date, a search date range, a birth date — accurately and quickly. A calendar picker prevents format errors and lets users see the day of week in context.

### Purpose

Date and/or time picker. Supports single date, date range via the dedicated `DateRangeField` component, or manual range with two separate Calendar inputs. Shows a calendar icon trigger by default. Supports read-only display, custom date formatter, and custom date cell templates with hover range preview.

### Storybook Component

Use the `Calendar` component (under Form Inputs & Controls). Built on PrimeReact Calendar. For use with a label, use `CalendarField` (preferred for single dates) or `DateRangeField` (preferred for date ranges). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-calendar--docs`

### Props (single Calendar)

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Date\|null\|Date[]\|(Date\|null)[]` | — | Selected date value(s) |
| `onChange` | `function` | — | Callback when date changes |
| `selectionMode` | `'single'\|'multiple'\|'range'` | `'single'` | Selection behavior |
| `showIcon` | `boolean` | `true` | Shows the calendar icon trigger |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | — | Disables the picker |
| `readOnly` | `boolean` | — | Displays value as plain text |
| `readOnlyNoValueDisplay` | `string` | `'-'` | Text shown in read-only when no date is set |
| `dateFormatter` | `(value: Date\|null) => string` | — | Custom function to format the displayed date |
| `dateTemplate` | `(dateInfo: { year, month, day }) => ReactNode` | — | Custom template for rendering date cells; when `selectionMode="range"`, a default hover-preview template is used automatically |
| `className` | `string` | — | Merged with the internal calendar class |
| `panelClassName` | `string` | — | Merged with the internal datepicker panel class |

### Related Components

- CalendarField (preferred for single dates in forms — pre-composed with FormField)
- DateRangeField (preferred for date ranges — dual-input with overlay calendar and time pickers)
- InputText (date as free text — only when a picker is not needed)

---

# When to Use

1. **Single date** — Due date, birth date, creation date filter.
2. **Date range ("Between Dates")** — From and To dates for a search or report — see Date Range Pattern below.
3. **Date and time** — When both date and time selection are required (the picker includes time spinners).

---

# When NOT to Use

1. A year-only or month-only selector → use Dropdown.
2. Relative date selections ("last 7 days") → use a Dropdown or custom control.

---

# Decision Triggers

```yaml
decision_triggers:

  use_calendar_if:
    - Due date, birth date, creation date filter.
    - From and To dates for a search or report — see Date Range Pattern below.
    - When both date and time selection are required (the picker includes time spinners).

  do_not_use_calendar_if:
    - 1. A year-only or month-only selector → use Dropdown.
    - 2. Relative date selections (\"last 7 days\") → use a Dropdown or custom control.
```

---

# Additional Topics

# Date Range Pattern

### Preferred: `DateRangeField` (new in 3.0)

Use the `DateRangeField` component for labeled date range input. It provides two text inputs (start/end) with a shared label, a dual-month overlay calendar with range selection and time pickers, hover preview highlighting, and keyboard-committable typed input.

```tsx
import { DateRangeField } from 'relativity-ui'

const [range, setRange] = useState<(Date | null)[] | null>(null)

<DateRangeField
  label="Between Dates"
  value={range}
  onChange={(e) => setRange(e.value)}
  hourFormat="12"
/>
```

#### DateRangeField Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `(Date\|null)[]\|null` | `null` | Selected date range as `[start, end]` |
| `onChange` | `(event: { value: (Date\|null)[]\|null }) => void` | — | Callback when range changes |
| `startPlaceholder` | `string` | `'mm/dd/yyyy hh:mm am'` | Placeholder for the start input |
| `endPlaceholder` | `string` | `'mm/dd/yyyy hh:mm am'` | Placeholder for the end input |
| `hourFormat` | `'12'\|'24'` | `'12'` | Hour format for time pickers |
| `label` | `string` | — | Field label (from FormField) |
| `labelPosition` | `'top'\|'left'` | — | Label position |
| `required` | `boolean` | — | Shows required indicator |
| `valid` | `boolean` | — | Controls error state |
| `validationMessage` | `string` | — | Error message |
| `contextualHelp` | `ReactNode` | — | Tooltip next to the label |

The overlay includes a dual-month calendar for date selection and two time pickers (one per side). Typed input is committed on Enter/Tab; blur reverts to the last valid value.

### Legacy: manual two-Calendar pattern

For cases where `DateRangeField` does not fit (custom layouts, no time pickers needed), you can still compose two separate `Calendar` components. However, `DateRangeField` is now the recommended approach.

---

# Read-Only Mode

Set `readOnly={true}` to display the selected date as formatted text. Use `dateFormatter` to control the output format. When no date is set, `readOnlyNoValueDisplay` (default `'-'`) is shown.

---

# Preferred Usage: CalendarField

Use `CalendarField` in forms for single date selection with consistent label, required indicator, and validation:

```tsx
<CalendarField
  label="Due date"
  value={dueDate}
  onChange={(e) => setDueDate(e.value)}
  placeholder="Select a date"
  required
/>
```

For date ranges, use `DateRangeField` as shown in the Date Range Pattern above.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between the two Calendar inputs in a range: `8px` (separator dash takes `4px` margin each side)
- Gap between stacked form fields: `16px`

---

# Constraints

```yaml
constraints:

  skill_id: calendar
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: calendar
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Calendar and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Use `CalendarField` or associate with a `<label>` via `inputId` + `<label htmlFor>`
- For date ranges: the shared label ("Between Dates") must be programmatically associated with both inputs — use `aria-labelledby` or a wrapping `<fieldset>` + `<legend>`
- Calendar popup must be keyboard navigable: arrow keys move between days; Enter selects; Escape closes
- Selected date must be announced by screen readers
- `aria-invalid="true"` when invalid

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
    - CalendarField
    - InputText

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Calendar
      - CalendarField
      - DateRangeField
```

---

# Validation Rules

```yaml
validation_rules:

  - id: calendar_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: calendar_storybook_api
    description: Implement Calendar using PrimeReact Calendar per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: calendar_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Calendar from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Calendar when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Calendar (Calendar) per Storybook.
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

- CalendarField (preferred for single dates in forms — pre-composed with FormField)
- DateRangeField (preferred for date ranges — dual-input with overlay calendar and time pickers)
- InputText (date as free text — only when a picker is not needed)

---
