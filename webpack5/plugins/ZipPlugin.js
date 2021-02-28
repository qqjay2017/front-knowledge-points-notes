const JSZIP = require('jszip');
const RowSource = require('webpack-sources/lib/RawSource');

class ZipPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const zip = new JSZIP();
            for (const filename in compilation.assets) {
                if (compilation.assets[filename]) {
                    const source = compilation.assets[filename].source();
                    zip.file(filename, source);
                }
            }
            zip.generateAsync({ type: 'nodebuffer' }).then(
                (content) => {
                    compilation.assets['dist.zip'] = new RowSource(content);
                    callback();
                },
            );
        });
    }
}

module.exports = ZipPlugin;
