import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// const webpack = require('webpack');

const config: webpack.Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sketch-bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8088,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@types': path.resolve(__dirname, 'types'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      hash: true,
      title: 'Hot Module Replacement',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png|jpg$/,
        loader: 'file-loader',
      },
      {
        test: /\.txt|vs|fs$/,
        use: 'raw-loader',
      },
    ],
  },
};

export default config;
