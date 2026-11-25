const setupNewsletterDialog = () => {
  const dialog = document.querySelector<HTMLDialogElement>(
    "#newsletter-dialog"
  );
  // Not a .newsletter-trigger class: the Fanboy annoyance list (used by
  // uBlock Origin, Brave, AdGuard, and Safari blockers) hides that selector.
  const trigger = document.querySelector<HTMLButtonElement>(
    "[data-signup-trigger]"
  );
  const form = dialog?.querySelector<HTMLFormElement>(".newsletter-form");
  const frame = dialog?.querySelector<HTMLIFrameElement>(
    ".newsletter-response"
  );
  const formState = dialog?.querySelector<HTMLElement>(
    ".newsletter-form-state"
  );
  const confirmed = dialog?.querySelector<HTMLElement>(
    ".newsletter-confirmed"
  );

  if (!dialog || !trigger || !form || !frame) return;
  if (dialog.dataset.newsletterInitialized) return;
  dialog.dataset.newsletterInitialized = "true";

  let submitted = false;
  let previousOverflow = "";
  let previousBodyOverflow = "";
  let closing = false;

  const closeDialog = () => {
    if (closing || !dialog.open) return;
    closing = true;
    dialog.classList.add("is-closing");

    const finishClosing = () => {
      if (!dialog.open) return;
      dialog.removeEventListener("animationend", handleAnimationEnd);
      dialog.close();
    };

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target === dialog) finishClosing();
    };

    dialog.addEventListener("animationend", handleAnimationEnd);
    window.setTimeout(finishClosing, 300);
  };

  trigger.addEventListener("click", () => {
    const triggerBounds = trigger.getBoundingClientRect();
    dialog.style.setProperty(
      "--newsletter-below",
      `${triggerBounds.bottom + 8}px`
    );
    dialog.style.setProperty(
      "--newsletter-right",
      `${document.documentElement.clientWidth - triggerBounds.right}px`
    );
    previousOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    dialog.showModal();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !dialog.open) return;
    event.preventDefault();
    closeDialog();
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog();
  });

  dialog.addEventListener("close", () => {
    closing = false;
    dialog.classList.remove("is-closing");
    document.documentElement.style.overflow = previousOverflow;
    document.body.style.overflow = previousBodyOverflow;
  });

  form.addEventListener("submit", () => {
    submitted = true;
    form.setAttribute("aria-busy", "true");
    const button = form.querySelector<HTMLButtonElement>("button");
    if (button) button.disabled = true;
  });

  frame.addEventListener("load", () => {
    if (!submitted || !formState || !confirmed) return;
    formState.hidden = true;
    formState.classList.add("hidden");
    form.removeAttribute("aria-busy");
    confirmed.hidden = false;
    confirmed.classList.remove("hidden");
    dialog.focus({ preventScroll: true });
  });
};

setupNewsletterDialog();
document.addEventListener("astro:page-load", setupNewsletterDialog);
