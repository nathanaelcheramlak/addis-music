const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devtool: isDevelopment ? 'eval-source-map' : 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    hot: true,
    port: 3000,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile JSX/JS
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // For global styles
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Custom rule for images/SVG
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][hash][ext][query]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({
      path: './.env',
      systemvars: true,
    }),
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
      }),
  ].filter(Boolean),

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
