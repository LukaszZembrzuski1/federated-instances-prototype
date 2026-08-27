---
name: icons
description: "Use when implementing the Icons component or RelativityIcons (icon font). Trigger on: standard UI glyphs, arrows, close, edit, delete, status icons in messages, menu or toolbar icons, icon font, decorative vs semantic icons, or any icon name from the RelativityIcons set."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Icons (icon font)

---

# Component Metadata

```yaml
component: Icons
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Icons

category:
  - display
  - feedback

intent_tags:
  - icons
  - relativity_icons
  - icon_font
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview

### Problem

Applications need hundreds of consistent UI glyphs (navigation, actions, status) without one-off SVGs or third-party icon sets. Relativity UI exposes a single **icon font** surface with a typed name union (`RelativityIcons`) so implementations stay aligned with Storybook and product chrome.

### Purpose

Render a standard **icon-font** glyph by name. This is the default choice for arrows, close, edit, delete, settings, and other UI affordances that appear in buttons, menus, lists, and inline status patterns.

### Storybook Component

Use the **Icons** component (under **Images & Icons**). Engineering source of truth for props, variants, and the full name catalog:

`https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%96%BC%EF%B8%8Fimages-icons-icons--docs`

### Props (verify in Storybook)

Exact prop names follow the published API. Typical patterns include an icon **name** (or equivalent) typed as `RelativityIcons`, plus optional styling hooks.

| Prop | Type | Default | Description |
|---|---|---|---|
| Icon name | `RelativityIcons` | — | Which glyph to render — **authoritative list in Storybook** |
| Layout / style props | per Storybook | — | Spacing and color should use semantic tokens / component defaults |

**Authoritative icon list:** The hosted Storybook Icons page (link above). When **Storybook MCP** is available (local dev server with `@storybook/addon-mcp`), use documentation tools such as `get-documentation` / `list-all-documentation` against that story for the latest catalog and API text.

### Curated examples (not exhaustive)

These names appear across the system (e.g. `ValidationMessage` default `StatusError`). Prefer Storybook for any name not listed here: `StatusError`, `StatusWarning`, `StatusSuccess`, `StatusInfo` — and common UI actions such as close, edit, delete, settings, search, and chevrons as documented in Storybook.

### Related Components

- **ImageIcon** — branded or image-based assets (AI badges, folder art, etc.); see **image-icon** skill.
- **Button** — use Button’s icon API for **actions**; standalone glyphs use **Icons**; see **button** skill.
- **Avatar** — user photos or initials, not arbitrary icons.
- **Tooltip** — pair with **icon-only** controls so the accessible name is clear.

---

# When to Use

1. **Standard UI icons** — Arrows, close, overflow, edit, delete, filter, sort, search, and other chrome glyphs from the icon font.
2. **Inline with text or in lists** — Leading icons in menus, tree rows, or labels where the glyph is part of the design system set.
3. **Composable usage** — Inside higher-level components that accept `RelativityIcons` (e.g. custom rows, message variants) when Storybook specifies that type.
4. **Decorative repetition** — When the same glyph is used consistently across the app (always verify the name exists in Storybook).

---

# When NOT to Use

| Situation | Use Instead |
|---|---|
| Product / AI / folder **image** assets | **ImageIcon** (**image-icon** skill) |
| **Clickable** primary action with no visible label | **Button** (with `aria-label` and often **Tooltip**) |
| User profile picture or initials | **Avatar** |
| Raw SVG or non–Relativity UI icon fonts | Not supported — use **Icons** or **ImageIcon** per design system |

---

# Decision Triggers

```yaml
decision_triggers:

  use_icons_if:
    - Standard UI glyphs from the Relativity icon font (names typed as RelativityIcons).
    - Inline decoration or status glyphs documented on the Icons Storybook page.
    - Component APIs that expect RelativityIcons.

  do_not_use_icons_if:
    - Image-based assets (logos, AI marks, illustration-style icons) → ImageIcon.
    - Icon-only actionable control without adjacent text → Button + accessible name (+ Tooltip as needed).
    - User avatar → Avatar.
```

---

# Constraints

```yaml
constraints:

  skill_id: icons
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: icons
  keyboard_accessible: contextual
  focus_visible: when_focusable_parent
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Icons / Relativity UI Storybook and this skill's sections
```

**Additional accessibility notes:**

- **Decorative** icons next to visible text: mark the icon appropriately (e.g. `aria-hidden` when the text carries the meaning) so screen readers are not duplicated.
- **Informative** icons without text: provide an accessible name on the **interactive** parent (e.g. Button `aria-label`) or use **Tooltip** with a proper accessible association per the **tooltip** skill.
- Do not rely on color or icon shape alone for critical status — pair with text where required (see **validation-message**, **message**, **ui-errors-and-notifications**).

---

# Relationship Mapping

```yaml
relationships:

  companions:
    default:
      - Button
      - Tooltip
      - Menu

  substitutes:
    see_related_components:
    - ImageIcon
    - Avatar

  containers:
    - application_shell
    - toolbars
    - lists_and_menus

  variants:
    storybook:
      - Icons
```

---

# Validation Rules

```yaml
validation_rules:

  - id: icons_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex for layout surrounding icons
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: icons_storybook_api
    description: Implement Icons per Storybook — verify prop names, RelativityIcons values, and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: icons_accessibility_baseline
    description: Decorative vs informative handling; icon-only actions must have accessible names
    condition: missing_accessible_name_or_redundant_live_region
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse

**Problem:** Importing arbitrary icon libraries or inline SVGs instead of **Icons** / **ImageIcon** from Relativity UI.

**Severity:** High

## Orphan icon-only controls

**Problem:** Clickable icon with no `aria-label` (or equivalent) and no Tooltip.

**Severity:** Critical

---

# Component Decision Logic

**Default:** Use **Icons** when the glyph is a standard **RelativityIcons** / icon-font entry. Use **ImageIcon** when Storybook lists the mark under image assets. Use **Button** when the control’s primary role is an action.

---

# Example Scenarios

## Scenario — Typical use

User intent: Show a standard glyph next to a menu label.

Recommended: **Icons** with a name from Storybook; decorative pairing with visible text.

Notes: Confirm the name exists on the Icons docs page.

## Scenario — Not appropriate

User intent: Display the AI product badge illustration.

Recommended: **ImageIcon** per **image-icon** skill.

## Scenario — Storybook MCP

User intent: Confirm latest icon names or props after a relativity-ui upgrade.

Recommended: With local Storybook running and MCP enabled, use documentation tools against the Icons docs story; otherwise use the hosted Storybook URL above.

---

# Related Components

- **ImageIcon** (**image-icon** skill)
- **Button** (**button** skill)
- **Tooltip** (**tooltip** skill)
- **Avatar** (**avatar** skill)

---
