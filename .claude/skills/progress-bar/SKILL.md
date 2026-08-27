---
name: progress-bar
description: "Use this skill when building or working with ProgressBar components. Trigger when the user mentions progress bar, loading bar, or percent complete. Always use this skill even if the user only loosely describes the component."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# ProgressBar

---

# Component Metadata

```yaml
component: ProgressBar
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-07
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: ProgressBar

category:
  - data
  - display

intent_tags:
  - progress_bar
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview


### Problem

Users need to see how far a long-running task has progressed—indexing, export, import, or upload—so they know whether to wait or can do something else. A progress bar shows a fill (percentage or indeterminate) and optional label (e.g., "45%" or "Step 2 of 5").

In RelativityOne, progress bars are used for indexing progress, export/import progress, file upload, batch job (tagging, coding), and any determinate or indeterminate operation in document review, workspace config, admin, or search.

### Purpose

Display progress of a task as a bar (fill from 0 to 100% or indeterminate animation); support label and optional cancel; indicate ongoing vs complete vs error.

### User Goal

Users interact with progress bars to:

- See how much is done (percent or step)
- Know the task is still running (indeterminate)
- Optionally cancel or dismiss when done
- See completion or error state

### Interaction Type

- Display information

### PrimeReact Component

Use the PrimeReact `ProgressBar` component to implement progress indicators.

### Related Components

- ProgressSpinner
- Skeleton
- Toast (completion message)
- Button (cancel)

---

# When to Use

Use a progress bar in the following scenarios:

1. **Determinate progress (known percent)**  
   Example: Export 45% complete; indexing 1200/5000 documents; upload 3 of 10 files.

2. **Multi-step progress**  
   Example: Step 2 of 5 (e.g., Import: Validate > Map > Run > Review); show step index and optional bar per step.

3. **Long-running operation**  
   Example: Batch tag, reindex workspace, or migration; user waits and needs feedback.

4. **When progress is measurable**  
   Example: Prefer bar over spinner when percent or steps are known; use spinner when truly indeterminate.

### Alternatives

| Situation | Use Instead |
|----------|-------------|
| Unknown duration | ProgressSpinner |
| Very short task (< 1s) | No indicator or brief spinner |
| Completion message only | Toast |
| Skeleton loading | Skeleton |
| Step-by-step user flow | Steps |

---

# When NOT to Use

_See substitutes in Storybook and Related Components._

---

# Decision Triggers

```yaml
decision_triggers:

  use_progress_bar_if:
    - Use a progress bar in the following scenarios:
    - 1. **Determinate progress (known percent)**
    - Example: Export 45% complete; indexing 1200/5000 documents; upload 3 of 10 files.
    - 2. **Multi-step progress**
    - Example: Step 2 of 5 (e.g., Import: Validate > Map > Run > Review); show step index and optional bar per step.
    - 3. **Long-running operation**

  do_not_use_progress_bar_if:
    - see When to Use section in this skill
