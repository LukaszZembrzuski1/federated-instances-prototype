---
name: accessibility
description: "Use whenever building, editing, or reviewing any React + Relativity UI work in this repo — including .tsx components, pages, screens, modals, dialogs, drawers, forms, tables, layouts, navigation, or styling — so accessibility is applied by default rather than after the fact. Also triggers on explicit accessibility, a11y, WCAG, keyboard navigation, screen reader, focus, ARIA, role, contrast, semantic HTML, live region, form labeling, error message, and related review requests."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Relativity UI Accessibility

## Purpose

Use this skill to build and review React + Relativity UI implementations that meet WCAG 2.1/2.2 Level AA expectations.

This skill combines:
- WCAG-aligned review structure and severity-based reporting.
- Explicit keyboard, focus, and screen-reader behavior requirements.
- Relativity design token and component usage expectations.

## When To Use

Use this skill by default for:
- Any new interactive UI in this repo.
- Any change to existing UI behavior or markup.
- Any accessibility review request.
- Any component with overlays, custom keyboard interaction, or dynamic announcements.

## Baseline Rules

1. Treat WCAG 2.1/2.2 AA as the minimum target.
2. Prefer semantic HTML first; use ARIA only when native semantics are not enough.
3. Use Relativity semantic tokens for color and states instead of ad-hoc values.
4. Never ship mouse-only interactions.
5. Validate with keyboard and screen reader checks, not only static lint rules.

## Workflow

### 1) Identify Scope

Determine whether the task is:
- Build/update work (new code or behavior), or
- Accessibility review (existing UI audit).

Capture critical user flows first (primary task completion path, form submit path, modal/dialog path, table navigation path).

### 2) Apply Core Checks

Run the checklist in [references/wcag-checklist.md](references/wcag-checklist.md), then apply repo-specific checks in this skill.

### 3) Prioritize Findings

Use these severities:

- **Critical**: Blocks or seriously degrades core task completion for keyboard or assistive tech users.
  - Examples: inaccessible controls, focus loss, broken dialog focus trap, missing form labels, contrast below minimum, missing accessible name.
- **Warning**: Friction, confusion, or reduced efficiency without total blockage.
  - Examples: weak heading structure, unclear link text, redundant ARIA, missing skip link in repeated chrome.

### 4) Fix Or Generate Accessibly

For implementation tasks, proactively build with these rules instead of waiting for findings.
For review tasks, report issues with location, impact, and concrete fix guidance.

### 5) Verify Before Completion

Minimum verification:
- Keyboard-only pass over critical flow.
- Screen reader spot check for core interactions (VoiceOver or NVDA).
- Automated a11y check when available (axe/DevTools/Lighthouse/Puppeteer/Playwright) as regression support.

## Required Implementation Rules

### Keyboard and Focus

- All interactive elements must be reachable by `Tab`/`Shift+Tab` in logical order.
  - "Logical order" means focus follows the same sequence users need to complete the task, without unexpected jumps.
  - Focus order should match meaningful reading order and intended layout flow for the current locale (for example LTR vs RTL).
  - In practice, this usually means DOM order aligns with visual order, primary actions come after required inputs, and hidden/disabled items are not tabbable.
- Custom controls must support expected key bindings (for example Enter/Space activate).
- Composite widgets (tab views, menus, toolbars, trees, data tables, picklists, and multi-select controls) must follow APG keyboard patterns.
- Avoid positive `tabIndex`; use natural order, `0`, or `-1`.
  - Positive values (`1`, `2`, …) force focus ahead of DOM order, confusing keyboard and AT users.
  - `tabIndex={0}` places a non-native element into the tab sequence in DOM order; `tabIndex={-1}` removes it from tab sequence but keeps it programmatically focusable (used for dialog containers and roving focus inside composite widgets).
- Overlays and dialogs must:
  - Trap focus while open.
  - Close with `Escape` when appropriate.
  - Restore focus to the trigger when closed.
- Focus indicators must be visible and contrast-compliant in supported themes.
- Contrast minimums: `4.5:1` for normal text, `3:1` for large text (18pt+ or 14pt+ bold), `3:1` for interactive UI components and focus indicators. Use Relativity semantic tokens to meet these thresholds.
- Do not bind critical actions to hover-only behavior.
  - Example: showing a "Delete" or "Save" control only on mouse hover is not accessible.
  - Provide an always-available keyboard path (for example a visible button, menu item, or action reachable via `Tab` and activatable with Enter/Space).

### Screen Reader and Semantics

