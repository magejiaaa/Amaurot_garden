import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import Loading from "vue-loading-overlay";
import App from "./App.vue";
import VueGtag from "vue-gtag";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import 使用的 icon */
import {
    faUserSecret,
    faXmark,
    faTriangleExclamation,
    faLink,
    faPenToSquare,
    faBook,
    faGears,
    fa3,
    faHandPointRight,
    faCaretDown,
    faCheck,
    faChevronLeft,
    faChevronRight,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
library.add(
    faUserSecret,
    faXmark,
    faGoogle,
    faTriangleExclamation,
    faLink,
    faPenToSquare,
    faBook,
    faGears,
    fa3,
    faHandPointRight,
    faCaretDown,
    faCheck,
    faChevronLeft,
    faChevronRight,
    faTwitter,
    faGithub,
    faChevronUp
);

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(LoadingPlugin);
app.use(
    VueGtag,
    {
        config: { id: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}` },
        appName: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
        enabled: true,
        pageTrackerScreenviewEnabled: true,
    },
    router
);
app.component("loading-plugin", Loading);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
