import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';

let editor = grapesjs.init({
    container: "#grapesjs-editor",
    plugins: ['gjs-preset-webpage'],
    storageManager: {
        type: 'remote',
        stepsBeforeSave: 3,
        urlStore: `/api/v2/grapesjs/save/${pageData.pageId}/`,
        urlLoad: `/api/v2/grapesjs/load/${pageData.pageId}/`,
    }
});

editor.on("component:mount", (data) => {
    console.log(data);
});
window.editor = editor;