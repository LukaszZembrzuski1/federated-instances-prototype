---
name: design-system
description: Load global Relativity UI / Aero v3 design system rules, tokens, and conventions. Invoke at the start of any session involving component implementation, design-to-code work, or UI decisions. Sets the foundation that all individual component skills build on.

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Relativity UI — Global Design System Rules

Invoke this skill at the start of any UI implementation session. All component skills assume these rules are in effect.

**Repository copy:** This skill is maintained under `relativity-design-system-skills/skills/design-system/` in **design-system-harness**. After edits, run `node relativity-design-system-skills/scripts/generate-all-plugins.mjs` so Cursor and Claude Code plugin bundles stay in sync.

**Maintainer note (Phase 1):** The temporary **audit / delta list** vs tokens, `DESIGN.md`, and `relativity-ui` themes is not tracked in this repository copy. If Phase 1 audit notes are still needed, keep them in maintainer documentation outside the shipped skill and remove them once the skill rewrite is complete.

---

## Design System Sources

**Two layers — different alignment story:**

1. **Foundations (mostly aligned)** — **Colours**, **typography**, **spacing**, and **border radii** are intended to match across **Aero / Figma variables**, **`tokens/relativity-tokens.json`**, and **Storybook documentation** (what you see in Colours / Typography / Spacing docs). Treat accidental drift as a **bug** to fix in tokens or theme — see harness + `DESIGN.md` for known edge cases (e.g. layout-only spacing steps).

2. **Components (often divergent)** — The **catalog and organisation** differ: **Figma** includes **product / workspace patterns** (e.g. full workspace chrome, console, advanced conditions, multi-step flows) that are **not** all shipped as **Relativity UI** library components or screens. **Storybook** is the **live component library**: some pieces exist **only in code** first, or are **grouped differently** (e.g. **`*Field`** wrappers vs raw inputs in Figma). When a control exists in Storybook, **Storybook wins** for API, states, and behaviour. **Heights, hit targets, icon boxes, and fixed widths** are especially prone to **Figma ↔ Storybook drift** (variants, density, library lag) — for **implementation**, verify **rendered** size in **Storybook + DevTools** (or props / theme), not Figma alone.

**Designers:** use **Storybook as the primary source of truth for what ships** (components + rendered foundations). Use **Figma** for **grids, guidelines, layout intent, and exploration**; when Figma and Storybook disagree on **token values**, trust **Storybook + harness JSON** for product implementation.

**Same name, different thing — do not conflate:**

| Figma (Aero) | Relativity UI Storybook | Note |
|--------------|-------------------------|------|
| **Sidebar Workspace** | **Sidebar** (documented as **Sidebar [Flyout]** / overlay at screen edge) | **Not the same component.** Figma = persistent workspace rail; Storybook = flyout / overlay panel (Prime `Sidebar`). Workspace shell chrome is **Figma-first** (see harness `workspace-sidebar` skill); flyout behaviour is **Storybook**. |
| **Grid → Table** | **DataTable** / **VirtualDataTable** | Tabular grid in Figma maps to **DataTable** in code — use Storybook for props, columns, and states. |
| **Carousel (Leaderboard)** (Figma IA) | **Leaderboard** | **Leaderboard** exists in **both**; in Figma it lives under **Carousel (Leaderboard)**. Storybook uses the **`Leaderboard`** entry — same component family, different menu organisation. |

**In both tools (spelling / IA differs):** **Split Button** (Figma) ↔ **`SplitButton`** (code) — same idea; match the **Storybook** component name in implementation.

**Storybook-only today** *(as-of version [3.1.1] - 2026-04-30)* (no Aero parity page — still use Figma for foundations, Storybook for the control): **`ScreenReaderOnly`**, **`ColorPicker`** / **`ColorPickerInput`**, **`ResizableGroup`**.

**Other Storybook-first or differently organised examples** *(as-of version [3.1.1] - 2026-04-30)* (always confirm in Figma before assuming a frame exists): **Drawer**, **ModalInput** / **ModalInputField**, **VirtualDataTable** variants, **Note**, and **Form Inputs & Controls** (`*Field` + **`FormField`**).

**Maintenance note:** Treat these lists as **examples, not exhaustive truth**. Re-verify with current Storybook and Figma before making parity assumptions.

