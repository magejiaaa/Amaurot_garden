import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';
import Loading from 'vue-loading-overlay'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import 使用的 icon */
import { faUserSecret, faXmark, faTriangleExclamation, faLink, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faUserSecret, faXmark, faGithub, faTriangleExclamation, faLink, faPenToSquare)

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(LoadingPlugin);
app.component('loading-plugin', Loading);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
