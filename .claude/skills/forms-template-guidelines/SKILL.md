---
name: forms-template-guidelines
description: "Implements Aero Forms Template layouts: tab strip, top nav, main grid, right panel overlay, asides, push panels, Drawer, aiR Assist, and component-specific form patterns. Use when building form pages, aiR form UIs, layout building blocks, high-fidelity form mocks, or when the user asks for forms template, simple form layout, Drawer, or Pagebase form structure."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Forms Template Guidelines

---

# Component Metadata

```yaml
component: FormsTemplateLayout
version: "1.0"
status: active
owner: Design System Team
last_updated: 2026-04-13
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: multiple (Navigation, Panel, Sidebar, Drawer, Dialog, layout primitives)

category:
  - layout
  - forms

intent_tags:
  - forms
  - form_layout
  - template
  - tab_strip
  - top_nav
  - aside
  - panel
  - drawer
  - overlay
  - aiR
  - pagebase
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true

source:
  figma_frame: "Forms Template Guidelines"
  figma_node_id: "1082:28295"
  figma_file_key: "PKq5xFuespv1qlFujNKbDe"
```

---

# Pattern Overview

### Problem

Form-heavy product areas need a **consistent template**: where the tab strip, top navigation, main column, asides, push panels, Drawer, and overlay panels sit relative to the grid, and how **simple** vs **medium** vs **complex** layouts behave.

### Purpose

This skill captures the **Forms Template Guidelines** from Aero: building-block wireframes (low fidelity), usage copy, **high-fidelity** mocks, and **component-specific** behaviors (pagination, more-options patterns, edit flows, multi-tab forms, Drawer where layouts use docked or push side regions).

### Visual reference

Each major frame is stored as a PNG under [`images/`](images/). If files are missing locally, run [`images/export-frames.mjs`](images/export-frames.mjs) with `FIGMA_ACCESS_TOKEN` (see [`images/README.md`](images/README.md)).

### Related skills

- **asides-panels-modals-rules** — aside vs panel push vs overlay vs modal decisions.
- **panel**, **sidebar-flyout**, **drawer**, **confirm-dialog** — concrete Relativity UI components when implementing.

---

# Form layout — building blocks

Wireframes show **Tab strip**, **Top nav**, **Main**, and optional **Right panel overlay**, **Aside**, **Push panels**, Drawer, **aiR Assist**, and combined layouts.

## Basic Form Page

**Structure:** Tab strip stays at the **top** of the page. **Top nav** holds actions. **Main** content spans the page.

![Basic Form Page — building block](images/basic-form-page-building-block.png)

## Right Panel Overlay

**Structure:** Same shell as basic page; **Right panel overlay** sits over the main region. Labels in the wireframe identify **TAB STRIP**, **TOP NAV**, **MAIN**, and **RIGHT PANEL OVERLAY**.

![Right Panel Overlay — building block](images/right-panel-overlay-building-block.png)

## Right Aside

**Sizing (large):** **Right Aside** follows **~400px** or **2 columns** max width; **main** sits at **10 columns**.

![Right Aside — building block](images/right-aside-building-block.png)

## Left / right asides and push panels

![Aside right — building block](images/aside-right-building-block.png)

![Left Aside — building block](images/left-aside-building-block.png)

![Left push panel — building block](images/left-push-panel-building-block.png)

![Right push panel — building block](images/right-push-panel-building-block.png)

![Right + Left Aside — building block](images/right-left-aside-building-block.png)

![Push panel + Right panel overlay — building block](images/push-panel-with-right-panel-overlay-building-block.png)

![Push panel + Aside — building block](images/push-panel-and-aside-building-block.png)

## aiR Assist

![aiR Assist — building block](images/air-assist-building-block.png)

![aiR Assist — building block variant](images/air-assist-building-block-2.png)

---

# Form layout — usage guidelines

Placement notes sit next to the **Basic Form Page** and **Right Panel Overlay** usage frames below.

## Basic Form Page (usage)

**Tabs:** Keep tabs as-is in the tab strip on all Forms pages; alignment is owned by **Pagebase** and should not change for this scope.

**Buttons:** Place primary actions at the **top right** inside the top nav (typical aiR placement). Use a **3-dot ellipsis** or **menu button** for additional actions.

**Actions in the menu** may include: **Delete**, **Edit Permissions**, **View Audit**, **Edit Layout** (layout switching may live in the right panel in edit mode — confirm with design).

**Pagination:** Usually on the **right**; alternatively at a higher level (e.g. near the tab strip) with an overflow caret if tabs consume horizontal space.

**Main content:** For **simple** layouts, keep categories minimal: **category cards**, **1–2 tabs**, short lists of options or fields.

![Basic Form Page — usage guidelines](images/basic-form-page-usage-guidelines.png)

## Right Panel Overlay (usage)

Use the **right panel overlay** for **form editing** on simple layouts.

