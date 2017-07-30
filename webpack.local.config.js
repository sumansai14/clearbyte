const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var staticPrefix = 'clearbyte/static/',
    distPath = staticPrefix + 'dist', staticPath = staticPrefix + 'clearbyte';

const config = {
    entry: {
        app: path.join(__dirname, staticPath, 'js', 'app', 'index.js'),
        vendor: [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server',
            'bootstrap',
            'lodash',
            'moment',
            'jquery',
            'tether',
            
        ],
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: ExtractTextPlugin.extract({
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer({browsers: ['> 1%', 'last 2 versions']})]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.join(staticPrefix, 'clearbyte', 'scss')]
                        }
                    }
                ]
            })
        },{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel',
          options: {
            presets: [['es2015', { modules: false }], 'stage-0', 'react'],
            plugins: ['transform-runtime', 'lodash'],
          },
        },
      ],
    }]
                // {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'}]
    },
    // externals: {
    //     // don't bundle the jquery npm package with our bundle.js
    //     // but get it from a global jQuery variable
    //     jquery: 'jquery',
    //     tether: 'tether'
    // },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.join(__dirname, distPath),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        publicPath: '/assets/',
        library: 'exports',
    },
    plugins: [
        new ExtractTextPlugin('clearbyte.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.Tether': 'tether'
        })
    ],
    target: 'web',
    resolveLoader: {
        moduleExtensions: ['-loader']
    }
};

module.exports = config;