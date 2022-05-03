const path = require('path');

const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        server: './index.js',
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js',
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                exclude: /node_modules/,
            },
        ],
    },
};
