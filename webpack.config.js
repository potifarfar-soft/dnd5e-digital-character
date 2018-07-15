const path = require('path');

const outputFolder = path.join(__dirname, 'dist');

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

module.exports = {
  mode: "development",
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json', '.ts', '.tsx', '.sass']
  },
  devServer: { contentBase: outputFolder },
  module: {
    rules: [typescriptRule, sassRule, cssRule]
  }
};
