const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { BugsnagSourceMapUploaderPlugin, BugsnagBuildReporterPlugin  } = require('webpack-bugsnag-plugins')
const version = require('./package.json').version;

module.exports = {
  mode: 'production',
  entry: './src/renderer.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist/renderer.js'),
    compress: true,
    port: 9000
  },
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'renderer.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new BugsnagSourceMapUploaderPlugin({
      apiKey: '9ba5a7c5d6ad414a1134ee105de42e52',
      appVersion: version
    }),
    new BugsnagBuildReporterPlugin({
      apiKey: '9ba5a7c5d6ad414a1134ee105de42e52',
      appVersion: version
    })
  ]
};