**Aero v3 (Figma)** — layout rules, grids, exploration. Foundation deep links — [Colors](https://www.figma.com/design/5ywwmcuCyslIvDL4eR3beH/Aero-Design-System-v3--IN-PROGRESS-?node-id=2554-1639&t=0tL1oWhzbQDvPi9O-0), [Typography](https://www.figma.com/design/5ywwmcuCyslIvDL4eR3beH/Aero-Design-System-v3--IN-PROGRESS-?node-id=3-12&p=f&t=0tL1oWhzbQDvPi9O-0), [Spacing](https://www.figma.com/design/5ywwmcuCyslIvDL4eR3beH/Aero-Design-System-v3--IN-PROGRESS-?node-id=3-9&p=f&t=0tL1oWhzbQDvPi9O-0).

**Relativity UI Storybook** — component API, props, variants, code examples, and foundation docs as implemented.
`https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html`

Documentation pages in Storybook:
- Colors: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%93%93documentation-colors--docs`
- Spacing: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%93%93documentation-spacing--docs`
- Typography: `https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%93%93documentation-typography--docs`

Questions or contributions: #help-aero-design-system

---

## Spacing

All padding, margin, and gap must use the **Aero / Relativity UI spacing scale** only — no arbitrary pixel values.

1. **Numeric contract** — [`tokens/relativity-tokens.json`](../../tokens/relativity-tokens.json) → **`spacing`** (`xxs` … `xxxl`; canonical values in `rem` — do not duplicate them here).
2. **CSS variables and usage** — Storybook **Spacing** doc (same URL as under [Design System Sources](#design-system-sources) → **Spacing**).
3. **Narrative and layout context** — [`design-md/relativityone/DESIGN.md`](../../design-md/relativityone/DESIGN.md) (density, forms, grid, touch-target spacing — align with Storybook + tokens).

**Adjacent interactive controls (spacing, not sizing):** Use at least **8px** **gap / margin / padding between** side-by-side clickable targets — not a property of the control’s own width or height. Maps to **`spacing.s`** / theme `--size-s` where documented; see `DESIGN.md` §4–§5.

---

## Colour — two-tier model

**Harness (contract):** [`tokens/relativity-tokens.json`](../../tokens/relativity-tokens.json) → **`color.palette.*`** (ramps: `gray10`, `blue50`, …) and **`color.semantic.*`** (roles: `background`, `textPrimary`, `interactive`, …). Semantics are **usually the same hex as a palette stop** — the semantic name is what you use in briefs and prompts; the palette name is the **primitive** you trace when auditing or matching Figma ramps.

**Relativity UI (implementation):** Theme SCSS maps those ideas to **`$color-*`** variables (see `relativity-ui` → `src/themes/relativity-ui/aero/_color.scss`) and publishes **`--color-*`** on `:root` (`aero/_css-variables.scss`). **Prefer `var(--color-…)` in product UI** — do not hardcode hex.

**Storybook:** [Colours](https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%93%93documentation-colors--docs) lists the full **`--color-*`** set and sample hex.

### Examples: semantic ↔ palette ↔ RUI ↔ CSS

| Harness `color.semantic.*` | Filled from `color.palette.*` (same hex) | Typical RUI SCSS source | Shipped CSS variable (example) |
|----------------------------|------------------------------------------|-------------------------|----------------------------------|
| `background` | `gray10` | `$color-gray-10` → `$color-background-primary` | `--color-background-primary` |
| `backgroundWhite` | `white` | `$color-white` → `$color-background-secondary` | `--color-background-secondary` |
| `textPrimary` | `gray80` | `$color-gray-80` → `$color-text-primary` | `--color-text-primary` |
| `interactive` | `blue50` | `$color-blue-50` → `$color-interactive` | `--color-interactive` |
| `interactiveHover` | `blue60` | `$color-blue-60` → `$color-interactive-hover` | `--color-interactive-hover` |
| `borderPrimary` | `gray50` | `$color-gray-50` → `$color-border-primary` | `--color-border-primary` |
| `borderSecondary` | `gray20` | `$color-gray-20` → `$color-border-secondary` | `--color-border-secondary` |
| `alert` | `red60` | `$color-red-60` → `$color-alert` | `--color-alert` |

So e.g. **`--color-background-primary`** in CSS is the **surface role** for the default canvas; in the theme it is wired from **`$color-background-primary`**, which resolves to **`$color-gray-10`** — the same **`#E8EDF4`** as **`color.palette.gray10`** and **`color.semantic.background`** in the harness JSON.

**Charts only:** `color.visualization.1`–`14` and `--color-visualization-*` — not part of the semantic UI roles above.

**Note:** A few **names** differ between harness narrative and a CSS variable (e.g. strong **keyboard** focus uses **`$color-black`** in mixins — same hex as **`color.semantic.interactiveFocus`** in JSON — while **`--color-interactive-focus`** in the theme may point at the blue ramp for other uses). When in doubt, **Storybook + shipped theme** win for implementation; update JSON/`DESIGN.md` when the contract changes.

---

## Typography

Font family: **Roboto** (`font.family` in `tokens/relativity-tokens.json`).

**Dual naming:** In **Aero v3 / Figma**, text styles are named like **H1 $font-style-h1**, **Base $font-style-base**, etc. In code, use **`font.styles.*`** from the JSON contract and, where available, **Relativity UI typography utilities** (`.rui-*`). The table ties all three together (see also `design-md/relativityone/DESIGN.md` §3).

| Aero / Figma (aligned name) | Harness token | RUI utility | Role |
|----------------------------|---------------|-------------|------|
| H1 ($font-style-h1) | `font.styles.h1` | `.rui-h1` | Primary page titles |
| H2 ($font-style-h2) | `font.styles.h2` | `.rui-h2` | Section titles |
| H2 bold (variant) | `font.styles.h2` + weight 700 | `.rui-h2-bold` | Same size as H2, bold |
| H3 ($font-style-h3) | `font.styles.h3` | `.rui-h3` | Subsections, panel header |
| H3 bold | `font.styles.h3Bold` | `.rui-h3-bold` | Cards, accordion headers |
| H4 ($font-style-h4) | `font.styles.h4` | — *(no `.rui-h4` preset)* | Grid, calendar, message headers — apply via component / SCSS typography mixins |
| H4 bold | `font.styles.h4Bold` | — | Nested navigation, strong subheaders |
| Base ($font-style-base) | `font.styles.base` | `.rui-body` | UI body, tables, inputs |
| Base bold | `font.styles.baseBold` | `.rui-body-bold` | Emphasis in body |
| Base italic | `font.styles.baseItalic` | `.rui-body-italic` | Italic body |
| Caption ($font-style-caption) | `font.styles.caption` | `.rui-caption` | Hints, metadata |
| Caption bold | `font.styles.captionBold` | `.rui-caption-bold` | Strong helper text |
| Caption italic | `font.styles.captionItalic` | `.rui-caption-italic` | Italic helper text |

Figma also ships **menu / list** body variants (e.g. different line height for menus); match those in implementation to the spec for that surface, not arbitrary one-off sizes.

**Quick reference — RUI classes:**

- Headings: `.rui-h1`, `.rui-h2`, `.rui-h2-bold`, `.rui-h3`, `.rui-h3-bold`
- Body: `.rui-body`, `.rui-body-bold`, `.rui-body-italic`
- Caption: `.rui-caption`, `.rui-caption-bold`, `.rui-caption-italic`

---

## Border Radius

**`3px` (`borderRadius.default`) is the default**, not the only radius. Pick the **`borderRadius.*`** key that matches the surface; full narrative and rules (including values **not** in the token scale) are in [`design-md/relativityone/DESIGN.md`](../../design-md/relativityone/DESIGN.md) (**Border radius**).

| Token key (`borderRadius.*`) | Value | Typical surfaces |
|------------------------------|-------|-------------------|
| `default` | 3px | Buttons, menu, inputs, cards, dialogs / modals (default chrome) |
| `checkbox`, `inner` | 2px | Checkbox; inset / nested corners (`inner` — follow Relativity UI theme usage) |
| `accordion`, `leaderboard`, `panel` | 5px | Accordion, leaderboard, panel |
| `progressBar` | 9px | Progress bar |
| `switch`, `chip`, `tag` | 12px | Switch, chip, tag |
| `toast` | 20px | Toast |

**Numeric contract:** [`tokens/relativity-tokens.json`](../../tokens/relativity-tokens.json) → **`borderRadius`**.

---

## Sizing standards

### Source of truth (strict order)

1. **[Relativity UI Storybook](https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html)** — **authoritative** for **every numeric size** on a component: open that component’s **Docs** page and the **story** you are matching; use the doc tables and, when in doubt, **computed styles** in the browser. **Shipped relativity-ui wins** over Figma, over this skill, and over prose in `DESIGN.md` when any of them disagree.
2. **The component skill** (e.g. `button`, `dialog-modal`) — use **only** where it embeds a **measurement table** or explicit px/rem; treat that table as a **Storybook-aligned summary** for convenience. **If the skill does not list dimensions, do not invent px** — go to Storybook (step 1).
3. **[`tokens/relativity-tokens.json`](../../tokens/relativity-tokens.json)** → **`components.*`** — small **cross-team contract** for a few shared primitives (e.g. input **`defaultHeight`**, **`defaultFixedWidth`**, textarea **`defaultFixedWidth`**). Still **re-check Storybook** for the version you ship.
4. **[`design-md/relativityone/DESIGN.md`](../../design-md/relativityone/DESIGN.md)** §4 — **intent** and patterns (density, icon context, touch spacing); not a substitute for step 1 for a specific control.

### Do component skills list sizes?

**No — not consistently.** Many skills describe **API, behaviour, and Storybook links** only.

| Coverage | Examples |
|----------|----------|
| **Includes explicit dimension tables** (heights, widths, padding) | **`button`** (size ladder, padding, icon button box), **`dialog-modal`** (modal widths, header/body/footer padding, gaps), **`form-fieldset`** (legend width), **`tertiary-navigation`** (default panel width prop) |
| **Layout / pattern widths** (panels, grid, asides) | **`twelve-column-grid-rules`**, **`forms-template-guidelines`**, **`asides-panels-modals-rules`** — column/region widths, not per-control heights |
| **Typically no default px height/width for the primitive** | **`input-text`**, **`dropdown`**, **`form-field`** — rely on **Storybook** + **`*Field`** defaults |

**Rule:** For any control, **Storybook first**; use a **component skill** as a shortcut **only** when it already documents the same numbers; otherwise **add nothing** and measure from Storybook.

### Shared implementation rules (non-numeric)

- Prefer **component defaults** (omit custom `width` / `height` / `style`) unless layout or spec requires otherwise.
- Use **`spacing.*`** / theme **`--size-*`** for **gaps and padding** between elements — see [Spacing](#spacing) and [Storybook Spacing](https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html?path=/docs/%F0%9F%93%93documentation-spacing--docs).
- **Adjacent interactive targets:** **≥ 8px** between clickable controls — spacing, not control box size — see [Spacing](#spacing).

**Narrative:** [`design-md/relativityone/DESIGN.md`](../../design-md/relativityone/DESIGN.md) §4 (buttons, form fields, iconography).

---

## Layout composition — nested containers *(provisional)*

**May move to a dedicated skill later** — this section only sets **shared expectations** until a fuller **layout-composition** (or similar) skill exists.

1. **Authority** — How a child **stretches**, **scrolls**, or **sizes** inside **Panel**, **TabView**, **Modal**, **ScrollPanel**, etc. is defined by **that parent’s Storybook docs + DOM/CSS**, not by this file. When in doubt, inspect the **parent component** story and computed layout.

2. **Inline size (width)** — Many RDS primitives are **block-level in the content column** and follow parent width constraints. **Exception:** `Message` uses a readability cap (**max `800px`** by default, with a larger cap at large viewport band **>=1600px**) rather than always stretching to the full container width.

3. **Flex / column shells** — For **header + body + footer** (or **toolbar + content**) views built with flex/grid: the region that must **scroll** usually needs an **explicit overflow** and a **bounded height** on an ancestor; in flex columns, a scrollable middle often needs **`min-height: 0`** (or equivalent) on the flex child so overflow can shrink — standard CSS flex behaviour; **confirm** against the **parent** component’s Storybook implementation.

4. **Scroll** — Prefer **one** obvious scroll surface per viewport region (avoid **nested** scroll areas unless the pattern calls for it — e.g. table inside a scrollable panel). **`panel`** skill notes **`overflow-y: auto` on the body** for long content; align nested **Message** / **DataTable** placement with that pattern.

5. **Readable line length (accessibility)** — Keep body text to **<= 80 characters per line** where possible. Use container width caps (like the `Message` cap above), column width choices, and responsive layouts to avoid long scanning lines.

6. **Related skills** — Region and overlay rules: **`asides-panels-modals-rules`**, **`twelve-column-grid-rules`**, **`forms-template-guidelines`**; per-component placement: **`message`**, **`panel`**, **`dialog-modal`**.

---

## Severity Naming — Critical Distinction

Severity naming differs by component. Do not mix these up:

**Button (destructive)** — **Figma Aero v3** uses the **Danger** type name. **relativity-ui** aligns on **`danger`**: use **`severity="danger"`** on **`Button`**, or typed **`ButtonDanger`** / **`ButtonIconDanger`** / **`ButtonDelete`**. **`severity="negative"`** and **`ButtonNegative`** / **`ButtonIconNegative`** are **deprecated aliases** (still accepted for compatibility) — **do not use in new code**; migrate when editing call sites.

Types (Button): Primary, Secondary, Tertiary, **Danger**, Link

Chip, Badge, Tag, Chips — use PrimeReact severity convention `'danger'`:
Values: `info`, `warning`, `danger`, `success`
Tag also supports: `secondary`, `contrast`

---

## Modal / Dialog Footer Button Order

In all modals and dialogs, the footer is right-aligned. Within the button group:
- Primary action → LEFT
- Secondary (Cancel) → RIGHT

**Destructive-action rule set**

**MUST**

- For destructive confirmations, place **Delete (Danger)** on the **LEFT** and **Cancel** on the **RIGHT**.

**ALLOWED EXCEPTIONS**

- If there is only one dismissive action (no destructive commit action), a single Close/Cancel action is acceptable.
- Existing product flows that are intentionally different may keep their order only when preserving established behaviour is required and documented.

**DO NOT**

- Do not place **Cancel** to the left of **Delete** in a destructive confirm pattern.
- Do not label destructive actions with vague copy like "Confirm" when a concrete verb (e.g. "Delete") is available.

**VALIDATION CHECK**

- In every destructive modal/dialog variant, verify footer order is **Delete (Danger) LEFT** and **Cancel RIGHT**.
- Verify destructive button copy uses an explicit action verb.

---

## Accessibility — WCAG AA Required

### Focus visibility (pointer vs keyboard)

Relativity UI distinguishes **pointer** vs **keyboard** focus (e.g. `data-focus-method` from `useInputModality` on inputs and select-like controls). Use **harness token names** (`tokens/relativity-tokens.json`); CSS variables follow the **Relativity UI** theme (e.g. `--color-interactive`).

**Valid (non-error) controls** — when the control uses the **interactive** border at rest (`color.semantic.interactive` / `#1460AA` → `--color-interactive`):

| Input modality | Treatment | Colours (tokens) |
|----------------|-----------|------------------|
| **Mouse / pointer** | **`2px` solid border** on the focused control | Border **`color.semantic.interactiveHover`** (`#0D4F8F`, same as `color.palette.blue60` → `--color-interactive-hover`) |
| **Keyboard** | **`outline: 3px solid`** on the focused control | **`color.palette.black`** (`#151820` — same hex as `color.semantic.interactiveFocus` in the harness file). This **black** keyboard ring applies **regardless of valid vs invalid** state for the strong focus treatment. |

**Invalid (`p-invalid`) + mouse:** **`2px` solid border** using **`color.semantic.alertHover`** (`#9B2828`, `color.palette.red70` → `--color-alert-hover`).

**Implementation reference:** `relativity-ui` → `src/themes/relativity-ui/aero/_mixin.scss` (`@mixin focused`, `@mixin rui-input-active`, `@mixin rui-input-invalid-focused`, `@mixin rui-input-common`, `@mixin rui-select-common`).

### Accessible names (including `*Field` wrappers)

**MUST**

- Every interactive control must expose a **non-empty accessible name** (what assistive technology announces as the control's name).
- Every **Field** wrapper component (`InputTextField`, `DropdownField`, `CalendarField`, `InputNumberField`, `InputSwitchField`, `InputTextareaField`, `MultiSelectField`, `CascadeSelectField`, and other `*Field` APIs) must expose a **non-empty accessible name** for its control.
- Preferred default: use a **visible label** supplied via **`FormField`** / field wrapper APIs.

**ALLOWED EXCEPTIONS**

1. **Search fields** — e.g. toolbar or header search: use `aria-label`, `aria-labelledby`, or an associated visible string.
2. **Section-labelled fields** — the visible label may sit on a **section** or group heading; wire **`aria-labelledby`** (or equivalent) so the control's accessible name is clear.
3. **Compact icon-only patterns** — where UI is intentionally minimal: provide a **non-empty** `aria-label` / `aria-labelledby` (and usually **`Tooltip`** for sighted users), consistent with icon-only control rules.

**DO NOT**

- Do not leave any interactive control unnamed.
- Do not rely on placeholder text as the sole accessible name.

**VALIDATION CHECK**

- Screen reader announces a meaningful, non-empty name for each interactive control.
- For each `*Field` wrapper, verify visible label wiring (or explicit ARIA naming in allowed exceptions).
- Use `RadioButtonGroup` / `FormFieldset` for grouped radio/checkbox controls, and `ReadOnlyField` for read-only display surfaces.
- Wrappers may handle required indicators, validation messages, and loading states, but naming must still pass the checks above.

---

### Contrast minimums (WCAG AA)

**MUST**

- Text contrast: **4.5:1** for normal text, **3:1** for large text.
- UI components, focus indicators, and meaningful graphics: **3:1**.

**ALLOWED EXCEPTIONS**

- None unless WCAG explicitly permits them for the specific content type and context.

**DO NOT**

- Do not rely on colour alone to communicate meaning; pair with text and/or iconography.

**VALIDATION CHECK**

- Verify body text, labels, and helper text meet **4.5:1** (or **3:1** for large text).
- Verify focus outlines, control boundaries, status icons, and meaningful graphics meet **3:1** against adjacent colours.

---

- **Accessible names (MUST):** see [Accessible names](#accessible-names-including-field-wrappers).
- **Contrast (MUST):** see [Contrast minimums](#contrast-minimums-wcag-aa).
- **Spacing between adjacent interactive targets (MUST):** minimum `8px` (see [Spacing](#spacing)).
- **Validation semantics (MUST):** set `aria-invalid="true"` + `aria-errormessage` on invalid inputs.
- **Keyboard support (MUST):** all interactive components must be operable via keyboard.
- **Do not rely on colour alone:** pair status/meaning with text or icon.

### Motion & animation (WCAG baseline)

Fine-grained motion specs are still evolving; until they are published, **all** motion — transitions, **loading states** (skeleton, spinner, progress), **attention-grabbing** effects, and decorative animation — must satisfy:

1. **Flashing / seizure risk (WCAG)** — Content **must not flash more than three times in any one-second period**, unless the flashing is **below the general flash and red flash thresholds** (see WCAG guidance on three flashes / threshold). Design and code reviews should treat rapid strobing, hard on/off pulses, and similar patterns as **non‑compliant** unless verified safe.
2. **Reduced motion** — Every motion pattern **must** have a **`prefers-reduced-motion: reduce`** strategy: **reduced** motion (shorter distance, opacity-only, slower non‑flashing cue) or **no** motion (static layout, text-only loading state), while **keeping the UI state understandable** (e.g. loading still discoverable without unsafe flashing).

---

## Component Decision Quick Reference

Toggle a single on/off setting → InputSwitch
Choose one from 2–5 options → RadioButton / RadioButtonGroup
Choose one from 5+ options → Dropdown
Select multiple from a short visible list (≤8 items) → Checkbox group
Select multiple from a long list → MultiSelect
Filter a long list while typing → Use AutoComplete only when free-typing against async suggestions is required; otherwise prefer Dropdown/MultiSelect
Enter multiple free-form values → Chips
Confirm a destructive action → ConfirmDialog or Modal with **Danger** button (`ButtonDelete`, **`ButtonDanger`**, or **`Button`** with **`severity="danger"`**)
Non-blocking transient feedback → Toast
Persistent block-level feedback → Message
Field-level validation error → ValidationMessage (via FormField)
Hierarchical data with expand/collapse → Tree
Flat tabular data → DataTable
Collapsible sections → Panel (toggleable) or Accordion
Sibling content sections → TabView
Sequential workflow → Steps
Collapsible sidebar alongside content → Drawer
Inline show/hide panel → SidePanel
Overlay from screen edge → Sidebar [Flyout]
