---
name: link
description: "Use when implementing the Link component for external navigation. Trigger on: external links, links opening in a new tab, inline text links, or any navigation to an external URL with proper security attributes."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Link

---

# Component Metadata

```yaml
component: Link
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Link

category:
  - component
  - utility

intent_tags:
  - link
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

External links need proper security attributes (`rel="noopener noreferrer"`) to prevent tab-napping and referrer leakage. They should consistently open in a new tab and communicate this to screen reader users. The Link component encapsulates these requirements so developers don't implement them inconsistently.

### Purpose

Render an external navigation link that opens in a new tab with `target="_blank"` and proper security attributes. For use with external URLs.

### Storybook Component

Use the `Link` component (under Navigation). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADnavigation-link--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | — | The URL the link points to |
| `children` | `string` | — | Link text |
| `target` | `string` | `'_blank'` | Link target (defaults to new tab) |

### Related Components

- Button (type Link — for low-emphasis in-app actions styled as links)
- TertiaryNavigation (for in-app section navigation)
- Breadcrumb (for in-app hierarchical navigation)

---

# When to Use

1. **External URLs** — Links to documentation, external systems, help articles, or any URL outside the application.
2. **Inline text links** — Links embedded within paragraph text (e.g., "For more information, visit our documentation").
3. **New tab navigation** — Any link that should open in a new tab.

---

# When NOT to Use

1. In-app navigation (same-origin routing) → use a router `<Link>` component or Button with onClick.
2. An action that triggers something (save, delete, submit) → use Button.
3. Low-emphasis tertiary action styled as a link → use Button with type Link.

---

# Decision Triggers

```yaml
decision_triggers:

  use_link_if:
    - Links to documentation, external systems, help articles, or any URL outside the application.
    - Links embedded within paragraph text (e.g., \"For more information, visit our documentation\").
    - Any link that should open in a new tab.

  do_not_use_link_if:
    - 1. In-app navigation (same-origin routing) → use a router `<Link>` component or Button with onClick.
    - 2. An action that triggers something (save, delete, submit) → use Button.
    - 3. Low-emphasis tertiary action styled as a link → use Button with type Link.
```

---

# Behavioral Rules

1. Link always opens in a new tab (`target="_blank"`) by default — do not change this for external URLs.
2. The component automatically includes `rel="noopener noreferrer"` for security — do not remove it.
3. For inline usage within text, the link text should be descriptive ("visit our documentation" not "click here").

---

# Constraints

```yaml
constraints:

  skill_id: link
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: link
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Link and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Link text must be descriptive and meaningful out of context — screen reader users often navigate by link list
- "(opens in new tab)" context is communicated visually or via a screen-reader-only text addendum
- Do not use generic link text like "click here" or "read more" — describe the destination
- Ensure sufficient colour contrast between link text and background (WCAG AA: 4.5:1 for normal text)

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
    - TertiaryNavigation
    - Breadcrumb

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Link
```

---

# Validation Rules

```yaml
validation_rules:

  - id: link_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: link_storybook_api
    description: Implement Link using PrimeReact Link per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: link_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Link from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Link when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Link (Link) per Storybook.
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

- Button (type Link — for low-emphasis in-app actions styled as links)
- TertiaryNavigation (for in-app section navigation)
- Breadcrumb (for in-app hierarchical navigation)

---
