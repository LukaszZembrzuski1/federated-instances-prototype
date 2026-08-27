---
name: toolbar-action-bar
description: "Use when implementing the Toolbar [Action Bar] component. Trigger on: toolbars, action bars, button strips, grouped actions at the top of a view or panel, or any horizontal grouping of buttons, search, dropdowns, or paginators."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Toolbar

---

# Component Metadata

```yaml
component: Toolbar
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Toolbar

category:
  - navigation
  - layout

intent_tags:
  - toolbar
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need a consistent place for actions and controls that apply to the current view—Run search, Export, Add document, Filters—without crowding the main content. A toolbar is a horizontal bar (often below the title or menubar) that holds buttons, dropdowns, and filters for the view below.

In RelativityOne, toolbars are used above document list (Add, Tag, Export, Filters), above search (Run, Save, Export, Filters), in workspace view (Refresh, Settings), in admin lists (Add user, Add workspace), and for any view-specific actions in document review, workspace config, admin, or search.

### Purpose

Group view-level actions and controls (buttons, dropdowns, search, filters) in a horizontal bar; support left and right sections; keep actions visible and accessible.

### User Goal

Users interact with toolbars to:

- Find and trigger primary actions (Run, Save, Export, Add)
- Access filters or view options (dropdowns, toggles)
- Use secondary actions (overflow menu when many)

### Interaction Type

- Trigger actions
- Collect input (filters, search)
- Display information (e.g., selection count)

### PrimeReact Component

Use the PrimeReact `Toolbar` component to implement action bars.

### Related Components

- Button
- Menu
- Menubar
- DataTable

---

# When to Use

Use a toolbar in the following scenarios:

1. **Above list or table**  
   Example: Document list toolbar: Add, Tag selected, Export, Filters dropdown, search; search results: Run, Save search, Export.

2. **Above detail or form**  
   Example: Workspace detail: Edit, Refresh, Settings; user detail: Edit, Disable.

3. **View-level actions**  
   Example: Admin list: Add user, Add workspace, Bulk actions; coding view: Apply tag set, Clear coding.

4. **Any view that has 2+ actions or filters that belong to that view**  
   Example: Consistent placement (top of content) so users know where to look.

---

# When NOT to Use

Do **not** use a toolbar in the following scenarios:

1. When the only control is a single button (e.g., "Save"); place button in form footer or inline.
2. When the bar is main app navigation (Workspaces, Search, Admin); use Menubar.
3. When actions are row-specific only (e.g., per document row); use row actions or ContextMenu, not toolbar.
4. When there are no actions (only title); use heading or title bar, not toolbar.

### Alternatives

| Situation | Use Instead |
|----------|-------------|
| Main app nav | Menubar |
| Single action | Button placement |
| Row actions | Row buttons, ContextMenu |
| No actions | Title/heading only |
| Many actions, compact | Toolbar + overflow Menu |

---

# Decision Triggers

```yaml
decision_triggers:

  use_toolbar_if:
    - Use a toolbar in the following scenarios:
    - 1. **Above list or table**
    - Example: Document list toolbar: Add, Tag selected, Export, Filters dropdown, search; search results: Run, Save search, Export.
    - 2. **Above detail or form**
    - Example: Workspace detail: Edit, Refresh, Settings; user detail: Edit, Disable.
    - 3. **View-level actions**

  do_not_use_toolbar_if:
    - Do **not** use a toolbar in the following scenarios:
    - 1. When the only control is a single button (e.g., \"Save\"); place button in form footer or inline.
    - 2. When the bar is main app navigation (Workspaces, Search, Admin); use Menubar.
    - 3. When actions are row-specific only (e.g., per document row); use row actions or ContextMenu, not toolbar.
    - 4. When there are no actions (only title); use heading or title bar, not toolbar.
    - | Situation | Use Instead |
```

---

# Additional Topics

# Component Variants

### Left and Right Sections

**Purpose**

Primary actions left (e.g., Add, Run); filters and secondary right (e.g., Filters, View options, User).

**Typical Use Cases**

- Document list, search results
- Admin list

### With Selection

**Purpose**

When items are selected, toolbar shows selection count and selection-specific actions (e.g., "3 selected – Tag, Remove").

**Typical Use Cases**

- DataTable with bulk actions
- Document list: Tag selected, Export selected

### With Search or Filter Inline

**Purpose**

Toolbar includes search input or filter dropdown(s) inline.

**Typical Use Cases**

- Search box in toolbar
- Filter by status, type in toolbar
- Combined actions + filters in one bar

---

# Component States

- Default (no selection)
- Has selection (optional: count, selection actions enabled)
- Loading (optional; disable actions or show spinner)
- Disabled (optional; entire view disabled)

### Special Behavior

- Toolbar content may change with view (e.g., document list vs workspace list); keep pattern consistent (left primary, right filters).

---

# Behavioral Rules

1. Order actions by importance: primary left, secondary or overflow right; destructive last or in menu.
2. Use Divider or spacing to group related controls (e.g., view toggle | filters | export).
3. When selection changes, update toolbar (e.g., enable/disable "Tag selected," show count); keep state in sync.
4. Overflow: if too many actions for width, put secondary in "More" or "Actions" menu so toolbar does not wrap badly.

---

# Layout and Placement

## Typical Placement

Toolbar is directly above the main content of the view (below breadcrumb/title), full width of content area. One toolbar per view.

## Common Patterns

- Left: 1–3 primary buttons, optional search/filter
- Right: View options, filters, overflow menu
- Optional: second row (e.g., filter chips) or inline filters
- Divider between groups

## Layout Constraints

- Wrap or overflow when space is limited; avoid crushing buttons (min width, overflow menu).
- Consistent height with other toolbars in product; align with content below.

## Spacing Rules

- Consistent gap between controls; padding at edges; alignment with content.

---

# Constraints

```yaml
constraints:

  skill_id: toolbar
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: toolbar
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Toolbar and this skill's sections
```

**Additional accessibility notes (from prior skill):**

### Required Attributes

- role="toolbar" on container; aria-label (e.g., "Document list actions" or "Toolbar").
- Buttons and controls inside have accessible names; icon-only buttons need aria-label or Tooltip.
- If toolbar is complex, consider region with aria-label so screen reader users know it is the action bar.

### Keyboard Behavior

- Tab through each control (buttons, dropdowns, inputs); no arrow-key grouping unless custom (then document pattern).
- Enter/Space on buttons; standard behavior for dropdowns and inputs.
- Do not trap focus; Tab leaves toolbar to content below (or next region).

### Screen Reader Behavior

- Toolbar and purpose announced when entering (from aria-label); each control announced.
- Selection count (e.g., "3 selected") in toolbar should be exposed (live region or in label).

### Focus Behavior

- Visible focus on each control; focus order left to right (or logical order).
- Focus order: toolbar then main content.

### Common Accessibility Mistakes

- Icon-only buttons without aria-label or Tooltip.
- No toolbar label (role="toolbar" without aria-label).
- Too many Tab stops (group or overflow); or trap in toolbar.

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
    - Dropdown
    - InputText
    - DataTable
    - Divider
    - Menubar
    - Menu
    - Panel

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Toolbar
```

---

# Validation Rules

```yaml
validation_rules:

  - id: toolbar_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: toolbar_storybook_api
    description: Implement Toolbar using PrimeReact Toolbar per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: toolbar_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using toolbar for main app nav (use Menubar).
**Severity:** Medium

## Anti-pattern 2
**Problem:** Putting row-specific actions only in toolbar (add row actions or context menu).
**Severity:** Medium

## Anti-pattern 3
**Problem:** Too many actions without overflow (use "Actions" menu).
**Severity:** Medium

## Anti-pattern 4
**Problem:** Unlabeled icon-only buttons.
**Severity:** Medium


---

# Component Decision Logic

### Scenario

Document list view needs Add, Tag, Export, Filters.

**Use Toolbar:** Yes

Alternative if not used:
- Buttons placed inline or in menu (less consistent).

### Scenario

User needs top-level nav: Workspaces, Search, Admin.

**Use Toolbar:** No

Alternative:
- Menubar.

### Scenario

User right-clicks document for View, Tag, Remove.

**Use Toolbar:** Supplement with ContextMenu

Alternative:
- Row "Actions" button that opens Menu (same actions).

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Toolbar (Toolbar) per Storybook.
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

### Commonly Used With

- Button (actions)
- Dropdown (filters, view options)
- InputText (search in toolbar)
- DataTable (toolbar above table)
- Divider (between groups)

### Commonly Confused With

- Menubar (main nav)
- Menu (dropdown of actions)
- Panel (section container)
