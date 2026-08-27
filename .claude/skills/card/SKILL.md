---
name: card
description: "Use when implementing Card components for grouped content items. Trigger on: workspace cards, document cards, entity cards, content tiles, or any self-contained item with title, description, and actions in a grid or list layout."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Card

---

# Component Metadata

```yaml
component: Card
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Card

category:
  - data
  - display

intent_tags:
  - card
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need a compact, self-contained block for an item — workspace, document, saved search — with optional title, subtitle, header, and footer actions. A card groups these into one visual unit for use in grids or lists.

> **Note from Storybook:** Consider using the **Panel** component instead for better functionality and support. Use Card only when a simpler, lighter container is sufficient.

In RelativityOne, cards appear in workspace grids (name, description, Open), document lists (thumbnail, title, snippet), saved search lists, and user or entity lists.

### Purpose

Display a single entity or content block with optional header, title, subtitle, body, and footer (actions). Supports consistent layout in grid or list contexts.

### Storybook Component

Use the `Card` component (under Containment). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-card--docs`

### Props

| Prop | Type | Description |
|---|---|---|
| `title` | `string\|ReactNode` | Title of the card (rendered inside `CardHeader` when using slot props) |
| `subTitle` | `string\|ReactNode` | Secondary title |
| `header` | `ReactNode` | Header content (e.g., image/thumbnail). Overridden when `headerLeft`/`headerRight` slot props are used. |
| `headerLeft` | `ReactNode` | Left segment of a composed header row (new in 3.0) |
| `headerRight` | `ReactNode` | Right segment of a composed header row (new in 3.0) |
| `footer` | `string\|ReactNode` | Footer content (e.g., buttons). Can be a render function receiving card props. |
| `footerLeft` | `ReactNode` | Left segment of a composed footer row (new in 3.0) |
| `footerRight` | `ReactNode` | Right segment of a composed footer row (new in 3.0) |

#### Header and footer composition (new in 3.0)

Card now supports **slot-based header and footer** composition via `headerLeft` / `headerRight` and `footerLeft` / `footerRight`. When slot props are provided, Card builds a three-column row layout automatically using the internal `CardHeader` sub-component and `buildRow` utility.

- **Header row:** `headerLeft` | centered `title` + `subTitle` | `headerRight`
- **Footer row:** `footerLeft` | `footer` content | `footerRight`

If neither `headerLeft` nor `headerRight` is provided, the original PrimeReact `header` prop behavior is preserved.

### Related Components

- Panel (**preferred** — more functionality, loading state, toggleable, footerLeft/footerRight)
- Button (footer actions)
- Tag (metadata labels)
- Avatar (user cards)

---

# When to Use

1. **Workspace or project summary** — Name, short description, document count, "Open" in a grid.
2. **Document or search result item** — Thumbnail, title, snippet, tag count.
3. **User or entity in list** — Avatar, name, role in admin.
4. **Light content tile** — When Panel's full feature set is not needed.

Prefer **Panel** when the container needs: a loading state, toggleable collapse, separate footerLeft/footerRight slots, or header actions.

---

# When NOT to Use

1. Tabular data with many columns → use DataTable.
2. Collapsible section with header toggle → use Panel.
3. Form field group → use FormFieldset.
4. Single-line list row → use a list or DataTable row.

| Situation | Use Instead |
|---|---|
| Tabular data | DataTable |
| Collapsible section | Panel |
| Form group | FormFieldset |
| Simple list row | DataTable row |
| Single value | Tag or Badge |

---

# Decision Triggers

```yaml
decision_triggers:

  use_card_if:
    - Name, short description, document count, \"Open\" in a grid.
    - Thumbnail, title, snippet, tag count.
    - Avatar, name, role in admin.
    - When Panel's full feature set is not needed.
    - Prefer **Panel** when the container needs: a loading state, toggleable collapse, separate footerLeft/footerRight slots, or header actions.

  do_not_use_card_if:
    - 1. Tabular data with many columns → use DataTable.
    - 2. Collapsible section with header toggle → use Panel.
    - 3. Form field group → use FormFieldset.
    - 4. Single-line list row → use a list or DataTable row.
    - | Situation | Use Instead |
    - | Tabular data | DataTable |
```

