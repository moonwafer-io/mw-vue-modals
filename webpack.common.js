'use strict';

const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',

    entry: './src/index.ts',

    // TODO-ben : what's this?
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.scss'],
    },

    externals: {
        // Don't package our vue library with the output.
        vue: 'vue'
    },

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
