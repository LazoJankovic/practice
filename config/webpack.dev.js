const webpack = require('webpack'),
    { merge } = require('webpack-merge'), /// merge more webpack configurations into one,
    common = require('./webpack.config'), ///what we just saw in .config
    path = require('path');

process.env.TAILWIND_MODE = 'watch';

module.exports = async () => {
    return merge(common({ tailwindOptions: {}, rootCssLoader: 'style-loader' }), {
        //style loader tha supports hot module replacement, all generated css is put in <style> attributes
        ///merge with this
        mode: 'development',

        //plugins: [new webpack.HotModuleReplacementPlugin()],

        devtool: 'eval', /// eval - not sure if best option... source tab in devtools, see code how webpack generates it, if we change to eval-source-map, webpack should annulate cache, and run this devtool. (slow start due to configuration change). Marko like to see how code is generated because he develops Cx and sometimes e.g. Babel generates some crap (due some loop perhaps). We could use eval-source-map

        output: {
            publicPath: '/', ///root
        },

        devServer: {
            /// yarn start
            hot: true, /// hot module replacement
            port: 5540,
            historyApiFallback: true, /// ?
            static: path.join(__dirname, '../public'), ///path to statick
        },
    });
};
