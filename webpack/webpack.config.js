const path = require('path');
const webpack = require('webpack');

const rootFolder = path.join(__dirname, '..');
const outputFolder = path.join(rootFolder, 'dist');

const isTypeScriptFile = x => x.endsWith('.ts') || x.endsWith('.tsx');

const typescriptRule = {
  include: isTypeScriptFile,
  use: 'ts-loader'
};

const tslintRule = {
  include: isTypeScriptFile,
  enforce: 'pre',
  use: 'tslint-loader'
}

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
    rules: [tslintRule, typescriptRule, sassRule, cssRule, fileLoaderRule]
  }
};
