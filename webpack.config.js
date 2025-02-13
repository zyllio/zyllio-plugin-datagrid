const path = require('path');

module.exports = {
  entry: './src/progressbar.component.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'plugin.js'    
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [
  ]
};