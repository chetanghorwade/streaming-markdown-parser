"use strict";
let currentContainer = null;
let state = "TEXT";
let backtickBuffer = "";
let currentElement = null;
function runStream() {
    currentContainer = document.getElementById("markdownContainer");
    const tokens = [];
    let remainingMarkdown = blogpostMarkdown;
    while (remainingMarkdown.length > 0) {
        const tokenLength = Math.floor(Math.random() * 18) + 2;
        const token = remainingMarkdown.slice(0, tokenLength);
        tokens.push(token);
        remainingMarkdown = remainingMarkdown.slice(tokenLength);
    }
    const toCancel = setInterval(() => {
        const token = tokens.shift();
        if (token) {
            addToken(token);
        }
        else {
            clearInterval(toCancel);
        }
    }, 20);
}
function addToken(token) {
    if (!currentContainer)
        return;
    for (let i = 0; i < token.length; i++) {
        const char = token[i];
        /* ---- Backtick tracking ---- */
        if (char === "`") {
            backtickBuffer += "`";
        }
        else {
            backtickBuffer = "";
        }
        /* ---- CODE BLOCK (```) ---- */
        if (backtickBuffer === "```") {
            backtickBuffer = "";
            if (state === "CODE_BLOCK") {
                // End code block
                state = "TEXT";
                currentElement = null;
            }
            else {
                // Start code block
                state = "CODE_BLOCK";
                const pre = document.createElement("pre");
                pre.style.background = "#f5f5f5";
                pre.style.padding = "10px";
                pre.style.borderRadius = "6px";
                pre.style.whiteSpace = "pre-wrap";
                currentContainer.appendChild(pre);
                currentElement = pre;
            }
            continue;
        }
        /* ---- INLINE CODE (`) ---- */
        if (backtickBuffer === "`" && state !== "CODE_BLOCK") {
            backtickBuffer = "";
            if (state === "INLINE_CODE") {
                // End inline code
                state = "TEXT";
                currentElement = null;
            }
            else {
                // Start inline code
                state = "INLINE_CODE";
                const span = document.createElement("span");
                span.style.background = "#eee";
                span.style.fontFamily = "monospace";
                span.style.padding = "2px 4px";
                span.style.borderRadius = "4px";
                currentContainer.appendChild(span);
                currentElement = span;
            }
            continue;
        }
        /* ---- WAIT if unsure about backticks ---- */
        if (backtickBuffer.length > 0) {
            continue;
        }
        /* ---- NORMAL TEXT OUTPUT ---- */
        if (state === "TEXT") {
            const textNode = document.createTextNode(char);
            currentContainer.appendChild(textNode);
        }
        else if (currentElement) {
            currentElement.textContent += char;
        }
    }
}
//# sourceMappingURL=MarkdownParser.js.map