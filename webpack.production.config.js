const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var staticPrefix = 'clearbyte/static/',
    distPath = staticPrefix + 'dist', staticPath = staticPrefix + 'clearbyte';

const extractTextPlugin = new ExtractTextPlugin({ filename: 'clearbyte.min.css', allChunks: true });

const config = {
    entry: {
        app: path.join(__dirname, staticPath, 'js', 'app', 'index.js'),
        vendor: [
            'bootstrap',
            'lodash',
            'moment',
            'jquery',
            'tether',
            'react',
            'react-router'
        ],
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: extractTextPlugin.extract({
                fallback: 'style',
                use: [
                    'css-loader?minimize',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer({browsers: ['> 1%', 'last 2 versions']})]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.join(staticPrefix, 'clearbyte', 'scss')],
                            outputStyle: 'compressed',
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
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.join(__dirname, distPath),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        publicPath: '/static/',
        library: 'exports',
    },
    plugins: [
        extractTextPlugin,
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