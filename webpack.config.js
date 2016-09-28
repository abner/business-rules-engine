var webpack = require('webpack');
var path = require('path');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

var libraryName = 'BusinessRulesEngine';
var outputFile = 'businessRulesEngine.js';

var tsConfig = require('./src/tsconfig.json');

var config = {
  entry: __dirname + '/src/index.ts',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.ts)$/,
        loader: "awesome-typescript-loader",
        query: {
                    useForkChecker: true,
                    tsconfig: path.resolve(path.resolve(__dirname, './src/tsconfig.json'))
                }
      }
    ]
  },
  plugins: [
    new TypedocWebpackPlugin(tsConfig)
  ],
  resolve: {
    root: path.join(__dirname, './src'),
    extensions: ['', '.ts', '.js']
  }
};

module.exports = config;
