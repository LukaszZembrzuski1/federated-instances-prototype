---
name: accordion
description: "Use when implementing Accordion components for expandable/collapsible sections. Trigger on: accordion, expandable panels, collapsible sections, FAQ layout, stacked sections where one or multiple can be open, or grouped content with toggle headers."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Accordion

---

# Component Metadata

```yaml
component: Accordion
version: "2.0"
status: active
owner: Design System Team
last_updated: 2026-04-19
design_system: Aero v3
storybook: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
primereact_component: Accordion

category:
  - containment
  - layout

intent_tags:
  - accordion
  - relativity_ui
  - aero_v3

platform_support:
  - web

accessibility_required: true
```

---

# Component Overview

### Problem

Users need to view grouped sections of content where not all sections need to be visible at once. An Accordion lets users expand and collapse individual sections, reducing visual clutter while keeping content accessible.

In RelativityOne, Accordions are used for settings groups, FAQ-style content, grouped metadata, filter categories, and any vertically stacked sections where showing everything at once would be overwhelming.

### Purpose

Display vertically stacked sections with clickable headers that expand and collapse content. Supports single or multiple open tabs, compact mode for nested contexts, custom headers with icons and status content, and a loading state.

### Storybook Component

Use the `Accordion` component with `AccordionTab` children (under Containment). Built on PrimeReact Accordion. For structured headers with title, description, and icon, use `AccordionHeader`. Storybook: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%A7%ADcontainment-accordion--docs`

### Sub-components

- `Accordion` — The container that manages expand/collapse state
- `AccordionTab` — Individual section with header and content
- `AccordionHeader` — Structured header with title, description, left icon, and right content

### Accordion Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `multiple` | `boolean` | `false` | Allow multiple tabs to be open simultaneously |
| `compact` | `boolean` | `false` | Reduces spacing for use inside padded containers |
| `loading` | `boolean` | `false` | Shows skeleton placeholders for all tab headers and content |
| `activeIndex` | `number\|number[]` | — | Controlled active tab index(es) |
| `onTabChange` | `function` | — | Callback when the active tab changes |

### AccordionTab Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `header` | `string\|ReactNode` | — | Tab header (string or custom component like `AccordionHeader`) |
| `headerTemplate` | `function` | — | Custom header template |
| `disabled` | `boolean` | `false` | Disables this tab |
| `loading` | `boolean` | — | Per-tab loading override (inherited from parent when parent `loading` is true) |

### AccordionHeader Props

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Header title text |
| `description` | `string` | Description text below the title |
| `iconLeft` | `ReactNode` | Icon on the left side of the header |
| `contentRight` | `ReactNode` | Custom content on the right side (e.g., status indicator) |

### Related Components

- Panel (single section with optional collapse — use for standalone containers)
- TabView (horizontal tabs for sibling sections — use when only 2–5 sections exist)
- TertiaryNavigation (side navigation — use for many navigable sections)

---

# When to Use

1. **Grouped settings or config** — Multiple sections of settings where only one or a few are relevant at a time.
2. **FAQ or help content** — Question/answer pairs where users scan headers and expand only relevant items.
3. **Metadata categories** — Document properties grouped by category (System, Custom, Audit).
4. **Filter categories** — Filter groups in a sidebar where each category collapses independently.

---

# When NOT to Use

1. Horizontal tab-style switching with 2–5 sections → use TabView.
2. Single collapsible section → use Panel with `toggleable`.
3. Sequential step flow → use Steps.
4. Navigable section list with many items → use TertiaryNavigation.

| Situation | Use Instead |
|---|---|
| 2–5 horizontal sections | TabView |
| Single collapsible container | Panel |
| Sequential workflow | Steps |
| Many navigable sections | TertiaryNavigation |

---

# Decision Triggers

```yaml
decision_triggers:

  use_accordion_if:
    - Multiple collapsible sections stacked vertically
    - Only one or a few sections need to be visible at a time
    - Settings or config grouped by category
    - FAQ-style expandable content
    - Metadata categories that can be collapsed

  do_not_use_accordion_if:
    - Horizontal tab-style switching → use TabView
    - Single collapsible section → use Panel with toggleable
    - Sequential ordered steps → use Steps
    - Many navigable sections with status → use TertiaryNavigation
