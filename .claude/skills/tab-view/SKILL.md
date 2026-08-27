---
name: tab-view
description: "Use when implementing TabView for switching between sibling content sections. Trigger on: tabbed panels, switching between Detail/Activity/Notes, sibling sections in one view, or any interface where 2–5 sections are shown one at a time."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# TabView

---

# Component Metadata

```yaml
component: TabView
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: TabView

category:
  - navigation
  - layout

intent_tags:
  - tab_view
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to switch between two or more sections of content in the same view — Details / Activity / Notes for a document, or Settings / Members / History for a workspace — without leaving the page. TabView shows section labels and reveals one panel at a time.

In RelativityOne, TabView is used for document detail (Metadata / Native / Tags / Activity), workspace or saved search detail (Settings / Documents / History), admin entity detail (Details / Permissions / Audit), and any view with 2–5 sibling sections.

### Purpose

Let the user switch between multiple panels in the same context. One panel is visible at a time; tab labels indicate the sections.

### Storybook Component

Use the `TabView` component (under Navigation). Built on PrimeReact TabView. Also see `TabViewCollapsible` for a collapsible variant. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADnavigation-tabview--docs`

### Props

| Component | Prop | Type | Default | Description |
|---|---|---|---|---|
| `TabView` | `scrollable` | `boolean` | — | Enables scroll buttons when tabs overflow |
| `TabPanel` | `header` | `string` | — | Tab label text |
| `TabPanel` | `disabled` | `boolean` | — | Disables this tab |

Use `activeIndex` on `TabView` for controlled mode (managing selected tab via state).

### TabViewCollapsible Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `collapsed` | `boolean` | `false` | Initial collapsed state (new in 3.0) |
| `isCollapsed` | `boolean` | `false` | **Deprecated** — use `collapsed` instead |
| `onToggle` | `(isCollapsed: boolean) => void` | — | Callback when the panel is toggled |
| `toggleable` | `boolean` | `true` | Enable panel toggle |
| `panelProps` | `PanelProps` | — | Props passed to the wrapping Panel; supports `loading` (replaces `isLoading`) |

### Related Components

- Accordion (expand/collapse; all sections stackable, not tabs)
- Steps (sequential workflow — use instead of tabs for ordered flows)
- Panel (single section container)
- TertiaryNavigation (side navigation for many sections)

---

# When to Use

1. **Document or entity detail** — Document: Metadata, Native, Tags, Activity. Workspace: Settings, Members, History.
2. **Admin or config sections** — User: Profile, Permissions, Audit. Workspace: General, Fields, Security.
3. **2–5 sibling sections** — Content is substantial per section and switching is preferred over one long scrolling page.

---

# When NOT to Use

1. Sequential steps where order matters → use Steps.
2. All sections should be visible or comparable → use Accordion or a single page with headings.
3. Only one section → use Panel or plain content.
4. More than 5–7 tabs → group them or use TertiaryNavigation.

| Situation | Use Instead |
|---|---|
| Sequential steps | Steps |
| All sections visible | Accordion |
| Single section | Panel |
| Many sections | TertiaryNavigation |
| Location in hierarchy | Breadcrumb |

---

# Decision Triggers

```yaml
decision_triggers:

  use_tab_view_if:
    - Document: Metadata, Native, Tags, Activity. Workspace: Settings, Members, History.
    - User: Profile, Permissions, Audit. Workspace: General, Fields, Security.
    - Content is substantial per section and switching is preferred over one long scrolling page.

  do_not_use_tab_view_if:
    - 1. Sequential steps where order matters → use Steps.
    - 2. All sections should be visible or comparable → use Accordion or a single page with headings.
    - 3. Only one section → use Panel or plain content.
    - 4. More than 5–7 tabs → group them or use TertiaryNavigation.
    - | Situation | Use Instead |
    - | Sequential steps | Steps |
```

---

# Behavioral Rules

1. One panel visible at a time; switching updates content and URL/hash when deep-linking is supported.
2. Tab labels must be short and clear — use a Tooltip if a label truncates.
3. Do not put critical one-time content only in a non-default tab without surfacing a hint.
4. Persist the selected tab when possible — restore it on return to the view.
5. Use `scrollable={true}` when tabs may overflow the available width.

---

# Layout and Placement

Tabs sit at the top of the content area (below breadcrumb/title) or as the main navigation for a detail view. The panel fills the space below.

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Tab label padding: `8px` vertical, `16px` horizontal
- Panel content padding: `16px` on all sides
- Bottom border/indicator on active tab: `2px` using `$color-interactive`

---

# Constraints

```yaml
constraints:

  skill_id: tab-view
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: tab-view
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact TabView and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- `role="tablist"` on the tab container
- `role="tab"` on each tab; `role="tabpanel"` on each panel
- `aria-selected="true"` on the active tab; `false` on others
- `aria-controls` on each tab pointing to its panel `id`
- `aria-labelledby` on each panel pointing to its tab `id`
- Disabled tab: `aria-disabled="true"` and not focusable

**Keyboard:** Arrow left/right to move between tabs; Enter or Space to select. Tab moves into the panel content. Focus does not trap in the tab list.

**Common mistakes:**
- Missing `tablist`/`tab`/`tabpanel` roles
- No `aria-selected` or `aria-controls`
- No keyboard navigation between tabs

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
    - Accordion
    - Steps
    - Panel
    - TertiaryNavigation

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - TabView
      - TabViewCollapsible
```

---

# Validation Rules

```yaml
validation_rules:

  - id: tab-view_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: tab-view_storybook_api
    description: Implement TabView using PrimeReact TabView per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: tab-view_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact TabView from Storybook.
**Severity:** High


---

# Component Decision Logic

**User views a document with Metadata, Native, Tags, Activity:**
→ TabView.

**User completes: Select workspace → Configure → Review:**
→ Not a TabView. Use Steps (ordered workflow).

**User sees Workspace > Folder > Document path:**
→ Not a TabView. Use Breadcrumb (hierarchy, not sections).

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: TabView (TabView) per Storybook.
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

- Accordion (expand/collapse; all sections stackable, not tabs)
- Steps (sequential workflow — use instead of tabs for ordered flows)
- Panel (single section container)
- TertiaryNavigation (side navigation for many sections)

---
