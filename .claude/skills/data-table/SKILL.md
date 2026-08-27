---
name: data-table
description: "Use when implementing DataTable for tabular data display. Trigger on: data tables, document lists, search results tables, sortable columns, selectable rows, paginated lists, or any structured data in rows and columns."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# DataTable

---

# Component Metadata

```yaml
component: DataTable
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: DataTable

category:
  - data
  - display

intent_tags:
  - data_table
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to scan, sort, filter, and act on many rows of structured data — documents, search results, users, workspaces. A DataTable presents rows and columns with sorting, selection, pagination, and row actions so users can find items and perform bulk or row-level operations.

In RelativityOne, DataTable is central to document review (document list, coding), search results, workspace and user management, saved searches, tagging, and admin lists.

### Purpose

Display structured data in rows and columns with support for sorting, selection, filtering, pagination, and row-level or bulk actions.

### Storybook Component

Use the `DataTable` component (under Data & Display). Built on PrimeReact DataTable. Use `Column` sub-component for column definitions. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADdata-display-datatable--docs`

### Key Props

| Prop | Type | Options | Description |
|---|---|---|---|
| `value` | `array` | — | Array of records to render |
| `size` | `string` | `small`, `normal`, `large` | Row density |
| `stripedRows` | `boolean` | — | Alternating row background |
| `rowHover` | `boolean` | — | Highlight row on hover |
| `paginator` | `boolean` | — | Enable pagination |
| `rowsPerPageOptions` | `number[]` | — | Rows-per-page options |
| `scrollable` | `boolean` | — | Enable horizontal/vertical scroll |
| `sortMode` | `string` | `single`, `multiple` | Sorting mode |
| `removableSort` | `boolean` | — | Allow clearing sort via UI |
| `resizableColumns` | `boolean` | — | Enable column resizing |

Also see: `DataTableAdvanced`, `DataTableHeader`, column filter types, and advanced patterns in Storybook.

### Related Components

- Tree (hierarchical data — use when rows have parent-child structure)
- PickList (dual-list selection — use when moving items between lists)
- Paginator (pagination controls — built into DataTable or used standalone)
- Toolbar [Action Bar] (bulk actions above the table)

---

# When to Use

1. **Document or search results list** — Documents with columns for name, date, tag count, status; sortable and selectable for review and tagging.
2. **Admin or config lists** — Users, groups, workspaces, saved searches with row actions (edit, delete, view).
3. **Tagging or coding grids** — Documents with tag columns; row selection for bulk apply or remove.
4. **Any tabular data with many rows** — Audit logs, export history, permission matrices.

---

# When NOT to Use

1. Hierarchical data needing expand/collapse → use Tree.
2. A single record or form → use FormField layout.
3. A very short list (≤ 5 items) → a simple list or Dropdown may suffice.

---

# Decision Triggers

```yaml
decision_triggers:

  use_data_table_if:
    - Documents with columns for name, date, tag count, status; sortable and selectable for review and tagging.
    - Users, groups, workspaces, saved searches with row actions (edit, delete, view).
    - Documents with tag columns; row selection for bulk apply or remove.
    - Audit logs, export history, permission matrices.

  do_not_use_data_table_if:
    - Hierarchical data needing expand/collapse → use Tree.
    - A single record or form → use FormField layout.
    - A very short list (≤ 5 items) → a simple list or Dropdown may suffice.
```

---

# Additional Topics

# Row Density

Use `size` to control row density:
- `small` — dense; use in compact review UIs with many rows
- `normal` — default; use in most admin and search contexts
- `large` — spacious; use when rows contain rich content or actions

---

# DataTableAdvanced (new features in 3.0)

`DataTableAdvanced` is the full-featured variant with integrated header, footer, pagination, filtering, sorting, mass actions, and now **column freezing** and **declarative column definitions**.

### Column Definitions (alternative to children)

Instead of passing `<Column>` children, you can provide a `columns` prop with an array of `DataTableColumnDefinition` objects. This is required for column freezing and enables more programmatic control.

