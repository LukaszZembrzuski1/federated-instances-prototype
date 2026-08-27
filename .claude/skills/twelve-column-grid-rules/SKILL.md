---
name: twelve-column-grid-rules
description: "Applies Aero 12-column grid alignment rules across breakpoints for simple forms, panel overlays, drawer, panel push, asides, and aiR Assist layouts. Use when laying out pages or panels to columns, when the user mentions 12-column grid, grid alignment, Aero grid, drawer, or viewport widths small (360–1023px), medium (1024–1599px), or large (≥1600px)."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# 12 Column Grid Rules

---

# Component Metadata

```yaml
component: LayoutPatterns
version: "1.0"
status: active
owner: Design System Team
last_updated: 2026-04-16
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: n/a (layout contract)

category:
  - layout
  - grid

intent_tags:
  - grid
  - twelve_column
  - layout
  - drawer
  - breakpoints
  - aero_v3
  - figma

platform_support:
  - web

accessibility_required: true

source:
  figma_frame: "12 Col Grid Rules"
  figma_node_id: "807:4847"
  figma_url: "https://www.figma.com/design/5ywwmcuCyslIvDL4eR3beH/Aero-Design-System-v3--IN-PROGRESS-?node-id=807-4847"
  notes: "Annotations on the frame reference grid research (Kasia G.)."
```

---

# Pattern Overview

### Problem

Product teams need a **shared column model** so main regions, overlays, asides, and push panels **line up to the same 12-column foundation** at each Aero viewport width.

### Purpose

Encode **how many columns** main content and panels occupy at **Large**, **Medium**, and **Small** widths, using the **Aero-Grid** overlays in Figma as the visual source of truth.

### Sidebar is outside the 12-column grid

The **12-column Aero grid applies only to the main workspace content region**. It **does not include the sidebar** (persistent app navigation or equivalent vertical chrome). The sidebar occupies its **own** width beside the workspace; **do not** count it toward, subtract it from, or merge it into the **12 columns**. All column math—main, overlay, aside, and push—refers to the region **beside** the sidebar, as shown in the Figma frames.

### Relationship to tokens

`relativity-tokens.json` defines **Bootstrap-style** `breakpoints` (`sm` … `xxl`) for implementation utilities. **Aero grid rules** in this skill use **three bands** (360–1023, 1024–1599, ≥1600). Map product layouts to the **nearest Aero band** when following this skill; do not assume `breakpoints.lg` equals “Aero Large.”

---

# Constraints

