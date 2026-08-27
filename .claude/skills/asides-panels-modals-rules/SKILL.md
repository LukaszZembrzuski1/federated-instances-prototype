---
name: asides-panels-modals-rules
description: "Chooses and implements Aside vs Panel (push vs overlay), sidebar flyout, and Modal patterns per Aero layout rules. Use when designing or building docked side regions, push panels, overlay drawers, full-screen drawers, modals, or when the user asks how aside, panel, flyout, sidebar overlay, or modal should behave."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Asides, Panels & Modal Rules

---

# Component Metadata

```yaml
component: LayoutPatterns
version: "1.0"
status: active
owner: Design System Team
last_updated: 2026-04-13
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: multiple (Aside region, Panel, SidebarFlyout, Dialog)

category:
  - layout
  - overlay

intent_tags:
  - aside
  - panel
  - side panel
  - sidebar
  - flyout
  - drawer
  - modal
  - layout
  - storybook
  - aero_v3

platform_support:
  - web

accessibility_required: true

source:
  figma_frame: "Component-Specific Rules and examples"
  figma_node_id: "661:3364"
```

---

# Pattern Overview

### Problem

Teams need consistent rules for **docked persistent regions** (Aside), **collapsible or triggered panels** (Panel push vs overlay), **edge flyouts**, and **modals** so layouts stay readable, accessible, and predictable across breakpoints.

### Purpose

This skill encodes **when** to use each pattern, **how** they differ in behavior, **recommended widths**, **responsive behavior**, **animation**, **a11y**, and **anti-patterns**—aligned with the Aero v3 Figma spec for asides, panels, and modals.

### Relationship to Relativity UI

Map patterns to concrete components as follows (see linked skills and Storybook for APIs):

- **Aside (docked)** — persistent side column; use landmark roles (`nav`, `aside`); not an overlay.
- **Panel push** — resizes or pushes main content; see **Panel** skill for inline/side patterns.
- **Panel overlay / Sidebar flyout** — overlaps main content, often with backdrop; use **Sidebar [Flyout]** (`sidebar-flyout` skill) and related overlays.
- **Modal** — focused, interruptive layer; use **Dialog** / confirm patterns (`confirm-dialog` skill) when appropriate.

---

# Aside vs Panel (behavior)

**Core difference:** **Aside** is for interaction that **changes or supports the main surface** (filters, browsers, conditions). **Panel** presents **contextual or tertiary** work alongside main content (details, previews, complementary actions).

| | Aside | Panel |
|---|--------|--------|
| Default | Typically expanded / always available | Often collapsed until opened |
| Role | User works in aside to affect **Main** | Content **alongside** Main |
| Small / medium viewports | Stays beside **Main** where design allows | Often becomes an **overlay** |
| Large viewports | Remains docked | May be push or overlay per pattern |

**Viewport note:** On small and medium viewports, **Panel** often becomes an overlay while **Aside** may stay next to Main (per product layout).

### When to use Aside

Use **Aside** for content that should stay **visible and reachable** without opening it first (or with optional collapse):

- **Left Aside:** filters, browsers, search conditions.
- **Right Aside:** previews, action panels.

### When to use Panel

Use **Panel** for **contextual information** or **tertiary actions** that complement the primary task—extra workspace without leaving the page.

- **Left Panel:** supporting action panels (e.g. aiR Assist).
- **Right Panel:** action details, complex previews, complementary actions.

### Avoid push panels when

- The page has **dense tables** (reflow can collapse columns and hurt scanability).
- The layout is **fixed-width** and may not resize cleanly.

---

# Panel push vs panel overlay

## Panel push (pushes layout)

A **flyout that pushes** main content rather than sitting on top.

**Used for:** supporting action panels (e.g. aiR Assist), presenting action details.

**Recommended widths**

- Filters: **280–320px**
- Detail panel: **320–400px**
- Complex forms: **400–600px**
- aiR Assist: **min 400px**, **max ~700px** (confirm with design for edge cases)

**Rules**

- Do not exceed **~40%** of viewport width for the push region.
- On desktop, avoid shrinking **main** content below **~400px** width.
- Animate open/close in **200–300ms** ease-in-out.

**When to avoid**

- Data-dense dashboards (too much layout shift).
- Multi-column tables where reflow breaks readability.

## Panel overlay (overlaps content)

A **flyout overlay** sits **above** content with a **backdrop** (“curtain”); main content stays visually underneath but is deprioritized.

**Used for:** temporary actions, context editing, complex previews, complementary action panels.

**Recommended widths**

- Filters: **320px**
- Detail panel: **360–420px**
- Complex forms: **up to ~610px** (about four columns on a 1920px-wide screen)

**Responsive**

- **Tablet (~768–1024px):** panel about **60–80%** of screen width.
- **Mobile (&lt;768px):** often **100% width** (full-screen drawer pattern).

**Use overlay when**

- Users should return to underlying content quickly.
- Main content must stay **visible for reference** but not interactive at the same time.
- You want to **avoid shrinking** main content (e.g. large data tables).

---

# Modal

A **modal** sits above the main UI and **blocks** the rest until completed or dismissed.

**When a modal opens**

