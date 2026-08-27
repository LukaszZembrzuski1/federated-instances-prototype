---
name: panel
description: "Use when implementing Panel components as collapsible or static section containers. Trigger on: content panels, collapsible sections, filter panels, detail sections, settings blocks, or any content area that needs a header, optional footer, and optional collapse."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Panel

---

# Component Metadata

```yaml
component: Panel
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Panel

category:
  - data
  - display

intent_tags:
  - panel
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need a clear container for a section — filters, details, settings — with an optional header, footer, and collapse/expand. A Panel provides a bordered or elevated block with optional toggle and a loading state, keeping the layout organised.

In RelativityOne, panels are used for filter sidebars, document metadata sections, workspace settings blocks, search criteria areas, and any grouped content that benefits from a header and optional collapse.

### Purpose

Container with optional header (title), optional collapse/expand, optional footer (left and right slots), and an optional loading state. Preferred over Card for structured, feature-rich containers.

### Storybook Component

Use the `Panel` component (under Containment). Built on PrimeReact Panel. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-panel--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `header` | `string\|ReactNode` | — | Header text or content |
| `toggleable` | `boolean` | — | Enables collapse/expand |
| `collapsed` | `boolean` | — | Controlled initial collapsed state |
| `loading` | `boolean` | — | Shows loading state for the panel header (new in 3.0) |
| `isLoading` | `boolean` | — | **Deprecated** — use `loading` instead |
| `footer` | `ReactNode` | — | Footer content |
| `footerLeft` | `ReactNode` | — | Content in the footer left slot |
| `footerRight` | `ReactNode` | — | Content in the footer right slot |

### Related Components

- Card (lighter container without loading state or footer slots — see note)
- FormFieldset (for form input groups)
- Accordion (multiple panels, one open at a time)
- Drawer (collapsible sidebar alongside main content)

---

# When to Use

1. **Filter or options sidebar** — Search filters, document list filters in a sidebar with a title and optional collapse.
2. **Details or metadata block** — Document metadata, workspace details, user profile with a header and optional edit action.
3. **Settings or config section** — Workspace settings, admin section with clear boundary and optional collapse.
4. **Any grouped content with a title and optional loading/footer** — "Recent activity," "Saved searches," or "Related documents."

Prefer Panel over Card when you need: loading state (`isLoading`), toggleable collapse, or separate `footerLeft` / `footerRight` slots.

---

# When NOT to Use

1. Single field or one line — use a label + input or FormField.
2. Multiple sections where only one is open — use Accordion.
3. An item in a list with title, summary, and CTA — use Card.
4. No header or collapse needed — a plain `<section>` or `<div>` may suffice.

| Situation | Use Instead |
|---|---|
| Form field group | FormFieldset |
| Only one of many sections open | Accordion |
| Item in a list with title + CTA | Card |
| No structure needed | Section or div |

---

# Decision Triggers

```yaml
decision_triggers:

  use_panel_if:
    - Search filters, document list filters in a sidebar with a title and optional collapse.
    - Document metadata, workspace details, user profile with a header and optional edit action.
    - Workspace settings, admin section with clear boundary and optional collapse.
    - \"Recent activity,\" \"Saved searches,\" or \"Related documents.\"
    - Prefer Panel over Card when you need: loading state (`isLoading`), toggleable collapse, or separate `footerLeft` / `footerRight` slots.

  do_not_use_panel_if:
    - 1. Single field or one line — use a label + input or FormField.
    - 2. Multiple sections where only one is open — use Accordion.
    - 3. An item in a list with title, summary, and CTA — use Card.
    - 4. No header or collapse needed — a plain `<section>` or `<div>` may suffice.
    - | Situation | Use Instead |
    - | Form field group | FormFieldset |
```

---

# Additional Topics

# Component Variants

### Static Panel
Header with title; content always visible. Use for persistent sections like metadata or settings.

### Toggleable Panel
`toggleable={true}` — user can collapse/expand via chevron in the header. Use for optional or supplementary sections.

### With Footer
`footerLeft` and `footerRight` slots for actions (e.g., Apply/Clear on a filter panel, or pagination).

### Loading State
`loading={true}` — shows a loading indicator in the header while content fetches. Pair with Skeleton in the body for full loading UX.

> **Deprecation note (3.0):** `isLoading` has been renamed to `loading`. Both work, but `isLoading` will be removed in a future major version.

---

# Behavioral Rules

1. Header must be visible and indicate the section purpose.
2. Collapse toggle (when `toggleable`) must be keyboard accessible (Enter/Space) with `aria-expanded`.
3. When collapsed, content must be hidden from layout and screen readers — not just visually hidden.
4. Persist collapsed state per user when possible (save to preferences).

---

# Layout and Placement

Panel is used in sidebars, main content areas (below toolbar), or inside modals. Full width of container or fixed width.

## Common Patterns

- Header: title left, optional actions and collapse toggle right
- Content: padded; scrollable when long (apply `overflow-y: auto` to the body)
- Footer: `footerLeft` for secondary actions (Clear), `footerRight` for primary (Apply)

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Header padding: `12px` vertical, `16px` horizontal
- Content padding: `16px` on all sides
- Footer padding: `12px` vertical, `16px` horizontal
- Margin between stacked panels: `16px`

---

# Constraints

```yaml
constraints:

  skill_id: panel
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: panel
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Panel and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Use `aria-labelledby` pointing to the header title, or `aria-label` on the panel container
- Collapse toggle: `aria-expanded` + `aria-controls` referencing the content `id`
- Content hidden when collapsed: use `aria-hidden="true"` or remove from DOM — do not only hide visually
- When collapsed, content must not be in the tab order

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
    - Card
    - FormFieldset
    - Accordion
    - Drawer

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Panel
```

---

# Validation Rules

```yaml
validation_rules:

  - id: panel_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: panel_storybook_api
    description: Implement Panel using PrimeReact Panel per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: panel_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Panel from Storybook.
**Severity:** High


---

# Component Decision Logic

**User sees a "Filters" section in sidebar with collapse:**
→ Panel (`toggleable={true}`).

**User sees a workspace card in a grid with name, description, "Open":**
→ Not a Panel. Use Card.

**User fills a form with "Personal" and "Address" groups:**
→ FormFieldset for each group (not Panel).

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Panel (Panel) per Storybook.
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

- Card (lighter container without loading state or footer slots — see note)
- FormFieldset (for form input groups)
- Accordion (multiple panels, one open at a time)
- Drawer (collapsible sidebar alongside main content)

---
