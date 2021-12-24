import { useEffect } from "react";

export let meta = () => ({
  title: "Contact Ben Borgers",
});

export default function () {
  useEffect(() => {
    const el = document.createElement("script");
    el.src = "https://embed.reform.app/v1/embed.js";
    document.head.appendChild(el);

    el.onload = () => {
      Reform("init", {
        url: "https://forms.reform.app/ben/contact",
        target: "#reform",
        background: "transparent",
      });
    };
  }, []);

  return <div id="reform" />;
}
