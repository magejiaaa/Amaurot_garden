import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import 使用的 icon */
import { faUserSecret, faXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faUserSecret, faXmark, faGithub, faTriangleExclamation)

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
