export default () => {
  return (
    <style global jsx>{`
      :root {
        --text-primary: hsl(0, 0%, 90%);
        --text-secondary: hsl(0, 0%, 75%);
        --text-tertiary: hsl(0, 0%, 50%);

        --background: hsl(0, 0%, 0%);
        --background-secondary: hsl(0, 0%, 10%);
        --background-tertiary: hsl(0, 0%, 22%);

        --selection: hsl(0, 0%, 70%);

        --underline: hsl(0, 0%, 30%);
        --border: hsl(0, 0%, 20%);
      }

      * {
        font-family: "Inter", sans-serif;
        color: var(--text-secondary);
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        background-color: var(--background);
      }

      ::selection {
        color: var(--text-primary);
        background-color: var(--selection);
      }

      a {
        font: inherit;
        color: inherit;
        text-decoration: underline;
        text-decoration-color: var(--underline);
        transition: opacity 0.2s;
      }

      @media (hover: hover) {
        a:hover {
          opacity: 0.7;
        }
      }

      a.no-underline {
        text-decoration: none;
      }
    `}</style>
  )
}