```

---

# Additional Topics

# Component Variants

### Determinate (Percent)

**Purpose**

Bar fills 0–100%; show percentage or fraction (e.g., "45%" or "1200/5000").

**Typical Use Cases**

- Export, import, upload
- Indexing with known total
- Any task with measurable progress

### Indeterminate

**Purpose**

Animated bar or pulse; no specific percent (duration unknown).

**Typical Use Cases**

- Saving, submitting
- Loading data when size unknown
- "Please wait" without estimate

### With Label and Cancel

**Purpose**

Label above or inside bar (e.g., "Exporting... 45%"); optional Cancel button.

**Typical Use Cases**

- Long export/import with cancel
- Batch job with status text
- User may need to abort

---

# Component States

- Indeterminate (animated)
- Determinate (0–100%)
- Complete (100%; optional checkmark or success color)
- Error (optional; red or error state + message)
- Cancelled (optional)

### Special Behavior

- When task completes, optionally auto-dismiss bar and show Toast; or keep bar at 100% with "Complete" until user dismisses.
- Cancel: confirm if destructive (e.g., "Cancel export?"); then stop and update state.

---

# Behavioral Rules

1. When determinate, show value (percent or fraction) so users know progress; do not rely only on bar length.
2. When indeterminate, use animation (e.g., moving bar or pulse); avoid static bar that looks stuck.
3. On completion: show 100% briefly, then success message (Toast) or transition to result; on error: show error state and message.
4. Optional: persist or allow dismiss when task runs in background; do not block entire UI unless necessary.

---

# Layout and Placement

## Typical Placement

Progress bar appears inline in the view (e.g., above table, in panel), in modal (during operation), or in a dedicated "Jobs" or "Activity" panel. Full width of its container or fixed width.

## Common Patterns

- Bar with label above ("Exporting... 45%"); optional Cancel right
- Bar in modal during "Please wait" operation
- In list: one row per job with progress bar and status

## Layout Constraints

- Min height for bar so it is visible; adequate width (not too narrow).
- Label and value readable; do not truncate critical text.

## Spacing Rules

- Margin above/below; padding around label; alignment with content.

---

# Constraints

```yaml
constraints:

  skill_id: progress-bar
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: progress-bar
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact ProgressBar and this skill's sections
```

**Additional accessibility notes (from prior skill):**

### Required Attributes

- role="progressbar"; aria-valuenow (current value); aria-valuemin (0); aria-valuemax (100); aria-valuetext (e.g., "45 percent" or "Step 2 of 5").
- For indeterminate: aria-valuenow omitted or aria-valuetext="Loading" (no specific value).
- Region or bar has aria-label (e.g., "Export progress") so purpose is clear.
- Live region or aria-live so updates (percent, complete, error) are announced when they change.

### Keyboard Behavior

- Progress bar is not interactive (no Tab stop) unless it has Cancel button; Tab to Cancel if present.
- No keyboard control to "move" progress (it reflects server/task state).

### Screen Reader Behavior

- Progress and purpose announced (e.g., "Export progress, 45 percent"); updates announced (aria-live).
- Complete or error announced when state changes.
- Indeterminate: "Loading" or "Progress, indeterminate."

### Focus Behavior

- No focus on bar itself; focus on Cancel button if present; focus management when modal with progress opens (e.g., focus Cancel or first focusable).

### Common Accessibility Mistakes

- No aria-valuenow/aria-valuemax so screen reader does not get value.
- Indeterminate bar with aria-valuenow (misleading).
- Updates not announced (no aria-live or live region).
- No label (user does not know what is loading).

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
    - Toast
    - Modal
    - Message
    - ProgressSpinner
    - Skeleton
    - Steps

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - ProgressBar
```

---

# Validation Rules

```yaml
validation_rules:

  - id: progress-bar_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: progress-bar_storybook_api
    description: Implement ProgressBar using PrimeReact ProgressBar per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: progress-bar_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Anti-pattern 1
**Problem:** 1. Using progress bar when duration is unknown and no estimate (use ProgressSpinner).
**Severity:** Medium

## Anti-pattern 2
**Problem:** No visible value (percent or step) for determinate bar.
**Severity:** Medium

## Anti-pattern 3
**Problem:** Static bar with no animation for indeterminate (looks broken).
**Severity:** Medium

## Anti-pattern 4
**Problem:** Progress bar for user-driven steps (use Steps component).
**Severity:** Medium


---

# Component Decision Logic

### Scenario

Export running; backend reports 45% complete.

**Use ProgressBar:** Yes (determinate)

Alternative if not used:
- ProgressSpinner (if no percent available).

### Scenario

Saving form; duration unknown.

**Use ProgressBar:** Optional (indeterminate) or ProgressSpinner

Alternative:
- ProgressSpinner is common for "saving."

### Scenario

User completes steps 1, 2, 3 in a wizard.

**Use ProgressBar:** No (user flow)

Alternative:
- Steps component.

---

# Example Scenarios

## Scenario — Typical use
User intent: Complete a task that matches this component's purpose.
Recommended: ProgressBar (ProgressBar) per Storybook.
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

- Button (cancel)
- Toast (completion message)
- Modal (during operation)
- Message (error state)

### Commonly Confused With

- ProgressSpinner (indeterminate only; no bar)
- Skeleton (loading placeholder for content)
- Steps (user steps, not task progress)
