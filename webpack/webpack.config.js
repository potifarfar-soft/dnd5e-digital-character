const path = require('path');
const webpack = require('webpack');

const rootFolder = path.join(__dirname, '..');
const outputFolder = path.join(rootFolder, 'dist');

const typescriptRule = {
  include: x => x.endsWith('.ts') || x.endsWith('.tsx'),
  use: 'ts-loader'
};

const sassRule = {
  include: x => x.endsWith('.sass'),
  use: ['style-loader', 'css-loader', 'sass-loader']
};

const cssRule = {
  include: x => x.endsWith('.css'),
  use: ['style-loader', 'css-loader']
};

const fileLoaderRule = {
  include: /\.(jpg|png|ttf|woff|woff2|eot|svg)$/,
  use: ['file-loader']
}

module.exports = {
  mode: "development",
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json', '.ts', '.tsx', '.sass']
  },
  devServer: {
    contentBase: outputFolder,
    historyApiFallback: true,
  },
  module: {
    rules: [typescriptRule, sassRule, cssRule, fileLoaderRule]
  }
};
