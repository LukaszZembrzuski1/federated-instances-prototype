---
name: avatar
description: "Use when implementing Avatar for representing a person or entity. Trigger on: user avatar, profile image, user icon, initials display, or any compact visual representation of a person."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Avatar

---

# Component Metadata

```yaml
component: Avatar
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Avatar

category:
  - data
  - display

intent_tags:
  - avatar
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Purpose

Represent a person or entity visually — with a text label (initials), an icon, or an image. Supports square and circle shapes in three sizes.

### Storybook Component

Use the `Avatar` component (under Images & Icons). Built on PrimeReact Avatar. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADimages-icons-avatar--docs`

### Props

| Prop | Type | Options | Description |
|---|---|---|---|
| `label` | `string` | — | Text to display (typically initials: "AB") |
| `shape` | `string` | `square`, `circle` | Shape of the avatar |
| `icon` | `string` | — | Icon name to display (when no image or label) |
| `image` | `string` | — | Image URL to display |
| `size` | `string` | `normal`, `large`, `xlarge` | Size of the avatar |

### Related Components

- ImageIcon (image-based product icons — not for people)
- IconTextItem (icon + title + subtitle — use for items in lists)

---

# When to Use

1. **User representation** — Show a user's initials, profile photo, or a generic person icon in lists, comments, cards, or assignment fields.
2. **Entity icon** — Represent a workspace, group, or system entity with a letter or icon.
3. **Avatar group** — Stack multiple avatars to represent a group of assignees or participants.

---

# When NOT to Use

1. Product or feature icons → use ImageIcon.
2. A full user profile card → use Card or IconTextItem.

---

# Decision Triggers

```yaml
decision_triggers:

  use_avatar_if:
    - Show a user's initials, profile photo, or a generic person icon in lists, comments, cards, or assignment fields.
    - Represent a workspace, group, or system entity with a letter or icon.
    - Stack multiple avatars to represent a group of assignees or participants.

  do_not_use_avatar_if:
    - 1. Product or feature icons → use ImageIcon.
    - 2. A full user profile card → use Card or IconTextItem.
```

---

# Additional Topics

# Display Priority

If multiple props are provided, the display priority is: `image` → `icon` → `label`. Provide `label` as a fallback for when an image fails to load.

---

# Shape and Size

- **Circle** — Use for people (conventional expectation for profile photos and initials).
- **Square** — Use for entities, workspaces, or systems where a circular shape would be misleading.
- **Sizes:** `normal` for inline use; `large` or `xlarge` for profile headers or prominent display.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Gap between avatar and associated name/label: `8px`
- Gap between stacked avatars in a group: `-4px` (overlap) or `4px` (spaced)

---

# Constraints

```yaml
constraints:

  skill_id: avatar
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: avatar
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Avatar and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- Provide `alt` text equivalent via `aria-label` on the avatar or a visible name nearby — initials alone may not be meaningful to screen readers
- If the avatar is purely decorative alongside a visible name, use `aria-hidden="true"`
- Image avatars: if the image fails to load, the `label` (initials) must still be a meaningful fallback

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
    - ImageIcon
    - IconTextItem

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Avatar
```

---

# Validation Rules

```yaml
validation_rules:

  - id: avatar_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: avatar_storybook_api
    description: Implement Avatar using PrimeReact Avatar per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: avatar_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Avatar from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Avatar when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Avatar (Avatar) per Storybook.
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

- ImageIcon (image-based product icons — not for people)
- IconTextItem (icon + title + subtitle — use for items in lists)

---
