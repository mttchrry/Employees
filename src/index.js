// src/index.ts

import Vue from "vue";
import MainComponent from "./components/Main.vue";

window.events = new Vue();

let v = new Vue({
    el: "#app",
    template: `<MainComponent/>`,
    components: {
        MainComponent
    }
});