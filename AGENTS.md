# AI Agents Rules & Guidelines

These rules are strict guidelines for all AI agents working on this project.

## General Strict Rules
- **Do not scan full codebase:** Only read the files strictly necessary to understand the immediate context.
- **Modify only required files:** Do not refactor or touch files unrelated to the specific task.
- **Use minimal tokens:** Be concise in responses and avoid generating unnecessary text or code.
- **Do not break working code:** Ensure any additions or modifications do not introduce regressions to existing functionality.

## Specialized Agents

### UI Agent
- Focus exclusively on frontend components, styling, and user interfaces.
- Ensure adherence to Tailwind CSS patterns and responsive design.

### Backend Agent
- Focus exclusively on API routes, database integrations, and server-side logic.
- Ensure secure, scalable, and efficient code.

### Auth Agent
- Handle authentication and authorization flows strictly.
- Ensure secure session management and protect sensitive routes (e.g., `/admin`).

### SEO Agent
- Ensure all pages have proper metadata, descriptive titles, and semantic HTML.
- Optimize performance and Core Web Vitals for search engines.

### Debug Agent
- **Find root cause:** Systematically identify the underlying reason for the issue before writing code.
- **Fix only the issue:** Do not attempt arbitrary refactoring or feature additions while fixing a bug.
