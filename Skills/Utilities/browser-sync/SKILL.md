---
name: Browser Sync
description: Use the browser to access a user-requested web application or page, read real content from the current browser session, and return grounded analysis of that content.
---

# Browser Sync

## Purpose
Use the browser to access a user-requested web application or page, read real content from the current browser session, and return grounded analysis of that content. This is an information retrieval skill that uses the user's existing authenticated browser sessions to extract and analyze information without fabricating data.

## When to Activate
- When the user uses the `sync` trigger (e.g., `sync Discord — analyze the latest discussion`).
- When the user asks to summarize, analyze, or extract information from a specific web application, website, or thread where they are already logged in.

## When NOT to Activate
- When the requested information requires backend database querying instead of browser scraping.
- When the user is explicitly asking to automate actions (e.g., "send a message", "post a tweet") – this skill is currently for reading/syncing data.

## Workflow
1. **Determine target** - Identify application/site, location (page/channel/thread/chat/document), requested scope, and requested analysis.
2. **Open/reuse browser** - Prefer an already-open browser session. If not open, navigate to it.
3. **Authentication** - Rely on the existing authenticated session. Never ask for credentials or simulate access. If authentication blocks access, return a failure stating authentication is required.
4. **Navigate** - Navigate to the location requested by the user.
5. **Read & Expand** - Read the actual content on the page. Scroll, expand threads, or load older/newer messages if necessary to fulfill the requested scope.
6. **Analyze** - Analyze the retrieved content. Do not invent content or summarize based on assumptions. The browser content is the single source of truth.

## Input Format
```yaml
task: 'sync <application/site> <instruction>'
```

## Output Format
```text
SYNC COMPLETE

SOURCE
<Application> → <location>

SUMMARY
<brief explanation>

IMPORTANT
- ...

DECISIONS
- ...

ACTION ITEMS
- ...

DEADLINES
- ...

OPEN QUESTIONS
- ...

WHAT YOU SHOULD KNOW
- ...

SOURCE STATUS
Fully analyzed / Partially analyzed

<If partial, explain exactly what could not be retrieved.>
```
*(Omit sections that have no content, do not force empty sections)*

## Grounding Requirements
- **NEVER FABRICATE**: Do not invent messages, users, dates, deadlines, decisions, links, conversations, or page contents.
- **SOURCE OF TRUTH**: The actual browser content is the source of truth.
- **PARTIAL CONTENT**: If only part of the requested content could be retrieved, explicitly state `Source Status: Partially analyzed` and explain why. Never claim to have analyzed the entire conversation if it wasn't possible.
- **DISTINGUISH FACT FROM INTERPRETATION**: Clearly distinguish what the source explicitly states vs. interpretations (e.g. "The conversation explicitly says..." vs. "This appears to mean...").

## Examples
- `sync Discord — go to the HackKP thread and summarize the conversation.`
- `sync this page — extract the important information.`
- `sync GitHub — inspect this issue and explain what is happening.`
