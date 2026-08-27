---
name: ui-errors-and-notifications
description: "Use when drafting or reviewing error messages, warnings, success and information notifications, banners, dialogs, and inline feedback copy. Trigger on: Problem Cause Solution, notification type, retry, dismiss, error taxonomy, layout for errors, Jira epic for errors, or improving vague errors. For doc URLs in UI always pair with help-topic-redirector-links. For Style Guide voice use relativity-ui-writing-style."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# UI errors and notifications

Structured guidance for **notification types**, **message structure**, **layout**, **controls**, and **remediation**—aligned with Relativity documentation standards.

## Primary references

- [Step-by-step guidelines for improving errors](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14745775/Step-by-step+guidelines+for+improving+errors)
- [Error messages guidance](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14746090/Error+messages+guidance)
- [User interface messages guidance](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14745747/User+interface+messages+guidance)

## Documentation links inside messages

Any link from the UI to documentation or other sites must use **Help Topic Redirector** short URLs — see skill **help-topic-redirector-links**. Do not paste long help URLs into error copy implementations.

## 1. Choose the notification type

Use the **minimal severity** that fits the situation.

| Type | When to use |
| --- | --- |
| **Error** | The user’s task cannot complete or an expected action failed; remediation or a next step is required. |
| **Warning** | Helps prevent future problems or highlights possible unintended consequences; the action might still complete but risk exists. |
| **Success** | Action completed successfully and explicit confirmation benefits the user. |
| **Information** | Neutral, helpful information tied to an action; default when no specific error/warning/success context applies. |

Avoid labeling something **Error** when **Warning** or **Information** is more accurate.

## 2. Structure: Problem, Cause, Solution

For **errors** (and serious warnings when applicable):

1. **Problem** — What went wrong? Plain language; do not blame the user.
2. **Cause** — Why it happened, when known and useful. No stack traces or opaque jargon for end users.
3. **Solution** — What they can do now: resolve, retry, or who to contact.

Aim to reduce unnecessary Support contacts by enabling self-service when feasible.

## 3. Match error type to remediation

### Expected errors (working as designed / input / workflow)

Cause includes permissions, invalid inputs, workflow rules, or system constraints.

- Prefer a short **title** (optional but recommended).
- Clear problem and cause in user-friendly language.
- **Specific** remediation steps.
- Link to documentation via **redirector** when helpful.
- If new documentation is required, contact **documentation@relativity.com**.

### Unexpected, recoverable

Transient conditions (e.g. service temporarily unavailable).

- Offer **Retry** (or equivalent) and state if the system will **auto-retry**.

### Unexpected, unrecoverable

Cannot be fixed by a simple retry.

- Enough detail for an admin or Support to understand what failed.
- Link to diagnostic or fix documentation via **redirector** when possible.

### Warnings to reduce incidents

Explain the **potential consequence** and how to avoid it.

## 4. Layout styles

Pick a layout that fits the content. **Do not** split Problem, Cause, and Solution into separate bullets; keep that narrative coherent.

| Layout | Use when |
| --- | --- |
| **Default** | Informational; no immediate action. |
| **Simple text** | One block; may include buttons and links. |
| **Text + title** | Short title (about **≤ 8 words**) plus body. |
| **Bulleted list** | Several **related** items (e.g. multiple possible causes). Bullets should be parallel and scannable. |
| **Title + bullets** | Title plus a list of related details or options. |

## 5. Close button, buttons, links

- **Close** — Only when the notification **should be dismissible**. Omit when the message must stay until resolved.
- **Button** — Primary actions **on the current page** (e.g. Retry, Save again, Reload). Primary remediation is usually a button.
- **Link** — Secondary actions or “learn more” / documentation. **Button + link** together is acceptable (e.g. Retry + Learn more).

Links to docs: **redirector URL**; link text should not look like the primary resolution path.

## 6. Error audits and team process

When improving errors at scale:

- Inventory errors with the team; note frequency and support/incident impact.
- Prioritize high-frequency and high-impact messages.
- Track work with a **Jira epic** and stories per error or group (per internal guidance).

## Related skills

- **help-topic-redirector-links** — all in-product doc/external links.
- **relativity-ui-writing-style** — Relativity Style Guide and voice.
- Components: **validation-message**, **message**, **toast**, **confirm-dialog**, **dialog-modal**.
