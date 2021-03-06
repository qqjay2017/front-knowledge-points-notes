const JSZIP = require('jszip');

const zip = new JSZIP();

function test() {
    zip.file("Hello.txt", "Hello World\n");
    const img = zip.folder("images");
    img.file("smile.gif", imgData, { base64: true });
    zip.generateAsync({ type: "blob" }).then((content) => {
        // see FileSaver.js
        saveAs(content, "example.zip");
    });
}
test();

module.exports = test;
