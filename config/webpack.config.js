const HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    babelCfg = require('./babel.config'),
    p = (p) => path.join(__dirname, '../', p || ''),
    CxScssManifestPlugin = require('./CxScssMainfestPlugin'),
    tailwindConfig = require('../tailwind.config'),
    tailwindcss = require('tailwindcss');

module.exports = ({ rootCssLoader, tailwindOptions }) => {
    return {
        resolve: {
            alias: {
                //app: p('app'),
                //uncomment the line below to alias cx-react to cx-preact or some other React replacement library
                //'cx-react': 'cx-preact',
            },
            fallback: {
                fs: false,
            },
        },

        externals: {
            ///use react from CDN (in index.html react is imported like script )
            react: 'React',
            'react-dom': 'ReactDOM',
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    //add here any ES6 based library
                    include: [
                        /// which olders to include (something older here, can be deleted)
                        p('common'),
                        p('app'),
                        /packages[\\\/]cx/,
                        /node_modules[\\\/](cx|cx-react|cx-theme-\w*|cx-google-maps)[\\\/]/, ///which libraries to import to JS
                    ],
                    use: { loader: 'babel-loader', options: babelCfg }, ///babelCfg configuration
                },
                {
                    test: /\.scss$/, ///sass
                    use: [rootCssLoader, 'css-loader', 'sass-loader'], ///implemented from last to first
                },
                {
                    test: /\.css$/, ///css
                    use: [
                        rootCssLoader,
                        'css-loader',
                        {
                            loader: 'postcss-loader', ///use postcss loader for these options for tailwind
                            options: {
                                postcssOptions: {
                                    ident: 'postcss',
                                    plugins: [tailwindcss({ ...tailwindConfig, ...tailwindOptions })],
                                    cacheInclude: [/.*\.(css|scss)$/, /.tailwind\.config\.js$/],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|svg)$/, ///precessing of images
                    loader: 'file-loader',
                    options: {
                        name: '[name].ltc.[hash].[ext]', ///save them like this
                    },
                },
            ],
        },
        entry: {
            /// process in this order
            app: [p('app/index.js'), p('app/index.scss'), p('app/tailwind.css')],
        },
        plugins: [
            new HtmlWebpackPlugin({
                ///starting html file
                template: p('app/index.html'),
            }),

            new CxScssManifestPlugin({
                /// Cx has a lot of components, each has it's own sass, manifest plugin goes through whole source code, sees which components are used, and then only css which is needed is rendered in output
                outputPath: p('app/manifest.scss'),
            }),
        ],

        optimization: {
            /// maybe something so plugins above can be used
            usedExports: true,
        },

        cache: {
            ///
            type: 'filesystem',
            buildDependencies: {
                config: [
                    ///paths to all configuration files that can request anullation of cache when updated
                    __filename,
                    p('config/webpack.dev.js'),
                    p('config/webpack.prod.js'),
                    p('config/webpack.analyze.js'),
                    p('config/babel.config.js'),
                    p('tailwind.config.js'),
                ],
            },
        },
    };
};
