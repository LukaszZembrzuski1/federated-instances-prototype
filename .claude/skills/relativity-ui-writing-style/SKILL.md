---
name: relativity-ui-writing-style
description: "Use when writing or revising Relativity UI copy: labels, helper text, tooltips, buttons, empty states, and general product voice. Trigger on: Style Guide, terminology, capitalization, punctuation, scannable content, Microsoft style, documentation voice, or editorial consistency. For notification taxonomy and error structure use ui-errors-and-notifications; for help URLs use help-topic-redirector-links."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Relativity UI writing style

Editorial and voice guidance for **client-facing UI text** in agentic and engineering workflows. Numeric design tokens remain in the harness token JSON; this skill covers **words**, **tone**, and **consistency** with Relativity documentation.

## Primary references

- [Style Guide](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14745605/Style+Guide)
- [User interface writing guides and standards](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14745755/User+interface+writing+guides+and+standards)

Subtopics linked from the Style Guide (voice, punctuation, procedures, scannable content, text formatting, etc.) are authoritative for details this file does not duplicate.

## Scope

This skill governs:

1. **UI text** — Labels, helper text, tooltips, placeholders, button labels, titles.
2. **Alignment with documentation** — Terminology and voice consistent with Relativity’s public and internal doc standards.
3. **Collaboration** — When to involve the documentation team.

It does **not** replace:

- **ui-errors-and-notifications** — notification types, PCS structure, layouts, remediation patterns.
- **help-topic-redirector-links** — redirector URLs and link maintenance.
- Visual or component implementation details (use component skills and tokens).

## Core principles

### Style Guide is source of truth

Treat the [Style Guide](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14745605/Style+Guide) as the **primary editorial authority** for customer-facing content. Assume a Microsoft-based style with Relativity-specific adjustments as described there.

Prioritize:

- Consistency across documentation and UI.
- Lower cognitive load; scannable, action-oriented language.

When other preferences conflict, **Style Guide and documentation team standards win**.

### Plain, respectful language

- Prefer plain language over technical jargon when the audience is not assumed to be engineers.
- Do not blame or shame the user.
- Keep UI strings concise; put depth in documentation via **redirector** links when appropriate.

### Notifications and errors

For **which** notification type to use, **PCS** structure, **layout**, and **buttons vs links**, follow **ui-errors-and-notifications**. This skill focuses on **wording** that complies with the Style Guide within those patterns.

### Links to documentation

Always follow **help-topic-redirector-links** — never propose hard-coded long help URLs in product UI.

## Escalation

When guidance is insufficient or new customer-facing content needs doc support:

- Contact **documentation@relativity.com**.
- Flag needs for **new or updated** help topics, especially for novel workflows or errors with no good existing article.

## Behavioral checklist for agents

1. Prefer **Style Guide** rules for capitalization, punctuation, and terminology.
2. Keep labels and tooltips **short** and **consistent** with adjacent UI.
3. For errors/warnings, align **wording** with **ui-errors-and-notifications** and **voice** with this skill.
4. For any suggested doc link, assume a **redirector** short URL and cite **help-topic-redirector-links**.

## Related skills

- **ui-errors-and-notifications** — errors, warnings, success, information, layouts, remediation.
- **help-topic-redirector-links** — UI → docs linking.
- Message components: **validation-message**, **message**, **toast**, **form-field**, **tooltip**, **link**.
