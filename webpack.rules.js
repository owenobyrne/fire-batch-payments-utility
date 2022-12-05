module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  }, {
    test: /\.(ttf|eot|svg|png|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    // include: SRC,
    use: [{
        loader: 'file-loader'
    }]
}
];
