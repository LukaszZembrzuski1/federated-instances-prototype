---
name: tooltip
description: "Use this skill when building or working with Tooltip components. Trigger when the user mentions tooltips, hover hints, contextual help text, icon explanations, or truncated label expansion. Always use this skill even if the user only loosely describes the component."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Tooltip

---

# Component Metadata

```yaml
component: Tooltip
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Tooltip

category:
  - overlay
  - feedback

intent_tags:
  - tooltip
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users often encounter icons, abbreviations, or compact controls whose meaning is not obvious. A tooltip provides a short, contextual explanation on hover (or focus) without cluttering the interface or requiring a separate help page.

In RelativityOne, tooltips clarify icon actions in document review, workspace and admin configuration labels, search builder controls, and tagging UI so users can work efficiently without memorizing every icon or term.

### Purpose

Display a brief, contextual hint or description when the user hovers or focuses on a trigger element.

### User Goal

Users interact with tooltips to:

- Understand what an icon or control does
- See full text when a label is truncated
- Get quick definitions or guidance without leaving the page

### Interaction Type

- Display information

### PrimeReact Component

Use the PrimeReact `Tooltip` component to implement tooltips.

### Related Components

- Drawer (richer contextual content)
- Modal (blocking acknowledgment)
- Button

---

# When to Use

Use a tooltip in the following scenarios:

1. **Explaining icons or icon-only buttons**  
   Example: "Tag document," "Run search," "Export results," or "Refresh index" on toolbar or row actions in document review or search.

2. **Truncated text expansion**  
   Example: Long workspace name, field value, or column header in a table—show full value on hover.

3. **Compact controls in admin or config**  
   Example: Explaining a toggle, dropdown option, or setting in workspace or admin screens.

4. **Short contextual help**  
   Example: One-line explanation of a term or control (e.g., "Saved search available to your group") without opening a help panel.

---

# When NOT to Use

Do **not** use tooltips in the following scenarios:

1. For content that requires reading time, links, or multiple lines.
2. When the same information should always be visible (use inline label or caption).
3. For critical instructions or errors that the user must see (use Message or inline text).
4. When the trigger is not hoverable or focusable (e.g., touch-only with no focus equivalent).

### Alternatives

| Situation | Use Instead |
|----------|-------------|
| Rich content, links, or actions | Drawer or SidePanel |
| Persistent help or description | Inline text or Message |
| Must be visible by default | Label, caption, or placeholder |
| Multi-step or long guidance | Help panel, Modal, or documentation link |

---

# Decision Triggers

```yaml
decision_triggers:

  use_tooltip_if:
    - Use a tooltip in the following scenarios:
    - 1. **Explaining icons or icon-only buttons**
    - Example: \"Tag document,\" \"Run search,\" \"Export results,\" or \"Refresh index\" on toolbar or row actions in document review or search.
    - 2. **Truncated text expansion**
    - Example: Long workspace name, field value, or column header in a table—show full value on hover.
    - 3. **Compact controls in admin or config**

  do_not_use_tooltip_if:
    - Do **not** use tooltips in the following scenarios:
    - 1. For content that requires reading time, links, or multiple lines.
    - 2. When the same information should always be visible (use inline label or caption).
    - 3. For critical instructions or errors that the user must see (use Message or inline text).
    - 4. When the trigger is not hoverable or focusable (e.g., touch-only with no focus equivalent).
    - | Situation | Use Instead |
