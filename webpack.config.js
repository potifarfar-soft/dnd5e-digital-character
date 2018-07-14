const path = require('path');

const outputFolder = path.join(__dirname, 'dist');
const nodeModulesFolder = path.join(__dirname, 'node_modules');

const typescriptRule = {
  include: x => x.endsWith('.ts') || x.endsWith('.tsx'),
  exclude: nodeModulesFolder,
  use: 'ts-loader'
};

const sassRule = {
  include: x => x.endsWith('.sass'),
  exclude: nodeModulesFolder,
  use: ['style-loader', 'css-loader', 'sass-loader']
};

module.exports = {
  mode: "development",
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  // entry: './src/index.tsx', // <- default values
  output: {
    // path: path.join(__dirname, 'dist') // <- default values
    // publicPath: '/' // default value: ''
  },
  devServer: { contentBase: outputFolder },
  module: {
    rules: [typescriptRule, sassRule]
  }
};
