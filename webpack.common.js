'use strict';

const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    target: 'web',

    entry: './src/index.ts',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.scss'],
    },

    externals: [nodeExternals()],

    module: {
        rules: [
            { test: /\.s?[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            { test: /\.vue$/, loader: 'vue-loader' },
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'mw-vue-modals',
        libraryTarget: 'umd',
    },
};
