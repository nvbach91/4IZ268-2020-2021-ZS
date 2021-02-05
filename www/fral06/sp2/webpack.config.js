const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './src/js/main.js')],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};
