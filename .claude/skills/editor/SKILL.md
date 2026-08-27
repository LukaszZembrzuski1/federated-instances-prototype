---
name: editor
description: "Use when implementing the Editor component for rich text input. Trigger on: rich text editors, WYSIWYG inputs, formatted text entry, text with bold/italic/lists, or any input where users need more than plain text formatting."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Editor

---

# Component Metadata

```yaml
component: Editor
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Editor

category:
  - component
  - utility

intent_tags:
  - editor
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Some fields require more than plain text — users need to format content with bold, italic, lists, or headings. The Editor provides a rich text editing experience with a configurable toolbar, built on Quill.

### Purpose

Rich text editor with a formatting toolbar. Supports bold, italic, lists, headings, and other Quill formatting. Can be used in read-only mode to display formatted content.

### Storybook Component

Use the `Editor` component (under Form Inputs & Controls). Built on PrimeReact Editor (Quill). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-editor--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | HTML content of the editor |
| `placeholder` | `string` | — | Placeholder text when empty |
| `onTextChange` | `function` | — | Callback when content changes |
| `readOnly` | `boolean` | — | Makes the editor read-only |
| `showHeader` | `boolean` | — | Shows or hides the formatting toolbar |
| `headerTemplate` | `ReactNode` | — | Custom toolbar template |

### Related Components

- InputText (single-line plain text)
- InputTextarea (multi-line plain text without formatting)
- FormField (wrapper for label, validation, contextual help)

---

# When to Use

1. **Formatted text fields** — Notes, descriptions, comments, or any field where bold, italic, lists, or headings add value.
2. **Content creation** — When the output will be rendered as HTML (e.g., email templates, announcements, help text).
3. **Read-only formatted display** — Use `readOnly={true}` with `showHeader={false}` to display previously entered rich content without editing controls.

---

# When NOT to Use

1. Plain text input (no formatting needed) → use InputText or InputTextarea.
2. Very short single-line text (name, title, ID) → use InputText.
3. Code input → use a code editor component, not the rich text Editor.

---

# Decision Triggers

```yaml
decision_triggers:

  use_editor_if:
    - Notes, descriptions, comments, or any field where bold, italic, lists, or headings add value.
    - When the output will be rendered as HTML (e.g., email templates, announcements, help text).
    - Use `readOnly={true}` with `showHeader={false}` to display previously entered rich content without editing controls.

  do_not_use_editor_if:
    - 1. Plain text input (no formatting needed) → use InputText or InputTextarea.
    - 2. Very short single-line text (name, title, ID) → use InputText.
    - 3. Code input → use a code editor component, not the rich text Editor.
```

---

# Additional Topics

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Wrap in FormField for consistent label, required indicator, and validation message
- Editor height should be sufficient for the expected content (minimum `120px`; `200–300px` for longer content)

---

# Behavioral Rules

1. Use `showHeader={false}` when displaying content in read-only mode — the toolbar is unnecessary and visually misleading when editing is disabled.
2. Store and retrieve the editor's value as HTML — the `value` prop expects HTML string content.
3. Always provide a `placeholder` for empty state — it helps users understand what kind of content is expected.
4. Use `headerTemplate` only when the default Quill toolbar does not match the required formatting options.

---

# Constraints

```yaml
constraints:

  skill_id: editor
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: editor
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Editor and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- The editor's editable region must have an accessible name — wrap in FormField which handles label association
- Toolbar buttons must have accessible names (Quill provides these by default)
- Keyboard navigation within the editor follows standard contenteditable patterns
- In read-only mode, the content should be focusable so screen reader users can navigate it

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
    - InputText
    - InputTextarea
    - FormField

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Editor
```

---

# Validation Rules

```yaml
validation_rules:

  - id: editor_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: editor_storybook_api
    description: Implement Editor using PrimeReact Editor per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: editor_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact Editor from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use Editor when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: Editor (Editor) per Storybook.
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

- InputText (single-line plain text)
- InputTextarea (multi-line plain text without formatting)
- FormField (wrapper for label, validation, contextual help)

---
