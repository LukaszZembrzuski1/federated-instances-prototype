# WCAG 2.1/2.2 AA Checklist (Prototype-Focused)

Use this checklist during implementation and review. Prioritize user-impacting issues first.

## 1. Perceivable

### 1.1 Text Alternatives

- [ ] Meaningful images have descriptive `alt` text.
- [ ] Decorative images/icons are hidden from assistive tech (`alt=""` or `aria-hidden="true"`).
- [ ] Icon-only buttons have an accessible name.
- [ ] Complex visuals (charts/diagrams) have equivalent text description.

### 1.2 Time-Based Media

- [ ] Videos include captions.
- [ ] Audio-only content has transcripts.
- [ ] Live media has captioning support where applicable.

### 1.3 Adaptable

- [ ] Semantic elements are used for structure and regions.
- [ ] Heading levels are logical and non-skipping within team-controlled content. See the heading hierarchy guidance in SKILL.md for inherited page template constraints.
- [ ] Form controls have programmatic labels.
- [ ] Reading order is meaningful without CSS.
- [ ] Instructions do not rely only on shape, color, location, or sound.

### 1.4 Distinguishable

- [ ] Text contrast is at least `4.5:1` (or `3:1` for large text).
- [ ] Interactive components and focus indicators meet `3:1`.
- [ ] Color is not the only state indicator.
- [ ] Content remains usable at 200% text resize.
- [ ] Reflow works at narrow viewport / high zoom without two-axis scrolling for main content.
- [ ] Hover/focus content is dismissible, hoverable, and persistent enough to use.

## 2. Operable

### 2.1 Keyboard Accessible

- [ ] All actions are keyboard-operable.
- [ ] No keyboard trap exists.
- [ ] Custom interactive elements support expected keys (Enter/Space and pattern-specific keys).
- [ ] Positive `tabIndex` values are avoided.

### 2.2 Enough Time

- [ ] Time limits are adjustable or avoidable when practical.
- [ ] Auto-updating/moving content can be paused, stopped, or hidden.
- [ ] Session timeout warnings are provided before data loss risk.

### 2.3 Seizures and Physical Reactions

- [ ] No content flashes more than 3 times per second.
- [ ] Non-essential motion can be reduced or disabled.

### 2.4 Navigable

- [ ] Repeated navigation can be bypassed (skip link or equivalent).
- [ ] Pages/views have descriptive titles.
- [ ] Focus order is logical and predictable.
- [ ] Link/button text is descriptive out of context.
- [ ] Focus indicator is always visible and perceivable.
- [ ] Overlays/dialogs close predictably and return focus to trigger.

### 2.5 Input Modalities

- [ ] Accessible name contains visible label text when labels are shown.
- [ ] Target size is at least `24x24` CSS px, or an applicable WCAG exception is met.
- [ ] Prefer `44x44` CSS px targets when feasible.
- [ ] Drag interactions have non-drag alternatives.
- [ ] Complex gestures have simpler alternatives.

## 3. Understandable

### 3.1 Readable

- [ ] Document/page language is declared (`lang`).
- [ ] Language changes in content are marked appropriately.

### 3.2 Predictable

- [ ] Focus or input changes do not trigger unexpected context changes.
- [ ] Navigation and repeated components are consistent across screens.
- [ ] Major context changes happen on explicit user action.

### 3.3 Input Assistance

- [ ] Errors are identified clearly and near relevant fields.
- [ ] Error guidance suggests how to fix issues.
- [ ] Required fields are indicated in both visual and programmatic ways.
- [ ] Critical actions support confirmation, reversal, or verification.
- [ ] Authentication does not require inaccessible cognitive tests.
- [ ] Redundant data entry is minimized unless required for security.

## 4. Robust

### 4.1 Compatible

- [ ] Custom components expose valid Name/Role/Value.
- [ ] ARIA is valid and not used to replace native semantics unnecessarily.
- [ ] Status updates use proper live regions (`status`/`alert` patterns).
- [ ] IDs referenced by ARIA attributes are unique and valid.
- [ ] Form controls are programmatically associated with labels and errors.

## React + Component Patterns

- [ ] JSX labels use `htmlFor` when labeling by ID.
- [ ] Buttons have explicit `type`.
- [ ] Non-button clickable elements are keyboard-accessible and semantically correct.
- [ ] Modals: trap focus, restore focus, close on `Escape`, accessible name present.
- [ ] Tabs: `tablist/tab/tabpanel` roles, selection states, arrow navigation.
- [ ] Accordions: `aria-expanded`, `aria-controls`, proper button semantics.
- [ ] Tooltips: not required for critical understanding unless keyboard/screen-reader reachable.
- [ ] Virtualized lists/grids expose count/position information where needed.

## Manual Verification (Required)

- [ ] Keyboard-only walkthrough for critical path passes.
- [ ] Screen reader spot-check passes for critical path (VoiceOver/NVDA).
- [ ] At least one automated accessibility scan has been run (axe/DevTools/Lighthouse) and major issues triaged.
