// Runs on posts/index

window.addEventListener("DOMContentLoaded", () => {
  if (document.location.search === "?technical") {
    document
      .querySelectorAll("[data-technical-show]")
      .forEach((el) => (el.style.display = "block"));

    document
      .querySelectorAll("[data-technical-hide]")
      .forEach((el) => (el.style.display = "none"));
  }
});
