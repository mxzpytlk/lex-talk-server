var path = require('path');
var nodeExternals = require('webpack-node-externals');
var isDev = process.env.NODE_ENV === 'development';

module.exports = {
  target: 'node',
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  externals: [nodeExternals()],
  devtool: isDev ? 'source-map' : undefined
};
