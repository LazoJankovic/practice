const webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    { merge } = require('webpack-merge'),
    common = require('./webpack.config'),
    path = require('path'),
    p = (p) => path.join(__dirname, '../', p || ''),
    CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common({ rootCssLoader: MiniCssExtractPlugin.loader }), {
    ///miniCss.. recommended way by webpack to generate css
    mode: 'production',

    output: {
        path: p('dist'),
        publicPath: '/',
        filename: '[name].ltc.[contenthash].js', ///our convention,add hash to change name of the updated file, to invalidate cache (browser caches files on its own). ltc - long term cache e.g. for 1 year, load locally and not from server
        chunkFilename: '[name].ltc.[contenthash].js',
        hashDigestLength: 6,
    },

    optimization: {
        minimizer: [
            `...`, //keep the default plugins
            new CssMinimizerPlugin(),
        ],
        concatenateModules: true,
        minimize: true,
    },
    ///enriches webpack with added functionalities
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'), ///change left with right in the code
        }),
        new MiniCssExtractPlugin({
            filename: '[name].ltc.[contenthash].css',
            chunkFilename: '[name].ltc.[contenthash].css',
        }),
        new CopyWebpackPlugin({
            /// enables us to copy static files to output(dist folder), aside from what's built with webpack
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: '.', ///to dist
                },
                {
                    from: path.resolve(__dirname, './netlify.redirects'),
                    to: '_redirects',
                    toType: 'file',
                },
                {
                    from: path.resolve(__dirname, './netlify.headers'),
                    to: '_headers',
                    toType: 'file',
                },
            ],
        }),
        new CleanWebpackPlugin({
            /// every time before we build, cleans the preious build
            dry: false,
            dangerouslyAllowCleanPatternsOutsideProject: true,
        }),
    ],
});
