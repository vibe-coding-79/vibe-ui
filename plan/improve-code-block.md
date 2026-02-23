# CKEditor 5 Code Block Integration Guide for React

## Overview

This document provides a complete reference for integrating and configuring the `CodeBlock` plugin in CKEditor 5 with React. It covers installation, configuration, syntax highlighting on the frontend, and best practices.

---

## 1. Installation

Since CKEditor 5 v44.0.0, all open-source plugins are bundled in a single package. No separate code block package is needed.

```bash
npm install ckeditor5 @ckeditor/ckeditor5-react
```

---

## 2. Basic React Integration

```jsx
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  CodeBlock,
  Autoformat,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

function Editor({ initialData, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        licenseKey: 'GPL', // Required since v44.0.0. Use your commercial key if applicable.
        plugins: [Essentials, Paragraph, Bold, Italic, Heading, CodeBlock, Autoformat],
        toolbar: [
          'undo', 'redo', '|',
          'heading', '|',
          'bold', 'italic', '|',
          'codeBlock',
        ],
        codeBlock: {
          languages: [
            { language: 'plaintext', label: 'Plain text', class: '' },
            { language: 'javascript', label: 'JavaScript' },
            { language: 'typescript', label: 'TypeScript' },
            { language: 'python', label: 'Python' },
            { language: 'go', label: 'Go' },
            { language: 'html', label: 'HTML' },
            { language: 'css', label: 'CSS' },
            { language: 'sql', label: 'SQL' },
            { language: 'bash', label: 'Bash' },
            { language: 'json', label: 'JSON' },
          ],
          indentSequence: '  ', // 2 spaces; set to '\t' for tabs or false to disable
        },
        initialData: initialData || '<p>Start writing...</p>',
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        if (onChange) onChange(data);
      }}
    />
  );
}

export default Editor;
```

### Key Notes

- The `licenseKey` property is **required** since v44.0.0. Use `'GPL'` for open-source projects.
- The `Autoformat` plugin enables typing ` ``` ` (three backticks) at the start of a line to auto-create a code block.
- The first language in the `languages` array becomes the default.
- Each language generates a CSS class like `language-javascript` on the `<code>` element by default. Override with the optional `class` property.

---

## 3. HTML Output Format

CKEditor 5 CodeBlock produces standard semantic HTML:

```html
<pre><code class="language-javascript">const greeting = 'Hello, world!';
console.log(greeting);</code></pre>
```

This format is compatible with **Prism.js**, **highlight.js**, and other popular syntax highlighters that follow the `language-xxx` class convention.

---

## 4. Syntax Highlighting on the Frontend (Display Side)

CKEditor 5 does **not** perform live syntax highlighting inside the editor. Apply highlighting when rendering the saved HTML content on the frontend.

### Option A: Prism.js

```bash
npm install prismjs
```

```jsx
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Choose your theme

// Import language components you need:
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

function ContentDisplay({ htmlContent }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [htmlContent]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default ContentDisplay;
```

### Option B: highlight.js

```bash
npm install highlight.js
```

```jsx
import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // Choose your theme

function ContentDisplay({ htmlContent }) {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [htmlContent]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default ContentDisplay;
```

---

## 5. Configuration Reference

### `codeBlock.languages`

Array of objects defining available languages:

| Property   | Type   | Required | Description                                                        |
|------------|--------|----------|--------------------------------------------------------------------|
| `language` | string | Yes      | Language identifier (used in `class="language-xxx"`)               |
| `label`    | string | Yes      | Display label shown in the dropdown UI                             |
| `class`    | string | No       | Custom CSS class. Defaults to `language-{language}`. Set to `''` to remove. |

### `codeBlock.indentSequence`

| Value       | Behavior                         |
|-------------|----------------------------------|
| `'\t'`      | Tab character (default)          |
| `'  '`      | 2 spaces                         |
| `'    '`    | 4 spaces                         |
| `false`     | Disable indentation completely   |

---

## 6. Keyboard Shortcuts

| Shortcut                    | Action                                          |
|-----------------------------|------------------------------------------------|
| ` ``` ` + Enter             | Create a code block (requires Autoformat plugin)|
| `Tab`                       | Indent the current line                         |
| `Shift + Tab`               | Outdent the current line                        |
| `Enter`                     | New line (preserves current indentation)         |
| `Enter` × 3 (at block end) | Exit the code block                             |

---

## 7. Styling the Code Block Inside the Editor

To customize the appearance of code blocks within the CKEditor editing area, target the `.ck-editor__editable` scoped selectors:

```css
/* Custom styles for code blocks inside the editor */
.ck-editor__editable pre {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 8px;
  font-family: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
}

.ck-editor__editable pre code {
  background: none;
  padding: 0;
  font-size: inherit;
}
```

---

## 8. Saving and Rendering Workflow

```
┌──────────────┐     getData()      ┌──────────────────┐
│  CKEditor 5  │ ──────────────────▶│  Save HTML to DB │
│  (Editing)   │                    │  (e.g. PostgreSQL)│
└──────────────┘                    └────────┬─────────┘
                                             │
                                             │ Load HTML
                                             ▼
                                    ┌──────────────────┐
                                    │ React Frontend   │
                                    │ + Prism.js /     │
                                    │   highlight.js   │
                                    │ (Syntax Colored) │
                                    └──────────────────┘
```

### Steps

1. User writes content with code blocks in CKEditor 5.
2. Call `editor.getData()` to get the HTML string.
3. Store the HTML string in your database (e.g., PostgreSQL `TEXT` or `JSONB` column).
4. When displaying, render the HTML and apply Prism.js or highlight.js for syntax coloring.

---

## 9. Troubleshooting

### Code block button not appearing in toolbar

- Ensure `CodeBlock` is imported from `'ckeditor5'` and included in the `plugins` array.
- Ensure `'codeBlock'` (camelCase) is in the `toolbar` array.

### Language dropdown shows unexpected languages

- When you define `codeBlock.languages`, it **replaces** the default list entirely. Include all languages you want.

### Backtick autoformat not working

- Add the `Autoformat` plugin to the `plugins` array.

### Code block content is escaped/not rendering

- When rendering saved HTML, use `dangerouslySetInnerHTML={{ __html: content }}` in React.
- Make sure you sanitize the HTML on the server side (e.g., with `DOMPurify`) to prevent XSS.

### Indentation not working

- Verify `indentSequence` is not set to `false`.
- `Tab` key only works when the cursor is inside a code block.

---

## 10. Security: Sanitizing HTML Output

When rendering CKEditor HTML output with `dangerouslySetInnerHTML`, always sanitize to prevent XSS attacks:

```bash
npm install dompurify
```

```jsx
import DOMPurify from 'dompurify';

function SafeContentDisplay({ htmlContent }) {
  const clean = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'pre', 'code', 'br', 'blockquote', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt'],
  });

  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

This ensures `<pre><code class="language-xxx">` elements are preserved while stripping any malicious scripts.

---

## References

- [CKEditor 5 Code Blocks Documentation](https://ckeditor.com/docs/ckeditor5/latest/features/code-blocks.html)
- [CKEditor 5 React Installation Guide](https://ckeditor.com/docs/ckeditor5/latest/getting-started/installation/self-hosted/react/react-default-npm.html)
- [Prism.js](https://prismjs.com/)
- [highlight.js](https://highlightjs.org/)
