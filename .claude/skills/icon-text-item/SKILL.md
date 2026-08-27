---
name: icon-text-item
description: "Use when implementing IconTextItem for displaying an icon with a title and optional subtitle. Trigger on: list items with icons and labels, navigation items with icons, project or workspace entries with title and subtitle, or any item combining an icon with a title and optional secondary text."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# IconTextItem

---

# Component Metadata

```yaml
component: IconTextItem
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: IconTextItem

category:
  - data
  - display

intent_tags:
  - icon_text_item
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Many UI elements need to combine an icon with a title and an optional subtitle — a workspace entry, a saved search item, a project card row. Building this ad hoc leads to inconsistent sizing, truncation, and disabled state handling. IconTextItem standardises this pattern.

### Purpose

Display an icon alongside a title and optional subtitle. Supports optional link on the title, disabled state, text truncation with ellipsis, and various icon presets.

### Storybook Component

Use the `IconTextItem` component (under Containment). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-icontextitem--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title*` | `string` | — | Main title text |
| `subtitle` | `string` | — | Optional secondary text below the title |
| `iconName` | `AssetName` | — | Icon to display (AiIcon, BrainIcon, Complete, Warning, Error, Folder, SaveSearch) |
| `link` | `string` | — | Optional URL — makes the title a link (opens in new tab) |
| `disabled` | `boolean` | — | Disables the component |
| `hideOverflow` | `boolean` | — | Truncates long text with ellipsis |

### Related Components

- ImageIcon (image-based icons — **image-icon** skill)
- Icons (icon-font — **icons** skill)
- Link (for navigation links)
- Card (for richer card layouts)

---

# When to Use

1. **List or navigation items** — Items in a navigation panel or list that combine a recognisable icon with a title.
2. **Workspace or project entries** — Row items showing a project name with a subtitle (e.g., owner or date).
3. **Saved search or folder items** — Items in a picker or tree where icon context matters.
4. **Clickable rows** — Wrap in a Button to make the entire item clickable.

---

# When NOT to Use

1. An item needing rich card layout with images or actions → use Card.
2. An icon with no text → use **ImageIcon** (image assets), **Icons** (**icons** skill) for icon-font glyphs, or an icon-only **Button**.
3. Navigation items in a side panel → use TertiaryNavigation (handles selection state and statuses).

---

# Decision Triggers

```yaml
decision_triggers:

  use_icon_text_item_if:
    - Items in a navigation panel or list that combine a recognisable icon with a title.
    - Row items showing a project name with a subtitle (e.g., owner or date).
    - Items in a picker or tree where icon context matters.
    - Wrap in a Button to make the entire item clickable.

  do_not_use_icon_text_item_if:
    - 1. An item needing rich card layout with images or actions → use Card.
    - 2. An icon with no text → use **ImageIcon** (image assets), **Icons** (**icons** skill) for icon-font glyphs, or an icon-only **Button**.
    - 3. Navigation items in a side panel → use TertiaryNavigation (handles selection state and statuses).
```

---

# Additional Topics

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between icon and text: `8px`
- Gap between title and subtitle: `4px`
- Row padding (when used in a list): `8px` vertical, `16px` horizontal

---

# Behavioral Rules

1. Set `hideOverflow={true}` when the component is in a constrained-width container — long titles will be truncated with an ellipsis rather than wrapping.
2. When `link` is set, the title opens in a new tab — ensure `(opens in new tab)` or equivalent is communicated to screen readers.
3. When used as a clickable row, wrap the entire item in a Button component and handle `onClick` there.
4. `disabled={true}` applies disabled visual styling — pair with `aria-disabled` if the element is interactive.

---

# Constraints

```yaml
constraints:

  skill_id: icon-text-item
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: icon-text-item
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact IconTextItem and this skill's sections
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
    - ImageIcon
    - Link
    - Card

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - IconTextItem
```

---

# Validation Rules

```yaml
validation_rules:

  - id: icon-text-item_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: icon-text-item_storybook_api
    description: Implement IconTextItem using PrimeReact IconTextItem per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: icon-text-item_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact IconTextItem from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use IconTextItem when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: IconTextItem (IconTextItem) per Storybook.
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

- ImageIcon (**image-icon** skill)
- Icons (**icons** skill)
- Link (for navigation links)
- Card (for richer card layouts)

---