**Reasoning:** Avoids two competing action rows; keeps focus on what is being edited without a full navigation; supports quick edit and moving to the next task; aligns with general right-panel guidance.

**Panel width:** Follow **~600px** or **2–3 columns** max; **main** sits at **9–10 columns** at large sizes.

![Right Panel Overlay — usage guidelines](images/right-panel-overlay-usage-guidelines.png)

## Right Aside (usage)

**Sizing:** **~400px** or **2 columns** max; **main** at **10 columns** (large).

![Right Aside — usage guidelines](images/right-aside-usage-guidelines.png)

## Combined aside + push panel (usage)

![Right + Left Aside — usage](images/right-left-aside-usage-guidelines.png)

![Right + Left push panel — usage](images/right-left-push-panel-usage-guidelines.png)

![Push panel + Aside — usage](images/push-panel-and-aside-usage-guidelines.png)

---

# Form layout — high-fidelity mockups

## Medium complexity

![Medium — More options with dropdown](images/medium-more-options-with-dropdown.png)

![Medium — Panel overlay](images/medium-panel-overlay.png)

![Medium — Aside](images/medium-aside.png)

## Complex layouts

![Complex — Left panel push](images/complex-left-panel-push-1.png)

![Complex — Left panel with panel overlay](images/complex-left-panel-with-panel-overlay.png)

![Complex — 2 Asides](images/complex-2-asides.png)

![Complex — Left panel push (variant)](images/complex-left-panel-push-2.png)

## Panel push — grid alignment

![Panel push — grid alignment](images/panel-push-grid-alignment-1.png)

![Panel push — grid alignment (narrow)](images/panel-push-grid-alignment-2.png)

![Panel push — grid alignment — large](images/panel-push-grid-alignment-large.png)

---

# Component-specific guidelines

## Simple mockup (low fidelity)

**Paginator (RUI):** Place the paginator **on the same row as the tabs**, aligned to the **right**.

**More options menu:** The **More options** pattern consolidates secondary actions in a dropdown.

**Actions** may include: Delete, Edit Permissions, View Audit, Edit Layout (layout editing may live in the right panel in edit mode).

**Edit details:** Opens the **sidebar panel overlay**. If the form exceeds **three sections**, **Edit details** may navigate to a **separate screen** for editing fields.

**Main content:** Same as simple layout guidance — category cards, **1–2 tabs**, short lists of fields.

![Simple — component-specific mockup](images/simple-component-specific-mockup.png)

## Medium mockups

**Multiple tabs in edit mode:** If there are multiple tabs, either stack sections **vertically** when content is short enough to avoid scroll, or use a **Next** button at the **bottom right** of the overlay when each tab has long field lists.

![Medium — component-specific mock 1](images/medium-component-specific-mock-1.png)

![Medium — component-specific mock 2](images/medium-component-specific-mock-2.png)

---

# Decision Triggers

```yaml
decision_triggers:

  use_basic_form_template_if:
    - Tab strip + top nav + full-width main for standard Forms pages.
    - Simple category content with 1–2 tabs and short field lists.

  use_right_panel_overlay_for_editing_if:
    - Editing a form in place without leaving the page.
    - Avoiding duplicate primary action rows; target ~600px or 2–3 columns overlay.

  use_right_aside_if:
    - Persistent right region ~400px or 2 columns; main at 10 columns at large sizes.

  prefer_top_right_actions_if:
    - aiR-style actions; overflow via 3-dot or menu button.

  open_edit_details_in_sidebar_if:
    - Default edit flow unless section count forces a full edit screen.

  use_next_in_overlay_for_long_tabs_if:
    - Multiple tabs with long field lists and vertical stacking is impractical.
```

---

# Constraints

```yaml
constraints:
  - Tab strip placement is Pagebase-owned; do not relocate for Forms-only work.
  - Panel, aside, and Drawer widths must align with breakpoints and grid guidelines in the PNGs.
  - Do not introduce a second competing primary action row when an overlay already provides actions.
```

---

# Accessibility Requirements

- Overlay panels should trap focus while open; restore focus to the trigger on close.
- Top nav and tab strip order should remain logical for keyboard users (align with RUI patterns).
- Pagination and tab row controls need visible focus and accessible names.

---

# Related Components

- **Panel** — collapsible sections and filters.
- **Sidebar [Flyout]** — edge overlay for overlays that slide over content.
- Drawer — collapsible sidebar alongside main content (dock / push patterns where applicable).
- **Dialog / Modal** — **Edit Layout** and other blocking confirmations.

---

# Validation Rules

1. **Grid alignment** — Match building-block columns to the wireframe (see grid alignment frames).
2. **Width caps** — Right panel overlay ~600px / 2–3 columns; right aside ~400px / 2 columns; Drawer widths per wireframes and the **drawer** skill unless design approves an exception.
3. **Paginator** — Same row as tabs, right-aligned for the simple template mock.
4. **Edit details** — Sidebar overlay by default; full-page edit only when section count or complexity exceeds the threshold in design.
