const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = {
  entry: {
    index:'./src/index.ts'
  },
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    mainFields: ['main','browser', 'module' ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "static", to: path.resolve(__dirname, ".webpack/main/static") }
      ],
    }),

  ]
};