- The rest of the interface is **inactive**.
- **Focus** moves into the modal.
- User must **complete or dismiss** before continuing.

Modals **interrupt**—use intentionally.

**Used for:** confirming important actions, short tasks, critical information, some temporary contextual actions.

**Recommended widths**

- Small: **320–400px** (confirmations)
- Medium: **480–640px** (forms, editing)
- Large: **720–960px** (rich content, previews)

**Best practices**

- Do not exceed **~960px** wide; if more space is needed, prefer **full-page flow**, **drawer**, or **side panel** per product patterns.

**Avoid modals when**

- Tasks are long or complex.
- Users must **reference other content** while working.
- Content needs **heavy navigation** inside the shell.

---

# Sidebar flyout overlay vs modal (decision)

- Use a **sidebar overlay** when users need **context from the page** while working (details, edits, history, properties).
- Use a **modal** when users must make a **focused decision or confirmation** before continuing.

### Sidebar flyout overlay — good fits

1. **Viewing or editing details** while keeping list/page context (metadata, comments, activity, object properties).
2. **Multi-step or moderately complex tasks** (more than a couple of fields)—prefer sidebar over modal when appropriate.
3. **Comparing information** with the page still visible (tickets, attributes, analytics).
4. **Workflow continuity**—frequently opening/closing panels over a list (records, assets, tickets).

### Modal — good fits

1. **Critical confirmations** (delete, discard, reset, irreversible submit).
2. **Short, simple tasks** (rule of thumb: **one–two fields** may fit a modal).
3. **Must-acknowledge information** (security, policy, permissions).

---

# Readability and content protection

**Main content column should**

- Target about **60–80** characters per line where possible.
- Not shrink below **~640px** on desktop for primary reading columns.
- Not exceed **~1280px** max width for long-form reading.

**Sidebar should**

- Support clear visual hierarchy.
- Avoid **more than two** levels of nesting.
- Avoid **dense paragraph** body copy (side regions are for navigation, controls, summaries—not long articles).

---

# Animation and interaction

- **Duration:** 200–300ms.
- **Easing:** ease-in-out or `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Overlay backdrop:** dim background roughly **4–8%** black opacity (tune with semantic overlay tokens in implementation).
- **Focus:** trap focus in overlays; **Esc** closes overlay drawers where applicable.

---

# Accessibility

**Overlays**

- Use `aria-modal="true"` where appropriate for modal-like overlays.
- Move **focus** into the panel on open; **restore focus** to the trigger on close.
- Preserve **keyboard** order and visible focus.

**Persistent regions**

- Use **landmark** roles (`nav`, `aside`) appropriately.
- **Collapsible** sections must be keyboard operable (expand/collapse, not hover-only).

---

# Icons and chrome

Use the **double caret** pattern for **collapsible persistent** panels, and **close** controls on overlays that are **dismissible by default**. **Collapse** should **push** layout, not behave like a transient overlay, when the pattern is a docked collapsible region.

---

# Fixed vs flexible widths

**Prefer fixed widths** when:

- The same pattern repeats across the app (e.g. search conditions).
- The workflow is **form-heavy**.
- Visual stability matters for scanning or comparison.

**Allow flexible / custom width** when:

- Content is **media-heavy** (previews, images).
- **Power users** need resizable panels (long metadata, multi-column data, large previews).
- Internal layouts need multiple columns inside the drawer (validate with design—uncommon in current Relativity flows).

---

# What not to do

- Arbitrary one-off sidebar widths without a system.
- Sidebars **wider than** the main content column for standard workflows.
- Layout shifts that **break** critical data tables or scan lines.
- **Nested drawers** inside drawers.
- **More than one** modal-level overlay active at once.

---

# Decision triggers

```yaml
decision_triggers:

  use_aside_if:
    - Filters, browsers, or search conditions should stay open beside Main.
    - Previews or persistent action regions belong on the side without covering Main.

  use_panel_push_if:
    - Supporting tools (e.g. aiR Assist) should share the viewport by pushing Main.
    - You accept reflow and the page is not table-dense or fixed-layout fragile.

  use_panel_overlay_if:
    - Main must stay visible but inactive (reference) while working in the panel.
    - You must avoid shrinking Main (e.g. wide tables).

  use_sidebar_flyout_skill_if:
    - Edge-anchored overlay drawer for contextual tasks; see sidebar-flyout skill.

  use_modal_if:
    - Confirmation or short bounded task with clear dismiss.
    - User must acknowledge or complete before returning to Main.

  avoid_push_panel_if:
    - Dense tables or fixed-width layouts that break on resize.
```

---

# Related components and skills

- `sidebar-flyout` — Sidebar [Flyout] overlay from an edge.
- `panel` — Panel / side region patterns in product layout.
- `confirm-dialog` — destructive or blocking confirmations.
- `drawer` — collapsible sidebar alongside content (when distinct from flyout overlay in your feature).

---

# Validation rules

1. **Overlay count** — At most one blocking overlay layer at a time for a given task flow.
2. **Focus** — Opening an overlay moves focus in; closing returns focus to a sensible trigger.
3. **Widths** — Stay within recommended bands unless design signs off on an exception.
4. **Tables** — Do not use push panels where column reflow would obscure primary data.
