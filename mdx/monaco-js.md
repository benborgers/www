---
title: How to use the Monaco editor with plain JavaScript
date: 2020-02-13
---

The Monaco code editor (which allows you to use VS Code's editor on your website) is super powerful, but also tricky to get working.

After a lot of experimenting, this is how I got the editor to work in a project using vanilla JavaScript with no framework:

```html
<script src="https://unpkg.com/monaco-editor@0.22.1/min/vs/loader.js" defer></script>
<script>
    window.addEventListener('DOMContentLoaded', () => {
        require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.22.1/min/vs' } });
        require(['vs/editor/editor.main'], () => {
            // Loads Monaco into the div below
            const editor = monaco.editor.create(document.querySelector('#editor'), {
                value: `// this is the initial content of the editor`,
                language: 'javascript',
                theme: 'vs-dark',
                fontSize: 14,
                // more settings here
            })

            // This is called when the editor's content changes
            editor.getModel().onDidChangeContent(() => {
                console.log(editor.getValue()) // Log the editor's value
            })
        })
    })
</script>

<div id="editor" style="height: 400px"></div>
```

_Note: this code uses Monaco version `0.22.1`, but there might be a newer version out by the time you're reading this (you can check [here](https://www.npmjs.com/package/monaco-editor)). If so, swap `0.22.1` in both spots to the version you want to use._

This code first loads Monaco's "loader" script, which will be responsible for loading the rest of Monaco's code. We wait for the page to fully load, and then tell Monaco to find its other files on [unpkg](https://unpkg.com).

After that, we load Monaco's editor into the div with ID `editor`, and `console.log` the editor's value whenever the user types in it.
