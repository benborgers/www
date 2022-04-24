// JavaScript that executes in the Filament CMS.

/**
 * Allow partial links in Trix editor (links that start with /, not just http).
 */
addEventListener("trix-initialize", (event) => {
    const { toolbarElement } = event.target;
    const inputElement = toolbarElement.querySelector("input[name=href]");
    inputElement.type = "text";
    inputElement.pattern = "(https?://|/).+";
});
