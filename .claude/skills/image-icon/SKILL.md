---
name: image-icon
description: "Use when implementing ImageIcon for displaying image-based icons. Trigger on: product icons, branded image icons, AI icons, folder icons, or any icon that comes from an image asset rather than the icon font."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# ImageIcon

---

# Component Metadata

```yaml
component: ImageIcon
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: ImageIcon

category:
  - data
  - display

intent_tags:
  - image_icon
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Some icons in the design system are image-based assets rather than icon-font glyphs — product logos, AI icons, branded imagery. These need consistent sizing, alt text, and a standard way to reference available assets. ImageIcon provides this.

### Purpose

Display an image-based icon by name from the available asset set. Distinct from icon-font icons (which use the **Icons** component — see **icons** skill). Use when the icon is a raster or SVG image asset, not a font glyph.

### Storybook Component

Use the `ImageIcon` component (under Images & Icons). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADimages-icons-imageicon--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name*` | `AssetName` | — | Name of the image icon to display |
| `alt` | `string` | — | Alt text for the image |

### Available icons

`AiIcon`, `AirBadgeReversed`, `AirBadge`, `BrainIcon`, `CollapseSidebar`, `Complete`, `Conversation`, `FingerPrint`, `Folder`, `Play`, `SaveSearch`, `Error`, `Warning`

### Aero v3 Illustrations (Figma only)

Aero v3 also includes a separate **Images** page with 50 larger illustration assets (160×160px). These are **not** code components — they exist only in Figma for use in empty states, onboarding screens, feature cards, and status pages. Categories:

- **Documents** (14) — Bullseye, Lightning, Settings, Search, Preview, etc.
- **Features & Things** (10) — Satellite, Key, Speedometer, Plug, Phone, Cogs, etc.
- **Data Transfer** (9) — Box Upload, Cloud Error/Success/Download/Upload, etc.
- **Third Party** (5) — Google GW Drive, Gmail, Chat, Calendar, Meet
- **Status & Info** (5) — Missing Layout, Page Error, Steps, Error, Success
- **Servers & Infrastructure** (4) — Cold Storage, Server Warning/Success, Server
- **Lists & Visualizations** (3) — Settings, Widget, List

When translating a Figma design that includes one of these illustrations, use a static `<img>` tag referencing the exported asset — there is no Relativity UI component wrapping them.

### Related Components

- **Icons** (icon-font for standard UI glyphs) — **icons** skill
- Avatar (for user avatars)
- Button (icon-only variant; see **button** skill)

---

# When to Use

1. **AI/product branding icons** — AiIcon, BrainIcon, AirBadge for aiR-related features.
2. **Status image icons** — Complete, Error, Warning as image-based status indicators.
3. **Feature icons** — Folder, SaveSearch, Play, Conversation for feature entry points.
4. When an icon is only available as an image asset, not as an icon-font glyph.

---

# When NOT to Use

1. Standard UI icons (arrows, close, edit, delete, etc.) → use the **Icons** component (**icons** skill).
2. User profile pictures → use Avatar.

---

# Decision Triggers

```yaml
decision_triggers:

  use_image_icon_if:
    - AiIcon, BrainIcon, AirBadge for aiR-related features.
    - Complete, Error, Warning as image-based status indicators.
    - Folder, SaveSearch, Play, Conversation for feature entry points.
    - 4. When an icon is only available as an image asset, not as an icon-font glyph.

  do_not_use_image_icon_if:
    - 1. Standard UI icons (arrows, close, edit, delete, etc.) → use Icons component — icons skill.
    - 2. User profile pictures → use Avatar.
```

---

# Constraints

```yaml
constraints:

  skill_id: image-icon
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: image-icon
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact ImageIcon and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Always provide meaningful `alt` text when the icon conveys information
- Use `alt=""` (empty) for purely decorative icons — this hides them from screen readers
- Do not rely solely on the icon to convey meaning — pair with visible text or a Tooltip when used in interactive contexts

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
    - Icons (icons skill)
    - Avatar
    - Button

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - ImageIcon
```

---

# Validation Rules

```yaml
validation_rules:

  - id: image-icon_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: image-icon_storybook_api
    description: Implement ImageIcon using PrimeReact ImageIcon per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: image-icon_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact ImageIcon from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use ImageIcon when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: ImageIcon (ImageIcon) per Storybook.
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

- **Icons** (icon-font) — **icons** skill
- Avatar (for user avatars)
- Button (icon-only variant; **button** skill)

---
