---
name: skeleton
description: "Use this skill when building or working with Skeleton or loading placeholder components. Trigger when the user mentions skeleton, loading placeholder, or content shimmer. Always use this skill even if the user only loosely describes the component."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Skeleton

---

# Component Metadata

```yaml
component: Skeleton
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Skeleton

category:
  - data
  - display

intent_tags:
  - skeleton
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to see that content is loading while avoiding a blank area or only a spinner. A skeleton shows a placeholder that mimics the layout of the coming content (e.g., lines for text, blocks for cards) so the page feels stable and users understand what type of content to expect.

In RelativityOne, skeletons are used for document list loading (rows and cells), card grid loading (card-shaped placeholders), form loading (field placeholders), and any content block that has a predictable layout in document review, workspace config, admin, or search.

### Purpose

Display a loading placeholder that mirrors the structure of the content (text lines, shapes, cards) so layout is reserved and users see that content is loading; support animation (e.g., shimmer) for feedback.

### User Goal

Users interact with skeletons to:

- Perceive that content is loading (not broken)
- Anticipate layout (e.g., list vs cards)
- Avoid layout shift when real content appears (skeleton matches rough size)

### Interaction Type

- Display information (loading state)

### PrimeReact Component

Use the PrimeReact `Skeleton` component to implement loading placeholders.

### Related Components

- ProgressSpinner
- ProgressBar
- DataTable (skeleton rows)
- Card (skeleton card)

---

# When to Use

Use a skeleton in the following scenarios:

1. **List or table loading**  
   Example: Document list or DataTable: skeleton rows with cell blocks; user sees "list is loading" and approximate row count.

2. **Card or grid loading**  
   Example: Workspace cards, document cards; skeleton cards in grid so layout is stable.

3. **Detail or form loading**  
   Example: Document detail: skeleton for title, metadata lines, content block; form: skeleton for fields.

4. **When content structure is predictable**  
   Example: Any view where the final layout is known and a placeholder that matches reduces perceived wait and layout shift.

### Alternatives

| Situation | Use Instead |
|----------|-------------|
| Unknown layout | ProgressSpinner |
| Very short load (< 300ms) | Optional: no placeholder to avoid flash |
| Progress known | ProgressBar |
| Completion only | Toast |
| Simple "Loading..." | Text + ProgressSpinner |

---

# When NOT to Use

_See substitutes in Storybook and Related Components._

---

# Decision Triggers

```yaml
decision_triggers:

  use_skeleton_if:
    - Use a skeleton in the following scenarios:
    - 1. **List or table loading**
    - Example: Document list or DataTable: skeleton rows with cell blocks; user sees \"list is loading\" and approximate row count.
    - 2. **Card or grid loading**
    - Example: Workspace cards, document cards; skeleton cards in grid so layout is stable.
    - 3. **Detail or form loading**

  do_not_use_skeleton_if:
    - see When to Use section in this skill