---

# Additional Topics

# Component States

- Default
- Hover (optional highlight or elevation)
- Focused (when card or primary action is focusable)
- Selected (in pickers)
- Loading → use Skeleton inside the card body

---

# Behavioral Rules

1. Card should have one clear primary action; secondary actions go in the footer or overflow menu.
2. Title must be visible and descriptive — avoid truncation without a Tooltip when the title is critical.
3. Do not overload with many actions — primary + 1–2 secondary is enough.
4. When the entire card is clickable, ensure it is a `<button>` or `<a>` with an accessible name.

---

# Layout and Placement

Cards appear in grids or lists. In a grid, cards should have consistent height or allow graceful variable height with alignment.

## Common Patterns

- Header: optional image or icon at top
- Body: title, subtitle, description, metadata
- Footer: primary button (Open, Run), optional secondary action

## Spacing Rules

**Design system sources:** Aero v3 (Figma) for designers; **`tokens/relativity-tokens.json`** → `spacing` for implementation. When the app emits CSS variables (e.g. `tokens.generated.css`), use **`var(--rds-spacing-xxs)`** through **`var(--rds-spacing-xxxl)`** — never hand-picked `px` for layout.

**Scale (from JSON):** `spacing.xxs` · `spacing.xs` · `spacing.s` · `spacing.m` · `spacing.l` · `spacing.xl` · `spacing.xxl` · `spacing.xxxl` (rem strings in the file).

**Card-oriented defaults — express with those tokens:**

- **Inner gutters** for your own header/body/footer rows: prefer **`spacing.l`** unless Figma calls for another step.
- **Gap between cards in a grid:** **`spacing.l`** or **`spacing.xl`**.
- **Gap between stacked header / body / footer sections:** **`spacing.s`**.

**Relativity UI `Card` DOM:** `footer` renders inside `.p-card-body`. RUI’s Card bundle adds default padding to **`.p-card-body`**, **`.p-card-footer`**, and **`.p-card-content`** (see `relativity-ui` **Card/card.css**). That theme padding is **not** expressed as your app tokens — it stacks with any `spacing.*` you add on inner rows. To avoid “double” horizontal inset: reset those surfaces to **no padding** with a **descendant** selector from your module root (e.g. `.root :global(.p-card-body .p-card-footer) { padding: 0 !important; }` — only where needed), then apply **`spacing.*`** / **`var(--rds-spacing-*)`** solely on **your** layout wrappers.

---

# Constraints

```yaml
constraints:

  skill_id: card
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: card
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Card and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- If the whole card is clickable: wrap in `<button>` or `<a>` with an accessible name that includes the item title (e.g., "Open workspace Acme Corp")
- Title should use a heading element (`<h3>` etc.) for document structure
- Images: meaningful `alt` text for thumbnails; `alt=""` for decorative icons
- Each footer action must have an accessible name

**Common mistakes:**
- Card clickable but no keyboard access or accessible name
- Too many focusable elements per card — reduce or group

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
    - Panel
    - Button
    - Tag
    - Avatar

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Card
      - CardHeader
```

---

# Validation Rules

```yaml
validation_rules:

  - id: card_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: card_storybook_api
    description: Implement Card using PrimeReact Card per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: card_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Card from Storybook.
**Severity:** High


---

# Component Decision Logic

**User browses workspaces in a grid with name, description, "Open":**
→ Card. Or Panel if loading state or collapse is needed.

**User sees a "Filters" section with collapse:**
→ Not a Card. Use Panel.

**User sees a document list with 10 columns:**
→ Not a Card. Use DataTable.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Card (Card) per Storybook.
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

- Panel (**preferred** — more functionality, loading state, toggleable, footerLeft/footerRight)
- Button (footer actions)
- Tag (metadata labels)
- Avatar (user cards)

---