```

---

# Storybook Variants

## Basic

Single-tab-open accordion with controlled state. The default pattern for most use cases.

```tsx
import { Accordion, AccordionTab } from 'relativity-ui'
import { useState } from 'react'

export function Example() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
      <AccordionTab header="Header I">
        <p style={{margin: 0}}>Content for the first tab.</p>
      </AccordionTab>
      <AccordionTab header="Header II">
        <p style={{margin: 0}}>Content for the second tab.</p>
      </AccordionTab>
      <AccordionTab header="Header III">
        <p style={{margin: 0}}>Content for the third tab.</p>
      </AccordionTab>
    </Accordion>
  )
}
```

## Multiple

Allow multiple tabs to be open simultaneously. Note that `activeIndex` is an **array** when `multiple` is true.

```tsx
import { Accordion, AccordionTab } from 'relativity-ui'
import { useState } from 'react'

export function Example() {
  const [activeIndex, setActiveIndex] = useState([0])
  return (
    <Accordion multiple activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
      <AccordionTab header="Header I">
        <p style={{margin: 0}}>Content for the first tab.</p>
      </AccordionTab>
      <AccordionTab header="Header II">
        <p style={{margin: 0}}>Content for the second tab.</p>
      </AccordionTab>
      <AccordionTab header="Header III">
        <p style={{margin: 0}}>Content for the third tab.</p>
      </AccordionTab>
    </Accordion>
  )
}
```

## Compact

Use `compact` to reduce spacing when the accordion is nested inside components that already provide their own padding (cards, panels, modals). This prevents double padding and creates a more appropriate visual hierarchy.

```tsx
import { Accordion, AccordionTab } from 'relativity-ui'
import { useState } from 'react'

export function Example() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Accordion compact activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
      <AccordionTab header="Header I">
        <p style={{margin: 0}}>Content for the first tab with compact spacing.</p>
      </AccordionTab>
      <AccordionTab header="Header II">
        <p style={{margin: 0}}>Content for the second tab with compact spacing.</p>
      </AccordionTab>
      <AccordionTab header="Header III">
        <p style={{margin: 0}}>Content for the third tab with compact spacing.</p>
      </AccordionTab>
    </Accordion>
  )
}
```

## Disabled Tab

Individual tabs can be disabled. The disabled tab cannot be toggled and has `aria-disabled="true"`.

```tsx
import { Accordion, AccordionTab } from 'relativity-ui'
import { useState } from 'react'

export function Example() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
      <AccordionTab header="Header I">
        <p style={{margin: 0}}>Content for the first tab.</p>
      </AccordionTab>
      <AccordionTab header="Header II" disabled>
        <p style={{margin: 0}}>This tab is disabled.</p>
      </AccordionTab>
      <AccordionTab header="Header III">
        <p style={{margin: 0}}>Content for the third tab.</p>
      </AccordionTab>
    </Accordion>
  )
}
```

## Custom Headers

Use `AccordionHeader` for structured headers with title, description, left icon, and right-side content (e.g., status indicators).

```tsx
import { Accordion, AccordionTab, AccordionHeader, Icon } from 'relativity-ui'
import { RelativityIcons } from '@/utils'
import { useState } from 'react'

export function Example() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
      <AccordionTab
        header={
          <AccordionHeader
            title="Header I"
            description="This is where description of your accordion item goes."
            iconLeft={<Icon name={RelativityIcons.FeaturesThingsUser} />}
            contentRight={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#434C5A' }}>
                <Icon name={RelativityIcons.FeaturesThingsTableSettings} />
                <p style={{ margin: 0, fontSize: '12px', lineHeight: '16px' }}>Status</p>
              </div>
            }
          />
        }
      >
        <p style={{margin: 0}}>Content for the first tab with custom header.</p>
      </AccordionTab>
      <AccordionTab
        header={
          <AccordionHeader
            title="Header II"
            description="This is where description of your accordion item goes."
            iconLeft={<Icon name={RelativityIcons.FeaturesThingsUser} />}
            contentRight={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#434C5A' }}>
                <Icon name={RelativityIcons.FeaturesThingsTableSettings} />
                <p style={{ margin: 0, fontSize: '12px', lineHeight: '16px' }}>Status</p>
              </div>
            }
          />
        }
      >
        <p style={{margin: 0}}>Content for the second tab with custom header.</p>
      </AccordionTab>
    </Accordion>
  )
}
```

## Compact with Custom Headers

Combine `compact` mode with `AccordionHeader` when the accordion is nested inside padded containers. This creates space-efficient, feature-rich accordions without excessive spacing.

```tsx
import { Accordion, AccordionTab, AccordionHeader, Icon } from 'relativity-ui'
import { RelativityIcons } from '@/utils'
import { useState } from 'react'

