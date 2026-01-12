Streaming Markdown Parser
Overview

This project implements a streaming Markdown parser that processes Markdown text as it arrives in small chunks, similar to how large language models stream responses. The goal is to parse and render Markdown incrementally, without re-rendering the entire DOM.

The implementation focuses on inline code and code blocks, which are the most important requirements of the task.

What I Implemented
1. Streaming Parsing Logic

Markdown text is split into randomly sized tokens to simulate real-time streaming.

Tokens are processed character by character.

The parser immediately renders content as it arrives instead of waiting for the full input.

2. State-Based Markdown Parsing

A simple state machine is used to track the current parsing context:

TEXT – Normal markdown text

INLINE_CODE – Text wrapped in single backticks (`)

CODE_BLOCK – Text wrapped in triple backticks (```)

State transitions occur as soon as backticks are detected.

3. Inline Code Support

Single backticks start and end inline code.

Inline code is rendered optimistically as soon as the opening backtick appears.

Styled using a monospace font and background to visually distinguish it.

Example:

`print("hello world")`

4. Code Block Support

Triple backticks start and end code blocks.

Code blocks are rendered inside <pre> elements.

Supports cases where triple backticks are split across streamed tokens.

Example:

```js
console.log("Hello");


---

### 5. Optimistic Rendering
- Rendering begins immediately when an inline code block or code block starts.
- The parser does not wait for closing backticks before styling the content.
- This mimics real streaming behavior seen in chat-based interfaces.

---

### 6. Incremental DOM Updates
- New text nodes and elements are **appended** to the DOM.
- The entire container is never re-rendered.
- This allows users to **select and copy text** while streaming is still in progress.

---

## Technical Notes
- Implemented using **TypeScript**.
- No external libraries were used.
- Parsing logic is intentionally simple and focused on correctness rather than performance.
- Cross-platform build issues (Windows) were resolved to ensure proper compilation.

---

## How to Run

```bash
npm install
npm run build


Open the following file in a browser:

dist/index.html


Click the STREAM button to see the Markdown rendered progressively.
