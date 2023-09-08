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
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/codesample';

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
        default: 'quickbars emoticons table image link code lists hr codesample',
    },
    toolbar1: {
        type: [String, Array],
        default:
            ' bold italic underline strikethrough | fontsizeselect formatselect | forecolor backcolor codesample | alignleft aligncenter alignright alignjustify| bullist numlist | outdent indent blockquote | undo redo | axupimgs | table hr | lists emoticons image link | code | removeformat ',
    },
    // toolbar2: {
    //     type: [String, Array],
    //     default:
    //         ' table hr | lists emoticons image link | code ',
    // }
});

const emit = defineEmits(['update:modelValue']);

const init = reactive({
    language: 'zh_TW',
    height: 350,
    menubar: false,
    content_css: false,
    content_style: 'body { font-family: Rubik, "Noto Sans TC", "M PLUS Rounded 1c", sans-serif } p { margin-bottom: 0.5rem; } span { padding: 0.25em } a { color: #5d7dac } code { color: #dc2626; background: #e5e7eb; padding: 0.125rem 0.5rem; } table { width: 100%;} td { word-break: break-all; }',
    skin: false,
    plugins: props.plugins,
    toolbar1: props.toolbar1,
    // toolbar2: props.toolbar2,
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
    },
    default_link_target: '_blank',
    formats: {
        h1: {
            block: 'h1',
            styles: {
            'font-size': '2em',
            'color': '#5d7dac'
            }
        },
        h2: {
            block: 'h2',
            styles: {
            'font-size': '1.5em',
            'color': '#5d7dac'
            }
        },
        h3: {
            block: 'h3',
            styles: {
            'font-size': '1.2em',
            'color': '#5d7dac'
            }
        },
    },
    style_formats: [
        { title: '標題1', format: 'h1' },
        { title: '標題2', format: 'h2' },
        { title: '標題3', format: 'h3' },
    ]
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