export function Example() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Accordion compact activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
      <AccordionTab
        header={
          <AccordionHeader
            title="Compact Header I"
            description="This is a compact accordion with custom headers."
            iconLeft={<Icon name={RelativityIcons.FeaturesThingsUser} />}
            contentRight={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#434C5A' }}>
                <Icon name={RelativityIcons.FeaturesThingsTableSettings} />
                <p style={{ margin: 0, fontSize: '12px', lineHeight: '16px' }}>Active</p>
              </div>
            }
          />
        }
      >
        <p style={{margin: 0}}>Content for the first tab with compact spacing and custom header.</p>
      </AccordionTab>
      <AccordionTab
        header={
          <AccordionHeader
            title="Compact Header II"
            description="Notice the reduced spacing in compact mode."
            iconLeft={<Icon name={RelativityIcons.FeaturesThingsUser} />}
            contentRight={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#434C5A' }}>
                <Icon name={RelativityIcons.FeaturesThingsTableSettings} />
                <p style={{ margin: 0, fontSize: '12px', lineHeight: '16px' }}>Pending</p>
              </div>
            }
          />
        }
      >
        <p style={{margin: 0}}>Content for the second tab with compact spacing and custom header.</p>
      </AccordionTab>
    </Accordion>
  )
}
```

## Loading

Set `loading` on the Accordion while data is loading. Every tab header and body renders as skeletons. The container also sets `aria-busy="true"` and each header renders a `ScreenReaderOnly` "Loading" label.

```tsx
import { Accordion, AccordionTab } from 'relativity-ui'
import { useState } from 'react'

export function Example() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Accordion loading activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
      <AccordionTab header="Header I">Content I</AccordionTab>
      <AccordionTab header="Header II">Content II</AccordionTab>
      <AccordionTab header="Header III">Content III</AccordionTab>
    </Accordion>
  )
}
```

## When to Use Compact

Use `compact={true}` **only** when the accordion is nested inside components that already provide padding (cards, panels, modals). Without compact mode, the accordion's own padding stacks with the container's padding, creating excessive spacing. This comparison shows regular vs compact inside a padded container:

```tsx
import { Accordion, AccordionTab } from 'relativity-ui'
import { useState } from 'react'

export function Example() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      {/* Regular — excessive spacing inside padded container */}
      <div style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Regular in padded container</h3>
        <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <AccordionTab header="Header I">
            <p style={{ margin: 0 }}>Content with regular spacing inside a padded container.</p>
          </AccordionTab>
          <AccordionTab header="Header II">
            <p style={{ margin: 0 }}>This creates too much visual separation.</p>
          </AccordionTab>
        </Accordion>
      </div>

      {/* Compact — correct spacing inside padded container */}
      <div style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Compact in padded container</h3>
        <Accordion compact activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <AccordionTab header="Header I">
            <p style={{ margin: 0 }}>Content with compact spacing inside a padded container.</p>
          </AccordionTab>
          <AccordionTab header="Header II">
            <p style={{ margin: 0 }}>This creates appropriate visual hierarchy.</p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  )
}
```

---

# Component States

- Default (expanded or collapsed based on `activeIndex`)
- Hover (header highlight)
- Focused (keyboard focus on header)
- Disabled (tab cannot be toggled)
- Loading (skeleton headers and content)

---

# Behavioral Rules

1. Use controlled mode (`activeIndex` + `onTabChange`) for predictable state management.
2. Use `multiple={true}` when users need to compare content across sections.
3. Use `compact` only inside padded containers — not for standalone Accordions.
4. Always provide meaningful header text — do not use empty or icon-only headers.

---

# Layout and Placement

Accordions are full-width within their container. Common placements: sidebars (filter groups), main content (settings), inside Panels or Cards (nested content).

## Spacing Rules

**Design system sources:** Aero v3 (Figma) is the source of truth for designers; Storybook is the reference for engineers.

All spacing must use Aero tokens: `4, 8, 12, 16, 24, 32, 40, 48, 96px`.

- Header padding: `12px` vertical, `16px` horizontal
- Content padding: `16px` on all sides
- Compact mode reduces content padding to `0` (relies on parent container padding)
- Margin between stacked Accordions: `16px`

---

# Constraints

```yaml
constraints:

  skill_id: accordion
  follow_aero_spacing_tokens: true
  prefer_semantic_colors: true
  storybook_is_engineering_source_of_truth: true
  figma_is_design_source_of_truth: true