```yaml
constraints:

  skill_id: twelve-column-grid-rules
  twelve_column_grid_excludes_sidebar: true
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Viewport bands (Aero 12-column)

| Band | Width | Typical canvas in Figma mocks |
|------|--------|-------------------------------|
| **Small** | 360–1023px | 800px-wide frames |
| **Medium** | 1024–1599px | 1500px-wide frames |
| **Large** | ≥1600px | 1920px-wide frames |

---

# Simple form — baseline alignment

**Main content** uses the full **12-column** width behind the shell (header, tab strip, workspace rail). **The sidebar is not part of those twelve columns**—it sits beside the workspace as separate chrome; column counts apply only to the main region. At **Large**, the hero annotation reads: **main content — 12 columns** (resolution large ≥ 1600px).

![Simple form — grid alignment](images/simple-form-grid-alignment.png)

---

# Panel overlay — column details

Overlays sit **on top of** the 12-column main; annotations describe **panel width in columns** and **how many main columns remain visible**.

## Large (≥ 1600px)

- Panel overlay: **600px max width or 4 columns**
- Main: **12 columns behind overlay** (**8 columns visible** beside the overlay)

![Panel overlay — large](images/panel-overlay-large.png)

## Medium (1024–1599px)

- Panel overlay: **600px max width or 5 columns** (variant) or **min width 400px or 4 columns** (variant on push section — follow the frame label closest to your pattern)
- Main: **12 columns behind overlay** (**8 columns visible**) for the 1500-wide mock

![Panel overlay — medium](images/panel-overlay-medium.png)

## Small (360–1023px)

- Panel overlay: **9 columns** width in the narrow mock
- Main: **3–4 columns visible** (annotation)

![Panel overlay — small](images/panel-overlay-small.png)

---

# Panel push — column details

Push panels **resize** the main region. On this frame, callouts use the same **Panel Overlay** wording as overlays; rely on the **mock title** (`Panel Push - Grid Alignment - …`) plus the **main content** line.

| Band | Panel region (annotation) | Main (annotation) |
|------|---------------------------|-------------------|
| Large | **600px max width or 4 columns** | **8 columns** |
| Medium | **min width of 400px or 4 columns** | **8 columns** |
| Small | **9 columns** | **3 columns visible** |

![Panel push — large](images/panel-push-large.png)

![Panel push — medium](images/panel-push-medium.png)

![Panel push — small](images/panel-push-small.png)

---

# Aside — column details

**Aside** width is annotated as **290px or 2 columns** / **290px or 3 columns** depending on breakpoint; main spans the **remaining** columns (e.g. **8** or **6**).

![Aside — large](images/aside-large.png)

![Aside — medium](images/aside-medium.png)

At **Small**, content may **stack** — annotation: **Content is stacked — spans 100% width of container**.

![Aside — small](images/aside-small.png)

---

# Panel push + aside — combined alignment

Combines **push panel** and **aside**; annotations include **6-column** main regions and **9-column** overlays on Small, with **aside stacked on top of main** where noted.

![Panel push + aside — large](images/panel-push-aside-large.png)

![Panel push + aside — medium](images/panel-push-aside-medium.png)

![Panel push + aside — small](images/panel-push-aside-small.png)

---

# aiR Assist side panel

Frames cover **Simple Form Layout — aiR Assist — Large**, **aiR Assist — Medium**, collapsed sidebars, and **Panel Push** variants at Small — use the mock that matches your product state (collapsed rail vs full).

![aiR Assist — simple form large](images/air-assist-simple-form-large.png)

![aiR Assist — medium](images/air-assist-medium.png)

![aiR Assist — medium collapsed](images/air-assist-medium-collapsed.png)

![aiR Assist — panel push small](images/air-assist-panel-push-small.png)

![aiR Assist — panel push small collapsed](images/air-assist-panel-push-small-collapsed.png)

![aiR Assist — large collapsed](images/air-assist-large-collapsed.png)

---

# Reference: list / page templates

Expanded list page instances are included on the frame for **full-page** column context.

![List page reference A](images/list-page-expanded-reference-a.png)

![List page reference B](images/list-page-expanded-reference-b.png)

![List page reference C](images/list-page-expanded-reference-c.png)

---

# Validation Rules

```yaml
validation_rules:

  - id: grid_excludes_sidebar
    description: The 12-column grid does not include the sidebar—columns apply only within the main workspace beside persistent navigation
    condition: sidebar_counted_in_twelve_column_span
    severity: medium
    enforcement: design_review

  - id: grid_aero_bands
    description: Treat Small/Medium/Large Aero bands as 360–1023, 1024–1599, ≥1600px for grid alignment — not the harness Bootstrap breakpoint keys alone
    condition: layout_confuses_bootstrap_breakpoints_with_aero_grid
    severity: medium
    enforcement: design_review

  - id: grid_figma_source
    description: For pixel-level column counts, defer to frame "12 Col Grid Rules" and linked mocks in Aero Figma
    condition: column_counts_diverge_from_figma_without_documentation
    severity: medium
    enforcement: design_review

  - id: grid_semantic_spacing
    description: Use spacing and layout tokens from relativity-tokens.json for gutters and padding; grid defines columns, not arbitrary px gaps
    condition: arbitrary_gutters_instead_of_tokens
    severity: low
    enforcement: design_review
```

---

# Related skills

- **asides-panels-modals-rules** — aside vs panel vs modal behavior
- **simple-form-guidelines** (if present in the environment) — Simple Form Layout product patterns

---

# Example Scenarios

## Scenario — Right-hand overlay at Large

User intent: Settings-style overlay on a 1920px-wide simple form.

Recommended: Follow **Panel overlay — Large**: **4-column** (~600px) overlay; main remains **12 columns** total with **8 columns** visible beside the overlay. Align fields to the grid overlay in Figma.

## Scenario — Aside + table page at Medium

User intent: Persistent aside with list main region at 1500px width.

Recommended: Use **Aside — Medium** mock; aside **290px or 3 columns**, main **6 columns** per annotations; verify in Figma against **Aero-Grid NEW**.

## Scenario — Narrow viewport

User intent: Mobile or narrow browser in the Small band.

Recommended: Prefer **stacked** layout when the frame notes **100% width** or reduced visible main columns; overlays often consume **9 columns** in the 800px-wide reference frame.

---
