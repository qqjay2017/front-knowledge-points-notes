const RowSource = require('webpack-sources/lib/RawSource');

class AssetsPlugin {
    // constructor(options) { this.options = options; }

    apply(compiler) {
        console.log(this);
        // compiler.hooks.compilation.tap('AssetsPlugin', (compilation) => {
        //     //
        //     console.log(this.options);
        //     compilation.hooks.chunkAsset.tap('AssetsPlugin', (chunk, fileName) => {
        //         console.log(chunk.name, fileName);
        //     });
        // });
        compiler.hooks.emit.tapAsync('AssetsPlugin', (compilation, callback) => {
            compilation.assets['assets.md'] = new RowSource('111');
            callback();
        });
    }
}

module.exports = AssetsPlugin;
