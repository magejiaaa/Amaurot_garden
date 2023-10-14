<!-- DisqusWrapper.vue -->
<template>
    <div>
        <Disqus v-if="pageConfig" shortname="amaurotgarden" :pageConfig="pageConfig"></Disqus>
    </div>
</template>

<script>
import { Disqus } from 'vue-disqus'

export default {
    components: {
        Disqus
    },
    props: {
        pageConfig: {
            type: Object,
            required: true
        }
    }
};
</script>
