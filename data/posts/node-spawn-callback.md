---
title: "How to get callback when Node.js spawn execution is done"
date: 2021-01-24
---
The built-in `child_process` Node.js package has a `spawn` method that allows you to run a terminal command.

There's no built-in way of running a function when the command has finished executing, but `spawn` *does* give us access to a "done" event when the command finishes executing.

```jsx
const { spawn } = require('child_process')

const command = spawn('git clone https://github.com/benborgers/potion', {
  shell: true
})

command.on('close', () => {
  // Code to run when the command finishes
})
```

You could even wrap this into a nice, reusable function:

```jsx
const { spawn } = require('child_process')

// Reusable function:
const executeCommand = textToExecute => new Promise(resolve => {
  const command = spawn(textToExecute, { shell: true })
  command.on('close', () => resolve())
})

// Usage:
const main = async () => {
  await executeCommand('git clone https://github.com/benborgers/potion')

  // Do something here that will only happen after the command has finished.
}
main()
```