```

---

# Accessibility Requirements

```yaml
accessibility_rules:
  component_skill: accordion
  keyboard_accessible: true
  focus_visible: required
  color_contrast_minimum: WCAG_AA
  storybook_a11y_notes: follow PrimeReact Accordion and this skill's sections
```

**Additional accessibility notes:**

- Each accordion header is a button with `aria-expanded` and `aria-controls`
- Content panels have `role="region"` with `aria-labelledby` pointing to the header
- Arrow keys navigate between headers; Enter/Space toggles
- Disabled tabs have `aria-disabled="true"` and are not focusable
- Loading state: `aria-busy="true"` on the Accordion container; header renders `ScreenReaderOnly` "Loading" text

**Common mistakes:**
- Missing keyboard navigation between tabs
- Content hidden visually but still in the tab order when collapsed
- No `aria-expanded` on toggle headers

---

# Relationship Mapping

```yaml
relationships:

  companions:
    default:
      - Panel
      - Card

  substitutes:
    see_related_components:
    - Panel
    - TabView
    - TertiaryNavigation

  containers:
    - application_shell
    - workspace_views

  variants:
    storybook:
      - Basic
      - Multiple
      - Compact
      - Disabled Tab
      - Custom Headers
      - Compact with Custom Headers
      - Loading
      - When to Use Compact
```

---

# Validation Rules

```yaml
validation_rules:

  - id: accordion_semantic_tokens_only
    description: Use Aero spacing and semantic color tokens from relativity-tokens.json — no arbitrary px/hex
    condition: styles_use_non_token_values
    severity: medium
    enforcement: design_review

  - id: accordion_storybook_api
    description: Implement Accordion using PrimeReact Accordion per Storybook — verify props and variants
    condition: implementation_diverges_from_storybook
    severity: high
    enforcement: blocking

  - id: accordion_accessibility_baseline
    description: Meet WCAG AA for focus, name, and role; follow Accessibility Requirements in this skill
    condition: missing_accessible_name_or_keyboard_support
    severity: critical
    enforcement: blocking
```

---

# Anti-Patterns

## Using compact mode outside of padded containers
**Problem:** Compact mode removes internal padding, which creates cramped content when the Accordion is not inside a container that provides its own padding.
**Severity:** Medium

## Nesting Accordions inside Accordions
**Problem:** Creates confusing interaction patterns and deeply nested expand/collapse behavior.
**Severity:** Medium

## Using Accordion for sequential steps
**Problem:** Accordion sections are non-linear; use Steps for ordered workflows.
**Severity:** Medium

---

# Component Decision Logic

**User sees grouped settings (General, Security, Notifications) in a config page:**
→ Accordion. Use `multiple={false}` if sections are independent.

**User sees a sidebar with filter categories:**
→ Accordion with `compact={true}` inside the sidebar Panel.

**User needs to switch between Details / Activity / Tags on a document:**
→ Not an Accordion. Use TabView (horizontal sections).

**User follows a wizard: Step 1 → Step 2 → Step 3:**
→ Not an Accordion. Use Steps (sequential flow).

---

# Example Scenarios

## Scenario — Settings groups
User intent: Configure workspace settings organized by category.
Recommended: Accordion with AccordionTab per category.
Notes: Use `multiple={false}` for focused editing; `multiple={true}` for comparison.

## Scenario — Nested inside a Card
User intent: View grouped metadata inside a Card component.
Recommended: Accordion with `compact={true}` to avoid double padding.
Notes: Always use compact mode when nesting inside padded containers.

## Scenario — Loading data
User intent: View accordion content that is still loading from the server.
Recommended: Accordion with `loading={true}` until data is ready.
Notes: Skeleton headers and content are shown automatically.

---
