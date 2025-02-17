const path = require('path');

module.exports = {
  entry: './src/datagrid.component.ts',
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
      {
        test: /\.css$/i,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [
  ]
};