- Ensure valid Name/Role/Value for every control.
- Use explicit labels (`<label>`, `aria-label`, `aria-labelledby`) for inputs and icon-only controls.
- Use `aria-describedby` and `aria-errormessage` for helper/error association where relevant.
- Keep decorative icons out of the accessibility tree (`aria-hidden="true"`).
- Ensure visible label text is reflected in accessible name for speech input compatibility.
- Do not override native semantics with unnecessary ARIA.

### Dynamic Updates and Announcements

- Use assertive announcements only for urgent events:
  - `role="alert"` or assertive live region.
- Use polite announcements for non-urgent updates:
  - `role="status"` or `aria-live="polite"`.
- Keep announcements concise and avoid duplicate speech from multiple regions.
- For async operations, announce meaningful state changes (start, completion, failure) without spam.

### Forms and Validation

- Every field requires a programmatically associated label.
  - Prefer RUI wrappers (`FormField`, `*Field`) so label association is handled consistently (`htmlFor` / `id` wiring).
  - If not using `FormField`, provide `inputId` + visible `<label htmlFor={inputId}>…</label>`.
  - For grouped inputs, use `FormFieldset` (`fieldset` + `legend`).
  - If one visible label applies to multiple inputs (for example date ranges), use `aria-labelledby` or `fieldset` + `legend` (see `../calendar/SKILL.md`).
  - For deeper implementation rules, follow the component skills:
    - `../form-field/SKILL.md` (label + error wiring)
    - `../form-fieldset/SKILL.md` (group semantics + `aria-labelledby` patterns)
    - `../validation-message/SKILL.md` (`aria-invalid`, `aria-errormessage`, `errorMessageId`)
- Required fields: use `FormField` / `*Field` with `required` so RUI shows the standard `*` marker (Aero + Storybook pattern on `FormField` / `FormFieldset`) and semantics come from component defaults.
- At form scope, include one short line explaining `*` (for example: "Required fields are marked with an asterisk (*)."); do not rely on color-only styling.
- Field errors: use `FormField` / `FormFieldset` with `valid={false}`, `validationMessage`, and `errorMessageId` so `ValidationMessage` is programmatically linked (`aria-invalid`, `aria-errormessage`, message `id`) per `../validation-message/SKILL.md` and `../form-field/SKILL.md`.
- Error copy: be specific and tell the user what to do next (avoid generic text like "Invalid"); for narrative structure follow Problem/Cause/Solution in `../ui-errors-and-notifications/SKILL.md`.

### Structure, Navigation, and Content

- Use proper landmarks (`header`, `nav`, `main`, `aside`, `footer`) for page-level flows.
  - Map Relativity layout components to equivalent semantics: `WorkspaceSidebar`/`TertiaryNavigation` as navigation regions, and persistent side content as `aside`/`complementary` with an accessible name.
  - Treat overlays such as `Drawer`, `Sidepanel`, `SidebarFlyout`, `DialogModal`, and `ConfirmDialog` as dialogs (`role="dialog"` or `aria-modal="true"` when modal), not page landmarks.
  - Ensure each major region/panel has a programmatic label (`aria-labelledby` or `aria-label`) so screen reader users can identify where they are.
- Ensure each page/view has a descriptive title and correct language metadata (`<html lang>` and language changes marked where needed).
- Maintain a meaningful heading hierarchy.
  - Use headings for structure, not styling: each major navigable section should have a visible heading that matches its content.
  - **Ideal target:** one primary `h1` per page, then nest `h2` → `h3`; do not skip levels (for example `h1` → `h3`).
  - **Aero page template constraint:** the heading structure of the shared page template is inconsistent across implementations. In production, the workspace name currently uses `<h1>` and breadcrumbs use `<h2>`, consuming the top heading levels for shell chrome. In the Aero v3 design system, both elements use `$font-style-h3` (18/20) and no H1/H2 font style tokens exist. WCAG does not mandate one answer for the workspace name — using `<h1>` for the workspace (treating it as primary context) and using a non-heading banner element (reserving `<h1>` for the current page content) are both defensible patterns. The breadcrumb is more clearly mismatched: breadcrumbs are a navigation pattern and should be wrapped in `<nav aria-label="Breadcrumb">` with an `<ol>`/`<li>` list rather than marked up as a heading. `TabView` uses `$font-base` instead of a heading style, even though it acts as section-level navigation. These are system-level deviations outside team control; reviews should **not** fail team work for heading issues inherited from the page template.
  - **What teams can enforce now:**
    - Within `<main>`, maintain a sequential, non-skipping heading order starting from whatever level the page template establishes. If the chrome starts at h3, content headings should continue h3 (sections) → h4 (sub-sections) without gaps.
    - In overlays (`DialogModal`, `ConfirmDialog`, `Drawer`, etc.), teams fully control heading structure — use the heading level that matches nesting depth (often `h2`/`h3`) and avoid adding an unrelated second `h1`.
    - For new standalone products that do not inherit the Aero page template, apply the ideal hierarchy (h1 → h2 → h3, no skips).
  - **Long-term goal:** when the page template heading levels are corrected upstream (for example workspace name becomes a non-heading or an h1 with new visual styling), update content headings to match.
