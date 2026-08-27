---
name: screen-reader-only
description: "Use when implementing ScreenReaderOnly for visually hidden but accessible announcements. Trigger on: loading state announcements, progress updates for screen readers, accessible context for dynamic content, or any text that should be heard by assistive technology but not seen visually."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# ScreenReaderOnly

---

# Component Metadata

```yaml
component: ScreenReaderOnly
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: ScreenReaderOnly

category:
  - component
  - utility

intent_tags:
  - screen_reader_only
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Dynamic UI changes — loading states, search results counts, progress updates — are visible to sighted users through visual changes, but screen reader users need explicit announcements. ScreenReaderOnly renders content that is invisible on screen but announced by assistive technology.

### Purpose

Render text or content that is visually hidden but accessible to screen readers. Optionally configure as a live region to announce dynamic changes automatically.

### Storybook Component

Use the `ScreenReaderOnly` component (under Feedback). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADfeedback-screenreaderonly--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children*` | `ReactNode` | — | Content visible only to screen readers |
| `isLive` | `boolean` | `false` | Makes the region a live region for dynamic announcements |
| `politeness` | `'polite'\|'assertive'` | `'polite'` | Politeness level for live region |

### Related Components

- Skeleton (visual loading placeholder — pair with ScreenReaderOnly for full accessibility)
- Spinner (visual loading indicator — pair with ScreenReaderOnly or use `aria-label`)
- Toast (visual notification — also announces to screen readers via `aria-live`)

---

# When to Use

1. **Loading announcements** — "Loading documents..." while a Skeleton or Spinner is visible. Sighted users see the visual indicator; screen reader users hear the announcement.
2. **Search result counts** — "5 results found" after a search completes.
3. **Progress milestones** — "Upload 50% complete" or "Step 2 of 4 complete" at key milestones.
4. **Supplemental context** — Additional context for icons or visual elements that have no visible text equivalent.

---

# When NOT to Use

1. Content that should also be visible to sighted users → do not hide it; render it normally.
2. Simple static accessible names on controls → use `aria-label` on the element instead.
3. Error messages → use ValidationMessage or Message, which have built-in ARIA.

---

# Decision Triggers

```yaml
decision_triggers:

  use_screen_reader_only_if:
    - \"Loading documents...\" while a Skeleton or Spinner is visible. Sighted users see the visual indicator; screen reader users hear the announcement.
    - \"5 results found\" after a search completes.
    - \"Upload 50% complete\" or \"Step 2 of 4 complete\" at key milestones.
    - Additional context for icons or visual elements that have no visible text equivalent.

  do_not_use_screen_reader_only_if:
    - 1. Content that should also be visible to sighted users → do not hide it; render it normally.
    - 2. Simple static accessible names on controls → use `aria-label` on the element instead.
    - 3. Error messages → use ValidationMessage or Message, which have built-in ARIA.
```

---

# Additional Topics

# Live Region Behaviour

Set `isLive={true}` when the content changes dynamically and screen readers should announce the update automatically:

- `politeness="polite"` (default) — announces after the user finishes their current interaction. Use for loading states, search results, progress updates.
- `politeness="assertive"` — interrupts the user's current reading immediately. Use sparingly — only for urgent, time-sensitive updates.

Without `isLive`, the content is read only when the user navigates to it — appropriate for supplemental context that doesn't need automatic announcement.

---

# Common Patterns

**Loading state with Skeleton:**
```jsx
<ScreenReaderOnly isLive politeness="polite">Loading user data...</ScreenReaderOnly>
<Skeleton /> {/* visible to sighted users */}
```

**Search results count:**
```jsx
<ScreenReaderOnly isLive>5 results found for "workspace"</ScreenReaderOnly>
```

**Upload progress milestones:**
```jsx
{progress === 50 && <ScreenReaderOnly isLive>Upload 50% complete</ScreenReaderOnly>}
```

---

# Accessibility Notes

- ScreenReaderOnly uses CSS to visually hide content (not `display: none` or `visibility: hidden`) — the content remains in the DOM and accessible to screen readers
- Avoid using this to hide content that would be confusing if discovered by screen reader users navigating the DOM
- Do not duplicate announcements — if a Toast already announces via `aria-live`, don't add a ScreenReaderOnly for the same message

---

# Constraints

```yaml
constraints:

  skill_id: screen-reader-only
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: screen-reader-only
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact ScreenReaderOnly and this skill's sections
```

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
    - Skeleton
    - Spinner
    - Toast

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - ScreenReaderOnly
```

---

# Validation Rules

```yaml
validation_rules:

  - id: screen-reader-only_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: screen-reader-only_storybook_api
    description: Implement ScreenReaderOnly using PrimeReact ScreenReaderOnly per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: screen-reader-only_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact ScreenReaderOnly from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use ScreenReaderOnly when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: ScreenReaderOnly (ScreenReaderOnly) per Storybook.
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

- Skeleton (visual loading placeholder — pair with ScreenReaderOnly for full accessibility)
- Spinner (visual loading indicator — pair with ScreenReaderOnly or use `aria-label`)
- Toast (visual notification — also announces to screen readers via `aria-live`)

---