```ts
type DataTableColumnDefinition<T> = ColumnProps & {
  field: string          // Required: field name to access row data
  columnKey?: string     // Unique column identifier (defaults to field)
  cellBody?: ReactNode | ((data: T, options: ColumnBodyOptions) => ReactNode)
  filterConfig?: CreateColumnFilterConfig
  filterType?: ColumnFilterType
}
```

### Column Freezing (new in 3.0)

Freeze columns from the left so they stay visible during horizontal scrolling. Enable with `enableFreezeLeft={true}` and the `columns` prop.

| Prop | Type | Description |
|---|---|---|
| `enableFreezeLeft` | `boolean` | Enables the freeze-left feature |
| `frozenColumnKeys` | `string[]` | Controlled: current frozen column keys |
| `onFrozenColumnKeysChange` | `(keys: string[]) => void` | Controlled: callback when frozen keys change |

**Controlled vs uncontrolled:** Omit both `frozenColumnKeys` and `onFrozenColumnKeysChange` for uncontrolled mode (hook manages state internally). Provide both for controlled mode.

Freeze behavior uses the **display order** (after any drag-and-drop reordering), not the original definition order:
- **Freeze left** — freezes all columns from the first through the specified column
- **Unfreeze** — unfreezes the specified column and all columns to its right

The header shows a "Clear frozen columns" action when any columns are frozen.

### Additional DataTableAdvanced Props (new in 3.0)

| Prop | Type | Description |
|---|---|---|
| `columns` | `DataTableColumnDefinition<T>[]` | Declarative column definitions (alternative to children) |
| `centerHeaderElement` | `ReactNode` | Custom element in the center of the table header |

---

# Behavioral Rules

1. Column headers must be clear; use Tooltip for truncated or technical names.
2. Row actions should be consistent across all rows — same position (last column or overflow menu).
3. Selection state (all, none, partial) must be clear — support "select all on page" and "clear selection."
4. Empty and loading states must be handled — show Skeleton rows while loading; show an empty state message when no results.
5. Sort and filter state must be visually indicated — sort arrow, active filter chips.

---

# Layout and Placement

DataTable is typically the main content of a view — full width, below a Toolbar with filters and bulk actions, with a Paginator below.

```
[Toolbar: search, filters, bulk actions]
[DataTable]
[Paginator]
```

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Cell padding: `8px` vertical, `16px` horizontal (normal size)
- Gap between table and toolbar: `8px`
- Numbers in cells: right-aligned; text: left-aligned

---

# Constraints

```yaml
constraints:

  skill_id: data-table
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: data-table
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact DataTable and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- `<table>` with proper structure: `thead`, `tbody`, `th` with `scope="col"`
- Sortable columns: `aria-sort` on `<th>`; sort control is a `<button>` with accessible name
- Row selection: checkboxes with `aria-label` per row; "Select all" checkbox with `aria-checked="mixed"` for partial selection
- Table must have `aria-label` or `<caption>` describing its purpose
- Loading state: `aria-busy="true"` on the table; announce when loaded

**Common mistakes:**
- No empty or loading state — users cannot tell if data is missing or still loading
- Sort controls without accessible names
- `<div>`-based layout losing table semantics

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
    - Tree
    - PickList
    - Paginator
    - Toolbar [Action Bar]

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - DataTable
      - DataTableAdvanced
      - VirtualDataTable
```

---

# Validation Rules

```yaml
validation_rules:

  - id: data-table_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: data-table_storybook_api
    description: Implement DataTable using PrimeReact DataTable per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: data-table_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact DataTable from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use DataTable when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: DataTable (DataTable) per Storybook.
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

- Tree (hierarchical data — use when rows have parent-child structure)
- PickList (dual-list selection — use when moving items between lists)
- Paginator (pagination controls — built into DataTable or used standalone)
- Toolbar [Action Bar] (bulk actions above the table)

---
