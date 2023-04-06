<template>
    <editor v-model="editorValue" :init="init"></editor>
</template>

<script setup>
import { reactive, ref, watch, toRefs } from 'vue';
import tinymce from 'tinymce/tinymce.js';
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { storage } from '../stores/firebasedb';

// 外觀
import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/themes/silver'

// Icon
import 'tinymce/icons/default'

// 用到的外掛
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis.js';
import 'tinymce/plugins/table';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/image';

// 語言包
import 'tinymce-i18n/langs5/zh_TW.js'
// import 'tinymce-i18n/langs/zh_Hans.js' (TinyMCE 6 的簡體中文)

// TinyMCE-Vue
import Editor from '@tinymce/tinymce-vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    plugins: {
        type: [String, Array],
        default: 'quickbars emoticons table image',
    },
    toolbar: {
        type: [String, Array],
        default:
            ' bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify| bullist numlist | outdent indent blockquote | undo redo | axupimgs | removeformat | table | emoticons image',
    },
});

const emit = defineEmits(['update:modelValue']);

const init = reactive({
    language: 'zh_TW',
    height: 350,
    menubar: false,
    content_css: false,
    content_style: 'body { font-family: Rubik, "Noto Sans TC", "M PLUS Rounded 1c", sans-serif } p {} span {}',
    skin: false,
    plugins: props.plugins,
    toolbar: props.toolbar,
    quickbars_insert_toolbar: false,
    branding: false,
    images_upload_handler: function (blobInfo, success, failure) {
        var filename = blobInfo.filename();
        var fileRef = storageRef(storage, 'pluginUpload/' + filename);
        uploadBytes(fileRef, blobInfo.blob())
            .then((snapshot) => {
                console.log(snapshot);
                getDownloadURL(storageRef(storage, 'pluginUpload/' + filename))
                    .then((url) => {
                        success(url);
                    })
            }).catch((error) => {
                failure(error);
            });
    }
});
// 外層傳進來的
const { modelValue } = toRefs(props);
const editorValue = ref(modelValue.value);

watch(modelValue, (newValue) => {
    editorValue.value = newValue;
});

watch(editorValue, (newValue) => {
    emit('update:modelValue', newValue);
});

</script>