```

---

# Additional Topics

# Component Variants

### Text Lines

**Purpose**

Horizontal bars of varying width to mimic text lines (title, body, caption).

**Typical Use Cases**

- Detail view loading
- Card text loading
- Paragraph placeholder

### Shape (Rectangle, Circle)

**Purpose**

Block or circle for image/avatar placeholder; rectangle for thumbnail or card.

**Typical Use Cases**

- Card image area
- Avatar placeholder
- Thumbnail in list

### Composite (Card, Row)

**Purpose**

Combination of shapes and lines to mimic card or table row.

**Typical Use Cases**

- Card skeleton (image + lines)
- Table row skeleton (cells as blocks)
- List item (avatar + lines)

---

# Component States

- Visible (animating or static)
- Replaced by content (skeleton removed)
- Replaced by error (optional; error message instead)

### Special Behavior

- When content loads, remove skeleton and render content; optional fade or no transition.
- When error, show Message or inline error; remove skeleton.

---

# Behavioral Rules

1. Skeleton should roughly match the size and shape of real content to minimize layout shift when content loads.
2. Use subtle animation (shimmer or pulse) to show it is loading; respect prefers-reduced-motion (static or reduced motion).
3. Do not use skeleton for very fast loads (e.g., < 300ms) if it would flash briefly; consider showing content directly or brief spinner.
4. Replace skeleton with real content (or error state) when load completes; do not leave skeleton visible indefinitely.

---

# Layout and Placement

## Typical Placement

Skeleton occupies the same space as the content that will load: table body, card grid, detail panel, or form area. One skeleton per card/row or one block for whole section.

## Common Patterns

- Table: 5–10 skeleton rows with cell blocks
- Cards: grid of skeleton cards (image block + 2–3 text lines)
- Detail: title line, 3–4 body lines, optional image block
- Form: field-height blocks for each input

## Layout Constraints

- Match container dimensions (e.g., table columns, card aspect ratio) so swap to real content does not shift layout.
- Avoid skeleton that is much larger or smaller than content (causes jump).

## Spacing Rules

- Match content spacing (gap between cards, row height, padding) so layout is consistent.

---

# Constraints

```yaml
constraints:

  skill_id: skeleton
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: skeleton
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Skeleton and this skill's sections
```

**Additional accessibility notes (from prior skill):**

### Required Attributes

- aria-hidden="true" on skeleton elements so screen readers do not read placeholder as content; or role="status" with aria-label="Loading" on container so purpose is clear.
- Ensure loading state is announced (e.g., aria-busy="true" on container, or live region "Loading documents" when skeleton is shown).
- When content replaces skeleton, ensure new content is announced (focus or live region) and aria-busy="false."

### Keyboard Behavior

- Skeleton is not focusable; no Tab stops on placeholder elements.
- Focus management: when content loads, optional move focus to first focusable in new content (e.g., first link in list) so keyboard users know load is complete.

### Screen Reader Behavior

- "Loading" or "Loading content" announced when skeleton appears (via aria-label, aria-busy, or live region); skeleton elements not read as content.
- When content loads, announce completion or let user discover new content (focus or live region "Content loaded").

### Focus Behavior

- No focus on skeleton; focus remains where it was or moves to loaded content when appropriate.

### Common Accessibility Mistakes

- Skeleton read as content (confusing); use aria-hidden or role="presentation."
- No indication of loading for screen reader (add aria-busy or status).
- Layout shift when replacing skeleton (size mismatch).
- Animation that cannot be turned off (prefers-reduced-motion).

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
    - DataTable
    - Card
    - ProgressSpinner
    - Message
    - ProgressSpinner
    - ProgressBar
    - Placeholder text

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Skeleton
```

---

# Validation Rules

```yaml
validation_rules:

  - id: skeleton_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: skeleton_storybook_api
    description: Implement Skeleton using PrimeReact Skeleton per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: skeleton_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using skeleton when layout is unknown (use spinner).
**Severity:** Medium

## Anti-pattern 2
**Problem:** Skeleton shape/size very different from content (causes layout shift).
**Severity:** Medium

## Anti-pattern 3
**Problem:** Leaving skeleton visible after error (show error state).
**Severity:** Medium

## Anti-pattern 4
**Problem:** Skeleton for very fast load (unnecessary flash).
**Severity:** Medium


---

# Component Decision Logic

### Scenario

Document list loading; 10 rows will appear.

**Use Skeleton:** Yes (skeleton rows)

Alternative if not used:
- ProgressSpinner in table body.

### Scenario

Saving form (1 second); no content structure.

**Use Skeleton:** No

Alternative:
- ProgressSpinner in button or inline.

### Scenario

Workspace cards loading in grid.

**Use Skeleton:** Yes (skeleton cards)

Alternative if not used:
- Spinner in center of grid.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Skeleton (Skeleton) per Storybook.
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

- DataTable (skeleton rows)
- Card (skeleton card)
- ProgressSpinner (optional combo: skeleton + spinner)
- Message (error when load fails)

### Commonly Confused With

- ProgressSpinner (no layout hint)
- ProgressBar (progress value)
- Placeholder text (input placeholder; skeleton is block placeholder)