```

---

# Additional Topics

# Component Variants

### Default Tooltip

**Purpose**

Single-line hint on hover or focus.

**Typical Use Cases**

- Icon buttons in toolbars
- Truncated labels in tables or forms
- Abbreviations or jargon

### Delay / Instant

**Purpose**

Control when the tooltip appears (e.g., short delay to avoid flicker during mouse movement).

**Typical Use Cases**

- Dense UIs where cursor passes over many elements
- Touch devices where "hover" is simulated on focus

---

# Component States

- Hidden (no hover/focus)
- Visible (showing content)
- Delayed (waiting to show, if delay is used)

### Special Behavior

- On touch devices, tooltip may show on focus (e.g., after tap) and hide on blur or next tap.
- Long hover or focus may keep tooltip visible; ensure it does not block interaction.

---

# Behavioral Rules

1. Keep tooltip content to one short line when possible; avoid paragraphs.
2. Do not put interactive content (buttons, links) in a standard tooltip; use a Drawer or SidePanel if interaction is needed.
3. Ensure tooltip is available on keyboard focus, not only hover.
4. Position the tooltip so it does not cover the trigger or critical content.

---

# Layout and Placement

## Typical Placement

Tooltips appear adjacent to the trigger element (above, below, or to the side), usually with a small offset so they do not overlap the trigger.

## Common Patterns

- Above for triggers near the bottom of the viewport; below otherwise
- Consistent placement for similar controls (e.g., all icon buttons in a toolbar)

## Layout Constraints

- Must not be cut off by viewport or overflow hidden; adjust position if needed.
- Avoid covering other interactive elements the user may click next.

## Spacing Rules

- Small gap between trigger and tooltip.
- Padding inside tooltip for readability.

---

# Constraints

```yaml
constraints:

  skill_id: tooltip
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: tooltip
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Tooltip and this skill's sections
```

**Additional accessibility notes (from prior skill):**

### Required Attributes

- Accessible name or `aria-label` on the trigger if the trigger has no visible text.
- Tooltip content associated with trigger (e.g., `aria-describedby` when visible) so screen readers get the description.

### Keyboard Behavior

- Tooltip should appear when trigger receives focus and disappear when focus leaves, or follow product pattern for focus-based tooltips.
- No keyboard trap; user can Tab away from trigger.

### Screen Reader Behavior

- Trigger must have an accessible name (visible text or aria-label). Tooltip text can supplement via aria-describedby when shown, or be part of the trigger’s name if always equivalent.

### Focus Behavior

- Focus stays on trigger; tooltip is descriptive only.
- Do not move focus into the tooltip.

### Common Accessibility Mistakes

- Providing critical information only in a tooltip (hover/focus only), so keyboard or screen reader users miss it.
- Icon-only buttons with no accessible name and only a tooltip (tooltip should not be the only name; use aria-label on button).
- Tooltip that appears only on hover with no focus support.

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
    - DataTable
    - Form inputs
    - Drawer
    - SidePanel
    - ValidationMessage

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Tooltip
```

---

# Validation Rules

```yaml
validation_rules:

  - id: tooltip_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: tooltip_storybook_api
    description: Implement Tooltip using PrimeReact Tooltip per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: tooltip_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Putting long text or multiple sentences in a tooltip.
**Severity:** Medium

## Anti-pattern 2
**Problem:** Using tooltips for error messages or required instructions that must be seen.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Relying on tooltip as the only label for an icon button (pair with aria-label).
**Severity:** Medium

## Anti-pattern 4
**Problem:** Adding links or buttons inside a tooltip (use Drawer or SidePanel for interactive content).
**Severity:** Medium


---

# Component Decision Logic

### Scenario

User hovers over an icon in the document review toolbar.

**Use Tooltip:** Yes

Alternative if not used:
- Visible label next to icon, or aria-label only (no visual hint).

### Scenario

User needs to read a short help article or follow a multi-step tip.

**Use Tooltip:** No

Alternative:
- Link to help, SidePanel, or inline expandable section.

### Scenario

A table column header is truncated; user needs the full title.

**Use Tooltip:** Yes

Alternative:
- Full title in a column that can expand or wrap.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Tooltip (Tooltip) per Storybook.
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

- Button (icon buttons)
- DataTable (headers, cell content)
- Form inputs (field-level help)

### Commonly Confused With

- Drawer (interactive content, richer panels)
- SidePanel (richer content, stays open beside main view)
- ValidationMessage (persistent, for field-level errors)
