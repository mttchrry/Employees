// src/index.js
import Vue from "vue";
import IndexComponent from "./components/Main.vue";
var v = new Vue({
    el: "#app",
    template: "<index-component>",
    data: { name: "World" },
    components: {
        IndexComponent: IndexComponent
    }
});
//# sourceMappingURL=index.js.map