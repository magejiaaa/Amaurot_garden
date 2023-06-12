<template>

</template>

<script>
import { usePluginsStore } from '../stores/pluginStore';
import { ref, computed, watch } from 'vue';
import pluginModel from '../components/plugnModel.vue';
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue';
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue';

export default {
    setup() {
        const pluginStore = usePluginsStore();

        return {
            pluginStore,
        }
    },
    components: {
        pluginModel,
        Dialog,
        DialogPanel,
        TransitionRoot,
        TransitionChild,
        Listbox,
        ListboxLabel,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
    }
}
</script>