- Provide bypass for repetitive navigation when full-page chrome is present (skip link or equivalent).
- Do not rely only on color, shape, location, or sound to convey state or meaning.
  - Pair visual state with text and/or iconography (for example severity in messages should be communicated by icon + text, not color alone).
  - Keep critical status/error text in the DOM so assistive technologies can access it (not just a color change).

### Relativity-Specific Checks

- Prefer existing Relativity UI components and their accessibility behavior.
- For `TabView`, verify role mapping and arrow-key behavior.
  - Role mapping: `tablist` container, `tab` for each trigger, `tabpanel` for content, with correct `aria-selected`, `aria-controls`, and `aria-labelledby` wiring.
  - Keyboard behavior: Left/Right arrows move between tabs, Enter/Space activates selection, and `Tab` moves focus into panel content (focus must not trap in the tab list).
- For virtualized tables/trees/grids, ensure row/item count and position are conveyed where needed (`aria-setsize`, `aria-posinset`, or library equivalent).
  - Because only a subset of items is in the DOM, AT needs explicit size/position metadata to avoid misleading announcements (for example "1 of 1").
  - For virtual grids (for example `VirtualDataTable`), verify total and row/column position semantics (commonly `aria-rowcount` / `aria-rowindex`, or library equivalent).
  - For virtual lists/trees, verify `aria-setsize` / `aria-posinset` (or library equivalent) on visible items.
  - Avoid hand-rolled attributes unless they stay correct across filtering, sorting, pagination, grouping, and dynamic changes.
  - Practical verification: scroll/jump across offsets and confirm the accessibility tree reports sensible positions and totals; compare against Storybook behavior for `DataTable` / `VirtualDataTable` and `Tree` (see `../data-table/SKILL.md` and `../tree/SKILL.md`).
- For `Accordion`, ensure each toggle has `aria-expanded` and button semantics; content panels are linked via `aria-controls`.
- For toasts/messages, ensure timing allows users to read content (persist until dismissed or provide sufficient display duration); use polite live regions for informational toasts and assertive only for urgent errors.
- For tooltips, ensure info is not hover-only when it is required to complete a task.
  - If information is required to complete/submit/understand the task, keep it persistently visible (helper text, field hint, inline message, or label text) and use tooltip only as supplemental detail.
  - Tooltip must work on keyboard focus as well as hover; it should appear on focus and disappear on blur/escape per component behavior (no hover-only trigger).
  - Keep focus on the trigger (do not move focus into tooltip); link description via `aria-describedby` when shown and ensure the trigger has its own accessible name.
  - Do not use tooltip as the only accessible name for icon-only controls; provide explicit `aria-label`/visible label on the control.

### Motion and Interaction Safety

- Respect reduced-motion preferences for non-essential animations.
- Avoid flashing content beyond safe thresholds.
- Ensure drag interactions have non-drag alternatives for the same action.
  - Required equivalence: every drag/drop action must also be possible through explicit controls (for example Move up/down, Move to target, Add/Remove buttons, Choose file).
  - Keyboard path must be complete: user can perform the same outcome without a mouse and without timing-dependent gestures.
  - Provide clear state feedback during move operations (picked up, target position, dropped/cancelled) using visible UI cues and screen reader announcements.
  - Focus must stay predictable (visible, not lost after drop/cancel) and return to a meaningful element when interaction completes.
  - Do not rely on color alone for drag state or drop targets; include text/icon/shape cues.

## Review Output Format

When performing a review, report:

1. Total findings and severity split.
2. Findings ordered by severity, each including:
   - Problem
   - Location (`file_path` and relevant symbol or line context)
   - User impact
   - Recommended fix
3. Residual risks and test gaps.

## Pre-Ship Accessibility Gate

Do not mark work complete until all items pass:

- Landmarks and heading hierarchy are meaningful within team-controlled content; inherited page template heading deviations are documented, not blocking.
- All interactive controls are keyboard-operable with visible focus.
- Dialog/overlay focus trap and focus restore behavior work.
- Form labeling and error associations are programmatic and clear.
- Dynamic messages use correct live-region politeness.
- Contrast meets WCAG minimums for text and interactive UI.
- Screen reader announces critical workflow correctly.
- No critical accessibility findings remain.

## Additional Resource

For detailed WCAG checks, use [references/wcag-checklist.md](references/wcag-checklist.md).
