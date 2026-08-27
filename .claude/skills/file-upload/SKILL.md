---
name: file-upload
description: "Use when implementing FileUpload for file selection and upload. Trigger on: file upload, drag and drop files, attach files, choose file, or any input where users select files from their system to upload."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# FileUpload

---

# Component Metadata

```yaml
component: FileUpload
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: FileUpload

category:
  - form
  - input

intent_tags:
  - file_upload
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to select one or more files from their system — uploading documents, attaching evidence, importing data — with clear feedback on progress and the ability to cancel or remove files before uploading.

### Purpose

Advanced file uploader with drag-and-drop support, file selection, progress tracking, and file validation. Built on PrimeReact FileUpload. Supports basic (single button) and advanced (multi-file with progress) modes. The Relativity UI variant includes a custom item template with status tracking.

### Storybook Component

Use the `FileUpload` component (under Form Inputs & Controls). Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADform-inputs-controls-fileupload--docs`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `'basic'\|'advanced'` | `'advanced'` | Basic (single button) or advanced (multi-file with progress) |
| `useRUIItemTemplate` | `boolean` | `true` | Use Relativity UI default item template with status tracking |
| `chooseLabel` | `string` | `'Choose File'` | Label for the choose button |
| `emptyTemplate` | `ReactNode` | — | Content shown in the drop zone when no files are selected |
| `itemTemplate` | `function` | — | Custom render function for each file row |
| `files` | `File[]` | — | Controlled file list (for read-only display) |
| `readOnly` | `boolean` | — | Display selected files as plain text |
| `id` | `string` | — | ID for label association in read-only mode |
| `url` | `string` | — | Server URL for automatic upload |
| `name` | `string` | — | Request parameter name for file identification |

### Related Components

- Button (simple file trigger when FileUpload is too heavy)
- Spinner / ProgressBar (upload progress indicators)

---

# When to Use

1. **Document or data import** — Uploading documents, importing CSV/Excel, attaching evidence files.
2. **Multi-file upload** — Users select and review multiple files before uploading.
3. **Drag and drop** — Drop zone for file selection via drag.

---

# When NOT to Use

1. A simple single-file picker with no progress or drag-and-drop → a plain `<input type="file">` may suffice.
2. The file is immediately processed without user review → use basic mode or a custom trigger.

---

# Decision Triggers

```yaml
decision_triggers:

  use_file_upload_if:
    - Uploading documents, importing CSV/Excel, attaching evidence files.
    - Users select and review multiple files before uploading.
    - Drop zone for file selection via drag.

  do_not_use_file_upload_if:
    - 1. A simple single-file picker with no progress or drag-and-drop → a plain `<input type=\"file\">` may suffice.
    - 2. The file is immediately processed without user review → use basic mode or a custom trigger.
```

---

# Additional Topics

# Modes

- **Advanced (default):** Shows a file list, drag-and-drop area, Choose/Upload/Cancel buttons, and progress. Use `useRUIItemTemplate={true}` for Relativity UI status tracking.
- **Basic:** Single "Choose File" button only; no file list or drag-and-drop. Use for simple single-file inputs.

---

# Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers. Both are aligned.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Drop zone padding: `24px` on all sides
- File list item padding: `8px` vertical, `16px` horizontal
- Gap between file rows: `8px`

---

# Behavioral Rules

1. Use `useRUIItemTemplate={true}` (default) to get Relativity UI's file status tracking per item.
2. Provide `emptyTemplate` with helpful drop zone messaging ("Drag and drop files here to upload").
3. When `url` is provided, files upload automatically on selection. Without `url`, handle upload manually.
4. Validate file type and size server-side; show errors via Message or ValidationMessage.

---

# Constraints

```yaml
constraints:

  skill_id: file-upload
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: file-upload
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact FileUpload and this skill's sections
```

**Additional accessibility notes (from prior skill):**

- The choose button must have an accessible name
- File list items must show file name, size, and status in text (not icon only)
- Progress is communicated via `aria-live` or `role="status"`
- Remove/cancel buttons per file must have accessible names ("Remove [filename]")

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
    - Spinner / ProgressBar

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - FileUpload
```

---

# Validation Rules

```yaml
validation_rules:

  - id: file-upload_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: file-upload_storybook_api
    description: Implement FileUpload using PrimeReact FileUpload per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: file-upload_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Generic misuse
**Problem:** Using non-Relativity UI primitives or raw HTML instead of PrimeReact FileUpload from Storybook.
**Severity:** High


---

# Component Decision Logic

**Default:** Use FileUpload when the user task matches "When to Use" above; otherwise prefer substitutes from "When NOT to Use."


---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: FileUpload (FileUpload) per Storybook.
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

- Button (simple file trigger when FileUpload is too heavy)
- Spinner / ProgressBar (upload progress indicators)

---
