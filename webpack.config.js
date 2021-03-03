const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: { main: './src/index.ts' },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname)
        },
        extensions: ['.ts', '.js', '.mjs']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: false
    },
}