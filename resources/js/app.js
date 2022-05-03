import Alpine from "alpinejs";
window.Alpine = Alpine;

import collapse from "@alpinejs/collapse";
Alpine.plugin(collapse);

import persist from "@alpinejs/persist";
Alpine.plugin(persist);

Alpine.start();
